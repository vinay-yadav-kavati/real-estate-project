import React, { useState } from 'react';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, title }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeImage = images[selectedIndex] || images[0] || '/images/properties/hero.jpg';

  const handleThumbnailError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/images/properties/hero.jpg';
  };

  return (
    <div className="space-y-3">
      {/* Main Showcase Image */}
      <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-sm">
        <img
          src={activeImage}
          alt={`${title} - View ${selectedIndex + 1}`}
          onError={handleThumbnailError}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Counter Badge */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 shadow-xs tabular-nums">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`View photo ${idx + 1} of ${images.length}`}
                className={`relative shrink-0 w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#B48C58] ring-2 ring-[#B48C58]/30 shadow-xs scale-102'
                    : 'border-transparent opacity-70 hover:opacity-100 hover:border-slate-300'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onError={handleThumbnailError}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
