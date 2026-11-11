import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendType = 'positive',
  badge,
}) {
  return (
    <Card className="hover:border-primary/50 transition-all hover:shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </span>
          {Icon && (
            <div className="h-9 w-9 rounded-lg bg-secondary text-foreground flex items-center justify-center shrink-0 shadow-2xs">
              <Icon className="w-4 h-4 text-foreground" />
            </div>
          )}
        </div>

        <div className="flex items-baseline justify-between gap-2">
          <div className="text-2xl font-bold tracking-tight text-foreground font-sans">
            {value}
          </div>
          {badge && (
            <Badge variant="brand" className="text-[11px] font-semibold">
              {badge}
            </Badge>
          )}
        </div>

        {subtitle && (
          <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
            {trend && (
              <span
                className={`inline-flex items-center gap-0.5 font-medium ${
                  trendType === 'positive'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-destructive'
                }`}
              >
                {trendType === 'positive' ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                {trend}
              </span>
            )}
            <span>{subtitle}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
