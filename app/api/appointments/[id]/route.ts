import { type NextRequest, NextResponse } from "next/server"
import type { Appointment } from "@/lib/types/models"

// Mock data for appointments (this would be replaced with a database in a real application)
const mockAppointments: Appointment[] = []

// Initialize mock data if needed
if (mockAppointments.length === 0) {
  // This is just a placeholder. In a real app, you'd fetch from a database
  // For now, we'll assume the data is already loaded via the main route handler
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  // Find the appointment by ID
  const appointment = mockAppointments.find((a) => a.id === id)

  if (!appointment) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json(appointment)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const data = await request.json()

  // Find the appointment index
  const appointmentIndex = mockAppointments.findIndex((a) => a.id === id)

  if (appointmentIndex === -1) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
  }

  // Update the appointment
  const updatedAppointment: Appointment = {
    ...mockAppointments[appointmentIndex],
    ...data,
    id, // Ensure ID doesn't change
  }

  mockAppointments[appointmentIndex] = updatedAppointment

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json(updatedAppointment)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  // Find the appointment index
  const appointmentIndex = mockAppointments.findIndex((a) => a.id === id)

  if (appointmentIndex === -1) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
  }

  // Remove the appointment
  mockAppointments.splice(appointmentIndex, 1)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json({ success: true })
}

