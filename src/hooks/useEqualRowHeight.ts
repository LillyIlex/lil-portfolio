import { useLayoutEffect, useRef, useState } from "react";

/**
 * Measures each card's natural (collapsed) height once on mount, and
 * returns a matching min-height per row so cards line up before any of
 * them expand.
 *
 * Deliberately a floor, not a fixed height: if a card grows taller later
 * (e.g. a "show more" toggle), it's free to do so without dragging its
 * row-mate along — only the initial baseline is kept equal.
 */
export function useEqualRowHeight(count: number) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>([]);

  useLayoutEffect(() => {
    const measure = () => {
      // sm: breakpoint — 1 column below it, 2 columns at/above.
      const columns = window.matchMedia("(min-width: 640px)").matches ? 2 : 1;
      const rowMax: number[] = [];

      refs.current.forEach((el, i) => {
        if (!el) return;
        const row = Math.floor(i / columns);
        rowMax[row] = Math.max(rowMax[row] ?? 0, el.getBoundingClientRect().height);
      });

      setHeights(refs.current.map((_, i) => rowMax[Math.floor(i / columns)] ?? 0));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [count]);

  const setRef = (i: number) => (el: HTMLElement | null) => {
    refs.current[i] = el;
  };

  return { setRef, heights };
}
