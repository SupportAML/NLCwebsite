import { Button } from '@/components/ui/button';
import { Clock, Scan, ShieldCheck, FileSearch, Brain, ArrowRight } from 'lucide-react';

const features = [
  { icon: FileSearch, title: 'Detailed Chronologies', description: 'Comprehensive timeline analysis' },
  { icon: Scan, title: 'Imaging Interpretation', description: 'Expert review of MRI, CT, EEG' },
  { icon: ShieldCheck, title: 'Risk & Merit Assessment', description: 'Case strength evaluation' },
  { icon: Brain, title: 'Neurological Analysis', description: 'Deep clinical expertise' },
  { icon: Clock, title: 'Fast Turnaround', description: '7-10 business days' },
];

export function CaseReviewSection() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="case-review"
      className="relative w-full min-h-screen professional-bg overflow-hidden z-40"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-electric/5 to-transparent" />

      <div className="relative z-10 h-full flex items-center px-6 lg:px-12">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6">
            <span className="inline-block px-4 py-2 bg-electric/10 text-electric rounded-full text-sm font-medium">
              Case Review
            </span>

            <h2 className="display-heading text-display-lg text-foreground">
              THOROUGH
              <br />
              <span className="text-electric">CASE REVIEW</span>
            </h2>

            <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
              We analyze records, imaging, and timelines to deliver a clear merit
              assessment — identifying case strengths, risks, and the clinical questions
              that will drive settlement or trial strategy.
            </p>

            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-6 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg inline-flex items-center gap-2"
            >
              Submit Records for Review
              <ArrowRight size={20} />
            </Button>
          </div>

          {/* Image + Features */}
          <div className="space-y-6">
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl">
              <img
                src="/case_review.jpg"
                alt="Clinician reviewing medical records"
                className="w-full h-[40vh] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
                >
                  <feature.icon size={24} className="text-electric mb-2" />
                  <h4 className="font-semibold text-sm text-foreground mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-text-secondary">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
