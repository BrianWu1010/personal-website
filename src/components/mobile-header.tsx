"use client";

import { useState } from "react";
import { profile } from "@/data/resume";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

const nav = [
  { label: "projects", href: "#projects" },
  { label: "activity", href: "#activity" },
  { label: "experience", href: "#experience" },
  { label: "contact", href: "#contact" },
];

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-5">
        <a href="#top" onClick={close} className="font-mono text-sm font-semibold">
          <span className="text-accent">~/</span>
          {profile.handle.toLowerCase()}
        </a>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 flex size-10 flex-col items-center justify-center gap-1.5"
        >
          <span className={`h-px w-5 bg-foreground transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-5 bg-foreground transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className="border-t border-border px-5 pt-2 pb-5">
          <ul className="font-mono text-lg">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a href={item.href} onClick={close} className="flex items-baseline gap-3 py-3">
                  <span className="text-xs text-accent">0{i + 1}.</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-3 text-muted">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-md border border-border p-3">
              <GitHubIcon />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-md border border-border p-3">
              <LinkedInIcon />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="rounded-md border border-border p-3">
              <MailIcon />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
