import React, { useState } from 'react'
import { Link } from 'react-router'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import ProcurementRequestModal from '../../components/buyer/ProcurementRequestModal'
import { mockFPOs } from '../../data/buyerData'

export default function FPOSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [selectedSort, setSelectedSort] = useState('reliability')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedFpoForRequest, setSelectedFpoForRequest] = useState(null)

  const handleOpenRequest = (fpo) => {
    setSelectedFpoForRequest(fpo)
    setModalOpen(true)
  }

  const filteredFPOs = mockFPOs.filter((fpo) => {
    const matchesSearch =
      fpo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fpo.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fpo.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fpo.products.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesProduct =
      selectedProduct === 'All' ||
      fpo.products.some((p) => p.toLowerCase() === selectedProduct.toLowerCase())

    const matchesLocation =
      selectedLocation === 'All' ||
      fpo.district.toLowerCase().includes(selectedLocation.toLowerCase()) ||
      fpo.state.toLowerCase().includes(selectedLocation.toLowerCase())

    return matchesSearch && matchesProduct && matchesLocation
  }).sort((a, b) => {
    if (selectedSort === 'reliability') {
      return parseFloat(b.reliabilityScore) - parseFloat(a.reliabilityScore)
    }
    if (selectedSort === 'farmers') {
      return b.farmerMembers - a.farmerMembers
    }
    if (selectedSort === 'hubs') {
      return b.hubsCount - a.hubsCount
    }
    return 0
  })

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <PageHeader
        title="Find FPO Suppliers"
        description="Discover verified Farmer Producer Organizations with certified aggregation hubs, cold chain infrastructure, and smallholder farmer clusters."
        actions={
          <Link to="/buyer/products">
            <Button variant="primary" size="sm" className="text-xs bg-emerald-600 hover:bg-emerald-700">
              🔍 Search by Product
            </Button>
          </Link>
        }
      />

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Main search bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm">
              🏢
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search FPO name, district, or produce (e.g. Godavari, Tomato, Nashik, Kheda)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50/70 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Product Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full text-xs font-medium px-3 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Commodities</option>
              <option value="Tomato">Tomato</option>
              <option value="Onion">Onion</option>
              <option value="Potato">Potato</option>
              <option value="Green Chilli">Green Chilli</option>
              <option value="Paddy">Paddy / Rice</option>
              <option value="Wheat">Wheat</option>
            </select>
          </div>

          {/* Location Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full text-xs font-medium px-3 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Regions</option>
              <option value="Godavari">Godavari Delta (AP)</option>
              <option value="Krishna">Krishna District (AP)</option>
              <option value="Nashik">Nashik Belt (MH)</option>
              <option value="Kheda">Kheda / Anand (GJ)</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="w-full md:w-48">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full text-xs font-medium px-3 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            >
              <option value="reliability">Sort: Highest Reliability</option>
              <option value="farmers">Sort: Farmer Base Size</option>
              <option value="hubs">Sort: Number of Hubs</option>
            </select>
          </div>
        </div>

        {/* Active Filters Summary */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <div>
            Showing <strong className="text-slate-800 font-semibold">{filteredFPOs.length}</strong> verified FPO organizations
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
              ✓ 100% SFAC / NABARD Verified
            </span>
            <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-medium">
              📦 Physical Collection Hubs
            </span>
          </div>
        </div>
      </div>

      {/* FPO Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFPOs.map((fpo) => (
          <div
            key={fpo.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            {/* Header info */}
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-slate-900">{fpo.name}</h3>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ✓ {fpo.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <span>📍</span> {fpo.location}, {fpo.district}, {fpo.state} ({fpo.pincode})
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{fpo.regNumber}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    ★ {fpo.rating} ({fpo.reviewsCount})
                  </span>
                </div>
              </div>

              {/* Tag badge */}
              <div className="mt-3">
                <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-100">
                  ✨ {fpo.badge}
                </span>
              </div>

              {/* Overview snippet */}
              <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-2">
                {fpo.overview}
              </p>
            </div>

            {/* Specifications Matrix */}
            <div className="bg-slate-50/90 rounded-xl p-4 space-y-2.5 text-xs border border-slate-200/70">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Products Supplied:</span>
                <div className="flex flex-wrap gap-1 justify-end max-w-xs">
                  {fpo.products.map((p) => (
                    <span key={p} className="bg-white border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded text-[11px] font-medium">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Total Aggregated Capacity:</span>
                <span className="font-bold text-slate-800">{fpo.approxCapacityVal}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Collection & Weighing Hubs:</span>
                <span className="font-semibold text-slate-800">{fpo.hubsCount} Active Hubs ({fpo.farmerMembers} Farmers)</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Reliability & On-Time Rate:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {fpo.reliabilityScore} Fulfillment
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Logistics Capability:</span>
                <span className="font-medium text-slate-700 text-right">{fpo.deliveryCapability}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
              <Link to={`/buyer/fpos/${fpo.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                  View Profile & Hubs
                </Button>
              </Link>
              <Button
                variant="primary"
                size="sm"
                className="flex-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700"
                onClick={() => handleOpenRequest(fpo)}
              >
                Send Request →
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Procurement Request Modal */}
      <ProcurementRequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={
          selectedFpoForRequest
            ? {
                fpoName: selectedFpoForRequest.name,
                product: selectedFpoForRequest.products[0],
                grade: 'Grade A',
                indicativePrice: selectedFpoForRequest.tomatoPrice
              }
            : {}
        }
      />
    </div>
  )
}
