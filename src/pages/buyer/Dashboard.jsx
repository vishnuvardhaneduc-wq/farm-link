import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import ProcurementRequestModal from '../../components/buyer/ProcurementRequestModal'
import {
  recentProcurementRequests,
  mockFPOs,
  recentSearches,
  quickCategories
} from '../../data/buyerData'

export default function BuyerDashboard() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedFpoForRequest, setSelectedFpoForRequest] = useState(null)

  const handleQuickSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/buyer/products/results?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate('/buyer/products/results')
    }
  }

  const openRequestModal = (fpo) => {
    setSelectedFpoForRequest(fpo)
    setModalOpen(true)
  }

  // 3 recommended FPOs as requested
  const recommendedFPOs = mockFPOs.slice(0, 3)

  // 4 Buyer KPI cards matching FPO KPIGrid styling
  const buyerKpiCards = [
    {
      id: 'active-requests',
      title: 'Active Requests',
      icon: 'receipt_long',
      value: '4',
      unit: 'RFQs',
      subtitle: 'published forward tenders',
      badgeDot: true,
      badgeText: '2 receiving live FPO offers',
      cardBg: 'bg-[#e6ecd5]',
      titleColor: 'text-[#1b6e53]',
      valueColor: 'text-[#1b6e53]',
      iconColor: 'text-[#1b6e53]',
      footerColor: 'text-[#1b6e53]',
    },
    {
      id: 'offers-received',
      title: 'Offers Received',
      icon: 'local_offer',
      value: '18',
      unit: 'bids',
      subtitle: 'verified hub aggregate quotes',
      badgeIcon: 'mark_email_unread',
      badgeText: '6 new offers submitted today',
      cardBg: 'bg-[#fceace]',
      titleColor: 'text-[#683600]',
      valueColor: 'text-[#683600]',
      iconColor: 'text-[#683600]',
      footerColor: 'text-[#683600]',
    },
    {
      id: 'active-orders',
      title: 'Active Orders',
      icon: 'local_shipping',
      value: '3',
      unit: 'lots',
      subtitle: 'in transit & weighing stage',
      badgeIcon: 'inventory_2',
      badgeText: '2 trucks en route to dock',
      cardBg: 'bg-[#b2cee7]',
      titleColor: 'text-[#00372a]',
      valueColor: 'text-[#00372a]',
      iconColor: 'text-[#00372a]',
      footerColor: 'text-[#00372a]',
    },
    {
      id: 'completed-orders',
      title: 'Completed Orders',
      icon: 'task_alt',
      value: '24',
      unit: 'fulfilled',
      subtitle: 'all-time institutional contracts',
      badgeDot: true,
      badgeText: '99.2% on-time settlement rate',
      cardBg: 'bg-[#ffffff]',
      titleColor: 'text-[#353535]',
      valueColor: 'text-[#212529]',
      iconColor: 'text-[#1b6e53]',
      footerColor: 'text-[#1b6e53]',
    },
  ]

  return (
    <div className="space-y-8">
      {/* 1. Pastoral Editorial Announcement Banner matching HeroAnnouncement */}
      <section className="rounded-[28px] overflow-hidden bg-[#ffffff] border border-[#c3cda7] p-6 sm:p-8 lg:p-10 relative shadow-xs">
        {/* Background texture */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuATNEnSbIqCZBBF78cXOm-qfmbBRzRVOPufkcjTh2xrAIhpE9A6okjURld2Pk4pdcaWgkhO-BqmJ35oAYlZkDYwMI9S8UvW5z8JsrGktO57MjZMln6gM-t0cZzsX2aAW1oEvXrXao912j_Ey23WqA7b9ziyrHeqs1T7pdbvyKNM1FJBLrn7dQI8bHSHlhudRTk7vqY8WePk7iz2wdcITsoVVq6uE3y7R1QNlQlvRcq10P6Ji7Z8Ugvl3g"
            alt="Farmland Landscape"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7]">
                EDITION NO. 14 / BUYER DISCOVERY PROTOCOL
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[100px] bg-[#f1efdf] text-[#00372a] text-[10px] font-mono font-bold uppercase tracking-wider border border-[#c3cda7]/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] animate-pulse"></span>
                Direct FPO Federation Network
              </span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#00372a] tracking-tight leading-[1.1]">
              Institutional <span className="italic font-normal underline decoration-[#e8fe85] decoration-4 underline-offset-4">Commodity Discovery</span> & Forward Supply.
            </h1>

            <p className="text-xs sm:text-sm text-[#353535] leading-relaxed max-w-2xl font-sans">
              Discover verified regional Farmer Producer Organizations with certified aggregation hubs. Publish forward procurement requests to receive binding multi-hub offers with zero farmer smartphone dependency.
            </p>
          </div>

          {/* Quick CTA cluster */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <Link
              to="/buyer/products"
              className="py-3 px-6 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99]"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span>Search Products</span>
            </Link>
            <Link
              to="/buyer/fpos"
              className="py-3 px-6 rounded-[100px] bg-[#e6ecd5] hover:bg-[#c3cda7]/60 text-[#1b6e53] border border-[#c3cda7] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
            >
              <span className="material-symbols-outlined text-[18px]">apartment</span>
              <span>Browse FPOs</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. KPI Grid (Matching FPO KPIGrid.jsx) */}
      <section>
        <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-[#6d6d6d] mb-0.5">
              PROCUREMENT LEDGER // METRICS
            </div>
            <h2 className="font-editorial text-2xl font-light text-[#212529] tracking-tight">
              Institutional Sourcing Overview
            </h2>
          </div>
          <span className="text-xs font-mono text-[#6d6d6d] tracking-wide">
            Live Escrow T+0 Active • AgroFresh Desk
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {buyerKpiCards.map((card) => (
            <div
              key={card.id}
              className={`${card.cardBg} rounded-[20px] p-5 border border-[#c3cda7] flex flex-col justify-between shadow-xs`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium uppercase tracking-wider ${card.titleColor} font-mono`}>
                  {card.title}
                </span>
                <span className={`material-symbols-outlined text-[20px] ${card.iconColor}`}>
                  {card.icon}
                </span>
              </div>

              <div className="my-3">
                <div className={`font-editorial text-4xl font-normal leading-none ${card.valueColor}`}>
                  {card.value}{' '}
                  {card.unit && <span className="text-xl font-sans text-[14px] font-normal">{card.unit}</span>}
                </div>
                <p className="text-[11px] text-[#353535] mt-1">{card.subtitle}</p>
              </div>

              <div
                className={`pt-2 border-t border-[#c3cda7]/60 flex items-center gap-1.5 text-xs font-semibold ${card.footerColor}`}
              >
                {card.badgeDot && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53]"></span>
                )}
                {card.badgeIcon && (
                  <span className="material-symbols-outlined text-[14px]">
                    {card.badgeIcon}
                  </span>
                )}
                <span>{card.badgeText}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Main Section: "Find Agricultural Suppliers" */}
      <section className="rounded-[22px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-8 shadow-xs space-y-6">
        <div className="flex items-start gap-3.5 pb-4 border-b border-[#c3cda7]/50">
          <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <span className="material-symbols-outlined text-[20px]">manage_search</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-2 py-0.5 rounded-full border border-[#c3cda7]">
                MULTI-HUB AGGREGATION DISCOVERY
              </span>
              <span className="text-[10px] font-mono text-[#ba1a1a] uppercase tracking-wider font-bold">
                ● 12 FPO Federations Connected
              </span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a] tracking-tight">
              Find Agricultural Suppliers
            </h2>
            <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
              Search by crop, variety, target grade, or regional hub to discover available aggregated capacity.
            </p>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleQuickSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#6d6d6d]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crops, vegetables, fruits (e.g. Tomato, Onion, Potato, Rice, Banana)..."
                className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm bg-[#f1efdf]/60 border border-[#c3cda7] rounded-[100px] text-[#212529] placeholder-[#6d6d6d] focus:outline-none focus:ring-2 focus:ring-[#1b6e53] focus:bg-[#ffffff] transition"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-8 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99] cursor-pointer"
            >
              <span>Search Products</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Quick Searches pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#6d6d6d] mr-1">
              Recently Searched:
            </span>
            {recentSearches.map((crop) => (
              <button
                key={crop}
                type="button"
                onClick={() => navigate(`/buyer/products/results?q=${encodeURIComponent(crop)}`)}
                className="text-xs px-3 py-1 rounded-[100px] bg-[#f1efdf] hover:bg-[#e8fe85] hover:text-[#1b6e53] text-[#212529] font-medium border border-[#c3cda7] transition cursor-pointer"
              >
                {crop}
              </button>
            ))}
            <Link
              to="/buyer/products"
              className="text-xs font-bold text-[#1b6e53] hover:underline underline-offset-4 ml-auto"
            >
              Advanced Filters &amp; Grades →
            </Link>
          </div>
        </form>
      </section>

      {/* 4. Recent Procurement Requests Section matching ProcurementRequestsSection */}
      <section className="rounded-[22px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-2 py-0.5 rounded-full border border-[#c3cda7]">
                  BUYER RFQ LEDGER
                </span>
                <span className="text-[10px] font-mono text-[#ba1a1a] uppercase tracking-wider font-bold">
                  ● 4 Active Requests
                </span>
              </div>
              <h2 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight">
                Recent Procurement Requests
              </h2>
            </div>
          </div>

          <Link
            to="/buyer/demands"
            className="inline-flex items-center gap-1 text-xs text-[#1b6e53] font-bold bg-[#e6ecd5] hover:bg-[#c3cda7]/60 px-3.5 py-1.5 rounded-[100px] border border-[#c3cda7] transition"
          >
            <span>View All Requests</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>

        {/* Grid of Request Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentProcurementRequests.map((req) => (
            <div
              key={req.id}
              className="rounded-[20px] bg-[#f1efdf] border border-[#c3cda7]/80 p-5 flex flex-col justify-between hover:shadow-md hover:border-[#1b6e53] transition"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#6d6d6d] uppercase block">
                      {req.id}
                    </span>
                    <h3 className="font-editorial text-xl font-bold text-[#212529] leading-snug">
                      {req.crop}
                    </h3>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-mono ${
                      req.status === 'Receiving Offers'
                        ? 'bg-[#fceace] text-[#683600]'
                        : req.status === 'Draft'
                        ? 'bg-[#ffffff] text-[#6d6d6d] border border-[#c3cda7]'
                        : 'bg-[#e6ecd5] text-[#1b6e53]'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs py-3 border-y border-[#c3cda7]/50">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#6d6d6d]">Quantity:</span>
                    <span className="font-bold text-[#1b6e53] font-mono text-sm">{req.quantity}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#6d6d6d]">Grade Spec:</span>
                    <span className="font-semibold text-[#212529]">{req.grade}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#6d6d6d]">Target Rate:</span>
                    <span className="font-semibold text-[#683600] font-mono">{req.targetPrice}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#6d6d6d]">Offers:</span>
                    <span className="font-bold text-[#1b6e53] font-mono">
                      {req.offersCount > 0 ? `${req.offersCount} Bids Received` : 'Awaiting Hub Intake'}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#6d6d6d]">Delivery Date:</span>
                    <span className="font-mono text-[#212529] text-[11px]">{req.deliveryDate}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4">
                <Link
                  to="/buyer/demands"
                  className="w-full py-2.5 px-4 rounded-[100px] bg-[#1b6e53] text-[#ffffff] text-xs font-bold hover:bg-[#00372a] transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>{req.offersCount > 0 ? `Compare ${req.offersCount} Offers` : 'Review Request'}</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Recommended FPO Suppliers matching HubNetworkSection */}
      <section className="rounded-[22px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#e8fe85] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="material-symbols-outlined text-[20px]">apartment</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-2 py-0.5 rounded-full border border-[#c3cda7]">
                  RECOMMENDED FPO FEDERATIONS
                </span>
                <span className="text-[10px] font-mono text-[#1b6e53] uppercase tracking-wider font-bold">
                  ● Verified Aggregation Hubs
                </span>
              </div>
              <h2 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight">
                Recommended FPO Suppliers
              </h2>
            </div>
          </div>

          <Link
            to="/buyer/fpos"
            className="inline-flex items-center gap-1 text-xs text-[#1b6e53] font-bold bg-[#e8fe85] hover:bg-[#d8ee6f] px-3.5 py-1.5 rounded-[100px] transition shrink-0 shadow-sm"
          >
            <span>All FPO Suppliers</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>

        {/* 3 Recommended FPO Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recommendedFPOs.map((fpo) => (
            <div
              key={fpo.id}
              className="rounded-[20px] bg-[#f1efdf] border border-[#c3cda7] p-5 flex flex-col justify-between hover:shadow-md hover:border-[#1b6e53] transition space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-editorial text-2xl font-bold text-[#00372a] leading-tight">
                      {fpo.name}
                    </h3>
                    <p className="text-xs text-[#6d6d6d] font-mono mt-0.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#1b6e53]">location_on</span>
                      {fpo.location}, {fpo.district}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#ffffff] border border-[#c3cda7] text-xs font-bold text-[#683600] font-mono shrink-0">
                    ★ {fpo.rating}
                  </span>
                </div>

                <div className="space-y-2 text-xs py-3 border-y border-[#c3cda7]/50">
                  <div>
                    <span className="text-[#6d6d6d] block mb-1">Products Supplied:</span>
                    <div className="flex flex-wrap gap-1">
                      {fpo.products.slice(0, 4).map((p) => (
                        <span key={p} className="bg-[#ffffff] border border-[#c3cda7]/60 text-[#212529] px-2 py-0.5 rounded text-[11px] font-medium font-mono">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-[#6d6d6d]">Approx. Capacity:</span>
                    <span className="font-bold text-[#1b6e53] font-mono">{fpo.approxCapacityVal}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#6d6d6d]">Reliability SLA:</span>
                    <span className="font-bold text-[#1b6e53] font-mono">{fpo.reliabilityScore}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#6d6d6d]">Physical Hubs:</span>
                    <span className="font-medium text-[#212529] font-mono">{fpo.hubsCount} Active Hubs</span>
                  </div>
                </div>
              </div>

              {/* Action cluster */}
              <div className="flex items-center gap-2 pt-2">
                <Link
                  to={`/buyer/fpos/${fpo.id}`}
                  className="flex-1 py-2 rounded-[100px] bg-[#ffffff] border border-[#c3cda7] hover:bg-[#faf9f0] text-xs font-semibold text-[#353535] text-center transition"
                >
                  View Profile
                </Link>
                <button
                  onClick={() => openRequestModal(fpo)}
                  className="flex-1 py-2 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold text-center transition shadow-xs cursor-pointer"
                >
                  Send RFQ →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Procurement Request Modal */}
      <ProcurementRequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={
          selectedFpoForRequest
            ? {
                fpoName: selectedFpoForRequest.name,
                product: selectedFpoForRequest.products[0],
                grade: 'Grade A',
                indicativePrice: selectedFpoForRequest.tomatoPrice
              }
            : {}
        }
      />
    </div>
  )
}
