import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { getStoredFpoProfile, saveStoredFpoProfile } from '../../data/fpoProfileData'

export default function EditFPOProfile() {
  const navigate = useNavigate()
  const currentProfile = getStoredFpoProfile()

  // Form State
  const [formData, setFormData] = useState({
    fpoId: currentProfile.fpoId || 'FPO-00124',
    registrationId: currentProfile.registrationId || 'FPO-REG-2026-00124',
    fpoName: currentProfile.fpoName || '',
    contactPerson: currentProfile.contactPerson || '',
    phoneNumber: currentProfile.phoneNumber || '',
    emailAddress: currentProfile.emailAddress || '',
    state: currentProfile.state || 'Andhra Pradesh',
    district: currentProfile.district || '',
    primaryOperatingArea: currentProfile.primaryOperatingArea || '',
    address: currentProfile.address || '',
    website: currentProfile.website || '',
    description: currentProfile.description || '',
  })

  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const states = [
    'Andhra Pradesh',
    'Maharashtra',
    'Karnataka',
    'Tamil Nadu',
    'Telangana',
    'Gujarat',
    'Madhya Pradesh',
    'Punjab',
    'Haryana',
    'Rajasthan',
    'Uttar Pradesh',
    'Odisha',
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    // Required fields check
    if (!formData.fpoName.trim()) newErrors.fpoName = 'FPO Name is required'
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required'

    // Phone validation
    const cleanPhone = formData.phoneNumber.replace(/[^0-9]/g, '')
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phoneNumber = 'Enter a valid 10-digit phone number'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email is required'
    } else if (!emailRegex.test(formData.emailAddress.trim())) {
      newErrors.emailAddress = 'Enter a valid email address'
    }

    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.district.trim()) newErrors.district = 'District is required'
    if (!formData.primaryOperatingArea.trim()) newErrors.primaryOperatingArea = 'Primary operating area is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSaving(true)

    setTimeout(() => {
      // Save changes to localStorage mock store
      const updated = saveStoredFpoProfile({
        fpoName: formData.fpoName.trim(),
        contactPerson: formData.contactPerson.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        emailAddress: formData.emailAddress.trim(),
        state: formData.state.trim(),
        district: formData.district.trim(),
        primaryOperatingArea: formData.primaryOperatingArea.trim(),
        location: `${formData.district.trim()}, ${formData.state.trim()}`,
        serviceArea: formData.primaryOperatingArea.trim(),
        address: formData.address.trim(),
        website: formData.website.trim(),
        description: formData.description.trim(),
      })

      setIsSaving(false)
      setSuccessMessage('FPO details updated successfully.')

      // Short delay for visual confirmation before returning to profile
      setTimeout(() => {
        navigate('/fpo/profile')
      }, 750)
    }, 450)
  }

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* 1. Header & Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Link
              to="/fpo/profile"
              className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-flex items-center gap-1.5 hover:bg-[#dbe4c2] transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">arrow_back</span>
              <span>Back to FPO Profile</span>
            </Link>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Edit <span className="italic font-normal">FPO Details</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Update your organization contact, jurisdictional operating area, and public profile details.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/fpo/profile"
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
          <span className="text-[11px] font-mono text-[#1b6e53]">Redirecting to profile...</span>
        </div>
      )}

      {/* 3. Main Form Container (matching FPORegister aesthetic) */}
      <div className="bg-[#ffffff] rounded-[24px] sm:rounded-[32px] border border-[#c3cda7] p-6 sm:p-10 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* A. System & Registration Identifiers (Read-Only) */}
          <div className="p-4 sm:p-5 rounded-[18px] bg-[#f1efdf]/60 border border-[#c3cda7] space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-[#1b6e53] text-xs font-bold uppercase tracking-wider font-mono">
                <span className="material-symbols-outlined text-[17px]">lock</span>
                <span>System Identifiers (Read-Only)</span>
              </div>
              <span className="text-[10px] font-mono text-[#6d6d6d] bg-[#ffffff] px-2.5 py-0.5 rounded-full border border-[#c3cda7]">
                Non-editable APMC registry keys
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* FPO ID (Locked) */}
              <div className="space-y-1">
                <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#6d6d6d]">
                  FPO ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    disabled
                    value={formData.fpoId}
                    className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#e6ecd5]/40 border border-[#c3cda7] text-[#1b6e53] font-mono text-xs sm:text-sm font-bold cursor-not-allowed select-none opacity-90"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[16px] text-[#1b6e53]/70">
                    lock
                  </span>
                </div>
                <span className="text-[10px] text-[#6d6d6d] font-mono block">Unique Federation Hub Master ID</span>
              </div>

              {/* Registration ID (Locked) */}
              <div className="space-y-1">
                <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#6d6d6d]">
                  Registration ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    disabled
                    value={formData.registrationId}
                    className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#e6ecd5]/40 border border-[#c3cda7] text-[#1b6e53] font-mono text-xs sm:text-sm font-bold cursor-not-allowed select-none opacity-90"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[16px] text-[#1b6e53]/70">
                    verified
                  </span>
                </div>
                <span className="text-[10px] text-[#6d6d6d] font-mono block">Statutory Incorporation Deed No.</span>
              </div>
            </div>
          </div>

          {/* B. Editable Organization Details */}
          <div className="space-y-4">
            <div className="border-b border-[#c3cda7]/50 pb-2">
              <h3 className="font-editorial text-xl font-bold text-[#00372a]">
                Organization &amp; Contact Details
              </h3>
              <p className="text-xs text-[#6d6d6d]">Fields marked with asterisk (*) are required.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1. FPO Name */}
              <div className="space-y-1 sm:col-span-2">
                <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                  1. FPO Name *
                </label>
                <input
                  name="fpoName"
                  type="text"
                  required
                  value={formData.fpoName}
                  onChange={handleChange}
                  placeholder="e.g. Godavari Farmers FPO"
                  className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                    errors.fpoName ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                  } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                />
                {errors.fpoName && <span className="text-[11px] text-[#ba1a1a] block">{errors.fpoName}</span>}
              </div>

              {/* 2. Contact Person */}
              <div className="space-y-1">
                <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                  2. Contact Person *
                </label>
                <input
                  name="contactPerson"
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder="e.g. Ravi Kumar"
                  className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                    errors.contactPerson ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                  } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                />
                {errors.contactPerson && (
                  <span className="text-[11px] text-[#ba1a1a] block">{errors.contactPerson}</span>
                )}
              </div>

              {/* 3. Phone Number */}
              <div className="space-y-1">
                <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                  3. Phone Number *
                </label>
                <input
                  name="phoneNumber"
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+91 98480 12345"
                  className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                    errors.phoneNumber ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                  } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all font-mono`}
                />
                {errors.phoneNumber && (
                  <span className="text-[11px] text-[#ba1a1a] block">{errors.phoneNumber}</span>
                )}
              </div>

              {/* 4. Email */}
              <div className="space-y-1 sm:col-span-2">
                <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                  4. Email Address *
                </label>
                <input
                  name="emailAddress"
                  type="email"
                  required
                  value={formData.emailAddress}
                  onChange={handleChange}
                  placeholder="contact@godavarifpo.example"
                  className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                    errors.emailAddress ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                  } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                />
                {errors.emailAddress && (
                  <span className="text-[11px] text-[#ba1a1a] block">{errors.emailAddress}</span>
                )}
              </div>

              {/* 5. State */}
              <div className="space-y-1">
                <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                  5. State *
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all cursor-pointer"
                >
                  {states.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                {errors.state && <span className="text-[11px] text-[#ba1a1a] block">{errors.state}</span>}
              </div>

              {/* 6. District */}
              <div className="space-y-1">
                <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                  6. District *
                </label>
                <input
                  name="district"
                  type="text"
                  required
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="e.g. East Godavari"
                  className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                    errors.district ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                  } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                />
                {errors.district && <span className="text-[11px] text-[#ba1a1a] block">{errors.district}</span>}
              </div>

              {/* 7. Primary Operating Area */}
              <div className="space-y-1 sm:col-span-2">
                <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                  7. Primary Operating Area *
                </label>
                <input
                  name="primaryOperatingArea"
                  type="text"
                  required
                  value={formData.primaryOperatingArea}
                  onChange={handleChange}
                  placeholder="e.g. East Godavari"
                  className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                    errors.primaryOperatingArea ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                  } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                />
                {errors.primaryOperatingArea && (
                  <span className="text-[11px] text-[#ba1a1a] block">{errors.primaryOperatingArea}</span>
                )}
              </div>

              {/* 8. Registered Office Address */}
              <div className="space-y-1 sm:col-span-2">
                <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                  8. Registered Office Address
                </label>
                <input
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. Main Road, Near APMC Market Yard, Rajamahendravaram"
                  className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all"
                />
              </div>

              {/* 9. Website (Optional) */}
              <div className="space-y-1 sm:col-span-2">
                <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                  9. Website (Optional)
                </label>
                <input
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://godavarifarmers.example"
                  className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all"
                />
              </div>

              {/* 10. Description (Optional) */}
              <div className="space-y-1 sm:col-span-2">
                <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                  10. Description / Public Overview (Optional)
                </label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief summary of your producer collective and produce capabilities..."
                  className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* C. Action Buttons: Save Changes & Cancel */}
          <div className="pt-4 border-t border-[#c3cda7]/50 flex flex-col sm:flex-row items-center justify-end gap-3">
            <Link
              to="/fpo/profile"
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
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
