"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-provider"
import { NexoraLoader } from "@/components/ui/nexora-loader"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [showLoader, setShowLoader] = useState(true)

  // Force authentication check on every page reload
  useEffect(() => {
    // This will trigger the auth check in the AuthProvider
    const checkAuth = async () => {
      // The actual auth check happens in the AuthProvider
      // This is just to ensure the effect runs on every mount
    }

    checkAuth()
  }, [])

  // Handle minimum loader display time (300ms)
  useEffect(() => {
    const minLoaderTime = setTimeout(() => {
      if (!isLoading) {
        setShowLoader(false)
      }
    }, 300)

    // If isLoading changes to false before 300ms, we still wait
    if (isLoading) {
      setShowLoader(true)
    }

    return () => clearTimeout(minLoaderTime)
  }, [isLoading])

  // Handle redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (showLoader || isLoading) {
    return <NexoraLoader />
  }

  if (!isAuthenticated) {
    return null // Will redirect in the useEffect
  }

  return <>{children}</>
}

