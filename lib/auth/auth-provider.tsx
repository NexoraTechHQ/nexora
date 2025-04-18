"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AuthService } from "./auth-service"
import type { AuthState, LoginCredentials } from "./auth-types"

// Initial auth state
const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
}

// Create the auth context with default values to prevent undefined errors
const defaultContextValue = {
  ...initialState,
  login: async () => {},
  logout: () => {},
  clearError: () => {},
  initAuth: async () => {},
}

// Create the auth context
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  clearError: () => void
  initAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>(defaultContextValue)

// Auth provider props
interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialState)
  const router = useRouter()
  const pathname = usePathname()

  // Initialize auth state from storage
  const initAuth = async () => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      const { user, tokens, isAuthenticated } = AuthService.initializeAuth()

      setState({
        user,
        tokens,
        isAuthenticated,
        isLoading: false,
        error: null,
      })

      // If tokens exist but are expired, try to refresh
      if (tokens && !isAuthenticated) {
        try {
          const newTokens = await AuthService.refreshToken()
          setState((prev) => ({
            ...prev,
            tokens: newTokens,
            isAuthenticated: true,
          }))
        } catch (error) {
          // If refresh fails, clear auth state
          AuthService.logout()
          setState({
            user: null,
            tokens: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          })
        }
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to initialize authentication",
      }))
    }
  }

  useEffect(() => {
    initAuth()
  }, [])

  // Redirect to login if not authenticated and not already on login page
  useEffect(() => {
    if (
      !state.isLoading &&
      !state.isAuthenticated &&
      pathname !== "/login" &&
      pathname !== "/register" &&
      !pathname.startsWith("/auth/")
    ) {
      router.push("/login")
    }
  }, [state.isLoading, state.isAuthenticated, pathname, router])

  // Login function
  const login = async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const { user, tokens } = await AuthService.login(credentials)

      setState({
        user,
        tokens,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      router.push("/dashboard")
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Login failed",
      }))
    }
  }

  // Logout function
  const logout = () => {
    AuthService.logout()
    setState({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
    router.push("/login")
  }

  // Clear error function
  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }))
  }

  // Context value
  const value = {
    ...state,
    login,
    logout,
    clearError,
    initAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext)
}

