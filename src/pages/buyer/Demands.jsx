import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { getStoredDemands } from '../../data/buyerData'

export default function Demands() {
  const [demands, setDemands] = useState([])

  useEffect(() => {
    setDemands(getStoredDemands())
  }, [])

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-block mb-1.5">
            PROCUREMENT TENDERS // MY DEMANDS
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            My <span className="italic font-normal">Procurement Demands</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Forward contracts and multi-item RFQs published to regional FPO federations with item-level response tracking.
          </p>
        </div>

        <Link
          to="/buyer/demands/new"
          className="py-2.5 px-6 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>+ Post Multi-Item Demand</span>
        </Link>
      </div>

      {/* Requests Table matching DashboardTables */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                Active Multi-Item Tenders
              </h3>
              <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                Track independent FPO offers, commercial back-offers, and multi-FPO order awards
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-[#6d6d6d]">
            {demands.length} Published Tenders
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">REQ Ref</th>
                <th className="py-3 px-3">Procurement Items</th>
                <th className="py-3 px-3 text-right">Total Volume</th>
                <th className="py-3 px-3">Delivery Schedule</th>
                <th className="py-3 px-3">FPO Responses</th>
                <th className="py-3 px-3 text-center">Overall Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              {demands.map((req) => {
                const itemsList = req.items || [
                  { crop: req.crop, quantity: req.quantity, grade: req.grade }
                ]
                const itemsNames = itemsList.map((i) => i.crop).join(' • ')
                const totalVol = itemsList.reduce((acc, curr) => {
                  const num = parseInt(String(curr.quantity || '0').replace(/[^0-9]/g, '')) || 0
                  return acc + num
                }, 0)

                // Calculate response counts across all items
                const allResponses = itemsList.flatMap((i) => i.responses || [])
                const receivedCount = allResponses.filter((r) => r.status !== 'NO_RESPONSE').length
                const totalResponsesCount = allResponses.length

                return (
                  <tr key={req.id} className="hover:bg-[#faf9f0] transition">
                    <td className="py-4 px-4 font-mono font-bold text-[#1b6e53] whitespace-nowrap">
                      {req.id}
                    </td>
                    <td className="py-4 px-3">
                      <div className="space-y-0.5">
                        <span className="font-bold text-[#00372a] block font-editorial text-base leading-tight">
                          {itemsList.length} {itemsList.length === 1 ? 'Item' : 'Items'}: {itemsNames}
                        </span>
                        <div className="flex flex-col gap-1.5 pt-0.5">
                          {itemsList.map((item, idx) => {
                            const isConfirmed = Boolean(
                              item.isConfirmed ||
                              item.confirmedOfferId ||
                              item.status === 'ORDER CONFIRMED' ||
                              item.status === 'Confirmed'
                            )
                            if (isConfirmed) {
                              const confirmedOfferId = item.confirmedOfferId || item.selectedFpoOfferId
                              const confirmedResp = (item.responses || []).find(
                                (r) => r.id === confirmedOfferId || r.isAwarded
                              )
                              const selectedFpoName = confirmedResp?.fpoName || item.confirmedFpoName

                              return (
                                <div key={idx} className="space-y-0.5">
                                  <div className="text-[11px] font-mono font-bold text-rose-700 flex items-center gap-1">
                                    <span>🔴</span>
                                    <span>{item.crop} — {item.quantity}</span>
                                  </div>
                                  {selectedFpoName && (
                                    <div className="text-[10px] font-mono text-[#353535] pl-4">
                                      <span className="text-[#6d6d6d]">Selected FPO: </span>
                                      <strong className="text-[#00372a] font-semibold">{selectedFpoName}</strong>
                                    </div>
                                  )}
                                  <div className="text-[10px] font-mono font-bold text-rose-700 pl-4 uppercase tracking-wider">
                                    ORDER CONFIRMED
                                  </div>
                                </div>
                              )
                            }
                            return (
                              <div key={idx} className="space-y-0.5">
                                <div className="text-[11px] font-mono text-[#353535]">
                                  {item.crop} — {item.quantity}
                                </div>
                                <div className="text-[10px] font-mono text-[#6d6d6d]">
                                  {item.status || 'Awaiting Response'}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-right font-bold text-[#1b6e53] font-mono whitespace-nowrap">
                      {totalVol > 0 ? `${totalVol.toLocaleString()} kg` : req.quantity || '1,000 kg'}
                    </td>
                    <td className="py-4 px-3 text-[#353535] font-mono whitespace-nowrap">
                      {req.deliveryDate}
                    </td>
                    <td className="py-4 px-3 whitespace-nowrap">
                      <span className="text-[11px] font-mono font-medium text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-1 rounded-[100px] border border-[#c3cda7]">
                        {receivedCount > 0 ? `${receivedCount} responses received` : 'Awaiting FPO responses'}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-[100px] text-[10px] font-mono font-semibold ${
                          req.status === 'Order Confirmed' || req.status === 'ORDER CONFIRMED'
                            ? 'bg-rose-50 text-rose-700 border border-rose-300 font-bold'
                            : req.status === 'Partially Confirmed'
                            ? 'bg-rose-50 text-rose-700 border border-rose-300 font-bold'
                            : req.status === 'Receiving Offers' || req.status === 'Awaiting Responses' || req.status === 'Partially Responded'
                            ? 'bg-[#fceace] text-[#683600]'
                            : req.status === 'Draft'
                            ? 'bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7]'
                            : 'bg-[#e6ecd5] text-[#1b6e53]'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <Link
                        to={`/buyer/requests/${req.id}`}
                        className="py-1.5 px-3.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Responses</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
