"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, UserCircle, CalendarClock, ClipboardList } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"

interface VisitorManagementLayoutProps {
  children: React.ReactNode
}

export function VisitorManagementLayout({ children }: VisitorManagementLayoutProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Check if we're on the main dashboard page
  const isDashboard = pathname === "/dashboard/visitor-management"

  // Define menu items for visitor management
  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard/visitor-management",
      icon: LayoutDashboard,
      isActive: pathname === "/dashboard/visitor-management" || isDashboard,
    },
    {
      title: "Users",
      path: "/dashboard/visitor-management/users",
      icon: Users,
      isActive: pathname === "/dashboard/visitor-management/users",
    },
    {
      title: "Visitors",
      path: "/dashboard/visitor-management/visitors",
      icon: UserCircle,
      isActive: pathname === "/dashboard/visitor-management/visitors",
    },
    {
      title: "Appointments",
      path: "/dashboard/visitor-management/appointments",
      icon: CalendarClock,
      isActive: pathname === "/dashboard/visitor-management/appointments",
    },
    {
      title: "Visitor Logs",
      path: "/dashboard/visitor-management/logs",
      icon: ClipboardList,
      isActive: pathname === "/dashboard/visitor-management/logs",
    },
  ]

  return (
    <div className="flex h-full">
      {/* App-specific sidebar */}
      {isMobile ? (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-[280px] max-w-full">
            <div className="h-full flex flex-col bg-background">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Visitor Management
                </h2>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <nav className="grid gap-1 px-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        item.isActive
                          ? "bg-accent text-accent-foreground font-medium"
                          : "hover:bg-accent/50 text-foreground",
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <div className="w-64 h-full border-r">
          <div className="h-full flex flex-col bg-background">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Visitor Management
              </h2>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid gap-1 px-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      item.isActive
                        ? "bg-accent text-accent-foreground font-medium"
                        : "hover:bg-accent/50 text-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

