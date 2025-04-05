import { NextResponse } from "next/server"
import { mockService } from "@/lib/services/mock-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // In a real implementation, this would fetch from a database
    const visitor = await mockService.getVisitorById(id)

    if (!visitor) {
      return NextResponse.json({ error: "Visitor not found" }, { status: 404 })
    }

    return NextResponse.json(visitor)
  } catch (error) {
    console.error("Error fetching visitor:", error)
    return NextResponse.json({ error: "Failed to fetch visitor" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // In a real implementation, this would update a visitor in the database
    // For now, we'll just return a mock response
    const updatedVisitor = {
      id,
      ...body,
    }

    return NextResponse.json(updatedVisitor)
  } catch (error) {
    console.error("Error updating visitor:", error)
    return NextResponse.json({ error: "Failed to update visitor" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // In a real implementation, this would delete a visitor from the database
    // For now, we'll just return a success response

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting visitor:", error)
    return NextResponse.json({ error: "Failed to delete visitor" }, { status: 500 })
  }
}

