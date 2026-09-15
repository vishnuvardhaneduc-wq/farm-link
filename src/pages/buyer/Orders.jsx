import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import {
  getStoredHubOperations,
  buyerAcceptPartialQuantity,
  buyerRequestFullQuantity,
  buyerRejectPartialFulfillment,
  calculateHubKPIs,
} from '../../data/hubOperationsData'

export default function BuyerOrders() {
  const [hubState, setHubState] = useState(getStoredHubOperations())
  const [toastMsg, setToastMsg] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    const handleStorage = () => setHubState(getStoredHubOperations())
    window.addEventListener('storage', handleStorage)
    setHubState(getStoredHubOperations())
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const kpis = calculateHubKPIs(hubState)
  const activeHubOrder = hubState.activeOrder
  const shortfallState = activeHubOrder?.shortfallState || {}
  const isBuyerReviewRequired = activeHubOrder.status === 'Buyer Review Required'
  const isPartialApproved = activeHubOrder.status === 'Ready for Partial Dispatch' || shortfallState.buyerDecision === 'Accepted'
  const isAdditionalRequested = activeHubOrder.status === 'Additional Supply Required' || shortfallState.buyerDecision === 'FullQuantityRequested'
  const isPartialRejected = activeHubOrder.status === 'Partial Fulfillment Rejected' || shortfallState.buyerDecision === 'Rejected'
  const isPartiallyDispatched = activeHubOrder.status === 'Partially Dispatched'
  const isDispatched = activeHubOrder.status === 'Dispatched'
  const isInTransit = activeHubOrder.status === 'In Transit'
  const isDelivered = activeHubOrder.status === 'Delivered'
  const isBuyerVerified = activeHubOrder.status === 'Buyer Verified' || activeHubOrder.status === 'Ready for Settlement'
  const isPaymentConfirmed = activeHubOrder.status === 'Payment Confirmed'
  const isCompleted = activeHubOrder.status === 'Completed'
  const isDeliveryIssue = activeHubOrder.status === 'Delivery Issue'

  const handleAcceptPartial = () => {
    buyerAcceptPartialQuantity(activeHubOrder.orderId)
    setHubState(getStoredHubOperations())
    setToastMsg(`Partial consignment of ${kpis.totalAccepted} kg accepted. Hub authorized to create partial dispatch.`)
    setTimeout(() => setToastMsg(''), 4500)
  }

  const handleRequestFull = () => {
    buyerRequestFullQuantity(activeHubOrder.orderId)
    setHubState(getStoredHubOperations())
    setToastMsg(`Requested full ${kpis.requiredTarget} kg. FPO notified to source additional quota.`)
    setTimeout(() => setToastMsg(''), 4500)
  }

  const handleRejectPartial = () => {
    buyerRejectPartialFulfillment(activeHubOrder.orderId)
    setHubState(getStoredHubOperations())
    setToastMsg(`Partial fulfillment declined. FPO notified for order recovery.`)
    setTimeout(() => setToastMsg(''), 4500)
  }

  // Dynamic status styling
  let hubOrderStatus = activeHubOrder.status
  let hubOrderStage = 'Quality Assay & Aggregation Active'
  let hubStatusStyle = 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]'

  if (isCompleted) {
    hubOrderStatus = 'Completed'
    hubOrderStage = 'Order Fulfilled & Payment Confirmed'
    hubStatusStyle = 'bg-[#e6ecd5] text-[#1b6e53] border border-[#1b6e53] font-bold'
  } else if (isPaymentConfirmed) {
    hubOrderStatus = 'Payment Confirmed'
    hubOrderStage = 'Payment Recorded — Order Completed'
    hubStatusStyle = 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53] font-bold'
  } else if (isBuyerVerified) {
    hubOrderStatus = 'Buyer Verified'
    hubOrderStage = 'Delivery Verified — Ready for Payment Confirmation'
    hubStatusStyle = 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53] font-bold'
  } else if (isDeliveryIssue) {
    hubOrderStatus = 'Delivery Issue'
    hubOrderStage = `Discrepancy Logged: ${activeHubOrder.deliveryIssue?.issueType || 'Under Review'}`
    hubStatusStyle = 'bg-rose-50 text-rose-800 border border-rose-300 font-bold'
  } else if (isDelivered) {
    hubOrderStatus = 'Delivered'
    hubOrderStage = `Delivered at ${activeHubOrder.destination} — Verify Receipt`
    hubStatusStyle = 'bg-[#b2cee7] text-[#00372a] border border-[#00372a]/30 font-bold'
  } else if (isInTransit) {
    hubOrderStatus = 'In Transit'
    hubOrderStage = `In Transit via Reefer ${activeHubOrder.dispatchDetails?.vehicleNo || 'AP-39-TX-8841'}`
    hubStatusStyle = 'bg-[#fceace] text-[#683600] border border-[#683600]/40 font-bold'
  } else if (isDispatched || isPartiallyDispatched) {
    hubOrderStatus = isPartiallyDispatched ? 'Partially Dispatched' : 'Dispatched'
    hubOrderStage = `Dispatched from ${activeHubOrder.hubName}`
    hubStatusStyle = 'bg-[#b2cee7] text-[#00372a] border border-[#00372a]/30 font-bold'
  } else if (isBuyerReviewRequired) {
    hubOrderStatus = 'Buyer Review Required'
    hubOrderStage = `Partial fulfillment review (${kpis.totalAccepted} kg available; ${kpis.shortfall} kg shortfall)`
    hubStatusStyle = 'bg-[#fceace] text-[#683600] border border-[#683600]/40 font-bold'
  }

  const baseOrders = [
    {
      id: 'ORD-1031',
      fpo: 'Godavari Farmers Producer Org',
      hub: activeHubOrder.hubName,
      crop: `${activeHubOrder.crop} (${activeHubOrder.requiredGrade})`,
      quantity: `${activeHubOrder.hubAllocatedQty.toLocaleString()} kg`,
      rate: '₹30 / kg',
      totalValue: isCompleted || isBuyerVerified ? `₹${((kpis.totalAccepted || 700) * 30).toLocaleString()}` : '₹21,000',
      dispatchDate: activeHubOrder.deliveryDate,
      deliveryStage: hubOrderStage,
      status: hubOrderStatus,
      statusStyle: hubStatusStyle,
      isPrimary: true,
      isCompletedOrder: isCompleted,
    },
    {
      id: 'ORD-8821',
      fpo: 'Godavari Farmers FPO',
      hub: 'Rajahmundry Central Hub',
      crop: 'Tomato Grade A',
      quantity: '1,000 kg',
      rate: '₹28 / kg',
      totalValue: '₹28,000',
      dispatchDate: '2026-09-15',
      deliveryStage: 'Transit to Hub Bay 2',
      status: 'In Transit',
      statusStyle: 'bg-[#fceace] text-[#683600]',
      isCompletedOrder: false,
    },
    {
      id: 'ORD-8819',
      fpo: 'Delta Agro FPO',
      hub: 'Mandapeta Agro Dock',
      crop: 'Banana (Grand Naine G9)',
      quantity: '2,500 kg',
      rate: '₹18 / kg',
      totalValue: '₹45,000',
      dispatchDate: '2026-09-14',
      deliveryStage: 'Loaded on Reefer #AP-31-TR-9021',
      status: 'In Transit',
      statusStyle: 'bg-[#fceace] text-[#683600]',
      isCompletedOrder: false,
    },
    {
      id: 'ORD-8794',
      fpo: 'Green Valley FPO',
      hub: 'Tadepalligudem Horti Hub',
      crop: 'Green Chilli G4 Export',
      quantity: '500 kg',
      rate: '₹44 / kg',
      totalValue: '₹22,000',
      dispatchDate: '2026-09-12',
      deliveryStage: 'Unloaded & QA Passed',
      status: 'Completed',
      statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] font-bold border border-[#1b6e53]',
      isCompletedOrder: true,
    },
  ]

  const activeOrdersList = baseOrders.filter((o) => !o.isCompletedOrder)
  const completedOrdersList = baseOrders.filter((o) => o.isCompletedOrder)

  const displayedOrders =
    activeTab === 'active'
      ? activeOrdersList
      : activeTab === 'completed'
      ? completedOrdersList
      : baseOrders

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-block mb-1.5">
            FULFILLMENT &amp; LOGISTICS // BUYER CONTRACTS
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Orders &amp; <span className="italic font-normal">Executed Sourcing Shipments</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Track dispatches, verify received dock shipments, confirm payments, and view completed orders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/buyer/orders/ORD-1031"
            className="py-2 px-4 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold font-mono transition shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            <span>Track Live Order ORD-1031</span>
          </Link>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="p-3.5 bg-[#e8fe85] border border-[#1b6e53] text-[#1b6e53] text-xs font-bold rounded-[18px] flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      {/* PARTIAL FULFILLMENT BUYER DECISION BANNER (IF REVIEW REQUIRED) */}
      {isBuyerReviewRequired && (
        <section className="p-6 rounded-[24px] bg-[#ffffff] border-2 border-[#683600] shadow-md space-y-4 animate-in fade-in">
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#c3cda7]/50">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-[14px] bg-[#fceace] text-[#683600] flex items-center justify-center font-bold text-xl shrink-0">
                ⚠️
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#683600] uppercase font-bold tracking-wider">
                  ACTION REQUIRED // ORDER {activeHubOrder.orderId}
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Partial Fulfillment Available
                </h2>
                <p className="text-xs text-[#353535] mt-0.5 font-sans">
                  Your order requested <strong>{kpis.requiredTarget} kg</strong> of {activeHubOrder.crop}. The FPO can currently fulfill <strong>{kpis.totalAccepted} kg</strong> (Shortfall: <strong>{kpis.shortfall} kg</strong>).
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-[100px] bg-[#fceace] text-[#683600] font-mono text-xs font-bold border border-[#c3cda7]">
              Decision Required
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7] space-y-0.5">
              <span className="text-[#6d6d6d] block text-[10px] uppercase">Ordered Quantity</span>
              <strong className="text-base text-[#00372a]">{kpis.requiredTarget} kg</strong>
            </div>

            <div className="p-3.5 rounded-[16px] bg-[#e6ecd5] border border-[#c3cda7] space-y-0.5">
              <span className="text-[#1b6e53] block text-[10px] uppercase">Available (Accepted)</span>
              <strong className="text-base text-[#1b6e53]">{kpis.totalAccepted} kg</strong>
            </div>

            <div className="p-3.5 rounded-[16px] bg-[#fceace] border border-[#c3cda7] space-y-0.5">
              <span className="text-[#683600] block text-[10px] uppercase">Shortfall</span>
              <strong className="text-base text-[#683600]">{kpis.shortfall} kg</strong>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleAcceptPartial}
              className="w-full sm:flex-1 py-3 px-5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Accept {kpis.totalAccepted} kg</span>
            </button>

            <button
              type="button"
              onClick={handleRequestFull}
              className="w-full sm:flex-1 py-3 px-5 rounded-[100px] bg-[#ffffff] hover:bg-[#f1efdf] text-[#353535] border border-[#c3cda7] text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">production_quantity_limits</span>
              <span>Request Full Quantity</span>
            </button>

            <button
              type="button"
              onClick={handleRejectPartial}
              className="w-full sm:w-auto py-3 px-5 rounded-[100px] bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">cancel</span>
              <span>Reject Partial Fulfillment</span>
            </button>
          </div>
        </section>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: `All Orders (${baseOrders.length})` },
          { id: 'active', label: `Active Orders (${activeOrdersList.length})` },
          { id: 'completed', label: `Completed Orders (${completedOrdersList.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-[100px] text-xs font-mono transition whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#1b6e53] text-[#ffffff] font-bold shadow-xs'
                : 'bg-[#ffffff] text-[#353535] hover:bg-[#f1efdf] border border-[#c3cda7]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                {activeTab === 'completed' ? 'Completed Orders' : 'Sourcing Shipments & Orders'}
              </h3>
              <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                Click on any order to view real-time delivery milestones, dock verification, and payment status.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-3">FPO &amp; Collection Hub</th>
                <th className="py-3 px-3">Commodity</th>
                <th className="py-3 px-3 text-right">Quantity</th>
                <th className="py-3 px-3 text-right">Contract Value</th>
                <th className="py-3 px-3">Delivery Milestone</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              {displayedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#faf9f0] transition font-sans">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#1b6e53] whitespace-nowrap">
                    <Link to={`/buyer/orders/${order.id}`} className="hover:underline">
                      {order.id}
                    </Link>
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="font-bold text-[#212529] block font-editorial text-base">{order.fpo}</span>
                    <span className="text-[10px] font-mono text-[#6d6d6d]">{order.hub}</span>
                  </td>
                  <td className="py-3.5 px-3 text-[#212529] font-medium whitespace-nowrap">
                    {order.crop}
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-[#1b6e53] font-mono whitespace-nowrap">
                    {order.quantity}
                  </td>
                  <td className="py-3.5 px-3 text-right font-extrabold text-[#683600] font-mono text-sm whitespace-nowrap">
                    {order.totalValue}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1.5 bg-[#f1efdf] px-2.5 py-1 rounded-md border border-[#c3cda7]/50 font-mono text-[11px] text-[#00372a]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53]"></span>
                      <span>{order.deliveryStage}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <span className={`inline-block px-3 py-1 rounded-[100px] text-[10px] font-mono font-bold uppercase ${order.statusStyle}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <Link
                      to={`/buyer/orders/${order.id}`}
                      className="py-1.5 px-3.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1 font-mono"
                    >
                      <span>{order.status === 'Completed' ? 'View Details' : 'Track Order'}</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
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
