import React from 'react';
import { Card } from '../../../components/ui/card';
import { Skeleton } from '../../../components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <Card className="p-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64 rounded-md" />
            <Skeleton className="h-4 w-96 rounded-md" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-9 w-28 rounded-md" />
            <Skeleton className="h-9 w-32 rounded-md" />
          </div>
        </div>
      </Card>

      {/* Primary 3-Col Grid Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="h-72 p-6 space-y-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-6 w-48 rounded-md" />
          <Skeleton className="h-4 w-32 rounded-md" />
          <div className="space-y-2 pt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </Card>
        <Card className="h-72 p-6 space-y-4">
          <Skeleton className="h-6 w-32 rounded-md" />
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </Card>
        <Card className="h-72 p-6 space-y-4">
          <Skeleton className="h-6 w-36 rounded-md" />
          <Skeleton className="h-40 w-full rounded-md" />
        </Card>
      </div>

      {/* Secondary 2-Col Grid Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="h-64 p-6 space-y-3">
          <Skeleton className="h-6 w-40 rounded-md" />
          <Skeleton className="h-14 w-full rounded-md" />
          <Skeleton className="h-14 w-full rounded-md" />
        </Card>
        <Card className="h-64 p-6 space-y-3">
          <Skeleton className="h-6 w-40 rounded-md" />
          <Skeleton className="h-14 w-full rounded-md" />
          <Skeleton className="h-14 w-full rounded-md" />
        </Card>
      </div>
    </div>
  );
}
