'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { DashboardSidebar } from './dashboard-sidebar';
import { DashboardHeader } from './dashboard-header';
import { useIsMobile } from '@/hooks/use-mobile';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
