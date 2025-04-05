import { type NextRequest, NextResponse } from "next/server"
import type { Appointment } from "@/lib/types/models"

// Mock data for appointments (this would be replaced with a database in a real application)
let mockAppointments: Appointment[] = []

// Initialize mock data if needed
if (mockAppointments.length === 0) {
  // This is just a placeholder. In a real app, you'd fetch from a database
  // For now, we'll assume the data is already loaded via the main route handler
}

export async function POST(request: NextRequest) {
  const { ids } = await request.json()

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "Invalid request. Expected an array of appointment IDs." }, { status: 400 })
  }

  // Filter out the appointments to be deleted
  const initialCount = mockAppointments.length
  mockAppointments = mockAppointments.filter((appointment) => !ids.includes(appointment.id))
  const deletedCount = initialCount - mockAppointments.length

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({
    success: true,
    deletedCount,
    message: `${deletedCount} appointments deleted successfully.`,
  })
}

