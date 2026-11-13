import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Sun,
  Moon,
  Sparkles,
  ExternalLink,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  Users,
  Check,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { useTheme } from '../../hooks/useTheme';

export default function ModernLogin() {
  const [email, setEmail] = useState('admin@cvm.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();

  const handleQuickLogin = (roleName = 'Admin') => {
    const roles =
      roleName === 'Admin'
        ? ['Admin', 'HR', 'Manager', 'IT', 'Employee', 'Finance']
        : roleName === 'HR'
        ? ['HR', 'Employee']
        : roleName === 'Manager'
        ? ['Manager', 'Employee']
        : ['Employee'];

    const mockToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      btoa(
        JSON.stringify({
          id: 'EMP001',
          employeeId: 'EMP001',
          roles,
          email: `${roleName.toLowerCase()}@cvm.com`,
          exp: 2000000000,
        })
      )
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_') +
      '.mock_signature';

    const userData = {
      id: 'EMP001',
      employeeId: 'EMP001',
      employeeInternalId: 'INT001',
      reportingManagerId: 'MGR001',
      email: `${roleName.toLowerCase()}@cvm.com`,
      roles,
      firstName: roleName,
      lastName: 'User',
      token: mockToken,
      onboardingStatus: 'Completed',
    };

    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', mockToken);
    localStorage.setItem('role', JSON.stringify(roles));

    navigate('/v2/home');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data && data.token) {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', JSON.stringify(data.roles));
        navigate('/v2/home');
      } else {
        alert('Invalid credentials');
      }
    } catch (_err) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground grid grid-cols-1 lg:grid-cols-12 antialiased selection:bg-primary selection:text-primary-foreground">
      {/* =========================================================================
          LEFT COLUMN: Authentication Form (5 cols on xl, 6 on lg, 12 on mobile)
         ========================================================================= */}
      <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between p-6 sm:p-10 lg:p-12 z-10 bg-card/60 backdrop-blur-xs border-r border-border min-h-screen">
        {/* Top Header */}
        <header className="flex items-center justify-between pb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-black text-xl shadow-xs ring-2 ring-primary/20">
              C
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight text-foreground leading-tight m-0">
                CVM <span className="text-primary font-black">HRMS</span>
              </h1>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider m-0">
                Enterprise Cloud v2
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/login')}
              className="text-xs h-8 gap-1.5 border-border hover:bg-secondary hidden sm:flex"
            >
              <ExternalLink className="w-3.5 h-3.5 text-primary" />
              <span>Classic Login</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="h-8 w-8 rounded-lg border-border hover:bg-secondary"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-foreground" />
              )}
            </Button>
          </div>
        </header>

        {/* Center Content: Login Form */}
        <div className="w-full max-w-md mx-auto my-auto py-6 space-y-6">
          {/* Welcome Text */}
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold border border-primary/20 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Workspace Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground m-0">
              Welcome back
            </h2>
            <p className="text-sm text-muted-foreground font-medium m-0">
              Enter your enterprise credentials or use one-click demo access.
            </p>
          </div>

          {/* Quick Demo Access Roles */}
          <div className="p-3.5 rounded-[var(--radius)] bg-secondary/50 border border-border space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span>Instant Demo Access</span>
              </span>
              <span className="text-[11px] text-muted-foreground">Select role to login</span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleQuickLogin('Admin')}
                className="px-2.5 py-2 rounded-lg text-xs font-bold bg-primary text-primary-foreground hover:brightness-105 active:scale-[0.98] transition-all shadow-xs cursor-pointer text-center truncate"
              >
                👑 Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('HR')}
                className="px-2.5 py-2 rounded-lg text-xs font-semibold bg-card text-card-foreground border border-border hover:border-primary/50 hover:bg-secondary active:scale-[0.98] transition-all shadow-2xs cursor-pointer text-center truncate"
              >
                💼 HR Lead
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('Employee')}
                className="px-2.5 py-2 rounded-lg text-xs font-semibold bg-card text-card-foreground border border-border hover:border-primary/50 hover:bg-secondary active:scale-[0.98] transition-all shadow-2xs cursor-pointer text-center truncate"
              >
                👤 Employee
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <span className="relative px-3 bg-card text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Or sign in with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground pointer-events-none" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="pl-9 h-10 text-sm bg-secondary/30 focus:bg-card border-border"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-foreground">Password</label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset link has been dispatched to your email.');
                  }}
                  className="font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-muted-foreground pointer-events-none" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-9 pr-10 h-10 text-sm bg-secondary/30 focus:bg-card border-border"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-muted-foreground font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary accent-[#60F61B]"
                />
                <span>Remember this device for 30 days</span>
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 text-sm font-bold bg-primary text-primary-foreground hover:brightness-105 active:scale-[0.98] shadow-xs gap-2 justify-center transition-all cursor-pointer"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Button>
          </form>
        </div>

        {/* Security Compliance Footer */}
        <footer className="pt-6 border-t border-border/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>256-bit SSL • SOC2 Type II Certified</span>
          </div>
          <span className="font-mono text-[10px]">ISO 27001 Compliant</span>
        </footer>
      </div>

      {/* =========================================================================
          RIGHT COLUMN: Showcase Image & Feature Visual Panel (7 cols xl, 6 lg)
         ========================================================================= */}
      <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 relative overflow-hidden bg-gradient-to-br from-[#19072F] via-[#21093D] to-[#382451] p-10 xl:p-14 flex-col justify-between text-white select-none">
        {/* Background Ambient Mesh Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#60F61B]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#8B5CF6]/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Feature Pill */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-[#F8F7FA]">
            <span className="h-2 w-2 rounded-full bg-[#60F61B] animate-pulse" />
            <span>Live Workforce Intelligence Platform</span>
          </div>

          <div className="text-xs text-white/60 font-mono">
            Trusted by 500+ Enterprises
          </div>
        </div>

        {/* Center Glass Mockup & Image Layout */}
        <div className="relative z-10 my-auto py-8 max-w-xl mx-auto w-full">
          {/* Main Visual Frame */}
          <div className="relative rounded-2xl p-2 bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden group">
            {/* High-Resolution Modern Enterprise Workspace Image */}
            <div className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                alt="Enterprise Architecture & Workforce Workspace"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#21093D] via-[#21093D]/40 to-transparent" />

              {/* Bottom Label on Image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-white leading-tight m-0">
                    San Francisco HQ Global Campus
                  </h3>
                  <p className="text-xs text-white/80 font-medium m-0">
                    Automated geofencing & attendance telemetry
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#60F61B] text-[#21093D] font-black text-xs shadow-xs">
                  Connected
                </span>
              </div>
            </div>

            {/* Floating Glassmorphic Telemetry Card (Top-Left Overhang) */}
            <div className="absolute -top-3 -left-3 p-3.5 rounded-xl bg-[#21093D]/90 backdrop-blur-md border border-white/20 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="h-9 w-9 rounded-lg bg-[#60F61B] text-[#21093D] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/60 font-bold m-0">
                  Live Shift Tracking
                </p>
                <p className="text-xs font-mono font-black text-[#60F61B] m-0">
                  04:07:01 • Active
                </p>
              </div>
            </div>

            {/* Floating Glassmorphic Metric Card (Bottom-Right Overhang) */}
            <div className="absolute -bottom-3 -right-3 p-3.5 rounded-xl bg-[#21093D]/90 backdrop-blur-md border border-white/20 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="h-9 w-9 rounded-lg bg-emerald-500/20 text-[#60F61B] flex items-center justify-center font-bold border border-[#60F61B]/30">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/60 font-bold m-0">
                  Attendance Telemetry
                </p>
                <p className="text-xs font-bold text-white m-0">
                  98.2% On-Schedule Rate
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Testimonial & Social Proof Stats */}
        <div className="relative z-10 pt-4 space-y-4">
          <blockquote className="border-l-2 border-[#60F61B] pl-4 italic text-sm text-white/90 leading-relaxed max-w-lg m-0">
            "CVM HRMS transformed our organizational telemetry, daily attendance tracking, and monthly payroll distribution across 12 worldwide office campuses."
          </blockquote>

          <div className="flex items-center justify-between text-xs text-white/70 pt-2 border-t border-white/10">
            <div>
              <span className="font-bold text-white">Sarah Johnson</span> — VP of People Operations
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px] text-[#60F61B]">
              <span>99.98% Uptime</span>
              <span>•</span>
              <span>10k+ Teams</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
