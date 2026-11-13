import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart as BarChartIcon,
  Plus,
  FileText,
  CalendarCheck,
  TrendingUp,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
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

export function AttendanceChartCard({ attendanceData }) {
  const navigate = useNavigate();
  const [activeRange, setActiveRange] = useState('week');

  const chartData = attendanceData || [
    { day: 'Mon', hours: 8.5, isToday: false },
    { day: 'Tue', hours: 8.0, isToday: false },
    { day: 'Wed', hours: 8.2, isToday: false },
    { day: 'Thu', hours: 7.8, isToday: true },
    { day: 'Fri', hours: 8.0, isToday: false },
    { day: 'Sat', hours: 0.0, isToday: false },
    { day: 'Sun', hours: 0.0, isToday: false },
  ];

  const totalLoggedHours = chartData
    .reduce((sum, item) => sum + (parseFloat(item.hours) || 0), 0)
    .toFixed(1);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const val = parseFloat(payload[0].value) || 0;
      return (
        <div className="rounded-[var(--radius)] border border-border bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 p-2.5 shadow-md text-xs">
          <p className="font-bold text-card-foreground">{label}</p>
          <p className="text-muted-foreground mt-0.5">
            Logged: <span className="font-bold text-card-foreground font-mono">{val} hrs</span>
          </p>
          <p className={`text-[10px] font-semibold mt-0.5 ${val >= 8 ? 'text-primary' : 'text-amber-500'}`}>
            {val >= 8 ? '✓ Target Met (≥8h)' : val > 0 ? 'Partial Shift (<8h)' : 'Weekend / Off'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="flex flex-col justify-between border border-border bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-xs rounded-[var(--radius)] h-full overflow-hidden">
      <div>
        {/* Header with Title and Total Hours Badge */}
        <CardHeader className="pb-2 pt-5 px-5 sm:px-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-card-foreground">
              <CalendarCheck className="w-4 h-4 text-primary" />
              <span>Attendance & Hours</span>
            </CardTitle>

            <div className="flex items-center gap-1.5">
              <Badge variant="brand" className="text-[11px] font-semibold font-mono">
                {totalLoggedHours} hrs this cycle
              </Badge>
            </div>
          </div>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Weekly logged hours & shift completion telemetry
          </CardDescription>
        </CardHeader>

        {/* Chart Content Area */}
        <CardContent className="px-3 sm:px-5 pt-1 pb-2">
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 8, left: -22, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                <XAxis
                  dataKey="day"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 10]}
                  ticks={[0, 2, 4, 6, 8, 10]}
                  unit="h"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="hours" radius={[4, 4, 0, 0]} maxBarSize={36}>
                  {chartData.map((entry, index) => {
                    // Midnight Navy in light mode, purple in dark mode, lime for target met or today
                    const isTargetMet = entry.hours >= 8;
                    const isToday = entry.isToday;
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          isToday
                            ? '#60F61B'
                            : isTargetMet
                              ? '#60F61B'
                              : entry.hours > 0
                                ? 'var(--brand-dark, #21093D)'
                                : 'var(--border)'
                        }
                        className={entry.hours > 0 && !isTargetMet && !isToday ? 'fill-[#21093D] dark:fill-[#A78BFA]' : ''}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border mt-2 px-1">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span>Target Met (≥8h)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#21093D] dark:bg-[#A78BFA]" />
              <span>Regular Shift</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-border" />
              <span>Off / Rest</span>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Footer: Apply Leave & Reports Action Buttons */}
      <CardFooter className="pt-3 pb-4 px-5 sm:px-6 border-t border-border bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900/60 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/v2/leaves')}
          className="flex-1 h-9 text-xs font-semibold gap-1.5 border-border hover:bg-secondary hover:text-foreground"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Apply Leave</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/v2/attendance')}
          className="flex-1 h-9 text-xs font-semibold gap-1.5 border-border hover:bg-secondary hover:text-foreground"
        >
          <FileText className="w-3.5 h-3.5 text-primary" />
          <span>Reports</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
