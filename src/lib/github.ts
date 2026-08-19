import { social } from "@/data/social";

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GithubActivity = {
  username: string;
  profileUrl: string;
  total: number;
  days: ContributionDay[];
  currentStreak: number;
  longestStreak: number;
};

const LEVELS = [0, 1, 2, 3, 4] as const;

export function githubUsername() {
  const github = social.find((item) => item.id === "github");
  return github?.handle ?? "Shathusan73";
}

export function githubProfileUrl() {
  const github = social.find((item) => item.id === "github");
  return github?.href ?? `https://github.com/${githubUsername()}`;
}

function asLevel(value: number): ContributionDay["level"] {
  if (value >= 4) return 4;
  if (value <= 0) return 0;
  return LEVELS[value] ?? 1;
}

function parseGraphQlLevel(value: string) {
  switch (value) {
    case "FOURTH_QUARTILE":
      return 4 as const;
    case "THIRD_QUARTILE":
      return 3 as const;
    case "SECOND_QUARTILE":
      return 2 as const;
    case "FIRST_QUARTILE":
      return 1 as const;
    default:
      return 0 as const;
  }
}

function streakStats(days: ContributionDay[]) {
  let longest = 0;
  let run = 0;
  for (const day of days) {
    if (day.count > 0) {
      run += 1;
      longest = Math.max(longest, run);
    } else {
      run = 0;
    }
  }

  let current = 0;
  for (let index = days.length - 1; index >= 0; index -= 1) {
    if (days[index].count > 0) {
      current += 1;
      continue;
    }
    if (index === days.length - 1) continue;
    break;
  }

  return { currentStreak: current, longestStreak: longest };
}

async function fromGithubGraphql(username: string): Promise<ContributionDay[] | null> {
  const token = process.env.GITHUB_TOKEN?.trim();
  if (!token) return null;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }`,
      variables: { login: username },
    }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as {
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            weeks?: {
              contributionDays?: {
                date: string;
                contributionCount: number;
                contributionLevel: string;
              }[];
            }[];
          };
        };
      };
    };
  };

  const weeks = payload.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  if (!weeks) return null;

  return weeks.flatMap((week) =>
    (week.contributionDays ?? []).map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: parseGraphQlLevel(day.contributionLevel),
    })),
  );
}

async function fromPublicApi(username: string): Promise<ContributionDay[] | null> {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
    { next: { revalidate: 3600 } },
  );

  if (!response.ok) return null;

  const payload = (await response.json()) as {
    contributions?: { date: string; count: number; level: number }[];
  };

  if (!payload.contributions?.length) return null;

  return payload.contributions.map((day) => ({
    date: day.date,
    count: day.count,
    level: asLevel(day.level),
  }));
}

export async function getGithubActivity(): Promise<GithubActivity | null> {
  const username = githubUsername();

  try {
    const days = (await fromGithubGraphql(username)) ?? (await fromPublicApi(username));
    if (!days?.length) return null;

    const { currentStreak, longestStreak } = streakStats(days);
    return {
      username,
      profileUrl: githubProfileUrl(),
      total: days.reduce((sum, day) => sum + day.count, 0),
      days,
      currentStreak,
      longestStreak,
    };
  } catch {
    return null;
  }
}
