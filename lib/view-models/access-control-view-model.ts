"use client"

import { useState, useEffect } from "react"
import type { AccessLog, AccessStats } from "../types/models"
import { serviceProvider } from "../services/service-provider"

export interface AccessControlState {
  isLoading: boolean
  error: Error | null
  accessLogs: AccessLog[] | null
  accessStats: AccessStats | null
}

export function useAccessControlViewModel() {
  const [state, setState] = useState<AccessControlState>({
    isLoading: true,
    error: null,
    accessLogs: null,
    accessStats: null,
  })

  const fetchAccessControlData = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      // Fetch all required data in parallel
      const [accessLogs, accessStats] = await Promise.all([
        serviceProvider.getAccessLogs().catch((error) => {
          console.error("Error fetching access logs:", error)
          return null
        }),
        serviceProvider.getAccessStats().catch((error) => {
          console.error("Error fetching access stats:", error)
          return null
        }),
      ])

      setState({
        isLoading: false,
        error: null,
        accessLogs: accessLogs || null,
        accessStats: accessStats || null,
      })
    } catch (error) {
      console.error("Access control data fetch error:", error)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error("Failed to fetch access control data"),
      }))
    }
  }

  // Load data on initial render
  useEffect(() => {
    fetchAccessControlData()
  }, [])

  // Function to refresh the data
  const refreshData = () => {
    fetchAccessControlData()
  }

  return {
    ...state,
    refreshData,
  }
}

