"use client"

import { KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AccessLogsTab() {
  return (
    <div className="flex items-center justify-center h-[400px] text-center">
      <div className="flex flex-col items-center gap-2 max-w-md">
        <KeyRound className="h-10 w-10 text-muted-foreground/60" />
        <h3 className="text-xl font-semibold">Access Logs</h3>
        <p className="text-muted-foreground">
          This section will display records of access events with timestamps and recognition details.
        </p>
        <Button className="mt-4">Coming Soon</Button>
      </div>
    </div>
  )
}

