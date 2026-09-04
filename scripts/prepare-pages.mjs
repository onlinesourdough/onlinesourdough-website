import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const distUrl = new URL("../dist/", import.meta.url);
const indexPath = fileURLToPath(new URL("index.html", distUrl));
const notFoundPath = fileURLToPath(new URL("404.html", distUrl));
const noJekyllPath = fileURLToPath(new URL(".nojekyll", distUrl));

const directPages = [
  {
    directory: "about",
    title: "The onlinesourdough Method | onlinesourdough",
    description:
      "The onlinesourdough Method helps you turn real business problems into better processes, useful AI, automation, or software you can understand and own.",
    url: "https://onlinesourdough.com/about/",
  },
  {
    directory: "agent-work-review",
    title: "Agent Work Review | onlinesourdough",
    description:
      "Run a private, local review of how you work with agents, organized around the four stages of the onlinesourdough Method.",
    url: "https://onlinesourdough.com/agent-work-review/",
  },
];

const indexHtml = await readFile(indexPath, "utf8");
for (const page of directPages) {
  const directoryUrl = new URL(`${page.directory}/`, distUrl);
  await mkdir(fileURLToPath(directoryUrl), { recursive: true });
  await writeFile(new URL("index.html", directoryUrl), withPageMetadata(indexHtml, page));
}
await copyFile(indexPath, notFoundPath);
await writeFile(noJekyllPath, "");

function withPageMetadata(html, page) {
  return html
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${escapeAttribute(page.description)}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${escapeAttribute(page.url)}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${escapeAttribute(page.title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${escapeAttribute(page.description)}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${escapeAttribute(page.url)}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, `$1${escapeAttribute(page.title)}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${escapeAttribute(page.description)}$2`);
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}
