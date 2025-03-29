import type { AuthTokens, LoginCredentials, User } from "./auth-types"

// Constants for token storage
const ACCESS_TOKEN_KEY = "nexora_access_token"
const REFRESH_TOKEN_KEY = "nexora_refresh_token"
const EXPIRES_AT_KEY = "nexora_expires_at"
const USER_KEY = "nexora_user"

// Mock user for development
const MOCK_USER: User = {
  id: "u1",
  name: "Admin User",
  email: "admin@nexora.com",
  role: "admin",
  department: "IT",
}

// Mock tokens
const generateMockTokens = (rememberMe: boolean): AuthTokens => {
  const now = Date.now()
  // Set expiration based on remember me option
  const expiresIn = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000 // 7 days or 1 day

  return {
    accessToken: `mock-access-token-${now}`,
    refreshToken: `mock-refresh-token-${now}`,
    expiresAt: now + expiresIn,
  }
}

export const AuthService = {
  // Login function
  login: async (credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> => {
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock authentication logic
        if (credentials.username === "admin" && credentials.password === "admin") {
          const tokens = generateMockTokens(credentials.rememberMe || false)

          // Store tokens and user
          AuthService.setTokens(tokens)
          AuthService.setUser(MOCK_USER)

          resolve({ user: MOCK_USER, tokens })
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 800) // Simulate network delay
    })
  },

  // Logout function
  logout: (): void => {
    // Clear all stored auth data
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(EXPIRES_AT_KEY)
    localStorage.removeItem(USER_KEY)

    // In a real app, you might also want to invalidate the token on the server
  },

  // Refresh token function
  refreshToken: async (): Promise<AuthTokens> => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

    if (!refreshToken) {
      throw new Error("No refresh token available")
    }

    // In a real app, this would be an API call to refresh the token
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if we have a stored user to determine if this was a "remember me" session
        const userJson = localStorage.getItem(USER_KEY)
        const rememberMe = !!userJson

        const tokens = generateMockTokens(rememberMe)
        AuthService.setTokens(tokens)

        resolve(tokens)
      }, 500)
    })
  },

  // Check if the current token is valid
  isTokenValid: (): boolean => {
    const expiresAtStr = localStorage.getItem(EXPIRES_AT_KEY)

    if (!expiresAtStr) {
      return false
    }

    const expiresAt = Number.parseInt(expiresAtStr, 10)
    // Add a small buffer (30 seconds) to account for any timing issues
    return Date.now() < expiresAt - 30000
  },

  // Get the current access token
  getAccessToken: (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  },

  // Get the current user
  getUser: (): User | null => {
    const userJson = localStorage.getItem(USER_KEY)
    return userJson ? JSON.parse(userJson) : null
  },

  // Set tokens in storage
  setTokens: (tokens: AuthTokens): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
    localStorage.setItem(EXPIRES_AT_KEY, tokens.expiresAt.toString())
  },

  // Set user in storage
  setUser: (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  // Initialize auth state from storage
  initializeAuth: (): { user: User | null; tokens: AuthTokens | null; isAuthenticated: boolean } => {
    const user = AuthService.getUser()
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
    const expiresAtStr = localStorage.getItem(EXPIRES_AT_KEY)

    if (!accessToken || !refreshToken || !expiresAtStr || !user) {
      return { user: null, tokens: null, isAuthenticated: false }
    }

    const tokens: AuthTokens = {
      accessToken,
      refreshToken,
      expiresAt: Number.parseInt(expiresAtStr, 10),
    }

    const isAuthenticated = AuthService.isTokenValid()

    return { user, tokens, isAuthenticated }
  },
}

