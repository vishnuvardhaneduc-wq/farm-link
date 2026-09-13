import React, { useState } from 'react'
import { Link } from 'react-router'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f1efdf] font-sans text-[#212529] selection:bg-[#e8fe85] selection:text-[#1b6e53]">
      <header className="w-full bg-[#f1efdf]/90 backdrop-blur-md sticky top-0 z-40 border-b border-[#c3cda7]/50">
        <div className="max-w-7xl mx-auto h-20 px-6 sm:px-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3 21h18L12 2zm0 4.5l5.5 11.5h-11L12 6.5z"></path>
              </svg>
            </div>
            <span className="font-editorial text-2xl font-bold tracking-tight text-[#00372a]">
              FarmLink
            </span>
          </Link>
          <Link
            to="/fpo/login"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1b6e53] hover:underline"
          >
            <span>Back to Sign In</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </header>

      <main className="w-full flex-1 flex items-center justify-center py-10 px-4 sm:px-8">
        <div className="w-full max-w-md bg-[#ffffff] rounded-[28px] border border-[#c3cda7] p-8 sm:p-10 shadow-sm space-y-6">
          <div>
            <div className="w-10 h-10 rounded-full bg-[#fceace] text-[#683600] flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[20px]">lock_reset</span>
            </div>
            <h1 className="font-editorial text-3xl font-normal text-[#00372a]">
              Password Recovery
            </h1>
            <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1">
              Enter your registered FPO terminal email address to receive password reset verification.
            </p>
          </div>

          {submitted ? (
            <div className="p-4 rounded-[16px] bg-[#e6ecd5] border border-[#1b6e53]/30 text-xs sm:text-sm text-[#1b6e53] space-y-2">
              <div className="font-bold">Recovery link dispatched!</div>
              <p>
                Check your inbox at <strong>{email}</strong> for instructions to reset your access token.
              </p>
              <Link
                to="/fpo/login"
                className="inline-block pt-2 font-bold underline underline-offset-4"
              >
                Return to Login →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="block font-semibold uppercase text-xs text-[#212529]">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. manager@agricoop.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-[14px] bg-[#f1efdf]/40 border border-[#c3cda7] text-[#212529] focus:outline-none focus:border-[#1b6e53]"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Send Recovery Instructions</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>
          )}
        </div>
      </main>

      <footer className="w-full bg-[#f1efdf] py-6 border-t border-[#c3cda7]/50 text-center text-xs text-[#6d6d6d]">
        © 2026 FarmLink AgroTech Systems.
      </footer>
    </div>
  )
}
