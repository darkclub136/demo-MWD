import Image from "next/image";

import { ASSETS } from "@/components/sites/elaro-framer-website-d569c65d/shared/assets";
import { ElaroButton } from "@/components/sites/elaro-framer-website-d569c65d/shared/ElaroButton";
import { Reveal } from "@/components/sites/elaro-framer-website-d569c65d/shared/Reveal";

const INTRO =
  "Chúng mình sắp về chung một nhà! Mời bạn xem lịch trình, địa điểm, gợi ý trang phục và xác nhận tham dự để cùng chung vui trong ngày trọng đại của chúng mình.";

/**
 * One loop of the marquee. The photo set is repeated so a single loop
 * (~4300px at desktop) is wider than any screen — otherwise the strip runs
 * out and leaves a gap on the right before it wraps.
 */
const MARQUEE_LOOP = [...ASSETS.marquee, ...ASSETS.marquee, ...ASSETS.marquee];

function MarqueeCards() {
  return (
    <>
      {MARQUEE_LOOP.map((src, index) => (
        <Image
          key={`${src}-${index}`}
          src={src}
          alt=""
          width={273}
          height={389}
          loading="eager"
          className="h-[186px] w-[131px] shrink-0 object-cover xl:h-[388.5px] xl:w-[273px]"
        />
      ))}
    </>
  );
}

/**
 * The About block: ornament rule, intro copy, RSVP button, and the
 * arc-masked photo marquee that loops leftward forever.
 *
 * The curve at the top and bottom of the photo strip is not a CSS shape — it is
 * two copies of a cream arc PNG pinned over the strip, the top one rotated 180deg.
 */
export function AboutSection() {
  return (
    <section className="relative flex flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-[80px] py-[130px] xl:py-[180px]">
        <Reveal className="px-5 xl:px-0">
          <div className="flex flex-col items-center justify-center gap-[40px]">
            <div className="flex flex-col items-center gap-[20px]">
              <Image
                src={ASSETS.ornamentRule}
                alt=""
                width={270}
                height={30}
                className="h-[30px] w-[270px] object-contain"
              />
              <h4 className="font-display max-w-[770px] text-center text-[18px] font-normal leading-[24px] tracking-[-0.36px] text-black xl:text-[30px] xl:leading-[38px] xl:tracking-[-0.6px]">
                {INTRO}
              </h4>
            </div>
            <ElaroButton label="Xác nhận tham dự" href="#rsvp" />
          </div>
        </Reveal>

        <div className="relative flex h-[186px] w-full flex-row items-center justify-center overflow-clip xl:h-[388.5px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[-1px] z-[2] h-[28px] w-full rotate-180 xl:h-[59.375px]"
          >
            <Image
              src={ASSETS.marqueeFade}
              alt=""
              width={1425}
              height={59}
              className="h-full w-full object-cover"
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-1px] z-[2] h-[28px] w-full xl:h-[59.375px]"
          >
            <Image
              src={ASSETS.marqueeFade}
              alt=""
              width={1425}
              height={59}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative flex w-full flex-row items-center overflow-clip">
            <div
              className="elaro-ticker-track flex-row items-center gap-[15px]"
              style={{ "--elaro-ticker-duration": "108s" } as React.CSSProperties}
            >
              <MarqueeCards />
              <div
                aria-hidden="true"
                className="flex shrink-0 flex-row items-center gap-[15px] pl-[15px]"
              >
                <MarqueeCards />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
