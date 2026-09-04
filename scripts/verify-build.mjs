import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { agentWorkReviewPin } from "./agent-work-review-pin-config.mjs";

const distUrl = new URL("../dist/", import.meta.url);
const expectedFiles = [
  "index.html",
  "about/index.html",
  "agent-work-review/index.html",
  "agent-work-review.md",
  "404.html",
  ".nojekyll",
  "CNAME",
  "favicon.ico",
  "assets/onlinesourdough-mark-large-pixel-v3.svg",
  "assets/content-lofi-v3-transparent.png",
  "assets/resources-lofi-v3-transparent.png",
  "assets/inner-circle-lofi-v3-transparent.png",
  "assets/complete-bake-lofi-v3-transparent.png",
  "assets/fonts/geist-sans-variable.woff2",
  "assets/fonts/geist-mono-variable.woff2",
  "assets/fonts/geist-pixel-square.woff2",
  "assets/fonts/LICENSE.txt",
];

await Promise.all(expectedFiles.map((path) => access(fileURLToPath(new URL(path, distUrl)))));

const [indexHtml, aboutHtml, reviewHtml, runbook, sitemap, cname] = await Promise.all([
  readFile(new URL("index.html", distUrl), "utf8"),
  readFile(new URL("about/index.html", distUrl), "utf8"),
  readFile(new URL("agent-work-review/index.html", distUrl), "utf8"),
  readFile(new URL("agent-work-review.md", distUrl)),
  readFile(new URL("sitemap.xml", distUrl), "utf8"),
  readFile(new URL("CNAME", distUrl), "utf8"),
]);

assertIncludes(indexHtml, '<link rel="canonical" href="https://onlinesourdough.com/"');
assertIncludes(indexHtml, 'href="/assets/onlinesourdough-mark-large-pixel-v3.svg"');
assertIncludes(aboutHtml, '<link rel="canonical" href="https://onlinesourdough.com/about/"');
assertIncludes(aboutHtml, "<title>The onlinesourdough Method | onlinesourdough</title>");
assertIncludes(
  reviewHtml,
  '<link rel="canonical" href="https://onlinesourdough.com/agent-work-review/"',
);
assertIncludes(reviewHtml, "<title>Agent Work Review | onlinesourdough</title>");
assertIncludes(sitemap, "https://onlinesourdough.com/agent-work-review/");
assertIncludes(sitemap, "https://onlinesourdough.com/agent-work-review.md");

const runbookHash = createHash("sha256").update(runbook).digest("hex");
if (runbookHash !== agentWorkReviewPin.sha256) {
  throw new Error(`Unexpected published Agent Work Review hash: ${runbookHash}`);
}

if (indexHtml.includes("/src/main.tsx")) {
  throw new Error("Production HTML still references the Vite source entrypoint.");
}

if (cname.trim() !== "onlinesourdough.com") {
  throw new Error(`Unexpected CNAME: ${JSON.stringify(cname.trim())}`);
}

console.log(`Verified ${expectedFiles.length} GitHub Pages build artifacts.`);

function assertIncludes(value, expected) {
  if (!value.includes(expected)) {
    throw new Error(`Build output did not include ${JSON.stringify(expected)}.`);
  }
}
