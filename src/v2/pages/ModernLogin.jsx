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
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card';
import { useTheme } from '../../hooks/useTheme';

export default function ModernLogin() {
  const [email, setEmail] = useState('admin@cvm.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();

  const handleQuickLogin = (roleName = 'Admin') => {
    const roles =
      roleName === 'Admin'
        ? ['Admin', 'HR', 'Manager', 'IT', 'Employee', 'Finance']
        : roleName === 'HR'
        ? ['HR', 'Employee']
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
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-4 sm:p-6 lg:p-8 antialiased relative overflow-hidden">
      {/* Background Accent Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#60F61B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#21093D]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with theme toggle & switch to classic login */}
      <header className="flex items-center justify-between z-10 max-w-5xl w-full mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-xs">
            C
          </div>
          <span className="font-bold text-lg tracking-tight">
            CVM <span className="text-primary font-black">HRMS</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/login')}
            className="text-xs gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Classic Login</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-foreground" />}
          </Button>
        </div>
      </header>

      {/* Main Centered Login Card */}
      <div className="z-10 w-full max-w-md mx-auto my-auto py-8">
        <Card className="border border-border shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-accent-foreground mb-2">
              <ShieldCheck className="w-6 h-6 text-accent-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold">Sign In to HRMS</CardTitle>
            <CardDescription>
              Enter credentials or use 1-click Demo Roles below
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    placeholder="name@cvm.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full gap-2 bg-primary text-primary-foreground font-semibold shadow-sm hover:opacity-95"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {/* Quick Demo Login Buttons */}
            <div className="pt-4 border-t border-border text-center space-y-2">
              <p className="text-xs font-semibold text-muted-foreground flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Instant 1-Click Role Login:</span>
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="brand"
                  size="sm"
                  onClick={() => handleQuickLogin('Admin')}
                  className="text-xs py-1"
                >
                  Admin
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => handleQuickLogin('HR')}
                  className="text-xs py-1"
                >
                  HR Specialist
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickLogin('Employee')}
                  className="text-xs py-1"
                >
                  Employee
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="text-center justify-center text-xs text-muted-foreground border-t border-border py-3">
            <span>Powered by CVM Enterprise Platform 2.0</span>
          </CardFooter>
        </Card>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-muted-foreground py-2 z-10">
        © 2026 CVM Technologies Global Inc. All rights reserved.
      </footer>
    </div>
  );
}
