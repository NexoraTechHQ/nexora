"use client"

import { useState, useEffect } from "react"
import type { User, Visitor, VisitorLog, Appointment } from "../types/models"
import { serviceProvider } from "../services/service-provider"

export interface VisitorManagementState {
  isLoading: boolean
  error: Error | null
  users: User[] | null
  visitors: Visitor[] | null
  visitorLogs: VisitorLog[] | null
  appointments: Appointment[] | null
}

export function useVisitorManagementViewModel() {
  const [state, setState] = useState<VisitorManagementState>({
    isLoading: true,
    error: null,
    users: null,
    visitors: null,
    visitorLogs: null,
    appointments: null,
  })

  const fetchVisitorManagementData = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      // Fetch all required data in parallel
      const [users, visitors, visitorLogs, appointments] = await Promise.all([
        serviceProvider.getUsers().catch((error) => {
          console.error("Error fetching users:", error)
          return null
        }),
        serviceProvider.getVisitors().catch((error) => {
          console.error("Error fetching visitors:", error)
          return null
        }),
        serviceProvider.getVisitorLogs().catch((error) => {
          console.error("Error fetching visitor logs:", error)
          return null
        }),
        serviceProvider.getAppointments().catch((error) => {
          console.error("Error fetching appointments:", error)
          return null
        }),
      ])

      setState({
        isLoading: false,
        error: null,
        users: users || null,
        visitors: visitors || null,
        visitorLogs: visitorLogs || null,
        appointments: appointments || null,
      })
    } catch (error) {
      console.error("Visitor management data fetch error:", error)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error("Failed to fetch visitor management data"),
      }))
    }
  }

  // Load data on initial render
  useEffect(() => {
    fetchVisitorManagementData()
  }, [])

  // Function to refresh the data
  const refreshData = () => {
    fetchVisitorManagementData()
  }

  return {
    ...state,
    refreshData,
  }
}

