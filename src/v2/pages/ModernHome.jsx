import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  CheckCircle2,
  Calendar,
  DollarSign,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

import { MetricCard } from '../components/MetricCard';
import { TimeTrackerCard } from '../components/TimeTrackerCard';
import { AttendanceChart } from '../components/AttendanceChart';
import { AnnouncementsCard } from '../components/AnnouncementsCard';
import { EventsCalendarCard } from '../components/EventsCalendarCard';

export default function ModernHome() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {/* Welcome Banner Card */}
      <Card className="border border-border bg-card p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <h1 className="text-2xl font-bold tracking-tight text-foreground m-0">
                Welcome back, Admin 👋
              </h1>
              <Badge variant="brand" className="text-xs font-semibold">
                HRMS Enterprise
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground m-0">
              Here is your organizational pulse, attendance telemetry, and team metrics for today.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/v2/leaves')}
              className="gap-1.5 text-xs font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Apply Leave</span>
            </Button>
            <Button
              size="sm"
              onClick={() => navigate('/v2/payroll')}
              className="gap-1.5 text-xs font-semibold bg-primary text-primary-foreground shadow-xs hover:opacity-95"
            >
              <span>Payroll Runs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Headcount"
          value="42"
          subtitle="this quarter"
          trend="+3 new hires"
          trendType="positive"
          icon={Users}
        />
        <MetricCard
          title="Clocked In Today"
          value="38 / 42"
          subtitle="on-schedule rate"
          trend="90.5%"
          trendType="positive"
          icon={CheckCircle2}
        />
        <MetricCard
          title="Leaves & Absences"
          value="4 Planned"
          subtitle="2 Casual • 2 Medical Sick"
          icon={Calendar}
          badge="4 Absences"
        />
        <MetricCard
          title="October Payroll"
          value="$245,000"
          subtitle="Disbursed on Oct 31"
          icon={DollarSign}
          badge="Disbursed"
        />
      </div>

      {/* Middle Grid: Time Tracker & Attendance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TimeTrackerCard />
        </div>
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>
      </div>

      {/* Bottom Grid: Announcements & Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnnouncementsCard />
        <EventsCalendarCard />
      </div>
    </div>
  );
}
