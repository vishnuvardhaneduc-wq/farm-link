import React from 'react'

export default function AuthFooter({ tierLabel = 'Institutional Ag-Network Tier' }) {
  return (
    <footer className="w-full bg-[#f1efdf] py-6 border-t border-[#c3cda7]/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#6d6d6d] font-sans text-xs">
        <div>
          © 2026 FarmLink AgroTech Systems. {tierLabel}.
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-[#1b6e53] transition-colors cursor-pointer">Security Protocol</span>
          <span className="text-[#c3cda7]">•</span>
          <span className="hover:text-[#1b6e53] transition-colors cursor-pointer">Privacy Framework</span>
          <span className="text-[#c3cda7]">•</span>
          <span className="hover:text-[#1b6e53] transition-colors cursor-pointer">Network Operations Help</span>
        </div>
      </div>
    </footer>
  )
}
