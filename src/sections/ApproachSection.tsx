import { Button } from '@/components/ui/button';
import { Award, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';

const credentials = [
  { icon: Award, label: 'Board-certified neurology' },
  { icon: GraduationCap, label: 'Fellowship-trained' },
  { icon: Briefcase, label: '10+ years clinical & forensic experience' },
];

export function ApproachSection() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-clinical neural-bg overflow-hidden z-[60]">
      <div className="absolute inset-0 flex items-center px-[6vw]">
        {/* Content Card (Left) */}
        <div className="absolute left-[6vw] top-[14vh] w-[44vw] h-[72vh] bg-white rounded-[28px] card-shadow p-8 lg:p-12 flex flex-col justify-between">
          <div>
            {/* Headline */}
            <div className="mb-6">
              <h2 className="display-heading text-display-lg text-foreground">
                <span className="inline-block">A PRECISE,</span>
                <br />
                <span className="inline-block">COLLABORATIVE</span>
                <br />
                <span className="inline-block">APPROACH</span>
              </h2>
            </div>

            {/* Body */}
            <p className="text-text-secondary leading-relaxed mb-8">
              We work directly with attorneys to define the medical questions that
              matter for your case strategy, then deliver opinions that are thorough,
              consistent, and built to hold up at deposition and trial.
            </p>

            {/* Credentials List */}
            <div className="space-y-3">
              {credentials.map((cred, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-foreground"
                >
                  <cred.icon size={20} className="text-electric flex-shrink-0" />
                  <span className="font-medium">{cred.label}</span>
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
            Request a Consultation
            <ArrowRight size={18} />
          </Button>
        </div>

        {/* Portrait Card (Right) */}
        <div className="absolute left-[54vw] top-[14vh] w-[40vw] h-[72vh] bg-white rounded-[28px] card-shadow overflow-hidden">
          <img
            src="/approach_office.jpg"
            alt="Clinician in modern office"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
