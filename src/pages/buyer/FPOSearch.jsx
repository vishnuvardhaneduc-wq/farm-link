import React, { useState } from 'react'
import { Link } from 'react-router'
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
    <div className="space-y-8">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-block mb-1.5">
            SUPPLIER DIRECTORY // FPO FEDERATIONS
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Find <span className="italic font-normal">FPO Suppliers</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Discover verified Farmer Producer Organizations with certified aggregation hubs and quality traceability.
          </p>
        </div>

        <Link
          to="/buyer/products"
          className="py-2.5 px-5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">search</span>
          <span>Search by Crop</span>
        </Link>
      </div>

      {/* 2. Filter & Search Matrix */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Main search bar */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#6d6d6d]">
              apartment
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search FPO name, district, or produce (e.g. Godavari, Tomato, Nashik, Kheda)..."
              className="w-full pl-11 pr-4 py-2.5 text-xs sm:text-sm bg-[#f1efdf]/50 border border-[#c3cda7] rounded-[100px] text-[#212529] placeholder-[#6d6d6d] focus:outline-none focus:ring-2 focus:ring-[#1b6e53] focus:bg-[#ffffff] transition font-sans"
            />
          </div>

          {/* Product Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full text-xs font-medium px-3.5 py-2.5 bg-[#f1efdf]/40 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
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
              className="w-full text-xs font-medium px-3.5 py-2.5 bg-[#f1efdf]/40 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
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
              className="w-full text-xs font-medium px-3.5 py-2.5 bg-[#f1efdf]/40 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
            >
              <option value="reliability">Sort: Highest Reliability</option>
              <option value="farmers">Sort: Farmer Base Size</option>
              <option value="hubs">Sort: Number of Hubs</option>
            </select>
          </div>
        </div>

        {/* Summary strip */}
        <div className="flex flex-wrap items-center justify-between text-xs text-[#6d6d6d] pt-2 border-t border-[#c3cda7]/40 font-mono">
          <div>
            Showing <strong className="text-[#00372a] font-bold">{filteredFPOs.length}</strong> verified FPO federations
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-0.5 rounded-[100px] font-bold border border-[#c3cda7]">
              ✓ SFAC / NABARD Registered
            </span>
          </div>
        </div>
      </section>

      {/* 3. FPO Results Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFPOs.map((fpo) => (
          <div
            key={fpo.id}
            className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 shadow-xs hover:border-[#1b6e53] hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            {/* Header info */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                      {fpo.name}
                    </h3>
                    <span className="text-[10px] font-mono font-bold text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">
                      ✓ {fpo.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#6d6d6d] font-mono mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-[#1b6e53]">location_on</span>
                    {fpo.location}, {fpo.district}, {fpo.state} ({fpo.pincode})
                  </p>
                  <p className="text-[10px] text-[#6d6d6d] font-mono mt-0.5">{fpo.regNumber}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#f1efdf] border border-[#c3cda7] text-xs font-bold text-[#683600] font-mono shrink-0">
                  ★ {fpo.rating} ({fpo.reviewsCount})
                </span>
              </div>

              {/* Tag badge */}
              <div>
                <span className="text-[10px] font-mono font-bold bg-[#e6ecd5] text-[#1b6e53] px-2.5 py-1 rounded-[100px] border border-[#c3cda7]">
                  ✨ {fpo.badge}
                </span>
              </div>

              {/* Overview snippet */}
              <p className="text-xs text-[#353535] leading-relaxed line-clamp-2 font-sans">
                {fpo.overview}
              </p>
            </div>

            {/* Specifications Matrix */}
            <div className="bg-[#f1efdf] rounded-[18px] p-4 space-y-2.5 text-xs border border-[#c3cda7]/50 font-sans">
              <div className="flex justify-between items-center">
                <span className="text-[#6d6d6d]">Products Supplied:</span>
                <div className="flex flex-wrap gap-1 justify-end max-w-xs">
                  {fpo.products.map((p) => (
                    <span key={p} className="bg-[#ffffff] border border-[#c3cda7]/60 text-[#212529] px-2 py-0.5 rounded text-[11px] font-medium font-mono">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#6d6d6d]">Total Aggregated Capacity:</span>
                <span className="font-bold text-[#1b6e53] font-mono">{fpo.approxCapacityVal}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#6d6d6d]">Collection &amp; Weighing Hubs:</span>
                <span className="font-semibold text-[#00372a] font-mono">{fpo.hubsCount} Active Hubs ({fpo.farmerMembers} Farmers)</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#6d6d6d]">Reliability SLA:</span>
                <span className="font-bold text-[#1b6e53] font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53]"></span>
                  {fpo.reliabilityScore} On-Time Fulfillment
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#6d6d6d]">Logistics Capability:</span>
                <span className="font-medium text-[#212529] text-right">{fpo.deliveryCapability}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-[#c3cda7]/40 flex items-center gap-3">
              <Link
                to={`/buyer/fpos/${fpo.id}`}
                className="flex-1 py-2.5 rounded-[100px] bg-[#ffffff] border border-[#c3cda7] hover:bg-[#f1efdf] text-xs font-semibold text-[#353535] text-center transition"
              >
                View Profile &amp; Hubs
              </Link>
              <button
                onClick={() => handleOpenRequest(fpo)}
                className="flex-1 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold text-center transition shadow-xs cursor-pointer"
              >
                Send Request →
              </button>
            </div>
          </div>
        ))}
      </section>

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
