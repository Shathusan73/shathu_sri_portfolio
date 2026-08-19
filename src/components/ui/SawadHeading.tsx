"use client";

import { Reveal } from "@/components/ui/Reveal";

type SawadHeadingProps = {
  line1: string;
  line2: string;
  className?: string;
};

export function SawadHeading({ line1, line2, className }: SawadHeadingProps) {
  return (
    <div className={className}>
      <Reveal y={40}>
        <h2 className="sawad-heading text-white">{line1}</h2>
      </Reveal>
      <Reveal y={40} delay={0.08}>
        <h2 className="sawad-heading sawad-heading-ghost">{line2}</h2>
      </Reveal>
    </div>
  );
}
