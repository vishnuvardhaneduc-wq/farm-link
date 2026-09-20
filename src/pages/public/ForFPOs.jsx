import React from 'react'
import { Link } from 'react-router'

export default function ForFPOs() {
  const fpoCapabilities = [
    {
      title: 'Farmer Cohort & Landholding Registry',
      description: 'Digitize member farmer profiles, GPS village mapping, acreage, and seasonal yield projections without burdening farmers with software installation.',
      icon: 'groups',
    },
    {
      title: 'Fair Allocation Algorithm',
      description: 'Equitably distribute large buyer demand quotas across smallholder members based on acreage, past reliability, and harvest readiness.',
      icon: 'tune',
    },
    {
      title: 'Decentralized Hub Allocation',
      description: 'Route produce through optimized village collection hubs to minimize transit loss and balance daily weighing bay capacities.',
      icon: 'hub',
    },
    {
      title: 'Automated Jan Dhan & UPI Payouts',
      description: 'Eliminate manual ledger reconciliation. Payouts are computed automatically as Accepted Quantity × Agreed Rate and disbursed directly to farmers.',
      icon: 'account_balance',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#e6ecd5] border border-[#c3cda7] px-4 py-1.5 rounded-[100px] text-xs font-semibold text-[#1b6e53] uppercase tracking-widest font-mono">
          <span className="w-2 h-2 rounded-full bg-[#1b6e53]"></span>
          Farmer Producer Organizations & Federations
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#00372a] tracking-tight">
          Empower Your <span className="italic font-normal underline decoration-[#e8fe85] decoration-4 underline-offset-8">Farmer Collective</span>
        </h1>
        <p className="text-base sm:text-lg text-[#353535] leading-relaxed">
          Access high-value institutional forward contracts, eliminate intermediaries, and ensure guaranteed fast bank payouts for member cultivators.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {fpoCapabilities.map((cap) => (
          <div
            key={cap.title}
            className="bg-white rounded-[24px] border border-[#c3cda7] p-8 space-y-4 shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-[#e6ecd5] flex items-center justify-center text-[#1b6e53]">
              <span className="material-symbols-outlined text-[24px]">{cap.icon}</span>
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
              {cap.title}
            </h2>
            <p className="text-sm text-[#353535] leading-relaxed">
              {cap.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-[#1b6e53] text-white rounded-[24px] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="font-editorial text-3xl font-bold text-white">
            Register your FPO Federation today
          </h2>
          <p className="text-sm text-[#e6ecd5]">
            NABARD, SFAC, and State-registered FPOs can connect within 24 hours.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            to="/fpo/register"
            className="px-6 py-3.5 rounded-[100px] bg-[#e8fe85] hover:bg-[#d8ee75] text-[#1b6e53] font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            FPO Registration
          </Link>
          <Link
            to="/fpo/login"
            className="px-6 py-3.5 rounded-[100px] bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition border border-white/20"
          >
            FPO Login
          </Link>
        </div>
      </div>
    </div>
  )
}
