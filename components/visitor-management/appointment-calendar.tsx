"use client"

import { useState } from "react"
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns"
import { cn } from "@/lib/utils"
import type { Appointment } from "@/lib/types/models"

interface AppointmentCalendarProps {
  date: Date
  view: "day" | "week" | "month"
  appointments?: Appointment[]
}

export function AppointmentCalendar({ date, view, appointments = [] }: AppointmentCalendarProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null)

  // Generate time slots for the day view (9 AM to 6 PM)
  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = i + 9 // Start from 9 AM
    return `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? "PM" : "AM"}`
  })

  // Generate days for the week view
  const weekStart = startOfWeek(date, { weekStartsOn: 1 }) // Start from Monday
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 })
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  // Filter appointments for the selected date
  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((appointment) => isSameDay(new Date(appointment.date), date))
  }

  // Render day view
  const renderDayView = () => (
    <div className="flex flex-col">
      <div className="text-center py-1.5 font-medium border-b text-sm">{format(date, "EEEE, MMMM d, yyyy")}</div>
      <div className="grid grid-cols-[80px_1fr] h-[500px] overflow-auto">
        <div className="border-r">
          {timeSlots.map((time, index) => (
            <div key={index} className="h-16 border-b p-1.5 text-xs text-muted-foreground">
              {time}
            </div>
          ))}
        </div>
        <div className="relative">
          {timeSlots.map((_, index) => (
            <div key={index} className="h-16 border-b"></div>
          ))}

          {getAppointmentsForDate(date).map((appointment) => {
            // Calculate position based on start time
            const [startHour, startMinute] = appointment.startTime.split(":").map(Number)
            const [endHour, endMinute] = appointment.endTime.split(":").map(Number)

            const startPosition = (startHour - 9) * 64 + (startMinute / 60) * 64
            const duration = (((endHour - startHour) * 60 + (endMinute - startMinute)) / 60) * 64

            return (
              <div
                key={appointment.id}
                className={cn(
                  "absolute left-1 right-1 rounded-md p-1.5 text-xs",
                  "bg-primary/10 border border-primary/20 hover:bg-primary/20 cursor-pointer",
                  selectedAppointment === appointment.id && "ring-1 ring-primary",
                )}
                style={{
                  top: `${startPosition}px`,
                  height: `${duration}px`,
                }}
                onClick={() => setSelectedAppointment(selectedAppointment === appointment.id ? null : appointment.id)}
              >
                <div className="font-medium text-sm">{appointment.visitorName}</div>
                <div className="text-xs text-muted-foreground">
                  {appointment.startTime} - {appointment.endTime}
                </div>
                {selectedAppointment === appointment.id && (
                  <div className="mt-0.5 text-xs">
                    <div>{appointment.purpose}</div>
                    <div>{appointment.location}</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  // Render week view
  const renderWeekView = () => (
    <div className="flex flex-col">
      <div className="grid grid-cols-7 border-b">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={cn(
              "text-center py-1.5 font-medium text-sm",
              isSameDay(day, new Date()) && "bg-muted rounded-t-md",
            )}
          >
            <div>{format(day, "EEE")}</div>
            <div className="text-xs">{format(day, "d")}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[80px_1fr] h-[500px] overflow-auto">
        <div className="border-r">
          {timeSlots.map((time, index) => (
            <div key={index} className="h-16 border-b p-1.5 text-xs text-muted-foreground">
              {time}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {weekDays.map((day, dayIndex) => (
            <div key={dayIndex} className="relative border-r">
              {timeSlots.map((_, timeIndex) => (
                <div key={timeIndex} className={cn("h-16 border-b", isSameDay(day, new Date()) && "bg-muted/50")}></div>
              ))}

              {getAppointmentsForDate(day).map((appointment) => {
                // Calculate position based on start time
                const [startHour, startMinute] = appointment.startTime.split(":").map(Number)
                const [endHour, endMinute] = appointment.endTime.split(":").map(Number)

                const startPosition = (startHour - 9) * 64 + (startMinute / 60) * 64
                const duration = (((endHour - startHour) * 60 + (endMinute - startMinute)) / 60) * 64

                return (
                  <div
                    key={appointment.id}
                    className={cn(
                      "absolute left-0.5 right-0.5 rounded-md p-1 text-xs",
                      "bg-primary/10 border border-primary/20 hover:bg-primary/20 cursor-pointer",
                      selectedAppointment === appointment.id && "ring-1 ring-primary",
                    )}
                    style={{
                      top: `${startPosition}px`,
                      height: `${duration}px`,
                    }}
                    onClick={() =>
                      setSelectedAppointment(selectedAppointment === appointment.id ? null : appointment.id)
                    }
                  >
                    <div className="font-medium text-sm truncate">{appointment.visitorName}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {appointment.startTime} - {appointment.endTime}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Render month view
  const renderMonthView = () => (
    <div className="flex flex-col">
      <div className="text-center py-1.5 font-medium border-b text-sm">{format(date, "MMMM yyyy")}</div>
      <div className="grid grid-cols-7 h-[500px]">
        {/* Month view implementation would go here */}
        <div className="col-span-7 flex items-center justify-center h-full text-sm text-muted-foreground">
          Month view coming soon
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-background">
      {view === "day" && renderDayView()}
      {view === "week" && renderWeekView()}
      {view === "month" && renderMonthView()}
    </div>
  )
}

