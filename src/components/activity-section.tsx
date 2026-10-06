import { profile } from "@/data/resume";
import { timeAgo, type ContributionDay, type GitHubActivity } from "@/lib/github";
import { ArrowUpRightIcon } from "./icons";
import { SectionHeading } from "./section-heading";

const LEVEL_CLASSES = ["bg-border/70", "bg-accent/30", "bg-accent/55", "bg-accent/80", "bg-accent"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type ActivitySectionProps = {
  activity: GitHubActivity;
  index: string;
  variant?: "desktop" | "mobile";
};

export function ActivitySection({ activity, index, variant = "desktop" }: ActivitySectionProps) {
  const mobile = variant === "mobile";
  const weeks = mobile ? activity.weeks.slice(-24) : activity.weeks;

  return (
    <section id="activity" className={mobile ? "py-8" : "py-16"}>
      <SectionHeading index={index} title="GitHub activity" />

      <dl className={`grid gap-4 font-mono ${mobile ? "grid-cols-3" : "grid-cols-3 sm:max-w-lg"}`}>
        <Stat label="contributions" value={activity.totalContributions} />
        <Stat label="active days" value={activity.weeks.flat().filter((d) => d.count > 0).length} />
        <Stat label="best streak" value={`${activity.longestStreak}d`} />
      </dl>

      <div className="mt-6 rounded-lg border border-border bg-surface p-4">
        <Heatmap weeks={weeks} />
        <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[10px] text-muted">
          less
          {LEVEL_CLASSES.map((c) => (
            <span key={c} className={`size-2.5 rounded-[2px] ${c}`} aria-hidden />
          ))}
          more
        </div>
      </div>

      {activity.commits.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 font-mono text-xs text-muted">$ git log --author={profile.handle}</h3>
          <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
            {activity.commits.map((c) => (
              <li key={c.url} className="flex items-baseline gap-3 px-4 py-3 text-sm">
                <span className="text-accent" aria-hidden>●</span>
                <div className="min-w-0 flex-1">
                  <a href={c.url} target="_blank" rel="noreferrer" className="block truncate hover:text-accent">
                    {c.message}
                  </a>
                  <a
                    href={c.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-muted hover:text-accent"
                  >
                    {c.repo}
                  </a>
                </div>
                <span className="shrink-0 font-mono text-xs text-muted">{timeAgo(c.date)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 flex flex-wrap items-center gap-x-2 font-mono text-xs text-muted">
        synced from GitHub hourly · last sync {timeAgo(activity.fetchedAt)}
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-accent hover:underline"
        >
          view profile <ArrowUpRightIcon />
        </a>
      </p>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2">
      <dt className="text-[10px] text-muted">{label}</dt>
      <dd className="text-lg text-foreground">{value}</dd>
    </div>
  );
}

function Heatmap({ weeks }: { weeks: ContributionDay[][] }) {
  const max = Math.max(1, ...weeks.flat().map((d) => d.count));
  const level = (count: number) => (count === 0 ? 0 : Math.min(4, Math.ceil((count / max) * 4)));

  const monthStarts = weeks.map((week, i) => {
    const month = new Date(week[0].date).getUTCMonth();
    const prev = i > 0 ? new Date(weeks[i - 1][0].date).getUTCMonth() : -1;
    return month !== prev && i < weeks.length - 1 ? MONTHS[month] : "";
  });
  // A label needs ~3 columns of room; drop one that would collide with the next month's.
  const monthLabels = monthStarts.map((label, i) =>
    label && (monthStarts[i + 1] || monthStarts[i + 2]) ? "" : label,
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-[3px] font-mono text-[10px] text-muted" aria-hidden>
        {monthLabels.map((label, i) => (
          <span key={i} className="min-w-0 flex-1 overflow-visible whitespace-nowrap">
            {label}
          </span>
        ))}
      </div>
      <div className="flex gap-[3px]" role="img" aria-label="Contribution calendar">
        {weeks.map((week, i) => (
          <div key={week[0].date} className="flex min-w-0 flex-1 flex-col gap-[3px]">
            {i === 0 &&
              Array.from({ length: 7 - week.length }, (_, j) => (
                <span key={`pad-${j}`} className="aspect-square w-full" aria-hidden />
              ))}
            {week.map((day) => (
              <span
                key={day.date}
                title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                className={`aspect-square w-full rounded-[2px] ${LEVEL_CLASSES[level(day.count)]}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
