import type { ContactPayload } from "@/lib/validation";
import { sendWhatsAppText } from "@/lib/whatsapp";

export function formatContactMessage(payload: ContactPayload) {
  return [
    "*New portfolio enquiry*",
    "",
    `*Name:* ${payload.name.trim()}`,
    `*Email:* ${payload.email.trim()}`,
    `*Subject:* ${payload.subject.trim()}`,
    "",
    payload.message.trim(),
  ].join("\n");
}

export { isWhatsAppConfigured } from "@/lib/whatsapp";

export async function sendContactWhatsApp(payload: ContactPayload) {
  await sendWhatsAppText(formatContactMessage(payload));
}
