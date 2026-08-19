"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { GitHubIcon } from "@/components/ui/BrandIcons";
import { hasLiveDemo, isPrivateGithub, type Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

const visualClass: Record<Project["accent"], string> = {
  blue: "project-visual-blue",
  violet: "project-visual-violet",
  cyan: "project-visual-cyan",
  navy: "project-visual-navy",
};

type StackCardProps = {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
};

export function StackCard({ project, index, progress, range, targetScale }: StackCardProps) {
  const reduced = usePrefersReducedMotion();
  const scale = useTransform(progress, range, [1, targetScale]);
  const live = hasLiveDemo(project);
  const privateRepo = isPrivateGithub(project);

  return (
    <div className="sticky top-0 flex h-[100svh] items-center justify-center">
      <motion.article
        style={reduced ? { top: `calc(-4vh + ${index * 22}px)` } : { scale, top: `calc(-4vh + ${index * 22}px)` }}
        className="relative -top-[8%] w-[92%] origin-top md:w-[86%] lg:w-[78%] xl:w-[70%]"
        whileHover={reduced ? undefined : { y: -8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="glass-card flex min-h-[520px] flex-col overflow-hidden rounded-[1.8rem] md:min-h-[560px] md:flex-row">
          <div className="relative min-h-[240px] w-full overflow-hidden md:w-[55%]">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover transition duration-500 hover:scale-105"
              />
            ) : (
              <div className={cn("absolute inset-0", visualClass[project.accent])} />
            )}
            <div
              className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-0 transition hover:opacity-30"
              style={{ backgroundColor: project.color }}
            />
            <div className="absolute top-4 left-4 rounded-full bg-[#04081a]/75 px-3 py-1 text-xs font-medium text-white backdrop-blur md:top-6 md:left-6">
              Project {index + 1}
            </div>
          </div>

          <div className="flex w-full flex-col justify-between p-6 md:w-[45%] md:p-8 lg:p-10">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: project.color }} />
                <span className="h-px w-16 bg-white/15" />
              </div>
              <h3 className="font-display text-2xl text-foreground lg:text-3xl">{project.title}</h3>
              <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted md:text-base">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="rounded-md bg-white/5 px-2 py-1 text-xs text-foreground">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 ? (
                  <span className="rounded-md bg-white/5 px-2 py-1 text-xs text-muted">
                    +{project.technologies.length - 3} more
                  </span>
                ) : null}
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-5 h-px w-full bg-white/10" />
              <div className="flex flex-wrap items-center gap-4">
                {!privateRepo && project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium"
                    style={{ color: project.color }}
                  >
                    <GitHubIcon className="h-4 w-4" />
                    Code
                  </a>
                ) : (
                  <span className="text-sm text-muted">Private source</span>
                )}
                {live && project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium"
                    style={{ color: project.color }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live
                  </a>
                ) : (
                  <span className="text-sm text-muted">Demo not available</span>
                )}
                <Link
                  href={`/projects/${project.slug}`}
                  className="ml-auto inline-flex items-center gap-2 rounded-lg bg-cyan px-4 py-2 text-sm text-slate-950 transition hover:bg-cyan/85"
                >
                  Details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

type ProjectStackProps = {
  items: Project[];
};

export function ProjectStack({ items }: ProjectStackProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="relative">
      {items.map((project, index) => (
        <StackCard
          key={project.slug}
          project={project}
          index={index}
          progress={scrollYProgress}
          range={[index / items.length, 1]}
          targetScale={1 - (items.length - index) * 0.035}
        />
      ))}
    </div>
  );
}
