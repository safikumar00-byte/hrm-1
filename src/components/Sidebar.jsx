import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Users,
  LayoutDashboard,
  UserCog,
  UserCircle,
  GitPullRequest,
  Wrench,
  Calendar,
  Wallet,
  Archive,
  ShieldCheck,
  X,
} from 'lucide-react';
import './Sidebar.css';
import siderbarlogo from '../asset/primary-logo.svg';

import { useAuth } from '../components/context/AuthContext';

function Sidebar({ mobileOpen = false, onCloseMobile }) {
  const location = useLocation(); 
  const rawRoles = localStorage.getItem('role');
  const userRoles = rawRoles ? JSON.parse(rawRoles) : [];

  const isAdmin = userRoles.includes('Admin');
  const isHR = userRoles.includes('HR');
  const isManager = userRoles.includes('Manager');
  const isIT = userRoles.includes('IT');

  const isActivePath = (prefix) => location.pathname.startsWith(prefix);
  const handleNavClick = () => {
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="sidebar-mobile-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <div className={`sidebar flex flex-col items-start ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-scroll">
          <div className="p-[20px] mb-[10px] w-full flex items-center justify-between">
            <NavLink to="/v1/home" onClick={handleNavClick}>
              <img src={siderbarlogo} className="w-[100%]" alt="sidebar logo" loading="lazy" />
            </NavLink>
            {mobileOpen && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="sidebar-close-btn"
                aria-label="Close navigation menu"
              >
                <X size={20} color="#FFFFFF" />
              </button>
            )}
          </div>

          <NavLink
            to="/v2/home"
            onClick={handleNavClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '0 16px 14px 16px',
              padding: '8px 12px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #21093D 0%, #382451 100%)',
              color: '#60F61B',
              border: '1px solid rgba(96, 246, 27, 0.4)',
              fontSize: '12px',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(33, 9, 61, 0.25)',
            }}
          >
            <span>✨</span> Modern UI (Shadcn)
          </NavLink>

          <NavLink to="/v1/home" onClick={handleNavClick} className={({ isActive }) => `icon-button ${isActive ? 'active' : ''}`}>
            <LayoutDashboard /> Dashboard
          </NavLink>

          <NavLink to="/v1/profile/profile" onClick={handleNavClick} className={`icon-button ${isActivePath('/v1/profile') || isActivePath('/profile') ? 'active' : ''}`}>
            <UserCog /> Self Service
          </NavLink>

          {(isAdmin || isHR) && (
            <NavLink to="/v1/employeehub/dashboard" onClick={handleNavClick} className={`icon-button ${isActivePath('/v1/employeehub') || isActivePath('/employeehub') ? 'active' : ''}`}>
              <UserCircle /> Employees Hub
            </NavLink>
          )}

          {(isAdmin || isHR) && (
            <NavLink to="/v1/hrrequests" onClick={handleNavClick} className={`icon-button ${isActivePath('/v1/hrrequests') || isActivePath('/hrrequests') ? 'active' : ''}`}>
              <GitPullRequest /> HR Requests
            </NavLink>
          )}

          {(isAdmin || isIT) && (
            <NavLink to="/v1/assets/dashboard" onClick={handleNavClick} className={`icon-button ${isActivePath('/v1/assets') || isActivePath('/assets') ? 'active' : ''}`}>
              <Wrench /> Assets
            </NavLink>
          )}

          <NavLink to="/v1/attendance/daily" onClick={handleNavClick} className={`icon-button ${isActivePath('/v1/attendance') || isActivePath('/attendance') ? 'active' : ''}`}>
            <Calendar /> Attendance
          </NavLink>

          <NavLink to="/v1/pay/pay" onClick={handleNavClick} className={`icon-button ${isActivePath('/v1/pay') || isActivePath('/pay') ? 'active' : ''}`}>
            <Wallet /> Payroll
          </NavLink>

          <NavLink to="/v1/leaves/dashboard" onClick={handleNavClick} className={`icon-button ${isActivePath('/v1/leaves') || isActivePath('/leaves') ? 'active' : ''}`}>
            <Archive /> Leaves
          </NavLink>

          <NavLink to="/v1/team/myteam" onClick={handleNavClick} className={`icon-button ${isActivePath('/v1/team') || isActivePath('/team') ? 'active' : ''}`}>
            <Users /> Team
          </NavLink>

          {isAdmin && (
            <NavLink to="/v1/mgmt/announcements" onClick={handleNavClick} className={`icon-button ${isActivePath('/v1/mgmt') || isActivePath('/mgmt') ? 'active' : ''}`}>
              <ShieldCheck /> Management
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
