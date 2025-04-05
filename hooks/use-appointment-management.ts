"use client"

import { useState, useCallback } from "react"
import type { Appointment, Host } from "@/lib/types/models"

export interface CreateAppointmentData {
  visitorId: string
  visitorName: string
  visitorEmail: string
  hosts: Host[] // Changed from single host to multiple hosts
  date: string
  startTime: string
  endTime: string
  location: string
  purpose: string
}

export interface UpdateAppointmentData extends CreateAppointmentData {
  id: string
  status?: "scheduled" | "checked-in" | "completed" | "canceled"
}

export function useAppointmentManagement() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ""
  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true"

  const fetchAppointments = useCallback(
    async (params?: Record<string, string>) => {
      setIsLoading(true)
      setError(null)

      try {
        let url = `${apiBaseUrl}/api/appointments`

        // Add query parameters if provided
        if (params && Object.keys(params).length > 0) {
          const queryParams = new URLSearchParams()
          Object.entries(params).forEach(([key, value]) => {
            if (value) queryParams.append(key, value)
          })
          url += `?${queryParams.toString()}`
        }

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Failed to fetch appointments: ${response.status}`)
        }

        const data = await response.json()
        setAppointments(data)
        return data
      } catch (err) {
        console.error("Error fetching appointments:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch appointments")

        // If using mock data, return sample data
        if (useMockData) {
          const mockData = generateMockAppointments()
          setAppointments(mockData)
          return mockData
        }

        return []
      } finally {
        setIsLoading(false)
      }
    },
    [apiBaseUrl, useMockData],
  )

  const createAppointment = useCallback(
    async (appointmentData: CreateAppointmentData) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`${apiBaseUrl}/api/appointments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentData),
        })

        if (!response.ok) {
          throw new Error(`Failed to create appointment: ${response.status}`)
        }

        const newAppointment = await response.json()

        setAppointments((prev) => [...prev, newAppointment])
        return newAppointment
      } catch (err) {
        console.error("Error creating appointment:", err)
        setError(err instanceof Error ? err.message : "Failed to create appointment")

        // If using mock data, create a mock appointment
        if (useMockData) {
          const mockAppointment: Appointment = {
            id: `A${Math.floor(Math.random() * 10000)}`,
            visitorId: appointmentData.visitorId || `V${Math.floor(Math.random() * 10000)}`,
            visitorName: appointmentData.visitorName,
            visitorEmail: appointmentData.visitorEmail,
            hosts: appointmentData.hosts,
            date: appointmentData.date,
            startTime: appointmentData.startTime,
            endTime: appointmentData.endTime,
            location: appointmentData.location,
            purpose: appointmentData.purpose,
            status: "scheduled",
          }

          setAppointments((prev) => [...prev, mockAppointment])
          return mockAppointment
        }

        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [apiBaseUrl, useMockData],
  )

  const updateAppointment = useCallback(
    async (appointmentData: UpdateAppointmentData) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`${apiBaseUrl}/api/appointments/${appointmentData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentData),
        })

        if (!response.ok) {
          throw new Error(`Failed to update appointment: ${response.status}`)
        }

        const updatedAppointment = await response.json()

        setAppointments((prev) =>
          prev.map((appointment) => (appointment.id === updatedAppointment.id ? updatedAppointment : appointment)),
        )

        return updatedAppointment
      } catch (err) {
        console.error("Error updating appointment:", err)
        setError(err instanceof Error ? err.message : "Failed to update appointment")

        // If using mock data, update the appointment in the state
        if (useMockData) {
          const updatedAppointment: Appointment = {
            ...appointmentData,
            status: appointmentData.status || "scheduled",
          }

          setAppointments((prev) =>
            prev.map((appointment) => (appointment.id === appointmentData.id ? updatedAppointment : appointment)),
          )

          return updatedAppointment
        }

        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [apiBaseUrl, useMockData],
  )

  const deleteAppointment = useCallback(
    async (id: string) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`${apiBaseUrl}/api/appointments/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error(`Failed to delete appointment: ${response.status}`)
        }

        setAppointments((prev) => prev.filter((appointment) => appointment.id !== id))
        return true
      } catch (err) {
        console.error("Error deleting appointment:", err)
        setError(err instanceof Error ? err.message : "Failed to delete appointment")

        // If using mock data, remove the appointment from the state
        if (useMockData) {
          setAppointments((prev) => prev.filter((appointment) => appointment.id !== id))
          return true
        }

        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [apiBaseUrl, useMockData],
  )

  const bulkDeleteAppointments = useCallback(
    async (ids: string[]) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`${apiBaseUrl}/api/appointments/bulk-delete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids }),
        })

        if (!response.ok) {
          throw new Error(`Failed to delete appointments: ${response.status}`)
        }

        setAppointments((prev) => prev.filter((appointment) => !ids.includes(appointment.id)))
        return true
      } catch (err) {
        console.error("Error bulk deleting appointments:", err)
        setError(err instanceof Error ? err.message : "Failed to delete appointments")

        // If using mock data, remove the appointments from the state
        if (useMockData) {
          setAppointments((prev) => prev.filter((appointment) => !ids.includes(appointment.id)))
          return true
        }

        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [apiBaseUrl, useMockData],
  )

  // Helper function to generate mock appointments
  const generateMockAppointments = (): Appointment[] => {
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

  return {
    appointments,
    isLoading,
    error,
    fetchAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    bulkDeleteAppointments,
  }
}

