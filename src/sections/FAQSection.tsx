import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowRight, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is your turnaround for case review and expert reports?',
    answer:
      'Most case reviews are completed within 7–10 business days, depending on the complexity and volume of records. We regularly accommodate expedited timelines for discovery cutoffs, deposition deadlines, and trial preparation. Let us know your dates when you submit your inquiry.',
  },
  {
    question: 'Do your experts testify for both plaintiff and defense?',
    answer:
      'Yes. We provide objective, evidence-based opinions regardless of which side retains us. Our experts maintain credibility through consistency and intellectual honesty — the same standard of care analysis applies regardless of who is asking.',
  },
  {
    question: 'Will your experts withstand a Daubert or Frye challenge?',
    answer:
      'Every physician on our team is board-certified, clinically active, and practicing in the subspecialty relevant to your case. We proactively align expert credentials to the specific neurological condition at issue, ensuring qualification holds up under the strictest scrutiny.',
  },
  {
    question: 'What are your fees and how does billing work?',
    answer:
      'We offer transparent hourly rates and flat-fee arrangements for case review. A fee schedule and CV are provided within one business day of your inquiry. We require a modest retainer to begin work, with detailed monthly invoices.',
  },
  {
    question: 'What specialties and subspecialties do you cover?',
    answer:
      'Our team covers neurology (adult and pediatric), neurosurgery, anesthesiology and pain medicine, radiology and neuroradiology, physical medicine and rehabilitation, pharmacotherapy, internal medicine, gastroenterology, and critical care medicine.',
  },
  {
    question: 'Do you run conflict checks before engagement?',
    answer:
      'Yes. We conduct a conflict check before any case engagement to ensure there are no existing relationships or prior involvement that would compromise our expert\'s objectivity or create an ethical issue for your case.',
  },
  {
    question: 'Are your physicians available for testimony nationwide?',
    answer:
      'Yes. Our physicians hold licenses in multiple states and are available for case review, IMEs, deposition, and trial testimony nationwide. We can also arrange in-person IMEs at locations convenient for your client.',
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
              What attorneys ask us before retaining an expert.
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
