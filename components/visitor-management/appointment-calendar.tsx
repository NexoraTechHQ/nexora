"use client"

import { useState, useEffect } from "react"
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  startOfMonth,
  endOfMonth,
  isSameMonth,
} from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"
import type { Appointment } from "@/lib/types/models"

interface AppointmentCalendarProps {
  date: Date
  view: "day" | "week" | "month"
  appointments: Appointment[]
  isLoading?: boolean
}

export function AppointmentCalendar({ date, view, appointments, isLoading = false }: AppointmentCalendarProps) {
  const [calendarDays, setCalendarDays] = useState<Date[]>([])

  // Update calendar days when date or view changes
  useEffect(() => {
    let days: Date[] = []

    if (view === "day") {
      days = [date]
    } else if (view === "week") {
      const start = startOfWeek(date, { weekStartsOn: 1 }) // Start on Monday
      const end = endOfWeek(date, { weekStartsOn: 1 })
      days = eachDayOfInterval({ start, end })
    } else if (view === "month") {
      const start = startOfMonth(date)
      const end = endOfMonth(date)
      days = eachDayOfInterval({ start, end })
    }

    setCalendarDays(days)
  }, [date, view])

  // Filter appointments for a specific day
  const getAppointmentsForDay = (day: Date) => {
    return appointments
      .filter((appointment) => {
        const appointmentDate = new Date(appointment.date)
        return isSameDay(appointmentDate, day)
      })
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
  }

  // Render loading skeleton
  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(view === "day" ? 1 : view === "week" ? 7 : 30)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="border rounded-md p-3 space-y-2">
                <Skeleton className="h-5 w-24" />
                <div className="space-y-2">
                  {Array(Math.floor(Math.random() * 3) + 1)
                    .fill(0)
                    .map((_, idx) => (
                      <Skeleton key={idx} className="h-12 w-full" />
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  }

  // Render calendar based on view
  if (view === "day") {
    const dayAppointments = getAppointmentsForDay(date)

    return (
      <div className="p-4">
        <h3 className="text-sm font-medium mb-4">{format(date, "EEEE, MMMM d, yyyy")}</h3>
        <div className="space-y-2">
          {dayAppointments.length > 0 ? (
            dayAppointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-md p-2 hover:bg-accent transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-xs">{appointment.visitorName}</p>
                    <p className="text-[10px] text-muted-foreground">with {appointment.hostName}</p>
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {appointment.startTime} - {appointment.endTime}
                  </div>
                </div>
                <div className="mt-1 text-[10px]">
                  <p>{appointment.purpose}</p>
                  <p className="text-muted-foreground">{appointment.location}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xs text-muted-foreground py-4">No appointments scheduled for this day.</p>
          )}
        </div>
      </div>
    )
  }

  // Week or Month view
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {calendarDays.map((day) => {
          const dayAppointments = getAppointmentsForDay(day)
          const isCurrentMonth = view === "month" ? isSameMonth(day, date) : true

          return (
            <div
              key={day.toISOString()}
              className={`border rounded-md overflow-hidden ${!isCurrentMonth ? "opacity-50" : ""} ${
                isSameDay(day, new Date()) ? "border-primary" : ""
              }`}
            >
              <div className="bg-muted/30 p-2 border-b">
                <h4 className="text-xs font-medium">{format(day, "EEE, MMM d")}</h4>
              </div>
              <div className="p-2 space-y-1 max-h-[200px] overflow-y-auto">
                {dayAppointments.length > 0 ? (
                  dayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="text-[10px] p-1 rounded bg-accent/50 hover:bg-accent transition-colors cursor-pointer"
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">{appointment.visitorName}</span>
                        <span className="text-muted-foreground">{appointment.startTime}</span>
                      </div>
                      <p className="truncate">{appointment.purpose}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-[10px] text-muted-foreground py-2">No appointments</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

