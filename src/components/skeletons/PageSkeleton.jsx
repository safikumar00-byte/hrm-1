import React from 'react';
import { DashboardSkeleton } from './DashboardSkeleton';
import { PayrollSkeleton } from './PayrollSkeleton';
import { AttendanceSkeleton, LeaveSkeleton } from './AttendanceAndLeaveSkeleton';
import { TeamsSkeleton, RequestsSkeleton, EmployeeHubSkeleton } from './TeamsAndRequestsSkeleton';
import { Skeleton, SkeletonCard } from './Skeleton';

export function PageSkeleton({ type }) {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  const resolvedType = type || (() => {
    if (currentPath.includes('/pay')) return 'payroll';
    if (currentPath.includes('/attendance') || currentPath.includes('/timesheet')) return 'attendance';
    if (currentPath.includes('/leaves')) return 'leaves';
    if (currentPath.includes('/team')) return 'teams';
    if (currentPath.includes('/hrrequests')) return 'requests';
    if (currentPath.includes('/employeehub')) return 'employees';
    if (currentPath === '/home' || currentPath === '/') return 'dashboard';
    return 'generic';
  })();

  switch (resolvedType) {
    case 'dashboard':
      return <DashboardSkeleton />;
    case 'payroll':
      return <PayrollSkeleton />;
    case 'attendance':
      return <AttendanceSkeleton />;
    case 'leaves':
      return <LeaveSkeleton />;
    case 'teams':
      return <TeamsSkeleton />;
    case 'requests':
      return <RequestsSkeleton />;
    case 'employees':
      return <EmployeeHubSkeleton />;
    default:
      return (
        <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Skeleton width="240px" height="28px" />
          <SkeletonCard style={{ minHeight: '300px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Skeleton width="100%" height="40px" radius="6px" />
              <Skeleton width="100%" height="40px" radius="6px" />
              <Skeleton width="90%" height="40px" radius="6px" />
              <Skeleton width="80%" height="40px" radius="6px" />
            </div>
          </SkeletonCard>
        </div>
      );
  }
}

export default PageSkeleton;
