import {
  initialHubOperationsState,
  getStoredHubOperations,
  createHubDispatch,
  markOrderInTransit,
  markOrderDelivered,
  buyerConfirmDelivery,
  buyerReportIssue,
  createOrUpdateSettlementRecord,
  recordSettlementAndCompleteOrder,
  calculateHubKPIs,
} from '../src/data/hubOperationsData.js'

// Simple mock for localStorage
const storage = {}
global.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, val) => { storage[key] = String(val) },
  removeItem: (key) => { delete storage[key] },
  clear: () => { Object.keys(storage).forEach((k) => delete storage[k]) }
}
global.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
}

console.log('=== TEST 1: Initial State & Dispatch ===')
const state0 = getStoredHubOperations()
console.log('Initial Order Status:', state0.activeOrder.status)

createHubDispatch({
  orderId: 'ORD-1031',
  vehicleNo: 'AP-39-TX-8841',
  driverName: 'Ramesh Naidu (+91 98480 22341)',
  carrier: 'Delta Cold-Chain Logistics Ltd',
  dispatchDate: '2026-09-14',
  notes: 'Sealed with RFID tag',
  dispatchedQty: 700,
})

const state1 = getStoredHubOperations()
console.log('Post-Dispatch Status:', state1.activeOrder.status)
console.log('Dispatch Details:', state1.activeOrder.dispatchDetails)
console.assert(state1.activeOrder.status === 'Dispatched', 'Expected status to be Dispatched')

console.log('\n=== TEST 2: In Transit Transition ===')
markOrderInTransit('ORD-1031')
const state2 = getStoredHubOperations()
console.log('Status after markOrderInTransit:', state2.activeOrder.status)
console.assert(state2.activeOrder.status === 'In Transit', 'Expected status to be In Transit')

console.log('\n=== TEST 3: Delivered Transition ===')
markOrderDelivered('ORD-1031')
const state3 = getStoredHubOperations()
console.log('Status after markOrderDelivered:', state3.activeOrder.status)
console.assert(state3.activeOrder.status === 'Delivered', 'Expected status to be Delivered')

console.log('\n=== TEST 4: Buyer Confirms Delivery ===')
buyerConfirmDelivery('ORD-1031')
const state4 = getStoredHubOperations()
console.log('Status after buyerConfirmDelivery:', state4.activeOrder.status)
console.assert(state4.activeOrder.status === 'Ready for Settlement', 'Expected status to be Ready for Settlement')
console.assert(state4.activeOrder.buyerConfirmation.confirmed === true, 'Expected buyer confirmation true')

console.log('\n=== TEST 5: Settlement Calculation ===')
const settlement = createOrUpdateSettlementRecord(state4)
console.log('Settlement ID:', settlement.settlementId)
console.log('Accepted Qty:', settlement.acceptedQty, 'kg')
console.log('Agreed Farmer Rate: ₹' + settlement.agreedFarmerRate + '/kg')
console.log('Total Settlement Amount: ₹' + settlement.settlementAmount)
console.assert(settlement.settlementAmount === settlement.acceptedQty * settlement.agreedFarmerRate, 'Settlement amount calculation mismatch!')

console.log('Farmer Payouts Breakdown:')
settlement.farmerPayouts.forEach((f) => {
  console.log(`- ${f.farmerName} (${f.farmerId}): ${f.acceptedQty} kg × ₹${f.agreedRate} = ₹${f.payoutAmount} [${f.status}]`)
})
const totalFarmerPayout = settlement.farmerPayouts.reduce((acc, f) => acc + f.payoutAmount, 0)
console.log('Sum of Farmer Payouts: ₹' + totalFarmerPayout)
console.assert(totalFarmerPayout === settlement.settlementAmount, 'Farmer payouts must sum to total settlement amount!')

console.log('Multi-Item Order Breakdown:')
settlement.multiItemSettlement.forEach((item) => {
  console.log(`- ${item.crop} (${item.grade}): ${item.acceptedQty} kg @ ₹${item.rate}/kg = ₹${item.amount} (${item.supplier})`)
})

console.log('\n=== TEST 6: Record Settlement & Complete Order ===')
recordSettlementAndCompleteOrder('ORD-1031')
const state5 = getStoredHubOperations()
console.log('Final Order Status:', state5.activeOrder.status)
console.log('Settlement Record Status:', state5.activeOrder.settlementRecord.status)
console.assert(state5.activeOrder.status === 'Completed', 'Expected order status to be Completed')

console.log('\n=== TEST 7: Delivery Issue Exception Handling ===')
buyerReportIssue('ORD-1031', { issueType: 'Damaged produce', description: 'Crushed cartons on pallet 2' })
const state6 = getStoredHubOperations()
console.log('Order Status with Issue:', state6.activeOrder.status)
console.log('Delivery Issue:', state6.activeOrder.deliveryIssue)
console.assert(state6.activeOrder.status === 'Delivery Issue', 'Expected status to be Delivery Issue')

console.log('\n ALL TESTS PASSED SUCCESSFULLY!')
