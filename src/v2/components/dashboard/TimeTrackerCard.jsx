import React from 'react';
import { Clock, Play, Square, MapPin, CalendarDays, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';

export function TimeTrackerCard({
  clockedIn,
  seconds,
  locationMessage,
  clockLoading,
  onToggleClock,
  lastWeekSummary,
}) {
  const formatTimer = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const shiftTargetSeconds = 8.5 * 3600;
  const progressPercent = Math.min(100, Math.round((seconds / shiftTargetSeconds) * 100));

  return (
    <Card className="flex flex-col justify-between border border-border bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-xs rounded-[var(--radius)] h-full overflow-hidden">
      <div>
        {/* Header: Title and Status Badge */}
        <CardHeader className="pb-3 pt-5 px-5 sm:px-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-card-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>Time Tracker</span>
            </CardTitle>

            <Badge
              variant={clockedIn ? 'brand' : 'neutral'}
              className="text-[11px] font-semibold gap-1.5 py-0.5 px-2.5"
            >
              {clockedIn ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span>Active Session</span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                  <span>Clocked Out</span>
                </>
              )}
            </Badge>
          </div>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Automated location geofencing & real-time shift telemetry
          </CardDescription>
        </CardHeader>

        {/* Center Timer & Shift Progress */}
        <CardContent className="px-5 sm:px-6 pt-1 pb-3 space-y-4">
          <div className="text-center py-4 px-4 bg-secondary/50 dark:bg-secondary/20 rounded-[var(--radius)] border border-border/80 relative overflow-hidden">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Today's Working Hours
            </div>

            {/* Digital Monospace Timer */}
            <div className="text-3xl sm:text-4xl font-mono font-black tracking-tight text-foreground select-all">
              {formatTimer(seconds)}
            </div>

            {/* Office Geofence IP */}
            <div className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1.5 font-medium truncate">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">{locationMessage || 'San Francisco HQ • Office IP Verified'}</span>
            </div>

            {/* Progress bar with Electric Lime glow */}
            <div className="w-full bg-secondary dark:bg-[#382451] h-2 rounded-full mt-3.5 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(96,246,27,0.4)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5 font-medium">
              <span>Shift Progress: {progressPercent}%</span>
              <span>Daily Target: 8.5 hrs</span>
            </div>
          </div>

          {/* Clock In / Clock Out Action Button */}
          <div>
            {clockedIn ? (
              <Button
                variant="destructive"
                disabled={clockLoading}
                onClick={onToggleClock}
                className="w-full h-10 gap-2 font-bold shadow-xs hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>{clockLoading ? 'Processing...' : 'Clock Out'}</span>
              </Button>
            ) : (
              <Button
                disabled={clockLoading}
                onClick={onToggleClock}
                className="w-full h-10 gap-2 font-bold bg-primary text-primary-foreground shadow-xs hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{clockLoading ? 'Processing...' : 'Clock In'}</span>
              </Button>
            )}
          </div>
        </CardContent>
      </div>

      {/* Footer: Subtle divider and Last Week Working-Hours Summary */}
      <CardFooter className="pt-3 pb-4 px-5 sm:px-6 border-t border-border bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900/60">
        <div className="w-full flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <CalendarDays className="w-3.5 h-3.5 text-primary" />
            <span className="font-medium">Last Week Summary:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-medium">
              {lastWeekSummary?.range || 'Nov 02 - Nov 08'}
            </span>
            <span className="font-bold text-foreground font-mono px-2 py-0.5 rounded bg-secondary text-[11px]">
              {lastWeekSummary?.hours || '40.5 hrs'}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
