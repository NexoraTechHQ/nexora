"use client"

import { Users, Clock, Building, KeyRound, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface ReportsSummaryCardsProps {
  isLoading: boolean
}

export function ReportsSummaryCards({ isLoading }: ReportsSummaryCardsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-12 mb-1" />
              <Skeleton className="h-3 w-28" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,248</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpRight className="h-3 w-3" />
              12%
            </span>
            from previous period
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Visit Duration</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42m</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpRight className="h-3 w-3" />
              5%
            </span>
            from previous period
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Most Visited Department</CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Marketing</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <span className="text-emerald-500 flex items-center">
              <ArrowUpRight className="h-3 w-3" />
              8%
            </span>
            from previous period
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Security Incidents</CardTitle>
          <KeyRound className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <span className="text-rose-500 flex items-center">
              <ArrowDownRight className="h-3 w-3" />2
            </span>
            from previous period
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

