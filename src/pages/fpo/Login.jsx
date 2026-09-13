import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export default function FPOLogin() {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('manager@agricoop.org')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/fpo/dashboard')
    }, 600)
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
                    FPO Network Verified
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Action Link */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1b6e53] hover:text-[#00372a] transition-colors group"
            >
              <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">
                arrow_back
              </span>
              <span>Back to Launch Portal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Main Login Workspace */}
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

              {/* Editorial Left Narrative */}
              <h1 className="font-editorial text-3xl sm:text-4xl text-[#00372a] font-normal leading-[1.2] tracking-tight mb-3">
                Manage your supply network.
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#353535] font-normal leading-relaxed mb-6">
                Manage buyers, products, hubs, farmers and fulfillment from one connected workspace.
              </p>

              {/* 3 Pastoral Feature Highlights */}
              <div className="space-y-3">
                {/* Highlight 1 */}
                <div className="p-3.5 rounded-[16px] bg-[#ffffff] border border-[#c3cda7]/70 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                    </div>
                    <div className="min-w-0">
                      <span className="block font-sans text-xs font-bold text-[#212529]">
                        Procurement Management
                      </span>
                      <span className="block font-sans text-[11px] text-[#6d6d6d] mt-0.5 leading-snug">
                        Direct institutional contracts & dynamic PO allocation
                      </span>
                    </div>
                  </div>
                </div>

                {/* Highlight 2 */}
                <div className="p-3.5 rounded-[16px] bg-[#ffffff] border border-[#c3cda7]/70 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#b2cee7]/40 text-[#1b6e53] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[18px]">hub</span>
                    </div>
                    <div className="min-w-0">
                      <span className="block font-sans text-xs font-bold text-[#212529]">
                        Hub & Farmer Coordination
                      </span>
                      <span className="block font-sans text-[11px] text-[#6d6d6d] mt-0.5 leading-snug">
                        Real-time weighment tally & zero-smartphone IVR dispatch
                      </span>
                    </div>
                  </div>
                </div>

                {/* Highlight 3 */}
                <div className="p-3.5 rounded-[16px] bg-[#ffffff] border border-[#c3cda7]/70 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#fceace] text-[#683600] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                    </div>
                    <div className="min-w-0">
                      <span className="block font-sans text-xs font-bold text-[#212529]">
                        Fulfillment Tracking
                      </span>
                      <span className="block font-sans text-[11px] text-[#6d6d6d] mt-0.5 leading-snug">
                        Cold-chain transit telemetry & instant T+0 escrow clearing
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="pt-6 mt-6 flex items-center gap-2 text-[#1b6e53] border-t border-[#c3cda7]/50 relative z-10 text-xs">
              <span className="material-symbols-outlined text-[17px]">verified_user</span>
              <span className="font-mono text-[11px] font-medium">
                256-bit Encrypted • Tier 1 FPO Cooperative Node
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
                    FPO Workspace
                  </h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#f1efdf] text-[#1b6e53] border border-[#c3cda7] font-mono">
                    PORTAL
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#6d6d6d] leading-relaxed">
                  Sign in to manage your institutional aggregation terminal.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* FPO ID or Email Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="fpo-identifier"
                    className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]"
                  >
                    FPO ID or Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6d6d6d]">
                      <span className="material-symbols-outlined text-[19px]">badge</span>
                    </div>
                    <input
                      id="fpo-identifier"
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. FPO-NSK-402 or manager@agricoop.org"
                      className="w-full pl-10 pr-4 py-3 rounded-[14px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="fpo-password"
                      className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]"
                    >
                      Access Token / Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="font-sans text-xs font-semibold text-[#1b6e53] hover:underline transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6d6d6d]">
                      <span className="material-symbols-outlined text-[19px]">lock</span>
                    </div>
                    <input
                      id="fpo-password"
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
                      Keep this terminal signed in (30 days)
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
                        <span>Authenticating Terminal Session...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In to Terminal</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Auxiliary Registration Action */}
              <div className="mt-6 text-center text-xs">
                <span className="text-[#6d6d6d]">Don't have an FPO workspace registered?</span>
                <Link
                  to="/fpo/register"
                  className="text-[#1b6e53] font-bold hover:underline ml-1 inline-flex items-center gap-0.5"
                >
                  <span>Create FPO Account</span>
                  <span className="material-symbols-outlined text-[14px]">north_east</span>
                </Link>
              </div>
            </div>

            {/* Information Note */}
            <div className="mt-8 p-4 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7]">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#e6ecd5] border border-[#c3cda7] flex items-center justify-center shrink-0 mt-0.5 text-[#1b6e53]">
                  <span className="material-symbols-outlined text-[15px]">info</span>
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-xs font-bold text-[#1b6e53] leading-snug">
                    Commercial & Supply Operations Tier
                  </p>
                  <p className="font-sans text-[11px] text-[#353535] mt-1 leading-relaxed">
                    Member farmers do not log in here. Farmer supply is coordinated via local hub weighbridges and automated SMS/IVR.
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
