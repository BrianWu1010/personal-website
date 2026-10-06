import type { Metadata } from "next";
import Image from "next/image";
import portrait from "@/assets/portrait.jpg";
import { ActivitySection } from "@/components/activity-section";
import { ActivitySummary } from "@/components/activity-summary";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { FileIcon, GitHubIcon } from "@/components/icons";
import { MobileHeader } from "@/components/mobile-header";
import { ProjectGrid } from "@/components/project-grid";
import { SectionHeading } from "@/components/section-heading";
import { Timeline } from "@/components/timeline";
import { experience, profile, projects } from "@/data/resume";
import { getGitHubActivity } from "@/lib/github";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export const revalidate = 3600;

export default async function MobileHome() {
  const activity = await getGitHubActivity();
  const sectionIndex = (n: number) => String(activity ? n : n - 1).padStart(2, "0");

  return (
    <>
      <MobileHeader />
      <main className="w-full flex-1 px-5">
        <section id="top" className="pb-8">
          <div className="relative -mx-5 h-[28rem] overflow-hidden">
            <Image
              src={portrait}
              alt={profile.name}
              fill
              preload
              placeholder="blur"
              sizes="100vw"
              className="object-cover object-[50%_22%]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-background via-background/30 via-35% to-transparent"
            />
            <div className="absolute inset-x-5 bottom-2">
              <p className="font-mono text-xs text-accent">$ whoami</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight">{profile.name}</h1>
            </div>
          </div>
          <p className="mt-2 font-mono text-sm text-muted">{profile.title}</p>
          <p className="font-mono text-sm text-muted">{profile.location}</p>
          <p className="mt-5 leading-relaxed">{profile.tagline}</p>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted">
            {profile.focus.map((f) => (
              <li key={f}>
                <span className="text-accent">#</span>
                {f}
              </li>
            ))}
          </ul>
          {activity && (
            <div className="mt-5">
              <ActivitySummary activity={activity} />
            </div>
          )}
        </section>

        <section id="projects" className="py-8">
          <SectionHeading index="01" title="Projects" />
          <ProjectGrid projects={projects} variant="mobile" />
        </section>

        {activity && <ActivitySection activity={activity} index="02" variant="mobile" />}

        <section id="experience" className="py-8">
          <SectionHeading index={sectionIndex(3)} title="Experience" />
          <Timeline items={experience} />
        </section>

        <Contact index={sectionIndex(4)} compact />
      </main>
      <Footer layout="mobile" />
      <div className="h-20" aria-hidden />

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/90 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur">
        <div className="flex gap-3">
          <a
            href={profile.resumePage}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-foreground py-2.5 text-sm font-medium text-background"
          >
            <FileIcon />
            Resume
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border py-2.5 text-sm font-medium"
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </div>
    </>
  );
}
