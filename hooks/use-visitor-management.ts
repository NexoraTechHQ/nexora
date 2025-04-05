"use client"

import { useState, useEffect, useCallback } from "react"
import type { Visitor } from "@/lib/types/models"
import { serviceProvider } from "@/lib/services/service-provider"

// Types for create and update operations
export interface CreateVisitorData {
  name: string
  email: string
  phone: string
  company: string
}

export interface UpdateVisitorData extends Partial<CreateVisitorData> {
  id: string
}

export function useVisitorManagement() {
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Fetch all visitors
  const fetchVisitors = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await serviceProvider.getVisitors()
      setVisitors(data)
    } catch (err) {
      console.error("Error fetching visitors:", err)
      setError(err instanceof Error ? err : new Error("Failed to fetch visitors"))
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Create a new visitor
  const createVisitor = useCallback(async (visitorData: CreateVisitorData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // In a real implementation, this would call the API
      // For now, we'll simulate creating a visitor with mock data
      const newVisitor: Visitor = {
        id: `V${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(3, "0")}`,
        name: visitorData.name,
        email: visitorData.email,
        phone: visitorData.phone,
        company: visitorData.company,
        lastVisit: new Date().toISOString().split("T")[0],
        visitCount: 0,
      }

      // In a real implementation, we would send this to the API
      // await apiService.post("createVisitor", { body: visitorData })

      // Update local state
      setVisitors((prev) => [...prev, newVisitor])
      return newVisitor
    } catch (err) {
      console.error("Error creating visitor:", err)
      setError(err instanceof Error ? err : new Error("Failed to create visitor"))
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  // Update an existing visitor
  const updateVisitor = useCallback(async (visitorData: UpdateVisitorData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // In a real implementation, this would call the API
      // await apiService.put("updateVisitor", { pathParams: { id: visitorData.id }, body: visitorData })

      // Update local state
      setVisitors((prev) =>
        prev.map((visitor) => (visitor.id === visitorData.id ? { ...visitor, ...visitorData } : visitor)),
      )

      return visitorData
    } catch (err) {
      console.error("Error updating visitor:", err)
      setError(err instanceof Error ? err : new Error("Failed to update visitor"))
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  // Delete a visitor
  const deleteVisitor = useCallback(async (id: string) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // In a real implementation, this would call the API
      // await apiService.delete("deleteVisitor", { pathParams: { id } })

      // Update local state
      setVisitors((prev) => prev.filter((visitor) => visitor.id !== id))
      return true
    } catch (err) {
      console.error("Error deleting visitor:", err)
      setError(err instanceof Error ? err : new Error("Failed to delete visitor"))
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  // Bulk delete visitors
  const bulkDeleteVisitors = useCallback(async (ids: string[]) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // In a real implementation, this would call the API
      // await apiService.post("bulkDeleteVisitors", { body: { ids } })

      // Update local state
      setVisitors((prev) => prev.filter((visitor) => !ids.includes(visitor.id)))
      return true
    } catch (err) {
      console.error("Error bulk deleting visitors:", err)
      setError(err instanceof Error ? err : new Error("Failed to delete visitors"))
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  // Load data on initial render
  useEffect(() => {
    fetchVisitors()
  }, [fetchVisitors])

  return {
    visitors,
    isLoading,
    isSubmitting,
    error,
    fetchVisitors,
    createVisitor,
    updateVisitor,
    deleteVisitor,
    bulkDeleteVisitors,
  }
}

