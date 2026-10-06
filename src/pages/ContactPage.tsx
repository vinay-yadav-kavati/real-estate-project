import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Building,
  Clock,
  Compass,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Calendar,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/Button';
import { FormField } from '../components/FormField';
import { ALL_PROPERTIES } from '../data/properties';
import { COMPANY_INFO } from '../data/company';
import { useCRM } from '../context/CRMContext';
import {
  validateFullName,
  validatePhone,
  validateEmail,
  validateMessage,
} from '../lib/validation';

export const ContactPage: React.FC = () => {
  const { addLead } = useCRM();
  const [searchParams] = useSearchParams();
  const propertyIdParam = searchParams.get('property');
  const actionParam = searchParams.get('action');

  const selectedProperty = propertyIdParam
    ? ALL_PROPERTIES.find((p) => p.id === propertyIdParam || p.slug === propertyIdParam)
    : null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: actionParam === 'site-visit' ? 'Site Visit Request' : 'General Enquiry',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-populate message if property is selected
  useEffect(() => {
    if (selectedProperty) {
      if (actionParam === 'site-visit') {
        setFormData((prev) => ({
          ...prev,
          subject: 'Site Visit Request',
          message:
            prev.message ||
            `Hello, I would like to schedule a private site visit for "${selectedProperty.title}" (${selectedProperty.formattedPrice}) located at ${selectedProperty.locality}. Please let me know available slots.`,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          subject:
            selectedProperty.propertyType === 'Villa'
              ? 'Buying Luxury Villa'
              : selectedProperty.propertyType === 'Apartment'
              ? 'Buying Penthouse/Apartment'
              : selectedProperty.propertyType === 'Commercial'
              ? 'Commercial Space'
              : 'General Enquiry',
          message:
            prev.message ||
            `Hello, I am interested in "${selectedProperty.title}" (${selectedProperty.formattedPrice}) located in ${selectedProperty.locality}. Please provide comprehensive brochure and pricing documentation.`,
        }));
      }
    }
  }, [selectedProperty, actionParam]);

  const validateField = (field: string, value: string): string | null => {
    switch (field) {
      case 'name':
        return validateFullName(value);
      case 'phone':
        return validatePhone(value);
      case 'email':
        return validateEmail(value);
      case 'message':
        return validateMessage(value, true);
      default:
        return null;
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field as keyof typeof formData]);
    setErrors((prev) => ({
      ...prev,
      [field]: errorMsg || '',
    }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: errorMsg || '',
      }));
    }
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};

    const nameErr = validateFullName(formData.name);
    if (nameErr) newErrors.name = nameErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;

    const messageErr = validateMessage(formData.message, true);
    if (messageErr) newErrors.message = messageErr;

    setErrors(newErrors);
    setTouched({
      name: true,
      phone: true,
      email: true,
      message: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);

    try {
      addLead({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        propertyId: selectedProperty?.id,
        propertyTitle: selectedProperty?.title,
        propertyPrice: selectedProperty?.formattedPrice,
        propertyType: selectedProperty?.propertyType,
        inquiryType: selectedProperty ? 'Property Inquiry' : 'General Advisory',
        message: formData.message.trim(),
        status: 'New',
        notes: `Submitted via website contact page. Subject: ${formData.subject}`,
      });
    } catch (err) {
      console.warn('Could not record lead in CRM state:', err);
    }

    // Simulate network latency locally (frontend-only MVP)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Enquiry',
      message: '',
    });
    setErrors({});
    setTouched({});
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20 sm:pb-28 text-slate-900">
      {/* =========================================================================
          1. CONTACT HERO
          ========================================================================= */}
      <section className="bg-slate-950 text-white pt-14 pb-16 md:pt-16 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#B48C58]/30 via-slate-900 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E4C59E]">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Contact Us
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-balance">
            Have a question about a property or looking for the right opportunity? Our team is here to help with transparent, unbiased advisory.
          </p>
        </div>
      </section>

      {/* =========================================================================
          2. MAIN CONTENT (CONTACT INFO + FORM)
          ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Contact Information Card (lg:col-span-5) */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#E4C59E] block mb-1">
                  Advisory Headquarters
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {COMPANY_INFO.name} Corporate Office
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed mt-2">
                  Visit our corporate advisory lounge for private portfolio reviews, legal title inspections, and architectural briefings.
                </p>
              </div>

              {/* Contact Direct Actions */}
              <div className="space-y-4 pt-4 border-t border-slate-800 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B48C58] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                      Office Address
                    </span>
                    <p className="text-slate-200 mt-0.5 leading-relaxed">
                      {COMPANY_INFO.location.addressLine1}, {COMPANY_INFO.location.addressLine2}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {COMPANY_INFO.location.city}, {COMPANY_INFO.location.state} {COMPANY_INFO.location.postalCode}, {COMPANY_INFO.location.country}
                    </p>
                    <span className="text-[11px] text-[#E4C59E] block mt-1">
                      Landmark: {COMPANY_INFO.location.landmark}
                    </span>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#B48C58] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                      Direct Advisory Line
                    </span>
                    <a
                      href={COMPANY_INFO.phoneHref}
                      className="text-white font-semibold text-base hover:text-[#E4C59E] transition-colors"
                      aria-label={`Call ${COMPANY_INFO.name} at ${COMPANY_INFO.phone}`}
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <span className="text-[11px] text-slate-400 block">
                      Direct telephone assistance
                    </span>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#B48C58] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                      Advisory Email
                    </span>
                    <a
                      href={COMPANY_INFO.emailHref}
                      className="text-white font-semibold hover:text-[#E4C59E] transition-colors"
                      aria-label={`Email ${COMPANY_INFO.name} at ${COMPANY_INFO.email}`}
                    >
                      {COMPANY_INFO.email}
                    </a>
                    <span className="text-[11px] text-slate-400 block">
                      Guaranteed response within 4 business hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-slate-200 font-semibold mb-1">
                  <Clock className="w-4 h-4 text-[#B48C58]" />
                  <span>Business Hours</span>
                </div>
                <p className="text-slate-300">{COMPANY_INFO.hours.weekdays}</p>
                <p className="text-slate-400">{COMPANY_INFO.hours.sunday}</p>
              </div>

              {/* Trust Guarantee */}
              <div className="flex items-start gap-2.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p>
                  100% spam-free advisory. We never share customer contact information with third-party telemarketers.
                </p>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: Contact Form / Success State (lg:col-span-7) */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              /* Success Screen */
              <div
                role="status"
                aria-live="polite"
                className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-xs text-center space-y-6 animate-fadeIn"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#B48C58]">
                    Inquiry Received
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Thank You for Contacting Us
                  </h2>
                  <p className="text-slate-600 text-base leading-relaxed">
                    Dear <strong>{formData.name}</strong>, your message has been received. Our senior property advisor will review your requirements and reach out to you shortly.
                  </p>
                </div>

                {/* Submitted Details Snapshot */}
                <div className="max-w-md mx-auto bg-slate-50 rounded-xl border border-slate-200/80 p-4 text-left text-xs space-y-2 text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-200/70">
                    <span className="text-slate-500">Contact Email:</span>
                    <strong className="text-slate-900">{formData.email}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/70">
                    <span className="text-slate-500">Phone Number:</span>
                    <strong className="text-slate-900">{formData.phone}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Subject:</span>
                    <strong className="text-slate-900">{formData.subject}</strong>
                  </div>
                </div>

                {/* Navigation CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    href="/"
                    className="w-full sm:w-auto font-semibold"
                  >
                    Return to Home
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    href="/properties"
                    className="w-full sm:w-auto font-semibold"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Explore Properties
                  </Button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors py-2 px-3 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Send Another Message</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Contact Form */
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Send a Message
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Fill out the form below and our team will get in touch with you shortly.
                  </p>
                </div>

                {/* Property reference banner if opened from a specific property */}
                {selectedProperty && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-900 text-[#E4C59E] flex items-center justify-center shrink-0">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-[#B48C58] uppercase tracking-wider block">
                          {actionParam === 'site-visit' ? 'Site Visit Inquiry' : 'Property Inquiry'}
                        </span>
                        <p className="text-sm font-bold text-slate-900">
                          {selectedProperty.title} · <span className="text-[#B48C58]">{selectedProperty.formattedPrice}</span>
                        </p>
                        <p className="text-xs text-slate-500">
                          {selectedProperty.locality}, {selectedProperty.city}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      href={`/properties/${selectedProperty.id}`}
                      className="text-xs font-semibold shrink-0"
                    >
                      View Listing
                    </Button>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Full Name */}
                  <FormField
                    id="contact-name"
                    label="Full Name"
                    required
                    error={errors.name}
                  >
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder="Enter your full name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:bg-white disabled:opacity-60 ${
                        errors.name
                          ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                          : 'border-slate-200 focus:ring-slate-900 focus:border-slate-900'
                      }`}
                    />
                  </FormField>

                  {/* Two Columns: Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <FormField
                      id="contact-phone"
                      label="Phone Number"
                      required
                      error={errors.phone}
                    >
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        disabled={isSubmitting}
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        placeholder="Enter your phone number"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                        className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:bg-white disabled:opacity-60 ${
                          errors.phone
                            ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                            : 'border-slate-200 focus:ring-slate-900 focus:border-slate-900'
                        }`}
                      />
                    </FormField>

                    {/* Email Address */}
                    <FormField
                      id="contact-email"
                      label="Email Address"
                      required
                      error={errors.email}
                    >
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="Enter your email address"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:bg-white disabled:opacity-60 ${
                          errors.email
                            ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                            : 'border-slate-200 focus:ring-slate-900 focus:border-slate-900'
                        }`}
                      />
                    </FormField>
                  </div>

                  {/* Subject Dropdown */}
                  <FormField id="contact-subject" label="Subject / Area of Interest" required={false}>
                    <select
                      id="contact-subject"
                      name="subject"
                      disabled={isSubmitting}
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white cursor-pointer"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Buying Luxury Villa">Buying Luxury Villa</option>
                      <option value="Buying Penthouse/Apartment">Buying Penthouse / Apartment</option>
                      <option value="Commercial Space">Commercial Space / Office Suite</option>
                      <option value="Approved Plots">Residential Plot / Land Parcel</option>
                      <option value="Site Visit Request">Scheduling Site Visit</option>
                    </select>
                  </FormField>

                  {/* Message */}
                  <FormField
                    id="contact-message"
                    label="Message"
                    required
                    error={errors.message}
                  >
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      placeholder="How can we help you?"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={`w-full p-3.5 bg-slate-50 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:bg-white disabled:opacity-60 resize-y min-h-[110px] ${
                        errors.message
                          ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                          : 'border-slate-200 focus:ring-slate-900 focus:border-slate-900'
                      }`}
                    />
                  </FormField>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto font-semibold px-8 justify-center shadow-sm"
                    icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    iconPosition={isSubmitting ? 'left' : 'right'}
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* =========================================================================
            3. VISIT OUR OFFICE / MAP LOCATION PLACEHOLDER SECTION
            ========================================================================= */}
        <section aria-labelledby="office-location-heading" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B48C58]">
                Find Us
              </span>
              <h2 id="office-location-heading" className="text-2xl sm:text-3xl font-bold text-slate-900">
                Visit Our Office
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {COMPANY_INFO.location.fullAddress}
              </p>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Free Visitor Parking · Valet Transit Available
            </div>
          </div>

          {/* Styled Map Container Placeholder (No external iframes, no external API keys) */}
          <div className="relative aspect-[16/7] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 flex items-center justify-center text-center p-6 select-none shadow-sm group">
            {/* Ambient Map Grid Simulation */}
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-90" />

            <div className="relative space-y-3 z-10 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-[#E4C59E] flex items-center justify-center mx-auto shadow-md">
                <Compass className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg sm:text-xl">
                  {COMPANY_INFO.name} Prime Advisory Center
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">
                  {COMPANY_INFO.location.addressLine1}, {COMPANY_INFO.location.landmark}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">
                  {COMPANY_INFO.location.city}, {COMPANY_INFO.location.state} {COMPANY_INFO.location.postalCode}
                </p>
              </div>

              {/* Map Integration Readiness Badge */}
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-slate-300 text-[11px]">
                  <Sparkles className="w-3 h-3 text-[#E4C59E]" />
                  <span>Interactive Map Integration Point</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. SECONDARY PROPERTY CTA
            ========================================================================= */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold text-[#E4C59E] uppercase tracking-wider block">
              Curated Portfolio
            </span>
            <h3 className="text-2xl font-bold text-white">
              Looking for a Property?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Explore our latest verified properties across Hyderabad's premier residential and commercial corridors.
            </p>
          </div>
          <Button
            variant="gold"
            size="lg"
            href="/properties"
            className="font-semibold shrink-0 shadow-md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            View Properties
          </Button>
        </section>
      </main>
    </div>
  );
};
