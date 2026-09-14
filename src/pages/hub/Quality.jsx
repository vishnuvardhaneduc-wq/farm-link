import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import {
  getStoredHubOperations,
  recordQualityInspection,
  calculateHubKPIs,
} from '../../data/hubOperationsData'

export default function HubQuality() {
  const [hubState, setHubState] = useState(getStoredHubOperations())
  const [activeQAModal, setActiveQAModal] = useState(null)
  const [selectedGrade, setSelectedGrade] = useState('Grade A')
  const [acceptedQty, setAcceptedQty] = useState('')
  const [moisture, setMoisture] = useState('88.0%')
  const [notes, setNotes] = useState('')
  const [mockPhotoUploaded, setMockPhotoUploaded] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    const handleStorage = () => setHubState(getStoredHubOperations())
    window.addEventListener('storage', handleStorage)
    setHubState(getStoredHubOperations())
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const kpis = calculateHubKPIs(hubState)

  const handleOpenQA = (lot) => {
    setActiveQAModal(lot)
    setSelectedGrade(lot.requiredGrade || 'Grade A')
    const weighed = lot.weighedQty || lot.actualCollectedQty || lot.allocatedQty
    if (lot.farmerId === 'FARM-001' && weighed === 66.5) {
      setAcceptedQty('64')
    } else {
      setAcceptedQty(lot.acceptedQty !== null ? String(lot.acceptedQty) : String(weighed))
    }
    setMoisture(lot.qaMoisture || '88.0%')
    setNotes(lot.qaNotes || 'Firm produce, uniform coloring, minor sorting loss deducted.')
    setMockPhotoUploaded(Boolean(lot.qaPhotoUrl))
  }

  const handleQAAction = (result) => {
    if (!activeQAModal) return
    const isPass = result === 'Pass'
    const weighed = activeQAModal.weighedQty || activeQAModal.actualCollectedQty || activeQAModal.allocatedQty
    let parsedAccepted = isPass ? (parseFloat(acceptedQty) || weighed) : 0

    if (isPass && parsedAccepted > weighed) {
      alert(`Accepted quantity (${parsedAccepted} kg) cannot exceed weighed quantity (${weighed} kg).`)
      return
    }

    recordQualityInspection(activeQAModal.farmerId, {
      grade: selectedGrade,
      result,
      acceptedQty: parsedAccepted,
      moisture,
      notes,
      photoUrl: mockPhotoUploaded ? 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80' : '',
    })

    const updated = getStoredHubOperations()
    setHubState(updated)
    setToastMsg(
      isPass
        ? `Quality Passed for ${activeQAModal.farmerName}: ${parsedAccepted} kg Accepted as ${selectedGrade}.`
        : `Produce lot for ${activeQAModal.farmerName} has been Rejected.`
    )
    setActiveQAModal(null)
    setTimeout(() => setToastMsg(''), 4500)
  }

  const awaitingQA = hubState.farmerLots.filter((l) => l.status === 'Weighed')
  const completedQA = hubState.farmerLots.filter((l) => l.status === 'Passed' || l.status === 'Rejected')

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
              QUALITY INSPECTION
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Quality Inspection &amp; <span className="italic font-normal">Grading</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Inspect produce lots, verify grade requirements, moisture levels, and record certified accepted volumes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/hub/aggregation"
            className="py-2 px-4 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>Proceed to Aggregation</span>
            <span className="material-symbols-outlined text-[16px]">inventory_2</span>
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

      {/* 2. QA Telemetry Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
        <div className="p-4 rounded-[20px] bg-[#ffffff] border border-[#c3cda7] space-y-1">
          <span className="text-[10px] text-[#6d6d6d] uppercase block">Pending Inspection</span>
          <div className="text-2xl font-bold text-[#00372a]">
            {awaitingQA.length} Lots
          </div>
          <p className="text-[10px] text-[#6d6d6d] font-sans">Weighed &amp; awaiting QA</p>
        </div>

        <div className="p-4 rounded-[20px] bg-[#e6ecd5] border border-[#c3cda7] space-y-1">
          <span className="text-[10px] text-[#1b6e53] uppercase block">Accepted Volume</span>
          <div className="text-2xl font-bold text-[#1b6e53]">
            {kpis.totalAccepted.toLocaleString()} kg
          </div>
          <p className="text-[10px] text-[#1b6e53] font-sans">Ready for aggregation</p>
        </div>

        <div className="p-4 rounded-[20px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
          <span className="text-[10px] text-[#353535] uppercase block">QA Pass Rate</span>
          <div className="text-2xl font-bold text-[#00372a]">
            {completedQA.length > 0 ? `${Math.round((completedQA.filter((l) => l.status === 'Passed').length / completedQA.length) * 100)}%` : '—'}
          </div>
          <p className="text-[10px] text-[#6d6d6d] font-sans">{completedQA.length} lots inspected</p>
        </div>

        <div className="p-4 rounded-[20px] bg-[#fceace] border border-[#c3cda7] space-y-1">
          <span className="text-[10px] text-[#683600] uppercase block">Sorting Loss</span>
          <div className="text-2xl font-bold text-[#683600]">
            {completedQA.reduce((acc, l) => acc + (l.rejectedQty || 0), 0).toFixed(1)} kg
          </div>
          <p className="text-[10px] text-[#683600] font-sans">Recorded for settlement</p>
        </div>
      </div>

      {/* 3. Lots Awaiting Inspection Table */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs space-y-4">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
              Produce Awaiting Inspection
            </h3>
            <p className="text-xs text-[#6d6d6d] font-sans">
              Verify grade specifications and establish accepted weight for each farmer lot.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7]">
            {awaitingQA.length} Awaiting QA
          </span>
        </div>

        {awaitingQA.length === 0 ? (
          <div className="p-8 text-center text-[#6d6d6d] space-y-3 font-sans">
            <span className="material-symbols-outlined text-4xl text-[#c3cda7]">verified</span>
            <p className="text-sm font-semibold text-[#00372a]">No produce lots currently awaiting quality inspection.</p>
            <p className="text-xs">
              All weighed batches have been processed. Arriving lots can be weighed at{' '}
              <Link to="/hub/weighing" className="text-[#1b6e53] font-bold underline">
                Weighing Station
              </Link>.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
                <tr>
                  <th className="py-3 px-4">Farmer / ID</th>
                  <th className="py-3 px-3">Order Ref</th>
                  <th className="py-3 px-3">Crop</th>
                  <th className="py-3 px-3">Required Grade</th>
                  <th className="py-3 px-3 text-right">Weighed Qty</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
                {awaitingQA.map((lot) => (
                  <tr key={lot.id} className="hover:bg-[#faf9f0] transition font-sans">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#1b6e53] text-[11px]">
                      {lot.farmerName} <span className="block text-[10px] text-[#6d6d6d]">{lot.farmerId}</span>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-[#00372a]">
                      {lot.orderId}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-[#00372a]">
                      {lot.crop}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[#1b6e53] font-bold">
                      {lot.requiredGrade}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-extrabold text-[#00372a] text-sm">
                      {lot.weighedQty} kg
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-[100px] text-[10px] font-mono font-bold bg-[#b2cee7] text-[#00372a]">
                        Weighed
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenQA(lot)}
                        className="py-1.5 px-4 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[15px]">biotech</span>
                        <span>Inspect Produce</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 4. Certified QA Inspection History Table */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs space-y-4">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
              Quality Inspection Log
            </h3>
            <p className="text-xs text-[#6d6d6d] font-sans">
              Allocated, Weighed, and Accepted volumes recorded side-by-side.
            </p>
          </div>
          <span className="text-xs font-mono text-[#6d6d6d]">
            {completedQA.length} Lots Inspected
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-2.5 px-4">Farmer / Lot</th>
                <th className="py-2.5 px-3 text-right">Allocated</th>
                <th className="py-2.5 px-3 text-right">Collected / Weighed</th>
                <th className="py-2.5 px-3 text-right">Accepted (QA)</th>
                <th className="py-2.5 px-3">Grade</th>
                <th className="py-2.5 px-3">Moisture</th>
                <th className="py-2.5 px-3 text-center">Result</th>
                <th className="py-2.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              {completedQA.map((lot) => (
                <tr key={lot.id} className="hover:bg-[#faf9f0] transition font-sans">
                  <td className="py-3 px-4 font-mono">
                    <strong className="text-[#00372a] block">{lot.farmerName}</strong>
                    <span className="text-[10px] text-[#1b6e53] font-bold">{lot.farmerId}</span>
                  </td>

                  <td className="py-3 px-3 text-right font-mono text-[#6d6d6d]">
                    {lot.allocatedQty} kg
                  </td>

                  <td className="py-3 px-3 text-right font-mono font-semibold text-[#353535]">
                    {lot.weighedQty || lot.actualCollectedQty} kg
                  </td>

                  <td className="py-3 px-3 text-right font-mono font-extrabold text-[#1b6e53] text-sm">
                    {lot.acceptedQty !== null ? `${lot.acceptedQty} kg` : '0 kg'}
                  </td>

                  <td className="py-3 px-3 font-mono font-bold text-[#00372a]">
                    {lot.qaGrade || lot.requiredGrade}
                  </td>

                  <td className="py-3 px-3 font-mono text-[11px] text-[#6d6d6d]">
                    {lot.qaMoisture || '—'}
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-[100px] text-[10px] font-mono font-bold uppercase ${
                        lot.status === 'Passed'
                          ? 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53]'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {lot.status === 'Passed' ? 'Accepted' : 'Rejected'}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleOpenQA(lot)}
                      className="text-[11px] font-mono text-[#1b6e53] font-bold hover:underline cursor-pointer"
                    >
                      View Specs →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Quality Inspection Modal */}
      {activeQAModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[24px] max-w-xl w-full p-6 lg:p-7 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]">
              <div>
                <span className="text-[10px] font-mono text-[#1b6e53] font-bold uppercase tracking-wider">
                  QUALITY INSPECTION // {activeQAModal.farmerId}
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Produce Quality Assessment
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveQAModal(null)}
                className="w-8 h-8 rounded-full bg-[#f1efdf] text-[#6d6d6d] hover:text-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Read-Only Specs Comparison Strip */}
            <div className="bg-[#f1efdf] p-4 rounded-[18px] space-y-2 border border-[#c3cda7]/60 text-xs font-sans">
              <div className="flex justify-between font-mono">
                <span className="text-[#6d6d6d]">Farmer:</span>
                <strong className="text-[#00372a]">{activeQAModal.farmerName} ({activeQAModal.farmerId})</strong>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-[#6d6d6d]">Crop &amp; Order:</span>
                <strong className="text-[#00372a]">{activeQAModal.crop} • {activeQAModal.orderId}</strong>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-[#6d6d6d]">Required Grade:</span>
                <span className="font-bold text-[#1b6e53] bg-[#e6ecd5] px-2 py-0.5 rounded-[100px] border border-[#c3cda7]">
                  {activeQAModal.requiredGrade}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#c3cda7]/40 font-mono">
                <div>
                  <span className="text-[10px] text-[#6d6d6d] block">Planned Allocation:</span>
                  <strong className="text-sm text-[#353535]">{activeQAModal.allocatedQty} kg</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#6d6d6d] block">Weighed Net Quantity:</span>
                  <strong className="text-sm text-[#00372a] font-extrabold">
                    {activeQAModal.weighedQty || activeQAModal.actualCollectedQty} kg
                  </strong>
                </div>
              </div>
            </div>

            {/* Inspection Form */}
            <div className="space-y-4">
              {/* Grade Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#00372a] block">
                  Assigned Quality Grade:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Grade A', 'Grade B', 'Grade C'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setSelectedGrade(g)}
                      className={`py-2 px-3 rounded-[12px] text-xs font-mono font-bold border transition cursor-pointer flex items-center justify-center gap-1.5 ${
                        selectedGrade === g
                          ? 'bg-[#1b6e53] text-[#ffffff] border-[#1b6e53] shadow-2xs'
                          : 'bg-[#ffffff] text-[#353535] border-[#c3cda7] hover:bg-[#f1efdf]'
                      }`}
                    >
                      <span>{g}</span>
                      {g === activeQAModal.requiredGrade && (
                        <span className="text-[9px] opacity-80">(Target)</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accepted Quantity input */}
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#00372a] block">
                  Accepted Quantity (kg) <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max={activeQAModal.weighedQty || activeQAModal.actualCollectedQty}
                    value={acceptedQty}
                    onChange={(e) => setAcceptedQty(e.target.value)}
                    placeholder="e.g. 64"
                    className="w-full px-4 py-2 text-base font-mono font-bold bg-[#ffffff] border-2 border-[#1b6e53] rounded-[12px] text-[#1b6e53] focus:outline-none focus:ring-2 focus:ring-[#1b6e53]/30"
                  />
                  <span className="absolute right-4 top-2.5 text-xs font-mono text-[#6d6d6d] font-bold">
                    kg Accepted
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-[#6d6d6d] font-mono">
                  <span>Weighed: {activeQAModal.weighedQty || activeQAModal.actualCollectedQty} kg</span>
                  <span>
                    Sorting Loss: {Math.max(0, (activeQAModal.weighedQty || activeQAModal.actualCollectedQty) - (parseFloat(acceptedQty) || 0)).toFixed(1)} kg
                  </span>
                </div>
              </div>

              {/* Moisture */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold text-[#00372a] block">
                  Moisture Reading (%)
                </label>
                <input
                  type="text"
                  value={moisture}
                  onChange={(e) => setMoisture(e.target.value)}
                  placeholder="88.0%"
                  className="w-full px-3 py-2 text-xs font-mono bg-[#ffffff] border border-[#c3cda7] rounded-[10px] text-[#353535]"
                />
              </div>

              {/* Mock Photo Upload Area */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#00372a] block">
                  Produce Photo
                </label>
                <div
                  onClick={() => setMockPhotoUploaded(!mockPhotoUploaded)}
                  className={`p-4 rounded-[16px] border-2 border-dashed text-center transition cursor-pointer ${
                    mockPhotoUploaded
                      ? 'border-[#1b6e53] bg-[#e6ecd5]/40'
                      : 'border-[#c3cda7] bg-[#f1efdf]/40 hover:bg-[#e6ecd5]/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl text-[#1b6e53]">
                    {mockPhotoUploaded ? 'check_circle' : 'add_a_photo'}
                  </span>
                  <p className="text-xs font-semibold text-[#00372a] mt-1">
                    {mockPhotoUploaded ? 'Produce Photo Attached' : 'Click to attach produce sample photo'}
                  </p>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#00372a] block">
                  Notes
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Firm texture, uniform color"
                  className="w-full px-3.5 py-2 text-xs font-sans bg-[#ffffff] border border-[#c3cda7] rounded-[10px] text-[#353535] focus:outline-none focus:ring-1 focus:ring-[#1b6e53]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => handleQAAction('Fail')}
                  className="flex-1 py-3 rounded-[100px] bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">cancel</span>
                  <span>Fail Quality</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQAAction('Pass')}
                  className="flex-1 py-3 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Pass Quality</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
