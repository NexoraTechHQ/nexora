"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { UsersTab } from "./users-tab"
import { useUserManagement } from "@/hooks/use-user-management"

export function UsersPage() {
  const { users, isLoading, fetchUsers } = useUserManagement()
  const [activeTab, setActiveTab] = useState("all")

  // Filter users based on active tab
  const filteredUsers = users.filter((user) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return user.status === "active"
    if (activeTab === "inactive") return user.status === "inactive"
    return true
  })

  // Count users by status
  const activeCount = users.filter((user) => user.status === "active").length
  const inactiveCount = users.filter((user) => user.status === "inactive").length

  // Handle refresh
  const handleRefresh = () => {
    fetchUsers()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">User Management</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="h-7 text-xs gap-1 px-2 py-0 font-normal"
          disabled={isLoading}
        >
          <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 h-8">
          <TabsTrigger value="all" className="text-xs">
            All Users ({users.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="text-xs">
            Active ({activeCount})
          </TabsTrigger>
          <TabsTrigger value="inactive" className="text-xs">
            Inactive ({inactiveCount})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <UsersTab users={filteredUsers} onRefresh={handleRefresh} isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="active">
          <UsersTab users={filteredUsers} onRefresh={handleRefresh} isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="inactive">
          <UsersTab users={filteredUsers} onRefresh={handleRefresh} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

