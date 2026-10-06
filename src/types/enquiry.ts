export type PreferredContactMethod = 'phone' | 'email';

export interface EnquiryFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  message: string;
  preferredContactMethod: PreferredContactMethod;
  propertyId?: string;
}

export interface SiteVisitFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  propertyId: string;
}

export type FormValidationErrors = Record<string, string>;
