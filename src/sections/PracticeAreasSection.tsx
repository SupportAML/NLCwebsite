import { Button } from '@/components/ui/button';
import { 
  UserX, 
  Stethoscope, 
  ClipboardCheck, 
  Scale, 
  Briefcase,
  ArrowRight 
} from 'lucide-react';

const practiceAreas = [
  {
    icon: UserX,
    title: 'Personal Injury',
    description: 'TBI, spinal cord injury, concussion, chronic pain',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Stethoscope,
    title: 'Medical Malpractice',
    description: 'Standards of care, causation, complex neuro cases',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: ClipboardCheck,
    title: 'Independent Medical Exams',
    description: 'Objective, defensible assessments',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Scale,
    title: 'Standards of Care',
    description: 'Expert review & testimony from leading clinicians',
    color: 'from-amber-500 to-amber-600',
  },
  {
    icon: Briefcase,
    title: "Workers' Compensation",
    description: 'Return-to-work evaluations, disability determinations',
    color: 'from-rose-500 to-rose-600',
  },
];

const specialties = [
  'Neurology – Adult & Pediatric',
  'Neurosurgery',
  'Anesthesiology & Pain Medicine',
  'Radiology & Neuroradiology',
  'Pharmacy',
  'Internal Medicine',
  'Gastroenterology',
];

export function PracticeAreasSection() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="services"
      className="relative w-full py-20 lg:py-28 section-canvas-bg overflow-hidden z-20"
    >
      <div className="absolute inset-0 neural-bg opacity-30" aria-hidden />
      <div className="relative w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-block px-4 py-2 bg-electric/10 text-electric rounded-full text-sm font-medium mb-4">
              Our Expertise
            </span>
            <h2 className="display-heading text-display-lg text-foreground mb-4">
              PRACTICE AREAS WE SERVE
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              A comprehensive, multi-specialty physician team — all clinically active,
              board-certified, and experienced in deposition and trial testimony.
            </p>
          </div>

          {/* Practice Area Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6 mb-12">
            {practiceAreas.map((area, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-electric/10 flex items-center justify-center mb-4">
                    <area.icon
                      size={28}
                      className="text-electric"
                    />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {area.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Specialties Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8">
            <h3 className="font-display font-bold text-xl text-foreground mb-4 text-center">
              SPECIALTIES COVERED
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-clinical rounded-full text-sm font-medium text-foreground hover:bg-electric/10 hover:text-electric transition-colors cursor-default"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              onClick={scrollToContact}
              className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-6 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg inline-flex items-center gap-2"
            >
              Request CVs, Fee Schedule, Documents
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
