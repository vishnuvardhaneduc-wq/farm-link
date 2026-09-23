import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import { getStoredFpoProductById } from '../../data/fpoProductsData'

export default function FPOProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(() => getStoredFpoProductById(id))

  useEffect(() => {
    const handleUpdate = () => {
      const p = getStoredFpoProductById(id)
      if (p) setProduct(p)
    }
    window.addEventListener('farmlink-fpo-products-updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('farmlink-fpo-products-updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [id])

  if (!product) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-[32px]">inventory_2</span>
        </div>
        <h2 className="font-editorial text-2xl font-bold text-[#00372a]">Product Not Found</h2>
        <p className="text-xs text-[#6d6d6d]">The requested produce item does not exist in your catalog.</p>
        <Link
          to="/fpo/products"
          className="px-6 py-2.5 rounded-full bg-[#1b6e53] text-white text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-1.5"
        >
          <span>Back to Products</span>
        </Link>
      </div>
    )
  }

  const capacityVal = Number(product.capacity) || 0
  const reservedVal = Number(product.reservedQty) || 0
  const availableVal = Number(product.availableQty) || Math.max(0, capacityVal - reservedVal)
  const unit = product.unit || 'kg'

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
      case 'Available':
        return 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]'
      case 'Low Stock':
        return 'bg-[#fceace] text-[#683600] border-[#c3cda7]'
      case 'Seasonal':
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
              to="/fpo/products"
              className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-flex items-center gap-1.5 hover:bg-[#dbe4c2] transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">arrow_back</span>
              <span>Back to Products</span>
            </Link>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff] border border-[#c3cda7] text-[#1b6e53] font-mono text-[10px] font-bold">
              ID: {product.id}
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            {product.name} <span className="italic font-normal">Details</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Produce inventory profile, grade capabilities, and current warehouse availability.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/fpo/products"
            className="px-5 py-2.5 rounded-[100px] bg-[#ffffff] hover:bg-[#faf9f0] text-[#353535] border border-[#c3cda7] text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
          >
            <span>Back to Products</span>
          </Link>

          <Link
            to={`/fpo/products/${product.id}/edit`}
            className="px-5 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[17px]">edit</span>
            <span>Edit Product</span>
          </Link>
        </div>
      </div>

      {/* 2. Primary Product Overview Hero Card */}
      <section className="rounded-[28px] bg-[#ffffff] border border-[#c3cda7] p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-4 sm:gap-5 min-w-0">
            {/* Product Avatar Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[22px] bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center shrink-0 border border-[#c3cda7] shadow-sm">
              <span className="material-symbols-outlined text-[36px] sm:text-[42px]">eco</span>
            </div>

            <div className="min-w-0 space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a] tracking-tight">
                  {product.name}
                </h2>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono uppercase border ${getStatusBadge(
                    product.status
                  )}`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#1b6e53] animate-pulse"></span>
                  <span>{product.status}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1b6e53] text-[#ffffff] text-[11px] font-bold font-mono uppercase">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  <span>{product.grade || 'Grade A'}</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#353535] flex items-center gap-2 flex-wrap font-sans">
                <span className="font-medium text-[#212529]">Variety: {product.variety || 'Standard'}</span>
                <span className="text-[#c3cda7]">•</span>
                <span className="text-[#6d6d6d] font-mono">Min Supply: {product.minSupplyQty || '100 kg'}</span>
                <span className="text-[#c3cda7]">•</span>
                <span className="text-[#6d6d6d] font-mono">Updated: {product.lastUpdated || 'Today'}</span>
              </p>
            </div>
          </div>

          <div className="p-4 rounded-[20px] bg-[#f1efdf] border border-[#c3cda7] text-right min-w-[200px]">
            <span className="text-[10px] font-mono text-[#6d6d6d] uppercase block">Current Capacity</span>
            <span className="font-editorial text-3xl font-bold text-[#1b6e53] mt-0.5 block">
              {capacityVal.toLocaleString('en-IN')} {unit}
            </span>
            <span className="text-[11px] font-mono text-[#683600] mt-1 block">
              Available: {availableVal.toLocaleString('en-IN')} {unit}
            </span>
          </div>
        </div>

        {/* Specifications Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="p-4 rounded-[18px] bg-[#f1efdf]/50 border border-[#c3cda7]/70">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6d6d6d] block">Product Name</span>
            <span className="text-sm font-bold text-[#00372a] mt-1 block">{product.name}</span>
            <span className="text-[11px] text-[#6d6d6d] mt-1 block">{product.variety || 'Standard Variety'}</span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf]/50 border border-[#c3cda7]/70">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6d6d6d] block">Supported Grades</span>
            <span className="text-sm font-bold text-[#1b6e53] font-mono mt-1 block">
              {product.supportedGrades ? product.supportedGrades.join(', ') : product.grade || 'Grade A'}
            </span>
            <span className="text-[11px] text-[#1b6e53] mt-1 inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">verified</span>
              <span>Optical Assay Certified</span>
            </span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf]/50 border border-[#c3cda7]/70">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6d6d6d] block">Minimum Supply</span>
            <span className="text-sm font-bold font-mono text-[#00372a] mt-1 block">
              {product.minSupplyQty || '100 kg'}
            </span>
            <span className="text-[11px] text-[#6d6d6d] mt-1 block font-mono">Per procurement order</span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf]/50 border border-[#c3cda7]/70">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6d6d6d] block">Last Updated</span>
            <span className="text-sm font-bold font-mono text-[#00372a] mt-1 block">
              {product.lastUpdated || 'Today'}
            </span>
            <span className="text-[11px] text-[#1b6e53] mt-1 block font-semibold">Synced from Hub Scales</span>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT AVAILABILITY SECTION */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#c3cda7]/50 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">warehouse</span>
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a] leading-none">
                Product Availability
              </h3>
              <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                Real-time warehouse capacity, buyer allocations, and available quota.
              </p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono uppercase border ${getStatusBadge(
              product.availabilityStatus || 'Available'
            )}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53]"></span>
            <span>{product.availabilityStatus || 'Available'}</span>
          </span>
        </div>

        {/* 3-Column Breakdown Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* 1. Total Capacity */}
          <div className="p-5 rounded-[20px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
            <div className="flex items-center justify-between text-[#6d6d6d] text-xs font-mono">
              <span className="uppercase tracking-wider">Total Capacity</span>
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            </div>
            <div className="font-editorial text-3xl font-bold text-[#00372a]">
              {capacityVal.toLocaleString('en-IN')}{' '}
              <span className="text-base font-sans font-normal text-[#6d6d6d]">{unit}</span>
            </div>
            <p className="text-[11px] text-[#6d6d6d] font-mono">Total inward aggregate volume</p>
          </div>

          {/* 2. Reserved Quantity */}
          <div className="p-5 rounded-[20px] bg-[#fceace]/40 border border-[#c3cda7] space-y-1">
            <div className="flex items-center justify-between text-[#683600] text-xs font-mono">
              <span className="uppercase tracking-wider">Reserved Quantity</span>
              <span className="material-symbols-outlined text-[18px]">lock_clock</span>
            </div>
            <div className="font-editorial text-3xl font-bold text-[#683600]">
              {reservedVal.toLocaleString('en-IN')}{' '}
              <span className="text-base font-sans font-normal text-[#683600]">{unit}</span>
            </div>
            <p className="text-[11px] text-[#683600] font-mono">Allocated to active buyer orders</p>
          </div>

          {/* 3. Available to Buyers */}
          <div className="p-5 rounded-[20px] bg-[#e6ecd5] border border-[#c3cda7] space-y-1">
            <div className="flex items-center justify-between text-[#1b6e53] text-xs font-mono">
              <span className="uppercase tracking-wider">Available to Buyers</span>
              <span className="material-symbols-outlined text-[18px]">storefront</span>
            </div>
            <div className="font-editorial text-3xl font-bold text-[#1b6e53]">
              {availableVal.toLocaleString('en-IN')}{' '}
              <span className="text-base font-sans font-normal text-[#1b6e53]">{unit}</span>
            </div>
            <p className="text-[11px] text-[#1b6e53] font-mono">Immediate procurement quota</p>
          </div>
        </div>

        {/* Progress Bar Representation */}
        <div className="p-4 rounded-[18px] bg-[#f1efdf]/60 border border-[#c3cda7] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#353535]">
              Capacity Allocation: <strong>{Math.round((availableVal / (capacityVal || 1)) * 100)}% Available</strong>
            </span>
            <span className="text-[#6d6d6d]">
              {reservedVal} {unit} locked • {availableVal} {unit} free
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-[#c3cda7]/50 overflow-hidden flex">
            <div
              className="bg-[#1b6e53] h-full transition-all"
              style={{ width: `${(availableVal / (capacityVal || 1)) * 100}%` }}
              title="Available"
            ></div>
            <div
              className="bg-[#683600] h-full transition-all"
              style={{ width: `${(reservedVal / (capacityVal || 1)) * 100}%` }}
              title="Reserved"
            ></div>
          </div>
        </div>

        {/* Notes / Description if available */}
        {product.notes && (
          <div className="pt-2">
            <span className="text-[10px] font-mono uppercase text-[#6d6d6d] block mb-1">
              Quality &amp; Sourcing Specifications
            </span>
            <p className="text-xs text-[#353535] leading-relaxed p-4 rounded-[16px] bg-[#f1efdf]/50 border border-[#c3cda7]/60">
              {product.notes}
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
