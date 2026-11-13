import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Clock, Play, Square, MapPin } from 'lucide-react';

export function TimeTrackerCard() {
  const [clockedIn, setClockedIn] = useState(true);
  const [seconds, setSeconds] = useState(14821); // ~04:07:01

  useEffect(() => {
    let interval = null;
    if (clockedIn) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [clockedIn]);

  const formatTimer = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.min(100, Math.round((seconds / (8.5 * 3600)) * 100));

  return (
    <Card className="flex flex-col justify-between border border-border shadow-xs h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>Live Time Tracker</span>
          </CardTitle>
          <Badge
            variant={clockedIn ? 'brand' : 'neutral'}
            className="text-[11px] font-medium gap-1"
          >
            {clockedIn && <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
            {clockedIn ? 'Active Session' : 'Clocked Out'}
          </Badge>
        </div>
        <CardDescription>
          Automated geofencing and work session tracking
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Digital Clock Box */}
        <div className="text-center py-5 px-4 bg-secondary/50 dark:bg-secondary/20 rounded-[var(--radius)] border border-border/80">
          <div className="text-4xl font-mono font-extrabold tracking-tight text-foreground">
            {formatTimer(seconds)}
          </div>
          <div className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>San Francisco HQ • Office IP Verified</span>
          </div>

          {/* Progress bar with lime glow */}
          <div className="w-full bg-secondary dark:bg-[#382451] h-2 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(96,246,27,0.4)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5 font-medium">
            <span>Progress: {progressPercent}%</span>
            <span>Daily Shift Target: 8.5 hrs</span>
          </div>
        </div>

        {/* Action Button */}
        <div>
          {clockedIn ? (
            <Button
              variant="destructive"
              className="w-full h-11 gap-2 font-bold shadow-xs hover:brightness-105 active:scale-[0.98]"
              onClick={() => setClockedIn(false)}
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Clock Out</span>
            </Button>
          ) : (
            <Button
              className="w-full h-11 gap-2 font-bold bg-primary text-primary-foreground shadow-xs hover:brightness-105 active:scale-[0.98]"
              onClick={() => setClockedIn(true)}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Clock In</span>
            </Button>
          )}
        </div>

        <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>Standard Hours: 09:00 AM - 05:30 PM</span>
          <span className="font-semibold text-foreground">Target: 8.5h</span>
        </div>
      </CardContent>
    </Card>
  );
}
