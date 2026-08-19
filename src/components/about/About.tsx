"use client";

import {
  BrainCircuit,
  Database,
  Layers,
  MonitorSmartphone,
  Network,
  Server,
} from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SawadHeading } from "@/components/ui/SawadHeading";
import { site } from "@/data/site";

const focusIcons = [Layers, BrainCircuit, MonitorSmartphone, Server, Database, Network];

export function About() {
  const [lead, ...rest] = site.about.paragraphs;

  return (
    <section id="about" className="home-section">
      <Reveal direction="right">
        <SawadHeading line1="ABOUT" line2="ME" className="mb-10" />
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
        <div>
          <Reveal direction="right">
            <p className="text-lg leading-relaxed font-medium text-white">{lead}</p>
          </Reveal>
          <div className="mt-5 space-y-4">
            {rest.map((paragraph, index) => (
              <Reveal key={paragraph} delay={0.08 + index * 0.06} direction="right">
                <p className="text-base leading-relaxed text-[#888]">{paragraph}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.22}>
            <blockquote className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a] p-5">
              <span className="absolute top-0 left-0 h-full w-1 bg-[#ff5c00]" />
              <p className="pl-3 text-sm leading-relaxed text-[#ccc]">
                I turn architecture, interface, and applied AI into products that hold up in
                production — not demos that only look intelligent.
              </p>
            </blockquote>
          </Reveal>
        </div>

        <Reveal delay={0.1} direction="scale">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {site.about.focus.map((item, index) => {
              const Icon = focusIcons[index] ?? Layers;
              return (
                <li key={item}>
                  <article className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1a1a1a] px-4 py-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-[#ff5c00]/40 hover:bg-[#222]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff5c00]/12 text-[#ff5c00] transition group-hover:bg-[#ff5c00] group-hover:text-white">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="text-sm font-medium text-white">{item}</span>
                  </article>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
