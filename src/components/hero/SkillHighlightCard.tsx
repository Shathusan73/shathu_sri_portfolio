"use client";

import { ArrowUpRight } from "lucide-react";

import { InPageLink } from "@/components/ui/InPageLink";
import { cn } from "@/lib/cn";

type SkillHighlightCardProps = {
  href: string;
  index: string;
  title: string;
  subtitle: string;
  label: string;
  tone: "orange" | "lime";
};

export function SkillHighlightCard({
  href,
  index,
  title,
  subtitle,
  label,
  tone,
}: SkillHighlightCardProps) {
  const lime = tone === "lime";

  return (
    <InPageLink
      href={href}
      ariaLabel={`${label}: ${title} ${subtitle}`}
      className={cn("skill-box group", lime ? "skill-lime" : "skill-orange")}
    >
      <span className="skill-box-index" aria-hidden>
        {index}
      </span>
      <div className="relative z-10 flex h-full min-h-[11.5rem] flex-col p-5 sm:p-6">
        <p
          className={cn(
            "text-[11px] font-semibold tracking-[0.22em] uppercase",
            lime ? "text-[#111]/55" : "text-white/70",
          )}
        >
          {label}
        </p>
        <p
          className={cn(
            "mt-4 text-base leading-tight font-black tracking-tight uppercase sm:text-xl",
            lime && "text-[#111]",
          )}
        >
          {title}
          <span className="mt-1.5 block font-bold">{subtitle}</span>
        </p>
        <div className="mt-auto flex items-center justify-between pt-8">
          <span
            className={cn(
              "text-xs font-semibold tracking-widest uppercase",
              lime ? "text-[#111]/60" : "text-white/70",
            )}
          >
            Explore
          </span>
          <span
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
              lime ? "bg-[#111] text-[#c8f900]" : "bg-white text-[#ff5c00]",
            )}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </InPageLink>
  );
}
