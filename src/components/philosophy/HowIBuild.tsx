"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { philosophy } from "@/data/philosophy";

export function HowIBuild() {
  return (
    <section id="process" className="relative py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="07 — Method"
            title="How I Build"
            description="A simple loop. Understand the problem, design for scale, write software that lasts, then keep improving it."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {philosophy.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.1}>
              <article className="glass-card glass-card-hover h-full rounded-[1.6rem] p-6">
                <p className="font-mono text-sm tracking-[0.22em] text-cyan">{item.step}</p>
                <h3 className="font-display mt-4 text-2xl text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
