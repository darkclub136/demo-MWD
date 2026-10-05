import Image from "next/image";

import { ASSETS } from "@/components/sites/elaro-framer-website-d569c65d/shared/assets";

const PHRASES = [
  "Khởi & Mây",
  "Số nhà 3, ngõ 87, Cổ Đông, Đoài Phương",
  "Ngày 20 & 21 Tháng 10",
  "2026",
] as const;

/**
 * One loop of the ticker. The phrases are repeated so a single loop (~3300px)
 * is wider than any screen — otherwise the line runs out and leaves a gap on
 * the right before it wraps.
 */
const TICKER_LOOP = [...PHRASES, ...PHRASES];

function TickerItems() {
  return (
    <>
      {TICKER_LOOP.map((phrase, index) => (
        <p
          key={`${phrase}-${index}`}
          className="font-display flex shrink-0 flex-row items-center gap-[40px] whitespace-nowrap text-[34px] font-normal leading-[38px] text-black"
        >
          {phrase}
          <Image
            src={ASSETS.ornamentHeart}
            alt=""
            width={28}
            height={24}
            className="h-[24px] w-[28px] shrink-0 object-cover"
          />
        </p>
      ))}
    </>
  );
}

export function DetailsTicker() {
  return (
    <section className="relative flex w-full flex-row items-center justify-center">
      <div className="flex w-full flex-row items-center justify-center py-[50px]">
        <div className="flex w-full flex-row items-center overflow-hidden">
          <div
            className="elaro-ticker-track flex-row items-center gap-[40px]"
            style={{ "--elaro-ticker-duration": "64s" } as React.CSSProperties}
          >
            <TickerItems />
            <div
              aria-hidden="true"
              className="flex shrink-0 flex-row items-center gap-[40px] pr-[40px]"
            >
              <TickerItems />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
