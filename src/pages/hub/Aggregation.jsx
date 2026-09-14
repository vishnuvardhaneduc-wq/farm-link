import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import {
  getStoredHubOperations,
  calculateHubKPIs,
} from '../../data/hubOperationsData'

export default function HubAggregation() {
  const [hubState, setHubState] = useState(getStoredHubOperations())

  useEffect(() => {
    const handleStorage = () => setHubState(getStoredHubOperations())
    window.addEventListener('storage', handleStorage)
    setHubState(getStoredHubOperations())
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const kpis = calculateHubKPIs(hubState)
  const activeOrder = hubState.activeOrder
  const acceptedLots = hubState.farmerLots.filter((l) => l.status === 'Passed')
  const pendingLots = hubState.farmerLots.filter((l) => l.status !== 'Passed')

  const targetRequired = activeOrder.hubAllocatedQty || 700
  const currentAccepted = kpis.totalAccepted
  const progressPct = Math.min(100, Math.round((currentAccepted / targetRequired) * 100))
  const isTargetMet = currentAccepted >= targetRequired

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header & Stage Breadcrumb */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Link to="/hub/dashboard" className="text-[10px] font-mono text-[#1b6e53] font-bold hover:underline">
              ← DASHBOARD
            </Link>
            <span className="text-[#c3cda7]">/</span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              PRODUCE AGGREGATION
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Produce <span className="italic font-normal">Aggregation</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Group accepted produce by order, crop, and grade to monitor consignment fulfillment progress.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/hub/dispatch"
            className={`py-2 px-5 rounded-[100px] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer ${isTargetMet || activeOrder.status === 'Dispatched'
                ? 'bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff]'
                : 'bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7]'
              }`}
          >
            <span>Proceed to Dispatch</span>
            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
          </Link>
        </div>
      </div>

      {/* 2. Order Aggregation Summary Card */}
      <section className="rounded-[24px] bg-[#ffffff] border-2 border-[#1b6e53] p-6 lg:p-7 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-[18px] bg-[#e6ecd5] border border-[#c3cda7] text-[#1b6e53] text-2xl flex items-center justify-center shrink-0 font-bold">
              📦
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-bold text-xs text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">
                  {activeOrder.orderId}
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
                  {activeOrder.crop} — {activeOrder.requiredGrade}
                </h2>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-[100px] bg-[#b2cee7] text-[#00372a]">
                  Buyer: {activeOrder.buyer}
                </span>
              </div>
              <p className="text-xs text-[#6d6d6d] font-mono mt-1">
                Destination: <strong className="text-[#212529]">{activeOrder.destination}</strong> • Hub: <strong className="text-[#212529]">{activeOrder.hubName}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono">
            <span
              className={`px-3.5 py-1.5 rounded-[100px] text-xs font-bold uppercase tracking-wider ${isTargetMet
                  ? 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53]'
                  : 'bg-[#fceace] text-[#683600] border border-[#c3cda7]'
                }`}
            >
              {isTargetMet ? 'Ready for Dispatch' : `Progress: ${currentAccepted} / ${targetRequired} kg`}
            </span>
          </div>
        </div>

        {/* Aggregation Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#00372a] font-bold uppercase tracking-wider">
              Aggregation Progress
            </span>
            <span className="text-[#1b6e53] font-bold">
              {currentAccepted.toLocaleString()} kg / {targetRequired.toLocaleString()} kg Required ({progressPct}%)
            </span>
          </div>
          <div className="w-full bg-[#f1efdf] h-4 rounded-full overflow-hidden border border-[#c3cda7]">
            <div
              className={`h-full transition-all duration-500 ${isTargetMet ? 'bg-[#1b6e53]' : 'bg-[#e8fe85] border-r-2 border-[#1b6e53]'
                }`}
              style={{ width: `${progressPct}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-[#6d6d6d] font-sans">
            {isTargetMet
              ? 'Required accepted quantity reached. Order is ready for dispatch creation.'
              : `Order is pending full aggregation until the required ${targetRequired} kg accepted volume is reached.`}
          </p>
        </div>

        {/* Breakdown of Accepted Producer Contributions */}
        <div className="space-y-3 pt-2">
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#6d6d6d] font-bold">
            ACCEPTED PRODUCER CONTRIBUTIONS ({acceptedLots.length} Lots Cleared)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {acceptedLots.map((lot) => (
              <div
                key={lot.id}
                className="p-4 rounded-[18px] bg-[#f1efdf]/60 border border-[#c3cda7] space-y-2 font-mono"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <strong className="text-xs text-[#00372a] font-bold block">{lot.farmerName}</strong>
                    <span className="text-[10px] text-[#1b6e53]">{lot.farmerId}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e6ecd5] text-[#1b6e53] font-bold border border-[#c3cda7]">
                    {lot.qaGrade || lot.requiredGrade}
                  </span>
                </div>

                <div className="pt-1.5 border-t border-[#c3cda7]/40 space-y-0.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#6d6d6d] text-[10px]">Allocated:</span>
                    <span className="text-[#353535]">{lot.allocatedQty} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6d6d6d] text-[10px]">Collected:</span>
                    <span className="text-[#353535]">{lot.weighedQty || lot.actualCollectedQty} kg</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span className="text-[#1b6e53] text-[10px]">Accepted:</span>
                    <strong className="text-[#1b6e53] text-sm">{lot.acceptedQty} kg</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aggregation Summary Totals Footer */}
        <div className="p-4 rounded-[18px] bg-[#e6ecd5] border border-[#c3cda7] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <span className="text-[10px] text-[#6d6d6d] uppercase block">Total Accepted Volume:</span>
              <strong className="text-lg font-bold text-[#1b6e53]">{currentAccepted} kg</strong>
            </div>
            <div className="h-6 w-px bg-[#c3cda7] hidden sm:block"></div>
            <div>
              <span className="text-[10px] text-[#6d6d6d] uppercase block">Required Volume:</span>
              <strong className="text-lg font-bold text-[#00372a]">{targetRequired} kg</strong>
            </div>
            <div className="h-6 w-px bg-[#c3cda7] hidden sm:block"></div>
            <div>
              <span className="text-[10px] text-[#6d6d6d] uppercase block">Status:</span>
              <strong className={`text-sm font-bold ${isTargetMet ? 'text-[#1b6e53]' : 'text-[#683600]'}`}>
                {isTargetMet ? 'Ready for Dispatch' : `${currentAccepted} / ${targetRequired} kg`}
              </strong>
            </div>
          </div>

          <Link
            to="/hub/dispatch"
            className={`py-2 px-5 rounded-[100px] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer ${isTargetMet
                ? 'bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff]'
                : 'bg-[#ffffff] text-[#6d6d6d] border border-[#c3cda7] pointer-events-none opacity-60'
              }`}
          >
            <span>Create Dispatch →</span>
          </Link>
        </div>
      </section>

      {/* 3. Pending Inward / Lab Lots */}
      {pendingLots.length > 0 && (
        <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-5 lg:p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#00372a]">
                Pending Farmer Lots ({pendingLots.length})
              </h3>
              <p className="text-xs text-[#6d6d6d] font-sans">
                Allocated farmer harvest lots awaiting collection, weighing, or quality clearance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pendingLots.map((lot) => (
              <div
                key={lot.id}
                className="p-3.5 rounded-[16px] bg-[#f1efdf]/40 border border-[#c3cda7] flex items-center justify-between"
              >
                <div>
                  <strong className="text-xs text-[#00372a] block">{lot.farmerName}</strong>
                  <span className="text-[10px] font-mono text-[#6d6d6d]">
                    {lot.farmerId} • Allocated: {lot.allocatedQty} kg
                  </span>
                </div>
                <Link
                  to={lot.status === 'Pending' ? '/hub/collection' : lot.status === 'Collected' ? '/hub/weighing' : '/hub/quality'}
                  className="py-1 px-3 rounded-[100px] bg-[#ffffff] hover:bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7] text-[10px] font-mono font-bold transition"
                >
                  {lot.status === 'Pending' ? 'Collect →' : lot.status === 'Collected' ? 'Weigh →' : 'Inspect →'}
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
