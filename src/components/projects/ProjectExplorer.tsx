"use client";

import {
  ChevronDown,
  Code2,
  Layers,
  Lightbulb,
  LoaderCircle,
  OctagonAlert,
  Sparkles,
  Trophy,
  UserRound,
  Wrench,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { projects } from "@/data/projects";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import {
  EXPLANATION_KEYS,
  EXPLANATION_LABELS,
  type ExplanationKey,
  type ProjectExplanation,
} from "@/lib/projectExplain";

type ProjectExplorerProps = {
  initialSlug?: string;
  locked?: boolean;
  trigger?: number;
};

const SECTION_META: Record<
  ExplanationKey,
  { icon: typeof Lightbulb; number: string }
> = {
  problem: { icon: OctagonAlert, number: "01" },
  solution: { icon: Lightbulb, number: "02" },
  architecture: { icon: Layers, number: "03" },
  technologies: { icon: Code2, number: "04" },
  contribution: { icon: UserRound, number: "05" },
  challenges: { icon: Wrench, number: "06" },
  results: { icon: Trophy, number: "07" },
};

export function ProjectExplorer({ initialSlug, locked = false, trigger = 0 }: ProjectExplorerProps) {
  const reduced = usePrefersReducedMotion();
  const shipped = useMemo(
    () =>
      projects
        .filter((project) => project.status === "shipped")
        .sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1)),
    [],
  );

  const defaultSlug = shipped.some((project) => project.slug === initialSlug)
    ? initialSlug!
    : (shipped[0]?.slug ?? "");

  const [slug, setSlug] = useState(defaultSlug);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [explanation, setExplanation] = useState<ProjectExplanation | null>(null);

  const selected = shipped.find((project) => project.slug === slug);

  useEffect(() => {
    if (!initialSlug || !shipped.some((project) => project.slug === initialSlug)) return;
    setSlug(initialSlug);
    setExplanation(null);
    setError("");
  }, [initialSlug, shipped]);

  async function explain() {
    if (!slug || pending) return;
    setPending(true);
    setError("");
    setExplanation(null);

    try {
      const response = await fetch("/api/project-explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        message?: string;
        explanation?: ProjectExplanation;
      };
      if (!response.ok || !payload.explanation) {
        throw new Error(payload.message || "Could not explain this project.");
      }
      setExplanation(payload.explanation);
    } catch (caught) {
      setExplanation(null);
      setError(
        caught instanceof Error ? caught.message : "Could not explain this project. Please try again.",
      );
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    if (trigger < 1) return;
    void explain();
    // Run only when the parent asks for a new explanation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  useEffect(() => {
    if (window.location.hash !== "#project-explorer") return;
    void explain();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="project-explorer"
      className="relative scroll-mt-24 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#141414] p-5 sm:p-7"
    >
      <div className="pointer-events-none absolute -top-20 left-10 h-40 w-40 rounded-full bg-[#ff5c00]/18 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 -bottom-16 h-36 w-36 rounded-full bg-[#c8f900]/10 blur-3xl" />

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ff5c00]/25 bg-[#ff5c00]/10 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-[#ff5c00] uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            AI Project Explorer
          </span>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            Explain this project
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#8a8a8a]">
            {locked
              ? "Gemini writes a recruiter-ready brief from this case study — problem, solution, architecture, stack, contribution, challenges, and results."
              : "Choose a product. Gemini writes a recruiter-ready brief from the case-study facts — no invented roles or metrics."}
          </p>
        </div>

        {selected ? (
          <div className="hidden min-w-56 rounded-2xl border border-white/8 bg-[#1a1a1a]/80 px-4 py-3 lg:block">
            <p className="text-[10px] tracking-[0.2em] text-[#666] uppercase">Selected</p>
            <p className="mt-1 truncate text-sm font-medium text-white">{selected.title}</p>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#777]">{selected.summary}</p>
          </div>
        ) : null}
      </div>

      <div className="relative mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        {locked ? null : (
          <div className="relative min-w-0 flex-1">
            <label className="sr-only" htmlFor="project-explorer-select">
              Project
            </label>
            <select
              id="project-explorer-select"
              value={slug}
              onChange={(event) => {
                setSlug(event.target.value);
                setExplanation(null);
                setError("");
              }}
              className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-[#0f0f0f] py-3 pr-11 pl-4 text-sm text-white outline-none transition-colors focus:border-[#ff5c00]/70"
            >
              {shipped.map((project) => (
                <option key={project.slug} value={project.slug}>
                  {project.title}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#777]" />
          </div>
        )}
        <button
          type="button"
          onClick={() => void explain()}
          disabled={pending || !slug}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#ff5c00] px-6 text-sm font-semibold text-white shadow-[0_14px_32px_-14px_rgb(255_92_0/0.85)] transition hover:bg-[#ff7a2e] disabled:opacity-40 sm:min-w-56"
        >
          {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {pending ? "Explaining…" : "Explain this project"}
        </button>
      </div>

      {selected ? (
        <div className="relative mt-4 flex flex-wrap gap-2">
          {selected.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-[11px] text-[#aaa]"
            >
              {tech}
            </span>
          ))}
          {locked ? null : (
            <Link
              href={`/projects/${selected.slug}`}
              className="rounded-full px-2.5 py-1 text-[11px] text-[#ff5c00] transition hover:text-[#ff7a2e]"
            >
              Open case study
            </Link>
          )}
        </div>
      ) : null}

      {error ? (
        <p className="relative mt-5 rounded-xl border border-[#ff5c00]/25 bg-[#ff5c00]/8 px-4 py-3 text-sm text-[#ffb199]">
          {error}
        </p>
      ) : null}

      <AnimatePresence mode="wait">
        {pending ? (
          <motion.div
            key="loading"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0 }}
            className="relative mt-6 grid gap-3 sm:grid-cols-2"
          >
            {EXPLANATION_KEYS.map((key) => (
              <div
                key={key}
                className={cn(
                  "h-28 animate-pulse rounded-2xl border border-white/6 bg-[#1a1a1a]",
                  key === "contribution" && "sm:col-span-2",
                )}
              />
            ))}
          </motion.div>
        ) : explanation ? (
          <motion.div
            key="result"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0 }}
            className="relative mt-6 grid gap-3 sm:grid-cols-2"
          >
            {EXPLANATION_KEYS.map((key) => {
              const Icon = SECTION_META[key].icon;
              return (
                <article
                  key={key}
                  className={cn(
                    "rounded-2xl border border-white/8 bg-[#1a1a1a]/90 p-4 sm:p-5",
                    key === "contribution" && "sm:col-span-2",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#ff5c00]/12 text-[#ff5c00]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <h3 className="text-sm font-semibold text-white">{EXPLANATION_LABELS[key]}</h3>
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.18em] text-[#555]">
                      {SECTION_META[key].number}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#cfcfcf]">{explanation[key]}</p>
                </article>
              );
            })}
          </motion.div>
        ) : (
          <motion.p
            key="idle"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative mt-6 rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-[#666]"
          >
            {locked
              ? "Press Explain this project to generate the seven-section brief."
              : "Select a project, then press Explain this project."}
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
