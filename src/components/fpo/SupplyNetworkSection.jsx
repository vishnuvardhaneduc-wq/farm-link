import React from 'react'

export default function SupplyNetworkSection({ workflow }) {
  return (
    <section className="rounded-[22px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#c3cda7]/50">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#e8fe85] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <span className="material-symbols-outlined text-[20px]">hub</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-2 py-0.5 rounded-full border border-[#c3cda7]">
                END-TO-END FPO PIPELINE
              </span>
              <span className="text-[10px] font-mono text-[#6d6d6d] uppercase tracking-wider">
                Buyer → FPO → Hub → Farmer Workflow
              </span>
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight">
              Supply Network Workflow
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#1b6e53] bg-[#e6ecd5] px-3 py-1.5 rounded-full border border-[#c3cda7]">
          <span className="w-2 h-2 rounded-full bg-[#1b6e53] animate-pulse"></span>
          <span>8 Stages Active & Synced</span>
        </div>
      </div>

      {/* 8-Stage Pipeline Grid / Chain */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3 relative">
        {workflow.map((item, idx) => (
          <div key={item.stage} className="flex flex-col justify-between relative group">
            <div className="p-3.5 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7]/70 flex flex-col justify-between h-full space-y-2 hover:border-[#1b6e53] transition shadow-2xs">
              <div>
                {/* Stage Header */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#6d6d6d]">
                    0{idx + 1}
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-[#1b6e53]">
                    {item.icon}
                  </span>
                </div>

                <h3 className="font-semibold text-xs text-[#212529] leading-snug">
                  {item.stage}
                </h3>
              </div>

              {/* Quantity & Status Badge */}
              <div className="space-y-1.5 pt-2 border-t border-[#c3cda7]/40">
                <div className="font-editorial text-base font-bold text-[#1b6e53]">
                  {item.quantity}
                </div>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${item.badgeBg} ${item.badgeText}`}
                >
                  {item.status}
                </span>

                {/* Progress Bar */}
                <div className="w-full bg-white/60 h-1.5 rounded-full overflow-hidden mt-1.5 border border-[#c3cda7]/30">
                  <div
                    className="bg-[#1b6e53] h-full rounded-full transition-all duration-500"
                    style={{ width: item.progress }}
                    title={`Progress: ${item.progress}`}
                  ></div>
                </div>
              </div>
            </div>

            {/* Desktop Connector Arrow */}
            {idx < workflow.length - 1 && (
              <div className="hidden xl:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-[#1b6e53] text-[#e8fe85] items-center justify-center text-[10px] shadow-sm">
                ➔
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
