'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle2, Database, ShieldCheck } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0a3d62]">Settings</h1>
        <p className="text-gray-600">Manage your blog configuration</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            Backend Status
          </CardTitle>
          <CardDescription>Your database is successfully connected to Supabase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <Database className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-800">Database Active</p>
                <p className="text-xs text-green-700">All content is synced to PostgreSQL</p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-800">Secure Auth</p>
                <p className="text-xs text-blue-700">Protected by Supabase Authentication</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600">
          <p><strong>Sapwebs CMS</strong> - Multi-tenant Blog Platform</p>
          <p>Version 2.0.0 (Migrated to Supabase)</p>
          <p><strong>Environment:</strong> Production</p>
        </CardContent>
      </Card>

      <Card className="border-red-100 bg-red-50/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            Maintenance
          </CardTitle>
          <CardDescription>Advanced system operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" disabled>
              Clear Cache
            </Button>
            <Button variant="outline" disabled>
              Run Database Maintenance
            </Button>
          </div>
          <p className="mt-4 text-xs text-gray-400 font-mono">
             Note: Direct database operations are managed via the Supabase Dashboard.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
