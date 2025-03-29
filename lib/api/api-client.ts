import { AuthService } from "../auth/auth-service"

interface RequestOptions extends RequestInit {
  skipAuth?: boolean
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || "/api") {
    this.baseUrl = baseUrl
  }

  // Helper to build full URL
  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`
  }

  // Helper to add auth header
  private async getAuthHeaders(): Promise<HeadersInit> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    // Add auth token if available
    const accessToken = AuthService.getAccessToken()
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`
    }

    return headers
  }

  // Generic request method with token handling
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { skipAuth = false, ...fetchOptions } = options

    // Prepare request with auth headers if needed
    const headers = skipAuth
      ? { "Content-Type": "application/json", ...fetchOptions.headers }
      : await this.getAuthHeaders()

    // Check if token is valid, refresh if needed
    if (!skipAuth && !AuthService.isTokenValid()) {
      try {
        await AuthService.refreshToken()
        // Get fresh headers with new token
        Object.assign(headers, await this.getAuthHeaders())
      } catch (error) {
        // If refresh fails, user needs to login again
        AuthService.logout()
        window.location.href = "/login"
        throw new Error("Session expired. Please login again.")
      }
    }

    // Make the request
    const response = await fetch(this.buildUrl(endpoint), {
      ...fetchOptions,
      headers,
    })

    // Handle HTTP errors
    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized - clear auth and redirect to login
        AuthService.logout()
        window.location.href = "/login"
        throw new Error("Session expired. Please login again.")
      }

      // Try to parse error message from response
      let errorMessage: string
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || `API Error: ${response.status}`
      } catch {
        errorMessage = `API Error: ${response.status}`
      }

      throw new Error(errorMessage)
    }

    // Parse response
    if (response.status === 204) {
      return {} as T // No content
    }

    return await response.json()
  }

  // HTTP method wrappers
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" })
  }

  async post<T>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" })
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient()

