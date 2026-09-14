import React from 'react'

export default function HubFooter() {
  return (
    <footer className="py-4 px-6 lg:px-10 border-t border-[#c3cda7]/60 text-xs text-[#6d6d6d] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#f1efdf]">
      <div className="flex items-center gap-2">
        <span className="font-medium text-[#212529]">
          FarmLink · Rajahmundry Central Hub Workspace
        </span>
        <span className="px-2 py-0.5 rounded-full bg-[#e6ecd5] text-[#1b6e53] text-[10px] font-mono font-bold border border-[#c3cda7]">
          HUB
        </span>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff] border border-[#c3cda7]/60 text-[11px] font-mono text-[#353535]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] animate-pulse"></span>
        <span>Hub Operations Active · Operating Window: 05:00 – 18:00 IST</span>
      </div>

      <div className="flex items-center gap-4 text-xs font-medium">
        <a href="#" className="hover:text-[#1b6e53] transition">
          Standard Protocols
        </a>
        <span className="text-[#c3cda7]">·</span>
        <a href="#" className="hover:text-[#1b6e53] transition">
          Hub Support
        </a>
        <span className="text-[#c3cda7]">·</span>
        <a href="#" className="hover:text-[#1b6e53] transition">
          Privacy
        </a>
      </div>
    </footer>
  )
}
