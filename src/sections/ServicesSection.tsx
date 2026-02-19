import { Button } from '@/components/ui/button';
import { FileText, Stethoscope, Gavel, ArrowRight } from 'lucide-react';

const services = [
  { icon: FileText, label: 'Case Review & Chronologies' },
  { icon: Stethoscope, label: 'Independent Medical Exams' },
  { icon: Gavel, label: 'Expert Testimony' },
];

export function ServicesSection() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      className="relative w-full min-h-screen bg-clinical neural-bg overflow-hidden z-20"
    >
      <div className="absolute inset-0 flex items-center px-[6vw]">
        {/* Content Card (Left) */}
        <div className="absolute left-[6vw] top-[14vh] w-[44vw] h-[72vh] bg-white rounded-[28px] card-shadow p-8 lg:p-12 flex flex-col justify-between">
          <div>
            {/* Headline */}
            <div className="mb-6">
              <h2 className="display-heading text-display-lg text-foreground">
                <span className="inline-block">COMPREHENSIVE</span>
                <br />
                <span className="inline-block">NEUROLOGY</span>
                <br />
                <span className="inline-block">SERVICES</span>
              </h2>
            </div>

            {/* Body */}
            <p className="text-text-secondary leading-relaxed mb-8 max-w-md">
              From initial record review to deposition and trial, we deliver clear,
              defensible opinions rooted in current evidence and clinical experience.
            </p>

            {/* Service List */}
            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-clinical/50 hover:bg-clinical transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center group-hover:bg-electric/20 transition-colors">
                    <service.icon size={20} className="text-electric" />
                  </div>
                  <span className="font-medium text-foreground">{service.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={scrollToContact}
            variant="outline"
            className="w-fit mt-6 border-electric text-electric hover:bg-electric hover:text-white font-medium px-6 py-3 rounded-full transition-all flex items-center gap-2"
          >
            See all services
            <ArrowRight size={18} />
          </Button>
        </div>

        {/* Portrait Card (Right) */}
        <div className="absolute left-[54vw] top-[14vh] w-[40vw] h-[72vh] bg-white rounded-[28px] card-shadow overflow-hidden">
          <img
            src="/services_exam.jpg"
            alt="Doctor in exam room"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
