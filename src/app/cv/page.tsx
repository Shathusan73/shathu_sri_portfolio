import type { Metadata } from "next";

import { PrintButton } from "@/components/cv/PrintButton";
import { Footer } from "@/components/footer/Footer";
import { Navbar } from "@/components/navbar/Navbar";
import { SkipLink } from "@/components/ui/SkipLink";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { site } from "@/data/site";
import { social } from "@/data/social";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description: `Curriculum vitae for ${site.fullName}, ${site.role}.`,
};

export default function CvPage() {
  return (
    <div className="bg-background min-h-full">
      <SkipLink />
      <Navbar />
      <main id="main" className="mx-auto max-w-3xl px-5 pt-28 pb-20 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs tracking-[0.24em] text-cyan uppercase">{site.role}</p>
            <h1 className="font-display mt-2 text-4xl font-semibold text-foreground">{site.fullName}</h1>
            <p className="mt-3 max-w-xl text-muted">{site.summary}</p>
          </div>
          <PrintButton />
        </div>
        <section className="mt-8 flex flex-wrap gap-4 text-sm text-muted">
          <span>{site.contact.location}</span>
          {social.map((item) => (
            <a key={item.id} href={item.href} className="underline-offset-2 hover:text-cyan hover:underline">
              {item.handle}
            </a>
          ))}
        </section>
        <CvSection title="Experience">
          {experience.map((item) => (
            <article key={item.id} className="mt-5">
              <h3 className="font-medium text-foreground">
                {item.role} — {item.organisation}
              </h3>
              <p className="text-sm text-muted">
                {item.period} · {item.duration} · {item.location}
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                {item.responsibilities.slice(0, 4).map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </article>
          ))}
        </CvSection>
        <CvSection title="Selected projects">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
            <article key={project.slug} className="mt-4">
              <h3 className="font-medium text-foreground">{project.title}</h3>
              <p className="text-sm text-muted">{project.summary}</p>
              <p className="mt-1 text-xs text-muted">{project.technologies.join(" · ")}</p>
            </article>
          ))}
        </CvSection>
        <CvSection title="Skills">
          {skillGroups.map((group) => (
            <p key={group.id} className="mt-2 text-sm text-muted">
              <span className="font-medium text-foreground">{group.title}: </span>
              {group.skills.map((skill) => skill.name).join(", ")}
            </p>
          ))}
        </CvSection>
        <CvSection title="Education">
          {education.map((item) => (
            <article key={item.id} className="mt-4">
              <h3 className="font-medium text-foreground">{item.title}</h3>
              <p className="text-sm text-muted">{item.institution}</p>
              <p className="text-sm text-muted">{item.period}</p>
              <p className="mt-1 text-xs text-muted">{item.achievements.join(" · ")}</p>
            </article>
          ))}
        </CvSection>
      </main>
      <Footer />
    </div>
  );
}

function CvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-line pt-6">
      <h2 className="font-display text-xl text-foreground">{title}</h2>
      {children}
    </section>
  );
}
