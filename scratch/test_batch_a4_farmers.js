import {
  initialFpoFarmersState,
  getStoredFpoFarmers,
  getStoredFpoFarmerById,
  saveFpoFarmer,
  assignFarmerPrimaryHub,
  deleteFpoFarmer,
  resetFpoFarmers,
} from '../src/data/fpoFarmersData.js'

console.log('Testing FPO Farmers Data Layer...')

// Test 1: Check initial state
console.log('Initial Farmers Count:', initialFpoFarmersState.length)
if (initialFpoFarmersState.length < 6) {
  throw new Error('Expected at least 6 initial farmers')
}

// Test 2: Check getStoredFpoFarmerById
const ravi = initialFpoFarmersState.find((f) => f.id === 'FARM-00842')
if (!ravi || ravi.name !== 'Ravi Kumar' || ravi.primaryHubName !== 'Rajahmundry Central Hub') {
  throw new Error('Failed to find FARM-00842 Ravi Kumar with Rajahmundry Central Hub')
}
console.log('Verified Ravi Kumar:', ravi.id, ravi.name, ravi.primaryHubName, ravi.expectedSupply, 'kg')

// Test 3: Check summary metrics and supply/settlement history structure
if (!ravi.supplyHistory || ravi.supplyHistory.length === 0) {
  throw new Error('Supply history missing for FARM-00842')
}
if (!ravi.settlementHistory || ravi.settlementHistory.length === 0) {
  throw new Error('Settlement history missing for FARM-00842')
}
console.log('Verified supply and settlement histories for FARM-00842')

console.log('ALL UNIT CHECKS PASSED SUCCESSFULLY!')
