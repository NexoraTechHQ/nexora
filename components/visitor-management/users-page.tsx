"use client"

import { UsersTab } from "./users-tab"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useVisitorManagementViewModel } from "@/lib/view-models/visitor-management-view-model"

export function UsersPage() {
  const { isLoading, error, users } = useVisitorManagementViewModel()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage user accounts with details like name, role, and department.</p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-md">
          <p className="text-sm text-destructive">Error loading user data. Please try refreshing.</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Users Management</CardTitle>
          <CardDescription className="text-sm">
            Create, edit, and manage user accounts for your organization.
          </CardDescription>
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
    </div>
  )
}

