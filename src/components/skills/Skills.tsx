"use client";

import { useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SawadHeading } from "@/components/ui/SawadHeading";
import { TechIcon } from "@/components/ui/TechIcon";
import { skillGroups, type Skill, type SkillGroup } from "@/data/skills";
import { cn } from "@/lib/cn";

const tabLabels = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "ai", label: "AI / ML" },
  { id: "tools", label: "Tools" },
];

export function Skills() {
  const [activeTab, setActiveTab] = useState("all");

  const visibleGroups: SkillGroup[] =
    activeTab === "all"
      ? [...skillGroups]
      : skillGroups.filter((g) => g.id === activeTab);

  const allSkills: Skill[] = visibleGroups.flatMap((g) => [...g.skills]);

  return (
    <section id="skills" className="home-section">
      <Reveal direction="right">
        <SawadHeading line1="PREMIUM" line2="TOOLS" className="mb-8" />
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mb-8 flex flex-wrap gap-2">
          {tabLabels.map((tab, index) => (
            <Reveal key={tab.id} delay={0.1 + index * 0.03} direction="scale">
              <button
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition",
                  activeTab === tab.id
                    ? "border-[#ff5c00] bg-[#ff5c00] text-white"
                    : "border-white/10 bg-transparent text-[#888] hover:border-white/25 hover:text-white",
                )}
              >
                {tab.label}
              </button>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-3">
        {allSkills.map((skill, index) => (
          <Reveal key={skill.name} delay={index * 0.03} direction="scale">
            <article className="tool-card group flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#ff5c00] transition group-hover:bg-[#ff5c00] group-hover:text-white">
                <TechIcon name={skill.icon} />
              </div>
              <div className="min-w-0">
                <h4 className="truncate text-sm font-semibold text-white">{skill.name}</h4>
                <p className="truncate text-xs text-[#555]">
                  {skill.description.split(",")[0]}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
