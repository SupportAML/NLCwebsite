import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  CheckCircle,
  Upload,
  X,
  Stethoscope,
  FileText,
  Shield,
  Users,
  ArrowLeft,
} from 'lucide-react';

const SPECIALTIES = [
  'Neurology – Adult',
  'Neurology – Pediatric',
  'Neurosurgery',
  'Anesthesiology & Pain Medicine',
  'Radiology & Neuroradiology',
  'Physical Medicine & Rehabilitation',
  'Pharmacotherapy',
  'Internal Medicine & Gastroenterology',
  'Critical Care Medicine',
  'Other',
];

const STATE_OPTIONS = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
];

export function PhysicianApplyPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialty: '',
    otherSpecialty: '',
    boardCertifications: '',
    licensedStates: [] as string[],
    yearsExperience: '',
    currentInstitution: '',
    bio: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStateToggle = (state: string) => {
    setFormData((prev) => ({
      ...prev,
      licensedStates: prev.licensedStates.includes(state)
        ? prev.licensedStates.filter((s) => s !== state)
        : [...prev.licensedStates, state],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setSubmitError('CV file must be under 10 MB.');
        return;
      }
      setCvFile(file);
      setSubmitError(null);
    }
  };

  const removeFile = () => {
    setCvFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      let cvBase64 = '';
      let cvFilename = '';
      let cvContentType = '';

      if (cvFile) {
        cvBase64 = await fileToBase64(cvFile);
        cvFilename = cvFile.name;
        cvContentType = cvFile.type || 'application/pdf';
      }

      const res = await fetch('/api/physician-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          licensedStates: formData.licensedStates.join(', '),
          cvBase64,
          cvFilename,
          cvContentType,
        }),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setSubmitError(
        'Something went wrong. Please email your application directly to support@apexmedlaw.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="relative min-h-screen bg-clinical pt-20 lg:pt-24">
        {/* Hero banner */}
        <section className="relative w-full py-16 lg:py-24 bg-navy overflow-hidden">
          <div className="absolute inset-0 neural-bg opacity-[0.05]" />
          <div className="relative z-10 w-full px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-electric/20 text-electric rounded-full text-sm font-medium mb-6">
                Join Our Expert Team
              </span>
              <h1 className="display-heading text-display-lg text-white mb-6">
                BECOME A{' '}
                <span className="text-electric">MEDICAL EXPERT</span>{' '}
                WITNESS
              </h1>
              <p className="text-lg lg:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
                Join a nationwide team of clinically active, trial-proven physicians
                providing expert testimony and litigation support across all
                neurological and medical specialties.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="w-full px-6 lg:px-12 -mt-8 relative z-20">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Stethoscope, title: 'Clinically Active', desc: 'Work alongside practicing physicians' },
              { icon: FileText, title: 'Case Matching', desc: 'Get matched to cases in your specialty' },
              { icon: Shield, title: 'Legal Support', desc: 'Full deposition and trial preparation' },
              { icon: Users, title: 'Growing Network', desc: 'Join 20+ physician experts nationwide' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-5 shadow-card text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center mx-auto mb-3">
                  <Icon size={22} className="text-electric" />
                </div>
                <h3 className="font-display font-semibold text-sm text-foreground mb-1">
                  {title}
                </h3>
                <p className="text-xs text-foreground/60">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Application form */}
        <section className="w-full px-6 lg:px-12 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-card p-6 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-electric/10 flex items-center justify-center mb-6">
                    <CheckCircle size={40} className="text-electric" />
                  </div>
                  <h2 className="font-display font-bold text-2xl text-foreground mb-3">
                    Application Received
                  </h2>
                  <p className="text-foreground/60 max-w-md mb-6">
                    Thank you for your interest in joining our expert witness team.
                    We'll review your application and respond within 2–3 business
                    days.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-electric hover:text-electric/80 font-medium transition-colors"
                  >
                    <ArrowLeft size={16} />
                    Back to Home
                  </Link>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                      Physician Application
                    </h2>
                    <p className="text-foreground/60">
                      Complete the form below to apply. Fields marked with * are
                      required.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name row */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name *
                        </label>
                        <Input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Jane"
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
                          placeholder="Smith, MD"
                          required
                          className="w-full px-4 py-3 rounded-xl border-border focus:border-electric focus:ring-electric"
                        />
                      </div>
                    </div>

                    {/* Contact row */}
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
                          placeholder="jsmith@hospital.org"
                          required
                          className="w-full px-4 py-3 rounded-xl border-border focus:border-electric focus:ring-electric"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone *
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(555) 123-4567"
                          required
                          className="w-full px-4 py-3 rounded-xl border-border focus:border-electric focus:ring-electric"
                        />
                      </div>
                    </div>

                    {/* Specialty + Experience */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Primary Specialty *
                        </label>
                        <select
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleSelectChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:border-electric focus:ring-1 focus:ring-electric focus:outline-none appearance-none"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                          }}
                        >
                          <option value="">Select specialty...</option>
                          {SPECIALTIES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Years of Experience *
                        </label>
                        <select
                          name="yearsExperience"
                          value={formData.yearsExperience}
                          onChange={handleSelectChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:border-electric focus:ring-1 focus:ring-electric focus:outline-none appearance-none"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                          }}
                        >
                          <option value="">Select range...</option>
                          <option value="1-5">1–5 years</option>
                          <option value="6-10">6–10 years</option>
                          <option value="11-20">11–20 years</option>
                          <option value="20+">20+ years</option>
                        </select>
                      </div>
                    </div>

                    {/* Other specialty (conditional) */}
                    {formData.specialty === 'Other' && (
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Specify Specialty *
                        </label>
                        <Input
                          name="otherSpecialty"
                          value={formData.otherSpecialty}
                          onChange={handleChange}
                          placeholder="e.g., Neurophysiology"
                          required
                          className="w-full px-4 py-3 rounded-xl border-border focus:border-electric focus:ring-electric"
                        />
                      </div>
                    )}

                    {/* Board Certifications */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Board Certifications *
                      </label>
                      <Input
                        name="boardCertifications"
                        value={formData.boardCertifications}
                        onChange={handleChange}
                        placeholder="e.g., ABPN Board Certified in Neurology, ABIM Internal Medicine"
                        required
                        className="w-full px-4 py-3 rounded-xl border-border focus:border-electric focus:ring-electric"
                      />
                    </div>

                    {/* Current Institution */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Current Institution / Practice *
                      </label>
                      <Input
                        name="currentInstitution"
                        value={formData.currentInstitution}
                        onChange={handleChange}
                        placeholder="e.g., Duke University Medical Center"
                        required
                        className="w-full px-4 py-3 rounded-xl border-border focus:border-electric focus:ring-electric"
                      />
                    </div>

                    {/* Licensed States */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Licensed States *
                      </label>
                      <p className="text-xs text-foreground/50 mb-3">
                        Select all states where you hold an active medical license.
                      </p>
                      <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-3 border border-border rounded-xl">
                        {STATE_OPTIONS.map((state) => (
                          <button
                            key={state}
                            type="button"
                            onClick={() => handleStateToggle(state)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                              formData.licensedStates.includes(state)
                                ? 'bg-electric text-white border-electric'
                                : 'bg-white text-foreground/70 border-border hover:border-electric/50'
                            }`}
                          >
                            {state}
                          </button>
                        ))}
                      </div>
                      {formData.licensedStates.length > 0 && (
                        <p className="text-xs text-electric mt-2">
                          Selected: {formData.licensedStates.join(', ')}
                        </p>
                      )}
                      <input
                        type="text"
                        required
                        value={formData.licensedStates.length > 0 ? 'valid' : ''}
                        onChange={() => {}}
                        className="sr-only"
                        tabIndex={-1}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Brief Professional Bio
                      </label>
                      <Textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Summarize your clinical experience, areas of expertise, and any prior expert witness or litigation support experience..."
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border-border focus:border-electric focus:ring-electric resize-none"
                      />
                    </div>

                    {/* CV Upload */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Upload CV *
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        id="cv-upload"
                      />
                      {cvFile ? (
                        <div className="flex items-center gap-3 p-4 border border-electric/30 bg-electric/5 rounded-xl">
                          <FileText size={20} className="text-electric shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground truncate">
                              {cvFile.name}
                            </p>
                            <p className="text-xs text-foreground/50">
                              {(cvFile.size / 1024 / 1024).toFixed(1)} MB
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="p-1 rounded-lg hover:bg-red-50 text-foreground/40 hover:text-red-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="cv-upload"
                          className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-border hover:border-electric/50 rounded-xl cursor-pointer transition-colors"
                        >
                          <Upload size={24} className="text-foreground/40" />
                          <p className="text-sm text-foreground/60">
                            Click to upload your CV
                          </p>
                          <p className="text-xs text-foreground/40">
                            PDF, DOC, or DOCX — max 10 MB
                          </p>
                        </label>
                      )}
                      <input
                        type="text"
                        required
                        value={cvFile ? 'valid' : ''}
                        onChange={() => {}}
                        className="sr-only"
                        tabIndex={-1}
                        aria-hidden="true"
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
                          Submitting Application...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </Button>

                    <p className="text-xs text-foreground/40 text-center">
                      Your information is kept confidential and used solely for
                      expert witness matching. We'll review your application and
                      contact you within 2–3 business days.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Attorney Alerts Section */}
        <AttorneyAlertSection />

        {/* Footer */}
        <footer className="bg-navy py-8 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              &copy; 2026 Neurology Legal Consulting. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                Home
              </Link>
              <Link
                to="/blog"
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

function AttorneyAlertSection() {
  const [alertData, setAlertData] = useState({
    name: '',
    email: '',
    firm: '',
    specialtiesOfInterest: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ALERT_SPECIALTIES = [
    'Neurology – Adult',
    'Neurology – Pediatric',
    'Neurosurgery',
    'Anesthesiology & Pain Medicine',
    'Radiology & Neuroradiology',
    'Physical Medicine & Rehabilitation',
    'Pharmacotherapy',
    'Internal Medicine & Gastroenterology',
    'Critical Care Medicine',
  ];

  const toggleSpecialty = (s: string) => {
    setAlertData((prev) => ({
      ...prev,
      specialtiesOfInterest: prev.specialtiesOfInterest.includes(s)
        ? prev.specialtiesOfInterest.filter((x) => x !== s)
        : [...prev.specialtiesOfInterest, s],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/attorney-alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...alertData,
          specialtiesOfInterest: alertData.specialtiesOfInterest.join(', '),
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or email support@apexmedlaw.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full px-6 lg:px-12 pb-16 lg:pb-20">
      <div className="max-w-3xl mx-auto">
        <div className="bg-navy rounded-3xl p-6 lg:p-10 relative overflow-hidden">
          <div className="absolute inset-0 neural-bg opacity-[0.05]" />
          <div className="relative z-10">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle size={40} className="text-electric mx-auto mb-4" />
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  You're on the List
                </h3>
                <p className="text-white/60">
                  We'll notify you when new experts join in your selected
                  specialties.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-electric/20 text-electric rounded-full text-xs font-medium mb-3">
                    For Attorneys
                  </span>
                  <h3 className="font-display font-bold text-xl text-white mb-2">
                    Get Notified When New Experts Join
                  </h3>
                  <p className="text-white/60 text-sm">
                    Sign up to receive alerts when new physician experts become
                    available in your areas of interest.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      value={alertData.name}
                      onChange={(e) =>
                        setAlertData((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Your Name *"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl px-4 py-3 focus:border-electric focus:ring-electric"
                    />
                    <Input
                      value={alertData.firm}
                      onChange={(e) =>
                        setAlertData((p) => ({ ...p, firm: e.target.value }))
                      }
                      placeholder="Law Firm *"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl px-4 py-3 focus:border-electric focus:ring-electric"
                    />
                  </div>
                  <Input
                    type="email"
                    value={alertData.email}
                    onChange={(e) =>
                      setAlertData((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="Email Address *"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl px-4 py-3 focus:border-electric focus:ring-electric"
                  />

                  <div>
                    <p className="text-xs text-white/50 mb-2">
                      Select specialties you're interested in:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ALERT_SPECIALTIES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleSpecialty(s)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            alertData.specialtiesOfInterest.includes(s)
                              ? 'bg-electric text-white border-electric'
                              : 'bg-white/10 text-white/70 border-white/20 hover:border-electric/50'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-electric hover:bg-electric/90 text-white font-medium py-3 rounded-full transition-all hover:-translate-y-0.5"
                  >
                    {isSubmitting ? 'Signing up...' : 'Sign Up for Alerts'}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
