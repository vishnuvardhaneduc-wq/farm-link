import {
  initialProcurementRequests,
  getStoredDemands,
  getDemandById,
  updateItemOfferSelection,
  confirmProcurementOrder,
  submitFpoResponse
} from '../src/data/buyerData.js'

// Simple mock for window and localStorage
const storage = {}
global.window = {
  dispatchEvent: () => {}
}
global.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, val) => { storage[key] = val },
  removeItem: (key) => { delete storage[key] }
}
global.Event = class Event {}

console.log('=== TEST 1: Load REQ-1030 Demo Data ===')
const demands = getStoredDemands()
const req1030 = getDemandById('REQ-1030')

console.log('Request ID:', req1030.id)
console.log('Items Count:', req1030.items.length)
const tomatoItem = req1030.items[0]
console.log('Crop:', tomatoItem.crop, 'Quantity:', tomatoItem.quantity, 'Grade:', tomatoItem.grade)
console.log('Responses Count:', tomatoItem.responses.length)

tomatoItem.responses.forEach((resp, i) => {
  console.log(`[Response ${i + 1}] ${resp.fpoName}: Status=${resp.status}, Qty=${resp.offeredQty || resp.quantity}, Produce=${resp.producePrice}, Transport=${resp.transportCost}, DeliveredTotal=${resp.deliveredTotal}, Delivery=${resp.deliveryDate}`)
})

if (tomatoItem.responses.length !== 3) {
  throw new Error(`Expected 3 responses for REQ-1030, got ${tomatoItem.responses.length}`)
}

console.log('\n=== TEST 2: Select FPO for Item ===')
const godavariResp = tomatoItem.responses.find(r => r.fpoName.includes('Godavari'))
updateItemOfferSelection('REQ-1030', tomatoItem.itemId, godavariResp.id)

console.log('Selected Godavari FPO:', godavariResp.id)

console.log('\n=== TEST 3: Confirm Procurement Order ===')
const confirmResult = confirmProcurementOrder('REQ-1030', {
  [tomatoItem.itemId]: godavariResp.id
})

console.log('Confirm Result Order ID:', confirmResult.orderId)
const updatedDemand = getDemandById('REQ-1030')
const updatedTomato = updatedDemand.items[0]
console.log('Item Confirmed Status:', updatedTomato.status, 'isConfirmed:', updatedTomato.isConfirmed)

updatedTomato.responses.forEach((resp) => {
  console.log(`Response ${resp.fpoName}: Status=${resp.status}, isConfirmed=${resp.isConfirmed}, isAwarded=${resp.isAwarded}`)
})

const godavariUpdated = updatedTomato.responses.find(r => r.id === godavariResp.id)
const deltaUpdated = updatedTomato.responses.find(r => r.fpoName.includes('Delta'))
const greenUpdated = updatedTomato.responses.find(r => r.fpoName.includes('Green'))

if (godavariUpdated.status !== 'ORDER_CONFIRMED') {
  throw new Error(`Expected Godavari status ORDER_CONFIRMED, got ${godavariUpdated.status}`)
}
if (deltaUpdated.status !== 'UNAVAILABLE') {
  throw new Error(`Expected Delta Agro status UNAVAILABLE, got ${deltaUpdated.status}`)
}
if (greenUpdated.status !== 'UNAVAILABLE') {
  throw new Error(`Expected Green Valley status UNAVAILABLE, got ${greenUpdated.status}`)
}

// Verify that original details remain visible on unavailable responses
if (!deltaUpdated.deliveredTotal || !deltaUpdated.producePrice) {
  throw new Error('Expected Delta Agro response details to remain visible!')
}

console.log('\n=== TEST 4: FPO Response Submission Flow ===')
// Test FPO submission on a fresh demand
const fpoProfile = {
  id: 'fpo-godavari',
  name: 'Godavari Farmers FPO',
  location: 'Rajamahendravaram',
  primaryHub: 'Rajahmundry Central Hub'
}

submitFpoResponse('REQ-1032', fpoProfile, {
  'item-1032-1': {
    type: 'ACCEPT',
    availableQty: '1000',
    producePrice: '27.00',
    transportCost: '1500',
    deliveryDate: '25 Sep 2026',
    notes: 'Volume accepted for immediate aggregation.'
  }
})

const req1032 = getDemandById('REQ-1032')
console.log('REQ-1032 Responses count:', req1032.items[0].responses.length)
console.log('REQ-1032 Latest Response:', req1032.items[0].responses[0].fpoName, req1032.items[0].responses[0].status)

console.log('\nALL UNIT DATA TESTS PASSED SUCCESSFULLY! ✓')
