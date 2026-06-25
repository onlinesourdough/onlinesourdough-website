import { parseStatsContract, type StatsContract } from "../../../shared/contracts/stats";

export async function fetchStatsContract(signal?: AbortSignal): Promise<StatsContract> {
  const response = await fetch("/stats.json", {
    cache: "no-cache",
    signal,
  });

  if (!response.ok) return {};

  return parseStatsContract(await response.json());
}
