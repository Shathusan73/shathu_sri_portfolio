"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ProjectCover } from "@/components/projects/CardProject";
import { Reveal } from "@/components/ui/Reveal";
import { SawadHeading } from "@/components/ui/SawadHeading";
import { projects } from "@/data/projects";

const INITIAL_VISIBLE = 5;

export function Projects() {
  const sorted = [...projects].sort((a, b) =>
    a.featured === b.featured ? 0 : a.featured ? -1 : 1,
  );
  const featured = sorted.find((project) => project.featured) ?? sorted[0];
  const rest = sorted.filter((project) => project.slug !== featured?.slug);
  const visible = rest.slice(0, INITIAL_VISIBLE);

  if (!featured) return null;

  return (
    <section id="projects" className="home-section">
      <Reveal direction="right">
        <SawadHeading line1="RECENT" line2="PROJECTS" className="mb-8" />
      </Reveal>

      <Reveal direction="scale">
        <Link
          href={`/projects/${featured.slug}`}
          className="project-card group mb-6 grid overflow-hidden lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
        >
          <div className="relative bg-[#111]">
            <ProjectCover project={featured} priority sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>
          <div className="flex flex-col p-6 sm:p-8">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-[#ff5c00] uppercase">
              Featured · {featured.eyebrow ?? featured.technologies[0]}
            </p>
            <h3 className="mt-3 max-w-xl text-2xl font-bold text-white sm:text-3xl">{featured.title}</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#aaa]">{featured.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {featured.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
              View case study
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </Link>
      </Reveal>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        {visible.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.04} direction="right">
            <Link
              href={`/projects/${project.slug}`}
              className="sawad-row group flex cursor-pointer items-center gap-4 px-4 py-4 sm:gap-5 sm:px-5"
            >
              <span
                className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold sm:flex"
                style={{
                  background: `${project.color}22`,
                  color: project.color,
                  border: `1px solid ${project.color}44`,
                }}
              >
                {String(index + 2).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[11px] font-semibold tracking-widest text-[#666] uppercase">
                  {project.eyebrow ?? project.technologies[0]}
                </p>
                <h3 className="truncate text-base font-bold text-white transition-colors group-hover:text-[#ff5c00] sm:text-lg">
                  {project.title}
                </h3>
                <p className="mt-0.5 line-clamp-1 text-sm text-[#666]">{project.summary}</p>
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[#ff5c00] opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.08} className="mt-6 flex justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:border-[#ff5c00]/50"
        >
          Show all {sorted.length} projects
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </Reveal>
    </section>
  );
}
