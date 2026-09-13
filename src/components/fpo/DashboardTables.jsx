import React from 'react'
import { Link } from 'react-router'

export default function DashboardTables({ buyerOrders, farmerActivity }) {
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
                    5 Active Orders
                  </span>
                </div>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                  Active Orders
                </h3>
                <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                  Buyer requirements & stage fulfillment tracker
                </p>
              </div>
            </div>

            <Link
              to="/fpo/buyers"
              className="inline-flex items-center gap-1 text-xs text-[#1b6e53] font-bold bg-[#e6ecd5] hover:bg-[#c3cda7]/60 px-3 py-1.5 rounded-[100px] border border-[#c3cda7] transition shrink-0 self-start"
            >
              <span>View All Orders</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[560px]">
              <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50">
                <tr>
                  <th className="py-3 px-4">Buyer</th>
                  <th className="py-3 px-2">Crop</th>
                  <th className="py-3 px-2 text-right">Quantity</th>
                  <th className="py-3 px-3">Order ID</th>
                  <th className="py-3 px-3">Fulfillment Stage</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
                {buyerOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-[#faf9f0] transition">
                    <td className="py-3 px-4 font-semibold whitespace-nowrap">{order.buyer}</td>
                    <td className="py-3 px-2 text-[#353535] whitespace-nowrap">{order.crop}</td>
                    <td className="py-3 px-2 text-right font-bold text-[#1b6e53] whitespace-nowrap font-mono">
                      {order.quantity}
                    </td>
                    <td className="py-3 px-3 font-mono text-[#6d6d6d] text-[11px] whitespace-nowrap">
                      {order.orderId}
                    </td>
                    <td className="py-3 px-3 font-medium text-[#212529] whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 bg-[#f1efdf] px-2 py-0.5 rounded-md border border-[#c3cda7]/40 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53]"></span>
                        {order.fulfillmentStage}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded-[100px] text-[10px] font-semibold ${order.statusStyle}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 bg-[#f1efdf] border-t border-[#c3cda7]/50 flex justify-between items-center text-xs text-[#6d6d6d] flex-wrap gap-2">
          <span>Active Dispatch Bays: Hub A, B & C</span>
          <span className="font-semibold text-[#1b6e53]">Total Active Volume: 3,200 kg</span>
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
