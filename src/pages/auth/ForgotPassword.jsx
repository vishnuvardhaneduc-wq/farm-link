import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import AuthHeader from '../../components/auth/AuthHeader'
import AuthFooter from '../../components/auth/AuthFooter'
import SuccessState from '../../components/auth/SuccessState'

export default function ForgotPassword() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialRole = searchParams.get('role') || 'fpo'
  const [selectedRole, setSelectedRole] = useState(initialRole)

  const [identifier, setIdentifier] = useState('manager@agricoop.org')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const roleConfig = {
    fpo: {
      name: 'FPO Federation',
      icon: 'groups',
      badge: 'FPO FEDERATION',
      loginTo: '/fpo/login',
      loginLabel: 'Back to FPO Login',
      placeholder: 'e.g. FPO-NSK-402 or manager@agricoop.org',
      label: 'FPO Registered Email or ID',
    },
    buyer: {
      name: 'Buyer Enterprise',
      icon: 'apartment',
      badge: 'BUYER ENTERPRISE',
      loginTo: '/buyer/login',
      loginLabel: 'Back to Buyer Login',
      placeholder: 'e.g. BUY-00482 or procurement@agrifreshretail.com',
      label: 'Buyer Official Email or ID',
    },
    hub: {
      name: 'Hub Aggregation',
      icon: 'scale',
      badge: 'HUB OPERATIONS',
      loginTo: '/hub/login',
      loginLabel: 'Back to Hub Login',
      placeholder: 'e.g. HUB-NSK-01 or operator@sahyadri-hub1.fl',
      label: 'Hub Terminal Email or ID',
    },
  }

  const currentRole = roleConfig[selectedRole] || roleConfig.fpo

  const handleRoleChange = (role) => {
    setSelectedRole(role)
    setSearchParams({ role })
    if (role === 'fpo') setIdentifier('manager@agricoop.org')
    else if (role === 'buyer') setIdentifier('procurement@agrifreshretail.com')
    else if (role === 'hub') setIdentifier('operator@sahyadri-hub1.fl')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 600)
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f1efdf] font-sans text-[#212529] selection:bg-[#e8fe85] selection:text-[#1b6e53]">
      {/* 1. Top Navigation Bar */}
      <AuthHeader portalTitle="Terminal Access Recovery" backTo={currentRole.loginTo} backLabel={currentRole.loginLabel} />

      {/* 2. Main Forgot Password Workspace */}
      <main className="w-full flex-1 flex items-center justify-center py-10 sm:py-14 px-4 sm:px-8">
        <div className="w-full max-w-5xl bg-[#ffffff] rounded-[24px] sm:rounded-[32px] border border-[#c3cda7] shadow-[0_12px_40px_-15px_rgba(7,80,63,0.08)] overflow-hidden flex flex-col md:flex-row">
          {/* LEFT PANEL: Security Authority */}
          <div className="w-full md:w-5/12 bg-[#e6ecd5] p-8 sm:p-10 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#c3cda7]/60">
            <div className="relative z-10 flex flex-col">
              {/* Brand Badge */}
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[17px]">lock_reset</span>
                </div>
                <span className="font-editorial text-xl font-bold text-[#00372a] tracking-tight">
                  FarmLink
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff]/80 border border-[#c3cda7] text-[#1b6e53] font-mono text-[9px] font-bold tracking-widest uppercase">
                  SECURITY VAULT
                </span>
              </div>

              {/* Editorial Left Narrative */}
              <h1 className="font-editorial text-3xl sm:text-4xl text-[#00372a] font-normal leading-[1.2] tracking-tight mb-3">
                Recover your terminal credentials.
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#353535] font-normal leading-relaxed mb-6">
                To maintain APMC and eNAM institutional security standards, password reset links expire after 15 minutes.
              </p>

              {/* 3 Step Protocol Highlight Cards */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-[16px] bg-[#ffffff] border border-[#c3cda7]/70 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      1
                    </div>
                    <div className="min-w-0">
                      <span className="block font-sans text-xs font-bold text-[#212529]">
                        Select Portal Category
                      </span>
                      <span className="block font-sans text-[11px] text-[#6d6d6d] mt-0.5">
                        Confirm if you are recovering FPO, Buyer, or Hub credentials
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-[16px] bg-[#ffffff] border border-[#c3cda7]/70 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#b2cee7]/40 text-[#1b6e53] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      2
                    </div>
                    <div className="min-w-0">
                      <span className="block font-sans text-xs font-bold text-[#212529]">
                        Dispatched OTP / Magic Link
                      </span>
                      <span className="block font-sans text-[11px] text-[#6d6d6d] mt-0.5">
                        A cryptographic verification link will be routed to your email
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-[16px] bg-[#ffffff] border border-[#c3cda7]/70 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#fceace] text-[#683600] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      3
                    </div>
                    <div className="min-w-0">
                      <span className="block font-sans text-xs font-bold text-[#212529]">
                        Rotate Access Token
                      </span>
                      <span className="block font-sans text-[11px] text-[#6d6d6d] mt-0.5">
                        Set a new 6+ character password to re-authenticate terminal
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
                End-to-End Encrypted Session Recovery
              </span>
            </div>
          </div>

          {/* RIGHT PANEL: Form or Success View */}
          <div className="w-full md:w-7/12 p-8 sm:p-12 flex flex-col justify-between bg-[#ffffff]">
            <div>
              {/* Form Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <h2 className="font-editorial text-3xl sm:text-4xl text-[#00372a] font-normal tracking-tight">
                    Password Recovery
                  </h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#f1efdf] text-[#1b6e53] border border-[#c3cda7] font-mono">
                    RESET
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#6d6d6d] leading-relaxed">
                  Enter your registered account identifier to receive password reset instructions.
                </p>
              </div>

              {/* Role Selection Tabs */}
              <div className="mb-6">
                <label className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529] mb-2">
                  Select Account Role
                </label>
                <div className="grid grid-cols-3 gap-2 bg-[#f1efdf]/60 p-1.5 rounded-[16px] border border-[#c3cda7]">
                  <button
                    type="button"
                    onClick={() => handleRoleChange('fpo')}
                    className={`py-2 px-3 rounded-[12px] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedRole === 'fpo'
                        ? 'bg-[#1b6e53] text-[#ffffff] shadow-sm'
                        : 'text-[#353535] hover:bg-[#e6ecd5]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">groups</span>
                    <span>FPO</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange('buyer')}
                    className={`py-2 px-3 rounded-[12px] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedRole === 'buyer'
                        ? 'bg-[#1b6e53] text-[#ffffff] shadow-sm'
                        : 'text-[#353535] hover:bg-[#e6ecd5]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">apartment</span>
                    <span>Buyer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange('hub')}
                    className={`py-2 px-3 rounded-[12px] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedRole === 'hub'
                        ? 'bg-[#1b6e53] text-[#ffffff] shadow-sm'
                        : 'text-[#353535] hover:bg-[#e6ecd5]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">scale</span>
                    <span>Hub</span>
                  </button>
                </div>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="reset-identifier"
                      className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]"
                    >
                      {currentRole.label}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6d6d6d]">
                        <span className="material-symbols-outlined text-[19px]">mail</span>
                      </div>
                      <input
                        id="reset-identifier"
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder={currentRole.placeholder}
                        className="w-full pl-10 pr-4 py-3 rounded-[14px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 px-8 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] font-sans text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-[0.99] cursor-pointer disabled:opacity-75"
                    >
                      {isLoading ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Dispatching Reset Protocol...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Password Reset Link</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-4 text-center">
                    <Link
                      to={currentRole.loginTo}
                      className="font-sans text-xs sm:text-sm text-[#1b6e53] font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                      <span>{currentRole.loginLabel}</span>
                    </Link>
                  </div>
                </form>
              ) : (
                <SuccessState
                  title="Password reset instructions sent."
                  description={`We have dispatched recovery instructions to ${identifier}. Follow the cryptographic link to establish a new password.`}
                  actionTo={currentRole.loginTo}
                  actionLabel={currentRole.loginLabel}
                  secondaryAction={
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="font-sans text-xs text-[#1b6e53] underline font-bold cursor-pointer"
                    >
                      Resend link or use different identifier
                    </button>
                  }
                />
              )}
            </div>

            {/* Bottom Support Note */}
            <div className="mt-8 p-4 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7]">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#e6ecd5] border border-[#c3cda7] flex items-center justify-center shrink-0 mt-0.5 text-[#1b6e53]">
                  <span className="material-symbols-outlined text-[15px]">support_agent</span>
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-xs font-bold text-[#1b6e53] leading-snug">
                    Federation Desk Support
                  </p>
                  <p className="font-sans text-[11px] text-[#353535] mt-1 leading-relaxed">
                    Locked out of hardware weighbridges or multi-tier enterprise accounts? Contact your designated state FPO coordinator for immediate token reactivation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Minimal Bottom Editorial Footer */}
      <AuthFooter tierLabel="FarmLink Cryptographic Security Tier" />
    </div>
  )
}
