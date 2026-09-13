import React, { useState } from 'react'

export default function MatchingEngineSection({ fulfillmentAllocationEngine }) {
  const [modalOpen, setModalOpen] = useState(false)
  const engine = fulfillmentAllocationEngine

  return (
    <section className="rounded-[22px] bg-[#1b6e53] text-[#ffffff] p-6 lg:p-8 relative overflow-hidden shadow-sm space-y-6">
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/15">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#e8fe85] text-[#1b6e53] flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[24px]">tune</span>
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-editorial text-2xl lg:text-3xl font-light tracking-tight text-[#ffffff]">
                {engine.title}
              </h2>
              <span className="bg-[#e8fe85] text-[#1b6e53] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {engine.kernelVersion}
              </span>
            </div>
            <p className="text-xs text-[#e6ecd5]/90 mt-1 max-w-2xl font-sans leading-relaxed">
              {engine.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-[100px] bg-[#e8fe85] text-[#1b6e53] text-xs font-bold hover:bg-[#d8ee6f] transition shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>Open Allocation Engine</span>
          </button>
        </div>
      </div>

      {/* Active Order & Hub / Farmer Allocation Card */}
      <div className="rounded-[18px] bg-white/10 border border-white/15 p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Active Order info */}
        <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-white/15 pb-4 lg:pb-0 lg:pr-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#e8fe85]">
            Active Target Order
          </div>
          <div className="font-editorial text-2xl font-normal text-white">
            {engine.activeOrder.buyer}
          </div>
          <div className="text-xs text-[#e6ecd5] space-y-1 font-mono">
            <div>Order ID: <span className="font-bold text-white">{engine.activeOrder.orderId}</span></div>
            <div>Crop Spec: <span className="text-white">{engine.activeOrder.crop}</span></div>
            <div>
              Total Required Quantity:{' '}
              <span className="font-bold text-[#e8fe85] text-sm">{engine.activeOrder.requiredQuantity}</span>
            </div>
          </div>
        </div>

        {/* Hub Allocation breakdown */}
        <div className="lg:col-span-5 space-y-2 border-b lg:border-b-0 lg:border-r border-white/15 pb-4 lg:pb-0 lg:pr-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#e8fe85]">
              Hub Allocation breakdown
            </span>
            <span className="text-[11px] font-bold text-white bg-white/10 px-2 py-0.5 rounded-full">
              {engine.activeOrder.hubsAllocatedCount} Hubs Allocated
            </span>
          </div>

          <div className="space-y-1.5 pt-1">
            {engine.activeOrder.hubs.map((hub) => (
              <div
                key={hub.name}
                className="flex items-center justify-between text-xs bg-black/20 p-2 rounded-[12px] border border-white/10"
              >
                <span className="font-medium text-white">{hub.name}</span>
                <span className="font-mono font-bold text-[#e8fe85]">→ {hub.allocated}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Farmer Allocation Progress */}
        <div className="lg:col-span-3 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#e8fe85]">
            Farmer Allocation Progress
          </div>
          <div className="font-editorial text-3xl font-normal text-white">
            {engine.activeOrder.farmersAllocated}
          </div>
          <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#e8fe85] h-full rounded-full transition-all duration-500"
              style={{ width: `${engine.activeOrder.farmersProgress}%` }}
            ></div>
          </div>
          <div className="text-[10px] text-[#e6ecd5]/80 text-right">
            {engine.activeOrder.farmersProgress}% cluster farmers assigned
          </div>
        </div>
      </div>

      {/* Aerial Acreage & Telemetry Banner */}
      <div className="rounded-[18px] bg-white/10 border border-white/15 overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch">
        <div className="md:col-span-5 relative min-h-[160px]">
          <img
            src={engine.droneImage}
            alt="Drone Farmland Survey"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00372a]/30 to-[#1b6e53]/90 hidden md:block"></div>
          <div className="absolute top-3 left-3 bg-[#00372a]/80 backdrop-blur-sm text-[#e8fe85] text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#c3cda7]/40">
            {engine.droneTelemetry.surveyTime}
          </div>
        </div>

        <div className="md:col-span-7 p-4 md:p-5 flex flex-col justify-between bg-white/5">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#e8fe85] font-semibold">
                Cluster Acreage & Soil Telemetry
              </span>
              <span className="text-[10px] text-[#e6ecd5]/70">
                {engine.droneTelemetry.perimeter}
              </span>
            </div>
            <h3 className="font-editorial text-xl font-normal text-white">
              {engine.droneTelemetry.title}
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 mt-2 border-t border-white/10 text-center md:text-left">
            <div>
              <span className="text-[10px] text-[#e6ecd5]/80 block uppercase tracking-wider">
                Active Acreage
              </span>
              <span className="font-editorial text-xl text-white font-normal">
                {engine.droneTelemetry.activeAcreage}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#e6ecd5]/80 block uppercase tracking-wider">
                Avg Soil Moisture
              </span>
              <span className="font-editorial text-xl text-[#e8fe85] font-normal">
                {engine.droneTelemetry.soilMoisture}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#e6ecd5]/80 block uppercase tracking-wider">
                14-Day Expected Yield
              </span>
              <span className="font-editorial text-xl text-white font-normal">
                {engine.droneTelemetry.expectedYield}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 py-2 border-b border-white/15">
        {engine.stats.map((st) => (
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

      {/* Allocation Engine Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] text-[#212529] border border-[#c3cda7] rounded-[24px] max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]">
              <div>
                <span className="text-[10px] font-mono text-[#1b6e53] font-bold uppercase">
                  Fulfillment Allocation Engine // Simulation
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Allocation Engine Control
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f1efdf] text-[#6d6d6d] hover:text-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-[#e6ecd5] border border-[#1b6e53]/30 rounded-[16px] text-xs text-[#1b6e53] space-y-1">
              <div className="font-bold">Engine Status: Ready for Execution</div>
              <p>Target Order: ORD-8921 (Hotel Krishna — 1,000 kg Tomato Grade A)</p>
              <p>Hub Allocation: Hub A (350 kg) + Hub B (300 kg) + Hub C (350 kg)</p>
              <p>Farmer Allocation: 31 / 42 cluster producers assigned.</p>
            </div>

            <div className="text-xs text-[#6d6d6d]">
              Algorithm simulation ready. Automated allocation logic enforces maximum farmer price realization and zero-middleman transit routing.
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 rounded-[100px] border border-[#c3cda7] text-xs font-semibold text-[#6d6d6d] hover:bg-[#f1efdf] transition cursor-pointer"
              >
                Close Window
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 rounded-[100px] bg-[#1b6e53] text-[#e8fe85] text-xs font-bold hover:bg-[#00372a] transition shadow-sm cursor-pointer"
              >
                Run Allocation Cycle
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
