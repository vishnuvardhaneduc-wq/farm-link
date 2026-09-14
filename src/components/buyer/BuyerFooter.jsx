import React from 'react'

export default function BuyerFooter() {
  return (
    <footer className="py-4 px-6 lg:px-10 border-t border-[#c3cda7]/60 text-xs text-[#6d6d6d] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#f1efdf]">
      <div className="flex items-center gap-2">
        <span className="font-medium text-[#212529]">
          FarmLink Agrarian OS · Buyer Procurement Desk
        </span>
        <span className="px-2 py-0.5 rounded-full bg-[#b2cee7]/50 text-[#00372a] text-[10px] font-mono font-bold border border-[#c3cda7]">
          v2.4
        </span>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff] border border-[#c3cda7]/60 text-[11px] font-mono text-[#353535]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] animate-pulse"></span>
        <span>Procurement Gateway Online · Multi-FPO Relay · 07:18 AM IST</span>
      </div>

      <div className="flex items-center gap-4 text-xs font-medium">
        <a href="#" className="hover:text-[#1b6e53] transition">
          SLA Guidelines
        </a>
        <span className="text-[#c3cda7]">·</span>
        <a href="#" className="hover:text-[#1b6e53] transition">
          Direct FPO Escrow
        </a>
        <span className="text-[#c3cda7]">·</span>
        <a href="#" className="hover:text-[#1b6e53] transition">
          Privacy
        </a>
      </div>
    </footer>
  )
}
