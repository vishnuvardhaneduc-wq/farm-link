import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { getStoredFpoProductById, saveFpoProduct } from '../../data/fpoProductsData'

export default function FPOProductForm({ isEdit = false }) {
  const navigate = useNavigate()
  const { id } = useParams()

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    variety: '',
    grade: 'Grade A',
    capacity: '',
    unit: 'kg',
    minSupplyQty: '100 kg',
    status: 'Active',
    availabilityStatus: 'Available',
    reservedQty: 0,
    notes: '',
  })

  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (isEdit && id) {
      const existing = getStoredFpoProductById(id)
      if (existing) {
        setFormData({
          id: existing.id || id,
          name: existing.name || '',
          variety: existing.variety || '',
          grade: existing.grade || 'Grade A',
          capacity: existing.capacity || '',
          unit: existing.unit || 'kg',
          minSupplyQty: existing.minSupplyQty || '100 kg',
          status: existing.status || 'Active',
          availabilityStatus: existing.availabilityStatus || 'Available',
          reservedQty: existing.reservedQty || 0,
          notes: existing.notes || '',
        })
      }
    }
  }, [isEdit, id])

  const units = ['kg', 'Quintal', 'Tonnes', 'MT', 'Crates']
  const grades = ['Grade A', 'Grade B', 'Grade A & B', 'Organic / Grade A']
  const statuses = ['Active', 'Available', 'Low Stock', 'Seasonal', 'Inactive']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Product / Crop name is required'
    if (!formData.capacity || Number(formData.capacity) <= 0) {
      newErrors.capacity = 'Enter a valid positive capacity'
    }
    if (!formData.unit.trim()) newErrors.unit = 'Unit is required'
    if (!formData.grade.trim()) newErrors.grade = 'Supported grade is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSaving(true)

    setTimeout(() => {
      saveFpoProduct({
        ...formData,
        name: formData.name.trim(),
        variety: formData.variety.trim(),
        capacity: Number(formData.capacity),
        notes: formData.notes.trim(),
      })

      setIsSaving(false)
      const msg = isEdit ? 'Product updated successfully.' : 'Product added successfully.'
      setSuccessMessage(msg)

      setTimeout(() => {
        navigate('/fpo/products')
      }, 700)
    }, 450)
  }

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
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
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            {isEdit ? 'Edit' : 'Add'} <span className="italic font-normal">Product</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            {isEdit
              ? 'Update capacity, variety specifications, and grade standard for this crop.'
              : 'Register a new bulk produce crop into your FPO aggregation supply catalog.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/fpo/products"
            className="px-5 py-2 rounded-[100px] bg-[#ffffff] hover:bg-[#faf9f0] text-[#353535] border border-[#c3cda7] text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
          >
            <span>Cancel</span>
          </Link>
        </div>
      </div>

      {/* 2. Success Banner Toast */}
      {successMessage && (
        <div className="p-4 rounded-[18px] bg-[#e6ecd5] border border-[#c3cda7] text-[#1b6e53] flex items-center justify-between gap-3 shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#1b6e53]">check_circle</span>
            <span className="font-sans text-xs sm:text-sm font-bold">{successMessage}</span>
          </div>
          <span className="text-[11px] font-mono text-[#1b6e53]">Redirecting to catalog...</span>
        </div>
      )}

      {/* 3. Main Form Container (matching FPORegister/EditProfile aesthetic) */}
      <div className="bg-[#ffffff] rounded-[24px] sm:rounded-[32px] border border-[#c3cda7] p-6 sm:p-10 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-[#c3cda7]/50 pb-2">
            <h3 className="font-editorial text-xl font-bold text-[#00372a]">
              Product Specifications &amp; Capacity
            </h3>
            <p className="text-xs text-[#6d6d6d]">Fields marked with asterisk (*) are required.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Product / Crop (Required) */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                1. Product / Crop *
              </label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Tomato, Onion, Green Chilli, Rice"
                className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                  errors.name ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
              />
              {errors.name && <span className="text-[11px] text-[#ba1a1a] block">{errors.name}</span>}
            </div>

            {/* 2. Variety */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                2. Variety
              </label>
              <input
                name="variety"
                type="text"
                value={formData.variety}
                onChange={handleChange}
                placeholder="e.g. Hybrid Roma, Nasik Red, G4, Sona Masoori"
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all"
              />
            </div>

            {/* 3. Supported Grades * (Required) */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                3. Supported Grades *
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all cursor-pointer"
              >
                {grades.map((gr) => (
                  <option key={gr} value={gr}>
                    {gr}
                  </option>
                ))}
              </select>
              {errors.grade && <span className="text-[11px] text-[#ba1a1a] block">{errors.grade}</span>}
            </div>

            {/* 4. Availability Status */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                4. Availability Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all cursor-pointer"
              >
                {statuses.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Available Capacity * (Required) */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                5. Available Capacity *
              </label>
              <input
                name="capacity"
                type="number"
                min="1"
                required
                value={formData.capacity}
                onChange={handleChange}
                placeholder="e.g. 1500"
                className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                  errors.capacity ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all font-mono`}
              />
              {errors.capacity && <span className="text-[11px] text-[#ba1a1a] block">{errors.capacity}</span>}
            </div>

            {/* 6. Unit * (Required) */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                6. Unit *
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all cursor-pointer"
              >
                {units.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              {errors.unit && <span className="text-[11px] text-[#ba1a1a] block">{errors.unit}</span>}
            </div>

            {/* 7. Minimum Supply Quantity */}
            <div className="space-y-1 sm:col-span-2">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                7. Minimum Supply Quantity
              </label>
              <input
                name="minSupplyQty"
                type="text"
                value={formData.minSupplyQty}
                onChange={handleChange}
                placeholder="e.g. 100 kg or 5 Crates"
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all font-mono"
              />
            </div>

            {/* 8. Notes */}
            <div className="space-y-1 sm:col-span-2">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                8. Notes &amp; Quality Specifications (Optional)
              </label>
              <textarea
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Describe sorting criteria, packing specifications, or cold-chain transit conditions..."
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#c3cda7]/50 flex flex-col sm:flex-row items-center justify-end gap-3">
            <Link
              to="/fpo/products"
              className="w-full sm:w-auto px-6 h-11 rounded-[100px] bg-[#ffffff] hover:bg-[#faf9f0] text-[#353535] border border-[#c3cda7] font-sans text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center justify-center transition shadow-2xs cursor-pointer"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto px-8 h-11 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] font-sans text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-[0.99] cursor-pointer disabled:opacity-75"
            >
              {isSaving ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Saving Product...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>{isEdit ? 'Update Product' : 'Save Product'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
