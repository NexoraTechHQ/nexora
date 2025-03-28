"use client"

import { useState, useEffect } from "react"
import type { DashboardStats, VisitorStats, VisitorLog } from "../types/models"
import { serviceProvider } from "../services/service-provider"

export interface DashboardState {
  isLoading: boolean
  error: Error | null
  stats: DashboardStats | null
  visitorStats: VisitorStats | null
  recentVisitors: VisitorLog[] | null
}

export function useDashboardViewModel() {
  const [state, setState] = useState<DashboardState>({
    isLoading: true,
    error: null,
    stats: null,
    visitorStats: null,
    recentVisitors: null,
  })

  const fetchDashboardData = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      // Fetch all required data in parallel
      const [stats, visitorStats, visitorLogs] = await Promise.all([
        serviceProvider.getDashboardStats().catch((error) => {
          console.error("Error fetching dashboard stats:", error)
          return null
        }),
        serviceProvider.getVisitorStats().catch((error) => {
          console.error("Error fetching visitor stats:", error)
          return null
        }),
        serviceProvider.getVisitorLogs().catch((error) => {
          console.error("Error fetching visitor logs:", error)
          return null
        }),
      ])

      // Sort visitor logs by check-in time (most recent first)
      const sortedLogs = visitorLogs
        ? [...visitorLogs]
            .sort((a, b) => new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime())
            .slice(0, 5)
        : [] // Get only the 5 most recent

      setState({
        isLoading: false,
        error: null,
        stats: stats || null,
        visitorStats: visitorStats || null,
        recentVisitors: sortedLogs || null,
      })
    } catch (error) {
      console.error("Dashboard data fetch error:", error)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error("Failed to fetch dashboard data"),
      }))
    }
  }

  // Load data on initial render
  useEffect(() => {
    fetchDashboardData()
  }, [])

  // Function to refresh the dashboard data
  const refreshData = () => {
    fetchDashboardData()
  }

  return {
    ...state,
    refreshData,
  }
}

