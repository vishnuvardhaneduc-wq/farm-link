import React from 'react'

export default function MatchingEngineSection({ matchingEngine }) {
  return (
    <section className="rounded-[22px] bg-[#1b6e53] text-[#ffffff] p-6 lg:p-8 relative overflow-hidden shadow-sm">
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/15">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#e8fe85] text-[#1b6e53] flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[24px]">tune</span>
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-editorial text-2xl lg:text-3xl font-light tracking-tight text-[#ffffff]">
                {matchingEngine.title}
              </h2>
              <span className="bg-[#e8fe85] text-[#1b6e53] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {matchingEngine.kernelVersion}
              </span>
            </div>
            <p className="text-xs text-[#e6ecd5]/90 mt-1 max-w-2xl font-sans leading-relaxed">
              {matchingEngine.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-[100px] border border-white/30 text-xs font-semibold text-[#ffffff] hover:bg-white/10 transition cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
            <span>View Matrix</span>
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-[100px] border border-white/30 text-xs font-semibold text-[#ffffff] hover:bg-white/10 transition cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            <span>Export Manifest</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2 rounded-[100px] bg-[#e8fe85] text-[#1b6e53] text-xs font-bold hover:bg-[#d8ee6f] transition shadow-sm cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>Run Matching Engine</span>
          </button>
        </div>
      </div>

      {/* Aerial Acreage & Telemetry Banner */}
      <div className="my-6 rounded-[18px] bg-white/10 border border-white/15 overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch">
        <div className="md:col-span-5 relative min-h-[160px]">
          <img
            src={matchingEngine.droneImage}
            alt="Drone Farmland Survey"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00372a]/30 to-[#1b6e53]/90 hidden md:block"></div>
          <div className="absolute top-3 left-3 bg-[#00372a]/80 backdrop-blur-sm text-[#e8fe85] text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#c3cda7]/40">
            {matchingEngine.droneTelemetry.surveyTime}
          </div>
        </div>

        <div className="md:col-span-7 p-4 md:p-5 flex flex-col justify-between bg-white/5">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#e8fe85] font-semibold">
                Cluster Acreage & Soil Telemetry
              </span>
              <span className="text-[10px] text-[#e6ecd5]/70">
                {matchingEngine.droneTelemetry.perimeter}
              </span>
            </div>
            <h3 className="font-editorial text-xl font-normal text-white">
              {matchingEngine.droneTelemetry.title}
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 mt-2 border-t border-white/10 text-center md:text-left">
            <div>
              <span className="text-[10px] text-[#e6ecd5]/80 block uppercase tracking-wider">
                Active Acreage
              </span>
              <span className="font-editorial text-xl text-white font-normal">
                {matchingEngine.droneTelemetry.activeAcreage}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#e6ecd5]/80 block uppercase tracking-wider">
                Avg Soil Moisture
              </span>
              <span className="font-editorial text-xl text-[#e8fe85] font-normal">
                {matchingEngine.droneTelemetry.soilMoisture}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#e6ecd5]/80 block uppercase tracking-wider">
                14-Day Expected Yield
              </span>
              <span className="font-editorial text-xl text-white font-normal">
                {matchingEngine.droneTelemetry.expectedYield}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 py-4 border-b border-white/15">
        {matchingEngine.stats.map((st) => (
          <div key={st.label}>
            <span className="text-[11px] text-[#e6ecd5]/80 uppercase tracking-wider">
              {st.label}
            </span>
            <div
              className={`font-editorial text-3xl mt-1 ${
                st.highlight ? st.highlightColor : 'text-white'
              }`}
            >
              {st.value}
            </div>
          </div>
        ))}
      </div>

      {/* Payload Fulfillment Distribution */}
      <div className="pt-5">
        <div className="flex items-center justify-between text-xs text-[#e6ecd5] mb-2 flex-wrap gap-2">
          <span>Payload Fulfillment Distribution</span>
          <div className="flex items-center gap-4 text-[11px] flex-wrap">
            {matchingEngine.distribution.map((dist) => (
              <span key={dist.label} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${dist.color}`}></span>
                {dist.label}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full h-2.5 bg-white/20 rounded-full flex overflow-hidden">
          {matchingEngine.distribution.map((dist) => (
            <div
              key={dist.label}
              className={`${dist.color} h-full`}
              style={{ width: dist.width }}
              title={dist.label}
            ></div>
          ))}
        </div>
      </div>

      {/* Matching Criteria Footnote */}
      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] text-[#e6ecd5]/80 uppercase tracking-wider">Criteria:</span>
          {matchingEngine.criteria.map((cr) => (
            <span
              key={cr.label}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-[100px] bg-white/10 text-white text-[11px]"
            >
              <span className="material-symbols-outlined text-[13px] text-[#e8fe85]">
                {cr.icon}
              </span>
              {cr.label}
            </span>
          ))}
        </div>
        <span className="text-[11px] text-[#e6ecd5]/70">
          Last automated cycle: {matchingEngine.lastCycleTime}
        </span>
      </div>
    </section>
  )
}
