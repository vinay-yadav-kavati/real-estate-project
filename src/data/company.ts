export interface OfficeLocation {
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  fullAddress: string;
}

export interface BusinessHours {
  weekdays: string;
  sunday: string;
}

export interface CompanySocials {
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
}

export interface CompanyInfo {
  name: string;
  brandTagline: string;
  description: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  location: OfficeLocation;
  hours: BusinessHours;
  socials: CompanySocials;
}

export const COMPANY_INFO: CompanyInfo = {
  name: 'HomeNest',
  brandTagline: 'Premier Real Estate Advisory',
  description:
    'Helping individuals, families, and investors discover verified residential and commercial properties with transparent guidance and end-to-end advisory.',
  phone: '+91 XXXXX XXXXX',
  phoneHref: 'tel:+910000000000',
  email: 'info@homenest.example',
  emailHref: 'mailto:info@homenest.example',
  location: {
    addressLine1: 'Road No. 36, Jubilee Hills',
    addressLine2: 'Advisory Suite 402, Signature Square',
    landmark: 'Near Metro Pillar 1240',
    city: 'Hyderabad',
    state: 'Telangana',
    postalCode: '500033',
    country: 'India',
    fullAddress:
      'Road No. 36, Jubilee Hills, Advisory Suite 402, Hyderabad, Telangana 500033, India',
  },
  hours: {
    weekdays: 'Monday – Saturday: 9:00 AM – 6:00 PM IST',
    sunday: 'Sunday: By Prior Appointment Only',
  },
  socials: {
    instagram: '#instagram',
    facebook: '#facebook',
    linkedin: '#linkedin',
    youtube: '#youtube',
  },
};
