import { Button } from '@/components/ui/button';
import { Mic, Scale, FileEdit, Gavel, ArrowRight, CheckCircle } from 'lucide-react';

const services = [
  { icon: Mic, title: 'Deposition Preparation', description: 'Thorough case preparation' },
  { icon: Gavel, title: 'Trial Testimony', description: 'Clear, persuasive courtroom presence' },
  { icon: FileEdit, title: 'Rebuttal Reports', description: 'Response to opposing experts' },
  { icon: Scale, title: 'Case Strategy', description: 'Medical-legal guidance' },
];

const credentials = [
  'Double board-certified neurologists',
  'Duke, Harvard, and top institution training',
  'Published in peer-reviewed journals',
  'No malpractice history',
  'Available nationwide',
];

export function TestimonySection() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="testimony"
      className="relative w-full py-20 lg:py-28 professional-bg overflow-hidden z-50"
    >
      <div className="absolute inset-0 neural-bg opacity-20" aria-hidden />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Main content */}
          <div className="mb-14">
            <div className="max-w-2xl space-y-6">
              <span className="inline-block px-4 py-2 bg-electric/10 text-electric rounded-full text-sm font-medium">
                Expert Testimony
              </span>

              <h2 className="display-heading text-display-lg text-foreground">
                EXPERT WITNESS
                <br />
                <span className="text-electric">TESTIMONY</span>
              </h2>

              <p className="text-lg text-text-secondary leading-relaxed">
                Clear, consistent, and grounded in the medical record. We translate
                complex neurology into language juries and counsel can trust.
              </p>

              <ul className="space-y-2">
                {credentials.map((cred, index) => (
                  <li key={index} className="flex items-center gap-2 text-foreground">
                    <CheckCircle size={18} className="text-electric flex-shrink-0" />
                    <span className="text-sm">{cred}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={scrollToContact}
                size="lg"
                className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-6 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg inline-flex items-center gap-2"
              >
                Discuss Your Case
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 shadow-md border border-border hover:border-electric/30 hover:shadow-lg transition-colors"
              >
                <service.icon size={24} className="text-electric mb-3" />
                <h4 className="font-semibold text-foreground mb-1">{service.title}</h4>
                <p className="text-sm text-text-secondary">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
