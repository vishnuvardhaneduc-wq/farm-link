import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { getStoredFpoHubById } from '../../data/fpoHubsData'

export default function FPOHubDetail() {
  const { id } = useParams()
  const [hub, setHub] = useState(() => getStoredFpoHubById(id))
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'capacity' | 'hours' | 'capabilities'

  useEffect(() => {
    const handleUpdate = () => {
      const h = getStoredFpoHubById(id)
      if (h) setHub(h)
    }
    window.addEventListener('farmlink-fpo-hubs-updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('farmlink-fpo-hubs-updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [id])

  if (!hub) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-[32px]">hub</span>
        </div>
        <h2 className="font-editorial text-2xl font-bold text-[#00372a]">Hub Not Found</h2>
        <p className="text-xs text-[#6d6d6d]">The requested hub does not exist in your infrastructure registry.</p>
        <Link
          to="/fpo/hubs"
          className="px-6 py-2.5 rounded-full bg-[#1b6e53] text-white text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-1.5"
        >
          <span>Back to All Hubs</span>
        </Link>
      </div>
    )
  }

  const capacityVal = Number(hub.capacity) || 0
  const allocatedVal = Number(hub.allocatedCapacity) || 0
  const availableVal = Number(hub.availableCapacity) || Math.max(0, capacityVal - allocatedVal)
  const utilizationPct = capacityVal > 0 ? Math.round((allocatedVal / capacityVal) * 100) : 0
  const unit = hub.capacityUnit || 'kg'

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
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* 1. Header & Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Link
              to="/fpo/hubs"
              className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-flex items-center gap-1.5 hover:bg-[#dbe4c2] transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">arrow_back</span>
              <span>Back to All Hubs</span>
            </Link>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff] border border-[#c3cda7] text-[#1b6e53] font-mono text-[10px] font-bold">
              ID: {hub.id}
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            {hub.name} <span className="italic font-normal">Details</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Aggregation capacity, day-by-day operating hours, and produce line grading capabilities.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/fpo/hubs"
            className="px-5 py-2.5 rounded-[100px] bg-[#ffffff] hover:bg-[#faf9f0] text-[#353535] border border-[#c3cda7] text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
          >
            <span>Back to Hubs</span>
          </Link>

          <Link
            to={`/fpo/hubs/${hub.id}/edit`}
            className="px-5 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[17px]">edit</span>
            <span>Edit Hub</span>
          </Link>
        </div>
      </div>

      {/* 2. Primary Hub Overview Hero Card */}
      <section className="rounded-[28px] bg-[#ffffff] border border-[#c3cda7] p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-4 sm:gap-5 min-w-0">
            {/* Hub Emblem */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[22px] bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[36px] sm:text-[42px]">warehouse</span>
            </div>

            <div className="min-w-0 space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a] tracking-tight">
                  {hub.name}
                </h2>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono uppercase border ${getStatusBadge(
                    hub.operatingStatus || hub.status
                  )}`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#1b6e53] animate-pulse"></span>
                  <span>{hub.operatingStatus || hub.status}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#e6ecd5] text-[#1b6e53] text-[11px] font-bold font-mono uppercase border border-[#c3cda7]">
                  <span className="material-symbols-outlined text-[14px]">groups</span>
                  <span>{hub.assignedFarmers} Farmers</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#353535] flex items-center gap-2 flex-wrap font-sans">
                <span className="flex items-center gap-1 text-[#6d6d6d]">
                  <span className="material-symbols-outlined text-[16px] text-[#1b6e53]">location_on</span>
                  <span>{hub.location}</span>
                </span>
                <span className="text-[#c3cda7]">•</span>
                <span className="text-[#6d6d6d]">
                  Contact: <strong className="text-[#212529] font-medium">{hub.contactPerson || 'Nodal Manager'}</strong>
                </span>
                <span className="text-[#c3cda7]">•</span>
                <span className="font-mono text-[#1b6e53] font-semibold text-xs">
                  {hub.phoneNumber || '+91 XXXXX XXXXX'}
                </span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Summary Strip */}
          <div className="flex items-center gap-3 self-stretch lg:self-auto justify-between sm:justify-start">
            <div className="p-3.5 sm:px-5 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] text-center min-w-[95px]">
              <div className="text-[10px] font-mono text-[#6d6d6d] uppercase">Daily Intake</div>
              <div className="font-editorial text-2xl font-bold text-[#00372a]">{capacityVal} kg</div>
            </div>
            <div className="p-3.5 sm:px-5 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] text-center min-w-[95px]">
              <div className="text-[10px] font-mono text-[#6d6d6d] uppercase">Utilization</div>
              <div className="font-editorial text-2xl font-bold text-[#1b6e53]">{utilizationPct}%</div>
            </div>
            <div className="p-3.5 sm:px-5 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] text-center min-w-[95px]">
              <div className="text-[10px] font-mono text-[#6d6d6d] uppercase">Crops</div>
              <div className="font-editorial text-2xl font-bold text-[#683600]">
                {hub.supportedProducts?.length || 3}
              </div>
            </div>
          </div>
        </div>

        {/* Address & Operational Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="p-4 rounded-[18px] bg-[#f1efdf]/50 border border-[#c3cda7]/70">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6d6d6d] block">Physical Facility</span>
            <span className="text-xs font-medium text-[#212529] mt-1 block leading-snug">
              {hub.address || 'APMC Yard Feeder Platform'}
            </span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf]/50 border border-[#c3cda7]/70">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6d6d6d] block">Operating Schedule</span>
            <span className="text-xs font-bold text-[#00372a] mt-1 block">
              {hub.operatingDays || 'Monday – Saturday'}
            </span>
            <span className="text-[11px] font-mono text-[#1b6e53] mt-0.5 block">
              {hub.openingTime || '06:00 AM'} – {hub.closingTime || '06:00 PM'}
            </span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf]/50 border border-[#c3cda7]/70">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6d6d6d] block">Supported Products</span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {hub.supportedProducts?.map((crop) => (
                <span
                  key={crop}
                  className="px-2.5 py-0.5 rounded-full bg-[#e6ecd5] text-[#1b6e53] text-[10px] font-bold border border-[#c3cda7]"
                >
                  {crop}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Navigation Filter Strip for Quick Section Access */}
      <div className="flex items-center gap-2 border-b border-[#c3cda7]/60 pb-3 flex-wrap">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold font-sans uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#1b6e53] text-[#ffffff] shadow-xs'
              : 'bg-[#ffffff] text-[#353535] border border-[#c3cda7] hover:bg-[#faf9f0]'
          }`}
        >
          All Sections
        </button>
        <button
          onClick={() => setActiveTab('capacity')}
          className={`px-4 py-2 rounded-full text-xs font-bold font-sans uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'capacity'
              ? 'bg-[#1b6e53] text-[#ffffff] shadow-xs'
              : 'bg-[#ffffff] text-[#353535] border border-[#c3cda7] hover:bg-[#faf9f0]'
          }`}
        >
          Hub Capacity
        </button>
        <button
          onClick={() => setActiveTab('hours')}
          className={`px-4 py-2 rounded-full text-xs font-bold font-sans uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'hours'
              ? 'bg-[#1b6e53] text-[#ffffff] shadow-xs'
              : 'bg-[#ffffff] text-[#353535] border border-[#c3cda7] hover:bg-[#faf9f0]'
          }`}
        >
          Operating Hours
        </button>
        <button
          onClick={() => setActiveTab('capabilities')}
          className={`px-4 py-2 rounded-full text-xs font-bold font-sans uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'capabilities'
              ? 'bg-[#1b6e53] text-[#ffffff] shadow-xs'
              : 'bg-[#ffffff] text-[#353535] border border-[#c3cda7] hover:bg-[#faf9f0]'
          }`}
        >
          Product Capability
        </button>
      </div>

      {/* ============================================================ */}
      {/* 4. HUB CAPACITY & UTILIZATION SECTION                         */}
      {/* ============================================================ */}
      {(activeTab === 'all' || activeTab === 'capacity') && (
        <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#c3cda7]/50 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[20px]">scale</span>
              </div>
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a] leading-none">
                  Hub Capacity &amp; Utilization
                </h3>
                <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                  Current intake thresholds, committed farmer allocations, and available headroom.
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7]">
              {utilizationPct}% Active Utilization
            </span>
          </div>

          {/* 4 Metric KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Capacity */}
            <div className="p-5 rounded-[20px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
              <div className="flex items-center justify-between text-[#6d6d6d] text-xs font-mono">
                <span className="uppercase tracking-wider">Total Capacity</span>
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              </div>
              <div className="font-editorial text-3xl font-bold text-[#00372a]">
                {capacityVal.toLocaleString('en-IN')}{' '}
                <span className="text-base font-sans font-normal text-[#6d6d6d]">{unit}</span>
              </div>
              <p className="text-[11px] text-[#6d6d6d] font-mono">Maximum daily intake limit</p>
            </div>

            {/* Allocated Capacity */}
            <div className="p-5 rounded-[20px] bg-[#fceace]/50 border border-[#c3cda7] space-y-1">
              <div className="flex items-center justify-between text-[#683600] text-xs font-mono">
                <span className="uppercase tracking-wider">Allocated Capacity</span>
                <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
              </div>
              <div className="font-editorial text-3xl font-bold text-[#683600]">
                {allocatedVal.toLocaleString('en-IN')}{' '}
                <span className="text-base font-sans font-normal text-[#683600]">{unit}</span>
              </div>
              <p className="text-[11px] text-[#683600] font-mono">Committed to active orders</p>
            </div>

            {/* Available Capacity */}
            <div className="p-5 rounded-[20px] bg-[#e6ecd5] border border-[#c3cda7] space-y-1">
              <div className="flex items-center justify-between text-[#1b6e53] text-xs font-mono">
                <span className="uppercase tracking-wider">Available Capacity</span>
                <span className="material-symbols-outlined text-[18px]">add_box</span>
              </div>
              <div className="font-editorial text-3xl font-bold text-[#1b6e53]">
                {availableVal.toLocaleString('en-IN')}{' '}
                <span className="text-base font-sans font-normal text-[#1b6e53]">{unit}</span>
              </div>
              <p className="text-[11px] text-[#1b6e53] font-mono">Unallocated bay intake quota</p>
            </div>

            {/* Utilization Rate */}
            <div className="p-5 rounded-[20px] bg-[#b2cee7]/30 border border-[#c3cda7] space-y-1">
              <div className="flex items-center justify-between text-[#00372a] text-xs font-mono">
                <span className="uppercase tracking-wider">Utilization</span>
                <span className="material-symbols-outlined text-[18px]">donut_large</span>
              </div>
              <div className="font-editorial text-3xl font-bold text-[#00372a]">
                {utilizationPct}%
              </div>
              <p className="text-[11px] text-[#00372a] font-mono">
                {utilizationPct >= 85 ? 'Near Capacity' : 'Optimal Capacity'}
              </p>
            </div>
          </div>

          {/* Visual Utilization Bar */}
          <div className="p-4 rounded-[18px] bg-[#f1efdf]/60 border border-[#c3cda7] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#353535]">
                Bay Allocation: <strong>{allocatedVal} {unit} Used ({utilizationPct}%)</strong>
              </span>
              <span className="text-[#1b6e53] font-bold">
                {availableVal} {unit} Available ({100 - utilizationPct}%)
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#c3cda7]/50 overflow-hidden flex">
              <div
                className="bg-[#1b6e53] h-full transition-all"
                style={{ width: `${utilizationPct}%` }}
                title="Allocated"
              ></div>
              <div
                className="bg-[#e6ecd5] h-full transition-all"
                style={{ width: `${100 - utilizationPct}%` }}
                title="Available"
              ></div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 5. HUB OPERATING HOURS SECTION                                */}
      {/* ============================================================ */}
      {(activeTab === 'all' || activeTab === 'hours') && (
        <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-[#c3cda7]/50 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center border border-[#c3cda7]">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
              </div>
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a] leading-none">
                  Hub Operating Hours
                </h3>
                <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                  Weighbridge operating window for farmer arrivals and buyer dispatch trucks.
                </p>
              </div>
            </div>

            <span className="text-xs font-mono text-[#1b6e53] bg-[#f1efdf] px-3 py-1 rounded-[100px] border border-[#c3cda7]">
              Window: {hub.openingTime || '06:00 AM'} – {hub.closingTime || '06:00 PM'}
            </span>
          </div>

          {/* 7-Day Operating Hours Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {hub.operatingHoursSchedule?.map((schedule) => (
              <div
                key={schedule.day}
                className={`p-3.5 rounded-[16px] border text-center transition-all ${
                  schedule.isOpen
                    ? 'bg-[#ffffff] border-[#c3cda7] shadow-2xs hover:border-[#1b6e53]'
                    : 'bg-[#f1efdf]/60 border-[#c3cda7]/60 opacity-60'
                }`}
              >
                <span className="font-bold text-xs font-sans text-[#00372a] block mb-1">
                  {schedule.day}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold block ${
                    schedule.isOpen ? 'text-[#1b6e53]' : 'text-[#ba1a1a]'
                  }`}
                >
                  {schedule.hours}
                </span>
                <span
                  className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold border ${
                    schedule.isOpen
                      ? 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]'
                      : 'bg-[#f1efdf] text-[#6d6d6d] border-[#c3cda7]'
                  }`}
                >
                  {schedule.isOpen ? 'Open' : 'Closed'}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 6. HUB PRODUCT CAPABILITY SECTION                            */}
      {/* ============================================================ */}
      {(activeTab === 'all' || activeTab === 'capabilities') && (
        <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-[#c3cda7]/50 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[20px]">fact_check</span>
              </div>
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a] leading-none">
                  Hub Product Capability
                </h3>
                <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                  Crop handling capability used by the fulfillment engine for automated order routing.
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7]">
              {hub.productCapabilities?.length || hub.supportedProducts?.length || 0} Crops Supported
            </span>
          </div>

          {/* Capabilities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hub.productCapabilities?.map((cap) => (
              <div
                key={cap.crop}
                className="p-5 rounded-[20px] bg-[#ffffff] border border-[#c3cda7] shadow-2xs space-y-3 hover:border-[#1b6e53] transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center font-bold text-xs">
                      <span className="material-symbols-outlined text-[16px]">eco</span>
                    </div>
                    <div>
                      <h4 className="font-editorial text-xl font-bold text-[#00372a]">{cap.crop}</h4>
                      <span className="text-[10px] text-[#6d6d6d] font-mono">{cap.variety || 'Standard'}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#e6ecd5] text-[#1b6e53] text-[10px] font-mono font-bold border border-[#c3cda7]">
                    {cap.supportedGrades ? cap.supportedGrades.join(', ') : 'Grade A'}
                  </span>
                </div>

                <div className="p-3 rounded-[14px] bg-[#f1efdf]/60 border border-[#c3cda7]/60 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#6d6d6d] uppercase text-[10px]">Crop Capacity</span>
                    <span className="font-bold text-[#1b6e53]">{cap.capacity} {cap.unit || 'kg'}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#353535]">
                    <span>Allocated: {cap.allocated || 0} {cap.unit || 'kg'}</span>
                    <span>Free: {(cap.capacity || 0) - (cap.allocated || 0)} {cap.unit || 'kg'}</span>
                  </div>
                </div>

                {cap.features && (
                  <p className="text-[11px] text-[#6d6d6d] leading-snug flex items-start gap-1.5 pt-1">
                    <span className="material-symbols-outlined text-[14px] text-[#1b6e53] shrink-0 mt-0.5">
                      verified
                    </span>
                    <span>{cap.features}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
