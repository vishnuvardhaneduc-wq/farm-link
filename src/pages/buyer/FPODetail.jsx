import React, { useState } from 'react'
import { useParams, Link } from 'react-router'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import StatusBadge from '../../components/ui/StatusBadge'
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
    <div className="space-y-8 pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/buyer/fpos" className="hover:text-emerald-700">
          ← Back to FPO Directory
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">{fpo.name}</span>
      </div>

      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-3xl font-bold shadow-sm shrink-0">
              🌾
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {fpo.name}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  ✓ {fpo.status}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  ★ {fpo.rating} ({fpo.reviewsCount} verified audits)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {fpo.legalName} • <span className="font-mono">{fpo.regNumber}</span> • Est. {fpo.estYear}
              </p>
              <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                <span>📍</span> {fpo.location}, {fpo.district}, {fpo.state} — PIN {fpo.pincode}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 shadow-sm"
              onClick={() => {
                setSelectedProductForRequest(null)
                setModalOpen(true)
              }}
            >
              + Send Procurement Request (RFQ)
            </Button>
          </div>
        </div>

        {/* Highlight Certifications */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-400 mr-2">Certifications & Standards:</span>
          {fpo.certifications.map((cert) => (
            <span
              key={cert}
              className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg"
            >
              🛡️ {cert}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Key Telemetry Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Registered Farmers
          </span>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {fpo.farmerMembers}
          </p>
          <span className="text-[11px] text-emerald-700 font-medium">
            Aggregated Cluster Members
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Collection Hubs
          </span>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {fpo.hubsCount} Hubs
          </p>
          <span className="text-[11px] text-slate-500">
            Weighing & QC Centers
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Monthly Aggregation
          </span>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {fpo.approxCapacityVal}
          </p>
          <span className="text-[11px] text-blue-600 font-medium">
            Active Throughput
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Reliability Score
          </span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">
            {fpo.reliabilityScore}
          </p>
          <span className="text-[11px] text-emerald-600 font-medium">
            On-Time Settlement Rate
          </span>
        </div>
      </div>

      {/* 3. Produce Capabilities & Indicative Rate Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Verified Commodity Capabilities
            </h2>
            <p className="text-xs text-slate-500">
              Indicative capacity and pricing aggregated across member collection centers
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Ready for Forward Contracting
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-4 py-3">Commodity</th>
                <th className="px-4 py-3">Standard Grade</th>
                <th className="px-4 py-3">Aggregated Active Capacity</th>
                <th className="px-4 py-3">Indicative Benchmark Rate</th>
                <th className="px-4 py-3">Packaging & Logistics</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/80">
                <td className="px-4 py-3.5 font-bold text-slate-900">
                  🍅 Tomato (Hybrid Roma / Himsona)
                </td>
                <td className="px-4 py-3.5">
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                    Grade A
                  </span>
                </td>
                <td className="px-4 py-3.5 font-semibold text-slate-800">
                  {fpo.tomatoCapacity || '1,500 kg'} / day
                </td>
                <td className="px-4 py-3.5 font-extrabold text-slate-900 text-sm">
                  {fpo.tomatoPrice || '₹28 / kg'}
                </td>
                <td className="px-4 py-3.5 text-slate-600">
                  Ventilated 20kg Crates • Reefer Van Dispatch
                </td>
                <td className="px-4 py-3.5 text-right">
                  <Button
                    size="sm"
                    variant="primary"
                    className="text-xs bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => openRequestForCrop('Tomato', fpo.tomatoPrice || '₹28 / kg')}
                  >
                    Send Request
                  </Button>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/80">
                <td className="px-4 py-3.5 font-bold text-slate-900">
                  🧅 Onion (Nasik Red / Medium)
                </td>
                <td className="px-4 py-3.5">
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                    Grade A (45-55mm)
                  </span>
                </td>
                <td className="px-4 py-3.5 font-semibold text-slate-800">
                  {fpo.onionCapacity || '2,000 kg'} / day
                </td>
                <td className="px-4 py-3.5 font-extrabold text-slate-900 text-sm">
                  {fpo.onionPrice || '₹24 / kg'}
                </td>
                <td className="px-4 py-3.5 text-slate-600">
                  Mesh Bags (40kg) • Covered Truck
                </td>
                <td className="px-4 py-3.5 text-right">
                  <Button
                    size="sm"
                    variant="primary"
                    className="text-xs bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => openRequestForCrop('Onion', fpo.onionPrice || '₹24 / kg')}
                  >
                    Send Request
                  </Button>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/80">
                <td className="px-4 py-3.5 font-bold text-slate-900">
                  🌶️ Green Chilli (G4 Hot)
                </td>
                <td className="px-4 py-3.5">
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                    Grade A Export
                  </span>
                </td>
                <td className="px-4 py-3.5 font-semibold text-slate-800">
                  {fpo.chilliCapacity || '800 kg'} / day
                </td>
                <td className="px-4 py-3.5 font-extrabold text-slate-900 text-sm">
                  {fpo.chilliPrice || '₹44 / kg'}
                </td>
                <td className="px-4 py-3.5 text-slate-600">
                  Corrugated Boxes (5kg/10kg) • Rapid Cold Dispatch
                </td>
                <td className="px-4 py-3.5 text-right">
                  <Button
                    size="sm"
                    variant="primary"
                    className="text-xs bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => openRequestForCrop('Green Chilli', fpo.chilliPrice || '₹44 / kg')}
                  >
                    Send Request
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Physical Hub Network & Infrastructure Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hub Network */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>🏢</span> Operational Collection Hubs ({fpo.hubsCount})
              </h3>
              <p className="text-xs text-slate-500">Physical aggregation points with digital weighment</p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              All Hubs Online
            </span>
          </div>

          <div className="space-y-2.5">
            {fpo.hubNames.map((hub, idx) => (
              <div
                key={hub}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[11px]">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-900">{hub}</h4>
                    <p className="text-[11px] text-slate-500">Digital Scale • Dual-Slip Thermal Printer • QA Bay</p>
                  </div>
                </div>
                <span className="text-emerald-700 font-semibold bg-white px-2 py-1 rounded border border-slate-200">
                  Active Intake
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Assurance & Cold Chain */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>🔬</span> Quality Assurance & Traceability
            </h3>
            <p className="text-xs text-slate-500">End-to-end standard operating procedures</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
              <strong className="text-emerald-950 font-semibold flex items-center gap-1.5">
                <span>🧾</span> Dual-Slip Gate Verification
              </strong>
              <p className="text-emerald-800 leading-relaxed">
                Farmers receive high-speed thermal slips directly at the weighing bridge. Voice IVR sends SMS verification in Telugu & Hindi with no smartphone dependency required.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <strong className="text-slate-900 font-semibold flex items-center gap-1.5">
                <span>🚚</span> Dispatch SLA Guarantee
              </strong>
              <p className="text-slate-600 leading-relaxed">
                Aggregated lots are packed and loaded onto dock transport within 18 hours of harvest to preserve brix levels and moisture grade.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-1">
              <strong className="text-blue-950 font-semibold flex items-center gap-1.5">
                <span>📞</span> FPO Procurement Desk
              </strong>
              <p className="text-blue-800">
                Contact Officer: <strong>{fpo.contactPerson}</strong> • Phone: {fpo.phone} • Email: {fpo.email}
              </p>
            </div>
          </div>
        </div>
      </div>

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
