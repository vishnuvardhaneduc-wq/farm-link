import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { getStoredFpoHubById, saveFpoHub } from '../../data/fpoHubsData'

export default function FPOHubForm({ isEdit = false }) {
  const navigate = useNavigate()
  const { id } = useParams()

  const availableCrops = ['Tomato', 'Onion', 'Green Chilli', 'Rice', 'Potato', 'Capsicum']
  const operatingStatusOptions = ['Active', 'Near Capacity', 'Maintenance', 'Inactive']
  const capacityUnits = ['kg', 'Tonnes', 'MT', 'Quintal']

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    location: '',
    address: '',
    contactPerson: '',
    phoneNumber: '',
    operatingStatus: 'Active',
    capacity: '',
    capacityUnit: 'kg',
    operatingDays: 'Monday – Saturday',
    openingTime: '06:00 AM',
    closingTime: '06:00 PM',
    supportedProducts: ['Tomato', 'Onion'],
    assignedFarmers: 25,
    notes: '',
  })

  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (isEdit && id) {
      const existing = getStoredFpoHubById(id)
      if (existing) {
        setFormData({
          id: existing.id || id,
          name: existing.name || '',
          location: existing.location || '',
          address: existing.address || '',
          contactPerson: existing.contactPerson || '',
          phoneNumber: existing.phoneNumber || '',
          operatingStatus: existing.operatingStatus || 'Active',
          capacity: existing.capacity || '',
          capacityUnit: existing.capacityUnit || 'kg',
          operatingDays: existing.operatingDays || 'Monday – Saturday',
          openingTime: existing.openingTime || '06:00 AM',
          closingTime: existing.closingTime || '06:00 PM',
          supportedProducts: existing.supportedProducts || ['Tomato'],
          assignedFarmers: existing.assignedFarmers || 25,
          notes: existing.notes || '',
        })
      }
    }
  }, [isEdit, id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const toggleProduct = (crop) => {
    setFormData((prev) => {
      const exists = prev.supportedProducts.includes(crop)
      const updated = exists
        ? prev.supportedProducts.filter((c) => c !== crop)
        : [...prev.supportedProducts, crop]
      return { ...prev, supportedProducts: updated }
    })
    if (errors.supportedProducts) {
      setErrors((prev) => ({ ...prev, supportedProducts: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Hub Name is required'
    if (!formData.location.trim()) newErrors.location = 'Hub Location is required'
    if (!formData.capacity || Number(formData.capacity) <= 0) {
      newErrors.capacity = 'Enter a valid positive capacity'
    }
    if (!formData.openingTime.trim()) newErrors.openingTime = 'Opening time is required'
    if (!formData.closingTime.trim()) newErrors.closingTime = 'Closing time is required'
    if (!formData.supportedProducts || formData.supportedProducts.length === 0) {
      newErrors.supportedProducts = 'Select at least one supported product'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSaving(true)

    setTimeout(() => {
      saveFpoHub({
        ...formData,
        name: formData.name.trim(),
        location: formData.location.trim(),
        address: formData.address.trim(),
        contactPerson: formData.contactPerson.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        capacity: Number(formData.capacity),
        notes: formData.notes.trim(),
      })

      setIsSaving(false)
      const msg = isEdit ? 'Hub updated successfully.' : 'Hub added successfully.'
      setSuccessMessage(msg)

      setTimeout(() => {
        navigate('/fpo/hubs')
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
              to="/fpo/hubs"
              className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-flex items-center gap-1.5 hover:bg-[#dbe4c2] transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">arrow_back</span>
              <span>Back to All Hubs</span>
            </Link>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            {isEdit ? 'Edit' : 'Add'} <span className="italic font-normal">Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            {isEdit
              ? 'Update capacity, operating schedule, and produce capability specifications for this hub.'
              : 'Connect a new aggregation hub or collection point to your FPO federation infrastructure.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/fpo/hubs"
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
          <span className="text-[11px] font-mono text-[#1b6e53]">Redirecting to hubs...</span>
        </div>
      )}

      {/* 3. Main Form Container */}
      <div className="bg-[#ffffff] rounded-[24px] sm:rounded-[32px] border border-[#c3cda7] p-6 sm:p-10 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-[#c3cda7]/50 pb-2">
            <h3 className="font-editorial text-xl font-bold text-[#00372a]">
              Hub Details &amp; Operational Capacity
            </h3>
            <p className="text-xs text-[#6d6d6d]">Fields marked with asterisk (*) are required.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Hub Name * */}
            <div className="space-y-1 sm:col-span-2">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                1. Hub Name *
              </label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rajahmundry Central Hub, Kakinada Collection Hub"
                className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                  errors.name ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
              />
              {errors.name && <span className="text-[11px] text-[#ba1a1a] block">{errors.name}</span>}
            </div>

            {/* 2. Hub Location * */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                2. Hub Location / District *
              </label>
              <input
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Rajamahendravaram, East Godavari"
                className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                  errors.location ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
              />
              {errors.location && <span className="text-[11px] text-[#ba1a1a] block">{errors.location}</span>}
            </div>

            {/* 3. Operating Status */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                3. Operating Status
              </label>
              <select
                name="operatingStatus"
                value={formData.operatingStatus}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all cursor-pointer"
              >
                {operatingStatusOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Physical Address */}
            <div className="space-y-1 sm:col-span-2">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                4. Physical Address
              </label>
              <input
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. APMC Market Yard Complex, Main Road, Rajamahendravaram"
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all"
              />
            </div>

            {/* 5. Contact Person */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                5. Contact Person (Nodal Manager)
              </label>
              <input
                name="contactPerson"
                type="text"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="e.g. S. Venkata Rao"
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all"
              />
            </div>

            {/* 6. Phone Number */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                6. Phone Number
              </label>
              <input
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+91 98481 23456"
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all font-mono"
              />
            </div>

            {/* 7. Capacity * */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                7. Daily Intake Capacity *
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

            {/* 8. Capacity Unit */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                8. Capacity Unit *
              </label>
              <select
                name="capacityUnit"
                value={formData.capacityUnit}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all cursor-pointer"
              >
                {capacityUnits.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            {/* 9. Opening & Closing Operating Hours * */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                9. Opening Time *
              </label>
              <input
                name="openingTime"
                type="text"
                required
                value={formData.openingTime}
                onChange={handleChange}
                placeholder="06:00 AM"
                className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                  errors.openingTime ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all font-mono`}
              />
              {errors.openingTime && <span className="text-[11px] text-[#ba1a1a] block">{errors.openingTime}</span>}
            </div>

            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                10. Closing Time *
              </label>
              <input
                name="closingTime"
                type="text"
                required
                value={formData.closingTime}
                onChange={handleChange}
                placeholder="06:00 PM"
                className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                  errors.closingTime ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all font-mono`}
              />
              {errors.closingTime && <span className="text-[11px] text-[#ba1a1a] block">{errors.closingTime}</span>}
            </div>

            {/* 11. Supported Products * (Checkboxes) */}
            <div className="space-y-2 sm:col-span-2 pt-2">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                11. Supported Products / Crops *
              </label>
              <div className="flex flex-wrap gap-2.5">
                {availableCrops.map((crop) => {
                  const isSelected = formData.supportedProducts.includes(crop)
                  return (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => toggleProduct(crop)}
                      className={`px-4 py-2 rounded-full text-xs font-bold inline-flex items-center gap-2 border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1b6e53] text-[#ffffff] border-[#1b6e53] shadow-xs'
                          : 'bg-[#f1efdf]/60 text-[#353535] border-[#c3cda7] hover:bg-[#e6ecd5]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        {isSelected ? 'check_circle' : 'add_circle'}
                      </span>
                      <span>{crop}</span>
                    </button>
                  )
                })}
              </div>
              {errors.supportedProducts && (
                <span className="text-[11px] text-[#ba1a1a] block">{errors.supportedProducts}</span>
              )}
            </div>

            {/* 12. Notes */}
            <div className="space-y-1 sm:col-span-2 pt-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                12. Hub Infrastructure Notes (Optional)
              </label>
              <textarea
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Weighbridge model, sorting line equipment, cold storage buffer, etc..."
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#c3cda7]/50 flex flex-col sm:flex-row items-center justify-end gap-3">
            <Link
              to="/fpo/hubs"
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
                  <span>Saving Hub...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>{isEdit ? 'Update Hub' : 'Save Hub'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
