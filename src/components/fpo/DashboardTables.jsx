import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { getStoredFpoOrders } from '../../data/fpoDashboardData'

export default function DashboardTables({ farmerActivity }) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    setOrders(getStoredFpoOrders())
  }, [])

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Table A: Active Orders */}
      <div className="rounded-[22px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden flex flex-col justify-between shadow-xs">
        <div>
          <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-2 py-0.5 rounded-full border border-[#c3cda7]">
                    BUYER FULFILLMENT
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#fceace] text-[#683600] text-[10px] font-bold uppercase tracking-wider">
                    {orders.length} Active Orders
                  </span>
                </div>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                  Active Orders
                </h3>
                <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                  Buyer requirements &amp; fulfillment stage tracker
                </p>
              </div>
            </div>

            <Link
              to="/fpo/orders"
              className="inline-flex items-center gap-1 text-xs text-[#1b6e53] font-bold bg-[#e6ecd5] hover:bg-[#c3cda7]/60 px-3 py-1.5 rounded-[100px] border border-[#c3cda7] transition shrink-0 self-start shadow-2xs"
            >
              <span>View All Orders</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[560px]">
              <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
                <tr>
                  <th className="py-3 px-4">Order Ref</th>
                  <th className="py-3 px-3">Buyer</th>
                  <th className="py-3 px-2">Commodities</th>
                  <th className="py-3 px-2 text-right">Volume</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
                {orders.map((order) => {
                  const itemsList = order.items || []
                  const totalVol = itemsList.reduce((acc, curr) => acc + (curr.quantityVal || 0), 0)
                  const isConfirmed = order.status === 'Confirmed'
                  const isPlanned = order.status === 'Fulfillment Planned'
                  const isStep6 = ['Dispatched', 'In Transit', 'Delivered', 'Buyer Verified', 'Payment Confirmed', 'Completed', 'Delivery Issue'].includes(order.status)

                  return (
                    <tr key={order.orderId} className="hover:bg-[#faf9f0] transition">
                      <td className="py-3 px-4 font-mono font-bold text-[#1b6e53] whitespace-nowrap">
                        {order.orderId}
                      </td>
                      <td className="py-3 px-3 font-semibold whitespace-nowrap text-[#00372a]">
                        {order.buyer}
                      </td>
                      <td className="py-3 px-2 text-[#353535] whitespace-nowrap font-mono text-[11px]">
                        {itemsList.map((i) => i.crop).join(', ')}
                      </td>
                      <td className="py-3 px-2 text-right font-bold text-[#1b6e53] whitespace-nowrap font-mono">
                        {totalVol > 0 ? `${totalVol.toLocaleString()} kg` : order.quantity || '1,000 kg'}
                      </td>
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-[100px] text-[10px] font-mono font-bold uppercase tracking-wider ${
                            order.status === 'Completed' || order.status === 'Payment Confirmed'
                              ? 'bg-[#1b6e53] text-[#ffffff] border border-[#1b6e53]'
                              : isStep6
                              ? 'bg-[#b2cee7] text-[#00372a] border border-[#00372a]/30'
                              : isPlanned
                              ? 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53]'
                              : isConfirmed
                              ? 'bg-rose-50 text-rose-700 border border-rose-300'
                              : order.statusStyle || 'bg-[#e6ecd5] text-[#1b6e53]'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <Link
                          to={isStep6 ? `/fpo/orders/${order.orderId}/tracking` : `/fpo/orders/${order.orderId}/fulfillment`}
                          className={`py-1 px-3 rounded-[100px] text-[11px] font-bold transition shadow-2xs inline-flex items-center gap-1 ${
                            isStep6 || isConfirmed
                              ? 'bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff]'
                              : 'bg-[#e6ecd5] hover:bg-[#d8ee6f] text-[#1b6e53] border border-[#c3cda7]'
                          }`}
                        >
                          <span>{isStep6 ? 'Track' : isConfirmed ? 'Plan Fulfillment' : 'View Plan'}</span>
                          <span className="material-symbols-outlined text-[13px]">
                            {isStep6 ? 'my_location' : isConfirmed ? 'alt_route' : 'arrow_forward'}
                          </span>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fulfillment Summary Callout */}
        <div className="p-3.5 bg-[#f1efdf] border-t border-[#c3cda7]/50 flex justify-between items-center text-xs text-[#6d6d6d] flex-wrap gap-2 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1b6e53] animate-pulse"></span>
            <span>Hub: <strong>Rajahmundry Central Hub</strong></span>
            <span>•</span>
            <span>Allocated: <strong>1,000 kg</strong></span>
            <span>•</span>
            <span>Farmers: <strong>4</strong></span>
          </div>
          <span className="font-semibold text-[#1b6e53] bg-[#e6ecd5] px-2 py-0.5 rounded-full border border-[#c3cda7]">
            Ready for Collection
          </span>
        </div>
      </div>

      {/* Table B: Farmer Activity */}
      <div className="rounded-[22px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden flex flex-col justify-between shadow-xs">
        <div>
          <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#e8fe85] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <span className="material-symbols-outlined text-[20px]">scale</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-2 py-0.5 rounded-full border border-[#c3cda7]">
                    CLUSTER ALLOCATION & INWARD LOTS
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1b6e53] text-[#ffffff] text-[10px] font-mono font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e8fe85] animate-pulse"></span>
                    Live Hub Feed
                  </span>
                </div>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                  Farmer Activity
                </h3>
                <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                  Cluster farmer allocation & inward gate collection status
                </p>
              </div>
            </div>

            <Link
              to="/fpo/farmers"
              className="inline-flex items-center gap-1 text-xs text-[#1b6e53] font-bold bg-[#e8fe85] hover:bg-[#d8ee6f] px-3.5 py-1.5 rounded-[100px] transition shrink-0 self-start shadow-sm"
            >
              <span>View All Farmers</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[520px]">
              <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50">
                <tr>
                  <th className="py-3 px-4">Farmer</th>
                  <th className="py-3 px-3">Hub</th>
                  <th className="py-3 px-2">Crop</th>
                  <th className="py-3 px-2 text-right">Allocated</th>
                  <th className="py-3 px-2 text-right">Collected</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
                {farmerActivity.map((farmer, idx) => (
                  <tr key={idx} className="hover:bg-[#faf9f0] transition">
                    <td className="py-3 px-4 font-semibold whitespace-nowrap">{farmer.name}</td>
                    <td className="py-3 px-3 text-[#353535] whitespace-nowrap font-mono text-[11px]">
                      {farmer.hub}
                    </td>
                    <td className="py-3 px-2 text-[#353535] whitespace-nowrap">{farmer.crop}</td>
                    <td className="py-3 px-2 text-right font-medium whitespace-nowrap font-mono">
                      {farmer.allocated}
                    </td>
                    <td className="py-3 px-2 text-right font-bold text-[#1b6e53] whitespace-nowrap font-mono">
                      {farmer.collected}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded-[100px] text-[10px] font-semibold ${farmer.statusStyle}`}>
                        {farmer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 bg-[#f1efdf] border-t border-[#c3cda7]/50 flex justify-between items-center text-xs text-[#6d6d6d] flex-wrap gap-2">
          <span>Automatic SMS dispatched in Marathi & Hindi</span>
          <span className="font-semibold text-[#1b6e53]">Gate weighment speed: 1.8 min/slip</span>
        </div>
      </div>
    </section>
  )
}
