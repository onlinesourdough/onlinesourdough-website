import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme(storageKey: string) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme(storageKey));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  return {
    theme,
    toggleTheme: () => setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light")),
  };
}

function getInitialTheme(storageKey: string): Theme {
  if (typeof window === "undefined") return "light";

  const savedTheme = window.localStorage.getItem(storageKey);
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
