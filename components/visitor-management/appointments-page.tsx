"use client"

import { AppointmentsTab } from "./appointments-tab"

export function AppointmentsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Appointments</h2>
      </div>
      <AppointmentsTab />
    </div>
  )
}

