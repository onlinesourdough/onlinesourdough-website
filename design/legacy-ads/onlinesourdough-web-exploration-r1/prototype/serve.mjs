import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.dirname(fileURLToPath(import.meta.url));
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".md": "text/plain",
};
for (const [site, port] of [
  ["main", 53671],
  ["resources", 53672],
]) {
  const base = path.join(root, site);
  http
    .createServer((req, res) => {
      let url;
      try {
        url = new URL(req.url, "http://127.0.0.1");
      } catch {
        res.writeHead(400).end();
        return;
      }
      if (url.pathname.startsWith("/api/")) {
        res
          .writeHead(404, { "Content-Type": "application/json" })
          .end('{"error":"Local design preview; backend unavailable"}');
        return;
      }
      let file = path.resolve(base, "." + decodeURIComponent(url.pathname));
      if (!file.startsWith(base + path.sep) && file !== base) {
        res.writeHead(403).end();
        return;
      }
      if (fs.existsSync(file) && fs.statSync(file).isDirectory())
        file = path.join(file, "index.html");
      if (!fs.existsSync(file)) file = path.join(base, "index.html");
      const size = fs.statSync(file).size;
      const headers = {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
        "Cache-Control": "no-store",
        "Accept-Ranges": "bytes",
      };
      const range = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range || "");
      if (range) {
        const start = Number(range[1]);
        const end = Math.min(range[2] ? Number(range[2]) : size - 1, size - 1);
        if (start > end) {
          res.writeHead(416, { "Content-Range": `bytes */${size}` }).end();
          return;
        }
        res.writeHead(206, {
          ...headers,
          "Content-Length": end - start + 1,
          "Content-Range": `bytes ${start}-${end}/${size}`,
        });
        fs.createReadStream(file, { start, end }).pipe(res);
        return;
      }
      res.writeHead(200, { ...headers, "Content-Length": size });
      fs.createReadStream(file).pipe(res);
    })
    .listen(port, "127.0.0.1", () =>
      console.log(`${site}: http://127.0.0.1:${port}/`),
    );
}
