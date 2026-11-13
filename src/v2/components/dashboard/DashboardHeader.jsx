import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';

export function DashboardHeader({ profile }) {
  const navigate = useNavigate();

  // Dynamic greeting based on current hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = profile?.firstName || profile?.fullName?.split(' ')[0] || 'Admin';

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <Card className="border border-border bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 p-5 sm:p-6 shadow-xs rounded-[var(--radius)]">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left Side: Dynamic Greeting & Subtitle */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground m-0 leading-tight">
              {getGreeting()}, <span className="text-foreground">{displayName}</span> 👋
            </h1>
            <Badge variant="brand" className="text-xs font-semibold py-0.5 px-2.5 gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span>Workspace Active</span>
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground m-0 font-medium">
            Here's what's happening with your work and team today.
          </p>
        </div>

        {/* Right Side: Current Date & Quick Shortcut Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius)] bg-secondary/60 text-xs font-semibold text-secondary-foreground border border-border/60">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>{todayFormatted}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/v2/leaves')}
            className="h-9 gap-1.5 text-xs font-semibold hover:bg-secondary border-border"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Apply Leave</span>
          </Button>

          <Button
            size="sm"
            onClick={() => navigate('/v2/payroll')}
            className="h-9 gap-1.5 text-xs font-bold bg-primary text-primary-foreground shadow-xs hover:brightness-105 active:scale-[0.98]"
          >
            <span>My Payslips</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
