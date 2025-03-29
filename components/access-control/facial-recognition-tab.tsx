"use client"

import { useState } from "react"
import { Camera, Settings, Shield, AlertTriangle, CheckCircle, RefreshCw, Users, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FacialRecognitionTab() {
  const [isEnabled, setIsEnabled] = useState(true)
  const [threshold, setThreshold] = useState(75)
  const [activeTab, setActiveTab] = useState("settings")

  // Mock data for enterprise facial recognition
  const recognitionStats = {
    enrolledUsers: 128,
    recognitionRate: 99.7,
    falsePositives: 0.2,
    falseNegatives: 0.1,
    averageRecognitionTime: "0.8 seconds",
    lastCalibration: "Yesterday, 8:30 PM",
    systemStatus: "Operational",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch checked={isEnabled} onCheckedChange={setIsEnabled} id="facial-recognition-toggle" />
          <label htmlFor="facial-recognition-toggle" className="text-sm font-medium cursor-pointer">
            Facial Recognition System {isEnabled ? "Enabled" : "Disabled"}
          </label>
        </div>

        <Badge variant={isEnabled ? "default" : "outline"} className="px-2 py-1">
          {isEnabled ? (
            <span className="flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" />
              Active
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5" />
              Inactive
            </span>
          )}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recognition Rate</CardTitle>
            <CardDescription className="text-xs">System accuracy performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{recognitionStats.recognitionRate}%</div>
            <Progress value={recognitionStats.recognitionRate} className="h-2 mt-2" />
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>False Positives: {recognitionStats.falsePositives}%</div>
              <div>False Negatives: {recognitionStats.falseNegatives}%</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Users</CardTitle>
            <CardDescription className="text-xs">Users with facial data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recognitionStats.enrolledUsers}</div>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span>Last enrollment: 2 hours ago</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full text-xs gap-1">
              <Upload className="h-3.5 w-3.5" />
              <span>Enroll New User</span>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <CardDescription className="text-xs">Current operational status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{recognitionStats.systemStatus}</div>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Last calibration: {recognitionStats.lastCalibration}</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full text-xs gap-1">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Run Diagnostics</span>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Facial Recognition Configuration</CardTitle>
          <CardDescription>Configure system settings and parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="settings" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="enrollment">
                <Camera className="h-4 w-4 mr-2" />
                Enrollment
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="mt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Recognition Threshold</label>
                  <span className="text-sm">{threshold}%</span>
                </div>
                <Slider
                  value={[threshold]}
                  onValueChange={(value) => setThreshold(value[0])}
                  min={50}
                  max={99}
                  step={1}
                />
                <p className="text-xs text-muted-foreground">
                  Higher threshold increases security but may reduce recognition rate
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Recognition Mode</label>
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="high-security">High Security</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Camera Source</label>
                  <Select defaultValue="main-entrance">
                    <SelectTrigger>
                      <SelectValue placeholder="Select camera" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cameras</SelectItem>
                      <SelectItem value="main-entrance">Main Entrance</SelectItem>
                      <SelectItem value="side-entrance">Side Entrance</SelectItem>
                      <SelectItem value="secure-area">Secure Area</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Liveness Detection</label>
                    <p className="text-xs text-muted-foreground">Prevents spoofing with photos or videos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Multi-Factor Authentication</label>
                    <p className="text-xs text-muted-foreground">
                      Require additional verification for high-security areas
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="enrollment" className="mt-4">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Camera className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">User Enrollment</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">
                  Enroll new users into the facial recognition system by capturing and processing facial data
                </p>
                <Button className="mt-4 gap-2">
                  <Camera className="h-4 w-4" />
                  <span>Start Enrollment Process</span>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-4">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">Access Control Integration</CardTitle>
                        <Switch defaultChecked />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Integrate facial recognition with access control systems
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">Audit Logging</CardTitle>
                        <Switch defaultChecked />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Log all facial recognition events for security auditing
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">Intrusion Detection</CardTitle>
                        <Switch defaultChecked />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Alert security when unauthorized access is attempted
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">Privacy Masking</CardTitle>
                        <Switch defaultChecked />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Mask non-essential facial data in logs and recordings
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t flex justify-between">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Configuration</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

