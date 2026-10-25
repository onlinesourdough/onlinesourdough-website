import { describe, expect, it } from "vitest";
import { cells, createVisit, frame, homes, missingIds, sceneView } from "../src/features/landing/components/bread-scene";

describe("the tile sourdough", () => {
  it("keeps one coherent plan per visit and varies the next one", () => {
    expect(createVisit(17)).toEqual(createVisit(17));
    expect(createVisit(17).tiles.map((tile) => tile.pile)).not.toEqual(createVisit(18).tiles.map((tile) => tile.pile));
  });

  it("moves the same 24 tiles into the original silhouette and leaves them there", () => {
    for (const seed of [0, 17, 94, 2026]) {
      const visit = createVisit(seed);
      expect(frame(visit, 0).settled).toBe(212);
      const end = frame(visit, visit.duration);
      expect(end.settled).toBe(236);
      expect(new Set(end.positions.map((tile) => tile.id)).size).toBe(24);
      for (const tile of end.positions) {
        const target = cells.find((cell) => cell.id === tile.id)!;
        expect([tile.x, tile.y]).toEqual([target.x, target.y]);
      }
      expect(frame(visit, visit.duration + 60).positions).toEqual(end.positions);
    }
  });

  it("leaves the lower contour and face intact at the start", () => {
    expect(cells).toHaveLength(236);
    const missing = cells.filter((cell) => missingIds.has(cell.id));
    expect(missing).toHaveLength(24);
    expect(missing.every((cell) => cell.x >= 366 && cell.r < 12)).toBe(true);
    expect(cells.filter((cell) => cell.r >= 12).every((cell) => !missingIds.has(cell.id))).toBe(true);
  });

  it("gives both helpers sequential trips to each fragmented source", () => {
    for (const seed of [0, 17, 94, 2026]) {
      const visit = createVisit(seed);
      for (const actor of ["codex", "claude"] as const) {
        const jobs = visit.jobs.filter((job) => job.actor === actor);
        expect(jobs).toHaveLength(3);
        expect(new Set(jobs.map((job) => job.fragmentId)).size).toBe(3);
        expect(jobs.every((job, index) => index === 0 || job.start > jobs[index - 1].end)).toBe(true);
      }
      expect(visit.duration).toBeGreaterThan(24);
      expect(visit.duration).toBeLessThan(31);
    }
  });

  it("keeps Notion independent and connected to the real left edge of the loaf", () => {
    for (let seed = 0; seed < 128; seed++) {
      const visit = createVisit(seed);
      expect(visit.contextHome.x + 34).toBeLessThan(150);
      const end = visit.connection.at(-1)!;
      const row = cells.filter((cell) => cell.y + 6 === end.y);
      expect(end.x).toBe(Math.min(...row.map((cell) => cell.x)) - 1);
      expect(visit.jobs.every((job) => job.source.x > visit.contextHome.x + 34)).toBe(true);
      expect(visit.connection.every((point) => point.x <= 170)).toBe(true);
    }
  });

  it("varies the source illustrations while keeping them separate and fully on canvas", () => {
    expect(createVisit(17).fragments).not.toEqual(createVisit(18).fragments);
    for (const primary of ["records", "lake", "lakehouse"] as const) {
      for (let seed = 0; seed < 128; seed++) {
        const visit = createVisit(seed, primary);
        expect(new Set(visit.fragments.map((fragment) => fragment.kind)).size).toBe(3);
        const clusters = visit.fragments.map((fragment) => ({
          // Include the full glyph and all eight loose tiles, not just its centre.
          left: fragment.x - 38, right: fragment.x + 50,
          top: fragment.y - 25, bottom: fragment.y + 110,
        }));
        for (const fragment of visit.fragments) {
          const cluster = clusters[fragment.id];
          expect(cluster.left).toBeGreaterThan(sceneView.x);
          expect(cluster.right).toBeLessThan(sceneView.x + sceneView.width);
          expect(cluster.top).toBeGreaterThan(sceneView.y);
          expect(cluster.bottom).toBeLessThan(sceneView.y + sceneView.height);
          const jobs = visit.jobs.filter((job) => job.fragmentId === fragment.id);
          expect(jobs).toHaveLength(2);
          expect(visit.tiles.filter((tile) => jobs.some((job) => tile.job === job.index))).toHaveLength(8);
        }
        expect(clusters.some((cluster) => cluster.right < 430 && cluster.top > 362)).toBe(true);
        for (let index = 0; index < clusters.length; index++) {
          for (const other of clusters.slice(index + 1)) {
            const cluster = clusters[index];
            const horizontalGap = Math.max(cluster.left - other.right, other.left - cluster.right, 0);
            const verticalGap = Math.max(cluster.top - other.bottom, other.top - cluster.bottom, 0);
            expect(Math.hypot(horizontalGap, verticalGap)).toBeGreaterThan(20);
          }
        }
      }
    }
  });

  it("leaves room for a resting helper while the other places tiles", () => {
    for (const job of createVisit(17).jobs) {
      const other = job.actor === "codex" ? "claude" : "codex";
      const resting = homes[other];
      const activeHeight = job.actor === "codex" ? 52 : 40;
      const restingHeight = other === "codex" ? 52 : 40;
      const separated = Math.abs(job.work.x - resting.x) >= 54
        || job.work.y + 6 <= resting.y - restingHeight
        || resting.y + 6 <= job.work.y - activeHeight;
      expect(separated).toBe(true);
    }
  });

  it("keeps resting helpers away from loose source piles", () => {
    for (let seed = 0; seed < 128; seed++) {
      for (const tile of createVisit(seed).tiles) {
        for (const actor of ["codex", "claude"] as const) {
          const home = homes[actor];
          const left = home.x - 24, right = home.x + 24;
          const top = home.y - (actor === "codex" ? 52 : 40);
          const horizontalGap = Math.max(left - tile.pile.x - 13, tile.pile.x - right, 0);
          const verticalGap = Math.max(top - tile.pile.y - 13, tile.pile.y - home.y, 0);
          expect(Math.hypot(horizontalGap, verticalGap)).toBeGreaterThan(20);
        }
      }
    }
  });

  it("brings the upper source directly to the loaf without crossing the middle cluster", () => {
    for (let seed = 0; seed < 128; seed++) {
      const visit = createVisit(seed);
      const middleTiles = visit.tiles.filter((tile) => visit.jobs[tile.job].fragmentId === 1);
      for (const job of visit.jobs.filter((candidate) => candidate.fragmentId === 0)) {
        // No U-turn below the work point on the way back from the upper source.
        expect(job.backPath.every((point) => point.y <= job.work.y)).toBe(true);
        for (let step = 0; step <= 80; step++) {
          const time = job.start + (job.placeAt - job.start) * step / 80;
          const pet = frame(visit, time).pets.find((candidate) => candidate.actor === job.actor)!;
          const height = job.actor === "codex" ? 52 : 40;
          for (const tile of middleTiles) {
            const clear = pet.x + 24 < tile.pile.x || pet.x - 24 > tile.pile.x + 13
              || pet.y < tile.pile.y || pet.y - height > tile.pile.y + 13;
            expect(clear).toBe(true);
          }
        }
      }
    }
  });

  it("keeps source tiles and every helper route within the illustration", () => {
    for (let seed = 0; seed < 128; seed++) {
      const visit = createVisit(seed);
      for (const job of visit.jobs) {
        const fragment = visit.fragments.find((candidate) => candidate.id === job.fragmentId)!;
        expect(Math.abs(job.source.x - fragment.x)).toBeLessThan(34);
        expect(job.source.y).toBeGreaterThan(fragment.y + 59);
        for (const point of [...job.outPath, ...job.backPath, ...job.restPath]) {
          expect(point.x).toBeGreaterThan(60);
          expect(point.x).toBeLessThan(560);
          expect(point.y).toBeGreaterThan(180);
          expect(point.y).toBeLessThan(sceneView.y + sceneView.height - 24);
        }
      }
      for (let time = 0; time <= visit.duration; time++) {
        for (const tile of frame(visit, time).positions) {
          expect(tile.x).toBeGreaterThan(sceneView.x);
          expect(tile.x + 13).toBeLessThan(sceneView.x + sceneView.width);
          expect(tile.y).toBeGreaterThan(sceneView.y);
          expect(tile.y + 13).toBeLessThan(sceneView.y + sceneView.height);
        }
      }
    }
  });
});
