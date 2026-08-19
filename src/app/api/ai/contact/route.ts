import { NextResponse } from "next/server";

import {
  buildContactAgentPrompt,
  CONTACT_INQUIRY_SCHEMA,
  emptyInquiry,
  finalizeInquiry,
  inquiryToGeminiContents,
  looksAbusive,
  mergeInquiry,
  parseInquiryJson,
  sanitizeContactTurns,
} from "@/lib/contactAgent";
import { generateGeminiText, getGeminiApiKey } from "@/lib/gemini";
import { clientKey, rateLimit, requestTooLarge } from "@/lib/rateLimit";
import { normalizeInquiry } from "@/lib/validation";

export const runtime = "nodejs";

const FRIENDLY_ERROR = "Sorry, I'm having trouble understanding that right now. Please try again.";

export async function POST(request: Request) {
  if (requestTooLarge(request)) {
    return NextResponse.json({ ok: false, message: FRIENDLY_ERROR }, { status: 413 });
  }

  if (!rateLimit(`ai-contact:${clientKey(request)}`, 20, 10 * 60 * 1000)) {
    return NextResponse.json(
      { ok: false, message: "Please wait a moment before sending another message." },
      { status: 429 },
    );
  }

  if (!getGeminiApiKey()) {
    return NextResponse.json({ ok: false, message: FRIENDLY_ERROR }, { status: 503 });
  }

  let body: { messages?: unknown; inquiry?: unknown };
  try {
    body = (await request.json()) as { messages?: unknown; inquiry?: unknown };
  } catch {
    return NextResponse.json({ ok: false, message: FRIENDLY_ERROR }, { status: 400 });
  }

  const turns = sanitizeContactTurns(body.messages);
  const lastUser = [...turns].reverse().find((turn) => turn.role === "user");
  if (!lastUser || looksAbusive(lastUser.content)) {
    return NextResponse.json({ ok: false, message: FRIENDLY_ERROR }, { status: 400 });
  }

  const previous = normalizeInquiry(
    body.inquiry && typeof body.inquiry === "object" ? body.inquiry : emptyInquiry(),
  );

  const result = await generateGeminiText({
    systemInstruction: buildContactAgentPrompt(),
    contents: inquiryToGeminiContents(turns),
    temperature: 0.2,
    maxOutputTokens: 320,
    json: true,
    responseSchema: CONTACT_INQUIRY_SCHEMA as unknown as Record<string, unknown>,
  });

  const parsedSource =
    result.ok
      ? result
      : await generateGeminiText({
          systemInstruction: buildContactAgentPrompt(),
          contents: inquiryToGeminiContents(turns),
          temperature: 0.2,
          maxOutputTokens: 320,
          json: true,
        });

  if (!parsedSource.ok) {
    return NextResponse.json({ ok: false, message: FRIENDLY_ERROR }, { status: parsedSource.status });
  }

  try {
    const extracted = parseInquiryJson(parsedSource.text);
    const inquiry = finalizeInquiry(mergeInquiry(previous, extracted));
    return NextResponse.json({
      ok: true,
      reply: inquiry.nextQuestion,
      inquiry,
    });
  } catch {
    return NextResponse.json({ ok: false, message: FRIENDLY_ERROR }, { status: 502 });
  }
}
