export const philosophy = [
  {
    step: "01",
    title: "Understand",
    description:
      "Understand the business problem and user requirements before writing a line of production code.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Create scalable architecture and intuitive user experiences that can grow with the product.",
  },
  {
    step: "03",
    title: "Develop",
    description:
      "Build clean, maintainable and high-performance software with clear contracts and strong types.",
  },
  {
    step: "04",
    title: "Improve",
    description:
      "Test, optimize and continuously improve the product once it is in the hands of real users.",
  },
] as const;

export type PhilosophyStep = (typeof philosophy)[number];
