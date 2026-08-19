import { cn } from "@/lib/cn";
import type { SkillIconName } from "@/data/skills";

type IconProps = {
  className?: string;
};

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} fill="none" aria-hidden>
      {children}
    </svg>
  );
}

const icons: Record<SkillIconName, (props: IconProps) => React.ReactNode> = {
  nextjs: ({ className }) => (
    <Svg className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 15.5 16.2 8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15.2 15.6V8.8" stroke="currentColor" strokeWidth="1.6" />
    </Svg>
  ),
  react: ({ className }) => (
    <Svg className={className}>
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" stroke="currentColor" strokeWidth="1.4" />
    </Svg>
  ),
  typescript: ({ className }) => (
    <Svg className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 13h4.4M10.2 13v5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 15.2c.4-.7 1.1-1.1 2-.9.8.2 1.2.8 1.2 1.5 0 1.4-2.4 1.2-2.4 2.4V19" stroke="currentColor" strokeWidth="1.5" />
    </Svg>
  ),
  javascript: ({ className }) => (
    <Svg className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 11v6.2c0 1-.5 1.6-1.5 1.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13 14.2c.4-.8 1.2-1.2 2.1-1 .9.2 1.3.9 1.3 1.7 0 1.6-2.6 1.4-2.6 2.8V19" stroke="currentColor" strokeWidth="1.5" />
    </Svg>
  ),
  html: ({ className }) => (
    <Svg className={className}>
      <path d="M5 4h14l-1.2 15.2L12 21l-5.8-1.8L5 4Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 8h7l-.4 9L12 18.2 9 17l-.2-4h2.4" stroke="currentColor" strokeWidth="1.4" />
    </Svg>
  ),
  css: ({ className }) => (
    <Svg className={className}>
      <path d="M5 4h14l-1.2 15.2L12 21l-5.8-1.8L5 4Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.6 8h6.8l-.5 4.2H10" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9.2 16.8 12 17.6l2.7-.8.3-2.6h-2.2" stroke="currentColor" strokeWidth="1.4" />
    </Svg>
  ),
  tailwind: ({ className }) => (
    <Svg className={className}>
      <path
        d="M6.5 13c1.8-4 3.5-6 5.5-6 2 0 3 1.5 4.5 1.5S19 7 19.5 8.5C18 12.2 16.2 14 14 14c-2 0-3-1.5-4.5-1.5S7 14 6.5 13Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </Svg>
  ),
  redux: ({ className }) => (
    <Svg className={className}>
      <path d="M7 15.5c-2-1.4-2.6-3.7-1.2-5.6C7.4 7.6 10 7 12.4 8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16.8 9c2.1 1.2 2.8 3.6 1.5 5.6-1.5 2.3-4.2 2.8-6.6 1.8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12.2 18.6c-2.4.7-4.8-.6-5.8-2.8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12.4" cy="8" r="1.2" fill="currentColor" />
      <circle cx="16.8" cy="9" r="1.2" fill="currentColor" />
      <circle cx="7.2" cy="15.4" r="1.2" fill="currentColor" />
    </Svg>
  ),
  dotnet: ({ className }) => (
    <Svg className={className}>
      <rect x="3.5" y="6" width="17" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 15V9h2.4a2 2 0 0 1 0 4H8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 9v6M14 12h3" stroke="currentColor" strokeWidth="1.5" />
    </Svg>
  ),
  csharp: ({ className }) => (
    <Svg className={className}>
      <path d="M8.2 7.2 4.8 12l3.4 4.8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15.8 7.2 19.2 12l-3.4 4.8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13.4 9.2v5.6M15.2 9.2v5.6M12.6 11h3.8M12.6 13h3.8" stroke="currentColor" strokeWidth="1.4" />
    </Svg>
  ),
  nodejs: ({ className }) => (
    <Svg className={className}>
      <path d="M12 3.5 19.5 8v8L12 20.5 4.5 16V8L12 3.5Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 10.5v3.2c0 1.4.8 2 2.1 2.4" stroke="currentColor" strokeWidth="1.5" />
    </Svg>
  ),
  api: ({ className }) => (
    <Svg className={className}>
      <path d="M8 8H6.2A2.2 2.2 0 0 0 4 10.2v3.6A2.2 2.2 0 0 0 6.2 16H8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 8h1.8A2.2 2.2 0 0 1 20 10.2v3.6A2.2 2.2 0 0 1 17.8 16H16" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 12h5" stroke="currentColor" strokeWidth="1.6" />
    </Svg>
  ),
  postgres: ({ className }) => (
    <Svg className={className}>
      <ellipse cx="12" cy="8" rx="6.5" ry="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 8v6.2c0 1.8 2.9 3.2 6.5 3.2s6.5-1.4 6.5-3.2V8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 11.2c0 1.8 2.9 3.2 6.5 3.2s6.5-1.4 6.5-3.2" stroke="currentColor" strokeWidth="1.5" />
    </Svg>
  ),
  sql: ({ className }) => (
    <Svg className={className}>
      <rect x="3.5" y="5" width="17" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 15V9.2h2.1c1.2 0 2 .7 2 1.8s-.8 1.8-2 1.8H7.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M14 9.2 16.4 15M16.4 9.2 14 15" stroke="currentColor" strokeWidth="1.4" />
    </Svg>
  ),
  python: ({ className }) => (
    <Svg className={className}>
      <path d="M12 5.5h3.4A2.6 2.6 0 0 1 18 8.1V12H9.2A2.7 2.7 0 0 1 6.5 9.3V8.2A2.7 2.7 0 0 1 9.2 5.5H12Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 18.5H8.6A2.6 2.6 0 0 1 6 15.9V12h8.8a2.7 2.7 0 0 1 2.7 2.7v1.1a2.7 2.7 0 0 1-2.7 2.7H12Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9.7" cy="8" r="0.8" fill="currentColor" />
      <circle cx="14.3" cy="16" r="0.8" fill="currentColor" />
    </Svg>
  ),
  tensorflow: ({ className }) => (
    <Svg className={className}>
      <path d="M12 4v16M12 8l7 3.2v3.2L12 11.8M12 8 5 11.2v3.2L12 11.8" stroke="currentColor" strokeWidth="1.5" />
    </Svg>
  ),
  cnn: ({ className }) => (
    <Svg className={className}>
      <rect x="4" y="7" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="10" y="5" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="16" y="8" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="1.4" />
    </Svg>
  ),
  vision: ({ className }) => (
    <Svg className={className}>
      <path d="M3.8 12s3.2-6 8.2-6 8.2 6 8.2 6-3.2 6-8.2 6-8.2-6-8.2-6Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.5" />
    </Svg>
  ),
  aiapi: ({ className }) => (
    <Svg className={className}>
      <circle cx="6" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="6.5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="17.5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11.2 10.2 7.8M14 7.8 16 11.2M8 12.8l2.2 3.4M16 12.8l-2.2 3.4" stroke="currentColor" strokeWidth="1.4" />
    </Svg>
  ),
  git: ({ className }) => (
    <Svg className={className}>
      <circle cx="8" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10v4M9.8 8.8 14.6 11.4" stroke="currentColor" strokeWidth="1.5" />
    </Svg>
  ),
  github: ({ className }) => (
    <Svg className={className}>
      <path
        d="M12 4.5a7.5 7.5 0 0 0-2.4 14.6c.4.08.5-.17.5-.38v-1.4c-2.1.45-2.5-1-2.5-1-.34-.86-.84-1.1-.84-1.1-.68-.47.05-.46.05-.46.76.05 1.16.78 1.16.78.68 1.16 1.78.82 2.22.63.07-.5.27-.83.48-1.02-1.67-.19-3.42-.84-3.42-3.72 0-.82.29-1.5.77-2.03-.08-.19-.34-.96.07-2 .0-.0 1.26-.4 2.6.98a9 9 0 0 1 4.74 0c1.34-1.38 2.6-.98 2.6-.98.41 1.04.15 1.81.08 2A2.94 2.94 0 0 1 18 10.4c0 2.89-1.76 3.53-3.43 3.72.28.24.52.7.52 1.42v2.1c0 .21.17.46.54.38A7.5 7.5 0 0 0 12 4.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </Svg>
  ),
  docker: ({ className }) => (
    <Svg className={className}>
      <path d="M4 13.5h3V11H4v2.5Zm3.6 0h3V11h-3v2.5Zm3.6 0h3V11h-3v2.5ZM7.6 10.4h3V8h-3v2.4Zm3.6 0h3V8h-3v2.4Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3.5 13.6c.3 3 3.2 5 8.3 5 5.4 0 8.3-2.2 8.7-5.4-1.6-1-2.4-1.6-4.7-1.8" stroke="currentColor" strokeWidth="1.5" />
    </Svg>
  ),
  postman: ({ className }) => (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 13.5 16.5 8 13 17l-1.3-3.2L7 13.5Z" stroke="currentColor" strokeWidth="1.5" />
    </Svg>
  ),
  vscode: ({ className }) => (
    <Svg className={className}>
      <path d="M16.8 4.8 20 7.2v9.6L16.8 19.2 8 13.5 4.8 16 3.5 14.6 7 12 3.5 9.4 4.8 8 8 10.5 16.8 4.8Z" stroke="currentColor" strokeWidth="1.4" />
    </Svg>
  ),
};

export function TechIcon({ name, className }: { name: SkillIconName; className?: string }) {
  return icons[name]({ className });
}
