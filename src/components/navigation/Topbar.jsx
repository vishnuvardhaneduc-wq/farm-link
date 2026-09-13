import React from 'react'
import { Link } from 'react-router'

export default function Topbar({
  onMenuClick,
  title = '',
  portalName = 'Portal',
  user = { name: 'Manager', role: 'Operator' }
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-xs sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden cursor-pointer"
          aria-label="Toggle Navigation"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {title && <span className="font-semibold text-slate-800 text-sm hidden md:inline-block">{title}</span>}
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="text-xs font-medium text-slate-500 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-3 py-1.5 rounded-md transition-colors"
        >
          ← Home
        </Link>

        <div className="h-4 w-px bg-slate-200" />

        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
            {user.name.charAt(0)}
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold text-slate-800">{user.name}</p>
            <p className="text-[10px] text-slate-500 capitalize">{portalName} • {user.role}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
