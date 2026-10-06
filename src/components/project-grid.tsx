"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/data/resume";
import { Badge } from "./badge";
import { ArrowUpRightIcon } from "./icons";

type ProjectGridProps = {
  projects: Project[];
  variant?: "desktop" | "mobile";
};

export function ProjectGrid({ projects, variant = "desktop" }: ProjectGridProps) {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const mobile = variant === "mobile";

  const allTech = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) for (const t of p.stack) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t]) => t);
  }, [projects]);

  const visible = activeTech ? projects.filter((p) => p.stack.includes(activeTech)) : projects;
  const toggle = (tech: string) => setActiveTech((cur) => (cur === tech ? null : tech));

  return (
    <div>
      <div
        className={
          mobile
            ? "no-scrollbar -mx-5 mb-5 flex snap-x items-center gap-2 overflow-x-auto scroll-px-5 px-5 [&>*]:shrink-0 [&>*]:snap-start"
            : "mb-6 flex flex-wrap items-center gap-2"
        }
      >
        <span className="mr-1 font-mono text-xs text-muted">filter:</span>
        <Badge label="all" active={activeTech === null} onClick={() => setActiveTech(null)} />
        {allTech.map((t) => (
          <Badge key={t} label={t} active={activeTech === t} onClick={() => toggle(t)} />
        ))}
      </div>

      <div className={mobile ? "flex flex-col gap-3" : "grid gap-4 sm:grid-cols-2"}>
        {visible.map((p) => (
          <article
            key={p.title}
            className={`flex flex-col rounded-lg border border-border bg-surface transition-colors hover:border-muted ${
              mobile ? "p-4" : "p-5"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-semibold leading-snug">{p.title}</h3>
              <span className="shrink-0 font-mono text-xs text-muted">{p.year}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>

            <details className="group mt-3 text-sm">
              <summary className="cursor-pointer list-none font-mono text-xs text-accent select-none">
                <span className="group-open:hidden">+ details</span>
                <span className="hidden group-open:inline">− details</span>
              </summary>
              <ul className="mt-2 space-y-1.5">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2 leading-relaxed">
                    <span className="text-accent" aria-hidden>▹</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </details>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((t) => (
                <Badge key={t} label={t} active={activeTech === t} onClick={() => toggle(t)} />
              ))}
            </div>

            {p.links.length > 0 && (
              <div className="mt-auto flex gap-4 pt-4 font-mono text-xs">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-muted hover:text-accent"
                  >
                    {l.label}
                    <ArrowUpRightIcon />
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
