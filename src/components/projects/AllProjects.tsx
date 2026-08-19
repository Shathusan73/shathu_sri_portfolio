"use client";

import { useMemo, useState } from "react";

import { CardProject } from "@/components/projects/CardProject";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { Reveal } from "@/components/ui/Reveal";
import { SawadHeading } from "@/components/ui/SawadHeading";
import { hasLiveDemo, projects } from "@/data/projects";
import { cn } from "@/lib/cn";

const tabLabels = [
  { id: "all", label: "All" },
  { id: "featured", label: "Featured" },
  { id: "live", label: "Live" },
] as const;

type TabId = (typeof tabLabels)[number]["id"];

export function AllProjects() {
  const [activeTab, setActiveTab] = useState<TabId>("all");

  const sorted = useMemo(
    () => [...projects].sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1)),
    [],
  );

  const visible = useMemo(() => {
    if (activeTab === "featured") return sorted.filter((project) => project.featured);
    if (activeTab === "live") return sorted.filter(hasLiveDemo);
    return sorted;
  }, [activeTab, sorted]);

  return (
    <section>
      <Reveal direction="right">
        <SawadHeading line1="ALL" line2="PROJECTS" className="mb-6" />
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-[#888]">
            Every shipped product in one place — applied AI, marketplaces, brand sites, and
            operational tools.
          </p>
          <p className="shrink-0 font-mono text-xs tracking-[0.18em] text-[#666] uppercase">
            {String(visible.length).padStart(2, "0")} projects
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.07}>
        <div className="mb-8">
          <ProjectExplorer />
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div
          role="tablist"
          aria-label="Filter projects"
          className="mb-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabLabels.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition",
                  active
                    ? "bg-[#ff5c00] text-white shadow-[0_10px_24px_-12px_rgb(255_92_0_/_0.8)]"
                    : "border border-white/10 bg-[#1a1a1a] text-[#888] hover:border-white/25 hover:text-white",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      <div
        key={activeTab}
        className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {visible.map((project, index) => (
          <Reveal
            key={project.slug}
            delay={Math.min(index * 0.03, 0.24)}
            direction="scale"
            className="h-full min-w-0"
          >
            <CardProject project={project} index={index + 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
