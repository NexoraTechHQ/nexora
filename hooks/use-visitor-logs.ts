"use client"

import { useState, useEffect, useCallback } from "react"
import type { VisitorLog } from "@/lib/types/models"
import { serviceProvider } from "@/lib/services/service-provider"

// Filter parameters for visitor logs
export interface VisitorLogFilters {
  visitorName?: string
  visitorEmail?: string
  hostName?: string
  department?: string
  status?: "active" | "completed" | "all"
  entryMethod?: "Manual" | "Facial Recognition" | "Card" | "all"
  startDate?: string
  endDate?: string
}

export function useVisitorLogs(initialFilters: VisitorLogFilters = {}) {
  const [logs, setLogs] = useState<VisitorLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [filters, setFilters] = useState<VisitorLogFilters>(initialFilters)

  // Fetch visitor logs with filters
  const fetchVisitorLogs = useCallback(
    async (newFilters?: VisitorLogFilters) => {
      setIsLoading(true)
      setError(null)

      // Update filters if new ones are provided
      if (newFilters) {
        setFilters(newFilters)
      }

      // Use current filters or new ones if provided
      const currentFilters = newFilters || filters

      try {
        // In a real implementation, this would call the API with query parameters
        // const queryParams = Object.entries(currentFilters)
        //   .filter(([_, value]) => value !== undefined && value !== 'all')
        //   .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

        // const data = await apiService.get("getVisitorLogs", { queryParams })

        // For now, use the mock service and filter in memory
        const data = await serviceProvider.getVisitorLogs()

        // Apply filters in memory (in a real implementation, this would be done by the API)
        let filteredData = [...data]

        if (currentFilters.visitorName) {
          filteredData = filteredData.filter((log) =>
            log.visitorName.toLowerCase().includes(currentFilters.visitorName!.toLowerCase()),
          )
        }

        if (currentFilters.visitorEmail) {
          filteredData = filteredData.filter((log) =>
            log.visitorEmail.toLowerCase().includes(currentFilters.visitorEmail!.toLowerCase()),
          )
        }

        if (currentFilters.hostName) {
          filteredData = filteredData.filter((log) =>
            log.hostName.toLowerCase().includes(currentFilters.hostName!.toLowerCase()),
          )
        }

        if (currentFilters.department) {
          filteredData = filteredData.filter((log) =>
            log.department.toLowerCase().includes(currentFilters.department!.toLowerCase()),
          )
        }

        if (currentFilters.status && currentFilters.status !== "all") {
          filteredData = filteredData.filter((log) => log.status === currentFilters.status)
        }

        if (currentFilters.entryMethod && currentFilters.entryMethod !== "all") {
          filteredData = filteredData.filter((log) => log.entryMethod === currentFilters.entryMethod)
        }

        if (currentFilters.startDate) {
          const startDate = new Date(currentFilters.startDate)
          filteredData = filteredData.filter((log) => new Date(log.checkInTime) >= startDate)
        }

        if (currentFilters.endDate) {
          const endDate = new Date(currentFilters.endDate)
          endDate.setHours(23, 59, 59, 999) // End of day
          filteredData = filteredData.filter((log) => new Date(log.checkInTime) <= endDate)
        }

        setLogs(filteredData)
      } catch (err) {
        console.error("Error fetching visitor logs:", err)
        setError(err instanceof Error ? err : new Error("Failed to fetch visitor logs"))
      } finally {
        setIsLoading(false)
      }
    },
    [filters],
  )

  // Update filters and fetch data
  const updateFilters = useCallback(
    (newFilters: VisitorLogFilters) => {
      fetchVisitorLogs(newFilters)
    },
    [fetchVisitorLogs],
  )

  // Load data on initial render
  useEffect(() => {
    fetchVisitorLogs()
  }, [fetchVisitorLogs])

  return {
    logs,
    isLoading,
    error,
    filters,
    updateFilters,
    fetchVisitorLogs,
  }
}

