export type StatsBadgeValue = number | string | null;

export type StatsContract = {
  badges?: Record<string, StatsBadgeValue>;
  updatedAt?: string;
};

export function parseStatsContract(value: unknown): StatsContract {
  if (!isRecord(value)) return {};

  return {
    badges: parseBadges(value.badges),
    updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : undefined,
  };
}

function parseBadges(value: unknown) {
  if (!isRecord(value)) return undefined;

  const entries: Array<[string, StatsBadgeValue]> = [];

  for (const [key, badgeValue] of Object.entries(value)) {
    if (typeof badgeValue === "number" && Number.isFinite(badgeValue)) entries.push([key, badgeValue]);
    if (typeof badgeValue === "string") entries.push([key, badgeValue]);
    if (badgeValue === null) entries.push([key, badgeValue]);
  }

  return Object.fromEntries(entries);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
