import React, { useState } from 'react'
import { Link } from 'react-router'

export default function HubFarmers() {
  const [searchTerm, setSearchTerm] = useState('')

  const assignedFarmers = [
    {
      id: 'FARM-001',
      name: 'Ramesh Patel',
      village: 'Torredu (4.2 km from Hub)',
      phone: '+91 98480 11221',
      crop: 'Hybrid Tomato',
      quotaToday: '240 kg',
      deliveredToday: '240 kg (Weighed & Certified)',
      status: 'Arrival Complete',
      slipNo: 'SLIP-9901',
      lastWeighment: 'Today, 06:45 AM',
    },
    {
      id: 'FARM-002',
      name: 'Suresh Verma',
      village: 'Katheru (6.8 km from Hub)',
      phone: '+91 98480 33442',
      crop: 'Hybrid Tomato',
      quotaToday: '170 kg',
      deliveredToday: '170 kg (Weighed & Certified)',
      status: 'Arrival Complete',
      slipNo: 'SLIP-9902',
      lastWeighment: 'Today, 07:15 AM',
    },
    {
      id: 'FARM-003',
      name: 'Kavita Devi',
      village: 'Hukumpeta (5.1 km from Hub)',
      phone: '+91 98480 55663',
      crop: 'Hybrid Tomato',
      quotaToday: '150 kg',
      deliveredToday: '150 kg (Weighed & Certified)',
      status: 'Arrival Complete',
      slipNo: 'SLIP-9903',
      lastWeighment: 'Today, 07:40 AM',
    },
    {
      id: 'FARM-004',
      name: 'Balwant Singh',
      village: 'Morampudi (7.5 km from Hub)',
      phone: '+91 98480 77884',
      crop: 'Hybrid Tomato',
      quotaToday: '140 kg',
      deliveredToday: '140 kg (Weighed & Certified)',
      status: 'Arrival Complete',
      slipNo: 'SLIP-9904',
      lastWeighment: 'Today, 08:05 AM',
    },
    {
      id: 'FARM-008',
      name: 'K. Somanna',
      village: 'Torredu (3.8 km from Hub)',
      phone: '+91 98480 88991',
      crop: 'Hybrid Tomato',
      quotaToday: '120 kg',
      deliveredToday: 'Expected Afternoon Cycle',
      status: 'Pending Intake',
      slipNo: '—',
      lastWeighment: '08 Sep 2026',
    },
    {
      id: 'FARM-009',
      name: 'V. Satyam',
      village: 'Katheru (6.5 km from Hub)',
      phone: '+91 98480 44332',
      crop: 'Hybrid Tomato',
      quotaToday: '100 kg',
      deliveredToday: 'Expected Afternoon Cycle',
      status: 'Pending Intake',
      slipNo: '—',
      lastWeighment: '08 Sep 2026',
    },
  ]

  const filtered = assignedFarmers.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.village.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Link to="/hub/dashboard" className="text-[10px] font-mono text-[#1b6e53] font-bold hover:underline">
              ← DASHBOARD
            </Link>
            <span className="text-[#c3cda7]">/</span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              Hub Cluster Registry
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#00372a]">
            Assigned Farmers & Intake Lookup
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1">
            Producers assigned to Rajahmundry Central Hub #04 for daily gate check-in, load cell weighing, and thermal ticket printing.
          </p>
        </div>

        <Link
          to="/hub/weighing"
          className="px-4 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition"
        >
          <span className="material-symbols-outlined text-[16px]">scale</span>
          <span>Weigh Produce Batch</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-96">
        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-slate-400">search</span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Lookup farmer name, ID, or village..."
          className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#c3cda7] focus:outline-hidden focus:border-[#1b6e53] bg-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-[24px] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#c3cda7] bg-[#f1efdf]/60 text-[#6d6d6d] font-mono uppercase">
                <th className="p-4">Farmer Details</th>
                <th className="p-4">Assigned Village</th>
                <th className="p-4">Today's Allocation</th>
                <th className="p-4">Delivered / Status</th>
                <th className="p-4">Slip / Last Drop</th>
                <th className="p-4 text-right">Gate Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/40">
              {filtered.map((farmer) => (
                <tr key={farmer.id} className="hover:bg-[#f1efdf]/30 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-[#00372a] block">{farmer.name}</span>
                    <span className="text-[10px] text-[#6d6d6d] font-mono">{farmer.id} • {farmer.phone}</span>
                  </td>
                  <td className="p-4 font-medium text-[#353535]">{farmer.village}</td>
                  <td className="p-4">
                    <span className="font-bold text-[#1b6e53]">{farmer.quotaToday}</span>
                    <span className="text-[10px] text-[#6d6d6d] block font-mono">{farmer.crop}</span>
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full font-mono ${
                      farmer.status === 'Arrival Complete'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {farmer.deliveredToday}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[#6d6d6d]">
                    <span className="font-bold text-[#1b6e53] block">{farmer.slipNo}</span>
                    <span>{farmer.lastWeighment}</span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      to="/hub/weighing"
                      className="px-3 py-1.5 rounded-full bg-[#1b6e53] text-white font-semibold text-[11px] hover:bg-[#00372a] transition"
                    >
                      {farmer.status === 'Arrival Complete' ? 'Re-Weigh' : 'Start Intake'}
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
