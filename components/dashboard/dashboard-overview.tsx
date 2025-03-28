"use client"

import { useState } from "react"
import { Calendar, Clock, Users, UserCheck, ArrowUpRight, ArrowDownRight, BarChart3, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { RecentVisitorsTable } from "./recent-visitors-table"
import { VisitorStatsChart } from "./visitor-stats-chart"
import { TodayAppointments } from "./today-appointments"
import { useDashboardViewModel } from "@/lib/view-models/dashboard-view-model"

export function DashboardOverview() {
  const [activeTab, setActiveTab] = useState("overview")
  const { isLoading, error, stats, visitorStats, recentVisitors, refreshData } = useDashboardViewModel()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-tight">Dashboard</h1>
          <Button variant="outline" size="sm" className="h-7 gap-1" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span className="text-xs">Refresh</span>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here's an overview of your visitor management system.
        </p>
      </div>

      {error && (
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-3">
            <p className="text-xs text-destructive">Error loading dashboard data. Please try refreshing.</p>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="h-8 bg-secondary/50 p-0.5">
          <TabsTrigger
            value="overview"
            className="text-xs h-7 rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="text-xs h-7 rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="text-xs h-7 rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none"
          >
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 ms-motion-fadeIn">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
              <>
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
              </>
            ) : (
              <>
                <Card className="hover:border-primary/30 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs font-medium">Total Visitors Today</CardTitle>
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-3.5 w-3.5 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">{stats?.totalVisitorsToday || 0}</div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <span className="text-emerald-500 flex items-center">
                        <ArrowUpRight className="h-3 w-3" />
                        {stats?.visitorsTrend || 0}%
                      </span>
                      from yesterday
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:border-primary/30 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs font-medium">Checked-in Visitors</CardTitle>
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserCheck className="h-3.5 w-3.5 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">{stats?.checkedInVisitors || 0}</div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <span className="text-emerald-500 flex items-center">
                        <ArrowUpRight className="h-3 w-3" />
                        {stats?.checkedInTrend || 0}%
                      </span>
                      from yesterday
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:border-primary/30 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs font-medium">Upcoming Appointments</CardTitle>
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">{stats?.upcomingAppointments || 0}</div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <span
                        className={
                          stats?.appointmentsTrend && stats.appointmentsTrend < 0
                            ? "text-rose-500 flex items-center"
                            : "text-emerald-500 flex items-center"
                        }
                      >
                        {stats?.appointmentsTrend && stats.appointmentsTrend < 0 ? (
                          <ArrowDownRight className="h-3 w-3" />
                        ) : (
                          <ArrowUpRight className="h-3 w-3" />
                        )}
                        {Math.abs(stats?.appointmentsTrend || 0)}%
                      </span>
                      from yesterday
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:border-primary/30 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs font-medium">Average Visit Duration</CardTitle>
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">{stats?.averageVisitDuration || "0m"}</div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <span className="text-emerald-500 flex items-center">
                        <ArrowUpRight className="h-3 w-3" />
                        {stats?.durationTrend || 0}%
                      </span>
                      from last week
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 hover:border-primary/30 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Visitor Statistics</CardTitle>
                <CardDescription className="text-xs">Visitor trends over the past 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-[250px] w-full" />
                ) : (
                  <VisitorStatsChart data={visitorStats?.daily || []} />
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-3 hover:border-primary/30 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Today's Appointments</CardTitle>
                <CardDescription className="text-xs">Upcoming scheduled visits</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : (
                  <TodayAppointments />
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="hover:border-primary/30 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-sm">Recent Visitors</CardTitle>
                <CardDescription className="text-xs">A list of recent visitors to your facility</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : (
                <RecentVisitorsTable visitors={recentVisitors || []} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 ms-motion-fadeIn">
          <Card className="hover:border-primary/30 transition-colors">
            <CardHeader>
              <CardTitle className="text-sm">Visitor Analytics</CardTitle>
              <CardDescription className="text-xs">Detailed analysis of visitor patterns and trends</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-center">
                <BarChart3 className="h-8 w-8 text-muted-foreground/60" />
                <h3 className="text-base font-semibold">Analytics Dashboard</h3>
                <p className="text-xs text-muted-foreground max-w-md">
                  Detailed analytics will be displayed here with visitor trends, peak hours, department access patterns,
                  and more.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4 ms-motion-fadeIn">
          <Card className="hover:border-primary/30 transition-colors">
            <CardHeader>
              <CardTitle className="text-sm">Reports</CardTitle>
              <CardDescription className="text-xs">Generate and view reports on visitor activity</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-center">
                <BarChart3 className="h-8 w-8 text-muted-foreground/60" />
                <h3 className="text-base font-semibold">Reports Dashboard</h3>
                <p className="text-xs text-muted-foreground max-w-md">
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

