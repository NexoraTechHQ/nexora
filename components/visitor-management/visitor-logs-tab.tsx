"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MoreHorizontal, Calendar, Download, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import type { VisitorLog } from "@/lib/types/models"
import type { VisitorLogFilters } from "@/hooks/use-visitor-logs"

interface VisitorLogsTabProps {
  logs?: VisitorLog[]
  isLoading?: boolean
  filters?: VisitorLogFilters
  onFilterChange?: (filters: VisitorLogFilters) => void
  onRefresh?: () => void
}

export function VisitorLogsTab({
  logs = [],
  isLoading = false,
  filters = {},
  onFilterChange,
  onRefresh,
}: VisitorLogsTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleStatusFilterChange = (value: string) => {
    if (onFilterChange) {
      onFilterChange({
        ...filters,
        status: value as "active" | "completed" | "all",
      })
    }
  }

  const handleEntryMethodFilterChange = (value: string) => {
    if (onFilterChange) {
      onFilterChange({
        ...filters,
        entryMethod: value as "Manual" | "Facial Recognition" | "Card" | "all",
      })
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      if (onFilterChange) {
        onFilterChange({
          ...filters,
          visitorName: value,
          visitorEmail: value,
          hostName: value,
        })
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true)
      await onRefresh()
      setIsRefreshing(false)
    }
  }

  // Render skeleton rows for loading state
  const renderSkeletonRows = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <TableRow key={`skeleton-${index}`} className="h-[40px]">
          <TableCell className="py-1 px-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <div className="flex flex-col gap-0.5">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
            </div>
          </TableCell>
          <TableCell className="py-1 px-2">
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell className="py-1 px-2">
            <Skeleton className="h-4 w-[80px]" />
          </TableCell>
          <TableCell className="py-1 px-2">
            <Skeleton className="h-4 w-[120px]" />
          </TableCell>
          <TableCell className="py-1 px-2">
            <Skeleton className="h-4 w-[120px]" />
          </TableCell>
          <TableCell className="py-1 px-2">
            <Skeleton className="h-4 w-[80px]" />
          </TableCell>
          <TableCell className="py-1 px-2">
            <Skeleton className="h-4 w-[60px] rounded-full" />
          </TableCell>
          <TableCell className="py-1 px-2 w-[70px]">
            <Skeleton className="h-6 w-6 rounded" />
          </TableCell>
        </TableRow>
      ))
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search logs..."
            className="w-full h-7 pl-7 text-xs"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={filters.status || "all"} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-[100px] h-7 text-xs font-normal">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs font-normal">
                All Status
              </SelectItem>
              <SelectItem value="active" className="text-xs font-normal">
                Active
              </SelectItem>
              <SelectItem value="completed" className="text-xs font-normal">
                Completed
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.entryMethod || "all"} onValueChange={handleEntryMethodFilterChange}>
            <SelectTrigger className="w-[120px] h-7 text-xs font-normal">
              <SelectValue placeholder="Entry Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs font-normal">
                All Methods
              </SelectItem>
              <SelectItem value="Manual" className="text-xs font-normal">
                Manual
              </SelectItem>
              <SelectItem value="Facial Recognition" className="text-xs font-normal">
                Facial Recognition
              </SelectItem>
              <SelectItem value="Card" className="text-xs font-normal">
                Card
              </SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="h-7 text-xs gap-1 px-2 py-0 font-normal">
            <Calendar className="h-3 w-3" />
            Date Range
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs gap-1 px-2 py-0 font-normal"
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button variant="outline" size="sm" className="h-7 text-xs gap-1 px-2 py-0 font-normal">
            <Download className="h-3 w-3" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent h-8">
              <TableHead className="text-[10px] font-semibold py-1 px-2">Visitor</TableHead>
              <TableHead className="text-[10px] font-semibold py-1 px-2">Host</TableHead>
              <TableHead className="text-[10px] font-semibold py-1 px-2">Department</TableHead>
              <TableHead className="text-[10px] font-semibold py-1 px-2">Check In</TableHead>
              <TableHead className="text-[10px] font-semibold py-1 px-2">Check Out</TableHead>
              <TableHead className="text-[10px] font-semibold py-1 px-2">Entry Method</TableHead>
              <TableHead className="text-[10px] font-semibold py-1 px-2">Status</TableHead>
              <TableHead className="w-[70px] text-[10px] font-semibold py-1 px-2">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              renderSkeletonRows()
            ) : logs.length > 0 ? (
              logs.map((log) => (
                <TableRow key={log.id} className="text-xs h-[40px]">
                  <TableCell className="py-1 px-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={log.visitorName} />
                        <AvatarFallback className="text-[10px]">
                          {log.visitorName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-xs">{log.visitorName}</span>
                        <span className="text-[10px] text-muted-foreground">{log.visitorEmail}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-1 px-2 text-xs">{log.hostName}</TableCell>
                  <TableCell className="py-1 px-2 text-xs">{log.department}</TableCell>
                  <TableCell className="py-1 px-2 text-[10px]">{new Date(log.checkInTime).toLocaleString()}</TableCell>
                  <TableCell className="py-1 px-2 text-[10px]">
                    {log.checkOutTime ? new Date(log.checkOutTime).toLocaleString() : "—"}
                  </TableCell>
                  <TableCell className="py-1 px-2 text-xs">{log.entryMethod}</TableCell>
                  <TableCell className="py-1 px-2">
                    <Badge
                      variant={log.status === "active" ? "default" : "secondary"}
                      className="text-[10px] px-1.5 py-0 font-normal"
                    >
                      {log.status === "active" ? "Active" : "Completed"}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-1 px-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal className="h-3 w-3" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuLabel className="text-[10px] font-semibold">Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="text-xs font-normal">View details</DropdownMenuItem>
                        {log.status === "active" && (
                          <DropdownMenuItem className="text-xs font-normal">Check out visitor</DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-xs font-normal">Print record</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-16 text-center text-xs">
                  No visitor logs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

