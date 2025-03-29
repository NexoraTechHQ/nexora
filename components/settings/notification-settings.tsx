"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)

    // Simulate saving
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold tracking-tight">Notification Settings</h1>
        <p className="text-muted-foreground">Configure how and when you receive notifications.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Email Notifications</CardTitle>
          <CardDescription className="text-sm">Configure email notification preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">New Visitor Appointments</p>
                <p className="text-xs text-muted-foreground">
                  Receive notifications when new appointments are scheduled.
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Visitor Check-ins</p>
                <p className="text-xs text-muted-foreground">Receive notifications when visitors check in.</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">System Updates</p>
                <p className="text-xs text-muted-foreground">
                  Receive notifications about system updates and maintenance.
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">In-App Notifications</CardTitle>
          <CardDescription className="text-sm">Configure in-app notification preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Real-time Alerts</p>
                <p className="text-xs text-muted-foreground">Show real-time notifications in the dashboard.</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Daily Summary</p>
                <p className="text-xs text-muted-foreground">Receive a daily summary of visitor activity.</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Preferences"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

