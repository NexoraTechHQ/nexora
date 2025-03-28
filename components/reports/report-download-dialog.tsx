"use client"

import { useState } from "react"
import { FileDown, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ReportDownloadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReportDownloadDialog({ open, onOpenChange }: ReportDownloadDialogProps) {
  const [format, setFormat] = useState("pdf")
  const [timeRange, setTimeRange] = useState("7d")
  const [isDownloading, setIsDownloading] = useState(false)
  const [selectedReports, setSelectedReports] = useState({
    visitorFrequency: true,
    peakVisitTimes: true,
    visitorDemographics: true,
    appointmentStats: true,
    accessLogs: true,
    departmentAccess: true,
    securityIncidents: true,
    visitorTrends: false,
    predictiveModeling: false,
    anomalyDetection: false,
  })

  const handleDownload = () => {
    setIsDownloading(true)

    // Simulate download
    setTimeout(() => {
      setIsDownloading(false)
      onOpenChange(false)

      // Show success notification (in a real app)
      console.log("Report downloaded successfully")
    }, 2000)
  }

  const toggleReport = (report: keyof typeof selectedReports) => {
    setSelectedReports((prev) => ({
      ...prev,
      [report]: !prev[report],
    }))
  }

  const selectAll = () => {
    const allSelected = Object.values(selectedReports).every(Boolean)

    const newState = Object.keys(selectedReports).reduce(
      (acc, key) => {
        acc[key as keyof typeof selectedReports] = !allSelected
        return acc
      },
      {} as typeof selectedReports,
    )

    setSelectedReports(newState)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Download Report</DialogTitle>
          <DialogDescription>
            Customize and download your report with the selected metrics and format.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Time Range</Label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
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

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Select Metrics</Label>
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={selectAll}>
                {Object.values(selectedReports).every(Boolean) ? "Deselect All" : "Select All"}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="visitorFrequency"
                  checked={selectedReports.visitorFrequency}
                  onCheckedChange={() => toggleReport("visitorFrequency")}
                />
                <Label htmlFor="visitorFrequency" className="text-sm">
                  Visitor Frequency
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="peakVisitTimes"
                  checked={selectedReports.peakVisitTimes}
                  onCheckedChange={() => toggleReport("peakVisitTimes")}
                />
                <Label htmlFor="peakVisitTimes" className="text-sm">
                  Peak Visit Times
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="visitorDemographics"
                  checked={selectedReports.visitorDemographics}
                  onCheckedChange={() => toggleReport("visitorDemographics")}
                />
                <Label htmlFor="visitorDemographics" className="text-sm">
                  Visitor Demographics
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="appointmentStats"
                  checked={selectedReports.appointmentStats}
                  onCheckedChange={() => toggleReport("appointmentStats")}
                />
                <Label htmlFor="appointmentStats" className="text-sm">
                  Appointment Stats
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="accessLogs"
                  checked={selectedReports.accessLogs}
                  onCheckedChange={() => toggleReport("accessLogs")}
                />
                <Label htmlFor="accessLogs" className="text-sm">
                  Access Logs
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="departmentAccess"
                  checked={selectedReports.departmentAccess}
                  onCheckedChange={() => toggleReport("departmentAccess")}
                />
                <Label htmlFor="departmentAccess" className="text-sm">
                  Department Access
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="securityIncidents"
                  checked={selectedReports.securityIncidents}
                  onCheckedChange={() => toggleReport("securityIncidents")}
                />
                <Label htmlFor="securityIncidents" className="text-sm">
                  Security Incidents
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="visitorTrends"
                  checked={selectedReports.visitorTrends}
                  onCheckedChange={() => toggleReport("visitorTrends")}
                />
                <Label htmlFor="visitorTrends" className="text-sm">
                  Visitor Trends
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="predictiveModeling"
                  checked={selectedReports.predictiveModeling}
                  onCheckedChange={() => toggleReport("predictiveModeling")}
                />
                <Label htmlFor="predictiveModeling" className="text-sm">
                  Predictive Modeling
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anomalyDetection"
                  checked={selectedReports.anomalyDetection}
                  onCheckedChange={() => toggleReport("anomalyDetection")}
                />
                <Label htmlFor="anomalyDetection" className="text-sm">
                  Anomaly Detection
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Format</Label>
            <RadioGroup value={format} onValueChange={setFormat} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf">PDF</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel">Excel</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv">CSV</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleDownload} disabled={isDownloading} className="gap-1">
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <FileDown className="h-4 w-4" />
                Download
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

