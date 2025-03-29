"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, FileText, Scan, KeyRound, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"

interface AccessControlLayoutProps {
  children: React.ReactNode
}

export function AccessControlLayout({ children }: AccessControlLayoutProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Check if we're on the main dashboard page
  const isDashboard = pathname === "/dashboard/access-control"

  // Define menu items for access control
  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard/access-control",
      icon: LayoutDashboard,
      isActive: pathname === "/dashboard/access-control" || isDashboard,
    },
    {
      title: "User Management",
      path: "/dashboard/access-control/users",
      icon: Users,
      isActive: pathname === "/dashboard/access-control/users",
    },
    {
      title: "Access Logs",
      path: "/dashboard/access-control/logs",
      icon: FileText,
      isActive: pathname === "/dashboard/access-control/logs",
    },
    {
      title: "Facial Recognition",
      path: "/dashboard/access-control/facial-recognition",
      icon: Scan,
      isActive: pathname === "/dashboard/access-control/facial-recognition",
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
                  <KeyRound className="h-5 w-5 text-emerald-500" />
                  Access Control
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
                <KeyRound className="h-5 w-5 text-emerald-500" />
                Access Control
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
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-card px-4 md:px-6">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-9 w-9 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          <h1 className="text-lg font-semibold">Access Control</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

