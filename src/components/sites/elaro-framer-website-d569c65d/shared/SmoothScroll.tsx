"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * The original page scrolls through Lenis (`<html class="lenis">`), which is
 * what gives it its distinctive easing. Mount this once, at the page level.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ anchors: true });
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
