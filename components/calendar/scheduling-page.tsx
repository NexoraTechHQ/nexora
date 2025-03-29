"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SchedulingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold tracking-tight">Scheduling</h1>
        <p className="text-muted-foreground">Configure your availability and scheduling preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scheduling Settings</CardTitle>
          <CardDescription>Configure your availability and scheduling preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">Scheduling settings will appear here</div>
        </CardContent>
      </Card>
    </div>
  )
}

