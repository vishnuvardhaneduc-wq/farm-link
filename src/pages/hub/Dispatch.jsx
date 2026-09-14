import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import {
  getStoredHubOperations,
  createHubDispatch,
  calculateHubKPIs,
} from '../../data/hubOperationsData'

export default function HubDispatch() {
  const [hubState, setHubState] = useState(getStoredHubOperations())
  const [showDispatchModal, setShowDispatchModal] = useState(false)
  const [vehicleNo, setVehicleNo] = useState('AP-39-TX-8841')
  const [driverName, setDriverName] = useState('Ramesh Naidu (+91 98480 22341)')
  const [carrier, setCarrier] = useState('Delta Cold-Chain Logistics Ltd')
  const [dispatchDate, setDispatchDate] = useState('2026-09-14')
  const [notes, setNotes] = useState('Insulated container sealed with tamper-proof RFID tag #TG-9021; set to 12°C.')
  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    const handleStorage = () => setHubState(getStoredHubOperations())
    window.addEventListener('storage', handleStorage)
    setHubState(getStoredHubOperations())
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const kpis = calculateHubKPIs(hubState)
  const activeOrder = hubState.activeOrder
  const isDispatched = activeOrder.status === 'Dispatched'
  const targetRequired = activeOrder.hubAllocatedQty || 700
  const isReadyForDispatch = kpis.totalAccepted >= targetRequired || isDispatched

  const handleConfirmDispatch = (e) => {
    e.preventDefault()
    createHubDispatch({
      orderId: activeOrder.orderId,
      vehicleNo,
      driverName,
      carrier,
      dispatchDate,
      notes,
    })

    const updated = getStoredHubOperations()
    setHubState(updated)
    setShowDispatchModal(false)
    setToastMsg(`Consignment successfully marked as Dispatched! Outbound manifest issued for ${activeOrder.orderId}.`)
    setTimeout(() => setToastMsg(''), 5000)
  }

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
              OUTBOUND DISPATCH
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Consignment <span className="italic font-normal">Dispatch</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Verify transport references, issue outbound manifests, and seal aggregated produce for destination delivery.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <span
            className={`px-3.5 py-1.5 rounded-[100px] text-xs font-mono font-bold uppercase tracking-wider ${isDispatched
                ? 'bg-[#b2cee7] text-[#00372a] border border-[#00372a]/30'
                : isReadyForDispatch
                  ? 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53]'
                  : 'bg-[#fceace] text-[#683600] border border-[#c3cda7]'
              }`}
          >
            {isDispatched ? 'Dispatch Complete' : isReadyForDispatch ? 'Ready for Dispatch' : 'Awaiting Aggregation'}
          </span>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMsg && (
        <div className="p-3.5 bg-[#e8fe85] border border-[#1b6e53] text-[#1b6e53] text-xs font-bold rounded-[18px] flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      {/* 2. Dispatch Overview Card */}
      <section className="rounded-[24px] bg-[#ffffff] border-2 border-[#1b6e53] p-6 lg:p-8 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-[18px] bg-[#e6ecd5] border border-[#c3cda7] text-[#1b6e53] text-2xl flex items-center justify-center shrink-0 font-bold">
              🚚
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-bold text-xs text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">
                  {activeOrder.orderId}
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
                  Outbound Consignment Dispatch
                </h2>
              </div>
              <p className="text-xs text-[#6d6d6d] font-mono mt-1">
                Crop: <strong className="text-[#212529]">{activeOrder.crop} ({activeOrder.variety})</strong> • Target: <strong className="text-[#212529]">{targetRequired} kg ({activeOrder.requiredGrade})</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isDispatched ? (
              <button
                type="button"
                disabled={!isReadyForDispatch}
                onClick={() => setShowDispatchModal(true)}
                className="py-3 px-6 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] disabled:opacity-50 disabled:cursor-not-allowed text-[#ffffff] text-xs font-bold uppercase tracking-wider transition shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                <span>Create Dispatch</span>
              </button>
            ) : (
              <div className="py-2.5 px-5 rounded-[100px] bg-[#b2cee7] text-[#00372a] font-mono text-xs font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Dispatch Complete</span>
              </div>
            )}
          </div>
        </div>

        {/* Read-Only Dispatch Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Buyer</span>
            <strong className="text-base text-[#00372a] block font-editorial">{activeOrder.buyer}</strong>
            <p className="text-[10px] text-[#6d6d6d] font-sans">Institutional Client</p>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Origin &amp; Destination</span>
            <strong className="text-sm text-[#00372a] block">{activeOrder.hubName}</strong>
            <span className="text-[10px] text-[#1b6e53] block font-sans">➔ {activeOrder.destination}</span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#e6ecd5] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#1b6e53] uppercase block">Accepted Volume</span>
            <div className="text-xl font-bold text-[#1b6e53]">
              {kpis.totalAccepted.toLocaleString()} kg
            </div>
            <p className="text-[10px] text-[#1b6e53] font-sans">100% Grade A Quality Cleared</p>
          </div>
        </div>

        {/* If already dispatched, show manifest details */}
        {isDispatched && activeOrder.dispatchDetails && (
          <div className="p-5 rounded-[20px] bg-[#ffffff] border-2 border-[#1b6e53] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#1b6e53]">receipt_long</span>
                <strong className="font-editorial text-xl text-[#00372a]">
                  Outbound Manifest: {activeOrder.dispatchDetails.manifestRef}
                </strong>
              </div>
              <span className="px-3 py-0.5 rounded-[100px] bg-[#e8fe85] text-[#1b6e53] font-mono text-[10px] font-bold">
                MANIFEST ISSUED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
              <div>
                <span className="text-[10px] text-[#6d6d6d] block">Vehicle Reference:</span>
                <strong className="text-sm text-[#00372a]">{activeOrder.dispatchDetails.vehicleNo}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#6d6d6d] block">Driver / Carrier Contact:</span>
                <strong className="text-sm text-[#00372a]">{activeOrder.dispatchDetails.driverName}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#6d6d6d] block">Carrier:</span>
                <strong className="text-sm text-[#00372a]">{activeOrder.dispatchDetails.carrier}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#6d6d6d] block">Dispatch Time:</span>
                <strong className="text-sm text-[#1b6e53]">{activeOrder.dispatchDetails.dispatchedAt}</strong>
              </div>
            </div>

            <div className="p-3 bg-[#f1efdf] rounded-[12px] text-xs font-sans text-[#353535]">
              <strong className="text-[#00372a] font-mono">Consignment Notes: </strong>
              <span>{activeOrder.dispatchDetails.notes}</span>
            </div>
          </div>
        )}
      </section>

      {/* 3. Dispatch Creation Modal */}
      {showDispatchModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[24px] max-w-xl w-full p-6 lg:p-7 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]">
              <div>
                <span className="text-[10px] font-mono text-[#1b6e53] font-bold uppercase tracking-wider">
                  DISPATCH RECORD // {activeOrder.orderId}
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Create Outbound Dispatch
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDispatchModal(false)}
                className="w-8 h-8 rounded-full bg-[#f1efdf] text-[#6d6d6d] hover:text-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Read-Only Dispatch Reference Details */}
            <div className="bg-[#f1efdf] p-4 rounded-[18px] space-y-2 border border-[#c3cda7]/60 text-xs font-sans">
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div>
                  <span className="text-[#6d6d6d] text-[10px] block">Order Ref:</span>
                  <strong className="text-[#00372a]">{activeOrder.orderId}</strong>
                </div>
                <div>
                  <span className="text-[#6d6d6d] text-[10px] block">Buyer:</span>
                  <strong className="text-[#00372a]">{activeOrder.buyer}</strong>
                </div>
                <div>
                  <span className="text-[#6d6d6d] text-[10px] block">Collection Hub:</span>
                  <strong className="text-[#00372a]">{activeOrder.hubName}</strong>
                </div>
                <div>
                  <span className="text-[#6d6d6d] text-[10px] block">Crop:</span>
                  <strong className="text-[#00372a]">{activeOrder.crop} ({activeOrder.requiredGrade})</strong>
                </div>
                <div>
                  <span className="text-[#6d6d6d] text-[10px] block">Accepted Quantity:</span>
                  <strong className="text-[#1b6e53] text-sm">{kpis.totalAccepted} kg</strong>
                </div>
                <div>
                  <span className="text-[#6d6d6d] text-[10px] block">Destination:</span>
                  <strong className="text-[#00372a]">{activeOrder.destination}</strong>
                </div>
              </div>
            </div>

            {/* Dispatch Record Input Form */}
            <form onSubmit={handleConfirmDispatch} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#00372a] block">
                  Vehicle / Transport Reference <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                  placeholder="e.g. AP-39-TX-8841"
                  className="w-full px-3.5 py-2 text-xs font-mono font-bold bg-[#ffffff] border border-[#c3cda7] rounded-[10px] text-[#00372a] focus:outline-none focus:ring-1 focus:ring-[#1b6e53]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#00372a] block">
                    Driver / Carrier Contact <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    placeholder="e.g. Ramesh Naidu"
                    className="w-full px-3.5 py-2 text-xs font-sans bg-[#ffffff] border border-[#c3cda7] rounded-[10px] text-[#353535] focus:outline-none focus:ring-1 focus:ring-[#1b6e53]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#00372a] block">
                    Carrier
                  </label>
                  <input
                    type="text"
                    value={carrier}
                    onChange={(e) => setCarrier(e.target.value)}
                    placeholder="e.g. Delta Cold-Chain"
                    className="w-full px-3.5 py-2 text-xs font-sans bg-[#ffffff] border border-[#c3cda7] rounded-[10px] text-[#353535] focus:outline-none focus:ring-1 focus:ring-[#1b6e53]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#00372a] block">
                  Dispatch Date
                </label>
                <input
                  type="date"
                  value={dispatchDate}
                  onChange={(e) => setDispatchDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-mono bg-[#ffffff] border border-[#c3cda7] rounded-[10px] text-[#353535] focus:outline-none focus:ring-1 focus:ring-[#1b6e53]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#00372a] block">
                  Notes / Seal References
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Temperature checked at 12°C; seals verified"
                  className="w-full px-3.5 py-2 text-xs font-sans bg-[#ffffff] border border-[#c3cda7] rounded-[10px] text-[#353535] focus:outline-none focus:ring-1 focus:ring-[#1b6e53]"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowDispatchModal(false)}
                  className="flex-1 py-3 rounded-[100px] border border-[#c3cda7] text-xs font-semibold text-[#353535] bg-[#ffffff] hover:bg-[#f1efdf] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                  <span>Mark as Dispatched</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
