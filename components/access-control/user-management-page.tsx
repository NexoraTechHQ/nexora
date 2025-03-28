"use client"

import { UserManagementTab } from "./user-management-tab"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function UserManagementPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Register users and assign access rights for your facility.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Access Control Users</CardTitle>
          <CardDescription>Manage users and their access permissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <UserManagementTab />
        </CardContent>
      </Card>
    </div>
  )
}

