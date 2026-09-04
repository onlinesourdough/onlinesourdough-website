import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { agentWorkReviewPin as pin } from "./agent-work-review-pin-config.mjs";

const localUrl = new URL(`../public/${pin.path}`, import.meta.url);
const sourceUrl = `https://raw.githubusercontent.com/onlinesourdough/Agent-Work-Review/${pin.commit}/${pin.path}`;
const mode = process.argv[2] ?? "--local";

if (!["--local", "--source", "--sync"].includes(mode)) {
  throw new Error(`Unknown mode ${JSON.stringify(mode)}. Use --local, --source, or --sync.`);
}

if (mode === "--sync") {
  const sourceBytes = await fetchSource();
  verifyHash("Fetched canonical runbook", sourceBytes);
  await writeFile(localUrl, sourceBytes);
  console.log(`Synced ${pin.path} from ${pin.project}@${pin.commit}. Review the resulting diff.`);
}

const localBytes = await readFile(localUrl);
verifyHash("Local published runbook", localBytes);

if (mode === "--source") {
  const sourceBytes = await fetchSource();
  verifyHash("Fetched canonical runbook", sourceBytes);

  if (!sourceBytes.equals(localBytes)) {
    throw new Error("Fetched canonical runbook and local published runbook differ byte-for-byte.");
  }
}

console.log(`Verified ${pin.path} at ${pin.commit} with SHA-256 ${pin.sha256}.`);

async function fetchSource() {
  const response = await fetch(sourceUrl, { redirect: "error" });
  if (!response.ok) {
    throw new Error(`Could not fetch pinned canonical runbook: HTTP ${response.status}.`);
  }
  return Buffer.from(await response.arrayBuffer());
}

function verifyHash(label, bytes) {
  const actual = createHash("sha256").update(bytes).digest("hex");
  if (actual !== pin.sha256) {
    throw new Error(`${label} SHA-256 mismatch: expected ${pin.sha256}, received ${actual}.`);
  }
}
