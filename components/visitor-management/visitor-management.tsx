"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UsersTab } from "./users-tab"
import { VisitorsTab } from "./visitors-tab"
import { AppointmentsTab } from "./appointments-tab"
import { VisitorLogsTab } from "./visitor-logs-tab"

export function VisitorManagement() {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Visitor Management</h1>
        <p className="text-muted-foreground">Manage users, visitors, appointments, and visitor logs.</p>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="visitors">Visitors</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="logs">Visitor Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage user accounts with details like name, role, and department.</CardDescription>
            </CardHeader>
            <CardContent>
              <UsersTab />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visitors">
          <Card>
            <CardHeader>
              <CardTitle>Visitors</CardTitle>
              <CardDescription>Maintain a database with visitor details.</CardDescription>
            </CardHeader>
            <CardContent>
              <VisitorsTab />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>Create, view, and manage visitor appointments.</CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentsTab />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Visitor Logs</CardTitle>
              <CardDescription>Track visitor entries and exits with timestamps and entry methods.</CardDescription>
            </CardHeader>
            <CardContent>
              <VisitorLogsTab />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

