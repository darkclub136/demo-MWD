"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

import { ASSETS } from "@/components/sites/elaro-framer-website-d569c65d/shared/assets";
import { Reveal } from "@/components/sites/elaro-framer-website-d569c65d/shared/Reveal";
import { SectionHeading } from "@/components/sites/elaro-framer-website-d569c65d/shared/SectionHeading";
import { useScrollFrame } from "@/components/sites/elaro-framer-website-d569c65d/shared/useScrollFrame";

/** The travel of the progress fill: it is 400px tall and slides from -400 to 0. */
const FILL_HEIGHT = 400;

interface StoryEntry {
  year: string;
  title: string;
  description: string;
  image: string;
  /** Card 2 puts the text on the left and the photo on the right. */
  reversed?: boolean;
}

const STORY: readonly StoryEntry[] = [
  {
    year: "2018",
    title: "The day we met",
    description:
      "Our journey began in 2018—through shy smiles and laughter at a friend’s gathering, we found a connection that felt timeless and true.",
    image: ASSETS.story.met,
  },
  {
    year: "2022",
    title: "The Proposal day",
    description:
      "After years of memories, a seaside sunset paused the world—one question, full of love and gratitude, marked the beginning of our forever.",
    image: ASSETS.story.proposal,
    reversed: true,
  },
  {
    year: "2026",
    title: "The Celebration day",
    description:
      "Surrounded by loved ones, we begin our next chapter—celebrating laughter, lessons, and a love that grows. We can’t wait to share this moment.",
    image: ASSETS.story.celebration,
  },
];

/**
 * The four absolutely positioned pieces of the centre rule, measured from the
 * top of the 940px timeline column. The last segment carries no heart.
 */
const SEGMENTS: readonly { top: number; height: number; heart: boolean }[] = [
  { top: 0, height: 83, heart: true },
  { top: 137, height: 387, heart: true },
  { top: 578, height: 387, heart: true },
  { top: 1019, height: 267, heart: false },
];

/**
 * The "Our story" timeline: three photo/text cards threaded by a vertical rule
 * whose black fill is driven directly by scroll position (not eased, not a
 * toggle). The rule and its hearts are dropped entirely on the stacked layout
 * below 1200px.
 */
export function StorySection() {
  const tracks = useRef<(HTMLDivElement | null)[]>([]);
  const fills = useRef<(HTMLDivElement | null)[]>([]);

  const update = useCallback(() => {
    const centre = window.innerHeight / 2;
    for (let i = 0; i < SEGMENTS.length; i += 1) {
      const track = tracks.current[i];
      const fill = fills.current[i];
      if (!track || !fill) continue;
      const rect = track.getBoundingClientRect();
      if (rect.height <= 0) continue;
      const raw = (centre - rect.top) / rect.height;
      const progress = Math.min(1, Math.max(0, raw));
      fill.style.transform = `translateY(${(progress - 1) * FILL_HEIGHT}px)`;
    }
  }, []);

  // Scroll-linked, so it reads the position every frame (see useScrollFrame).
  useScrollFrame(update);

  useEffect(() => {
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  return (
    <section className="relative flex flex-row items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-[80px] px-[20px] pb-[130px] xl:px-[40px] xl:pb-[180px]">
        <Reveal>
          <SectionHeading lead="Our" accent="story" />
        </Reveal>

        <div className="flex w-full flex-row justify-center">
          {/* The original column declares height 1286px and lets the last card overflow
              100px into the container's bottom padding — reproduce that exactly so the
              section totals 1681px rather than 1781px. */}
          <div className="relative flex w-full flex-col items-center gap-[40px] xl:h-[1286px] xl:w-[940px] xl:pt-[100px]">
            {SEGMENTS.map((segment, index) => (
              <div
                key={segment.top}
                aria-hidden="true"
                className="absolute left-1/2 z-0 hidden w-[32px] -translate-x-1/2 flex-col items-center gap-[15px] xl:flex"
                style={{ top: `${segment.top}px` }}
              >
                <div
                  ref={(node) => {
                    tracks.current[index] = node;
                  }}
                  className="relative w-[2px] overflow-hidden rounded-[4px] bg-black/20"
                  style={{ height: `${segment.height}px` }}
                >
                  <div
                    ref={(node) => {
                      fills.current[index] = node;
                    }}
                    className="absolute top-0 h-[400px] w-[2px] rounded-[10px] bg-black will-change-transform"
                    style={{ transform: `translateY(-${FILL_HEIGHT}px)` }}
                  />
                </div>
                {segment.heart ? (
                  <Image
                    src={ASSETS.ornamentHeart}
                    alt=""
                    width={28}
                    height={24}
                    className="h-[24px] w-[28px] object-contain"
                  />
                ) : null}
              </div>
            ))}

            {STORY.map((entry, index) => (
              <Reveal
                key={entry.year}
                delay={index * 100}
                className="relative z-10 w-full xl:w-[940px]"
              >
                <div
                  className={`flex w-full flex-col items-center justify-between gap-[40px] xl:h-[402px] xl:w-[940px] xl:gap-0 ${
                    entry.reversed ? "xl:flex-row-reverse" : "xl:flex-row"
                  }`}
                >
                  <div className="relative aspect-square w-full overflow-clip xl:h-[402px] xl:w-[402px] xl:flex-none">
                    <Image
                      src={entry.image}
                      alt={entry.title}
                      fill
                      sizes="(min-width: 1200px) 402px, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex w-full flex-col items-center justify-center gap-[70px] xl:h-[232px] xl:w-[420px]">
                    <h3 className="font-display text-center text-[48px] font-normal leading-[52px] tracking-[-0.96px] text-[rgb(201,169,106)]">
                      {entry.year}
                    </h3>
                    <div className="flex flex-col items-center gap-[20px]">
                      <h5 className="font-display text-center text-[26px] font-normal leading-[30px] tracking-[-0.52px] text-black">
                        {entry.title}
                      </h5>
                      <p className="w-full text-center text-[16px] font-normal leading-[20px] text-black/70 xl:w-[420px]">
                        {entry.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
