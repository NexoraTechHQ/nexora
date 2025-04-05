"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  KeyRound,
  BarChart3,
  Settings,
  ChevronDown,
  User,
  LogOut,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  submenu?: { title: string; href: string }[]
}

export function ImprovedSidebar({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  // Define navigation items
  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Visitor Management",
      href: "/dashboard/visitor-management",
      icon: Users,
      submenu: [
        { title: "Users", href: "/dashboard/visitor-management/users" },
        { title: "Visitors", href: "/dashboard/visitor-management/visitors" },
        { title: "Appointments", href: "/dashboard/visitor-management/appointments" },
        { title: "Visitor Logs", href: "/dashboard/visitor-management/logs" },
      ],
    },
    {
      title: "Access Control",
      href: "/dashboard/access-control",
      icon: KeyRound,
      submenu: [
        { title: "User Management", href: "/dashboard/access-control/users" },
        { title: "Access Logs", href: "/dashboard/access-control/logs" },
        { title: "Facial Recognition", href: "/dashboard/access-control/facial-recognition" },
      ],
    },
    {
      title: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: BarChart3,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  // Toggle submenu expansion
  const toggleExpand = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  // Check if a nav item or its children are active
  const isActive = (item: NavItem) => {
    if (pathname === item.href) return true
    if (item.submenu) {
      return item.submenu.some((subItem) => pathname === subItem.href)
    }
    return false
  }

  // Expand items that contain the current path
  useEffect(() => {
    const newExpandedItems: Record<string, boolean> = {}
    navItems.forEach((item) => {
      if (item.submenu && (pathname === item.href || item.submenu.some((subItem) => pathname === subItem.href))) {
        newExpandedItems[item.title] = true
      }
    })

    if (Object.keys(newExpandedItems).length > 0) {
      setExpandedItems((prev) => ({ ...prev, ...newExpandedItems }))
    }
  }, [pathname])

  // Sidebar content
  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Header with logo */}
      <div className="flex h-14 items-center border-b px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold text-base text-primary"
          onClick={() => isMobile && onOpenChange(false)}
        >
          <span className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
            N
          </span>
          <span>Nexora</span>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <div key={item.title} className="space-y-1">
              {item.submenu ? (
                <>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-10 text-sm px-3 rounded-md",
                      isActive(item) && "bg-accent font-medium text-accent-foreground",
                    )}
                    onClick={() => toggleExpand(item.title)}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    <span className="flex-1 text-left">{item.title}</span>
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", expandedItems[item.title] ? "rotate-180" : "")}
                    />
                  </Button>
                  {expandedItems[item.title] && (
                    <div className="ml-6 space-y-1 pt-1">
                      {item.submenu.map((subItem) => (
                        <Button
                          key={subItem.title}
                          variant="ghost"
                          asChild
                          className={cn(
                            "w-full justify-start h-9 text-sm px-3 rounded-md",
                            pathname === subItem.href && "bg-accent font-medium text-accent-foreground",
                          )}
                        >
                          <Link href={subItem.href} onClick={() => isMobile && onOpenChange(false)}>
                            {subItem.title}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Button
                  variant="ghost"
                  asChild
                  className={cn(
                    "w-full justify-start h-10 text-sm px-3 rounded-md",
                    pathname === item.href && "bg-accent font-medium text-accent-foreground",
                  )}
                >
                  <Link href={item.href} onClick={() => isMobile && onOpenChange(false)}>
                    <item.icon className="mr-2 h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User profile section */}
      <div className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start px-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/login" className="flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  // Use Sheet for mobile and div for desktop
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="p-0 w-[280px] sm:w-[320px] max-w-[85vw]">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop sidebar - collapsed or expanded
  return (
    <TooltipProvider delayDuration={0}>
      <div className="hidden md:flex h-full flex-col w-full">{sidebarContent}</div>
    </TooltipProvider>
  )
}

