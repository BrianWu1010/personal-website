import { profile } from "@/data/resume";

export type ContributionDay = { date: string; count: number };

export type RecentCommit = {
  message: string;
  repo: string;
  repoUrl: string;
  url: string;
  date: string;
};

export type GitHubActivity = {
  totalContributions: number;
  weeks: ContributionDay[][];
  currentStreak: number;
  longestStreak: number;
  commits: RecentCommit[];
  fetchedAt: string;
};

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount } }
        }
      }
      repositories(
        first: 8
        orderBy: { field: PUSHED_AT, direction: DESC }
        ownerAffiliations: OWNER
        privacy: PUBLIC
        isFork: false
      ) {
        nodes {
          name
          url
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 6) {
                  nodes { messageHeadline committedDate url author { user { login } } }
                }
              }
            }
          }
        }
      }
    }
  }
`;

type CommitNode = {
  messageHeadline: string;
  committedDate: string;
  url: string;
  author: { user: { login: string } | null } | null;
};

type RepoNode = {
  name: string;
  url: string;
  defaultBranchRef: { target: { history?: { nodes: CommitNode[] } } } | null;
};

type QueryResult = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
        };
      };
      repositories: { nodes: RepoNode[] };
    } | null;
  };
  errors?: { message: string }[];
};

const MAX_COMMITS = 6;
const MAX_COMMITS_PER_REPO = 2;

export async function getGitHubActivity(): Promise<GitHubActivity | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { login: profile.handle } }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);

    const json = (await res.json()) as QueryResult;
    const user = json.data?.user;
    if (!user) throw new Error(json.errors?.[0]?.message ?? "GitHub user not found");

    const calendar = user.contributionsCollection.contributionCalendar;
    const weeks = calendar.weeks.map((w) =>
      w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount })),
    );

    return {
      totalContributions: calendar.totalContributions,
      weeks,
      ...streaks(weeks.flat()),
      commits: recentCommits(user.repositories.nodes),
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Failed to load GitHub activity:", error);
    return null;
  }
}

function recentCommits(repos: RepoNode[]): RecentCommit[] {
  const commits: RecentCommit[] = [];

  for (const repo of repos) {
    const history = repo.defaultBranchRef?.target.history?.nodes ?? [];
    history
      .filter((c) => c.author?.user?.login === profile.handle && !c.messageHeadline.startsWith("Merge "))
      .slice(0, MAX_COMMITS_PER_REPO)
      .forEach((c) =>
        commits.push({
          message: c.messageHeadline,
          repo: repo.name,
          repoUrl: repo.url,
          url: c.url,
          date: c.committedDate,
        }),
      );
  }

  return commits.sort((a, b) => b.date.localeCompare(a.date)).slice(0, MAX_COMMITS);
}

function streaks(days: ContributionDay[]) {
  let longestStreak = 0;
  let run = 0;
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0;
    longestStreak = Math.max(longestStreak, run);
  }

  // Today not having a contribution yet shouldn't break an ongoing streak.
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i--;
  let currentStreak = 0;
  while (i >= 0 && days[i].count > 0) {
    currentStreak++;
    i--;
  }

  return { currentStreak, longestStreak };
}

export function timeAgo(iso: string, now: Date = new Date()): string {
  const seconds = Math.max(0, (now.getTime() - new Date(iso).getTime()) / 1000);
  const units: [number, string][] = [
    [60 * 60 * 24 * 365, "y"],
    [60 * 60 * 24 * 30, "mo"],
    [60 * 60 * 24 * 7, "w"],
    [60 * 60 * 24, "d"],
    [60 * 60, "h"],
    [60, "m"],
  ];
  for (const [size, label] of units) {
    if (seconds >= size) return `${Math.floor(seconds / size)}${label} ago`;
  }
  return "just now";
}
