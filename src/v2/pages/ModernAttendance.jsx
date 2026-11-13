import React, { useState } from 'react';
import {
  CalendarCheck,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileCheck,
  Calendar,
  Download,
  Filter,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';

export default function ModernAttendance() {
  const [activeTab, setActiveTab] = useState('daily');

  const attendanceRecords = [
    { id: 1, date: '2026-11-11 (Today)', clockIn: '09:00 AM', clockOut: 'In Progress', hours: '4.5 hrs', status: 'On-Time', location: 'Office HQ' },
    { id: 2, date: '2026-11-10 (Tue)', clockIn: '08:55 AM', clockOut: '05:30 PM', hours: '8.5 hrs', status: 'On-Time', location: 'Office HQ' },
    { id: 3, date: '2026-11-09 (Mon)', clockIn: '09:12 AM', clockOut: '05:45 PM', hours: '8.5 hrs', status: 'Grace Period', location: 'Remote (Home)' },
    { id: 4, date: '2026-11-06 (Fri)', clockIn: '08:50 AM', clockOut: '05:25 PM', hours: '8.5 hrs', status: 'On-Time', location: 'Office HQ' },
    { id: 5, date: '2026-11-05 (Thu)', clockIn: '09:05 AM', clockOut: '05:35 PM', hours: '8.5 hrs', status: 'On-Time', location: 'Office HQ' },
  ];

  const timesheetEntries = [
    { id: 1, week: 'Nov 09 - Nov 15', project: 'HRMS Platform 2.0', hours: 40, status: 'Approved', approver: 'Sarah Johnson' },
    { id: 2, week: 'Nov 02 - Nov 08', project: 'Design System & Architecture', hours: 42, status: 'Approved', approver: 'Sarah Johnson' },
    { id: 3, week: 'Oct 26 - Nov 01', project: 'Cloud Integration & SSO', hours: 40, status: 'Approved', approver: 'Executive Director' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Attendance & Timesheets
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor daily check-ins, shift completion, and weekly project time entries.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          <span>Export Monthly Report</span>
        </Button>
      </div>

      {/* 3 Overview Stat Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-primary">
          <div className="text-xs font-semibold text-muted-foreground">Monthly Attendance Rate</div>
          <div className="text-2xl font-bold text-foreground mt-1">98.2%</div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">0 unexcused absences</p>
        </Card>
        <Card className="p-4 border-l-4 border-foreground/60 dark:border-primary/60">
          <div className="text-xs font-semibold text-muted-foreground">Average Daily Hours</div>
          <div className="text-2xl font-bold text-foreground mt-1">8.4 hrs</div>
          <p className="text-xs text-muted-foreground mt-1">Target: 8.0 hrs / day</p>
        </Card>
        <Card className="p-4 border-l-4 border-emerald-500 dark:border-emerald-400">
          <div className="text-xs font-semibold text-muted-foreground">Approved Timesheets</div>
          <div className="text-2xl font-bold text-foreground mt-1">100%</div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">All cycles verified</p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="daily">Daily Attendance Logs</TabsTrigger>
          <TabsTrigger value="timesheets">Weekly Timesheets</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">November 2026 Punch Logs</CardTitle>
              <CardDescription>Automated timestamp logs from web clock & mobile geofencing</CardDescription>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Clock In</TableHead>
                  <TableHead>Clock Out</TableHead>
                  <TableHead>Logged Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Compliance Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((rec) => (
                  <TableRow key={rec.id}>
                    <TableCell className="font-semibold text-foreground">{rec.date}</TableCell>
                    <TableCell className="text-xs font-medium">{rec.clockIn}</TableCell>
                    <TableCell className="text-xs font-medium">{rec.clockOut}</TableCell>
                    <TableCell className="text-xs font-bold text-foreground">{rec.hours}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{rec.location}</TableCell>
                    <TableCell>
                      <Badge variant={rec.status === 'On-Time' ? 'success' : 'warning'}>
                        {rec.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="timesheets">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Weekly Project Timesheets</CardTitle>
              <CardDescription>Submitted timesheets and approval tracking</CardDescription>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Project / Initiative</TableHead>
                  <TableHead>Total Hours</TableHead>
                  <TableHead>Approver</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timesheetEntries.map((ts) => (
                  <TableRow key={ts.id}>
                    <TableCell className="font-semibold text-foreground">{ts.week}</TableCell>
                    <TableCell className="text-xs font-medium">{ts.project}</TableCell>
                    <TableCell className="text-xs font-bold text-foreground">{ts.hours} hrs</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{ts.approver}</TableCell>
                    <TableCell>
                      <Badge variant="success">● {ts.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
