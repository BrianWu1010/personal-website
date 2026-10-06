import { profile } from "@/data/resume";
import { FileIcon, GitHubIcon, MailIcon } from "./icons";
import { SectionHeading } from "./section-heading";

export function Contact({ index, compact = false }: { index: string; compact?: boolean }) {
  return (
    <section id="contact" className={compact ? "py-10" : "py-16"}>
      <SectionHeading index={index} title="Get in touch" />
      <p className="max-w-xl text-muted">
        The full story lives in my resume. The code lives on GitHub. For anything else,
        my inbox is open.
      </p>
      <div
        className={`mt-6 flex font-mono text-sm ${
          compact ? "flex-col gap-4" : "flex-wrap gap-x-6 gap-y-3"
        }`}
      >
        <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-accent">
          <MailIcon /> {profile.email}
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-accent">
          <GitHubIcon /> github.com/{profile.handle}
        </a>
        <a href={profile.resumePage} className="inline-flex items-center gap-2 hover:text-accent">
          <FileIcon /> resume
        </a>
      </div>
    </section>
  );
}
