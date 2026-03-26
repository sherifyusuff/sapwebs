"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  Trash2, 
  UserPlus, 
  Shield, 
  ShieldCheck,
  Loader2,
  Mail
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { adminGetAdmins, adminUpdateAdmin, adminDeleteAdmin } from "@/lib/admin-actions"
import type { Admin } from "@/lib/database.types"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth()
  const [admins, setAdmins] = useState<Admin[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  const fetchAdmins = async () => {
    try {
      setIsLoading(true)
      const data = await adminGetAdmins()
      setAdmins(data)
    } catch (e) {
      console.error("Failed to fetch admins:", e)
      toast.error("Failed to load admin users")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
    fetchAdmins()
  }, [])

  const handleRoleChange = async (id: string, newRole: "admin" | "editor") => {
    try {
      await adminUpdateAdmin(id, { role: newRole })
      toast.success("Role updated")
      fetchAdmins()
    } catch (e) {
      toast.error("Failed to update role")
    }
  }

  const handleDelete = async (id: string, email: string) => {
    if (id === currentUser?.id) {
      toast.error("Cannot delete yourself", { description: "You cannot remove your own admin access." })
      return
    }

    if (confirm(`Are you sure you want to remove admin access for ${email}?`)) {
      try {
        await adminDeleteAdmin(id)
        toast.success("Admin removed")
        fetchAdmins()
      } catch (e) {
        toast.error("Failed to remove admin")
      }
    }
  }

  if (!mounted) return null

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Manage Admins</h1>
          <p className="mt-1 text-sm text-gray-500">View and manage users with dashboard access</p>
        </div>
        <Button className="bg-[#0a3d62] hover:bg-[#1a5f8a] gap-2" disabled>
          <UserPlus className="h-4 w-4" />
          Invite Admin
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
          <CardDescription>
            Only users in this list can access the /admin dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-[#0a3d62]" />
            </div>
          ) : admins.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <Users className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p>No other admins found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {admins.map((adm) => (
                <div
                  key={adm.id}
                  className="flex flex-col gap-4 rounded-lg border p-4 transition-colors sm:flex-row sm:items-center sm:justify-between hover:bg-gray-50 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#f0f9ff] flex items-center justify-center text-[#0a3d62]">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{adm.email} {adm.id === currentUser?.id && "(You)"}</p>
                      <p className="text-xs text-gray-500">Joined on {new Date(adm.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                       <ShieldCheck className="h-4 w-4 text-[#0a3d62]" />
                       <Select 
                        value={adm.role} 
                        onValueChange={(val) => handleRoleChange(adm.id, val as "admin" | "editor")}
                        disabled={adm.id === currentUser?.id}
                      >
                        <SelectTrigger className="w-28 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(adm.id, adm.email)}
                      disabled={adm.id === currentUser?.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 flex gap-3">
        <Mail className="h-5 w-5 shrink-0" />
        <p>
          <strong>Note:</strong> To invite new admins, they must first create a Supabase Auth account. 
          Use the Supabase Dashboard to manually add users to the <code>public.admins</code> table to grant them access here.
        </p>
      </div>
    </div>
  )
}
