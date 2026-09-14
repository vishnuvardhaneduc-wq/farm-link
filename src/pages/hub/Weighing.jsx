import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import {
  getStoredHubOperations,
  confirmFarmerWeight,
} from '../../data/hubOperationsData'

export default function HubWeighing() {
  const [hubState, setHubState] = useState(getStoredHubOperations())
  const [activeWeighModal, setActiveWeighModal] = useState(null)
  const [weighedValue, setWeighedValue] = useState('')
  const [tareWeight, setTareWeight] = useState('4.0')
  const [notes, setNotes] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    const handleStorage = () => setHubState(getStoredHubOperations())
    window.addEventListener('storage', handleStorage)
    setHubState(getStoredHubOperations())
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const handleOpenWeigh = (lot) => {
    setActiveWeighModal(lot)
    const initialVal = lot.weighedQty || lot.actualCollectedQty || lot.allocatedQty || '66.5'
    setWeighedValue(String(initialVal))
    setTareWeight('4.0')
    setNotes(lot.weighingNotes || 'Scale net weight verified')
  }

  const handleConfirmWeight = (e) => {
    e.preventDefault()
    if (!activeWeighModal) return
    const netWeight = parseFloat(weighedValue)
    if (isNaN(netWeight) || netWeight <= 0) {
      alert('Please enter a valid weighed net quantity in kg.')
      return
    }

    confirmFarmerWeight(activeWeighModal.farmerId, netWeight, notes)
    const updated = getStoredHubOperations()
    setHubState(updated)
    setToastMsg(`Weight confirmed for ${activeWeighModal.farmerName}: ${netWeight} kg net recorded.`)
    setActiveWeighModal(null)
    setTimeout(() => setToastMsg(''), 4000)
  }

  const awaitingWeighing = hubState.farmerLots.filter((l) => l.status === 'Collected')
  const completedWeighing = hubState.farmerLots.filter((l) => l.status !== 'Pending' && l.status !== 'Collected')
  const pendingIntake = hubState.farmerLots.filter((l) => l.status === 'Pending')

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
              WEIGHING STATION
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Weighing &amp; <span className="italic font-normal">Scale Verification</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Record gross, tare, and certified net scale weights for arrived farmer produce.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/hub/quality"
            className="py-2 px-4 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>Proceed to Quality Lab</span>
            <span className="material-symbols-outlined text-[16px]">science</span>
          </Link>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMsg && (
        <div className="p-3.5 bg-[#e8fe85] border border-[#1b6e53] text-[#1b6e53] text-xs font-bold rounded-[18px] flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">scale</span>
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      {/* 2. Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-[20px] bg-[#ffffff] border border-[#c3cda7] shadow-2xs space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#6d6d6d] block">Awaiting Weighing</span>
          <div className="text-2xl font-bold font-mono text-[#00372a]">
            {awaitingWeighing.length} Lots
          </div>
          <p className="text-[10px] font-mono text-[#1b6e53]">Arrived at Intake</p>
        </div>

        <div className="p-4 rounded-[20px] bg-[#e6ecd5] border border-[#c3cda7] shadow-2xs space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#1b6e53] block">Scale System</span>
          <div className="text-2xl font-bold font-mono text-[#1b6e53] flex items-center gap-2">
            <span>Online</span>
          </div>
          <p className="text-[10px] font-mono text-[#1b6e53]">Tare Compensation Active</p>
        </div>

        <div className="p-4 rounded-[20px] bg-[#f1efdf] border border-[#c3cda7] shadow-2xs space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#353535] block">Total Weighed Net</span>
          <div className="text-2xl font-bold font-mono text-[#00372a]">
            {completedWeighing.reduce((acc, l) => acc + (l.weighedQty || l.actualCollectedQty || 0), 0)} kg
          </div>
          <p className="text-[10px] font-mono text-[#6d6d6d]">{completedWeighing.length} lots weighed</p>
        </div>
      </div>

      {/* 3. Awaiting Scale Verification Queue */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs space-y-4">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
              Produce Awaiting Weight Confirmation
            </h3>
            <p className="text-xs text-[#6d6d6d] font-sans">
              Confirm net weight before forwarding produce to Quality Inspection.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7]">
            {awaitingWeighing.length} Ready to Weigh
          </span>
        </div>

        {awaitingWeighing.length === 0 ? (
          <div className="p-8 text-center text-[#6d6d6d] space-y-3 font-sans">
            <span className="material-symbols-outlined text-4xl text-[#c3cda7]">check_circle</span>
            <p className="text-sm font-semibold text-[#00372a]">No collected produce currently awaiting weighing.</p>
            {pendingIntake.length > 0 ? (
              <p className="text-xs">
                {pendingIntake.length} farmer(s) are pending intake. Record intake in{' '}
                <Link to="/hub/collection" className="text-[#1b6e53] font-bold underline">
                  Collection Desk
                </Link>.
              </p>
            ) : (
              <p className="text-xs">All arrived lots have been weighed and routed to Quality Inspection.</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
                <tr>
                  <th className="py-3 px-4">Farmer</th>
                  <th className="py-3 px-3">Order Ref</th>
                  <th className="py-3 px-3">Crop</th>
                  <th className="py-3 px-3 text-right">Expected (Allocated)</th>
                  <th className="py-3 px-3 text-right">Gate Actual</th>
                  <th className="py-3 px-3 text-right">Weighed Net</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
                {awaitingWeighing.map((lot) => (
                  <tr key={lot.id} className="hover:bg-[#faf9f0] transition font-sans">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#1b6e53] text-[11px]">
                      {lot.farmerName} <span className="block text-[10px] text-[#6d6d6d]">{lot.farmerId}</span>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-[#00372a]">
                      {lot.orderId}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-[#00372a]">{lot.crop}</span>
                      <span className="text-[10px] font-mono text-[#6d6d6d] block">{lot.requiredGrade}</span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-[#6d6d6d]">
                      {lot.allocatedQty} kg
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-[#00372a] text-sm">
                      {lot.actualCollectedQty} kg
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-extrabold text-[#1b6e53] text-sm">
                      {lot.weighedQty !== null ? `${lot.weighedQty} kg` : `${lot.actualCollectedQty} kg`}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenWeigh(lot)}
                        className="py-1.5 px-4 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[15px]">scale</span>
                        <span>Confirm Weight</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 4. Weighed & Cleared Lots History Table */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs space-y-4">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
            Verified Weight Log
          </h3>
          <span className="text-xs font-mono text-[#6d6d6d]">
            {completedWeighing.length} Lots Weighed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-2.5 px-4">Farmer / ID</th>
                <th className="py-2.5 px-3">Order</th>
                <th className="py-2.5 px-3">Crop</th>
                <th className="py-2.5 px-3 text-right">Expected</th>
                <th className="py-2.5 px-3 text-right">Actual</th>
                <th className="py-2.5 px-3 text-right">Weighed Net</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              {completedWeighing.map((lot) => (
                <tr key={lot.id} className="hover:bg-[#faf9f0] transition font-sans">
                  <td className="py-3 px-4 font-mono">
                    <span className="font-bold text-[#00372a] block">{lot.farmerName}</span>
                    <span className="text-[10px] text-[#1b6e53] font-bold">{lot.farmerId}</span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-[#00372a]">
                    {lot.orderId}
                  </td>
                  <td className="py-3 px-3">
                    {lot.crop} <span className="text-[10px] text-[#6d6d6d]">({lot.requiredGrade})</span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-[#6d6d6d]">
                    {lot.allocatedQty} kg
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-[#353535]">
                    {lot.actualCollectedQty} kg
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-extrabold text-[#1b6e53] text-sm">
                    {lot.weighedQty} kg
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-[#6d6d6d]">
                    {lot.weighingTime || 'Verified'}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-[100px] text-[10px] font-mono font-bold uppercase ${
                        lot.status === 'Passed'
                          ? 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53]'
                          : 'bg-[#b2cee7] text-[#00372a]'
                      }`}
                    >
                      {lot.status === 'Passed' ? 'QA Passed' : 'Weighed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Weighing Confirmation Modal */}
      {activeWeighModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[24px] max-w-lg w-full p-6 lg:p-7 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]">
              <div>
                <span className="text-[10px] font-mono text-[#1b6e53] font-bold uppercase tracking-wider">
                  SCALE // WEIGHMENT
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Confirm Produce Weight
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveWeighModal(null)}
                className="w-8 h-8 rounded-full bg-[#f1efdf] text-[#6d6d6d] hover:text-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Read-Only Specs Strip */}
            <div className="bg-[#f1efdf] p-4 rounded-[18px] space-y-2 border border-[#c3cda7]/60 text-xs font-sans">
              <div className="flex justify-between font-mono">
                <span className="text-[#6d6d6d]">Farmer:</span>
                <strong className="text-[#00372a]">{activeWeighModal.farmerName} ({activeWeighModal.farmerId})</strong>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-[#6d6d6d]">Order / Crop:</span>
                <strong className="text-[#00372a]">{activeWeighModal.orderId} • {activeWeighModal.crop}</strong>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-[#6d6d6d]">Expected Allocation:</span>
                <strong className="text-[#353535]">{activeWeighModal.allocatedQty} kg</strong>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-[#6d6d6d]">Gate Actual:</span>
                <strong className="text-[#00372a] font-bold">{activeWeighModal.actualCollectedQty} kg</strong>
              </div>
            </div>

            {/* Precision Scale Form */}
            <form onSubmit={handleConfirmWeight} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#00372a] block">
                  Weighed Net Quantity (kg) <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    required
                    value={weighedValue}
                    onChange={(e) => setWeighedValue(e.target.value)}
                    className="w-full px-4 py-2.5 text-lg font-mono font-bold bg-[#ffffff] border-2 border-[#1b6e53] rounded-[12px] text-[#1b6e53] focus:outline-none focus:ring-2 focus:ring-[#1b6e53]/30"
                  />
                  <span className="absolute right-4 top-3 text-xs font-mono text-[#6d6d6d] font-bold">
                    kg
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold text-[#6d6d6d] block">
                    Tare Weight (Crates)
                  </label>
                  <input
                    type="text"
                    value={`${tareWeight} kg`}
                    onChange={(e) => setTareWeight(e.target.value.replace(/[^0-9.]/g, ''))}
                    className="w-full px-3 py-2 text-xs font-mono bg-[#ffffff] border border-[#c3cda7] rounded-[10px] text-[#353535]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold text-[#6d6d6d] block">
                    Scale Status
                  </label>
                  <div className="px-3 py-2 text-xs font-mono bg-[#e6ecd5] border border-[#c3cda7] rounded-[10px] text-[#1b6e53] font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#1b6e53]"></span>
                    <span>Calibrated</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#00372a] block">
                  Notes (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Clean crates, tare verified"
                  className="w-full px-3.5 py-2 text-xs font-sans bg-[#ffffff] border border-[#c3cda7] rounded-[10px] text-[#353535] focus:outline-none focus:ring-1 focus:ring-[#1b6e53]"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveWeighModal(null)}
                  className="flex-1 py-3 rounded-[100px] border border-[#c3cda7] text-xs font-semibold text-[#353535] bg-[#ffffff] hover:bg-[#f1efdf] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Confirm Weight</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
