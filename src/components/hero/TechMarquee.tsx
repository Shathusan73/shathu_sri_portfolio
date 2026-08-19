"use client";

import { skillGroups } from "@/data/skills";

const names = skillGroups.flatMap((group) => group.skills.map((skill) => skill.name));
const loop = [...names, ...names];

export function TechMarquee() {
  return (
    <div className="group relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a] py-3.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-[#1a1a1a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-[#1a1a1a] to-transparent" />
      <div className="marquee-track group-hover:[animation-play-state:paused]">
        {loop.map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="mx-5 font-mono text-[11px] tracking-[0.22em] text-[#888] uppercase"
          >
            {name}
            <span className="ml-5 text-[#ff5c00]">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
