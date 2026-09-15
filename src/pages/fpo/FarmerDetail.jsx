import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { getStoredFpoFarmerById } from '../../data/fpoFarmersData'

export default function FPOFarmerDetail() {
  const { id } = useParams()
  const [farmer, setFarmer] = useState(() => getStoredFpoFarmerById(id))

  useEffect(() => {
    const handleUpdate = () => {
      const f = getStoredFpoFarmerById(id)
      if (f) setFarmer(f)
    }
    window.addEventListener('farmlink-fpo-farmers-updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('farmlink-fpo-farmers-updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [id])

  if (!farmer) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-[32px]">person_off</span>
        </div>
        <h2 className="font-editorial text-2xl font-bold text-[#00372a]">Farmer Not Found</h2>
        <p className="text-xs text-[#6d6d6d]">The requested smallholder record does not exist in your directory.</p>
        <Link
          to="/fpo/farmers"
          className="px-6 py-2.5 rounded-full bg-[#1b6e53] text-white text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-1.5"
        >
          <span>Back to All Farmers</span>
        </Link>
      </div>
    )
  }

  const expectedSupply = Number(farmer.expectedSupply) || 0
  const allocatedQty = Number(farmer.allocatedQty) || Math.round(expectedSupply * 0.65)
  const collectedQty = Number(farmer.collectedQty) || Math.round(expectedSupply * 0.62)
  const acceptedQty = Number(farmer.acceptedQty) || Math.round(expectedSupply * 0.60)
  const unit = farmer.supplyUnit || 'kg'

  const crops = [farmer.primaryCrop, farmer.otherCrops].filter(Boolean).join(', ')

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
      case 'Verified':
        return 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]'
      case 'Pending':
        return 'bg-[#fceace] text-[#683600] border-[#c3cda7]'
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
              to="/fpo/farmers"
              className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-flex items-center gap-1.5 hover:bg-[#dbe4c2] transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">arrow_back</span>
              <span>Back to All Farmers</span>
            </Link>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff] border border-[#c3cda7] text-[#1b6e53] font-mono text-[10px] font-bold">
              ID: {farmer.id}
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            {farmer.name} <span className="italic font-normal">Profile</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Smallholder register profile, primary aggregation hub, seasonal allocations, and collection records.
          </p>
        </div>

        {/* Action Buttons Top Strip */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            to={`/fpo/farmers/${farmer.id}/assign-hub`}
            className="px-4 py-2 rounded-[100px] bg-[#ffffff] hover:bg-[#faf9f0] text-[#1b6e53] border border-[#c3cda7] text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">hub</span>
            <span>Assign Hub</span>
          </Link>

          <Link
            to={`/fpo/farmers/${farmer.id}/edit`}
            className="px-4 py-2 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-1.5 transition shadow-xs cursor-pointer active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            <span>Edit Farmer</span>
          </Link>
        </div>
      </div>

      {/* 2. Hero Profile Card */}
      <section className="rounded-[28px] bg-[#ffffff] border border-[#c3cda7] p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-4 sm:gap-5 min-w-0">
            {/* Avatar Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[22px] bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center shrink-0 border border-[#c3cda7] shadow-sm font-editorial text-2xl sm:text-3xl font-bold">
              {farmer.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>

            <div className="min-w-0 space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a] tracking-tight">
                  {farmer.name}
                </h2>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono uppercase border ${getStatusBadge(
                    farmer.status
                  )}`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#1b6e53] animate-pulse"></span>
                  <span>{farmer.status}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1b6e53] text-[#ffffff] text-[11px] font-bold font-mono uppercase">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  <span>{farmer.gradeCapability || 'Grade A'}</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#353535] flex items-center gap-2 flex-wrap font-sans">
                <span className="font-medium text-[#212529]">
                  {farmer.village ? `${farmer.village}, ${farmer.district || 'East Godavari'}` : farmer.district || 'East Godavari'}
                </span>
                <span className="text-[#c3cda7]">•</span>
                <span className="text-[#6d6d6d] font-mono">Phone: {farmer.phoneNumber || 'Not provided'}</span>
                <span className="text-[#c3cda7]">•</span>
                <span className="text-[#6d6d6d] font-mono">Last Supply: {farmer.lastSupply || 'Recent'}</span>
              </p>
            </div>
          </div>

          {/* Primary Hub Assignment Card */}
          <div className="p-4 rounded-[20px] bg-[#f1efdf] border border-[#c3cda7] text-left lg:text-right min-w-[240px]">
            <span className="text-[10px] font-mono text-[#6d6d6d] uppercase block">Designated Primary Hub</span>
            <div className="flex items-center gap-1.5 justify-start lg:justify-end mt-1">
              <span className="material-symbols-outlined text-[18px] text-[#1b6e53]">hub</span>
              <span className="font-editorial text-xl font-bold text-[#00372a]">
                {farmer.primaryHubName || 'Rajahmundry Central Hub'}
              </span>
            </div>
            <Link
              to={`/fpo/farmers/${farmer.id}/assign-hub`}
              className="text-[11px] font-mono text-[#1b6e53] hover:underline mt-1.5 inline-flex items-center gap-1"
            >
              <span>Change Primary Hub</span>
              <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Farmer Info Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="p-4 rounded-[18px] bg-[#f1efdf]/50 border border-[#c3cda7]/70">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6d6d6d] block">Primary Crop</span>
            <span className="text-sm font-bold text-[#00372a] mt-1 block">{farmer.primaryCrop || 'Tomato'}</span>
            <span className="text-[11px] text-[#6d6d6d] mt-1 block">
              Other crops: {farmer.otherCrops || 'None'}
            </span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf]/50 border border-[#c3cda7]/70">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6d6d6d] block">Grade Capability</span>
            <span className="text-sm font-bold text-[#1b6e53] font-mono mt-1 block">
              {farmer.gradeCapability || 'Grade A'}
            </span>
            <span className="text-[11px] text-[#1b6e53] mt-1 inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">verified</span>
              <span>Optical Sort Certified</span>
            </span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf]/50 border border-[#c3cda7]/70">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6d6d6d] block">Expected Volume</span>
            <span className="text-sm font-bold font-mono text-[#00372a] mt-1 block">
              {expectedSupply.toLocaleString('en-IN')} {unit}
            </span>
            <span className="text-[11px] text-[#6d6d6d] mt-1 block font-mono">Seasonal harvest target</span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf]/50 border border-[#c3cda7]/70">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6d6d6d] block">Weighment Slips</span>
            <span className="text-sm font-bold font-mono text-[#00372a] mt-1 block">
              {farmer.supplyHistory?.length || 3} Deliveries
            </span>
            <span className="text-[11px] text-[#1b6e53] mt-1 block font-semibold">Voice IVR receipt active</span>
          </div>
        </div>
      </section>

      {/* 3. Summary Cards: Expected, Allocated, Collected, Accepted */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight">
            Fulfillment &amp; Collection Summary
          </h3>
          <span className="text-xs font-mono text-[#6d6d6d]">Unit: {unit}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Expected Supply */}
          <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-[#6d6d6d] text-xs font-mono">
              <span className="uppercase tracking-wider">Expected Supply</span>
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            </div>
            <div className="font-editorial text-3xl font-bold text-[#00372a]">
              {expectedSupply.toLocaleString('en-IN')}{' '}
              <span className="text-sm font-sans font-normal text-[#6d6d6d]">{unit}</span>
            </div>
            <p className="text-[11px] text-[#6d6d6d] font-mono">Registered capacity</p>
          </div>

          {/* 2. Allocated Quantity */}
          <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-[#683600] text-xs font-mono">
              <span className="uppercase tracking-wider">Allocated Quantity</span>
              <span className="material-symbols-outlined text-[18px]">alt_route</span>
            </div>
            <div className="font-editorial text-3xl font-bold text-[#683600]">
              {allocatedQty.toLocaleString('en-IN')}{' '}
              <span className="text-sm font-sans font-normal text-[#683600]">{unit}</span>
            </div>
            <p className="text-[11px] text-[#683600] font-mono">Assigned to buyer orders</p>
          </div>

          {/* 3. Collected Quantity */}
          <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-[#1b6e53] text-xs font-mono">
              <span className="uppercase tracking-wider">Collected Quantity</span>
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            </div>
            <div className="font-editorial text-3xl font-bold text-[#1b6e53]">
              {collectedQty.toLocaleString('en-IN')}{' '}
              <span className="text-sm font-sans font-normal text-[#1b6e53]">{unit}</span>
            </div>
            <p className="text-[11px] text-[#1b6e53] font-mono">Weighed at Hub scale</p>
          </div>

          {/* 4. Accepted Quantity */}
          <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-[#1b6e53] text-xs font-mono">
              <span className="uppercase tracking-wider">Accepted Quantity</span>
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div className="font-editorial text-3xl font-bold text-[#1b6e53]">
              {acceptedQty.toLocaleString('en-IN')}{' '}
              <span className="text-sm font-sans font-normal text-[#1b6e53]">{unit}</span>
            </div>
            <p className="text-[11px] text-[#1b6e53] font-mono">Quality verified lot</p>
          </div>
        </div>
      </section>

      {/* 4. Navigation Action Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <Link
          to={`/fpo/farmers/${farmer.id}/assign-hub`}
          className="p-5 rounded-[22px] bg-[#ffffff] border border-[#c3cda7] hover:border-[#1b6e53] hover:shadow-xs transition group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">hub</span>
          </div>
          <h4 className="font-editorial text-lg font-bold text-[#00372a]">Assign / Change Hub</h4>
          <p className="text-xs text-[#6d6d6d] mt-1">
            Update the single designated primary aggregation hub for this smallholder.
          </p>
          <span className="text-xs font-bold text-[#1b6e53] mt-3 inline-flex items-center gap-1 font-mono">
            <span>Configure Hub</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </span>
        </Link>

        <Link
          to={`/fpo/farmers/${farmer.id}/supply-history`}
          className="p-5 rounded-[22px] bg-[#ffffff] border border-[#c3cda7] hover:border-[#1b6e53] hover:shadow-xs transition group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[#f1efdf] text-[#00372a] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">history</span>
          </div>
          <h4 className="font-editorial text-lg font-bold text-[#00372a]">View Supply History</h4>
          <p className="text-xs text-[#6d6d6d] mt-1">
            Examine past inward lots, allocated vs collected weights, and grade ratings.
          </p>
          <span className="text-xs font-bold text-[#1b6e53] mt-3 inline-flex items-center gap-1 font-mono">
            <span>View Supply Records</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </span>
        </Link>

        <Link
          to={`/fpo/farmers/${farmer.id}/settlements`}
          className="p-5 rounded-[22px] bg-[#ffffff] border border-[#c3cda7] hover:border-[#1b6e53] hover:shadow-xs transition group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">currency_rupee</span>
          </div>
          <h4 className="font-editorial text-lg font-bold text-[#00372a]">View Settlement History</h4>
          <p className="text-xs text-[#6d6d6d] mt-1">
            Review recorded payout calculations, agreed unit prices, and ledger records.
          </p>
          <span className="text-xs font-bold text-[#1b6e53] mt-3 inline-flex items-center gap-1 font-mono">
            <span>View Payout Ledger</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </span>
        </Link>
      </div>
    </div>
  )
}
