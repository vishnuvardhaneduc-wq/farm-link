import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { getStoredFpoFarmerById } from '../../data/fpoFarmersData'

export default function FPOFarmerSettlementHistory() {
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
          <span className="material-symbols-outlined text-[32px]">currency_rupee</span>
        </div>
        <h2 className="font-editorial text-2xl font-bold text-[#00372a]">Farmer Not Found</h2>
        <p className="text-xs text-[#6d6d6d]">Unable to retrieve settlement records for this farmer ID.</p>
        <Link
          to="/fpo/farmers"
          className="px-6 py-2.5 rounded-full bg-[#1b6e53] text-white text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-1.5"
        >
          <span>Back to All Farmers</span>
        </Link>
      </div>
    )
  }

  const settlements = farmer.settlementHistory || []
  const totalRecordedPayout = settlements.reduce((sum, s) => sum + (Number(s.payoutAmount) || 0), 0)

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Recorded':
      case 'Settlement Recorded':
      case 'Completed':
        return 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]'
      case 'Pending':
        return 'bg-[#fceace] text-[#683600] border-[#c3cda7]'
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
            Settlement <span className="italic font-normal">History</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Recorded price realisations, lot payouts, and internal FPO credit ledger for {farmer.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/fpo/farmers/${farmer.id}/supply-history`}
            className="px-4 py-2 rounded-[100px] bg-[#ffffff] hover:bg-[#faf9f0] text-[#1b6e53] border border-[#c3cda7] text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">history</span>
            <span>View Supply History</span>
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

        {/* Summary Card: Total Recorded Payouts */}
        <div className="p-4 rounded-[18px] bg-[#e6ecd5] border border-[#c3cda7] text-left sm:text-right min-w-[220px]">
          <span className="text-[10px] font-mono uppercase text-[#6d6d6d] block tracking-wider">
            Total Recorded Payouts
          </span>
          <span className="font-editorial text-3xl font-bold text-[#1b6e53] block mt-0.5">
            ₹{totalRecordedPayout.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] font-mono text-[#1b6e53] block">
            {settlements.length} Recorded Lot Settlements
          </span>
        </div>
      </section>

      {/* 3. MVP Ledger Notice Box */}
      <div className="p-4 rounded-[20px] bg-[#f1efdf] border border-[#c3cda7] flex items-start gap-3">
        <span className="material-symbols-outlined text-[20px] text-[#683600] shrink-0 mt-0.5">
          info
        </span>
        <div className="text-xs text-[#353535] space-y-1">
          <span className="font-bold text-[#00372a] block">Hackathon MVP Settlement Record:</span>
          <p className="leading-relaxed">
            These entries represent transparent internal lot-by-lot price calculations and recorded payout ledger entries within FarmLink. They serve as auditable settlement verification records.
          </p>
        </div>
      </div>

      {/* 4. Settlement History Table */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                Settlement &amp; Payout Records
              </h3>
              <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                Lot rate formulas, accepted volumes, and recorded payout amounts.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono text-[#1b6e53] bg-[#f1efdf] px-3 py-1 rounded-[100px] border border-[#c3cda7]">
            {settlements.length} Settlements
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4 text-right">Accepted Quantity</th>
                <th className="py-3 px-4 text-right">Settlement Rate</th>
                <th className="py-3 px-4 text-right">Payout Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              {settlements.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-[#6d6d6d] font-sans">
                    <p className="text-sm font-semibold text-[#00372a]">No settlement records recorded yet</p>
                    <p className="text-xs text-[#6d6d6d] mt-0.5">
                      Settlements are logged once delivered lots are verified and accepted.
                    </p>
                  </td>
                </tr>
              ) : (
                settlements.map((record, idx) => (
                  <tr key={record.id || idx} className="hover:bg-[#faf9f0] transition font-mono">
                    {/* Date */}
                    <td className="py-4 px-4 font-sans text-xs font-medium text-[#212529] whitespace-nowrap">
                      {record.date}
                    </td>

                    {/* Order */}
                    <td className="py-4 px-4 font-bold text-[#1b6e53] whitespace-nowrap">
                      {record.orderId}
                    </td>

                    {/* Accepted Quantity */}
                    <td className="py-4 px-4 text-right font-extrabold text-[#353535]">
                      {record.acceptedQty}
                    </td>

                    {/* Settlement Rate */}
                    <td className="py-4 px-4 text-right font-bold text-[#683600]">
                      {record.rate}
                    </td>

                    {/* Payout Amount */}
                    <td className="py-4 px-4 text-right font-extrabold text-[#1b6e53] text-sm whitespace-nowrap">
                      ₹{Number(record.payoutAmount).toLocaleString('en-IN')}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
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
