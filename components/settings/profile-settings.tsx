"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth/auth-provider"

export function ProfileSettings() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for demonstration
  const [userData, setUserData] = useState({
    name: user?.name || "John Doe",
    department: "IT Department",
    joinDate: "January 15, 2023",
    jobTitle: "System Administrator",
  })

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
        <h1 className="text-lg font-semibold tracking-tight">General Settings</h1>
        <p className="text-muted-foreground">Manage your profile information and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Profile Information</CardTitle>
          <CardDescription className="text-sm">Update your personal information and profile details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24 rounded-md">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                  <AvatarFallback className="text-lg">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
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
                    <Input id="firstName" defaultValue={userData.name.split(" ")[0]} className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm">
                      Last Name
                    </Label>
                    <Input id="lastName" defaultValue={userData.name.split(" ")[1] || ""} className="h-9" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-sm">
                    Job Title
                  </Label>
                  <Input id="jobTitle" defaultValue={userData.jobTitle} className="h-9" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-sm">
                    Department
                  </Label>
                  <Input id="department" defaultValue={userData.department} className="h-9" />
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
    </div>
  )
}

