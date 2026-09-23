import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { getStoredFpoFarmerById, saveFpoFarmer, getStoredFpoFarmers } from '../../data/fpoFarmersData'
import { getStoredFpoHubs } from '../../data/fpoHubsData'

export default function FPOFarmerForm({ isEdit = false }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [hubs, setHubs] = useState(getStoredFpoHubs())

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phoneNumber: '',
    village: '',
    district: 'East Godavari',
    primaryCrop: 'Tomato',
    otherCrops: '',
    expectedSupply: '',
    supplyUnit: 'kg',
    primaryHubId: hubs[0]?.id || 'HUB-0007',
    primaryHubName: hubs[0]?.name || 'Rajahmundry Central Hub',
    gradeCapability: 'Grade A',
    status: 'Active',
  })

  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const currentHubs = getStoredFpoHubs()
    setHubs(currentHubs)

    if (isEdit && id) {
      const existing = getStoredFpoFarmerById(id)
      if (existing) {
        setFormData({
          id: existing.id || id,
          name: existing.name || '',
          phoneNumber: existing.phoneNumber || '',
          village: existing.village || '',
          district: existing.district || 'East Godavari',
          primaryCrop: existing.primaryCrop || 'Tomato',
          otherCrops: existing.otherCrops || '',
          expectedSupply: existing.expectedSupply || '',
          supplyUnit: existing.supplyUnit || 'kg',
          primaryHubId: existing.primaryHubId || currentHubs[0]?.id || 'HUB-0007',
          primaryHubName: existing.primaryHubName || currentHubs[0]?.name || 'Rajahmundry Central Hub',
          gradeCapability: existing.gradeCapability || 'Grade A',
          status: existing.status || 'Active',
          allocatedQty: existing.allocatedQty,
          collectedQty: existing.collectedQty,
          acceptedQty: existing.acceptedQty,
          lastSupply: existing.lastSupply,
          supplyHistory: existing.supplyHistory,
          settlementHistory: existing.settlementHistory,
        })
      }
    } else if (!isEdit) {
      // Auto-preview generated mock Farmer ID
      const allFarmers = getStoredFpoFarmers()
      const nextNum = (allFarmers.length + 842).toString().padStart(5, '0')
      setFormData((prev) => ({
        ...prev,
        id: `FARM-${nextNum}`,
        primaryHubId: currentHubs[0]?.id || 'HUB-0007',
        primaryHubName: currentHubs[0]?.name || 'Rajahmundry Central Hub',
      }))
    }
  }, [isEdit, id])

  const units = ['kg', 'Quintal', 'Tonnes', 'Crates']
  const grades = ['Grade A', 'Grade B', 'Grade A & B']
  const cropOptions = ['Tomato', 'Onion', 'Green Chilli', 'Rice', 'Potato', 'Brinjal', 'Capsicum']
  const districts = ['East Godavari', 'West Godavari', 'Krishna', 'Visakhapatnam', 'Guntur', 'Anakapalli']
  const statuses = ['Active', 'Pending', 'Inactive']

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'primaryHubId') {
      const matched = hubs.find((h) => h.id === value)
      setFormData((prev) => ({
        ...prev,
        primaryHubId: value,
        primaryHubName: matched ? matched.name : value,
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Farmer Name is required'
    if (!formData.village.trim()) newErrors.village = 'Village is required'
    if (!formData.primaryCrop.trim()) newErrors.primaryCrop = 'Primary crop is required'
    if (!formData.expectedSupply || Number(formData.expectedSupply) <= 0) {
      newErrors.expectedSupply = 'Enter a valid positive expected supply'
    }
    if (!formData.primaryHubId) newErrors.primaryHubId = 'Primary Hub is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSaving(true)

    setTimeout(() => {
      saveFpoFarmer({
        ...formData,
        name: formData.name.trim(),
        village: formData.village.trim(),
        district: formData.district.trim(),
        primaryCrop: formData.primaryCrop.trim(),
        otherCrops: formData.otherCrops.trim(),
        expectedSupply: Number(formData.expectedSupply),
      })

      setIsSaving(false)
      const msg = isEdit ? 'Farmer updated successfully.' : 'Farmer added successfully.'
      setSuccessMessage(msg)

      setTimeout(() => {
        navigate('/fpo/farmers')
      }, 700)
    }, 400)
  }

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
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
            {formData.id && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff] border border-[#c3cda7] text-[#1b6e53] font-mono text-[10px] font-bold">
                ID: {formData.id}
              </span>
            )}
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            {isEdit ? 'Edit' : 'Add'} <span className="italic font-normal">Farmer</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            {isEdit
              ? 'Update smallholder membership profile, designated primary collection hub, and expected crop volume.'
              : 'Register a smallholder producer under your FPO cluster and assign their primary intake hub.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/fpo/farmers"
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
          <span className="text-[11px] font-mono text-[#1b6e53]">Redirecting to directory...</span>
        </div>
      )}

      {/* 3. Main Form Container */}
      <div className="bg-[#ffffff] rounded-[24px] sm:rounded-[32px] border border-[#c3cda7] p-6 sm:p-10 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-[#c3cda7]/50 pb-2 flex items-center justify-between">
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#00372a]">
                Farmer Profile &amp; Hub Assignment
              </h3>
              <p className="text-xs text-[#6d6d6d]">Fields marked with asterisk (*) are required.</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-[#6d6d6d] uppercase block">Auto-assigned ID</span>
              <span className="text-xs font-mono font-bold text-[#1b6e53]">{formData.id || 'FARM-00842'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Farmer Name (Required) */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                1. Farmer Name *
              </label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ravi Kumar, Suresh Rao"
                className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                  errors.name ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
              />
              {errors.name && <span className="text-[11px] text-[#ba1a1a] block">{errors.name}</span>}
            </div>

            {/* 2. Phone Number (Optional) */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                2. Phone Number (Optional)
              </label>
              <input
                name="phoneNumber"
                type="text"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g. +91 98481 12345"
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all font-mono"
              />
              <span className="text-[10px] text-[#6d6d6d] font-mono block">
                Used for automated voice IVR &amp; SMS weighment receipts.
              </span>
            </div>

            {/* 3. Village * (Required) */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                3. Village *
              </label>
              <input
                name="village"
                type="text"
                required
                value={formData.village}
                onChange={handleChange}
                placeholder="e.g. Kadiyam, Samalkota, Sanivarapupeta"
                className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                  errors.village ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
              />
              {errors.village && <span className="text-[11px] text-[#ba1a1a] block">{errors.village}</span>}
            </div>

            {/* 4. District */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                4. District
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all cursor-pointer"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Primary Crop * (Required) */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                5. Primary Crop *
              </label>
              <select
                name="primaryCrop"
                value={formData.primaryCrop}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all cursor-pointer"
              >
                {cropOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.primaryCrop && <span className="text-[11px] text-[#ba1a1a] block">{errors.primaryCrop}</span>}
            </div>

            {/* 6. Other Crops (Optional) */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                6. Other Crops (Optional)
              </label>
              <input
                name="otherCrops"
                type="text"
                value={formData.otherCrops}
                onChange={handleChange}
                placeholder="e.g. Onion, Green Chilli"
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all"
              />
            </div>

            {/* 7. Expected Supply * (Required) */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                7. Expected Supply *
              </label>
              <input
                name="expectedSupply"
                type="number"
                min="1"
                required
                value={formData.expectedSupply}
                onChange={handleChange}
                placeholder="e.g. 450"
                className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                  errors.expectedSupply ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all font-mono`}
              />
              {errors.expectedSupply && <span className="text-[11px] text-[#ba1a1a] block">{errors.expectedSupply}</span>}
            </div>

            {/* 8. Supply Unit * (Required) */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                8. Supply Unit *
              </label>
              <select
                name="supplyUnit"
                value={formData.supplyUnit}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all cursor-pointer"
              >
                {units.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            {/* 9. Primary Hub * (Required) */}
            <div className="space-y-1 sm:col-span-2">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                9. Primary Hub * (Designated Aggregation Point)
              </label>
              <select
                name="primaryHubId"
                value={formData.primaryHubId}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                  errors.primaryHubId ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                } text-[#212529] font-sans text-xs sm:text-sm focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all cursor-pointer`}
              >
                {hubs.map((hub) => (
                  <option key={hub.id} value={hub.id}>
                    {hub.name} ({hub.id}) — {hub.location || 'Cluster Hub'}
                  </option>
                ))}
              </select>
              {errors.primaryHubId && <span className="text-[11px] text-[#ba1a1a] block">{errors.primaryHubId}</span>}
              <p className="text-[11px] text-[#1b6e53] font-mono mt-1">
                Important: A farmer has one Primary Hub and normally delivers produce there.
              </p>
            </div>

            {/* 10. Grade Capability */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                10. Grade Capability
              </label>
              <select
                name="gradeCapability"
                value={formData.gradeCapability}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all cursor-pointer"
              >
                {grades.map((gr) => (
                  <option key={gr} value={gr}>
                    {gr}
                  </option>
                ))}
              </select>
            </div>

            {/* 11. Status */}
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                11. Member Status
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
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#c3cda7]/50 flex flex-col sm:flex-row items-center justify-end gap-3">
            <Link
              to="/fpo/farmers"
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
                  <span>Saving Farmer...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>{isEdit ? 'Update Farmer' : 'Save Farmer'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
