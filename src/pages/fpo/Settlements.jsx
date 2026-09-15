import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { getStoredHubOperations } from '../../data/hubOperationsData'

export default function Settlements() {
  const [hubState, setHubState] = useState(getStoredHubOperations())

  useEffect(() => {
    const handleSync = () => {
      setHubState(getStoredHubOperations())
    }
    window.addEventListener('storage', handleSync)
    return () => window.removeEventListener('storage', handleSync)
  }, [])

  const activeOrder = hubState.activeOrder || {}
  const settlement = hubState.settlementRecords?.[activeOrder.orderId] || null
  const isSettlementActive = Boolean(settlement)

  const settlementList = [
    {
      orderId: activeOrder.orderId || 'ORD-1031',
      buyer: activeOrder.buyer || 'AgroFresh Enterprise',
      crop: activeOrder.crop || 'Tomato (Grade A)',
      deliveredQty: settlement?.acceptedQty || activeOrder.deliveredQty || 700,
      pricePerKg: settlement?.agreedFarmerRate || 25,
      totalPayout: settlement?.farmerSettlementTotal || 17500,
      transportCost: settlement?.transportationCost || 1500,
      deliveredTotal: settlement?.buyerDeliveredTotal || 28500,
      farmerCount: settlement?.farmerPayouts?.length || 4,
      status: settlement?.settlementStatus || (activeOrder.status === 'Completed' ? 'Settlement Recorded' : 'Calculated'),
      date: settlement?.settledAt || 'Today'
    },
    {
      orderId: 'ORD-1029',
      buyer: 'Reliance Retail Fresh',
      crop: 'Green Chilli (Grade A)',
      deliveredQty: 450,
      pricePerKg: 38,
      totalPayout: 17100,
      transportCost: 1200,
      deliveredTotal: 23500,
      farmerCount: 3,
      status: 'Settlement Recorded',
      date: 'Yesterday'
    },
    {
      orderId: 'ORD-1028',
      buyer: 'BigBasket Fulfillment',
      crop: 'Brinjal (Grade A)',
      deliveredQty: 800,
      pricePerKg: 18,
      totalPayout: 14400,
      transportCost: 1600,
      deliveredTotal: 20000,
      farmerCount: 5,
      status: 'Settlement Recorded',
      date: '3 days ago'
    }
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Settlement Recorded':
      case 'Disbursed':
      case 'Completed':
        return 'bg-[#1b6e53] text-[#ffffff] border-[#1b6e53]'
      case 'Calculated':
      case 'Ready':
      case 'Recorded':
        return 'bg-[#e8fe85] text-[#1b6e53] border-[#1b6e53]'
      case 'Pending':
        return 'bg-[#fceace] text-[#683600] border-[#683600]/40'
      default:
        return 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]'
    }
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-block mb-1.5">
            STEP 6 // FPO SETTLEMENT LEDGER
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Settlements &amp; <span className="italic font-normal">Farmer Payouts</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Transparent lot-by-lot price calculations, transportation records, and internal FPO realization ledger.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#ffffff] px-4 py-2 rounded-[100px] border border-[#c3cda7] shadow-2xs">
            {settlementList.length} Order Settlements Tracked
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Total Disbursed Volume</div>
          <div className="font-editorial text-3xl font-bold text-[#00372a] mt-1">1,950 kg</div>
          <div className="text-[11px] font-mono text-[#1b6e53] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">account_balance_wallet</span>
            <span>100% transparent pricing</span>
          </div>
        </div>

        <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Farmer Payout Pool</div>
          <div className="font-editorial text-3xl font-bold text-[#683600] mt-1">₹49,000</div>
          <div className="text-[11px] font-mono text-[#6d6d6d] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">group</span>
            <span>12 contributing smallholders</span>
          </div>
        </div>

        <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Active Order ORD-1031</div>
          <div className="font-editorial text-3xl font-bold text-[#1b6e53] mt-1">₹17,500</div>
          <div className="text-[11px] font-mono text-[#1b6e53] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            <span>700 kg accepted × ₹25/kg (Delivered Total: ₹28,500)</span>
          </div>
        </div>
      </div>

      {/* Settlement Table */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                Consolidated Settlement Records
              </h3>
              <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                Real-time price formula breakdown per accepted lot and internal realization status.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[800px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-3">Buyer</th>
                <th className="py-3 px-3">Produce &amp; Volume</th>
                <th className="py-3 px-3 text-right">Farmer Rate</th>
                <th className="py-3 px-3 text-right">Farmer Pool</th>
                <th className="py-3 px-3 text-right">Transport</th>
                <th className="py-3 px-3 text-right">Delivered Total</th>
                <th className="py-3 px-3 text-center">Settlement Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              {settlementList.map((record) => (
                <tr key={record.orderId} className="hover:bg-[#faf9f0] transition font-mono">
                  <td className="py-4 px-4 font-bold text-[#1b6e53] whitespace-nowrap">
                    {record.orderId}
                  </td>
                  <td className="py-4 px-3 font-sans">
                    <span className="font-bold text-[#00372a] font-editorial text-base leading-tight block">
                      {record.buyer}
                    </span>
                    <span className="text-[10px] text-[#6d6d6d] font-mono">{record.farmerCount} Farmers</span>
                  </td>
                  <td className="py-4 px-3">
                    <span className="font-bold text-[#353535]">{record.crop}</span>
                    <span className="text-[#1b6e53] font-extrabold block">{record.deliveredQty} kg</span>
                  </td>
                  <td className="py-4 px-3 text-right font-bold text-[#353535]">
                    ₹{record.pricePerKg}/kg
                  </td>
                  <td className="py-4 px-3 text-right font-extrabold text-[#1b6e53] text-sm whitespace-nowrap">
                    ₹{record.totalPayout.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-3 text-right text-[#683600] font-semibold whitespace-nowrap">
                    ₹{record.transportCost.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-3 text-right font-extrabold text-[#00372a] text-sm whitespace-nowrap">
                    ₹{record.deliveredTotal.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-3 py-1 rounded-[100px] text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right whitespace-nowrap font-sans">
                    <Link
                      to={`/fpo/settlements/${record.orderId}`}
                      className="py-1.5 px-4 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1.5 font-mono cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">receipt_long</span>
                      <span>View Breakdown</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
