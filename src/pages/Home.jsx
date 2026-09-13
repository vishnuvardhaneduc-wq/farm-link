import React from 'react'
import { Link } from 'react-router'

export default function Home() {
  const tickerItems = [
    '🌾 National Agritech Network',
    'Zero Smartphone Dependency for Smallholders',
    'Transparent APMC & eNAM Integration',
    'Live UPI T+0 Escrow Clearing Active',
    'CV Quality Assay Certified',
    'Verified FPO Federation Grid',
  ]

  const featureHighlights = [
    { label: 'Verified FPO Federation Network', icon: 'verified' },
    { label: 'Transparent Hub Fulfillment', icon: 'hub' },
    { label: 'No Smartphone Required for Farmers', icon: 'phonelink_erase' },
  ]

  const workspaceCards = [
    {
      id: 'fpo',
      tier: 'Tier 1 Federation',
      tierBg: 'bg-[#e6ecd5] text-[#1b6e53]',
      icon: 'groups',
      borderTop: 'border-t-[#1b6e53]',
      title: 'FPO Federation',
      description:
        'Manage member farmer cohorts, dispatch harvest windows, approve incoming institutional buyer contracts, and allocate village aggregation hubs.',
      loginTo: '/fpo/login',
      loginLabel: 'FPO Login',
      registerTo: '/fpo/register',
      registerLabel: 'FPO Registration',
    },
    {
      id: 'buyer',
      tier: 'Institutional Mandi',
      tierBg: 'bg-[#b2cee7]/50 text-[#212529]',
      icon: 'apartment',
      borderTop: 'border-t-[#b2cee7]',
      title: 'BUYER Enterprise',
      description:
        'Discover verified regional suppliers, publish high-tonnage procurement tenders, compare forward contracts, and track multi-hub dispatches.',
      loginTo: '/buyer/login',
      loginLabel: 'Buyer Login',
      registerTo: '/buyer/register',
      registerLabel: 'Buyer Registration',
    },
    {
      id: 'hub',
      tier: 'IoT Depot',
      tierBg: 'bg-[#fceace] text-[#683600]',
      icon: 'scale',
      borderTop: 'border-t-[#fceace]',
      title: 'HUB Aggregation',
      description:
        'Operate electronic weighbridges, conduct computer-vision assay grading, print digital weighment slips, and verify cold-chain departures.',
      loginTo: '/hub/login',
      loginLabel: 'Hub Login',
      note: 'Device Token assigned by FPO Administrator',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#f1efdf] text-[#212529] font-sans antialiased selection:bg-[#e8fe85] selection:text-[#1b6e53]">
      {/* 1. Top Ticker Marquee Strip */}
      <div className="bg-[#e8fe85] text-[#1b6e53] text-xs font-semibold py-2 px-4 overflow-hidden border-b border-[#1b6e53]/15">
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="inline-flex items-center space-x-6 text-[12px] tracking-wide animate-pulse">
            {tickerItems.concat(tickerItems).map((item, idx) => (
              <React.Fragment key={idx}>
                <span>{item}</span>
                <span className="text-[#1b6e53]/40">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Top Navigation Header with FarmLink Logo */}
      <header className="bg-[#1b6e53] text-white sticky top-0 z-50 px-6 sm:px-10 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#e8fe85] flex items-center justify-center text-[#1b6e53] transition-transform group-hover:scale-105 duration-200 shadow-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3 21h18L12 2zm0 4.5l5.5 11.5h-11L12 6.5z"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-editorial text-2xl font-bold tracking-tight text-white leading-none">
                  FarmLink
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full bg-white/15 text-[9px] font-semibold text-[#e8fe85] uppercase tracking-wider">
                  OS v4.2
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-[#e8fe85] font-medium uppercase mt-0.5 font-mono">
                Federated Ag-Grid
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3.5">
            <span className="text-xs sm:text-sm font-medium tracking-wide text-emerald-100/80 hidden md:inline-block">
              <span className="text-white/90">Transparent Procurement</span>{' '}
              <span className="text-[#e8fe85] px-1.5">•</span>{' '}
              <span className="text-white/90">Organized FPO Supply</span>{' '}
              <span className="text-[#e8fe85] px-1.5">•</span>{' '}
              <span className="text-white/90">Farmer-First</span>
            </span>
          </div>
        </div>
      </header>

      {/* 3. Main Hero & Workspaces Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 sm:px-10 py-10 space-y-12">
        {/* Hero Masthead */}
        <section className="relative rounded-[28px] overflow-hidden bg-[#ffffff] border border-[#c3cda7] p-8 sm:p-12 lg:p-16 text-center shadow-xs">
          {/* Background Aerial Landscape with overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATNEnSbIqCZBBF78cXOm-qfmbBRzRVOPufkcjTh2xrAIhpE9A6okjURld2Pk4pdcaWgkhO-BqmJ35oAYlZkDYwMI9S8UvW5z8JsrGktO57MjZMln6gM-t0cZzsX2aAW1oEvXrXao912j_Ey23WqA7b9ziyrHeqs1T7pdbvyKNM1FJBLrn7dQI8bHSHlhudRTk7vqY8WePk7iz2wdcITsoVVq6uE3y7R1QNlQlvRcq10P6Ji7Z8Ugvl3g"
              alt="Farmland Texture"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            {/* Pastoral Category Badge */}
            <div className="inline-flex items-center gap-2 bg-[#e6ecd5] border border-[#c3cda7] px-4 py-1.5 rounded-[100px] text-xs font-semibold text-[#1b6e53] uppercase tracking-widest font-mono">
              <span className="w-2 h-2 rounded-full bg-[#1b6e53] animate-pulse"></span>
              Decentralized Ag-Aggregation System
            </div>

            {/* Headline */}
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-light text-[#00372a] tracking-tight leading-[1.08]">
              Connect demand to the{' '}
              <span className="italic font-normal underline decoration-[#e8fe85] decoration-4 underline-offset-8">
                right supply
              </span>
              .
            </h1>

            {/* Short Product Description */}
            <p className="text-base sm:text-lg text-[#353535] leading-relaxed font-normal max-w-2xl mx-auto">
              FarmLink connects institutional commercial buyers with regional FPOs and automated village aggregation hubs for zero-leakage agricultural procurement.
            </p>

            {/* Three Feature Highlight Pills */}
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              {featureHighlights.map((feat) => (
                <span
                  key={feat.label}
                  className="inline-flex items-center gap-2 bg-[#f1efdf] border border-[#c3cda7] px-4 py-2 rounded-[100px] text-xs sm:text-sm text-[#1b6e53] font-medium shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#1b6e53]">
                    {feat.icon}
                  </span>
                  {feat.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Three Login Cards */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]/60">
            <div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
                Operational Portals
              </h2>
              <p className="text-xs sm:text-sm text-[#6d6d6d] mt-0.5">
                Select your assigned organizational gateway to enter the network
              </p>
            </div>
            <span className="text-xs font-semibold text-[#1b6e53] uppercase tracking-widest bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] font-mono">
              3 Connected Tiers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workspaceCards.map((card) => (
              <article
                key={card.id}
                className={`bg-[#ffffff] rounded-[24px] p-7 border border-[#c3cda7] border-t-8 ${card.borderTop} flex flex-col justify-between shadow-xs hover:shadow-md transition-all group`}
              >
                <div>
                  {/* Top Tier Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`text-xs font-bold uppercase px-3 py-1 rounded-[100px] tracking-wider font-mono ${card.tierBg}`}
                    >
                      {card.tier}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#f1efdf] flex items-center justify-center text-[#1b6e53] group-hover:bg-[#1b6e53] group-hover:text-[#e8fe85] transition-colors shadow-2xs">
                      <span className="material-symbols-outlined text-[20px]">{card.icon}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-editorial text-3xl font-bold text-[#00372a] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#353535] leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4 border-t border-[#c3cda7]/40">
                  <Link
                    to={card.loginTo}
                    className="w-full py-3.5 px-6 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-center font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.99]"
                  >
                    <span>{card.loginLabel}</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>

                  {card.registerTo ? (
                    <div className="text-center">
                      <Link
                        to={card.registerTo}
                        className="text-xs font-semibold text-[#1b6e53] hover:underline underline-offset-4"
                      >
                        {card.registerLabel} →
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center">
                      <span className="text-[11px] text-[#6d6d6d] italic">
                        {card.note}
                      </span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Small Farmer Smartphone-Free Message Banner */}
        <section className="bg-[#e6ecd5] border border-[#c3cda7] rounded-[24px] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-[#1b6e53] text-[#e8fe85] flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[28px]">phonelink_erase</span>
          </div>

          <div className="space-y-1.5 flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#1b6e53] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#1b6e53]"></span>
              Zero-App Architecture for Producers
            </div>
            <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
              Farmers never need to download or navigate an application.
            </h4>
            <p className="text-xs sm:text-sm text-[#353535] leading-relaxed max-w-3xl">
              Cultivator supply is aggregated through local FPO coordinators and village physical hubs. Farmers receive automated vernacular IVR phone calls, printed weighment tickets, and real-time SMS receipts with guaranteed T+0 UPI Jan Dhan escrow settlements.
            </p>
          </div>

          <div className="shrink-0 flex gap-3">
            <div className="bg-[#ffffff] rounded-[16px] px-4 py-2.5 border border-[#c3cda7] text-center shadow-2xs">
              <span className="block text-xl font-bold text-[#1b6e53] font-mono">100%</span>
              <span className="text-[10px] text-[#6d6d6d] uppercase font-semibold">SMS & IVR Fallback</span>
            </div>
            <div className="bg-[#ffffff] rounded-[16px] px-4 py-2.5 border border-[#c3cda7] text-center shadow-2xs">
              <span className="block text-xl font-bold text-[#1b6e53] font-mono">&lt; 2hr</span>
              <span className="text-[10px] text-[#6d6d6d] uppercase font-semibold">Instant Escrow Pay</span>
            </div>
          </div>
        </section>
      </main>

      {/* 4. Minimal Footer */}
      <footer className="bg-[#1b6e53] text-white pt-12 pb-8 px-6 sm:px-10 border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#e8fe85] flex items-center justify-center text-[#1b6e53] font-bold text-sm">
                FL
              </div>
              <span className="font-editorial text-2xl font-bold tracking-tight text-white">
                FarmLink
              </span>
              <span className="text-xs text-emerald-200/80 font-light ml-2 hidden sm:inline">
                National Agritech Procurement & Aggregation Portal
              </span>
            </div>

            <div className="flex items-center gap-6 text-xs text-emerald-100/90 font-medium">
              <Link to="/fpo/dashboard" className="hover:text-[#e8fe85] transition">FPO Federation</Link>
              <Link to="/buyer/dashboard" className="hover:text-[#e8fe85] transition">Buyer Desk</Link>
              <Link to="/hub/dashboard" className="hover:text-[#e8fe85] transition">Hub Console</Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60 font-mono">
            <p>© 2026 FarmLink Agritech Network. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Zero-Intermediary Guarantee</span>
              <span>•</span>
              <span>eNAM & Open Mandi Protocol</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
