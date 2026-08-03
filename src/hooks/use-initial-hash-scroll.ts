import { useEffect } from "react";

export function useInitialHashScroll() {
  useEffect(() => {
    const targetId = decodeHashTarget(window.location.hash);
    if (!targetId) return;

    let animationFrame = 0;
    let cancelled = false;

    const positionTarget = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        if (cancelled) return;

        const target = document.getElementById(targetId);
        if (!target) return;

        const root = document.documentElement;
        const previousInlineBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";
        target.scrollIntoView({ block: "start" });
        root.style.scrollBehavior = previousInlineBehavior;
      });
    };

    positionTarget();
    void document.fonts.ready.then(positionTarget);
    window.addEventListener("load", positionTarget, { once: true });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("load", positionTarget);
    };
  }, []);
}

export function decodeHashTarget(hash: string) {
  const rawTargetId = hash.startsWith("#") ? hash.slice(1) : hash;

  try {
    return decodeURIComponent(rawTargetId);
  } catch {
    return rawTargetId;
  }
}
