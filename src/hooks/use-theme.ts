import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme(storageKey: string) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme(storageKey));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch {
      // Theme switching still works when storage is unavailable.
    }
  }, [theme, storageKey]);

  return {
    theme,
    toggleTheme: () => setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light")),
  };
}

function getInitialTheme(storageKey: string): Theme {
  if (typeof window === "undefined") return "light";

  let savedTheme: string | null = null;
  try {
    savedTheme = window.localStorage.getItem(storageKey);
  } catch {
    // Fall back to the system preference when storage is unavailable.
  }
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
