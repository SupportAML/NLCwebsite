import { Button } from '@/components/ui/button';
import { Quote, Star, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    quote:
      "Dr. Kapuria clarified a complex neurological issue in a way the jury immediately understood. The case settled favorably shortly after deposition.",
    author: 'Partner, Defense Litigation Firm',
    rating: 5,
  },
  {
    quote:
      "Their turnaround time was exceptional. We had a comprehensive case review within a week that helped us make informed decisions about settlement.",
    author: 'Plaintiff Attorney, Personal Injury Practice',
    rating: 5,
  },
  {
    quote:
      "The level of detail in their IME reports is unmatched. Every question we had was thoroughly addressed with supporting documentation.",
    author: "Workers' Compensation Defense Counsel",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative w-full pt-12 pb-20 lg:pt-16 lg:pb-28 professional-bg overflow-hidden z-[70]"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 neural-bg opacity-10" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-block px-4 py-2 bg-electric/10 text-electric rounded-full text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="display-heading text-display-lg text-foreground mb-4">
              WHAT ATTORNEYS SAY
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Trusted by law firms across the nation for expert neurology consultation
              and testimony.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div
            className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-clinical rounded-3xl p-6 lg:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Quote icon */}
                <Quote
                  size={40}
                  className="absolute top-6 right-6 text-electric/20"
                />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-foreground leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <p className="text-sm text-text-secondary font-medium">
                  — {testimonial.author}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              onClick={scrollToContact}
              className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-6 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg inline-flex items-center gap-2"
            >
              Read More Testimonials
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
