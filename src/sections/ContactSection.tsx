import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, CheckCircle } from 'lucide-react';

const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/l9stsxpxqv8d785sdpuxiupjofhrnyga';
const CONTACT_EMAIL = 'support@apexmedlaw.com';

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    caseDetails: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          caseDetails: formData.caseDetails,
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', caseDetails: '' });
    } catch {
      setSubmitError(`Something went wrong. Please email us directly at ${CONTACT_EMAIL}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="relative w-full py-20 lg:py-28 bg-navy overflow-hidden z-[90]"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 neural-bg opacity-[0.05]" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Content */}
            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-2 bg-electric/20 text-electric rounded-full text-sm font-medium mb-4">
                  Contact Us
                </span>
                <h2 className="display-heading text-display-lg text-white mb-4">
                  READY WHEN
                  <br />
                  <span className="text-electric">YOU ARE</span>
                </h2>
                <p className="text-lg text-white/70 leading-relaxed">
                  Tell us about your case and timeline. We respond within one
                  business day.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <a
                  href="mailto:info@neurolegalconsulting.com"
                  className="flex items-center gap-4 text-white/80 hover:text-electric transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 group-hover:bg-electric/20 flex items-center justify-center transition-colors">
                    <Mail size={22} className="text-electric" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Email</p>
                    <p className="font-medium">info@neurolegalconsulting.com</p>
                  </div>
                </a>

                <a
                  href="tel:9193077949"
                  className="flex items-center gap-4 text-white/80 hover:text-electric transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 group-hover:bg-electric/20 flex items-center justify-center transition-colors">
                    <Phone size={22} className="text-electric" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Phone</p>
                    <p className="font-medium">(919) 307-7949</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-white/80">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <MapPin size={22} className="text-electric" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Coverage</p>
                    <p className="font-medium">Available Nationwide</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-electric transition-colors"
                >
                  <Linkedin size={22} className="text-white" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-electric transition-colors"
                >
                  <Twitter size={22} className="text-white" />
                </a>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-10">
                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-electric/10 flex items-center justify-center mb-6">
                      <CheckCircle size={40} className="text-electric" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                      Inquiry Sent
                    </h3>
                    <p className="text-text-secondary">
                      Thank you for reaching out. We'll be in touch within one business
                      day.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name *
                        </label>
                        <Input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          required
                          className="w-full px-4 py-3 rounded-xl border-border focus:border-electric focus:ring-electric"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name *
                        </label>
                        <Input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                          required
                          className="w-full px-4 py-3 rounded-xl border-border focus:border-electric focus:ring-electric"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@lawfirm.com"
                          required
                          className="w-full px-4 py-3 rounded-xl border-border focus:border-electric focus:ring-electric"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(555) 123-4567"
                          className="w-full px-4 py-3 rounded-xl border-border focus:border-electric focus:ring-electric"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Case Details *
                      </label>
                      <Textarea
                        name="caseDetails"
                        value={formData.caseDetails}
                        onChange={handleChange}
                        placeholder="Tell us about your case and what you need..."
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border-border focus:border-electric focus:ring-electric resize-none"
                      />
                    </div>

                    {submitError && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                        {submitError}
                      </p>
                    )}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-electric hover:bg-electric/90 text-white font-medium py-4 rounded-full transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit Case Inquiry
                          <Send size={18} />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-20 pt-8 border-t border-white/10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <p className="text-white/50 text-sm">
                © 2024 Neurology Legal Consulting. All Rights Reserved.
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
