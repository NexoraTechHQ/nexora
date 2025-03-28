"use client"

import { Bell, Menu, Search } from "lucide-react"
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

interface HeaderProps {
  onMenuClick: () => void
}

export function DashboardHeader({ onMenuClick }: HeaderProps) {
  const isMobile = useIsMobile()

  return (
    <header className="sticky top-0 z-10 flex h-12 items-center gap-3 border-b bg-background px-3 md:px-4">
      <Button variant="ghost" size="icon" onClick={onMenuClick} className="h-8 w-8 md:hidden">
        <Menu className="h-4 w-4" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      {!isMobile && (
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full h-8 bg-background pl-8 md:w-[240px] lg:w-[280px] text-sm"
          />
        </div>
      )}

      <div className="ml-auto flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-primary"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[280px]">
            <DropdownMenuLabel className="text-xs font-medium">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[280px] overflow-auto">
              <DropdownMenuItem className="cursor-pointer py-2">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-medium">New visitor appointment</p>
                  <p className="text-xs text-muted-foreground">Sarah Johnson at 2:30 PM</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-2">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-medium">Access request approved</p>
                  <p className="text-xs text-muted-foreground">For Michael Brown</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-2">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-medium">System update completed</p>
                  <p className="text-xs text-muted-foreground">Facial recognition module updated</p>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center text-primary text-xs">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                JD
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuLabel className="text-xs font-medium">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-xs">Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-xs">Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

