import React from 'react'
import { Link } from 'react-router'

export default function ForBuyers() {
  const buyerFeatures = [
    {
      title: 'Multi-Item RFQ Tender Ingestion',
      description: 'Create standardized procurement tenders across multiple commodities, specify moisture thresholds, visual grade tolerances, and recurring delivery schedules.',
      icon: 'post_add',
    },
    {
      title: 'Item-Level FPO Response Comparison',
      description: 'Compare bids from verified regional FPO federations side-by-side with transparent baseline pricing, hub distance, and fulfillment reliability scores.',
      icon: 'compare_arrows',
    },
    {
      title: 'End-to-End Cold-Chain Logistics',
      description: 'Track consignments from the moment of dispatch onward with driver contact, vehicle registration, temperature telemetry, and estimated arrival windows.',
      icon: 'local_shipping',
    },
    {
      title: 'Escrow-Protected Delivery Verification',
      description: 'Inspect shipments on arrival. Verify delivered quantities and quality before automated escrow release guarantees financial peace of mind.',
      icon: 'verified_user',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#b2cee7] border border-[#a1bed8] px-4 py-1.5 rounded-[100px] text-xs font-semibold text-[#00372a] uppercase tracking-widest font-mono">
          <span className="w-2 h-2 rounded-full bg-[#00372a]"></span>
          Institutional Buyers & Processors
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#00372a] tracking-tight">
          Reliable High-Volume <span className="italic font-normal underline decoration-[#b2cee7] decoration-4 underline-offset-8">Ag-Procurement</span>
        </h1>
        <p className="text-base sm:text-lg text-[#353535] leading-relaxed">
          Source farm-fresh produce directly from verified FPOs with standardized grading, predictable delivery schedules, and automated escrow.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {buyerFeatures.map((feat) => (
          <div
            key={feat.title}
            className="bg-white rounded-[24px] border border-[#c3cda7] p-8 space-y-4 shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-[#b2cee7]/40 flex items-center justify-center text-[#00372a]">
              <span className="material-symbols-outlined text-[24px]">{feat.icon}</span>
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
              {feat.title}
            </h2>
            <p className="text-sm text-[#353535] leading-relaxed">
              {feat.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-[#ffffff] border-2 border-[#1b6e53] rounded-[24px] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="font-editorial text-3xl font-bold text-[#00372a]">
            Ready to deploy institutional procurement?
          </h2>
          <p className="text-sm text-[#6d6d6d]">
            Join AgroFresh, BigBasket, and leading food processors on FarmLink.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            to="/buyer/register"
            className="px-6 py-3.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            Register Enterprise Buyer
          </Link>
          <Link
            to="/buyer/login"
            className="px-6 py-3.5 rounded-[100px] bg-[#f1efdf] hover:bg-[#e6ecd5] text-[#1b6e53] font-bold text-xs uppercase tracking-wider transition border border-[#c3cda7]"
          >
            Buyer Login
          </Link>
        </div>
      </div>
    </div>
  )
}
