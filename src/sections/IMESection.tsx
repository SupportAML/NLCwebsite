import { Button } from '@/components/ui/button';
import { Video, Calendar, FileCheck, Clock, MapPin, ArrowRight } from 'lucide-react';

const features = [
  { icon: Video, title: 'Virtual & In-Person', description: 'Flexible examination options' },
  { icon: Calendar, title: '5-7 Day Turnaround', description: 'Fast report delivery' },
  { icon: FileCheck, title: 'Defensible Documentation', description: 'Court-ready reports' },
  { icon: MapPin, title: 'Nationwide Coverage', description: 'Multiple state licenses' },
];

export function IMESection() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="ime"
      className="relative w-full py-20 lg:py-28 professional-bg overflow-hidden z-[60]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric/5 via-transparent to-emerald/5" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <span className="inline-block px-4 py-2 bg-emerald/10 text-emerald rounded-full text-sm font-medium">
              Independent Medical Exams
            </span>

            <h2 className="display-heading text-display-lg text-foreground">
              INDEPENDENT
              <br />
              <span className="text-emerald">MEDICAL EXAMS</span>
            </h2>

            <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
              Objective evaluations with fast turnaround, detailed reports, and
              transparent methodology that holds up to scrutiny.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon size={20} className="text-emerald" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-text-secondary">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-emerald hover:bg-emerald/90 text-white font-medium px-8 py-6 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg inline-flex items-center gap-2"
            >
              Schedule an IME
              <ArrowRight size={20} />
            </Button>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2 hidden lg:block">
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl">
              <img
                src="/ime_patient.jpg"
                alt="Doctor with patient"
                className="w-full h-[60vh] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-emerald/20 to-transparent" />
            </div>

            {/* Turnaround badge */}
            <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-emerald" />
                <div>
                  <p className="text-2xl font-bold text-foreground">5-7</p>
                  <p className="text-xs text-text-secondary">Business Days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
