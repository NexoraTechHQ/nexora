"use client"

import { CalendarIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

export function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground">View and manage your schedule and appointments.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-amber-500" />
              <span>My Calendar</span>
            </CardTitle>
            <CardDescription>Select a date to view or create appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled appointments for {date?.toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {date ? (
                <div className="text-center py-8 text-muted-foreground">No appointments scheduled for this date</div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">Select a date to view appointments</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

