import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  FileSpreadsheet,
  Wallet,
  UserCheck,
  LogOut,
  X,
  Plus,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Avatar } from '../../components/ui/avatar';

export function ModernSidebar({ mobileOpen, onCloseMobile }) {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const mainNavItems = [
    { label: 'Dashboard', path: '/v2/home', icon: LayoutDashboard },
    { label: 'Employees Hub', path: '/v2/employees', icon: Users, badge: '42' },
    { label: 'Attendance', path: '/v2/attendance', icon: CalendarCheck },
    { label: 'Leaves', path: '/v2/leaves', icon: FileSpreadsheet, badge: 'Active' },
    { label: 'Payroll & Tax', path: '/v2/payroll', icon: Wallet },
  ];

  const secondaryNavItems = [
    { label: 'Self Service', path: '/v2/profile', icon: UserCheck },
    { label: 'Settings', path: '/v2/profile', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/v2/login');
  };

  const renderNavGroup = (items, isMobile) => (
    <div className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <NavLink
            key={item.label}
            to={item.path}
            onClick={isMobile ? onCloseMobile : undefined}
            className={`flex items-center justify-between px-3 py-2 rounded-[var(--radius)] text-xs transition-all ${isActive
              ? 'bg-sidebar-accent text-sidebar-accent-foreground font-bold border-l-[3px] border-sidebar-primary shadow-2xs'
              : 'text-sidebar-foreground/75 hover:bg-secondary hover:text-sidebar-foreground font-medium'
              }`}
          >
            <div className="flex items-center gap-2.5">
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-sidebar-accent-foreground dark:text-primary' : 'text-muted-foreground'
                  }`}
              />
              <span className="truncate">{item.label}</span>
            </div>

            {item.badge && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
                  }`}
              >
                {item.badge}
              </span>
            )}
          </NavLink>
        );
      })}
    </div>
  );

  const renderContent = (isMobile = false) => (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col min-h-0">
        {/* Brand Header (h-16 matches TopBar) */}
        <div className="flex items-center justify-between p-5 border-b border-sidebar-border shrink-0">
          <div className="flex items-center justify-center gap-3 w-full">
            <img src="/src/asset/logo.svg" alt="logo" className='w-[120px]' />
          </div>

          {isMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Action Button (TweakCN SaaS Style) */}
        <div className="p-3.5 pb-2 shrink-0">
          <Button
            size="sm"
            onClick={() => {
              if (isMobile) onCloseMobile();
              navigate('/v2/leaves');
            }}
            className="w-full h-9 bg-primary text-primary-foreground font-bold text-xs gap-1.5 shadow-xs hover:brightness-105 active:scale-[0.98] justify-center rounded-[var(--radius)]"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Quick Action</span>
          </Button>
        </div>

        {/* Scrollable Navigation Groups */}
        <nav className="flex-1 px-3.5 py-2 space-y-4 overflow-y-auto">
          <div>
            <div className="px-3 pb-2 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              Main Menu
            </div>
            {renderNavGroup(mainNavItems, isMobile)}
          </div>

          <div>
            <div className="px-3 pb-2 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              Preferences & Support
            </div>
            {renderNavGroup(secondaryNavItems, isMobile)}
          </div>
        </nav>
      </div>

      {/* User Footer Box */}
      <div className="p-3.5 border-t border-sidebar-border bg-sidebar shrink-0">
        <div className="flex items-center gap-2.5 mb-2.5">
          <Avatar
            src={user.profileImageUrl || ''}
            fallback={user.firstName ? user.firstName[0] : 'A'}
            size="sm"
            className="ring-1 ring-border"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold truncate text-sidebar-foreground m-0 leading-tight">
              {user.fullName || `${user.firstName || 'Admin'} ${user.lastName || 'User'}`}
            </p>
            <p className="text-[11px] text-muted-foreground truncate m-0 mt-0.5">
              {user.email || 'admin@cvm.com'}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full h-8 text-xs gap-1.5 justify-center hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 border-border text-foreground font-medium rounded-[calc(var(--radius)-2px)]"
          onClick={handleLogout}
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer (Only visible on mobile when toggled) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-[#21093D]/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <aside className="fixed inset-y-0 left-0 w-[260px] bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            {renderContent(true)}
          </aside>
        </div>
      )}

      {/* Desktop Sidebar (Always in flow, fixed 260px, never squished) */}
      <aside className="hidden md:flex flex-col w-[260px] min-w-[260px] max-w-[260px] shrink-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-full z-20 shadow-xs">
        {renderContent(false)}
      </aside>
    </>
  );
}
