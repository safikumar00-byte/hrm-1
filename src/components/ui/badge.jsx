import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default:
      'border-transparent bg-primary text-primary-foreground font-semibold shadow-xs',
    secondary:
      'border-transparent bg-secondary text-secondary-foreground font-medium',
    destructive:
      'border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-medium',
    outline: 'border-border text-foreground font-medium',
    brand:
      'border border-primary/30 bg-accent text-accent-foreground font-medium shadow-2xs',
    success:
      'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-medium',
    warning:
      'border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-medium',
    info:
      'border-sky-200 dark:border-sky-900/50 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 font-medium',
    neutral:
      'border-border bg-muted text-muted-foreground font-medium',
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
