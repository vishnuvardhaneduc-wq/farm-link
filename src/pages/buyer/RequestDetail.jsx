import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { getDemandById, updateItemOfferSelection, confirmProcurementOrder } from '../../data/buyerData'

export default function RequestDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [demand, setDemand] = useState(() => getDemandById(id))

  useEffect(() => {
    const current = getDemandById(id)
    setDemand(current)
  }, [id])

  const [activeOfferModal, setActiveOfferModal] = useState(null)
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  // Track item-level offer selection
  const [selectedOfferPerItem, setSelectedOfferPerItem] = useState({})

  useEffect(() => {
    if (demand?.items) {
      const initialMap = {}
      demand.items.forEach((item) => {
        if (item.confirmedOfferId) {
          initialMap[item.itemId] = item.confirmedOfferId
        } else if (item.selectedFpoOfferId) {
          initialMap[item.itemId] = item.selectedFpoOfferId
        } else {
          // Preselect first accepted offer if present for convenient demo
          const accepted = (item.responses || []).find(
            (r) => r.status === 'ACCEPTED' || r.status === 'ORDER_CONFIRMED'
          )
          if (accepted) {
            initialMap[item.itemId] = accepted.id
          }
        }
      })
      setSelectedOfferPerItem(initialMap)
    }
  }, [demand])

  const handleToggleSelectOffer = (itemId, offerId) => {
    // Prevent changing selection if item is already confirmed
    const item = (demand?.items || []).find((i) => i.itemId === itemId)
    if (item?.isConfirmed) return

    setSelectedOfferPerItem((prev) => ({
      ...prev,
      [itemId]: prev[itemId] === offerId ? null : offerId
    }))
    updateItemOfferSelection(demand.id, itemId, offerId)
  }

  const items = demand?.items || [
    {
      itemId: 'item-1',
      crop: demand?.crop || 'Tomato',
      variety: demand?.variety || 'Hybrid Roma',
      quantity: demand?.quantity || '1,000 kg',
      grade: demand?.grade || 'Grade A',
      targetPrice: demand?.targetPrice || '₹28 / kg',
      qualitySpecs: demand?.qualitySpecs,
      packaging: demand?.packaging,
      responses: demand?.responses || []
    }
  ]

  const totalItemsCount = items.length
  const confirmedItemsCount = items.filter((it) => it.isConfirmed).length
  const pendingSelectedCount = items.filter(
    (it) => !it.isConfirmed && selectedOfferPerItem[it.itemId]
  ).length
  const selectedItemsCount = Object.values(selectedOfferPerItem).filter(Boolean).length

  const handleConfirmOrder = () => {
    setActiveOfferModal(null)
    const updated = confirmProcurementOrder(demand.id, selectedOfferPerItem)
    if (updated) {
      setDemand(updated)
    }
    setOrderConfirmed(true)
  }

  const [compareModalItem, setCompareModalItem] = useState(null)

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Link to="/buyer/demands" className="text-[10px] font-mono text-[#1b6e53] font-bold hover:underline">
              ← BACK TO MY DEMANDS
            </Link>
            <span className="text-[#c3cda7]">/</span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              MULTI-ITEM TENDER // {demand.id}
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Procurement Request <span className="italic font-normal font-mono text-2xl sm:text-3xl">({demand.id})</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Review independent FPO responses per item, evaluate commercial back-offers, and allocate order contracts with true delivered cost breakdown.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/buyer/demands/new"
            className="py-2.5 px-5 rounded-[100px] bg-[#ffffff] hover:bg-[#f1efdf] text-[#212529] border border-[#c3cda7] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
          >
            <span>+ New Tender</span>
          </Link>
        </div>
      </div>

      {/* Confirmation Toast */}
      {orderConfirmed && (
        <div className="p-4 bg-[#e8fe85] border border-[#1b6e53] text-[#1b6e53] text-xs font-bold rounded-[20px] flex items-center justify-between shadow-md animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">verified</span>
            <span>Multi-item order executed across selected FPOs! Transport costs & settlement records initialized.</span>
          </div>
        </div>
      )}

      {/* 2. Top Request Summary Card */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-8 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-5 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-[20px] bg-[#e6ecd5] border border-[#c3cda7] text-[#1b6e53] text-2xl flex items-center justify-center shrink-0 font-bold">
              📋
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-mono font-bold text-sm text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">
                  {demand.id}
                </span>
                <h2 className="font-editorial text-3xl font-bold text-[#00372a]">
                  Multi-Item Procurement Tender
                </h2>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-[100px] bg-[#b2cee7] text-[#00372a]">
                  {items.length} {items.length === 1 ? 'Commodity Item' : 'Commodity Items'}
                </span>
              </div>
              <p className="text-xs text-[#6d6d6d] font-mono mt-1">
                Published: {demand.createdDate} • Destination: <strong className="text-[#212529]">{demand.deliveryLocation}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="bg-[#f1efdf] rounded-[16px] px-4 py-2 border border-[#c3cda7]/60 text-right">
              <span className="block text-[10px] font-mono uppercase text-[#6d6d6d]">Overall Status</span>
              <span className="text-xs font-mono font-bold text-[#1b6e53]">{demand.status}</span>
            </div>
            <div className="bg-[#fceace] rounded-[16px] px-4 py-2 border border-[#c3cda7]/60 text-right">
              <span className="block text-[10px] font-mono uppercase text-[#683600]">Delivery Date</span>
              <span className="text-sm font-mono font-bold text-[#683600]">{demand.deliveryDate}</span>
            </div>
          </div>
        </div>

        {/* Commodity Chips Row */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#6d6d6d] mr-1">
            Items Included:
          </span>
          {items.map((item, idx) => (
            <span
              key={item.itemId || idx}
              className="px-3 py-1 rounded-[100px] bg-[#f1efdf] text-[#00372a] font-mono font-semibold border border-[#c3cda7]"
            >
              0{idx + 1}. {item.crop} ({item.quantity} • {item.grade})
            </span>
          ))}
        </div>

        {demand.notes && (
          <div className="p-3 bg-[#f1efdf]/40 rounded-[16px] border border-[#c3cda7]/40 text-xs text-[#353535] font-sans">
            <span className="font-mono font-bold uppercase text-[10px] text-[#6d6d6d] block mb-0.5">Tender Notes:</span>
            {demand.notes}
          </div>
        )}
      </section>

      {/* 3. MULTI-ITEM FPO RESPONSES BREAKDOWN */}
      <section className="space-y-8">
        <div className="flex items-center justify-between pb-2 border-b border-[#c3cda7]/50 flex-wrap gap-2">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold">
              ITEM-BY-ITEM SUPPLIER RESPONSES
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
              Independent FPO Proposals & Delivered Cost Breakdown
            </h2>
          </div>
          <span className="text-xs font-mono text-[#6d6d6d]">
            Select the best FPO offer for each individual item below based on true delivered cost
          </span>
        </div>

        {/* Item-by-Item Breakdown */}
        {items.map((item, idx) => {
          const selectedOfferId = selectedOfferPerItem[item.itemId]
          const validResponses = (item.responses || []).filter(
            (r) => r.status === 'ACCEPTED' || r.status === 'BACK_OFFER' || r.status === 'ORDER_CONFIRMED'
          )

          return (
            <div
              key={item.itemId || idx}
              className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-5"
            >
              {/* Item Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#c3cda7]/50">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#1b6e53] text-[#ffffff] font-mono font-bold text-xs flex items-center justify-center">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                      Item 0{idx + 1}: {item.crop} <span className="text-lg font-normal text-[#6d6d6d]">({item.variety || 'Standard'})</span>
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-[#6d6d6d] font-mono mt-0.5">
                      <span>Volume: <strong className="text-[#1b6e53] font-bold">{item.quantity}</strong></span>
                      <span>•</span>
                      <span>Grade: <strong className="text-[#212529]">{item.grade}</strong></span>
                      <span>•</span>
                      <span>Target: <strong className="text-[#683600] font-bold">{item.targetPrice}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {validResponses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setCompareModalItem(item)}
                      className="px-3 py-1 rounded-[100px] text-xs font-mono font-bold uppercase bg-[#f1efdf] text-[#1b6e53] hover:bg-[#e6ecd5] border border-[#c3cda7] flex items-center gap-1 transition cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">compare_arrows</span>
                      <span>Compare Offers</span>
                    </button>
                  )}
                  {Boolean(item.isConfirmed || item.confirmedOfferId || item.status === 'ORDER CONFIRMED') ? (
                    <span className="px-3.5 py-1 rounded-[100px] text-xs font-mono font-bold tracking-wider uppercase bg-rose-50 text-rose-700 border border-rose-300 flex items-center gap-1.5 shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                      <span>ORDER CONFIRMED</span>
                    </span>
                  ) : (
                    <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7]">
                      {(item.responses || []).length} FPO Responses
                    </span>
                  )}
                </div>
              </div>

              {/* FPO Responses for this item */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(item.responses || []).map((resp) => {
                  const isItemConfirmed = Boolean(
                    item.isConfirmed ||
                    item.confirmedOfferId ||
                    item.status === 'ORDER CONFIRMED' ||
                    item.status === 'Confirmed'
                  )
                  const confirmedOfferId = item.confirmedOfferId || (item.isConfirmed ? item.selectedFpoOfferId : null)
                  const isOrderConfirmed = isItemConfirmed
                    ? (confirmedOfferId ? resp.id === confirmedOfferId : Boolean(resp.isAwarded || resp.status === 'ORDER_CONFIRMED'))
                    : false
                  const isUnavailable = isItemConfirmed
                    ? !isOrderConfirmed
                    : (resp.status === 'UNAVAILABLE' || resp.statusLabel === 'UNAVAILABLE' || resp.statusLabel === 'Unavailable')

                  const isAccepted = resp.status === 'ACCEPTED'
                  const isBackOffer = resp.status === 'BACK_OFFER'
                  const isDeclined = resp.status === 'DECLINED' || resp.status === 'Declined'
                  const isNoResponse = resp.status === 'NO_RESPONSE' || resp.status === 'Pending'
                  const isThisOfferSelected = selectedOfferId === resp.id || isOrderConfirmed

                  // Financial calculations
                  const produceVal = resp.produceValue != null ? resp.produceValue : (resp.producePrice ? (parseFloat(String(resp.offeredQty || item.quantity).replace(/[^0-9.]/g, '')) || 0) * resp.producePrice : null)
                  const transCost = resp.transportCost != null ? resp.transportCost : 0
                  const delTotal = resp.deliveredTotal != null ? resp.deliveredTotal : (produceVal != null ? produceVal + transCost : null)
                  const effPrice = resp.effectivePrice != null ? resp.effectivePrice : (delTotal && (parseFloat(String(resp.offeredQty || item.quantity).replace(/[^0-9.]/g, '')) || 1) ? (delTotal / (parseFloat(String(resp.offeredQty || item.quantity).replace(/[^0-9.]/g, '')) || 1)).toFixed(2) : null)

                  return (
                    <div
                      key={resp.id}
                      className={`rounded-[20px] p-5 border shadow-xs flex flex-col justify-between space-y-4 transition ${
                        isOrderConfirmed
                          ? 'bg-rose-50/60 border-rose-300 ring-2 ring-rose-500'
                          : isUnavailable
                          ? 'bg-[#f1efdf]/60 border-[#c3cda7] opacity-85'
                          : isThisOfferSelected
                          ? 'bg-[#e6ecd5]/80 border-[#1b6e53] ring-2 ring-[#1b6e53]'
                          : isAccepted
                          ? 'bg-[#ffffff] border-[#c3cda7] hover:border-[#1b6e53]'
                          : isBackOffer
                          ? 'bg-[#ffffff] border-[#c3cda7]'
                          : isDeclined
                          ? 'bg-rose-50/40 border-rose-200'
                          : 'bg-[#f1efdf]/70 border-[#c3cda7]'
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Header & Status */}
                        <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[#c3cda7]/40">
                          <div>
                            <h4 className="font-editorial text-xl font-bold text-[#00372a] leading-snug">
                              {resp.fpoName}
                            </h4>
                            <p className="text-[10px] text-[#6d6d6d] font-mono mt-0.5">
                              📍 {resp.location} {resp.hub ? `• Hub: ${resp.hub}` : ''}
                            </p>
                          </div>

                          <span
                            className={`px-2.5 py-0.5 rounded-[100px] text-[10px] font-mono font-bold tracking-wider uppercase shrink-0 ${
                              isOrderConfirmed
                                ? 'bg-rose-100 text-rose-800 border border-rose-300 font-bold'
                                : isUnavailable
                                ? 'bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7]'
                                : isAccepted
                                ? 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]'
                                : isBackOffer
                                ? 'bg-[#fceace] text-[#683600] border border-[#c3cda7]'
                                : isDeclined
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : 'bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7]'
                            }`}
                          >
                            {isOrderConfirmed
                              ? 'ORDER CONFIRMED'
                              : isUnavailable
                              ? 'UNAVAILABLE'
                              : resp.statusLabel || (isDeclined ? 'DECLINED' : resp.status)}
                          </span>
                        </div>

                        {/* Specs */}
                        {isUnavailable && (
                          <div className="space-y-2 text-xs font-sans">
                            <div className="p-2.5 bg-[#f1efdf] rounded-[14px] border border-[#c3cda7]/60 text-[11px] font-sans text-[#6d6d6d] flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[16px] text-[#6d6d6d]">info</span>
                              <span>Another FPO was selected for this item.</span>
                            </div>

                            {/* Original response specifications remain visible */}
                            {(resp.offeredPrice || resp.counterPrice) && (
                              <div className="bg-[#ffffff]/80 rounded-[14px] p-3 space-y-1 border border-[#c3cda7]/50 text-xs">
                                <div className="flex justify-between">
                                  <span className="text-[#6d6d6d]">Quoted Rate:</span>
                                  <span className="font-bold text-[#6d6d6d] font-mono text-sm">
                                    {resp.offeredPrice || resp.counterPrice}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[#6d6d6d]">Proposed Volume:</span>
                                  <span className="font-mono text-[#6d6d6d]">{resp.offeredQty || item.quantity}</span>
                                </div>
                                {resp.deliveryDate && (
                                  <div className="flex justify-between">
                                    <span className="text-[#6d6d6d]">Delivery Date:</span>
                                    <span className="font-mono text-[#6d6d6d]">{resp.deliveryDate}</span>
                                  </div>
                                )}
                              </div>
                            )}

                            {resp.notes && (
                              <p className="text-[11px] text-[#6d6d6d] italic leading-tight">
                                "{resp.notes}"
                              </p>
                            )}
                          </div>
                        )}

                        {!isUnavailable && (isAccepted || isOrderConfirmed) && (
                          <div className="space-y-2.5 text-xs font-sans">
                            <div className="bg-[#e6ecd5]/50 rounded-[14px] p-3 space-y-1.5 border border-[#c3cda7]/50">
                              <div className="flex justify-between">
                                <span className="text-[#6d6d6d]">Produce Rate:</span>
                                <span className="font-extrabold text-[#1b6e53] font-mono text-base">{resp.offeredPrice}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#6d6d6d]">Committed Volume:</span>
                                <span className="font-bold text-[#1b6e53] font-mono">{resp.offeredQty}</span>
                              </div>
                              {produceVal != null && (
                                <div className="flex justify-between pt-1 border-t border-[#c3cda7]/40 text-[11px]">
                                  <span className="text-[#6d6d6d]">Produce Value:</span>
                                  <span className="font-mono font-semibold text-[#00372a]">₹{produceVal.toLocaleString('en-IN')}</span>
                                </div>
                              )}
                              <div className="flex justify-between text-[11px]">
                                <span className="text-[#6d6d6d]">Transportation:</span>
                                <span className="font-mono font-semibold text-[#1b6e53]">+ ₹{transCost.toLocaleString('en-IN')}</span>
                              </div>
                              {delTotal != null && (
                                <div className="flex justify-between pt-1 border-t border-[#c3cda7]/60 font-bold">
                                  <span className="text-[#00372a]">Total Delivered:</span>
                                  <span className="font-mono text-sm text-[#1b6e53]">₹{delTotal.toLocaleString('en-IN')}</span>
                                </div>
                              )}
                              {effPrice && (
                                <div className="flex justify-between text-[10px] font-mono text-[#6d6d6d]">
                                  <span>Effective Rate:</span>
                                  <span>₹{effPrice} / kg</span>
                                </div>
                              )}
                              <div className="flex justify-between pt-1 border-t border-[#c3cda7]/30 text-[11px]">
                                <span className="text-[#6d6d6d]">Arrival Date:</span>
                                <span className="font-mono text-[#212529]">{resp.deliveryDate}</span>
                              </div>
                            </div>
                            {resp.notes && (
                              <p className="text-[11px] text-[#353535] italic leading-tight">
                                "{resp.notes}"
                              </p>
                            )}
                          </div>
                        )}

                        {!isUnavailable && isBackOffer && (
                          <div className="space-y-2.5 text-xs font-sans">
                            <div className="bg-[#fceace]/60 rounded-[14px] p-3 space-y-1.5 border border-[#c3cda7]/50">
                              <div className="flex justify-between">
                                <span className="text-[#683600] font-bold">Counter Rate:</span>
                                <span className="font-extrabold text-[#683600] font-mono text-base">{resp.counterPrice}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#6d6d6d]">Offered Volume:</span>
                                <span className="font-bold text-[#212529] font-mono">{resp.offeredQty}</span>
                              </div>
                              {produceVal != null && (
                                <div className="flex justify-between pt-1 border-t border-[#c3cda7]/40 text-[11px]">
                                  <span className="text-[#6d6d6d]">Produce Value:</span>
                                  <span className="font-mono font-semibold text-[#683600]">₹{produceVal.toLocaleString('en-IN')}</span>
                                </div>
                              )}
                              <div className="flex justify-between text-[11px]">
                                <span className="text-[#6d6d6d]">Transportation:</span>
                                <span className="font-mono font-semibold text-[#683600]">+ ₹{transCost.toLocaleString('en-IN')}</span>
                              </div>
                              {delTotal != null && (
                                <div className="flex justify-between pt-1 border-t border-[#c3cda7]/60 font-bold">
                                  <span className="text-[#683600]">Total Delivered:</span>
                                  <span className="font-mono text-sm text-[#683600]">₹{delTotal.toLocaleString('en-IN')}</span>
                                </div>
                              )}
                              {effPrice && (
                                <div className="flex justify-between text-[10px] font-mono text-[#6d6d6d]">
                                  <span>Effective Rate:</span>
                                  <span>₹{effPrice} / kg</span>
                                </div>
                              )}
                              <div className="flex justify-between pt-1 border-t border-[#c3cda7]/30 text-[11px]">
                                <span className="text-[#6d6d6d]">Proposed Date:</span>
                                <span className="font-mono font-bold text-[#212529]">{resp.deliveryDate}</span>
                              </div>
                            </div>
                            {resp.notes && (
                              <p className="text-[11px] text-[#683600]">
                                {resp.notes}
                              </p>
                            )}
                          </div>
                        )}

                        {!isUnavailable && isDeclined && (
                          <div className="space-y-2 text-xs font-sans">
                            <div className="bg-rose-50 rounded-[14px] p-3 space-y-1 border border-rose-200">
                              <div className="flex justify-between">
                                <span className="text-rose-700 font-semibold">Reason:</span>
                                <span className="font-bold text-rose-900 font-mono">{resp.declineReason || 'Insufficient supply'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-rose-700">Fulfillment:</span>
                                <span className="font-mono text-rose-800">Non-fulfilling</span>
                              </div>
                            </div>
                            <p className="text-[11px] text-rose-700 italic">
                              "{resp.notes || 'FPO cannot fulfill this commodity requirement.'}"
                            </p>
                          </div>
                        )}

                        {!isUnavailable && isNoResponse && (
                          <div className="space-y-2 py-3 text-xs font-sans text-center">
                            <span className="material-symbols-outlined text-[20px] text-[#6d6d6d]">hourglass_empty</span>
                            <p className="font-semibold text-[#212529] text-[11px]">Awaiting FPO Response</p>
                            <p className="text-[10px] text-[#6d6d6d]">Dispatched to hub intake bay</p>
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="pt-2.5 border-t border-[#c3cda7]/40 flex gap-2">
                        {isOrderConfirmed ? (
                          <div className="w-full py-2 rounded-[100px] bg-rose-700 text-[#ffffff] text-xs font-bold text-center flex items-center justify-center gap-1 shadow-xs">
                            <span className="material-symbols-outlined text-[16px]">verified</span>
                            <span>ORDER CONFIRMED</span>
                          </div>
                        ) : isUnavailable ? (
                          <button
                            disabled
                            className="w-full py-2 rounded-[100px] bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7] text-xs font-mono font-bold cursor-not-allowed text-center opacity-80"
                          >
                            Unavailable
                          </button>
                        ) : (isAccepted || isBackOffer) ? (
                          <>
                            <button
                              type="button"
                              onClick={() => setActiveOfferModal({ ...resp, itemCrop: item.crop, itemGrade: item.grade, itemId: item.itemId, isItemConfirmed, produceVal, transCost, delTotal, effPrice })}
                              className="flex-1 py-2 rounded-[100px] border border-[#c3cda7] text-xs font-semibold text-[#353535] bg-[#ffffff] hover:bg-[#f1efdf] transition cursor-pointer text-center"
                            >
                              Review
                            </button>

                            <button
                              type="button"
                              disabled={isItemConfirmed}
                              onClick={() => handleToggleSelectOffer(item.itemId, resp.id)}
                              className={`flex-1 py-2 rounded-[100px] text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                                isThisOfferSelected
                                  ? 'bg-[#1b6e53] text-[#ffffff] shadow-xs'
                                  : 'bg-[#e6ecd5] text-[#1b6e53] hover:bg-[#d8ee6f] border border-[#c3cda7]'
                              }`}
                            >
                              {isThisOfferSelected ? (
                                <>
                                  <span>✓ Selected</span>
                                </>
                              ) : (
                                <span>Select Offer</span>
                              )}
                            </button>
                          </>
                        ) : isDeclined ? (
                          <button
                            disabled
                            className="w-full py-2 rounded-[100px] bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-mono cursor-not-allowed opacity-80"
                          >
                            Declined by FPO
                          </button>
                        ) : (
                          <button
                            disabled
                            className="w-full py-2 rounded-[100px] bg-[#ffffff] text-[#6d6d6d] border border-[#c3cda7] text-[11px] font-mono opacity-80 cursor-not-allowed"
                          >
                            Waiting for response...
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>

      {/* 4. Global Multi-FPO Order Execution Bar & Order Summary */}
      <section className="bg-[#ffffff] border-2 border-[#1b6e53] rounded-[24px] p-6 lg:p-7 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className={`w-3 h-3 rounded-full ${confirmedItemsCount > 0 ? 'bg-rose-600 animate-pulse' : 'bg-[#1b6e53] animate-ping'}`}></span>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                {confirmedItemsCount === totalItemsCount
                  ? 'Confirmed Procurement Allocation'
                  : 'Award Multi-FPO Procurement Order'}
              </h3>
            </div>
            <p className="text-xs text-[#6d6d6d] font-sans">
              <strong className={`${confirmedItemsCount > 0 ? 'text-rose-700' : 'text-[#1b6e53]'} font-bold font-mono text-sm`}>
                {confirmedItemsCount > 0
                  ? `${confirmedItemsCount} of ${totalItemsCount} items confirmed`
                  : `${selectedItemsCount} of ${totalItemsCount} items selected`}
              </strong>
              . Each commodity is contracted directly to its designated FPO partner with transport & settlement logic recorded.
            </p>
          </div>

          <button
            type="button"
            disabled={pendingSelectedCount === 0 && confirmedItemsCount > 0}
            onClick={handleConfirmOrder}
            className={`w-full sm:w-auto py-3.5 px-8 rounded-[100px] ${
              confirmedItemsCount === totalItemsCount
                ? 'bg-rose-700 text-[#ffffff]'
                : 'bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff]'
            } disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-[0.99]`}
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>
              {confirmedItemsCount === totalItemsCount
                ? 'Order Confirmed ✓'
                : pendingSelectedCount > 0
                ? `Confirm Order (${pendingSelectedCount} Items Selected) →`
                : 'Confirm Order →'}
            </span>
          </button>
        </div>

        {/* Confirmed Order Summary */}
        {confirmedItemsCount > 0 && (
          <div className="pt-4 border-t border-[#c3cda7]/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-mono uppercase tracking-widest text-rose-700 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                <span>ORDER SUMMARY // CONFIRMED SUPPLIERS & DELIVERED FINANCIALS</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-[100px] text-[10px] font-mono font-bold uppercase bg-rose-50 text-rose-700 border border-rose-300">
                ORDER CONFIRMED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {items
                .filter((item) => item.isConfirmed || item.confirmedOfferId || item.status === 'ORDER CONFIRMED')
                .map((item, idx) => {
                  const confirmedOfferId = item.confirmedOfferId || item.selectedFpoOfferId
                  const confirmedResp = (item.responses || []).find((r) => r.id === confirmedOfferId || r.isAwarded)
                  const supplierName = confirmedResp?.fpoName || item.confirmedFpoName || 'Selected FPO'
                  const price = confirmedResp?.offeredPrice || confirmedResp?.counterPrice || item.targetPrice
                  const qty = confirmedResp?.offeredQty || item.quantity
                  const produceVal = confirmedResp?.produceValue != null ? confirmedResp.produceValue : (parseFloat(String(qty).replace(/[^0-9.]/g, '')) || 0) * (confirmedResp?.producePrice || 27)
                  const transCost = confirmedResp?.transportCost != null ? confirmedResp.transportCost : 1500
                  const delTotal = confirmedResp?.deliveredTotal != null ? confirmedResp.deliveredTotal : produceVal + transCost

                  return (
                    <div key={item.itemId || idx} className="p-4 bg-rose-50/40 rounded-[16px] border border-rose-200 text-xs font-sans space-y-2">
                      <div className="flex items-center justify-between pb-1.5 border-b border-rose-200/60">
                        <span className="font-bold text-[#00372a] font-editorial text-base">{item.crop}</span>
                        <span className="font-mono text-[10px] text-rose-700 font-bold bg-rose-100 px-2 py-0.5 rounded-[100px]">
                          ORDER CONFIRMED
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#6d6d6d]">Supplier:</span>
                        <span className="font-bold text-[#00372a] font-mono">{supplierName}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#6d6d6d]">Volume:</span>
                        <span className="font-mono font-semibold text-[#212529]">{qty}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#6d6d6d]">Produce Rate:</span>
                        <span className="font-mono font-bold text-[#00372a]">{price}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#6d6d6d]">Produce Value:</span>
                        <span className="font-mono font-semibold text-[#00372a]">₹{produceVal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#6d6d6d]">Transportation:</span>
                        <span className="font-mono font-semibold text-[#1b6e53]">+ ₹{transCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-rose-200/80 font-bold text-xs">
                        <span className="text-[#00372a]">Delivered Total:</span>
                        <span className="font-mono text-rose-800 text-sm">₹{delTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        )}
      </section>

      {/* Compare Offers Modal */}
      {compareModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[24px] max-w-3xl w-full p-6 lg:p-7 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]">
              <div>
                <span className="text-[10px] font-mono text-[#1b6e53] font-bold uppercase tracking-wider">
                  COMMERCIAL OFFER COMPARISON // {compareModalItem.crop}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
                  Compare FPO Delivered Costs
                </h3>
                <p className="text-xs text-[#6d6d6d] font-sans">
                  Target volume: <strong className="text-[#212529]">{compareModalItem.quantity}</strong> • Target Price: <strong className="text-[#683600]">{compareModalItem.targetPrice}</strong>
                </p>
              </div>
              <button
                onClick={() => setCompareModalItem(null)}
                className="w-8 h-8 rounded-full bg-[#f1efdf] text-[#6d6d6d] hover:text-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-[16px] border border-[#c3cda7]">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#e6ecd5] text-[#00372a] font-mono text-[11px] uppercase border-b border-[#c3cda7]">
                  <tr>
                    <th className="py-3 px-4 font-bold">FPO / Location</th>
                    <th className="py-3 px-3 font-bold">Produce Rate</th>
                    <th className="py-3 px-3 font-bold">Produce Value</th>
                    <th className="py-3 px-3 font-bold">Transport</th>
                    <th className="py-3 px-3 font-bold">Total Delivered</th>
                    <th className="py-3 px-3 font-bold">Effective Rate</th>
                    <th className="py-3 px-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c3cda7]/50 bg-[#ffffff]">
                  {(compareModalItem.responses || [])
                    .filter((r) => r.status === 'ACCEPTED' || r.status === 'BACK_OFFER' || r.status === 'ORDER_CONFIRMED')
                    .map((resp) => {
                      const produceVal = resp.produceValue != null ? resp.produceValue : (resp.producePrice ? (parseFloat(String(resp.offeredQty || compareModalItem.quantity).replace(/[^0-9.]/g, '')) || 0) * resp.producePrice : 0)
                      const transCost = resp.transportCost != null ? resp.transportCost : 0
                      const delTotal = resp.deliveredTotal != null ? resp.deliveredTotal : produceVal + transCost
                      const effPrice = resp.effectivePrice != null ? resp.effectivePrice : (delTotal && (parseFloat(String(resp.offeredQty || compareModalItem.quantity).replace(/[^0-9.]/g, '')) || 1) ? (delTotal / (parseFloat(String(resp.offeredQty || compareModalItem.quantity).replace(/[^0-9.]/g, '')) || 1)).toFixed(2) : '—')
                      const isThisSelected = selectedOfferPerItem[compareModalItem.itemId] === resp.id

                      return (
                        <tr key={resp.id} className={`hover:bg-[#f1efdf]/50 ${isThisSelected ? 'bg-[#e6ecd5]/40' : ''}`}>
                          <td className="py-3 px-4">
                            <div className="font-bold text-[#00372a]">{resp.fpoName}</div>
                            <div className="text-[10px] text-[#6d6d6d] font-mono">{resp.location}</div>
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-[#1b6e53]">
                            {resp.offeredPrice || resp.counterPrice}
                          </td>
                          <td className="py-3 px-3 font-mono text-[#00372a]">
                            ₹{produceVal.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-3 font-mono text-[#1b6e53]">
                            + ₹{transCost.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-3 font-mono font-extrabold text-[#00372a]">
                            ₹{delTotal.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-3 font-mono text-[11px] text-[#6d6d6d]">
                            ₹{effPrice} / kg
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              disabled={compareModalItem.isConfirmed}
                              onClick={() => {
                                handleToggleSelectOffer(compareModalItem.itemId, resp.id)
                                setCompareModalItem(null)
                              }}
                              className={`py-1.5 px-3 rounded-[100px] text-xs font-bold transition cursor-pointer ${
                                isThisSelected
                                  ? 'bg-[#1b6e53] text-[#ffffff]'
                                  : 'bg-[#e6ecd5] text-[#1b6e53] hover:bg-[#d8ee6f] border border-[#c3cda7]'
                              }`}
                            >
                              {isThisSelected ? '✓ Selected' : 'Select'}
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setCompareModalItem(null)}
                className="py-2 px-6 rounded-[100px] border border-[#c3cda7] text-xs font-semibold text-[#353535] bg-[#ffffff] hover:bg-[#f1efdf] transition cursor-pointer"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Offer Review / Back Offer Dialog */}
      {activeOfferModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[24px] max-w-lg w-full p-6 lg:p-7 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]">
              <div>
                <span className="text-[10px] font-mono text-[#1b6e53] font-bold uppercase tracking-wider">
                  {activeOfferModal.status === 'ACCEPTED' ? 'FPO FORMAL OFFER' : 'FPO COMMERCIAL BACK OFFER'} // {demand.id}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
                  {activeOfferModal.fpoName}
                </h3>
              </div>
              <button
                onClick={() => setActiveOfferModal(null)}
                className="w-8 h-8 rounded-full bg-[#f1efdf] text-[#6d6d6d] hover:text-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Offer Specs Summary with Delivered Cost Breakdown */}
            <div className="bg-[#f1efdf] p-4 rounded-[18px] space-y-2.5 text-xs font-sans border border-[#c3cda7]/60">
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Target Item:</span>
                <span className="font-bold text-[#212529]">{activeOfferModal.itemCrop} ({activeOfferModal.itemGrade})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Committed Volume:</span>
                <span className="font-bold text-[#1b6e53] font-mono text-sm">{activeOfferModal.offeredQty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Produce Rate:</span>
                <span className="font-extrabold text-[#00372a] font-mono text-base">
                  {activeOfferModal.offeredPrice || activeOfferModal.counterPrice}
                </span>
              </div>
              {activeOfferModal.produceVal != null && (
                <div className="flex justify-between pt-1 border-t border-[#c3cda7]/40">
                  <span className="text-[#6d6d6d]">Produce Value:</span>
                  <span className="font-mono font-bold text-[#00372a]">₹{activeOfferModal.produceVal.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Transportation Cost:</span>
                <span className="font-mono font-bold text-[#1b6e53]">+ ₹{(activeOfferModal.transCost || 0).toLocaleString('en-IN')}</span>
              </div>
              {activeOfferModal.delTotal != null && (
                <div className="flex justify-between pt-1 border-t border-[#c3cda7]/60 font-bold">
                  <span className="text-[#00372a]">Total Delivered Cost:</span>
                  <span className="font-mono text-base text-[#1b6e53]">₹{activeOfferModal.delTotal.toLocaleString('en-IN')}</span>
                </div>
              )}
              {activeOfferModal.effPrice && (
                <div className="flex justify-between text-[11px] font-mono text-[#6d6d6d]">
                  <span>Effective Landed Cost / kg:</span>
                  <span className="font-bold text-[#212529]">₹{activeOfferModal.effPrice} / kg</span>
                </div>
              )}
              <div className="flex justify-between pt-1 border-t border-[#c3cda7]/40">
                <span className="text-[#6d6d6d]">Destination:</span>
                <span className="font-mono text-[#212529]">{demand.deliveryLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Committed Arrival:</span>
                <span className="font-mono font-bold text-[#212529]">{activeOfferModal.deliveryDate}</span>
              </div>
            </div>

            {activeOfferModal.counterReasons && (
              <div className="p-3.5 bg-[#fceace] rounded-[16px] border border-[#c3cda7] text-xs text-[#683600] space-y-1">
                <span className="font-mono font-bold uppercase text-[10px]">Commercial Rationale for Back Offer:</span>
                <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                  {activeOfferModal.counterReasons.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="text-[11px] text-[#6d6d6d] leading-relaxed">
              Selecting this offer assigns the {activeOfferModal.itemCrop} contract to {activeOfferModal.fpoName}. Member farmers will aggregate at {activeOfferModal.hub || 'Designated Hub'} for digital weighment slips and transparent settlement.
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveOfferModal(null)}
                className="flex-1 py-3 rounded-[100px] border border-[#c3cda7] text-xs font-semibold text-[#353535] bg-[#ffffff] hover:bg-[#f1efdf] transition cursor-pointer"
              >
                Close
              </button>
              {!activeOfferModal.isItemConfirmed && (
                <button
                  type="button"
                  onClick={() => {
                    handleToggleSelectOffer(activeOfferModal.itemId, activeOfferModal.id)
                    setActiveOfferModal(null)
                  }}
                  className="flex-1 py-3 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Select this FPO for {activeOfferModal.itemCrop}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
