import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { getStoredFpoFarmerById } from '../../data/fpoFarmersData'

export default function FPOFarmerSupplyHistory() {
  const { id } = useParams()
  const [farmer, setFarmer] = useState(() => getStoredFpoFarmerById(id))

  useEffect(() => {
    const handleUpdate = () => {
      const f = getStoredFpoFarmerById(id)
      if (f) setFarmer(f)
    }
    window.addEventListener('farmlink-fpo-farmers-updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('farmlink-fpo-farmers-updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [id])

  if (!farmer) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-[32px]">history</span>
        </div>
        <h2 className="font-editorial text-2xl font-bold text-[#00372a]">Farmer Not Found</h2>
        <p className="text-xs text-[#6d6d6d]">Unable to retrieve supply records for this farmer ID.</p>
        <Link
          to="/fpo/farmers"
          className="px-6 py-2.5 rounded-full bg-[#1b6e53] text-white text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-1.5"
        >
          <span>Back to All Farmers</span>
        </Link>
      </div>
    )
  }

  const supplyRecords = farmer.supplyHistory || []

  const totalAllocated = supplyRecords.reduce((sum, r) => sum + (parseInt(r.allocated) || 0), 0)
  const totalCollected = supplyRecords.reduce((sum, r) => sum + (parseInt(r.collected) || 0), 0)
  const totalAccepted = supplyRecords.reduce((sum, r) => sum + (parseInt(r.accepted) || 0), 0)

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]'
      case 'In Transit':
      case 'Grading':
        return 'bg-[#fceace] text-[#683600] border-[#c3cda7]'
      case 'Pending':
        return 'bg-[#f1efdf] text-[#6d6d6d] border-[#c3cda7]'
      default:
        return 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]'
    }
  }

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* 1. Header & Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Link
              to={`/fpo/farmers/${farmer.id}`}
              className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-flex items-center gap-1.5 hover:bg-[#dbe4c2] transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">arrow_back</span>
              <span>Back to Farmer Profile</span>
            </Link>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff] border border-[#c3cda7] text-[#1b6e53] font-mono text-[10px] font-bold">
              ID: {farmer.id}
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Supply <span className="italic font-normal">History</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Complete inward lot register for {farmer.name}, physical hub weighbridge records, and QC assay logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/fpo/farmers/${farmer.id}/settlements`}
            className="px-4 py-2 rounded-[100px] bg-[#ffffff] hover:bg-[#faf9f0] text-[#1b6e53] border border-[#c3cda7] text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">currency_rupee</span>
            <span>View Settlements</span>
          </Link>
        </div>
      </div>

      {/* 2. Farmer Context Card */}
      <section className="p-5 rounded-[22px] bg-[#ffffff] border border-[#c3cda7] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center font-editorial text-xl font-bold border border-[#c3cda7]">
            {farmer.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-editorial text-lg font-bold text-[#00372a]">{farmer.name}</span>
              <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#f1efdf] px-2 py-0.5 rounded-md">
                {farmer.id}
              </span>
            </div>
            <p className="text-xs text-[#6d6d6d] font-sans">
              Primary Hub: <strong>{farmer.primaryHubName || 'Rajahmundry Central Hub'}</strong> • Village: {farmer.village}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="p-3 rounded-[14px] bg-[#f1efdf] border border-[#c3cda7] text-center min-w-[110px]">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Total Accepted</span>
            <span className="font-bold text-[#1b6e53] text-sm">{totalAccepted} kg</span>
          </div>
          <div className="p-3 rounded-[14px] bg-[#f1efdf] border border-[#c3cda7] text-center min-w-[110px]">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Deliveries</span>
            <span className="font-bold text-[#00372a] text-sm">{supplyRecords.length} Lots</span>
          </div>
        </div>
      </section>

      {/* 3. Historical Supply Table */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center border border-[#c3cda7]">
              <span className="material-symbols-outlined text-[20px]">inventory</span>
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                Inward Lot &amp; Weighment Register
              </h3>
              <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                Chronological batch deliveries, physical gate weights, and QC grades.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono text-[#1b6e53] bg-[#f1efdf] px-3 py-1 rounded-[100px] border border-[#c3cda7]">
            {supplyRecords.length} Inward Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[800px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Crop</th>
                <th className="py-3 px-3 text-right">Allocated</th>
                <th className="py-3 px-3 text-right">Collected</th>
                <th className="py-3 px-3 text-right">Accepted</th>
                <th className="py-3 px-4 text-center">Grade</th>
                <th className="py-3 px-4">Hub</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              {supplyRecords.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-[#6d6d6d] font-sans">
                    <p className="text-sm font-semibold text-[#00372a]">No supply records recorded yet</p>
                    <p className="text-xs text-[#6d6d6d] mt-0.5">
                      Supply lots will appear once this smallholder delivers produce to the primary hub.
                    </p>
                  </td>
                </tr>
              ) : (
                supplyRecords.map((record, idx) => (
                  <tr key={record.id || idx} className="hover:bg-[#faf9f0] transition font-mono">
                    {/* Date */}
                    <td className="py-4 px-4 font-sans text-xs font-medium text-[#212529] whitespace-nowrap">
                      {record.date}
                    </td>

                    {/* Order */}
                    <td className="py-4 px-4 font-bold text-[#1b6e53] whitespace-nowrap">
                      {record.orderId}
                    </td>

                    {/* Crop */}
                    <td className="py-4 px-4 font-sans font-semibold text-[#00372a]">
                      {record.crop}
                    </td>

                    {/* Allocated */}
                    <td className="py-4 px-3 text-right text-[#683600] font-medium">
                      {record.allocated}
                    </td>

                    {/* Collected */}
                    <td className="py-4 px-3 text-right text-[#353535] font-medium">
                      {record.collected}
                    </td>

                    {/* Accepted */}
                    <td className="py-4 px-3 text-right font-extrabold text-[#1b6e53]">
                      {record.accepted}
                    </td>

                    {/* Grade */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1b6e53] text-[#ffffff] text-[10px] font-bold">
                        <span className="material-symbols-outlined text-[12px]">verified</span>
                        <span>{record.grade}</span>
                      </span>
                    </td>

                    {/* Hub */}
                    <td className="py-4 px-4 font-sans text-xs text-[#353535]">
                      {record.hub}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-[100px] text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(
                          record.status
                        )}`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
