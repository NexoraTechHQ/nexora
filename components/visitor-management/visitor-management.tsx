"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AppointmentsTab } from "./appointments-tab"
import { VisitorLogsTab } from "./visitor-logs-tab"
import { useVisitorManagementViewModel } from "@/lib/view-models/visitor-management-view-model"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  RefreshCw,
  Users,
  UserCircle,
  CalendarClock,
  ClipboardList,
  Info,
  TrendingUp,
  Clock,
  Building,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  VisitorDemographicsChart,
  VisitDurationChart,
  AppointmentDistributionChart,
  AppointmentCompletionChart,
  HourlyVisitChart,
  EntryMethodChart,
  DepartmentVisitChart,
} from "./visitor-charts"

export function VisitorManagement() {
  const [activeTab, setActiveTab] = useState("visitors")
  const { isLoading, error, users, visitors, visitorLogs, appointments, refreshData } = useVisitorManagementViewModel()

  // Count data for summary
  const userCount = users?.length || 0
  const visitorCount = visitors?.length || 0
  const appointmentCount = appointments?.length || 0
  const logCount = visitorLogs?.length || 0

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Visitor Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive data analysis and visualization of visitor patterns and behaviors.
            </p>
          </div>
          <Button variant="outline" size="sm" className="h-9 gap-1" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh Data</span>
          </Button>
        </div>
      </div>

      {error && (
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-3 flex items-center gap-2">
            <Info className="h-4 w-4 text-destructive" />
            <p className="text-sm text-destructive">Error loading visitor management data. Please try refreshing.</p>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Users</CardTitle>
            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-16" /> : userCount}
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Active system users</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Registered Visitors</CardTitle>
            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <UserCircle className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-16" /> : visitorCount}
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Total visitors in database</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Scheduled Appointments</CardTitle>
            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-amber-100 flex items-center justify-center">
              <CalendarClock className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-16" /> : appointmentCount}
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Upcoming appointments</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Visitor Logs</CardTitle>
            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <ClipboardList className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-16" /> : logCount}
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Recent visitor activities</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Analysis Dashboard */}
      <div className="space-y-6">
        {/* Visitor Trends Analysis */}
        <Card className="border shadow-sm">
          <CardHeader className="bg-muted/30 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                <CardTitle className="text-base sm:text-lg">Visitor Trends Analysis</CardTitle>
              </div>
              <Badge variant="outline" className="text-[10px] sm:text-xs font-normal">
                Real-time Data
              </Badge>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              Comprehensive analysis of visitor patterns and behaviors
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <Tabs defaultValue="visitors" className="w-full">
              <TabsList className="mb-4 w-full justify-start overflow-auto">
                <TabsTrigger value="visitors" className="text-xs sm:text-sm">
                  <UserCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="whitespace-nowrap">Visitor Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="appointments" className="text-xs sm:text-sm">
                  <CalendarClock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="whitespace-nowrap">Appointment Metrics</span>
                </TabsTrigger>
                <TabsTrigger value="logs" className="text-xs sm:text-sm">
                  <ClipboardList className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="whitespace-nowrap">Activity Insights</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="visitors" className="mt-0 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xs sm:text-sm font-medium">Visitor Demographics</CardTitle>
                        <UserCircle className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                      </div>
                      <CardDescription className="text-[10px] sm:text-xs">
                        Distribution of visitors by category
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[200px] sm:h-[250px]">
                      {isLoading ? <Skeleton className="h-full w-full rounded-md" /> : <VisitorDemographicsChart />}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xs sm:text-sm font-medium">Visit Duration Analysis</CardTitle>
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                      </div>
                      <CardDescription className="text-[10px] sm:text-xs">
                        Average time spent by visitors
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[200px] sm:h-[250px]">
                      {isLoading ? <Skeleton className="h-full w-full rounded-md" /> : <VisitDurationChart />}
                    </CardContent>
                  </Card>
                </div>

                <div className="rounded-md border overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px] sm:w-[180px] text-xs">Visitor</TableHead>
                        <TableHead className="text-xs">Visit Frequency</TableHead>
                        <TableHead className="text-xs">Avg. Duration</TableHead>
                        <TableHead className="text-xs">Last Visit</TableHead>
                        <TableHead className="text-xs">Visit Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <TableRow key={i}>
                              <TableCell>
                                <Skeleton className="h-6 w-full" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-6 w-full" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-6 w-full" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-6 w-full" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-6 w-full" />
                              </TableCell>
                            </TableRow>
                          ))
                      ) : visitors && visitors.length > 0 ? (
                        visitors.slice(0, 5).map((visitor) => (
                          <TableRow key={visitor.id}>
                            <TableCell className="font-medium text-xs sm:text-sm">{visitor.name}</TableCell>
                            <TableCell className="text-xs sm:text-sm">{visitor.visitCount} visits</TableCell>
                            <TableCell className="text-xs sm:text-sm">32 minutes</TableCell>
                            <TableCell className="text-xs sm:text-sm">{visitor.lastVisit}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] sm:text-xs"
                              >
                                Increasing
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center text-xs sm:text-sm">
                            No visitor data available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="appointments" className="mt-0 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xs sm:text-sm font-medium">Appointment Distribution</CardTitle>
                        <CalendarClock className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
                      </div>
                      <CardDescription className="text-[10px] sm:text-xs">
                        Distribution of appointments by day and time
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[200px] sm:h-[250px]">
                      {isLoading ? <Skeleton className="h-full w-full rounded-md" /> : <AppointmentDistributionChart />}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xs sm:text-sm font-medium">Appointment Completion Rates</CardTitle>
                        <CalendarClock className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
                      </div>
                      <CardDescription className="text-[10px] sm:text-xs">
                        Status breakdown of scheduled appointments
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[200px] sm:h-[250px]">
                      {isLoading ? <Skeleton className="h-full w-full rounded-md" /> : <AppointmentCompletionChart />}
                    </CardContent>
                  </Card>
                </div>

                {isLoading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <AppointmentsTab appointments={appointments || []} />
                )}
              </TabsContent>

              <TabsContent value="logs" className="mt-0 space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xs sm:text-sm font-medium">Hourly Visit Distribution</CardTitle>
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                      </div>
                      <CardDescription className="text-[10px] sm:text-xs">
                        Visitor traffic by hour of day
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[150px] sm:h-[200px]">
                      {isLoading ? <Skeleton className="h-full w-full rounded-md" /> : <HourlyVisitChart />}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xs sm:text-sm font-medium">Entry Method Analysis</CardTitle>
                        <ClipboardList className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                      </div>
                      <CardDescription className="text-[10px] sm:text-xs">
                        Distribution of visitor entry methods
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[150px] sm:h-[200px]">
                      {isLoading ? <Skeleton className="h-full w-full rounded-md" /> : <EntryMethodChart />}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xs sm:text-sm font-medium">Department Visit Heatmap</CardTitle>
                        <Building className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                      </div>
                      <CardDescription className="text-[10px] sm:text-xs">
                        Visitor distribution across departments
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[150px] sm:h-[200px]">
                      {isLoading ? <Skeleton className="h-full w-full rounded-md" /> : <DepartmentVisitChart />}
                    </CardContent>
                  </Card>
                </div>

                {isLoading ? <Skeleton className="h-[300px] w-full" /> : <VisitorLogsTab logs={visitorLogs || []} />}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

