"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { hasLiveDemo, type Project } from "@/data/projects";

export function ProjectCover({
  project,
  priority = false,
  framed = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  project: Project;
  priority?: boolean;
  framed?: boolean;
  sizes?: string;
}) {
  if (!project.image) {
    return (
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(145deg, #141414 0%, ${project.color}66 100%)`,
        }}
      />
    );
  }

  if (!framed && project.imageWidth && project.imageHeight) {
    return (
      <Image
        src={project.image}
        alt={project.title}
        width={project.imageWidth}
        height={project.imageHeight}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full object-contain"
      />
    );
  }

  return (
    <Image
      src={project.image}
      alt={project.title}
      fill
      sizes={sizes}
      priority={priority}
      className={project.imageWidth && project.imageHeight ? "object-contain" : "object-cover"}
    />
  );
}

export function CardProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const live = hasLiveDemo(project);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="project-card group flex h-full min-w-0 flex-col overflow-hidden"
    >
      <div className="relative aspect-16/10 shrink-0 overflow-hidden bg-[#111]">
        <ProjectCover project={project} framed sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="rounded-full bg-[#111]/80 px-2.5 py-1 font-mono text-[10px] tracking-wide text-white uppercase backdrop-blur-sm">
            {String(index).padStart(2, "0")}
          </span>
          {live ? (
            <span className="rounded-full bg-[#c8f900] px-2.5 py-1 text-[10px] font-bold text-[#111] uppercase">
              Live
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
        <p className="truncate text-[11px] font-semibold tracking-[0.18em] text-[#ff5c00] uppercase">
          {project.eyebrow ?? project.technologies[0]}
        </p>
        <h3 className="mt-2 line-clamp-2 min-h-12 text-base font-bold text-white transition-colors group-hover:text-[#ff5c00] sm:text-lg">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-relaxed text-[#777]">{project.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <div className="flex min-w-0 flex-1 flex-nowrap gap-1.5 overflow-hidden">
            {project.technologies.slice(0, 2).map((tech) => (
              <span
                key={tech}
                className="max-w-36 truncate rounded-full border border-white/10 bg-[#111] px-2.5 py-1 text-[11px] text-[#aaa]"
              >
                {tech}
              </span>
            ))}
          </div>
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff5c00]/12 text-[#ff5c00] transition group-hover:bg-[#ff5c00] group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
