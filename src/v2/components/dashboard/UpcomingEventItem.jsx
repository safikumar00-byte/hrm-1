import React, { useState } from 'react';
import { Calendar, Video, Users, Clock, Check } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';

export function UpcomingEventItem({ event }) {
  const { title, date, time, type, location } = event;
  const [joined, setJoined] = useState(false);

  const getEventIcon = (eventTitle, eventType) => {
    const combined = `${eventTitle} ${eventType}`.toLowerCase();
    if (combined.includes('townhall') || combined.includes('all-hands')) {
      return <Users className="w-4 h-4 text-primary" />;
    }
    if (combined.includes('tech') || combined.includes('review') || combined.includes('demo')) {
      return <Video className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
    }
    return <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-[var(--radius)] border border-border bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900/60 hover:bg-secondary/40 transition-all gap-3 group">
      {/* Event Details */}
      <div className="flex items-start gap-3 min-w-0">
        <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5 border border-border/80">
          {getEventIcon(title, type)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="text-xs sm:text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors truncate m-0">
              {title}
            </h4>
            {type && (
              <Badge variant="outline" className="text-[10px] py-0 px-1.5 shrink-0 font-medium">
                {type}
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground font-medium">
            <span className="flex items-center gap-1 font-mono text-foreground/80">
              <Calendar className="w-3 h-3 text-primary" />
              {date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-muted-foreground" />
              {time}
            </span>
            {location && (
              <>
                <span>•</span>
                <span className="truncate max-w-[140px] text-muted-foreground">{location}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="shrink-0 self-end sm:self-center">
        {joined ? (
          <Button
            size="sm"
            variant="outline"
            disabled
            className="h-7 text-xs font-semibold gap-1 text-emerald-600 dark:text-primary border-emerald-500/30"
          >
            <Check className="w-3 h-3" />
            <span>RSVP'd</span>
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setJoined(true)}
            className="h-7 text-xs font-semibold hover:border-primary hover:text-primary transition-colors"
          >
            <span>Join / RSVP</span>
          </Button>
        )}
      </div>
    </div>
  );
}
