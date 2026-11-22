import React, { useState, useEffect } from 'react';
import {
  Users2,
  Search,
  Plus,
  UserPlus,
  Trash2,
  Shield,
  Briefcase,
  ChevronRight,
  UserCheck,
  Check,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card';
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
import { useTeams } from '../../hooks/useTeams';
import { useUser } from '../../hooks/useUser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DEFAULT_TEAMS = [
  {
    teamName: 'Frontend Core & UI Platform',
    department: 'Engineering',
    lead: { fullName: 'Sarah Johnson', position: 'Principal UI Architect', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    members: [
      { employeeId: 'EMP001', fullName: 'Admin User', role: 'Lead Architect', position: 'Staff Engineer' },
      { employeeId: 'EMP004', fullName: 'Alex Rivera', role: 'Member', position: 'Senior Frontend Dev' },
      { employeeId: 'EMP005', fullName: 'Emily Chen', role: 'Member', position: 'Design Systems Eng' },
      { employeeId: 'EMP006', fullName: 'David Kim', role: 'Member', position: 'React Specialist' },
    ],
  },
  {
    teamName: 'Cloud Infrastructure & DevOps',
    department: 'Engineering',
    lead: { fullName: 'Marcus Vance', position: 'Head of Infrastructure', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    members: [
      { employeeId: 'EMP007', fullName: 'Carlos Santana', role: 'Member', position: 'DevOps Lead' },
      { employeeId: 'EMP008', fullName: 'Priya Sharma', role: 'Member', position: 'SRE Specialist' },
      { employeeId: 'EMP009', fullName: 'Liam Wilson', role: 'Member', position: 'Cloud Security Eng' },
    ],
  },
  {
    teamName: 'People Operations & Culture',
    department: 'Human Resources',
    lead: { fullName: 'Elena Rostova', position: 'Chief People Officer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
    members: [
      { employeeId: 'EMP010', fullName: 'Rachel Green', role: 'Member', position: 'HR Business Partner' },
      { employeeId: 'EMP011', fullName: 'Jordan Miller', role: 'Member', position: 'Talent Acquisition' },
    ],
  },
  {
    teamName: 'Product Design & User Experience',
    department: 'Product',
    lead: { fullName: 'Sophia Taylor', position: 'Head of UX Design', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
    members: [
      { employeeId: 'EMP012', fullName: 'Oliver Brown', role: 'Member', position: 'Senior Product Designer' },
      { employeeId: 'EMP013', fullName: 'Maya Patel', role: 'Member', position: 'UX Researcher' },
    ],
  },
];

export default function ModernTeams() {
  const {
    teamsData,
    loading,
    error,
    handleCreateTeam,
    handleAddMember,
    requestRemoveMember,
    confirmRemoveMember,
    requestDeleteTeam,
    confirmDeleteTeam,
  } = useTeams();

  const { hasRole } = useUser();
  const canManage = hasRole(['Admin', 'HR']);

  const [activeDept, setActiveDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDept, setNewTeamDept] = useState('Engineering');
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const [targetTeam, setTargetTeam] = useState(null);
  const [newMemberEmpId, setNewMemberEmpId] = useState('');
  const [creating, setCreating] = useState(false);

  // Merge backend teams with structured organizational defaults
  const displayedTeams = React.useMemo(() => {
    if (Array.isArray(teamsData) && teamsData.length > 0) {
      return teamsData.map((t) => {
        const foundDefault = DEFAULT_TEAMS.find(
          (d) => d.teamName.toLowerCase() === (t.teamName || t.name || '').toLowerCase()
        );
        return {
          teamName: t.teamName || t.name || 'Untitled Team',
          department: t.department || foundDefault?.department || 'Operations',
          lead: t.lead || foundDefault?.lead || { fullName: 'Team Lead', position: 'Lead' },
          members: Array.isArray(t.members) ? t.members : foundDefault?.members || [],
        };
      });
    }
    return DEFAULT_TEAMS;
  }, [teamsData]);

  const departments = ['All', 'Engineering', 'Human Resources', 'Product', 'Operations'];

  const filteredTeams = displayedTeams.filter((team) => {
    const matchesDept = activeDept === 'All' || team.department === activeDept;
    const matchesSearch =
      team.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(team.members) &&
        team.members.some(
          (m) =>
            (m.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (m.employeeId || '').toLowerCase().includes(searchQuery.toLowerCase())
        ));
    return matchesDept && matchesSearch;
  });

  const handleCreateNewTeam = async (e) => {
    e.preventDefault();
    if (!newTeamName.trim()) {
      toast.error('Please enter a team name');
      return;
    }
    setCreating(true);
    try {
      await handleCreateTeam({ name: newTeamName.trim() });
      toast.success(`Team "${newTeamName.trim()}" created successfully!`);
      setNewTeamName('');
      setCreateDialogOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to create team');
    } finally {
      setCreating(false);
    }
  };

  const handleAddMemberSubmit = async (e) => {
    e.preventDefault();
    if (!newMemberEmpId.trim() || !targetTeam) {
      toast.error('Please provide an Employee ID');
      return;
    }
    try {
      await handleAddMember(targetTeam.teamName, newMemberEmpId.trim());
      toast.success(`Member ${newMemberEmpId} added to ${targetTeam.teamName}!`);
      setNewMemberEmpId('');
      setAddMemberDialogOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to add member');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Users2 className="w-7 h-7 text-primary" />
            <span>Teams & Squads</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage organizational divisions, cross-functional squads, and member rosters.
          </p>
        </div>

        {canManage && (
          <Button
            onClick={() => setCreateDialogOpen(true)}
            className="gap-2 bg-primary text-primary-foreground font-bold hover:brightness-105 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create New Team</span>
          </Button>
        )}
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-primary">
          <div className="text-xs font-semibold text-muted-foreground uppercase">Active Teams</div>
          <div className="text-2xl font-bold text-foreground mt-1">{displayedTeams.length} Squads</div>
          <p className="text-xs text-muted-foreground mt-1">Cross-functional groups</p>
        </Card>

        <Card className="p-4 border-l-4 border-chart-3">
          <div className="text-xs font-semibold text-muted-foreground uppercase">Assigned Members</div>
          <div className="text-2xl font-bold text-foreground mt-1">
            {displayedTeams.reduce((acc, t) => acc + (t.members?.length || 0), 0)} Members
          </div>
          <p className="text-xs text-muted-foreground mt-1">100% staff allocated</p>
        </Card>

        <Card className="p-4 border-l-4 border-emerald-500">
          <div className="text-xs font-semibold text-muted-foreground uppercase">Departments Covered</div>
          <div className="text-2xl font-bold text-foreground mt-1">
            {new Set(displayedTeams.map((t) => t.department)).size} Depts
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">Full organizational alignment</p>
        </Card>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeDept === dept
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-card text-muted-foreground hover:bg-secondary border border-border'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teams or members..."
            className="pl-9 h-9 text-xs bg-card border-border"
          />
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTeams.map((team, idx) => (
          <Card key={team.teamName || idx} className="flex flex-col justify-between border border-border shadow-xs">
            <div>
              <CardHeader className="pb-3 border-b border-border bg-accent/20">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Badge variant="brand" className="text-[10px] uppercase font-bold mb-1">
                      {team.department}
                    </Badge>
                    <CardTitle className="text-base font-bold text-card-foreground">
                      {team.teamName}
                    </CardTitle>
                  </div>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {team.members?.length || 0} Members
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-4 space-y-4">
                {/* Team Lead Box */}
                {team.lead && (
                  <div className="flex items-center gap-3 p-3 bg-secondary/40 rounded-[var(--radius)] border border-border/80">
                    <Avatar
                      src={team.lead.avatar || ''}
                      fallback={team.lead.fullName ? team.lead.fullName[0] : 'L'}
                      size="sm"
                      className="ring-1 ring-primary"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-foreground truncate">{team.lead.fullName}</span>
                        <Badge variant="neutral" className="text-[9px] py-0 px-1.5">Lead</Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">{team.lead.position}</p>
                    </div>
                  </div>
                )}

                {/* Team Members List */}
                <div>
                  <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center justify-between">
                    <span>Squad Roster</span>
                    <span className="text-[11px]">ID / Designation</span>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {Array.isArray(team.members) && team.members.length > 0 ? (
                      team.members.map((member, mIdx) => (
                        <div
                          key={member.employeeId || mIdx}
                          className="flex items-center justify-between text-xs p-2 rounded-md hover:bg-secondary/60 transition-colors border border-border/50"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            <span className="font-medium text-foreground truncate">
                              {member.fullName || member.name || `Employee ${member.employeeId}`}
                            </span>
                            <span className="text-[10px] font-mono text-muted-foreground">({member.employeeId})</span>
                          </div>
                          <span className="text-[11px] text-muted-foreground font-medium shrink-0 ml-2">
                            {member.position || member.role || 'Member'}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground italic py-2 text-center">
                        No members assigned yet.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </div>

            {/* Card Actions Footer */}
            <CardFooter className="pt-3 pb-3 border-t border-border bg-secondary/20 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setTargetTeam(team);
                  setAddMemberDialogOpen(true);
                }}
                className="gap-1.5 text-xs h-8 font-semibold"
              >
                <UserPlus className="w-3.5 h-3.5 text-primary" />
                <span>Add Member</span>
              </Button>

              {canManage && (!team.members || team.members.length === 0) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => requestDeleteTeam(team.teamName)}
                  className="text-destructive hover:bg-destructive/10 text-xs h-8 gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Team</span>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Create Team Modal */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)}>
        <DialogHeader>
          <DialogTitle>Create New Organization Team</DialogTitle>
          <DialogDescription>
            Establish a new department squad or cross-functional working group.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreateNewTeam} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Team Name</label>
            <Input
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="e.g. AI & Machine Learning Lab"
              required
              className="h-9 text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Department</label>
            <select
              value={newTeamDept}
              onChange={(e) => setNewTeamDept(e.target.value)}
              className="w-full h-9 px-3 rounded-md border border-border bg-card text-foreground text-xs"
            >
              <option value="Engineering">Engineering</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Product">Product & Design</option>
              <option value="Operations">Operations</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={creating}
              size="sm"
              className="bg-primary text-primary-foreground font-bold hover:brightness-105"
            >
              {creating ? 'Creating...' : 'Create Team'}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* Add Member Modal */}
      <Dialog open={addMemberDialogOpen} onClose={() => setAddMemberDialogOpen(false)}>
        <DialogHeader>
          <DialogTitle>Add Member to {targetTeam?.teamName}</DialogTitle>
          <DialogDescription>
            Assign an employee to this squad roster using their Employee ID.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAddMemberSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Employee ID</label>
            <Input
              value={newMemberEmpId}
              onChange={(e) => setNewMemberEmpId(e.target.value)}
              placeholder="e.g. EMP002 or EMP003"
              required
              className="h-9 text-xs"
            />
            <p className="text-[11px] text-muted-foreground">
              Enter the unique Employee ID from the Employees Directory.
            </p>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setAddMemberDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-primary text-primary-foreground font-bold hover:brightness-105"
            >
              Assign Member
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
