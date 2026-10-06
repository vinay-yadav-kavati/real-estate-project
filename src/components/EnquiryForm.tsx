import React, { useState } from 'react';
import { Send, Loader2, Phone, Mail, User, MessageSquare } from 'lucide-react';
import { Property } from '../types/property';
import { EnquiryFormData, FormValidationErrors, PreferredContactMethod } from '../types/enquiry';
import {
  validateFullName,
  validatePhone,
  validateEmail,
  validateMessage,
} from '../lib/validation';
import { FormField } from './FormField';
import { FormSuccess } from './FormSuccess';
import { Button } from './Button';
import { useCRM } from '../context/CRMContext';

interface EnquiryFormProps {
  property?: Property | null;
  onSubmittedSuccess?: (data: EnquiryFormData) => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  property,
  onSubmittedSuccess,
}) => {
  const { addLead } = useCRM();
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    message: property
      ? `I would like to enquire about ${property.title} in ${property.locality}. Please provide pricing breakdown, brochure, and possession timeline.`
      : '',
    preferredContactMethod: 'phone',
    propertyId: property?.id,
  });

  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate a single field
  const validateField = (field: keyof EnquiryFormData, value: string): string | null => {
    switch (field) {
      case 'fullName':
        return validateFullName(value);
      case 'phoneNumber':
        return validatePhone(value);
      case 'email':
        return validateEmail(value);
      case 'message':
        return validateMessage(value, true);
      default:
        return null;
    }
  };

  const handleBlur = (field: keyof EnquiryFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field] || '');
    setErrors((prev) => ({
      ...prev,
      [field]: errorMsg || '',
    }));
  };

  const handleChange = (
    field: keyof EnquiryFormData,
    value: string | PreferredContactMethod
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // If already touched, validate on keystroke
    if (touched[field]) {
      const errorMsg = validateField(field, value as string);
      setErrors((prev) => ({
        ...prev,
        [field]: errorMsg || '',
      }));
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormValidationErrors = {};

    const nameErr = validateFullName(formData.fullName);
    if (nameErr) newErrors.fullName = nameErr;

    const phoneErr = validatePhone(formData.phoneNumber);
    if (phoneErr) newErrors.phoneNumber = phoneErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;

    const messageErr = validateMessage(formData.message, true);
    if (messageErr) newErrors.message = messageErr;

    setErrors(newErrors);
    setTouched({
      fullName: true,
      phoneNumber: true,
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

    // Save lead in CRM store
    try {
      addLead({
        name: formData.fullName.trim(),
        phone: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        propertyId: property?.id,
        propertyTitle: property?.title,
        propertyPrice: property?.formattedPrice,
        propertyType: property?.propertyType,
        inquiryType: property ? 'Property Inquiry' : 'General Advisory',
        message: formData.message.trim(),
        status: 'New',
        assignedAdvisor: 'Suresh Reddy (Senior Partner)',
        notes: `Submitted via website enquiry form. Preferred contact: ${formData.preferredContactMethod}.`,
      });
    } catch (e) {
      console.warn('Failed to register lead:', e);
    }

    // Simulate network submission locally (no backend API)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSubmittedSuccess?.(formData);
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      message: property
        ? `I would like to enquire about ${property.title} in ${property.locality}. Please provide pricing breakdown, brochure, and possession timeline.`
        : '',
      preferredContactMethod: 'phone',
      propertyId: property?.id,
    });
    setErrors({});
    setTouched({});
  };

  if (isSubmitted) {
    return (
      <FormSuccess
        type="enquiry"
        property={property}
        applicantName={formData.fullName}
        contactMethod={formData.preferredContactMethod}
        onReset={handleReset}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6"
    >
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {property ? 'Property Enquiry Form' : 'General Enquiry Form'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {property
            ? `Submit your details to receive full documentation and pricing for ${property.title}.`
            : 'Get in touch with our advisory team to discover residential and commercial opportunities.'}
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <FormField
          id="enquiry-fullName"
          label="Full Name"
          required
          error={errors.fullName}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              id="enquiry-fullName"
              name="fullName"
              type="text"
              required
              disabled={isSubmitting}
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              onBlur={() => handleBlur('fullName')}
              placeholder="Enter your full name"
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'enquiry-fullName-error' : undefined}
              className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:bg-white disabled:opacity-60 ${
                errors.fullName
                  ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                  : 'border-slate-200 focus:ring-slate-900 focus:border-slate-900'
              }`}
            />
          </div>
        </FormField>

        {/* Responsive Two Columns for Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone Number */}
          <FormField
            id="enquiry-phoneNumber"
            label="Phone Number"
            required
            error={errors.phoneNumber}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" aria-hidden="true" />
              </div>
              <input
                id="enquiry-phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                disabled={isSubmitting}
                value={formData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                onBlur={() => handleBlur('phoneNumber')}
                placeholder="Enter your phone number"
                aria-invalid={Boolean(errors.phoneNumber)}
                aria-describedby={errors.phoneNumber ? 'enquiry-phoneNumber-error' : undefined}
                className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:bg-white disabled:opacity-60 ${
                  errors.phoneNumber
                    ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                    : 'border-slate-200 focus:ring-slate-900 focus:border-slate-900'
                }`}
              />
            </div>
          </FormField>

          {/* Email Address */}
          <FormField
            id="enquiry-email"
            label="Email Address"
            required
            error={errors.email}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" aria-hidden="true" />
              </div>
              <input
                id="enquiry-email"
                name="email"
                type="email"
                required
                disabled={isSubmitting}
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder="Enter your email address"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'enquiry-email-error' : undefined}
                className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:bg-white disabled:opacity-60 ${
                  errors.email
                    ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                    : 'border-slate-200 focus:ring-slate-900 focus:border-slate-900'
                }`}
              />
            </div>
          </FormField>
        </div>

        {/* Preferred Contact Method */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Preferred Contact Method
          </label>
          <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Preferred Contact Method">
            <label
              className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                formData.preferredContactMethod === 'phone'
                  ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <input
                type="radio"
                name="contactMethod"
                value="phone"
                checked={formData.preferredContactMethod === 'phone'}
                onChange={() => handleChange('preferredContactMethod', 'phone')}
                className="sr-only"
              />
              <Phone className="w-4 h-4" />
              <span>Phone Call</span>
            </label>

            <label
              className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                formData.preferredContactMethod === 'email'
                  ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <input
                type="radio"
                name="contactMethod"
                value="email"
                checked={formData.preferredContactMethod === 'email'}
                onChange={() => handleChange('preferredContactMethod', 'email')}
                className="sr-only"
              />
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </label>
          </div>
        </div>

        {/* Message */}
        <FormField
          id="enquiry-message"
          label="Message"
          required
          error={errors.message}
        >
          <div className="relative">
            <textarea
              id="enquiry-message"
              name="message"
              rows={4}
              required
              disabled={isSubmitting}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              onBlur={() => handleBlur('message')}
              placeholder="Tell us what you're looking for..."
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'enquiry-message-error' : undefined}
              className={`w-full p-3.5 bg-slate-50 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:bg-white disabled:opacity-60 resize-y min-h-[100px] ${
                errors.message
                  ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                  : 'border-slate-200 focus:ring-slate-900 focus:border-slate-900'
              }`}
            />
          </div>
        </FormField>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="gold"
          size="lg"
          disabled={isSubmitting}
          className="w-full justify-center font-semibold text-sm shadow-sm"
          icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          iconPosition={isSubmitting ? 'left' : 'right'}
        >
          {isSubmitting ? 'Submitting Enquiry...' : 'Submit Enquiry'}
        </Button>
        <p className="text-[11px] text-slate-500 text-center mt-2.5">
          By submitting, you agree to receive property advisory updates. No spam policy.
        </p>
      </div>
    </form>
  );
};
