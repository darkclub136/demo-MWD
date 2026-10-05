import Image from "next/image";

import { ASSETS } from "@/components/sites/elaro-framer-website-d569c65d/shared/assets";
import { HairlineIcon } from "@/components/sites/elaro-framer-website-d569c65d/shared/icons";

const NAME_CLASS =
  "font-display font-normal text-white text-[44px] leading-10 tracking-[-0.88px] xl:text-[190px] xl:leading-[170px] xl:tracking-[-7.6px]";

/** The full-bleed hero: photo, bottom scrim, eyebrow, the two names, and the date. */
export function HeroSection() {
  return (
    <section
      id="banner-section"
      className="relative flex h-[133vw] min-h-[460px] w-full flex-row items-end justify-center overflow-clip md:h-[720px] xl:h-screen"
    >
      <div className="absolute inset-0">
        <Image
          src={ASSETS.hero}
          alt="Khởi và Mây"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[55%_center] md:object-center"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(rgba(0,0,0,0)_0%,rgb(0,0,0)_100%)]" />

      <div className="relative z-[2] flex w-full max-w-[1440px] flex-col items-start justify-center gap-2.5 px-5 pt-[100px] pb-8 md:h-[370px] md:pb-10 xl:px-10">
        <div className="elaro-rise w-full">
          <div className="flex h-5 w-full flex-row items-center justify-start">
            <p className="w-[130px] text-base leading-5 font-normal text-white/70">
              Đám cưới của
            </p>
            <HairlineIcon className="h-px w-10 shrink-0 text-white/70" />
          </div>
        </div>

        <div className="elaro-rise w-full [--elaro-rise-delay:100ms]">
          <div className="flex h-10 w-full flex-row items-center justify-between xl:h-[170px]">
            <div className="xl:w-[420px]">
              <h1 className={NAME_CLASS}>Khởi</h1>
            </div>
            <div className="xl:w-[180px]">
              <h1 className={NAME_CLASS}>&amp;</h1>
            </div>
            <div className="xl:w-[400px]">
              <h1 className={NAME_CLASS}>Mây</h1>
            </div>
          </div>
        </div>

        <div className="elaro-rise w-full [--elaro-rise-delay:200ms]">
          <div className="flex h-5 w-full flex-row items-center justify-end gap-2.5 xl:mt-8">
            <HairlineIcon className="h-px w-10 shrink-0 text-white/70" />
            <p className="text-right text-base leading-5 font-normal whitespace-nowrap text-white/70">
              Ngày 20 &amp; 21 Tháng 10, 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
