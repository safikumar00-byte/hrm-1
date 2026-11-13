import React, { useState } from 'react';
import { Megaphone, ArrowRight, Inbox } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { AnnouncementItem } from './AnnouncementItem';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../../components/ui/dialog';

export function AnnouncementsCard({ announcements = [] }) {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [viewAllOpen, setViewAllOpen] = useState(false);

  const displayedAnnouncements = announcements.slice(0, 3);

  return (
    <>
      <Card className="flex flex-col justify-between border border-border bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-xs rounded-[var(--radius)] h-full overflow-hidden">
        <div>
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 px-5 sm:px-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-accent text-accent-foreground flex items-center justify-center border border-primary/20">
                <Megaphone className="w-4 h-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold text-card-foreground">
                  Announcements
                </CardTitle>
                <p className="text-xs text-muted-foreground m-0">
                  Company news & workplace updates
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewAllOpen(true)}
              className="h-8 text-xs font-semibold gap-1 hover:text-primary group border-border"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </CardHeader>

          {/* List of Announcement Items */}
          <CardContent className="px-5 sm:px-6 pt-1 pb-4 space-y-3">
            {displayedAnnouncements.length > 0 ? (
              displayedAnnouncements.map((item) => (
                <AnnouncementItem
                  key={item.id}
                  announcement={item}
                  onClick={() => setSelectedAnnouncement(item)}
                />
              ))
            ) : (
              <div className="text-center py-10 px-4 border border-dashed border-border rounded-[var(--radius)]">
                <Inbox className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-60" />
                <p className="text-sm font-semibold text-foreground">No announcements posted</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Check back later for company updates and policy notices.
                </p>
              </div>
            )}
          </CardContent>
        </div>

        {/* Footer info strip */}
        <CardFooter className="pt-2 pb-4 px-5 sm:px-6 border-t border-border bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900/60 flex items-center justify-between text-xs text-muted-foreground">
          <span>Broadcast channel: All Active Employees</span>
          <Badge variant="brand" className="text-[10px] font-semibold py-0 px-2">
            ● Official
          </Badge>
        </CardFooter>
      </Card>

      {/* Detail Dialog on click */}
      <Dialog open={!!selectedAnnouncement} onOpenChange={() => setSelectedAnnouncement(null)}>
        {selectedAnnouncement && (
          <div className="space-y-4">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="brand" className="text-xs">
                  {selectedAnnouncement.category || 'Company'}
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">
                  {selectedAnnouncement.date}
                </span>
              </div>
              <DialogTitle className="text-lg font-bold text-foreground">
                {selectedAnnouncement.title}
              </DialogTitle>
            </DialogHeader>

            <DialogDescription className="text-sm text-foreground/80 leading-relaxed py-2 whitespace-pre-line">
              {selectedAnnouncement.description}
            </DialogDescription>

            <DialogFooter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedAnnouncement(null)}
              >
                Close
              </Button>
            </DialogFooter>
          </div>
        )}
      </Dialog>

      {/* View All Modal */}
      <Dialog open={viewAllOpen} onOpenChange={() => setViewAllOpen(false)}>
        <div className="space-y-4 max-h-[75vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-primary" />
              <span>All Company Announcements</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Complete archive of corporate announcements and bulletins
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-y-auto space-y-3 pr-1 flex-1 py-2">
            {announcements.map((item) => (
              <AnnouncementItem
                key={item.id}
                announcement={item}
                onClick={() => {
                  setViewAllOpen(false);
                  setSelectedAnnouncement(item);
                }}
              />
            ))}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewAllOpen(false)}
            >
              Done
            </Button>
          </DialogFooter>
        </div>
      </Dialog>
    </>
  );
}
