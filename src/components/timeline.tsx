import type { Experience } from "@/data/resume";
import { Badge } from "./badge";

export function Timeline({ items }: { items: Experience[] }) {
  const groups = [
    { label: "work", items: items.filter((i) => i.kind === "work") },
    { label: "education", items: items.filter((i) => i.kind === "education") },
  ].filter((g) => g.items.length > 0);

  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <div key={group.label}>
          <h3 className="mb-5 font-mono text-xs text-muted">
            <span className="text-accent">#</span>
            {group.label}
          </h3>
          <ol className="relative ml-1.5 border-l border-border">
            {group.items.map((item, i) => (
              <TimelineItem key={`${item.org}-${item.role}`} item={item} latest={i === 0} />
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

function TimelineItem({ item, latest }: { item: Experience; latest: boolean }) {
  return (
    <li className="relative pb-9 pl-8 last:pb-0">
      <span
        aria-hidden
        className={`absolute -left-[5px] top-1.5 size-2.5 rounded-full ring-4 ring-background ${
          latest ? "bg-accent" : "bg-border"
        }`}
      />
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h4 className="font-semibold">
          {item.role}
          {item.org && <span className="font-normal text-muted"> @ {item.org}</span>}
        </h4>
        <span className="shrink-0 font-mono text-xs text-muted">
          {item.start} — {item.end}
        </span>
      </div>
      {item.location && <p className="mt-0.5 font-mono text-xs text-muted">{item.location}</p>}
      {item.bullets.length > 0 && (
        <ul className="mt-3 space-y-1.5 text-sm">
          {item.bullets.map((b) => (
            <li key={b} className="flex gap-2 leading-relaxed">
              <span className="text-accent" aria-hidden>▹</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {item.stack && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.stack.map((t) => (
            <Badge key={t} label={t} />
          ))}
        </div>
      )}
    </li>
  );
}
