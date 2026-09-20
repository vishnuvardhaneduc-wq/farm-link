import React, { useState } from 'react'
import { Link } from 'react-router'

export default function Payments() {
  const [activeTab, setActiveTab] = useState('all')

  const paymentsData = [
    {
      orderId: 'ORD-1031',
      fpoSupplier: 'Godavari Farmers FPO',
      hub: 'Rajahmundry Central Hub',
      crop: 'Hybrid Tomato (Grade A)',
      deliveredQty: '700 kg',
      produceTotal: '₹17,500',
      transportCost: '₹1,500',
      deliveredTotal: '₹28,500',
      escrowLocked: '₹28,500',
      settlementStatus: 'Escrow Locked (In Transit)',
      date: 'Today, 09:30 AM',
      invoiceNo: 'INV-2026-1031',
    },
    {
      orderId: 'ORD-1025',
      fpoSupplier: 'Godavari Farmers FPO',
      hub: 'Rajahmundry Central Hub',
      crop: 'Hybrid Tomato (Grade A)',
      deliveredQty: '1,200 kg',
      produceTotal: '₹30,000',
      transportCost: '₹2,400',
      deliveredTotal: '₹48,000',
      escrowLocked: '₹0 (Released)',
      settlementStatus: 'Completed & Released',
      date: '04 Sep 2026',
      invoiceNo: 'INV-2026-1025',
    },
    {
      orderId: 'ORD-1018',
      fpoSupplier: 'Godavari Farmers FPO',
      hub: 'Kakinada Coastal Agri Hub',
      crop: 'Green Chilli (Grade A)',
      deliveredQty: '600 kg',
      produceTotal: '₹22,800',
      transportCost: '₹1,800',
      deliveredTotal: '₹25,200',
      escrowLocked: '₹0 (Released)',
      settlementStatus: 'Completed & Released',
      date: '28 Aug 2026',
      invoiceNo: 'INV-2026-1018',
    },
    {
      orderId: 'ORD-1012',
      fpoSupplier: 'Krishna Delta Agri Federation',
      hub: 'Vijayawada North Hub',
      crop: 'Sweet Corn (Grade A)',
      deliveredQty: '2,500 kg',
      produceTotal: '₹45,000',
      transportCost: '₹3,500',
      deliveredTotal: '₹48,500',
      escrowLocked: '₹0 (Released)',
      settlementStatus: 'Completed & Released',
      date: '15 Aug 2026',
      invoiceNo: 'INV-2026-1012',
    },
  ]

  const filteredPayments = activeTab === 'all'
    ? paymentsData
    : activeTab === 'locked'
    ? paymentsData.filter((p) => p.settlementStatus.includes('Locked'))
    : paymentsData.filter((p) => p.settlementStatus.includes('Completed'))

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              Financial Clearing
            </span>
            <span className="text-[10px] font-mono text-[#6d6d6d]">
              Pre-Funded Escrow Node
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#00372a]">
            Payment & Settlement Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1">
            Track pre-funded order escrow balances, verified dockside delivery releases, freight debits, and institutional tax invoices.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex bg-white rounded-full p-1 border border-[#c3cda7]">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition ${
              activeTab === 'all' ? 'bg-[#1b6e53] text-white' : 'text-[#353535] hover:text-[#1b6e53]'
            }`}
          >
            All Settlements
          </button>
          <button
            onClick={() => setActiveTab('locked')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition ${
              activeTab === 'locked' ? 'bg-[#1b6e53] text-white' : 'text-[#353535] hover:text-[#1b6e53]'
            }`}
          >
            Escrow Locked
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition ${
              activeTab === 'completed' ? 'bg-[#1b6e53] text-white' : 'text-[#353535] hover:text-[#1b6e53]'
            }`}
          >
            Completed & Released
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Escrow Wallet Balance</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#1b6e53] mt-1">₹8,20,000</p>
          <span className="text-[10px] text-emerald-700 font-medium">Auto-replenishing YES Bank Node</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Locked in Transit</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a] mt-1">₹28,500</p>
          <span className="text-[10px] text-[#6d6d6d]">ORD-1031 (Delivering today)</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Total Settled Volume</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#1b6e53] mt-1">₹68.5 Lakhs</p>
          <span className="text-[10px] text-emerald-700 font-medium">100% dispute-free clearing</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Avg Settlement Time</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#683600] mt-1">1.4 Hours</p>
          <span className="text-[10px] text-[#683600]">Post buyer dock verification</span>
        </div>
      </div>

      {/* Financial Formula Callout */}
      <div className="bg-[#e6ecd5] border border-[#c3cda7] rounded-[24px] p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#e8fe85] flex items-center justify-center font-bold">
            ₹
          </div>
          <div>
            <h3 className="font-bold text-[#00372a] text-sm">FarmLink Dual-Settlement Mathematical Model</h3>
            <p className="text-xs text-[#353535] mt-0.5">
              <strong>Delivered Order Total</strong> = Produce Value (Accepted Qty × Quoted Item Rate) + Logistics & Freight.
            </p>
          </div>
        </div>
        <div className="text-xs font-mono bg-white px-4 py-2 rounded-xl border border-[#c3cda7] text-[#1b6e53] font-bold">
          Zero Farmer Intermediary Deduction
        </div>
      </div>

      {/* Settlements Table */}
      <div className="bg-white rounded-[24px] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-6 border-b border-[#c3cda7]/40 flex items-center justify-between">
          <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
            Settlement Audit & Invoice Ledger
          </h2>
          <span className="text-xs font-mono text-[#6d6d6d]">
            {filteredPayments.length} Transactions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#c3cda7] bg-[#f1efdf]/60 text-[#6d6d6d] font-mono uppercase">
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">FPO & Dispatch Hub</th>
                <th className="p-4">Commodity & Volume</th>
                <th className="p-4">Freight & Total</th>
                <th className="p-4">Escrow Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/40">
              {filteredPayments.map((pay) => (
                <tr key={pay.orderId} className="hover:bg-[#f1efdf]/30 transition-colors">
                  <td className="p-4">
                    <span className="font-mono font-bold text-[#00372a] block text-sm">{pay.orderId}</span>
                    <span className="text-[10px] text-[#6d6d6d] font-mono">{pay.date} • {pay.invoiceNo}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-[#353535] block">{pay.fpoSupplier}</span>
                    <span className="text-[10px] text-[#6d6d6d] font-mono">{pay.hub}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-[#1b6e53] block">{pay.crop}</span>
                    <span className="text-[10px] text-[#6d6d6d] font-mono">Delivered: {pay.deliveredQty}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-[#00372a] block text-sm">{pay.deliveredTotal}</span>
                    <span className="text-[10px] text-[#6d6d6d] font-mono">Freight: {pay.transportCost}</span>
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full font-mono ${
                      pay.settlementStatus.includes('Completed')
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-[#b2cee7] text-[#00372a]'
                    }`}>
                      {pay.settlementStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      to={`/buyer/orders/${pay.orderId}`}
                      className="px-3 py-1.5 rounded-full bg-[#1b6e53] text-white font-semibold text-[11px] hover:bg-[#00372a] transition"
                    >
                      View Order & Dock
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
