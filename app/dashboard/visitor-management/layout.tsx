import type React from "react"
import { VisitorManagementLayout } from "@/components/visitor-management/visitor-management-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <VisitorManagementLayout>{children}</VisitorManagementLayout>
}

