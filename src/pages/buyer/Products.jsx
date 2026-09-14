import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import {
  quickCategories,
  recentSearches,
  mockCommoditiesCatalog,
  mockFPOs
} from '../../data/buyerData'

export default function Products() {
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedGrade, setSelectedGrade] = useState('All')
  const [selectedQuantity, setSelectedQuantity] = useState('1000')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [selectedTimeframe, setSelectedTimeframe] = useState('Within 7 days')

  const handleSearch = (e) => {
    e?.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery.trim()) params.append('q', searchQuery.trim())
    if (selectedCategory !== 'All') params.append('category', selectedCategory)
    if (selectedGrade !== 'All') params.append('grade', selectedGrade)
    if (selectedQuantity) params.append('qty', selectedQuantity)
    if (selectedLocation !== 'All') params.append('location', selectedLocation)
    if (selectedTimeframe) params.append('timeframe', selectedTimeframe)

    navigate(`/buyer/products/results?${params.toString()}`)
  }

  const handleQuickClick = (term) => {
    navigate(`/buyer/products/results?q=${encodeURIComponent(term)}&qty=${selectedQuantity}&grade=${selectedGrade}`)
  }

  const filteredCatalog = selectedCategory === 'All'
    ? mockCommoditiesCatalog
    : mockCommoditiesCatalog.filter((c) => c.category.toLowerCase() === selectedCategory.toLowerCase())

  return (
    <div className="space-y-8">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-block mb-1.5">
            DISCOVERY CATALOG // AGRICULTURAL SUPPLY
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Find <span className="italic font-normal">Agricultural Products</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Search crops, vegetables, and grains aggregated at regional FPO collection centers.
          </p>
        </div>

        <Link
          to="/buyer/fpos"
          className="py-2.5 px-5 rounded-[100px] bg-[#e6ecd5] hover:bg-[#c3cda7]/60 text-[#1b6e53] border border-[#c3cda7] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition"
        >
          <span className="material-symbols-outlined text-[18px]">apartment</span>
          <span>FPO Directory</span>
        </Link>
      </div>

      {/* 2. Main Search & Filter Console */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-8 shadow-xs space-y-6">
        <form onSubmit={handleSearch} className="space-y-6">
          {/* Main Search Bar */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#1b6e53] mb-2">
              Primary Crop Keyword
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[22px] text-[#6d6d6d]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crops, vegetables, fruits (e.g. Tomato, Onion, Potato, Rice, Banana)..."
                className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base bg-[#f1efdf]/50 border border-[#c3cda7] rounded-[100px] text-[#212529] placeholder-[#6d6d6d] focus:outline-none focus:ring-2 focus:ring-[#1b6e53] focus:bg-[#ffffff] transition"
              />
            </div>
          </div>

          {/* Filter Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-1">
            {/* Category */}
            <div>
              <label className="block text-[11px] font-semibold text-[#353535] mb-1.5 font-mono uppercase tracking-wider">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs font-medium px-3.5 py-2.5 bg-[#f1efdf]/40 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
              >
                <option value="All">All Categories</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains &amp; Cereals</option>
                <option value="Pulses">Pulses &amp; Legumes</option>
                <option value="Spices">Spices</option>
              </select>
            </div>

            {/* Grade */}
            <div>
              <label className="block text-[11px] font-semibold text-[#353535] mb-1.5 font-mono uppercase tracking-wider">
                Grade Spec
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full text-xs font-medium px-3.5 py-2.5 bg-[#f1efdf]/40 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
              >
                <option value="All">All Commercial Grades</option>
                <option value="Grade A">Grade A (Premium)</option>
                <option value="Grade B">Grade B (Standard)</option>
                <option value="Export Grade">Export Grade (Optical Sorted)</option>
                <option value="Organic Certified">Organic Certified</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-[11px] font-semibold text-[#353535] mb-1.5 font-mono uppercase tracking-wider">
                Target Volume
              </label>
              <select
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(e.target.value)}
                className="w-full text-xs font-medium px-3.5 py-2.5 bg-[#f1efdf]/40 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
              >
                <option value="500">500 kg (Small Bulk)</option>
                <option value="1000">1,000 kg (1 MT)</option>
                <option value="2500">2,500 kg (2.5 MT)</option>
                <option value="5000">5,000 kg (5 MT)</option>
                <option value="10000">10,000+ kg (Commercial)</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-[11px] font-semibold text-[#353535] mb-1.5 font-mono uppercase tracking-wider">
                FPO Belt / Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full text-xs font-medium px-3.5 py-2.5 bg-[#f1efdf]/40 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
              >
                <option value="All">All Regional Belts</option>
                <option value="East Godavari">East Godavari, AP</option>
                <option value="West Godavari">West Godavari, AP</option>
                <option value="Krishna District">Krishna District, AP</option>
                <option value="Nashik">Nashik Belt, MH</option>
                <option value="Kheda">Kheda / Anand, GJ</option>
              </select>
            </div>

            {/* Timeframe */}
            <div>
              <label className="block text-[11px] font-semibold text-[#353535] mb-1.5 font-mono uppercase tracking-wider">
                Delivery Window
              </label>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="w-full text-xs font-medium px-3.5 py-2.5 bg-[#f1efdf]/40 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
              >
                <option value="Urgent (< 48 hrs)">Urgent (&lt; 48 hrs)</option>
                <option value="Within 7 days">Within 7 days</option>
                <option value="Within 14 days">Within 14 days</option>
                <option value="Monthly Forward Contract">Monthly Contract</option>
              </select>
            </div>
          </div>

          {/* Action Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#c3cda7]/50">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-[#6d6d6d] uppercase tracking-wider">
                Recently Searched:
              </span>
              {recentSearches.map((crop) => (
                <button
                  key={crop}
                  type="button"
                  onClick={() => handleQuickClick(crop)}
                  className="text-xs px-3 py-1 rounded-[100px] bg-[#f1efdf] hover:bg-[#e8fe85] hover:text-[#1b6e53] text-[#212529] font-medium border border-[#c3cda7] transition cursor-pointer"
                >
                  {crop}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto py-3 px-8 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99] cursor-pointer"
            >
              <span>Search Available FPOs</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </form>
      </section>

      {/* 3. Quick Commodity Categories */}
      <section className="space-y-3">
        <div className="text-[10px] uppercase font-mono tracking-widest text-[#6d6d6d]">
          COMMODITY CATEGORIES // QUICK SELECT
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {quickCategories.map((cat) => {
            const isSelected = selectedCategory === cat.name
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(isSelected ? 'All' : cat.name)
                }}
                className={`p-4 rounded-[20px] border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#e8fe85] border-[#1b6e53] text-[#1b6e53] shadow-xs'
                    : 'bg-[#ffffff] border-[#c3cda7] hover:bg-[#f1efdf] text-[#212529]'
                }`}
              >
                <span className="text-2xl block mb-2">{cat.icon}</span>
                <h4 className="font-editorial text-lg font-bold leading-tight">{cat.name}</h4>
                <p className="text-[11px] text-[#6d6d6d] font-mono mt-0.5">{cat.count}</p>
              </button>
            )
          })}
        </div>
      </section>

      {/* 4. Live Seasonal Produce Discovery Grid */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#c3cda7]/50">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-2 py-0.5 rounded-full border border-[#c3cda7] inline-block mb-1">
              LIVE HARVEST CAPACITIES
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight">
              Featured Regional Commodities
            </h2>
          </div>
          <span className="text-xs font-mono text-[#6d6d6d]">
            Showing {filteredCatalog.length} commodities aggregated at hubs
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCatalog.map((commodity) => (
            <div
              key={commodity.id}
              className="rounded-[20px] bg-[#f1efdf] border border-[#c3cda7] p-5 flex flex-col justify-between hover:shadow-md hover:border-[#1b6e53] transition space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-[#ffffff] rounded-[16px] border border-[#c3cda7]">
                      {commodity.icon}
                    </span>
                    <div>
                      <h3 className="font-editorial text-2xl font-bold text-[#00372a] leading-tight">
                        {commodity.name}
                      </h3>
                      <span className="text-[11px] font-mono text-[#6d6d6d]">{commodity.category}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1b6e53] bg-[#e6ecd5] px-2 py-0.5 rounded-full border border-[#c3cda7]">
                    {commodity.seasonality}
                  </span>
                </div>

                <div className="space-y-2 text-xs py-3 border-y border-[#c3cda7]/50">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#6d6d6d]">Indicative Price Band:</span>
                    <span className="font-bold text-[#683600] font-mono text-sm">{commodity.indicativePriceRange}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#6d6d6d]">Aggregated Capacity:</span>
                    <span className="font-bold text-[#1b6e53] font-mono">{commodity.aggregatedCapacity}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#6d6d6d]">Connected FPOs:</span>
                    <span className="font-semibold text-[#00372a] font-mono">{commodity.activeFpos} Active FPOs</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleQuickClick(commodity.name)}
                className="w-full py-2.5 px-4 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold text-center transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>View Matching FPOs</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
