import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  ExternalLink,
} from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Avatar } from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';
import { useTheme } from '../../hooks/useTheme';

export function ModernTopBar({ onOpenMobileMenu }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const roles = JSON.parse(localStorage.getItem('role') || '["Admin"]');

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shadow-2xs shrink-0">
      {/* Left: Mobile Toggle & Global Search */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-64 sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search employees, payroll, leaves..."
            className="pl-9 h-9 text-xs bg-secondary/40 focus:bg-card"
          />
        </div>
      </div>

      {/* Right: Actions, Theme, Role & User */}
      <div className="flex items-center gap-3">
        {/* Switch to Classic UI Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/home')}
          className="hidden sm:inline-flex text-xs h-8 gap-1.5 font-medium border-border hover:bg-secondary"
        >
          <ExternalLink className="w-3.5 h-3.5 text-primary" />
          <span>Classic UI</span>
        </Button>

        {/* Role Badge */}
        <Badge variant="brand" className="hidden lg:inline-flex text-xs font-semibold">
          {roles[0] || 'Admin'}
        </Badge>

        {/* Theme Toggle Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="h-8 w-8 rounded-lg"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </Button>

        {/* Notifications Icon Button */}
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-foreground" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
          </Button>
        </div>

        {/* User Mini Avatar & Name */}
        <div
          onClick={() => navigate('/v2/profile')}
          className="flex items-center gap-2 pl-2 border-l border-border cursor-pointer hover:opacity-85 transition-opacity"
        >
          <Avatar
            src={user.profileImageUrl || ''}
            fallback={user.firstName ? user.firstName[0] : 'A'}
            size="sm"
          />
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-foreground leading-tight m-0">
              {user.firstName || 'Admin'}
            </p>
            <p className="text-[10px] text-muted-foreground m-0">
              {user.roles ? user.roles[0] : 'Admin'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
