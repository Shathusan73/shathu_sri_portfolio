import {
  dayAfter,
  durationParts,
  formatDuration,
  formatShortDate,
  parseLocalDate,
} from "@/lib/duration";

export const CAREER_START = "2023-10-13";

export const experienceMeta = {
  company: "Microwe",
  headline: "Work Experience",
  careerStart: CAREER_START,
  location: "Jaffna, Northern Province, Sri Lanka · On-site",
} as const;

export function getCareerTenure(now = new Date()) {
  return durationParts(parseLocalDate(CAREER_START), now);
}

export function getCareerYears(now = new Date()) {
  return getCareerTenure(now).years;
}

export function getExperienceSummary(now = new Date()) {
  return `${formatDuration(parseLocalDate(CAREER_START), now)} at ${experienceMeta.company}`;
}

function roleTiming(startedOn: string, endedOn?: string, now = new Date()) {
  const start = parseLocalDate(startedOn);
  const end = endedOn ? dayAfter(endedOn) : now;
  return {
    period: endedOn
      ? `${formatShortDate(startedOn)} — ${formatShortDate(endedOn)}`
      : `${formatShortDate(startedOn)} — Present`,
    duration: formatDuration(start, end),
  };
}

export const experience = [
  {
    id: "software-engineer",
    role: "Software Engineer",
    organisation: "Microwe",
    startedOn: "2025-04-14",
    ...roleTiming("2025-04-14"),
    location: "Jaffna, Northern Province, Sri Lanka · On-site",
    icon: "briefcase",
    current: true,
    summary:
      "Owning full-stack delivery across client and internal products — from Next.js interfaces to .NET APIs, PostgreSQL, and production releases.",
    responsibilities: [
      "Design and ship scalable web applications with Next.js, React, TypeScript, and .NET.",
      "Build REST APIs, data models, and PostgreSQL schemas that stay maintainable as products grow.",
      "Deliver AI-assisted product features, including image classification connected to search and catalogues.",
      "Lead feature work from requirements through review, testing, and production.",
    ],
    achievements: [
      "Shipped production platforms spanning marketplace, dating, and AI analytics products.",
      "Introduced image classification into product workflows to improve categorisation and search.",
      "Established reusable frontend architecture and API contracts across Microwe products.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      ".NET",
      "PostgreSQL",
      "Python",
      "TensorFlow",
      "Redux",
    ],
    areas: [
      "Full-stack product development",
      "AI feature integration",
      "API and database design",
      "Frontend architecture",
    ],
  },
  {
    id: "associate-frontend-software-engineer",
    role: "Associate Frontend Software Engineer",
    organisation: "Microwe",
    startedOn: "2024-04-15",
    endedOn: "2025-04-14",
    ...roleTiming("2024-04-15", "2025-04-14"),
    location: "Jaffna, Northern Province, Sri Lanka · On-site",
    icon: "layers",
    current: false,
    summary:
      "Built and improved production interfaces across live Microwe products, with a focus on React, TypeScript, and reliable frontend delivery.",
    responsibilities: [
      "Built and maintained production interfaces with React, TypeScript, and Tailwind CSS.",
      "Implemented reusable components, page layouts, and interaction patterns.",
      "Collaborated with design and backend to integrate APIs into the interface.",
      "Took part in releases, reviews, and iterative product improvements.",
    ],
    achievements: [
      "Contributed to multiple client and internal products from build through launch.",
      "Strengthened TypeScript and component architecture practices.",
      "Took ownership of frontend features end-to-end rather than isolated UI tasks.",
    ],
    technologies: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Redux", "Git"],
    areas: [
      "Frontend engineering",
      "Component architecture",
      "Responsive layout",
      "Product delivery",
    ],
  },
  {
    id: "intern-software-engineer",
    role: "Intern Software Engineer",
    organisation: "Microwe",
    startedOn: "2023-10-13",
    endedOn: "2024-04-12",
    ...roleTiming("2023-10-13", "2024-04-12"),
    location: "Jaffna, Northern Province, Sri Lanka · On-site",
    icon: "code",
    current: false,
    summary:
      "Supported client and internal web delivery as an intern — building responsive interfaces, learning production workflows, and contributing to launch polish.",
    responsibilities: [
      "Developed responsive websites and product UIs with React and modern CSS.",
      "Implemented reusable components, page layouts, and interaction patterns.",
      "Collaborated with design and backend to integrate APIs into the interface.",
      "Supported browser testing, bug fixes, and launch polish.",
    ],
    achievements: [
      "Delivered client-facing websites with consistent, production-ready UI.",
      "Built a foundation in React component architecture used in later roles.",
      "Improved page performance and responsive behaviour across devices.",
    ],
    technologies: ["React", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"],
    areas: [
      "Interface engineering",
      "Responsive layout",
      "Component design",
      "Client delivery",
    ],
  },
] as const;

export type ExperienceItem = (typeof experience)[number];
export type ExperienceIcon = ExperienceItem["icon"];
