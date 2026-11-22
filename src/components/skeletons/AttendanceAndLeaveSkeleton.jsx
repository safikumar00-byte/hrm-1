import React from 'react';
import { Skeleton, SkeletonCard } from './Skeleton';

export function AttendanceSkeleton() {
  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton width="200px" height="24px" />
        <Skeleton width="140px" height="36px" radius="6px" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <SkeletonCard style={{ height: '90px', justifyContent: 'center', gap: '6px' }}>
          <Skeleton width="100px" height="12px" />
          <Skeleton width="60px" height="22px" />
        </SkeletonCard>
        <SkeletonCard style={{ height: '90px', justifyContent: 'center', gap: '6px' }}>
          <Skeleton width="110px" height="12px" />
          <Skeleton width="70px" height="22px" />
        </SkeletonCard>
        <SkeletonCard style={{ height: '90px', justifyContent: 'center', gap: '6px' }}>
          <Skeleton width="90px" height="12px" />
          <Skeleton width="50px" height="22px" />
        </SkeletonCard>
      </div>

      <SkeletonCard>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Skeleton width="180px" height="18px" />
          <Skeleton width="220px" height="32px" radius="6px" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} width="100%" height="42px" radius="6px" />
          ))}
        </div>
      </SkeletonCard>
    </div>
  );
}

export function LeaveSkeleton() {
  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton width="190px" height="24px" />
        <Skeleton width="130px" height="36px" radius="6px" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {['Available', 'Casual', 'Medical', 'Taken'].map((t, i) => (
          <SkeletonCard key={i} style={{ height: '100px', justifyContent: 'center', gap: '8px' }}>
            <Skeleton width="80px" height="12px" />
            <Skeleton width="50px" height="26px" />
          </SkeletonCard>
        ))}
      </div>

      <SkeletonCard>
        <Skeleton width="160px" height="18px" style={{ marginBottom: '16px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} width="100%" height="38px" radius="6px" />
          ))}
        </div>
      </SkeletonCard>
    </div>
  );
}
