import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const distUrl = new URL("../dist/", import.meta.url);
const indexPath = fileURLToPath(new URL("index.html", distUrl));
const aboutDir = fileURLToPath(new URL("about/", distUrl));
const aboutIndexPath = fileURLToPath(new URL("about/index.html", distUrl));
const notFoundPath = fileURLToPath(new URL("404.html", distUrl));
const noJekyllPath = fileURLToPath(new URL(".nojekyll", distUrl));

const aboutMetadata = {
  title: "About onlinesourdough",
  description: "Why onlinesourdough connects business development, software, and AI.",
  url: "https://onlinesourdough.com/about/",
};

await mkdir(aboutDir, { recursive: true });
const indexHtml = await readFile(indexPath, "utf8");
await writeFile(aboutIndexPath, withPageMetadata(indexHtml, aboutMetadata));
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
