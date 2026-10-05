"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { ASSETS } from "@/components/sites/elaro-framer-website-d569c65d/shared/assets";
import { ElaroButton } from "@/components/sites/elaro-framer-website-d569c65d/shared/ElaroButton";
import { MenuIcon } from "@/components/sites/elaro-framer-website-d569c65d/shared/icons";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Địa điểm", href: "#venue" },
  { label: "Lịch trình", href: "#schedule" },
  { label: "Hỏi đáp", href: "#faq" },
  { label: "Trang phục", href: "#dress-code" },
] as const;

/**
 * The fixed site header.
 *
 * Two measured scroll variants: "Desktop" at the page top (100px tall,
 * transparent, 25px/40px padding) and "Desktop BG nav" once the 100vh hero has
 * scrolled past (90px tall, #0F0F0F, 20px/40px padding). Below the desktop
 * breakpoint the link row and RSVP button are removed and the bar keeps its
 * 100px height in both variants.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on Escape, or if the viewport grows to desktop.
  useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia("(min-width: 1200px)");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  // The hero is exactly 100vh and sits at the top of the page, so "the hero has
  // stopped intersecting the viewport" is precisely "scrollY >= 100vh" — the
  // measured trigger. An observer is used rather than a scroll listener so the
  // variant still tracks correctly while Lenis drives the scroll.
  useEffect(() => {
    const hero = document.getElementById("banner-section");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[3]">
      <nav
        className={cn(
          "flex w-full flex-row items-center justify-center transition-all duration-300 ease-[ease]",
          scrolled || menuOpen
            ? "h-[100px] bg-[#0F0F0F] xl:h-[90px]"
            : "h-[100px] bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[1440px] flex-row items-center justify-between transition-all duration-300 ease-[ease]",
            scrolled ? "px-5 py-[25px] xl:px-10 xl:py-5" : "px-5 py-[25px] xl:px-10",
          )}
        >
          <div className="flex w-[200px] max-w-[200px] flex-row items-center justify-start gap-2.5">
            <Link href="/" aria-label="Khởi và Mây — trang chủ">
              <Image
                src={ASSETS.logo}
                alt="Khởi &amp; Mây"
                width={94}
                height={40}
                priority
                className="h-10 w-[94px] object-cover"
              />
            </Link>
          </div>

          <div className="hidden flex-row items-center justify-center gap-10 xl:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-[16px] leading-5 font-normal text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden w-[200px] max-w-[200px] flex-row items-center justify-end xl:flex">
            <ElaroButton label="Xác nhận" href="#rsvp" />
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-[50px] w-[50px] items-center justify-center rounded-[25px] bg-white text-[#0F0F0F] xl:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        data-lenis-prevent
        className={cn(
          "fixed inset-x-0 top-[100px] bottom-0 overflow-y-auto bg-[#0F0F0F] transition-[opacity,visibility] duration-300 ease-[ease] xl:hidden",
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="flex flex-col items-start gap-10 px-5 pt-10 pb-[60px]">
          <nav aria-label="Menu" className="flex w-full flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display border-b border-white/10 py-5 text-[30px] leading-[34px] font-normal tracking-[-0.6px] text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div onClick={() => setMenuOpen(false)} className="w-full">
            <ElaroButton label="Xác nhận tham dự" href="#rsvp" className="w-full" />
          </div>
        </div>
      </div>
    </header>
  );
}
