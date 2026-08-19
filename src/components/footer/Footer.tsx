import Link from "next/link";

import { SocialIcons } from "@/components/ui/SocialIcons";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative z-10 mt-4 border-t border-white/10 bg-[#0d0d0d]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:px-10">
        <div>
          <p className="font-mono text-sm font-bold text-white">{site.logo}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#777]">{site.footer.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#777]">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-[#ff5c00]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <SocialIcons />
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-[#555] sm:px-8 lg:px-10">
          {site.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
