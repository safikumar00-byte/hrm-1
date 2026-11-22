
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './LayoutsStyle.css';
import { Archive,  LayoutDashboard, List } from 'lucide-react';

const AssetsNavbar = () => {
  return (
    <div>
      <nav className="layouts-navbar">
        <NavLink
          to="/v1/assets/dashboard"
          className={({ isActive }) => `layouts-tab ${isActive ? 'active' : ''}`}
        >
        <LayoutDashboard size={16} />  Dashboard
        </NavLink>
        <NavLink
          to="/v1/assets/list"
          className={({ isActive }) => `layouts-tab ${isActive ? 'active' : ''}`}
        >
         <List size={16} /> Assets List
        </NavLink>
        {/* <NavLink
          to="/v1/assets/category"
          className={({ isActive }) => `layouts-tab ${isActive ? 'active' : ''}`}
        >
          Asset Category
        </NavLink> */}
        {/* <NavLink
          to="/v1/assets/log"
          className={({ isActive }) => `layouts-tab ${isActive ? 'active' : ''}`}
        >
          Assets Log
        </NavLink> */}
        {/* <NavLink
          to="/v1/assets/reports"
          className={({ isActive }) => `assets-tab ${isActive ? 'active' : ''}`}
        >
          Reports
        </NavLink> */}
        <NavLink
          to="/v1/assets/requests"
          className={({ isActive }) => `layouts-tab ${isActive ? 'active' : ''}`}
        >
         <Archive size={16} /> Assets Requests
        </NavLink>
      </nav>
      <div className="layouts-page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AssetsNavbar;
