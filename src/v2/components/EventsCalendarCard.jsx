import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { CalendarDays, Gift, Calendar } from 'lucide-react';

export function EventsCalendarCard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/general/events')
      .then((res) => res.json())
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  return (
    <Card className="shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-secondary text-secondary-foreground flex items-center justify-center">
            <CalendarDays className="w-3.5 h-3.5 text-foreground" />
          </div>
          <CardTitle className="text-base font-semibold">Events & Celebrations</CardTitle>
        </div>
        <Badge variant="outline" className="text-[10px]">
          Scheduled
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3.5">
        {/* Birthday card */}
        <div className="flex items-center gap-3 p-3.5 rounded-[var(--radius)] border border-[#60F61B]/40 bg-[#E9FFE0]/60 dark:bg-[#354B2B]/40 text-foreground transition-all">
          <div className="h-9 w-9 rounded-full bg-[#60F61B] text-[#21093D] flex items-center justify-center font-bold shrink-0 shadow-2xs">
            <Gift className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-foreground">Birthday Celebration! 🎂</p>
            <p className="text-xs text-muted-foreground truncate">
              Admin User & Sarah Johnson celebrate today
            </p>
          </div>
          <Button
            size="sm"
            variant="brand"
            className="text-xs h-7 px-2.5 shrink-0"
          >
            Send Wish
          </Button>
        </div>

        {/* Scheduled events */}
        {events.map((ev) => (
          <div
            key={ev.id}
            className="flex items-center justify-between p-3 rounded-[var(--radius)] border border-border hover:bg-secondary/40 transition-all hover:border-border"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">{ev.title}</h4>
                <p className="text-xs text-muted-foreground">
                  {ev.eventDate} • {ev.eventTime}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="text-[10px] shrink-0">
              Townhall
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
