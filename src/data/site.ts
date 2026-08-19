export const site = {
  name: "Sritharar Shathusan",
  shortName: "Shathusan",
  fullName: "Sritharar Shathusan",
  role: "Software Engineer",
  flipWords: ["Software Engineer", "Full Stack", "Next.js", "Applied AI"],
  logo: "<SHATHUSAN />",
  headline: "Building Intelligent Digital Experiences with Modern Technology",
  summary:
    "Software Engineer with experience in designing and developing scalable web applications, AI-powered solutions, and modern digital products.",
  about: {
    title: "About Me",
    paragraphs: [
      "I am a Software Engineer focused on building products that are reliable in production, clear in architecture, and considered in the details. My work spans full-stack web development, AI-powered applications, and the systems that connect them.",
      "On the frontend, I design modern interfaces with Next.js, React, and TypeScript. On the backend, I build APIs and services with .NET, Node.js, and PostgreSQL. Across both, I care about scalable architecture, maintainable code, and software that holds up as products grow.",
      "I am especially interested in applied AI — computer vision, image classification, and intelligent APIs — and in turning those models into useful product features rather than isolated experiments.",
    ],
    focus: [
      "Full-stack web development",
      "AI-powered applications",
      "Modern frontend development",
      "Backend API development",
      "Database design",
      "Scalable application architecture",
    ],
  },
  contact: {
    headline: "Let's Build Something Great Together",
    supporting:
      "I'm open to software engineering opportunities, AI-focused projects, and collaborations. Chat with Portfolio AI — details are sent to WhatsApp only after you confirm, and nothing is stored.",
    email: "srishathu07@gmail.com",
    phone: "0701455259",
    phoneHref: "tel:+94701455259",
    location: "Jaffna, Sri Lanka",
    availability: "Available for remote and hybrid roles",
  },
  footer: {
    tagline: "Software Engineer building modern digital experiences.",
    copyright: "© 2026 Sritharar Shathusan. All rights reserved.",
  },
  cvHref: "/cv",
  profileImage: "/profile.png",
  url: "https://srishathu.dev",
} as const;

export type Site = typeof site;
