import React from 'react';

export interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  lightMode?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  description,
  align = 'left',
  lightMode = false,
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-8 sm:mb-12 ${isCenter ? 'text-center mx-auto' : ''} ${className}`}>
      {label && (
        <span
          className={`block text-xs font-semibold tracking-wider uppercase mb-2 ${
            lightMode ? 'text-amber-300' : 'text-[#B48C58]'
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-balance ${
          lightMode ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-base sm:text-lg leading-relaxed max-w-2xl text-balance ${
            isCenter ? 'mx-auto' : ''
          } ${lightMode ? 'text-slate-300' : 'text-slate-600'}`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
