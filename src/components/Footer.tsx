import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-8 rounded bg-white text-slate-950 flex items-center justify-center font-bold text-sm">
                HN
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {COMPANY_INFO.name}
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {COMPANY_INFO.description}
            </p>
            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={COMPANY_INFO.socials.instagram}
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-[#B48C58] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.facebook}
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-[#B48C58] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.linkedin}
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-[#B48C58] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.youtube}
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-[#B48C58] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-slate-400 hover:text-white transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/enquire" className="text-slate-400 hover:text-white transition-colors">
                  General Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B48C58] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.location.city}, {COMPANY_INFO.location.state}</span>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#B48C58] shrink-0" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.emailHref}
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#B48C58] shrink-0" />
                  <span>{COMPANY_INFO.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Advisory Standards */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Our Advisory Standard
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Every listing is physically verified, RERA-cleared, and vetted by legal advisors to safeguard your investment.
            </p>
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-xs text-slate-300">
              {COMPANY_INFO.hours.weekdays}
            </div>
          </div>
        </div>

        {/* Legal & Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 {COMPANY_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">
              Terms & Conditions
            </a>
            <Link
              to="/admin"
              className="text-slate-400 hover:text-[#E4C59E] transition-colors font-medium flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B48C58]" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
