/**
 * Form validation helper functions for customer enquiry and site visit requests.
 */

export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function validateFullName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) {
    return 'Full name is required';
  }
  if (trimmed.length < 2) {
    return 'Full name must be at least 2 characters';
  }
  return null;
}

export function validatePhone(phone: string): string | null {
  const trimmed = phone.trim();
  if (!trimmed) {
    return 'Phone number is required';
  }

  // Strip all spaces, dashes, dots, parentheses
  const cleaned = trimmed.replace(/[\s\-\(\)\.]/g, '');

  // Check valid Indian mobile format:
  // Must match either:
  // 1. Exactly 10 digits starting with 6, 7, 8, or 9
  // 2. +91 or 91 followed by 10 digits starting with 6, 7, 8, or 9
  // 3. 0 followed by 10 digits starting with 6, 7, 8, or 9
  const indianMobileRegex = /^(\+?91|0)?[6-9]\d{9}$/;

  if (!indianMobileRegex.test(cleaned)) {
    return 'Please enter a valid 10-digit Indian phone number (e.g. 98765 43210)';
  }

  return null;
}

export function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) {
    return 'Email address is required';
  }

  // Standard email validation pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address (e.g. name@example.com)';
  }

  return null;
}

export function validateMessage(message: string, isRequired = true): string | null {
  const trimmed = message.trim();
  if (isRequired && !trimmed) {
    return 'Message is required. Please tell us what you are looking for.';
  }
  return null;
}

export function validateVisitDate(dateStr: string): string | null {
  const trimmed = dateStr.trim();
  if (!trimmed) {
    return 'Please select a preferred visit date';
  }

  const todayStr = getTodayDateString();
  if (trimmed < todayStr) {
    return 'Visit date cannot be in the past. Please choose today or a future date.';
  }

  return null;
}

export function validateVisitTime(timeStr: string): string | null {
  const trimmed = timeStr.trim();
  if (!trimmed) {
    return 'Please select a preferred time slot';
  }
  return null;
}
