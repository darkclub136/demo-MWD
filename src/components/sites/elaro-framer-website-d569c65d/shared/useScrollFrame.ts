"use client";

import { useEffect, useRef } from "react";

/**
 * Runs `callback(scrollY)` whenever the page's scroll position changes.
 *
 * The page scrolls through Lenis, which animates the scroll position from its
 * own `requestAnimationFrame` loop. Reading the position per frame is what
 * gives a scroll-linked value (such as the Story timeline's progress fill) a
 * value on every intermediate frame of a Lenis-eased scroll, rather than only
 * where native `scroll` events happen to land.
 *
 * A native `scroll` listener is kept alongside the frame loop so the callback
 * still runs if frames are throttled (a backgrounded or occluded tab suspends
 * `requestAnimationFrame` entirely).
 *
 * For a simple on/off trigger, prefer `IntersectionObserver` — it keeps working
 * when frames are suspended.
 */
export function useScrollFrame(callback: (scrollY: number) => void) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let frame = 0;
    let last = Number.NaN;

    const run = () => {
      const y = window.scrollY;
      if (y === last) return;
      last = y;
      callbackRef.current(y);
    };

    const tick = () => {
      run();
      frame = requestAnimationFrame(tick);
    };

    run();
    frame = requestAnimationFrame(tick);
    window.addEventListener("scroll", run, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", run);
    };
  }, []);
}
