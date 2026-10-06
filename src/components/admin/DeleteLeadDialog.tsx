import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Lead } from '../../types/admin';
import { Button } from '../Button';

interface DeleteLeadDialogProps {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
  onConfirmDelete: (leadId: string) => void;
}

export const DeleteLeadDialog: React.FC<DeleteLeadDialogProps> = ({
  isOpen,
  lead,
  onClose,
  onConfirmDelete,
}) => {
  if (!isOpen || !lead) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-5">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Delete Lead?
          </h3>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Are you sure you want to delete this lead? This action cannot be undone.
          </p>

          <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Selected Lead:</span>
              <span className="font-bold text-slate-900 truncate max-w-[220px]">{lead.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Contact:</span>
              <span className="text-slate-800">{lead.phone} · {lead.email}</span>
            </div>
            {lead.propertyTitle && (
              <div className="flex justify-between">
                <span className="text-slate-500">Target Property:</span>
                <span className="font-semibold text-slate-800 truncate max-w-[220px]">{lead.propertyTitle}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="outline" size="md" onClick={onClose} type="button">
            Cancel
          </Button>
          <button
            type="button"
            onClick={() => {
              onConfirmDelete(lead.id);
              onClose();
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};
