import React from 'react'
import { NavLink, Link } from 'react-router'

const navSections = [
  {
    title: 'Core Operations',
    items: [
      { to: '/fpo/dashboard', label: 'Dashboard', icon: 'dashboard', isCurrent: true },
      { to: '/fpo/requests', label: 'Incoming Requests', icon: 'mark_email_unread', badge: '4 New', badgeHighlight: true },
      { to: '/fpo/farmers', label: 'Farmers', icon: 'group', badge: '42' },
      { to: '/fpo/buyers', label: 'Buyers', icon: 'apartment', badge: '8' },
      { to: '/fpo/supply', label: 'Supply Inward', icon: 'inventory_2', badge: '3.9 T' },
      { to: '/fpo/matching', label: 'Matching Engine', icon: 'tune', badge: 'Live', badgeSolid: true },
    ],
  },
  {
    title: 'Logistics & Quality',
    items: [
      { to: '/fpo/collection', label: 'Collection & Bay', icon: 'scale' },
      { to: '/fpo/quality', label: 'Quality Inspection', icon: 'verified', badge: '5 Pnd', badgePeach: true },
      { to: '/fpo/delivery', label: 'Transit & Deliveries', icon: 'local_shipping', badge: '11' },
    ],
  },
  {
    title: 'Settlement & Audit',
    items: [
      { to: '/fpo/settlements', label: 'Settlements', icon: 'currency_rupee', textBadge: '₹1.84L' },
      { to: '/fpo/reserve-fund', label: 'Reserve Fund', icon: 'shield_with_heart' },
      { to: '/fpo/analytics', label: 'Analytics & Reports', icon: 'bar_chart' },
    ],
  },
]

export default function FPOSidebar({ isOpen = false, onClose = () => {} }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[270px] shrink-0 bg-[#1b6e53] text-[#ffffff] flex flex-col justify-between transition-transform duration-200 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto shadow-sm ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#e8fe85] flex items-center justify-center text-[#1b6e53]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 21h18L12 2zm0 4.5l5.5 11.5h-11L12 6.5z"></path>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-editorial text-xl font-normal tracking-tight text-[#ffffff]">
                    farmlink
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-wider bg-[#e8fe85]/20 text-[#e8fe85] px-1.5 py-0.5 rounded-full">
                    OS
                  </span>
                </div>
                <p className="text-[10px] text-[#e6ecd5]/80 tracking-wide">Nashik Central Hub #04</p>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 lg:hidden cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1.5 text-xs">
            {navSections.map((section, sIdx) => (
              <div key={section.title} className={sIdx > 0 ? 'pt-3' : ''}>
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#e6ecd5]/70">
                  {section.title}
                </div>
                {section.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={true}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-2 rounded-[100px] transition ${
                        isActive
                          ? 'bg-[#e8fe85] text-[#1b6e53] font-semibold'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`material-symbols-outlined text-[18px] ${
                              isActive
                                ? 'text-[#1b6e53]'
                                : item.badgeSolid
                                ? 'text-[#e8fe85]'
                                : 'text-white/70'
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </div>

                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53]"></span>
                        )}

                        {!isActive && item.badge && !item.badgeHighlight && !item.badgeSolid && !item.badgePeach && (
                          <span className="px-2 py-0.5 rounded-full bg-white/15 text-[10px] font-medium text-[#e6ecd5]">
                            {item.badge}
                          </span>
                        )}

                        {!isActive && item.badgeHighlight && (
                          <span className="px-2 py-0.5 rounded-full bg-[#e8fe85]/20 text-[#e8fe85] text-[10px] font-medium">
                            {item.badge}
                          </span>
                        )}

                        {!isActive && item.badgePeach && (
                          <span className="px-2 py-0.5 rounded-full bg-[#fceace]/20 text-[#fceace] text-[10px] font-medium">
                            {item.badge}
                          </span>
                        )}

                        {!isActive && item.badgeSolid && (
                          <span className="px-2 py-0.5 rounded-full bg-[#e8fe85] text-[#1b6e53] text-[9px] font-bold">
                            {item.badge}
                          </span>
                        )}

                        {!isActive && item.textBadge && (
                          <span className="text-[11px] font-medium text-[#e8fe85]">
                            {item.textBadge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            ))}
          </nav>
        </div>

        {/* Manager Account Tile */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between p-2.5 rounded-[20px] bg-white/10 border border-white/15">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center font-bold text-xs">
                  PV
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#e8fe85] rounded-full ring-2 ring-[#1b6e53]"></span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-white truncate">p.vishnu vardhan</span>
                <span className="text-[10px] text-[#e6ecd5]/80 truncate">Hub Director • Nashik</span>
              </div>
            </div>
            <button
              className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
              title="Settings"
            >
              <span className="material-symbols-outlined text-[18px]">more_vert</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
