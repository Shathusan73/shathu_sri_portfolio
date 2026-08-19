"use client";

import { ArrowLeft, ChevronRight, Code2, ExternalLink, Layers, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { hasLiveDemo, isPrivateGithub, type Project } from "@/data/projects";
import { cn } from "@/lib/cn";

const visualClass: Record<Project["accent"], string> = {
  blue: "project-visual-blue",
  violet: "project-visual-violet",
  cyan: "project-visual-cyan",
  navy: "project-visual-navy",
};

export function ProjectDetailView({ project }: { project: Project }) {
  const live = hasLiveDemo(project);
  const privateRepo = isPrivateGithub(project);
  const [privateNotice, setPrivateNotice] = useState(false);
  const [explainTrigger, setExplainTrigger] = useState(0);

  function explainThisProject() {
    setExplainTrigger((count) => count + 1);
    window.requestAnimationFrame(() => {
      document.getElementById("project-explorer")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-5 pt-28 pb-20 sm:px-8 lg:px-10">
      <div className="mb-10 flex flex-wrap items-center gap-3 text-sm">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-foreground transition hover:border-cyan/40"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <span className="inline-flex items-center gap-1 text-muted">
          <Link href="/projects" className="hover:text-foreground">
            Projects
          </Link>{" "}
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{project.title}</span>
        </span>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="font-mono text-[11px] tracking-[0.24em] text-cyan uppercase">
            {project.eyebrow ?? "Case study"}
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold text-foreground sm:text-5xl">{project.title}</h1>
          <div className="mt-4 h-1 w-20 rounded-full bg-linear-to-r from-cyan to-violet" />
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">{project.description}</p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="glass-card rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-cyan/10 p-2 text-cyan">
                  <Code2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-2xl text-foreground">{project.technologies.length}</p>
                  <p className="text-xs text-muted">Technologies</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-violet/10 p-2 text-violet">
                  <Layers className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-2xl text-foreground">{project.features.length}</p>
                  <p className="text-xs text-muted">Key features</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {live && project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan/25 bg-cyan/10 px-5 py-3 text-sm font-medium text-cyan"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            ) : (
              <span className="rounded-xl border border-white/10 px-5 py-3 text-sm text-muted">
                Demo not available
              </span>
            )}
            {privateRepo ? (
              <button
                type="button"
                onClick={() => setPrivateNotice(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-foreground"
              >
                <GitHubIcon className="h-4 w-4" />
                GitHub
              </button>
            ) : (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-foreground"
              >
                <GitHubIcon className="h-4 w-4" />
                GitHub
              </a>
            )}
            <button
              type="button"
              onClick={explainThisProject}
              className="inline-flex items-center gap-2 rounded-xl bg-[#ff5c00] px-5 py-3 text-sm font-medium text-white shadow-[0_14px_32px_-14px_rgb(255_92_0/0.85)] transition hover:bg-[#ff7a2e]"
            >
              <Sparkles className="h-4 w-4" />
              Explain this project
            </button>
          </div>
          {privateNotice ? (
            <p className="mt-3 text-sm text-muted">Source code for this project is private.</p>
          ) : null}

          <div className="mt-10">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Code2 className="h-5 w-5 text-cyan" />
              Technologies used
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-xl border border-cyan/15 bg-cyan/5 px-3 py-2 text-sm text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-lift">
            {project.image ? (
              project.imageWidth && project.imageHeight ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={project.imageWidth}
                  height={project.imageHeight}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full object-contain"
                  priority
                />
              ) : (
                <div className="relative aspect-16/10">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
              )
            ) : (
              <div className={cn("relative aspect-16/10", visualClass[project.accent])} />
            )}
          </div>
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Star className="h-5 w-5 text-cyan" />
              Key features
            </h2>
            <ul className="mt-4 space-y-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 rounded-xl p-2.5 text-sm text-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-linear-to-r from-cyan to-violet" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <ProjectExplorer initialSlug={project.slug} locked trigger={explainTrigger} />
      </div>
    </div>
  );
}
