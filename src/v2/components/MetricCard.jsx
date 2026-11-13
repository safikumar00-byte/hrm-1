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
    <Card className="hover:border-primary/40 transition-all hover:shadow-sm min-h-[148px] flex flex-col justify-between">
      <CardContent className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {title}
            </span>
            {Icon && (
              <div className="h-8 w-8 rounded-lg bg-secondary/80 text-foreground flex items-center justify-center shrink-0 shadow-2xs border border-border/40">
                <Icon className="w-4 h-4 text-primary" />
              </div>
            )}
          </div>

          <div className="flex items-baseline justify-between gap-2">
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-card-foreground font-sans">
              {value}
            </div>
            {badge && (
              <Badge variant="brand" className="text-[11px] font-semibold">
                {badge}
              </Badge>
            )}
          </div>
        </div>

        {subtitle && (
          <div className="mt-3 pt-2.5 border-t border-border/50 text-xs text-muted-foreground flex items-center gap-1.5">
            {trend && (
              <span
                className={`inline-flex items-center gap-0.5 font-semibold ${
                  trendType === 'positive'
                    ? 'text-emerald-600 dark:text-primary'
                    : 'text-destructive'
                }`}
              >
                {trendType === 'positive' ? (
                  <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 stroke-[2.5]" />
                )}
                {trend}
              </span>
            )}
            <span className="truncate">{subtitle}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
