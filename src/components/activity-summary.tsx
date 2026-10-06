import { timeAgo, type GitHubActivity } from "@/lib/github";

export function ActivitySummary({ activity }: { activity: GitHubActivity }) {
  const latest = activity.commits[0];

  return (
    <a
      href="#activity"
      className="group inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent"
    >
      <span className="relative flex size-2" aria-hidden>
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-accent" />
      </span>
      {latest && (
        <span>
          committed <span className="text-foreground">{timeAgo(latest.date)}</span> ·{" "}
          <span className="text-foreground">{latest.repo}</span>
        </span>
      )}
      <span>
        · <span className="text-foreground">{activity.totalContributions}</span> contributions/yr
      </span>
      {activity.currentStreak > 1 && (
        <span>
          · <span className="text-foreground">{activity.currentStreak}</span>-day streak
        </span>
      )}
      <span className="text-accent transition-transform group-hover:translate-x-0.5" aria-hidden>
        →
      </span>
    </a>
  );
}
