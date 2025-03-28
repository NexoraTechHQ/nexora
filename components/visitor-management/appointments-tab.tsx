"use client"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { AppointmentCalendar } from "./appointment-calendar"
import type { Appointment } from "@/lib/types/models"

interface AppointmentsTabProps {
  appointments?: Appointment[]
}

export function AppointmentsTab({ appointments = [] }: AppointmentsTabProps) {
  const [date, setDate] = useState<Date>(new Date())
  const [calendarView, setCalendarView] = useState<"day" | "week" | "month">("week")

  const navigateCalendar = (direction: "prev" | "next") => {
    const newDate = new Date(date)

    if (calendarView === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    } else if (calendarView === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    } else if (calendarView === "month") {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    }

    setDate(newDate)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => navigateCalendar("prev")}>
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-7 min-w-[180px] justify-start text-left font-normal text-sm">
                <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                {format(date, "MMMM yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => navigateCalendar("next")}>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-sm font-normal" onClick={() => setDate(new Date())}>
            Today
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border p-0.5">
            <Button
              variant={calendarView === "day" ? "default" : "ghost"}
              size="sm"
              className="h-7 text-sm font-normal"
              onClick={() => setCalendarView("day")}
            >
              Day
            </Button>
            <Button
              variant={calendarView === "week" ? "default" : "ghost"}
              size="sm"
              className="h-7 text-sm font-normal"
              onClick={() => setCalendarView("week")}
            >
              Week
            </Button>
            <Button
              variant={calendarView === "month" ? "default" : "ghost"}
              size="sm"
              className="h-7 text-sm font-normal"
              onClick={() => setCalendarView("month")}
            >
              Month
            </Button>
          </div>

          <Button size="sm" className="h-7 text-sm gap-1 px-3 py-0 font-normal">
            <Plus className="h-3.5 w-3.5" />
            New Appointment
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <AppointmentCalendar date={date} view={calendarView} appointments={appointments} />
      </div>
    </div>
  )
}

