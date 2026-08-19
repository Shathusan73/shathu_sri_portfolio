import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer/Footer";
import { Navbar } from "@/components/navbar/Navbar";
import { ProjectDetailView } from "@/components/projects/ProjectDetailView";
import { SkipLink } from "@/components/ui/SkipLink";
import { getProjectBySlug, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="mesh-bg relative min-h-full">
      <SkipLink />
      <Navbar />
      <main id="main" className="relative z-10">
        <ProjectDetailView project={project} />
      </main>
      <Footer />
    </div>
  );
}
