"use client"

import { useState } from "react"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns"
import { cn } from "@/lib/utils"

interface AppointmentCalendarProps {
  date: Date
  view: "day" | "week" | "month"
}

// Mock data for appointments
const appointments = [
  {
    id: "A001",
    visitorName: "Emily Parker",
    visitorEmail: "emily.p@example.com",
    hostName: "John Smith",
    date: new Date(),
    startTime: "14:30", // 2:30 PM
    endTime: "15:30", // 3:30 PM
    location: "Conference Room A",
    purpose: "Interview",
  },
  {
    id: "A002",
    visitorName: "Alex Rodriguez",
    visitorEmail: "alex.r@example.com",
    hostName: "Lisa Johnson",
    date: new Date(),
    startTime: "15:00", // 3:00 PM
    endTime: "16:00", // 4:00 PM
    location: "Meeting Room 2",
    purpose: "Client Meeting",
  },
  {
    id: "A003",
    visitorName: "Sophia Williams",
    visitorEmail: "sophia.w@example.com",
    hostName: "David Chen",
    date: new Date(),
    startTime: "16:15", // 4:15 PM
    endTime: "17:00", // 5:00 PM
    location: "Office 305",
    purpose: "Contract Signing",
  },
  {
    id: "A004",
    visitorName: "Marcus Lee",
    visitorEmail: "marcus.l@example.com",
    hostName: "Sarah Thompson",
    date: addDays(new Date(), 1),
    startTime: "10:00", // 10:00 AM
    endTime: "11:30", // 11:30 AM
    location: "Conference Room B",
    purpose: "Project Discussion",
  },
  {
    id: "A005",
    visitorName: "Rachel Green",
    visitorEmail: "rachel.g@example.com",
    hostName: "Michael Brown",
    date: addDays(new Date(), 2),
    startTime: "13:00", // 1:00 PM
    endTime: "14:00", // 2:00 PM
    location: "Meeting Room 1",
    purpose: "Vendor Meeting",
  },
]

export function AppointmentCalendar({ date, view }: AppointmentCalendarProps) {
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
      <div className="text-center py-2 font-medium border-b">{format(date, "EEEE, MMMM d, yyyy")}</div>
      <div className="grid grid-cols-[100px_1fr] h-[600px] overflow-auto">
        <div className="border-r">
          {timeSlots.map((time, index) => (
            <div key={index} className="h-20 border-b p-2 text-xs text-muted-foreground">
              {time}
            </div>
          ))}
        </div>
        <div className="relative">
          {timeSlots.map((_, index) => (
            <div key={index} className="h-20 border-b"></div>
          ))}

          {getAppointmentsForDate(date).map((appointment) => {
            // Calculate position based on start time
            const [startHour, startMinute] = appointment.startTime.split(":").map(Number)
            const [endHour, endMinute] = appointment.endTime.split(":").map(Number)

            const startPosition = (startHour - 9) * 80 + (startMinute / 60) * 80
            const duration = (((endHour - startHour) * 60 + (endMinute - startMinute)) / 60) * 80

            return (
              <div
                key={appointment.id}
                className={cn(
                  "absolute left-1 right-1 rounded-md p-2 text-xs",
                  "bg-primary/10 border border-primary/20 hover:bg-primary/20 cursor-pointer",
                  selectedAppointment === appointment.id && "ring-2 ring-primary",
                )}
                style={{
                  top: `${startPosition}px`,
                  height: `${duration}px`,
                }}
                onClick={() => setSelectedAppointment(selectedAppointment === appointment.id ? null : appointment.id)}
              >
                <div className="font-medium">{appointment.visitorName}</div>
                <div className="text-muted-foreground">
                  {appointment.startTime} - {appointment.endTime}
                </div>
                {selectedAppointment === appointment.id && (
                  <div className="mt-1 text-xs">
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
            className={cn("text-center py-2 font-medium", isSameDay(day, new Date()) && "bg-muted rounded-t-md")}
          >
            <div>{format(day, "EEE")}</div>
            <div className="text-sm">{format(day, "d")}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[100px_1fr] h-[600px] overflow-auto">
        <div className="border-r">
          {timeSlots.map((time, index) => (
            <div key={index} className="h-20 border-b p-2 text-xs text-muted-foreground">
              {time}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {weekDays.map((day, dayIndex) => (
            <div key={dayIndex} className="relative border-r">
              {timeSlots.map((_, timeIndex) => (
                <div key={timeIndex} className={cn("h-20 border-b", isSameDay(day, new Date()) && "bg-muted/50")}></div>
              ))}

              {getAppointmentsForDate(day).map((appointment) => {
                // Calculate position based on start time
                const [startHour, startMinute] = appointment.startTime.split(":").map(Number)
                const [endHour, endMinute] = appointment.endTime.split(":").map(Number)

                const startPosition = (startHour - 9) * 80 + (startMinute / 60) * 80
                const duration = (((endHour - startHour) * 60 + (endMinute - startMinute)) / 60) * 80

                return (
                  <div
                    key={appointment.id}
                    className={cn(
                      "absolute left-1 right-1 rounded-md p-1 text-xs",
                      "bg-primary/10 border border-primary/20 hover:bg-primary/20 cursor-pointer",
                      selectedAppointment === appointment.id && "ring-2 ring-primary",
                    )}
                    style={{
                      top: `${startPosition}px`,
                      height: `${duration}px`,
                    }}
                    onClick={() =>
                      setSelectedAppointment(selectedAppointment === appointment.id ? null : appointment.id)
                    }
                  >
                    <div className="font-medium truncate">{appointment.visitorName}</div>
                    <div className="text-muted-foreground truncate">
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
      <div className="text-center py-2 font-medium border-b">{format(date, "MMMM yyyy")}</div>
      <div className="grid grid-cols-7 h-[600px]">
        {/* Month view implementation would go here */}
        <div className="col-span-7 flex items-center justify-center h-full text-muted-foreground">
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

