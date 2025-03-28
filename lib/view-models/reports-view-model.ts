"use client"

import { useState, useEffect } from "react"
import { serviceProvider } from "../services/service-provider"
import type { VisitorStats, AccessStats, VisitorLog, AccessLog } from "../types/models"

export interface ReportsState {
  isLoading: boolean
  error: Error | null
  visitorStats: VisitorStats | null
  accessStats: AccessStats | null
  visitorLogs: VisitorLog[] | null
  accessLogs: AccessLog[] | null
  timeRange: string
}

export function useReportsViewModel() {
  const [state, setState] = useState<ReportsState>({
    isLoading: true,
    error: null,
    visitorStats: null,
    accessStats: null,
    visitorLogs: null,
    accessLogs: null,
    timeRange: "7d",
  })

  const setTimeRange = (range: string) => {
    setState((prev) => ({ ...prev, timeRange: range }))
    // In a real implementation, this would trigger a new data fetch with the updated time range
    fetchReportsData(range)
  }

  const fetchReportsData = async (timeRange: string = state.timeRange) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      // Fetch all required data in parallel
      const [visitorStats, accessStats, visitorLogs, accessLogs] = await Promise.all([
        serviceProvider.getVisitorStats().catch((error) => {
          console.error("Error fetching visitor stats:", error)
          return null
        }),
        serviceProvider.getAccessStats().catch((error) => {
          console.error("Error fetching access stats:", error)
          return null
        }),
        serviceProvider.getVisitorLogs().catch((error) => {
          console.error("Error fetching visitor logs:", error)
          return null
        }),
        serviceProvider.getAccessLogs().catch((error) => {
          console.error("Error fetching access logs:", error)
          return null
        }),
      ])

      setState({
        isLoading: false,
        error: null,
        visitorStats,
        accessStats,
        visitorLogs,
        accessLogs,
        timeRange,
      })
    } catch (error) {
      console.error("Reports data fetch error:", error)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error("Failed to fetch reports data"),
      }))
    }
  }

  // Load data on initial render
  useEffect(() => {
    fetchReportsData()
  }, [])

  // Function to refresh the data
  const refreshData = () => {
    fetchReportsData()
  }

  return {
    ...state,
    setTimeRange,
    refreshData,
  }
}

