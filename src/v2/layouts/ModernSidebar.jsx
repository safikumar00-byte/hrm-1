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
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Avatar } from '../../components/ui/avatar';

export function ModernSidebar({ mobileOpen, onCloseMobile }) {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const navItems = [
    { label: 'Dashboard', path: '/v2/home', icon: LayoutDashboard },
    { label: 'Employees Hub', path: '/v2/employees', icon: Users, badge: '42' },
    { label: 'Attendance', path: '/v2/attendance', icon: CalendarCheck },
    { label: 'Leaves', path: '/v2/leaves', icon: FileSpreadsheet, badge: 'Active' },
    { label: 'Payroll & Tax', path: '/v2/payroll', icon: Wallet },
    { label: 'Self Service', path: '/v2/profile', icon: UserCheck },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/v2/login');
  };

  const renderContent = (isMobile = false) => (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col">
        {/* Brand Header (h-16 matches TopBar) */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-sidebar-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-black text-lg shadow-xs ring-2 ring-primary/20">
              C
            </div>
            <div>
              <h1 className="font-extrabold text-sm tracking-tight text-sidebar-foreground m-0 leading-tight">
                CVM <span className="text-primary font-black">HRMS</span>
              </h1>
              <p className="text-[10px] text-muted-foreground font-semibold m-0 tracking-wider uppercase">
                Enterprise Portal v2
              </p>
            </div>
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

        {/* Navigation Items */}
        <nav className="p-3.5 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 pt-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
            Navigation Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={isMobile ? onCloseMobile : undefined}
                className={`flex items-center justify-between px-3 py-2 rounded-[var(--radius)] text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-bold border-l-4 border-sidebar-primary shadow-2xs'
                    : 'text-sidebar-foreground/75 hover:bg-secondary hover:text-sidebar-foreground'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                      isActive
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
        </nav>
      </div>

      {/* User Footer Box */}
      <div className="p-3.5 border-t border-sidebar-border bg-sidebar shrink-0">
        <div className="flex items-center gap-2.5 mb-2.5">
          <Avatar
            src={user.profileImageUrl || ''}
            fallback={user.firstName ? user.firstName[0] : 'A'}
            size="sm"
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
