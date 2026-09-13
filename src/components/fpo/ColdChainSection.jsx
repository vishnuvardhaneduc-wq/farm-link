import React from 'react'

export default function ColdChainSection({ hubLogistics }) {
  const data = hubLogistics || {}

  return (
    <section className="rounded-[22px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Image */}
        <div className="lg:col-span-5 relative min-h-[220px]">
          <img
            src={data.imageUrl}
            alt="Hub & Logistics Fleet & Loading Bay"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#212529]/80 via-transparent to-transparent lg:hidden"></div>
          <div className="absolute bottom-3 left-3 lg:hidden text-white">
            <span className="text-[10px] font-mono uppercase tracking-wider bg-[#1b6e53] px-2 py-0.5 rounded-full">
              Hub Gate #02 Active
            </span>
          </div>
        </div>

        {/* Right Details & Telemetry */}
        <div className="lg:col-span-7 p-6 lg:p-7 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-2.5 py-0.5 rounded-full border border-[#c3cda7]">
                PHYSICAL HUB & FLEET TELEMETRY
              </span>
              <span className="text-xs font-mono text-[#6d6d6d]">3 Regional Hubs Operational</span>
            </div>
            <h3 className="font-editorial text-2xl font-normal text-[#212529] mt-2">
              {data.title}
            </h3>
            <p className="text-xs text-[#6d6d6d] mt-1 leading-relaxed">
              {data.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-3 border-t border-[#c3cda7]/50 text-xs">
            {data.metrics &&
              data.metrics.map((m) => (
                <div key={m.label} className={`p-3 rounded-[16px] ${m.bg} border border-[#c3cda7]/60 flex flex-col justify-between`}>
                  <span className="text-[10px] text-[#6d6d6d] uppercase font-mono block">
                    {m.label}
                  </span>
                  <div className={`font-editorial text-xl font-bold ${m.mainColor} mt-1`}>
                    {m.main}
                  </div>
                  <span className={`text-[10px] mt-0.5 ${m.subColor || 'text-[#353535]'}`}>
                    {m.sub}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
