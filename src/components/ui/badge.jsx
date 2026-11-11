import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default:
      'border-transparent bg-primary text-primary-foreground font-semibold shadow-xs',
    secondary:
      'border-transparent bg-secondary text-secondary-foreground',
    destructive:
      'border-transparent bg-destructive text-destructive-foreground',
    outline: 'border-border text-foreground',
    brand:
      'border border-[#60F61B]/30 bg-[#E9FFE0] text-[#21093D] dark:bg-[#354B2B] dark:text-[#B4FA94] font-medium',
    success:
      'border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    warning:
      'border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    info:
      'border-sky-200 bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
