"use client"

import { AppointmentsTab } from "./appointments-tab"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useVisitorManagementViewModel } from "@/lib/view-models/visitor-management-view-model"

export function AppointmentsPage() {
  const { isLoading, error, appointments } = useVisitorManagementViewModel()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold tracking-tight">Appointments</h1>
        <p className="text-muted-foreground">Schedule, manage, and track visitor appointments.</p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-md">
          <p className="text-sm text-destructive">Error loading appointment data. Please try refreshing.</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Appointment Calendar</CardTitle>
          <CardDescription className="text-sm">
            Create and manage visitor appointments with an interactive calendar.
          </CardDescription>
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
    </div>
  )
}

