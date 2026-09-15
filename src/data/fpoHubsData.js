/**
 * FARMLINK — FPO HUBS DATA LAYER (BATCH A3)
 * Mock data & localStorage persistence for FPO Hub Management:
 * All Hubs -> Add/Edit Hub -> Hub Details -> Capacity -> Operating Hours -> Product Capability
 */

export const FPO_HUBS_STORAGE_KEY = 'farmlink_fpo_hubs_state_v1'

export const initialFpoHubsState = [
  {
    id: 'HUB-0007',
    name: 'Rajahmundry Central Hub',
    shortName: 'Hub A',
    location: 'Rajamahendravaram, East Godavari',
    address: 'APMC Market Yard Complex, Main Road, Rajamahendravaram, Andhra Pradesh 533101',
    contactPerson: 'S. Venkata Rao',
    phoneNumber: '+91 98481 23456',
    status: 'Active',
    operatingStatus: 'Active',
    capacity: 1500,
    allocatedCapacity: 900,
    availableCapacity: 600,
    capacityUnit: 'kg',
    assignedFarmers: 42,
    operatingDays: 'Monday – Saturday',
    openingTime: '06:00 AM',
    closingTime: '06:00 PM',
    operatingHoursSchedule: [
      { day: 'Monday', hours: '06:00 AM – 06:00 PM', isOpen: true },
      { day: 'Tuesday', hours: '06:00 AM – 06:00 PM', isOpen: true },
      { day: 'Wednesday', hours: '06:00 AM – 06:00 PM', isOpen: true },
      { day: 'Thursday', hours: '06:00 AM – 06:00 PM', isOpen: true },
      { day: 'Friday', hours: '06:00 AM – 06:00 PM', isOpen: true },
      { day: 'Saturday', hours: '06:00 AM – 02:00 PM', isOpen: true },
      { day: 'Sunday', hours: 'Closed', isOpen: false },
    ],
    supportedProducts: ['Tomato', 'Onion', 'Green Chilli'],
    productCapabilities: [
      {
        crop: 'Tomato',
        variety: 'Hybrid Roma',
        supportedGrades: ['Grade A', 'Grade B'],
        capacity: 1000,
        allocated: 600,
        unit: 'kg',
        features: 'Optical sort optical sorter & cold bay available',
      },
      {
        crop: 'Onion',
        variety: 'Nasik Red',
        supportedGrades: ['Grade A'],
        capacity: 600,
        allocated: 200,
        unit: 'kg',
        features: 'Aerated mesh storage & manual sorting tables',
      },
      {
        crop: 'Green Chilli',
        variety: 'G4',
        supportedGrades: ['Grade A'],
        capacity: 300,
        allocated: 100,
        unit: 'kg',
        features: 'Pre-cooling chamber (14°C locked)',
      },
    ],
    lastUpdated: 'Today, 07:15 AM',
    notes: 'Central aggregation hub with automated weighbridge and direct APMC mandi gate link.',
  },
  {
    id: 'HUB-0008',
    name: 'Kakinada Collection Hub',
    shortName: 'Hub B',
    location: 'Kakinada Port Belt, East Godavari',
    address: 'Warehouse 4, Port Feeder Road, Kakinada, Andhra Pradesh 533001',
    contactPerson: 'K. Narayana Murthy',
    phoneNumber: '+91 98482 34567',
    status: 'Active',
    operatingStatus: 'Active',
    capacity: 1000,
    allocatedCapacity: 700,
    availableCapacity: 300,
    capacityUnit: 'kg',
    assignedFarmers: 31,
    operatingDays: 'Monday – Saturday',
    openingTime: '06:00 AM',
    closingTime: '06:00 PM',
    operatingHoursSchedule: [
      { day: 'Monday', hours: '06:00 AM – 06:00 PM', isOpen: true },
      { day: 'Tuesday', hours: '06:00 AM – 06:00 PM', isOpen: true },
      { day: 'Wednesday', hours: '06:00 AM – 06:00 PM', isOpen: true },
      { day: 'Thursday', hours: '06:00 AM – 06:00 PM', isOpen: true },
      { day: 'Friday', hours: '06:00 AM – 06:00 PM', isOpen: true },
      { day: 'Saturday', hours: '06:00 AM – 02:00 PM', isOpen: true },
      { day: 'Sunday', hours: 'Closed', isOpen: false },
    ],
    supportedProducts: ['Tomato', 'Onion', 'Green Chilli'],
    productCapabilities: [
      {
        crop: 'Tomato',
        variety: 'Hybrid Roma',
        supportedGrades: ['Grade A'],
        capacity: 500,
        allocated: 350,
        unit: 'kg',
        features: 'Electronic scale with instant voice slip generation',
      },
      {
        crop: 'Onion',
        variety: 'Nasik Red',
        supportedGrades: ['Grade A', 'Grade B'],
        capacity: 500,
        allocated: 250,
        unit: 'kg',
        features: 'Elevated bagging ramp & bulk weighment',
      },
      {
        crop: 'Green Chilli',
        variety: 'G4',
        supportedGrades: ['Grade A'],
        capacity: 250,
        allocated: 100,
        unit: 'kg',
        features: 'Cold-chain dispatch staging bay',
      },
    ],
    lastUpdated: 'Today, 06:30 AM',
    notes: 'Coastal feeder hub servicing smallholders in Kakinada and Samalkota belts.',
  },
  {
    id: 'HUB-0009',
    name: 'Eluru Rural Hub',
    shortName: 'Hub C',
    location: 'Eluru Cluster, West Godavari',
    address: 'Rural Marketing Yard, Sanivarapupeta, Eluru, Andhra Pradesh 534001',
    contactPerson: 'M. Appa Rao',
    phoneNumber: '+91 98483 45678',
    status: 'Active',
    operatingStatus: 'Active',
    capacity: 1200,
    allocatedCapacity: 500,
    availableCapacity: 700,
    capacityUnit: 'kg',
    assignedFarmers: 19,
    operatingDays: 'Monday – Saturday',
    openingTime: '06:00 AM',
    closingTime: '06:00 PM',
    operatingHoursSchedule: [
      { day: 'Monday', hours: '06:00 AM – 06:00 PM', isOpen: true },
      { day: 'Tuesday', hours: '06:00 AM – 06:00 PM', isOpen: true },
      { day: 'Wednesday', hours: '06:00 AM – 06:00 PM', isOpen: true },
      { day: 'Thursday', hours: '06:00 AM – 06:00 PM', isOpen: true },
      { day: 'Friday', hours: '06:00 AM – 06:00 PM', isOpen: true },
      { day: 'Saturday', hours: '06:00 AM – 02:00 PM', isOpen: true },
      { day: 'Sunday', hours: 'Closed', isOpen: false },
    ],
    supportedProducts: ['Tomato', 'Rice'],
    productCapabilities: [
      {
        crop: 'Tomato',
        variety: 'Country Native',
        supportedGrades: ['Grade B'],
        capacity: 350,
        allocated: 150,
        unit: 'kg',
        features: 'Local farm gate intake platform',
      },
      {
        crop: 'Rice',
        variety: 'BPT 5204 (Sona Masoori)',
        supportedGrades: ['Grade A'],
        capacity: 800,
        allocated: 350,
        unit: 'kg',
        features: 'Dry grain storage silo with moisture meter',
      },
    ],
    lastUpdated: 'Yesterday',
    notes: 'Inland aggregation center linking West Godavari paddy and horticulture farmers.',
  },
]

/**
 * Retrieves all FPO hubs from localStorage or initializes with defaults.
 */
export function getStoredFpoHubs() {
  if (typeof window === 'undefined') {
    return initialFpoHubsState
  }
  try {
    const raw = localStorage.getItem(FPO_HUBS_STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(FPO_HUBS_STORAGE_KEY, JSON.stringify(initialFpoHubsState))
      return initialFpoHubsState
    }
    return JSON.parse(raw)
  } catch (err) {
    console.error('Failed to read FPO hubs from localStorage:', err)
    return initialFpoHubsState
  }
}

/**
 * Retrieves a single FPO hub by ID.
 */
export function getStoredFpoHubById(id) {
  const hubs = getStoredFpoHubs()
  return hubs.find((h) => h.id === id) || null
}

/**
 * Saves (creates or updates) an FPO hub and notifies listeners.
 */
export function saveFpoHub(hubData) {
  const hubs = getStoredFpoHubs()
  const existingIndex = hubs.findIndex((h) => h.id === hubData.id)

  const capacityVal = Number(hubData.capacity) || 1000
  const allocatedVal = Number(hubData.allocatedCapacity) || (existingIndex >= 0 ? hubs[existingIndex].allocatedCapacity : 0)
  const availableVal = Math.max(0, capacityVal - allocatedVal)

  const defaultSchedule = [
    { day: 'Monday', hours: `${hubData.openingTime || '06:00 AM'} – ${hubData.closingTime || '06:00 PM'}`, isOpen: true },
    { day: 'Tuesday', hours: `${hubData.openingTime || '06:00 AM'} – ${hubData.closingTime || '06:00 PM'}`, isOpen: true },
    { day: 'Wednesday', hours: `${hubData.openingTime || '06:00 AM'} – ${hubData.closingTime || '06:00 PM'}`, isOpen: true },
    { day: 'Thursday', hours: `${hubData.openingTime || '06:00 AM'} – ${hubData.closingTime || '06:00 PM'}`, isOpen: true },
    { day: 'Friday', hours: `${hubData.openingTime || '06:00 AM'} – ${hubData.closingTime || '06:00 PM'}`, isOpen: true },
    { day: 'Saturday', hours: `${hubData.openingTime || '06:00 AM'} – 02:00 PM`, isOpen: true },
    { day: 'Sunday', hours: 'Closed', isOpen: false },
  ]

  const formattedHub = {
    ...hubData,
    capacity: capacityVal,
    allocatedCapacity: allocatedVal,
    availableCapacity: availableVal,
    assignedFarmers: Number(hubData.assignedFarmers) || (existingIndex >= 0 ? hubs[existingIndex].assignedFarmers : 15),
    operatingHoursSchedule: hubData.operatingHoursSchedule || defaultSchedule,
    lastUpdated: 'Just now',
    status: hubData.status || 'Active',
    operatingStatus: hubData.operatingStatus || 'Active',
  }

  let updatedList
  if (existingIndex >= 0) {
    updatedList = [...hubs]
    updatedList[existingIndex] = {
      ...hubs[existingIndex],
      ...formattedHub,
    }
  } else {
    // Generate new unique Hub ID (e.g. HUB-0010)
    const nextNum = (hubs.length + 7).toString().padStart(4, '0')
    formattedHub.id = hubData.id || `HUB-${nextNum}`
    formattedHub.shortName = `Hub ${String.fromCharCode(65 + hubs.length)}`
    
    // Auto-generate capabilities from supported products if not specified
    if (!formattedHub.productCapabilities || formattedHub.productCapabilities.length === 0) {
      formattedHub.productCapabilities = (formattedHub.supportedProducts || ['Tomato']).map((crop) => ({
        crop,
        variety: 'Standard Grade A',
        supportedGrades: ['Grade A', 'Grade B'],
        capacity: Math.round(capacityVal / (formattedHub.supportedProducts?.length || 1)),
        allocated: 0,
        unit: formattedHub.capacityUnit || 'kg',
        features: 'Direct weighbridge and bay storage',
      }))
    }

    updatedList = [...hubs, formattedHub]
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(FPO_HUBS_STORAGE_KEY, JSON.stringify(updatedList))
      window.dispatchEvent(new Event('farmlink-fpo-hubs-updated'))
      window.dispatchEvent(new Event('storage'))
    } catch (err) {
      console.error('Failed to save FPO hub to localStorage:', err)
    }
  }

  return formattedHub
}

/**
 * Deletes an FPO hub by ID.
 */
export function deleteFpoHub(id) {
  const hubs = getStoredFpoHubs()
  const updatedList = hubs.filter((h) => h.id !== id)
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(FPO_HUBS_STORAGE_KEY, JSON.stringify(updatedList))
      window.dispatchEvent(new Event('farmlink-fpo-hubs-updated'))
      window.dispatchEvent(new Event('storage'))
    } catch (err) {
      console.error('Failed to delete FPO hub:', err)
    }
  }
  return updatedList
}

/**
 * Resets FPO hubs to initial state.
 */
export function resetFpoHubs() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(FPO_HUBS_STORAGE_KEY, JSON.stringify(initialFpoHubsState))
      window.dispatchEvent(new Event('farmlink-fpo-hubs-updated'))
      window.dispatchEvent(new Event('storage'))
    } catch (err) {
      console.error('Failed to reset FPO hubs:', err)
    }
  }
  return initialFpoHubsState
}
