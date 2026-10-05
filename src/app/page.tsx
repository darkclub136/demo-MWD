import { SmoothScroll } from "@/components/sites/elaro-framer-website-d569c65d/shared/SmoothScroll";
import { SiteNav } from "@/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/SiteNav";
import { HeroSection } from "@/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/HeroSection";
import { DetailsTicker } from "@/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/DetailsTicker";
import { AboutSection } from "@/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/AboutSection";
import { VenueSection } from "@/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/VenueSection";
import { ScheduleSection } from "@/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/ScheduleSection";
import { HotelsSection } from "@/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/HotelsSection";
import { RsvpSection } from "@/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/RsvpSection";
import { FaqSection } from "@/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/FaqSection";
import { DressCodeSection } from "@/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/DressCodeSection";
import { SiteFooter } from "@/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/SiteFooter";

export default function Home() {
  return (
    <div className="elaro flex min-h-screen flex-col overflow-x-clip">
      <SmoothScroll />
      <SiteNav />
      <main className="flex flex-col bg-[#F8F5F0]">
        <HeroSection />
        <DetailsTicker />
        <AboutSection />
        <VenueSection />
        <ScheduleSection />
        <HotelsSection />
        <RsvpSection />
        <FaqSection />
        <DressCodeSection />
      </main>
      <SiteFooter />
    </div>
  );
}
