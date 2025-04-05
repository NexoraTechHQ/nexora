import { NextResponse } from "next/server"
import { mockService } from "@/lib/services/mock-service"

export async function GET(request: Request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)

    // In a real implementation, these parameters would be passed to the database query
    const visitorName = searchParams.get("visitorName")
    const visitorEmail = searchParams.get("visitorEmail")
    const hostName = searchParams.get("hostName")
    const department = searchParams.get("department")
    const status = searchParams.get("status")
    const entryMethod = searchParams.get("entryMethod")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    // In a real implementation, this would fetch filtered data from a database
    // For now, we'll fetch all logs and filter them in memory
    const logs = await mockService.getVisitorLogs()

    // Apply filters (in a real implementation, this would be done by the database)
    let filteredLogs = [...logs]

    if (visitorName) {
      filteredLogs = filteredLogs.filter((log) => log.visitorName.toLowerCase().includes(visitorName.toLowerCase()))
    }

    if (visitorEmail) {
      filteredLogs = filteredLogs.filter((log) => log.visitorEmail.toLowerCase().includes(visitorEmail.toLowerCase()))
    }

    if (hostName) {
      filteredLogs = filteredLogs.filter((log) => log.hostName.toLowerCase().includes(hostName.toLowerCase()))
    }

    if (department) {
      filteredLogs = filteredLogs.filter((log) => log.department.toLowerCase().includes(department.toLowerCase()))
    }

    if (status && status !== "all") {
      filteredLogs = filteredLogs.filter((log) => log.status === status)
    }

    if (entryMethod && entryMethod !== "all") {
      filteredLogs = filteredLogs.filter((log) => log.entryMethod === entryMethod)
    }

    if (startDate) {
      const start = new Date(startDate)
      filteredLogs = filteredLogs.filter((log) => new Date(log.checkInTime) >= start)
    }

    if (endDate) {
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999) // End of day
      filteredLogs = filteredLogs.filter((log) => new Date(log.checkInTime) <= end)
    }

    return NextResponse.json(filteredLogs)
  } catch (error) {
    console.error("Error fetching visitor logs:", error)
    return NextResponse.json({ error: "Failed to fetch visitor logs" }, { status: 500 })
  }
}

