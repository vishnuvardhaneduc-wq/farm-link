import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import {
  getStoredHubOperations,
  createOrUpdateSettlementRecord,
  recordFpoSettlement,
  calculateHubKPIs,
} from '../../data/hubOperationsData'

export default function FPOSettlementDetail() {
  const { orderId } = useParams()
  const [hubState, setHubState] = useState(getStoredHubOperations())
  const [recordToast, setRecordToast] = useState(false)

  useEffect(() => {
    const handleStorage = () => setHubState(getStoredHubOperations())
    window.addEventListener('storage', handleStorage)
    setHubState(getStoredHubOperations())
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const kpis = calculateHubKPIs(hubState)
  const activeOrder = hubState.activeOrder
  const isTargetOrder = !orderId || orderId === activeOrder.orderId

  // Settlement record calculated strictly on accepted quantity
  const settlement = activeOrder.settlementRecord || createOrUpdateSettlementRecord(hubState)
  const isCompleted = activeOrder.status === 'Completed' || settlement.status === 'Completed' || settlement.settlementStatus === 'Settlement Recorded'
  const isBuyerVerified = activeOrder.status === 'Buyer Verified' || activeOrder.status === 'Ready for Settlement' || isCompleted
  const isPaymentConfirmed = activeOrder.paymentStatus === 'CONFIRMED' || isCompleted

  const handleRecordSettlement = () => {
    recordFpoSettlement(activeOrder.orderId)
    setHubState(getStoredHubOperations())
    setRecordToast(true)
    setTimeout(() => setRecordToast(false), 4500)
  }

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header & Navigation Breadcrumb */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Link to="/fpo/settlements" className="text-[10px] font-mono text-[#1b6e53] font-bold hover:underline">
              ← SETTLEMENTS LEDGER
            </Link>
            <span className="text-[#c3cda7]">/</span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              FPO INTERNAL FINANCIAL &amp; SETTLEMENT BREAKDOWN
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Settlement Breakdown: <span className="italic font-bold">{settlement.settlementId}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Transparent breakdown of Delivered Total into Farmer Settlement Pool, Transportation Cost, Hub Handling, and FPO Operating Margin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isCompleted ? (
            <span className="px-4 py-1.5 rounded-[100px] text-xs font-mono font-bold uppercase tracking-wider bg-[#e6ecd5] text-[#1b6e53] border border-[#1b6e53]">
              ● Settlement Recorded
            </span>
          ) : (
            <button
              type="button"
              onClick={handleRecordSettlement}
              className="py-2.5 px-6 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-mono font-bold uppercase tracking-wider transition shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">fact_check</span>
              <span>Record Settlement</span>
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Toast */}
      {recordToast && (
        <div className="p-3.5 bg-[#e8fe85] border border-[#1b6e53] text-[#1b6e53] text-xs font-bold rounded-[18px] flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Settlement recorded in ledger! Farmer payouts marked as Recorded (100% accounted for).</span>
          </div>
        </div>
      )}

      {/* 2. ORDER FULFILLMENT & PAYMENT CONFIRMATION BANNER */}
      <section className="p-6 rounded-[24px] bg-[#ffffff] border-2 border-[#1b6e53] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#c3cda7]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center font-bold text-xl shrink-0">
              {isCompleted ? '✓' : '📦'}
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#1b6e53] tracking-wider">
                COMMERCIAL STATUS // {activeOrder.orderId}
              </span>
              <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
                {activeOrder.orderId}: {activeOrder.buyer}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3.5 py-1 rounded-[100px] bg-[#e6ecd5] text-[#1b6e53] font-mono text-xs font-bold border border-[#1b6e53]">
              Settlement Status: {isCompleted ? 'Settlement Recorded' : 'Calculated'}
            </span>
          </div>
        </div>

        {/* 4 Commercial Statuses as explicitly requested */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3 bg-[#f1efdf] rounded-[14px] border border-[#c3cda7]">
            <span className="text-[#6d6d6d] block text-[10px] uppercase">Delivery:</span>
            <strong className="text-base text-[#1b6e53]">
              {isBuyerVerified || isCompleted ? 'Confirmed' : 'In Transit / Dock'}
            </strong>
            <p className="text-[10px] text-[#6d6d6d] font-sans">Dock Inward Verified</p>
          </div>

          <div className="p-3 bg-[#f1efdf] rounded-[14px] border border-[#c3cda7]">
            <span className="text-[#6d6d6d] block text-[10px] uppercase">Buyer Verification:</span>
            <strong className="text-base text-[#1b6e53]">
              {isBuyerVerified || isCompleted ? 'Completed' : 'Pending'}
            </strong>
            <p className="text-[10px] text-[#6d6d6d] font-sans">100% Quality &amp; Qty Pass</p>
          </div>

          <div className="p-3 bg-[#f1efdf] rounded-[14px] border border-[#c3cda7]">
            <span className="text-[#6d6d6d] block text-[10px] uppercase">Payment:</span>
            <strong className={`text-base ${isPaymentConfirmed ? 'text-[#1b6e53]' : 'text-[#683600]'}`}>
              {isPaymentConfirmed ? 'Confirmed' : 'Payment Due'}
            </strong>
            <p className="text-[10px] text-[#6d6d6d] font-sans">₹28,500 Delivered Total</p>
          </div>

          <div className="p-3 bg-[#e6ecd5] rounded-[14px] border border-[#c3cda7]">
            <span className="text-[#1b6e53] block text-[10px] uppercase font-bold">Settlement:</span>
            <strong className="text-base text-[#1b6e53]">
              {isCompleted ? 'Settlement Recorded' : 'Calculated'}
            </strong>
            <p className="text-[10px] text-[#1b6e53] font-sans">₹17,500 Farmer Pool</p>
          </div>
        </div>
      </section>

      {/* 3. FPO INTERNAL FINANCIAL BREAKDOWN CARD */}
      <section className="rounded-[24px] bg-[#ffffff] border-2 border-[#1b6e53] p-6 lg:p-8 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-[18px] bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center text-2xl font-bold shrink-0">
              ₹
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="font-mono font-bold text-xs text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">
                  {settlement.settlementId}
                </span>
                <span className="font-mono text-xs text-[#6d6d6d]">Linked Order: <strong>{activeOrder.orderId}</strong></span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
                FPO Internal Financial Allocation &amp; Realization
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3.5 py-1 rounded-[100px] bg-[#f1efdf] text-[#00372a] border border-[#c3cda7]">
              Supplier: <strong>Godavari Farmers FPO</strong>
            </span>
          </div>
        </div>

        {/* 5 Financial Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 font-mono text-xs">
          <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Delivered Total (Buyer)</span>
            <div className="text-xl font-extrabold text-[#00372a]">
              ₹{(settlement.buyerDeliveredTotal || 28500).toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-[#6d6d6d] font-sans">
              Produce: ₹{(settlement.produceValue || 27000).toLocaleString('en-IN')} + Transport
            </p>
          </div>

          <div className="p-4 rounded-[18px] bg-[#e6ecd5] border border-[#1b6e53] space-y-1">
            <span className="text-[10px] text-[#1b6e53] uppercase font-bold block">Farmer Settlement Pool</span>
            <div className="text-xl font-bold text-[#1b6e53]">
              ₹{(settlement.farmerSettlementTotal || 17500).toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-[#1b6e53] font-sans">
              {settlement.acceptedQty || 700} kg × ₹{settlement.agreedFarmerRate || 25}/kg
            </p>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#6d6d6d] uppercase block">Transportation Cost</span>
              <span className="text-[9px] font-bold text-[#1b6e53] bg-[#e6ecd5] px-1.5 py-0.2 rounded-full">Recorded</span>
            </div>
            <div className="text-xl font-bold text-[#1b6e53]">
              ₹{(settlement.transportationCost || 1500).toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-[#6d6d6d] font-sans">Direct Logistics Cost</p>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#6d6d6d] uppercase block">Hub Handling Cost</span>
              <span className="text-[9px] font-bold text-[#1b6e53] bg-[#e6ecd5] px-1.5 py-0.2 rounded-full">Recorded</span>
            </div>
            <div className="text-xl font-bold text-[#683600]">
              ₹{(settlement.hubHandlingCost || 1000).toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-[#6d6d6d] font-sans">Intake &amp; Grading OpCost</p>
          </div>

          <div className="p-4 rounded-[18px] bg-[#fceace] border border-[#683600]/30 space-y-1">
            <span className="text-[10px] text-[#683600] uppercase font-bold block">FPO Operating Margin</span>
            <div className="text-xl font-extrabold text-[#683600]">
              ₹{(settlement.fpoOperatingRealization || 8500).toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-[#683600] font-sans">FPO Operational Realization</p>
          </div>
        </div>

        {/* Formula Explanation Callout */}
        <div className="p-4 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7] flex items-center justify-between flex-wrap gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#1b6e53]">calculate</span>
            <div>
              <strong className="text-[#00372a]">Settlement Formula: </strong>
              <span className="text-[#353535]">{settlement.formulaExplanation}</span>
            </div>
          </div>
          <span className="text-[11px] text-[#1b6e53] font-bold bg-[#ffffff] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">
            FPO Realization: ₹8,500 (Delivered Total ₹28,500 - Farmer ₹17,500 - Transport ₹1,500 - Hub ₹1,000)
          </span>
        </div>
      </section>

      {/* 4. FARMER PAYOUT BREAKDOWN TABLE */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs space-y-0">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="material-symbols-outlined text-[20px]">group</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-2 py-0.5 rounded-full border border-[#c3cda7]">
                  FARMER ALLOCATION PAYOUT BREAKDOWN
                </span>
                <span className="text-[10px] font-mono text-[#1b6e53] font-bold">
                  ● 4 Farmers Allocated (100% Accounted For)
                </span>
              </div>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                Farmer Payout Breakdown
              </h3>
              <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                Direct farmer payout breakdown using physical fulfillment allocation records (Accepted Qty × ₹25/kg agreed rate).
              </p>
            </div>
          </div>

          <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#f1efdf] px-3 py-1 rounded-[100px] border border-[#c3cda7]">
            Total Farmer Settlement: ₹{(settlement.farmerSettlementTotal || 17500).toLocaleString('en-IN')}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">Farmer Ref &amp; Name</th>
                <th className="py-3 px-3 text-right">Allocated Qty</th>
                <th className="py-3 px-3 text-right">Accepted Qty</th>
                <th className="py-3 px-3 text-right">Agreed Rate</th>
                <th className="py-3 px-3 text-right">Formula</th>
                <th className="py-3 px-3 text-right">Payout Amount</th>
                <th className="py-3 px-4 text-center">Payout Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529] font-mono">
              {[
                { farmer: 'Farmer A (Ramesh B.)', id: 'FARM-001', allocated: 70, accepted: 70, rate: 25, payout: 1750 },
                { farmer: 'Farmer B (G. Somaraju)', id: 'FARM-002', allocated: 140, accepted: 140, rate: 25, payout: 3500 },
                { farmer: 'Farmer C (K. Satyanarayana)', id: 'FARM-003', allocated: 210, accepted: 210, rate: 25, payout: 5250 },
                { farmer: 'Farmer D (M. Venkat Rao)', id: 'FARM-004', allocated: 280, accepted: 280, rate: 25, payout: 7000 },
              ].map((f, idx) => (
                <tr key={idx} className="hover:bg-[#faf9f0] transition">
                  <td className="py-4 px-4">
                    <span className="font-bold text-[#00372a] block font-editorial text-base leading-tight">
                      {f.farmer}
                    </span>
                    <span className="text-[10px] text-[#6d6d6d] block">
                      ID: {f.id} • Lot LOT-1031-0{idx + 1}
                    </span>
                  </td>

                  <td className="py-4 px-3 text-right text-[#6d6d6d]">
                    {f.allocated} kg
                  </td>

                  <td className="py-4 px-3 text-right font-bold text-[#1b6e53] text-sm">
                    {f.accepted} kg
                  </td>

                  <td className="py-4 px-3 text-right text-[#353535]">
                    ₹{f.rate.toFixed(2)} / kg
                  </td>

                  <td className="py-4 px-3 text-right text-[#6d6d6d]">
                    {f.accepted} kg × ₹{f.rate}
                  </td>

                  <td className="py-4 px-3 text-right font-extrabold text-[#00372a] text-sm">
                    ₹{f.payout.toLocaleString('en-IN')}
                  </td>

                  <td className="py-4 px-4 text-center">
                    <span className="inline-block px-3 py-1 rounded-[100px] text-[10px] font-mono font-bold uppercase tracking-wider bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]">
                      Recorded
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Total Row */}
            <tfoot className="bg-[#f1efdf] border-t-2 border-[#1b6e53] font-mono text-xs font-bold text-[#00372a]">
              <tr>
                <td className="py-4 px-4 font-editorial text-base">
                  Total Farmer Settlement Pool
                </td>
                <td className="py-4 px-3 text-right text-[#6d6d6d]">
                  700 kg
                </td>
                <td className="py-4 px-3 text-right text-[#1b6e53] text-base">
                  700 kg
                </td>
                <td className="py-4 px-3 text-right text-[#353535]">
                  ₹25.00 / kg
                </td>
                <td className="py-4 px-3 text-right text-[#6d6d6d]">
                  700 kg × ₹25
                </td>
                <td className="py-4 px-3 text-right text-[#1b6e53] text-base">
                  ₹17,500
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-block px-3 py-1 rounded-[100px] text-[10px] font-bold uppercase bg-[#1b6e53] text-[#ffffff]">
                    100% Recorded
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* 5. MULTI-ITEM SETTLEMENT BREAKDOWN */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-[#1b6e53]">receipt</span>
            <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
              Multi-Item Contract Settlement &amp; Delivered Total
            </h3>
          </div>
          <span className="text-xs font-mono text-[#6d6d6d]">
            3 Commodities Settled
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">Commodity</th>
                <th className="py-3 px-3">Supplier FPO</th>
                <th className="py-3 px-3 text-right">Accepted Qty</th>
                <th className="py-3 px-3 text-right">Farmer Rate</th>
                <th className="py-3 px-3 text-right">Farmer Pool</th>
                <th className="py-3 px-3 text-right">Transport</th>
                <th className="py-3 px-3 text-right">Delivered Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529] font-mono">
              {[
                { crop: 'Tomato (Grade A)', fpo: 'Godavari Farmers Producer Org', qty: 700, rate: 25, amount: 17500, transport: 1500, delivered: 28500 },
                { crop: 'Onion (Grade A)', fpo: 'Delta Agro FPO', qty: 500, rate: 22, amount: 11000, transport: 1200, delivered: 14200 },
                { crop: 'Green Chilli (Grade A)', fpo: 'Green Valley FPO', qty: 200, rate: 38, amount: 7600, transport: 800, delivered: 9600 },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-[#faf9f0] transition">
                  <td className="py-3.5 px-4 font-bold text-[#00372a] text-sm font-editorial">
                    {item.crop}
                  </td>
                  <td className="py-3.5 px-3 font-sans text-[#353535]">
                    {item.fpo}
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-[#1b6e53]">
                    {item.qty} kg
                  </td>
                  <td className="py-3.5 px-3 text-right text-[#353535]">
                    ₹{item.rate} / kg
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-[#1b6e53]">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-[#683600]">
                    + ₹{item.transport.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-3 text-right font-extrabold text-[#00372a]">
                    ₹{item.delivered.toLocaleString('en-IN')}
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
