import { apiService } from "./api-service"
import { mockService } from "./mock-service"

// Service provider interface
export interface ServiceProvider {
  getUsers(): Promise<any[]>
  getUserById(id: string): Promise<any | null>
  getVisitors(): Promise<any[]>
  getVisitorById(id: string): Promise<any | null>
  getVisitorLogs(): Promise<any[]>
  getAppointments(): Promise<any[]>
  getAccessLogs(): Promise<any[]>
  getDashboardStats(): Promise<any>
  getVisitorStats(): Promise<any>
  getAccessStats(): Promise<any>
}

// Environment-based service provider
export class ServiceProviderFactory {
  static getProvider(): ServiceProvider {
    // Check if API URL is configured - if not, default to mock data
    const apiUrlConfigured = process.env.NEXT_PUBLIC_API_BASE_URL && process.env.NEXT_PUBLIC_API_BASE_URL !== ""

    // Use mock service for development or when API URL is not configured
    // Only use real API when explicitly configured
    if (!apiUrlConfigured || process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
      console.log("Using mock data service")
      return mockService
    }

    console.log("Using real API service")
    return {
      getUsers: () => apiService.get("getUsers"),
      getUserById: (id) => apiService.get("getUserById", { pathParams: { id } }),
      getVisitors: () => apiService.get("getVisitors"),
      getVisitorById: (id) => apiService.get("getVisitorById", { pathParams: { id } }),
      getVisitorLogs: () => apiService.get("getVisitorLogs"),
      getAppointments: () => apiService.get("getAppointments"),
      getAccessLogs: () => apiService.get("getAccessLogs"),
      getDashboardStats: () => apiService.get("getDashboardStats"),
      getVisitorStats: () => apiService.get("getVisitorStats"),
      getAccessStats: () => apiService.get("getAccessStats"),
    }
  }
}

// Create a singleton instance
export const serviceProvider = ServiceProviderFactory.getProvider()

