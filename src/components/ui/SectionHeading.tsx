import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p
        className={cn(
          "font-mono text-[11px] tracking-[0.28em] uppercase",
          tone === "dark" ? "text-cyan-200/80" : "text-cyan",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]",
          tone === "dark" ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-slate-300" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
