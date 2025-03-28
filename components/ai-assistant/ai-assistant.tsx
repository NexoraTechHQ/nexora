"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, X, Minimize2, Send, Loader2 } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your Nexora assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API call to AI service
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate response based on user input
      const response = generateResponse(input.trim())

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Simple response generator for demo purposes
  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("visitor") && lowerQuery.includes("add")) {
      return "To add a new visitor, go to the Visitor Management section, select the Visitors tab, and click the 'Add Visitor' button. You'll need to fill in their details like name, email, phone number, and company."
    }

    if (lowerQuery.includes("appointment") && (lowerQuery.includes("schedule") || lowerQuery.includes("create"))) {
      return "To schedule an appointment, navigate to the Visitor Management section, select the Appointments tab, and click the 'New Appointment' button. You can then select a date and time, add visitor details, and assign a host for the meeting."
    }

    if (lowerQuery.includes("dashboard") && lowerQuery.includes("overview")) {
      return "The Dashboard Overview provides a summary of key metrics including today's visitors, checked-in visitors, upcoming appointments, and average visit duration. You'll also see visitor statistics charts and a list of recent visitors."
    }

    if (lowerQuery.includes("facial") && lowerQuery.includes("recognition")) {
      return "The Facial Recognition feature allows for automated visitor check-in. You can configure this in the Access Control section under the Facial Recognition tab. There you can adjust recognition thresholds, manage enrollment, and view recognition logs."
    }

    if (lowerQuery.includes("report") || lowerQuery.includes("analytics")) {
      return "You can generate reports by going to the Reports section. There you can create custom reports on visitor data, export them in various formats, and even schedule automated report delivery to stakeholders."
    }

    return "I'm here to help you navigate and use Nexora effectively. You can ask me about features like visitor management, appointments, access control, or any other aspect of the system you need assistance with."
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating button when chat is closed */}
      {!isOpen && (
        <Button onClick={toggleChat} className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90">
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-card border rounded-lg shadow-xl w-80 sm:w-96 flex flex-col overflow-hidden"
            style={{ height: "500px", maxHeight: "calc(100vh - 100px)" }}
          >
            {/* Chat header */}
            <div className="p-3 border-b flex items-center justify-between bg-primary text-primary-foreground">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <h3 className="font-medium">Nexora Assistant</h3>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-primary-foreground/10"
                  onClick={toggleChat}
                >
                  <Minimize2 className="h-4 w-4" />
                  <span className="sr-only">Minimize</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-primary-foreground/10"
                  onClick={toggleChat}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>

            {/* Chat messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-3",
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      {message.role === "assistant" && (
                        <div className="flex items-start gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="AI" />
                            <AvatarFallback className="text-xs">AI</AvatarFallback>
                          </Avatar>
                          <div>{message.content}</div>
                        </div>
                      )}
                      {message.role === "user" && message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=24&width=24" alt="AI" />
                          <AvatarFallback className="text-xs">AI</AvatarFallback>
                        </Avatar>
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Chat input */}
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="min-h-10 resize-none"
                  rows={1}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="shrink-0"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Ask about features, navigation, or how to perform specific tasks.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

