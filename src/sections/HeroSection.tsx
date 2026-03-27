import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Shield, Award, Users } from 'lucide-react';

const stats = [
  { icon: Shield, label: 'Zero Malpractice History', value: '100%' },
  { icon: Award, label: 'Board Certified', value: '15+' },
  { icon: Users, label: 'States Covered', value: '50' },
];

export function HeroSection() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen hero-canvas-bg overflow-hidden z-10">
      <div className="absolute inset-0 neural-bg opacity-20" aria-hidden />

      <div className="relative z-10 h-full flex items-center min-h-screen">
        <div className="w-full px-6 lg:px-12 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            {/* Content - static, always visible; light text for contrast on dark hero bg */}
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-electric/20 text-white rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-electric rounded-full animate-pulse" />
                  Available Nationwide
                </span>
              </div>

              <h1 className="display-heading text-display-xl text-white">
                NATIONWIDE NETWORK OF
                <span className="text-electric"> ELITE</span>
                <br />
                NEUROLOGY EXPERTS
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                Retained by plaintiff and defense counsel nationwide. Board-certified,
                clinically active physicians delivering case review, IMEs, and expert
                testimony — on your timeline, ready for Daubert.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={scrollToContact}
                  size="lg"
                  className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-6 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
                >
                  Submit a Case Inquiry
                  <ArrowRight size={20} />
                </Button>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <a
                  href="tel:9193077949"
                  className="flex items-center gap-2 text-white hover:text-electric transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-electric/10 flex items-center justify-center">
                    <Phone size={18} className="text-electric" />
                  </div>
                  <span className="font-medium">(919) 307-7949</span>
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl">
                <img
                  src="/hero_portrait.jpg"
                  alt="Board-certified neurologist"
                  className="w-full h-[60vh] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-electric/10 flex items-center justify-center">
                  <Award size={24} className="text-electric" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Duke Trained</p>
                  <p className="text-sm text-text-secondary">Leadership Team</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="absolute bottom-8 left-6 right-6 lg:left-12 lg:right-12">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 lg:p-6">
              <div className="grid grid-cols-3 gap-4 lg:gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-3 lg:gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-electric/10 flex items-center justify-center flex-shrink-0">
                      <stat.icon size={20} className="text-electric" />
                    </div>
                    <div>
                      <p className="text-lg lg:text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-xs lg:text-sm text-text-secondary">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
