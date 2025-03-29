import { DesignGuide } from "@/components/design-system/design-guide"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Design System - Nexora",
  description: "Microsoft-style design system for Nexora",
}

export default function DesignSystemPage() {
  return <DesignGuide />
}

