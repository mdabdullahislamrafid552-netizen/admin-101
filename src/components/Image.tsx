import React, { useState, ImgHTMLAttributes } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImageProps {
  alt: string;
  src?: string;
  className?: string;
  wrapperClassName?: string;
  [key: string]: any;
}

export function Image({ src, alt, className, wrapperClassName = '', ...props }: ImageProps) {
  const [error, setError] = useState(!src);

  return (
    <div className={`relative overflow-hidden bg-zinc-900/50 flex flex-col justify-center w-full h-full ${wrapperClassName}`}>
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <ImageIcon className="w-6 h-6 text-zinc-600 mb-3 stroke-[1.5] flex-shrink-0" />
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-zinc-500 text-center flex-shrink-0">
            Image Coming Soon
          </span>
          <span className="text-[8px] font-medium tracking-wide text-zinc-600/50 mt-2 text-center max-w-full truncate px-2 flex-shrink-0">
            {alt}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${className} w-full h-full object-cover relative z-10`}
          onError={() => setError(true)}
          {...props}
        />
      )}
    </div>
  );
}
