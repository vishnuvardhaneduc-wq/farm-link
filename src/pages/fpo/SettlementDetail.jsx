import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import {
  getStoredHubOperations,
  createOrUpdateSettlementRecord,
  recordSettlementAndCompleteOrder,
  calculateHubKPIs,
} from '../../data/hubOperationsData'

export default function FPOSettlementDetail() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [hubState, setHubState] = useState(getStoredHubOperations())
  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    const handleStorage = () => setHubState(getStoredHubOperations())
    window.addEventListener('storage', handleStorage)
    setHubState(getStoredHubOperations())
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const kpis = calculateHubKPIs(hubState)
  const activeOrder = hubState.activeOrder
  const isOrderTarget = !orderId || orderId === activeOrder.orderId

  // Settlement record calculated strictly on accepted quantity
  const settlement = activeOrder.settlementRecord || createOrUpdateSettlementRecord(hubState)
  const isCompleted = activeOrder.status === 'Completed' || settlement.status === 'Completed'
  const isReadyForSettlement = activeOrder.status === 'Ready for Settlement' || activeOrder.buyerConfirmation?.confirmed

  const handleRecordSettlement = () => {
    recordSettlementAndCompleteOrder(activeOrder.orderId)
    setHubState(getStoredHubOperations())
    setToastMsg(`Settlement recorded! Order ${activeOrder.orderId} marked as Completed. Farmer DBT payouts logged.`)
    setTimeout(() => setToastMsg(''), 5500)
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
              FARMER PAYOUT &amp; BUYER INVOICE
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Settlement Breakdown: <span className="italic font-bold">{settlement.settlementId}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Transparent price realization calculated strictly on accepted quantity with farmer DBT disbursement records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-4 py-1.5 rounded-[100px] text-xs font-mono font-bold uppercase tracking-wider ${
              isCompleted
                ? 'bg-[#e6ecd5] text-[#1b6e53] border border-[#1b6e53]'
                : isReadyForSettlement
                ? 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53]'
                : 'bg-[#fceace] text-[#683600] border border-[#c3cda7]'
            }`}
          >
            ● {isCompleted ? 'Settlement Completed' : isReadyForSettlement ? 'Ready for Settlement' : 'Awaiting Delivery Confirmation'}
          </span>
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

      {/* SUCCESS BANNER WHEN COMPLETED (SECTION 10) */}
      {isCompleted && (
        <section className="p-6 rounded-[24px] bg-[#e6ecd5] border-2 border-[#1b6e53] shadow-md space-y-3 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#c3cda7]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#e8fe85] flex items-center justify-center font-bold text-xl shrink-0">
                ✓
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#1b6e53] tracking-wider">
                  ORDER COMPLETED // CONTRACT FULFILLED
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Order Completed: {activeOrder.orderId}
                </h2>
              </div>
            </div>

            <span className="px-3.5 py-1 rounded-[100px] bg-[#1b6e53] text-[#ffffff] font-mono text-xs font-bold shadow-2xs">
              Settlement Recorded
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div>
              <span className="text-[#6d6d6d] block text-[9px] uppercase">Delivery State:</span>
              <strong className="text-[#1b6e53]">Confirmed at Buyer Dock</strong>
            </div>
            <div>
              <span className="text-[#6d6d6d] block text-[9px] uppercase">Settlement Amount:</span>
              <strong className="text-[#00372a] font-extrabold text-sm">₹{settlement.settlementAmount.toLocaleString()}</strong>
            </div>
            <div>
              <span className="text-[#6d6d6d] block text-[9px] uppercase">Buyer Payment:</span>
              <strong className="text-[#1b6e53]">{settlement.buyerPaymentStatus}</strong>
            </div>
            <div>
              <span className="text-[#6d6d6d] block text-[9px] uppercase">Farmer Payouts:</span>
              <strong className="text-[#1b6e53]">{settlement.farmerPayoutStatus} (4 Farmers)</strong>
            </div>
          </div>
        </section>
      )}

      {/* 2. SETTLEMENT COMMERCIAL SUMMARY CARD (SECTION 6) */}
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
                FPO &amp; Farmer Settlement Ledger
              </h2>
            </div>
          </div>

          {/* Action to complete settlement */}
          <div className="flex items-center gap-3">
            {!isCompleted ? (
              <button
                type="button"
                disabled={!isReadyForSettlement}
                onClick={handleRecordSettlement}
                className="py-3 px-6 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] disabled:opacity-50 disabled:cursor-not-allowed text-[#ffffff] text-xs font-bold uppercase tracking-wider transition shadow-sm flex items-center gap-2 cursor-pointer font-mono"
              >
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                <span>Record Settlement &amp; Complete Order</span>
              </button>
            ) : (
              <div className="py-2.5 px-5 rounded-[100px] bg-[#e6ecd5] text-[#1b6e53] font-mono text-xs font-bold flex items-center gap-2 border border-[#1b6e53]">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Settlement Recorded</span>
              </div>
            )}
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Accepted Quantity</span>
            <div className="text-xl font-bold text-[#1b6e53]">
              {settlement.acceptedQty.toLocaleString()} kg
            </div>
            <p className="text-[10px] text-[#6d6d6d] font-sans">
              Ordered: {settlement.orderedQty} kg ({settlement.shortfallQty} kg shortfall)
            </p>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Agreed Farmer Rate</span>
            <div className="text-xl font-bold text-[#00372a]">
              ₹{settlement.agreedFarmerRate.toFixed(2)} / kg
            </div>
            <p className="text-[10px] text-[#6d6d6d] font-sans">Guaranteed Minimum Base Rate</p>
          </div>

          <div className="p-4 rounded-[18px] bg-[#e6ecd5] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#1b6e53] uppercase font-bold block">Total Farmer Settlement</span>
            <div className="text-2xl font-bold text-[#1b6e53]">
              ₹{settlement.settlementAmount.toLocaleString()}
            </div>
            <p className="text-[10px] text-[#1b6e53] font-sans">Disbursed via DBT simulation</p>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Buyer Invoiced Total</span>
            <div className="text-xl font-bold text-[#683600]">
              ₹{settlement.buyerInvoiceAmount.toLocaleString()}
            </div>
            <p className="text-[10px] text-[#6d6d6d] font-sans">
              @ ₹{settlement.agreedBuyerRate.toFixed(2)}/kg (FPO Margin: ₹{settlement.fpoMargin.toLocaleString()})
            </p>
          </div>
        </div>

        {/* Formula Explanation Callout (Section 6) */}
        <div className="p-4 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7] flex items-center justify-between flex-wrap gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#1b6e53]">calculate</span>
            <div>
              <strong className="text-[#00372a]">Settlement Calculation Rule: </strong>
              <span className="text-[#353535]">{settlement.formulaExplanation}</span>
            </div>
          </div>
          <span className="text-[11px] text-[#683600] font-bold bg-[#ffffff] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">
            Based on actual accepted produce
          </span>
        </div>
      </section>

      {/* 3. FARMER PAYOUT BREAKDOWN TABLE (SECTION 7 & 9) */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs space-y-0">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="material-symbols-outlined text-[20px]">group</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-2 py-0.5 rounded-full border border-[#c3cda7]">
                  TRANSPARENT CLUSTER PAYOUT
                </span>
                <span className="text-[10px] font-mono text-[#1b6e53] font-bold">
                  ● 4 Farmers Allocated
                </span>
              </div>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                Farmer Payout Breakdown
              </h3>
              <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                Direct bank transfer simulation per farmer lot recorded during fulfillment.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#f1efdf] px-3 py-1 rounded-[100px] border border-[#c3cda7]">
            Total Disbursal: ₹{settlement.settlementAmount.toLocaleString()}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">Farmer Ref &amp; Name</th>
                <th className="py-3 px-3 text-right">Allocated Qty</th>
                <th className="py-3 px-3 text-right">Gate Intake</th>
                <th className="py-3 px-3 text-right">Accepted Qty</th>
                <th className="py-3 px-3 text-right">Agreed Rate</th>
                <th className="py-3 px-3 text-right">Payout Amount</th>
                <th className="py-3 px-4 text-center">Payout Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529] font-mono">
              {settlement.farmerPayouts.map((farmer, idx) => (
                <tr key={idx} className="hover:bg-[#faf9f0] transition">
                  <td className="py-4 px-4">
                    <div className="space-y-0.5">
                      <span className="font-bold text-[#00372a] block font-editorial text-base leading-tight">
                        {farmer.farmerName}
                      </span>
                      <span className="text-[10px] text-[#6d6d6d] block">
                        ID: {farmer.farmerId} • Lot: {farmer.lotId}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-3 text-right text-[#6d6d6d]">
                    {farmer.allocatedQty} kg
                  </td>

                  <td className="py-4 px-3 text-right text-[#353535]">
                    {farmer.actualCollectedQty} kg
                  </td>

                  <td className="py-4 px-3 text-right font-bold text-[#1b6e53] text-sm">
                    {farmer.acceptedQty} kg
                  </td>

                  <td className="py-4 px-3 text-right text-[#353535]">
                    ₹{farmer.agreedRate.toFixed(2)} / kg
                  </td>

                  <td className="py-4 px-3 text-right font-extrabold text-[#00372a] text-sm">
                    ₹{farmer.payoutAmount.toLocaleString()}
                  </td>

                  <td className="py-4 px-4 text-center">
                    <span className="inline-block px-3 py-1 rounded-[100px] text-[10px] font-mono font-bold uppercase tracking-wider bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]">
                      {farmer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Total Row */}
            <tfoot className="bg-[#f1efdf] border-t-2 border-[#1b6e53] font-mono text-xs font-bold text-[#00372a]">
              <tr>
                <td className="py-4 px-4 font-editorial text-base">
                  Total Aggregate Settlement
                </td>
                <td className="py-4 px-3 text-right text-[#6d6d6d]">
                  {settlement.orderedQty} kg
                </td>
                <td className="py-4 px-3 text-right text-[#353535]">
                  —
                </td>
                <td className="py-4 px-3 text-right text-[#1b6e53] text-base">
                  {settlement.acceptedQty} kg
                </td>
                <td className="py-4 px-3 text-right text-[#353535]">
                  Avg ₹{settlement.agreedFarmerRate.toFixed(2)}
                </td>
                <td className="py-4 px-3 text-right text-[#1b6e53] text-base">
                  ₹{settlement.settlementAmount.toLocaleString()}
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-block px-3 py-1 rounded-[100px] text-[10px] font-bold uppercase bg-[#1b6e53] text-[#ffffff]">
                    100% Cleared
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* 4. BUYER PAYMENT & DEMO SIMULATION NOTICE (SECTION 8) */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-[#1b6e53]">shield_with_heart</span>
            <h3 className="font-editorial text-xl font-bold text-[#00372a]">
              Buyer Payment &amp; Escrow Simulation
            </h3>
          </div>
          <span className="px-3 py-1 rounded-[100px] bg-[#e6ecd5] text-[#1b6e53] font-mono text-xs font-bold border border-[#c3cda7]">
            {settlement.buyerPaymentStatus}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-3.5 rounded-[14px] bg-[#f1efdf] border border-[#c3cda7] space-y-0.5">
            <span className="text-[#6d6d6d] text-[10px] block">Buyer Entity:</span>
            <strong className="text-[#00372a]">{settlement.buyer}</strong>
          </div>
          <div className="p-3.5 rounded-[14px] bg-[#f1efdf] border border-[#c3cda7] space-y-0.5">
            <span className="text-[#6d6d6d] text-[10px] block">Invoiced Amount:</span>
            <strong className="text-[#1b6e53]">₹{settlement.buyerInvoiceAmount.toLocaleString()}</strong>
          </div>
          <div className="p-3.5 rounded-[14px] bg-[#f1efdf] border border-[#c3cda7] space-y-0.5">
            <span className="text-[#6d6d6d] text-[10px] block">Payment Gateway Mode:</span>
            <strong className="text-[#00372a]">Direct Escrow Simulation</strong>
          </div>
        </div>

        <p className="text-[11px] font-mono text-[#6d6d6d] bg-[#f1efdf] p-3 rounded-[12px] border border-[#c3cda7]/50">
          <strong className="text-[#00372a]">Demo Architecture Note: </strong>
          Buyer payment and farmer DBT disbursements are recorded via FarmLink simulated escrow state. No live banking transfer is initiated for MVP demonstration.
        </p>
      </section>
    </div>
  )
}
