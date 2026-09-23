/**
 * FARMLINK — FPO FARMER MANAGEMENT DATA LAYER (BATCH A4)
 * Mock data & localStorage persistence for FPO Farmer Management:
 * 1. All Farmers -> 2. Add Farmer -> 3. Farmer Details -> 4. Assign Hub -> 5. Supply History -> 6. Settlement History
 */

import { getStoredFpoHubs } from './fpoHubsData.js'

export const FPO_FARMERS_STORAGE_KEY = 'farmlink_fpo_farmers_state_v1'

export const initialFpoFarmersState = [
  {
    id: 'FARM-00842',
    name: 'Ravi Kumar',
    phoneNumber: '+91 98481 12345',
    village: 'Kadiyam',
    district: 'East Godavari',
    primaryCrop: 'Tomato',
    otherCrops: 'Onion',
    expectedSupply: 450,
    supplyUnit: 'kg',
    primaryHubId: 'HUB-0007',
    primaryHubName: 'Rajahmundry Central Hub',
    gradeCapability: 'Grade A',
    status: 'Active',
    lastSupply: '25 Sep 2026',
    allocatedQty: 300,
    collectedQty: 285,
    acceptedQty: 280,
    supplyHistory: [
      {
        id: 'SUP-901',
        date: '25 Sep 2026',
        orderId: 'ORD-1031',
        crop: 'Tomato',
        allocated: '70 kg',
        collected: '68 kg',
        accepted: '66 kg',
        grade: 'Grade A',
        hub: 'Rajahmundry Central Hub',
        status: 'Completed',
      },
      {
        id: 'SUP-892',
        date: '18 Sep 2026',
        orderId: 'ORD-1026',
        crop: 'Onion',
        allocated: '100 kg',
        collected: '98 kg',
        accepted: '95 kg',
        grade: 'Grade A',
        hub: 'Rajahmundry Central Hub',
        status: 'Completed',
      },
      {
        id: 'SUP-875',
        date: '10 Sep 2026',
        orderId: 'ORD-1019',
        crop: 'Tomato',
        allocated: '130 kg',
        collected: '119 kg',
        accepted: '119 kg',
        grade: 'Grade A',
        hub: 'Rajahmundry Central Hub',
        status: 'Completed',
      },
    ],
    settlementHistory: [
      {
        id: 'SET-901',
        date: '25 Sep 2026',
        orderId: 'ORD-1031',
        acceptedQty: '66 kg',
        rate: '₹25/kg',
        payoutAmount: 1650,
        status: 'Recorded',
      },
      {
        id: 'SET-892',
        date: '18 Sep 2026',
        orderId: 'ORD-1026',
        acceptedQty: '95 kg',
        rate: '₹24/kg',
        payoutAmount: 2280,
        status: 'Recorded',
      },
      {
        id: 'SET-875',
        date: '10 Sep 2026',
        orderId: 'ORD-1019',
        acceptedQty: '119 kg',
        rate: '₹25/kg',
        payoutAmount: 2975,
        status: 'Recorded',
      },
    ],
  },
  {
    id: 'FARM-00843',
    name: 'Suresh Rao',
    phoneNumber: '+91 98482 23456',
    village: 'Samalkota',
    district: 'East Godavari',
    primaryCrop: 'Tomato',
    otherCrops: 'Green Chilli',
    expectedSupply: 300,
    supplyUnit: 'kg',
    primaryHubId: 'HUB-0008',
    primaryHubName: 'Kakinada Collection Hub',
    gradeCapability: 'Grade A',
    status: 'Active',
    lastSupply: '18 Sep 2026',
    allocatedQty: 200,
    collectedQty: 195,
    acceptedQty: 190,
    supplyHistory: [
      {
        id: 'SUP-889',
        date: '18 Sep 2026',
        orderId: 'ORD-1027',
        crop: 'Tomato',
        allocated: '120 kg',
        collected: '118 kg',
        accepted: '115 kg',
        grade: 'Grade A',
        hub: 'Kakinada Collection Hub',
        status: 'Completed',
      },
      {
        id: 'SUP-864',
        date: '08 Sep 2026',
        orderId: 'ORD-1015',
        crop: 'Green Chilli',
        allocated: '80 kg',
        collected: '77 kg',
        accepted: '75 kg',
        grade: 'Grade A',
        hub: 'Kakinada Collection Hub',
        status: 'Completed',
      },
    ],
    settlementHistory: [
      {
        id: 'SET-889',
        date: '18 Sep 2026',
        orderId: 'ORD-1027',
        acceptedQty: '115 kg',
        rate: '₹25/kg',
        payoutAmount: 2875,
        status: 'Recorded',
      },
      {
        id: 'SET-864',
        date: '08 Sep 2026',
        orderId: 'ORD-1015',
        acceptedQty: '75 kg',
        rate: '₹48/kg',
        payoutAmount: 3600,
        status: 'Recorded',
      },
    ],
  },
  {
    id: 'FARM-00844',
    name: 'Venkatesh Murthy',
    phoneNumber: '+91 98483 34567',
    village: 'Sanivarapupeta',
    district: 'West Godavari',
    primaryCrop: 'Tomato',
    otherCrops: 'Rice',
    expectedSupply: 600,
    supplyUnit: 'kg',
    primaryHubId: 'HUB-0009',
    primaryHubName: 'Eluru Rural Hub',
    gradeCapability: 'Grade B',
    status: 'Active',
    lastSupply: '22 Sep 2026',
    allocatedQty: 400,
    collectedQty: 390,
    acceptedQty: 380,
    supplyHistory: [
      {
        id: 'SUP-899',
        date: '22 Sep 2026',
        orderId: 'ORD-1030',
        crop: 'Tomato',
        allocated: '250 kg',
        collected: '245 kg',
        accepted: '240 kg',
        grade: 'Grade B',
        hub: 'Eluru Rural Hub',
        status: 'Completed',
      },
      {
        id: 'SUP-871',
        date: '12 Sep 2026',
        orderId: 'ORD-1022',
        crop: 'Rice',
        allocated: '150 kg',
        collected: '145 kg',
        accepted: '140 kg',
        grade: 'Grade A',
        hub: 'Eluru Rural Hub',
        status: 'Completed',
      },
    ],
    settlementHistory: [
      {
        id: 'SET-899',
        date: '22 Sep 2026',
        orderId: 'ORD-1030',
        acceptedQty: '240 kg',
        rate: '₹20/kg',
        payoutAmount: 4800,
        status: 'Recorded',
      },
      {
        id: 'SET-871',
        date: '12 Sep 2026',
        orderId: 'ORD-1022',
        acceptedQty: '140 kg',
        rate: '₹32/kg',
        payoutAmount: 4480,
        status: 'Recorded',
      },
    ],
  },
  {
    id: 'FARM-00845',
    name: 'Lakshmi Narayana',
    phoneNumber: '+91 98484 45678',
    village: 'Alamuru',
    district: 'East Godavari',
    primaryCrop: 'Onion',
    otherCrops: 'Tomato',
    expectedSupply: 500,
    supplyUnit: 'kg',
    primaryHubId: 'HUB-0007',
    primaryHubName: 'Rajahmundry Central Hub',
    gradeCapability: 'Grade A',
    status: 'Active',
    lastSupply: '20 Sep 2026',
    allocatedQty: 350,
    collectedQty: 345,
    acceptedQty: 340,
    supplyHistory: [
      {
        id: 'SUP-895',
        date: '20 Sep 2026',
        orderId: 'ORD-1028',
        crop: 'Onion',
        allocated: '350 kg',
        collected: '345 kg',
        accepted: '340 kg',
        grade: 'Grade A',
        hub: 'Rajahmundry Central Hub',
        status: 'Completed',
      },
    ],
    settlementHistory: [
      {
        id: 'SET-895',
        date: '20 Sep 2026',
        orderId: 'ORD-1028',
        acceptedQty: '340 kg',
        rate: '₹24/kg',
        payoutAmount: 8160,
        status: 'Recorded',
      },
    ],
  },
  {
    id: 'FARM-00846',
    name: 'K. Satyanarayana',
    phoneNumber: '+91 98485 56789',
    village: 'Anaparthi',
    district: 'East Godavari',
    primaryCrop: 'Green Chilli',
    otherCrops: 'Tomato',
    expectedSupply: 250,
    supplyUnit: 'kg',
    primaryHubId: 'HUB-0007',
    primaryHubName: 'Rajahmundry Central Hub',
    gradeCapability: 'Grade A',
    status: 'Active',
    lastSupply: '15 Sep 2026',
    allocatedQty: 180,
    collectedQty: 175,
    acceptedQty: 170,
    supplyHistory: [
      {
        id: 'SUP-880',
        date: '15 Sep 2026',
        orderId: 'ORD-1024',
        crop: 'Green Chilli',
        allocated: '180 kg',
        collected: '175 kg',
        accepted: '170 kg',
        grade: 'Grade A',
        hub: 'Rajahmundry Central Hub',
        status: 'Completed',
      },
    ],
    settlementHistory: [
      {
        id: 'SET-880',
        date: '15 Sep 2026',
        orderId: 'ORD-1024',
        acceptedQty: '170 kg',
        rate: '₹48/kg',
        payoutAmount: 8160,
        status: 'Recorded',
      },
    ],
  },
  {
    id: 'FARM-00847',
    name: 'Appa Rao M.',
    phoneNumber: '+91 98486 67890',
    village: 'Peddapuram',
    district: 'East Godavari',
    primaryCrop: 'Rice',
    otherCrops: 'Onion',
    expectedSupply: 1200,
    supplyUnit: 'kg',
    primaryHubId: 'HUB-0008',
    primaryHubName: 'Kakinada Collection Hub',
    gradeCapability: 'Grade A',
    status: 'Active',
    lastSupply: '12 Sep 2026',
    allocatedQty: 800,
    collectedQty: 790,
    acceptedQty: 780,
    supplyHistory: [
      {
        id: 'SUP-870',
        date: '12 Sep 2026',
        orderId: 'ORD-1020',
        crop: 'Rice',
        allocated: '800 kg',
        collected: '790 kg',
        accepted: '780 kg',
        grade: 'Grade A',
        hub: 'Kakinada Collection Hub',
        status: 'Completed',
      },
    ],
    settlementHistory: [
      {
        id: 'SET-870',
        date: '12 Sep 2026',
        orderId: 'ORD-1020',
        acceptedQty: '780 kg',
        rate: '₹32/kg',
        payoutAmount: 24960,
        status: 'Recorded',
      },
    ],
  },
]

/**
 * Retrieves all FPO farmers from localStorage or initializes with defaults.
 */
export function getStoredFpoFarmers() {
  if (typeof window === 'undefined') {
    return initialFpoFarmersState
  }
  try {
    const raw = localStorage.getItem(FPO_FARMERS_STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(FPO_FARMERS_STORAGE_KEY, JSON.stringify(initialFpoFarmersState))
      return initialFpoFarmersState
    }
    return JSON.parse(raw)
  } catch (err) {
    console.error('Failed to read FPO farmers from localStorage:', err)
    return initialFpoFarmersState
  }
}

/**
 * Retrieves a single FPO farmer by ID.
 */
export function getStoredFpoFarmerById(id) {
  const farmers = getStoredFpoFarmers()
  return farmers.find((f) => f.id === id) || null
}

/**
 * Helper to resolve hub name from ID if not provided.
 */
function resolveHubName(hubId, providedName) {
  if (providedName && providedName.trim()) return providedName
  const hubs = getStoredFpoHubs()
  const match = hubs.find((h) => h.id === hubId || h.name === hubId)
  return match ? match.name : (hubId || 'Rajahmundry Central Hub')
}

/**
 * Saves (creates or updates) a farmer and notifies listeners.
 */
export function saveFpoFarmer(farmerData) {
  const farmers = getStoredFpoFarmers()
  const existingIndex = farmers.findIndex((f) => f.id === farmerData.id)

  const expectedVal = Number(farmerData.expectedSupply) || 0
  const hubName = resolveHubName(farmerData.primaryHubId, farmerData.primaryHubName)

  let formattedFarmer = {
    ...farmerData,
    expectedSupply: expectedVal,
    primaryHubName: hubName,
    supplyUnit: farmerData.supplyUnit || 'kg',
    gradeCapability: farmerData.gradeCapability || 'Grade A',
    status: farmerData.status || 'Active',
    lastSupply: farmerData.lastSupply || (existingIndex >= 0 ? farmers[existingIndex].lastSupply : 'Pending first delivery'),
    allocatedQty: Number(farmerData.allocatedQty) || (existingIndex >= 0 ? farmers[existingIndex].allocatedQty : Math.round(expectedVal * 0.65)),
    collectedQty: Number(farmerData.collectedQty) || (existingIndex >= 0 ? farmers[existingIndex].collectedQty : Math.round(expectedVal * 0.62)),
    acceptedQty: Number(farmerData.acceptedQty) || (existingIndex >= 0 ? farmers[existingIndex].acceptedQty : Math.round(expectedVal * 0.60)),
    supplyHistory: farmerData.supplyHistory || (existingIndex >= 0 ? farmers[existingIndex].supplyHistory : []),
    settlementHistory: farmerData.settlementHistory || (existingIndex >= 0 ? farmers[existingIndex].settlementHistory : []),
  }

  let updatedList
  if (existingIndex >= 0) {
    updatedList = [...farmers]
    updatedList[existingIndex] = {
      ...farmers[existingIndex],
      ...formattedFarmer,
    }
  } else {
    // Generate new mock Farmer ID automatically (e.g. FARM-00848)
    const nextNum = (farmers.length + 842).toString().padStart(5, '0')
    formattedFarmer.id = farmerData.id || `FARM-${nextNum}`
    updatedList = [formattedFarmer, ...farmers]
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(FPO_FARMERS_STORAGE_KEY, JSON.stringify(updatedList))
      window.dispatchEvent(new Event('farmlink-fpo-farmers-updated'))
      window.dispatchEvent(new Event('storage'))
    } catch (err) {
      console.error('Failed to save FPO farmer to localStorage:', err)
    }
  }

  return formattedFarmer
}

/**
 * Assigns or changes the Primary Hub for a farmer.
 */
export function assignFarmerPrimaryHub(farmerId, hubId, hubName) {
  const farmers = getStoredFpoFarmers()
  const targetIndex = farmers.findIndex((f) => f.id === farmerId)
  if (targetIndex === -1) return null

  const resolvedName = resolveHubName(hubId, hubName)

  const updatedFarmer = {
    ...farmers[targetIndex],
    primaryHubId: hubId,
    primaryHubName: resolvedName,
  }

  const updatedList = [...farmers]
  updatedList[targetIndex] = updatedFarmer

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(FPO_FARMERS_STORAGE_KEY, JSON.stringify(updatedList))
      window.dispatchEvent(new Event('farmlink-fpo-farmers-updated'))
      window.dispatchEvent(new Event('storage'))
    } catch (err) {
      console.error('Failed to assign farmer primary hub:', err)
    }
  }

  return updatedFarmer
}

/**
 * Deletes a farmer by ID.
 */
export function deleteFpoFarmer(id) {
  const farmers = getStoredFpoFarmers()
  const updatedList = farmers.filter((f) => f.id !== id)
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(FPO_FARMERS_STORAGE_KEY, JSON.stringify(updatedList))
      window.dispatchEvent(new Event('farmlink-fpo-farmers-updated'))
      window.dispatchEvent(new Event('storage'))
    } catch (err) {
      console.error('Failed to delete FPO farmer:', err)
    }
  }
  return updatedList
}

/**
 * Resets FPO farmers to initial state.
 */
export function resetFpoFarmers() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(FPO_FARMERS_STORAGE_KEY, JSON.stringify(initialFpoFarmersState))
      window.dispatchEvent(new Event('farmlink-fpo-farmers-updated'))
      window.dispatchEvent(new Event('storage'))
    } catch (err) {
      console.error('Failed to reset FPO farmers:', err)
    }
  }
  return initialFpoFarmersState
}
