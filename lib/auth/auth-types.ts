export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user" | "manager"
  department: string
  avatarUrl?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresAt: number // timestamp when the access token expires
}

export interface LoginCredentials {
  username: string // can be email or phone
  password: string
  rememberMe?: boolean
}

export interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

