import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import {
  getStoredHubOperations,
  recordFarmerCollection,
  calculateHubKPIs,
} from '../../data/hubOperationsData'

export default function HubCollection() {
  const [hubState, setHubState] = useState(getStoredHubOperations())
  const [selectedFarmer, setSelectedFarmer] = useState(null)
  const [actualQty, setActualQty] = useState('')
  const [collectionTime, setCollectionTime] = useState('')
  const [notes, setNotes] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    const handleStorage = () => setHubState(getStoredHubOperations())
    window.addEventListener('storage', handleStorage)
    setHubState(getStoredHubOperations())
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const kpis = calculateHubKPIs(hubState)
  const activeOrder = hubState.activeOrder

  // Open modal for recording collection
  const handleOpenEntry = (lot) => {
    setSelectedFarmer(lot)
    setActualQty(lot.actualCollectedQty !== null ? String(lot.actualCollectedQty) : (lot.farmerId === 'FARM-001' ? '66.5' : String(lot.allocatedQty)))
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    setCollectionTime(lot.collectionTime || `${today} ${now}`)
    setNotes(lot.collectionNotes || '')
  }

  const handleSaveCollection = (e) => {
    e.preventDefault()
    if (!selectedFarmer) return
    const num = parseFloat(actualQty)
    if (isNaN(num) || num <= 0) {
      alert('Please enter a valid actual collected quantity in kg.')
      return
    }

    recordFarmerCollection(selectedFarmer.farmerId, num, notes, collectionTime)
    const updated = getStoredHubOperations()
    setHubState(updated)
    setToastMsg(`Intake recorded for ${selectedFarmer.farmerName}: ${num} kg actual produce logged.`)
    setSelectedFarmer(null)
    setTimeout(() => setToastMsg(''), 4000)
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
              PRODUCE INTAKE &amp; COLLECTION
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Expected Farmer <span className="italic font-normal">Collection</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Record physical gate drop-offs and actual arriving weights against planned farmer allocations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/hub/weighing"
            className="py-2 px-4 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>Proceed to Weighing</span>
            <span className="material-symbols-outlined text-[16px]">scale</span>
          </Link>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMsg && (
        <div className="p-3.5 bg-[#e8fe85] border border-[#1b6e53] text-[#1b6e53] text-xs font-bold rounded-[18px] flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      {/* 2. Order Context Banner */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-[14px] bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center font-bold text-xl shrink-0">
            📥
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono font-bold text-xs text-[#1b6e53] bg-[#e6ecd5] px-2 py-0.5 rounded-[100px]">
                {activeOrder.orderId}
              </span>
              <strong className="text-base font-editorial font-bold text-[#00372a]">
                {activeOrder.crop} ({activeOrder.variety}) • {activeOrder.requiredGrade}
              </strong>
              <span className="text-[11px] font-mono text-[#6d6d6d]">
                Buyer: {activeOrder.buyer}
              </span>
            </div>
            <p className="text-xs text-[#6d6d6d] font-mono mt-0.5">
              Hub Allocated: <strong className="text-[#00372a]">{activeOrder.hubAllocatedQty} kg</strong> • Collected: <strong className="text-[#1b6e53]">{kpis.collected} kg</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-[#f1efdf] px-3.5 py-1.5 rounded-[12px] border border-[#c3cda7]/60">
            <span className="text-[#6d6d6d] block text-[10px]">Expected Farmers</span>
            <strong className="text-sm font-bold text-[#00372a]">{kpis.expectedFarmers}</strong>
          </div>
          <div className="bg-[#e6ecd5] px-3.5 py-1.5 rounded-[12px] border border-[#c3cda7]/60">
            <span className="text-[#1b6e53] block text-[10px]">Farmers Reported</span>
            <strong className="text-sm font-bold text-[#1b6e53]">{kpis.farmersReported}</strong>
          </div>
        </div>
      </section>

      {/* 3. Expected Farmer Collection Roster */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs space-y-4">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
              Expected Farmer Collection List
            </h3>
            <p className="text-xs text-[#6d6d6d] font-sans mt-0.5">
              Farmers lookup by Farmer ID. Physical intake recorded directly at intake gate.
            </p>
          </div>
          <span className="text-xs font-mono text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7]">
            {hubState.farmerLots.filter((l) => l.status === 'Pending').length} Pending Intake
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">Farmer ID</th>
                <th className="py-3 px-3">Farmer Name</th>
                <th className="py-3 px-3">Commodity</th>
                <th className="py-3 px-3 text-right">Allocated Qty</th>
                <th className="py-3 px-3 text-right">Actual Collected</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              {hubState.farmerLots.map((lot) => {
                const isCollected = lot.status !== 'Pending'

                return (
                  <tr key={lot.id} className="hover:bg-[#faf9f0] transition font-sans">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#1b6e53] text-[11px]">
                      {lot.farmerId}
                    </td>

                    <td className="py-3.5 px-3">
                      <strong className="text-[#00372a] block font-editorial text-base leading-tight">
                        {lot.farmerName}
                      </strong>
                      <span className="text-[10px] font-mono text-[#6d6d6d]">
                        {lot.collectionTime ? `Arrival: ${lot.collectionTime}` : 'Awaiting Arrival'}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="text-[#212529] font-medium">{lot.crop}</span>
                      <span className="text-[10px] font-mono text-[#1b6e53] block">({lot.requiredGrade})</span>
                    </td>

                    <td className="py-3.5 px-3 text-right font-mono font-bold text-[#353535] text-sm">
                      {lot.allocatedQty} kg
                    </td>

                    <td className="py-3.5 px-3 text-right font-mono">
                      {lot.actualCollectedQty !== null ? (
                        <div>
                          <span className="font-extrabold text-[#1b6e53] text-sm">
                            {lot.actualCollectedQty} kg
                          </span>
                          {lot.actualCollectedQty !== lot.allocatedQty && (
                            <span className="text-[10px] text-[#683600] block">
                              ({lot.actualCollectedQty < lot.allocatedQty ? `-${(lot.allocatedQty - lot.actualCollectedQty).toFixed(1)} kg` : `+${(lot.actualCollectedQty - lot.allocatedQty).toFixed(1)} kg`})
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[#6d6d6d] font-normal">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-[100px] text-[10px] font-mono font-bold uppercase ${
                          isCollected
                            ? 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]'
                            : 'bg-amber-50 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {isCollected ? 'Collected' : 'Pending'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenEntry(lot)}
                        className={`py-1.5 px-4 rounded-[100px] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1.5 cursor-pointer ${
                          !isCollected
                            ? 'bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff]'
                            : 'bg-[#ffffff] hover:bg-[#f1efdf] text-[#353535] border border-[#c3cda7]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {!isCollected ? 'edit_note' : 'tune'}
                        </span>
                        <span>{!isCollected ? 'Record Collection' : 'Update Intake'}</span>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Farmer Collection Entry Modal */}
      {selectedFarmer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[24px] max-w-lg w-full p-6 lg:p-7 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]">
              <div>
                <span className="text-[10px] font-mono text-[#1b6e53] font-bold uppercase tracking-wider">
                  GATE INTAKE // {selectedFarmer.farmerId}
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Record Farmer Collection
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFarmer(null)}
                className="w-8 h-8 rounded-full bg-[#f1efdf] text-[#6d6d6d] hover:text-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Read-Only Reference Strip */}
            <div className="bg-[#f1efdf] p-4 rounded-[18px] space-y-2 border border-[#c3cda7]/60 text-xs font-sans">
              <div className="flex justify-between font-mono">
                <span className="text-[#6d6d6d]">Farmer:</span>
                <strong className="text-[#00372a]">{selectedFarmer.farmerName} ({selectedFarmer.farmerId})</strong>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-[#6d6d6d]">Order:</span>
                <strong className="text-[#00372a]">{selectedFarmer.orderId}</strong>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-[#6d6d6d]">Crop:</span>
                <strong className="text-[#00372a]">{selectedFarmer.crop} ({selectedFarmer.requiredGrade})</strong>
              </div>
              <div className="flex justify-between font-mono pt-1 border-t border-[#c3cda7]/40">
                <span className="text-[#6d6d6d] font-bold">Allocated Quantity:</span>
                <strong className="text-[#1b6e53] text-sm">{selectedFarmer.allocatedQty} kg</strong>
              </div>
            </div>

            {/* Entry Form */}
            <form onSubmit={handleSaveCollection} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#00372a] block">
                  Actual Collected Quantity (kg) <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    required
                    value={actualQty}
                    onChange={(e) => setActualQty(e.target.value)}
                    placeholder="e.g. 66.5"
                    className="w-full px-4 py-2.5 text-base font-mono font-bold bg-[#ffffff] border-2 border-[#1b6e53] rounded-[12px] text-[#00372a] focus:outline-none focus:ring-2 focus:ring-[#1b6e53]/30"
                  />
                  <span className="absolute right-4 top-3 text-xs font-mono text-[#6d6d6d] font-bold">
                    kg
                  </span>
                </div>
                <span className="text-[10px] text-[#6d6d6d] font-mono block">
                  Allocated: {selectedFarmer.allocatedQty} kg • Actual: {actualQty || '___'} kg
                </span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#00372a] block">
                  Collection Date &amp; Time
                </label>
                <input
                  type="text"
                  value={collectionTime}
                  onChange={(e) => setCollectionTime(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-mono bg-[#ffffff] border border-[#c3cda7] rounded-[10px] text-[#353535] focus:outline-none focus:ring-1 focus:ring-[#1b6e53]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#00372a] block">
                  Notes (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Standard ventilated crates delivered"
                  className="w-full px-3.5 py-2 text-xs font-sans bg-[#ffffff] border border-[#c3cda7] rounded-[10px] text-[#353535] focus:outline-none focus:ring-1 focus:ring-[#1b6e53]"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedFarmer(null)}
                  className="flex-1 py-3 rounded-[100px] border border-[#c3cda7] text-xs font-semibold text-[#353535] bg-[#ffffff] hover:bg-[#f1efdf] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>Record Collection</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
