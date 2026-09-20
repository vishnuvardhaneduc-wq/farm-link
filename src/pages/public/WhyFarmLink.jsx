import React from 'react'
import { Link } from 'react-router'

export default function WhyFarmLink() {
  const pillars = [
    {
      title: 'Zero Smartphone Dependency for Farmers',
      description: 'Smallholder farmers in rural hinterlands should not need to own 4G smartphones or download complex apps. Our village physical hubs handle all weighment, moisture testing, grading, and provide thermal paper slips + SMS and vernacular voice IVR call confirmations.',
      icon: 'phonelink_erase',
      stat: '100%',
      statLabel: 'Zero-App Accessibility',
    },
    {
      title: 'Direct Mandi & eNAM Alignment',
      description: 'Eliminate multi-tiered middlemen markups. Institutional buyers procure directly from verified FPO federation pools with complete batch traceability and transparent quality assay scores.',
      icon: 'sync_alt',
      stat: '+18.4%',
      statLabel: 'Higher Farmer Realization',
    },
    {
      title: 'Instant T+0 Escrow Settlement',
      description: 'Once delivery is verified at the buyer facility, payment is instantly cleared from the escrow account into individual farmer Jan Dhan bank accounts without 60-day delayed credit cycles.',
      icon: 'account_balance_wallet',
      stat: '< 2 Hours',
      statLabel: 'Automated Payout Speed',
    },
    {
      title: 'Computer Vision & Standardized Grading',
      description: 'Objective optical grading and electronic moisture testing at village collection centers ensure zero disputes on quality and consistent fulfillment of buyer contracts.',
      icon: 'verified',
      stat: '99.4%',
      statLabel: 'Fulfillment Accuracy',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#e6ecd5] border border-[#c3cda7] px-4 py-1.5 rounded-[100px] text-xs font-semibold text-[#1b6e53] uppercase tracking-widest font-mono">
          <span className="w-2 h-2 rounded-full bg-[#1b6e53] animate-pulse"></span>
          The Value Advantage
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#00372a] tracking-tight">
          Why <span className="italic font-normal underline decoration-[#e8fe85] decoration-4 underline-offset-8">FarmLink</span>?
        </h1>
        <p className="text-base sm:text-lg text-[#353535] leading-relaxed">
          Bridging the structural divide between commercial food processors and grassroots agrarian collectives through transparent technology.
        </p>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="bg-white rounded-[24px] border border-[#c3cda7] p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-[#e6ecd5] flex items-center justify-center text-[#1b6e53]">
                  <span className="material-symbols-outlined text-[24px]">{pillar.icon}</span>
                </div>
                <div className="text-right">
                  <span className="block font-editorial text-2xl font-bold text-[#1b6e53]">{pillar.stat}</span>
                  <span className="text-[10px] font-mono uppercase text-[#6d6d6d]">{pillar.statLabel}</span>
                </div>
              </div>
              <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
                {pillar.title}
              </h2>
              <p className="text-sm text-[#353535] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Matrix */}
      <div className="bg-white rounded-[24px] border border-[#c3cda7] p-8 space-y-6 shadow-xs overflow-hidden">
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a] text-center">
          Traditional Mandi vs. FarmLink Grid
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#c3cda7] bg-[#f1efdf]/50 text-[#1b6e53] font-mono uppercase">
                <th className="p-4">Feature</th>
                <th className="p-4 text-red-700">Traditional Mandi Intermediaries</th>
                <th className="p-4 text-[#1b6e53] font-bold">KrishiSetu FarmLink Network</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/40">
              <tr>
                <td className="p-4 font-semibold text-[#00372a]">Farmer Payout Timeline</td>
                <td className="p-4 text-[#6d6d6d]">30 to 60 days delayed cash/credit</td>
                <td className="p-4 text-[#1b6e53] font-semibold">T+0 Direct Escrow to Bank Account</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#00372a]">Quality Assessment</td>
                <td className="p-4 text-[#6d6d6d]">Subjective eye test, heavy deduction cuts</td>
                <td className="p-4 text-[#1b6e53] font-semibold">Optical CV Grading + Moisture meters</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#00372a]">Logistics Transparency</td>
                <td className="p-4 text-[#6d6d6d]">Opaque multi-hop loading losses</td>
                <td className="p-4 text-[#1b6e53] font-semibold">Direct Hub dispatch with sealed RFID</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#00372a]">Farmer App Requirement</td>
                <td className="p-4 text-[#6d6d6d]">Unused complex mobile apps</td>
                <td className="p-4 text-[#1b6e53] font-semibold">Zero smartphone needed (Physical Hub + SMS)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
