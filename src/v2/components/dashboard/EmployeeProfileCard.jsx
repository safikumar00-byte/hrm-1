import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Building2,
  Calendar,
  Award,
  ChevronRight,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Avatar } from '../../../components/ui/avatar';

export function EmployeeProfileCard({ profile }) {
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return 'EU';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Jan 15, 2024';
    try {
      const d = new Date(dateStr);
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  const fullName = profile?.fullName || 'Admin User';
  const position = profile?.position || 'Lead HR Architect / Platform Admin';
  const employeeId = profile?.employeeId || 'EMP001';
  const department = profile?.department || 'People Operations & Tech';
  const reportingManager = profile?.reportingManagerName || 'Executive Director';
  const dateOfJoining = formatDate(profile?.dateOfJoining);
  const performanceStatus = profile?.performanceStatus || 'Top Performer';

  return (
    <Card className="flex flex-col justify-between border border-border bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-xs rounded-[var(--radius)] h-full overflow-hidden">
      <div>
        {/* Card Header with Identity & Avatar */}
        <CardHeader className="pb-4 pt-5 px-5 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Avatar with distinctive accent background & ring */}
              <div className="relative shrink-0">
                <Avatar
                  src={profile?.profileImageUrl || ''}
                  fallback={getInitials(fullName)}
                  size="lg"
                  className="ring-2 ring-primary/40 bg-accent text-accent-foreground font-bold shadow-xs"
                />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary ring-2 ring-card" />
              </div>

              {/* Name & Job Title */}
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-bold text-card-foreground leading-tight truncate m-0">
                  {fullName}
                </h3>
                <p className="text-xs text-muted-foreground font-medium truncate mt-0.5 m-0">
                  {position}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="inline-flex items-center text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">
                    {employeeId}
                  </span>
                  <Badge variant="brand" className="text-[10px] font-semibold py-0 px-2 gap-1">
                    <Award className="w-3 h-3 text-primary" />
                    <span>{performanceStatus}</span>
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Horizontal Divider */}
        <div className="border-t border-border mx-5 sm:mx-6" />

        {/* Employee Info Details Grid */}
        <CardContent className="pt-4 pb-2 px-5 sm:px-6 space-y-3">
          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-muted-foreground flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Department</span>
            </span>
            <span className="font-semibold text-card-foreground text-right truncate max-w-[170px]">
              {department}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-muted-foreground flex items-center gap-2">
              <UserCheck className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Reporting Manager</span>
            </span>
            <span className="font-semibold text-card-foreground text-right truncate max-w-[170px]">
              {reportingManager}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-muted-foreground flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Date of Joining</span>
            </span>
            <span className="font-semibold text-card-foreground font-mono">
              {dateOfJoining}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Security Access</span>
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-primary">
              ● Level 4 Verified
            </span>
          </div>
        </CardContent>
      </div>

      {/* Card Footer: Check Profile Button spanning available width */}
      <CardFooter className="pt-3 pb-5 px-5 sm:px-6">
        <Button
          variant="outline"
          onClick={() => navigate('/v2/profile')}
          className="w-full h-9 text-xs font-semibold gap-1.5 border-border hover:bg-secondary hover:text-foreground group transition-all"
        >
          <span>Check Profile</span>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
        </Button>
      </CardFooter>
    </Card>
  );
}
