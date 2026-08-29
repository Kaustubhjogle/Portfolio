import { useEffect, useRef } from "react";

/**
 * Adds the `section-reveal` scroll animation to a ref'd element.
 * Uses IntersectionObserver to add `is-visible` when the element
 * enters the viewport. Fires once (no re-hide on scroll back up).
 */
export function useSectionReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
