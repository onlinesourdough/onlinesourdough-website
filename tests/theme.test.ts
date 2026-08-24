import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { useTheme } from "../src/hooks/use-theme";

const storageKey = "theme-test";

function ThemeProbe() {
  return createElement("output", null, useTheme(storageKey).theme);
}

function renderInitialTheme(savedTheme: string | null, prefersDark: boolean) {
  const previousWindow = (globalThis as typeof globalThis & { window?: Window }).window;
  const matchMedia = vi.fn(
    (query: string) => ({ matches: prefersDark, media: query }) as MediaQueryList,
  );
  const localStorage = {
    getItem: vi.fn(() => savedTheme),
  } as unknown as Storage;
  const browserWindow = { localStorage, matchMedia } as unknown as Window;

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: browserWindow,
  });

  try {
    return { markup: renderToStaticMarkup(createElement(ThemeProbe)), matchMedia };
  } finally {
    if (previousWindow) {
      Object.defineProperty(globalThis, "window", { configurable: true, value: previousWindow });
    } else {
      Reflect.deleteProperty(globalThis, "window");
    }
  }
}

describe("initial theme contract", () => {
  it("prioritizes an explicit saved theme over the system preference", () => {
    expect(renderInitialTheme("light", true).markup).toBe("<output>light</output>");
    expect(renderInitialTheme("dark", false).markup).toBe("<output>dark</output>");
  });

  it("uses the system preference when no explicit theme is saved", () => {
    const darkResult = renderInitialTheme(null, true);
    const lightResult = renderInitialTheme("unexpected", false);

    expect(darkResult.markup).toBe("<output>dark</output>");
    expect(lightResult.markup).toBe("<output>light</output>");
    expect(darkResult.matchMedia).toHaveBeenCalledWith("(prefers-color-scheme: dark)");
    expect(lightResult.matchMedia).toHaveBeenCalledWith("(prefers-color-scheme: dark)");
  });
});
