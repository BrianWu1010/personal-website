import Image from "next/image";
import portrait from "@/assets/portrait.jpg";
import { profile } from "@/data/resume";
import type { GitHubActivity } from "@/lib/github";
import { ActivitySummary } from "./activity-summary";
import { DownloadIcon, FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

export function Hero({ activity }: { activity: GitHubActivity | null }) {
  return (
    <section
      id="top"
      className="grid items-center gap-10 pt-14 pb-16 sm:pt-20 md:grid-cols-[1fr_18rem] lg:grid-cols-[1fr_20rem]"
    >
      <div>
        <p className="font-mono text-sm text-accent">$ whoami</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-2 font-mono text-muted">
          {profile.title} · {profile.location}
        </p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed">{profile.tagline}</p>

        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-sm text-muted">
          {profile.focus.map((f) => (
            <li key={f}>
              <span className="text-accent">#</span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <div className="inline-flex overflow-hidden rounded-md bg-foreground text-sm font-medium text-background">
            <a
              href={profile.resumePage}
              className="inline-flex items-center gap-2 px-4 py-2 transition-opacity hover:opacity-85"
            >
              <FileIcon />
              View resume
            </a>
            <a
              href={profile.resumePdf}
              download="Boyuan-Wu-Resume.pdf"
              aria-label="Download resume PDF"
              title="Download PDF"
              className="border-l border-background/20 px-3 py-2 transition-opacity hover:opacity-85"
            >
              <DownloadIcon />
            </a>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
          >
            <GitHubIcon />
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-md border border-border p-2.5 text-muted hover:border-accent hover:text-accent"
          >
            <LinkedInIcon />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="rounded-md border border-border p-2.5 text-muted hover:border-accent hover:text-accent"
          >
            <MailIcon />
          </a>
        </div>

        {activity && (
          <div className="mt-6">
            <ActivitySummary activity={activity} />
          </div>
        )}
      </div>

      <figure className="relative mx-auto w-full max-w-xs md:max-w-none">
        <div
          aria-hidden
          className="absolute -inset-2 translate-x-3 translate-y-3 rounded-2xl border border-accent/40"
        />
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-surface">
          <Image
            src={portrait}
            alt={profile.name}
            fill
            preload
            placeholder="blur"
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 288px, 320px"
            className="object-cover object-[50%_20%]"
          />
        </div>
        <figcaption className="absolute bottom-3 left-3 rounded-md bg-background/80 px-2 py-1 font-mono text-xs text-muted backdrop-blur">
          ~/me.jpg
        </figcaption>
      </figure>
    </section>
  );
}
