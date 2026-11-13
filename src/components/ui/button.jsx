import React from 'react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      type = 'button',
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer m-0';

    const variants = {
      default:
        'bg-primary text-primary-foreground font-bold shadow-xs hover:brightness-105 active:scale-[0.98] border-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      brand:
        'bg-[#21093D] text-[#60F61B] hover:brightness-110 border border-[#60F61B]/40 font-semibold shadow-xs active:scale-[0.98] dark:bg-secondary dark:text-primary dark:border-primary/40',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/60 font-medium',
      outline:
        'border border-border bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 text-foreground hover:bg-secondary hover:text-foreground font-medium shadow-2xs',
      ghost:
        'bg-transparent text-foreground hover:bg-secondary hover:text-foreground border-0 font-medium',
      destructive:
        'bg-destructive text-destructive-foreground hover:opacity-90 shadow-xs border-0 font-semibold',
      link:
        'text-primary underline-offset-4 hover:underline p-0 h-auto border-0 bg-transparent font-medium',
    };

    const sizes = {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 rounded-[calc(var(--radius)-2px)] px-3 text-xs',
      lg: 'h-11 rounded-[calc(var(--radius)+2px)] px-6 text-base font-semibold',
      icon: 'h-9 w-9 p-0 flex items-center justify-center',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
