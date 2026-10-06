import React, { useState } from 'react';
import { Calendar, Clock, Loader2, Phone, Mail, User, Send } from 'lucide-react';
import { Property } from '../types/property';
import { SiteVisitFormData, FormValidationErrors } from '../types/enquiry';
import {
  validateFullName,
  validatePhone,
  validateEmail,
  validateVisitDate,
  validateVisitTime,
  getTodayDateString,
} from '../lib/validation';
import { FormField } from './FormField';
import { FormSuccess } from './FormSuccess';
import { Button } from './Button';
import { useCRM } from '../context/CRMContext';

interface SiteVisitFormProps {
  property: Property;
  onSubmittedSuccess?: (data: SiteVisitFormData) => void;
}

const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];

export const SiteVisitForm: React.FC<SiteVisitFormProps> = ({
  property,
  onSubmittedSuccess,
}) => {
  const { addSiteVisit, addLead } = useCRM();
  const todayStr = getTodayDateString();

  const [formData, setFormData] = useState<SiteVisitFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    preferredDate: '',
    preferredTime: '10:00 AM',
    message: '',
    propertyId: property.id,
  });

  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate a single field
  const validateField = (field: keyof SiteVisitFormData, value: string): string | null => {
    switch (field) {
      case 'fullName':
        return validateFullName(value);
      case 'phoneNumber':
        return validatePhone(value);
      case 'email':
        return validateEmail(value);
      case 'preferredDate':
        return validateVisitDate(value);
      case 'preferredTime':
        return validateVisitTime(value);
      default:
        return null;
    }
  };

  const handleBlur = (field: keyof SiteVisitFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field] || '');
    setErrors((prev) => ({
      ...prev,
      [field]: errorMsg || '',
    }));
  };

  const handleChange = (field: keyof SiteVisitFormData, value: string) => {
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
    const newErrors: FormValidationErrors = {};

    const nameErr = validateFullName(formData.fullName);
    if (nameErr) newErrors.fullName = nameErr;

    const phoneErr = validatePhone(formData.phoneNumber);
    if (phoneErr) newErrors.phoneNumber = phoneErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;

    const dateErr = validateVisitDate(formData.preferredDate);
    if (dateErr) newErrors.preferredDate = dateErr;

    const timeErr = validateVisitTime(formData.preferredTime);
    if (timeErr) newErrors.preferredTime = timeErr;

    setErrors(newErrors);
    setTouched({
      fullName: true,
      phoneNumber: true,
      email: true,
      preferredDate: true,
      preferredTime: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);

    // Save lead & site visit to CRM context
    try {
      const createdLead = addLead({
        name: formData.fullName.trim(),
        phone: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        propertyId: property.id,
        propertyTitle: property.title,
        propertyPrice: property.formattedPrice,
        propertyType: property.propertyType,
        inquiryType: 'Site Visit Request',
        message: formData.message || `Scheduled site visit on ${formData.preferredDate} at ${formData.preferredTime}`,
        status: 'Site Visit Scheduled',
        notes: `Scheduled inspection on ${formData.preferredDate} at ${formData.preferredTime}`,
      });

      addSiteVisit({
        leadId: createdLead.id,
        leadName: formData.fullName.trim(),
        phone: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        propertyId: property.id,
        propertyTitle: property.title,
        propertyLocation: `${property.locality}, ${property.city}`,
        date: formData.preferredDate,
        time: formData.preferredTime,
        status: 'Scheduled',
        transitRequested: false,
        notes: formData.message || undefined,
      });
    } catch (err) {
      console.warn('Could not record site visit in CRM state:', err);
    }

    // Simulate network latency locally
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
      preferredDate: '',
      preferredTime: '10:00 AM',
      message: '',
      propertyId: property.id,
    });
    setErrors({});
    setTouched({});
  };

  if (isSubmitted) {
    return (
      <FormSuccess
        type="site-visit"
        property={property}
        applicantName={formData.fullName}
        visitDate={formData.preferredDate}
        visitTime={formData.preferredTime}
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
          Schedule a Private Site Visit
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Tour <strong className="text-slate-800">{property.title}</strong> with our senior property consultant. Complimentary private vehicle transit can be arranged.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <FormField
          id="sitevisit-fullName"
          label="Full Name"
          required
          error={errors.fullName}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              id="sitevisit-fullName"
              name="fullName"
              type="text"
              required
              disabled={isSubmitting}
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              onBlur={() => handleBlur('fullName')}
              placeholder="Enter your full name"
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'sitevisit-fullName-error' : undefined}
              className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:bg-white disabled:opacity-60 ${
                errors.fullName
                  ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                  : 'border-slate-200 focus:ring-slate-900 focus:border-slate-900'
              }`}
            />
          </div>
        </FormField>

        {/* Two Columns: Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone Number */}
          <FormField
            id="sitevisit-phoneNumber"
            label="Phone Number"
            required
            error={errors.phoneNumber}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" aria-hidden="true" />
              </div>
              <input
                id="sitevisit-phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                disabled={isSubmitting}
                value={formData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                onBlur={() => handleBlur('phoneNumber')}
                placeholder="Enter your phone number"
                aria-invalid={Boolean(errors.phoneNumber)}
                aria-describedby={errors.phoneNumber ? 'sitevisit-phoneNumber-error' : undefined}
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
            id="sitevisit-email"
            label="Email Address"
            required
            error={errors.email}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" aria-hidden="true" />
              </div>
              <input
                id="sitevisit-email"
                name="email"
                type="email"
                required
                disabled={isSubmitting}
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder="Enter your email address"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'sitevisit-email-error' : undefined}
                className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:bg-white disabled:opacity-60 ${
                  errors.email
                    ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                    : 'border-slate-200 focus:ring-slate-900 focus:border-slate-900'
                }`}
              />
            </div>
          </FormField>
        </div>

        {/* Date Selection */}
        <FormField
          id="sitevisit-date"
          label="Preferred Visit Date"
          required
          error={errors.preferredDate}
          helperText="Select today or any upcoming date for your guided site inspection."
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Calendar className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              id="sitevisit-date"
              name="preferredDate"
              type="date"
              required
              min={todayStr}
              disabled={isSubmitting}
              value={formData.preferredDate}
              onChange={(e) => handleChange('preferredDate', e.target.value)}
              onBlur={() => handleBlur('preferredDate')}
              aria-invalid={Boolean(errors.preferredDate)}
              aria-describedby={errors.preferredDate ? 'sitevisit-date-error' : 'sitevisit-date-help'}
              className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:bg-white disabled:opacity-60 cursor-pointer ${
                errors.preferredDate
                  ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                  : 'border-slate-200 focus:ring-slate-900 focus:border-slate-900'
              }`}
            />
          </div>
        </FormField>

        {/* Time Selection Slots */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Preferred Time Slot <span className="text-amber-700 font-bold">*</span>
            </label>
            <span className="text-[11px] text-slate-500">Representative slots</span>
          </div>

          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-2"
            role="radiogroup"
            aria-label="Preferred Time Slot"
          >
            {TIME_SLOTS.map((slot) => {
              const isSelected = formData.preferredTime === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleChange('preferredTime', slot)}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span>{slot}</span>
                </button>
              );
            })}
          </div>
          {errors.preferredTime && (
            <p className="text-xs text-rose-600 font-medium">{errors.preferredTime}</p>
          )}
        </div>

        {/* Optional Message */}
        <FormField
          id="sitevisit-message"
          label="Additional Requirements or Notes"
          required={false}
          error={errors.message}
        >
          <textarea
            id="sitevisit-message"
            name="message"
            rows={3}
            disabled={isSubmitting}
            value={formData.message || ''}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="E.g., Pickup location preference, number of family members visiting..."
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white disabled:opacity-60 resize-y"
          />
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
          {isSubmitting ? 'Scheduling Visit...' : 'Confirm Site Visit Request'}
        </Button>
        <p className="text-[11px] text-slate-500 text-center mt-2.5">
          Free chauffeured inspection with verified RERA documentation review.
        </p>
      </div>
    </form>
  );
};
