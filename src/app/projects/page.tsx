import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Footer } from "@/components/footer/Footer";
import { Navbar } from "@/components/navbar/Navbar";
import { AllProjects } from "@/components/projects/AllProjects";
import { SkipLink } from "@/components/ui/SkipLink";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `All shipped projects by ${site.fullName}, ${site.role}.`,
};

export default function ProjectsPage() {
  return (
    <div className="page-shell relative min-h-full">
      <div className="site-grain" />
      <SkipLink />
      <Navbar />
      <main id="main" className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-28 pb-20 sm:px-8 lg:px-10">
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-[#ff5c00]/50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to home
          </Link>
        </div>
        <AllProjects />
      </main>
      <Footer />
    </div>
  );
}
