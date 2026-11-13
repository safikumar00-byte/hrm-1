import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import {
  DashboardHeader,
  EmployeeProfileCard,
  TimeTrackerCard,
  AttendanceChartCard,
  AnnouncementsCard,
  EventsAndBirthdaysCard,
  QuickAccessSection,
} from '../components/dashboard';

export default function ModernHome() {
  const {
    profile,
    clockedIn,
    seconds,
    locationMessage,
    clockLoading,
    handleToggleClock,
    lastWeekSummary,
    attendanceData,
    announcements,
    events,
    birthdays,
  } = useDashboardData();

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {/* SECTION A — Welcome Header */}
      <DashboardHeader profile={profile} />

      {/* SECTION B — Primary Dashboard Grid (3-Column Layout) */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
        <div className="h-full">
          <EmployeeProfileCard profile={profile} />
        </div>
        <div className="h-full">
          <TimeTrackerCard
            clockedIn={clockedIn}
            seconds={seconds}
            locationMessage={locationMessage}
            clockLoading={clockLoading}
            onToggleClock={handleToggleClock}
            lastWeekSummary={lastWeekSummary}
          />
        </div>
        <div className="h-full">
          <AttendanceChartCard attendanceData={attendanceData} />
        </div>
      </section>

      {/* SECTION C — Secondary Dashboard Grid (2-Column Layout) */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
        <div className="h-full">
          <AnnouncementsCard announcements={announcements} />
        </div>
        <div className="h-full">
          <EventsAndBirthdaysCard events={events} birthdays={birthdays} />
        </div>
      </section>

      {/* SECTION D — Quick Access Section */}
      <QuickAccessSection />
    </div>
  );
}
