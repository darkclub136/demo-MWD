import Image from "next/image";
import { ASSETS } from "@/components/sites/elaro-framer-website-d569c65d/shared/assets";
import { SectionHeading } from "@/components/sites/elaro-framer-website-d569c65d/shared/SectionHeading";
import { Reveal } from "@/components/sites/elaro-framer-website-d569c65d/shared/Reveal";

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  image: string;
}

const SCHEDULE: readonly ScheduleItem[] = [
  {
    time: "15:00",
    title: "Lễ thành hôn",
    description:
      "Cùng chứng kiến khoảnh khắc chúng mình trao nhau lời hứa trăm năm, bên những người thân yêu nhất.",
    image: ASSETS.schedule.ceremony,
  },
  {
    time: "16:00",
    title: "Đón khách & giao lưu",
    description:
      "Cùng nâng ly, trò chuyện và chia vui trong không khí ấm cúng, rộn ràng.",
    image: ASSETS.schedule.drinks,
  },
  {
    time: "18:00",
    title: "Tiệc cưới",
    description:
      "Thưởng thức bữa tiệc thân mật, những lời chúc ý nghĩa và cùng lưu giữ những kỷ niệm đáng nhớ.",
    image: ASSETS.schedule.dinner,
  },
  {
    time: "20:00",
    title: "Văn nghệ & chung vui",
    description:
      "Khép lại ngày vui với âm nhạc, tiếng cười và những điệu nhảy cùng nhau.",
    image: ASSETS.schedule.party,
  },
];

/**
 * One schedule row. Below 1200px a stacked card (photo above, copy beneath);
 * at 1200px and up a 1345 × 481 row with the copy in a 404px column on the
 * left and the photo 882px wide on the right.
 *
 * The source animated each card from a full-bleed "closed" state into this
 * layout as it scrolled into view. That animated height and width, forcing a
 * full-page layout and a repaint of a large photo on every frame, which made
 * scrolling past the venue section stutter — so cards render in their final
 * layout and only fade in.
 */
function ScheduleCard({ item }: { item: ScheduleItem }) {
  return (
    <Reveal className="w-full">
      <div className="flex w-full flex-col xl:h-[481px] xl:flex-row-reverse xl:items-center xl:justify-between">
        <div className="relative aspect-video w-full overflow-hidden xl:aspect-auto xl:h-full xl:w-[882px] xl:shrink-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1200px) 882px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col items-start justify-center gap-5 pt-6 text-left xl:w-[404px] xl:gap-[100px] xl:pt-0">
          <div className="inline-flex h-[26px] items-center rounded-none bg-[rgb(201,169,106)] px-2 py-[3px]">
            <p className="text-[16px] leading-[20px] font-medium text-white">
              {item.time}
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <h5 className="font-display text-[26px] leading-[30px] font-normal tracking-[-0.52px] text-black">
              {item.title}
            </h5>
            <p className="text-[16px] leading-[20px] font-normal text-black/70 xl:w-[380px]">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/** The "Lịch trình ngày cưới" section. */
export function ScheduleSection() {
  return (
    <section
      id="schedule"
      className="relative flex flex-row items-center justify-center"
    >
      <div className="flex w-full flex-col items-center justify-center gap-20 px-5 py-[130px] xl:w-auto xl:gap-20 xl:px-10 xl:py-[180px]">
        <Reveal>
          <SectionHeading lead="Lịch trình" accent="ngày cưới" />
        </Reveal>

        <div className="flex w-full flex-col items-center justify-center gap-10 xl:w-[1345px]">
          {SCHEDULE.map((item) => (
            <ScheduleCard key={item.time} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
