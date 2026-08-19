import { type Project } from "@/data/projects";

export const EXPLANATION_KEYS = [
  "problem",
  "solution",
  "architecture",
  "technologies",
  "contribution",
  "challenges",
  "results",
] as const;

export type ExplanationKey = (typeof EXPLANATION_KEYS)[number];

export type ProjectExplanation = Record<ExplanationKey, string>;

export const EXPLANATION_LABELS: Record<ExplanationKey, string> = {
  problem: "Problem",
  solution: "Solution",
  architecture: "Architecture",
  technologies: "Technologies",
  contribution: "Your contribution",
  challenges: "Challenges",
  results: "Results",
};

export function buildProjectFacts(project: Project) {
  return [
    `Title: ${project.title}`,
    project.eyebrow ? `Eyebrow: ${project.eyebrow}` : "",
    `Summary: ${project.summary}`,
    `Description: ${project.description}`,
    `Technologies: ${project.technologies.join(", ")}`,
    `Features: ${project.features.join("; ")}`,
    project.overview ? `Overview: ${project.overview}` : "",
    project.problem ? `Problem: ${project.problem}` : "",
    project.solution ? `Solution: ${project.solution}` : "",
    project.architecture?.length ? `Architecture: ${project.architecture.join("; ")}` : "",
    project.challenges?.length ? `Challenges: ${project.challenges.join("; ")}` : "",
    project.results?.length ? `Results: ${project.results.join("; ")}` : "",
    project.live && project.live !== "#" ? `Live: ${project.live}` : "",
    project.github && project.github !== "Private" ? `GitHub: ${project.github}` : "GitHub: private",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildProjectExplainPrompt(project: Project) {
  return [
    "You explain Sritharar Shathusan (Shathu) portfolio projects for recruiters.",
    "Use ONLY the project facts below. Never invent products, teammates, job titles, metrics, or tools.",
    "Write the 'contribution' section as what Shathu built, using features, solution, and architecture only. Do not invent a team role.",
    "If a section has no source facts, write exactly: Not documented in this case study.",
    "Return JSON only with these string keys: problem, solution, architecture, technologies, contribution, challenges, results.",
    "Each value should be 1-3 short sentences.",
    "",
    "PROJECT FACTS:",
    buildProjectFacts(project),
  ].join("\n");
}

export function parseProjectExplanation(raw: string): ProjectExplanation | null {
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "");

  try {
    const parsed = JSON.parse(cleaned) as Record<string, unknown>;
    const explanation = {} as ProjectExplanation;
    for (const key of EXPLANATION_KEYS) {
      const value = parsed[key];
      if (typeof value !== "string" || !value.trim()) return null;
      explanation[key] = value.trim();
    }
    return explanation;
  } catch {
    return null;
  }
}
