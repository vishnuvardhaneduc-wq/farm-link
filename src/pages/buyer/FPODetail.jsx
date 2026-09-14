import React, { useState } from 'react'
import { useParams, Link } from 'react-router'
import ProcurementRequestModal from '../../components/buyer/ProcurementRequestModal'
import { mockFPOs } from '../../data/buyerData'

export default function FPODetail() {
  const { id } = useParams()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProductForRequest, setSelectedProductForRequest] = useState(null)

  // Match FPO or default to first
  const fpo = mockFPOs.find((f) => f.id === id) || mockFPOs[0]

  const openRequestForCrop = (cropName, indicativeRate) => {
    setSelectedProductForRequest({ cropName, indicativeRate })
    setModalOpen(true)
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Link to="/buyer/fpos" className="text-[10px] font-mono text-[#1b6e53] font-bold hover:underline">
              ← BACK TO FPO DIRECTORY
            </Link>
            <span className="text-[#c3cda7]">/</span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              FPO FEDERATION PROFILE
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            {fpo.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            {fpo.legalName} • <span className="font-mono">{fpo.regNumber}</span> • Est. {fpo.estYear}
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedProductForRequest(null)
            setModalOpen(true)
          }}
          className="py-3 px-6 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition active:scale-[0.99] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">receipt_long</span>
          <span>Send Procurement Request (RFQ)</span>
        </button>
      </div>

      {/* 1. FPO Telemetry & Badges */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#e6ecd5] rounded-[20px] p-5 border border-[#c3cda7] flex flex-col justify-between shadow-xs">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1b6e53]">
            Registered Farmers
          </span>
          <div className="my-2">
            <div className="font-editorial text-4xl font-normal text-[#1b6e53]">
              {fpo.farmerMembers}
            </div>
            <p className="text-[11px] text-[#353535] mt-0.5">Aggregated Producers</p>
          </div>
          <span className="text-xs font-semibold text-[#1b6e53] pt-2 border-t border-[#c3cda7]/60 font-mono">
            Zero-App SMS Cluster
          </span>
        </div>

        <div className="bg-[#fceace] rounded-[20px] p-5 border border-[#c3cda7] flex flex-col justify-between shadow-xs">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#683600]">
            Operational Hubs
          </span>
          <div className="my-2">
            <div className="font-editorial text-4xl font-normal text-[#683600]">
              {fpo.hubsCount} <span className="text-xl font-sans font-normal">Hubs</span>
            </div>
            <p className="text-[11px] text-[#353535] mt-0.5">Weighing &amp; QC Centers</p>
          </div>
          <span className="text-xs font-semibold text-[#683600] pt-2 border-t border-[#c3cda7]/60 font-mono">
            All Hubs Online
          </span>
        </div>

        <div className="bg-[#b2cee7] rounded-[20px] p-5 border border-[#c3cda7] flex flex-col justify-between shadow-xs">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00372a]">
            Monthly Throughput
          </span>
          <div className="my-2">
            <div className="font-editorial text-3xl font-normal text-[#00372a]">
              {fpo.approxCapacityVal}
            </div>
            <p className="text-[11px] text-[#353535] mt-0.5">Active Aggregation Volume</p>
          </div>
          <span className="text-xs font-semibold text-[#00372a] pt-2 border-t border-[#c3cda7]/60 font-mono">
            Cold Staging Ready
          </span>
        </div>

        <div className="bg-[#ffffff] rounded-[20px] p-5 border border-[#c3cda7] flex flex-col justify-between shadow-xs">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#353535]">
            Reliability Score
          </span>
          <div className="my-2">
            <div className="font-editorial text-4xl font-normal text-[#1b6e53]">
              {fpo.reliabilityScore}
            </div>
            <p className="text-[11px] text-[#353535] mt-0.5">On-Time Settlement Rate</p>
          </div>
          <span className="text-xs font-semibold text-[#1b6e53] pt-2 border-t border-[#c3cda7]/60 font-mono">
            ★ {fpo.rating} ({fpo.reviewsCount} Audits)
          </span>
        </div>
      </section>

      {/* 2. Commodity Capabilities Table matching DashboardTables */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#c3cda7]/50">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-2 py-0.5 rounded-full border border-[#c3cda7] inline-block mb-1">
              PRODUCE LEDGER
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight">
              Verified Commodity Capabilities
            </h2>
          </div>
          <span className="text-xs font-mono text-[#6d6d6d]">
            Indicative rates aggregated across {fpo.hubsCount} collection hubs
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">Commodity</th>
                <th className="py-3 px-3">Grade Spec</th>
                <th className="py-3 px-3 text-right">Aggregated Capacity</th>
                <th className="py-3 px-3 font-bold text-[#683600]">Indicative Rate</th>
                <th className="py-3 px-3">Packaging &amp; Transit</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              <tr className="hover:bg-[#faf9f0] transition">
                <td className="py-3 px-4 font-bold text-slate-900 font-editorial text-base">
                  🍅 Tomato (Hybrid Roma / Himsona)
                </td>
                <td className="py-3 px-3">
                  <span className="bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7] px-2 py-0.5 rounded font-mono text-[11px] font-bold">
                    Grade A
                  </span>
                </td>
                <td className="py-3 px-3 text-right font-bold text-[#1b6e53] font-mono">
                  {fpo.tomatoCapacity || '1,500 kg'} / day
                </td>
                <td className="py-3 px-3 font-extrabold text-[#683600] font-mono text-sm">
                  {fpo.tomatoPrice || '₹28 / kg'}
                </td>
                <td className="py-3 px-3 text-[#353535]">
                  Ventilated 20kg Crates • Reefer Van Dispatch
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => openRequestForCrop('Tomato', fpo.tomatoPrice || '₹28 / kg')}
                    className="py-1.5 px-3.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-2xs cursor-pointer"
                  >
                    Send RFQ
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-[#faf9f0] transition">
                <td className="py-3 px-4 font-bold text-slate-900 font-editorial text-base">
                  🧅 Onion (Nasik Red / Medium)
                </td>
                <td className="py-3 px-3">
                  <span className="bg-[#f1efdf] text-[#353535] border border-[#c3cda7] px-2 py-0.5 rounded font-mono text-[11px] font-bold">
                    Grade A (45-55mm)
                  </span>
                </td>
                <td className="py-3 px-3 text-right font-bold text-[#1b6e53] font-mono">
                  {fpo.onionCapacity || '2,000 kg'} / day
                </td>
                <td className="py-3 px-3 font-extrabold text-[#683600] font-mono text-sm">
                  {fpo.onionPrice || '₹24 / kg'}
                </td>
                <td className="py-3 px-3 text-[#353535]">
                  Mesh Bags (40kg) • Covered Truck
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => openRequestForCrop('Onion', fpo.onionPrice || '₹24 / kg')}
                    className="py-1.5 px-3.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-2xs cursor-pointer"
                  >
                    Send RFQ
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-[#faf9f0] transition">
                <td className="py-3 px-4 font-bold text-slate-900 font-editorial text-base">
                  🌶️ Green Chilli (G4 Hot)
                </td>
                <td className="py-3 px-3">
                  <span className="bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7] px-2 py-0.5 rounded font-mono text-[11px] font-bold">
                    Grade A Export
                  </span>
                </td>
                <td className="py-3 px-3 text-right font-bold text-[#1b6e53] font-mono">
                  {fpo.chilliCapacity || '800 kg'} / day
                </td>
                <td className="py-3 px-3 font-extrabold text-[#683600] font-mono text-sm">
                  {fpo.chilliPrice || '₹44 / kg'}
                </td>
                <td className="py-3 px-3 text-[#353535]">
                  Corrugated Boxes (5kg/10kg) • Rapid Cold Dispatch
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => openRequestForCrop('Green Chilli', fpo.chilliPrice || '₹44 / kg')}
                    className="py-1.5 px-3.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-2xs cursor-pointer"
                  >
                    Send RFQ
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Operational Hub Network & Infrastructure Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hub Network */}
        <div className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]/50">
            <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
              Collection Hubs ({fpo.hubsCount})
            </h3>
            <span className="text-[10px] font-mono font-bold text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">
              Thermal Scales Active
            </span>
          </div>

          <div className="space-y-2.5">
            {fpo.hubNames.map((hub, idx) => (
              <div
                key={hub}
                className="flex items-center justify-between p-3 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7]/60 text-xs font-sans"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#1b6e53] text-[#ffffff] font-bold flex items-center justify-center text-[10px] font-mono">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-[#212529]">{hub}</h4>
                    <p className="text-[11px] text-[#6d6d6d] font-mono">Digital Weighbridge • Dual-Channel IVR Bay</p>
                  </div>
                </div>
                <span className="text-[#1b6e53] font-mono font-bold bg-[#ffffff] px-2.5 py-1 rounded-[100px] border border-[#c3cda7]">
                  Active Intake
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Assurance & Desk */}
        <div className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#c3cda7]/50">
            <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
              Quality Assurance &amp; SLA
            </h3>
          </div>

          <div className="space-y-3 text-xs font-sans">
            <div className="p-4 rounded-[16px] bg-[#e6ecd5] border border-[#c3cda7] space-y-1">
              <strong className="text-[#1b6e53] font-bold block text-sm font-editorial">
                Dual-Slip Gate Verification
              </strong>
              <p className="text-[#1b6e53] leading-relaxed">
                Farmers receive physical thermal weighment slips directly at the intake scale. Voice IVR automated phone calls verify Jan Dhan settlement in Telugu &amp; Hindi with zero smartphone dependency.
              </p>
            </div>

            <div className="p-4 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
              <strong className="text-[#212529] font-bold block font-mono uppercase text-[11px]">
                FPO Procurement Desk
              </strong>
              <p className="text-[#6d6d6d]">
                Contact: <strong className="text-[#212529]">{fpo.contactPerson}</strong> • Phone: {fpo.phone} • Email: {fpo.email}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Procurement Modal */}
      <ProcurementRequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={{
          fpoName: fpo.name,
          product: selectedProductForRequest?.cropName || fpo.products[0],
          indicativePrice: selectedProductForRequest?.indicativeRate || fpo.tomatoPrice,
          grade: 'Grade A'
        }}
      />
    </div>
  )
}
