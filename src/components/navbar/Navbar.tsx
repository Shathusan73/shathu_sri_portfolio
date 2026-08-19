"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Home,
  FolderOpen,
  Briefcase,
  Wrench,
  GraduationCap,
  Mail,
  Menu,
  X,
  User,
} from "lucide-react";

import { site } from "@/data/site";
import { cn } from "@/lib/cn";

const navItems = [
  { label: "Home", href: "/#home", icon: Home },
  { label: "About", href: "/#about", icon: User },
  { label: "Projects", href: "/#projects", icon: FolderOpen },
  { label: "Experience", href: "/#experience", icon: Briefcase },
  { label: "Skills", href: "/#skills", icon: Wrench },
  { label: "Education", href: "/#education", icon: GraduationCap },
  { label: "Contact", href: "/#contact", icon: Mail },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("/#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const sections = navItems.map((n) => n.href.replace("/#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`/#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 flex justify-center transition-all duration-300 pt-4",
      )}
    >
      {/* Desktop pill navbar */}
      <nav
        aria-label="Primary"
        className={cn(
          "hidden lg:flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-300",
          scrolled
            ? "bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 shadow-xl"
            : "bg-[#1a1a1a]/60 backdrop-blur-md border border-white/8",
        )}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              onClick={() => setActive(item.href)}
              className={cn(
                "group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200",
                isActive
                  ? "bg-[#ff5c00] text-white"
                  : "text-[#888] hover:text-white hover:bg-white/10",
              )}
            >
              <Icon className="h-4 w-4" />
              {/* Tooltip */}
              <span className="pointer-events-none absolute top-full mt-2 whitespace-nowrap rounded-md bg-[#222] px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile hamburger */}
      <div className="flex lg:hidden items-center justify-between w-full px-5">
        <span className="font-mono text-sm font-bold text-white">{site.shortName.toUpperCase()}</span>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-x-0 top-full mt-1 border-t border-white/10 bg-[#111]/95 px-5 py-6 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-[#888] hover:text-white hover:bg-white/5 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
