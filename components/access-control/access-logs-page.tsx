"use client"

import { AccessLogsTab } from "./access-logs-tab"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AccessLogsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold tracking-tight">Access Logs</h1>
        <p className="text-muted-foreground">View records of access events with timestamps and recognition details.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Access Control Logs</CardTitle>
          <CardDescription>Track and analyze facility access events.</CardDescription>
        </CardHeader>
        <CardContent>
          <AccessLogsTab />
        </CardContent>
      </Card>
    </div>
  )
}

