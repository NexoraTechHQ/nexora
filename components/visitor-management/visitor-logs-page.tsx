"use client"

import { VisitorLogsTab } from "./visitor-logs-tab"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useVisitorManagementViewModel } from "@/lib/view-models/visitor-management-view-model"

export function VisitorLogsPage() {
  const { isLoading, error, visitorLogs } = useVisitorManagementViewModel()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold tracking-tight">Visitor Logs</h1>
        <p className="text-muted-foreground">Track visitor entries and exits with detailed logs.</p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-md">
          <p className="text-sm text-destructive">Error loading visitor logs. Please try refreshing.</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Visitor Activity Logs</CardTitle>
          <CardDescription className="text-sm">View and filter visitor check-in and check-out records.</CardDescription>
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
    </div>
  )
}

