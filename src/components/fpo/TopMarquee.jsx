import React from 'react'

export default function TopMarquee({ hubInfo }) {
  return (
    <div className="w-full bg-[#e8fe85] text-[#212529] px-4 py-2 border-b border-[#c3cda7]/60 overflow-hidden text-xs font-medium tracking-wide">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-2">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest bg-[#1b6e53] text-[#ffffff] px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8fe85] animate-pulse"></span>
            {hubInfo.status}
          </span>
          <span className="font-editorial italic text-[14px] text-[#212529]">
            {hubInfo.journalVol}
          </span>
          <span className="text-[#353535] text-[11px] hidden sm:inline tracking-wider uppercase font-mono">
            • GATE INWARD OPEN • IVR ACTIVE • ZERO-SMARTPHONE PROTOCOL
          </span>
        </div>
        <div className="hidden md:flex items-center gap-5 shrink-0 text-[10px] uppercase font-mono tracking-wider">
          <span className="text-[#353535]">
            Thermal Paper: <strong className="text-[#1b6e53] font-bold">{hubInfo.thermalPaper}</strong>
          </span>
          <span className="text-[#c3cda7]">/</span>
          <span className="text-[#353535]">
            Sync: <strong className="text-[#1b6e53] font-bold">{hubInfo.syncTime}</strong>
          </span>
          <a className="underline font-semibold hover:text-[#1b6e53] transition tracking-wider" href="#">
            Daily Protocol →
          </a>
        </div>
      </div>
    </div>
  )
}
