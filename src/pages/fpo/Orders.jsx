import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { getStoredFpoOrders } from '../../data/fpoDashboardData'
import {
  getStoredHubOperations,
  fpoNotifyBuyerOfShortfall,
} from '../../data/hubOperationsData'

export default function FPOOrders() {
  const [orders, setOrders] = useState([])
  const [hubState, setHubState] = useState(getStoredHubOperations())
  const [filterStage, setFilterStage] = useState('all')
  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    setOrders(getStoredFpoOrders())
    setHubState(getStoredHubOperations())
    const handleStorage = () => {
      setOrders(getStoredFpoOrders())
      setHubState(getStoredHubOperations())
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const activeHubOrder = hubState.activeOrder
  const shortfallState = activeHubOrder?.shortfallState || {}

  const handleNotifyBuyer = (orderId) => {
    fpoNotifyBuyerOfShortfall(orderId)
    setHubState(getStoredHubOperations())
    setToastMsg(`Partial fulfillment notification transmitted to ${activeHubOrder.buyer}. Awaiting buyer decision.`)
    setTimeout(() => setToastMsg(''), 4500)
  }

  const getOrderStatus = (order) => {
    if (order.orderId === activeHubOrder?.orderId) {
      return activeHubOrder.status || order.status
    }
    return order.status
  }

  const filteredOrders = orders.filter((order) => {
    const status = getOrderStatus(order)
    if (filterStage === 'confirmed') {
      return status === 'Confirmed'
    }
    if (filterStage === 'planned') {
      return status === 'Fulfillment Planned' || order.fulfillmentStage === 'Fulfillment Planned'
    }
    if (filterStage === 'in-transit') {
      return ['Dispatched', 'Partially Dispatched', 'In Transit', 'Delivered', 'Delivery Issue'].includes(status)
    }
    if (filterStage === 'completed') {
      return ['Completed', 'Buyer Verified', 'Payment Confirmed'].includes(status)
    }
    return true
  })

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-block mb-1.5">
            FPO PROCUREMENT CONTRACTS // ACTIVE ORDERS
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Active Orders &amp; <span className="italic font-normal">Fulfillment Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Track confirmed institutional buyer orders, plan hub allocations, and manage delivery and settlements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#ffffff] px-4 py-2 rounded-[100px] border border-[#c3cda7] shadow-2xs">
            {orders.length} Executed Contracts Active
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

      {/* 2. Shortfall Review Alert Banner if Buyer Review is Required */}
      {activeHubOrder.status === 'Buyer Review Required' && (
        <section className="p-5 rounded-[24px] bg-[#fceace] border-2 border-[#683600]/30 shadow-xs space-y-3 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#c3cda7]/60">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-2xl text-[#683600]">warning</span>
              <div>
                <h3 className="font-editorial text-xl font-bold text-[#683600]">
                  Hub Produce Shortfall: {activeHubOrder.orderId}
                </h3>
                <span className="text-[11px] font-mono text-[#353535]">
                  Buyer Review Required before hub dispatch can proceed
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleNotifyBuyer(activeHubOrder.orderId)}
              className="py-2 px-5 rounded-[100px] bg-[#683600] hover:bg-[#4a2700] text-[#ffffff] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0 font-mono"
            >
              <span className="material-symbols-outlined text-[16px]">forward_to_inbox</span>
              <span>Notify Buyer ({activeHubOrder.buyer})</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div>
              <span className="text-[#6d6d6d] block text-[9px]">Product:</span>
              <strong className="text-[#00372a]">{activeHubOrder.crop} ({activeHubOrder.requiredGrade})</strong>
            </div>
            <div>
              <span className="text-[#6d6d6d] block text-[9px]">Ordered Quantity:</span>
              <strong className="text-[#00372a]">{shortfallState.orderedQty} kg</strong>
            </div>
            <div>
              <span className="text-[#6d6d6d] block text-[9px]">Accepted Available:</span>
              <strong className="text-[#1b6e53] font-extrabold">{shortfallState.acceptedQty} kg</strong>
            </div>
            <div>
              <span className="text-[#6d6d6d] block text-[9px]">Harvest Shortfall:</span>
              <strong className="text-[#683600] font-extrabold">{shortfallState.shortfallQty} kg</strong>
            </div>
          </div>
        </section>
      )}

      {/* 3. Filter Pills Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-[#c3cda7]/40">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'confirmed', label: 'Confirmed (Needs Planning)' },
            { id: 'planned', label: 'Fulfillment Planned' },
            { id: 'in-transit', label: 'In Transit / Dispatched' },
            { id: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStage(tab.id)}
              className={`px-4 py-2 rounded-[100px] text-xs font-mono transition whitespace-nowrap cursor-pointer ${
                filterStage === tab.id
                  ? 'bg-[#1b6e53] text-[#ffffff] font-bold shadow-xs'
                  : 'bg-[#ffffff] text-[#353535] hover:bg-[#f1efdf] border border-[#c3cda7]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Orders Table */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                Confirmed Buyer Orders
              </h3>
              <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                Stage progression: Confirmed → Fulfillment Planned → Hub Collection → Aggregation → Dispatch → Completed
              </p>
            </div>
          </div>

          <span className="text-xs font-mono text-[#6d6d6d]">
            Showing {filteredOrders.length} of {orders.length} Orders
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-3.5 whitespace-nowrap">Order Ref</th>
                <th className="py-3 px-3">Buyer &amp; Destination</th>
                <th className="py-3 px-3">Items &amp; Volumes</th>
                <th className="py-3 px-3 whitespace-nowrap">Delivery Date</th>
                <th className="py-3 px-3 whitespace-nowrap">Gross Value</th>
                <th className="py-3 px-3 text-center whitespace-nowrap">Fulfillment Status</th>
                <th className="py-3 px-3.5 text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              {filteredOrders.map((order) => {
                const itemsList = order.items || []
                const currentStatus = getOrderStatus(order)
                const isConfirmed = currentStatus === 'Confirmed'
                const isPlanned = currentStatus === 'Fulfillment Planned'
                const isCompleted = ['Completed', 'Buyer Verified', 'Payment Confirmed'].includes(currentStatus)
                const isDispatched = ['Dispatched', 'Partially Dispatched', 'In Transit', 'Delivered', 'Delivery Issue'].includes(currentStatus)
                const isShortfallReview = currentStatus === 'Buyer Review Required'

                return (
                  <tr key={order.orderId} className="hover:bg-[#faf9f0] transition">
                    {/* 1. Order Ref */}
                    <td className="py-3.5 px-3.5 font-mono font-bold text-[#1b6e53] whitespace-nowrap align-middle">
                      {order.orderId}
                    </td>

                    {/* 2. Buyer & Destination */}
                    <td className="py-3.5 px-3 align-middle max-w-[200px]">
                      <div className="space-y-0.5">
                        <span className="font-bold text-[#00372a] block font-editorial text-sm leading-tight">
                          {order.buyer}
                        </span>
                        <span className="text-[10px] font-mono text-[#6d6d6d] block truncate" title={order.deliveryLocation}>
                          📍 {order.deliveryLocation}
                        </span>
                      </div>
                    </td>

                    {/* 3. Items & Volumes */}
                    <td className="py-3.5 px-3 align-middle max-w-[220px]">
                      <div className="space-y-1">
                        {itemsList.map((item, idx) => (
                          <div key={idx} className="text-[11px] font-mono text-[#353535] flex items-center gap-1.5 flex-wrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] shrink-0"></span>
                            <span className="font-semibold text-[#00372a]">{item.crop}</span>
                            <span className="text-[#1b6e53] font-bold">({item.quantity} • {item.grade})</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* 4. Delivery Date */}
                    <td className="py-3.5 px-3 font-mono text-[#353535] whitespace-nowrap align-middle">
                      {order.deliveryDate}
                    </td>

                    {/* 5. Gross Value */}
                    <td className="py-3.5 px-3 font-mono font-extrabold text-[#683600] text-xs whitespace-nowrap align-middle">
                      {order.totalValue}
                    </td>

                    {/* 6. Fulfillment Status Badge */}
                    <td className="py-3.5 px-3 text-center whitespace-nowrap align-middle">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-[100px] text-[10px] font-mono font-bold uppercase tracking-wider ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : isDispatched
                            ? 'bg-[#b2cee7] text-[#00372a] border border-[#00372a]/30'
                            : isShortfallReview
                            ? 'bg-[#fceace] text-[#683600] border border-[#683600]/40'
                            : currentStatus === 'Ready for Partial Dispatch' || currentStatus === 'Ready for Dispatch'
                            ? 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53]'
                            : isPlanned
                            ? 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53]'
                            : isConfirmed
                            ? 'bg-rose-50 text-rose-700 border border-rose-300'
                            : order.statusStyle || 'bg-[#e6ecd5] text-[#1b6e53]'
                        }`}
                      >
                        {currentStatus === 'Ready for Partial Dispatch'
                          ? 'Buyer Approved Partial'
                          : currentStatus}
                      </span>
                    </td>

                    {/* 7. Action Buttons (Strictly per status & using order.orderId) */}
                    <td className="py-3.5 px-3.5 text-right whitespace-nowrap align-middle">
                      {/* Case A: Completed Status -> Hub Ops + Track + Ledger */}
                      {isCompleted ? (
                        <div className="flex items-center justify-end gap-1.5 flex-nowrap">
                          <Link
                            to={`/fpo/orders/${order.orderId}/fulfillment`}
                            className="py-1 px-2.5 rounded-[100px] bg-[#f1efdf] hover:bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7] text-[11px] font-bold transition inline-flex items-center gap-1 font-mono shadow-2xs"
                            title="View Hub & Allocation Plan"
                          >
                            <span>Hub Ops</span>
                            <span className="material-symbols-outlined text-[13px]">warehouse</span>
                          </Link>
                          <Link
                            to={`/fpo/orders/${order.orderId}/tracking`}
                            className="py-1 px-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-[11px] font-bold transition shadow-2xs inline-flex items-center gap-1 font-mono"
                            title="Track Fulfillment Stages"
                          >
                            <span className="material-symbols-outlined text-[13px]">my_location</span>
                            <span>Track</span>
                          </Link>
                          <Link
                            to={`/fpo/settlements/${order.orderId}`}
                            className="py-1 px-2.5 rounded-[100px] bg-[#e6ecd5] hover:bg-[#c3cda7]/60 text-[#1b6e53] border border-[#c3cda7] text-[11px] font-bold transition inline-flex items-center gap-1 font-mono shadow-2xs"
                            title="View Settlement & Payout Ledger"
                          >
                            <span className="material-symbols-outlined text-[13px]">receipt_long</span>
                            <span>Ledger</span>
                          </Link>
                        </div>
                      ) : isDispatched ? (
                        /* Case B: Dispatched / In Transit / Delivered -> Track */
                        <Link
                          to={`/fpo/orders/${order.orderId}/tracking`}
                          className="py-1 px-3 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1 font-mono"
                        >
                          <span className="material-symbols-outlined text-[14px]">my_location</span>
                          <span>Track</span>
                        </Link>
                      ) : isShortfallReview ? (
                        /* Case C: Shortfall Buyer Review Required -> Notify Buyer + View Plan */
                        <div className="flex items-center justify-end gap-1.5 flex-nowrap">
                          <button
                            type="button"
                            onClick={() => handleNotifyBuyer(order.orderId)}
                            className="py-1 px-2.5 rounded-[100px] bg-[#683600] hover:bg-[#4a2700] text-[#ffffff] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1 font-mono cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[13px]">forward_to_inbox</span>
                            <span>Notify Buyer</span>
                          </button>
                          <Link
                            to={`/fpo/orders/${order.orderId}/fulfillment`}
                            className="py-1 px-2.5 rounded-[100px] bg-[#e6ecd5] hover:bg-[#c3cda7]/60 text-[#1b6e53] border border-[#c3cda7] text-xs font-bold transition inline-flex items-center gap-1 font-mono"
                          >
                            <span>View Plan</span>
                          </Link>
                        </div>
                      ) : isPlanned ? (
                        /* Case D: Fulfillment Planned -> View Plan */
                        <Link
                          to={`/fpo/orders/${order.orderId}/fulfillment`}
                          className="py-1 px-3.5 rounded-[100px] bg-[#e6ecd5] hover:bg-[#c3cda7]/60 text-[#1b6e53] border border-[#c3cda7] text-xs font-bold transition inline-flex items-center gap-1 font-mono shadow-2xs"
                        >
                          <span>View Plan</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </Link>
                      ) : (
                        /* Case E: Confirmed / Default -> Plan Fulfillment */
                        <Link
                          to={`/fpo/orders/${order.orderId}/fulfillment`}
                          className="py-1 px-3.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1 font-mono"
                        >
                          <span>Plan Fulfillment</span>
                          <span className="material-symbols-outlined text-[14px]">alt_route</span>
                        </Link>
                      )}
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
