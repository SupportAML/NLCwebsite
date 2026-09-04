import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { PracticeAreasSection } from '@/sections/PracticeAreasSection';
import { TeamSection } from '@/sections/TeamSection';
import { CaseReviewSection } from '@/sections/CaseReviewSection';
import { TestimonySection } from '@/sections/TestimonySection';
import { IMESection } from '@/sections/IMESection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { FAQSection } from '@/sections/FAQSection';
import { ContactSection } from '@/sections/ContactSection';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function HomePage() {
  useEffect(() => {
    ScrollTrigger.refresh();

    // Deep-link support (e.g. /?src=linkedin#contact from a tracked social
    // link) — the browser's native hash scroll fires before this animated
    // layout has settled, so land on the target section ourselves.
    if (window.location.hash) {
      const target = window.location.hash;
      const scrollWhenReady = () => {
        const el = document.querySelector(target);
        if (!el) return;
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: el, offsetY: 80 },
          ease: 'power2.inOut',
        });
      };
      const timer = setTimeout(scrollWhenReady, 400);
      return () => {
        clearTimeout(timer);
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
    <Navigation />
    <main className="relative">
      <HeroSection />
      <PracticeAreasSection />
      <TeamSection />
      <CaseReviewSection />
      <TestimonySection />
      <IMESection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </main>
    </>
  );
}
