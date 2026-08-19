import type { Metadata } from "next";

import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/footer/Footer";
import { Navbar } from "@/components/navbar/Navbar";
import { SkipLink } from "@/components/ui/SkipLink";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk with Portfolio AI about a project for ${site.fullName}.`,
};

export default function ContactPage() {
  return (
    <div className="page-shell relative min-h-full">
      <div className="site-grain" />
      <SkipLink />
      <Navbar />
      <main id="main" className="relative mx-auto max-w-6xl overflow-visible px-5 pt-24 pb-16 sm:px-8 lg:px-10">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
