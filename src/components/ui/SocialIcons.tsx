import type { ComponentType } from "react";
import { Globe, Mail } from "lucide-react";

import { FiverrIcon, GitHubIcon } from "@/components/ui/BrandIcons";
import { social, type SocialId } from "@/data/social";
import { cn } from "@/lib/cn";

const iconMap: Record<SocialId, ComponentType<{ className?: string }>> = {
  github: GitHubIcon,
  website: Globe,
  fiverr: FiverrIcon,
  email: Mail,
};

type SocialIconsProps = {
  className?: string;
  iconClassName?: string;
};

export function SocialIcons({ className, iconClassName }: SocialIconsProps) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {social.map((item) => {
        const Icon = iconMap[item.id];
        return (
          <li key={item.id}>
            <a
              href={item.href}
              target={item.id === "email" ? undefined : "_blank"}
              rel={item.id === "email" ? undefined : "noopener noreferrer"}
              aria-label={item.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#888] transition hover:border-[#ff5c00]/60 hover:text-[#ff5c00]"
            >
              <Icon className={cn("h-4 w-4", iconClassName)} aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
