"use client"

import { Bell, Menu, Search, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useIsMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/lib/auth/auth-provider"
import Link from "next/link"

interface HeaderProps {
  onMenuClick: () => void
}

export function DashboardHeader({ onMenuClick }: HeaderProps) {
  const isMobile = useIsMobile()
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-card px-4 md:px-6">
      {isMobile && (
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="h-9 w-9 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      )}

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search..." className="w-full h-9 pl-9 md:w-[280px] lg:w-[320px]" />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-md">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[320px]">
            <DropdownMenuLabel className="text-sm font-medium">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[320px] overflow-auto">
              <DropdownMenuItem className="cursor-pointer py-2">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">New visitor appointment</p>
                  <p className="text-xs text-muted-foreground">Sarah Johnson at 2:30 PM</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-2">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Access request approved</p>
                  <p className="text-xs text-muted-foreground">For Michael Brown</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-2">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">System update completed</p>
                  <p className="text-xs text-muted-foreground">Facial recognition module updated</p>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center text-primary text-sm">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {!isMobile && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-md">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary text-sm">
                  {user?.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "U"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[220px]">
              <DropdownMenuLabel className="text-sm font-medium">
                {user?.name || "User"}
                <p className="text-xs font-normal text-muted-foreground mt-1">{user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-sm">
                <Link href="/dashboard/settings" className="flex items-center w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}

