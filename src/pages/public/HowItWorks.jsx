import React from 'react'
import { Link } from 'react-router'

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Buyer Publishes Procurement Tender',
      subtitle: 'Multi-Item Institutional RFQ',
      description: 'Institutional buyers specify crop specifications, grade requirements, minimum volume (MT), delivery timeline, and destination warehouse.',
      icon: 'post_add',
      badge: 'Demand Ingestion',
      badgeBg: 'bg-[#b2cee7] text-[#00372a]',
    },
    {
      step: '02',
      title: 'FPO Matching & Item-Level Response',
      subtitle: 'Federated Supply Verification',
      description: 'Connected FPO federations review requirements against member harvest calendars, quoting item-level rates, verified quantities, and designated aggregation hubs.',
      icon: 'tune',
      badge: 'Fair Matching',
      badgeBg: 'bg-[#e6ecd5] text-[#1b6e53]',
    },
    {
      step: '03',
      title: 'Physical Hub Collection & Quality Assay',
      subtitle: 'Zero-App Producer Intake',
      description: 'Farmers drop produce at decentralized village hubs. Smart digital weighbridges record weights, computer-vision assay tools grade batches, and thermal slips are printed on-site.',
      icon: 'scale',
      badge: 'IoT Aggregation',
      badgeBg: 'bg-[#fceace] text-[#683600]',
    },
    {
      step: '04',
      title: 'Multi-Hub Batching & Direct Dispatch',
      subtitle: 'Cold Chain & Logistics Traceability',
      description: 'Produce is aggregated into standardized crates and dispatched with sealed RFID tags and real-time vehicle dispatch manifests directly to buyer fulfillment centers.',
      icon: 'local_shipping',
      badge: 'Transit',
      badgeBg: 'bg-[#e6ecd5] text-[#1b6e53]',
    },
    {
      step: '05',
      title: 'Delivery Verification & Escrow Payout',
      subtitle: 'Guaranteed T+0 Direct Settlement',
      description: 'Buyer confirms delivery on-dock. Escrow calculates net produce value + freight, and payouts are automatically disbursed directly into member farmer Jan Dhan accounts.',
      icon: 'currency_rupee',
      badge: 'T+0 Settlement',
      badgeBg: 'bg-[#e8fe85] text-[#1b6e53]',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#e6ecd5] border border-[#c3cda7] px-4 py-1.5 rounded-[100px] text-xs font-semibold text-[#1b6e53] uppercase tracking-widest font-mono">
          <span className="w-2 h-2 rounded-full bg-[#1b6e53] animate-pulse"></span>
          End-to-End Agritech Protocol
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#00372a] tracking-tight">
          How <span className="italic font-normal underline decoration-[#e8fe85] decoration-4 underline-offset-8">FarmLink</span> Works
        </h1>
        <p className="text-base sm:text-lg text-[#353535] leading-relaxed">
          From institutional buyer procurement tenders to physical village weighbridges and instant bank payouts for smallholders.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="space-y-6">
        {steps.map((item, idx) => (
          <div
            key={item.step}
            className="bg-white rounded-[24px] border border-[#c3cda7] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-xs hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4 shrink-0">
              <span className="font-editorial text-4xl sm:text-5xl font-bold text-[#1b6e53]/30">
                {item.step}
              </span>
              <div className="w-12 h-12 rounded-full bg-[#f1efdf] flex items-center justify-center text-[#1b6e53] border border-[#c3cda7]">
                <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full font-mono ${item.badgeBg}`}>
                  {item.badge}
                </span>
                <span className="text-xs font-mono text-[#6d6d6d] uppercase">{item.subtitle}</span>
              </div>
              <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
                {item.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#353535] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="bg-[#1b6e53] text-white rounded-[24px] p-8 sm:p-12 text-center space-y-6 shadow-md">
        <h2 className="font-editorial text-3xl sm:text-4xl font-normal">
          Ready to streamline agricultural procurement?
        </h2>
        <p className="text-sm text-[#e6ecd5] max-w-xl mx-auto">
          Join hundreds of verified FPO clusters and leading institutional buyers on the KrishiSetu agritech network.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/buyer/register"
            className="px-6 py-3 rounded-[100px] bg-[#e8fe85] hover:bg-[#d8ee75] text-[#1b6e53] font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            Register as Buyer
          </Link>
          <Link
            to="/fpo/register"
            className="px-6 py-3 rounded-[100px] bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition border border-white/20"
          >
            Register FPO Federation
          </Link>
        </div>
      </div>
    </div>
  )
}
