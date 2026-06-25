import { useEffect, useState } from "react";
import { fetchStatsContract } from "../../../adapters/http/stats-api";
import { buildSubscriberBadges } from "../../../services/subscriber-badges";
import { type Offer } from "../../../config/site-data";

export function useSubscriberBadges(offers: Offer[]) {
  const [badges, setBadges] = useState<Record<string, string>>({});

  useEffect(() => {
    const offersWithBadges = offers.filter((offer) => offer.subscriberBadge);
    if (offersWithBadges.length === 0) return;

    const controller = new AbortController();

    async function loadBadges() {
      const stats = await fetchStatsContract(controller.signal);
      if (!controller.signal.aborted) {
        setBadges(buildSubscriberBadges(offersWithBadges, stats));
      }
    }

    loadBadges().catch(() => {
      if (!controller.signal.aborted) setBadges({});
    });

    return () => controller.abort();
  }, [offers]);

  return badges;
}
