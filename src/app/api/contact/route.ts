import { NextResponse } from "next/server";

import { site } from "@/data/site";
import { isWhatsAppConfigured, sendContactWhatsApp } from "@/lib/contactChannel";
import { hasContactErrors, validateContact, type ContactPayload } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ContactPayload>;
  const payload: ContactPayload = {
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    subject: String(body.subject ?? ""),
    message: String(body.message ?? ""),
  };

  const errors = validateContact(payload);
  if (hasContactErrors(errors)) {
    return NextResponse.json(
      { ok: false, message: "Please check the form and try again.", errors },
      { status: 400 },
    );
  }

  if (!isWhatsAppConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message: `Messaging is not set up yet. Email me directly at ${site.contact.email}.`,
      },
      { status: 503 },
    );
  }

  try {
    await sendContactWhatsApp(payload);
    return NextResponse.json({
      ok: true,
      message: "Thanks — I’ll get back to you shortly.",
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: `Could not send the message. Please email ${site.contact.email} instead.`,
      },
      { status: 500 },
    );
  }
}
