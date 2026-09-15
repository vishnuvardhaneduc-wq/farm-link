import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { getStoredFpoProducts } from '../../data/fpoProductsData'

export default function FPOProducts() {
  const [products, setProducts] = useState(getStoredFpoProducts())

  useEffect(() => {
    const handleUpdate = () => {
      setProducts(getStoredFpoProducts())
    }
    window.addEventListener('farmlink-fpo-products-updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('farmlink-fpo-products-updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  const totalCapacity = products.reduce((sum, p) => sum + (Number(p.capacity) || 0), 0)
  const totalAvailable = products.reduce((sum, p) => sum + (Number(p.availableQty) || 0), 0)

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
    <div className="space-y-8 pb-12">
      {/* 1. Header & Primary Action */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53]"></span>
              <span>SUPPLY CATALOG // FPO PRODUCTS</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff] border border-[#c3cda7] text-[#1b6e53] font-mono text-[10px] font-bold">
              {products.length} Crops Active
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Products <span className="italic font-normal">We Supply</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Catalog of bulk horticulture produce supplied by Godavari Farmers FPO across regional collection hubs.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="flex items-center gap-3">
          <Link
            to="/fpo/products/add"
            className="px-5 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ Add Product</span>
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Total Active Products</div>
          <div className="font-editorial text-3xl font-bold text-[#00372a] mt-1">{products.length} Crops</div>
          <div className="text-[11px] font-mono text-[#1b6e53] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">eco</span>
            <span>100% verified farmer supply</span>
          </div>
        </div>

        <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Total Aggregated Capacity</div>
          <div className="font-editorial text-3xl font-bold text-[#1b6e53] mt-1">
            {totalCapacity.toLocaleString('en-IN')} kg
          </div>
          <div className="text-[11px] font-mono text-[#6d6d6d] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">scale</span>
            <span>Across 3 collection hubs</span>
          </div>
        </div>

        <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Available To Buyers</div>
          <div className="font-editorial text-3xl font-bold text-[#683600] mt-1">
            {totalAvailable.toLocaleString('en-IN')} kg
          </div>
          <div className="text-[11px] font-mono text-[#1b6e53] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">storefront</span>
            <span>Immediate dispatch ready</span>
          </div>
        </div>
      </div>

      {/* 3. Products Table Section */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center border border-[#c3cda7]">
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                FPO Supply Catalog
              </h3>
              <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                Real-time volume capacity, grade grading standard, and status.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono text-[#1b6e53] bg-[#f1efdf] px-3 py-1 rounded-[100px] border border-[#c3cda7]">
            {products.length} Products Listed
          </span>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">Product / Crop</th>
                <th className="py-3 px-4">Variety</th>
                <th className="py-3 px-4">Grade Capability</th>
                <th className="py-3 px-4 text-right">Available Capacity</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-[#faf9f0] transition">
                  {/* Product Name */}
                  <td className="py-4 px-4 font-sans">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center font-bold text-xs shrink-0">
                        <span className="material-symbols-outlined text-[15px]">eco</span>
                      </div>
                      <div>
                        <span className="font-bold text-sm text-[#00372a] font-editorial block">
                          {product.name}
                        </span>
                        <span className="text-[10px] text-[#6d6d6d] font-mono">Min: {product.minSupplyQty || '100 kg'}</span>
                      </div>
                    </div>
                  </td>

                  {/* Variety */}
                  <td className="py-4 px-4 font-sans font-medium text-[#353535]">
                    {product.variety || 'Standard'}
                  </td>

                  {/* Grade Capability */}
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-[#e6ecd5] text-[#1b6e53] text-[10px] font-mono font-bold border border-[#c3cda7]">
                      {product.grade || (product.supportedGrades ? product.supportedGrades.join(', ') : 'Grade A')}
                    </span>
                  </td>

                  {/* Available Capacity */}
                  <td className="py-4 px-4 text-right font-mono">
                    <span className="font-extrabold text-[#1b6e53] text-sm">
                      {Number(product.capacity).toLocaleString('en-IN')} {product.unit || 'kg'}
                    </span>
                    <span className="text-[10px] text-[#6d6d6d] block">
                      Avail: {Number(product.availableQty).toLocaleString('en-IN')} {product.unit || 'kg'}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-[100px] text-[10px] font-bold uppercase tracking-wider border font-mono ${getStatusBadge(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </td>

                  {/* Last Updated */}
                  <td className="py-4 px-4 font-mono text-[11px] text-[#6d6d6d]">
                    {product.lastUpdated || 'Today'}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right whitespace-nowrap font-sans">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/fpo/products/${product.id}`}
                        className="py-1.5 px-3 rounded-[100px] bg-[#ffffff] hover:bg-[#faf9f0] text-[#1b6e53] border border-[#c3cda7] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1 cursor-pointer"
                        title="View Product Details"
                      >
                        <span className="material-symbols-outlined text-[14px]">visibility</span>
                        <span>View</span>
                      </Link>

                      <Link
                        to={`/fpo/products/${product.id}/edit`}
                        className="py-1.5 px-3 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1 cursor-pointer"
                        title="Edit Product"
                      >
                        <span className="material-symbols-outlined text-[14px]">edit</span>
                        <span>Edit</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
