import React from 'react';
import { Skeleton, SkeletonCard } from './Skeleton';

export function PayrollSkeleton() {
  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton width="220px" height="26px" />
        <Skeleton width="160px" height="38px" radius="6px" />
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <SkeletonCard style={{ height: '100px', justifyContent: 'center', gap: '8px' }}>
          <Skeleton width="110px" height="12px" />
          <Skeleton width="140px" height="24px" />
        </SkeletonCard>
        <SkeletonCard style={{ height: '100px', justifyContent: 'center', gap: '8px' }}>
          <Skeleton width="100px" height="12px" />
          <Skeleton width="80px" height="24px" />
        </SkeletonCard>
        <SkeletonCard style={{ height: '100px', justifyContent: 'center', gap: '8px' }}>
          <Skeleton width="120px" height="12px" />
          <Skeleton width="100px" height="24px" />
        </SkeletonCard>
      </div>

      {/* Table Skeleton */}
      <SkeletonCard style={{ padding: '20px' }}>
        <Skeleton width="180px" height="18px" style={{ marginBottom: '20px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Skeleton width="100%" height="40px" radius="6px" />
          <Skeleton width="100%" height="40px" radius="6px" />
          <Skeleton width="100%" height="40px" radius="6px" />
          <Skeleton width="100%" height="40px" radius="6px" />
          <Skeleton width="100%" height="40px" radius="6px" />
        </div>
      </SkeletonCard>
    </div>
  );
}
