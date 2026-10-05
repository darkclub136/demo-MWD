import Image from "next/image";

import { ASSETS } from "@/components/sites/elaro-framer-website-d569c65d/shared/assets";
import { HairlineIcon } from "@/components/sites/elaro-framer-website-d569c65d/shared/icons";
import { Reveal } from "@/components/sites/elaro-framer-website-d569c65d/shared/Reveal";

export function SiteFooter() {
  return (
    <footer className="relative flex flex-row items-center justify-center bg-[rgb(248,245,240)]">
      <div className="flex w-full flex-col items-center justify-start gap-[70px] px-10 pt-0 pb-[30px]">
        <Reveal className="w-full" delay={0}>
          <div className="flex w-full flex-col items-center justify-center gap-[70px]">
            <div className="flex w-full max-w-[1200px] flex-row items-center justify-between xl:h-[170px]">
              <p className="font-display text-[64px] leading-[56px] font-normal tracking-[-1.28px] text-black xl:text-[190px] xl:leading-[170px] xl:tracking-[-7.6px]">
                Khởi
              </p>
              <p className="font-display text-[64px] leading-[56px] font-normal tracking-[-1.28px] text-[rgb(201,169,106)] xl:text-[190px] xl:leading-[170px] xl:tracking-[-7.6px]">
                &amp;
              </p>
              <p className="font-display text-[64px] leading-[56px] font-normal tracking-[-1.28px] text-black xl:text-[190px] xl:leading-[170px] xl:tracking-[-7.6px]">
                Mây
              </p>
            </div>

            <div className="flex w-full max-w-[900px] flex-row flex-wrap items-center justify-center gap-x-[30px] gap-y-2 xl:h-6 xl:flex-nowrap">
              <HairlineIcon className="hidden h-px w-[101px] shrink-0 text-black/20 xl:block" />
              <p className="font-display text-[18px] leading-6 font-normal text-black">
                20 &amp; 21 Tháng 10, 2026
              </p>
              <Image
                src={ASSETS.ornamentHeart}
                alt=""
                width={28}
                height={24}
                className="h-6 w-7 shrink-0"
              />
              <p className="font-display text-[18px] leading-6 font-normal text-black">
                Số nhà 3, ngõ 87, Cổ Đông, Đoài Phương
              </p>
              <HairlineIcon className="hidden h-px w-[102px] shrink-0 text-black/20 xl:block" />
            </div>
          </div>
        </Reveal>

        <Reveal className="w-full" delay={100}>
          <div className="flex w-full flex-col items-center justify-center gap-[30px]">
            <div className="relative h-[432px] w-[310px] max-w-full shrink-0 overflow-hidden xl:h-[607px] xl:w-[435px]">
              <Image
                src={ASSETS.footer[0]}
                alt="Khởi & Mây"
                fill
                sizes="435px"
                className="object-cover"
              />
            </div>

            <p className="h-5 w-full text-center text-[16px] leading-5 font-normal text-black/70">
              2026 © Khởi &amp; Mây
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
