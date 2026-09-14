/**
 * FARMLINK — HUB OPERATIONS DATA LAYER (STEP 5)
 * Manages physical hub fulfillment workflow:
 * Collection -> Weighing -> Quality Inspection -> Aggregation -> Dispatch
 * 
 * Includes Partial Fulfillment & Shortfall Communication Workflow:
 * HUB -> FPO -> BUYER -> BUYER DECISION -> HUB DISPATCH
 * 
 * Strict rule: Keep these three values separate:
 * 1. Ordered / Allocated Quantity (planned by FPO e.g. 700 kg)
 * 2. Actual Collected / Weighed Quantity (gate intake / scale)
 * 3. Accepted Quantity (after quality grading e.g. 685 kg)
 * 4. Shortfall Quantity (e.g. 15 kg)
 */

export const HUB_OPS_STORAGE_KEY = 'farmlink_hub_operations_state_v1'

export const initialHubOperationsState = {
  activeOrder: {
    orderId: 'ORD-1031',
    buyer: 'AgroFresh Enterprise',
    crop: 'Tomato',
    variety: 'Hybrid Roma',
    requiredGrade: 'Grade A',
    totalRequiredQty: 1000,
    hubAllocatedQty: 700, // Rajahmundry Central Hub target requirement (700 kg)
    hubName: 'Rajahmundry Central Hub',
    hubId: 'HUB-A',
    destination: 'Vijayawada Processing Hub',
    deliveryDate: '29 Sep 2026',
    
    // Core fulfillment & shortage state:
    // 'Aggregation In Progress' | 'Partial Fulfillment Available' | 'Buyer Review Required' | 
    // 'Partial Fulfillment Approved' | 'Additional Supply Required' | 'Partial Fulfillment Rejected' | 
    // 'Ready for Dispatch' | 'Ready for Partial Dispatch' | 'Partially Dispatched' | 'Dispatched'
    status: 'Partial Fulfillment Available',
    
    // Shortfall communication metadata
    shortfallState: {
      hasShortfall: true,
      orderedQty: 700,
      acceptedQty: 685,
      shortfallQty: 15,
      hubNotifiedFpo: false,
      hubNotifiedAt: null,
      fpoNotifiedBuyer: false,
      fpoNotifiedAt: null,
      buyerDecision: null, // 'Accepted' | 'FullQuantityRequested' | 'Rejected'
      buyerDecisionAt: null,
      notes: '15 kg shortfall detected during quality assay.',
    },
    
    // Multi-item order items support
    items: [
      {
        itemId: 'item-1031-tomato',
        crop: 'Tomato',
        variety: 'Hybrid Roma',
        grade: 'Grade A',
        orderedQty: 700,
        acceptedQty: 685,
        shortfallQty: 15,
        status: 'Partial Fulfillment Available', // per-item status
      },
      {
        itemId: 'item-1031-onion',
        crop: 'Onion',
        variety: 'Nasik Red',
        grade: 'Grade A',
        orderedQty: 500,
        acceptedQty: 500,
        shortfallQty: 0,
        status: 'Ready for Dispatch', // complete item
      },
    ],

    dispatchDetails: null, // { vehicleNo, driverName, carrier, dispatchDate, notes, dispatchedAt, dispatchedQty, isPartial }
  },
  
  // Farmer collection lots for Rajahmundry Central Hub (ORD-1031 Tomato Grade A: 685 kg accepted total)
  farmerLots: [
    {
      id: 'LOT-1031-01',
      farmerId: 'FARM-001',
      farmerName: 'Farmer A (Ramesh B.)',
      orderId: 'ORD-1031',
      crop: 'Tomato',
      requiredGrade: 'Grade A',
      
      allocatedQty: 70, // 70 kg allocated
      actualCollectedQty: 66.5,
      weighedQty: 66.5,
      acceptedQty: 64, // 64 kg accepted
      rejectedQty: 2.5,
      
      status: 'Passed',
      collectionTime: '2026-09-14 07:05 AM',
      collectionNotes: 'Gate intake verified at Bay 1',
      weighingTime: '2026-09-14 07:12 AM',
      weighingNotes: 'Gross 70.5 kg, Tare 4.0 kg, Net 66.5 kg',
      qaGrade: 'Grade A',
      qaResult: 'Pass',
      qaMoisture: '88.0%',
      qaNotes: '64 kg Grade A accepted; 2.5 kg sorting deduction',
      qaPhotoUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80',
      qaTime: '2026-09-14 07:25 AM',
    },
    {
      id: 'LOT-1031-02',
      farmerId: 'FARM-002',
      farmerName: 'Farmer B (G. Somaraju)',
      orderId: 'ORD-1031',
      crop: 'Tomato',
      requiredGrade: 'Grade A',
      
      allocatedQty: 140,
      actualCollectedQty: 135,
      weighedQty: 135,
      acceptedQty: 135, // 135 kg accepted
      rejectedQty: 0,
      
      status: 'Passed',
      collectionTime: '2026-09-14 07:15 AM',
      collectionNotes: 'Delivered in standard ventilated crates',
      weighingTime: '2026-09-14 07:22 AM',
      weighingNotes: 'Gross: 142.5 kg, Tare: 7.5 kg, Net: 135 kg',
      qaGrade: 'Grade A',
      qaResult: 'Pass',
      qaMoisture: '87.5%',
      qaNotes: 'Firm texture, uniform red coloring, zero pest damage.',
      qaPhotoUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80',
      qaTime: '2026-09-14 07:35 AM',
    },
    {
      id: 'LOT-1031-03',
      farmerId: 'FARM-003',
      farmerName: 'Farmer C (K. Satyanarayana)',
      orderId: 'ORD-1031',
      crop: 'Tomato',
      requiredGrade: 'Grade A',
      
      allocatedQty: 210,
      actualCollectedQty: 200,
      weighedQty: 200,
      acceptedQty: 198, // 198 kg accepted
      rejectedQty: 2,
      
      status: 'Passed',
      collectionTime: '2026-09-14 07:45 AM',
      collectionNotes: 'Gate receipt #GR-4029 issued',
      weighingTime: '2026-09-14 07:52 AM',
      weighingNotes: 'Net verified on Bay 2 Scale',
      qaGrade: 'Grade A',
      qaResult: 'Pass',
      qaMoisture: '88.1%',
      qaNotes: '2 kg rejected due to surface bruising; 198 kg premium Grade A cleared.',
      qaPhotoUrl: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&auto=format&fit=crop&q=80',
      qaTime: '2026-09-14 08:05 AM',
    },
    {
      id: 'LOT-1031-04',
      farmerId: 'FARM-004',
      farmerName: 'Farmer D (M. Venkat Rao)',
      orderId: 'ORD-1031',
      crop: 'Tomato',
      requiredGrade: 'Grade A',
      
      allocatedQty: 280,
      actualCollectedQty: 290,
      weighedQty: 290,
      acceptedQty: 288, // 288 kg accepted
      rejectedQty: 2,
      
      status: 'Passed',
      collectionTime: '2026-09-14 08:15 AM',
      collectionNotes: 'Crate intake logged at Bay 1',
      weighingTime: '2026-09-14 08:20 AM',
      weighingNotes: 'Net certified 290 kg',
      qaGrade: 'Grade A',
      qaResult: 'Pass',
      qaMoisture: '87.8%',
      qaNotes: '288 kg Grade A accepted (Total: 64 + 135 + 198 + 288 = 685 kg; 15 kg shortfall)',
      qaPhotoUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80',
      qaTime: '2026-09-14 08:30 AM',
    },
  ],
}

/**
 * Retrieves stored hub operations state or creates initial default
 */
export function getStoredHubOperations() {
  if (typeof window === 'undefined') return initialHubOperationsState
  try {
    const raw = localStorage.getItem(HUB_OPS_STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(HUB_OPS_STORAGE_KEY, JSON.stringify(initialHubOperationsState))
      return initialHubOperationsState
    }
    const parsed = JSON.parse(raw)
    // Ensure shortfallState exists
    if (!parsed.activeOrder.shortfallState) {
      parsed.activeOrder.shortfallState = initialHubOperationsState.activeOrder.shortfallState
    }
    if (!parsed.activeOrder.items) {
      parsed.activeOrder.items = initialHubOperationsState.activeOrder.items
    }
    return parsed
  } catch (e) {
    console.error('Error reading hub ops data', e)
    return initialHubOperationsState
  }
}

/**
 * Saves hub operations state and triggers sync with FPO and Buyer orders
 */
export function saveHubOperationsState(state) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(HUB_OPS_STORAGE_KEY, JSON.stringify(state))
    syncHubToOtherPortals(state)
  } catch (e) {
    console.error('Error saving hub ops data', e)
  }
}

/**
 * Reset demo data back to clean state
 */
export function resetHubOperationsState() {
  if (typeof window === 'undefined') return initialHubOperationsState
  try {
    localStorage.setItem(HUB_OPS_STORAGE_KEY, JSON.stringify(initialHubOperationsState))
    syncHubToOtherPortals(initialHubOperationsState)
    return initialHubOperationsState
  } catch (e) {
    console.error(e)
    return initialHubOperationsState
  }
}

/**
 * 1. Record Farmer Collection
 * Updates actualCollectedQty while strictly preserving allocatedQty
 */
export function recordFarmerCollection(farmerId, actualCollectedQty, notes = '', customTime = null) {
  const state = getStoredHubOperations()
  const lot = state.farmerLots.find((l) => l.farmerId === farmerId || l.id === farmerId)
  if (!lot) return false

  const qty = parseFloat(actualCollectedQty) || 0
  const now = customTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

  lot.actualCollectedQty = qty
  lot.status = 'Collected'
  lot.collectionTime = `${today} ${now}`
  lot.collectionNotes = notes || 'Gate inward recorded by Hub Operator'

  saveHubOperationsState(state)
  return true
}

/**
 * 2. Confirm Weight at Precision Scale
 */
export function confirmFarmerWeight(farmerId, weighedQty, notes = '') {
  const state = getStoredHubOperations()
  const lot = state.farmerLots.find((l) => l.farmerId === farmerId || l.id === farmerId)
  if (!lot) return false

  const qty = parseFloat(weighedQty) || lot.actualCollectedQty || lot.allocatedQty
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

  lot.weighedQty = qty
  lot.status = 'Weighed'
  lot.weighingTime = `${today} ${now}`
  lot.weighingNotes = notes || 'Automated tare deduction verified on calibrated bay scale'

  saveHubOperationsState(state)
  return true
}

/**
 * 3. Record Quality Inspection (Lab QA)
 * Records Accepted Quantity vs Rejected Quantity
 */
export function recordQualityInspection(
  farmerId,
  {
    grade = 'Grade A',
    result = 'Pass',
    acceptedQty = null,
    moisture = '88.0%',
    notes = '',
    photoUrl = '',
  }
) {
  const state = getStoredHubOperations()
  const lot = state.farmerLots.find((l) => l.farmerId === farmerId || l.id === farmerId)
  if (!lot) return false

  const isPass = result === 'Pass'
  const weighed = lot.weighedQty || lot.actualCollectedQty || lot.allocatedQty
  const parsedAccepted = isPass ? (acceptedQty !== null ? parseFloat(acceptedQty) : weighed) : 0
  const rejected = Math.max(0, weighed - parsedAccepted)

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

  lot.qaGrade = grade
  lot.qaResult = result
  lot.acceptedQty = parsedAccepted
  lot.rejectedQty = rejected
  lot.qaMoisture = moisture || '88%'
  lot.qaNotes = notes || (isPass ? 'Quality inspection passed. Produce meets Grade specifications.' : 'Produce rejected due to quality variance.')
  lot.qaPhotoUrl = photoUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80'
  lot.qaTime = `${today} ${now}`
  lot.status = isPass ? 'Passed' : 'Rejected'

  // Recompute shortfall and status
  recomputeOrderAggregationState(state)

  saveHubOperationsState(state)
  return true
}

/**
 * Recomputes aggregation totals, shortfall, and status
 */
export function recomputeOrderAggregationState(state) {
  const lots = state.farmerLots || []
  const order = state.activeOrder
  const targetRequired = order.hubAllocatedQty || 700
  const totalAccepted = lots.reduce((acc, l) => acc + (l.acceptedQty || 0), 0)
  const shortfall = Math.max(0, targetRequired - totalAccepted)

  if (!order.shortfallState) {
    order.shortfallState = {}
  }

  order.shortfallState.orderedQty = targetRequired
  order.shortfallState.acceptedQty = totalAccepted
  order.shortfallState.shortfallQty = shortfall
  order.shortfallState.hasShortfall = shortfall > 0

  // If already dispatched, do not alter status
  if (order.status === 'Dispatched' || order.status === 'Partially Dispatched') return

  if (totalAccepted >= targetRequired) {
    order.status = 'Ready for Dispatch'
    order.shortfallState.hasShortfall = false
  } else if (order.shortfallState.buyerDecision === 'Accepted') {
    order.status = 'Ready for Partial Dispatch'
  } else if (order.shortfallState.buyerDecision === 'FullQuantityRequested') {
    order.status = 'Additional Supply Required'
  } else if (order.shortfallState.buyerDecision === 'Rejected') {
    order.status = 'Partial Fulfillment Rejected'
  } else if (order.shortfallState.fpoNotifiedBuyer) {
    order.status = 'Buyer Review Required'
  } else if (order.shortfallState.hubNotifiedFpo) {
    order.status = 'Buyer Review Required'
  } else if (totalAccepted > 0 && shortfall > 0) {
    order.status = 'Partial Fulfillment Available'
  } else if (totalAccepted > 0) {
    order.status = 'Aggregation In Progress'
  }

  // Update item level status
  if (order.items && order.items.length > 0) {
    order.items[0].acceptedQty = totalAccepted
    order.items[0].shortfallQty = shortfall
    order.items[0].status = order.status
  }
}

/**
 * 4. HUB ACTION: Notify FPO of Shortfall
 * Hub operator notifies FPO that only partial quantity is available.
 */
export function notifyFpoOfShortfall(orderId = 'ORD-1031', customNotes = '') {
  const state = getStoredHubOperations()
  const order = state.activeOrder
  const kpis = calculateHubKPIs(state)

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

  order.shortfallState.hubNotifiedFpo = true
  order.shortfallState.hubNotifiedAt = `${today} ${now}`
  order.shortfallState.notes = customNotes || `${kpis.shortfall} kg shortfall detected. Notify FPO for buyer review.`
  
  // Update status to Buyer Review Required
  order.status = 'Buyer Review Required'

  if (order.items && order.items.length > 0) {
    order.items[0].status = 'Buyer Review Required'
  }

  saveHubOperationsState(state)
  return true
}

/**
 * 5. FPO ACTION: Notify Buyer of Shortfall
 * FPO informs Buyer of the available partial quantity.
 */
export function fpoNotifyBuyerOfShortfall(orderId = 'ORD-1031') {
  const state = getStoredHubOperations()
  const order = state.activeOrder

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

  order.shortfallState.fpoNotifiedBuyer = true
  order.shortfallState.fpoNotifiedAt = `${today} ${now}`
  order.status = 'Buyer Review Required'

  saveHubOperationsState(state)
  return true
}

/**
 * 6. BUYER DECISION: Accept Partial Quantity
 */
export function buyerAcceptPartialQuantity(orderId = 'ORD-1031') {
  const state = getStoredHubOperations()
  const order = state.activeOrder

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

  order.shortfallState.buyerDecision = 'Accepted'
  order.shortfallState.buyerDecisionAt = `${today} ${now}`
  order.status = 'Ready for Partial Dispatch'

  if (order.items && order.items.length > 0) {
    order.items[0].status = 'Partial Fulfillment Approved'
  }

  saveHubOperationsState(state)
  return true
}

/**
 * 7. BUYER DECISION: Request Full Quantity
 */
export function buyerRequestFullQuantity(orderId = 'ORD-1031') {
  const state = getStoredHubOperations()
  const order = state.activeOrder

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

  order.shortfallState.buyerDecision = 'FullQuantityRequested'
  order.shortfallState.buyerDecisionAt = `${today} ${now}`
  order.status = 'Additional Supply Required'

  if (order.items && order.items.length > 0) {
    order.items[0].status = 'Additional Supply Required'
  }

  saveHubOperationsState(state)
  return true
}

/**
 * 8. BUYER DECISION: Reject Partial Fulfillment
 */
export function buyerRejectPartialFulfillment(orderId = 'ORD-1031') {
  const state = getStoredHubOperations()
  const order = state.activeOrder

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

  order.shortfallState.buyerDecision = 'Rejected'
  order.shortfallState.buyerDecisionAt = `${today} ${now}`
  order.status = 'Partial Fulfillment Rejected'

  if (order.items && order.items.length > 0) {
    order.items[0].status = 'Partial Fulfillment Rejected'
  }

  saveHubOperationsState(state)
  return true
}

/**
 * 9. Create Outbound Dispatch Manifest (Supports full and partial dispatch)
 */
export function createHubDispatch({
  orderId = 'ORD-1031',
  vehicleNo = 'AP-39-TX-8841',
  driverName = 'Ramesh Naidu',
  carrier = 'Delta Cold-Chain Logistics',
  dispatchDate = '2026-09-14',
  notes = 'Sealed crates loaded at Rajahmundry Bay 1. Temperature maintained at 12°C.',
  isPartial = false,
  dispatchedQty = null,
}) {
  const state = getStoredHubOperations()
  const kpis = calculateHubKPIs(state)
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

  const actualDispatched = dispatchedQty || kpis.totalAccepted
  const isPartialDispatch = isPartial || actualDispatched < state.activeOrder.hubAllocatedQty

  state.activeOrder.status = isPartialDispatch ? 'Partially Dispatched' : 'Dispatched'
  state.activeOrder.dispatchDetails = {
    vehicleNo,
    driverName,
    carrier,
    dispatchDate,
    notes,
    dispatchedAt: `${today} ${now}`,
    dispatchedQty: actualDispatched,
    orderedQty: state.activeOrder.hubAllocatedQty,
    shortfallQty: Math.max(0, state.activeOrder.hubAllocatedQty - actualDispatched),
    isPartial: isPartialDispatch,
    manifestRef: `MNF-DSP-${Math.floor(1000 + Math.random() * 9000)}`,
  }

  saveHubOperationsState(state)
  return state.activeOrder.dispatchDetails
}

/**
 * Helper to compute live Hub KPIs
 */
export function calculateHubKPIs(state = getStoredHubOperations()) {
  const lots = state.farmerLots || []
  const activeOrder = state.activeOrder || {}

  const expectedCollection = lots.reduce((acc, l) => acc + (l.allocatedQty || 0), 0)
  
  const collected = lots.reduce((acc, l) => {
    if (l.status !== 'Pending') {
      return acc + (l.actualCollectedQty || l.weighedQty || l.allocatedQty || 0)
    }
    return acc
  }, 0)

  const pending = lots.reduce((acc, l) => {
    if (l.status === 'Pending') {
      return acc + (l.allocatedQty || 0)
    }
    return acc
  }, 0)

  const qualityPending = lots.reduce((acc, l) => {
    if (l.status === 'Collected' || l.status === 'Weighed') {
      return acc + (l.weighedQty || l.actualCollectedQty || l.allocatedQty || 0)
    }
    return acc
  }, 0)

  const totalAccepted = lots.reduce((acc, l) => acc + (l.acceptedQty || 0), 0)
  const requiredTarget = activeOrder.hubAllocatedQty || 700
  const shortfall = Math.max(0, requiredTarget - totalAccepted)
  const isTargetReached = totalAccepted >= requiredTarget
  const hasShortfall = shortfall > 0

  const expectedFarmers = lots.length
  const farmersReported = lots.filter((l) => l.status !== 'Pending').length
  const qualityCheckedLots = lots.filter((l) => l.status === 'Passed' || l.status === 'Rejected').length

  const shortfallState = activeOrder.shortfallState || {}
  const buyerDecision = shortfallState.buyerDecision
  const isPartialApproved = buyerDecision === 'Accepted'
  const isPartialRejected = buyerDecision === 'Rejected'
  const isFullRequested = buyerDecision === 'FullQuantityRequested'

  return {
    expectedCollection,
    collected,
    pending,
    qualityPending,
    totalAccepted,
    expectedFarmers,
    farmersReported,
    qualityCheckedLots,
    requiredTarget,
    shortfall,
    hasShortfall,
    isTargetReached,
    isPartialApproved,
    isPartialRejected,
    isFullRequested,
    orderStatus: activeOrder.status,
    shortfallState,
  }
}

/**
 * Synchronize hub state to FPO Orders and Buyer Orders in localStorage
 */
function syncHubToOtherPortals(hubState) {
  if (typeof window === 'undefined') return
  try {
    const kpis = calculateHubKPIs(hubState)
    const orderId = hubState.activeOrder.orderId
    const order = hubState.activeOrder
    const shortfallState = order.shortfallState || {}

    // 1. Sync FPO Orders
    const rawFpo = localStorage.getItem('farmlink_fpo_orders_v1')
    if (rawFpo) {
      const fpoOrders = JSON.parse(rawFpo)
      const updatedFpo = fpoOrders.map((o) => {
        if (o.orderId === orderId) {
          let stageText = order.status
          let statusStyle = 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7] font-bold'

          if (order.status === 'Dispatched' || order.status === 'Partially Dispatched') {
            stageText = order.status === 'Partially Dispatched' ? 'Partially Dispatched' : 'Dispatched'
            statusStyle = 'bg-[#b2cee7] text-[#212529] border border-[#212529]/30 font-bold'
          } else if (order.status === 'Buyer Review Required') {
            stageText = 'Buyer Review Required'
            statusStyle = 'bg-[#fceace] text-[#683600] border border-[#683600]/40 font-bold'
          } else if (order.status === 'Ready for Partial Dispatch') {
            stageText = 'Buyer Approved Partial Fulfillment'
            statusStyle = 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53] font-bold'
          } else if (order.status === 'Additional Supply Required') {
            stageText = 'Additional Supply Required'
            statusStyle = 'bg-rose-50 text-rose-700 border border-rose-300 font-bold'
          } else if (order.status === 'Partial Fulfillment Rejected') {
            stageText = 'Partial Fulfillment Rejected'
            statusStyle = 'bg-rose-50 text-rose-700 border border-rose-300 font-bold'
          } else if (order.status === 'Partial Fulfillment Available') {
            stageText = 'Partial Fulfillment Available'
            statusStyle = 'bg-[#fceace] text-[#683600] border border-[#c3cda7] font-bold'
          } else if (kpis.isTargetReached) {
            stageText = 'Ready for Dispatch'
            statusStyle = 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53] font-bold'
          }

          return {
            ...o,
            status: order.status,
            fulfillmentStage: stageText,
            statusStyle,
            shortfallData: {
              orderedQty: kpis.requiredTarget,
              acceptedQty: kpis.totalAccepted,
              shortfallQty: kpis.shortfall,
              hasShortfall: kpis.hasShortfall,
              hubNotifiedFpo: shortfallState.hubNotifiedFpo,
              fpoNotifiedBuyer: shortfallState.fpoNotifiedBuyer,
              buyerDecision: shortfallState.buyerDecision,
            },
            hubTelemetry: {
              collectedQty: kpis.collected,
              expectedQty: kpis.expectedCollection,
              acceptedQty: kpis.totalAccepted,
              pendingQty: kpis.pending,
              farmersReported: kpis.farmersReported,
              expectedFarmers: kpis.expectedFarmers,
            },
          }
        }
        return o
      })
      localStorage.setItem('farmlink_fpo_orders_v1', JSON.stringify(updatedFpo))
    }

    // 2. Sync Buyer Orders (Without exposing farmer details)
    const rawBuyer = localStorage.getItem('farmlink_buyer_orders_v1')
    if (rawBuyer) {
      const buyerOrders = JSON.parse(rawBuyer)
      const updatedBuyer = buyerOrders.map((bo) => {
        if (bo.id === orderId || bo.orderId === orderId) {
          if (order.status === 'Dispatched' || order.status === 'Partially Dispatched') {
            return {
              ...bo,
              status: order.status === 'Partially Dispatched' ? 'Partially Dispatched' : 'In Transit',
              deliveryStage: `En Route via ${order.dispatchDetails?.vehicleNo || 'Carrier'} (${kpis.totalAccepted} kg)`,
              statusStyle: 'bg-[#b2cee7] text-[#00372a] border border-[#00372a]/30 font-bold',
            }
          }
          if (order.status === 'Ready for Partial Dispatch') {
            return {
              ...bo,
              status: 'Partial Fulfillment Approved',
              deliveryStage: `Approved for ${kpis.totalAccepted} kg dispatch`,
              statusStyle: 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53] font-bold',
            }
          }
          if (order.status === 'Buyer Review Required' || order.status === 'Partial Fulfillment Available') {
            return {
              ...bo,
              status: 'Buyer Review Required',
              deliveryStage: `${kpis.totalAccepted} kg available (${kpis.shortfall} kg shortfall)`,
              statusStyle: 'bg-[#fceace] text-[#683600] border border-[#683600]/40 font-bold',
            }
          }
          if (order.status === 'Additional Supply Required') {
            return {
              ...bo,
              status: 'Additional Supply Required',
              deliveryStage: 'Awaiting FPO additional quota sourcing',
              statusStyle: 'bg-rose-50 text-rose-700 border border-rose-300 font-bold',
            }
          }
          if (order.status === 'Partial Fulfillment Rejected') {
            return {
              ...bo,
              status: 'Partial Fulfillment Rejected',
              deliveryStage: 'Partial consignment rejected by buyer',
              statusStyle: 'bg-rose-50 text-rose-700 border border-rose-300 font-bold',
            }
          }
          return bo
        }
        return bo
      })
      localStorage.setItem('farmlink_buyer_orders_v1', JSON.stringify(updatedBuyer))
    }
  } catch (e) {
    console.error('Error syncing hub to other portals', e)
  }
}
