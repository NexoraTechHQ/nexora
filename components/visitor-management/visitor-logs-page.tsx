"use client"

import { useVisitorLogs } from "@/hooks/use-visitor-logs"
import { VisitorLogsTab } from "./visitor-logs-tab"

export function VisitorLogsPage() {
  const { logs, isLoading, filters, updateFilters, fetchVisitorLogs } = useVisitorLogs()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Visitor Logs</h2>
        <p className="text-xs text-muted-foreground">{logs.length} total logs</p>
      </div>

      <VisitorLogsTab
        logs={logs}
        isLoading={isLoading}
        filters={filters}
        onFilterChange={updateFilters}
        onRefresh={fetchVisitorLogs}
      />
    </div>
  )
}

