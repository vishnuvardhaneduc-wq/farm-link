import React from 'react'
import { NavLink, Link } from 'react-router'

const hubNavItems = [
  { to: '/hub/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/hub/collection', label: 'Collection', icon: 'move_to_inbox' },
  { to: '/hub/weighing', label: 'Weighing', icon: 'scale' },
  { to: '/hub/quality', label: 'Quality Inspection', icon: 'science' },
  { to: '/hub/aggregation', label: 'Aggregation', icon: 'inventory_2' },
  { to: '/hub/dispatch', label: 'Dispatch', icon: 'local_shipping' },
]

export default function HubSidebar({ isOpen = false, onClose = () => {} }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container matching FPO/Buyer Sidebar */}
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
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-[#e8fe85] text-[#1b6e53] px-2 py-0.5 rounded-full shadow-2xs">
                    HUB
                  </span>
                </div>
                <p className="text-[10px] text-[#e6ecd5]/80 tracking-wide font-sans">
                  Rajahmundry Central Hub
                </p>
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
            <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#e6ecd5]/70 font-mono">
              Hub Operations
            </div>

            {hubNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/hub/dashboard'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-[100px] transition ${
                    isActive
                      ? 'bg-[#e8fe85] text-[#1b6e53] font-semibold shadow-xs'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isActive ? 'text-[#1b6e53]' : 'text-white/70'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="font-medium text-xs">{item.label}</span>
                    </div>

                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53]"></span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Hub Operator Account Tile */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between p-2.5 rounded-[20px] bg-white/10 border border-white/15">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center font-bold text-xs">
                  RC
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#e8fe85] rounded-full ring-2 ring-[#1b6e53]"></span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-white truncate">Rajahmundry Central Hub</span>
                <span className="text-[10px] text-[#e6ecd5]/80 truncate font-mono">Hub Operations Workspace</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
