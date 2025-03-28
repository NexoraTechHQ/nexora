"use client"

import { useState } from "react"
import { Calendar, Clock, Users, UserCheck, ArrowUpRight, ArrowDownRight, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { RecentVisitorsTable } from "./recent-visitors-table"
import { VisitorStatsChart } from "./visitor-stats-chart"
import { TodayAppointments } from "./today-appointments"

export function DashboardOverview() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your visitor management system.</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Visitors Today</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <span className="text-emerald-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3" />
                    12%
                  </span>
                  from yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Checked-in Visitors</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <span className="text-emerald-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3" />
                    8%
                  </span>
                  from yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <span className="text-rose-500 flex items-center">
                    <ArrowDownRight className="h-3 w-3" />
                    3%
                  </span>
                  from yesterday
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
                  from last week
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Visitor Statistics</CardTitle>
                <CardDescription>Visitor trends over the past 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <VisitorStatsChart />
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Today's Appointments</CardTitle>
                <CardDescription>Upcoming scheduled visits</CardDescription>
              </CardHeader>
              <CardContent>
                <TodayAppointments />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Visitors</CardTitle>
                <CardDescription>A list of recent visitors to your facility</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <RecentVisitorsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visitor Analytics</CardTitle>
              <CardDescription>Detailed analysis of visitor patterns and trends</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-center">
                <BarChart3 className="h-10 w-10 text-muted-foreground/60" />
                <h3 className="text-xl font-semibold">Analytics Dashboard</h3>
                <p className="text-muted-foreground max-w-md">
                  Detailed analytics will be displayed here with visitor trends, peak hours, department access patterns,
                  and more.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view reports on visitor activity</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-center">
                <BarChart3 className="h-10 w-10 text-muted-foreground/60" />
                <h3 className="text-xl font-semibold">Reports Dashboard</h3>
                <p className="text-muted-foreground max-w-md">
                  Generate custom reports on visitor data, export in various formats, and schedule automated report
                  delivery.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

