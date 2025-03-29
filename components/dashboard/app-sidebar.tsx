"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Calendar, KeyRound, Users, Bell, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/lib/auth/auth-provider"
import { LayoutDashboard, UserCircle, CalendarClock, ClipboardList, FileText, Scan, CalendarRange } from "lucide-react"

interface AppInfo {
  id: string
  name: string
  icon: React.ElementType
  path: string
  color: string
}

export function AppSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  // Define the apps
  const apps: AppInfo[] = [
    {
      id: "vms",
      name: "Visitor Management",
      icon: Users,
      path: "/dashboard/visitor-management",
      color: "bg-blue-500",
    },
    {
      id: "access",
      name: "Access Control",
      icon: KeyRound,
      path: "/dashboard/access-control",
      color: "bg-emerald-500",
    },
    {
      id: "calendar",
      name: "Calendar",
      icon: Calendar,
      path: "/dashboard/calendar",
      color: "bg-amber-500",
    },
  ]

  // Determine active app
  const getActiveApp = (): string | null => {
    // Special paths that shouldn't have any app-specific sidebar
    const settingsPaths = ["/dashboard/settings"]
    if (settingsPaths.some((path) => pathname.startsWith(path))) {
      return "settings" // Return settings for the settings sidebar
    }

    // If on main dashboard, default to VMS
    if (pathname === "/dashboard") {
      return "vms"
    }

    // Otherwise check which app path matches
    for (const app of apps) {
      if (pathname.startsWith(app.path)) {
        return app.id
      }
    }
    return "vms" // Default to VMS
  }

  const activeApp = getActiveApp()

  // Check if an app is active (including dashboard for VMS)
  const isAppActive = (appId: string): boolean => {
    if (appId === "vms" && pathname === "/dashboard") {
      return true
    }
    const app = apps.find((a) => a.id === appId)
    return app ? pathname.startsWith(app.path) : false
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-full flex-col md:flex-row">
        {/* App Launcher Sidebar */}
        <div className="w-16 h-full bg-card border-r flex flex-col items-center py-4">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center justify-center mb-6">
            <div className="h-10 w-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
              N
            </div>
          </Link>

          {/* App Icons */}
          <div className="flex flex-col items-center gap-4 mt-2">
            {apps.map((app) => (
              <Tooltip key={app.id}>
                <TooltipTrigger asChild>
                  <Link
                    href={app.id === "vms" ? "/dashboard" : app.path}
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-md transition-all",
                      isAppActive(app.id) ? `${app.color} text-white` : "bg-muted hover:bg-muted/80",
                    )}
                  >
                    <app.icon className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{app.name}</TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* User Avatar at Bottom */}
          <div className="mt-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/dashboard/settings">
                  <Avatar className="h-10 w-10 border-2 border-transparent hover:border-primary transition-all">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user?.name || "User"} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user?.name
                        ? user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* App-specific Menu Sidebar */}
        <div className="w-64 h-full overflow-hidden">
          {activeApp === "vms" && <VisitorManagementSidebar />}
          {activeApp === "access" && <AccessControlSidebar />}
          {activeApp === "calendar" && <CalendarSidebar />}
          {activeApp === "settings" && <SettingsSidebar />}
        </div>
      </div>
    </TooltipProvider>
  )
}

function VisitorManagementSidebar() {
  const pathname = usePathname()

  // Check if we're on the main dashboard
  const isDashboard = pathname === "/dashboard"

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
    <div className="h-full flex flex-col bg-background border-r">
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
              href={item.title === "Dashboard" && isDashboard ? "/dashboard" : item.path}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                item.isActive ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50 text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

function AccessControlSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { title: "Dashboard", path: "/dashboard/access-control", icon: LayoutDashboard },
    { title: "User Management", path: "/dashboard/access-control/users", icon: Users },
    { title: "Access Logs", path: "/dashboard/access-control/logs", icon: FileText },
    { title: "Facial Recognition", path: "/dashboard/access-control/facial-recognition", icon: Scan },
  ]

  return (
    <div className="h-full flex flex-col bg-background border-r">
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
                pathname === item.path
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
  )
}

function CalendarSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { title: "My Calendar", path: "/dashboard/calendar", icon: Calendar },
    { title: "Appointments", path: "/dashboard/calendar/appointments", icon: CalendarClock },
    { title: "Scheduling", path: "/dashboard/calendar/scheduling", icon: CalendarRange },
  ]

  return (
    <div className="h-full flex flex-col bg-background border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-amber-500" />
          Calendar
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
                pathname === item.path
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
  )
}

function SettingsSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "General",
      path: "/dashboard/settings/profile",
      icon: UserCircle,
      isActive: pathname === "/dashboard/settings/profile" || pathname === "/dashboard/settings",
    },
    {
      title: "Account",
      path: "/dashboard/settings/account",
      icon: Users,
      isActive: pathname === "/dashboard/settings/account",
    },
    {
      title: "Appearance",
      path: "/dashboard/settings/appearance",
      icon: Settings,
      isActive: pathname === "/dashboard/settings/appearance",
    },
    {
      title: "Notifications",
      path: "/dashboard/settings/notifications",
      icon: Bell,
      isActive: pathname === "/dashboard/settings/notifications",
    },
  ]

  return (
    <div className="h-full flex flex-col bg-background border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Settings className="h-5 w-5 text-gray-500" />
          Settings
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
                item.isActive ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50 text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

