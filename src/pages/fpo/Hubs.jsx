import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { getStoredFpoHubs } from '../../data/fpoHubsData'

export default function FPOHubs() {
  const [hubs, setHubs] = useState(getStoredFpoHubs())

  useEffect(() => {
    const handleUpdate = () => {
      setHubs(getStoredFpoHubs())
    }
    window.addEventListener('farmlink-fpo-hubs-updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('farmlink-fpo-hubs-updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  const totalCapacity = hubs.reduce((sum, h) => sum + (Number(h.capacity) || 0), 0)
  const totalAllocated = hubs.reduce((sum, h) => sum + (Number(h.allocatedCapacity) || 0), 0)
  const totalFarmers = hubs.reduce((sum, h) => sum + (Number(h.assignedFarmers) || 0), 0)

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
      case 'Available':
        return 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]'
      case 'Near Capacity':
        return 'bg-[#fceace] text-[#683600] border-[#c3cda7]'
      case 'Maintenance':
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
              <span>NETWORK HUBS // AGGREGATION &amp; WEIGHBRIDGE</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff] border border-[#c3cda7] text-[#1b6e53] font-mono text-[10px] font-bold">
              {hubs.length} Hubs Connected
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            All <span className="italic font-normal">Hubs</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Manage your physical aggregation hubs, bay weighing scales, cold storage rooms, and farmer cluster allocations.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="flex items-center gap-3">
          <Link
            to="/fpo/hubs/add"
            className="px-5 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ Add Hub</span>
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Active Hubs</div>
          <div className="font-editorial text-3xl font-bold text-[#00372a] mt-1">{hubs.length} Hubs</div>
          <div className="text-[11px] font-mono text-[#1b6e53] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">domain</span>
            <span>100% operational online link</span>
          </div>
        </div>

        <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Total Aggregation Capacity</div>
          <div className="font-editorial text-3xl font-bold text-[#1b6e53] mt-1">
            {totalCapacity.toLocaleString('en-IN')} kg / day
          </div>
          <div className="text-[11px] font-mono text-[#6d6d6d] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">scale</span>
            <span>{totalAllocated.toLocaleString('en-IN')} kg active intake</span>
          </div>
        </div>

        <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Assigned Farmers</div>
          <div className="font-editorial text-3xl font-bold text-[#683600] mt-1">
            {totalFarmers} Smallholders
          </div>
          <div className="text-[11px] font-mono text-[#1b6e53] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">groups</span>
            <span>Cluster assigned routing</span>
          </div>
        </div>
      </div>

      {/* 3. Hubs Table Section */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center border border-[#c3cda7]">
              <span className="material-symbols-outlined text-[20px]">hub</span>
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                Hub Infrastructure Register
              </h3>
              <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                Real-time collection point capacities, assigned smallholder counts, and supported produce lines.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono text-[#1b6e53] bg-[#f1efdf] px-3 py-1 rounded-[100px] border border-[#c3cda7]">
            {hubs.length} Hubs Listed
          </span>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[850px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">Hub ID &amp; Name</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4 text-right">Capacity &amp; Utilization</th>
                <th className="py-3 px-4 text-center">Assigned Farmers</th>
                <th className="py-3 px-4">Product Capability</th>
                <th className="py-3 px-4 text-center">Operating Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              {hubs.map((hub) => {
                const capacity = Number(hub.capacity) || 0
                const allocated = Number(hub.allocatedCapacity) || 0
                const utilizationPct = capacity > 0 ? Math.round((allocated / capacity) * 100) : 0

                return (
                  <tr key={hub.id} className="hover:bg-[#faf9f0] transition">
                    {/* Hub ID & Name */}
                    <td className="py-4 px-4 font-sans">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                          <span className="material-symbols-outlined text-[16px]">warehouse</span>
                        </div>
                        <div>
                          <span className="font-bold text-sm text-[#00372a] font-editorial block">
                            {hub.name}
                          </span>
                          <span className="text-[10px] text-[#1b6e53] font-mono font-bold">{hub.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-4 font-sans">
                      <span className="font-medium text-[#212529] block truncate max-w-[160px]">
                        {hub.location}
                      </span>
                      <span className="text-[10px] text-[#6d6d6d] block truncate max-w-[160px] font-mono">
                        {hub.contactPerson || 'Nodal Manager'}
                      </span>
                    </td>

                    {/* Capacity & Utilization */}
                    <td className="py-4 px-4 text-right font-mono">
                      <span className="font-extrabold text-[#1b6e53] text-sm block">
                        {capacity.toLocaleString('en-IN')} {hub.capacityUnit || 'kg'}
                      </span>
                      <span className="text-[10px] text-[#6d6d6d]">
                        {utilizationPct}% Utilized ({allocated} kg used)
                      </span>
                    </td>

                    {/* Assigned Farmers */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f1efdf] text-[#00372a] text-[11px] font-mono font-bold border border-[#c3cda7]">
                        <span className="material-symbols-outlined text-[13px] text-[#1b6e53]">groups</span>
                        <span>{hub.assignedFarmers} Farmers</span>
                      </span>
                    </td>

                    {/* Product Capability */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {hub.supportedProducts?.map((crop) => (
                          <span
                            key={crop}
                            className="px-2 py-0.5 rounded-md bg-[#e6ecd5] text-[#1b6e53] text-[10px] font-medium border border-[#c3cda7]/60"
                          >
                            {crop}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Operating Status */}
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-[100px] text-[10px] font-bold uppercase tracking-wider border font-mono ${getStatusBadge(
                          hub.operatingStatus || hub.status
                        )}`}
                      >
                        {hub.operatingStatus || hub.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap font-sans">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/fpo/hubs/${hub.id}`}
                          className="py-1.5 px-3 rounded-[100px] bg-[#ffffff] hover:bg-[#faf9f0] text-[#1b6e53] border border-[#c3cda7] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1 cursor-pointer"
                          title="View Hub Details"
                        >
                          <span className="material-symbols-outlined text-[14px]">visibility</span>
                          <span>View</span>
                        </Link>

                        <Link
                          to={`/fpo/hubs/${hub.id}/edit`}
                          className="py-1.5 px-3 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1 cursor-pointer"
                          title="Edit Hub"
                        >
                          <span className="material-symbols-outlined text-[14px]">edit</span>
                          <span>Edit</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
