import { profile } from "@/data/resume";
import { FileIcon, GitHubIcon } from "./icons";

const nav = [
  { label: "projects", href: "#projects" },
  { label: "activity", href: "#activity" },
  { label: "experience", href: "#experience" },
  { label: "contact", href: "#contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
        <a href="#top" className="font-mono text-sm font-semibold">
          <span className="text-accent">~/</span>
          {profile.handle.toLowerCase()}
        </a>
        <nav className="flex items-center gap-5 font-mono text-sm text-muted">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hidden hover:text-foreground sm:inline">
              {item.label}
            </a>
          ))}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-foreground"
          >
            <GitHubIcon />
          </a>
          <a
            href={profile.resumePage}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-foreground hover:border-accent hover:text-accent"
          >
            <FileIcon className="size-3.5" />
            resume
          </a>
        </nav>
      </div>
    </header>
  );
}
