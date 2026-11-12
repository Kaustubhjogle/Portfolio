import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef, type MouseEvent } from "react";
import { flushSync } from "react-dom";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const activeTransition = useRef<Pick<ViewTransition, "skipTransition"> | null>(null);
  const pendingTheme = useRef<"light" | "dark" | null>(null);

  function toggleTheme(event: MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    const next = (pendingTheme.current ?? root.dataset.theme ?? resolvedTheme) === "dark" ? "light" : "dark";
    pendingTheme.current = next;
    const applyTheme = () => {
      if (pendingTheme.current !== next) return;
      pendingTheme.current = null;
      root.dataset.theme = next;
      flushSync(() => setTheme(next));
    };

    if (activeTransition.current) {
      activeTransition.current.skipTransition();
      applyTheme();
      return;
    }
    if (!document.startViewTransition || event.detail === 0 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      applyTheme();
      return;
    }

    const transition = document.startViewTransition(applyTheme);
    activeTransition.current = transition;
    void transition.finished.catch(() => {}).then(() => {
      if (activeTransition.current === transition) activeTransition.current = null;
    });
  }

  return (
    <button type="button" className="portfolio-theme-toggle" aria-label="Dark mode"
      aria-pressed={resolvedTheme === "dark"} onClick={toggleTheme}>
      <Sun className="portfolio-theme-sun" aria-hidden="true" />
      <Moon className="portfolio-theme-moon" aria-hidden="true" />
    </button>
  );
}
