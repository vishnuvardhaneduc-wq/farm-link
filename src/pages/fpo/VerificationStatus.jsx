import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { getStoredFpoProfile } from '../../data/fpoProfileData'

export default function FPOVerificationStatus() {
  const [profile, setProfile] = useState(getStoredFpoProfile())

  useEffect(() => {
    const handleUpdate = () => {
      setProfile(getStoredFpoProfile())
    }
    window.addEventListener('farmlink-fpo-profile-updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('farmlink-fpo-profile-updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  const checklist = profile.verificationChecklist || []
  const timeline = profile.verificationTimeline || []
  const verifiedCount = checklist.filter((item) => item.status === 'Verified').length
  const totalCount = checklist.length

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Verified':
      case 'Active':
        return 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]'
      case 'Pending':
      case 'In Progress':
        return 'bg-[#fceace] text-[#683600] border-[#c3cda7]'
      case 'Rejected':
        return 'bg-[#ba1a1a]/10 text-[#ba1a1a] border-[#ba1a1a]/40'
      default:
        return 'bg-[#f1efdf] text-[#6d6d6d] border-[#c3cda7]'
    }
  }

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Page Header & Back Navigation */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Link
              to="/fpo/profile"
              className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-flex items-center gap-1.5 hover:bg-[#dbe4c2] transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">arrow_back</span>
              <span>Back to FPO Profile</span>
            </Link>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Verification <span className="italic font-normal">Status</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Statutory onboarding compliance audit, KYC verification checklist, and institutional federation ledger verification timeline.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#ffffff] px-4 py-2 rounded-[100px] border border-[#c3cda7] shadow-2xs inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1b6e53]"></span>
            <span>{verifiedCount} of {totalCount} Items Verified</span>
          </span>
        </div>
      </div>

      {/* 2. Overview Hero Card */}
      <section className="rounded-[28px] bg-[#ffffff] border border-[#c3cda7] p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-4 sm:gap-5 min-w-0">
            {/* Seal Icon */}
            <div className="w-16 h-16 rounded-[20px] bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center shrink-0 border border-[#c3cda7] shadow-xs">
              <span className="material-symbols-outlined text-[36px]">verified_user</span>
            </div>

            <div className="min-w-0 space-y-1">
              <div className="text-[10px] font-mono text-[#6d6d6d] uppercase tracking-wider">
                FPO Federation Registry
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a] tracking-tight">
                  {profile.fpoName}
                </h2>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono uppercase border ${getStatusBadge(
                    profile.verificationOverview?.status || 'Verified'
                  )}`}
                >
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  <span>{profile.verificationOverview?.status || 'Verified'}</span>
                </span>
              </div>
              <p className="text-xs font-mono text-[#6d6d6d] flex items-center gap-2 flex-wrap pt-0.5">
                <span>FPO ID: <strong className="text-[#00372a]">{profile.fpoId}</strong></span>
                <span className="text-[#c3cda7]">•</span>
                <span>Reg: <strong className="text-[#00372a]">{profile.registrationId}</strong></span>
                <span className="text-[#c3cda7]">•</span>
                <span>Cluster: <strong className="text-[#1b6e53]">{profile.primaryOperatingArea}</strong></span>
              </p>
            </div>
          </div>

          {/* Verification Readiness Banner */}
          <div className="p-4 rounded-[20px] bg-[#e6ecd5]/50 border border-[#c3cda7] min-w-[280px]">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-[#6d6d6d] uppercase text-[10px]">Account Readiness</span>
              <span className="text-[#1b6e53] font-bold">80% Ready</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#c3cda7]/40 overflow-hidden mb-2">
              <div className="h-full bg-[#1b6e53] rounded-full" style={{ width: '80%' }}></div>
            </div>
            <p className="text-[11px] text-[#353535] leading-snug">
              Account is active for trading, allocations, and deliveries. Direct settlement escrow linking in final validation.
            </p>
          </div>
        </div>

        {/* Business Rule Notice Note */}
        <div className="mt-5 p-3.5 rounded-[14px] bg-[#f1efdf] border border-[#c3cda7] flex items-start gap-3 text-xs">
          <span className="material-symbols-outlined text-[18px] text-[#1b6e53] shrink-0 mt-0.5">info</span>
          <div className="text-[#353535] leading-relaxed">
            <strong className="text-[#00372a] font-semibold">Account Operational Notice:</strong> Verification status reflects regulatory compliance readiness. Daily hub intake, order dispatch, and farmer allocation workflows remain fully operational.
          </div>
        </div>
      </section>

      {/* 3. Verification Checklist & Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: Verification Checklist (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#c3cda7]/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">fact_check</span>
                </div>
                <div>
                  <h3 className="font-editorial text-2xl font-bold text-[#00372a] leading-none">
                    Verification Checklist
                  </h3>
                  <p className="text-[11px] text-[#6d6d6d] font-mono mt-0.5">
                    MANDATORY COMPLIANCE &amp; CREDENTIAL AUDIT
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#1b6e53] bg-[#e6ecd5] px-3 py-1 rounded-full border border-[#c3cda7]">
                {verifiedCount} / {totalCount} Completed
              </span>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3.5">
              {checklist.map((item, index) => {
                const isVerified = item.status === 'Verified'
                return (
                  <div
                    key={item.id || index}
                    className={`p-4 rounded-[18px] border transition-all ${
                      isVerified
                        ? 'bg-[#ffffff] border-[#c3cda7] hover:border-[#1b6e53]'
                        : 'bg-[#fceace]/30 border-[#c3cda7]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        {/* Status Icon */}
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isVerified
                              ? 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]'
                              : 'bg-[#fceace] text-[#683600] border border-[#c3cda7]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[19px]">
                            {isVerified ? 'check_circle' : 'hourglass_top'}
                          </span>
                        </div>

                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-sm text-[#212529]">{item.title}</h4>
                            <span className="text-[10px] font-mono text-[#6d6d6d] bg-[#f1efdf] px-2 py-0.5 rounded border border-[#c3cda7]/60">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-xs text-[#6d6d6d] leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-3 text-[11px] font-mono text-[#353535] pt-1">
                            <span>Ref: <strong className="text-[#1b6e53]">{item.documentRef}</strong></span>
                            <span className="text-[#c3cda7]">•</span>
                            <span>Date: <strong>{item.verifiedDate}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono uppercase border shrink-0 ${getStatusBadge(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>

        {/* RIGHT: Verification Timeline (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#c3cda7]/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center border border-[#c3cda7]">
                  <span className="material-symbols-outlined text-[20px]">timeline</span>
                </div>
                <div>
                  <h3 className="font-editorial text-2xl font-bold text-[#00372a] leading-none">
                    Audit Timeline
                  </h3>
                  <p className="text-[11px] text-[#6d6d6d] font-mono mt-0.5">
                    VERIFICATION PROGRESSION
                  </p>
                </div>
              </div>
            </div>

            {/* Step-by-Step Vertical Timeline */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-3 before:w-[2px] before:bg-[#c3cda7]">
              {timeline.map((stage, idx) => {
                const isCompleted = stage.status === 'completed'
                const isCurrent = stage.status === 'current'
                const isUpcoming = stage.status === 'upcoming'

                return (
                  <div key={stage.step || idx} className="relative group">
                    {/* Timeline Node Dot */}
                    <div
                      className={`absolute -left-[30px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-[#ffffff] transition-all ${
                        isCompleted
                          ? 'bg-[#1b6e53] text-[#ffffff]'
                          : isCurrent
                          ? 'bg-[#e8fe85] text-[#1b6e53] border-2 border-[#1b6e53] animate-pulse'
                          : 'bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7]'
                      }`}
                    >
                      {isCompleted ? (
                        <span className="material-symbols-outlined text-[13px]">check</span>
                      ) : (
                        <span className="text-[9px] font-mono font-bold">{stage.step}</span>
                      )}
                    </div>

                    <div
                      className={`p-3.5 rounded-[16px] border transition-all ${
                        isCompleted
                          ? 'bg-[#ffffff] border-[#c3cda7]/70 shadow-2xs'
                          : isCurrent
                          ? 'bg-[#fceace]/40 border-[#683600]/40 shadow-xs'
                          : 'bg-[#f1efdf]/40 border-[#c3cda7]/50 opacity-70'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4
                          className={`text-xs font-bold ${
                            isCompleted
                              ? 'text-[#00372a]'
                              : isCurrent
                              ? 'text-[#683600]'
                              : 'text-[#6d6d6d]'
                          }`}
                        >
                          {stage.title}
                        </h4>
                        <span
                          className={`text-[9px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full border ${
                            isCompleted
                              ? 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]'
                              : isCurrent
                              ? 'bg-[#fceace] text-[#683600] border-[#c3cda7]'
                              : 'bg-[#f1efdf] text-[#6d6d6d] border-[#c3cda7]'
                          }`}
                        >
                          {isCompleted ? 'Done' : isCurrent ? 'Active' : 'Queued'}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#353535] mt-1 leading-snug">
                        {stage.description}
                      </p>

                      <div className="text-[10px] font-mono text-[#6d6d6d] mt-1.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">schedule</span>
                        <span>{stage.date}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
