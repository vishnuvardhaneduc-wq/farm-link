import React from 'react'
import { NavLink, Link } from 'react-router'

const buyerNavSections = [
  {
    title: 'Core Discovery',
    items: [
      { to: '/buyer/dashboard', label: 'Dashboard', icon: 'dashboard' },
      { to: '/buyer/products', label: 'Search Products', icon: 'search', badge: 'Live', badgeSolid: true },
      { to: '/buyer/products/results', label: 'Product Results', icon: 'storefront', badge: '4 FPOs' },
      { to: '/buyer/fpos', label: 'FPO Suppliers', icon: 'apartment', badge: '6 FPOs' },
    ],
  },
  {
    title: 'Demand & RFQs',
    items: [
      { to: '/buyer/demands', label: 'My Requests', icon: 'receipt_long', badge: '4 Active', badgeHighlight: true },
      { to: '/buyer/demands/new', label: 'Post Demand (RFQ)', icon: 'add_circle' },
    ],
  },
  {
    title: 'Orders & Contracts',
    items: [
      { to: '/buyer/orders', label: 'Orders & Fulfillment', icon: 'local_shipping', textBadge: '3 En Route' },
    ],
  },
]

export default function BuyerSidebar({ isOpen = false, onClose = () => {} }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container matching FPO Sidebar */}
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
                  <span className="text-[9px] font-semibold uppercase tracking-wider bg-[#b2cee7]/30 text-[#e8fe85] px-1.5 py-0.5 rounded-full">
                    BUYER
                  </span>
                </div>
                <p className="text-[10px] text-[#e6ecd5]/80 tracking-wide">AgroFresh Enterprise Workspace</p>
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
            {buyerNavSections.map((section, sIdx) => (
              <div key={section.title} className={sIdx > 0 ? 'pt-3' : ''}>
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#e6ecd5]/70 font-mono">
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

                        {!isActive && item.badge && !item.badgeHighlight && !item.badgeSolid && (
                          <span className="px-2 py-0.5 rounded-full bg-white/15 text-[10px] font-medium text-[#e6ecd5]">
                            {item.badge}
                          </span>
                        )}

                        {!isActive && item.badgeHighlight && (
                          <span className="px-2 py-0.5 rounded-full bg-[#e8fe85]/20 text-[#e8fe85] text-[10px] font-medium">
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

        {/* Portal Switcher & Account Tile */}
        <div className="p-4 border-t border-white/10 space-y-3">
          {/* Switch Portal Quick Links */}
          <div className="bg-white/5 rounded-[16px] p-2 border border-white/10">
            <p className="text-[9px] font-mono text-[#e6ecd5]/70 uppercase tracking-widest px-1 mb-1">
              Switch Workspace
            </p>
            <div className="grid grid-cols-3 gap-1 text-center">
              <Link
                to="/fpo/dashboard"
                className="py-1 text-[10px] font-medium text-white/80 rounded hover:bg-white/15 hover:text-white transition"
              >
                FPO
              </Link>
              <Link
                to="/buyer/dashboard"
                className="py-1 text-[10px] font-bold bg-[#e8fe85] text-[#1b6e53] rounded shadow-xs"
              >
                Buyer
              </Link>
              <Link
                to="/hub/dashboard"
                className="py-1 text-[10px] font-medium text-white/80 rounded hover:bg-white/15 hover:text-white transition"
              >
                Hub
              </Link>
            </div>
          </div>

          {/* Buyer Officer Account Tile */}
          <div className="flex items-center justify-between p-2.5 rounded-[20px] bg-white/10 border border-white/15">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#b2cee7] text-[#00372a] flex items-center justify-center font-bold text-xs">
                  AR
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#e8fe85] rounded-full ring-2 ring-[#1b6e53]"></span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-white truncate">Anita Rao</span>
                <span className="text-[10px] text-[#e6ecd5]/80 truncate">AgroFresh Enterprise</span>
              </div>
            </div>
            <Link
              to="/buyer/dashboard"
              className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
              title="Buyer Workspace"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
