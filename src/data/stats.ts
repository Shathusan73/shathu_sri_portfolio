import { getCareerYears } from "@/data/experience";
import { projects } from "@/data/projects";

export type Stat =
  | {
      id: string;
      value: number;
      suffix: string;
      label: string;
      description: string;
    }
  | {
      id: string;
      value: null;
      display: string;
      label: string;
      description: string;
    };

export function getStats(): Stat[] {
  const years = getCareerYears();

  return [
    {
      id: "years",
      value: years,
      suffix: "+",
      label: "Years",
      description: "Software Engineering",
    },
    {
      id: "projects",
      value: projects.length,
      suffix: "+",
      label: "Projects",
      description: "Shipped products",
    },
    {
      id: "stack",
      value: null,
      display: "Full Stack",
      label: "Full Stack",
      description: "Development",
    },
    {
      id: "ai",
      value: null,
      display: "AI",
      label: "AI",
      description: "Focused Development",
    },
  ];
}
