"use client"

import { Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Settings() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure system settings, tenant information, and user preferences.</p>
      </div>

      <div className="flex items-center justify-center h-[400px] text-center">
        <div className="flex flex-col items-center gap-2 max-w-md">
          <Settings2 className="h-10 w-10 text-muted-foreground/60" />
          <h3 className="text-xl font-semibold">Settings Dashboard</h3>
          <p className="text-muted-foreground">
            This section will allow you to manage company settings, tenant information, notification preferences, and
            system configurations.
          </p>
          <Button className="mt-4">Coming Soon</Button>
        </div>
      </div>
    </div>
  )
}

