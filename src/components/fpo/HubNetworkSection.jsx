import React from 'react'

export default function HubNetworkSection({ hubNetwork }) {
  return (
    <section className="rounded-[22px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#c3cda7]/50">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#e8fe85] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-2 py-0.5 rounded-full border border-[#c3cda7]">
                PHYSICAL HUB INFRASTRUCTURE
              </span>
              <span className="text-[10px] font-mono text-[#6d6d6d] uppercase tracking-wider">
                3 Regional Hubs Operational
              </span>
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight">
              Hub Network Status
            </h2>
          </div>
        </div>

        <span className="text-xs font-mono text-[#6d6d6d]">
          Total Capacity: 12,500 kg // Usage: 8,150 kg (65%)
        </span>
      </div>

      {/* Compact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hubNetwork.map((hub) => (
          <div
            key={hub.id}
            className="p-5 rounded-[20px] bg-[#f1efdf] border border-[#c3cda7]/80 flex flex-col justify-between space-y-3"
          >
            {/* Top row: Hub Name & Status */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono text-[#6d6d6d] uppercase block">
                  {hub.id}
                </span>
                <h3 className="font-editorial text-xl font-bold text-[#212529]">
                  {hub.name}
                </h3>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${hub.statusStyle}`}
              >
                {hub.status}
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-[#c3cda7]/50">
              <div>
                <span className="text-[10px] text-[#6d6d6d] uppercase block font-mono">
                  Farmers Assigned
                </span>
                <span className="font-bold text-[#212529] font-mono text-sm">
                  {hub.farmers} Farmers
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#6d6d6d] uppercase block font-mono">
                  Total Capacity
                </span>
                <span className="font-bold text-[#1b6e53] font-mono text-sm">
                  {hub.capacity}
                </span>
              </div>
            </div>

            {/* Usage Progress */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#6d6d6d] text-[11px]">Current Usage</span>
                <span className="font-semibold text-[#212529] font-mono">
                  {hub.currentUsage} ({hub.usagePct}%)
                </span>
              </div>
              <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-[#c3cda7]/40">
                <div
                  className={`${hub.barColor} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${hub.usagePct}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
