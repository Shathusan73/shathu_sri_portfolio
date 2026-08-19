export const education = [
  {
    id: "bsc-software-engineering",
    title: "BSc (Hons) Software Engineering",
    institution: "Cardiff Metropolitan University (via ICBT)",
    period: "2024",
    mascot: "🎓",
    description:
      "Honours degree covering advanced software engineering, applied AI, data analytics, and professional practice in IT.",
    achievements: ["First Class", "GPA 3.6"],
    skills: [
      "Advanced Programming",
      "Professional and Ethical Issues in IT",
      "Data Analytics & Business Intelligence",
      "Artificial Intelligence & Computer Intelligence",
      "Software Development Project",
    ],
  },
  {
    id: "hnd-software-engineering",
    title: "Higher National Diploma in Software Engineering",
    institution: "ICBT Campus",
    period: "2022 — 2023",
    mascot: "💻",
    description:
      "Practice-focused diploma covering programming, systems, networks, databases, web and mobile development, and computing projects.",
    achievements: ["Merit", "2.1"],
    skills: [
      "Computer Architecture",
      "Fundamentals in Programming",
      "Business Information Systems",
      "System Analysis and Design",
      "Computer Networks",
      "Database Design and Development",
      "Object Oriented Programming",
      "Professional Practice",
      "Web Application Development",
      "Data Structures and Algorithms",
      "Mobile Application Development",
      "Project Management",
      "Service Oriented Computing",
      "Business Analytics",
      "Computing Project",
    ],
  },
] as const;

export type EducationItem = (typeof education)[number];
