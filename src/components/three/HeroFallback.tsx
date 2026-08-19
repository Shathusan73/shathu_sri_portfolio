"use client";

import { Code2, Cpu, Database, Sparkles } from "lucide-react";

const chips = [
  { icon: Code2, label: "Next.js" },
  { icon: Cpu, label: "AI Models" },
  { icon: Database, label: "PostgreSQL" },
];

export function HeroFallback() {
  return (
    <div className="relative flex h-full min-h-[360px] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(56_189_248_/_0.28),transparent_42%),radial-gradient(circle_at_80%_70%,rgb(129_140_248_/_0.22),transparent_46%),linear-gradient(160deg,#071525,#0b1f3a_48%,#12315d)]" />
      <div className="relative z-10 w-[min(280px,72%)] rounded-2xl border border-white/15 bg-slate-950/45 p-5 text-white shadow-lift backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs tracking-[0.2em] text-cyan-100 uppercase">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          3D Workspace
        </div>
        <div className="mt-4 h-2 w-24 rounded-full bg-cyan-200/80" />
        <div className="mt-2 h-2 w-40 rounded-full bg-white/35" />
        <div className="mt-2 h-2 w-32 rounded-full bg-white/25" />
        <div className="mt-4 grid grid-cols-3 gap-2">
          {chips.map((chip) => (
            <div key={chip.label} className="rounded-xl bg-white/10 px-2 py-2 text-center text-[10px] text-slate-100">
              <chip.icon className="mx-auto mb-1 h-3.5 w-3.5" aria-hidden />
              {chip.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
