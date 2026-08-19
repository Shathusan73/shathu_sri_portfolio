import { NextResponse } from "next/server";

import { buildSystemPrompt, sanitizeAssistantPath, sanitizeTurns, toGeminiContents } from "@/lib/assistant";
import { generateGeminiText, getGeminiApiKey } from "@/lib/gemini";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!getGeminiApiKey()) {
    return NextResponse.json(
      { ok: false, message: "The assistant is not configured yet." },
      { status: 503 },
    );
  }

  let body: { messages?: unknown; path?: unknown };
  try {
    body = (await request.json()) as { messages?: unknown; path?: unknown };
  } catch {
    return NextResponse.json({ ok: false, message: "Please ask a question." }, { status: 400 });
  }

  const turns = sanitizeTurns(body.messages);
  const lastUser = [...turns].reverse().find((turn) => turn.role === "user");

  if (!lastUser) {
    return NextResponse.json({ ok: false, message: "Please ask a question." }, { status: 400 });
  }

  const pathname = sanitizeAssistantPath(body.path);
  const result = await generateGeminiText({
    systemInstruction: buildSystemPrompt(pathname),
    contents: toGeminiContents(turns),
    temperature: 0.3,
    maxOutputTokens: 420,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.text }, { status: result.status });
  }

  return NextResponse.json({ reply: result.text });
}
