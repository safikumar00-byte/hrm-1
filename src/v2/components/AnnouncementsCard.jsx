import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Megaphone } from 'lucide-react';

export function AnnouncementsCard() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch('/api/general/announcements')
      .then((res) => res.json())
      .then((data) => setAnnouncements(Array.isArray(data) ? data : []))
      .catch(() => { });
  }, []);

  return (
    <Card className="shadow-xs h-full flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-accent text-accent-foreground flex items-center justify-center">
            <Megaphone className="w-3.5 h-3.5 text-accent-foreground" />
          </div>
          <CardTitle className="text-base font-semibold">Announcements</CardTitle>
        </div>
        <Badge variant="brand" className="text-[10px]">
          Company Broadcast
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3 flex-1">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-[var(--radius)] border border-border bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900/60 hover:bg-secondary/40 transition-all hover:border-primary/40 group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <span className="text-[10px] text-muted-foreground shrink-0 ml-2 font-medium">Recent</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
