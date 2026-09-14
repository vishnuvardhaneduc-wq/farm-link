/**
 * FARMLINK — HUB OPERATIONS DATA LAYER (STEP 5)
 * Manages physical hub fulfillment workflow:
 * Collection -> Weighing -> Quality Inspection -> Aggregation -> Dispatch
 * 
 * Strict rule: Keep these three values separate:
 * 1. Allocated Quantity (planned by FPO)
 * 2. Actual Collected Quantity / Weighed Quantity (gate intake / scale)
 * 3. Accepted Quantity (after quality grading)
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
    hubAllocatedQty: 700, // Rajahmundry Central Hub share
    hubName: 'Rajahmundry Central Hub',
    hubId: 'HUB-A',
    destination: 'Vijayawada Processing Hub',
    deliveryDate: '29 Sep 2026',
    status: 'Collection Active', // 'Fulfillment Planned' | 'Collection Active' | 'Aggregation Active' | 'Ready for Dispatch' | 'Dispatched'
    dispatchDetails: null, // { vehicleNo, driverName, carrier, dispatchDate, notes, dispatchedAt }
  },
  
  // Farmer collection lots for Rajahmundry Central Hub (ORD-1031 Tomato Grade A)
  farmerLots: [
    {
      id: 'LOT-1031-01',
      farmerId: 'FARM-001',
      farmerName: 'Farmer A (Ramesh B.)',
      orderId: 'ORD-1031',
      crop: 'Tomato',
      requiredGrade: 'Grade A',
      
      // Quantities - Strictly separated!
      allocatedQty: 70, // 70 kg allocated by FPO
      actualCollectedQty: null, // to be recorded (e.g. 66.5 kg)
      weighedQty: null, // weighed at precision scale (e.g. 66.5 kg)
      acceptedQty: null, // accepted after QA (e.g. 64 kg)
      rejectedQty: null, // e.g. 2.5 kg
      
      // Workflow status: 'Pending' | 'Collected' | 'Weighed' | 'Passed' | 'Rejected'
      status: 'Pending',
      
      // Timestamps and QA metadata
      collectionTime: null,
      collectionNotes: '',
      weighingTime: null,
      weighingNotes: '',
      qaGrade: null, // 'Grade A' | 'Grade B' | 'Grade C'
      qaResult: null, // 'Pass' | 'Fail'
      qaMoisture: null, // e.g. '88%'
      qaNotes: '',
      qaPhotoUrl: null,
      qaTime: null,
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
      acceptedQty: 135,
      rejectedQty: 0,
      
      status: 'Passed',
      collectionTime: '2026-09-14 07:15 AM',
      collectionNotes: 'Delivered in standard ventilated crates #CR-12 to #CR-18',
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
      acceptedQty: 198,
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
      actualCollectedQty: null,
      weighedQty: null,
      acceptedQty: null,
      rejectedQty: null,
      
      status: 'Pending',
      collectionTime: null,
      collectionNotes: '',
      weighingTime: null,
      weighingNotes: '',
      qaGrade: null,
      qaResult: null,
      qaMoisture: null,
      qaNotes: '',
      qaPhotoUrl: null,
      qaTime: null,
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
    return JSON.parse(raw)
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
  lot.collectionNotes = notes || 'Gate inward recorded by Station Supervisor'

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

  // Update order status if aggregation ready
  checkAndUpdateOrderStatus(state)

  saveHubOperationsState(state)
  return true
}

/**
 * 4. Create Outbound Dispatch Manifest
 */
export function createHubDispatch({
  orderId = 'ORD-1031',
  vehicleNo = 'AP-39-TX-8841',
  driverName = 'Ramesh Naidu',
  carrier = 'Delta Cold-Chain Logistics',
  dispatchDate = '2026-09-14',
  notes = 'Sealed crates loaded at Rajahmundry Bay 1. Temperature maintained at 12°C.',
}) {
  const state = getStoredHubOperations()
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

  state.activeOrder.status = 'Dispatched'
  state.activeOrder.dispatchDetails = {
    vehicleNo,
    driverName,
    carrier,
    dispatchDate,
    notes,
    dispatchedAt: `${today} ${now}`,
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

  // Expected Collection: sum of allocated quantities
  const expectedCollection = lots.reduce((acc, l) => acc + (l.allocatedQty || 0), 0)
  
  // Collected: sum of actual collected quantities for farmers with status != 'Pending'
  const collected = lots.reduce((acc, l) => {
    if (l.status !== 'Pending') {
      return acc + (l.actualCollectedQty || l.weighedQty || l.allocatedQty || 0)
    }
    return acc
  }, 0)

  // Pending: sum of allocated quantities for pending farmers
  const pending = lots.reduce((acc, l) => {
    if (l.status === 'Pending') {
      return acc + (l.allocatedQty || 0)
    }
    return acc
  }, 0)

  // Quality Pending: lots that are Collected or Weighed but not yet QA graded
  const qualityPending = lots.reduce((acc, l) => {
    if (l.status === 'Collected' || l.status === 'Weighed') {
      return acc + (l.weighedQty || l.actualCollectedQty || l.allocatedQty || 0)
    }
    return acc
  }, 0)

  // Accepted Total: sum of accepted quantities
  const totalAccepted = lots.reduce((acc, l) => acc + (l.acceptedQty || 0), 0)

  // Farmers count
  const expectedFarmers = lots.length
  const farmersReported = lots.filter((l) => l.status !== 'Pending').length
  const qualityCheckedLots = lots.filter((l) => l.status === 'Passed' || l.status === 'Rejected').length

  // Required target for hub (700 kg)
  const requiredTarget = activeOrder.hubAllocatedQty || 700
  const isTargetReached = totalAccepted >= requiredTarget

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
    isTargetReached,
    orderStatus: activeOrder.status,
  }
}

/**
 * Helper to update order status based on stage
 */
function checkAndUpdateOrderStatus(state) {
  const kpis = calculateHubKPIs(state)
  if (state.activeOrder.status === 'Dispatched') return

  if (kpis.isTargetReached) {
    state.activeOrder.status = 'Ready for Dispatch'
  } else if (kpis.totalAccepted > 0) {
    state.activeOrder.status = 'Aggregation Active'
  } else if (kpis.farmersReported > 0) {
    state.activeOrder.status = 'Collection Active'
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

    // 1. Sync FPO Orders
    const rawFpo = localStorage.getItem('farmlink_fpo_orders_v1')
    if (rawFpo) {
      const fpoOrders = JSON.parse(rawFpo)
      const updatedFpo = fpoOrders.map((o) => {
        if (o.orderId === orderId) {
          let stageText = 'Collection Active'
          let progressPct = Math.round((kpis.collected / kpis.expectedCollection) * 100)
          
          if (hubState.activeOrder.status === 'Dispatched') {
            stageText = 'Dispatched'
            return {
              ...o,
              status: 'Dispatched',
              fulfillmentStage: 'Delivery',
              statusStyle: 'bg-[#b2cee7] text-[#212529] border border-[#212529]/30 font-bold',
              hubTelemetry: {
                collectedPct: 100,
                qualityPct: 100,
                acceptedQty: kpis.totalAccepted,
                dispatched: true,
                dispatchDetails: hubState.activeOrder.dispatchDetails,
              },
            }
          }

          if (kpis.isTargetReached) {
            stageText = 'Ready for Dispatch'
          } else if (kpis.totalAccepted > 0) {
            stageText = `Aggregation ${Math.round((kpis.totalAccepted / kpis.requiredTarget) * 100)}%`
          } else if (kpis.farmersReported > 0) {
            stageText = `Collection ${progressPct}%`
          }

          return {
            ...o,
            status: kpis.isTargetReached ? 'Ready for Dispatch' : 'Fulfillment Planned',
            fulfillmentStage: stageText,
            statusStyle: kpis.isTargetReached
              ? 'bg-[#e8fe85] text-[#1b6e53] border border-[#1b6e53] font-bold'
              : 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7] font-bold',
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
          if (hubState.activeOrder.status === 'Dispatched') {
            return {
              ...bo,
              status: 'In Transit',
              deliveryStage: `En Route via ${hubState.activeOrder.dispatchDetails?.vehicleNo || 'Carrier'}`,
              statusStyle: 'bg-[#fceace] text-[#683600] border border-[#683600]/30 font-bold',
            }
          }
          if (kpis.isTargetReached) {
            return {
              ...bo,
              status: 'Processing',
              deliveryStage: 'Consolidated & Ready for Carrier Pickup',
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
