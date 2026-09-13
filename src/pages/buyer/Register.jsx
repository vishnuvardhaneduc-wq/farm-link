import React, { useState } from 'react'
import { Link } from 'react-router'
import AuthHeader from '../../components/auth/AuthHeader'
import AuthFooter from '../../components/auth/AuthFooter'
import SuccessState from '../../components/auth/SuccessState'

export default function BuyerRegister() {
  // Form State
  const [formData, setFormData] = useState({
    orgName: 'AgriFresh Retail Corp.',
    businessType: 'Retail Chain / Supermarket',
    contactPerson: 'Ananya Deshmukh (Head of Sourcing)',
    phoneNumber: '+91 98450 67890',
    emailAddress: 'ananya@agrifreshretail.com',
    state: 'Maharashtra',
    city: 'Mumbai',
    password: 'password123',
    confirmPassword: 'password123',
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [generatedBuyerId, setGeneratedBuyerId] = useState('BUY-00482')

  const businessTypes = [
    'Retail Chain / Supermarket',
    'Food Processing & Manufacturing',
    'Ag Exporter & Overseas Trading',
    'Wholesale Mandi Distributor',
    'Institutional Catering & Hospitality',
    'Agri-Tech Platform / Dark Store',
  ]

  const states = [
    'Maharashtra',
    'Gujarat',
    'Karnataka',
    'Delhi NCR',
    'Madhya Pradesh',
    'Tamil Nadu',
    'Punjab',
    'Haryana',
    'Telangana',
    'Andhra Pradesh',
    'Rajasthan',
    'Uttar Pradesh',
    'West Bengal',
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.orgName.trim()) newErrors.orgName = 'Organization / Business name is required'
    if (!formData.businessType.trim()) newErrors.businessType = 'Business type is required'
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required'

    const cleanPhone = formData.phoneNumber.replace(/[^0-9]/g, '')
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phoneNumber = 'Enter a valid 10-digit phone number'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.emailAddress || !emailRegex.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Enter a valid official email address'
    }

    if (!formData.city.trim()) newErrors.city = 'City is required'

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
      const randomNum = Math.floor(100 + Math.random() * 900)
      setGeneratedBuyerId(`BUY-00${randomNum}`)
      setIsSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 700)
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f1efdf] font-sans text-[#212529] selection:bg-[#e8fe85] selection:text-[#1b6e53]">
      {/* 1. Minimal Top Navigation Bar */}
      <AuthHeader portalTitle="Buyer Enterprise Onboarding" backTo="/buyer/login" backLabel="Back to Buyer Login" />

      {/* 2. Main Registration Workspace */}
      <main className="w-full flex-1 flex items-center justify-center py-10 sm:py-14 px-4 sm:px-8">
        <div className="w-full max-w-5xl bg-[#ffffff] rounded-[24px] sm:rounded-[32px] border border-[#c3cda7] shadow-[0_12px_40px_-15px_rgba(7,80,63,0.08)] overflow-hidden flex flex-col md:flex-row">
          {/* LEFT PANEL: Authority & Highlights */}
          <div className="w-full md:w-5/12 bg-[#e6ecd5] p-8 sm:p-10 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#c3cda7]/60">
            <div className="relative z-10 flex flex-col">
              {/* Brand Badge Lockup */}
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[17px]">apartment</span>
                </div>
                <span className="font-editorial text-xl font-bold text-[#00372a] tracking-tight">
                  FarmLink
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff]/80 border border-[#c3cda7] text-[#1b6e53] font-mono text-[9px] font-bold tracking-widest uppercase">
                  BUYER ENTERPRISE
                </span>
              </div>

              {/* Editorial Narrative */}
              <h1 className="font-editorial text-3xl sm:text-4xl text-[#00372a] font-normal leading-[1.2] tracking-tight mb-3">
                Streamline institutional procurement.
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#353535] font-normal leading-relaxed mb-6">
                Register your enterprise to unlock direct farmgate supply contracts, AI-grade assay verification, and multi-hub dispatch routing.
              </p>

              {/* Scope Checklist Box */}
              <div className="p-4 sm:p-5 rounded-[18px] bg-[#ffffff] border border-[#c3cda7]/80 shadow-2xs">
                <div className="flex items-center gap-2 mb-3 text-[#1b6e53] font-sans text-xs font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[17px]">checklist</span>
                  <span>Buyer Enterprise Capabilities:</span>
                </div>

                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex items-center gap-2 text-[#212529] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] shrink-0"></span>
                    <span>Discover FPOs</span>
                    <span className="text-[#6d6d6d] text-[11px]">(Federation directories & crops)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#212529] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] shrink-0"></span>
                    <span>Procurement Indents</span>
                    <span className="text-[#6d6d6d] text-[11px]">(Publish custom volume tenders)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#212529] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] shrink-0"></span>
                    <span>Compare Offers</span>
                    <span className="text-[#6d6d6d] text-[11px]">(Real-time quotes & assay grade)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#212529] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] shrink-0"></span>
                    <span>Order Tracking</span>
                    <span className="text-[#6d6d6d] text-[11px]">(Cold-chain GPS & weighment slips)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#212529] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] shrink-0"></span>
                    <span>Escrow Settlements</span>
                    <span className="text-[#6d6d6d] text-[11px]">(Safe clearing upon assay sign-off)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="pt-6 mt-6 flex items-center gap-2 text-[#1b6e53] border-t border-[#c3cda7]/50 relative z-10 text-xs">
              <span className="material-symbols-outlined text-[17px]">verified_user</span>
              <span className="font-mono text-[11px] font-medium">
                256-bit Encrypted • APMC eNAM Settlement Framework
              </span>
            </div>
          </div>

          {/* RIGHT PANEL: Form or Success View */}
          <div className="w-full md:w-7/12 p-8 sm:p-11 flex flex-col justify-between bg-[#ffffff]">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <h2 className="font-editorial text-2xl sm:text-3xl text-[#00372a] font-normal tracking-tight">
                      Create Buyer Account
                    </h2>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#f1efdf] text-[#1b6e53] border border-[#c3cda7] font-mono">
                      ONBOARDING
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-[#6d6d6d] leading-relaxed">
                    Enter your enterprise details to establish verified commercial procurement access.
                  </p>
                </div>
              </div>

              {!isSuccess ? (
                /* ============================================================ */
                /* BUYER REGISTRATION FORM                                      */
                /* ============================================================ */
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* 1. Business / Org Name */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        1. Business / Organization Name *
                      </label>
                      <input
                        name="orgName"
                        type="text"
                        required
                        value={formData.orgName}
                        onChange={handleChange}
                        placeholder="e.g. AgriFresh Retail Corp."
                        className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                          errors.orgName ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                        } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                      />
                      {errors.orgName && <span className="text-[11px] text-[#ba1a1a] block">{errors.orgName}</span>}
                    </div>

                    {/* 2. Business Type */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        2. Business Type *
                      </label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all cursor-pointer"
                      >
                        {businessTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
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
                        placeholder="e.g. Ananya Deshmukh"
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
                        placeholder="+91 98450 67890"
                        className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                          errors.phoneNumber ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                        } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all font-mono`}
                      />
                      {errors.phoneNumber && <span className="text-[11px] text-[#ba1a1a] block">{errors.phoneNumber}</span>}
                    </div>

                    {/* 5. Email Address */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        5. Official Email Address *
                      </label>
                      <input
                        name="emailAddress"
                        type="email"
                        required
                        value={formData.emailAddress}
                        onChange={handleChange}
                        placeholder="procurement@agrifreshretail.com"
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

                    {/* 7. City */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        7. City *
                      </label>
                      <input
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Mumbai"
                        className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#f1efdf]/40 border ${
                          errors.city ? 'border-[#ba1a1a]' : 'border-[#c3cda7]'
                        } text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all`}
                      />
                      {errors.city && <span className="text-[11px] text-[#ba1a1a] block">{errors.city}</span>}
                    </div>

                    {/* 8. Password */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        8. Password *
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

                    {/* 9. Confirm Password */}
                    <div className="space-y-1">
                      <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]">
                        9. Confirm Password *
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
                    By registering as a buyer, you agree to the{' '}
                    <span className="text-[#1b6e53] underline font-medium cursor-pointer">
                      Institutional Buyer Terms
                    </span>{' '}
                    and{' '}
                    <span className="text-[#1b6e53] underline font-medium cursor-pointer">
                      National Ag Escrow Framework
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
                        <span>Registering Buyer Workspace...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Buyer Account</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </>
                    )}
                  </button>

                  <div className="mt-4 text-center">
                    <span className="font-sans text-xs sm:text-sm text-[#6d6d6d]">
                      Already have an account?
                    </span>
                    <Link
                      to="/buyer/login"
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
                <SuccessState
                  title="Buyer Account Created"
                  description="Your enterprise workspace is active. You can now publish procurement demands and contract with verified FPO suppliers."
                  idLabel="Buyer ID"
                  idValue={generatedBuyerId}
                  actionTo="/buyer/dashboard"
                  actionLabel="Continue to Buyer Dashboard"
                  secondaryAction={
                    <p className="font-sans text-xs text-[#6d6d6d]">
                      Need to revise enterprise details?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setIsSuccess(false)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="text-[#1b6e53] underline font-bold cursor-pointer"
                      >
                        Back to edit form
                      </button>
                    </p>
                  }
                />
              )}
            </div>

            {/* Bottom Verification Note */}
            <div className="mt-6 p-3.5 rounded-[14px] bg-[#f1efdf] border border-[#c3cda7]">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#e6ecd5] border border-[#c3cda7] flex items-center justify-center shrink-0 mt-0.5 text-[#1b6e53]">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-xs font-bold text-[#1b6e53] leading-snug">
                    Verified Commercial Tier
                  </p>
                  <p className="font-sans text-[11px] text-[#353535] mt-0.5 leading-relaxed">
                    Registered buyers receive an automated eNAM escrow linkage ensuring transparent clearing against digital assay certificates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Minimal Bottom Editorial Footer */}
      <AuthFooter tierLabel="Institutional Buyer Procurement Tier" />
    </div>
  )
}
