import { ElaroButton } from "@/components/sites/elaro-framer-website-d569c65d/shared/ElaroButton";
import { Reveal } from "@/components/sites/elaro-framer-website-d569c65d/shared/Reveal";

const BODY =
  "Rất mong được đón tiếp bạn để cùng chung vui trong ngày đặc biệt của chúng mình.";

const MAP_URL = "https://maps.app.goo.gl/xh7s7wuP768hgmLB8?g_st=ic";

/** The pin behind MAP_URL, embedded in place of the venue photo. */
const VENUE_COORDS = "21.0386469,105.5200456";
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${VENUE_COORDS}&z=16&hl=vi&output=embed`;

const DETAILS: ReadonlyArray<{ label: string; value: string }> = [
  { label: "Địa chỉ:", value: "Số nhà 3, ngõ 87" },
  { label: "Ngày:", value: "20 & 21 Tháng 10" },
  { label: "Khu vực:", value: "Cổ Đông, Đoài Phương" },
  { label: "Năm:", value: "2026" },
];

/**
 * The Venue block: an embedded Google Map of the venue on the left paired
 * with the copy column on the right.
 *
 * The source markup stacks a second photo below the first, but it never becomes
 * visible in the settled layout, so only the primary venue photo is rendered.
 */
export function VenueSection() {
  return (
    <section
      id="venue"
      className="relative flex flex-row items-start justify-center bg-[#0F0F0F] xl:h-[766px]"
    >
      <div className="flex w-full flex-col items-start justify-start xl:flex-row xl:gap-[60px] xl:pr-[40px]">
        <div className="relative aspect-square w-full overflow-clip bg-[#1a1a1a] md:aspect-[693/600] xl:aspect-auto xl:h-[766px] xl:w-[693px] xl:shrink-0">
          <iframe
            src={MAP_EMBED_URL}
            title="Bản đồ địa điểm tổ chức: Số nhà 3, ngõ 87, Cổ Đông, Đoài Phương"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>

        <div className="flex w-full flex-col items-start justify-start gap-[60px] px-[20px] py-[60px] xl:w-[580px] xl:px-0 xl:py-[120px]">
          <Reveal className="w-full">
            <div className="flex w-full flex-col items-start justify-center gap-[20px] xl:h-[202px] xl:w-[580px]">
              <p className="text-[14px] font-normal leading-[18px] text-white/70">
                Địa điểm tổ chức
              </p>
              <h3 className="font-display text-[30px] font-normal leading-[34px] tracking-[-0.6px] text-[#C9A96A] xl:h-[104px] xl:w-[490px] xl:text-[48px] xl:leading-[52px] xl:tracking-[-0.96px]">
                <span className="text-white">Hẹn gặp bạn tại </span>
                Cổ Đông, Đoài Phương
              </h3>
              <p className="w-full text-[16px] font-normal leading-[20px] text-white/70 xl:h-[40px] xl:w-[450px]">
                {BODY}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="w-full">
            <div className="grid w-full grid-cols-2 gap-[40px] xl:h-[154px] xl:w-[470px] xl:grid-cols-[repeat(2,200px)] xl:gap-x-[70px]">
              {DETAILS.map((detail) => (
                <div
                  key={detail.label}
                  className="flex flex-col justify-start gap-[15px] xl:h-[57px] xl:w-[200px]"
                >
                  <p className="text-[14px] font-normal leading-[18px] text-white/40">
                    {detail.label}
                  </p>
                  <p className="font-display text-[18px] font-normal leading-[24px] text-white">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="w-[200px]">
              <ElaroButton label="Xem bản đồ" href={MAP_URL} newTab />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
