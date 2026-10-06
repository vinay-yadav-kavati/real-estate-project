import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Sparkles,
  Building2,
  IndianRupee,
  Trash2,
} from 'lucide-react';
import { Property, PropertyType, PropertyStatus } from '../../types/property';
import { FormField } from '../FormField';
import { Button } from '../Button';

interface PropertyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyToEdit?: Property | null;
  onSubmit: (data: Omit<Property, 'id' | 'createdAt'>) => void;
  onDeleteRequest?: (property: Property) => void;
}

const PROPERTY_TYPES: PropertyType[] = [
  'Villa',
  'Apartment',
  'Commercial',
  'Plot',
  'House',
  'Duplex',
];

const PROPERTY_STATUSES: PropertyStatus[] = [
  'Available',
  'Under Negotiation',
  'Sold',
  'Rented',
];

const PRESET_IMAGES = [
  { label: 'Modern Villa', url: '/images/properties/prop_modern_villa.jpg' },
  { label: 'Skyline Penthouse', url: '/images/properties/prop_skyline_penthouse.jpg' },
  { label: 'Contemporary Duplex', url: '/images/properties/prop_contemporary_duplex.jpg' },
  { label: 'Commercial Suite', url: '/images/properties/prop_commercial_suite.jpg' },
  { label: 'Corporate Glass Tower', url: '/images/properties/prop_glass_tower.jpg' },
  { label: 'Residential Plot', url: '/images/properties/prop_emerald_plot.jpg' },
  { label: 'Serene Golf Villa', url: '/images/properties/prop_serene_villa.jpg' },
  { label: 'Lakeview Residence', url: '/images/properties/prop_lakeview_residence.jpg' },
  { label: 'Independent Manor', url: '/images/properties/prop_independent_house.jpg' },
  { label: 'Twilight Architecture', url: '/images/properties/hero.jpg' },
];

const COMMON_AMENITIES = [
  '24/7 Gated Security',
  'Private Swimming Pool',
  'Landscaped Garden',
  'Covered Double Parking',
  '100% Power Backup',
  'Smart Home Automation',
  'Clubhouse & Gym',
  'Solar Water Heating',
  'Rainwater Harvesting',
  'High-Speed Elevators',
  'Vastu Compliant Design',
  'Dedicated Maintenance Staff',
];

function formatPriceINR(amount: number): string {
  if (isNaN(amount) || amount <= 0) return '₹0';
  if (amount >= 10000000) {
    const cr = (amount / 10000000).toFixed(2).replace(/\.00$/, '');
    return `₹${cr} Cr`;
  }
  if (amount >= 100000) {
    const lk = (amount / 100000).toFixed(2).replace(/\.00$/, '');
    return `₹${lk} Lakh`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

export const PropertyFormModal: React.FC<PropertyFormModalProps> = ({
  isOpen,
  onClose,
  propertyToEdit,
  onSubmit,
  onDeleteRequest,
}) => {
  const isEditing = Boolean(propertyToEdit);

  const [formData, setFormData] = useState({
    title: '',
    propertyType: 'Villa' as PropertyType,
    purpose: 'Buy' as 'Buy' | 'Rent',
    priceNumeric: 12500000,
    areaSqFt: 2100,
    bedrooms: 3,
    bathrooms: 3,
    locality: 'Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Road No. 36, Jubilee Hills',
    status: 'Available' as PropertyStatus,
    description: '',
    imageUrl: '/images/properties/prop_modern_villa.jpg',
    tag: 'Verified Listing',
    featured: false,
    amenities: ['24/7 Gated Security', '100% Power Backup', 'Covered Double Parking'],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (propertyToEdit) {
      setFormData({
        title: propertyToEdit.title,
        propertyType: propertyToEdit.propertyType,
        purpose: propertyToEdit.purpose,
        priceNumeric: propertyToEdit.priceNumeric || 10000000,
        areaSqFt: propertyToEdit.areaSqFt || 1800,
        bedrooms: propertyToEdit.bedrooms || 3,
        bathrooms: propertyToEdit.bathrooms || 3,
        locality: propertyToEdit.locality || 'Jubilee Hills',
        city: propertyToEdit.city || 'Hyderabad',
        state: propertyToEdit.state || 'Telangana',
        address: propertyToEdit.address || '',
        status: propertyToEdit.status,
        description: propertyToEdit.description || '',
        imageUrl: propertyToEdit.imageUrl || '/images/properties/prop_modern_villa.jpg',
        tag: propertyToEdit.tag || 'Verified Listing',
        featured: Boolean(propertyToEdit.featured),
        amenities: propertyToEdit.amenities?.length ? propertyToEdit.amenities : ['24/7 Gated Security'],
      });
    } else {
      setFormData({
        title: '',
        propertyType: 'Villa',
        purpose: 'Buy',
        priceNumeric: 12500000,
        areaSqFt: 2100,
        bedrooms: 3,
        bathrooms: 3,
        locality: 'Jubilee Hills',
        city: 'Hyderabad',
        state: 'Telangana',
        address: 'Road No. 36, Jubilee Hills',
        status: 'Available',
        description: 'An architectural statement featuring double-height living spaces, imported marble, and private landscaped garden.',
        imageUrl: '/images/properties/prop_modern_villa.jpg',
        tag: 'Verified Listing',
        featured: false,
        amenities: ['24/7 Gated Security', '100% Power Backup', 'Covered Double Parking'],
      });
    }
    setErrors({});
    setTouched({});
  }, [propertyToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.title.trim()) {
      errs.title = 'Property title is required';
    } else if (formData.title.trim().length < 4) {
      errs.title = 'Title must be at least 4 characters';
    }

    if (!formData.locality.trim()) {
      errs.locality = 'Locality is required (e.g. Jubilee Hills, Kokapet)';
    }

    if (!formData.priceNumeric || formData.priceNumeric <= 0) {
      errs.priceNumeric = 'Price must be a valid positive number';
    }

    if (!formData.areaSqFt || formData.areaSqFt <= 0) {
      errs.areaSqFt = 'Area (sq.ft.) must be greater than zero';
    }

    if (!formData.description.trim()) {
      errs.description = 'Property description is required';
    }

    if (!formData.imageUrl.trim()) {
      errs.imageUrl = 'Image URL is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const formattedPrice = formatPriceINR(Number(formData.priceNumeric));
    const locationStr = `${formData.locality}, ${formData.city}, ${formData.state}`;

    const submission: Omit<Property, 'id' | 'createdAt'> = {
      title: formData.title.trim(),
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      propertyType: formData.propertyType,
      purpose: formData.purpose,
      price: formattedPrice,
      formattedPrice: formattedPrice,
      priceNumeric: Number(formData.priceNumeric),
      bedrooms: Number(formData.bedrooms) || 0,
      bathrooms: Number(formData.bathrooms) || 0,
      areaSqFt: Number(formData.areaSqFt) || 0,
      location: locationStr,
      locality: formData.locality.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      address: formData.address.trim() || `${formData.locality}, ${formData.city}`,
      status: formData.status,
      imageUrl: formData.imageUrl.trim(),
      images: [formData.imageUrl.trim(), '/images/properties/interior_living.jpg', '/images/properties/interior_kitchen.jpg'],
      imageAlt: `${formData.title} located in ${formData.locality}, ${formData.city}`,
      description: formData.description.trim(),
      amenities: formData.amenities,
      specifications: [
        { label: 'Property Type', value: `${formData.propertyType} Residence` },
        { label: 'Super Built-up Area', value: `${formData.areaSqFt.toLocaleString()} sq.ft.` },
        { label: 'Ownership', value: 'Freehold Clear Title' },
        { label: 'Status', value: formData.status },
      ],
      featured: formData.featured,
      tag: formData.tag.trim() || undefined,
    };

    onSubmit(submission);
    onClose();
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200/90 flex items-center justify-between bg-slate-50/70">
          <div>
            <span className="text-[11px] font-semibold text-[#B48C58] uppercase tracking-wider block">
              {isEditing ? 'Inventory Update' : 'New Property Listing'}
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              {isEditing ? `Edit: ${propertyToEdit?.title}` : 'Add Property to Catalog'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSubmit} noValidate className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              1. Basic Identification
            </h3>

            {/* Title */}
            <FormField id="prop-title" label="Property Title" required error={errors.title}>
              <input
                id="prop-title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Modern 3 BHK Luxury Villa"
                className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:bg-white ${
                  errors.title ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-slate-900'
                }`}
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Property Type */}
              <FormField id="prop-type" label="Property Type" required>
                <select
                  id="prop-type"
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
                >
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </FormField>

              {/* Purpose */}
              <FormField id="prop-purpose" label="Listing Purpose" required>
                <select
                  id="prop-purpose"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value as 'Buy' | 'Rent' })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
                >
                  <option value="Buy">For Sale / Buy</option>
                  <option value="Rent">For Rent / Lease</option>
                </select>
              </FormField>

              {/* Status */}
              <FormField id="prop-status" label="Current Status" required>
                <select
                  id="prop-status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as PropertyStatus })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer font-semibold"
                >
                  {PROPERTY_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>
          </div>

          {/* Section 2: Valuation & Spatial Specs */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              2. Valuation & Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Price Numeric */}
              <FormField
                id="prop-price"
                label="Price (INR ₹)"
                required
                error={errors.priceNumeric}
                helperText={`Preview: ${formatPriceINR(Number(formData.priceNumeric))}`}
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <input
                    id="prop-price"
                    type="number"
                    min="100000"
                    step="50000"
                    value={formData.priceNumeric}
                    onChange={(e) => setFormData({ ...formData, priceNumeric: Number(e.target.value) })}
                    className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:bg-white font-mono ${
                      errors.priceNumeric ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-slate-900'
                    }`}
                  />
                </div>
              </FormField>

              {/* Area SqFt */}
              <FormField id="prop-area" label="Built-Up / Plot Area (sq.ft.)" required error={errors.areaSqFt}>
                <input
                  id="prop-area"
                  type="number"
                  min="50"
                  step="10"
                  value={formData.areaSqFt}
                  onChange={(e) => setFormData({ ...formData, areaSqFt: Number(e.target.value) })}
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:bg-white font-mono ${
                    errors.areaSqFt ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-slate-900'
                  }`}
                />
              </FormField>
            </div>

            {formData.propertyType !== 'Plot' && formData.propertyType !== 'Commercial' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField id="prop-bedrooms" label="Bedrooms (BHK)" required>
                  <input
                    id="prop-bedrooms"
                    type="number"
                    min="0"
                    max="10"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </FormField>

                <FormField id="prop-bathrooms" label="Bathrooms" required>
                  <input
                    id="prop-bathrooms"
                    type="number"
                    min="0"
                    max="10"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </FormField>
              </div>
            )}
          </div>

          {/* Section 3: Location */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              3. Location & Geography
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField id="prop-locality" label="Locality / Neighborhood" required error={errors.locality}>
                <input
                  id="prop-locality"
                  type="text"
                  value={formData.locality}
                  onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                  placeholder="e.g. Jubilee Hills, Kokapet"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </FormField>

              <FormField id="prop-city" label="City" required>
                <input
                  id="prop-city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </FormField>

              <FormField id="prop-state" label="State" required>
                <input
                  id="prop-state"
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </FormField>
            </div>

            <FormField id="prop-address" label="Street Address / Landmark" required={false}>
              <input
                id="prop-address"
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g. Road No. 36, Near Jubilee Hills Checkpost"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </FormField>
          </div>

          {/* Section 4: Imagery & Photography */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              4. Realistic Architectural Photography
            </h3>

            <FormField id="prop-image" label="Main Showcase Image URL" required error={errors.imageUrl}>
              <div className="flex gap-3">
                <input
                  id="prop-image"
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="/images/properties/prop_modern_villa.jpg"
                  className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono text-xs"
                />
                <div className="w-12 h-10 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/properties/hero.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </FormField>

            {/* Quick Presets Picker */}
            <div>
              <span className="text-xs font-semibold text-slate-500 block mb-2">
                Or select from verified real-estate photographs:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {PRESET_IMAGES.map((preset) => {
                  const isSelected = formData.imageUrl === preset.url;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                      className={`relative rounded-lg overflow-hidden border text-left p-1 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#B48C58] ring-2 ring-[#B48C58]/30 shadow-xs'
                          : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="aspect-[16/10] w-full rounded overflow-hidden bg-slate-100">
                        <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-700 block truncate mt-1">
                        {preset.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 5: Description & Amenities */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              5. Narrative & Amenities
            </h3>

            <FormField id="prop-desc" label="Property Overview & Architectural Description" required error={errors.description}>
              <textarea
                id="prop-desc"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Highlight design elements, orientation, materials, and lifestyle benefits..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-y"
              />
            </FormField>

            {/* Amenities Grid */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Select Amenities & Highlights
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {COMMON_AMENITIES.map((amenity) => {
                  const isChecked = formData.amenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium text-left transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border ${
                        isChecked ? 'bg-[#B48C58] border-[#B48C58] text-slate-950' : 'border-slate-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>
                      <span className="truncate">{amenity}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tag & Featured */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <FormField id="prop-tag" label="Verification Tag" required={false}>
                <input
                  id="prop-tag"
                  type="text"
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  placeholder="e.g. Verified Listing, Prime Corridor"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </FormField>

              <div className="flex items-center gap-3 pt-6">
                <input
                  id="prop-featured"
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900 cursor-pointer"
                />
                <label htmlFor="prop-featured" className="text-xs font-semibold text-slate-800 cursor-pointer">
                  Feature on Public Homepage
                </label>
              </div>
            </div>
          </div>
        </form>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-200/90 bg-slate-50/70 flex items-center justify-between gap-3 shrink-0">
          <div>
            {isEditing && propertyToEdit && onDeleteRequest && (
              <button
                type="button"
                onClick={() => onDeleteRequest(propertyToEdit)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                <span>Delete Property</span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="md" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="gold" size="md" onClick={handleSubmit} type="button" className="font-semibold shadow-sm">
              {isEditing ? 'Save Changes' : 'Create Listing'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
