import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { getStoredFpoOrders } from '../../data/fpoDashboardData'

export default function FPOOrders() {
  const [orders, setOrders] = useState([])
  const [filterStage, setFilterStage] = useState('all')

  useEffect(() => {
    setOrders(getStoredFpoOrders())
  }, [])

  const filteredOrders = orders.filter((order) => {
    if (filterStage === 'confirmed') {
      return order.status === 'Confirmed'
    }
    if (filterStage === 'planned') {
      return order.status === 'Fulfillment Planned' || order.fulfillmentStage === 'Fulfillment Planned'
    }
    if (filterStage === 'in-transit') {
      return order.fulfillmentStage === 'Delivery' || order.status === 'Dispatched'
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
            Track confirmed institutional buyer orders, plan hub and farmer allocations, and monitor dispatch stages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#ffffff] px-4 py-2 rounded-[100px] border border-[#c3cda7] shadow-2xs">
            {orders.length} Executed Contracts Active
          </span>
        </div>
      </div>

      {/* 2. Filter Pills Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-[#c3cda7]/40">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'confirmed', label: 'Confirmed (Needs Planning)' },
            { id: 'planned', label: 'Fulfillment Planned' },
            { id: 'in-transit', label: 'In Transit / Dispatched' }
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

      {/* 3. Orders Table */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                Confirmed Buyer Orders
              </h3>
              <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                Stage progression: Confirmed → Fulfillment Planning → Fulfillment Planned → Collection → Quality → Delivery → Completed
              </p>
            </div>
          </div>

          <span className="text-xs font-mono text-[#6d6d6d]">
            Showing {filteredOrders.length} of {orders.length} Orders
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-3">Buyer &amp; Destination</th>
                <th className="py-3 px-3">Commodities &amp; Volumes</th>
                <th className="py-3 px-3">Delivery Date</th>
                <th className="py-3 px-3">Gross Value</th>
                <th className="py-3 px-3 text-center">Fulfillment Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              {filteredOrders.map((order) => {
                const itemsList = order.items || []
                const itemsNames = itemsList.map((i) => i.crop).join(' • ')
                const totalVol = itemsList.reduce((acc, curr) => acc + (curr.quantityVal || 0), 0)
                const isConfirmed = order.status === 'Confirmed'
                const isPlanned = order.status === 'Fulfillment Planned'

                return (
                  <tr key={order.orderId} className="hover:bg-[#faf9f0] transition">
                    <td className="py-4 px-4 font-mono font-bold text-[#1b6e53] whitespace-nowrap">
                      {order.orderId}
                    </td>

                    <td className="py-4 px-3">
                      <div className="space-y-0.5">
                        <span className="font-bold text-[#00372a] block font-editorial text-base leading-tight">
                          {order.buyer}
                        </span>
                        <span className="text-[10px] font-mono text-[#6d6d6d] block">
                          📍 {order.deliveryLocation}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-3">
                      <div className="space-y-1">
                        <span className="font-bold text-[#212529] block font-mono text-[11px]">
                          {itemsList.length} {itemsList.length === 1 ? 'Item' : 'Items'}: {itemsNames}
                        </span>
                        <div className="flex flex-col gap-1 pt-0.5">
                          {itemsList.map((item, idx) => (
                            <div key={idx} className="text-[11px] font-mono text-[#353535] flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53]"></span>
                              <span>{item.crop}</span>
                              <span className="text-[#1b6e53] font-bold">({item.quantity} • {item.grade})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-3 font-mono text-[#353535] whitespace-nowrap">
                      {order.deliveryDate}
                    </td>

                    <td className="py-4 px-3 font-mono font-extrabold text-[#683600] text-sm whitespace-nowrap">
                      {order.totalValue}
                    </td>

                    <td className="py-4 px-3 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 rounded-[100px] text-[10px] font-mono font-bold uppercase tracking-wider ${
                          isPlanned
                            ? 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53]'
                            : isConfirmed
                            ? 'bg-rose-50 text-rose-700 border border-rose-300'
                            : order.statusStyle || 'bg-[#e6ecd5] text-[#1b6e53]'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <Link
                        to={`/fpo/orders/${order.orderId}/fulfillment`}
                        className={`py-1.5 px-4 rounded-[100px] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1.5 cursor-pointer ${
                          isConfirmed
                            ? 'bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff]'
                            : 'bg-[#e6ecd5] hover:bg-[#c3cda7]/60 text-[#1b6e53] border border-[#c3cda7]'
                        }`}
                      >
                        <span>{isConfirmed ? 'Plan Fulfillment' : 'View Plan'}</span>
                        <span className="material-symbols-outlined text-[14px]">
                          {isConfirmed ? 'alt_route' : 'arrow_forward'}
                        </span>
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
