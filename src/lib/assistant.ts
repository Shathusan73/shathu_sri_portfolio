import { education } from "@/data/education";
import { experience, getExperienceSummary } from "@/data/experience";
import { getFeaturedProjects, getProjectBySlug, type Project } from "@/data/projects";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { social } from "@/data/social";

function projectBlock(project: Project) {
  const lines = [
    `CURRENT PAGE: case study for "${project.title}" (/projects/${project.slug}).`,
    "If the visitor asks about this page or this project, answer from these facts first.",
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
  ];

  return lines.filter(Boolean).join("\n");
}

export function sanitizeAssistantPath(input: unknown): string | undefined {
  if (typeof input !== "string") return undefined;
  const path = input.trim();
  if (!path.startsWith("/") || path.includes("..") || path.includes("?") || path.includes("#")) {
    return undefined;
  }
  if (path.length > 120) return undefined;
  if (path === "/" || path === "/cv" || path === "/projects") return path;

  const match = /^\/projects\/([a-z0-9-]+)$/.exec(path);
  if (match && getProjectBySlug(match[1])) return path;
  return undefined;
}

function pageContext(pathname?: string) {
  if (!pathname) return "";
  if (pathname === "/cv") {
    return [
      "CURRENT PAGE: curriculum vitae.",
      "If asked to summarise the CV, give a recruiter-ready overview from the profile facts. Do not invent degrees or roles.",
    ].join("\n");
  }

  const match = /^\/projects\/([a-z0-9-]+)$/.exec(pathname);
  if (!match) return "";
  const project = getProjectBySlug(match[1]);
  return project ? projectBlock(project) : "";
}

export function buildAssistantContext() {
  const skills = skillGroups
    .map((group) => `${group.title}: ${group.skills.map((skill) => skill.name).join(", ")}`)
    .join("\n");

  const roles = experience
    .map(
      (item) =>
        `${item.role} at ${item.organisation} (${item.period}, ${item.duration}). ${item.summary}`,
    )
    .join("\n");

  const studies = education
    .map(
      (item) =>
        `${item.title} — ${item.institution} (${item.period}). ${item.achievements.join(", ")}. Modules: ${item.skills.join(", ")}.`,
    )
    .join("\n");

  const projectLines = getFeaturedProjects()
    .slice(0, 8)
    .map((project) => `${project.title}: ${project.summary}`)
    .join("\n");

  const links = social.map((item) => `${item.label}: ${item.handle}`).join("\n");

  return [
    `Name: ${site.fullName} (also called Shathu, Shathusan, Sritharar Shathusan).`,
    `Role: ${site.role}.`,
    `Location: ${site.contact.location}.`,
    `Availability: ${site.contact.availability}.`,
    `Website: ${site.url}.`,
    `Public email: ${site.contact.email}.`,
    `Tenure: ${getExperienceSummary()}.`,
    "",
    "About:",
    ...site.about.paragraphs,
    "",
    "Focus:",
    site.about.focus.join(", "),
    "",
    "Experience:",
    roles,
    "",
    "Education:",
    studies,
    "",
    "Skills:",
    skills,
    "",
    "Selected projects:",
    projectLines,
    "",
    "Public links:",
    links,
  ].join("\n");
}

export function buildSystemPrompt(pathname?: string, spoken = false) {
  const page = pageContext(pathname);

  return [
    "You are the site assistant for Sritharar Shathusan (Shathu), a Software Engineer.",
    "Answer questions about him using ONLY the profile facts below. Never invent jobs, degrees, or projects.",
    "If someone asks who Shathu / Shathusan / Sritharar is, give a complete, friendly overview: name, role, location, experience, education, skills, and how to contact him.",
    "Share the public email and website. Do not share phone numbers or WhatsApp details.",
    "Stay on-topic. If asked about unrelated subjects, briefly decline and offer to talk about Shathu's work.",
    "Keep answers concise (under 180 words) unless the visitor asks for more detail.",
    spoken
      ? "You are speaking aloud. Keep the reply conversational, under 70 words, and without markdown or bullet symbols."
      : "",
    page ? "When CURRENT PAGE facts are present, prefer them for questions about this page." : "",
    "",
    "PROFILE FACTS:",
    buildAssistantContext(),
    page ? `\n${page}` : "",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

export type GeminiContent = {
  role: "user" | "model";
  parts: { text: string }[];
};

export function sanitizeTurns(input: unknown): ChatTurn[] {
  if (!Array.isArray(input)) return [];

  return input
    .slice(-12)
    .flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const role = "role" in item ? item.role : null;
      const content = "content" in item ? item.content : null;
      if ((role !== "user" && role !== "assistant") || typeof content !== "string") return [];
      const text = content.trim().slice(0, 800);
      if (!text) return [];
      return [{ role, content: text }];
    });
}

export function toGeminiContents(turns: ChatTurn[]): GeminiContent[] {
  const contents: GeminiContent[] = [];

  for (const turn of turns) {
    const role = turn.role === "assistant" ? "model" : "user";
    const previous = contents.at(-1);
    if (previous?.role === role) {
      previous.parts[0].text += `\n${turn.content}`;
      continue;
    }
    contents.push({ role, parts: [{ text: turn.content }] });
  }

  if (contents[0]?.role === "model") {
    contents.unshift({ role: "user", parts: [{ text: "Hello." }] });
  }

  return contents;
}
