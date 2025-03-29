"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"

export function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate saving
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-muted/60 p-1 h-10 rounded-md">
          <TabsTrigger value="general" className="rounded-md text-sm">
            General
          </TabsTrigger>
          <TabsTrigger value="password" className="rounded-md text-sm">
            Password
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-md text-sm">
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">General Information</CardTitle>
              <CardDescription className="text-sm">
                Update your personal information and profile settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24 rounded-md">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                      <AvatarFallback className="text-lg">JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="h-9 text-sm">
                      Change Avatar
                    </Button>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm">
                          First Name
                        </Label>
                        <Input id="firstName" defaultValue="John" className="h-9" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm">
                          Last Name
                        </Label>
                        <Input id="lastName" defaultValue="Doe" className="h-9" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm">
                        Email
                      </Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" className="h-9" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobTitle" className="text-sm">
                        Job Title
                      </Label>
                      <Input id="jobTitle" defaultValue="Administrator" className="h-9" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department" className="text-sm">
                        Department
                      </Label>
                      <Input id="department" defaultValue="IT" className="h-9" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="h-9 text-sm">
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="h-9 text-sm" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Change Password</CardTitle>
              <CardDescription className="text-sm">Update your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-sm">
                    Current Password
                  </Label>
                  <Input id="currentPassword" type="password" className="h-9" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm">
                    New Password
                  </Label>
                  <Input id="newPassword" type="password" className="h-9" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm">
                    Confirm New Password
                  </Label>
                  <Input id="confirmPassword" type="password" className="h-9" />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="h-9 text-sm">
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="h-9 text-sm" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Notification Preferences</CardTitle>
              <CardDescription className="text-sm">Configure how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Email Notifications</h3>

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

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">In-App Notifications</h3>

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
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="h-9 text-sm">
                    Reset to Defaults
                  </Button>
                  <Button size="sm" className="h-9 text-sm" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Preferences"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

