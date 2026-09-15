import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { getStoredFpoFarmers } from '../../data/fpoFarmersData'
import { getStoredFpoHubs } from '../../data/fpoHubsData'

export default function Farmers() {
  const [farmers, setFarmers] = useState(getStoredFpoFarmers())
  const [hubs, setHubs] = useState(getStoredFpoHubs())

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedHub, setSelectedHub] = useState('ALL')
  const [selectedCrop, setSelectedCrop] = useState('ALL')
  const [selectedStatus, setSelectedStatus] = useState('ALL')

  useEffect(() => {
    const handleUpdate = () => {
      setFarmers(getStoredFpoFarmers())
      setHubs(getStoredFpoHubs())
    }
    window.addEventListener('farmlink-fpo-farmers-updated', handleUpdate)
    window.addEventListener('farmlink-fpo-hubs-updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('farmlink-fpo-farmers-updated', handleUpdate)
      window.removeEventListener('farmlink-fpo-hubs-updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  // Aggregate Metrics
  const totalFarmers = farmers.length
  const totalExpectedSupply = farmers.reduce((sum, f) => sum + (Number(f.expectedSupply) || 0), 0)
  const uniqueHubsCount = new Set(farmers.map((f) => f.primaryHubName || f.primaryHubId)).size

  // Extract unique filter options
  const allCrops = Array.from(
    new Set(
      farmers
        .flatMap((f) => [f.primaryCrop, f.otherCrops])
        .filter(Boolean)
        .flatMap((c) => c.split(',').map((x) => x.trim()))
    )
  )

  const allHubNames = Array.from(
    new Set(farmers.map((f) => f.primaryHubName).filter(Boolean))
  )

  // Filtered Farmers
  const filteredFarmers = farmers.filter((farmer) => {
    // Search query matches ID, Name, Village, District
    const query = searchQuery.toLowerCase().trim()
    const matchesQuery =
      !query ||
      farmer.id.toLowerCase().includes(query) ||
      farmer.name.toLowerCase().includes(query) ||
      (farmer.village && farmer.village.toLowerCase().includes(query)) ||
      (farmer.district && farmer.district.toLowerCase().includes(query))

    // Hub filter
    const matchesHub =
      selectedHub === 'ALL' ||
      farmer.primaryHubName === selectedHub ||
      farmer.primaryHubId === selectedHub

    // Crop filter
    const cropsCombined = `${farmer.primaryCrop || ''}, ${farmer.otherCrops || ''}`.toLowerCase()
    const matchesCrop = selectedCrop === 'ALL' || cropsCombined.includes(selectedCrop.toLowerCase())

    // Status filter
    const matchesStatus = selectedStatus === 'ALL' || farmer.status === selectedStatus

    return matchesQuery && matchesHub && matchesCrop && matchesStatus
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
      case 'Verified':
        return 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]'
      case 'Pending':
      case 'Pending KYC':
        return 'bg-[#fceace] text-[#683600] border-[#c3cda7]'
      case 'Inactive':
        return 'bg-[#f1efdf] text-[#6d6d6d] border-[#c3cda7]'
      default:
        return 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]'
    }
  }

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header & Primary Action */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53]"></span>
              <span>FPO FARMER MANAGEMENT // CLUSTER DIRECTORY</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff] border border-[#c3cda7] text-[#1b6e53] font-mono text-[10px] font-bold">
              {farmers.length} Farmers Enrolled
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            All <span className="italic font-normal">Farmers</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Registered smallholders under current FPO, primary aggregation hub routing, and seasonal expected supply.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="flex items-center gap-3">
          <Link
            to="/fpo/farmers/add"
            className="px-5 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>+ Add Farmer</span>
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Registered Farmers</div>
          <div className="font-editorial text-3xl font-bold text-[#00372a] mt-1">
            {totalFarmers} Smallholders
          </div>
          <div className="text-[11px] font-mono text-[#1b6e53] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">groups</span>
            <span>Direct mandi gate &amp; voice IVR linked</span>
          </div>
        </div>

        <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Total Expected Supply</div>
          <div className="font-editorial text-3xl font-bold text-[#1b6e53] mt-1">
            {totalExpectedSupply.toLocaleString('en-IN')} kg
          </div>
          <div className="text-[11px] font-mono text-[#6d6d6d] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">scale</span>
            <span>Aggregated seasonal harvest potential</span>
          </div>
        </div>

        <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Active Primary Hubs</div>
          <div className="font-editorial text-3xl font-bold text-[#683600] mt-1">
            {uniqueHubsCount} Hub Clusters
          </div>
          <div className="text-[11px] font-mono text-[#1b6e53] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">hub</span>
            <span>Single primary hub allocation rule</span>
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search by Name or ID */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider block">
              Search Farmer / ID
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, ID, village..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] transition-all"
              />
              <span className="material-symbols-outlined text-[16px] text-[#6d6d6d] absolute left-2.5 top-1/2 -translate-y-1/2">
                search
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6d6d6d] hover:text-[#212529] text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter by Hub */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider block">
              Primary Hub
            </label>
            <select
              value={selectedHub}
              onChange={(e) => setSelectedHub(e.target.value)}
              className="w-full px-3 py-2 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs focus:outline-none focus:border-[#1b6e53] transition-all cursor-pointer"
            >
              <option value="ALL">All Primary Hubs</option>
              {allHubNames.map((hubName) => (
                <option key={hubName} value={hubName}>
                  {hubName}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Crop */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider block">
              Crop
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3 py-2 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs focus:outline-none focus:border-[#1b6e53] transition-all cursor-pointer"
            >
              <option value="ALL">All Crops</option>
              {allCrops.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Status */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider block">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs focus:outline-none focus:border-[#1b6e53] transition-all cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {(searchQuery || selectedHub !== 'ALL' || selectedCrop !== 'ALL' || selectedStatus !== 'ALL') && (
          <div className="flex items-center gap-2 pt-2 border-t border-[#c3cda7]/40 flex-wrap text-xs font-mono">
            <span className="text-[#6d6d6d] text-[11px]">Active Filters:</span>
            {searchQuery && (
              <span className="px-2 py-0.5 rounded-md bg-[#e6ecd5] text-[#1b6e53] text-[11px]">
                Query: "{searchQuery}"
              </span>
            )}
            {selectedHub !== 'ALL' && (
              <span className="px-2 py-0.5 rounded-md bg-[#e6ecd5] text-[#1b6e53] text-[11px]">
                Hub: {selectedHub}
              </span>
            )}
            {selectedCrop !== 'ALL' && (
              <span className="px-2 py-0.5 rounded-md bg-[#e6ecd5] text-[#1b6e53] text-[11px]">
                Crop: {selectedCrop}
              </span>
            )}
            {selectedStatus !== 'ALL' && (
              <span className="px-2 py-0.5 rounded-md bg-[#e6ecd5] text-[#1b6e53] text-[11px]">
                Status: {selectedStatus}
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedHub('ALL')
                setSelectedCrop('ALL')
                setSelectedStatus('ALL')
              }}
              className="text-[#ba1a1a] hover:underline text-[11px] ml-auto cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* 4. Farmers Table Section */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center border border-[#c3cda7]">
              <span className="material-symbols-outlined text-[20px]">groups</span>
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                Registered Farmers Register
              </h3>
              <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                Showing {filteredFarmers.length} of {farmers.length} registered producers with assigned primary hub links.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono text-[#1b6e53] bg-[#f1efdf] px-3 py-1 rounded-[100px] border border-[#c3cda7]">
            {filteredFarmers.length} Matching Records
          </span>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[850px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">Farmer ID</th>
                <th className="py-3 px-4">Farmer Name</th>
                <th className="py-3 px-4">Primary Hub</th>
                <th className="py-3 px-4">Main Crops</th>
                <th className="py-3 px-4 text-right">Expected Supply</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Last Supply</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              {filteredFarmers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-[#6d6d6d] font-sans">
                    <div className="w-12 h-12 rounded-full bg-[#f1efdf] text-[#6d6d6d] flex items-center justify-center mx-auto mb-2">
                      <span className="material-symbols-outlined text-[24px]">search_off</span>
                    </div>
                    <p className="text-sm font-semibold text-[#00372a]">No matching farmers found</p>
                    <p className="text-xs text-[#6d6d6d] mt-0.5">
                      Try adjusting your search query or clear active filters.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredFarmers.map((farmer) => {
                  const crops = [farmer.primaryCrop, farmer.otherCrops]
                    .filter(Boolean)
                    .join(', ')

                  return (
                    <tr key={farmer.id} className="hover:bg-[#faf9f0] transition">
                      {/* Farmer ID */}
                      <td className="py-4 px-4 font-mono font-bold text-[#1b6e53] whitespace-nowrap">
                        <Link
                          to={`/fpo/farmers/${farmer.id}`}
                          className="hover:underline flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53]"></span>
                          <span>{farmer.id}</span>
                        </Link>
                      </td>

                      {/* Farmer Name */}
                      <td className="py-4 px-4 font-sans">
                        <Link
                          to={`/fpo/farmers/${farmer.id}`}
                          className="font-bold text-sm text-[#00372a] font-editorial block hover:text-[#1b6e53] transition"
                        >
                          {farmer.name}
                        </Link>
                        <span className="text-[10px] text-[#6d6d6d] block font-mono">
                          {farmer.village ? `${farmer.village}, ${farmer.district || ''}` : farmer.district || 'East Godavari'}
                        </span>
                      </td>

                      {/* Primary Hub */}
                      <td className="py-4 px-4 font-sans">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[15px] text-[#1b6e53]">hub</span>
                          <span className="font-semibold text-[#00372a]">
                            {farmer.primaryHubName || 'Rajahmundry Central Hub'}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#6d6d6d] font-mono block pl-5">
                          Designated Intake Hub
                        </span>
                      </td>

                      {/* Main Crops */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[180px]">
                          {crops.split(',').map((crop, idx) => {
                            const trimmed = crop.trim()
                            if (!trimmed) return null
                            return (
                              <span
                                key={idx}
                                className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                                  idx === 0
                                    ? 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]'
                                    : 'bg-[#f1efdf] text-[#353535] border-[#c3cda7]/60'
                                }`}
                              >
                                {trimmed}
                              </span>
                            )
                          })}
                        </div>
                      </td>

                      {/* Expected Supply */}
                      <td className="py-4 px-4 text-right font-mono">
                        <span className="font-extrabold text-[#1b6e53] text-sm block">
                          {Number(farmer.expectedSupply).toLocaleString('en-IN')} {farmer.supplyUnit || 'kg'}
                        </span>
                        <span className="text-[10px] text-[#6d6d6d]">
                          {farmer.gradeCapability || 'Grade A'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-[100px] text-[10px] font-bold uppercase tracking-wider border font-mono ${getStatusBadge(
                            farmer.status
                          )}`}
                        >
                          {farmer.status}
                        </span>
                      </td>

                      {/* Last Supply */}
                      <td className="py-4 px-4 font-mono text-[#353535] text-[11px] whitespace-nowrap">
                        {farmer.lastSupply || '—'}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap font-sans">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/fpo/farmers/${farmer.id}`}
                            className="py-1.5 px-3 rounded-[100px] bg-[#ffffff] hover:bg-[#faf9f0] text-[#1b6e53] border border-[#c3cda7] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1 cursor-pointer"
                            title="View Farmer Details"
                          >
                            <span className="material-symbols-outlined text-[14px]">visibility</span>
                            <span>View</span>
                          </Link>

                          <Link
                            to={`/fpo/farmers/${farmer.id}/assign-hub`}
                            className="py-1.5 px-3 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1 cursor-pointer"
                            title="Assign / Change Primary Hub"
                          >
                            <span className="material-symbols-outlined text-[14px]">hub</span>
                            <span>Assign Hub</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
