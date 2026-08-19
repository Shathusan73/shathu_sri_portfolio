import { NextResponse } from "next/server";

import { site } from "@/data/site";
import { clientKey, rateLimit, requestTooLarge } from "@/lib/rateLimit";
import { normalizeInquiry, validateInquiryForSend } from "@/lib/validation";
import { isWhatsAppConfigured, sendInquiryWhatsApp, whatsappFallbackHref } from "@/lib/whatsapp";

export const runtime = "nodejs";

const SEND_ERROR = "Your inquiry couldn't be sent right now. Please use the direct WhatsApp/contact option below.";

export async function POST(request: Request) {
  if (requestTooLarge(request)) {
    return NextResponse.json({ ok: false, message: SEND_ERROR }, { status: 413 });
  }

  if (!rateLimit(`whatsapp-send:${clientKey(request)}`, 30, 60 * 60 * 1000)) {
    return NextResponse.json({ ok: false, message: SEND_ERROR }, { status: 429 });
  }

  let body: { inquiry?: unknown; consent?: unknown };
  try {
    body = (await request.json()) as { inquiry?: unknown; consent?: unknown };
  } catch {
    return NextResponse.json({ ok: false, message: SEND_ERROR }, { status: 400 });
  }

  const inquiry = normalizeInquiry(body.inquiry && typeof body.inquiry === "object" ? body.inquiry : {});
  const consent = body.consent === true;
  const errors = validateInquiryForSend(inquiry, consent);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, message: SEND_ERROR }, { status: 400 });
  }

  const fallback = {
    emailHref: `mailto:${site.contact.email}`,
    whatsappHref: whatsappFallbackHref(),
  };

  if (!isWhatsAppConfigured()) {
    return NextResponse.json({ ok: false, message: SEND_ERROR, fallback }, { status: 503 });
  }

  try {
    await sendInquiryWhatsApp(inquiry);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: SEND_ERROR, fallback }, { status: 500 });
  }
}
