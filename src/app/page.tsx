import { ActivitySection } from "@/components/activity-section";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProjectGrid } from "@/components/project-grid";
import { SectionHeading } from "@/components/section-heading";
import { Timeline } from "@/components/timeline";
import { experience, projects } from "@/data/resume";
import { getGitHubActivity } from "@/lib/github";

export const revalidate = 3600;

export default async function Home() {
  const activity = await getGitHubActivity();
  const sectionIndex = (n: number) => String(activity ? n : n - 1).padStart(2, "0");

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6">
        <Hero activity={activity} />

        <section id="projects" className="py-16">
          <SectionHeading index="01" title="Featured projects" />
          <ProjectGrid projects={projects} />
        </section>

        {activity && <ActivitySection activity={activity} index="02" />}

        <section id="experience" className="py-16">
          <SectionHeading index={sectionIndex(3)} title="Experience" />
          <Timeline items={experience} />
        </section>

        <Contact index={sectionIndex(4)} />
      </main>
      <Footer layout="desktop" />
    </>
  );
}
