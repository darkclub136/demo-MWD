"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/sites/elaro-framer-website-d569c65d/shared/SectionHeading";
import {
  PlusIcon,
  MinusIcon,
} from "@/components/sites/elaro-framer-website-d569c65d/shared/icons";
import { Reveal } from "@/components/sites/elaro-framer-website-d569c65d/shared/Reveal";
import { cn } from "@/lib/utils";

interface FaqEntry {
  question: string;
  answer: string;
}

const FAQS: readonly FaqEntry[] = [
  {
    question: "Mình có thể dẫn thêm người đi cùng không?",
    answer:
      "Bạn có thể dẫn người đi cùng nếu thiệp mời có ghi rõ. Hãy xem lại thiệp hoặc liên hệ với chúng mình để xác nhận nhé.",
  },
  {
    question: "Khách nên có mặt lúc mấy giờ?",
    answer:
      "Bạn nên có mặt trước giờ bắt đầu khoảng 15–30 phút để kịp đón tiếp, ổn định chỗ ngồi và để buổi lễ diễn ra suôn sẻ.",
  },
  {
    question: "Có thể đưa trẻ nhỏ đi cùng không?",
    answer:
      "Có chứ! Bạn vui lòng báo trước để chúng mình sắp xếp chỗ ngồi phù hợp và thoải mái cho các bé.",
  },
  {
    question: "Có chỗ đỗ xe không?",
    answer:
      "Có, có khu vực đỗ xe ngay tại địa điểm tổ chức. Khi đến nơi, bạn vui lòng đi theo biển chỉ dẫn hoặc hướng dẫn của người hỗ trợ nhé.",
  }
];

interface FaqItemProps {
  id: string;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}

function FaqItem({ id, question, answer, open, onToggle }: FaqItemProps) {
  return (
    <div className="w-full overflow-hidden shadow-[inset_0_-1px_0_rgba(255,255,255,0.1)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full cursor-pointer flex-col items-start py-[30px] text-left"
      >
        <div className="flex min-h-[25px] w-full flex-row items-center justify-between gap-5">
          <p className="text-[20px] leading-[24px] font-medium tracking-[-0.2px] text-white">
            {question}
          </p>
          <span className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-[13px] bg-white text-[#0F0F0F]">
            {open ? <MinusIcon /> : <PlusIcon />}
          </span>
        </div>
        <div
          id={id}
          className={cn(
            "grid w-full overflow-hidden transition-[grid-template-rows] duration-[350ms] ease-[cubic-bezier(0.44,0,0.56,1)]",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="min-h-0">
            <p className="pt-5 text-[16px] leading-[20px] font-normal text-white/70 xl:w-[760px]">
              {answer}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}

/**
 * The FAQ accordion — a click-driven, single-open list of five rows on the
 * near-black #0F0F0F band below the hotels section.
 */
export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative flex flex-row items-center justify-center bg-[#0F0F0F]"
    >
      <div className="flex w-full flex-col items-center justify-center gap-20 px-[30px] py-[100px] xl:px-[170px] xl:py-[120px]">
        <Reveal>
          <SectionHeading
            lead="Một vài điều"
            accent="cần biết"
            tone="dark"
            headingClassName="max-w-[700px]"
          />
        </Reveal>
        <Reveal delay={100} className="w-full xl:w-[1085px]">
          <div className="flex w-full flex-col gap-0">
            {FAQS.map((faq, index) => (
              <FaqItem
                key={faq.question}
                id={`faq-answer-${index}`}
                question={faq.question}
                answer={faq.answer}
                open={openIndex === index}
                onToggle={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
