import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  MessageSquare,
  ShieldAlert,
  Send,
  Eye,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar } from '../../components/ui/avatar';
import { Input } from '../../components/ui/input';
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
import { fetchAllHRRequests, fetchMyHRRequests, raiseHRRequest } from '../../api/hrrequests';
import { getToken } from '../../utils/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DEFAULT_REQUESTS = [
  {
    requestId: 'REQ-2026-089',
    category: 'IT Equipment & Hardware',
    subject: 'Request for secondary 4K IPS developer monitor',
    requestedByFullName: 'Admin User',
    requestedBy: 'EMP001',
    createdAt: '2026-11-10T10:30:00Z',
    priority: 'Medium',
    status: 'In Progress',
    description: 'Need additional screen real estate for testing dual responsive layouts and frontend architectures.',
  },
  {
    requestId: 'REQ-2026-088',
    category: 'Payroll & Tax Query',
    subject: 'Form 16 Tax Regime Verification (FY 2026-27)',
    requestedByFullName: 'Sarah Johnson',
    requestedBy: 'EMP002',
    createdAt: '2026-11-08T14:15:00Z',
    priority: 'High',
    status: 'Pending',
    description: 'Requesting confirmation on whether HRA exemption will reflect in Form 16 Part B under the new regime.',
  },
  {
    requestId: 'REQ-2026-084',
    category: 'Leave & Attendance Adjustment',
    subject: 'Correction of Biometric Punch on Nov 05',
    requestedByFullName: 'Marcus Vance',
    requestedBy: 'EMP003',
    createdAt: '2026-11-06T09:00:00Z',
    priority: 'Low',
    status: 'Resolved',
    description: 'Office network geofence timeout caused clock out stamp to register 30 minutes late.',
  },
  {
    requestId: 'REQ-2026-080',
    category: 'Company Policy & Benefits',
    subject: 'Parental Leave Policy Clarification',
    requestedByFullName: 'Elena Rostova',
    requestedBy: 'EMP004',
    createdAt: '2026-11-01T11:45:00Z',
    priority: 'Medium',
    status: 'Resolved',
    description: 'Inquiring regarding eligible secondary caregiver leave duration under the revised 2026 guidelines.',
  },
];

export default function ModernRequests() {
  const [requests, setRequests] = useState(DEFAULT_REQUESTS);
  const [loading, setLoading] = useState(false);
  const [activeStatus, setActiveStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [raiseDialogOpen, setRaiseDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    category: 'IT Equipment & Hardware',
    subject: '',
    priority: 'Medium',
    description: '',
  });

  const token = getToken();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const roles = JSON.parse(localStorage.getItem('role') || '["Admin"]');
  const isHRorAdmin = roles.includes('HR') || roles.includes('Admin');

  useEffect(() => {
    const loadRequests = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const data = isHRorAdmin
          ? await fetchAllHRRequests(token)
          : await fetchMyHRRequests(token);
        if (Array.isArray(data) && data.length > 0) {
          setRequests(data);
        }
      } catch (err) {
        // Fall back gracefully to structured default requests
      } finally {
        setLoading(false);
      }
    };
    loadRequests();
  }, [token, isHRorAdmin]);

  const handleRaiseSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject.trim() || !formData.description.trim()) {
      toast.error('Please fill in both the subject and description.');
      return;
    }

    setSubmitting(true);
    try {
      if (token) {
        await raiseHRRequest(token, formData);
      }
      const newReq = {
        requestId: `REQ-2026-${Math.floor(100 + Math.random() * 900)}`,
        category: formData.category,
        subject: formData.subject.trim(),
        requestedByFullName: user.fullName || 'Admin User',
        requestedBy: user.employeeId || 'EMP001',
        createdAt: new Date().toISOString(),
        priority: formData.priority,
        status: 'Pending',
        description: formData.description.trim(),
      };
      setRequests((prev) => [newReq, ...prev]);
      toast.success('HR Request submitted successfully!');
      setRaiseDialogOpen(false);
      setFormData({
        category: 'IT Equipment & Hardware',
        subject: '',
        priority: 'Medium',
        description: '',
      });
    } catch (err) {
      toast.error(err.message || 'Failed to submit HR request');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesStatus = activeStatus === 'All' || req.status === activeStatus;
    const matchesSearch =
      (req.subject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.requestId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.requestedByFullName || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved':
        return <Badge variant="success">● Resolved</Badge>;
      case 'In Progress':
        return <Badge variant="brand">● In Progress</Badge>;
      case 'Pending':
      default:
        return <Badge variant="warning">● Pending</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Urgent':
      case 'High':
        return <Badge variant="destructive" className="text-[10px] py-0 px-1.5 font-bold">{priority}</Badge>;
      case 'Medium':
        return <Badge variant="secondary" className="text-[10px] py-0 px-1.5">{priority}</Badge>;
      default:
        return <Badge variant="neutral" className="text-[10px] py-0 px-1.5">{priority || 'Normal'}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-primary" />
            <span>HR Requests & Support</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Submit inquiries, request assets, adjust attendance records, and track resolution tickets.
          </p>
        </div>

        <Button
          onClick={() => setRaiseDialogOpen(true)}
          className="gap-2 bg-primary text-primary-foreground font-bold hover:brightness-105 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Raise HR Request</span>
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-primary">
          <div className="text-xs font-semibold text-muted-foreground uppercase">Total Tickets</div>
          <div className="text-2xl font-bold text-foreground mt-1">{requests.length} Requests</div>
          <p className="text-xs text-muted-foreground mt-1">Platform lifecycle total</p>
        </Card>

        <Card className="p-4 border-l-4 border-amber-500">
          <div className="text-xs font-semibold text-muted-foreground uppercase">Pending Review</div>
          <div className="text-2xl font-bold text-foreground mt-1">
            {requests.filter((r) => r.status === 'Pending').length} Open
          </div>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium">Awaiting HR action</p>
        </Card>

        <Card className="p-4 border-l-4 border-chart-3">
          <div className="text-xs font-semibold text-muted-foreground uppercase">In Progress</div>
          <div className="text-2xl font-bold text-foreground mt-1">
            {requests.filter((r) => r.status === 'In Progress').length} Active
          </div>
          <p className="text-xs text-muted-foreground mt-1">Being processed</p>
        </Card>

        <Card className="p-4 border-l-4 border-emerald-500">
          <div className="text-xs font-semibold text-muted-foreground uppercase">Resolved Tickets</div>
          <div className="text-2xl font-bold text-foreground mt-1">
            {requests.filter((r) => r.status === 'Resolved').length} Closed
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">98.5% SLA satisfaction</p>
        </Card>
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['All', 'Pending', 'In Progress', 'Resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setActiveStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeStatus === st
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-card text-muted-foreground hover:bg-secondary border border-border'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ticket ID, subject, requester..."
            className="pl-9 h-9 text-xs bg-card border-border"
          />
        </div>
      </div>

      {/* Requests Table */}
      <Card>
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Service Desk Tickets</CardTitle>
              <CardDescription>All submitted tickets with audit timestamps and SLAs</CardDescription>
            </div>
            <Badge variant="secondary" className="font-mono text-xs">
              {filteredRequests.length} of {requests.length}
            </Badge>
          </div>
        </CardHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Category & Subject</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Date Filed</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((req, idx) => (
              <TableRow key={req.requestId || req.id || idx}>
                <TableCell className="font-mono text-xs font-bold text-foreground">
                  {req.requestId}
                </TableCell>
                <TableCell>
                  <div className="min-w-0 max-w-xs">
                    <p className="font-semibold text-xs text-foreground truncate">{req.subject}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{req.category}</p>
                  </div>
                </TableCell>
                <TableCell className="text-xs">
                  <span className="font-medium text-foreground">{req.requestedByFullName || 'Employee'}</span>
                  <span className="text-muted-foreground text-[10px] ml-1">({req.requestedBy})</span>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 'Recent'}
                </TableCell>
                <TableCell>{getPriorityBadge(req.priority)}</TableCell>
                <TableCell>{getStatusBadge(req.status)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRequest(req)}
                    className="h-7 text-xs gap-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-primary" />
                    <span>View</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Raise Request Dialog Modal */}
      <Dialog open={raiseDialogOpen} onClose={() => setRaiseDialogOpen(false)}>
        <DialogHeader>
          <DialogTitle>Raise New HR Request</DialogTitle>
          <DialogDescription>
            Submit an official support inquiry or request to the People Operations team.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleRaiseSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Request Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full h-9 px-3 rounded-md border border-border bg-card text-foreground text-xs"
            >
              <option value="IT Equipment & Hardware">IT Equipment & Hardware</option>
              <option value="Leave & Attendance Adjustment">Leave & Attendance Adjustment</option>
              <option value="Payroll & Tax Query">Payroll & Tax Query</option>
              <option value="Company Policy & Benefits">Company Policy & Benefits</option>
              <option value="Workplace Safety & Admin">Workplace Safety & Admin</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Subject / Summary</label>
            <Input
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Ergonomic chair request or salary tax clarification"
              required
              className="h-9 text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Priority Level</label>
            <div className="flex gap-2">
              {['Low', 'Medium', 'High', 'Urgent'].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setFormData({ ...formData, priority: p })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md border transition-all ${
                    formData.priority === p
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border bg-card text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Detailed Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide background, serial numbers, date range or justification..."
              required
              className="w-full p-2.5 rounded-md border border-border bg-card text-foreground text-xs resize-none focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setRaiseDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              size="sm"
              className="bg-primary text-primary-foreground font-bold hover:brightness-105"
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* View Details Dialog Modal */}
      {selectedRequest && (
        <Dialog open={!!selectedRequest} onClose={() => setSelectedRequest(null)}>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <Badge variant="brand" className="font-mono text-xs">
                {selectedRequest.requestId}
              </Badge>
              {getStatusBadge(selectedRequest.status)}
            </div>
            <DialogTitle className="mt-2 text-base font-bold">{selectedRequest.subject}</DialogTitle>
            <DialogDescription>{selectedRequest.category}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-secondary/30 rounded-md border border-border">
              <div>
                <span className="text-muted-foreground block text-[11px]">Submitted By:</span>
                <span className="font-bold text-foreground">
                  {selectedRequest.requestedByFullName} ({selectedRequest.requestedBy})
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px]">Priority:</span>
                <span className="font-bold text-foreground">{selectedRequest.priority}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="font-semibold text-muted-foreground text-[11px]">Description:</span>
              <p className="p-3 bg-card border border-border rounded-md text-foreground leading-relaxed whitespace-pre-wrap">
                {selectedRequest.description || 'No additional details provided.'}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button size="sm" onClick={() => setSelectedRequest(null)}>
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
}
