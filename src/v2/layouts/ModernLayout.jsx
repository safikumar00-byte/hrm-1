import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ModernSidebar } from './ModernSidebar';
import { ModernTopBar } from './ModernTopBar';

export default function ModernLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground flex flex-col antialiased">
      {/* Top Brand Notification Banner */}
      <div className="bg-[#21093D] text-white px-4 py-1.5 text-xs flex items-center justify-between border-b border-[#60F61B]/20 shrink-0">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-[#60F61B] animate-pulse" />
          <span className="font-bold text-[#60F61B]">HRMS 2.0 Theme</span>
          <span className="text-white/60 hidden sm:inline">• Powered by Shadcn UI & Tailwind v4</span>
        </div>
        <div className="text-[11px] text-white/75">
          Theme Mode: <span className="font-extrabold text-[#60F61B]">Neon Brand (#60F61B)</span>
        </div>
      </div>

      {/* Main App Body */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Modern Sidebar */}
        <ModernSidebar
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Content Shell */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
          <ModernTopBar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
