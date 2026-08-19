import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SawadHeading } from "@/components/ui/SawadHeading";
import { getGithubActivity, githubProfileUrl, type ContributionDay } from "@/lib/github";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const LEVEL_CLASS = [
  "bg-white/6",
  "bg-[#ff5c00]/25",
  "bg-[#ff5c00]/50",
  "bg-[#ff7a2e]",
  "bg-[#ff5c00]",
] as const;

function weeksFromDays(days: ContributionDay[]) {
  const weeks: (ContributionDay | null)[][] = [];
  let week: (ContributionDay | null)[] = [];
  const first = new Date(`${days[0].date}T00:00:00`);
  for (let pad = first.getDay(); pad > 0; pad -= 1) week.push(null);

  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

function monthLabels(weeks: (ContributionDay | null)[][]) {
  return weeks.map((week, index) => {
    const labeled = week.find((day) => day && day.date.endsWith("-01"));
    if (labeled) return MONTHS[new Date(`${labeled.date}T00:00:00`).getMonth()];
    if (index !== 0) return "";
    const first = week.find((day) => day !== null);
    return first ? MONTHS[new Date(`${first.date}T00:00:00`).getMonth()] : "";
  });
}

export async function GitHubActivity() {
  const activity = await getGithubActivity();

  return (
    <section id="github" className="home-section">
      <Reveal direction="right">
        <SawadHeading line1="CONTRIBUTION" line2="GRAPH" className="mb-8" />
      </Reveal>

      {!activity ? (
        <Reveal>
          <p className="text-sm text-[#888]">
            The contribution graph could not be loaded right now.{" "}
            <a
              href={githubProfileUrl()}
              className="text-[#ff5c00] underline-offset-4 hover:underline"
            >
              View GitHub
            </a>
            .
          </p>
        </Reveal>
      ) : (
        <Reveal delay={0.08}>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 sm:p-5">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm text-[#888]">
                  <span className="font-semibold text-white">{activity.total.toLocaleString()}</span>{" "}
                  contributions in the last year
                </p>
                <a
                  href={activity.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#ff5c00] transition hover:text-[#ff7a2e]"
                >
                  <GitHubIcon className="h-3.5 w-3.5" />
                  @{activity.username}
                </a>
              </div>
              <dl className="flex gap-6 text-sm">
                <div>
                  <dt className="text-[11px] tracking-widest text-[#666] uppercase">Current</dt>
                  <dd className="mt-0.5 font-semibold text-white">{activity.currentStreak} day streak</dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-widest text-[#666] uppercase">Longest</dt>
                  <dd className="mt-0.5 font-semibold text-white">{activity.longestStreak} days</dd>
                </div>
              </dl>
            </div>

            <ContributionGraph days={activity.days} />

            <div className="mt-4 flex items-center justify-end gap-1.5 text-[11px] text-[#666]">
              <span>Less</span>
              {LEVEL_CLASS.map((tone, level) => (
                <span key={tone} className={`h-2.5 w-2.5 rounded-[3px] ${tone}`} title={`Level ${level}`} />
              ))}
              <span>More</span>
            </div>
          </div>
        </Reveal>
      )}
    </section>
  );
}

function ContributionGraph({ days }: { days: ContributionDay[] }) {
  const weeks = weeksFromDays(days);
  const labels = monthLabels(weeks);

  return (
    <div className="overflow-x-auto pb-1">
      <div className="inline-flex min-w-full gap-2">
        <div className="flex w-6 shrink-0 flex-col justify-between pt-4 pb-px text-[9px] leading-none text-[#555]">
          <span />
          <span>Mon</span>
          <span />
          <span>Wed</span>
          <span />
          <span>Fri</span>
          <span />
        </div>
        <div className="min-w-0 flex-1">
          <div
            className="mb-1 grid text-[9px] text-[#666]"
            style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(10px, 1fr))` }}
          >
            {labels.map((label, index) => (
              <span key={`${label}-${index}`} className="h-3 overflow-visible whitespace-nowrap">
                {label && labels[index - 1] !== label ? label : ""}
              </span>
            ))}
          </div>
          <div
            className="grid gap-[3px]"
            style={{
              gridTemplateColumns: `repeat(${weeks.length}, minmax(10px, 1fr))`,
              gridTemplateRows: "repeat(7, 10px)",
              gridAutoFlow: "column",
            }}
          >
            {weeks.flatMap((week, weekIndex) =>
              week.map((day, dayIndex) =>
                day ? (
                  <span
                    key={day.date}
                    className={`block h-[10px] w-full rounded-[2px] ${LEVEL_CLASS[day.level]}`}
                    title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                  />
                ) : (
                  <span key={`empty-${weekIndex}-${dayIndex}`} className="block h-[10px] w-full" />
                ),
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
