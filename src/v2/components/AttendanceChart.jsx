import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from 'recharts';

export function AttendanceChart() {
  const [activeRange, setActiveRange] = useState('current');

  const chartData = [
    { day: 'Mon', hours: 8.5 },
    { day: 'Tue', hours: 8.0 },
    { day: 'Wed', hours: 8.2 },
    { day: 'Thu', hours: 7.8 },
    { day: 'Fri', hours: 8.0 },
    { day: 'Sat', hours: 0.0 },
    { day: 'Sun', hours: 0.0 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-[var(--radius)] border border-border bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 p-3 shadow-md">
          <p className="text-xs font-bold text-card-foreground">{label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Logged:{' '}
            <span className="font-bold text-card-foreground">
              {payload[0].value} hours
            </span>
          </p>
          <p className="text-[10px] text-emerald-600 dark:text-primary font-semibold mt-0.5">
            {payload[0].value >= 8 ? '✓ Target Met (≥8h)' : 'Partial Shift (<8h)'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="flex flex-col justify-between shadow-xs">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 gap-2">
        <div>
          <CardTitle className="text-base font-semibold">Weekly Attendance Trend</CardTitle>
          <CardDescription>Logged work hours per day for the current cycle</CardDescription>
        </div>

        {/* Date Filter Pills (TweakCN Dashboard Style) */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-secondary/60 text-xs">
          <button
            type="button"
            onClick={() => setActiveRange('current')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${activeRange === 'current'
              ? 'bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 text-card-foreground shadow-2xs font-bold'
              : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            This Week
          </button>
          <button
            type="button"
            onClick={() => setActiveRange('last30')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${activeRange === 'last30'
              ? 'bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 text-card-foreground shadow-2xs font-bold'
              : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            Last 30 Days
          </button>
          <span className="text-[11px] font-bold text-primary px-2 hidden sm:inline">
            40.5 hrs
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
              <XAxis
                dataKey="day"
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 10]}
                ticks={[0, 2, 4, 6, 8, 10]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="hours" radius={[6, 6, 0, 0]} maxBarSize={48}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.hours >= 8
                        ? '#60F61B'
                        : entry.hours > 0
                          ? '#8B5CF6'
                          : 'var(--border)'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 pt-3 border-t border-border text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#60F61B] ring-2 ring-[#60F61B]/30" />
            <span className="font-medium text-foreground">Target Met (≥8 hrs)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#8B5CF6] ring-2 ring-[#8B5CF6]/30" />
            <span className="font-medium text-foreground">Partial Shift (&lt;8 hrs)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span>Weekend / Rest</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
