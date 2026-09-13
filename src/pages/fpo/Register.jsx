import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export default function FPORegister() {
  const navigate = useNavigate()

  // Form State
  const [formData, setFormData] = useState({
    fpoName: 'Sahyadri Farmers Producer Co. Ltd.',
    fpoRegId: 'FPO-MH-2024-8891',
    contactPerson: 'Rajesh Patil (Managing Director)',
    phoneNumber: '+91 98230 12345',
    emailAddress: 'contact@sahyadrifarmers.org',
    state: 'Maharashtra',
    district: 'Nashik',
    operatingArea: 'Dindori & Niphad Talukas',
    password: 'password123',
    confirmPassword: 'password123',
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [generatedFpoId, setGeneratedFpoId] = useState('FPO-00124')

  const states = [
    'Maharashtra',
    'Gujarat',
    'Madhya Pradesh',
    'Karnataka',
    'Punjab',
    'Haryana',
    'Tamil Nadu',
    'Andhra Pradesh',
    'Rajasthan',
    'Uttar Pradesh',
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field on edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    // Required fields check
    if (!formData.fpoName.trim()) newErrors.fpoName = 'FPO Name is required'
    if (!formData.fpoRegId.trim()) newErrors.fpoRegId = 'Registration ID is required'
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required'

    // Phone validation
    const cleanPhone = formData.phoneNumber.replace(/[^0-9]/g, '')
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phoneNumber = 'Enter a valid 10-digit phone number'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.emailAddress || !emailRegex.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Enter a valid email address'
    }

    if (!formData.district.trim()) newErrors.district = 'District is required'
    if (!formData.operatingArea.trim()) newErrors.operatingArea = 'Operating area is required'

    // Password validation
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
      // Generate realistic mock FPO ID
      const randomNum = Math.floor(10000 + Math.random() * 90000)
      setGeneratedFpoId(`FPO-MH-${randomNum}`)
      setIsSuccess(true)
    }, 700)
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f1efdf] font-sans text-[#212529] selection:bg-[#e8fe85] selection:text-[#1b6e53]">
      {/* 1. Minimal Top Navigation Bar */}
      <header className="w-full bg-[#f1efdf]/90 backdrop-blur-md sticky top-0 z-40 border-b border-[#c3cda7]/50">
        <div className="max-w-7xl mx-auto h-20 px-6 sm:px-10 flex items-center justify-between">
          {/* Left: FarmLink Identity */}
          <div className="flex items-center gap-3.5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 21h18L12 2zm0 4.5l5.5 11.5h-11L12 6.5z"></path>
                </svg>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-editorial text-2xl font-bold tracking-tight text-[#00372a]">
                  FarmLink
                </span>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6ecd5] border border-[#c3cda7] text-[#1b6e53]">
                  <span className="w-2 h-2 rounded-full bg-[#1b6e53]"></span>
                  <span className="text-[11px] font-semibold tracking-wide uppercase font-mono">
                    FPO Federation Onboarding
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Action Link */}
          <div className="flex items-center gap-6">
            <Link
              to="/fpo/login"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1b6e53] hover:text-[#00372a] transition-colors group"
            >
              <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">
                arrow_back
              </span>
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Main Registration Workspace */}
      <main className="w-full flex-1 flex items-center justify-center py-10 sm:py-14 px-4 sm:px-8">
        <div className="w-full max-w-5xl bg-[#ffffff] rounded-[24px] sm:rounded-[32px] border border-[#c3cda7] shadow-[0_12px_40px_-15px_rgba(7,80,63,0.08)] overflow-hidden flex flex-col md:flex-row">
          {/* LEFT PANEL: Pastoral Authority & Highlights */}
          <div className="w-full md:w-5/12 bg-[#e6ecd5] p-8 sm:p-10 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#c3cda7]/60">
            <div className="relative z-10 flex flex-col">
              {/* Brand Badge Lockup */}
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[17px]">eco</span>
                </div>
                <span className="font-editorial text-xl font-bold text-[#00372a] tracking-tight">
                  FarmLink
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff]/80 border border-[#c3cda7] text-[#1b6e53] font-mono text-[9px] font-bold tracking-widest uppercase">
                  FPO FEDERATION
                </span>
              </div>

              {/* Editorial Narrative */}
              <h1 className="font-editorial text-3xl sm:text-4xl text-[#00372a] font-normal leading-[1.2] tracking-tight mb-3">
                Join the national supply network.
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#353535] font-normal leading-relaxed mb-6">
                Register your Farmer Producer Organization to access verified institutional buyers, automated weighbridge hubs, and same-day UPI escrow settlements.
              </p>

              {/* Scope Checklist Box */}
              <div className="p-4 sm:p-5 rounded-[18px] bg-[#ffffff] border border-[#c3cda7]/80 shadow-2xs">
                <div className="flex items-center gap-2 mb-3 text-[#1b6e53] font-sans text-xs font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[17px]">tune</span>
                  <span>Your FPO account will later manage:</span>
                </div>

                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex items-center gap-2 text-[#212529] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] shrink-0"></span>
                    <span>Products</span>
                    <span className="text-[#6d6d6d] text-[11px]">(Bulk produce catalog & grading)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#212529] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] shrink-0"></span>
                    <span>Hubs</span>
                    <span className="text-[#6d6d6d] text-[11px]">(Collection centers & weighbridges)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#212529] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] shrink-0"></span>
                    <span>Farmers</span>
                    <span className="text-[#6d6d6d] text-[11px]">(Member onboarding & acreages)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#212529] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] shrink-0"></span>
                    <span>Procurement Requests</span>
                    <span className="text-[#6d6d6d] text-[11px]">(Inbound buyer indent bids)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#212529] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] shrink-0"></span>
                    <span>Orders</span>
                    <span className="text-[#6d6d6d] text-[11px]">(Automated dispatch allocations)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#212529] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] shrink-0"></span>
                    <span>Fulfillment</span>
                    <span className="text-[#6d6d6d] text-[11px]">(Cold-chain GPS & transit QA)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#212529] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] shrink-0"></span>
                    <span>Settlements</span>
                    <span className="text-[#6d6d6d] text-[11px]">(T+0 escrow & bank deposits)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="pt-6 mt-6 flex items-center gap-2 text-[#1b6e53] border-t border-[#c3cda7]/50 relative z-10 text-xs">
              <span className="material-symbols-outlined text-[17px]">verified_user</span>
              <span className="font-mono text-[11px] font-medium">
                256-bit Encrypted • APMC & eNAM Federation Gateway
              </span>
            </div>
          </div>

          {/* RIGHT PANEL: Form or Success View */}
          <div className="w-full md:w-7/12 p-8 sm:p-11 flex flex-col justify-between bg-[#ffffff]">
            <div>
              {/* Header with Title & View Switcher */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <h2 className="font-editorial text-2xl sm:text-3xl text-[#00372a] font-normal tracking-tight">
                      Create FPO Account
                    </h2>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#f1efdf] text-[#1b6e53] border border-[#c3cda7] font-mono">
                      ONBOARDING
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-[#6d6d6d] leading-relaxed">
                    Set up your organization to connect with buyers and manage your supply network.
                  </p>
                </div>
              </div>

              {!isSuccess ? (
                /* ============================================================ */
                /* REGISTRATION FORM                                            */
                /* ============================================================ */
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        placeholder="e.g. Sahyadri Farmers Producer Co. Ltd."
                        className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                          errors.fpoName ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                        } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                      />
                      {errors.fpoName && <span className="text-[11px] text-[#ba1a1a] block">{errors.fpoName}</span>}
                    </div>

                    {/* 2. FPO Registration ID */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        2. FPO Registration ID *
                      </label>
                      <input
                        name="fpoRegId"
                        type="text"
                        required
                        value={formData.fpoRegId}
                        onChange={handleChange}
                        placeholder="e.g. FPO-MH-2024-8891"
                        className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                          errors.fpoRegId ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                        } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all font-mono`}
                      />
                      {errors.fpoRegId && <span className="text-[11px] text-[#ba1a1a] block">{errors.fpoRegId}</span>}
                    </div>

                    {/* 3. Contact Person */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        3. Contact Person *
                      </label>
                      <input
                        name="contactPerson"
                        type="text"
                        required
                        value={formData.contactPerson}
                        onChange={handleChange}
                        placeholder="e.g. Rajesh Patil (Director)"
                        className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                          errors.contactPerson ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                        } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                      />
                      {errors.contactPerson && <span className="text-[11px] text-[#ba1a1a] block">{errors.contactPerson}</span>}
                    </div>

                    {/* 4. Phone Number */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        4. Phone *
                      </label>
                      <input
                        name="phoneNumber"
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="+91 98230 12345"
                        className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                          errors.phoneNumber ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                        } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all font-mono`}
                      />
                      {errors.phoneNumber && <span className="text-[11px] text-[#ba1a1a] block">{errors.phoneNumber}</span>}
                    </div>

                    {/* 5. Email Address */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        5. Email *
                      </label>
                      <input
                        name="emailAddress"
                        type="email"
                        required
                        value={formData.emailAddress}
                        onChange={handleChange}
                        placeholder="contact@sahyadrifarmers.org"
                        className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                          errors.emailAddress ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                        } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                      />
                      {errors.emailAddress && <span className="text-[11px] text-[#ba1a1a] block">{errors.emailAddress}</span>}
                    </div>

                    {/* 6. State */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        6. State *
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
                    </div>

                    {/* 7. District */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        7. District *
                      </label>
                      <input
                        name="district"
                        type="text"
                        required
                        value={formData.district}
                        onChange={handleChange}
                        placeholder="e.g. Nashik"
                        className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                          errors.district ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                        } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                      />
                      {errors.district && <span className="text-[11px] text-[#ba1a1a] block">{errors.district}</span>}
                    </div>

                    {/* 8. Primary Operating Area */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        8. Primary Operating Area *
                      </label>
                      <input
                        name="operatingArea"
                        type="text"
                        required
                        value={formData.operatingArea}
                        onChange={handleChange}
                        placeholder="e.g. Dindori & Niphad Talukas"
                        className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                          errors.operatingArea ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                        } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                      />
                      {errors.operatingArea && <span className="text-[11px] text-[#ba1a1a] block">{errors.operatingArea}</span>}
                    </div>

                    {/* 9. Password */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        9. Password *
                      </label>
                      <div className="relative">
                        <input
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="••••••••••••"
                          className={`w-full pl-3.5 pr-10 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                            errors.password ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                          } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6d6d6d] hover:text-[#212529] cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {showPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                      {errors.password && <span className="text-[11px] text-[#ba1a1a] block">{errors.password}</span>}
                    </div>

                    {/* 10. Confirm Password */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        10. Confirm Password *
                      </label>
                      <div className="relative">
                        <input
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="••••••••••••"
                          className={`w-full pl-3.5 pr-10 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                            errors.confirmPassword ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                          } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6d6d6d] hover:text-[#212529] cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {showConfirmPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <span className="text-[11px] text-[#ba1a1a] block">{errors.confirmPassword}</span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-[#6d6d6d] leading-relaxed pt-1">
                    By registering, you agree to the{' '}
                    <span className="text-[#1b6e53] underline font-medium cursor-pointer">
                      FarmLink Institutional Protocol
                    </span>{' '}
                    and{' '}
                    <span className="text-[#1b6e53] underline font-medium cursor-pointer">
                      APMC eNAM Settlement Framework
                    </span>
                    .
                  </p>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 px-8 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] font-sans text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-[0.99] cursor-pointer mt-2 disabled:opacity-75"
                  >
                    {isLoading ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Registering FPO Workspace...</span>
                      </>
                    ) : (
                      <>
                        <span>Create FPO Account</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </>
                    )}
                  </button>

                  <div className="mt-4 text-center">
                    <span className="font-sans text-xs sm:text-sm text-[#6d6d6d]">
                      Already have an account?
                    </span>
                    <Link
                      to="/fpo/login"
                      className="font-sans text-xs sm:text-sm text-[#1b6e53] font-bold hover:underline ml-1 inline-flex items-center gap-0.5"
                    >
                      <span>Sign In</span>
                      <span className="material-symbols-outlined text-[14px]">north_east</span>
                    </Link>
                  </div>
                </form>
              ) : (
                /* ============================================================ */
                /* SUCCESS STATE VIEW                                           */
                /* ============================================================ */
                <div className="py-8 px-6 bg-[#e6ecd5]/50 rounded-[24px] border border-[#c3cda7] text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center mx-auto shadow-sm">
                    <span className="material-symbols-outlined text-[32px]">check_circle</span>
                  </div>

                  <div>
                    <h3 className="font-editorial text-3xl text-[#00372a] font-normal tracking-tight mb-2">
                      FPO Account Created
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#353535] max-w-md mx-auto leading-relaxed">
                      Your organization account is ready. Continue to complete your FPO setup and connect your primary hubs.
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#ffffff] border border-[#c3cda7] text-[#1b6e53] font-sans text-sm font-bold shadow-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1b6e53] animate-pulse"></span>
                    <span className="font-mono">FPO ID: {generatedFpoId}</span>
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/fpo/setup"
                      className="w-full sm:w-auto px-8 h-12 rounded-full bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] font-sans text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-[0.99]"
                    >
                      <span>Continue to FPO Setup</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                  </div>

                  <p className="font-sans text-xs text-[#6d6d6d]">
                    Need to revise form details?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="text-[#1b6e53] underline font-bold cursor-pointer"
                    >
                      Back to edit form
                    </button>
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Verification Guarantee Note */}
            <div className="mt-6 p-3.5 rounded-[14px] bg-[#f1efdf] border border-[#c3cda7]">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#e6ecd5] border border-[#c3cda7] flex items-center justify-center shrink-0 mt-0.5 text-[#1b6e53]">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-xs font-bold text-[#1b6e53] leading-snug">
                    Federation Verification Guarantee
                  </p>
                  <p className="font-sans text-[11px] text-[#353535] mt-0.5 leading-relaxed">
                    Onboarded FPOs receive a unique Federation Ledger Key enabling instant bulk trade auctions and cold-storage subsidy links.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Minimal Bottom Editorial Footer */}
      <footer className="w-full bg-[#f1efdf] py-6 border-t border-[#c3cda7]/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#6d6d6d] font-sans text-xs">
          <div>
            © 2026 FarmLink AgroTech Systems. Institutional FPO Access Tier.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#1b6e53] transition-colors cursor-pointer">Security Protocol</span>
            <span className="text-[#c3cda7]">•</span>
            <span className="hover:text-[#1b6e53] transition-colors cursor-pointer">Privacy Framework</span>
            <span className="text-[#c3cda7]">•</span>
            <span className="hover:text-[#1b6e53] transition-colors cursor-pointer">Network Operations Help</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
