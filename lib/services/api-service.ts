import { type APIConfig, defaultAPIConfig } from "./api-config"

// Custom error class for API errors
export class APIError extends Error {
  status: number
  data: any

  constructor(message: string, status: number, data?: any) {
    super(message)
    this.name = "APIError"
    this.status = status
    this.data = data
  }
}

export class APIService {
  private config: APIConfig

  constructor(config: APIConfig = defaultAPIConfig) {
    this.config = config
  }

  // Replace path parameters in URL
  private replacePathParams(url: string, params?: Record<string, any>): string {
    if (!params) return url

    let processedUrl = url
    Object.keys(params).forEach((key) => {
      processedUrl = processedUrl.replace(`:${key}`, encodeURIComponent(params[key]))
    })

    return processedUrl
  }

  // Add query parameters to URL
  private addQueryParams(url: string, params?: Record<string, any>): string {
    if (!params) return url

    const queryParams = new URLSearchParams()
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        queryParams.append(key, params[key].toString())
      }
    })

    const queryString = queryParams.toString()
    if (queryString) {
      return `${url}${url.includes("?") ? "&" : "?"}${queryString}`
    }

    return url
  }

  // Main fetch method
  private async fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout: number = this.config.timeout || 10000,
  ): Promise<Response> {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })

      return response
    } finally {
      clearTimeout(id)
    }
  }

  // Process the response
  private async processResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch (e) {
        errorData = { message: response.statusText }
      }

      throw new APIError(errorData.message || `API Error: ${response.status}`, response.status, errorData)
    }

    // Handle empty responses
    if (response.status === 204) {
      return {} as T
    }

    try {
      return (await response.json()) as T
    } catch (e) {
      throw new APIError("Invalid JSON response", response.status)
    }
  }

  // Main method to fetch data from an endpoint
  async fetchData<T>(
    endpointKey: string,
    options: {
      method?: string
      pathParams?: Record<string, any>
      queryParams?: Record<string, any>
      body?: any
      headers?: Record<string, string>
    } = {},
  ): Promise<T> {
    const { method = "GET", pathParams, queryParams, body, headers = {} } = options

    // Get the endpoint URL
    const endpoint = this.config.endpoints[endpointKey]
    if (!endpoint) {
      throw new Error(`Endpoint "${endpointKey}" not found in API configuration`)
    }

    // Build the full URL
    let url = `${this.config.baseURL}${endpoint}`
    url = this.replacePathParams(url, pathParams)
    url = this.addQueryParams(url, queryParams)

    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers: {
        ...this.config.headers,
        ...headers,
      },
    }

    // Add body if provided
    if (body) {
      requestOptions.body = JSON.stringify(body)
    }

    // Make the request
    try {
      const response = await this.fetchWithTimeout(url, requestOptions)
      return this.processResponse<T>(response)
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }

      if (error instanceof DOMException && error.name === "AbortError") {
        throw new APIError("Request timeout", 408)
      }

      throw new APIError(error instanceof Error ? error.message : "Unknown error", 0)
    }
  }

  // Convenience methods for common HTTP methods
  async get<T>(
    endpointKey: string,
    options: {
      pathParams?: Record<string, any>
      queryParams?: Record<string, any>
      headers?: Record<string, string>
    } = {},
  ): Promise<T> {
    return this.fetchData<T>(endpointKey, {
      ...options,
      method: "GET",
    })
  }

  async post<T>(
    endpointKey: string,
    options: {
      pathParams?: Record<string, any>
      queryParams?: Record<string, any>
      body?: any
      headers?: Record<string, string>
    } = {},
  ): Promise<T> {
    return this.fetchData<T>(endpointKey, {
      ...options,
      method: "POST",
    })
  }

  async put<T>(
    endpointKey: string,
    options: {
      pathParams?: Record<string, any>
      queryParams?: Record<string, any>
      body?: any
      headers?: Record<string, string>
    } = {},
  ): Promise<T> {
    return this.fetchData<T>(endpointKey, {
      ...options,
      method: "PUT",
    })
  }

  async patch<T>(
    endpointKey: string,
    options: {
      pathParams?: Record<string, any>
      queryParams?: Record<string, any>
      body?: any
      headers?: Record<string, string>
    } = {},
  ): Promise<T> {
    return this.fetchData<T>(endpointKey, {
      ...options,
      method: "PATCH",
    })
  }

  async delete<T>(
    endpointKey: string,
    options: {
      pathParams?: Record<string, any>
      queryParams?: Record<string, any>
      headers?: Record<string, string>
    } = {},
  ): Promise<T> {
    return this.fetchData<T>(endpointKey, {
      ...options,
      method: "DELETE",
    })
  }
}

// Create a singleton instance with default config
export const apiService = new APIService()

