"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SawadHeading } from "@/components/ui/SawadHeading";
import { TechIcon } from "@/components/ui/TechIcon";
import { skillGroups, type SkillIconName } from "@/data/skills";
import { cn } from "@/lib/cn";



const featured = [
  { name: "Next.js", icon: "nextjs" as const },
  { name: "React", icon: "react" as const },
  { name: ".NET", icon: "dotnet" as const },
  { name: "Python", icon: "python" as const },
  { name: "AI", icon: "aiapi" as const },
];

const stackGroups = skillGroups.filter((group) => group.id !== "tools");

export function Stack() {
  return (
    <section id="stack" className="home-section">
      <Reveal direction="right">
        <SawadHeading line1="CORE" line2="STACK" className="mb-8" />
      </Reveal>

      <Reveal delay={0.06}>
        <p className="mb-8 max-w-xl text-base leading-relaxed text-[#888]">
          The production stack I use to ship full-stack products — from Next.js interfaces to .NET
          APIs, PostgreSQL, and applied AI.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mb-8 flex flex-wrap gap-2">
          {featured.map((item) => (
            <span
              key={item.name}
              className="inline-flex items-center gap-2 rounded-full border border-[#c8f900]/25 bg-[#c8f900] px-3 py-2 text-xs font-bold text-[#111]"
            >
              <TechIcon name={item.icon} className="h-3.5 w-3.5" />
              {item.name}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {stackGroups.map((group, index) => (
          <Reveal key={group.id} delay={0.08 + index * 0.05} direction="scale">
            <article
              className={cn(
                "h-full rounded-2xl border border-white/10 bg-[#1a1a1a] p-5",
                index === 0 && "sm:col-span-2",
              )}
            >
              <p className="text-[11px] font-semibold tracking-[0.22em] text-[#ff5c00] uppercase">
                {String(index + 1).padStart(2, "0")} · {group.title}
              </p>
              <p className="mt-2 text-sm text-[#888]">{group.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#111] px-3 py-2 text-sm text-white"
                  >
                    <span className="text-[#ff5c00]">
                      <TechIcon name={skill.icon as SkillIconName} className="h-3.5 w-3.5" />
                    </span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
