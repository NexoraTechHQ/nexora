"use client"

import { VisitorsTab } from "./visitors-tab"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useVisitorManagementViewModel } from "@/lib/view-models/visitor-management-view-model"

export function VisitorsPage() {
  const { isLoading, error, visitors } = useVisitorManagementViewModel()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold tracking-tight">Visitors</h1>
        <p className="text-muted-foreground">Maintain a database with visitor details and history.</p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-md">
          <p className="text-sm text-destructive">Error loading visitor data. Please try refreshing.</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Visitors Database</CardTitle>
          <CardDescription className="text-sm">View and manage visitor information and visit history.</CardDescription>
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
    </div>
  )
}

