import React from 'react';
import { Skeleton, SkeletonCard } from './Skeleton';

export function DashboardSkeleton() {
  return (
    <div className="home_wrapper" style={{ padding: '24px' }}>
      <div className="home_main-layout" style={{ maxWidth: '1400px', margin: '0 auto', gap: '24px', display: 'flex', flexDirection: 'column' }}>
        {/* Row 1: ProfileCard, Time Tracker, Attendance Chart */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Profile Card Skeleton */}
          <SkeletonCard style={{ minHeight: '270px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Skeleton width="64px" height="64px" radius="50%" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <Skeleton width="60%" height="18px" />
                <Skeleton width="40%" height="12px" />
                <Skeleton width="30%" height="10px" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
              <Skeleton width="100%" height="12px" />
              <Skeleton width="85%" height="12px" />
              <Skeleton width="70%" height="12px" />
            </div>
            <Skeleton width="100%" height="36px" radius="6px" style={{ marginTop: '16px' }} />
          </SkeletonCard>

          {/* Time Tracker Skeleton */}
          <SkeletonCard style={{ minHeight: '270px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Skeleton width="120px" height="16px" />
              <Skeleton width="70px" height="18px" radius="12px" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
              <Skeleton width="160px" height="36px" />
              <Skeleton width="200px" height="12px" />
              <Skeleton width="100%" height="8px" radius="4px" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <Skeleton height="38px" radius="6px" />
              <Skeleton height="38px" radius="6px" />
            </div>
          </SkeletonCard>

          {/* Attendance Chart Skeleton */}
          <SkeletonCard style={{ minHeight: '270px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Skeleton width="110px" height="16px" />
              <Skeleton width="80px" height="18px" radius="12px" />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '140px', padding: '10px 0' }}>
              {[60, 85, 70, 95, 80, 20, 20].map((h, i) => (
                <Skeleton key={i} width="24px" height={`${h}%`} radius="4px 4px 0 0" />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                <Skeleton key={i} width="24px" height="10px" />
              ))}
            </div>
          </SkeletonCard>
        </div>

        {/* Row 2: Announcements & Events */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          <SkeletonCard style={{ minHeight: '220px' }}>
            <Skeleton width="140px" height="18px" style={{ marginBottom: '16px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Skeleton width="100%" height="32px" />
              <Skeleton width="100%" height="32px" />
              <Skeleton width="90%" height="32px" />
            </div>
          </SkeletonCard>

          <SkeletonCard style={{ minHeight: '220px' }}>
            <Skeleton width="150px" height="18px" style={{ marginBottom: '16px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Skeleton width="100%" height="32px" />
              <Skeleton width="100%" height="32px" />
              <Skeleton width="80%" height="32px" />
            </div>
          </SkeletonCard>
        </div>
      </div>
    </div>
  );
}
