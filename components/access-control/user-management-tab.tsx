"use client"

import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

export function UserManagementTab() {
  return (
    <div className="flex items-center justify-center h-[400px] text-center">
      <div className="flex flex-col items-center gap-2 max-w-md">
        <Camera className="h-10 w-10 text-muted-foreground/60" />
        <h3 className="text-base font-semibold">User Management</h3>
        <p className="text-muted-foreground">
          This section will allow you to register users, assign access rights, and manage facial recognition data.
        </p>
        <Button className="mt-4">Coming Soon</Button>
      </div>
    </div>
  )
}

