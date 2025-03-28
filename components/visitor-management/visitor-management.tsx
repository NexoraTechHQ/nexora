"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { UsersTab } from "./users-tab"
import { VisitorsTab } from "./visitors-tab"
import { AppointmentsTab } from "./appointments-tab"
import { VisitorLogsTab } from "./visitor-logs-tab"
import { useVisitorManagementViewModel } from "@/lib/view-models/visitor-management-view-model"

export function VisitorManagement() {
  const [activeTab, setActiveTab] = useState("users")
  const { isLoading, error, users, visitors, visitorLogs, appointments, refreshData } = useVisitorManagementViewModel()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold tracking-tight">Visitor Management</h1>
        <p className="text-muted-foreground">Manage users, visitors, appointments, and visitor logs.</p>
      </div>

      {error && (
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-3">
            <p className="text-sm text-destructive">Error loading visitor management data. Please try refreshing.</p>
          </CardContent>
        </Card>
      )}

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
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full max-w-sm" />
                  <Skeleton className="h-[400px] w-full" />
                </div>
              ) : (
                <UsersTab users={users || []} />
              )}
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
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full max-w-sm" />
                  <Skeleton className="h-[400px] w-full" />
                </div>
              ) : (
                <VisitorsTab visitors={visitors || []} />
              )}
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
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-[400px] w-full" />
                </div>
              ) : (
                <AppointmentsTab appointments={appointments || []} />
              )}
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
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full max-w-sm" />
                  <Skeleton className="h-[400px] w-full" />
                </div>
              ) : (
                <VisitorLogsTab logs={visitorLogs || []} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

