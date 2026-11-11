import React, { useState } from 'react';
import { cn } from '../../lib/utils';

export function Avatar({ className, src, alt, fallback = 'U', size = 'md' }) {
  const [hasError, setHasError] = useState(!src);

  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-base font-semibold',
    xl: 'h-20 w-20 text-xl font-bold',
  };

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full border border-border bg-secondary font-medium text-secondary-foreground items-center justify-center select-none shadow-2xs',
        sizes[size],
        className
      )}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          onError={() => setHasError(true)}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}
