import Link from "next/link";
import { cn } from "@/lib/utils";

interface ElaroButtonProps {
  label: string;
  href?: string;
  type?: "button" | "submit";
  /** Open `href` in a new tab instead of navigating away. */
  newTab?: boolean;
  /** Click handler for the `<button>` variant (no `href`). */
  onClick?: () => void;
  className?: string;
}

/**
 * The olive block button used in the nav, About, Venue and RSVP sections.
 *
 * Background #6F7E62, padding 13px 30px, height 50px, no radius.
 * The label is rendered twice inside a 24px clipped box; on hover the pair
 * slides up exactly one label height so the second copy takes the first's place.
 */
export function ElaroButton({
  label,
  href,
  type = "button",
  newTab = false,
  onClick,
  className,
}: ElaroButtonProps) {
  const body = (
    <span className="block h-6 overflow-hidden">
      <span className="block transition-transform duration-[350ms] ease-[cubic-bezier(0.44,0,0.56,1)] group-hover:-translate-y-6">
        <span className="block h-6 text-[18px] leading-6 font-semibold text-white">
          {label}
        </span>
        <span className="block h-6 text-[18px] leading-6 font-semibold text-white">
          {label}
        </span>
      </span>
    </span>
  );

  const classes = cn(
    "group font-display inline-flex h-[50px] items-center justify-center bg-[#6F7E62] px-[30px] py-[13px]",
    className,
  );

  if (href && newTab) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {body}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {body}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {body}
    </button>
  );
}
