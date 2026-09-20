import React from 'react'
import { Link } from 'react-router'

export default function ForHubs() {
  const hubModules = [
    {
      title: 'Smart Electronic Weighing Scales',
      description: 'Zero manual entry errors. IoT load cells instantly sync gross and tare weights into digital intake logs and generate instantaneous weighment tickets.',
      icon: 'scale',
    },
    {
      title: 'Computer Vision Optical Assay',
      description: 'Camera grading checks size distribution, color uniformity, and surface blemishes in seconds, categorizing produce into Grade A, Grade B, or Rejections.',
      icon: 'science',
    },
    {
      title: 'Thermal Slip & Vernacular IVR Slips',
      description: 'Dual-channel receipt generation gives farmers a physical receipt on-dock while triggering automated regional voice calls and SMS to their mobile phones.',
      icon: 'receipt',
    },
    {
      title: 'Cold-Chain Dispatch & RFID Manifests',
      description: 'Standardized crating, palletization, and RFID container seal verification before temperature-controlled logistics departures.',
      icon: 'local_shipping',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#fceace] border border-[#e8cead] px-4 py-1.5 rounded-[100px] text-xs font-semibold text-[#683600] uppercase tracking-widest font-mono">
          <span className="w-2 h-2 rounded-full bg-[#683600]"></span>
          Decentralized Village Physical Hubs
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#00372a] tracking-tight">
          Physical <span className="italic font-normal underline decoration-[#fceace] decoration-4 underline-offset-8">Intake & Grading</span> Infrastructure
        </h1>
        <p className="text-base sm:text-lg text-[#353535] leading-relaxed">
          Transforming village aggregation centers into automated, IoT-connected produce intake and quality assay stations.
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {hubModules.map((mod) => (
          <div
            key={mod.title}
            className="bg-white rounded-[24px] border border-[#c3cda7] p-8 space-y-4 shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-[#fceace]/60 flex items-center justify-center text-[#683600]">
              <span className="material-symbols-outlined text-[24px]">{mod.icon}</span>
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
              {mod.title}
            </h2>
            <p className="text-sm text-[#353535] leading-relaxed">
              {mod.description}
            </p>
          </div>
        ))}
      </div>

      {/* Hub Operator Access Card */}
      <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[24px] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="font-editorial text-3xl font-bold text-[#00372a]">
            Access Hub Operator Workspace
          </h2>
          <p className="text-sm text-[#6d6d6d]">
            Log in with your Hub Device ID and hardware authentication token assigned by your FPO coordinator.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            to="/hub/login"
            className="px-6 py-3.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            Hub Login
          </Link>
          <Link
            to="/hub/setup"
            className="px-6 py-3.5 rounded-[100px] bg-[#f1efdf] hover:bg-[#e6ecd5] text-[#1b6e53] font-bold text-xs uppercase tracking-wider transition border border-[#c3cda7]"
          >
            Device Setup
          </Link>
        </div>
      </div>
    </div>
  )
}
