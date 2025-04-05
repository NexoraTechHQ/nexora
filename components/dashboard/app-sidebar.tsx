"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Calendar, KeyRound, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/lib/auth/auth-provider"
import { useIsMobile } from "@/hooks/use-mobile"

interface AppInfo {
  id: string
  name: string
  icon: React.ElementType
  path: string
  color: string
}

// Update the AppSidebar component to fix mobile view
export function AppSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const isMobile = useIsMobile()

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

  // Check if an app is active
  const isAppActive = (appId: string): boolean => {
    const app = apps.find((a) => a.id === appId)
    if (!app) return false

    // Check if the current path starts with the app path
    return pathname.startsWith(app.path)
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className={cn("flex h-full flex-col bg-card border-r", isMobile ? "w-full" : "w-16")}>
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center h-12 border-b px-3">
          <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-base font-bold">
            N
          </div>
          {isMobile && <span className="ml-2 font-semibold text-base">Nexora</span>}
        </Link>

        {/* App Icons */}
        <div className={cn("flex flex-col items-center gap-1 mt-3", isMobile && "items-stretch px-2")}>
          {apps.map((app) =>
            isMobile ? (
              <Link
                key={app.id}
                href={app.path}
                className={cn(
                  "flex items-center py-1.5 px-2 rounded-md transition-all text-sm",
                  isAppActive(app.id) ? `${app.color} text-white` : "bg-transparent hover:bg-muted/50",
                )}
              >
                <app.icon className="h-4 w-4 mr-2" />
                <span className="font-medium">{app.name}</span>
              </Link>
            ) : (
              <Tooltip key={app.id}>
                <TooltipTrigger asChild>
                  <Link
                    href={app.path}
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
            ),
          )}
        </div>

        {/* User Avatar at Bottom */}
        <div className={cn("mt-auto mb-3", isMobile ? "px-2" : "flex justify-center")}>
          {isMobile ? (
            <div className="flex items-center p-2 bg-muted/50 rounded-md">
              <Avatar className="h-7 w-7 border border-transparent">
                <AvatarImage src="/placeholder.svg?height=28&width=28" alt={user?.name || "User"} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {user?.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <p className="font-medium text-sm">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground">Settings</p>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}

