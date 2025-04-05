import { NextResponse } from "next/server"
import { mockService } from "@/lib/services/mock-service"

export async function GET() {
  try {
    // In a real implementation, this would fetch from a database
    const visitors = await mockService.getVisitors()
    return NextResponse.json(visitors)
  } catch (error) {
    console.error("Error fetching visitors:", error)
    return NextResponse.json({ error: "Failed to fetch visitors" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.company) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real implementation, this would create a visitor in the database
    // For now, we'll just return a mock response
    const newVisitor = {
      id: `V${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(3, "0")}`,
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      lastVisit: new Date().toISOString().split("T")[0],
      visitCount: 0,
    }

    return NextResponse.json(newVisitor, { status: 201 })
  } catch (error) {
    console.error("Error creating visitor:", error)
    return NextResponse.json({ error: "Failed to create visitor" }, { status: 500 })
  }
}

