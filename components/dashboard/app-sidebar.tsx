"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Calendar, KeyRound, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/lib/auth/auth-provider"

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

  // Check if an app is active
  const isAppActive = (appId: string): boolean => {
    const app = apps.find((a) => a.id === appId)
    if (!app) return false

    // Check if the current path starts with the app path
    return pathname.startsWith(app.path)
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-full flex-col bg-card border-r w-16">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center justify-center h-14 border-b">
          <div className="h-10 w-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
            N
          </div>
        </Link>

        {/* App Icons */}
        <div className="flex flex-col items-center gap-4 mt-6">
          {apps.map((app) => (
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
          ))}
        </div>

        {/* User Avatar at Bottom */}
        <div className="mt-auto mb-6 flex justify-center">
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
    </TooltipProvider>
  )
}

