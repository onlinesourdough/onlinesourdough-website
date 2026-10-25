import type { FragmentKind, Point } from "./bread-scene";

/** Local samples of the same mixed data/context scene. */
export type BreadContextVariant = FragmentKind;
export const breadContextVariants = [
  { id: "records", title: "Opstilling 1" },
  { id: "lake", title: "Opstilling 2" },
  { id: "lakehouse", title: "Opstilling 3" },
] as const;

export function parseBreadContext(value: string | null): BreadContextVariant {
  return breadContextVariants.find((variant) => variant.id === value)?.id ?? "records";
}

export function drawContextFragment(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  variant: BreadContextVariant,
  side: number,
  dark: boolean,
  progress: number,
) {
  const ink = dark ? "#654934" : "#765B45";
  const paper = "#E7DBCC";
  const edge = dark ? "#8A715A" : "#C4AF94";
  const blue = dark ? "#7F909C" : "#9AADB9";
  const square = (dx: number, dy: number, w: number, h: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(x + dx, y + dy, w, h);
  };
  function document(dx: number, dy: number, color = paper) {
    square(dx, dy, 10, 14, color);
    square(dx + 8, dy, 2, 4, edge);
    square(dx + 2, dy + 5, 5, 2, ink);
    square(dx + 2, dy + 9, 6, 1, edge);
  }
  function relation(dx: number, dy: number) {
    square(dx + 3, dy + 3, 9, 2, ink);
    square(dx + 10, dy + 4, 2, 7, ink);
    square(dx, dy, 6, 6, blue);
    square(dx + 9, dy + 9, 6, 6, paper);
  }
  ctx.save();
  // Give the context glyphs enough presence beside the loaf at phone size.
  // Scaling around the base keeps the existing loose-tile pickup lanes clear.
  ctx.translate(x + 16, y + 40);
  ctx.scale(1.35, 1.35);
  ctx.translate(-x - 16, -y - 40);
  ctx.globalAlpha = 0.88 + (1 - progress) * 0.12;
  if (variant === "records") {
    // Files and relationships are ingredients; the Notion peer is drawn separately.
    square(-5, 6, 32, 40, edge);
    square(-2, 3, 32, 40, "#D5C5B0");
    square(0, 0, 32, 40, paper);
    square(0, 39, 32, 1, edge);
    if (side === 0) {
      document(7, 7, "#F0E7DB");
      square(21, 8, 5, 3, blue);
      square(6, 27, 19, 2, edge);
      square(6, 32, 13, 1, ink);
    } else {
      document(3, 8, "#F0E7DB");
      relation(14, 7);
      square(6, 28, 20, 1, edge);
      square(6, 33, 11, 1, ink);
    }
    square(2, 10, 2, 4, "#CDBBA3");
    square(25, 35, 3, 2, "#BDA587");
  } else if (variant === "lake") {
    // A flat tile basin, not a glass platform: a loose collection becomes a compact grid.
    square(-8, 26, 44, 4, edge);
    square(-4, 30, 40, 4, "#BDA88D");
    square(0, 34, 32, 3, ink);
    square(-4, 8, 40, 18, dark ? "#65737C" : "#B5C0C5");
    square(-8, 14, 4, 8, blue);
    square(36, 12, 4, 10, edge);
    if (side === 0) {
      document(0, 4);
      relation(20, 9);
      square(13, 22, 5, 3, "#9E8064");
      square(23, 26, 7, 2, paper);
    } else {
      for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
        square(c * 8, 8 + r * 6, 6, 4, (c + r) % 3 === 0 ? paper : (c + r) % 3 === 1 ? blue : "#9E8064");
      }
    }
    square(0, 30, 4, 2, paper);
    square(28, 31, 3, 2, "#9E8064");
  } else {
    // A low, layered store of data and context, using the same matte material.
    for (let row = 2; row >= 0; row--) {
      square(-4, 15 + row * 8, 40, 6, row === 1 ? blue : edge);
      square(0, 20 + row * 8, 32, 2, ink);
      square(2, 16 + row * 8, 3, 2, paper);
      square(9, 16 + row * 8, 3, 2, paper);
    }
    square(0, 9, 32, 5, paper);
    square(4, 5, 24, 4, edge);
    square(10, 1, 12, 4, "#BDA88D");
    if (side === 0) document(-8, -5);
    else relation(20, -7);
    square(26, 34, 3, 2, "#A78B70");
  }
  ctx.restore();
}

/** A static peer relationship, independent of the scattered source packets. */
export function drawNotionPeer(ctx: CanvasRenderingContext2D, home: Point, connection: Point[], notion: HTMLImageElement, dark: boolean) {
  ctx.save();
  ctx.strokeStyle = dark ? "#8297AF" : "#8293A5";
  ctx.fillStyle = ctx.strokeStyle;
  ctx.globalAlpha = dark ? 0.78 : 0.68;
  ctx.lineWidth = 2;
  ctx.setLineDash([3, 4]);
  ctx.beginPath();
  connection.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
  ctx.stroke();
  ctx.setLineDash([]);
  for (const point of [connection[0], connection.at(-1)!]) ctx.fillRect(point.x - 1, point.y - 1, 3, 3);
  ctx.globalAlpha = 1;
  // A small wooden context stand, using the same stepped matte finish as the menu art.
  // The single original mark stays intact; this peer never supplies assembly tiles.
  const square = (x: number, y: number, w: number, h: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(home.x + x, home.y + y, w, h);
  };
  const wood = dark ? "#987151" : "#8C6447";
  const shade = dark ? "#694C37" : "#6D4C35";
  const edge = "#B69370";
  square(-32, 35, 65, 2, dark ? "#BBA58B18" : "#6D4C3512");
  square(-27, -27, 50, 3, wood);
  square(-30, -24, 56, 51, wood);
  square(-30, -22, 4, 47, shade);
  square(22, -20, 7, 43, shade);
  square(-24, -23, 45, 45, "#E7D9C4");
  square(-21, -20, 39, 38, "#F0E7DB");
  square(22, -17, 10, 7, dark ? "#7D909A" : "#8D9EA7");
  square(25, -9, 5, 21, edge);
  square(-25, 23, 50, 5, shade);
  square(-34, 28, 67, 4, wood);
  square(-28, 32, 9, 3, shade);
  square(18, 32, 9, 3, shade);
  for (const [x, y, w, h] of [[-25, -26, 7, 1], [-28, -12, 2, 4], [12, 29, 8, 1], [-18, 29, 5, 2], [24, 16, 2, 3]]) {
    square(x, y, w, h, edge);
  }
  if (notion.complete && notion.naturalWidth > 0) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(notion, home.x - 17, home.y - 17, 30, 30);
  }
  ctx.restore();
}
