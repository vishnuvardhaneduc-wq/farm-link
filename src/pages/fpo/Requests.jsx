import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { getStoredDemands } from '../../data/buyerData'

export default function Requests() {
  const [demands, setDemands] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    setDemands(getStoredDemands())
  }, [])

  // Derive FPO status for each demand
  const getFpoStatusInfo = (req) => {
    const items = req.items || []
    const allConfirmed = items.length > 0 && items.every((item) => item.isConfirmed || item.confirmedOfferId || item.status === 'ORDER CONFIRMED')
    const anyConfirmed = items.some((item) => item.isConfirmed || item.confirmedOfferId || item.status === 'ORDER CONFIRMED')

    if (allConfirmed || req.status === 'Order Confirmed' || req.status === 'ORDER CONFIRMED') {
      return {
        label: 'Order Confirmed',
        style: 'bg-rose-50 text-rose-700 border border-rose-300 font-bold'
      }
    }
    if (anyConfirmed || req.status === 'Partially Confirmed') {
      return {
        label: 'Partially Confirmed',
        style: 'bg-rose-50 text-rose-700 border border-rose-300 font-bold'
      }
    }
    if (req.fpoResponded) {
      return {
        label: 'Responded',
        style: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]'
      }
    }
    if (req.id === 'REQ-1027' || req.id === 'REQ-1030' || req.id === 'REQ-1031' || req.id === 'REQ-1032' || req.id === 'REQ-1033') {
      return {
        label: 'New Request',
        style: 'bg-[#b2cee7] text-[#00372a] border border-[#b2cee7]'
      }
    }
    if (req.id === 'REQ-1026') {
      return {
        label: 'Waiting Response',
        style: 'bg-[#fceace] text-[#683600] border border-[#c3cda7]'
      }
    }
    if (req.id === 'REQ-1024' || req.id === 'REQ-1019') {
      return {
        label: 'Responded',
        style: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]'
      }
    }
    if (req.id === 'REQ-1022') {
      return {
        label: 'Reviewing',
        style: 'bg-[#fceace] text-[#683600] border border-[#c3cda7]'
      }
    }
    return {
      label: 'New Request',
      style: 'bg-[#b2cee7] text-[#00372a] border border-[#b2cee7]'
    }
  }

  const filteredDemands = demands.filter((req) => {
    const status = getFpoStatusInfo(req).label
    if (filterStatus === 'pending') {
      return status === 'New Request' || status === 'Waiting Response' || status === 'Reviewing'
    }
    if (filterStatus === 'responded') {
      return status === 'Responded'
    }
    return true
  })

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-block mb-1.5">
            FPO INWARD WORKSPACE // DEMAND RFQ
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Incoming <span className="italic font-normal">Procurement Requests</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Review buyer requirements and respond with availability and commercial terms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#ffffff] px-4 py-2 rounded-[100px] border border-[#c3cda7] shadow-2xs">
            {demands.length} Buyer Tenders Active
          </span>
        </div>
      </div>

      {/* 2. Principle Banner matching FPO design */}
      <div className="p-4 bg-[#fceace] border border-[#c3cda7] rounded-[20px] flex items-start gap-3.5 shadow-2xs">
        <div className="w-8 h-8 rounded-full bg-[#683600] text-[#ffffff] flex items-center justify-center shrink-0 mt-0.5 font-bold">
          <span className="material-symbols-outlined text-[18px]">rule</span>
        </div>
        <div className="text-xs text-[#683600] space-y-0.5 font-sans">
          <strong className="font-bold block text-sm font-editorial text-[#00372a]">
            Multi-Item Commercial Protocol:
          </strong>
          <p className="leading-relaxed">
            Institutional buyers can tender multiple commodities in a single request. As an FPO partner, you can evaluate and respond <strong>per item</strong> (Accept, Back Offer with counter terms, or Decline) based on your cluster’s available capacity.
          </p>
        </div>
      </div>

      {/* 3. Requests Table Container */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        {/* Table Toolbar */}
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="material-symbols-outlined text-[20px]">mark_email_unread</span>
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                Buyer Tender Ledger
              </h3>
              <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                Review crop specifications, target prices, and required delivery deadlines
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex bg-[#f1efdf] p-1 rounded-[100px] border border-[#c3cda7] text-xs font-mono">
            <button
              type="button"
              onClick={() => setFilterStatus('all')}
              className={`px-3.5 py-1 rounded-[100px] transition cursor-pointer ${
                filterStatus === 'all'
                  ? 'bg-[#1b6e53] text-[#ffffff] font-bold shadow-xs'
                  : 'text-[#6d6d6d] hover:text-[#212529]'
              }`}
            >
              All Requests ({demands.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('pending')}
              className={`px-3.5 py-1 rounded-[100px] transition cursor-pointer ${
                filterStatus === 'pending'
                  ? 'bg-[#1b6e53] text-[#ffffff] font-bold shadow-xs'
                  : 'text-[#6d6d6d] hover:text-[#212529]'
              }`}
            >
              Pending Response
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('responded')}
              className={`px-3.5 py-1 rounded-[100px] transition cursor-pointer ${
                filterStatus === 'responded'
                  ? 'bg-[#1b6e53] text-[#ffffff] font-bold shadow-xs'
                  : 'text-[#6d6d6d] hover:text-[#212529]'
              }`}
            >
              Responded
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">Request</th>
                <th className="py-3 px-3">Buyer</th>
                <th className="py-3 px-3">Items</th>
                <th className="py-3 px-3">Delivery</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              {filteredDemands.map((req) => {
                const itemsList = req.items || [
                  { crop: req.crop || 'Produce', quantity: req.quantity || '1,000 kg', grade: req.grade || 'Grade A' }
                ]
                const itemsNames = itemsList.map((i) => i.crop).join(' • ')
                const statusInfo = getFpoStatusInfo(req)

                return (
                  <tr key={req.id} className="hover:bg-[#faf9f0] transition">
                    {/* REQUEST */}
                    <td className="py-4 px-4 font-mono font-bold text-[#1b6e53] whitespace-nowrap">
                      <div className="space-y-0.5">
                        <span className="text-sm block">{req.id}</span>
                        <span className="text-[10px] text-[#6d6d6d] font-normal block">
                          {req.createdDate || '14 Sep 2026'}
                        </span>
                      </div>
                    </td>

                    {/* BUYER */}
                    <td className="py-4 px-3">
                      <div className="space-y-0.5">
                        <span className="font-bold text-[#00372a] block font-editorial text-base leading-tight">
                          {req.buyer || 'AgroFresh Enterprise'}
                        </span>
                        <span className="text-[10px] font-mono text-[#6d6d6d] block">
                          📍 {req.deliveryLocation || 'Vijayawada Hub Dock'}
                        </span>
                      </div>
                    </td>

                    {/* ITEMS */}
                    <td className="py-4 px-3">
                      <div className="space-y-1">
                        <span className="font-bold text-[#212529] block font-mono text-[11px]">
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
                              return (
                                <div key={idx} className="space-y-0.5">
                                  <div className="text-[11px] font-mono font-bold text-rose-700 flex items-center gap-1">
                                    <span>🔴</span>
                                    <span>{item.crop} — {item.quantity}</span>
                                  </div>
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
                                  {item.status || 'Pending'}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </td>

                    {/* DELIVERY */}
                    <td className="py-4 px-3 text-[#353535] font-mono whitespace-nowrap">
                      <div className="space-y-0.5">
                        <span className="font-bold text-[#212529] block">{req.deliveryDate}</span>
                        <span className="text-[10px] text-[#6d6d6d] block">Direct Dock Dispatch</span>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="py-4 px-3 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 rounded-[100px] text-[10px] font-mono font-bold uppercase tracking-wider ${statusInfo.style}`}
                      >
                        {statusInfo.label}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <Link
                        to={`/fpo/requests/${req.id}`}
                        className="py-1.5 px-4 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>View Request</span>
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
