"use client";

import { NeuralScene } from "@/components/three/NeuralScene";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { engineeringPipeline, engineeringTech } from "@/data/engineering";

export function EngineeringAI() {
  return (
    <section id="engineering" className="relative overflow-hidden py-20 text-white sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-violet/20 blur-3xl" />
      </div>
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="05 — Applied intelligence"
            title="Engineering & AI"
            description="I care about the full path from data to a feature someone can actually use — not a model that lives only in a notebook."
            tone="dark"
          />
        </Reveal>
        <div className="mt-10 overflow-hidden rounded-[2rem] border border-cyan/20 bg-[radial-gradient(circle_at_center,rgb(8_145_178_/_0.16),transparent_58%)] shadow-[0_0_80px_-24px_rgb(34_211_238_/_0.55)]">
          <NeuralScene />
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-5">
          {engineeringPipeline.map((node, index) => (
            <Reveal key={node.id} delay={index * 0.06}>
              <article className="glass-card glass-card-hover rounded-2xl p-4">
                <p className="font-mono text-[10px] tracking-[0.24em] text-cyan-200 uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-medium">{node.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{node.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2">
            {engineeringTech.map((tech) => (
              <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
