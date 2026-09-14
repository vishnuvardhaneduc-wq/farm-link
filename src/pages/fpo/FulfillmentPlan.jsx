import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import {
  getFpoOrderById,
  calculateMinimumHubNetwork,
  calculateFairFarmerAllocation,
  saveFulfillmentPlan,
  fpoHubsList
} from '../../data/fpoDashboardData'

export default function FulfillmentPlan() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const order = getFpoOrderById(orderId)

  // Demo scenario switch: 'auto' | 'single' | 'multi'
  const [demoScenario, setDemoScenario] = useState('auto')
  
  // Per-item hub allocation state:
  // hubAllocations[itemId] = [ { hubId, hubName, allocatedQty, availableCapacity } ]
  const [hubAllocations, setHubAllocations] = useState({})
  const [adjustingItemId, setAdjustingItemId] = useState(null)
  const [adjustmentDrafts, setAdjustmentDrafts] = useState({})

  // Track confirmation state & modal
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Compute recommendations for each item in the order
  const items = order.items || [
    {
      itemId: 'item-1',
      crop: 'Tomato',
      quantity: '1,000 kg',
      quantityVal: 1000,
      grade: 'Grade A',
      rate: '₹27.50 / kg'
    }
  ]

  // Initialize or re-calculate hub allocations on order/scenario change
  useEffect(() => {
    const initialMap = {}
    items.forEach((item) => {
      const result = calculateMinimumHubNetwork(
        item,
        fpoHubsList,
        demoScenario === 'multi' ? 'multi' : demoScenario === 'single' ? 'single' : null
      )
      initialMap[item.itemId] = result.recommendedAllocations
    })
    setHubAllocations(initialMap)
  }, [order.orderId, demoScenario])

  // Helper to get recommendation result for an item
  const getItemRecommendation = (item) => {
    return calculateMinimumHubNetwork(
      item,
      fpoHubsList,
      demoScenario === 'multi' ? 'multi' : demoScenario === 'single' ? 'single' : null
    )
  }

  // Handle accepting system recommendation for an item
  const handleAcceptRecommendation = (itemId) => {
    const item = items.find((i) => i.itemId === itemId)
    if (!item) return
    const result = getItemRecommendation(item)
    setHubAllocations((prev) => ({
      ...prev,
      [itemId]: result.recommendedAllocations
    }))
    setAdjustingItemId(null)
    setToastMessage(`Accepted system recommendation for ${item.crop}!`)
    setTimeout(() => setToastMessage(''), 3000)
  }

  // Start adjusting allocation for an item
  const handleStartAdjust = (itemId) => {
    const currentAlloc = hubAllocations[itemId] || []
    const draft = {}
    fpoHubsList.forEach((h) => {
      const match = currentAlloc.find((a) => a.hubId === h.id)
      draft[h.id] = match ? match.allocatedQty : 0
    })
    setAdjustmentDrafts((prev) => ({ ...prev, [itemId]: draft }))
    setAdjustingItemId(itemId)
  }

  // Handle manual adjustment change
  const handleDraftQtyChange = (itemId, hubId, value) => {
    const num = Math.max(0, parseInt(value) || 0)
    setAdjustmentDrafts((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [hubId]: num
      }
    }))
  }

  // Save adjusted allocation
  const handleSaveAdjustment = (item) => {
    const draft = adjustmentDrafts[item.itemId] || {}
    const reqQty = parseInt(String(item.quantityVal || item.quantity).replace(/[^0-9]/g, '')) || 0
    
    // Calculate total allocated
    let totalAlloc = 0
    const newAllocations = []

    fpoHubsList.forEach((h) => {
      const qty = draft[h.id] || 0
      const available = h.crops[item.crop]?.available || 0
      if (qty > 0) {
        if (qty > available) {
          alert(`Cannot allocate ${qty} kg to ${h.shortName}. Maximum available capacity is ${available} kg.`)
          return
        }
        totalAlloc += qty
        newAllocations.push({
          hubId: h.id,
          hubName: h.shortName,
          allocatedQty: qty,
          availableCapacity: available,
          isPrimary: newAllocations.length === 0
        })
      }
    })

    if (totalAlloc !== reqQty) {
      alert(`Total allocated quantity (${totalAlloc.toLocaleString()} kg) must exactly equal order requirement (${reqQty.toLocaleString()} kg).`)
      return
    }

    setHubAllocations((prev) => ({
      ...prev,
      [item.itemId]: newAllocations
    }))
    setAdjustingItemId(null)
    setToastMessage(`Custom hub allocation saved for ${item.crop}!`)
    setTimeout(() => setToastMessage(''), 3000)
  }

  // Calculate Farmer Allocations per item and per allocated hub
  // Structure: farmerAllocationsByItem[itemId] = [ { hubId, hubName, reqQty, farmers: [ { farmerId, name, allocatedQty, ... } ] } ]
  const farmerAllocationsByItem = {}
  let totalOrderRequiredQty = 0
  let totalOrderAllocatedQty = 0
  let totalFarmersAssignedCount = 0

  items.forEach((item) => {
    const reqQty = parseInt(String(item.quantityVal || item.quantity).replace(/[^0-9]/g, '')) || 0
    totalOrderRequiredQty += reqQty
    const allocatedHubs = hubAllocations[item.itemId] || []

    farmerAllocationsByItem[item.itemId] = allocatedHubs.map((hubAlloc) => {
      totalOrderAllocatedQty += hubAlloc.allocatedQty
      const farmers = calculateFairFarmerAllocation(
        hubAlloc.hubId,
        hubAlloc.allocatedQty,
        item.crop,
        item.grade || 'Grade A'
      )
      totalFarmersAssignedCount += farmers.length
      return {
        hubId: hubAlloc.hubId,
        hubName: hubAlloc.hubName,
        allocatedQty: hubAlloc.allocatedQty,
        farmers
      }
    })
  })

  const isBalanced = totalOrderRequiredQty === totalOrderAllocatedQty && totalOrderRequiredQty > 0
  const qtyDifference = totalOrderRequiredQty - totalOrderAllocatedQty

  // Final Confirmation
  const handleConfirmFulfillment = () => {
    const plan = {
      orderId: order.orderId,
      confirmedAt: new Date().toISOString(),
      scenario: demoScenario,
      totalRequiredQty: totalOrderRequiredQty,
      totalAllocatedQty: totalOrderAllocatedQty,
      hubAllocations,
      farmerAllocationsByItem,
      status: 'Fulfillment Planned'
    }
    saveFulfillmentPlan(order.orderId, plan)
    setShowConfirmModal(false)
    setIsSaved(true)
    setToastMessage('Fulfillment Plan successfully confirmed! Status updated to Fulfillment Planned.')
  }

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Link to="/fpo/dashboard" className="text-[10px] font-mono text-[#1b6e53] font-bold hover:underline">
              ← BACK TO DASHBOARD
            </Link>
            <span className="text-[#c3cda7]">/</span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              STEP 4 // FULFILLMENT ALLOCATION
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Plan Order Fulfillment <span className="italic font-normal font-mono text-2xl sm:text-3xl">({order.orderId})</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Evaluate suitable hubs, select the minimum hub network, and fairly allocate member farmer harvest volumes.
          </p>
        </div>

        {/* Demo Scenario Switcher & Status */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-[#f1efdf] p-1 rounded-[100px] border border-[#c3cda7]">
            <button
              onClick={() => setDemoScenario('auto')}
              className={`px-3 py-1 rounded-[100px] text-[11px] font-mono font-bold transition cursor-pointer ${
                demoScenario === 'auto'
                  ? 'bg-[#1b6e53] text-[#ffffff] shadow-2xs'
                  : 'text-[#6d6d6d] hover:text-black'
              }`}
            >
              Default
            </button>
            <button
              onClick={() => setDemoScenario('single')}
              className={`px-3 py-1 rounded-[100px] text-[11px] font-mono font-bold transition cursor-pointer ${
                demoScenario === 'single'
                  ? 'bg-[#1b6e53] text-[#ffffff] shadow-2xs'
                  : 'text-[#6d6d6d] hover:text-black'
              }`}
            >
              Scenario A: Single Hub
            </button>
            <button
              onClick={() => setDemoScenario('multi')}
              className={`px-3 py-1 rounded-[100px] text-[11px] font-mono font-bold transition cursor-pointer ${
                demoScenario === 'multi'
                  ? 'bg-[#1b6e53] text-[#ffffff] shadow-2xs'
                  : 'text-[#6d6d6d] hover:text-black'
              }`}
            >
              Scenario B: 2 Hubs
            </button>
          </div>

          <span
            className={`px-3.5 py-1.5 rounded-[100px] text-xs font-mono font-bold uppercase tracking-wider ${
              isSaved || order.status === 'Fulfillment Planned'
                ? 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53]'
                : 'bg-rose-50 text-rose-700 border border-rose-300'
            }`}
          >
            {isSaved || order.status === 'Fulfillment Planned' ? '✓ Fulfillment Planned' : 'Status: Confirmed'}
          </span>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-4 bg-[#e8fe85] border border-[#1b6e53] text-[#1b6e53] text-xs font-bold rounded-[20px] flex items-center justify-between shadow-md animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">verified</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* 2. Order Summary Card */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-4 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-[18px] bg-[#e6ecd5] border border-[#c3cda7] text-[#1b6e53] text-2xl flex items-center justify-center shrink-0 font-bold">
              📦
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-bold text-xs text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">
                  {order.orderId}
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
                  Confirmed Procurement Order
                </h2>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-[100px] bg-[#b2cee7] text-[#00372a]">
                  Buyer: {order.buyer}
                </span>
              </div>
              <p className="text-xs text-[#6d6d6d] font-mono mt-1">
                Delivery Schedule: <strong className="text-[#212529]">{order.deliveryDate}</strong> • Destination: <strong className="text-[#212529]">{order.deliveryLocation}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="bg-[#f1efdf] rounded-[16px] px-4 py-2 border border-[#c3cda7]/60 text-right">
              <span className="block text-[10px] font-mono uppercase text-[#6d6d6d]">Total Required</span>
              <span className="text-sm font-mono font-extrabold text-[#1b6e53]">{totalOrderRequiredQty.toLocaleString()} kg</span>
            </div>
            <div className="bg-[#fceace] rounded-[16px] px-4 py-2 border border-[#c3cda7]/60 text-right">
              <span className="block text-[10px] font-mono uppercase text-[#683600]">Gross Contract</span>
              <span className="text-sm font-mono font-extrabold text-[#683600]">{order.totalValue}</span>
            </div>
          </div>
        </div>

        {/* Multi-Item Breakdown Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#6d6d6d] mr-1">
            Order Items:
          </span>
          {items.map((it, idx) => (
            <span
              key={it.itemId || idx}
              className="px-3 py-1 rounded-[100px] bg-[#f1efdf] text-[#00372a] font-mono font-semibold border border-[#c3cda7] flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-[#1b6e53]"></span>
              <span>{it.crop}</span>
              <span className="text-[#1b6e53] font-bold">({it.quantity} • {it.grade})</span>
            </span>
          ))}
        </div>
      </section>

      {/* 3. STEP 1: HUB SUITABILITY & MINIMUM HUB NETWORK ALLOCATION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-[#c3cda7]/50 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#1b6e53] text-[#ffffff] font-mono font-bold text-sm flex items-center justify-center">
              1
            </span>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold">
                CORE ALLOCATION PROTOCOL // STEP 1
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
                Hub Suitability &amp; Minimum Hub Network
              </h2>
            </div>
          </div>
          <span className="text-xs font-mono text-[#6d6d6d] max-w-sm text-right">
            System evaluates crop capability, grade capability, headroom capacity, and logistics distance.
          </span>
        </div>

        {/* Item-by-Item Hub Suitability Card */}
        {items.map((item, idx) => {
          const rec = getItemRecommendation(item)
          const currentAlloc = hubAllocations[item.itemId] || []
          const isAdjusting = adjustingItemId === item.itemId
          const draft = adjustmentDrafts[item.itemId] || {}

          return (
            <div
              key={item.itemId || idx}
              className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-5"
            >
              {/* Item Requirement Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#c3cda7]/50">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#6d6d6d]">
                    ITEM 0{idx + 1} REQUIREMENT
                  </span>
                  <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                    {item.crop} <span className="text-lg font-normal text-[#6d6d6d]">({item.variety || 'Standard'})</span>
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[#6d6d6d] font-mono mt-0.5">
                    <span>Target Volume: <strong className="text-[#1b6e53] font-bold">{item.quantity}</strong></span>
                    <span>•</span>
                    <span>Grade Requirement: <strong className="text-[#212529]">{item.grade}</strong></span>
                    <span>•</span>
                    <span>Contract Rate: <strong className="text-[#683600] font-bold">{item.rate}</strong></span>
                  </div>
                </div>

                {/* Recommendation Badge */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-[100px] text-xs font-mono font-bold bg-[#e8fe85] text-[#1b6e53] border border-[#c3cda7] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">hub</span>
                    <span>{rec.recommendationType}</span>
                  </span>
                </div>
              </div>

              {/* Rationale Explanation (Minimum Suitable Hub Network) */}
              <div className="p-3.5 rounded-[16px] bg-[#f1efdf]/80 border border-[#c3cda7] text-xs font-sans text-[#353535] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[20px] text-[#1b6e53] shrink-0 mt-0.5">info</span>
                <div>
                  <strong className="text-[#00372a] block font-semibold mb-0.5">
                    Minimum Suitable Hub Network Rationale:
                  </strong>
                  <p className="text-[11px] text-[#6d6d6d] leading-relaxed">
                    {rec.recommendationReason}
                  </p>
                </div>
              </div>

              {/* Hub Evaluation Matrix Grid */}
              <div className="space-y-2">
                <div className="text-[10px] uppercase font-mono tracking-widest text-[#6d6d6d] font-bold">
                  EVALUATED FPO HUBS ({rec.evaluatedHubs.length} Active Hubs Checked)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {rec.evaluatedHubs.map((hub) => {
                    const isAllocated = currentAlloc.some((a) => a.hubId === hub.id && a.allocatedQty > 0)
                    const allocInfo = currentAlloc.find((a) => a.hubId === hub.id)

                    return (
                      <div
                        key={hub.id}
                        className={`rounded-[20px] p-5 border transition flex flex-col justify-between space-y-3 ${
                          isAllocated
                            ? 'bg-[#e6ecd5]/80 border-[#1b6e53] ring-2 ring-[#1b6e53] shadow-xs'
                            : hub.isSuitable
                            ? 'bg-[#ffffff] border-[#c3cda7] hover:border-[#1b6e53]'
                            : 'bg-[#f1efdf]/60 border-[#c3cda7]/60 opacity-70'
                        }`}
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-start justify-between gap-2 pb-2 border-b border-[#c3cda7]/40">
                            <div>
                              <h4 className="font-editorial text-lg font-bold text-[#00372a] leading-tight">
                                {hub.name}
                              </h4>
                              <p className="text-[10px] text-[#6d6d6d] font-mono mt-0.5">📍 {hub.location}</p>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded-[100px] text-[9px] font-mono font-bold tracking-wider uppercase shrink-0 ${
                                hub.isSuitable
                                  ? 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]'
                                  : 'bg-rose-100 text-rose-800 border border-rose-300'
                              }`}
                            >
                              {hub.isSuitable ? 'Suitable ✓' : 'Ineligible'}
                            </span>
                          </div>

                          {/* Hub Factor Checklist */}
                          <div className="space-y-1.5 text-xs font-sans">
                            <div className="flex justify-between items-center text-[11px]">
                              <span className="text-[#6d6d6d]">Available {item.crop}:</span>
                              <strong className={`font-mono ${hub.availableCapacity > 0 ? 'text-[#1b6e53]' : 'text-rose-700'}`}>
                                {hub.availableCapacity.toLocaleString()} kg
                              </strong>
                            </div>

                            <div className="flex justify-between items-center text-[11px]">
                              <span className="text-[#6d6d6d]">Grade Capability:</span>
                              <span className={`font-mono text-[10px] ${hub.meetsGrade ? 'text-[#1b6e53] font-semibold' : 'text-[#ba1a1a]'}`}>
                                {hub.gradeCapability}
                              </span>
                            </div>

                            <div className="flex justify-between items-center text-[11px]">
                              <span className="text-[#6d6d6d]">Member Farmers:</span>
                              <span className="font-mono text-[#212529]">{hub.farmersCount} Farmers</span>
                            </div>

                            <div className="flex justify-between items-center text-[11px]">
                              <span className="text-[#6d6d6d]">Operating Status:</span>
                              <span className="font-mono text-[#1b6e53] text-[10px]">{hub.operatingText}</span>
                            </div>

                            <div className="flex justify-between items-center text-[11px]">
                              <span className="text-[#6d6d6d]">Distance:</span>
                              <span className="font-mono text-[#353535] text-[10px]">{hub.distanceText}</span>
                            </div>
                          </div>
                        </div>

                        {/* Allocation Display or Manual Adjust Field */}
                        <div className="pt-2.5 border-t border-[#c3cda7]/40">
                          {isAdjusting ? (
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-[#6d6d6d] uppercase block">
                                Allocate Quantity (kg):
                              </label>
                              <input
                                type="number"
                                min="0"
                                max={hub.availableCapacity}
                                value={draft[hub.id] ?? 0}
                                onChange={(e) => handleDraftQtyChange(item.itemId, hub.id, e.target.value)}
                                className="w-full px-3 py-1.5 text-xs font-mono font-bold bg-[#ffffff] border border-[#c3cda7] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#1b6e53]"
                              />
                              <span className="text-[9px] text-[#6d6d6d] block">
                                Max available: {hub.availableCapacity} kg
                              </span>
                            </div>
                          ) : isAllocated ? (
                            <div className="p-2 bg-[#1b6e53] text-[#ffffff] rounded-[12px] flex items-center justify-between text-xs font-mono">
                              <span className="font-semibold text-[10px] uppercase">Allocated Share:</span>
                              <strong className="text-sm font-bold text-[#e8fe85]">
                                {allocInfo.allocatedQty.toLocaleString()} kg
                              </strong>
                            </div>
                          ) : (
                            <div className="text-center py-1.5 text-[11px] font-mono text-[#6d6d6d]">
                              0 kg Allocated
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Hub Allocation Action Cluster */}
              <div className="pt-3 border-t border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
                <div className="text-xs font-mono">
                  <span className="text-[#6d6d6d]">Allocated for {item.crop}: </span>
                  <strong className="text-[#1b6e53] font-bold">
                    {currentAlloc.reduce((acc, curr) => acc + curr.allocatedQty, 0).toLocaleString()} kg
                  </strong>
                  <span className="text-[#6d6d6d]"> of {item.quantity}</span>
                </div>

                <div className="flex items-center gap-2">
                  {isAdjusting ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setAdjustingItemId(null)}
                        className="py-2 px-4 rounded-[100px] border border-[#c3cda7] bg-[#ffffff] hover:bg-[#f1efdf] text-xs font-semibold text-[#353535] transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveAdjustment(item)}
                        className="py-2 px-5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-xs cursor-pointer"
                      >
                        Save Allocation
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleAcceptRecommendation(item.itemId)}
                        className="py-2 px-4 rounded-[100px] bg-[#e6ecd5] hover:bg-[#d8ee6f] text-[#1b6e53] border border-[#c3cda7] text-xs font-bold transition cursor-pointer flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        <span>Accept Recommendation</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStartAdjust(item.itemId)}
                        className="py-2 px-4 rounded-[100px] bg-[#ffffff] hover:bg-[#f1efdf] text-[#353535] border border-[#c3cda7] text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">tune</span>
                        <span>Adjust Allocation</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* 4. STEP 2: FAIR FARMER ALLOCATION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-[#c3cda7]/50 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#1b6e53] text-[#ffffff] font-mono font-bold text-sm flex items-center justify-center">
              2
            </span>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold">
                PROPORTIONAL DISTRIBUTION // STEP 2
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
                Fair Farmer Allocation
              </h2>
            </div>
          </div>
          <span className="text-xs font-mono text-[#6d6d6d] max-w-sm text-right">
            Farmers are chosen ONLY from allocated hubs. Proportional allocation prevents single-farmer bias.
          </span>
        </div>

        {/* Farmer Allocation Tables per Item and Allocated Hub */}
        {items.map((item, idx) => {
          const hubBreakdown = farmerAllocationsByItem[item.itemId] || []

          return (
            <div
              key={item.itemId || idx}
              className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]/50 flex-wrap gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6d6d6d]">ITEM 0{idx + 1} HARVEST ALLOCATION</span>
                  <h3 className="font-editorial text-2xl font-bold text-[#00372a] leading-tight">
                    {item.crop} Member Producers
                  </h3>
                </div>
                <div className="px-3 py-1 bg-[#e6ecd5] text-[#1b6e53] rounded-[100px] border border-[#c3cda7] font-mono text-xs font-bold">
                  {hubBreakdown.length} {hubBreakdown.length === 1 ? 'Hub Assigned' : 'Hubs Assigned'}
                </div>
              </div>

              {hubBreakdown.map((hb) => {
                const totalHubAlloc = hb.allocatedQty
                const farmersList = hb.farmers || []
                const totalFarmersSupply = farmersList.reduce((acc, f) => acc + (f.availableSupply || 0), 0)

                return (
                  <div key={hb.hubId} className="space-y-3 p-4 rounded-[20px] bg-[#f1efdf]/50 border border-[#c3cda7]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px] text-[#1b6e53]">warehouse</span>
                        <h4 className="font-editorial text-xl font-bold text-[#00372a]">
                          {hb.hubName}
                        </h4>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-mono">
                        <span className="text-[#6d6d6d]">Hub Demand: <strong className="text-[#1b6e53] font-bold">{totalHubAlloc.toLocaleString()} kg</strong></span>
                        <span>•</span>
                        <span className="text-[#6d6d6d]">Eligible Supply: <strong className="text-[#212529]">{totalFarmersSupply.toLocaleString()} kg</strong></span>
                        <span>•</span>
                        <span className="text-[#6d6d6d]">Proportional Ratio: <strong className="text-[#683600] font-bold">{totalFarmersSupply > 0 ? `${Math.round((totalHubAlloc / totalFarmersSupply) * 100)}%` : '0%'}</strong></span>
                      </div>
                    </div>

                    {/* Formula Explanation Callout */}
                    <div className="p-3 bg-[#ffffff] rounded-[14px] border border-[#c3cda7]/60 text-[11px] font-mono text-[#353535] flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-[#1b6e53]">functions</span>
                        <span><strong>Fair Allocation Formula:</strong> (Farmer Available Supply / Total Eligible Supply) × Hub Requirement</span>
                      </div>
                      <span className="text-[#1b6e53] font-bold">100% Proportional Balance</span>
                    </div>

                    {/* Farmers Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs min-w-[550px]">
                        <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
                          <tr>
                            <th className="py-2.5 px-3">Farmer ID</th>
                            <th className="py-2.5 px-3">Producer Name</th>
                            <th className="py-2.5 px-3">Assigned Hub</th>
                            <th className="py-2.5 px-2 text-right">Available Supply</th>
                            <th className="py-2.5 px-2 text-right">Eligible Share</th>
                            <th className="py-2.5 px-3 text-right">Fair Allocation</th>
                            <th className="py-2.5 px-3 text-center">Reliability</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529] bg-[#ffffff]">
                          {farmersList.map((f) => (
                            <tr key={f.farmerId} className="hover:bg-[#faf9f0] transition font-sans">
                              <td className="py-2.5 px-3 font-mono font-bold text-[#1b6e53] text-[11px]">
                                {f.farmerId}
                              </td>
                              <td className="py-2.5 px-3 font-bold text-[#00372a]">
                                {f.farmerName}
                              </td>
                              <td className="py-2.5 px-3 text-[#6d6d6d] font-mono text-[11px]">
                                {hb.hubName}
                              </td>
                              <td className="py-2.5 px-2 text-right font-mono text-[#353535]">
                                {f.availableSupply} kg
                              </td>
                              <td className="py-2.5 px-2 text-right font-mono text-[#683600] font-semibold">
                                {f.calculatedPct}%
                              </td>
                              <td className="py-2.5 px-3 text-right font-mono font-extrabold text-[#1b6e53] text-sm">
                                {f.allocatedQty} kg
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono text-[11px] text-[#1b6e53]">
                                ★ {f.reliability}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-[#f1efdf] font-mono font-bold text-xs border-t border-[#c3cda7]">
                          <tr>
                            <td colSpan={3} className="py-2 px-3 text-[#00372a]">
                              Total Hub Farmer Allocation ({farmersList.length} Producers):
                            </td>
                            <td className="py-2 px-2 text-right text-[#353535]">
                              {totalFarmersSupply.toLocaleString()} kg
                            </td>
                            <td className="py-2 px-2 text-right text-[#683600]">
                              100%
                            </td>
                            <td className="py-2 px-3 text-right text-[#1b6e53] text-sm">
                              {farmersList.reduce((acc, curr) => acc + curr.allocatedQty, 0).toLocaleString()} kg
                            </td>
                            <td className="py-2 px-3 text-center text-[#1b6e53]">
                              ✓ Balanced
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </section>

      {/* 5. STEP 3: ALLOCATION REVIEW & BALANCE VERIFICATION */}
      <section className="rounded-[24px] bg-[#ffffff] border-2 border-[#1b6e53] p-6 lg:p-8 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/60">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#1b6e53] text-[#ffffff] font-mono font-bold text-sm flex items-center justify-center">
              3
            </span>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold">
                AUDIT LEDGER // STEP 3
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
                Allocation Review &amp; Verification
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3.5 py-1 rounded-[100px] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isBalanced
                  ? 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53]'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isBalanced ? 'check_circle' : 'warning'}
              </span>
              <span>{isBalanced ? 'Allocation Balanced' : 'Unbalanced Allocation'}</span>
            </span>
          </div>
        </div>

        {/* Review Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
          <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Total Order Required</span>
            <div className="text-2xl font-bold text-[#00372a]">
              {totalOrderRequiredQty.toLocaleString()} kg
            </div>
            <p className="text-[10px] text-[#6d6d6d] font-sans">Across {items.length} confirmed commodities</p>
          </div>

          <div className="p-4 rounded-[18px] bg-[#e6ecd5] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#1b6e53] uppercase block">Total Hub &amp; Farmer Allocated</span>
            <div className="text-2xl font-bold text-[#1b6e53]">
              {totalOrderAllocatedQty.toLocaleString()} kg
            </div>
            <p className="text-[10px] text-[#1b6e53] font-sans">Assigned across {totalFarmersAssignedCount} member farmers</p>
          </div>

          <div className="p-4 rounded-[18px] bg-[#ffffff] border border-[#c3cda7] space-y-1">
            <span className="text-[10px] text-[#6d6d6d] uppercase block">Variance / Difference</span>
            <div className={`text-2xl font-bold ${qtyDifference === 0 ? 'text-[#1b6e53]' : 'text-rose-700'}`}>
              {qtyDifference === 0 ? '0 kg (Balanced ✓)' : `${qtyDifference} kg deficit`}
            </div>
            <p className="text-[10px] text-[#6d6d6d] font-sans">Zero under-allocation or over-commitment</p>
          </div>
        </div>

        {/* Execution CTA */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6d6d6d] font-sans">
            Confirming this plan locks the physical hub aggregation bays and prepares digital weighment slips for incoming farmers.
          </p>

          <button
            type="button"
            disabled={!isBalanced || isSaved || order.status === 'Fulfillment Planned'}
            onClick={() => setShowConfirmModal(true)}
            className="w-full sm:w-auto py-3.5 px-8 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] disabled:opacity-50 disabled:cursor-not-allowed text-[#ffffff] text-xs font-bold uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>
              {isSaved || order.status === 'Fulfillment Planned'
                ? 'Fulfillment Plan Confirmed ✓'
                : 'Confirm Fulfillment Allocation →'}
            </span>
          </button>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[24px] max-w-lg w-full p-6 lg:p-7 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]">
              <div>
                <span className="text-[10px] font-mono text-[#1b6e53] font-bold uppercase tracking-wider">
                  CONFIRMATION PROTOCOL // {order.orderId}
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Confirm Fulfillment Plan?
                </h3>
              </div>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-8 h-8 rounded-full bg-[#f1efdf] text-[#6d6d6d] hover:text-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#353535] font-sans leading-relaxed">
              This action will assign the selected hub quantities and fair farmer allocation quantities for <strong>{order.orderId}</strong>.
            </p>

            <div className="bg-[#f1efdf] p-4 rounded-[18px] space-y-2 text-xs font-sans border border-[#c3cda7]/60">
              <div className="flex justify-between font-mono">
                <span className="text-[#6d6d6d]">Target Buyer:</span>
                <strong className="text-[#00372a]">{order.buyer}</strong>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-[#6d6d6d]">Total Allocated:</span>
                <strong className="text-[#1b6e53]">{totalOrderAllocatedQty.toLocaleString()} kg</strong>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-[#6d6d6d]">Producers Assigned:</span>
                <strong className="text-[#00372a]">{totalFarmersAssignedCount} Farmers</strong>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-[#6d6d6d]">New Order Status:</span>
                <span className="text-[#1b6e53] font-bold uppercase bg-[#e8fe85] px-2 py-0.5 rounded-full text-[10px]">
                  Fulfillment Planned
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 rounded-[100px] border border-[#c3cda7] text-xs font-semibold text-[#353535] bg-[#ffffff] hover:bg-[#f1efdf] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmFulfillment}
                className="flex-1 py-3 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Confirm Allocation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
