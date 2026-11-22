import React from 'react';
import { Skeleton, SkeletonCard } from './Skeleton';

export function TeamsSkeleton() {
  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton width="180px" height="24px" />
        <Skeleton width="140px" height="36px" radius="6px" />
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Skeleton width="280px" height="36px" radius="6px" />
        <Skeleton width="100px" height="36px" radius="6px" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} style={{ minHeight: '220px', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton width="60%" height="20px" />
              <Skeleton width="50px" height="18px" radius="10px" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Skeleton width="40px" height="40px" radius="50%" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                <Skeleton width="50%" height="14px" />
                <Skeleton width="35%" height="10px" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
              <Skeleton width="100%" height="12px" />
              <Skeleton width="85%" height="12px" />
            </div>
          </SkeletonCard>
        ))}
      </div>
    </div>
  );
}

export function RequestsSkeleton() {
  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton width="160px" height="24px" />
        <Skeleton width="150px" height="36px" radius="6px" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} style={{ height: '80px', justifyContent: 'center', gap: '6px' }}>
            <Skeleton width="80px" height="11px" />
            <Skeleton width="40px" height="20px" />
          </SkeletonCard>
        ))}
      </div>

      <SkeletonCard>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Skeleton width="160px" height="18px" />
          <Skeleton width="200px" height="32px" radius="6px" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} width="100%" height="40px" radius="6px" />
          ))}
        </div>
      </SkeletonCard>
    </div>
  );
}

export function EmployeeHubSkeleton() {
  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton width="220px" height="24px" />
        <Skeleton width="140px" height="36px" radius="6px" />
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Skeleton width="320px" height="36px" radius="6px" />
        <Skeleton width="120px" height="36px" radius="6px" />
      </div>
      <SkeletonCard>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} width="100%" height="44px" radius="6px" />
          ))}
        </div>
      </SkeletonCard>
    </div>
  );
}
