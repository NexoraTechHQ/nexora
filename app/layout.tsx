import type React from "react"
import type { Metadata } from "next/types"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth/auth-provider"

// Replace Inter with Segoe UI (system font) and fallbacks
const fontFamily = {
  className: "font-segoe",
  style: {
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif',
  },
}

export const metadata: Metadata = {
  title: "Nexora - Visitor Management System",
  description: "Multi-tenant SaaS for Visitor Management and Access Control",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={fontFamily.style} className="overflow-hidden">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'