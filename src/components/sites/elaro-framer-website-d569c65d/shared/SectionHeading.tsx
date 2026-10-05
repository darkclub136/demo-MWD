import Image from "next/image";
import { cn } from "@/lib/utils";
import { ASSETS } from "./assets";

interface SectionHeadingProps {
  /** The part of the heading rendered in black (or white, on dark sections). */
  lead: string;
  /** The part rendered in gold #C9A96A. */
  accent: string;
  /** Dark sections render the lead in white. */
  tone?: "light" | "dark";
  /** Wrapper width for the heading text — 700px on most sections, full width on Story/Schedule. */
  headingClassName?: string;
  className?: string;
}

/**
 * The ornament rule + two-tone Fraunces heading that opens the About, Story,
 * Schedule, Hotels, FAQ and Dress-code sections.
 *
 * Ornament: 270 × 30, 20px above the heading.
 * Heading: 82px / 85px, letter-spacing -1.64px (50px / 55px, -1px below 1200px).
 */
export function SectionHeading({
  lead,
  accent,
  tone = "light",
  headingClassName,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col items-center gap-5", className)}>
      <Image
        src={ASSETS.ornamentRule}
        alt=""
        width={270}
        height={30}
        className="h-[30px] w-[270px]"
      />
      <h2
        className={cn(
          "font-display text-center text-[50px] leading-[55px] tracking-[-1px] xl:text-[82px] xl:leading-[85px] xl:tracking-[-1.64px]",
          tone === "dark" ? "text-white" : "text-black",
          headingClassName,
        )}
      >
        {lead} <span className="text-[#C9A96A]">{accent}</span>
      </h2>
    </div>
  );
}
