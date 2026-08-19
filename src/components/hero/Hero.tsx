"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { SkillHighlightCard } from "@/components/hero/SkillHighlightCard";
import { TechMarquee } from "@/components/hero/TechMarquee";
import { Reveal } from "@/components/ui/Reveal";
import { SawadHeading } from "@/components/ui/SawadHeading";
import { site } from "@/data/site";
import { getStats } from "@/data/stats";

export function Hero() {
  const stats = getStats();
  return (
    <section id="home" className="relative pb-4">
      <SawadHeading line1="SOFTWARE" line2="ENGINEER" />

      <Reveal delay={0.1} className="mt-6 max-w-xl">
        <p className="text-base leading-relaxed text-[#9a9a9a] sm:text-lg">{site.summary}</p>
      </Reveal>

      <Reveal delay={0.16} className="mt-7 flex flex-wrap gap-3">
        <Link
          href="/#projects"
          className="btn-shine inline-flex items-center gap-2 rounded-full bg-[#ff5c00] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ff7a2e]"
        >
          View my work
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#ff5c00]/50"
        >
          Get in touch
        </Link>
      </Reveal>

      <Reveal delay={0.2} className="mt-9 grid grid-cols-2 items-stretch gap-3">
        {stats.map((stat, index) => (
          <Reveal key={stat.id} delay={0.22 + index * 0.05} direction="scale" className="h-full">
            <div className="stat-card">
              <p
                className={
                  stat.value === null
                    ? "text-[1.35rem] leading-none font-black tracking-tight text-[#ff5c00] sm:text-[1.65rem]"
                    : "stat-value text-[#ff5c00]"
                }
              >
                {stat.value !== null ? `${stat.suffix}${stat.value}` : stat.display}
              </p>
              <p className="mt-2 text-[11px] font-semibold tracking-widest text-[#888] uppercase">
                {stat.label}
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-[#555]">{stat.description}</p>
            </div>
          </Reveal>
        ))}
      </Reveal>

      <Reveal delay={0.3} className="mt-8 grid grid-cols-2 items-stretch gap-3 sm:gap-4">
        <SkillHighlightCard
          href="/#skills"
          index="01"
          label="Skills"
          title="Full stack"
          subtitle="web development"
          tone="orange"
        />
        <SkillHighlightCard
          href="/#stack"
          index="02"
          label="Stack"
          title="Next.js, React"
          subtitle=".NET, Python, AI"
          tone="lime"
        />
      </Reveal>

      <TechMarquee />
    </section>
  );
}
