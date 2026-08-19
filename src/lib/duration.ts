export function parseLocalDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function durationParts(start: Date, end: Date) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  const days = end.getDate() - start.getDate();

  if (days < 0) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    years: Math.max(years, 0),
    months: Math.max(months, 0),
  };
}

export function formatDuration(start: Date, end: Date): string {
  const { years, months } = durationParts(start, end);
  if (years === 0 && months === 0) return "1 mo";

  const parts: string[] = [];
  if (years > 0) parts.push(years === 1 ? "1 yr" : `${years} yrs`);
  if (months > 0) parts.push(months === 1 ? "1 mo" : `${months} mos`);
  return parts.join(" ");
}

export function formatShortDate(iso: string): string {
  return parseLocalDate(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Inclusive end date: last working day + 1 day for month math. */
export function dayAfter(iso: string): Date {
  const date = parseLocalDate(iso);
  date.setDate(date.getDate() + 1);
  return date;
}
