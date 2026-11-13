import React from 'react';
import { Megaphone, ShieldCheck, HeartHandshake, Sparkles, AlertCircle } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';

export function AnnouncementItem({ announcement, onClick }) {
  const { title, description, date, category, categoryColor } = announcement;

  const getCategoryIcon = (cat) => {
    switch ((cat || '').toLowerCase()) {
      case 'benefits':
      case 'wellness':
        return <HeartHandshake className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'product':
      case 'engineering':
        return <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      case 'policy':
      case 'security':
        return <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-primary" />;
      default:
        return <Megaphone className="w-4 h-4 text-primary" />;
    }
  };

  const getIconContainerStyle = (cat) => {
    switch ((cat || '').toLowerCase()) {
      case 'benefits':
      case 'wellness':
        return 'bg-purple-100 dark:bg-purple-950/50 border-purple-200 dark:border-purple-900/50';
      case 'product':
      case 'engineering':
        return 'bg-sky-100 dark:bg-sky-950/50 border-sky-200 dark:border-sky-900/50';
      case 'policy':
      case 'security':
        return 'bg-emerald-100 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900/50';
      default:
        return 'bg-accent dark:bg-[#354B2B] border-primary/30';
    }
  };

  return (
    <div
      onClick={onClick}
      className="p-3.5 rounded-[var(--radius)] border border-border bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900/60 hover:bg-secondary/40 transition-all hover:border-primary/40 group cursor-pointer"
    >
      <div className="flex items-start gap-3">
        {/* Soft tinted icon container */}
        <div
          className={`h-9 w-9 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${getIconContainerStyle(
            category
          )}`}
        >
          {getCategoryIcon(category)}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors truncate">
              {title}
            </h4>
            <span className="text-[10px] text-muted-foreground font-medium shrink-0 font-mono">
              {date || 'Recent'}
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 m-0">
            {description}
          </p>

          {category && (
            <div className="mt-2 flex items-center gap-1.5">
              <Badge variant="neutral" className="text-[10px] py-0 px-2 font-medium">
                {category}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
