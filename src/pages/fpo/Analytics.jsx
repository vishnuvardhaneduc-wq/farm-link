import React from 'react'

export default function Analytics() {
  const cropPerformance = [
    { crop: 'Hybrid Tomato', aggregatedQty: '48.5 MT', realizationVsMandi: '+19.2%', avgRate: '₹26.40/kg', fulfillmentRate: '98.5%', topBuyer: 'AgroFresh Enterprise' },
    { crop: 'Green Chilli (G-4)', aggregatedQty: '22.0 MT', realizationVsMandi: '+22.4%', avgRate: '₹39.10/kg', fulfillmentRate: '99.0%', topBuyer: 'Reliance Retail Fresh' },
    { crop: 'Onion Red (Nashik)', aggregatedQty: '65.0 MT', realizationVsMandi: '+14.8%', avgRate: '₹21.50/kg', fulfillmentRate: '96.2%', topBuyer: 'BigBasket Fulfillment' },
    { crop: 'Sharbati Wheat', aggregatedQty: '140.0 MT', realizationVsMandi: '+16.5%', avgRate: '₹26.50/kg', fulfillmentRate: '100.0%', topBuyer: 'PureGrain Mills' },
    { crop: 'Mustard Seeds', aggregatedQty: '38.0 MT', realizationVsMandi: '+15.1%', avgRate: '₹51.00/kg', fulfillmentRate: '97.8%', topBuyer: 'PureGrain Mills' },
  ]

  const hubThroughput = [
    { hub: 'Rajahmundry Central Hub', volume: '112.4 MT', utilization: '68%', gradeAPass: '96.4%', avgTurnaround: '1.8 min' },
    { hub: 'Kakinada Coastal Agri Hub', volume: '48.2 MT', utilization: '45%', gradeAPass: '97.2%', avgTurnaround: '2.1 min' },
    { hub: 'Mandapeta Grain Depot', volume: '185.0 MT', utilization: '82%', gradeAPass: '98.8%', avgTurnaround: '3.4 min' },
    { hub: 'Ravulapalem Fruit Hub', volume: '38.5 MT', utilization: '54%', gradeAPass: '94.8%', avgTurnaround: '2.0 min' },
  ]

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              Agrarian Intelligence & Audit
            </span>
            <span className="text-[10px] font-mono text-[#6d6d6d]">
              Season 2026.09 Analytics
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#00372a]">
            Analytics & Agronomic Reports
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1">
            Cluster yield cycles, member farmer price realization above local APMC mandis, hub efficiency, and financial escrow telemetry.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-[100px] bg-white border border-[#c3cda7] hover:bg-[#f1efdf] text-[#00372a] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-2xs transition"
        >
          <span className="material-symbols-outlined text-[16px]">download</span>
          <span>Export Seasonal Report</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Total Aggregation</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#1b6e53] mt-1">384.1 MT</p>
          <span className="text-[10px] text-emerald-700 font-medium">+38% YoY growth</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Farmer Realization</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a] mt-1">+18.4%</p>
          <span className="text-[10px] text-emerald-700 font-medium">Above APMC mandi benchmark</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Post-Harvest Loss</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#1b6e53] mt-1">&lt; 1.1%</p>
          <span className="text-[10px] text-emerald-700 font-medium">Cold-chain hub efficiency</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Jan Dhan Disbursed</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#683600] mt-1">₹89.4 Lakhs</p>
          <span className="text-[10px] text-[#683600]">100% direct bank transfer</span>
        </div>
      </div>

      {/* Commodity Realization Table */}
      <div className="bg-white rounded-[24px] border border-[#c3cda7] p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
              Commodity Price Realization vs. APMC Benchmark
            </h2>
            <p className="text-xs text-[#6d6d6d]">Direct institutional contracts deliver superior net payout compared to middleman commission yards.</p>
          </div>
          <span className="text-xs font-mono text-[#1b6e53] bg-[#e6ecd5] px-3 py-1 rounded-full font-bold">
            eNAM Price Indexed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#c3cda7] bg-[#f1efdf] text-[#6d6d6d] font-mono uppercase">
                <th className="p-3">Commodity</th>
                <th className="p-3">Total Volume</th>
                <th className="p-3">Avg FPO Realized Rate</th>
                <th className="p-3">Net Gain vs APMC Mandi</th>
                <th className="p-3">Contract Fulfillment</th>
                <th className="p-3">Primary Off-taker</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/40">
              {cropPerformance.map((c) => (
                <tr key={c.crop} className="hover:bg-[#f1efdf]/30">
                  <td className="p-3 font-bold text-[#00372a]">{c.crop}</td>
                  <td className="p-3 font-semibold">{c.aggregatedQty}</td>
                  <td className="p-3 font-mono font-bold text-[#1b6e53]">{c.avgRate}</td>
                  <td className="p-3">
                    <span className="text-emerald-700 font-bold bg-[#e6ecd5] px-2.5 py-0.5 rounded-full text-[10px] font-mono">
                      {c.realizationVsMandi}
                    </span>
                  </td>
                  <td className="p-3 font-mono">{c.fulfillmentRate}</td>
                  <td className="p-3 text-[#6d6d6d]">{c.topBuyer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hub Throughput Comparison */}
      <div className="bg-white rounded-[24px] border border-[#c3cda7] p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
          Physical Hub Throughput & Operational Efficiency
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hubThroughput.map((h) => (
            <div key={h.hub} className="bg-[#f1efdf]/60 p-4 rounded-2xl border border-[#c3cda7] space-y-2 text-xs">
              <h3 className="font-bold text-[#00372a] text-sm">{h.hub}</h3>
              <div className="space-y-1 text-[#353535]">
                <div className="flex justify-between"><span className="text-[#6d6d6d]">Throughput:</span><strong className="text-[#1b6e53]">{h.volume}</strong></div>
                <div className="flex justify-between"><span className="text-[#6d6d6d]">Capacity Utilized:</span><strong>{h.utilization}</strong></div>
                <div className="flex justify-between"><span className="text-[#6d6d6d]">Grade A Pass:</span><strong className="text-emerald-700">{h.gradeAPass}</strong></div>
                <div className="flex justify-between"><span className="text-[#6d6d6d]">Avg Gate Speed:</span><span className="font-mono">{h.avgTurnaround}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
