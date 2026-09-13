import React from 'react'
import { Link } from 'react-router'

export default function AuthHeader({ portalTitle = 'FPO Federation', backTo = '/', backLabel = 'Back to Launch Portal' }) {
  return (
    <header className="w-full bg-[#f1efdf]/90 backdrop-blur-md sticky top-0 z-40 border-b border-[#c3cda7]/50">
      <div className="max-w-7xl mx-auto h-20 px-6 sm:px-10 flex items-center justify-between">
        {/* Left: FarmLink Identity */}
        <div className="flex items-center gap-3.5">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3 21h18L12 2zm0 4.5l5.5 11.5h-11L12 6.5z"></path>
              </svg>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-editorial text-2xl font-bold tracking-tight text-[#00372a]">
                FarmLink
              </span>
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6ecd5] border border-[#c3cda7] text-[#1b6e53]">
                <span className="w-2 h-2 rounded-full bg-[#1b6e53]"></span>
                <span className="text-[11px] font-semibold tracking-wide uppercase font-mono">
                  {portalTitle}
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Right Action Link */}
        <div className="flex items-center gap-6">
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1b6e53] hover:text-[#00372a] transition-colors group"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">
              arrow_back
            </span>
            <span>{backLabel}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
