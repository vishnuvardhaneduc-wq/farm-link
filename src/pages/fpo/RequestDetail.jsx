import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { getDemandById, submitFpoResponse } from '../../data/buyerData'

export default function FPORequestDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [demand, setDemand] = useState(() => getDemandById(id))

  useEffect(() => {
    setDemand(getDemandById(id))
  }, [id])

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Current FPO hub info
  const fpoProfile = {
    id: 'fpo-godavari',
    name: 'Godavari Farmers FPO',
    location: 'Rajamahendravaram, East Godavari',
    primaryHub: 'Nashik Central Hub #04',
    contactPerson: 'p.vishnu vardhan (Hub Director)'
  }

  const items = demand?.items || [
    {
      itemId: 'item-1',
      crop: demand?.crop || 'Tomato',
      variety: demand?.variety || 'Hybrid Roma',
      quantity: demand?.quantity || '1,000 kg',
      quantityVal: 1000,
      grade: demand?.grade || 'Grade A',
      targetPrice: demand?.targetPrice || '₹28 / kg',
      qualitySpecs: demand?.qualitySpecs || 'Optical grading Grade A required.',
      packaging: demand?.packaging || '20kg crates'
    }
  ]

  // Track per-item response state:
  // responses[itemId] = { type: 'ACCEPT' | 'BACK_OFFER' | 'DECLINE', availableQty, producePrice, transportCost, offeredGrade, deliveryDate, declineReason, notes }
  const [itemResponses, setItemResponses] = useState(() => {
    const initial = {}
    items.forEach((item, idx) => {
      const targetRateNum = parseFloat(String(item.targetPrice).replace(/[^0-9.]/g, '')) || 28
      const rawQty = parseInt(String(item.quantity || '0').replace(/[^0-9]/g, '')) || 1000

      // If demo REQ-1027, initialize with the prompt's realistic scenario
      if (idx === 0) {
        // Item 1: Tomato -> Accept (Produce: ₹27/kg, Transport: ₹1,500)
        initial[item.itemId] = {
          type: 'ACCEPT',
          availableQty: String(rawQty),
          producePrice: '27.00',
          offeredPrice: '27.00',
          transportCost: '1500',
          offeredGrade: item.grade || 'Grade A',
          deliveryDate: demand?.deliveryDate || '2026-09-25',
          declineReason: '',
          notes: `Full ${rawQty} kg Grade A Roma tomatoes allocated from member farmer clusters. Crates loaded for scheduled delivery.`
        }
      } else if (idx === 1) {
        // Item 2: Onion -> Back Offer (Produce: ₹25/kg, Transport: ₹800)
        initial[item.itemId] = {
          type: 'BACK_OFFER',
          availableQty: String(Math.round(rawQty * 0.8)), // e.g. 400kg out of 500kg
          producePrice: '25.00',
          offeredPrice: '25.00',
          transportCost: '800',
          offeredGrade: item.grade || 'Grade A',
          deliveryDate: '2026-09-26',
          declineReason: '',
          notes: `Proposing 400 kg at ₹25/kg due to peak cold storage staging. Delivery shifted by +1 day (26 Sep).`
        }
      } else {
        // Item 3: Green Chilli -> Decline
        initial[item.itemId] = {
          type: 'DECLINE',
          availableQty: '',
          producePrice: '',
          offeredPrice: '',
          transportCost: '600',
          offeredGrade: '',
          deliveryDate: '',
          declineReason: 'Insufficient Grade A supply',
          notes: 'Insufficient Grade A supply across local cluster for 25 Sep schedule.'
        }
      }
    })
    return initial
  })

  // Helper to update specific fields of an item response
  const handleUpdateResponse = (itemId, field, value) => {
    setItemResponses((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value
      }
    }))
  }

  // Handle switching response type for an item (Accept / Back Offer / Decline)
  const handleSwitchType = (item, newType) => {
    const targetRateNum = parseFloat(String(item.targetPrice).replace(/[^0-9.]/g, '')) || 28
    const rawQty = parseInt(String(item.quantity || '0').replace(/[^0-9]/g, '')) || 1000

    setItemResponses((prev) => {
      const current = prev[item.itemId] || {}

      if (newType === 'ACCEPT') {
        return {
          ...prev,
          [item.itemId]: {
            ...current,
            type: 'ACCEPT',
            availableQty: current.availableQty || String(rawQty),
            producePrice: current.producePrice || (targetRateNum - 1.0).toFixed(2),
            offeredPrice: current.producePrice || (targetRateNum - 1.0).toFixed(2),
            transportCost: current.transportCost || '1500',
            offeredGrade: item.grade || 'Grade A',
            deliveryDate: demand.deliveryDate || '2026-09-25',
            declineReason: '',
            notes: current.notes || `Full ${rawQty} kg volume confirmed for dispatch.`
          }
        }
      } else if (newType === 'BACK_OFFER') {
        return {
          ...prev,
          [item.itemId]: {
            ...current,
            type: 'BACK_OFFER',
            availableQty: current.availableQty || String(Math.round(rawQty * 0.8)),
            producePrice: current.producePrice || (targetRateNum + 1.0).toFixed(2),
            offeredPrice: current.producePrice || (targetRateNum + 1.0).toFixed(2),
            transportCost: current.transportCost || '1500',
            offeredGrade: current.offeredGrade || item.grade || 'Grade A',
            deliveryDate: current.deliveryDate || demand.deliveryDate || '2026-09-26',
            declineReason: '',
            notes: current.notes || 'Counter proposal submitted with revised volume and staging rate.'
          }
        }
      } else {
        // DECLINE
        return {
          ...prev,
          [item.itemId]: {
            ...current,
            type: 'DECLINE',
            declineReason: current.declineReason || 'Insufficient quantity',
            notes: current.notes || 'Unable to fulfill this specific item from current harvest intake.'
          }
        }
      }
    })
  }

  const handleSubmitAllResponses = (e) => {
    e.preventDefault()

    // Save to shared buyer storage
    submitFpoResponse(demand.id, fpoProfile, itemResponses)

    setIsSubmitted(true)
    setToastMessage('FPO Response submitted successfully! Sent to buyer review ledger.')
  }

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Link to="/fpo/requests" className="text-[10px] font-mono text-[#1b6e53] font-bold hover:underline">
              ← BACK TO INCOMING REQUESTS
            </Link>
            <span className="text-[#c3cda7]">/</span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              PROCUREMENT TENDER // {demand.id}
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Review Request <span className="italic font-normal font-mono text-2xl sm:text-3xl">({demand.id})</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Review buyer commodity specs, configure item-level commercial terms, and submit formal binding responses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#ffffff] px-4 py-2 rounded-[100px] border border-[#c3cda7] shadow-2xs">
            {items.length} {items.length === 1 ? 'Commodity Item' : 'Commodity Items'} Requested
          </span>
        </div>
      </div>

      {/* Success Banner */}
      {isSubmitted && (
        <div className="p-5 bg-[#e6ecd5] border-2 border-[#1b6e53] rounded-[24px] space-y-3 shadow-md animate-in fade-in">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center font-bold text-lg">
                ✓
              </div>
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Response Submitted!
                </h3>
                <p className="text-xs text-[#1b6e53] font-sans">
                  Your formal responses have been sent to <strong>{demand.buyer}</strong>.
                </p>
              </div>
            </div>

            <Link
              to="/fpo/requests"
              className="py-2 px-5 rounded-[100px] bg-[#1b6e53] text-[#ffffff] text-xs font-bold hover:bg-[#00372a] transition shadow-xs cursor-pointer"
            >
              ← Back to Requests
            </Link>
          </div>

          <div className="p-3 bg-[#ffffff] rounded-[16px] border border-[#c3cda7] text-xs text-[#353535] font-sans">
            ℹ️ <strong>Workflow Reminder:</strong> A procurement request response is not an order. The buyer will review your proposal alongside other quotes. Once the buyer awards the item to your FPO, an official order will be generated to begin member collection and logistics.
          </div>
        </div>
      )}

      {/* 2. Common Buyer Request Header Card */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-4 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-[18px] bg-[#e6ecd5] border border-[#c3cda7] text-[#1b6e53] text-2xl flex items-center justify-center shrink-0 font-bold">
              🏢
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-mono font-bold text-xs text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">
                  {demand.id}
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
                  {demand.buyer || 'AgroFresh Enterprise'}
                </h2>
              </div>
              <p className="text-xs text-[#6d6d6d] font-mono mt-0.5">
                Institutional Processor &amp; Retail Aggregator • Verified Buyer #BUY-204
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-[#fceace] rounded-[16px] px-4 py-2 border border-[#c3cda7]/60">
              <span className="block text-[10px] font-mono uppercase text-[#683600]">Required Delivery</span>
              <span className="text-xs font-mono font-bold text-[#683600]">{demand.deliveryDate}</span>
            </div>
            <div className="bg-[#f1efdf] rounded-[16px] px-4 py-2 border border-[#c3cda7]/60">
              <span className="block text-[10px] font-mono uppercase text-[#6d6d6d]">Destination</span>
              <span className="text-xs font-mono font-bold text-[#212529]">{demand.deliveryLocation}</span>
            </div>
          </div>
        </div>

        {demand.notes && (
          <div className="p-3 bg-[#f1efdf]/50 rounded-[16px] border border-[#c3cda7]/40 text-xs text-[#353535] font-sans">
            <strong className="font-mono text-[10px] uppercase text-[#6d6d6d] block mb-0.5">
              Buyer Tender Notes &amp; Logistics Receiving Terms:
            </strong>
            "{demand.notes}"
          </div>
        )}
      </section>

      {/* 3. Requested Items — Form with Item-Level Response Controls */}
      <form onSubmit={handleSubmitAllResponses} className="space-y-8">
        <div className="flex items-center justify-between pb-2 border-b border-[#c3cda7]/50 flex-wrap gap-2">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold">
              MULTI-ITEM TENDER // {items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'}
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
              Requested Items &amp; Commercial Terms
            </h2>
          </div>
          <p className="text-xs font-mono text-[#6d6d6d]">
            Configure your response separately for each commodity item below
          </p>
        </div>

        {/* Item Cards */}
        <div className="space-y-6">
          {items.map((item, idx) => {
            const isItemConfirmed = Boolean(
              item.isConfirmed ||
              item.confirmedOfferId ||
              item.status === 'ORDER CONFIRMED' ||
              item.status === 'Confirmed'
            )
            const myResponse = (item.responses || []).find(
              (r) => r.fpoId === fpoProfile.id || r.fpoName === fpoProfile.name
            )

            const resp = itemResponses[item.itemId] || {
              type: 'ACCEPT',
              availableQty: item.quantity,
              offeredPrice: '27.50',
              offeredGrade: item.grade,
              deliveryDate: demand.deliveryDate,
              declineReason: '',
              notes: ''
            }

            const isAccept = resp.type === 'ACCEPT'
            const isBackOffer = resp.type === 'BACK_OFFER'
            const isDecline = resp.type === 'DECLINE'

            return (
              <div
                key={item.itemId || idx}
                className={`rounded-[24px] bg-[#ffffff] border transition-all p-6 lg:p-7 shadow-xs space-y-6 ${isItemConfirmed
                    ? 'border-rose-300 bg-rose-50/15'
                    : isAccept
                      ? 'border-[#1b6e53]/60'
                      : isBackOffer
                        ? 'border-[#683600]/60'
                        : 'border-rose-300'
                  }`}
              >
                {/* Item Header & Buyer Specs */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/50">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#1b6e53] text-[#ffffff] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                        Item 0{idx + 1}: {item.crop} <span className="text-lg font-normal text-[#6d6d6d]">({item.variety || 'Standard Lot'})</span>
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#6d6d6d] mt-1">
                        <span>Requested Qty: <strong className="text-[#1b6e53] font-bold">{item.quantity}</strong></span>
                        <span>•</span>
                        <span>Required Grade: <strong className="text-[#212529] font-bold">{item.grade}</strong></span>
                        <span>•</span>
                        <span>Buyer Target Rate: <strong className="text-[#683600] font-bold">{item.targetPrice}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Status / Quality & Packing pills */}
                  <div className="flex flex-wrap gap-1.5 self-start lg:self-center items-center">
                    {isItemConfirmed && (
                      <span className="px-3.5 py-1.5 rounded-[100px] text-xs font-mono font-bold tracking-wider uppercase bg-rose-50 text-rose-700 border border-rose-300 flex items-center gap-1.5 shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                        <span>ORDER CONFIRMED</span>
                      </span>
                    )}
                    {item.qualitySpecs && (
                      <span className="text-[10px] font-mono bg-[#f1efdf] text-[#353535] px-2.5 py-1 rounded-[100px] border border-[#c3cda7]">
                        🔬 {item.qualitySpecs}
                      </span>
                    )}
                    {item.packaging && (
                      <span className="text-[10px] font-mono bg-[#f1efdf] text-[#353535] px-2.5 py-1 rounded-[100px] border border-[#c3cda7]">
                        📦 {item.packaging}
                      </span>
                    )}
                  </div>
                </div>

                {/* If Order Confirmed for this item */}
                {isItemConfirmed && (
                  <div className="bg-rose-50/80 rounded-[20px] p-5 border border-rose-200 space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 text-rose-700 font-bold text-xs font-mono uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        <span>ORDER CONFIRMED</span>
                      </div>
                      <span className="px-3 py-0.5 rounded-[100px] bg-rose-100 text-rose-800 text-[10px] font-mono font-bold border border-rose-300">
                        Requirement Closed
                      </span>
                    </div>
                    <p className="text-xs text-rose-900 font-sans">
                      This product requirement ({item.crop} — {item.quantity}, {item.grade}) has already been confirmed by the buyer. No further responses or modifications can be submitted for this item.
                    </p>
                    {myResponse && (myResponse.offeredPrice || myResponse.counterPrice || myResponse.status) && (
                      <div className="bg-[#ffffff] rounded-[16px] p-3.5 border border-rose-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-[#212529]">
                        <div>
                          <span className="text-[#6d6d6d] block text-[10px] uppercase">Recorded Response</span>
                          <strong className="text-rose-700 font-extrabold text-sm">{myResponse.offeredPrice || myResponse.counterPrice || 'Standard Terms'}</strong>
                        </div>
                        <div>
                          <span className="text-[#6d6d6d] block text-[10px] uppercase">Volume</span>
                          <strong className="text-[#212529] font-bold text-sm">{myResponse.offeredQty || item.quantity}</strong>
                        </div>
                        <div>
                          <span className="text-[#6d6d6d] block text-[10px] uppercase">Target Date</span>
                          <strong className="text-[#212529] font-bold text-sm">{myResponse.deliveryDate || demand.deliveryDate}</strong>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Editable Response Controls if Item is NOT confirmed */}
                {!isItemConfirmed && (
                  <>
                    {/* Response Type Selector Buttons */}
                    <div className="space-y-3">
                      <span className="text-[11px] font-mono uppercase font-bold text-[#6d6d6d] block">
                        Select Response for Item 0{idx + 1} ({item.crop}):
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* 1. Accept */}
                        <button
                          type="button"
                          onClick={() => handleSwitchType(item, 'ACCEPT')}
                          className={`py-3 px-4 rounded-[16px] text-xs font-bold transition flex items-center justify-between border cursor-pointer ${isAccept
                              ? 'bg-[#1b6e53] text-[#ffffff] border-[#1b6e53] shadow-xs'
                              : 'bg-[#ffffff] text-[#1b6e53] border-[#c3cda7] hover:bg-[#e6ecd5]'
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            <span>Accept Item</span>
                          </div>
                          <span className="text-[10px] font-mono font-normal opacity-90">Target Terms</span>
                        </button>

                        {/* 2. Back Offer */}
                        <button
                          type="button"
                          onClick={() => handleSwitchType(item, 'BACK_OFFER')}
                          className={`py-3 px-4 rounded-[16px] text-xs font-bold transition flex items-center justify-between border cursor-pointer ${isBackOffer
                              ? 'bg-[#683600] text-[#ffffff] border-[#683600] shadow-xs'
                              : 'bg-[#ffffff] text-[#683600] border-[#c3cda7] hover:bg-[#fceace]'
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">cached</span>
                            <span>Back Offer</span>
                          </div>
                          <span className="text-[10px] font-mono font-normal opacity-90">Counter Terms</span>
                        </button>

                        {/* 3. Decline */}
                        <button
                          type="button"
                          onClick={() => handleSwitchType(item, 'DECLINE')}
                          className={`py-3 px-4 rounded-[16px] text-xs font-bold transition flex items-center justify-between border cursor-pointer ${isDecline
                              ? 'bg-rose-700 text-[#ffffff] border-rose-700 shadow-xs'
                              : 'bg-[#ffffff] text-rose-700 border-[#c3cda7] hover:bg-rose-50'
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">cancel</span>
                            <span>Decline Item</span>
                          </div>
                          <span className="text-[10px] font-mono font-normal opacity-90">Unavailable</span>
                        </button>
                      </div>
                    </div>

                    {/* Active Response Form Box */}
                    {isAccept && (() => {
                      const curQty = Number(resp.availableQty || item.quantityVal || 1000)
                      const curRate = parseFloat(String(resp.producePrice || resp.offeredPrice || 27).replace(/[^0-9.]/g, '')) || 27
                      const curTransport = parseFloat(String(resp.transportCost !== undefined && resp.transportCost !== '' ? resp.transportCost : 1500).replace(/[^0-9.]/g, '')) || 1500
                      const curProduceVal = Math.round(curQty * curRate)
                      const curDeliveredTotal = curProduceVal + curTransport
                      const curEffectiveRate = curQty > 0 ? (curDeliveredTotal / curQty).toFixed(2) : curRate.toFixed(2)

                      return (
                      <div className="bg-[#e6ecd5]/40 rounded-[20px] p-5 border border-[#1b6e53]/30 space-y-4 animate-in fade-in">
                        <div className="flex items-center justify-between border-b border-[#c3cda7]/50 pb-2">
                          <span className="text-xs font-mono font-bold text-[#1b6e53] uppercase flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">verified</span>
                            Offer Accepted Terms for {item.crop}
                          </span>
                          <span className="text-[10px] font-mono text-[#6d6d6d]">
                            Committed directly from cluster inventory
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                          {/* Available Qty */}
                          <div>
                            <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                              Available Quantity (kg) <span className="text-rose-600">*</span>
                            </label>
                            <input
                              type="number"
                              required
                              value={resp.availableQty}
                              onChange={(e) => handleUpdateResponse(item.itemId, 'availableQty', e.target.value)}
                              className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] font-mono text-[#212529]"
                            />
                          </div>

                          {/* Produce Price */}
                          <div>
                            <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                              Produce Rate (₹ / kg) <span className="text-rose-600">*</span>
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              required
                              value={resp.producePrice !== undefined ? resp.producePrice : resp.offeredPrice}
                              onChange={(e) => {
                                handleUpdateResponse(item.itemId, 'producePrice', e.target.value)
                                handleUpdateResponse(item.itemId, 'offeredPrice', e.target.value)
                              }}
                              className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] font-mono text-[#212529]"
                            />
                          </div>

                          {/* Transportation Cost */}
                          <div>
                            <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                              Transportation Cost (₹) <span className="text-rose-600">*</span>
                            </label>
                            <input
                              type="number"
                              step="50"
                              required
                              value={resp.transportCost !== undefined ? resp.transportCost : '1500'}
                              onChange={(e) => handleUpdateResponse(item.itemId, 'transportCost', e.target.value)}
                              className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] font-mono text-[#212529]"
                            />
                          </div>

                          {/* Delivery Date */}
                          <div>
                            <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                              Expected Delivery Date <span className="text-rose-600">*</span>
                            </label>
                            <input
                              type="date"
                              required
                              value={resp.deliveryDate}
                              onChange={(e) => handleUpdateResponse(item.itemId, 'deliveryDate', e.target.value)}
                              className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] font-mono text-[#212529]"
                            />
                          </div>
                        </div>

                        {/* Live Delivered Cost Breakdown Card */}
                        <div className="bg-[#ffffff] rounded-[16px] p-4 border border-[#c3cda7]/60 grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
                          <div>
                            <span className="text-[10px] text-[#6d6d6d] uppercase block">Produce Rate</span>
                            <strong className="text-sm text-[#00372a]">₹{curRate.toFixed(2)}/kg</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#6d6d6d] uppercase block">Produce Value</span>
                            <strong className="text-sm text-[#00372a]">₹{curProduceVal.toLocaleString('en-IN')}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#6d6d6d] uppercase block">Transportation (FPO)</span>
                            <strong className="text-sm text-[#683600]">₹{curTransport.toLocaleString('en-IN')}</strong>
                          </div>
                          <div className="bg-[#e6ecd5] p-2 rounded-[10px]">
                            <span className="text-[10px] text-[#1b6e53] uppercase font-bold block">Delivered Total</span>
                            <strong className="text-base text-[#1b6e53]">₹{curDeliveredTotal.toLocaleString('en-IN')}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#6d6d6d] uppercase block">Effective Price</span>
                            <strong className="text-sm text-[#1b6e53]">₹{curEffectiveRate}/kg</strong>
                          </div>
                        </div>

                        {/* Notes */}
                        <div>
                          <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                            Dispatch Notes &amp; Cluster Packaging Confirmation
                          </label>
                          <input
                            type="text"
                            value={resp.notes}
                            onChange={(e) => handleUpdateResponse(item.itemId, 'notes', e.target.value)}
                            placeholder="e.g. Full Grade A volume allocated. Packed in 20kg crates."
                            className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
                          />
                        </div>
                      </div>
                      )
                    })()}

                    {isBackOffer && (() => {
                      const curQty = Number(resp.availableQty || 800)
                      const curRate = parseFloat(String(resp.producePrice || resp.offeredPrice || 29).replace(/[^0-9.]/g, '')) || 29
                      const curTransport = parseFloat(String(resp.transportCost !== undefined && resp.transportCost !== '' ? resp.transportCost : 1500).replace(/[^0-9.]/g, '')) || 1500
                      const curProduceVal = Math.round(curQty * curRate)
                      const curDeliveredTotal = curProduceVal + curTransport
                      const curEffectiveRate = curQty > 0 ? (curDeliveredTotal / curQty).toFixed(2) : curRate.toFixed(2)

                      return (
                      <div className="bg-[#fceace]/50 rounded-[20px] p-5 border border-[#683600]/40 space-y-4 animate-in fade-in">
                        <div className="flex items-center justify-between border-b border-[#c3cda7]/50 pb-2">
                          <span className="text-xs font-mono font-bold text-[#683600] uppercase flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">change_circle</span>
                            Commercial Back Offer Specification for {item.crop}
                          </span>
                          <span className="text-[10px] font-mono font-bold bg-[#fceace] text-[#683600] px-2 py-0.5 rounded-[100px] border border-[#c3cda7]">
                            Back Offer (Requires Buyer Acceptance)
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                          {/* Available Qty */}
                          <div>
                            <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                              Offered Qty (kg) <span className="text-rose-600">*</span>
                            </label>
                            <input
                              type="number"
                              required
                              value={resp.availableQty}
                              onChange={(e) => handleUpdateResponse(item.itemId, 'availableQty', e.target.value)}
                              placeholder="e.g. 400"
                              className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#683600] font-mono text-[#212529]"
                            />
                          </div>

                          {/* Produce Rate */}
                          <div>
                            <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                              Produce Rate (₹ / kg) <span className="text-rose-600">*</span>
                            </label>
                            <input
                              type="number"
                              step="0.5"
                              required
                              value={resp.producePrice !== undefined ? resp.producePrice : resp.offeredPrice}
                              onChange={(e) => {
                                handleUpdateResponse(item.itemId, 'producePrice', e.target.value)
                                handleUpdateResponse(item.itemId, 'offeredPrice', e.target.value)
                              }}
                              placeholder="e.g. 29"
                              className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#683600] font-mono text-[#212529]"
                            />
                          </div>

                          {/* Transportation Cost */}
                          <div>
                            <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                              Transportation (₹) <span className="text-rose-600">*</span>
                            </label>
                            <input
                              type="number"
                              step="50"
                              required
                              value={resp.transportCost !== undefined ? resp.transportCost : '1500'}
                              onChange={(e) => handleUpdateResponse(item.itemId, 'transportCost', e.target.value)}
                              className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#683600] font-mono text-[#212529]"
                            />
                          </div>

                          {/* Offered Grade */}
                          <div>
                            <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                              Offered Grade <span className="text-rose-600">*</span>
                            </label>
                            <select
                              value={resp.offeredGrade || 'Grade A'}
                              onChange={(e) => handleUpdateResponse(item.itemId, 'offeredGrade', e.target.value)}
                              className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#683600] text-[#212529]"
                            >
                              <option value="Grade A">Grade A (Premium)</option>
                              <option value="Grade B">Grade B (Standard Commercial)</option>
                              <option value="Export Grade">Export Grade</option>
                              <option value="Processing Grade">Processing Grade</option>
                            </select>
                          </div>

                          {/* Delivery Date */}
                          <div>
                            <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                              Delivery Date <span className="text-rose-600">*</span>
                            </label>
                            <input
                              type="date"
                              required
                              value={resp.deliveryDate}
                              onChange={(e) => handleUpdateResponse(item.itemId, 'deliveryDate', e.target.value)}
                              className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#683600] font-mono text-[#212529]"
                            />
                          </div>
                        </div>

                        {/* Live Delivered Cost Breakdown Card */}
                        <div className="bg-[#ffffff] rounded-[16px] p-4 border border-[#c3cda7]/60 grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
                          <div>
                            <span className="text-[10px] text-[#6d6d6d] uppercase block">Produce Rate</span>
                            <strong className="text-sm text-[#683600]">₹{curRate.toFixed(2)}/kg</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#6d6d6d] uppercase block">Produce Value</span>
                            <strong className="text-sm text-[#00372a]">₹{curProduceVal.toLocaleString('en-IN')}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#6d6d6d] uppercase block">Transportation (FPO)</span>
                            <strong className="text-sm text-[#683600]">₹{curTransport.toLocaleString('en-IN')}</strong>
                          </div>
                          <div className="bg-[#fceace] p-2 rounded-[10px]">
                            <span className="text-[10px] text-[#683600] uppercase font-bold block">Delivered Total</span>
                            <strong className="text-base text-[#683600]">₹{curDeliveredTotal.toLocaleString('en-IN')}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#6d6d6d] uppercase block">Effective Price</span>
                            <strong className="text-sm text-[#683600]">₹{curEffectiveRate}/kg</strong>
                          </div>
                        </div>

                        {/* Counter Rationale */}
                        <div>
                          <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                            Commercial Rationale / Staging Explanation <span className="text-rose-600">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={resp.notes}
                            onChange={(e) => handleUpdateResponse(item.itemId, 'notes', e.target.value)}
                            placeholder="e.g. Proposing 400 kg at ₹25/kg due to peak cold storage staging. Delivery shifted by +1 day."
                            className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#683600] text-[#212529]"
                          />
                        </div>
                      </div>
                      )
                    })()}

                    {isDecline && (
                      <div className="bg-rose-50/60 rounded-[20px] p-5 border border-rose-200 space-y-4 animate-in fade-in">
                        <div className="flex items-center justify-between border-b border-rose-200 pb-2">
                          <span className="text-xs font-mono font-bold text-rose-700 uppercase flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">do_not_disturb_on</span>
                            Decline Specification for {item.crop}
                          </span>
                          <span className="text-[10px] font-mono text-rose-600">
                            Will be marked as unavailable to buyer
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Reason */}
                          <div>
                            <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                              Decline Reason <span className="text-rose-600">*</span>
                            </label>
                            <select
                              value={resp.declineReason || 'Insufficient quantity'}
                              onChange={(e) => handleUpdateResponse(item.itemId, 'declineReason', e.target.value)}
                              className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-rose-200 rounded-[100px] focus:outline-none focus:ring-1 focus:ring-rose-500 text-rose-800"
                            >
                              <option value="Insufficient quantity">Insufficient quantity</option>
                              <option value="Grade unavailable">Grade unavailable / Quality mismatch</option>
                              <option value="Delivery unavailable">Delivery timeline / logistics unavailable</option>
                              <option value="Price not feasible">Price not feasible</option>
                              <option value="Insufficient Grade A supply">Insufficient Grade A supply</option>
                              <option value="Other">Other logistical constraint</option>
                            </select>
                          </div>

                          {/* Notes */}
                          <div>
                            <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                              Optional Reason Details
                            </label>
                            <input
                              type="text"
                              value={resp.notes}
                              onChange={(e) => handleUpdateResponse(item.itemId, 'notes', e.target.value)}
                              placeholder="e.g. Current harvest intake committed to prior long-term orders."
                              className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-rose-200 rounded-[100px] focus:outline-none focus:ring-1 focus:ring-rose-500 text-[#212529]"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* 4. Live Summary & Submission Card */}
        <section className="bg-[#f1efdf] rounded-[24px] p-6 lg:p-7 border border-[#c3cda7] space-y-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]/50 flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#1b6e53] text-[22px]">assignment_turned_in</span>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                Procurement Response Summary
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#ffffff] px-3 py-1 rounded-[100px] border border-[#c3cda7]">
              {items.length} Items Configured
            </span>
          </div>

          {/* Item-by-Item Status Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
            {items.map((item, idx) => {
              const isItemConfirmed = Boolean(
                item.isConfirmed ||
                item.confirmedOfferId ||
                item.status === 'ORDER CONFIRMED' ||
                item.status === 'Confirmed'
              )

              if (isItemConfirmed) {
                return (
                  <div
                    key={item.itemId || idx}
                    className="p-4 rounded-[18px] border bg-rose-50/70 border-rose-200 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#00372a] font-editorial text-lg">
                        {item.crop}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-[100px] bg-rose-700 text-[#ffffff]">
                        ORDER CONFIRMED
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-rose-700 space-y-0.5">
                      <div>Volume: <strong>{item.quantity}</strong></div>
                      <div>Grade: <strong>{item.grade}</strong></div>
                      <div>Status: <strong>ORDER CONFIRMED</strong></div>
                    </div>
                  </div>
                )
              }

              const resp = itemResponses[item.itemId] || { type: 'ACCEPT' }
              const isAccept = resp.type === 'ACCEPT'
              const isBackOffer = resp.type === 'BACK_OFFER'
              const isDecline = resp.type === 'DECLINE'

              return (
                <div
                  key={item.itemId || idx}
                  className={`p-4 rounded-[18px] border space-y-1.5 ${isAccept
                      ? 'bg-[#e6ecd5]/70 border-[#1b6e53]/50'
                      : isBackOffer
                        ? 'bg-[#fceace]/70 border-[#683600]/40'
                        : 'bg-rose-50/70 border-rose-200'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#00372a] font-editorial text-lg">
                      {item.crop}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-[100px] ${isAccept
                          ? 'bg-[#1b6e53] text-[#ffffff]'
                          : isBackOffer
                            ? 'bg-[#683600] text-[#ffffff]'
                            : 'bg-rose-700 text-[#ffffff]'
                        }`}
                    >
                      {isAccept ? 'ACCEPTED' : isBackOffer ? 'BACK OFFER' : 'DECLINED'}
                    </span>
                  </div>

                  {isAccept && (
                    <div className="text-[11px] font-mono text-[#1b6e53] space-y-0.5">
                      <div>Volume: <strong>{resp.availableQty || item.quantity} kg</strong></div>
                      <div>Rate: <strong>₹{resp.offeredPrice}/kg</strong></div>
                      <div>Delivery: {resp.deliveryDate}</div>
                    </div>
                  )}

                  {isBackOffer && (
                    <div className="text-[11px] font-mono text-[#683600] space-y-0.5">
                      <div>Counter Vol: <strong>{resp.availableQty} kg</strong></div>
                      <div>Counter Rate: <strong>₹{resp.offeredPrice}/kg</strong></div>
                      <div>Delivery: {resp.deliveryDate}</div>
                    </div>
                  )}

                  {isDecline && (
                    <div className="text-[11px] font-mono text-rose-700 space-y-0.5">
                      <div>Reason: <strong>{resp.declineReason || 'Supply unavailable'}</strong></div>
                      <div>Status: Non-fulfilling</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Submit Action Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#c3cda7]/50">
            <p className="text-xs text-[#6d6d6d] font-sans">
              Submitting registers your commercial terms on the buyer ledger. This is a binding FPO proposal.
            </p>

            {items.every((it) => it.isConfirmed || it.confirmedOfferId || it.status === 'ORDER CONFIRMED') ? (
              <button
                type="button"
                disabled
                className="w-full sm:w-auto py-3.5 px-8 rounded-[100px] bg-rose-700/60 cursor-not-allowed text-[#ffffff] text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span>All Items Confirmed (Closed)</span>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full sm:w-auto py-3.5 px-8 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-[0.99]"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Submit Response ({items.filter((it) => !it.isConfirmed && !it.confirmedOfferId && it.status !== 'ORDER CONFIRMED').length} Pending Items) →</span>
              </button>
            )}
          </div>
        </section>
      </form>
    </div>
  )
}
