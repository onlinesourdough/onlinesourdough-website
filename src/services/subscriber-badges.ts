import { type StatsBadgeValue, type StatsContract } from "../../shared/contracts/stats";

export type SubscriberBadgeOffer = {
  title: string;
  subscriberBadge?: {
    id: string;
  };
};

export function buildSubscriberBadges(offers: SubscriberBadgeOffer[], stats: StatsContract) {
  const entries = offers.flatMap((offer) => {
    const id = offer.subscriberBadge?.id;
    const value = id ? stats.badges?.[id] : null;
    const label = formatBadgeValue(value);

    return label ? [[offer.title, label] as const] : [];
  });

  return Object.fromEntries(entries);
}

export function formatBadgeValue(value: StatsBadgeValue | undefined) {
  if (typeof value === "number" && Number.isFinite(value)) return formatSubscriberCount(value);
  if (typeof value === "string" && value.trim()) return value.trim();
  return null;
}

function formatSubscriberCount(count: number) {
  if (count < 1000) return String(count);

  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count);
}
