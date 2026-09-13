import React, { useState } from 'react'
import { Link } from 'react-router'
import AuthHeader from '../../components/auth/AuthHeader'
import AuthFooter from '../../components/auth/AuthFooter'
import SuccessState from '../../components/auth/SuccessState'

export default function HubSetup() {
  // Form State
  const [formData, setFormData] = useState({
    hubName: 'Dindori Aggregation Hub 01',
    hubId: 'HUB-NSK-01',
    fpoName: 'Sahyadri Farmers Producer Co. Ltd.',
    hubLocation: 'Gate 4, APMC Market Yard, Dindori, Nashik',
    contactPerson: 'Suresh Shinde (Lead Operator)',
    phoneNumber: '+91 98221 44556',
    operatingHours: '06:00 AM - 08:00 PM',
    supportedProducts: 'Fresh Onions, Grapes, Tomatoes, Pomegranate',
    capacity: '50 MT / Day',
    emailAddress: 'dindori.hub01@sahyadri.org',
    password: 'password123',
    confirmPassword: 'password123',
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.hubName.trim()) newErrors.hubName = 'Hub name is required'
    if (!formData.hubId.trim()) newErrors.hubId = 'Hub ID / Token is required'
    if (!formData.fpoName.trim()) newErrors.fpoName = 'FPO name is required'
    if (!formData.hubLocation.trim()) newErrors.hubLocation = 'Hub location is required'
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Lead operator is required'

    const cleanPhone = formData.phoneNumber.replace(/[^0-9]/g, '')
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phoneNumber = 'Enter a valid 10-digit phone number'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.emailAddress || !emailRegex.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Enter a valid terminal email'
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 700)
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f1efdf] font-sans text-[#212529] selection:bg-[#e8fe85] selection:text-[#1b6e53]">
      {/* 1. Minimal Top Navigation Bar */}
      <AuthHeader portalTitle="Hub Operator Onboarding" backTo="/hub/login" backLabel="Back to Hub Login" />

      {/* 2. Main Setup Workspace */}
      <main className="w-full flex-1 flex items-center justify-center py-10 sm:py-14 px-4 sm:px-8">
        <div className="w-full max-w-5xl bg-[#ffffff] rounded-[24px] sm:rounded-[32px] border border-[#c3cda7] shadow-[0_12px_40px_-15px_rgba(7,80,63,0.08)] overflow-hidden flex flex-col md:flex-row">
          {/* LEFT PANEL: Authority & Highlights */}
          <div className="w-full md:w-5/12 bg-[#e6ecd5] p-8 sm:p-10 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#c3cda7]/60">
            <div className="relative z-10 flex flex-col">
              {/* Brand Badge Lockup */}
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[17px]">scale</span>
                </div>
                <span className="font-editorial text-xl font-bold text-[#00372a] tracking-tight">
                  FarmLink
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff]/80 border border-[#c3cda7] text-[#1b6e53] font-mono text-[9px] font-bold tracking-widest uppercase">
                  HUB OPERATIONS
                </span>
              </div>

              {/* Editorial Narrative */}
              <h1 className="font-editorial text-3xl sm:text-4xl text-[#00372a] font-normal leading-[1.2] tracking-tight mb-3">
                Activate your aggregation depot.
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#353535] font-normal leading-relaxed mb-6">
                Configure your intake weighbridges, computer-vision grading cameras, and dispatch dock for real-time aggregation under your assigned FPO.
              </p>

              {/* Scope Checklist Box */}
              <div className="p-4 sm:p-5 rounded-[18px] bg-[#ffffff] border border-[#c3cda7]/80 shadow-2xs">
                <div className="flex items-center gap-2 mb-3 text-[#1b6e53] font-sans text-xs font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[17px]">tune</span>
                  <span>Depot Operations Scope:</span>
                </div>

                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex items-center gap-2 text-[#212529] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] shrink-0"></span>
                    <span>Farmer Intake</span>
                    <span className="text-[#6d6d6d] text-[11px]">(Collection queues & lots)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#212529] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] shrink-0"></span>
                    <span>IoT Weighbridge</span>
                    <span className="text-[#6d6d6d] text-[11px]">(Gross, tare & net weight slips)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#212529] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] shrink-0"></span>
                    <span>Quality Assay</span>
                    <span className="text-[#6d6d6d] text-[11px]">(Moisture, grading & lab certs)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#212529] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] shrink-0"></span>
                    <span>Lot Aggregation</span>
                    <span className="text-[#6d6d6d] text-[11px]">(Batch palleting & cold storage)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#212529] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] shrink-0"></span>
                    <span>Dispatch Manifest</span>
                    <span className="text-[#6d6d6d] text-[11px]">(Truck seal & GPS cold-chain handoff)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="pt-6 mt-6 flex items-center gap-2 text-[#1b6e53] border-t border-[#c3cda7]/50 relative z-10 text-xs">
              <span className="material-symbols-outlined text-[17px]">sensors</span>
              <span className="font-mono text-[11px] font-medium">
                Hardware Bridge • Local RS232 / BLE Sensor Integration
              </span>
            </div>
          </div>

          {/* RIGHT PANEL: Form or Success View */}
          <div className="w-full md:w-7/12 p-8 sm:p-11 flex flex-col justify-between bg-[#ffffff]">
            <div>
              {/* Header */}
              <div className="mb-5">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <h2 className="font-editorial text-2xl sm:text-3xl text-[#00372a] font-normal tracking-tight">
                    Hub Account Setup
                  </h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#f1efdf] text-[#1b6e53] border border-[#c3cda7] font-mono">
                    ACTIVATION
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#6d6d6d] leading-relaxed">
                  Finalize depot credentials and link your station to the FPO network.
                </p>
              </div>

              {/* Informational Message Banner */}
              <div className="mb-5 p-3.5 rounded-[14px] bg-[#fceace] border border-[#683600]/20 flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] text-[#683600] shrink-0 mt-0.5">
                  info
                </span>
                <p className="font-sans text-xs text-[#683600] leading-relaxed">
                  <strong>Your hub account is provided by your FPO.</strong> Complete your setup before starting hub operations.
                </p>
              </div>

              {!isSuccess ? (
                /* ============================================================ */
                /* HUB SETUP FORM                                               */
                /* ============================================================ */
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* 1. Hub Name */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        1. Hub Name *
                      </label>
                      <input
                        name="hubName"
                        type="text"
                        required
                        value={formData.hubName}
                        onChange={handleChange}
                        placeholder="e.g. Dindori Hub 01"
                        className={`w-full px-3 py-2 rounded-[12px] bg-[#f1efdf]/40 border ${
                          errors.hubName ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                        } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                      />
                      {errors.hubName && <span className="text-[11px] text-[#ba1a1a] block">{errors.hubName}</span>}
                    </div>

                    {/* 2. Hub ID / Token */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        2. Hub ID / Token *
                      </label>
                      <input
                        name="hubId"
                        type="text"
                        required
                        value={formData.hubId}
                        onChange={handleChange}
                        placeholder="e.g. HUB-NSK-01"
                        className={`w-full px-3 py-2 rounded-[12px] bg-[#f1efdf]/40 border ${
                          errors.hubId ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                        } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all font-mono`}
                      />
                      {errors.hubId && <span className="text-[11px] text-[#ba1a1a] block">{errors.hubId}</span>}
                    </div>

                    {/* 3. Assigned FPO Name */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        3. Parent FPO Federation *
                      </label>
                      <input
                        name="fpoName"
                        type="text"
                        required
                        value={formData.fpoName}
                        onChange={handleChange}
                        placeholder="e.g. Sahyadri Farmers Producer Co. Ltd."
                        className={`w-full px-3 py-2 rounded-[12px] bg-[#f1efdf]/40 border ${
                          errors.fpoName ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                        } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                      />
                      {errors.fpoName && <span className="text-[11px] text-[#ba1a1a] block">{errors.fpoName}</span>}
                    </div>

                    {/* 4. Hub Location */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        4. Hub Physical Location / Yard Address *
                      </label>
                      <input
                        name="hubLocation"
                        type="text"
                        required
                        value={formData.hubLocation}
                        onChange={handleChange}
                        placeholder="e.g. Gate 4, APMC Market Yard, Dindori, Nashik"
                        className={`w-full px-3 py-2 rounded-[12px] bg-[#f1efdf]/40 border ${
                          errors.hubLocation ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                        } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                      />
                      {errors.hubLocation && <span className="text-[11px] text-[#ba1a1a] block">{errors.hubLocation}</span>}
                    </div>

                    {/* 5. Contact Person */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        5. Lead Operator *
                      </label>
                      <input
                        name="contactPerson"
                        type="text"
                        required
                        value={formData.contactPerson}
                        onChange={handleChange}
                        placeholder="e.g. Suresh Shinde"
                        className={`w-full px-3 py-2 rounded-[12px] bg-[#f1efdf]/40 border ${
                          errors.contactPerson ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                        } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                      />
                      {errors.contactPerson && <span className="text-[11px] text-[#ba1a1a] block">{errors.contactPerson}</span>}
                    </div>

                    {/* 6. Phone Number */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        6. Phone Number *
                      </label>
                      <input
                        name="phoneNumber"
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="+91 98221 44556"
                        className={`w-full px-3 py-2 rounded-[12px] bg-[#f1efdf]/40 border ${
                          errors.phoneNumber ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                        } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all font-mono`}
                      />
                      {errors.phoneNumber && <span className="text-[11px] text-[#ba1a1a] block">{errors.phoneNumber}</span>}
                    </div>

                    {/* 7. Operating Hours */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        7. Operating Hours
                      </label>
                      <input
                        name="operatingHours"
                        type="text"
                        value={formData.operatingHours}
                        onChange={handleChange}
                        placeholder="06:00 AM - 08:00 PM"
                        className="w-full px-3 py-2 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all"
                      />
                    </div>

                    {/* 8. Daily Capacity */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        8. Daily Capacity
                      </label>
                      <input
                        name="capacity"
                        type="text"
                        value={formData.capacity}
                        onChange={handleChange}
                        placeholder="50 MT / Day"
                        className="w-full px-3 py-2 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all"
                      />
                    </div>

                    {/* 9. Supported Products */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        9. Supported Produce Categories
                      </label>
                      <input
                        name="supportedProducts"
                        type="text"
                        value={formData.supportedProducts}
                        onChange={handleChange}
                        placeholder="Fresh Onions, Grapes, Tomatoes, Pomegranate"
                        className="w-full px-3 py-2 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all"
                      />
                    </div>

                    {/* 10. Email Address */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        10. Terminal Email Address *
                      </label>
                      <input
                        name="emailAddress"
                        type="email"
                        required
                        value={formData.emailAddress}
                        onChange={handleChange}
                        placeholder="dindori.hub01@sahyadri.org"
                        className={`w-full px-3 py-2 rounded-[12px] bg-[#f1efdf]/40 border ${
                          errors.emailAddress ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                        } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                      />
                      {errors.emailAddress && <span className="text-[11px] text-[#ba1a1a] block">{errors.emailAddress}</span>}
                    </div>

                    {/* 11. Password */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        11. Set Access Key *
                      </label>
                      <div className="relative">
                        <input
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="••••••••••••"
                          className={`w-full pl-3 pr-9 py-2 rounded-[12px] bg-[#f1efdf]/40 border ${
                            errors.password ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                          } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6d6d6d] hover:text-[#212529] cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[17px]">
                            {showPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                      {errors.password && <span className="text-[11px] text-[#ba1a1a] block">{errors.password}</span>}
                    </div>

                    {/* 12. Confirm Password */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        12. Confirm Access Key *
                      </label>
                      <div className="relative">
                        <input
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="••••••••••••"
                          className={`w-full pl-3 pr-9 py-2 rounded-[12px] bg-[#f1efdf]/40 border ${
                            errors.confirmPassword ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                          } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6d6d6d] hover:text-[#212529] cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[17px]">
                            {showConfirmPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <span className="text-[11px] text-[#ba1a1a] block">{errors.confirmPassword}</span>
                      )}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 px-8 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] font-sans text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-[0.99] cursor-pointer disabled:opacity-75"
                    >
                      {isLoading ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Activating Hub Depot Terminal...</span>
                        </>
                      ) : (
                        <>
                          <span>Complete Setup & Initialize Depot</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      <Link
                        to="/hub/login"
                        className="font-sans text-xs text-[#6d6d6d] hover:text-[#1b6e53] hover:underline"
                      >
                        Cancel / Back to Hub Login
                      </Link>
                    </div>
                  </div>
                </form>
              ) : (
                /* ============================================================ */
                /* SUCCESS STATE VIEW                                           */
                /* ============================================================ */
                <SuccessState
                  title="Hub Depot Activated"
                  description="Your hub station configuration is complete. You can now operate intake queues, record weighbridge tickets, and dispatch cold-chain trucks."
                  idLabel="Hub Terminal ID"
                  idValue={formData.hubId}
                  actionTo="/hub/dashboard"
                  actionLabel="Continue to Hub Dashboard"
                  secondaryAction={
                    <p className="font-sans text-xs text-[#6d6d6d]">
                      Need to revise station parameters?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setIsSuccess(false)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="text-[#1b6e53] underline font-bold cursor-pointer"
                      >
                        Back to setup form
                      </button>
                    </p>
                  }
                />
              )}
            </div>

            {/* Bottom Note */}
            <div className="mt-6 p-3.5 rounded-[14px] bg-[#f1efdf] border border-[#c3cda7]">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#e6ecd5] border border-[#c3cda7] flex items-center justify-center shrink-0 mt-0.5 text-[#1b6e53]">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-xs font-bold text-[#1b6e53] leading-snug">
                    FPO Verified Depot Gateway
                  </p>
                  <p className="font-sans text-[11px] text-[#353535] mt-0.5 leading-relaxed">
                    All weighments recorded on this station generate immutable digital receipts and trigger instant farmer UPI credit via Jan Dhan APMC rails.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Minimal Bottom Editorial Footer */}
      <AuthFooter tierLabel="IoT Hub Aggregation Depot Tier" />
    </div>
  )
}
