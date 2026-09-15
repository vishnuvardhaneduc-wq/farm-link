import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import {
  getStoredHubOperations,
  markOrderInTransit,
  markOrderDelivered,
  buyerConfirmDelivery,
  buyerConfirmPayment,
  buyerReportIssue,
  resolveDeliveryIssue,
  calculateHubKPIs,
  setOrderTestScenario,
} from '../../data/hubOperationsData'

export default function BuyerOrderDetail() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [hubState, setHubState] = useState(getStoredHubOperations())
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showIssueModal, setShowIssueModal] = useState(false)
  const [issueType, setIssueType] = useState('Damaged produce')
  const [issueDescription, setIssueDescription] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  // Verification Checklist State
  const [isQtyCorrect, setIsQtyCorrect] = useState(true)
  const [isGradeCorrect, setIsGradeCorrect] = useState(true)
  const [isOrderReceived, setIsOrderReceived] = useState(true)
  const [verificationNotes, setVerificationNotes] = useState('')

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

  // 11-stage tracking timeline as strictly specified
  const timelineStages = [
    { key: 'Confirmed', label: 'Confirmed', desc: 'Commercial terms accepted' },
    { key: 'Fulfillment Planned', label: 'Fulfillment Planned', desc: 'Hub & quota planned' },
    { key: 'Collection', label: 'Collection', desc: 'Gate intake verified' },
    { key: 'Quality Approved', label: 'Quality Approved', desc: 'Lab QA passed' },
    { key: 'Aggregated', label: 'Aggregated', desc: 'Consignment palletized' },
    { key: 'Dispatched', label: 'Dispatched', desc: 'Outbound manifest issued' },
    { key: 'In Transit', label: 'In Transit', desc: 'Carrier on transit corridor' },
    { key: 'Delivered', label: 'Delivered', desc: 'Arrived at destination dock' },
    { key: 'Buyer Verified', label: 'Buyer Verified', desc: 'Quantity & grade verified' },
    { key: 'Payment Confirmed', label: 'Payment Confirmed', desc: 'Escrow payment recorded' },
    { key: 'Completed', label: 'Completed', desc: 'Order fulfilled & settled' },
  ]

  // Map currentStatus to active step index
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
  const isDelivered = currentStatus === 'Delivered'
  const isBuyerVerified = currentStatus === 'Buyer Verified' || currentStatus === 'Ready for Settlement' || currentStatus === 'Payment Confirmed' || currentStatus === 'Completed'
  const isPaymentConfirmed = activeOrder.paymentStatus === 'CONFIRMED' || currentStatus === 'Completed' || currentStatus === 'Payment Confirmed'
  const isCompleted = currentStatus === 'Completed'
  const hasDeliveryIssue = currentStatus === 'Delivery Issue'

  // Calculations for verified delivered value
  const verifiedQty = kpis.totalAccepted || 700
  const produceValue = 27000 // Tomato produce value
  const transportCost = 1500 // Recorded transportation cost
  const agreedOrderValue = produceValue + transportCost // ₹28,500 total delivered cost
  const agreedRate = (agreedOrderValue / verifiedQty).toFixed(2) // ₹40.71/kg effective

  // Actions
  const handleSimulateInTransit = () => {
    markOrderInTransit(activeOrder.orderId)
    setHubState(getStoredHubOperations())
    setToastMsg(`Consignment marked as In Transit! Carrier transport active.`)
    setTimeout(() => setToastMsg(''), 4500)
  }

  const handleSimulateDelivered = () => {
    markOrderDelivered(activeOrder.orderId)
    setHubState(getStoredHubOperations())
    setToastMsg(`Order marked as Delivered at ${activeOrder.destination}. Ready for dock verification.`)
    setTimeout(() => setToastMsg(''), 4500)
  }

  const handleConfirmReceivedOrder = () => {
    buyerConfirmDelivery(activeOrder.orderId, {
      isQuantityCorrect: isQtyCorrect,
      isGradeCorrect: isGradeCorrect,
      notes: verificationNotes,
    })
    setHubState(getStoredHubOperations())
    setShowVerifyModal(false)
    setToastMsg(`Receipt verified & confirmed! Order status updated to 'BUYER VERIFIED'. Payment confirmation is now active.`)
    setTimeout(() => setToastMsg(''), 5500)
  }

  const handleConfirmPaymentAction = () => {
    buyerConfirmPayment(activeOrder.orderId)
    setHubState(getStoredHubOperations())
    setShowPaymentModal(false)
    setToastMsg(`Payment confirmed! Order marked as COMPLETED. Settlement recorded.`)
    setTimeout(() => setToastMsg(''), 5500)
  }

  const handleSubmitIssueAction = (e) => {
    e.preventDefault()
    buyerReportIssue(activeOrder.orderId, { issueType, description: issueDescription })
    setHubState(getStoredHubOperations())
    setShowIssueModal(false)
    setToastMsg(`Delivery issue flagged to FPO supplier. Payment confirmation locked pending resolution.`)
    setTimeout(() => setToastMsg(''), 5500)
  }

  const handleResolveIssue = () => {
    resolveDeliveryIssue(activeOrder.orderId)
    setHubState(getStoredHubOperations())
    setToastMsg(`Delivery issue resolved. Returned to Delivered state for verification.`)
    setTimeout(() => setToastMsg(''), 4500)
  }

  const handleScenarioChange = (scenario) => {
    setOrderTestScenario(scenario)
    setHubState(getStoredHubOperations())
    setToastMsg(`Demo state updated to: ${scenario}`)
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
              DELIVERY TRACKING &amp; VERIFICATION
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Order Tracking: <span className="italic font-bold">{activeOrder.orderId}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Milestone progression from origin hub dispatch to dock receiving, buyer verification, and payment confirmation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-4 py-1.5 rounded-[100px] text-xs font-mono font-bold uppercase tracking-wider ${
              isCompleted
                ? 'bg-[#e6ecd5] text-[#1b6e53] border border-[#1b6e53]'
                : currentStatus === 'Buyer Verified' || currentStatus === 'Payment Confirmed' || currentStatus === 'Ready for Settlement'
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

        {/* 5 Metadata Blocks */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 font-mono text-xs">
          <div className="p-3.5 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7] space-y-0.5">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Ordered Quantity</span>
            <div className="text-base font-bold text-[#00372a]">{activeOrder.hubAllocatedQty || 700} kg</div>
            <p className="text-[10px] text-[#6d6d6d] font-sans">Target Contract Volume</p>
          </div>

          <div className="p-3.5 rounded-[16px] bg-[#e6ecd5] border border-[#c3cda7] space-y-0.5">
            <span className="text-[10px] text-[#1b6e53] uppercase font-bold block">Delivered / Accepted</span>
            <div className="text-base font-bold text-[#1b6e53]">{verifiedQty} kg</div>
            <p className="text-[10px] text-[#1b6e53] font-sans">100% Grade A Certified</p>
          </div>

          <div className="p-3.5 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7] space-y-0.5">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Produce Value</span>
            <div className="text-base font-bold text-[#00372a]">₹27,000</div>
            <p className="text-[10px] text-[#6d6d6d] font-sans">Commodity Base Value</p>
          </div>

          <div className="p-3.5 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7] space-y-0.5">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Transportation</span>
            <div className="text-base font-bold text-[#1b6e53]">+ ₹1,500</div>
            <p className="text-[10px] text-[#1b6e53] font-sans">Recorded Transport</p>
          </div>

          <div className="p-3.5 rounded-[16px] bg-[#e6ecd5] border border-[#1b6e53] space-y-0.5">
            <span className="text-[10px] text-[#1b6e53] uppercase font-bold block">Delivered Total</span>
            <div className="text-lg font-extrabold text-[#00372a]">₹28,500</div>
            <p className="text-[10px] text-[#1b6e53] font-sans">Total Order Landed Cost</p>
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
            Current Stage: <strong className="text-[#1b6e53]">{currentStatus}</strong>
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

      {/* 4. ACTIVE LOGISTICS & TRANSIT TELEMETRY CARD */}
      <section className="rounded-[24px] bg-[#ffffff] border-2 border-[#1b6e53] p-6 lg:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-3.5">
            <div
              className={`w-12 h-12 rounded-[18px] flex items-center justify-center text-2xl font-bold shrink-0 ${
                isCompleted
                  ? 'bg-[#e6ecd5] text-[#1b6e53]'
                  : isBuyerVerified
                  ? 'bg-[#e8fe85] text-[#1b6e53]'
                  : isDelivered
                  ? 'bg-[#b2cee7] text-[#00372a]'
                  : hasDeliveryIssue
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-[#fceace] text-[#683600]'
              }`}
            >
              {isCompleted ? '🏆' : isBuyerVerified ? '✅' : isDelivered ? '🏢' : hasDeliveryIssue ? '⚠️' : '🚚'}
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#1b6e53] uppercase font-bold tracking-wider">
                LIVE LOGISTICS TELEMETRY // {activeOrder.orderId}
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                {isCompleted
                  ? 'Order Completed'
                  : currentStatus === 'Payment Confirmed'
                  ? 'Payment Confirmed'
                  : currentStatus === 'Buyer Verified'
                  ? 'Buyer Verified — Ready for Payment'
                  : isDelivered
                  ? 'Order Delivered at Buyer Dock'
                  : hasDeliveryIssue
                  ? 'Delivery Issue Reported'
                  : currentStatus === 'In Transit'
                  ? 'Shipment In Transit to Buyer Dock'
                  : 'Consignment Dispatched from Hub'}
              </h3>
            </div>
          </div>

          {/* Action Buttons for Progression */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* If Dispatched -> advance to In Transit */}
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

            {/* If In Transit -> mark delivered */}
            {currentStatus === 'In Transit' && (
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
                  onClick={handleSimulateDelivered}
                  className="py-2.5 px-5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer font-mono"
                >
                  <span className="material-symbols-outlined text-[16px]">storefront</span>
                  <span>Mark Delivered at Dock</span>
                </button>
              </>
            )}

            {/* If Delivered -> Report Issue & Verify button */}
            {isDelivered && (
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
                  onClick={() => setShowVerifyModal(true)}
                  className="py-2.5 px-5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-sm flex items-center gap-1.5 cursor-pointer font-mono"
                >
                  <span className="material-symbols-outlined text-[16px]">fact_check</span>
                  <span>Verify &amp; Confirm Order</span>
                </button>
              </>
            )}

            {/* If Delivery Issue */}
            {hasDeliveryIssue && (
              <button
                type="button"
                onClick={handleResolveIssue}
                className="py-2 px-4 rounded-[100px] bg-[#e6ecd5] text-[#1b6e53] border border-[#1b6e53] text-xs font-bold font-mono transition cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
                <span>Resolve Issue &amp; Proceed</span>
              </button>
            )}
          </div>
        </div>

        {/* DELIVERY ISSUE ALERT BOX */}
        {hasDeliveryIssue && activeOrder.deliveryIssue && (
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
                PAYMENT LOCKED
              </span>
            </div>
            <p className="text-xs text-rose-900 font-sans">
              <strong>Discrepancy Description: </strong> {activeOrder.deliveryIssue.description}
            </p>
            <p className="text-[11px] font-mono text-rose-700">
              Payment confirmation is locked while this issue is active. Resolve the issue or proceed once agreed with FPO.
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
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Expected Delivery</span>
            <strong className="text-sm text-[#00372a] block">
              25 Sep 2026
            </strong>
            <span className="text-[10px] text-[#1b6e53] font-sans">
              Destination: {activeOrder.destination}
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
            <span className="text-[10px] text-[#1b6e53] uppercase font-bold block">Current Status</span>
            <strong className="text-base text-[#1b6e53] block">
              {currentStatus}
            </strong>
            <span className="text-[10px] text-[#1b6e53] font-sans block">
              {verifiedQty} kg Verified Volume
            </span>
          </div>
        </div>
      </section>

      {/* 5. WHEN BUYER RECEIVES ORDER: "ORDER DELIVERED" & VERIFICATION SECTION */}
      {(isDelivered || isBuyerVerified) && (
        <section className="rounded-[24px] bg-[#ffffff] border-2 border-[#1b6e53] p-6 lg:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center font-bold text-xl shrink-0">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#1b6e53] tracking-wider">
                  DOCK RECEIVING &amp; QUALITY VERIFICATION
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  {isBuyerVerified ? 'Delivery Verified by Buyer' : 'Order Delivered — Verify Delivery'}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-[100px] bg-[#e6ecd5] text-[#1b6e53] font-mono text-xs font-bold border border-[#1b6e53]">
                Delivery Date: 25 Sep 2026
              </span>
            </div>
          </div>

          {/* Delivery Comparison Table: Ordered vs Delivered */}
          <div className="rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#c3cda7]/60 pb-2.5">
              <h4 className="font-editorial text-lg font-bold text-[#00372a]">
                Verify Delivery Specifications
              </h4>
              <span className="text-xs font-mono text-[#6d6d6d]">
                Origin: <strong>{activeOrder.hubName}</strong> • Supplier: <strong>Godavari Farmers FPO</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-3 bg-[#ffffff] rounded-[14px] border border-[#c3cda7] space-y-1">
                <span className="text-[#6d6d6d] text-[10px] uppercase block">Ordered Quantity</span>
                <div className="text-base font-bold text-[#00372a]">{activeOrder.hubAllocatedQty || 700} kg</div>
                <span className="text-[10px] text-[#6d6d6d]">Contract Baseline</span>
              </div>

              <div className="p-3 bg-[#ffffff] rounded-[14px] border border-[#c3cda7] space-y-1">
                <span className="text-[#1b6e53] text-[10px] uppercase font-bold block">Delivered Quantity</span>
                <div className="text-base font-bold text-[#1b6e53]">{verifiedQty} kg</div>
                <span className="text-[10px] text-[#1b6e53] font-semibold">✓ Net Scale Certified</span>
              </div>

              <div className="p-3 bg-[#ffffff] rounded-[14px] border border-[#c3cda7] space-y-1">
                <span className="text-[#6d6d6d] text-[10px] uppercase block">Required Grade</span>
                <div className="text-sm font-bold text-[#00372a]">{activeOrder.requiredGrade || 'Grade A'}</div>
                <span className="text-[10px] text-[#6d6d6d]">Assay Specification</span>
              </div>

              <div className="p-3 bg-[#ffffff] rounded-[14px] border border-[#c3cda7] space-y-1">
                <span className="text-[#1b6e53] text-[10px] uppercase font-bold block">Delivered Grade</span>
                <div className="text-sm font-bold text-[#1b6e53]">{activeOrder.requiredGrade || 'Grade A'}</div>
                <span className="text-[10px] text-[#1b6e53] font-semibold">✓ 100% Quality Pass</span>
              </div>
            </div>

            {/* Checkpoints Status */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[100px] bg-[#ffffff] border border-[#1b6e53] text-[#1b6e53] font-mono text-xs font-bold">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Quantity Correct ({verifiedQty} kg)</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[100px] bg-[#ffffff] border border-[#1b6e53] text-[#1b6e53] font-mono text-xs font-bold">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Grade Correct (Grade A)</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[100px] bg-[#ffffff] border border-[#1b6e53] text-[#1b6e53] font-mono text-xs font-bold">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Order Received at Dock</span>
              </span>
            </div>
          </div>

          {/* Action button to confirm received order if not yet verified */}
          {!isBuyerVerified && isDelivered && (
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowVerifyModal(true)}
                className="py-3 px-8 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer flex items-center gap-2 font-mono"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Confirm Received Order</span>
              </button>
            </div>
          )}

          {/* Once Buyer Verified, show Confirmation Badge */}
          {isBuyerVerified && activeOrder.buyerConfirmation && (
            <div className="p-4 rounded-[16px] bg-[#e6ecd5] border border-[#1b6e53] flex items-center justify-between flex-wrap gap-3 text-xs font-mono text-[#1b6e53]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">task_alt</span>
                <div>
                  <strong>Order Receipt Confirmed by Buyer: </strong>
                  <span>{activeOrder.buyerConfirmation.confirmedAt} • {activeOrder.buyerConfirmation.confirmedQty} kg received</span>
                </div>
              </div>
              <span className="px-3 py-0.5 rounded-[100px] bg-[#ffffff] border border-[#1b6e53] text-[10px] font-bold">
                DELIVERY STATUS: CONFIRMED
              </span>
            </div>
          )}
        </section>
      )}

      {/* 6. BUYER PAYMENT CONFIRMATION SECTION (STRICTLY ACTIVE AFTER BUYER VERIFICATION) */}
      {isBuyerVerified && !hasDeliveryIssue && (
        <section className="rounded-[24px] bg-[#ffffff] border-2 border-[#1b6e53] p-6 lg:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center font-bold text-xl shrink-0">
                ₹
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#1b6e53] tracking-wider">
                  COMMERCIAL SETTLEMENT // BUYER ESCROW
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Payment Confirmation
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-3.5 py-1 rounded-[100px] font-mono text-xs font-bold uppercase tracking-wider ${
                  isPaymentConfirmed
                    ? 'bg-[#e6ecd5] text-[#1b6e53] border border-[#1b6e53]'
                    : 'bg-[#fceace] text-[#683600] border border-[#c3cda7]'
                }`}
              >
                Payment: {isPaymentConfirmed ? 'CONFIRMED' : 'PENDING CONFIRMATION'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
              <span className="text-[10px] text-[#6d6d6d] uppercase block">Order Reference</span>
              <strong className="text-base text-[#00372a] block">{activeOrder.orderId}</strong>
              <p className="text-[10px] text-[#6d6d6d] font-sans">Institutional Delivery</p>
            </div>

            <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
              <span className="text-[10px] text-[#6d6d6d] uppercase block">Produce Value</span>
              <strong className="text-xl text-[#00372a] block">₹{produceValue.toLocaleString()}</strong>
              <p className="text-[10px] text-[#6d6d6d] font-sans">{verifiedQty} kg Grade A Produce</p>
            </div>

            <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
              <span className="text-[10px] text-[#6d6d6d] uppercase block">Transportation Cost</span>
              <strong className="text-xl text-[#1b6e53] block">+ ₹{transportCost.toLocaleString()}</strong>
              <p className="text-[10px] text-[#1b6e53] font-sans">Recorded Transport</p>
            </div>

            <div className="p-4 rounded-[18px] bg-[#e6ecd5] border border-[#1b6e53] space-y-1">
              <span className="text-[10px] text-[#1b6e53] uppercase font-bold block">Delivered Order Total</span>
              <div className="text-2xl font-extrabold text-[#00372a]">
                ₹{agreedOrderValue.toLocaleString()}
              </div>
              <p className="text-[10px] text-[#1b6e53] font-sans">Produce + Transport Landed</p>
            </div>
          </div>

          {/* Action to confirm payment */}
          {!isPaymentConfirmed ? (
            <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
              <p className="text-xs text-[#6d6d6d] font-sans">
                Confirming payment will record the transaction in the FPO settlement ledger and mark the order as Completed.
              </p>
              <button
                type="button"
                onClick={() => setShowPaymentModal(true)}
                className="py-3 px-8 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer flex items-center gap-2 font-mono"
              >
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                <span>Confirm Payment (₹{agreedOrderValue.toLocaleString()})</span>
              </button>
            </div>
          ) : (
            <div className="p-5 rounded-[20px] bg-[#e6ecd5] border-2 border-[#1b6e53] space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-[#c3cda7]">
                <div className="flex items-center gap-2 text-[#1b6e53]">
                  <span className="material-symbols-outlined text-2xl">verified</span>
                  <h4 className="font-editorial text-xl font-bold">Order Completed</h4>
                </div>
                <span className="px-3 py-0.5 rounded-[100px] bg-[#1b6e53] text-[#ffffff] font-mono text-[10px] font-bold">
                  FULFILLED &amp; SETTLED
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="flex items-center gap-1.5 text-[#1b6e53] font-bold">
                  <span>✓ Order Received</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#1b6e53] font-bold">
                  <span>✓ Delivery Verified</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#1b6e53] font-bold">
                  <span>✓ Payment Confirmed</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#1b6e53] font-bold">
                  <span>✓ Settlement Recorded</span>
                </div>
              </div>

              <p className="text-[11px] font-mono text-[#6d6d6d] pt-1">
                Ref: {activeOrder.paymentDetails?.transactionRef || 'TXN-ESC-884102'} • Settled on {activeOrder.paymentDetails?.confirmedAt || 'Today'}
              </p>
            </div>
          )}
        </section>
      )}

      {/* 7. MULTI-ITEM ORDER TABLE */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-[#1b6e53]">inventory_2</span>
            <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
              Multi-Item Order Commodities &amp; Delivered Cost
            </h3>
          </div>
          <span className="text-xs font-mono text-[#6d6d6d]">
            3 Sourcing Lots • Multi-FPO Federation
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">Commodity</th>
                <th className="py-3 px-3">Supplier FPO</th>
                <th className="py-3 px-3 text-right">Ordered Qty</th>
                <th className="py-3 px-3 text-right">Delivered Qty</th>
                <th className="py-3 px-3 text-right">Produce Value</th>
                <th className="py-3 px-3 text-right">Transport</th>
                <th className="py-3 px-3 text-right">Delivered Total</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529] font-mono">
              {[
                {
                  crop: 'Tomato',
                  variety: 'Hybrid Roma',
                  grade: 'Grade A',
                  fpo: 'Godavari Farmers Producer Org',
                  orderedQty: 700,
                  deliveredQty: verifiedQty,
                  produceVal: '₹27,000',
                  transport: '₹1,500',
                  totalValue: '₹28,500',
                  status: currentStatus,
                },
                {
                  crop: 'Onion',
                  variety: 'Nasik Red',
                  grade: 'Grade A',
                  fpo: 'Delta Agro FPO',
                  orderedQty: 500,
                  deliveredQty: 500,
                  produceVal: '₹13,000',
                  transport: '₹1,200',
                  totalValue: '₹14,200',
                  status: isCompleted ? 'Completed' : 'Ready for Dispatch',
                },
                {
                  crop: 'Green Chilli',
                  variety: 'G4 Export',
                  grade: 'Grade A',
                  fpo: 'Green Valley FPO',
                  orderedQty: 200,
                  deliveredQty: 200,
                  produceVal: '₹8,800',
                  transport: '₹800',
                  totalValue: '₹9,600',
                  status: isCompleted ? 'Completed' : 'Ready for Dispatch',
                },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-[#faf9f0] transition">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-[#00372a] text-sm font-editorial block">{item.crop}</span>
                    <span className="text-[10px] text-[#6d6d6d]">{item.variety} • {item.grade}</span>
                  </td>
                  <td className="py-3.5 px-3 font-sans text-[#353535]">
                    {item.fpo}
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-[#353535]">
                    {item.orderedQty} kg
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-[#1b6e53]">
                    {item.deliveredQty} kg
                  </td>
                  <td className="py-3.5 px-3 text-right text-[#00372a] font-semibold">
                    {item.produceVal}
                  </td>
                  <td className="py-3.5 px-3 text-right text-[#1b6e53] font-semibold">
                    + {item.transport}
                  </td>
                  <td className="py-3.5 px-3 text-right font-extrabold text-[#00372a]">
                    {item.totalValue}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-3 py-0.5 rounded-[100px] text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'Completed'
                          ? 'bg-[#e6ecd5] text-[#1b6e53] border border-[#1b6e53]'
                          : item.status === 'Buyer Verified'
                          ? 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53]'
                          : 'bg-[#f1efdf] text-[#683600] border border-[#c3cda7]'
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

      {/* 8. INTERACTIVE DEMO SCENARIO TOOLBAR */}
      <section className="rounded-[20px] bg-[#f1efdf] border border-[#c3cda7] p-4.5 space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-[10px] font-mono font-bold uppercase text-[#1b6e53] tracking-widest flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">tune</span>
            TEST SCENARIOS &amp; QUICK STATE SWITCHER (STEP 6)
          </span>
          <span className="text-[10px] font-mono text-[#6d6d6d]">Instant demo state preview</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: 'dispatched', label: '1. Dispatched' },
            { id: 'in_transit', label: '2. In Transit' },
            { id: 'delivered', label: '3. Delivered' },
            { id: 'buyer_verified', label: '4. Buyer Verified' },
            { id: 'completed', label: '5. Payment Confirmed / Completed' },
            { id: 'issue', label: '6. Report Issue Exception' },
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

      {/* 9. MODAL: CONFIRM RECEIVED ORDER (VERIFY RECEIPT) */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border-2 border-[#1b6e53] rounded-[24px] max-w-lg w-full p-6 lg:p-7 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]">
              <div className="flex items-center gap-2 text-[#1b6e53]">
                <span className="material-symbols-outlined text-2xl">verified</span>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Confirm Received Order?
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowVerifyModal(false)}
                className="w-8 h-8 rounded-full bg-[#f1efdf] text-[#6d6d6d] hover:text-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#353535] font-sans">
              Please verify the quantity and grade before confirming receipt.
            </p>

            <div className="p-4 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7] space-y-2.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Order Ref:</span>
                <strong className="text-[#00372a]">{activeOrder.orderId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Delivered Quantity:</span>
                <strong className="text-[#1b6e53] text-sm">{verifiedQty} kg</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Required vs Delivered Grade:</span>
                <strong className="text-[#00372a]">{activeOrder.requiredGrade} ➔ {activeOrder.requiredGrade}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Supplier FPO:</span>
                <strong className="text-[#00372a]">Godavari Farmers Producer Org</strong>
              </div>
            </div>

            {/* Checkbox verification items */}
            <div className="space-y-2 font-mono text-xs">
              <label className="flex items-center gap-2.5 p-2.5 rounded-[12px] bg-[#faf9f0] border border-[#c3cda7] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isQtyCorrect}
                  onChange={(e) => setIsQtyCorrect(e.target.checked)}
                  className="w-4 h-4 text-[#1b6e53] accent-[#1b6e53] rounded"
                />
                <span className="text-[#00372a] font-semibold">Quantity Correct ({verifiedQty} kg received)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-[12px] bg-[#faf9f0] border border-[#c3cda7] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isGradeCorrect}
                  onChange={(e) => setIsGradeCorrect(e.target.checked)}
                  className="w-4 h-4 text-[#1b6e53] accent-[#1b6e53] rounded"
                />
                <span className="text-[#00372a] font-semibold">Grade Correct (Certified Grade A)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-[12px] bg-[#faf9f0] border border-[#c3cda7] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOrderReceived}
                  onChange={(e) => setIsOrderReceived(e.target.checked)}
                  className="w-4 h-4 text-[#1b6e53] accent-[#1b6e53] rounded"
                />
                <span className="text-[#00372a] font-semibold">Order Received at Dock</span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowVerifyModal(false)}
                className="flex-1 py-3 rounded-[100px] border border-[#c3cda7] text-xs font-semibold text-[#353535] bg-[#ffffff] hover:bg-[#f1efdf] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReceivedOrder}
                className="flex-1 py-3 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5 font-mono"
              >
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Confirm Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. MODAL: CONFIRM PAYMENT */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border-2 border-[#1b6e53] rounded-[24px] max-w-lg w-full p-6 lg:p-7 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]">
              <div className="flex items-center gap-2 text-[#1b6e53]">
                <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Confirm Payment?
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="w-8 h-8 rounded-full bg-[#f1efdf] text-[#6d6d6d] hover:text-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#353535] font-sans">
              Confirm that payment for this completed delivery should be recorded.
            </p>

            <div className="p-4 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7] space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Order:</span>
                <strong className="text-[#00372a]">{activeOrder.orderId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Verified Quantity:</span>
                <strong className="text-[#1b6e53] text-sm">{verifiedQty} kg</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Produce Value:</span>
                <strong className="text-[#00372a]">₹{produceValue.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Transportation:</span>
                <strong className="text-[#1b6e53]">+ ₹{transportCost.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#c3cda7]/60">
                <span className="text-[#00372a] font-bold">Total Delivered Cost:</span>
                <strong className="text-base font-extrabold text-[#1b6e53]">₹{agreedOrderValue.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#c3cda7]/40 text-[11px]">
                <span className="text-[#6d6d6d]">Recipient FPO:</span>
                <strong className="text-[#00372a]">Godavari Farmers Producer Org</strong>
              </div>
            </div>

            <p className="text-[11px] font-mono text-[#6d6d6d] bg-[#faf9f0] p-3 rounded-[12px] border border-[#c3cda7]/60">
              <strong className="text-[#00372a]">MVP Notice: </strong>
              This simulated payment confirmation records the completion in the FarmLink escrow ledger. No external bank transfer is initiated.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-3 rounded-[100px] border border-[#c3cda7] text-xs font-semibold text-[#353535] bg-[#ffffff] hover:bg-[#f1efdf] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmPaymentAction}
                className="flex-1 py-3 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5 font-mono"
              >
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Confirm Payment</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 11. MODAL: REPORT DELIVERY ISSUE */}
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
