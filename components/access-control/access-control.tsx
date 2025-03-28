"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserManagementTab } from "./user-management-tab"
import { AccessLogsTab } from "./access-logs-tab"
import { FacialRecognitionTab } from "./facial-recognition-tab"

export function AccessControl() {
  const [activeTab, setActiveTab] = useState("user-management")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Access Control</h1>
        <p className="text-muted-foreground">Manage user access, view access logs, and configure facial recognition.</p>
      </div>

      <Tabs defaultValue="user-management" className="space-y-4">
        <TabsList>
          <TabsTrigger value="user-management">User Management</TabsTrigger>
          <TabsTrigger value="access-logs">Access Logs</TabsTrigger>
          <TabsTrigger value="facial-recognition">Facial Recognition</TabsTrigger>
        </TabsList>

        <TabsContent value="user-management">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Register users and assign access rights.</CardDescription>
            </CardHeader>
            <CardContent>
              <UserManagementTab />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access-logs">
          <Card>
            <CardHeader>
              <CardTitle>Access Logs</CardTitle>
              <CardDescription>View records of access events with timestamps and recognition details.</CardDescription>
            </CardHeader>
            <CardContent>
              <AccessLogsTab />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facial-recognition">
          <Card>
            <CardHeader>
              <CardTitle>Facial Recognition</CardTitle>
              <CardDescription>Configure facial recognition features and settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <FacialRecognitionTab />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

