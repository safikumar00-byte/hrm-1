import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

export function QuickAccessCard({
  title,
  description,
  icon: Icon,
  badge,
  to,
  iconColor = 'primary',
}) {
  const navigate = useNavigate();

  const getIconContainerStyle = () => {
    switch (iconColor) {
      case 'purple':
        return 'bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/50';
      case 'blue':
        return 'bg-sky-100 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900/50';
      case 'emerald':
        return 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-primary border-emerald-200 dark:border-emerald-900/50';
      default:
        return 'bg-accent dark:bg-[#354B2B] text-accent-foreground dark:text-primary border-primary/30';
    }
  };

  return (
    <Card
      onClick={() => to && navigate(to)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (to) navigate(to);
        }
      }}
      className="p-4 sm:p-5 border border-border bg-card hover:bg-secondary/40 transition-all hover:border-primary/50 hover:shadow-sm cursor-pointer group rounded-[var(--radius)] relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          {/* Themed Icon Container */}
          <div
            className={`h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 duration-200 ${getIconContainerStyle()}`}
          >
            <Icon className="w-5 h-5 stroke-[2.2]" />
          </div>

          <div className="flex items-center gap-1.5">
            {badge && (
              <Badge variant="brand" className="text-[10px] py-0 px-2 font-semibold">
                {badge}
              </Badge>
            )}
            <div className="h-6 w-6 rounded-md flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-sm font-bold text-card-foreground group-hover:text-primary transition-colors leading-tight mb-1">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 m-0">
          {description}
        </p>
      </div>

      <div className="pt-3 mt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-semibold text-muted-foreground group-hover:text-primary transition-colors">
        <span>Launch module</span>
        <span>→</span>
      </div>
    </Card>
  );
}
