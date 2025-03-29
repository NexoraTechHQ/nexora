"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardHeader } from "./dashboard-header"
import { AIAssistant } from "../ai-assistant/ai-assistant"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useIsMobile()
  const pathname = usePathname()

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [pathname, isMobile])

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar - always visible on desktop, controlled by state on mobile */}
      <div
        className={cn(
          "fixed inset-y-0 z-20 flex-shrink-0 w-[280px] flex-col bg-card border-r transition-transform duration-300 ease-in-out md:sticky md:translate-x-0 md:h-screen",
          isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0",
        )}
      >
        <DashboardSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col w-full md:w-[calc(100%-280px)] md:ml-auto h-screen overflow-hidden">
        {/* Fixed header */}
        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Overlay for mobile when sidebar is open */}
        {isMobile && sidebarOpen && (
          <div className="fixed inset-0 z-10 bg-black/50" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
        )}

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 h-[calc(100vh-56px)]">{children}</main>

        {/* AI Assistant */}
        <AIAssistant />
      </div>
    </div>
  )
}

