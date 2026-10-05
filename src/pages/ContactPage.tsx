import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'General Enquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#B48C58]">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
          Connect with Our Advisory Team
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          Whether looking to acquire a luxury residence, schedule a private consultation, or explore commercial opportunities, our advisors are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-start">
        {/* Contact Info Details */}
        <div className="bg-slate-900 text-white rounded-xl p-8 space-y-6">
          <h2 className="text-xl font-bold">Advisory Office</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Visit our corporate office for private consultations and portfolio review sessions.
          </p>

          <div className="space-y-4 pt-4 border-t border-slate-800 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#B48C58] shrink-0 mt-0.5" />
              <span>Hyderabad, Telangana, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#B48C58] shrink-0" />
              <span>+91 XXXXX XXXXX</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#B48C58] shrink-0" />
              <span>info@example.com</span>
            </div>
          </div>

          <div className="p-4 bg-slate-800/80 rounded-lg text-xs text-slate-400 mt-6">
            <p className="font-semibold text-slate-200 mb-1">Office Hours</p>
            <p>Monday – Saturday: 9:30 AM – 6:30 PM IST</p>
            <p>Sunday: By Prior Appointment Only</p>
          </div>
        </div>

        {/* Contact / Enquiry Form (Frontend UI for Step 1) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-slate-200/90 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Enquiry Received</h3>
              <p className="text-slate-600 max-w-md mx-auto text-sm">
                Thank you for reaching out. In this Step 1 preview, this mock enquiry has been acknowledged. Backend enquiry routing will be connected in a later step.
              </p>
              <div className="pt-4">
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Submit Another Enquiry
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Area of Interest
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white cursor-pointer"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Buying Luxury Villa">Buying Luxury Villa</option>
                    <option value="Buying Penthouse/Apartment">Buying Penthouse / Apartment</option>
                    <option value="Commercial Space">Commercial Space</option>
                    <option value="Scheduling Site Visit">Scheduling Site Visit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you are looking for..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto font-semibold px-8"
                  icon={<Send className="w-4 h-4" />}
                >
                  Send Message
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
