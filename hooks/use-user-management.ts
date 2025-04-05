"use client"

import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import type { User } from "@/lib/types/models"
import { mockService } from "@/lib/services/mock-service"

// This will be replaced with real API calls when backend is ready
const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false"

export interface UserCreateData {
  name: string
  email: string
  role: "admin" | "user" | "manager"
  department: string
  status: "active" | "inactive"
}

export interface UserUpdateData extends UserCreateData {
  id: string
}

export function useUserManagement() {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)

  // Fetch users on initial load
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setIsLoading(true)
    setError(null)
    try {
      if (useMockApi) {
        // Use mock service
        const data = await mockService.getUsers()
        setUsers(data)
        return data
      } else {
        // Use real API
        const response = await fetch("/api/users")
        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }
        const data = await response.json()
        setUsers(data)
        return data
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      return []
    } finally {
      setIsLoading(false)
    }
  }

  const createUser = async (userData: UserCreateData) => {
    setIsLoading(true)
    setError(null)
    try {
      if (useMockApi) {
        // Simulate API call with mock data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Generate a mock ID
        const newUser: User = {
          id: `U${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(3, "0")}`,
          ...userData,
        }

        // Add to local state
        setUsers((prev) => [...prev, newUser])

        toast({
          title: "User created",
          description: `${userData.name} has been added successfully.`,
        })

        return newUser
      } else {
        // Use real API
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })

        if (!response.ok) {
          throw new Error("Failed to create user")
        }

        const data = await response.json()

        // Update local state
        setUsers((prev) => [...prev, data])

        toast({
          title: "User created",
          description: `${userData.name} has been added successfully.`,
        })

        return data
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = async (userData: UserUpdateData) => {
    setIsLoading(true)
    setError(null)
    try {
      if (useMockApi) {
        // Simulate API call with mock data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Update local state
        setUsers((prev) => prev.map((user) => (user.id === userData.id ? userData : user)))

        toast({
          title: "User updated",
          description: `${userData.name} has been updated successfully.`,
        })

        return userData
      } else {
        // Use real API
        const response = await fetch(`/api/users/${userData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })

        if (!response.ok) {
          throw new Error("Failed to update user")
        }

        const data = await response.json()

        // Update local state
        setUsers((prev) => prev.map((user) => (user.id === userData.id ? data : user)))

        toast({
          title: "User updated",
          description: `${userData.name} has been updated successfully.`,
        })

        return data
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const deleteUsers = async (userIds: string[]) => {
    setIsLoading(true)
    setError(null)
    try {
      if (useMockApi) {
        // Simulate API call with mock data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Update local state
        setUsers((prev) => prev.filter((user) => !userIds.includes(user.id)))

        const count = userIds.length
        toast({
          title: "Users deleted",
          description: `${count} user${count !== 1 ? "s" : ""} deleted successfully.`,
        })

        return { success: true, count }
      } else {
        // Use real API
        const response = await fetch("/api/users/bulk-delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userIds }),
        })

        if (!response.ok) {
          throw new Error("Failed to delete users")
        }

        const data = await response.json()

        // Update local state
        setUsers((prev) => prev.filter((user) => !userIds.includes(user.id)))

        const count = userIds.length
        toast({
          title: "Users deleted",
          description: `${count} user${count !== 1 ? "s" : ""} deleted successfully.`,
        })

        return data
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    users,
    isLoading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUsers,
  }
}

