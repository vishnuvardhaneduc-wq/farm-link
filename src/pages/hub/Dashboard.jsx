import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import {
  getStoredHubOperations,
  calculateHubKPIs,
} from '../../data/hubOperationsData'

export default function HubDashboard() {
  const [hubState, setHubState] = useState(getStoredHubOperations())

  useEffect(() => {
    const handleStorage = () => setHubState(getStoredHubOperations())
    window.addEventListener('storage', handleStorage)
    setHubState(getStoredHubOperations())
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const kpis = calculateHubKPIs(hubState)
  const activeOrder = hubState.activeOrder

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header & Stage Breadcrumb */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-block mb-1.5">
            HUB OPERATIONS // TODAY'S INTAKE &amp; DISPATCH
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Today's Hub <span className="italic font-normal">Operations</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Inward harvest collection, precision scale weighing, lab quality grading, lot aggregation, and buyer dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#ffffff] px-4 py-2 rounded-[100px] border border-[#c3cda7] shadow-2xs">
            {activeOrder.hubName}
          </span>
        </div>
      </div>

      {/* 2. Today's Operations KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Expected Collection */}
        <div className="p-5 rounded-[20px] bg-[#ffffff] border border-[#c3cda7] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#6d6d6d]">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Expected Collection</span>
            <span className="material-symbols-outlined text-[20px] text-[#1b6e53]">assignment_turned_in</span>
          </div>
          <div className="text-3xl font-mono font-bold text-[#00372a]">
            {kpis.expectedCollection.toLocaleString()} <span className="text-lg font-normal text-[#6d6d6d]">kg</span>
          </div>
          <div className="text-[11px] font-mono text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-0.5 rounded-[100px] inline-block border border-[#c3cda7]">
            Planned Allocation
          </div>
        </div>

        {/* Collected */}
        <div className="p-5 rounded-[20px] bg-[#e6ecd5] border border-[#c3cda7] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#1b6e53]">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Collected</span>
            <span className="material-symbols-outlined text-[20px]">input</span>
          </div>
          <div className="text-3xl font-mono font-bold text-[#1b6e53]">
            {kpis.collected.toLocaleString()} <span className="text-lg font-normal text-[#00372a]/70">kg</span>
          </div>
          <div className="text-[11px] font-mono text-[#1b6e53]">
            {kpis.expectedCollection > 0 ? `${Math.round((kpis.collected / kpis.expectedCollection) * 100)}% of target` : '0%'}
          </div>
        </div>

        {/* Pending Intake */}
        <div className="p-5 rounded-[20px] bg-[#ffffff] border border-[#c3cda7] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#6d6d6d]">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Pending Intake</span>
            <span className="material-symbols-outlined text-[20px] text-amber-700">pending_actions</span>
          </div>
          <div className="text-3xl font-mono font-bold text-[#683600]">
            {kpis.pending.toLocaleString()} <span className="text-lg font-normal text-[#6d6d6d]">kg</span>
          </div>
          <div className="text-[11px] font-mono text-[#683600] bg-[#fceace] px-2.5 py-0.5 rounded-[100px] inline-block border border-[#c3cda7]">
            {kpis.expectedFarmers - kpis.farmersReported} Farmers Awaiting
          </div>
        </div>

        {/* Quality Pending */}
        <div className="p-5 rounded-[20px] bg-[#f1efdf] border border-[#c3cda7] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#353535]">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Quality Pending</span>
            <span className="material-symbols-outlined text-[20px] text-[#1b6e53]">science</span>
          </div>
          <div className="text-3xl font-mono font-bold text-[#00372a]">
            {kpis.qualityPending.toLocaleString()} <span className="text-lg font-normal text-[#6d6d6d]">kg</span>
          </div>
          <div className="text-[11px] font-mono text-[#6d6d6d]">
            Awaiting Quality Inspection
          </div>
        </div>
      </div>

      {/* 3. Operational Workflow Stage Tracker */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#c3cda7]/50">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#1b6e53] font-bold">
              EXECUTION PIPELINE
            </span>
            <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
              Hub Workflow Stages
            </h2>
          </div>
          <span className="text-xs font-mono text-[#6d6d6d]">
            Collection → Weighing → Quality Inspection → Aggregation → Dispatch
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            {
              step: '1',
              title: 'Collection',
              desc: 'Gate intake and receipts',
              route: '/hub/collection',
              badge: `${kpis.farmersReported}/${kpis.expectedFarmers} Farmers`,
              icon: 'move_to_inbox',
            },
            {
              step: '2',
              title: 'Weighing',
              desc: 'Scale weight recording',
              route: '/hub/weighing',
              badge: `${hubState.farmerLots.filter((l) => l.status === 'Weighed' || l.status === 'Passed').length} Weighed`,
              icon: 'scale',
            },
            {
              step: '3',
              title: 'Quality Inspection',
              desc: 'Lab grading and acceptance',
              route: '/hub/quality',
              badge: `${kpis.qualityCheckedLots} Inspected`,
              icon: 'science',
            },
            {
              step: '4',
              title: 'Aggregation',
              desc: 'Consolidated lots',
              route: '/hub/aggregation',
              badge: `${kpis.totalAccepted}/${kpis.requiredTarget} kg`,
              icon: 'inventory_2',
            },
            {
              step: '5',
              title: 'Dispatch',
              desc: 'Carrier manifest & seals',
              route: '/hub/dispatch',
              badge: activeOrder.status === 'Dispatched' ? 'Dispatched' : kpis.isTargetReached ? 'Ready' : 'Incomplete',
              icon: 'local_shipping',
            },
          ].map((st) => (
            <Link
              key={st.step}
              to={st.route}
              className="p-4 rounded-[18px] border border-[#c3cda7] hover:border-[#1b6e53] bg-[#f1efdf]/40 hover:bg-[#e6ecd5]/40 transition group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-[#1b6e53] text-[#ffffff] font-mono text-xs font-bold flex items-center justify-center">
                  {st.step}
                </span>
                <span className="material-symbols-outlined text-[20px] text-[#1b6e53] group-hover:translate-x-0.5 transition-transform">
                  {st.icon}
                </span>
              </div>
              <div>
                <h4 className="font-editorial text-lg font-bold text-[#00372a] group-hover:text-[#1b6e53]">
                  {st.title}
                </h4>
                <p className="text-[11px] text-[#6d6d6d] font-sans mt-0.5 leading-tight">{st.desc}</p>
              </div>
              <div className="pt-2 border-t border-[#c3cda7]/40 flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#6d6d6d]">{st.badge}</span>
                <span className="text-[#1b6e53] font-bold group-hover:underline">Open →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Today's Active Collection Order Spotlight */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-[18px] bg-[#e6ecd5] border border-[#c3cda7] text-[#1b6e53] text-2xl flex items-center justify-center shrink-0 font-bold">
              🍅
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-bold text-xs text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">
                  {activeOrder.orderId}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
                  Today's Collection: {activeOrder.crop}
                </h3>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-[100px] bg-[#b2cee7] text-[#00372a]">
                  Buyer: {activeOrder.buyer}
                </span>
              </div>
              <p className="text-xs text-[#6d6d6d] font-mono mt-1">
                Hub: <strong className="text-[#212529]">{activeOrder.hubName}</strong> • Destination: <strong className="text-[#212529]">{activeOrder.destination}</strong> • Schedule: <strong className="text-[#212529]">{activeOrder.deliveryDate}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`px-3.5 py-1.5 rounded-[100px] text-xs font-mono font-bold uppercase tracking-wider ${
                activeOrder.status === 'Dispatched'
                  ? 'bg-[#b2cee7] text-[#00372a] border border-[#00372a]/30'
                  : kpis.isTargetReached
                  ? 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53]'
                  : 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]'
              }`}
            >
              {activeOrder.status === 'Dispatched' ? 'Dispatched' : activeOrder.status}
            </span>

            <Link
              to="/hub/collection"
              className="py-2 px-4 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Record Collection</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Telemetry Summary Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] font-mono text-[#6d6d6d] uppercase block">Hub Target Requirement</span>
            <div className="text-2xl font-bold font-mono text-[#00372a]">
              {activeOrder.hubAllocatedQty.toLocaleString()} kg
            </div>
            <p className="text-[10px] text-[#6d6d6d] font-sans">Of {activeOrder.totalRequiredQty.toLocaleString()} kg total contract</p>
          </div>

          <div className="p-4 rounded-[18px] bg-[#e6ecd5] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] font-mono text-[#1b6e53] uppercase block">Farmers Reporting</span>
            <div className="text-2xl font-bold font-mono text-[#1b6e53]">
              {kpis.farmersReported} <span className="text-base font-normal text-[#1b6e53]/70">/ {kpis.expectedFarmers} Expected</span>
            </div>
            <p className="text-[10px] text-[#1b6e53] font-sans">
              {kpis.farmersReported === kpis.expectedFarmers ? 'All Farmers Reported' : `${kpis.expectedFarmers - kpis.farmersReported} Farmers in Transit`}
            </p>
          </div>

          <div className="p-4 rounded-[18px] bg-[#ffffff] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] font-mono text-[#6d6d6d] uppercase block">Accepted Volume</span>
            <div className="text-2xl font-bold font-mono text-[#1b6e53]">
              {kpis.totalAccepted.toLocaleString()} kg
            </div>
            <p className="text-[10px] text-[#6d6d6d] font-sans">
              {Math.round((kpis.totalAccepted / activeOrder.hubAllocatedQty) * 100)}% of Hub Quota
            </p>
          </div>

          <div className="p-4 rounded-[18px] bg-[#fceace] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] font-mono text-[#683600] uppercase block">Aggregation Status</span>
            <div className="text-2xl font-bold font-mono text-[#683600]">
              {kpis.isTargetReached ? 'Quota Met' : `${activeOrder.hubAllocatedQty - kpis.totalAccepted} kg Remaining`}
            </div>
            <p className="text-[10px] text-[#683600] font-sans">
              {kpis.isTargetReached ? 'Ready for Dispatch' : 'Awaiting Remaining Lots'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Farmer Lots Quick Inward Summary Table */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#1b6e53]">format_list_bulleted</span>
            <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
              Today's Farmer Lots
            </h3>
          </div>
          <Link
            to="/hub/collection"
            className="text-xs font-mono text-[#1b6e53] font-bold hover:underline"
          >
            View Full Collection Roster →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-2.5 px-4">Farmer ID</th>
                <th className="py-2.5 px-3">Producer</th>
                <th className="py-2.5 px-3 text-right">Allocated</th>
                <th className="py-2.5 px-3 text-right">Actual Collected</th>
                <th className="py-2.5 px-3 text-right">Accepted (QA)</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-4 text-right">Next Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              {hubState.farmerLots.map((lot) => (
                <tr key={lot.id} className="hover:bg-[#faf9f0] transition font-sans">
                  <td className="py-3 px-4 font-mono font-bold text-[#1b6e53] text-[11px]">
                    {lot.farmerId}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-[#00372a] block">{lot.farmerName}</span>
                    <span className="text-[10px] font-mono text-[#6d6d6d]">{lot.crop} • {lot.requiredGrade}</span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-[#353535]">
                    {lot.allocatedQty} kg
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-semibold text-[#00372a]">
                    {lot.actualCollectedQty !== null ? `${lot.actualCollectedQty} kg` : '—'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-extrabold text-[#1b6e53]">
                    {lot.acceptedQty !== null ? `${lot.acceptedQty} kg` : '—'}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-[100px] text-[10px] font-mono font-bold uppercase ${
                        lot.status === 'Passed'
                          ? 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53]'
                          : lot.status === 'Weighed'
                          ? 'bg-[#b2cee7] text-[#00372a]'
                          : lot.status === 'Collected'
                          ? 'bg-[#e6ecd5] text-[#1b6e53]'
                          : 'bg-[#f1efdf] text-[#6d6d6d]'
                      }`}
                    >
                      {lot.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {lot.status === 'Pending' && (
                      <Link
                        to="/hub/collection"
                        className="py-1 px-3 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-[11px] font-bold transition shadow-2xs inline-block"
                      >
                        Record Intake
                      </Link>
                    )}
                    {lot.status === 'Collected' && (
                      <Link
                        to="/hub/weighing"
                        className="py-1 px-3 rounded-[100px] bg-[#e6ecd5] hover:bg-[#c3cda7] text-[#1b6e53] text-[11px] font-bold border border-[#c3cda7] inline-block"
                      >
                        Confirm Weight
                      </Link>
                    )}
                    {lot.status === 'Weighed' && (
                      <Link
                        to="/hub/quality"
                        className="py-1 px-3 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-[11px] font-bold transition shadow-2xs inline-block"
                      >
                        Inspect QA
                      </Link>
                    )}
                    {lot.status === 'Passed' && (
                      <span className="text-[11px] font-mono text-[#1b6e53] font-bold">
                        In Aggregation
                      </span>
                    )}
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
