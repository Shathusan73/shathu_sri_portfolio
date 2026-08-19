import { About } from "@/components/about/About";
import { Contact } from "@/components/contact/Contact";
import { Education } from "@/components/education/Education";
import { Experience } from "@/components/experience/Experience";
import { Footer } from "@/components/footer/Footer";
import { Hero } from "@/components/hero/Hero";
import { ProfileCard } from "@/components/hero/ProfileCard";
import { Navbar } from "@/components/navbar/Navbar";
import { Projects } from "@/components/projects/Projects";
import { JsonLd } from "@/components/seo/JsonLd";
import { Skills } from "@/components/skills/Skills";
import { Stack } from "@/components/stack/Stack";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SkipLink } from "@/components/ui/SkipLink";

export default function Home() {
  return (
    <div className="page-shell relative min-h-full">
      <div className="site-grain" />
      <div className="pointer-events-none fixed top-[-12rem] left-[20%] h-[28rem] w-[28rem] rounded-full bg-[#ff5c00]/8 blur-[120px]" />
      <SkipLink />
      <CustomCursor />
      <JsonLd />
      <Navbar />
      <main id="main" className="relative overflow-visible pt-16 lg:pt-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <div className="grid items-start gap-10 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-14">
            <div className="lg:sticky lg:top-20 lg:z-10 lg:self-start">
              <ProfileCard />
            </div>
            <div className="min-w-0">
              <Hero />
              <About />
              <Projects />
              <Experience />
              <Skills />
              <Stack />
              <Education />
              <Contact />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
