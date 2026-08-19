import type { ProjectInquiry } from "@/lib/validation";

function env(name: string) {
  return process.env[name]?.trim() ?? "";
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function cloudApiConfigured() {
  return Boolean(env("WHATSAPP_ACCESS_TOKEN") && env("WHATSAPP_PHONE_NUMBER_ID") && env("WHATSAPP_RECIPIENT_PHONE"));
}

function callMeBotConfigured() {
  return Boolean(env("WHATSAPP_PHONE") && env("WHATSAPP_API_KEY"));
}

function waapiConfigured() {
  return Boolean(env("WAAPI_API_TOKEN") && recipientPhone());
}

function recipientPhone() {
  return digitsOnly(env("WAAPI_RECIPIENT_PHONE") || env("WHATSAPP_RECIPIENT_PHONE") || env("WHATSAPP_PHONE"));
}

export function isWhatsAppConfigured() {
  return waapiConfigured() || cloudApiConfigured() || callMeBotConfigured();
}

export function formatInquiryMessage(inquiry: ProjectInquiry) {
  const requirements = inquiry.requirements.length
    ? inquiry.requirements.map((item) => `• ${item}`).join("\n")
    : "• Not provided";

  return [
    "🚀 NEW PROJECT INQUIRY",
    "",
    "👤 Customer:",
    inquiry.name,
    "",
    "📧 Email:",
    inquiry.email,
    "",
    "📱 WhatsApp:",
    inquiry.phone,
    "",
    "🏢 Company:",
    inquiry.company || "Not provided",
    "",
    "💼 Project:",
    inquiry.projectType,
    "",
    "📝 Description:",
    inquiry.description,
    "",
    "🛠 Requirements:",
    requirements,
    "",
    "⏱ Timeline:",
    inquiry.timeline,
    "",
    "💰 Budget:",
    inquiry.budget || "Not provided",
    "",
    "🤖 Source:",
    "AI Portfolio Contact Agent",
  ].join("\n");
}

async function sendViaCloudApi(text: string) {
  const token = env("WHATSAPP_ACCESS_TOKEN");
  const phoneNumberId = env("WHATSAPP_PHONE_NUMBER_ID");
  const to = digitsOnly(env("WHATSAPP_RECIPIENT_PHONE"));
  const response = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { preview_url: false, body: text.slice(0, 4000) },
    }),
  });

  if (!response.ok) {
    throw new Error("WhatsApp delivery failed.");
  }
}

async function sendViaCallMeBot(text: string) {
  const url = new URL("https://api.callmebot.com/whatsapp.php");
  url.searchParams.set("source", "web");
  url.searchParams.set("phone", env("WHATSAPP_PHONE"));
  url.searchParams.set("apikey", env("WHATSAPP_API_KEY"));
  url.searchParams.set("text", text);

  const response = await fetch(url, { method: "GET", cache: "no-store" });
  const body = await response.text();

  if (!response.ok || /error|invalid|apikey/i.test(body)) {
    throw new Error("WhatsApp delivery failed.");
  }
}

type WaapiPayload = {
  status?: string;
  data?: unknown;
};

function findSerializedId(value: unknown, depth = 0): string {
  if (depth > 8 || value == null) return "";
  if (typeof value === "string") {
    return /@(c\.us|lid)$/i.test(value) ? value : "";
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findSerializedId(item, depth + 1);
      if (found) return found;
    }
    return "";
  }
  if (typeof value !== "object") return "";

  const record = value as Record<string, unknown>;
  if (typeof record._serialized === "string" && record._serialized.includes("@")) {
    return record._serialized;
  }

  for (const nested of Object.values(record)) {
    const found = findSerializedId(nested, depth + 1);
    if (found) return found;
  }
  return "";
}

async function waapiAction(instanceId: string, action: string, body: Record<string, unknown>) {
  const token = env("WAAPI_API_TOKEN");
  const response = await fetch(`https://waapi.app/api/v1/instances/${instanceId}/client/action/${action}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(25000),
  });

  let payload: WaapiPayload = {};
  try {
    payload = (await response.json()) as WaapiPayload;
  } catch {
    payload = {};
  }

  return { ok: response.ok, status: response.status, payload };
}

function waapiSucceeded(result: { ok: boolean; payload: WaapiPayload }) {
  if (result.payload.status === "error") return false;
  if (!result.ok) return false;
  return result.payload.status === "success" || result.ok;
}

async function resolveWaapiChatIds(instanceId: string, phone: string) {
  const ids = [`${phone}@c.us`, phone];
  const lookup = await waapiAction(instanceId, "get-number-id", { number: phone });
  const resolved = findSerializedId(lookup.payload);
  if (resolved) ids.unshift(resolved);
  return [...new Set(ids.filter(Boolean))];
}

async function sendViaWaapi(text: string) {
  const phone = recipientPhone();
  const instanceId = await resolveWaapiInstanceId(env("WAAPI_API_TOKEN"));
  const chatIds = await resolveWaapiChatIds(instanceId, phone);
  const messages = [text, text.replace(/[\u{1F300}-\u{1FAFF}]/gu, "").replace(/^\s*\n/gm, "").trim()].filter(
    (item, index, list) => item && list.indexOf(item) === index,
  );

  let lastStatus = 0;

  for (const chatId of chatIds) {
    for (const message of messages) {
      const result = await waapiAction(instanceId, "send-message", {
        chatId,
        message: message.slice(0, 4000),
        previewLink: false,
      });
      lastStatus = result.status;
      if (waapiSucceeded(result)) return;
      if (result.status === 409) break;
    }
    if (lastStatus === 409) break;
  }

  console.error("WhatsApp send failed", lastStatus || "unknown");
  throw new Error("WhatsApp delivery failed.");
}

let cachedWaapiInstanceId = "";

async function resolveWaapiInstanceId(token: string) {
  const configured = env("WAAPI_INSTANCE_ID");
  if (configured) return configured;
  if (cachedWaapiInstanceId) return cachedWaapiInstanceId;

  const response = await fetch("https://waapi.app/api/v1/instances", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("WhatsApp delivery failed.");
  }

  const payload = (await response.json()) as { instances?: { id?: number | string }[] };
  const id = payload.instances?.[0]?.id;
  if (id == null || id === "") {
    throw new Error("WhatsApp delivery failed.");
  }

  cachedWaapiInstanceId = String(id);
  return cachedWaapiInstanceId;
}

export async function sendWhatsAppText(text: string) {
  if (waapiConfigured()) {
    await sendViaWaapi(text);
    return;
  }

  if (cloudApiConfigured()) {
    await sendViaCloudApi(text);
    return;
  }

  if (callMeBotConfigured()) {
    await sendViaCallMeBot(text);
    return;
  }

  throw new Error("WhatsApp is not configured.");
}

export async function sendInquiryWhatsApp(inquiry: ProjectInquiry) {
  await sendWhatsAppText(formatInquiryMessage(inquiry));
}

export function whatsappFallbackHref() {
  const phone = recipientPhone();
  return phone ? `https://wa.me/${phone}` : "";
}
