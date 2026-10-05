import Image from "next/image";
import { ASSETS } from "@/components/sites/elaro-framer-website-d569c65d/shared/assets";
import { SectionHeading } from "@/components/sites/elaro-framer-website-d569c65d/shared/SectionHeading";
import { Reveal } from "@/components/sites/elaro-framer-website-d569c65d/shared/Reveal";

interface DressPanel {
  image: string;
  caption: string;
  /** Entrance stagger, in milliseconds. */
  delay: number;
}

const PANELS: DressPanel[] = [
  {
    image: ASSETS.dress[0],
    caption:
      "Khuyến khích trang phục lịch sự, trang nhã — ví dụ như một bộ vest kèm giày tây.",
    delay: 0,
  },
  {
    image: ASSETS.dress[1],
    caption:
      "Hãy chọn chất liệu thoáng mát cùng những gam màu nhẹ nhàng, nhã nhặn.",
    delay: 100,
  },
  {
    image: ASSETS.dress[2],
    caption:
      "Không có quy định khắt khe — hãy mặc những gì khiến bạn tự tin nhất. Chỉ một lời nhờ nhỏ: xin dành màu trắng cho cô dâu nhé.",
    delay: 200,
  },
];

/**
 * "What to wear" — the dress-code section: heading, then three photo + caption
 * panels. A centred three-column grid from 768px up, a single column below.
 */
export function DressCodeSection() {
  return (
    <section
      id="dress-code"
      className="relative flex flex-row items-center justify-center"
    >
      <div className="flex w-full max-w-[1425px] flex-col items-center gap-20 px-5 py-[130px] xl:px-10 xl:py-[180px]">
        <Reveal>
          <SectionHeading lead="Gợi ý" accent="trang phục" headingClassName="max-w-[700px]" />
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-[60px] md:grid-cols-3 md:gap-5 xl:gap-10">
          {PANELS.map((panel) => (
            <Reveal key={panel.image} delay={panel.delay} className="w-full">
              <div className="flex flex-col gap-5">
                <div className="relative aspect-[400/420] w-full overflow-hidden">
                  <Image
                    src={panel.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="w-full text-[16px] leading-5 font-medium text-black">
                  {panel.caption}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
