import React, { useState } from 'react'
import { Outlet } from 'react-router'
import TopMarquee from '../components/fpo/TopMarquee'
import FPOSidebar from '../components/fpo/FPOSidebar'
import FPOHeader from '../components/fpo/FPOHeader'
import FPOFooter from '../components/fpo/FPOFooter'
import { fpoDashboardData } from '../data/fpoDashboardData'

export default function FPOLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { hubInfo } = fpoDashboardData

  return (
    <div className="min-h-screen flex flex-col bg-[#f1efdf] text-[#212529] font-sans antialiased selection:bg-[#e8fe85] selection:text-[#1b6e53]">
      {/* 0. Top Operational Marquee Strip */}
      <TopMarquee hubInfo={hubInfo} />

      {/* Full Layout Shell */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Editorial Sidebar */}
        <FPOSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content Column */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Editorial Header Bar */}
          <FPOHeader hubInfo={hubInfo} onMenuClick={() => setSidebarOpen(true)} />

          {/* Main Workspace on Warm Bone Canvas */}
          <main className="p-6 lg:p-10 space-y-8 flex-1">
            <Outlet />
          </main>

          {/* Footer */}
          <FPOFooter hubInfo={hubInfo} />
        </div>
      </div>
    </div>
  )
}
