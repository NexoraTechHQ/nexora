"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { NexoraLoader } from "@/components/ui/nexora-loader"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const [showLoader, setShowLoader] = useState(true)
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const [isLocalAuthenticated, setIsLocalAuthenticated] = useState(false)

  // Local state to track authentication status
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isLoading: true,
  })

  // Check local storage for authentication data
  useEffect(() => {
    const checkLocalAuth = () => {
      try {
        const authData = localStorage.getItem("auth")
        if (authData) {
          const parsedData = JSON.parse(authData)
          if (parsedData.tokens) {
            setIsLocalAuthenticated(true)
          }
        }
      } catch (error) {
        console.error("Error checking local auth:", error)
      }
      setIsAuthChecked(true)
    }

    checkLocalAuth()
  }, [])

  // Check authentication status from the auth service
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Import the auth service directly (not the hook)
        const { AuthService } = await import("@/lib/auth/auth-service")
        const { isAuthenticated } = AuthService.initializeAuth()

        setAuthState({
          isAuthenticated,
          isLoading: false,
        })
      } catch (error) {
        console.error("Error checking auth status:", error)
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
        })
      }
    }

    checkAuthStatus()
  }, [])

  // Handle minimum loader display time (300ms)
  useEffect(() => {
    const minLoaderTime = setTimeout(() => {
      if (!authState.isLoading) {
        setShowLoader(false)
      }
    }, 300)

    if (authState.isLoading) {
      setShowLoader(true)
    }

    return () => clearTimeout(minLoaderTime)
  }, [authState.isLoading])

  // Handle redirect if not authenticated
  useEffect(() => {
    if (isAuthChecked && !authState.isLoading && !authState.isAuthenticated && !isLocalAuthenticated) {
      router.push("/login")
    }
  }, [authState.isLoading, authState.isAuthenticated, isLocalAuthenticated, isAuthChecked, router])

  if (showLoader || authState.isLoading) {
    return <NexoraLoader />
  }

  if (!authState.isAuthenticated && !isLocalAuthenticated) {
    return null // Will redirect in the useEffect
  }

  return <>{children}</>
}

