import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
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
    <div className="space-y-8 pb-12">
      {/* 1. Page Header */}
      <PageHeader
        title="Find Agricultural Products"
        description="Search institutional crop lots directly aggregated from verified Farmer Producer Organizations (FPOs) and regional collection hubs."
        actions={
          <Link to="/buyer/fpos">
            <Button variant="outline" className="text-xs">
              🏢 Browse by FPO Directory
            </Button>
          </Link>
        }
      />

      {/* 2. Primary Search & Filter Workspace */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <form onSubmit={handleSearch} className="space-y-6">
          {/* Main Search Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Product Search Keyword
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 text-lg">
                🔍
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crops, vegetables, fruits (e.g. Tomato, Onion, Potato, Rice, Banana)..."
                className="w-full pl-12 pr-4 py-3.5 text-base bg-slate-50/70 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white placeholder:text-slate-400 transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Filter Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-1">
            {/* Product / Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="All">All Categories</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains & Cereals</option>
                <option value="Pulses">Pulses & Legumes</option>
                <option value="Spices">Spices</option>
              </select>
            </div>

            {/* Grade */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Grade
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Quantity (kg)
              </label>
              <select
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="500">500 kg (Small Bulk)</option>
                <option value="1000">1,000 kg (1 MT)</option>
                <option value="2500">2,500 kg (2.5 MT)</option>
                <option value="5000">5,000 kg (5 MT)</option>
                <option value="10000">10,000+ kg (Commercial Fleet)</option>
              </select>
            </div>

            {/* Location / Belt */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                FPO Location / Belt
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="All">All FPO Belts</option>
                <option value="East Godavari">East Godavari, AP</option>
                <option value="West Godavari">West Godavari, AP</option>
                <option value="Krishna District">Krishna District, AP</option>
                <option value="Nashik">Nashik Belt, MH</option>
                <option value="Kheda">Kheda / Anand, GJ</option>
              </select>
            </div>

            {/* Delivery Timeframe */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Delivery Timeframe
              </label>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="Urgent (< 48 hrs)">Urgent (&lt; 48 hrs)</option>
                <option value="Within 7 days">Within 7 days</option>
                <option value="Within 14 days">Within 14 days</option>
                <option value="Monthly Forward Contract">Monthly Forward Contract</option>
              </select>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Recently Searched:</span>
              {recentSearches.map((crop) => (
                <button
                  key={crop}
                  type="button"
                  onClick={() => handleQuickClick(crop)}
                  className="text-xs px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-medium transition-colors"
                >
                  {crop}
                </button>
              ))}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto px-8 bg-emerald-600 hover:bg-emerald-700 font-semibold shadow-sm"
            >
              Search →
            </Button>
          </div>
        </form>
      </div>

      {/* 3. Quick Categories */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Quick Commodity Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickCategories.map((cat) => {
            const isSelected = selectedCategory === cat.name
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(isSelected ? 'All' : cat.name)
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50/80 shadow-2xs'
                }`}
              >
                <span className="text-2xl block mb-2">{cat.icon}</span>
                <h4 className="text-sm font-bold text-slate-900">{cat.name}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{cat.count}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* 4. Live Seasonal Produce Discovery Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Featured Harvest Catalog
            </h3>
            <p className="text-xs text-slate-500">
              Live aggregated commodities ready for forward procurement requests
            </p>
          </div>
          <span className="text-xs text-slate-400">
            Showing {filteredCatalog.length} commodities
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCatalog.map((commodity) => (
            <div
              key={commodity.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-slate-50 rounded-xl border border-slate-100">
                      {commodity.icon}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{commodity.name}</h4>
                      <span className="text-xs text-slate-500">{commodity.category}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {commodity.seasonality}
                  </span>
                </div>

                <div className="space-y-2 text-xs pt-1">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Indicative Price Band:</span>
                    <span className="font-bold text-slate-800">{commodity.indicativePriceRange}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Aggregated Capacity:</span>
                    <span className="font-semibold text-slate-800">{commodity.aggregatedCapacity}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Verified FPO Suppliers:</span>
                    <span className="font-semibold text-emerald-700">{commodity.activeFpos} Active FPOs</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-slate-400 block text-[11px] mb-1">Standard Grades:</span>
                    <div className="flex flex-wrap gap-1">
                      {commodity.grades.map((g) => (
                        <span key={g} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickClick(commodity.name)}
                  className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors text-center cursor-pointer"
                >
                  View Available FPO Suppliers →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
