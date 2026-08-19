import { NextResponse } from "next/server";

import { getProjectBySlug } from "@/data/projects";
import { generateGeminiText } from "@/lib/gemini";
import { buildProjectExplainPrompt, parseProjectExplanation } from "@/lib/projectExplain";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { slug?: unknown };
  try {
    body = (await request.json()) as { slug?: unknown };
  } catch {
    return NextResponse.json({ ok: false, message: "Choose a project to explain." }, { status: 400 });
  }

  const slug = typeof body.slug === "string" ? body.slug.trim() : "";
  if (!/^[a-z0-9-]{1,80}$/.test(slug)) {
    return NextResponse.json({ ok: false, message: "Choose a project to explain." }, { status: 400 });
  }

  const project = getProjectBySlug(slug);
  if (!project || project.status !== "shipped") {
    return NextResponse.json({ ok: false, message: "That project was not found." }, { status: 404 });
  }

  const result = await generateGeminiText({
    systemInstruction: buildProjectExplainPrompt(project),
    contents: [
      {
        role: "user",
        parts: [{ text: `Explain the project "${project.title}" in the required JSON shape.` }],
      },
    ],
    temperature: 0.2,
    maxOutputTokens: 1200,
    json: true,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.text }, { status: result.status });
  }

  const explanation = parseProjectExplanation(result.text);
  if (!explanation) {
    return NextResponse.json(
      { ok: false, message: "The explanation came back in an unexpected format. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, explanation });
}
