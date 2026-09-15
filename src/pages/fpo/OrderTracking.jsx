import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import {
  getStoredHubOperations,
  calculateHubKPIs,
} from '../../data/hubOperationsData'

export default function FPOOrderTracking() {
  const { orderId } = useParams()
  const [hubState, setHubState] = useState(getStoredHubOperations())

  useEffect(() => {
    const handleStorage = () => setHubState(getStoredHubOperations())
    window.addEventListener('storage', handleStorage)
    setHubState(getStoredHubOperations())
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const kpis = calculateHubKPIs(hubState)
  const activeOrder = hubState.activeOrder
  const currentStatus = activeOrder.status

  // 11-stage tracking timeline matching Buyer and Hub
  const timelineStages = [
    { key: 'Confirmed', label: 'Confirmed', desc: 'Commercial terms accepted' },
    { key: 'Fulfillment Planned', label: 'Fulfillment Planned', desc: 'Hub & quota planned' },
    { key: 'Collection', label: 'Collection', desc: 'Inward gate intake' },
    { key: 'Quality Approved', label: 'Quality Approved', desc: 'Lab QA verified' },
    { key: 'Aggregated', label: 'Aggregated', desc: 'Consignment palletized' },
    { key: 'Dispatched', label: 'Dispatched', desc: 'Outbound manifest issued' },
    { key: 'In Transit', label: 'In Transit', desc: 'Carrier on transit corridor' },
    { key: 'Delivered', label: 'Delivered', desc: 'Arrived at buyer dock' },
    { key: 'Buyer Verified', label: 'Buyer Verified', desc: 'Buyer verified quantity & grade' },
    { key: 'Payment Confirmed', label: 'Payment Confirmed', desc: 'Escrow payment recorded' },
    { key: 'Completed', label: 'Completed', desc: 'Settlement recorded & completed' },
  ]

  const getStageIndex = (status) => {
    if (status === 'Confirmed') return 0
    if (status === 'Fulfillment Planned') return 1
    if (status === 'Collection' || status === 'Collected') return 2
    if (status === 'Quality Approved' || status === 'Quality Inspection' || status === 'Aggregation In Progress') return 3
    if (status === 'Aggregated' || status === 'Ready for Dispatch' || status === 'Partial Fulfillment Available' || status === 'Buyer Review Required' || status === 'Ready for Partial Dispatch') return 4
    if (status === 'Dispatched' || status === 'Partially Dispatched') return 5
    if (status === 'In Transit') return 6
    if (status === 'Delivered') return 7
    if (status === 'Buyer Verified' || status === 'Ready for Settlement') return 8
    if (status === 'Payment Confirmed') return 9
    if (status === 'Completed') return 10
    if (status === 'Delivery Issue') return 7
    return 5
  }

  const currentStageIndex = getStageIndex(currentStatus)
  const isBuyerVerified = currentStatus === 'Buyer Verified' || currentStatus === 'Ready for Settlement' || currentStatus === 'Payment Confirmed' || currentStatus === 'Completed'
  const isPaymentConfirmed = activeOrder.paymentStatus === 'CONFIRMED' || currentStatus === 'Completed' || currentStatus === 'Payment Confirmed'
  const isCompleted = currentStatus === 'Completed'

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Link to="/fpo/orders" className="text-[10px] font-mono text-[#1b6e53] font-bold hover:underline">
              ← FPO ORDERS
            </Link>
            <span className="text-[#c3cda7]">/</span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              FPO DELIVERY TRACKING (VIEW-ONLY)
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Order Tracking: <span className="italic font-bold">{activeOrder.orderId}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Real-time fulfillment milestone monitoring from collection hub to buyer receiving dock.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <span
            className={`px-4 py-1.5 rounded-[100px] text-xs font-mono font-bold uppercase tracking-wider ${
              isCompleted
                ? 'bg-[#e6ecd5] text-[#1b6e53] border border-[#1b6e53]'
                : isBuyerVerified
                ? 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53]'
                : currentStatus === 'Delivery Issue'
                ? 'bg-rose-50 text-rose-800 border border-rose-300'
                : currentStatus === 'Delivered'
                ? 'bg-[#b2cee7] text-[#00372a] border border-[#00372a]/30'
                : currentStatus === 'In Transit'
                ? 'bg-[#fceace] text-[#683600] border border-[#683600]/40'
                : 'bg-[#b2cee7] text-[#00372a] border border-[#00372a]/30'
            }`}
          >
            ● {currentStatus}
          </span>
        </div>
      </div>

      {/* Authority Rule Notice */}
      <div className="p-3.5 bg-[#f1efdf] rounded-[16px] border border-[#c3cda7] flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-[#00372a]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#1b6e53]">shield</span>
          <span>
            <strong>FPO View-Only Rule:</strong> The FPO tracks live shipment progression. Delivery verification &amp; payment confirmation are exclusively authorized by the Buyer.
          </span>
        </div>
        {(isBuyerVerified || isCompleted) && (
          <Link
            to={`/fpo/settlements/${activeOrder.orderId}`}
            className="py-1 px-3 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition flex items-center gap-1 shadow-2xs"
          >
            <span>View Farmer Settlement Ledger</span>
            <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
          </Link>
        )}
      </div>

      {/* 2. Order Metadata Card */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-5">
        <div className="flex items-start justify-between flex-wrap gap-4 pb-4 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-[18px] bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center font-bold text-2xl shrink-0">
              📦
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-mono font-bold text-xs text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">
                  {activeOrder.orderId}
                </span>
                <span className="text-xs font-mono text-[#6d6d6d]">Institutional Sourcing Contract</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
                {activeOrder.buyer}
              </h2>
            </div>
          </div>

          <div className="text-right font-mono text-xs">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Collection Hub</span>
            <strong className="text-sm text-[#00372a] block">{activeOrder.hubName}</strong>
            <span className="text-[10px] text-[#1b6e53] font-sans">Origin Hub Release Certified</span>
          </div>
        </div>

        {/* 4 Metadata Blocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-3.5 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7] space-y-0.5">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Target Requirement</span>
            <div className="text-base font-bold text-[#00372a]">{activeOrder.hubAllocatedQty || 700} kg</div>
            <p className="text-[10px] text-[#6d6d6d] font-sans">Allocated Hub Quota</p>
          </div>

          <div className="p-3.5 rounded-[16px] bg-[#e6ecd5] border border-[#c3cda7] space-y-0.5">
            <span className="text-[10px] text-[#1b6e53] uppercase font-bold block">Accepted / Weighed</span>
            <div className="text-base font-bold text-[#1b6e53]">{kpis.totalAccepted || 700} kg</div>
            <p className="text-[10px] text-[#1b6e53] font-sans">100% Grade A Net</p>
          </div>

          <div className="p-3.5 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7] space-y-0.5">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Commodity &amp; Grade</span>
            <div className="text-sm font-bold text-[#00372a]">{activeOrder.crop} ({activeOrder.requiredGrade})</div>
            <p className="text-[10px] text-[#6d6d6d] font-sans">{activeOrder.variety}</p>
          </div>

          <div className="p-3.5 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7] space-y-0.5">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Destination Dock</span>
            <div className="text-xs font-bold text-[#00372a] truncate">{activeOrder.destination}</div>
            <p className="text-[10px] text-[#6d6d6d] font-sans">Dock Receiving Bay 4</p>
          </div>
        </div>
      </section>

      {/* 3. STATUS TIMELINE (11 STAGES) */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-[#1b6e53]">linear_scale</span>
            <h3 className="font-editorial text-xl font-bold text-[#00372a]">
              Fulfillment Status Timeline
            </h3>
          </div>
          <span className="text-xs font-mono text-[#6d6d6d]">
            Status: <strong className="text-[#1b6e53]">{currentStatus}</strong>
          </span>
        </div>

        {/* Timeline Bar */}
        <div className="relative pt-2 pb-4 overflow-x-auto">
          <div className="flex items-start justify-between min-w-[880px] relative">
            {/* Connecting Track */}
            <div className="absolute top-4 left-6 right-6 h-1 bg-[#f1efdf] border-t border-b border-[#c3cda7]/50 z-0"></div>

            {timelineStages.map((stage, idx) => {
              const isPast = idx < currentStageIndex
              const isCurrent = idx === currentStageIndex

              return (
                <div key={stage.key} className="flex flex-col items-center text-center relative z-10 w-20 px-0.5">
                  {/* Step Marker Dot */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all shadow-xs ${
                      isPast
                        ? 'bg-[#1b6e53] text-[#ffffff] ring-2 ring-[#e8fe85]'
                        : isCurrent
                        ? 'bg-[#e8fe85] text-[#1b6e53] ring-3 ring-[#1b6e53] scale-110'
                        : 'bg-[#ffffff] text-[#6d6d6d] border border-[#c3cda7]'
                    }`}
                  >
                    {isPast ? (
                      <span className="material-symbols-outlined text-[15px]">check</span>
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-[#1b6e53] animate-ping"></span>
                    ) : (
                      idx + 1
                    )}
                  </div>

                  {/* Stage Label */}
                  <div className="mt-2 space-y-0.5">
                    <span
                      className={`text-[10px] font-mono block leading-tight ${
                        isCurrent
                          ? 'font-bold text-[#1b6e53]'
                          : isPast
                          ? 'font-semibold text-[#00372a]'
                          : 'text-[#6d6d6d]'
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. Active Logistics Telemetry Section (View-Only Status) */}
      <section className="rounded-[24px] bg-[#ffffff] border-2 border-[#1b6e53] p-6 lg:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-3.5">
            <div
              className={`w-12 h-12 rounded-[18px] flex items-center justify-center text-2xl font-bold shrink-0 ${
                isCompleted
                  ? 'bg-[#e6ecd5] text-[#1b6e53]'
                  : isBuyerVerified
                  ? 'bg-[#e8fe85] text-[#1b6e53]'
                  : currentStatus === 'Delivered'
                  ? 'bg-[#b2cee7] text-[#00372a]'
                  : currentStatus === 'Delivery Issue'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-[#fceace] text-[#683600]'
              }`}
            >
              {isCompleted ? '🏆' : isBuyerVerified ? '✅' : currentStatus === 'Delivered' ? '🏢' : currentStatus === 'Delivery Issue' ? '⚠️' : '🚚'}
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#1b6e53] uppercase font-bold tracking-wider">
                FPO LOGISTICS STATUS // {activeOrder.orderId}
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                {isCompleted
                  ? 'Order Completed & Settled'
                  : currentStatus === 'Payment Confirmed'
                  ? 'Buyer Payment Confirmed'
                  : isBuyerVerified
                  ? 'Delivery Confirmed & Verified by Buyer'
                  : currentStatus === 'Delivered'
                  ? 'Shipment Reached Buyer Receiving Dock'
                  : currentStatus === 'Delivery Issue'
                  ? 'Delivery Issue Logged by Buyer'
                  : currentStatus === 'In Transit'
                  ? 'Reefer Consignment In Transit'
                  : 'Consignment Dispatched from Hub'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isBuyerVerified ? (
              <span className="py-2 px-4 rounded-[100px] bg-[#e6ecd5] text-[#1b6e53] font-mono text-xs font-bold border border-[#1b6e53] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Delivery: Confirmed</span>
              </span>
            ) : (
              <span className="py-2 px-4 rounded-[100px] bg-[#f1efdf] text-[#683600] font-mono text-xs font-bold border border-[#c3cda7]">
                Awaiting Buyer Dock Receipt
              </span>
            )}
          </div>
        </div>

        {/* Status Breakdown Grid for FPO: Delivery, Verification, Payment, Settlement */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Delivery Status</span>
            <strong className={`text-sm block ${isBuyerVerified ? 'text-[#1b6e53]' : 'text-[#00372a]'}`}>
              {isBuyerVerified ? 'Confirmed' : currentStatus === 'Delivered' ? 'At Dock' : 'In Transit'}
            </strong>
            <span className="text-[10px] text-[#6d6d6d] font-sans">
              Destination: {activeOrder.destination}
            </span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Buyer Verification</span>
            <strong className={`text-sm block ${isBuyerVerified ? 'text-[#1b6e53]' : 'text-[#683600]'}`}>
              {isBuyerVerified ? 'Completed' : 'Pending Verification'}
            </strong>
            <span className="text-[10px] text-[#6d6d6d] font-sans">
              {isBuyerVerified ? '100% Quality & Qty Passed' : 'Dock Inspection'}
            </span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Payment Status</span>
            <strong className={`text-sm block ${isPaymentConfirmed ? 'text-[#1b6e53]' : 'text-[#683600]'}`}>
              {isPaymentConfirmed ? 'Confirmed' : 'Awaiting Buyer'}
            </strong>
            <span className="text-[10px] text-[#6d6d6d] font-sans">
              {isPaymentConfirmed ? 'Simulated Escrow Cleared' : 'Due on verification'}
            </span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#e6ecd5] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#1b6e53] uppercase font-bold block">Settlement Status</span>
            <strong className="text-base text-[#1b6e53] block">
              {isCompleted ? 'Recorded' : isBuyerVerified ? 'Ready' : 'Pending Delivery'}
            </strong>
            <span className="text-[10px] text-[#1b6e53] font-sans block">
              ₹17,500 Farmer Payout
            </span>
          </div>
        </div>
      </section>

      {/* 5. MULTI-ITEM ORDER TABLE */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-[#1b6e53]">inventory_2</span>
            <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
              Order Items &amp; Fulfillment Quantities
            </h3>
          </div>
          <span className="text-xs font-mono text-[#6d6d6d]">
            3 Commodities Monitored
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">Commodity</th>
                <th className="py-3 px-3">Variety &amp; Grade</th>
                <th className="py-3 px-3 text-right">Ordered Qty</th>
                <th className="py-3 px-3 text-right">Accepted Qty</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529] font-mono">
              {[
                {
                  crop: 'Tomato',
                  variety: 'Hybrid Roma',
                  grade: 'Grade A',
                  orderedQty: 700,
                  acceptedQty: kpis.totalAccepted || 700,
                  status: currentStatus,
                },
                {
                  crop: 'Onion',
                  variety: 'Nasik Red',
                  grade: 'Grade A',
                  orderedQty: 500,
                  acceptedQty: 500,
                  status: isCompleted ? 'Completed' : 'Ready for Dispatch',
                },
                {
                  crop: 'Green Chilli',
                  variety: 'G4 Export',
                  grade: 'Grade A',
                  orderedQty: 200,
                  acceptedQty: 200,
                  status: isCompleted ? 'Completed' : 'Ready for Dispatch',
                },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-[#faf9f0] transition">
                  <td className="py-3.5 px-4 font-bold text-[#00372a] text-sm font-editorial">
                    {item.crop}
                  </td>
                  <td className="py-3.5 px-3 text-[#353535]">
                    {item.variety} • <span className="font-bold text-[#1b6e53]">{item.grade}</span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-[#353535]">
                    {item.orderedQty} kg
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-[#1b6e53]">
                    {item.acceptedQty} kg
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-3 py-0.5 rounded-[100px] text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'Completed'
                          ? 'bg-[#e6ecd5] text-[#1b6e53] border border-[#1b6e53]'
                          : item.status === 'Buyer Verified'
                          ? 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53]'
                          : 'bg-[#fceace] text-[#683600] border border-[#c3cda7]'
                      }`}
                    >
                      {item.status}
                    </span>
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
