import React, { useState } from 'react'
import { Outlet } from 'react-router'
import BuyerMarquee from '../components/buyer/BuyerMarquee'
import BuyerSidebar from '../components/buyer/BuyerSidebar'
import BuyerHeader from '../components/buyer/BuyerHeader'
import BuyerFooter from '../components/buyer/BuyerFooter'

export default function BuyerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-[#f1efdf] text-[#212529] font-sans antialiased selection:bg-[#e8fe85] selection:text-[#1b6e53]">
      {/* 0. Top Operational Marquee Strip */}
      <BuyerMarquee />

      {/* Full Layout Shell */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Editorial Sidebar */}
        <BuyerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content Column */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Editorial Header Bar */}
          <BuyerHeader onMenuClick={() => setSidebarOpen(true)} />

          {/* Main Workspace on Warm Bone Canvas */}
          <main className="p-6 lg:p-10 space-y-8 flex-1">
            <Outlet />
          </main>

          {/* Footer */}
          <BuyerFooter />
        </div>
      </div>
    </div>
  )
}
