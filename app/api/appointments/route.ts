import { type NextRequest, NextResponse } from "next/server"
import type { Appointment, Host } from "@/lib/types/models"

// Mock data for appointments
const mockAppointments: Appointment[] = generateMockAppointments()

export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams
  const date = searchParams.get("date")
  const visitorId = searchParams.get("visitorId")
  const hostId = searchParams.get("hostId")
  const status = searchParams.get("status")

  // Filter appointments based on query parameters
  let filteredAppointments = [...mockAppointments]

  if (date) {
    filteredAppointments = filteredAppointments.filter((appointment) => appointment.date === date)
  }

  if (visitorId) {
    filteredAppointments = filteredAppointments.filter((appointment) => appointment.visitorId === visitorId)
  }

  if (hostId) {
    filteredAppointments = filteredAppointments.filter((appointment) =>
      appointment.hosts.some((host) => host.id === hostId),
    )
  }

  if (status) {
    filteredAppointments = filteredAppointments.filter((appointment) => appointment.status === status)
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(filteredAppointments)
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  // Create a new appointment
  const newAppointment: Appointment = {
    id: `A${Math.floor(Math.random() * 10000)}`,
    visitorId: data.visitorId || `V${Math.floor(Math.random() * 10000)}`,
    visitorName: data.visitorName,
    visitorEmail: data.visitorEmail,
    hosts: data.hosts || [],
    date: data.date,
    startTime: data.startTime,
    endTime: data.endTime,
    location: data.location,
    purpose: data.purpose,
    status: "scheduled",
  }

  mockAppointments.push(newAppointment)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(newAppointment, { status: 201 })
}

// Helper function to generate mock appointments
function generateMockAppointments(): Appointment[] {
  const statuses = ["scheduled", "checked-in", "completed", "canceled"]
  const locations = ["Conference Room A", "Meeting Room 2", "Office 305", "Conference Room B", "Executive Suite"]
  const purposes = ["Interview", "Client Meeting", "Contract Signing", "Project Discussion", "Consultation"]

  return Array.from({ length: 20 }, (_, i) => {
    const id = `A${(i + 1).toString().padStart(3, "0")}`
    const visitorId = `V${(i + 1).toString().padStart(3, "0")}`

    // Generate a random date within the next 30 days
    const date = new Date()
    date.setDate(date.getDate() + Math.floor(Math.random() * 30))

    // Format the date as YYYY-MM-DD
    const formattedDate = date.toISOString().split("T")[0]

    // Generate random start time between 8:00 and 16:00
    const startHour = Math.floor(Math.random() * 8) + 8
    const startMinute = Math.random() < 0.5 ? 0 : 30
    const startTime = `${startHour.toString().padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}`

    // Generate end time 30-90 minutes after start time
    const endHour = startHour + Math.floor(Math.random() * 2)
    const endMinute = (startMinute + (Math.random() < 0.5 ? 30 : 0)) % 60
    const endTime = `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`

    // Generate 1-3 random hosts
    const hostCount = Math.floor(Math.random() * 3) + 1
    const hosts: Host[] = Array.from({ length: hostCount }, (_, j) => {
      const hostId = `U${(Math.floor(Math.random() * 5) + 1).toString().padStart(3, "0")}`
      return {
        id: hostId,
        name: `Host ${hostId.substring(1)}`,
        email: `host${hostId.substring(1)}@example.com`,
        department: ["IT", "HR", "Sales", "Marketing", "Finance"][Math.floor(Math.random() * 5)],
      }
    })

    return {
      id,
      visitorId,
      visitorName: `Visitor ${i + 1}`,
      visitorEmail: `visitor${i + 1}@example.com`,
      hosts,
      date: formattedDate,
      startTime,
      endTime,
      location: locations[Math.floor(Math.random() * locations.length)],
      purpose: purposes[Math.floor(Math.random() * purposes.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }
  })
}

