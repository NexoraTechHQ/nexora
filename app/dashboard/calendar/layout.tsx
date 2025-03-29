import type React from "react"
import { CalendarLayout } from "@/components/calendar/calendar-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CalendarLayout>{children}</CalendarLayout>
}

