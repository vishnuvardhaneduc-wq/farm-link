import React from 'react'
import { Link } from 'react-router'

export default function Orders() {
  const mockOrders = [
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
      statusStyle: 'bg-[#fceace] text-[#683600]'
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
      statusStyle: 'bg-[#fceace] text-[#683600]'
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
      status: 'Fulfilled',
      statusStyle: 'bg-[#e6ecd5] text-[#1b6e53]'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-block mb-1.5">
            FULFILLMENT &amp; LOGISTICS // CONTRACTS
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Orders &amp; <span className="italic font-normal">Executed Contracts</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Track dispatches, hub weighing receipts, and Jan Dhan escrow settlements.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[100px] bg-[#ffffff] border border-[#c3cda7] text-xs font-mono text-[#00372a]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] animate-pulse"></span>
          <span>3 Active Contracts En Route</span>
        </div>
      </div>

      {/* Orders Table matching DashboardTables */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                Active Sourcing Shipments
              </h3>
              <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                Real-time dispatch manifests and digital weighbridge receipts
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-3">FPO &amp; Collection Hub</th>
                <th className="py-3 px-3">Commodity</th>
                <th className="py-3 px-3 text-right">Quantity</th>
                <th className="py-3 px-3 text-right">Contract Value</th>
                <th className="py-3 px-3">Milestone</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#faf9f0] transition">
                  <td className="py-3 px-4 font-mono font-bold text-[#1b6e53] whitespace-nowrap">
                    {order.id}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="font-bold text-[#212529] block font-editorial text-base">{order.fpo}</span>
                    <span className="text-[10px] font-mono text-[#6d6d6d]">{order.hub}</span>
                  </td>
                  <td className="py-3 px-3 text-[#212529] font-medium whitespace-nowrap">
                    {order.crop}
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-[#1b6e53] font-mono whitespace-nowrap">
                    {order.quantity}
                  </td>
                  <td className="py-3 px-3 text-right font-extrabold text-[#683600] font-mono text-sm whitespace-nowrap">
                    {order.totalValue}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 bg-[#f1efdf] px-2.5 py-1 rounded-md border border-[#c3cda7]/50 font-mono text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53]"></span>
                      {order.deliveryStage}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-0.5 rounded-[100px] text-[10px] font-mono font-semibold ${order.statusStyle}`}>
                      {order.status}
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
