"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AccessLogsTab } from "./access-logs-tab"
import { useAccessControlViewModel } from "@/lib/view-models/access-control-view-model"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  RefreshCw,
  Users,
  FileText,
  Scan,
  KeyRound,
  Info,
  ShieldCheck,
  AlertTriangle,
  DoorOpen,
  TrendingUp,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AccessPointUsageChart,
  UserAccessFrequencyChart,
  SecurityIncidentTrendChart,
  AccessMethodDistributionChart,
  RecognitionAccuracyChart,
  FalsePositiveNegativeChart,
  RecognitionSpeedChart,
} from "./access-charts"

export function AccessControl() {
  const [activeTab, setActiveTab] = useState("access-patterns")
  const { isLoading, error, accessLogs, accessStats, refreshData } = useAccessControlViewModel()

  // Mock data for enterprise dashboard
  const securityStatus = {
    status: "Secure",
    lastScan: "2 minutes ago",
    activeUsers: 42,
    securityLevel: 85,
    recentAlerts: 2,
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Access Control Analytics</h1>
            <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
              Data-driven insights into access patterns, security metrics, and system performance.
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
            <p className="text-xs sm:text-sm text-destructive">
              Error loading access control data. Please try refreshing.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Security Status Card */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
              <CardTitle className="text-base sm:text-lg">Security Status</CardTitle>
            </div>
            <Badge className="bg-emerald-500 text-[10px] sm:text-xs">{securityStatus.status}</Badge>
          </div>
          <CardDescription className="text-[10px] sm:text-xs">
            Last system scan: {securityStatus.lastScan} • Active users: {securityStatus.activeUsers}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium">Security Level</span>
                <span className="text-xs sm:text-sm text-muted-foreground">{securityStatus.securityLevel}%</span>
              </div>
              <Progress value={securityStatus.securityLevel} className="h-1 sm:h-2" />
            </div>

            <div className="flex items-center gap-4 justify-center">
              <div className="flex flex-col items-center">
                <div className="text-xl sm:text-3xl font-bold text-emerald-500">24/7</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">Monitoring</div>
              </div>
              <div className="h-8 sm:h-10 w-px bg-border"></div>
              <div className="flex flex-col items-center">
                <div className="text-xl sm:text-3xl font-bold text-blue-500">99.9%</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">Uptime</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              {securityStatus.recentAlerts > 0 ? (
                <div className="flex items-center gap-1 sm:gap-2 text-amber-500">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">
                    {securityStatus.recentAlerts} alerts require attention
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2 text-emerald-500">
                  <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">All systems normal</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Access Control Summary Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">User Access</CardTitle>
            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-16" /> : "128"}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Authorized users</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Access Points</CardTitle>
            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <DoorOpen className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-16" /> : "24"}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Secured entry points</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Today's Access</CardTitle>
            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-amber-100 flex items-center justify-center">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-16" /> : "156"}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Access events today</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Recognition Rate</CardTitle>
            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Scan className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-16" /> : "99.7%"}
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Facial recognition accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Analysis Dashboard */}
      <div className="space-y-6">
        {/* Access Control Analytics */}
        <Card className="border shadow-sm">
          <CardHeader className="bg-muted/30 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
                <CardTitle className="text-base sm:text-lg">Access Control Analytics</CardTitle>
              </div>
              <Badge variant="outline" className="text-[10px] sm:text-xs font-normal">
                Real-time Data
              </Badge>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              Comprehensive analysis of access patterns and security metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <Tabs defaultValue="access-patterns" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4 w-full justify-start overflow-auto">
                <TabsTrigger value="access-patterns" className="text-xs sm:text-sm">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="whitespace-nowrap">Access Patterns</span>
                </TabsTrigger>
                <TabsTrigger value="security-metrics" className="text-xs sm:text-sm">
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="whitespace-nowrap">Security Metrics</span>
                </TabsTrigger>
                <TabsTrigger value="recognition-analytics" className="text-xs sm:text-sm">
                  <Scan className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="whitespace-nowrap">Recognition Analytics</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="access-patterns" className="mt-0 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xs sm:text-sm font-medium">Access Point Usage</CardTitle>
                        <DoorOpen className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                      </div>
                      <CardDescription className="text-[10px] sm:text-xs">
                        Distribution of access across entry points
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[200px] sm:h-[250px]">
                      {isLoading ? <Skeleton className="h-full w-full rounded-md" /> : <AccessPointUsageChart />}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xs sm:text-sm font-medium">User Access Frequency</CardTitle>
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                      </div>
                      <CardDescription className="text-[10px] sm:text-xs">
                        Access frequency by user role
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[200px] sm:h-[250px]">
                      {isLoading ? <Skeleton className="h-full w-full rounded-md" /> : <UserAccessFrequencyChart />}
                    </CardContent>
                  </Card>
                </div>

                <div className="rounded-md border overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px] sm:w-[180px] text-xs">User</TableHead>
                        <TableHead className="text-xs">Department</TableHead>
                        <TableHead className="text-xs">Access Points</TableHead>
                        <TableHead className="text-xs">Access Frequency</TableHead>
                        <TableHead className="text-xs">Anomaly Score</TableHead>
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
                      ) : (
                        <>
                          <TableRow>
                            <TableCell className="font-medium text-xs sm:text-sm">John Smith</TableCell>
                            <TableCell className="text-xs sm:text-sm">IT Department</TableCell>
                            <TableCell className="text-xs sm:text-sm">5 points</TableCell>
                            <TableCell className="text-xs sm:text-sm">12 accesses/day</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200 text-[10px] sm:text-xs"
                              >
                                Low (0.2)
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-xs sm:text-sm">Lisa Johnson</TableCell>
                            <TableCell className="text-xs sm:text-sm">Operations</TableCell>
                            <TableCell className="text-xs sm:text-sm">3 points</TableCell>
                            <TableCell className="text-xs sm:text-sm">8 accesses/day</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200 text-[10px] sm:text-xs"
                              >
                                Low (0.3)
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-xs sm:text-sm">Michael Brown</TableCell>
                            <TableCell className="text-xs sm:text-sm">Security</TableCell>
                            <TableCell className="text-xs sm:text-sm">7 points</TableCell>
                            <TableCell className="text-xs sm:text-sm">15 accesses/day</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200 text-[10px] sm:text-xs"
                              >
                                Low (0.1)
                              </Badge>
                            </TableCell>
                          </TableRow>
                        </>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="security-metrics" className="mt-0 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xs sm:text-sm font-medium">Security Incident Trends</CardTitle>
                        <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
                      </div>
                      <CardDescription className="text-[10px] sm:text-xs">
                        Monthly security incident analysis
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[200px] sm:h-[250px]">
                      {isLoading ? <Skeleton className="h-full w-full rounded-md" /> : <SecurityIncidentTrendChart />}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xs sm:text-sm font-medium">Access Method Distribution</CardTitle>
                        <KeyRound className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
                      </div>
                      <CardDescription className="text-[10px] sm:text-xs">
                        Distribution of access authentication methods
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[200px] sm:h-[250px]">
                      {isLoading ? (
                        <Skeleton className="h-full w-full rounded-md" />
                      ) : (
                        <AccessMethodDistributionChart />
                      )}
                    </CardContent>
                  </Card>
                </div>

                {isLoading ? <Skeleton className="h-[300px] w-full" /> : <AccessLogsTab logs={accessLogs || []} />}
              </TabsContent>

              <TabsContent value="recognition-analytics" className="mt-0 space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xs sm:text-sm font-medium">Recognition Accuracy</CardTitle>
                        <Scan className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                      </div>
                      <CardDescription className="text-[10px] sm:text-xs">
                        Facial recognition accuracy over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[150px] sm:h-[200px]">
                      {isLoading ? <Skeleton className="h-full w-full rounded-md" /> : <RecognitionAccuracyChart />}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xs sm:text-sm font-medium">False Positive/Negative</CardTitle>
                        <Scan className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                      </div>
                      <CardDescription className="text-[10px] sm:text-xs">
                        Analysis of recognition errors
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[150px] sm:h-[200px]">
                      {isLoading ? <Skeleton className="h-full w-full rounded-md" /> : <FalsePositiveNegativeChart />}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xs sm:text-sm font-medium">Recognition Speed</CardTitle>
                        <Scan className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                      </div>
                      <CardDescription className="text-[10px] sm:text-xs">
                        Average processing time in milliseconds
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[150px] sm:h-[200px]">
                      {isLoading ? <Skeleton className="h-full w-full rounded-md" /> : <RecognitionSpeedChart />}
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs sm:text-sm font-medium">Recognition Performance</CardTitle>
                      <CardDescription className="text-[10px] sm:text-xs">System accuracy over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl sm:text-2xl font-bold text-emerald-500">
                        {isLoading ? <Skeleton className="h-8 w-16" /> : "99.7%"}
                      </div>
                      <Progress value={99.7} className="h-1 sm:h-2 mt-2" />
                      <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] sm:text-xs text-muted-foreground">
                        <div>False Positives: 0.2%</div>
                        <div>False Negatives: 0.1%</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs sm:text-sm font-medium">System Utilization</CardTitle>
                      <CardDescription className="text-[10px] sm:text-xs">Resource usage analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-xs">CPU Usage</span>
                          <span className="text-[10px] sm:text-xs">42%</span>
                        </div>
                        <Progress value={42} className="h-1" />

                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-xs">Memory Usage</span>
                          <span className="text-[10px] sm:text-xs">38%</span>
                        </div>
                        <Progress value={38} className="h-1" />

                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-xs">Storage Usage</span>
                          <span className="text-[10px] sm:text-xs">65%</span>
                        </div>
                        <Progress value={65} className="h-1" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

