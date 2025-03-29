import type React from "react"
import { AccessControlLayout } from "@/components/access-control/access-control-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AccessControlLayout>{children}</AccessControlLayout>
}

