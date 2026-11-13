import React from 'react';
import {
  UserCheck,
  CalendarCheck,
  PlaneTakeoff,
  Wallet,
  Users,
  FileText,
  LayoutGrid,
} from 'lucide-react';
import { QuickAccessCard } from './QuickAccessCard';

export function QuickAccessSection() {
  const shortcuts = [
    {
      title: 'My Profile',
      description: 'Personal records, emergency contacts, hardware assets, and credentials.',
      icon: UserCheck,
      to: '/v2/profile',
      badge: 'Verified',
      iconColor: 'primary',
    },
    {
      title: 'Attendance History',
      description: 'Daily check-in logs, geofencing telemetry, and weekly timesheets.',
      icon: CalendarCheck,
      to: '/v2/attendance',
      badge: '98.2% Rate',
      iconColor: 'emerald',
    },
    {
      title: 'Leave Applications',
      description: 'Submit time-off requests, browse holiday calendar, and check balances.',
      icon: PlaneTakeoff,
      to: '/v2/leaves',
      badge: '4 Planned',
      iconColor: 'purple',
    },
    {
      title: 'Payroll & Payslips',
      description: 'Salary disbursement breakdown, tax statements, and PDF payslips.',
      icon: Wallet,
      to: '/v2/payroll',
      badge: 'Disbursed',
      iconColor: 'blue',
    },
    {
      title: 'Team Directory',
      description: 'Browse organization chart, team leads, roles, and member contacts.',
      icon: Users,
      to: '/v2/employees',
      badge: '42 Members',
      iconColor: 'primary',
    },
    {
      title: 'Company Handbook & Policies',
      description: 'Compliance guidelines, employee benefits, code of conduct, and FAQ.',
      icon: FileText,
      to: '/v2/profile',
      badge: '2026 Ready',
      iconColor: 'purple',
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-secondary flex items-center justify-center text-muted-foreground">
            <LayoutGrid className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground m-0">
              Quick Access
            </h2>
          </div>
        </div>
        <p className="text-xs text-muted-foreground m-0 hidden sm:block">
          One-click shortcuts to primary self-service portals
        </p>
      </div>

      {/* Responsive Grid: 4 columns on large desktop, 2 on tablet, 1-2 on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {shortcuts.map((shortcut) => (
          <QuickAccessCard
            key={shortcut.title}
            title={shortcut.title}
            description={shortcut.description}
            icon={shortcut.icon}
            to={shortcut.to}
            badge={shortcut.badge}
            iconColor={shortcut.iconColor}
          />
        ))}
      </div>
    </section>
  );
}
