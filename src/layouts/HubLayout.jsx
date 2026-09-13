import React, { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../components/navigation/Sidebar'
import Topbar from '../components/navigation/Topbar'

const hubNavItems = [
  { to: '/hub/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/hub/collection', label: 'Intake & Collection', icon: '📥' },
  { to: '/hub/weighing', label: 'Weighing Station', icon: '⚖️' },
  { to: '/hub/quality', label: 'Quality Assessment', icon: '🔍' },
  { to: '/hub/delivery', label: 'Outbound Dispatch', icon: '🚚' },
]

export default function HubLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar
        brandTitle="FarmLink"
        brandSubtitle="Hub Station Ops"
        badge="Hub"
        badgeColor="bg-amber-100 text-amber-800"
        navItems={hubNavItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          portalName="Hub Portal"
          title="Field Aggregation Hub"
          user={{ name: 'Kheda Central Hub', role: 'Station Supervisor' }}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
