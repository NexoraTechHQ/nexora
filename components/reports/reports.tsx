"use client"

import { useState } from "react"
import { BarChart3, Download, FileDown, Filter, Calendar, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { VisitorFrequencyChart } from "./charts/visitor-frequency-chart"
import { PeakVisitTimesChart } from "./charts/peak-visit-times-chart"
import { VisitorDemographicsChart } from "./charts/visitor-demographics-chart"
import { AppointmentStatsChart } from "./charts/appointment-stats-chart"
import { AccessLogsTable } from "./tables/access-logs-table"
import { DepartmentAccessChart } from "./charts/department-access-chart"
import { SecurityIncidentsChart } from "./charts/security-incidents-chart"
import { VisitorTrendsChart } from "./charts/visitor-trends-chart"
import { PredictiveVisitorChart } from "./charts/predictive-visitor-chart"
import { AnomalyDetectionChart } from "./charts/anomaly-detection-chart"
import { ReportsSummaryCards } from "./reports-summary-cards"
import { ReportDownloadDialog } from "./report-download-dialog"
import { useReportsViewModel } from "@/lib/view-models/reports-view-model"

export function Reports() {
  const [activeTab, setActiveTab] = useState("visitor-management")
  const [showDownloadDialog, setShowDownloadDialog] = useState(false)
  const { isLoading, error, visitorStats, accessStats, visitorLogs, accessLogs, timeRange, setTimeRange, refreshData } =
    useReportsViewModel()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-tight">Reports</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => setShowDownloadDialog(true)}>
              <Download className="h-4 w-4" />
              Download Report
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={refreshData} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">Generate and view reports on visitor data and access control.</p>
      </div>

      {error && (
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-3">
            <p className="text-sm text-destructive">Error loading reports data. Please try refreshing.</p>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] h-8">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <ReportsSummaryCards isLoading={isLoading} />

      <Tabs defaultValue="visitor-management" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="visitor-management">Visitor Management</TabsTrigger>
          <TabsTrigger value="access-control">Access Control</TabsTrigger>
          <TabsTrigger value="advanced-analytics">Advanced Analytics</TabsTrigger>
          <TabsTrigger value="custom-reports">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="visitor-management" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold">Visitor Frequency</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <FileDown className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <VisitorFrequencyChart data={visitorStats?.daily} />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold">Peak Visit Times</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <FileDown className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <PeakVisitTimesChart data={visitorStats?.hourly} />
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold">Visitor Demographics</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <FileDown className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <VisitorDemographicsChart data={visitorStats?.demographics} />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold">Appointment Statistics</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <FileDown className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <AppointmentStatsChart data={visitorStats?.appointments} />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="access-control" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold">Access Logs</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <FileDown className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-[300px] w-full" /> : <AccessLogsTable logs={accessLogs || []} />}
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold">Department Access Statistics</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <FileDown className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <DepartmentAccessChart data={accessStats?.departmentAccess} />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold">Security Incidents</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <FileDown className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <SecurityIncidentsChart data={accessStats?.securityIncidents} />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advanced-analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold">Visitor Trends Analysis</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <FileDown className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? <Skeleton className="h-[300px] w-full" /> : <VisitorTrendsChart />}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold">Predictive Visitor Modeling</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <FileDown className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? <Skeleton className="h-[300px] w-full" /> : <PredictiveVisitorChart />}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold">Anomaly Detection</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <FileDown className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </CardHeader>
              <CardContent>
                {isLoading ? <Skeleton className="h-[300px] w-full" /> : <AnomalyDetectionChart />}
              </CardContent>
            </Card>
          </TabsContent>

        <TabsContent value="custom-reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Reports</CardTitle>
              <CardDescription>Create and save custom reports with the metrics that matter to you.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-center">
                <BarChart3 className="h-10 w-10 text-muted-foreground/60" />
                <h3 className="text-xl font-semibold">Create Custom Report</h3>
                <p className="text-muted-foreground max-w-md">
                  Select metrics, time ranges, and visualization types to build your own custom reports.
                </p>
                <Button className="mt-4">Create New Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ReportDownloadDialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog} />
    </div>
  )
}

