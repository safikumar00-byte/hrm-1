import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Laptop,
  Briefcase,
  AlertCircle,
  Edit2,
  Check,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar } from '../../components/ui/avatar';
import { Input } from '../../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';

export default function ModernProfile() {
  const [profile, setProfile] = useState({
    fullName: 'Admin User',
    employeeId: 'EMP001',
    email: 'admin@cvm.com',
    position: 'Lead HR Architect / Platform Admin',
    department: 'People Operations & Engineering',
    reportingManagerName: 'Executive Director',
    dateOfJoining: '2024-01-15',
    phone: '+1 (555) 234-5678',
    address: '100 Innovation Blvd, Suite 400, CA',
    employmentType: 'Full-time Permanent',
    location: 'Headquarters',
    bloodGroup: 'O+',
  });

  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [assets, setAssets] = useState([]);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    fetch('/api/profile/me')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.fullName) setProfile((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {});

    fetch('/api/emergencycontacts')
      .then((res) => res.json())
      .then((data) => setEmergencyContacts(Array.isArray(data) ? data : []))
      .catch(() => {});

    fetch('/api/assets/my')
      .then((res) => res.json())
      .then((data) => setAssets(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {/* Profile Identity Hero Card */}
      <Card className="border-2 border-primary/20 bg-card overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-[#21093D] via-[#382451] to-[#21093D] relative p-6">
          <Badge variant="brand" className="absolute top-4 right-4">
            Active Employee
          </Badge>
        </div>
        <CardContent className="pt-0 relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 gap-4">
            <div className="flex items-end gap-4">
              <Avatar
                fallback="A"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
                size="xl"
                className="border-4 border-card shadow-md"
              />
              <div className="mb-1">
                <h1 className="text-2xl font-bold text-foreground">{profile.fullName}</h1>
                <p className="text-sm text-muted-foreground">{profile.position}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {profile.employeeId}
                  </Badge>
                  <span className="text-xs text-muted-foreground">• {profile.department}</span>
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" className="gap-2 self-start sm:self-end">
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="personal">Personal & Contact</TabsTrigger>
          <TabsTrigger value="job">Employment & Org</TabsTrigger>
          <TabsTrigger value="assets">Assigned Hardware Assets</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
        </TabsList>

        {/* Personal Details */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Contact & Demographic Information</CardTitle>
              <CardDescription>Primary communication records and residential address</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
                <div className="p-3 bg-secondary/40 rounded-[var(--radius)] text-sm font-medium text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{profile.email}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Phone Number</label>
                <div className="p-3 bg-secondary/40 rounded-[var(--radius)] text-sm font-medium text-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{profile.phone}</span>
                </div>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground">Residential Address</label>
                <div className="p-3 bg-secondary/40 rounded-[var(--radius)] text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{profile.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Job & Org */}
        <TabsContent value="job">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Job Metadata & Hierarchy</CardTitle>
              <CardDescription>Official role mapping and supervisor line</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Reporting Manager</label>
                <div className="p-3 bg-secondary/40 rounded-[var(--radius)] text-sm font-medium text-foreground">
                  {profile.reportingManagerName}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Employment Classification</label>
                <div className="p-3 bg-secondary/40 rounded-[var(--radius)] text-sm font-medium text-foreground">
                  {profile.employmentType}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Joining Date</label>
                <div className="p-3 bg-secondary/40 rounded-[var(--radius)] text-sm font-medium text-foreground">
                  {profile.dateOfJoining}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Work Location</label>
                <div className="p-3 bg-secondary/40 rounded-[var(--radius)] text-sm font-medium text-foreground">
                  {profile.location}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assigned Assets */}
        <TabsContent value="assets">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assets.map((ast) => (
              <Card key={ast.id} className="p-4 flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center text-primary-foreground font-bold shrink-0">
                  <Laptop className="w-5 h-5 text-[#21093D]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-foreground truncate">{ast.name}</h4>
                    <Badge variant="brand" className="text-[10px]">
                      {ast.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Tag: {ast.assetTag}</p>
                  <p className="text-xs text-muted-foreground">S/N: {ast.serialNumber}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Emergency Contacts */}
        <TabsContent value="emergency">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyContacts.map((ct) => (
              <Card key={ct.id} className="p-4">
                <h4 className="font-semibold text-sm text-foreground">{ct.name}</h4>
                <p className="text-xs text-muted-foreground">Relation: {ct.relationship}</p>
                <div className="mt-2 text-xs font-medium text-foreground flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>{ct.phone}</span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
