import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Car, Building, User, Phone, Mail } from 'lucide-react';
import { SiteVisit, SiteVisitStatus, Lead } from '../../types/admin';
import { Property } from '../../types/property';
import { FormField } from '../FormField';
import { Button } from '../Button';

interface SiteVisitFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  visitToEdit?: SiteVisit | null;
  initialLead?: Lead | null;
  leads: Lead[];
  properties: Property[];
  onSubmit: (data: Omit<SiteVisit, 'id'>) => void;
}

const VISIT_STATUSES: SiteVisitStatus[] = [
  'Scheduled',
  'Confirmed',
  'Completed',
  'Cancelled',
  'Rescheduled',
];

const TIME_SLOTS = [
  '09:30 AM',
  '10:00 AM',
  '11:00 AM',
  '11:30 AM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];

export const SiteVisitFormModal: React.FC<SiteVisitFormModalProps> = ({
  isOpen,
  onClose,
  visitToEdit,
  initialLead,
  leads,
  properties,
  onSubmit,
}) => {
  const isEditing = Boolean(visitToEdit);

  const [selectedLeadId, setSelectedLeadId] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00 AM');
  const [status, setStatus] = useState<SiteVisitStatus>('Scheduled');
  const [transitRequested, setTransitRequested] = useState(false);
  const [assignedConsultant, setAssignedConsultant] = useState('Suresh Reddy');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (visitToEdit) {
      setSelectedLeadId(visitToEdit.leadId || '');
      setVisitorName(visitToEdit.leadName || '');
      setPhone(visitToEdit.phone || '');
      setEmail(visitToEdit.email || '');
      setPropertyId(visitToEdit.propertyId || '');
      setDate(visitToEdit.date || '');
      setTime(visitToEdit.time || '10:00 AM');
      setStatus(visitToEdit.status || 'Scheduled');
      setTransitRequested(Boolean(visitToEdit.transitRequested));
      setAssignedConsultant(visitToEdit.assignedConsultant || 'Suresh Reddy');
      setNotes(visitToEdit.notes || '');
      setErrors({});
    } else if (initialLead) {
      setSelectedLeadId(initialLead.id);
      setVisitorName(initialLead.name);
      setPhone(initialLead.phone);
      setEmail(initialLead.email);
      setPropertyId(initialLead.propertyId || (properties[0]?.id || ''));
      setDate(new Date(Date.now() + 86400000).toISOString().slice(0, 10));
      setTime('10:00 AM');
      setStatus('Scheduled');
      setTransitRequested(false);
      setAssignedConsultant('Suresh Reddy');
      setNotes('');
      setErrors({});
    } else {
      setSelectedLeadId(leads[0]?.id || '');
      setVisitorName(leads[0]?.name || '');
      setPhone(leads[0]?.phone || '');
      setEmail(leads[0]?.email || '');
      setPropertyId(properties[0]?.id || '');
      setDate(new Date(Date.now() + 86400000).toISOString().slice(0, 10));
      setTime('10:00 AM');
      setStatus('Scheduled');
      setTransitRequested(false);
      setAssignedConsultant('Suresh Reddy');
      setNotes('');
      setErrors({});
    }
  }, [visitToEdit, initialLead, isOpen, properties, leads]);

  // When lead selection changes, prefill contact info
  const handleLeadChange = (leadId: string) => {
    setSelectedLeadId(leadId);
    const found = leads.find((l) => l.id === leadId);
    if (found) {
      setVisitorName(found.name);
      setPhone(found.phone);
      setEmail(found.email);
      if (found.propertyId) {
        setPropertyId(found.propertyId);
      }
    }
  };

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!visitorName.trim()) errs.visitorName = 'Visitor or Lead must be selected.';
    if (!propertyId) errs.propertyId = 'A property must be selected.';
    if (!date) errs.date = 'Visit date is required.';
    if (!time) errs.time = 'Visit time slot is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedProp = properties.find((p) => p.id === propertyId);

    onSubmit({
      leadId: selectedLeadId || undefined,
      leadName: visitorName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      propertyId,
      propertyTitle: selectedProp?.title || 'Selected Property',
      propertyLocation: selectedProp ? `${selectedProp.locality}, ${selectedProp.city}` : 'Hyderabad',
      date,
      time,
      status,
      transitRequested,
      assignedConsultant,
      notes: notes.trim(),
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
              {isEditing ? 'Edit / Reschedule Site Visit' : 'Schedule Site Visit'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditing
                ? 'Update inspection date, time slot, consultant assignment, or status.'
                : 'Book a property tour appointment for a prospective buyer.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-sm">
          {/* Select Existing Lead */}
          <FormField id="visit-lead-select" label="Select Registered Lead / Customer" required error={errors.visitorName}>
            <select
              id="visit-lead-select"
              value={selectedLeadId}
              onChange={(e) => handleLeadChange(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              <option value="">-- Manual / Direct Walk-in Visitor --</option>
              {leads.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name} ({l.phone}) {l.propertyTitle ? `· Interested in ${l.propertyTitle}` : ''}
                </option>
              ))}
            </select>
          </FormField>

          {/* Visitor Name & Phone & Email (Autofilled or editable) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <FormField id="visit-name" label="Visitor Name" required>
              <input
                id="visit-name"
                type="text"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="Full name"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </FormField>

            <FormField id="visit-phone" label="Phone" required={false}>
              <input
                id="visit-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </FormField>

            <FormField id="visit-email" label="Email" required={false}>
              <input
                id="visit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </FormField>
          </div>

          {/* Target Property */}
          <FormField id="visit-property" label="Property to Tour" required error={errors.propertyId}>
            <select
              id="visit-property"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              <option value="">-- Choose Verified Property Listing --</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.locality} · {p.formattedPrice})
                </option>
              ))}
            </select>
          </FormField>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField id="visit-date" label="Preferred Tour Date" required error={errors.date}>
              <input
                id="visit-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
              />
            </FormField>

            <FormField id="visit-time" label="Time Slot" required error={errors.time}>
              <select
                id="visit-time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
              >
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          {/* Status & Consultant */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField id="visit-status" label="Visit Status" required>
              <select
                id="visit-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as SiteVisitStatus)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
              >
                {VISIT_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField id="visit-consultant" label="Assigned Consultant" required>
              <select
                id="visit-consultant"
                value={assignedConsultant}
                onChange={(e) => setAssignedConsultant(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
              >
                <option value="Suresh Reddy">Suresh Reddy (Senior Partner)</option>
                <option value="Meera Nambiar">Meera Nambiar (Portfolio Lead)</option>
                <option value="Karan Sharma">Karan Sharma (Property Counsel)</option>
              </select>
            </FormField>
          </div>

          {/* Chauffeured Transit Toggle */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Car className="w-4 h-4 text-[#B48C58]" />
              <div>
                <span className="font-semibold text-xs sm:text-sm text-slate-900 block">
                  Chauffeured Executive Pickup
                </span>
                <span className="text-[11px] text-slate-500">
                  Arrange executive car transit for client from metro / airport.
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              id="visit-transit"
              checked={transitRequested}
              onChange={(e) => setTransitRequested(e.target.checked)}
              className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900 cursor-pointer"
            />
          </div>

          {/* Notes */}
          <FormField id="visit-notes" label="Tour Logistics & Client Notes" required={false}>
            <textarea
              id="visit-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Client arrival station, family party size, architect accompanying..."
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
            {isEditing ? 'Save Changes' : 'Schedule Visit'}
          </Button>
        </div>
      </div>
    </div>
  );
};
