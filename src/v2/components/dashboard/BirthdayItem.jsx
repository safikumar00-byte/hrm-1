import React, { useState } from 'react';
import { Gift, Sparkles, Check, Heart } from 'lucide-react';
import { Avatar } from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';

export function BirthdayItem({ birthday }) {
  const { name, department, date, avatar } = birthday;
  const [wished, setWished] = useState(false);

  const getInitials = (n) => {
    if (!n) return 'U';
    const parts = n.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const isToday = (date || '').toLowerCase().includes('today');

  return (
    <div
      className={`flex items-center justify-between p-3.5 rounded-[var(--radius)] border transition-all ${isToday
        ? 'border-primary/40 bg-accent/60 text-accent-foreground'
        : 'border-border bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900/60 hover:bg-secondary/40'
        }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Avatar or Initials */}
        <div className="relative shrink-0">
          <Avatar
            src={avatar}
            fallback={getInitials(name)}
            size="md"
            className={`border ${isToday ? 'border-primary/60 ring-2 ring-primary/20' : 'border-border'}`}
          />
          {isToday && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">
              🎂
            </span>
          )}
        </div>

        {/* Name & Department */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-xs sm:text-sm font-bold text-card-foreground truncate m-0">
              {name}
            </h4>
            {isToday ? (
              <Badge variant="brand" className="text-[10px] py-0 px-2 font-bold animate-pulse">
                Today! 🎉
              </Badge>
            ) : (
              <span className="text-[10px] text-muted-foreground font-semibold font-mono">
                {date}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate m-0 mt-0.5">
            {department}
          </p>
        </div>
      </div>

      {/* Wish Button */}
      <div className="shrink-0 ml-3">
        {wished ? (
          <Button
            size="sm"
            variant="outline"
            disabled
            className="h-8 text-xs font-semibold gap-1.5 text-emerald-600 dark:text-primary border-emerald-500/30"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Wished! 🎈</span>
          </Button>
        ) : (
          <Button
            size="sm"
            variant={isToday ? 'default' : 'outline'}
            onClick={() => setWished(true)}
            className={`h-8 text-xs font-bold gap-1.5 transition-all ${isToday
              ? 'bg-primary text-primary-foreground hover:brightness-105 active:scale-[0.98]'
              : 'hover:border-primary hover:text-primary'
              }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Send Wish</span>
          </Button>
        )}
      </div>
    </div>
  );
}
