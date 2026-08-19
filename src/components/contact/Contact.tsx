"use client";

import { ArrowUpRight, CheckCircle2, Copy, Globe, Mail, MapPin } from "lucide-react";
import { useState } from "react";

import { AIContactAgent } from "@/components/ai-contact/AIContactAgent";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SawadHeading } from "@/components/ui/SawadHeading";
import { site } from "@/data/site";
import { social } from "@/data/social";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="contact" className="home-section">
      <Reveal direction="right">
        <SawadHeading line1="LET'S WORK" line2="TOGETHER" className="mb-4" />
      </Reveal>
      <Reveal delay={0.06} direction="right">
        <p className="mb-10 max-w-xl text-base leading-relaxed text-[#9a9a9a]">
          Tell my AI assistant what you&apos;re looking for.
        </p>
      </Reveal>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <Reveal delay={0.08} direction="right">
            <p className="max-w-md text-base leading-relaxed text-[#9a9a9a]">{site.contact.supporting}</p>
          </Reveal>

          <Reveal delay={0.1} direction="right">
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#c8f900]/20 bg-[#c8f900]/10 px-3 py-1.5 text-xs font-medium text-[#c8f900]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c8f900] opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c8f900]" />
              </span>
              {site.contact.availability}
            </div>
          </Reveal>

          <div className="mt-6 space-y-3">
            <Reveal delay={0.12} direction="right">
              <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 transition hover:border-[#ff5c00]/40">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ff5c00]/12 text-[#ff5c00]">
                  <Mail className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold tracking-widest text-[#666] uppercase">Email</p>
                  <a href={`mailto:${site.contact.email}`} className="block truncate text-sm text-white">
                    {site.contact.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 px-3 text-[11px] font-medium text-[#aaa] transition hover:border-[#ff5c00]/40 hover:text-white"
                  aria-label="Copy email address"
                >
                  {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-[#c8f900]" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </Reveal>

            {social
              .filter((item) => item.id !== "email")
              .map((item, index) => {
                const Icon = item.id === "github" ? GitHubIcon : Globe;

                return (
                  <Reveal key={item.id} delay={0.16 + index * 0.05} direction="right">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 transition hover:-translate-y-0.5 hover:border-[#ff5c00]/40"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ff5c00]/12 text-[#ff5c00] transition group-hover:bg-[#ff5c00] group-hover:text-white">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-semibold tracking-widest text-[#666] uppercase">
                          {item.label}
                        </span>
                        <span className="block truncate text-sm text-white">{item.handle}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[#555] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ff5c00]" />
                    </a>
                  </Reveal>
                );
              })}
          </div>

          <Reveal delay={0.28} direction="right">
            <p className="mt-6 inline-flex items-center gap-2 text-xs text-[#666]">
              <MapPin className="h-3.5 w-3.5 text-[#ff5c00]" aria-hidden />
              {site.contact.location}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} direction="scale">
          <AIContactAgent />
        </Reveal>
      </div>
    </section>
  );
}
