import React, { useState } from 'react';
import { CalendarDays, Gift, Calendar, Users, Sparkles, Inbox } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import { Badge } from '../../../components/ui/badge';
import { UpcomingEventItem } from './UpcomingEventItem';
import { BirthdayItem } from './BirthdayItem';

export function EventsAndBirthdaysCard({ events = [], birthdays = [] }) {
  const [activeTab, setActiveTab] = useState('events');

  const todayBirthdaysCount = birthdays.filter((b) =>
    (b.date || '').toLowerCase().includes('today')
  ).length;

  return (
    <Card className="flex flex-col justify-between border border-border bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-xs rounded-[var(--radius)] h-full overflow-hidden">
      <div>
        {/* Header with Title and Tabs Trigger */}
        <CardHeader className="pb-3 pt-5 px-5 sm:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center border border-border">
                  {activeTab === 'events' ? (
                    <CalendarDays className="w-4 h-4 text-primary" />
                  ) : (
                    <Gift className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-base font-semibold text-card-foreground">
                    {activeTab === 'events' ? 'Upcoming Events' : 'Team Birthdays'}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground m-0">
                    {activeTab === 'events'
                      ? 'Scheduled company events & meetings'
                      : 'Celebrate organizational milestones & birthdays'}
                  </p>
                </div>
              </div>

              {/* Tabs Switcher Pill */}
              <TabsList className="h-9 p-1 bg-secondary/80 rounded-lg">
                <TabsTrigger
                  value="events"
                  className="text-xs font-semibold px-3 py-1 data-[state=active]:bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 data-[state=active]:text-card-foreground data-[state=active]:shadow-2xs"
                >
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  <span>Events</span>
                  {events.length > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-secondary font-mono">
                      {events.length}
                    </span>
                  )}
                </TabsTrigger>

                <TabsTrigger
                  value="birthdays"
                  className="text-xs font-semibold px-3 py-1 data-[state=active]:bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 data-[state=active]:text-card-foreground data-[state=active]:shadow-2xs"
                >
                  <Gift className="w-3.5 h-3.5 mr-1.5" />
                  <span>Birthdays</span>
                  {todayBirthdaysCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-primary text-primary-foreground font-bold">
                      {todayBirthdaysCount}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Content for Events */}
            <TabsContent value="events" className="mt-3 space-y-2.5 outline-none">
              {events.length > 0 ? (
                events.slice(0, 3).map((ev) => (
                  <UpcomingEventItem key={ev.id} event={ev} />
                ))
              ) : (
                <div className="text-center py-8 px-4 border border-dashed border-border rounded-[var(--radius)]">
                  <Inbox className="w-7 h-7 text-muted-foreground mx-auto mb-1.5 opacity-60" />
                  <p className="text-xs font-semibold text-foreground">No upcoming events</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    No company meetings scheduled for the upcoming week.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Content for Birthdays */}
            <TabsContent value="birthdays" className="mt-3 space-y-2.5 outline-none">
              {birthdays.length > 0 ? (
                birthdays.slice(0, 3).map((b) => (
                  <BirthdayItem key={b.id} birthday={b} />
                ))
              ) : (
                <div className="text-center py-8 px-4 border border-dashed border-border rounded-[var(--radius)]">
                  <Sparkles className="w-7 h-7 text-muted-foreground mx-auto mb-1.5 opacity-60" />
                  <p className="text-xs font-semibold text-foreground">No birthdays this week</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    We will notify you when a colleague's birthday approaches!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardHeader>
      </div>

      {/* Footer Info Strip */}
      <CardFooter className="pt-2 pb-4 px-5 sm:px-6 border-t border-border bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900/60 flex items-center justify-between text-xs text-muted-foreground">
        <span>Calendar Sync: Google Workspace & Outlook</span>
        <span className="font-semibold text-card-foreground">Automated Alerts</span>
      </CardFooter>
    </Card>
  );
}
