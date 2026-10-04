import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { supabase } from '../../lib/supabase'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please ensure both fields are identical.')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        console.error('Supabase password update error:', error)
        setIsLoading(false)
        setErrorMsg(error.message || 'Unable to update password. Your reset link may have expired.')
        return
      }

      setIsLoading(false)
      setIsSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Unexpected password reset error:', err)
      setIsLoading(false)
      setErrorMsg('An unexpected error occurred while resetting your password. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f1efdf] font-sans text-[#212529] selection:bg-[#e8fe85] selection:text-[#1b6e53]">
      {/* 1. Minimal Top Navigation Bar */}
      <header className="w-full bg-[#f1efdf]/90 backdrop-blur-md sticky top-0 z-40 border-b border-[#c3cda7]/50">
        <div className="max-w-7xl mx-auto h-20 px-6 sm:px-10 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 21h18L12 2zm0 4.5l5.5 11.5h-11L12 6.5z"></path>
                </svg>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-editorial text-2xl font-bold tracking-tight text-[#00372a]">
                  KrishiSetu
                </span>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6ecd5] border border-[#c3cda7] text-[#1b6e53]">
                  <span className="w-2 h-2 rounded-full bg-[#1b6e53]"></span>
                  <span className="text-[11px] font-semibold tracking-wide uppercase font-mono">
                    Security Vault
                  </span>
                </div>
              </div>
            </Link>
          </div>

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

      {/* 2. Main Password Reset Workspace */}
      <main className="w-full flex-1 flex items-center justify-center py-10 sm:py-14 px-4 sm:px-8">
        <div className="w-full max-w-5xl bg-[#ffffff] rounded-[24px] sm:rounded-[32px] border border-[#c3cda7] shadow-[0_12px_40px_-15px_rgba(7,80,63,0.08)] overflow-hidden flex flex-col md:flex-row">
          {/* LEFT PANEL: Pastoral Authority & Highlights */}
          <div className="w-full md:w-5/12 bg-[#e6ecd5] p-8 sm:p-10 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#c3cda7]/60">
            <div className="relative z-10 flex flex-col">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[17px]">lock_reset</span>
                </div>
                <span className="font-editorial text-xl font-bold text-[#00372a] tracking-tight">
                  KrishiSetu
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff]/80 border border-[#c3cda7] text-[#1b6e53] font-mono text-[9px] font-bold tracking-widest uppercase">
                  CREDENTIAL ROTATION
                </span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl text-[#00372a] font-normal leading-[1.2] tracking-tight mb-3">
                Set a new password.
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#353535] font-normal leading-relaxed mb-6">
                Create a secure password to re-establish your FPO cooperative access token.
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-[16px] bg-[#ffffff] border border-[#c3cda7]/70 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      <span className="material-symbols-outlined text-[15px]">check</span>
                    </div>
                    <div className="min-w-0">
                      <span className="block font-sans text-xs font-bold text-[#212529]">
                        Minimum 6 Characters
                      </span>
                      <span className="block font-sans text-[11px] text-[#6d6d6d] mt-0.5">
                        Combine numbers and letters for heightened security
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-[16px] bg-[#ffffff] border border-[#c3cda7]/70 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#b2cee7]/40 text-[#1b6e53] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      <span className="material-symbols-outlined text-[15px]">security</span>
                    </div>
                    <div className="min-w-0">
                      <span className="block font-sans text-xs font-bold text-[#212529]">
                        Single Co-op Node Session
                      </span>
                      <span className="block font-sans text-[11px] text-[#6d6d6d] mt-0.5">
                        New credentials apply immediately across all authorized dispatch devices
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 flex items-center gap-2 text-[#1b6e53] border-t border-[#c3cda7]/50 relative z-10 text-xs">
              <span className="material-symbols-outlined text-[17px]">verified_user</span>
              <span className="font-mono text-[11px] font-medium">
                256-bit Encrypted Cryptographic Signature
              </span>
            </div>
          </div>

          {/* RIGHT PANEL: Form or Success View */}
          <div className="w-full md:w-7/12 p-8 sm:p-12 flex flex-col justify-between bg-[#ffffff]">
            <div>
              <div className="mb-7">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <h2 className="font-editorial text-3xl sm:text-4xl text-[#00372a] font-normal tracking-tight">
                    New Credentials
                  </h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#f1efdf] text-[#1b6e53] border border-[#c3cda7] font-mono">
                    SECURE
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#6d6d6d] leading-relaxed">
                  Enter your new password below to complete terminal recovery.
                </p>
              </div>

              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* New Password */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="new-password"
                      className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6d6d6d]">
                        <span className="material-symbols-outlined text-[19px]">lock</span>
                      </div>
                      <input
                        id="new-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          if (errorMsg) setErrorMsg('')
                        }}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-11 py-3 rounded-[14px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6d6d6d] hover:text-[#212529] cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[19px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="confirm-new-password"
                      className="block font-sans text-xs font-semibold tracking-wide uppercase text-[#212529]"
                    >
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6d6d6d]">
                        <span className="material-symbols-outlined text-[19px]">lock_clock</span>
                      </div>
                      <input
                        id="confirm-new-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value)
                          if (errorMsg) setErrorMsg('')
                        }}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-11 py-3 rounded-[14px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] font-sans text-xs sm:text-sm placeholder:text-[#6d6d6d]/70 focus:outline-none focus:border-[#1b6e53] focus:ring-1 focus:ring-[#1b6e53] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6d6d6d] hover:text-[#212529] cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[19px]">
                          {showConfirmPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Error Banner */}
                  {errorMsg && (
                    <div className="p-3.5 rounded-[12px] bg-[#ba1a1a]/10 border border-[#ba1a1a]/30 text-[#ba1a1a] text-xs font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 px-8 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] font-sans text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-[0.99] cursor-pointer disabled:opacity-75"
                    >
                      {isLoading ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Updating Password...</span>
                        </>
                      ) : (
                        <>
                          <span>Update Password</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-8 px-6 bg-[#e6ecd5]/50 rounded-[24px] border border-[#c3cda7] text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center mx-auto shadow-sm">
                    <span className="material-symbols-outlined text-[32px]">check_circle</span>
                  </div>

                  <div>
                    <h3 className="font-editorial text-3xl text-[#00372a] font-normal tracking-tight mb-2">
                      Password Updated Successfully
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#353535] max-w-md mx-auto leading-relaxed">
                      Your terminal credentials have been securely rotated. You can now sign in with your new password.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/fpo/login"
                      className="w-full sm:w-auto px-8 h-12 rounded-full bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] font-sans text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-[0.99]"
                    >
                      <span>Proceed to Sign In</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Info Note */}
            <div className="mt-8 p-4 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7]">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#e6ecd5] border border-[#c3cda7] flex items-center justify-center shrink-0 mt-0.5 text-[#1b6e53]">
                  <span className="material-symbols-outlined text-[15px]">info</span>
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-xs font-bold text-[#1b6e53] leading-snug">
                    Federation Security Protocol
                  </p>
                  <p className="font-sans text-[11px] text-[#353535] mt-1 leading-relaxed">
                    Passwords are cryptographically hashed using PBKDF2 with SHA-256. Raw passwords are never transmitted unencrypted or stored in plain text.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <footer className="w-full bg-[#f1efdf] py-6 border-t border-[#c3cda7]/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#6d6d6d] font-sans text-xs">
          <div>
            © 2026 KrishiSetu AgroTech Systems. Security & Recovery Tier.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#1b6e53] transition-colors cursor-pointer">Security Protocol</span>
            <span className="text-[#c3cda7]">•</span>
            <span className="hover:text-[#1b6e53] transition-colors cursor-pointer">Privacy Framework</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
