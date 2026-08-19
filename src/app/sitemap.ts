import type { MetadataRoute } from "next";

import { site } from "@/data/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified: new Date("2026-08-18"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: site.url,
      lastModified: new Date("2026-08-18"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/projects`,
      lastModified: new Date("2026-08-18"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/cv`,
      lastModified: new Date("2026-08-18"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...projectRoutes,
  ];
}
