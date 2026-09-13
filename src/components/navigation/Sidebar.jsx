import React from 'react'
import { NavLink, Link } from 'react-router'

export default function Sidebar({
  brandTitle = 'FarmLink',
  brandSubtitle = 'Supply Chain OS',
  badge = 'FPO',
  badgeColor = 'bg-emerald-100 text-emerald-800',
  navItems = [],
  isOpen = false,
  onClose = () => {}
}) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 font-bold text-white shadow-xs">
              🌾
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-slate-900">{brandTitle}</span>
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${badgeColor}`}>
                  {badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">{brandSubtitle}</p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end !== undefined ? item.end : true}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {item.icon && <span className="text-base opacity-80">{item.icon}</span>}
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Portal Switcher Footer */}
        <div className="border-t border-slate-100 p-3 bg-slate-50/50">
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider px-2 mb-1.5">
            Switch Portal
          </p>
          <div className="grid grid-cols-3 gap-1 text-center">
            <Link
              to="/fpo/dashboard"
              className="py-1.5 text-xs font-medium text-slate-600 rounded hover:bg-white hover:text-emerald-700 hover:shadow-xs border border-transparent hover:border-slate-200 transition-all"
            >
              FPO
            </Link>
            <Link
              to="/buyer/dashboard"
              className="py-1.5 text-xs font-medium text-slate-600 rounded hover:bg-white hover:text-emerald-700 hover:shadow-xs border border-transparent hover:border-slate-200 transition-all"
            >
              Buyer
            </Link>
            <Link
              to="/hub/dashboard"
              className="py-1.5 text-xs font-medium text-slate-600 rounded hover:bg-white hover:text-emerald-700 hover:shadow-xs border border-transparent hover:border-slate-200 transition-all"
            >
              Hub
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
