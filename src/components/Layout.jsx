// Layout.jsx
import React, { useState, Suspense } from 'react';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import logo from '../asset/logo.svg';
import PageSkeleton from './skeletons/PageSkeleton';
import './Layout.css';

function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const onboardingStatus = user?.onboardingStatus?.toLowerCase();
  const isOnboarding = onboardingStatus === 'pending' || onboardingStatus === 'inprogress';

  if (isOnboarding) return null;

  return (
    <div className="layout-container">
      <img
        src={logo}
        alt="Background Logo"
        className="absolute top-1/2 left-1/2 w-[500px] opacity-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
      />
      <div className="relative z-10 flex h-screen overflow-hidden">
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />
        <div className="flex flex-col h-screen w-full min-w-0 overflow-hidden">
          <TopBar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
          <main className="flex-1 overflow-y-auto overflow-x-hidden min-w-0 w-full" id="classic-main-scroll">
            <Suspense fallback={<PageSkeleton />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
