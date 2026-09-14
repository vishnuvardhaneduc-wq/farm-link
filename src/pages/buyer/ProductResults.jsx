import React, { useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import StatusBadge from '../../components/ui/StatusBadge'
import ProcurementRequestModal from '../../components/buyer/ProcurementRequestModal'
import { productSearchResultsMock, mockFPOs } from '../../data/buyerData'

export default function ProductResults() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

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
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & PageHeader */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/buyer/products" className="hover:text-emerald-700">
          ← Back to Search Products
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">{queryCrop} Results</span>
      </div>

      <PageHeader
        title="Available Suppliers"
        description="Verified regional FPO collection hubs with current aggregation capacity matching your specifications."
        actions={
          <div className="flex items-center gap-2">
            <Link to="/buyer/products">
              <Button variant="outline" size="sm" className="text-xs">
                Modify Filters ⚙️
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              className="text-xs bg-emerald-600 hover:bg-emerald-700"
              onClick={() => openRequestModal({ fpoName: 'All Regional FPOs (Multi-Broadcast)' })}
            >
              + Broadcast Request to All FPOs
            </Button>
          </div>
        }
      />

      {/* 1. Searched Product Top Banner */}
      <div className="bg-white rounded-2xl border border-emerald-200/90 p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100/70 border border-emerald-200 text-2xl flex items-center justify-center shrink-0">
              🍅
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold text-slate-900">
                  {queryCrop}
                </h2>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {queryGrade}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  {queryQty} kg Target
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                <span>Required delivery: <strong className="text-slate-700">{queryTimeframe}</strong></span>
                <span>•</span>
                <span>Destination: <strong className="text-slate-700">Vijayawada Hub Dock</strong></span>
                <span>•</span>
                <span>Region: <strong className="text-slate-700">East & West Godavari / Krishna Belt</strong></span>
              </div>
            </div>
          </div>

          {/* View toggle & Reliability quick filter */}
          <div className="flex items-center gap-3 self-end lg:self-center">
            <select
              value={filterMinReliability}
              onChange={(e) => setFilterMinReliability(e.target.value)}
              className="text-xs px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 font-medium"
            >
              <option value="all">All Reliability Scores</option>
              <option value="98">&gt; 98% Fulfillment Only</option>
            </select>

            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  viewMode === 'cards'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cards View
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Table View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Critical Business Rule / Discovery Reminder Notice */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900">
        <span className="text-lg">ℹ️</span>
        <div>
          <strong className="font-semibold block text-amber-950">
            Discovery & Indicative Values Notice:
          </strong>
          <p className="mt-0.5 text-amber-800 leading-relaxed">
            Prices and aggregated capacities shown below are indicative market estimates from regional FPO hubs. Sending a Procurement Request does not finalize an order. You will receive formal, binding offers with confirmed lot test reports from FPOs to compare before selecting a supplier.
          </p>
        </div>
      </div>

      {/* 3. Matching FPO Suppliers Results */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        {supplier.fpoName}
                      </h3>
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-200">
                        ✓ Verified
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                      <span>📍</span> {supplier.location}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      ★ {supplier.rating} ({supplier.reviewsCount})
                    </span>
                  </div>
                </div>

                {/* Badge Tag */}
                <div className="mt-2.5">
                  <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                    🏷️ {supplier.tag}
                  </span>
                </div>
              </div>

              {/* Discovery Specs Table / Metric Grid */}
              <div className="bg-slate-50/80 rounded-xl p-3.5 space-y-2 text-xs border border-slate-200/60">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Product & Variety:</span>
                  <span className="font-semibold text-slate-900">{supplier.product}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Available Aggregated Capacity:</span>
                  <span className="font-bold text-slate-900 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {supplier.availableCapacity}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Indicative Price:</span>
                  <span className="font-extrabold text-slate-900 text-sm">
                    {supplier.indicativePrice}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Grade Offered:</span>
                  <span className="font-semibold text-slate-800">{supplier.grade}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Delivery Capability:</span>
                  <span className="font-medium text-slate-700">{supplier.deliveryCapability}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Reliability Indicator:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                    {supplier.reliability}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                <Link to={`/buyer/fpos/${supplier.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                    View Supplier Profile
                  </Button>
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => openRequestModal(supplier)}
                >
                  Send Procurement Request →
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-4 py-3.5">FPO Supplier</th>
                  <th className="px-4 py-3.5">Location</th>
                  <th className="px-4 py-3.5">Product & Grade</th>
                  <th className="px-4 py-3.5">Available Capacity</th>
                  <th className="px-4 py-3.5">Indicative Price</th>
                  <th className="px-4 py-3.5">Delivery Capability</th>
                  <th className="px-4 py-3.5">Reliability</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <span className="font-bold text-slate-900 block text-sm">
                          {supplier.fpoName}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {supplier.hubsCount} Aggregation Hubs
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {supplier.location}
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-semibold text-slate-800 block">
                        {supplier.product}
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {supplier.grade}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-bold text-emerald-700">
                      {supplier.availableCapacity}
                    </td>
                    <td className="px-4 py-4 font-extrabold text-slate-900 text-sm">
                      {supplier.indicativePrice}
                    </td>
                    <td className="px-4 py-4 text-slate-600 max-w-xs">
                      {supplier.deliveryCapability}
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                        ★ {supplier.rating} • {supplier.reliability}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right space-x-2 whitespace-nowrap">
                      <Link to={`/buyer/fpos/${supplier.id}`}>
                        <Button size="sm" variant="outline" className="text-xs">
                          View
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="primary"
                        className="text-xs"
                        onClick={() => openRequestModal(supplier)}
                      >
                        Send Request
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Help / Multi-FPO Comparison Tips */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-2">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          💡 Procurement Strategy Tip
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          You can send one Procurement Request to multiple FPO suppliers simultaneously. When Godavari Farmers FPO, Delta Agro, or Green Valley submit their lot bids, you will be able to review their aggregate quality inspection reports, weighment slip guarantees, and final landed prices on your <strong>My Requests / Demands</strong> dashboard before awarding the contract.
        </p>
      </div>

      {/* Interactive Modal */}
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
