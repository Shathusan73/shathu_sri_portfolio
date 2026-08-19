"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SawadHeading } from "@/components/ui/SawadHeading";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="home-section">
      <Reveal direction="right">
        <SawadHeading line1="WORK" line2="EXPERIENCE" className="mb-8" />
      </Reveal>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        {experience.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.08} direction="right">
            <article className="sawad-row px-5 py-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold tracking-widest text-[#666] uppercase">
                      {item.period}
                    </span>
                    {item.current ? (
                      <span className="rounded-full bg-[#ff5c00]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#ff5c00]">
                        Current
                      </span>
                    ) : null}
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.role}</h3>
                  <p className="mt-1 text-sm font-medium text-[#ff5c00]">{item.organisation}</p>
                  <p className="mt-0.5 text-sm text-[#666]">
                    {item.location} · {item.duration}
                  </p>
                </div>
              </div>
              <p className="mt-4 border-l-2 border-[#ff5c00]/40 pl-4 text-sm leading-relaxed text-[#888]">
                {item.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.technologies.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#aaa]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
