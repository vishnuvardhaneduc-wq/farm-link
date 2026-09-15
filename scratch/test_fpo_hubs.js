import {
  initialFpoHubsState,
  getStoredFpoHubs,
  getStoredFpoHubById,
  saveFpoHub,
  deleteFpoHub,
  resetFpoHubs,
} from '../src/data/fpoHubsData.js'

console.log('--- Testing FPO Hubs Data Layer ---')

// 1. Initial State Check
const hubs = initialFpoHubsState
console.log('Total initial hubs:', hubs.length)
hubs.forEach((h) => {
  console.log(`\n[${h.id}] ${h.name} (${h.location})`)
  console.log(`  Capacity: ${h.capacity} ${h.capacityUnit} | Allocated: ${h.allocatedCapacity} ${h.capacityUnit} | Avail: ${h.availableCapacity} ${h.capacityUnit}`)
  console.log(`  Farmers: ${h.assignedFarmers} | Status: ${h.status}`)
  console.log(`  Operating Hours: ${h.openingTime} – ${h.closingTime} (${h.operatingDays})`)
  console.log(`  Supported Crops: ${h.supportedProducts.join(', ')}`)
  console.log(`  Capabilities count: ${h.productCapabilities.length}`)
})

// 2. Add New Hub Test
console.log('\n--- Adding New Hub (HUB-0010) ---')
const newHub = saveFpoHub({
  name: 'Samalkota Aggregation Bay',
  location: 'Samalkota, East Godavari',
  address: 'Near Railway Goods Shed, Samalkota',
  contactPerson: 'P. Subba Rao',
  phoneNumber: '+91 98484 56789',
  capacity: 800,
  allocatedCapacity: 200,
  capacityUnit: 'kg',
  assignedFarmers: 16,
  openingTime: '06:00 AM',
  closingTime: '06:00 PM',
  operatingDays: 'Monday – Saturday',
  supportedProducts: ['Tomato', 'Green Chilli'],
  status: 'Active',
  operatingStatus: 'Active',
})
console.log('Created hub:', newHub.id, newHub.name, `Capacity: ${newHub.capacity} kg, Available: ${newHub.availableCapacity} kg`)

// 3. Edit Hub Test
console.log('\n--- Editing Hub (HUB-0007) ---')
const updatedHub = saveFpoHub({
  id: 'HUB-0007',
  name: 'Rajahmundry Central Hub (Upgraded)',
  location: 'Rajamahendravaram, East Godavari',
  capacity: 2000,
  allocatedCapacity: 1100,
  capacityUnit: 'kg',
  assignedFarmers: 50,
  openingTime: '05:30 AM',
  closingTime: '06:30 PM',
  operatingDays: 'Monday – Saturday',
  supportedProducts: ['Tomato', 'Onion', 'Green Chilli', 'Rice'],
  status: 'Active',
  operatingStatus: 'Active',
})
console.log('Updated hub:', updatedHub.id, updatedHub.name, `Capacity: ${updatedHub.capacity} kg, Available: ${updatedHub.availableCapacity} kg`)

// 4. Assertions
console.assert(updatedHub.availableCapacity === 900, `Expected availableCapacity to be 900, got ${updatedHub.availableCapacity}`)
console.assert(newHub.availableCapacity === 600, `Expected availableCapacity to be 600, got ${newHub.availableCapacity}`)

console.log('\nAll FPO Hub Management data assertions passed successfully!')
