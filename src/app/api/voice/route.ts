import { NextResponse } from "next/server";

import { buildSystemPrompt, sanitizeAssistantPath } from "@/lib/assistant";
import { generateGeminiSpeech, generateGeminiText, getGeminiApiKey } from "@/lib/gemini";
import { pcm16ToWavBase64 } from "@/lib/wav";

export const runtime = "nodejs";

const ALLOWED_AUDIO = new Set([
  "audio/webm",
  "audio/webm;codecs=opus",
  "audio/mp4",
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
]);

function parseVoiceJson(raw: string) {
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "");

  try {
    const parsed = JSON.parse(cleaned) as { transcript?: unknown; reply?: unknown };
    const transcript = typeof parsed.transcript === "string" ? parsed.transcript.trim() : "";
    const reply = typeof parsed.reply === "string" ? parsed.reply.trim() : "";
    if (!reply) return null;
    return { transcript: transcript || "Voice question", reply };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  if (!getGeminiApiKey()) {
    return NextResponse.json({ ok: false, message: "Voice is not configured yet." }, { status: 503 });
  }

  let body: { audio?: unknown; mimeType?: unknown; path?: unknown };
  try {
    body = (await request.json()) as { audio?: unknown; mimeType?: unknown; path?: unknown };
  } catch {
    return NextResponse.json({ ok: false, message: "Please try speaking again." }, { status: 400 });
  }

  const audio = typeof body.audio === "string" ? body.audio.replace(/^data:[^;]+;base64,/, "") : "";
  const rawMime = typeof body.mimeType === "string" ? body.mimeType : "";
  const baseMime = rawMime.split(";")[0];
  const safeMime = ALLOWED_AUDIO.has(rawMime) ? rawMime : baseMime;

  if (!audio || audio.length > 2_500_000 || !ALLOWED_AUDIO.has(safeMime)) {
    return NextResponse.json({ ok: false, message: "Please try speaking again." }, { status: 400 });
  }
  const pathname = sanitizeAssistantPath(body.path);

  const result = await generateGeminiText({
    systemInstruction: [
      buildSystemPrompt(pathname, true),
      "The visitor spoke a question as audio. Transcribe it, then answer.",
      "Return JSON only with keys transcript and reply.",
    ].join("\n"),
    contents: [
      {
        role: "user",
        parts: [
          { inlineData: { mimeType: safeMime, data: audio } },
          {
            text: "Transcribe the spoken question, then answer it from the profile facts. Return JSON { transcript, reply }.",
          },
        ],
      },
    ],
    temperature: 0.3,
    maxOutputTokens: 500,
    json: true,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.text }, { status: result.status });
  }

  const parsed = parseVoiceJson(result.text);
  if (!parsed) {
    return NextResponse.json(
      { ok: false, message: "I could not understand that. Please try again." },
      { status: 502 },
    );
  }

  const speech = await generateGeminiSpeech(parsed.reply);
  let audioWav: string | undefined;
  if (speech.ok) {
    audioWav = pcm16ToWavBase64(speech.data);
  }

  return NextResponse.json({
    ok: true,
    transcript: parsed.transcript,
    reply: parsed.reply,
    audio: audioWav,
    audioMimeType: audioWav ? "audio/wav" : undefined,
  });
}
