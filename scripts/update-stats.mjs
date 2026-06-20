import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const statsPath = fileURLToPath(new URL("../public/stats.json", import.meta.url));
const youtubeApiKey = process.env.YOUTUBE_API_KEY;

const youtubeBadges = [
  {
    id: "gustavonline-youtube",
    handle: "@gustavonline",
  },
];

const stats = {
  badges: {},
};

if (youtubeApiKey) {
  for (const badge of youtubeBadges) {
    stats.badges[badge.id] = await fetchYoutubeSubscriberCount(badge.handle, youtubeApiKey);
  }

  stats.updatedAt = new Date().toISOString();
} else {
  console.warn("YOUTUBE_API_KEY is not set. Writing empty public stats.json.");
}

await mkdir(dirname(statsPath), { recursive: true });
await writeFile(`${statsPath}`, `${JSON.stringify(stats, null, 2)}\n`);

async function fetchYoutubeSubscriberCount(handle, apiKey) {
  const params = new URLSearchParams({
    part: "statistics",
    forHandle: handle,
    key: apiKey,
  });
  const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?${params}`);

  if (!response.ok) {
    throw new Error(`YouTube API request failed with ${response.status}`);
  }

  const data = await response.json();
  const subscriberCount = Number(data.items?.[0]?.statistics?.subscriberCount);
  if (!Number.isFinite(subscriberCount)) {
    throw new Error(`YouTube subscriber count was missing for ${handle}`);
  }

  return subscriberCount;
}
