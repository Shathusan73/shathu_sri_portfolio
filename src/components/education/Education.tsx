"use client";

import { Award, Calendar, GraduationCap } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SawadHeading } from "@/components/ui/SawadHeading";
import { education } from "@/data/education";
import { cn } from "@/lib/cn";

export function Education() {
  return (
    <section id="education" className="home-section">
      <Reveal direction="right">
        <SawadHeading line1="ACADEMIC" line2="BACKGROUND" className="mb-8" />
      </Reveal>

      <Reveal delay={0.06}>
        <p className="mb-10 max-w-xl text-base leading-relaxed text-[#888]">
          Formal study in software engineering, from diploma-level practice through to honours
          degree work in systems, databases, and full-stack delivery.
        </p>
      </Reveal>

      <ol className="relative space-y-5 before:absolute before:top-3 before:bottom-3 before:left-[19px] before:w-px before:bg-linear-to-b before:from-[#ff5c00] before:via-[#ff5c00]/40 before:to-[#c8f900] sm:before:left-[23px]">
        {education.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.1} direction="right">
            <li className="relative grid gap-4 pl-12 sm:pl-16">
              <span className="absolute top-5 left-0 flex h-10 w-10 items-center justify-center rounded-full border border-[#ff5c00]/40 bg-[#111] text-[#ff5c00] sm:h-12 sm:w-12">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
              </span>

              <article
                className={cn(
                  "rounded-2xl border border-white/10 bg-[#1a1a1a] p-5 sm:p-6",
                  index === 0 && "shadow-[0_18px_40px_-28px_rgb(255_92_0_/_0.45)]",
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] tracking-[0.22em] text-[#ff5c00] uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#111] px-2.5 py-1 text-[11px] text-[#aaa]">
                    <Calendar className="h-3 w-3 text-[#ff5c00]" aria-hidden />
                    {item.period}
                  </span>
                  {index === 0 ? (
                    <span className="rounded-full bg-[#c8f900]/15 px-2.5 py-1 text-[11px] font-semibold text-[#c8f900]">
                      Latest
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-[#ff5c00]">{item.institution}</p>
                <p className="mt-4 border-l-2 border-[#ff5c00]/40 pl-4 text-sm leading-relaxed text-[#888]">
                  {item.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.achievements.map((achievement) => (
                    <span
                      key={achievement}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#ff5c00]/12 px-3 py-1.5 text-xs font-medium text-[#ff5c00]"
                    >
                      <Award className="h-3 w-3" aria-hidden />
                      {achievement}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-[#111] px-3 py-1 text-xs text-[#aaa]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
