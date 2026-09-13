import React from 'react'

export default function HeroAnnouncement({ announcement }) {
  return (
    <section className="rounded-[22px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Informational Content */}
        <div className="lg:col-span-8 p-6 lg:p-7 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-2.5 py-0.5 rounded-full border border-[#c3cda7]">
                {announcement.edition}
              </span>
              <span className="text-[#c3cda7]">•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#e8fe85] text-[#1b6e53] text-[10px] font-bold uppercase tracking-wider">
                {announcement.badges[0]}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#f1efdf] text-[#353535] text-[10px] font-medium uppercase tracking-wider border border-[#c3cda7]/60">
                {announcement.badges[1]}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#b2cee7]/40 text-[#1b6e53] text-[10px] font-medium uppercase tracking-wider border border-[#c3cda7]/50">
                {announcement.badges[2]}
              </span>
            </div>

            <h2 className="font-editorial text-2xl lg:text-3xl font-light text-[#212529] tracking-tight leading-tight">
              {announcement.title}
            </h2>

            <p className="text-xs text-[#6d6d6d] mt-2 max-w-3xl leading-relaxed">
              {announcement.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#c3cda7]/50 text-xs text-[#353535]">
            <div className="flex items-center gap-4 font-mono text-[11px] flex-wrap">
              <div>
                <span className="text-[#6d6d6d] uppercase text-[9px] block tracking-wider">Station Printer #01</span>
                <span className="text-[#1b6e53] font-semibold">{announcement.telemetry.printerStatus}</span>
              </div>
              <div className="h-6 w-px bg-[#c3cda7]/60 hidden sm:block"></div>
              <div>
                <span className="text-[#6d6d6d] uppercase text-[9px] block tracking-wider">Gate Telemetry</span>
                <span className="font-semibold text-[#212529]">{announcement.telemetry.gateSpeed}</span>
              </div>
              <div className="h-6 w-px bg-[#c3cda7]/60 hidden sm:block"></div>
              <div>
                <span className="text-[#6d6d6d] uppercase text-[9px] block tracking-wider">IVR Channel</span>
                <span className="text-[#1b6e53] font-semibold">{announcement.telemetry.ivrBroadcast}</span>
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 rounded-[100px] border border-[#353535] text-xs font-medium text-[#212529] bg-[#ffffff] hover:bg-[#f1efdf] transition shadow-none font-mono uppercase tracking-wider cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print Batch Manifest</span>
            </button>
          </div>
        </div>

        {/* Right Farmer Spotlight Image */}
        <div className="lg:col-span-4 relative bg-[#f1efdf] border-t lg:border-t-0 lg:border-l border-[#c3cda7] min-h-[220px] overflow-hidden flex flex-col justify-end">
          <img
            src={announcement.spotlight.imageUrl}
            alt="Farmer Spotlight"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00372a]/90 via-[#00372a]/40 to-transparent"></div>
          <div className="relative z-10 p-4 text-white">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#e8fe85] text-[#1b6e53] text-[10px] font-bold uppercase tracking-wider mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53]"></span>
              Spotlight
            </div>
            <h4 className="font-editorial text-lg text-white font-normal leading-snug">
              {announcement.spotlight.title}
            </h4>
            <p className="text-[11px] text-[#e6ecd5]/90 mt-0.5">
              {announcement.spotlight.subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
