import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { getStoredFpoProfile } from '../../data/fpoProfileData'

export default function FPOProfile() {
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

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Page Header & Editorial Breadcrumb */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53]"></span>
              <span>FEDERATION PROFILE // APMC CLUSTER</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff] border border-[#c3cda7] text-[#1b6e53] font-mono text-[10px] font-bold">
              ID: {profile.fpoId}
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            FPO <span className="italic font-normal">Profile</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Comprehensive organization profile, official contact registry, operating area coverage, and federation verification status.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            to="/fpo/profile/verification"
            className="px-5 py-2.5 rounded-[100px] bg-[#ffffff] hover:bg-[#faf9f0] text-[#1b6e53] border border-[#c3cda7] text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-2xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">verified</span>
            <span>View Verification</span>
          </Link>

          <Link
            to="/fpo/profile/edit"
            className="px-5 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[17px]">edit_note</span>
            <span>Edit FPO Details</span>
          </Link>
        </div>
      </div>

      {/* 2. Primary Profile Summary Card */}
      <section className="rounded-[28px] bg-[#ffffff] border border-[#c3cda7] p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle decorative pastoral badge in top-right */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#e6ecd5]/30 rounded-bl-[100px] pointer-events-none -z-0"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-4 sm:gap-5 min-w-0">
            {/* FPO Emblem */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[22px] bg-[#1b6e53] text-[#e8fe85] flex items-center justify-center shrink-0 shadow-md border-2 border-[#e8fe85]/40">
              <span className="material-symbols-outlined text-[36px] sm:text-[42px]">agriculture</span>
            </div>

            <div className="min-w-0 space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#00372a] tracking-tight truncate">
                  {profile.fpoName}
                </h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6ecd5] border border-[#c3cda7] text-[#1b6e53] text-[11px] font-bold font-mono uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#1b6e53] animate-pulse"></span>
                  <span>{profile.status}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1b6e53] text-[#ffffff] text-[11px] font-bold font-mono uppercase">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  <span>{profile.verificationOverview?.status || 'Verified'}</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#353535] flex items-center gap-2 flex-wrap font-sans">
                <span className="flex items-center gap-1 text-[#6d6d6d]">
                  <span className="material-symbols-outlined text-[16px] text-[#1b6e53]">location_on</span>
                  <span>{profile.location || `${profile.district}, ${profile.state}`}</span>
                </span>
                <span className="text-[#c3cda7]">•</span>
                <span className="flex items-center gap-1 text-[#6d6d6d]">
                  <span className="material-symbols-outlined text-[16px] text-[#1b6e53]">calendar_today</span>
                  <span>Est. {profile.establishedYear}</span>
                </span>
                <span className="text-[#c3cda7]">•</span>
                <span className="font-mono text-[#1b6e53] font-semibold text-xs">
                  Reg: {profile.registrationId}
                </span>
              </p>
            </div>
          </div>

          {/* Quick Stats Pill Strip */}
          <div className="flex items-center gap-3 self-stretch lg:self-auto justify-between sm:justify-start">
            <div className="p-3.5 sm:px-5 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] text-center min-w-[95px]">
              <div className="text-[10px] font-mono text-[#6d6d6d] uppercase">Farmers</div>
              <div className="font-editorial text-2xl font-bold text-[#00372a]">{profile.registeredFarmers}</div>
            </div>
            <div className="p-3.5 sm:px-5 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] text-center min-w-[95px]">
              <div className="text-[10px] font-mono text-[#6d6d6d] uppercase">Active Hubs</div>
              <div className="font-editorial text-2xl font-bold text-[#1b6e53]">{profile.numberOfHubs}</div>
            </div>
            <div className="p-3.5 sm:px-5 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] text-center min-w-[95px]">
              <div className="text-[10px] font-mono text-[#6d6d6d] uppercase">Crops</div>
              <div className="font-editorial text-2xl font-bold text-[#683600]">
                {profile.products?.length || 4}
              </div>
            </div>
          </div>
        </div>

        {/* Key Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="p-4 rounded-[18px] bg-[#f1efdf]/50 border border-[#c3cda7]/70">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6d6d6d] block">FPO ID</span>
            <span className="text-sm font-bold font-mono text-[#00372a] mt-1 block">{profile.fpoId}</span>
            <span className="text-[11px] text-[#1b6e53] mt-1 inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">lock</span>
              <span>System Identifier</span>
            </span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf]/50 border border-[#c3cda7]/70">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6d6d6d] block">Registration ID</span>
            <span className="text-sm font-bold font-mono text-[#00372a] mt-1 block">{profile.registrationId}</span>
            <span className="text-[11px] text-[#1b6e53] mt-1 inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">verified</span>
              <span>APMC Certified</span>
            </span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf]/50 border border-[#c3cda7]/70">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6d6d6d] block">Contact Person</span>
            <span className="text-sm font-bold text-[#00372a] mt-1 block truncate">{profile.contactPerson}</span>
            <span className="text-[11px] text-[#6d6d6d] mt-1 block truncate">{profile.phoneNumber}</span>
          </div>

          <div className="p-4 rounded-[18px] bg-[#f1efdf]/50 border border-[#c3cda7]/70">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6d6d6d] block">Primary Operating Area</span>
            <span className="text-sm font-bold text-[#00372a] mt-1 block truncate">{profile.primaryOperatingArea}</span>
            <span className="text-[11px] text-[#1b6e53] mt-1 block font-semibold">{profile.state}</span>
          </div>
        </div>
      </section>

      {/* 3. Detailed Profile Sections (Four Section Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ============================================================ */}
        {/* SECTION 1: BASIC INFORMATION                                 */}
        {/* ============================================================ */}
        <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#c3cda7]/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center border border-[#c3cda7]">
                  <span className="material-symbols-outlined text-[20px]">corporate_fare</span>
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#00372a] leading-none">
                    Basic Information
                  </h3>
                  <p className="text-[11px] text-[#6d6d6d] font-mono mt-0.5">SECTION 01 // LEGAL ENTITY</p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-1 rounded-full border border-[#c3cda7]">
                Verified
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6d6d6d] block">FPO Name</span>
                  <span className="text-sm font-semibold text-[#212529] mt-0.5 block">{profile.fpoName}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6d6d6d] block">Year Established</span>
                  <span className="text-sm font-semibold text-[#212529] mt-0.5 block">{profile.establishedYear}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6d6d6d] block">FPO Identifier</span>
                  <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#f1efdf] px-2.5 py-1 rounded-md border border-[#c3cda7] inline-block mt-1">
                    {profile.fpoId}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6d6d6d] block">Registration ID</span>
                  <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#f1efdf] px-2.5 py-1 rounded-md border border-[#c3cda7] inline-block mt-1">
                    {profile.registrationId}
                  </span>
                </div>
              </div>

              {profile.website && (
                <div className="pt-2">
                  <span className="text-[10px] font-mono uppercase text-[#6d6d6d] block">Website</span>
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#1b6e53] hover:underline inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>{profile.website}</span>
                    <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                  </a>
                </div>
              )}

              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase text-[#6d6d6d] block">Organization Overview</span>
                <p className="text-xs text-[#353535] leading-relaxed mt-1 p-3.5 rounded-[14px] bg-[#f1efdf]/60 border border-[#c3cda7]/60">
                  {profile.description}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#c3cda7]/40 flex items-center justify-between text-xs">
            <span className="text-[#6d6d6d] font-mono text-[11px]">Last certified: {profile.verificationOverview?.lastVerifiedDate}</span>
            <Link
              to="/fpo/profile/edit"
              className="text-[#1b6e53] font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Edit Details</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 2: CONTACT INFORMATION                              */}
        {/* ============================================================ */}
        <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#c3cda7]/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#fceace] text-[#683600] flex items-center justify-center border border-[#c3cda7]">
                  <span className="material-symbols-outlined text-[20px]">contact_phone</span>
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#00372a] leading-none">
                    Contact Information
                  </h3>
                  <p className="text-[11px] text-[#6d6d6d] font-mono mt-0.5">SECTION 02 // NODAL &amp; ADDRESS</p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-1 rounded-full border border-[#c3cda7]">
                Authenticated
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6d6d6d] block">Contact Person</span>
                  <span className="text-sm font-semibold text-[#212529] mt-0.5 block">{profile.contactPerson}</span>
                  <span className="text-[10px] text-[#6d6d6d] font-mono">Authorized Nodal Officer</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6d6d6d] block">Phone Number</span>
                  <span className="text-sm font-semibold font-mono text-[#1b6e53] mt-0.5 block">{profile.phoneNumber}</span>
                  <span className="text-[10px] text-[#1b6e53] font-mono flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">sms</span>
                    <span>SMS / IVR Alerts Active</span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6d6d6d] block">Official Email</span>
                  <span className="text-xs font-semibold text-[#212529] mt-0.5 block break-all">{profile.emailAddress}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6d6d6d] block">State &amp; District</span>
                  <span className="text-xs font-semibold text-[#212529] mt-0.5 block">
                    {profile.district}, {profile.state}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase text-[#6d6d6d] block">Registered Office Address</span>
                <p className="text-xs text-[#353535] leading-relaxed mt-1 p-3.5 rounded-[14px] bg-[#f1efdf]/60 border border-[#c3cda7]/60 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-[#1b6e53] shrink-0 mt-0.5">home_pin</span>
                  <span>{profile.address}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#c3cda7]/40 flex items-center justify-between text-xs">
            <span className="text-[#6d6d6d] font-mono text-[11px]">Direct dispatch notifications enabled</span>
            <Link
              to="/fpo/profile/edit"
              className="text-[#1b6e53] font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Update Contact</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 3: OPERATING INFORMATION                            */}
        {/* ============================================================ */}
        <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#c3cda7]/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#b2cee7] text-[#00372a] flex items-center justify-center border border-[#c3cda7]">
                  <span className="material-symbols-outlined text-[20px]">hub</span>
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#00372a] leading-none">
                    Operating Information
                  </h3>
                  <p className="text-[11px] text-[#6d6d6d] font-mono mt-0.5">SECTION 03 // HUBS &amp; CROPS</p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-1 rounded-full border border-[#c3cda7]">
                3 Active Hubs
              </span>
            </div>

            <div className="space-y-5 text-xs">
              {/* Metrics Summary Strip */}
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-3 rounded-[14px] bg-[#f1efdf] border border-[#c3cda7]/70">
                  <span className="text-[10px] font-mono text-[#6d6d6d] uppercase block">Service Area</span>
                  <span className="text-xs sm:text-sm font-bold text-[#00372a] mt-0.5 block truncate">
                    {profile.serviceArea || profile.primaryOperatingArea}
                  </span>
                </div>
                <div className="p-3 rounded-[14px] bg-[#f1efdf] border border-[#c3cda7]/70">
                  <span className="text-[10px] font-mono text-[#6d6d6d] uppercase block">Hubs</span>
                  <span className="text-xs sm:text-sm font-bold text-[#1b6e53] mt-0.5 block">
                    {profile.numberOfHubs} Aggregation
                  </span>
                </div>
                <div className="p-3 rounded-[14px] bg-[#f1efdf] border border-[#c3cda7]/70">
                  <span className="text-[10px] font-mono text-[#6d6d6d] uppercase block">Farmers</span>
                  <span className="text-xs sm:text-sm font-bold text-[#00372a] mt-0.5 block">
                    {profile.registeredFarmers} Active
                  </span>
                </div>
              </div>

              {/* Products Summary Badge Tags */}
              <div>
                <span className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider block mb-2">
                  Produce Catalog (Summary)
                </span>
                <div className="flex flex-wrap gap-2">
                  {profile.products?.map((crop) => (
                    <span
                      key={crop}
                      className="px-3 py-1.5 rounded-full bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7] text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs"
                    >
                      <span className="material-symbols-outlined text-[14px]">eco</span>
                      <span>{crop}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Summary Hub List (Display Only) */}
              <div>
                <span className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider block mb-2">
                  Connected Hubs Network
                </span>
                <div className="space-y-2">
                  {profile.hubs?.map((hub) => (
                    <div
                      key={hub.id}
                      className="p-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7]/60 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-2 h-2 rounded-full bg-[#1b6e53] shrink-0"></span>
                        <div className="truncate">
                          <span className="font-bold text-[#212529] truncate block">{hub.name}</span>
                          <span className="text-[10px] text-[#6d6d6d] font-mono truncate block">{hub.location}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-mono font-bold text-[#1b6e53] block">{hub.capacity}</span>
                        <span className="text-[10px] text-[#6d6d6d] font-mono">{hub.farmers} Farmers</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#c3cda7]/40 flex items-center justify-between text-xs flex-wrap gap-2">
            <Link
              to="/fpo/hubs"
              className="text-[#1b6e53] font-bold hover:underline inline-flex items-center gap-1 font-mono"
            >
              <span>Manage Hubs ({profile.numberOfHubs})</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
            <Link
              to="/fpo/products"
              className="text-[#1b6e53] font-bold hover:underline inline-flex items-center gap-1 font-mono"
            >
              <span>Supply Catalog</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 4: VERIFICATION                                      */}
        {/* ============================================================ */}
        <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#c3cda7]/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#00372a] leading-none">
                    Federation Verification
                  </h3>
                  <p className="text-[11px] text-[#6d6d6d] font-mono mt-0.5">SECTION 04 // TRUST &amp; COMPLIANCE</p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-1 rounded-full border border-[#c3cda7]">
                4/5 Verified
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Overview Pill */}
              <div className="p-3.5 rounded-[16px] bg-[#e6ecd5]/50 border border-[#c3cda7] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[17px]">verified_user</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#00372a] block text-xs sm:text-sm">Account Status: Active &amp; Verified</span>
                    <span className="text-[10px] text-[#1b6e53] font-mono">APMC &amp; SFAC Compliance Certified</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#1b6e53] text-[#ffffff] text-[10px] font-bold font-mono uppercase shrink-0">
                  Verified
                </span>
              </div>

              {/* Quick Checklist Snapshot */}
              <div className="space-y-2 pt-1">
                {profile.verificationChecklist?.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-[12px] bg-[#f1efdf]/40 border border-[#c3cda7]/60 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`material-symbols-outlined text-[16px] ${
                          item.status === 'Verified' ? 'text-[#1b6e53]' : 'text-[#683600]'
                        }`}
                      >
                        {item.status === 'Verified' ? 'check_circle' : 'pending'}
                      </span>
                      <span className="font-semibold text-[#212529] truncate">{item.title}</span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase border shrink-0 ${
                        item.status === 'Verified'
                          ? 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]'
                          : 'bg-[#fceace] text-[#683600] border-[#c3cda7]'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#c3cda7]/40 flex items-center justify-between text-xs">
            <span className="text-[#6d6d6d] font-mono text-[11px]">View full audit timeline</span>
            <Link
              to="/fpo/profile/verification"
              className="text-[#1b6e53] font-bold hover:underline inline-flex items-center gap-1 font-mono"
            >
              <span>Verification Status</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
