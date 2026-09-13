import React, { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../components/navigation/Sidebar'
import Topbar from '../components/navigation/Topbar'

const buyerNavItems = [
  { to: '/buyer/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/buyer/demands', label: 'My Demands', icon: '📋' },
  { to: '/buyer/demands/new', label: 'Post Demand', icon: '➕' },
  { to: '/buyer/orders', label: 'Orders & Contracts', icon: '📦' },
]

export default function BuyerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar
        brandTitle="FarmLink"
        brandSubtitle="Buyer Procurement"
        badge="Buyer"
        badgeColor="bg-blue-100 text-blue-800"
        navItems={buyerNavItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          portalName="Buyer Portal"
          title="Procurement Workspace"
          user={{ name: 'AgroFresh Enterprise', role: 'Procurement Officer' }}
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
