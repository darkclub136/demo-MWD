"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Stagger, in milliseconds. */
  delay?: number;
  className?: string;
}

/**
 * The entrance animation Framer applies to nearly every block on the page:
 * opacity 0 → 1 with translateY(20px) → 0 over 0.6s, fired once when the element
 * enters the viewport.
 *
 * Under `prefers-reduced-motion` the `motion-reduce:` utilities below pin the
 * element to its final state, so nothing is ever hidden from those users.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.44,0,0.56,1)]",
        "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
