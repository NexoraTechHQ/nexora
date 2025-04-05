"use client"

import { useVisitorManagement } from "@/hooks/use-visitor-management"
import { VisitorsTab } from "./visitors-tab"

export function VisitorsPage() {
  const { visitors, isLoading, isSubmitting, fetchVisitors, deleteVisitor, bulkDeleteVisitors } = useVisitorManagement()

  const handleDelete = async (id: string) => {
    await deleteVisitor(id)
  }

  const handleBulkDelete = async (ids: string[]) => {
    await bulkDeleteVisitors(ids)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Visitors Management</h2>
        <p className="text-xs text-muted-foreground">{visitors.length} total visitors</p>
      </div>

      <VisitorsTab
        visitors={visitors}
        isLoading={isLoading || isSubmitting}
        onRefresh={fetchVisitors}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
      />
    </div>
  )
}

