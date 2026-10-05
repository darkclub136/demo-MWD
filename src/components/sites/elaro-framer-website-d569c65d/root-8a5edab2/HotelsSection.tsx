import Image from "next/image";
import { ASSETS } from "@/components/sites/elaro-framer-website-d569c65d/shared/assets";
import { SectionHeading } from "@/components/sites/elaro-framer-website-d569c65d/shared/SectionHeading";
import { cn } from "@/lib/utils";

interface Hotel {
  name: string;
  description: string;
}

const HOTELS: Hotel[] = [
  {
    name: "1. Khách sạn Laurentius",
    description:
      "Khách sạn yên bình có dịch vụ spa, cách địa điểm tổ chức khoảng 10 phút lái xe.",
  },
  {
    name: "2. Khách sạn Belvedere",
    description:
      "Nhà nghỉ ấm cúng, thân thiện, chỉ cách địa điểm tổ chức 5 phút đi bộ.",
  },
  {
    name: "3. Khách sạn Florence",
    description:
      "Không gian nghỉ dưỡng thư thái có spa, chỉ cách địa điểm tổ chức 6 phút đi xe.",
  },
];

/**
 * "Where to sleep after party" — a static block: one photo beside the three
 * hotel rows and the contact line. No pinning, scroll switching or animation.
 * Below 1200px the photo stacks above the rows.
 */
export function HotelsSection() {
  return (
    <section id="hotel" className="relative flex flex-row justify-center">
      <div className="flex w-full flex-col items-center justify-start gap-20 px-5 pb-[130px] xl:w-[1425px] xl:px-10 xl:pb-[180px]">
        <SectionHeading
          lead="Nơi nghỉ"
          accent="sau tiệc cưới"
          headingClassName="max-w-[700px]"
        />

        <div className="flex w-full flex-col items-start justify-center gap-[60px] xl:flex-row xl:items-center">
          <div className="relative aspect-[350/329] w-full overflow-hidden xl:aspect-auto xl:h-[640px] xl:w-[530px] xl:shrink-0">
            <Image
              src={ASSETS.hotels[0]}
              alt="Phòng nghỉ khách sạn"
              fill
              sizes="(min-width: 1200px) 530px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex w-full flex-col justify-center gap-20 xl:w-[755px]">
            <div className="flex w-full flex-col gap-[30px]">
              {HOTELS.map((hotel, index) => (
                <div
                  key={hotel.name}
                  className={cn(
                    "flex flex-col gap-5 pb-[30px]",
                    index < HOTELS.length - 1 && "border-b border-black/10",
                  )}
                >
                  <h5 className="font-display text-[26px] leading-[30px] font-normal tracking-[-0.52px] text-black">
                    {hotel.name}
                  </h5>
                  <p className="max-w-[450px] text-[16px] leading-5 font-normal text-black/70">
                    {hotel.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-5">
              <a
                href="tel:+40723456789"
                className="text-[20px] leading-6 font-medium tracking-[-0.2px] text-[#C9A96A]"
              >
                +40 723 456 789
              </a>
              <p className="max-w-[490px] text-[16px] leading-5 font-normal text-black/70">
                Nếu bạn cần hỗ trợ chọn nơi nghỉ phù hợp, đừng ngần ngại liên
                hệ — chúng mình luôn sẵn lòng giúp đỡ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
