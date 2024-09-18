'use client'

import { ImprovedAdminPanelComponent } from '@/components/improved-admin-panel'

export default function AdminPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-emerald-700">Панель администратора</h1>
      <ImprovedAdminPanelComponent />
    </div>
  )
}