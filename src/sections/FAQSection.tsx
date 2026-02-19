import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowRight, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How quickly can you turn around a case review?',
    answer:
      'Most case reviews are completed within 7–10 business days, depending on the complexity and volume of records. Rush services are available for urgent matters.',
  },
  {
    question: 'Do you testify for both plaintiff and defense?',
    answer:
      'Yes. We provide objective, evidence-based opinions regardless of which side retains us. Our credibility depends on consistency and intellectual honesty.',
  },
  {
    question: 'What are your fees and billing practices?',
    answer:
      'We offer transparent hourly rates and flat-fee arrangements for certain services. Detailed invoices are provided monthly, and we require a modest retainer to begin work.',
  },
  {
    question: 'What specialties do you cover?',
    answer:
      'Our team includes neurologists (adult and pediatric), neurosurgeons, anesthesiologists, radiologists, pharmacists, and internal medicine specialists.',
  },
  {
    question: 'Are your physicians available nationwide?',
    answer:
      'Yes. Our physicians hold licenses in multiple states and are available for case review, IMEs, and testimony nationwide.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full py-20 lg:py-28 professional-bg overflow-hidden z-[80]">
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-electric/10 text-electric rounded-full text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="display-heading text-display-lg text-foreground mb-4">
              COMMON QUESTIONS
            </h2>
            <p className="text-lg text-text-secondary">
              Everything you need to know about working with our expert team.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-3 mb-12">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-clinical/50 transition-colors"
                >
                  <span className="font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-electric flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <p className="px-5 pb-5 text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-electric/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={32} className="text-electric" />
            </div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-text-secondary mb-6">
              Our team is here to help. Reach out and we'll respond within one business day.
            </p>
            <Button
              onClick={scrollToContact}
              className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-6 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg inline-flex items-center gap-2"
            >
              Contact Us
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
