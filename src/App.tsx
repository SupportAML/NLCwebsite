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
import './App.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative">
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
    </div>
  );
}

export default App;
