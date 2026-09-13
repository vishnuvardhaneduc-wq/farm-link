import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import AuthHeader from '../../components/auth/AuthHeader'
import AuthFooter from '../../components/auth/AuthFooter'

export default function HubLogin() {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('hub.operator@sahyadri-hub1.fl')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/hub/dashboard')
    }, 600)
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f1efdf] font-sans text-[#212529] selection:bg-[#e8fe85] selection:text-[#1b6e53]">
      {/* 1. Minimal Top Navigation Bar */}
      <AuthHeader portalTitle="Hub Operations Depot" backTo="/" backLabel="Back to Launch Portal" />

      {/* 2. Main Login Workspace */}
      <main className="w-full flex-1 flex items-center justify-center py-10 sm:py-14 px-4 sm:px-8">
        <div className="w-full max-w-5xl bg-[#ffffff] rounded-[24px] sm:rounded-[32px] border border-[#c3cda7] shadow-[0_12px_40px_-15px_rgba(7,80,63,0.08)] overflow-hidden flex flex-col md:flex-row">
          {/* LEFT PANEL: Pastoral Authority & Highlights */}
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

              {/* Editorial Left Narrative */}
              <h1 className="font-editorial text-3xl sm:text-4xl text-[#00372a] font-normal leading-[1.2] tracking-tight mb-3">
                Operate local aggregation & weighing.
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#353535] font-normal leading-relaxed mb-6">
                Manage farmer collection, weighing, quality inspection, aggregation, and dispatch with direct hardware telemetry.
              </p>

              {/* 3 Pastoral Feature Highlights */}
              <div className="space-y-3">
                {/* Highlight 1 */}
                <div className="p-3.5 rounded-[16px] bg-[#ffffff] border border-[#c3cda7]/70 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[18px]">scale</span>
                    </div>
                    <div className="min-w-0">
                      <span className="block font-sans text-xs font-bold text-[#212529]">
                        Electronic Weighbridge
                      </span>
                      <span className="block font-sans text-[11px] text-[#6d6d6d] mt-0.5 leading-snug">
                        Tare/gross auto-capture & physical printed weighment slips
                      </span>
                    </div>
                  </div>
                </div>

                {/* Highlight 2 */}
                <div className="p-3.5 rounded-[16px] bg-[#ffffff] border border-[#c3cda7]/70 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#b2cee7]/40 text-[#1b6e53] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[18px]">camera_indoor</span>
                    </div>
                    <div className="min-w-0">
                      <span className="block font-sans text-xs font-bold text-[#212529]">
                        Computer-Vision Assay
                      </span>
                      <span className="block font-sans text-[11px] text-[#6d6d6d] mt-0.5 leading-snug">
                        Moisture, size grading, defect index & digital grade certs
                      </span>
                    </div>
                  </div>
                </div>

                {/* Highlight 3 */}
                <div className="p-3.5 rounded-[16px] bg-[#ffffff] border border-[#c3cda7]/70 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#fceace] text-[#683600] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[18px]">sms</span>
                    </div>
                    <div className="min-w-0">
                      <span className="block font-sans text-xs font-bold text-[#212529]">
                        Instant Farmer SMS & Escrow
                      </span>
                      <span className="block font-sans text-[11px] text-[#6d6d6d] mt-0.5 leading-snug">
                        Vernacular SMS receipts & auto-triggered UPI T+0 Jan Dhan pay
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="pt-6 mt-6 flex items-center gap-2 text-[#1b6e53] border-t border-[#c3cda7]/50 relative z-10 text-xs">
              <span className="material-symbols-outlined text-[17px]">hub</span>
              <span className="font-mono text-[11px] font-medium">
                Hardware Authenticated • IoT Field Weighbridge Depot
              </span>
            </div>
          </div>

          {/* RIGHT PANEL: Authentication Form */}
          <div className="w-full md:w-7/12 p-8 sm:p-12 flex flex-col justify-between bg-[#ffffff]">
            <div>
              {/* Form Header */}
              <div className="mb-7">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <h2 className="font-editorial text-3xl sm:text-4xl text-[#00372a] font-normal tracking-tight">
                    Hub Console
                  </h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#f1efdf] text-[#1b6e53] border border-[#c3cda7] font-mono">
                    OPERATIONS
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#6d6d6d] leading-relaxed">
                  Sign in to launch your physical intake terminal, weighbridge sensors, and dispatch tally.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Hub ID or Email Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="hub-identifier"
                    className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]"
                  >
                    Hub ID or Operator Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6d6d6d]">
                      <span className="material-symbols-outlined text-[19px]">pin</span>
                    </div>
                    <input
                      id="hub-identifier"
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. HUB-NSK-01 or operator@sahyadri-hub1.fl"
                      className="w-full pl-10 pr-4 py-3 rounded-[14px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="hub-password"
                      className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]"
                    >
                      Operator Access Key
                    </label>
                    <Link
                      to="/forgot-password?role=hub"
                      className="font-sans text-xs font-semibold text-[#1b6e53] hover:underline transition-colors"
                    >
                      Forgot Key?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6d6d6d]">
                      <span className="material-symbols-outlined text-[19px]">lock</span>
                    </div>
                    <input
                      id="hub-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-11 py-3 rounded-[14px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all"
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6d6d6d] hover:text-[#212529] transition-colors focus:outline-none cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[19px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Remember Checkbox */}
                <div className="pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-[#c3cda7] text-[#1b6e53] focus:ring-[#1b6e53] accent-[#1b6e53] cursor-pointer"
                    />
                    <span className="font-sans text-xs text-[#353535]">
                      Keep this terminal station signed in (Shift Session)
                    </span>
                  </label>
                </div>

                {/* Sign In Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 px-8 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] font-sans text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-[0.99] cursor-pointer disabled:opacity-75"
                  >
                    {isLoading ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Initializing Hub Station...</span>
                      </>
                    ) : (
                      <>
                        <span>Open Hub Console</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* FPO Token Setup Action */}
              <div className="mt-6 text-center text-xs">
                <span className="text-[#6d6d6d]">Received an FPO Hub Activation Token?</span>
                <Link
                  to="/hub/setup"
                  className="text-[#1b6e53] font-bold hover:underline ml-1 inline-flex items-center gap-0.5"
                >
                  <span>Complete Hub Setup</span>
                  <span className="material-symbols-outlined text-[14px]">north_east</span>
                </Link>
              </div>
            </div>

            {/* Information Note */}
            <div className="mt-8 p-4 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7]">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#fceace] border border-[#c3cda7] flex items-center justify-center shrink-0 mt-0.5 text-[#683600]">
                  <span className="material-symbols-outlined text-[15px]">info</span>
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-xs font-bold text-[#683600] leading-snug">
                    FPO-Managed Infrastructure
                  </p>
                  <p className="font-sans text-[11px] text-[#353535] mt-1 leading-relaxed">
                    Hub accounts are created and authorized directly by FPO Managers. Farmers do not require app logins; intake is handled through your hardware station.
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
