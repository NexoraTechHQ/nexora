"use client"

import { AppointmentsTab } from "./appointments-tab"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useVisitorManagementViewModel } from "@/lib/view-models/visitor-management-view-model"

export function AppointmentsPage() {
  const { isLoading, error, appointments } = useVisitorManagementViewModel()

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-base sm:text-lg font-semibold tracking-tight">Appointments</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">Schedule, manage, and track visitor appointments.</p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 p-2 sm:p-3 rounded-md">
          <p className="text-xs sm:text-sm text-destructive">Error loading appointment data. Please try refreshing.</p>
        </div>
      )}

      <Card>
        <CardHeader className="p-3 sm:p-4 md:p-6">
          <CardTitle className="text-sm sm:text-base font-semibold">Appointment Calendar</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Create and manage visitor appointments with an interactive calendar.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6 pt-0 sm:pt-0 md:pt-0">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 sm:h-10 w-full" />
              <Skeleton className="h-[300px] sm:h-[400px] w-full" />
            </div>
          ) : (
            <AppointmentsTab appointments={appointments || []} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

