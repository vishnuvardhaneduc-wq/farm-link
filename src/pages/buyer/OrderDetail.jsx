import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import {
  getStoredHubOperations,
  markOrderInTransit,
  markOrderDelivered,
  buyerConfirmDelivery,
  buyerReportIssue,
  calculateHubKPIs,
  setOrderTestScenario,
} from '../../data/hubOperationsData'

export default function BuyerOrderDetail() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [hubState, setHubState] = useState(getStoredHubOperations())
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showIssueModal, setShowIssueModal] = useState(false)
  const [issueType, setIssueType] = useState('Damaged produce')
  const [issueDescription, setIssueDescription] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    const handleStorage = () => setHubState(getStoredHubOperations())
    window.addEventListener('storage', handleStorage)
    setHubState(getStoredHubOperations())
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const kpis = calculateHubKPIs(hubState)
  const activeOrder = hubState.activeOrder
  const currentStatus = activeOrder.status
  const isTargetOrder = !orderId || orderId === activeOrder.orderId

  // Timeline stages definition
  const timelineStages = [
    { key: 'Confirmed', label: 'Confirmed', desc: 'Commercial terms accepted' },
    { key: 'Fulfillment Planned', label: 'Fulfillment Planned', desc: 'Hub & farmer quota allocated' },
    { key: 'Collected', label: 'Collected', desc: 'Inward gate weighment verified' },
    { key: 'Quality Approved', label: 'Quality Approved', desc: 'Assay lab grade verified' },
    { key: 'Aggregated', label: 'Aggregated', desc: 'Consignment palletized' },
    { key: 'Dispatched', label: 'Dispatched', desc: 'Loaded & outbound manifest issued' },
    { key: 'In Transit', label: 'In Transit', desc: 'Reefer vehicle on NH corridor' },
    { key: 'Delivered', label: 'Delivered', desc: 'Arrived at destination dock' },
    { key: 'Completed', label: 'Completed', desc: 'Delivery confirmed & settled' },
  ]

  // Map currentStatus to active step index
  const getStageIndex = (status) => {
    if (status === 'Confirmed') return 0
    if (status === 'Fulfillment Planned') return 1
    if (status === 'Aggregation In Progress') return 3
    if (status === 'Partial Fulfillment Available' || status === 'Buyer Review Required') return 4
    if (status === 'Ready for Partial Dispatch' || status === 'Ready for Dispatch') return 4
    if (status === 'Dispatched' || status === 'Partially Dispatched') return 5
    if (status === 'In Transit') return 6
    if (status === 'Delivered') return 7
    if (status === 'Ready for Settlement') return 7
    if (status === 'Delivery Issue') return 7
    if (status === 'Completed') return 8
    return 5
  }

  const currentStageIndex = getStageIndex(currentStatus)

  // Actions
  const handleSimulateInTransit = () => {
    markOrderInTransit(activeOrder.orderId)
    setHubState(getStoredHubOperations())
    setToastMsg(`Consignment marked as In Transit! Carrier telematics active.`)
    setTimeout(() => setToastMsg(''), 4500)
  }

  const handleSimulateDelivered = () => {
    markOrderDelivered(activeOrder.orderId)
    setHubState(getStoredHubOperations())
    setToastMsg(`Shipment arrived at ${activeOrder.destination}. Ready for buyer dock verification.`)
    setTimeout(() => setToastMsg(''), 4500)
  }

  const handleConfirmDeliveryAction = () => {
    buyerConfirmDelivery(activeOrder.orderId)
    setHubState(getStoredHubOperations())
    setShowConfirmModal(false)
    setToastMsg(`Delivery confirmed! Order status updated to 'Ready for Settlement'.`)
    setTimeout(() => setToastMsg(''), 5000)
  }

  const handleSubmitIssueAction = (e) => {
    e.preventDefault()
    buyerReportIssue(activeOrder.orderId, { issueType, description: issueDescription })
    setHubState(getStoredHubOperations())
    setShowIssueModal(false)
    setToastMsg(`Delivery issue flagged to FPO supplier. Order status set to 'Delivery Issue'.`)
    setTimeout(() => setToastMsg(''), 5000)
  }

  const handleScenarioChange = (scenario) => {
    setOrderTestScenario(scenario)
    setHubState(getStoredHubOperations())
    setToastMsg(`State updated to: ${scenario}`)
    setTimeout(() => setToastMsg(''), 3500)
  }

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header & Navigation Breadcrumb */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Link to="/buyer/orders" className="text-[10px] font-mono text-[#1b6e53] font-bold hover:underline">
              ← ORDERS &amp; SHIPMENTS
            </Link>
            <span className="text-[#c3cda7]">/</span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              DELIVERY &amp; FULFILLMENT TRACKING
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Order Tracking: <span className="italic font-bold">{activeOrder.orderId}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Real-time physical logistics, milestone progression, and dock receipt confirmation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-4 py-1.5 rounded-[100px] text-xs font-mono font-bold uppercase tracking-wider ${
              currentStatus === 'Completed'
                ? 'bg-[#e6ecd5] text-[#1b6e53] border border-[#1b6e53]'
                : currentStatus === 'Ready for Settlement'
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

      {/* Toast Alert */}
      {toastMsg && (
        <div className="p-3.5 bg-[#e8fe85] border border-[#1b6e53] text-[#1b6e53] text-xs font-bold rounded-[18px] flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      {/* 2. Order Metadata Summary Card */}
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
                <span className="text-xs font-mono text-[#6d6d6d]">Institutional Procurement Contract</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
                {activeOrder.buyer}
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-[#6d6d6d] block">Supplier FPO</span>
            <strong className="text-base text-[#00372a] font-editorial block">
              Godavari Farmers Producer Org
            </strong>
            <span className="text-xs font-mono text-[#1b6e53]">Verified Aggregator Federation</span>
          </div>
        </div>

        {/* 4 Metadata Blocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-3.5 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7] space-y-0.5">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Ordered Quantity</span>
            <div className="text-base font-bold text-[#00372a]">{activeOrder.hubAllocatedQty} kg</div>
            <p className="text-[10px] text-[#6d6d6d] font-sans">Target Contract Requirement</p>
          </div>

          <div className="p-3.5 rounded-[16px] bg-[#e6ecd5] border border-[#c3cda7] space-y-0.5">
            <span className="text-[10px] text-[#1b6e53] uppercase font-bold block">Delivered / Accepted</span>
            <div className="text-base font-bold text-[#1b6e53]">{kpis.totalAccepted} kg</div>
            <p className="text-[10px] text-[#1b6e53] font-sans">100% Grade A Certified Net</p>
          </div>

          <div className="p-3.5 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7] space-y-0.5">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Commodity &amp; Grade</span>
            <div className="text-sm font-bold text-[#00372a]">{activeOrder.crop} ({activeOrder.requiredGrade})</div>
            <p className="text-[10px] text-[#6d6d6d] font-sans">{activeOrder.variety}</p>
          </div>

          <div className="p-3.5 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7] space-y-0.5">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Destination Dock</span>
            <div className="text-xs font-bold text-[#00372a] truncate">{activeOrder.destination}</div>
            <p className="text-[10px] text-[#6d6d6d] font-sans">Rajahmundry Central Hub ➔ Dock</p>
          </div>
        </div>
      </section>

      {/* 3. STATUS TIMELINE */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-[#1b6e53]">linear_scale</span>
            <h3 className="font-editorial text-xl font-bold text-[#00372a]">
              Fulfillment Status Timeline
            </h3>
          </div>
          <span className="text-xs font-mono text-[#6d6d6d]">
            Current Stage: <strong className="text-[#1b6e53]">{currentStatus}</strong>
          </span>
        </div>

        {/* Timeline Bar */}
        <div className="relative pt-2 pb-4 overflow-x-auto">
          <div className="flex items-start justify-between min-w-[720px] relative">
            {/* Connecting Track */}
            <div className="absolute top-4 left-6 right-6 h-1 bg-[#f1efdf] border-t border-b border-[#c3cda7]/50 z-0"></div>

            {timelineStages.map((stage, idx) => {
              const isPast = idx < currentStageIndex
              const isCurrent = idx === currentStageIndex

              return (
                <div key={stage.key} className="flex flex-col items-center text-center relative z-10 w-24 px-1">
                  {/* Step Marker Dot */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all shadow-xs ${
                      isPast
                        ? 'bg-[#1b6e53] text-[#ffffff] ring-2 ring-[#e8fe85]'
                        : isCurrent
                        ? 'bg-[#e8fe85] text-[#1b6e53] ring-3 ring-[#1b6e53] scale-110'
                        : 'bg-[#ffffff] text-[#6d6d6d] border border-[#c3cda7]'
                    }`}
                  >
                    {isPast ? (
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    ) : isCurrent ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1b6e53] animate-ping"></span>
                    ) : (
                      idx + 1
                    )}
                  </div>

                  {/* Stage Label */}
                  <div className="mt-2.5 space-y-0.5">
                    <span
                      className={`text-[11px] font-mono block leading-tight ${
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

      {/* 4. ACTIVE DELIVERY / FULFILLMENT TRACKING SECTION (SECTION 2, 3, 4, 5) */}
      <section className="rounded-[24px] bg-[#ffffff] border-2 border-[#1b6e53] p-6 lg:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-3.5">
            <div
              className={`w-12 h-12 rounded-[18px] flex items-center justify-center text-2xl font-bold shrink-0 ${
                currentStatus === 'Completed' || currentStatus === 'Ready for Settlement'
                  ? 'bg-[#e6ecd5] text-[#1b6e53]'
                  : currentStatus === 'Delivered'
                  ? 'bg-[#b2cee7] text-[#00372a]'
                  : currentStatus === 'Delivery Issue'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-[#fceace] text-[#683600]'
              }`}
            >
              {currentStatus === 'Completed' || currentStatus === 'Ready for Settlement'
                ? '✅'
                : currentStatus === 'Delivered'
                ? '🏢'
                : currentStatus === 'Delivery Issue'
                ? '⚠️'
                : '🚚'}
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#1b6e53] uppercase font-bold tracking-wider">
                LIVE LOGISTICS TELEMETRY // {activeOrder.orderId}
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                {currentStatus === 'Completed'
                  ? 'Order Completed & Settled'
                  : currentStatus === 'Ready for Settlement'
                  ? 'Delivery Confirmed — Ready for Settlement'
                  : currentStatus === 'Delivered'
                  ? 'Shipment Delivered at Buyer Dock'
                  : currentStatus === 'Delivery Issue'
                  ? 'Delivery Issue Reported'
                  : currentStatus === 'In Transit'
                  ? 'Shipment In Transit to Buyer Dock'
                  : 'Consignment Dispatched from Hub'}
              </h3>
            </div>
          </div>

          {/* Primary Action Buttons for Buyer Delivery */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* If Dispatched -> allow progression to In Transit */}
            {(currentStatus === 'Dispatched' || currentStatus === 'Partially Dispatched') && (
              <button
                type="button"
                onClick={handleSimulateInTransit}
                className="py-2.5 px-5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer font-mono"
              >
                <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                <span>Advance to In Transit</span>
              </button>
            )}

            {/* If In Transit -> allow progression to Delivered */}
            {currentStatus === 'In Transit' && (
              <button
                type="button"
                onClick={handleSimulateDelivered}
                className="py-2.5 px-5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer font-mono"
              >
                <span className="material-symbols-outlined text-[16px]">storefront</span>
                <span>Mark Delivered at Dock</span>
              </button>
            )}

            {/* If Delivered -> Show Confirm Delivery & Report Issue */}
            {currentStatus === 'Delivered' && (
              <>
                <button
                  type="button"
                  onClick={() => setShowIssueModal(true)}
                  className="py-2.5 px-4 rounded-[100px] bg-[#ffffff] hover:bg-rose-50 text-rose-700 border border-rose-300 text-xs font-bold transition shadow-2xs flex items-center gap-1.5 cursor-pointer font-mono"
                >
                  <span className="material-symbols-outlined text-[16px]">flag</span>
                  <span>Report Issue</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className="py-2.5 px-5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-sm flex items-center gap-1.5 cursor-pointer font-mono"
                >
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Confirm Delivery</span>
                </button>
              </>
            )}

            {/* If Ready for Settlement -> Link to FPO settlement */}
            {currentStatus === 'Ready for Settlement' && (
              <div className="py-2 px-4 rounded-[100px] bg-[#e8fe85] text-[#1b6e53] text-xs font-mono font-bold border border-[#1b6e53] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                <span>Delivery Confirmed (Ready for FPO Settlement)</span>
              </div>
            )}

            {/* If Completed */}
            {currentStatus === 'Completed' && (
              <div className="py-2 px-4 rounded-[100px] bg-[#e6ecd5] text-[#1b6e53] text-xs font-mono font-bold border border-[#1b6e53] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Order Completed &amp; Settled</span>
              </div>
            )}
          </div>
        </div>

        {/* DELIVERY ISSUE ALERT BOX (SECTION 5) */}
        {currentStatus === 'Delivery Issue' && activeOrder.deliveryIssue && (
          <div className="p-5 rounded-[20px] bg-rose-50 border-2 border-rose-300 space-y-3 animate-in fade-in">
            <div className="flex items-start justify-between gap-3 pb-2 border-b border-rose-200">
              <div className="flex items-center gap-2 text-rose-800">
                <span className="material-symbols-outlined text-2xl">error</span>
                <div>
                  <h4 className="font-editorial text-lg font-bold">Delivery Issue Logged</h4>
                  <span className="text-[11px] font-mono text-rose-700">
                    Category: <strong>{activeOrder.deliveryIssue.issueType}</strong> • Reported at: {activeOrder.deliveryIssue.reportedAt}
                  </span>
                </div>
              </div>
              <span className="px-3 py-0.5 rounded-[100px] bg-rose-200 text-rose-900 font-mono text-[10px] font-bold">
                FLAGGED FOR FPO REVIEW
              </span>
            </div>
            <p className="text-xs text-rose-900 font-sans">
              <strong>Buyer Description: </strong> {activeOrder.deliveryIssue.description}
            </p>
            <p className="text-[11px] font-mono text-rose-700">
              The issue remains visible. Order dispatch and settlement are on hold pending FPO review.
            </p>
          </div>
        )}

        {/* DETAILS GRID: Dispatch & Delivery Specifics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Dispatch Date</span>
            <strong className="text-sm text-[#00372a] block">
              {activeOrder.dispatchDetails?.dispatchDate || '2026-09-14'}
            </strong>
            <span className="text-[10px] text-[#6d6d6d] font-sans">
              Hub: {activeOrder.hubName}
            </span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Accepted Quantity</span>
            <strong className="text-base text-[#1b6e53] block">
              {kpis.totalAccepted} kg
            </strong>
            <span className="text-[10px] text-[#6d6d6d] font-sans">
              Ordered: {activeOrder.hubAllocatedQty} kg ({kpis.shortfall} kg shortfall)
            </span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Transport &amp; Carrier</span>
            <strong className="text-xs text-[#00372a] block truncate">
              {activeOrder.dispatchDetails?.carrier || 'Delta Cold-Chain'}
            </strong>
            <span className="text-[10px] text-[#1b6e53] font-mono block">
              Vehicle: {activeOrder.dispatchDetails?.vehicleNo || 'AP-39-TX-8841'}
            </span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#e6ecd5] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#1b6e53] uppercase font-bold block">Delivery Destination</span>
            <strong className="text-xs text-[#00372a] block truncate">
              {activeOrder.destination}
            </strong>
            <span className="text-[10px] text-[#1b6e53] font-sans block">
              Supplier: Godavari Farmers FPO
            </span>
          </div>
        </div>

        {/* If Delivery Confirmed -> show Confirmation details */}
        {activeOrder.buyerConfirmation && (
          <div className="p-4 rounded-[18px] bg-[#e6ecd5] border border-[#1b6e53] flex items-center justify-between flex-wrap gap-3 text-xs font-mono text-[#1b6e53]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">verified</span>
              <div>
                <strong>Delivery Confirmed by Buyer: </strong>
                <span>{activeOrder.buyerConfirmation.confirmedAt} ({activeOrder.buyerConfirmation.confirmedQty} kg received)</span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-[100px] bg-[#ffffff] border border-[#1b6e53] text-[10px] font-bold">
              RECEIPT CONFIRMED
            </span>
          </div>
        )}
      </section>

      {/* 5. MULTI-ITEM ORDER TABLE (SECTION 12) */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-[#1b6e53]">inventory_2</span>
            <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
              Order Items &amp; Independent Fulfillment Status
            </h3>
          </div>
          <span className="text-xs font-mono text-[#6d6d6d]">
            {activeOrder.items?.length || 2} Commodities
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
                <th className="py-3 px-3 text-right">Shortfall</th>
                <th className="py-3 px-4 text-center">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529] font-mono">
              {(activeOrder.items || [
                {
                  crop: 'Tomato',
                  variety: 'Hybrid Roma',
                  grade: 'Grade A',
                  orderedQty: 700,
                  acceptedQty: 685,
                  shortfallQty: 15,
                  status: currentStatus,
                },
                {
                  crop: 'Onion',
                  variety: 'Nasik Red',
                  grade: 'Grade A',
                  orderedQty: 500,
                  acceptedQty: 500,
                  shortfallQty: 0,
                  status: 'Ready for Dispatch',
                },
              ]).map((item, idx) => (
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
                  <td className="py-3.5 px-3 text-right font-bold text-[#683600]">
                    {item.shortfallQty > 0 ? `${item.shortfallQty} kg` : '0 kg'}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-3 py-0.5 rounded-[100px] text-[10px] font-bold uppercase tracking-wider ${
                        item.shortfallQty === 0
                          ? 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53]'
                          : 'bg-[#fceace] text-[#683600] border border-[#c3cda7]'
                      }`}
                    >
                      {item.crop === 'Tomato' ? currentStatus : item.status || 'Ready for Dispatch'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. INTERACTIVE DEMO SCENARIO TOOLBAR (TESTING SECTION) */}
      <section className="rounded-[20px] bg-[#f1efdf] border border-[#c3cda7] p-4.5 space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-[10px] font-mono font-bold uppercase text-[#1b6e53] tracking-widest flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">tune</span>
            TEST SCENARIOS &amp; QUICK STATE SWITCHER
          </span>
          <span className="text-[10px] font-mono text-[#6d6d6d]">Instant demo state preview</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: 'dispatched', label: '1. Dispatched' },
            { id: 'in_transit', label: '2. In Transit' },
            { id: 'delivered', label: '3. Delivered' },
            { id: 'ready_for_settlement', label: '4. Buyer Confirmed (Ready for Settlement)' },
            { id: 'completed', label: '5. Order Completed' },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => handleScenarioChange(btn.id)}
              className="py-1.5 px-3.5 rounded-[100px] text-[11px] font-mono bg-[#ffffff] hover:bg-[#e6ecd5] text-[#00372a] border border-[#c3cda7] transition cursor-pointer font-semibold shadow-2xs"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </section>

      {/* 7. MODAL: CONFIRM DELIVERY (SECTION 4) */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border-2 border-[#1b6e53] rounded-[24px] max-w-md w-full p-6 lg:p-7 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]">
              <div className="flex items-center gap-2 text-[#1b6e53]">
                <span className="material-symbols-outlined text-2xl">check_circle</span>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Confirm Delivery?
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="w-8 h-8 rounded-full bg-[#f1efdf] text-[#6d6d6d] hover:text-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7] space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Order Ref:</span>
                <strong className="text-[#00372a]">{activeOrder.orderId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Delivered Quantity:</span>
                <strong className="text-[#1b6e53] text-sm">{kpis.totalAccepted} kg</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Commodity:</span>
                <strong className="text-[#00372a]">{activeOrder.crop} ({activeOrder.requiredGrade})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Supplier FPO:</span>
                <strong className="text-[#00372a]">Godavari Farmers FPO</strong>
              </div>
            </div>

            <p className="text-xs text-[#353535] font-sans leading-relaxed">
              Confirm that the delivered agricultural produce has been received at the designated processing dock.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 rounded-[100px] border border-[#c3cda7] text-xs font-semibold text-[#353535] bg-[#ffffff] hover:bg-[#f1efdf] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeliveryAction}
                className="flex-1 py-3 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5 font-mono"
              >
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Confirm Delivery</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. MODAL: REPORT DELIVERY ISSUE (SECTION 5) */}
      {showIssueModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border-2 border-rose-300 rounded-[24px] max-w-md w-full p-6 lg:p-7 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]">
              <div className="flex items-center gap-2 text-rose-700">
                <span className="material-symbols-outlined text-2xl">warning</span>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Report Delivery Issue
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowIssueModal(false)}
                className="w-8 h-8 rounded-full bg-[#f1efdf] text-[#6d6d6d] hover:text-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitIssueAction} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#00372a] block">
                  Issue Type <span className="text-rose-600">*</span>
                </label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-mono bg-[#ffffff] border border-[#c3cda7] rounded-[10px] text-[#00372a] focus:outline-none focus:ring-1 focus:ring-[#1b6e53]"
                >
                  <option value="Quantity mismatch">Quantity mismatch</option>
                  <option value="Quality issue">Quality issue</option>
                  <option value="Damaged produce">Damaged produce</option>
                  <option value="Late delivery">Late delivery</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#00372a] block">
                  Description <span className="text-rose-600">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="Describe the discrepancy observed during dock receiving..."
                  className="w-full px-3.5 py-2 text-xs font-sans bg-[#ffffff] border border-[#c3cda7] rounded-[10px] text-[#353535] focus:outline-none focus:ring-1 focus:ring-[#1b6e53]"
                ></textarea>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="flex-1 py-3 rounded-[100px] border border-[#c3cda7] text-xs font-semibold text-[#353535] bg-[#ffffff] hover:bg-[#f1efdf] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-[100px] bg-rose-700 hover:bg-rose-800 text-[#ffffff] text-xs font-bold transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5 font-mono"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>Submit Issue</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
