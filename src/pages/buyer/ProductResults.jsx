import React, { useState } from 'react'
import { useSearchParams, Link } from 'react-router'
import ProcurementRequestModal from '../../components/buyer/ProcurementRequestModal'
import { productSearchResultsMock } from '../../data/buyerData'

export default function ProductResults() {
  const [searchParams] = useSearchParams()

  const queryCrop = searchParams.get('q') || 'Tomato'
  const queryQty = searchParams.get('qty') || '1,000'
  const queryGrade = searchParams.get('grade') || 'Grade A'
  const queryTimeframe = searchParams.get('timeframe') || '18 Sep 2026'

  const [viewMode, setViewMode] = useState('cards') // 'cards' | 'table'
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSupplierForRequest, setSelectedSupplierForRequest] = useState(null)
  const [filterMinReliability, setFilterMinReliability] = useState('all')

  const suppliers = productSearchResultsMock.fpoResults

  const filteredSuppliers = suppliers.filter((s) => {
    if (filterMinReliability === '98') {
      const num = parseFloat(s.reliability)
      return num >= 98
    }
    return true
  })

  const openRequestModal = (supplier) => {
    setSelectedSupplierForRequest(supplier)
    setModalOpen(true)
  }

  return (
    <div className="space-y-8">
      {/* 1. Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Link to="/buyer/products" className="text-[10px] font-mono text-[#1b6e53] font-bold hover:underline">
              ← BACK TO SEARCH PRODUCTS
            </Link>
            <span className="text-[#c3cda7]">/</span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              MATCHING FPO SUPPLIERS
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Available <span className="italic font-normal">FPO Suppliers</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Regional collection hubs with current aggregation capacity matching your specifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/buyer/products"
            className="py-2.5 px-5 rounded-[100px] bg-[#ffffff] hover:bg-[#f1efdf] text-[#212529] border border-[#c3cda7] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Refine Search</span>
          </Link>
          <button
            onClick={() => openRequestModal({ fpoName: 'All Regional FPOs (Multi-Broadcast)' })}
            className="py-2.5 px-5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">broadcast_on_home</span>
            <span>Broadcast RFQ</span>
          </button>
        </div>
      </div>

      {/* 2. Searched Product Top Banner */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-[20px] bg-[#f1efdf] border border-[#c3cda7] text-3xl flex items-center justify-center shrink-0">
              🍅
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="font-editorial text-3xl font-bold text-[#00372a]">
                  {queryCrop}
                </h2>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-[100px] bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]">
                  {queryGrade}
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-[100px] bg-[#b2cee7] text-[#00372a]">
                  {queryQty} kg Target
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6d6d6d] font-mono mt-1">
                <span>Required delivery: <strong className="text-[#212529]">{queryTimeframe}</strong></span>
                <span>•</span>
                <span>Destination: <strong className="text-[#212529]">Vijayawada Hub Dock</strong></span>
                <span>•</span>
                <span>Sourcing Zone: <strong className="text-[#1b6e53]">Godavari / Krishna Belt</strong></span>
              </div>
            </div>
          </div>

          {/* View toggle & Reliability Filter */}
          <div className="flex items-center gap-3 self-end lg:self-center">
            <select
              value={filterMinReliability}
              onChange={(e) => setFilterMinReliability(e.target.value)}
              className="text-xs px-3.5 py-2 bg-[#f1efdf]/60 border border-[#c3cda7] rounded-[100px] text-[#212529] font-mono font-medium focus:outline-none"
            >
              <option value="all">All Reliability Scores</option>
              <option value="98">&gt; 98% Fulfillment Only</option>
            </select>

            <div className="flex bg-[#f1efdf] p-1 rounded-[100px] border border-[#c3cda7] text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`px-3.5 py-1 rounded-[100px] transition cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-[#1b6e53] text-[#ffffff] font-bold shadow-xs'
                    : 'text-[#6d6d6d] hover:text-[#212529]'
                }`}
              >
                Cards
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`px-3.5 py-1 rounded-[100px] transition cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-[#1b6e53] text-[#ffffff] font-bold shadow-xs'
                    : 'text-[#6d6d6d] hover:text-[#212529]'
                }`}
              >
                Table
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Indicative Values & Discovery Notice matching Hero / Telemetry */}
      <section className="bg-[#fceace] border border-[#c3cda7] rounded-[20px] p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
        <div className="w-8 h-8 rounded-full bg-[#683600] text-[#ffffff] flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[18px]">info</span>
        </div>
        <div className="text-xs text-[#683600] space-y-0.5 font-sans">
          <strong className="font-bold block text-sm font-editorial text-[#00372a]">
            Discovery &amp; Indicative Pricing Protocol:
          </strong>
          <p className="leading-relaxed">
            Prices and aggregated capacities shown below are indicative market benchmarks from regional FPO hubs. Sending a Procurement Request does not place an order. You will receive formal binding offers from FPO managers after multi-farmer aggregation is planned.
          </p>
        </div>
      </section>

      {/* 4. Matching Suppliers (Cards or Table) */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 shadow-xs hover:border-[#1b6e53] hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                        {supplier.fpoName}
                      </h3>
                      <span className="text-[10px] font-mono font-bold text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">
                        ✓ Verified
                      </span>
                    </div>
                    <p className="text-xs text-[#6d6d6d] font-mono mt-0.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#1b6e53]">location_on</span>
                      {supplier.location}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#f1efdf] border border-[#c3cda7] text-xs font-bold text-[#683600] font-mono shrink-0">
                    ★ {supplier.rating} ({supplier.reviewsCount})
                  </span>
                </div>

                {/* Badge Tag */}
                <div>
                  <span className="text-[10px] font-mono font-bold bg-[#f1efdf] text-[#353535] px-2.5 py-1 rounded-[100px] border border-[#c3cda7]/60 inline-block">
                    🏷️ {supplier.tag}
                  </span>
                </div>

                {/* Specs Matrix */}
                <div className="bg-[#f1efdf] rounded-[18px] p-4 space-y-2.5 text-xs border border-[#c3cda7]/50 font-sans">
                  <div className="flex justify-between items-center">
                    <span className="text-[#6d6d6d]">Product Spec:</span>
                    <span className="font-semibold text-[#212529] font-mono">{supplier.product}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6d6d6d]">Available Capacity:</span>
                    <span className="font-bold text-[#1b6e53] font-mono text-sm bg-[#e6ecd5] px-2 py-0.5 rounded-md border border-[#c3cda7]/60">
                      {supplier.availableCapacity}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6d6d6d]">Indicative Rate:</span>
                    <span className="font-extrabold text-[#683600] font-mono text-base">
                      {supplier.indicativePrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6d6d6d]">Grade Offered:</span>
                    <span className="font-semibold text-[#212529]">{supplier.grade}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6d6d6d]">Delivery SLA:</span>
                    <span className="font-medium text-[#212529]">{supplier.deliveryCapability}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6d6d6d]">Reliability:</span>
                    <span className="font-bold text-[#1b6e53] font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53]"></span>
                      {supplier.reliability}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Strip */}
              <div className="pt-2 border-t border-[#c3cda7]/40 flex items-center gap-3">
                <Link
                  to={`/buyer/fpos/${supplier.id}`}
                  className="flex-1 py-2.5 rounded-[100px] bg-[#ffffff] border border-[#c3cda7] hover:bg-[#f1efdf] text-xs font-semibold text-[#353535] text-center transition"
                >
                  View Supplier
                </Link>
                <button
                  onClick={() => openRequestModal(supplier)}
                  className="flex-1 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold text-center transition shadow-xs cursor-pointer"
                >
                  Send Procurement Request →
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[650px]">
              <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
                <tr>
                  <th className="py-3 px-4">FPO Supplier</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Product &amp; Grade</th>
                  <th className="py-3 px-3 text-right">Available Capacity</th>
                  <th className="py-3 px-3 font-bold text-[#683600]">Indicative Rate</th>
                  <th className="py-3 px-3">Delivery SLA</th>
                  <th className="py-3 px-3">Reliability</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-[#faf9f0] transition">
                    <td className="py-3 px-4 font-semibold whitespace-nowrap">
                      <div>
                        <span className="font-editorial text-lg font-bold text-[#00372a] block leading-tight">
                          {supplier.fpoName}
                        </span>
                        <span className="text-[10px] font-mono text-[#6d6d6d]">
                          {supplier.hubsCount} Hubs
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-[#6d6d6d] font-mono text-[11px] whitespace-nowrap">
                      {supplier.location}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="font-medium text-[#212529] block">{supplier.product}</span>
                      <span className="text-[10px] font-mono bg-[#e6ecd5] text-[#1b6e53] px-1.5 py-0.5 rounded">
                        {supplier.grade}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-[#1b6e53] font-mono whitespace-nowrap">
                      {supplier.availableCapacity}
                    </td>
                    <td className="py-3 px-3 font-extrabold text-[#683600] font-mono text-sm whitespace-nowrap">
                      {supplier.indicativePrice}
                    </td>
                    <td className="py-3 px-3 text-[#353535] text-[11px] whitespace-nowrap">
                      {supplier.deliveryCapability}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 font-mono font-bold text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-0.5 rounded-full border border-[#c3cda7] text-[11px]">
                        ★ {supplier.rating} • {supplier.reliability}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                      <Link
                        to={`/buyer/fpos/${supplier.id}`}
                        className="py-1.5 px-3 rounded-[100px] border border-[#c3cda7] text-xs font-semibold text-[#353535] hover:bg-[#f1efdf] transition inline-block"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => openRequestModal(supplier)}
                        className="py-1.5 px-3 rounded-[100px] bg-[#1b6e53] text-[#ffffff] text-xs font-bold hover:bg-[#00372a] transition shadow-2xs cursor-pointer inline-block"
                      >
                        Send RFQ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Procurement Modal */}
      <ProcurementRequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={
          selectedSupplierForRequest
            ? {
                fpoName: selectedSupplierForRequest.fpoName,
                product: selectedSupplierForRequest.product || queryCrop,
                grade: selectedSupplierForRequest.grade || queryGrade,
                quantity: queryQty.replace(/[^0-9]/g, '') || '1000',
                indicativePrice: selectedSupplierForRequest.indicativePrice
              }
            : {
                product: queryCrop,
                grade: queryGrade,
                quantity: queryQty.replace(/[^0-9]/g, '') || '1000'
              }
        }
      />
    </div>
  )
}
