export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Interfaces that feel considered, fast, and production-ready.",
    skills: [
      {
        name: "Next.js",
        icon: "nextjs",
        description: "App Router products with server rendering and strong UX.",
      },
      {
        name: "React",
        icon: "react",
        description: "Component architecture, state, and interactive UI systems.",
      },
      {
        name: "TypeScript",
        icon: "typescript",
        description: "Typed contracts that keep large codebases safe to change.",
      },
      {
        name: "JavaScript",
        icon: "javascript",
        description: "Language fundamentals for the modern web platform.",
      },
      {
        name: "HTML5",
        icon: "html",
        description: "Semantic structure, accessibility, and resilient markup.",
      },
      {
        name: "CSS3",
        icon: "css",
        description: "Layout, motion, and visual systems with precision.",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
        description: "Utility-first design systems with consistent spacing and type.",
      },
      {
        name: "Redux",
        icon: "redux",
        description: "Predictable client state for complex product flows.",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "APIs and services designed for clarity, scale, and reliability.",
    skills: [
      {
        name: ".NET",
        icon: "dotnet",
        description: "Backend platforms, APIs, and domain-driven services.",
      },
      {
        name: "C#",
        icon: "csharp",
        description: "Strongly typed server logic and maintainable business rules.",
      },
      {
        name: "Node.js",
        icon: "nodejs",
        description: "JavaScript services, tooling, and lightweight APIs.",
      },
      {
        name: "REST APIs",
        icon: "api",
        description: "Clear resource design, auth, and integration contracts.",
      },
    ],
  },
  {
    id: "database",
    title: "Database",
    description: "Data models that stay truthful as the product evolves.",
    skills: [
      {
        name: "PostgreSQL",
        icon: "postgres",
        description: "Relational design, querying, and production data integrity.",
      },
      {
        name: "SQL",
        icon: "sql",
        description: "Precise data access, reporting, and query performance.",
      },
    ],
  },
  {
    id: "ai",
    title: "AI / Machine Learning",
    description: "Applied intelligence that becomes a product capability.",
    skills: [
      {
        name: "Python",
        icon: "python",
        description: "Model workflows, data processing, and AI service layers.",
      },
      {
        name: "TensorFlow",
        icon: "tensorflow",
        description: "Training and serving models for real product features.",
      },
      {
        name: "CNN",
        icon: "cnn",
        description: "Convolutional networks for visual understanding tasks.",
      },
      {
        name: "Image Classification",
        icon: "vision",
        description: "Categorising visual data to improve search and discovery.",
      },
      {
        name: "AI APIs",
        icon: "aiapi",
        description: "Connecting models to applications through reliable interfaces.",
      },
    ],
  },
  {
    id: "tools",
    title: "Tools & Technologies",
    description: "The everyday craft of shipping software with care.",
    skills: [
      {
        name: "Git",
        icon: "git",
        description: "History, branching, and collaborative delivery.",
      },
      {
        name: "GitHub",
        icon: "github",
        description: "Reviews, issues, and a clean engineering workflow.",
      },
      {
        name: "Docker",
        icon: "docker",
        description: "Reproducible environments and deployable services.",
      },
      {
        name: "Postman",
        icon: "postman",
        description: "API exploration, verification, and contract checking.",
      },
      {
        name: "VS Code",
        icon: "vscode",
        description: "A fast, focused environment for daily engineering work.",
      },
    ],
  },
] as const;

export type SkillIconName = (typeof skillGroups)[number]["skills"][number]["icon"];

export type Skill = {
  name: string;
  icon: SkillIconName;
  description: string;
};

export type SkillGroup = {
  id: (typeof skillGroups)[number]["id"];
  title: string;
  description: string;
  skills: readonly Skill[];
};
