import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  Building,
  MoreVertical,
  Check,
  UserPlus,
} from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../components/ui/table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar } from '../../components/ui/avatar';
import { Input } from '../../components/ui/input';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../components/ui/dialog';

export default function ModernEmployees() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEmp, setNewEmp] = useState({
    fullName: '',
    email: '',
    department: 'Engineering',
    position: '',
  });

  useEffect(() => {
    fetch('/api/employee/all')
      .then((res) => res.json())
      .then((data) => setEmployees(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmp.fullName || !newEmp.email) return;

    const created = {
      id: `EMP00${employees.length + 1}`,
      employeeId: `EMP00${employees.length + 1}`,
      fullName: newEmp.fullName,
      email: newEmp.email,
      department: newEmp.department,
      position: newEmp.position || 'Software Associate',
      status: 'Active',
      role: ['Employee'],
      dateOfJoining: new Date().toISOString().split('T')[0],
    };

    setEmployees((prev) => [created, ...prev]);
    setNewEmp({ fullName: '', email: '', department: 'Engineering', position: '' });
    setDialogOpen(false);
  };

  const departments = ['All', 'Engineering', 'Operations', 'Human Resources', 'Finance'];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      (emp.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.position || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {/* Header with Title and Add Employee CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Employees Directory
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage organization members, departments, and system roles.
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="gap-2 bg-primary text-primary-foreground font-bold hover:brightness-105 active:scale-[0.98]"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Employee</span>
        </Button>
      </div>

      {/* Filter and Search Bar Card */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 text-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={selectedDept === dept ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDept(dept)}
                className={`text-xs ${selectedDept === dept ? 'bg-primary text-primary-foreground font-semibold' : ''}`}
              >
                {dept}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Employees Table Card */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((emp) => (
              <TableRow key={emp.id} className="cursor-pointer">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      fallback={emp.fullName ? emp.fullName[0] : 'E'}
                      src={emp.profileImageUrl}
                      size="md"
                    />
                    <div>
                      <div className="font-semibold text-foreground">{emp.fullName}</div>
                      <div className="text-xs text-muted-foreground">{emp.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <Building className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{emp.department || 'General'}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs font-medium text-foreground">
                  {emp.position || 'Specialist'}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {(emp.role || ['Employee']).map((r, i) => (
                      <Badge
                        key={i}
                        variant={r === 'Admin' ? 'brand' : 'secondary'}
                        className="text-[10px] px-2 py-0"
                      >
                        {r}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={emp.status === 'Active' ? 'success' : 'secondary'}>
                    ● {emp.status || 'Active'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Add Employee Dialog Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription>
            Enter initial profile details to initiate onboarding workflow.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAddEmployee} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Full Name</label>
            <Input
              required
              placeholder="e.g. Alex Henderson"
              value={newEmp.fullName}
              onChange={(e) => setNewEmp({ ...newEmp, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Corporate Email</label>
            <Input
              type="email"
              required
              placeholder="e.g. alex.h@cvm.com"
              value={newEmp.email}
              onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Department</label>
              <select
                className="w-full h-10 px-3 border border-input rounded-[var(--radius)] bg-background text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                value={newEmp.department}
                onChange={(e) => setNewEmp({ ...newEmp, department: e.target.value })}
              >
                <option value="Engineering">Engineering</option>
                <option value="Operations">Operations</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Designation</label>
              <Input
                placeholder="e.g. Frontend Engineer"
                value={newEmp.position}
                onChange={(e) => setNewEmp({ ...newEmp, position: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground font-semibold">
              Create Employee
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
