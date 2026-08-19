"use client";

import { ArrowUpRight, Globe, Mail, Phone } from "lucide-react";

import { FiverrIcon, GitHubIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { social } from "@/data/social";

type IconComponent = React.FC<{ className?: string }>;

const platformMeta: Record<string, { icon: IconComponent; color: string; description: string }> = {
  github: {
    icon: GitHubIcon,
    color: "text-white",
    description: "Open-source work, project repositories, and engineering activity.",
  },
  website: {
    icon: Globe as IconComponent,
    color: "text-white",
    description: "Personal site and selected product work.",
  },
  fiverr: {
    icon: FiverrIcon,
    color: "text-[#1DBF73]",
    description: "Hire me for websites, product UI, and software gigs.",
  },
  email: {
    icon: Mail as IconComponent,
    color: "text-cyan",
    description: "Reach me directly for collaborations and opportunities.",
  },
  phone: {
    icon: Phone as IconComponent,
    color: "text-cyan",
    description: "Call or message for roles and project discussions.",
  },
};

export function Profiles() {
  return (
    <section id="profiles" className="relative py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="08 — Web Presence"
            title="Find Me Online"
            description="Connect across platforms for professional networking, open-source collaboration, or just to say hello."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {social.map((item, index) => {
            const meta = platformMeta[item.id];
            if (!meta) return null;
            const Icon = meta.icon;
            return (
              <Reveal key={item.id} delay={index * 0.07}>
                <a
                  href={item.href}
                  target={item.id === "email" ? undefined : "_blank"}
                  rel={item.id === "email" ? undefined : "noopener noreferrer"}
                  className="glass-card glass-card-hover group flex flex-col justify-between rounded-[1.4rem] p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className={`${meta.color} transition group-hover:scale-110`}>
                      <Icon className="h-8 w-8" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-muted transition group-hover:text-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div className="mt-6">
                    <p className="text-lg font-semibold text-foreground">{item.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{meta.description}</p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-8 text-center font-mono text-xs text-muted/60">
            You can explore further by clicking on any of the profile cards above.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
