"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type SubmitEvent } from "react";
import { cn } from "@/lib/utils";
import { ASSETS } from "@/components/sites/elaro-framer-website-d569c65d/shared/assets";
import { ElaroButton } from "@/components/sites/elaro-framer-website-d569c65d/shared/ElaroButton";
import { Reveal } from "@/components/sites/elaro-framer-website-d569c65d/shared/Reveal";

interface TextFieldProps {
  label: string;
  placeholder: string;
  type: "text" | "email";
  name: string;
}

function TextField({ label, placeholder, type, name }: TextFieldProps) {
  return (
    <label className="flex h-[88px] w-full flex-col items-start gap-[10px]">
      <span className="h-[18px] text-[14px] leading-[18px] font-normal text-black/70">
        {label}
      </span>
      <div className="flex h-[60px] w-full items-center rounded-none bg-[rgb(237,234,223)] p-[20px]">
        <input
          type={type}
          name={name}
          required
          placeholder={placeholder}
          className="font-display w-full border-none bg-transparent text-[16px] leading-[20px] font-normal text-black focus:outline-none"
        />
      </div>
    </label>
  );
}

interface ThankYouDialogProps {
  open: boolean;
  /** The guest's name; kept after closing so it doesn't vanish mid-fade. */
  guestName: string;
  onClose: () => void;
}

/**
 * The "thank you" popup shown after the (decorative) RSVP form is sent. It
 * stays mounted so it can fade in and out; Escape, the backdrop and the button
 * all close it.
 */
function ThankYouDialog({ open, guestName, onClose }: ThankYouDialogProps) {
  const closeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.querySelector("button")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="rsvp-thanks-title"
      aria-hidden={!open}
      data-lenis-prevent
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center px-5 transition-[opacity,visibility] duration-300 ease-[ease]",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <button
        type="button"
        aria-label="Đóng"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/60"
      />

      <div
        className={cn(
          "relative flex w-full max-w-[520px] flex-col items-center gap-6 bg-[#F8F5F0] px-6 py-12 text-center transition-transform duration-[400ms] ease-[cubic-bezier(0.44,0,0.56,1)] md:px-12 md:py-14",
          open ? "translate-y-0 scale-100" : "translate-y-4 scale-[0.97]",
        )}
      >
        <Image
          src={ASSETS.ornamentRule}
          alt=""
          width={270}
          height={30}
          className="h-[30px] w-[220px] object-contain md:w-[270px]"
        />
        <h3
          id="rsvp-thanks-title"
          className="font-display text-[40px] leading-[44px] font-normal tracking-[-0.8px] text-black md:text-[56px] md:leading-[60px] md:tracking-[-1.12px]"
        >
          Cảm ơn <span className="text-[#C9A96A]">bạn!</span>
        </h3>
        <p className="max-w-[400px] text-[16px] leading-[22px] font-normal text-black/70">
          Chúng mình đã nhận được xác nhận của{" "}
          <span className="font-medium text-black">{guestName || "bạn"}</span>.
          Hẹn gặp bạn vào ngày 20 &amp; 21 tháng 10 để cùng chung vui nhé!
        </p>
        <Image
          src={ASSETS.ornamentHeart}
          alt=""
          width={28}
          height={24}
          className="h-6 w-7"
        />
        <div ref={closeRef} className="w-full max-w-[240px]">
          <ElaroButton label="Đóng" onClick={onClose} className="w-full" />
        </div>
      </div>
    </div>
  );
}

export function RsvpSection() {
  const [thanksOpen, setThanksOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const closeDialog = useCallback(() => setThanksOpen(false), []);

  // Decorative form: nothing is sent anywhere — just clear it and say thanks.
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = String(new FormData(form).get("name") ?? "").trim();
    form.reset();
    setGuestName(name);
    setThanksOpen(true);
  };

  return (
    <section
      id="rsvp"
      className="relative flex flex-row items-center justify-center"
    >
      <ThankYouDialog open={thanksOpen} guestName={guestName} onClose={closeDialog} />
      <div className="flex w-full flex-col items-start justify-center gap-[60px] px-[20px] pb-[130px] xl:flex-row xl:px-[40px] xl:pb-[180px]">
        <Reveal delay={0} className="w-full xl:w-[643px]">
          <div className="flex w-full flex-col items-start gap-[40px] xl:h-[622px] xl:justify-between xl:gap-0">
            <h2 className="font-display h-auto w-full text-[50px] leading-[55px] font-normal tracking-[-1px] text-black xl:w-[600px] xl:text-[82px] xl:leading-[85px] xl:tracking-[-1.64px]">
              Bạn sẽ đến <span className="text-[rgb(201,169,106)]">chung vui chứ?</span>
            </h2>
            <div className="relative aspect-[47/26] w-full xl:h-[260px] xl:w-[470px]">
              <Image
                src={ASSETS.rsvp}
                alt="Khách mời chung vui tại tiệc cưới"
                fill
                sizes="(min-width: 1200px) 470px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="w-full xl:w-[643px]">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-start justify-start gap-[40px] xl:h-[622px]"
          >
            <TextField name="name" label="Họ và tên*" placeholder="Ngô Quang Hiếu" type="text" />
            <TextField
              name="email"
              label="Email*"
              placeholder="example@gmail.com"
              type="email"
            />
            <TextField
              name="guests"
              label="Người đi cùng*"
              placeholder="Nguyễn Thu Trang"
              type="text"
            />

            <label className="flex h-[148px] w-full flex-col items-start gap-[10px]">
              <span className="h-[18px] text-[14px] leading-[18px] font-normal text-black/70">
                Lời nhắn
              </span>
              <div className="h-[120px] w-full rounded-none bg-[rgb(237,234,223)] p-[20px]">
                <textarea
                  name="message"
                  placeholder="Lời nhắn của bạn..."
                  className="font-display h-full w-full resize-none border-none bg-transparent text-[16px] leading-[20px] font-normal text-black focus:outline-none"
                />
              </div>
            </label>

            <div className="w-full">
              <ElaroButton label="Xác nhận tham dự" type="submit" className="w-full" />
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
