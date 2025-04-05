"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth/auth-provider"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const [isLocalLoading, setIsLocalLoading] = useState(false)

  // Try to use auth context, but provide fallbacks if it's not available
  let authContext
  let login: any, isLoading: any, error: any, clearError: any

  try {
    authContext = useAuth()
    ;({ login, isLoading, error, clearError } = authContext)
  } catch (e) {
    authContext = null
    login = async () => {
      setIsLocalLoading(true)
      // Simulate login for when auth context isn't available
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLocalLoading(false)
      setLocalError("Authentication service is not available. Please try again later.")
    }
    isLoading = isLocalLoading
    error = localError
    clearError = () => setLocalError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login({ username, password, rememberMe })
  }

  const currentError = error || localError
  const currentIsLoading = isLoading || isLocalLoading
  const currentClearError = clearError || (() => setLocalError(null))

  return (
    <Card className="mx-auto max-w-md w-full shadow-md">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
            N
          </div>
        </div>
        <CardTitle className="text-xl font-semibold">Sign in to Nexora</CardTitle>
        <CardDescription className="text-sm">Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        {currentError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription className="text-sm">{currentError}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm">
              Email or Phone
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="name@example.com"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                if (currentError) currentClearError()
              }}
              className="h-9"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm">
                Password
              </Label>
              <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (currentError) currentClearError()
              }}
              className="h-9"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <Label htmlFor="remember" className="text-sm font-normal">
              Remember me for {rememberMe ? "1 week" : "1 day"}
            </Label>
          </div>
          <Button type="submit" className="w-full h-10 text-sm" disabled={currentIsLoading}>
            {currentIsLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

