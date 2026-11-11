import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Plus,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  FileText,
  Send,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../components/ui/table';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';

export default function ModernLeaves() {
  const [leavesData, setLeavesData] = useState({
    available: 18,
    casual: 8,
    sick: 6,
    earned: 4,
    taken: 4,
    requests: [],
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newLeave, setNewLeave] = useState({
    leaveType: 'Casual Leave',
    startDate: '',
    endDate: '',
    reason: '',
  });

  useEffect(() => {
    fetch('/api/leaves/my')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.available !== undefined) {
          setLeavesData(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleApplyLeave = (e) => {
    e.preventDefault();
    if (!newLeave.startDate || !newLeave.endDate) return;

    const newReq = {
      id: Date.now(),
      leaveType: newLeave.leaveType,
      startDate: newLeave.startDate,
      endDate: newLeave.endDate,
      days: 2,
      reason: newLeave.reason || 'Personal time off',
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0],
    };

    setLeavesData((prev) => ({
      ...prev,
      available: prev.available - 2,
      requests: [newReq, ...(prev.requests || [])],
    }));

    setDialogOpen(false);
    setNewLeave({ leaveType: 'Casual Leave', startDate: '', endDate: '', reason: '' });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Leave Management
          </h1>
          <p className="text-sm text-muted-foreground">
            View allocated balances, submit leave applications, and track manager approvals.
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="gap-2 bg-primary text-primary-foreground font-semibold"
        >
          <Plus className="w-4 h-4" />
          <span>Apply For Leave</span>
        </Button>
      </div>

      {/* 4 Leave Balance Cards with Theme Styling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-t-4 border-t-primary">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{leavesData.available} Days</div>
            <p className="text-xs text-muted-foreground mt-1">Remaining in 2026</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-[#21093D] dark:border-t-purple-400">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Casual Leaves
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{leavesData.casual} Days</div>
            <p className="text-xs text-muted-foreground mt-1">Available for planned personal events</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-emerald-500">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Medical / Sick Leaves
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{leavesData.sick} Days</div>
            <p className="text-xs text-muted-foreground mt-1">Available for medical recovery</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-amber-500">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Leaves Consumed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{leavesData.taken} Days</div>
            <p className="text-xs text-muted-foreground mt-1">Total approved year-to-date</p>
          </CardContent>
        </Card>
      </div>

      {/* Leave Application History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Leave History & Requests</CardTitle>
          <CardDescription>All leave applications submitted this calendar year</CardDescription>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Leave Type</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Total Days</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead>Approval Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(leavesData.requests || []).map((req) => (
              <TableRow key={req.id}>
                <TableCell className="font-semibold text-foreground">{req.leaveType}</TableCell>
                <TableCell className="text-xs font-medium">
                  {req.startDate} → {req.endDate}
                </TableCell>
                <TableCell className="text-xs font-bold text-foreground">{req.days} days</TableCell>
                <TableCell className="text-xs text-muted-foreground max-w-xs truncate">
                  {req.reason}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{req.appliedOn}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      req.status === 'Approved'
                        ? 'success'
                        : req.status === 'Pending'
                        ? 'warning'
                        : 'destructive'
                    }
                  >
                    ● {req.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Apply Leave Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogHeader>
          <DialogTitle>Apply for Leave</DialogTitle>
          <DialogDescription>
            Submit your time-off request for manager authorization.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleApplyLeave} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Leave Category</label>
            <select
              className="w-full h-10 px-3 border border-input rounded-[var(--radius)] bg-background text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              value={newLeave.leaveType}
              onChange={(e) => setNewLeave({ ...newLeave, leaveType: e.target.value })}
            >
              <option value="Casual Leave">Casual Leave (8 Days Available)</option>
              <option value="Sick Leave">Sick Leave (6 Days Available)</option>
              <option value="Earned Leave">Earned Leave (4 Days Available)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Start Date</label>
              <Input
                type="date"
                required
                value={newLeave.startDate}
                onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">End Date</label>
              <Input
                type="date"
                required
                value={newLeave.endDate}
                onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Reason for Leave</label>
            <textarea
              rows={3}
              required
              placeholder="Please provide details regarding your absence..."
              className="w-full p-3 border border-input rounded-[var(--radius)] bg-background text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              value={newLeave.reason}
              onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground font-semibold">
              Submit Request
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
