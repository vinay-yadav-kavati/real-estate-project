import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, Building, FileText, Check, AlertCircle } from 'lucide-react';
import { Lead, LeadStatus } from '../../types/admin';
import { Property } from '../../types/property';
import { FormField } from '../FormField';
import { Button } from '../Button';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadToEdit?: Lead | null;
  properties: Property[];
  onSubmit: (data: Omit<Lead, 'id' | 'date'> & { id?: string; date?: string }) => void;
}

const LEAD_STATUSES: LeadStatus[] = [
  'New',
  'Contacted',
  'Qualified',
  'Site Visit Scheduled',
  'Negotiation',
  'Closed',
  'Lost',
];

export const LeadFormModal: React.FC<LeadFormModalProps> = ({
  isOpen,
  onClose,
  leadToEdit,
  properties,
  onSubmit,
}) => {
  const isEditing = Boolean(leadToEdit);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyId: '',
    status: 'New' as LeadStatus,
    message: '',
    notes: '',
    assignedAdvisor: 'Suresh Reddy (Senior Partner)',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (leadToEdit) {
      setFormData({
        name: leadToEdit.name || '',
        phone: leadToEdit.phone || '',
        email: leadToEdit.email || '',
        propertyId: leadToEdit.propertyId || '',
        status: (leadToEdit.status as LeadStatus) || 'New',
        message: leadToEdit.message || '',
        notes: leadToEdit.notes || '',
        assignedAdvisor: leadToEdit.assignedAdvisor || 'Suresh Reddy (Senior Partner)',
      });
      setErrors({});
    } else {
      setFormData({
        name: '',
        phone: '',
        email: '',
        propertyId: '',
        status: 'New',
        message: '',
        notes: '',
        assignedAdvisor: 'Suresh Reddy (Senior Partner)',
      });
      setErrors({});
    }
  }, [leadToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Lead full name is required.';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedProp = properties.find((p) => p.id === formData.propertyId);

    onSubmit({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      propertyId: formData.propertyId || undefined,
      propertyTitle: selectedProp?.title,
      propertyPrice: selectedProp?.formattedPrice,
      propertyType: selectedProp?.propertyType,
      status: formData.status,
      message: formData.message.trim(),
      notes: formData.notes.trim(),
      assignedAdvisor: formData.assignedAdvisor,
      inquiryType: selectedProp ? 'Property Inquiry' : 'General Advisory',
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200/90 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {isEditing ? `Edit Lead: ${leadToEdit?.name}` : 'Create New Lead'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditing
                ? 'Update customer contact details, negotiation stage, and internal notes.'
                : 'Log a new inquiry into the sales pipeline.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-sm">
          {/* Full Name */}
          <FormField id="lead-name" label="Full Name" required error={errors.name}>
            <input
              id="lead-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Ramesh Chandra"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </FormField>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField id="lead-phone" label="Phone Number" required error={errors.phone}>
              <input
                id="lead-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </FormField>

            <FormField id="lead-email" label="Email Address" required error={errors.email}>
              <input
                id="lead-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ramesh@example.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </FormField>
          </div>

          {/* Interested Property & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField id="lead-property" label="Interested Property" required={false}>
              <select
                id="lead-property"
                value={formData.propertyId}
                onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
              >
                <option value="">-- General Portfolio Advisory (None) --</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.locality} · {p.formattedPrice})
                  </option>
                ))}
              </select>
            </FormField>

            <FormField id="lead-status" label="Lead Status Stage" required>
              <select
                id="lead-status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatus })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
              >
                {LEAD_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          {/* Assigned Advisor */}
          <FormField id="lead-advisor" label="Assigned Advisor" required={false}>
            <select
              id="lead-advisor"
              value={formData.assignedAdvisor}
              onChange={(e) => setFormData({ ...formData, assignedAdvisor: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              <option value="Suresh Reddy (Senior Partner)">Suresh Reddy (Senior Partner)</option>
              <option value="Meera Nambiar (Portfolio Lead)">Meera Nambiar (Portfolio Lead)</option>
              <option value="Karan Sharma (Land & Title Counsel)">Karan Sharma (Land & Title Counsel)</option>
            </select>
          </FormField>

          {/* Customer Message */}
          <FormField id="lead-message" label="Customer Inquiry Message" required={false}>
            <textarea
              id="lead-message"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Client's initial enquiry or requirements..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
            />
          </FormField>

          {/* Internal Advisor Notes */}
          <FormField id="lead-notes" label="Internal Notes & Follow-up History" required={false}>
            <textarea
              id="lead-notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Record notes on budget, family requirements, deed scrutiny, or next meeting dates..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
            />
          </FormField>
        </form>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200/90 bg-slate-50/70 flex items-center justify-end gap-3 shrink-0">
          <Button variant="outline" size="md" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="gold" size="md" onClick={handleSubmit} type="button" className="font-semibold shadow-sm">
            {isEditing ? 'Save Changes' : 'Create Lead'}
          </Button>
        </div>
      </div>
    </div>
  );
};
