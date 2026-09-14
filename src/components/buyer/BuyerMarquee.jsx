import React from 'react'

export default function BuyerMarquee() {
  return (
    <div className="w-full bg-[#e8fe85] text-[#212529] px-4 py-2 border-b border-[#c3cda7]/60 overflow-hidden text-xs font-medium tracking-wide">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-2">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest bg-[#1b6e53] text-[#ffffff] px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8fe85] animate-pulse"></span>
            BUYER WORKSPACE ACTIVE
          </span>
          <span className="font-editorial italic text-[14px] text-[#212529]">
            Vol. 04 — FarmLink Agrarian Journal // Institutional Procurement Terminal
          </span>
          <span className="text-[#353535] text-[11px] hidden sm:inline tracking-wider uppercase font-mono">
            • MULTI-FPO BROADCAST ACTIVE • ZERO FARMER APP DEPENDENCY • ESCROW T+0
          </span>
        </div>
        <div className="hidden md:flex items-center gap-5 shrink-0 text-[10px] uppercase font-mono tracking-wider">
          <span className="text-[#353535]">
            Verified FPOs: <strong className="text-[#1b6e53] font-bold">12 Regional Federations</strong>
          </span>
          <span className="text-[#c3cda7]">/</span>
          <span className="text-[#353535]">
            Sync: <strong className="text-[#1b6e53] font-bold">07:18 AM IST</strong>
          </span>
          <a className="underline font-semibold hover:text-[#1b6e53] transition tracking-wider" href="#">
            Procurement SLA →
          </a>
        </div>
      </div>
    </div>
  )
}
