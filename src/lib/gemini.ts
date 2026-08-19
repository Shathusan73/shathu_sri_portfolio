export const GEMINI_MODEL = "gemini-3.1-flash-lite";
export const GEMINI_TTS_MODEL = "gemini-3.1-flash-tts-preview";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const GEMINI_TTS_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_TTS_MODEL}:generateContent`;

export type GeminiPart =
  | { text: string }
  | { inlineData: { mimeType: string; data: string } };

export type GeminiContent = {
  role: "user" | "model";
  parts: GeminiPart[];
};

export function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY?.trim() ?? "";
}

export async function generateGeminiText(options: {
  contents: GeminiContent[];
  systemInstruction?: string;
  temperature?: number;
  maxOutputTokens?: number;
  json?: boolean;
  responseSchema?: Record<string, unknown>;
}) {
  const key = getGeminiApiKey();
  if (!key) {
    return { ok: false as const, status: 503, text: "The assistant is not configured yet." };
  }

  const generationConfig: Record<string, unknown> = {
    temperature: options.temperature ?? 0.3,
    maxOutputTokens: options.maxOutputTokens ?? 420,
  };
  if (options.json) {
    generationConfig.responseMimeType = "application/json";
  }
  if (options.responseSchema) {
    generationConfig.responseMimeType = "application/json";
    generationConfig.responseSchema = options.responseSchema;
  }

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": key,
    },
    body: JSON.stringify({
      systemInstruction: options.systemInstruction
        ? { parts: [{ text: options.systemInstruction }] }
        : undefined,
      contents: options.contents,
      generationConfig,
    }),
  });

  const raw = await response.text();
  if (!response.ok) {
    console.error("Gemini request failed", response.status);
    return { ok: false as const, status: 502, text: "The assistant is busy. Please try again in a moment." };
  }

  const payload = JSON.parse(raw) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = payload.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? "")
    .join("")
    .trim();

  if (!text) {
    return { ok: false as const, status: 502, text: "The assistant returned an empty reply." };
  }

  return { ok: true as const, text };
}

export async function generateGeminiSpeech(text: string) {
  const key = getGeminiApiKey();
  if (!key) {
    return { ok: false as const, status: 503, text: "Voice is not configured yet." };
  }

  const spoken = text.replace(/\*\*/g, "").slice(0, 900);
  const response = await fetch(GEMINI_TTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": key,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Say this clearly and professionally:\n${spoken}` }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Kore" },
          },
        },
      },
    }),
  });

  const raw = await response.text();
  if (!response.ok) {
    console.error("Gemini TTS failed", response.status);
    return { ok: false as const, status: 502, text: "Could not generate speech." };
  }

  const payload = JSON.parse(raw) as {
    candidates?: { content?: { parts?: { inlineData?: { data?: string; mimeType?: string } }[] } }[];
  };
  const inline = payload.candidates?.[0]?.content?.parts?.[0]?.inlineData;
  if (!inline?.data) {
    return { ok: false as const, status: 502, text: "Could not generate speech." };
  }

  return { ok: true as const, data: inline.data, mimeType: inline.mimeType ?? "audio/l16;rate=24000" };
}
