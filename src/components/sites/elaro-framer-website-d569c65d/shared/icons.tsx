import type { SVGProps } from "react";

/** The 40 × 1 hairline rule beside the hero eyebrow and the footer date row. */
export function HairlineIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 1"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <line x1="0" y1="0.5" x2="40" y2="0.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** The `+` shown in a closed FAQ row's toggle circle. */
export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5.5 0v11M0 5.5h11"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The `−` shown in an open FAQ row's toggle circle. */
export function MinusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path d="M0 5.5h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** The three-bar menu icon inside the phone nav's white circle (28 × 15). */
export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="28"
      height="15"
      viewBox="0 0 28 15"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M0 1h28M0 7.5h28M0 14h28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
