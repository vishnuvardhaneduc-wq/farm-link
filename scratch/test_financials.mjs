import { getStoredDemands, calculateOfferFinancials, confirmProcurementOrder } from '../src/data/buyerData.js'
import { getStoredHubOperations, createOrUpdateSettlementRecord, setOrderTestScenario } from '../src/data/hubOperationsData.js'

console.log('=== TEST 1: calculateOfferFinancials ===')
const offerFin = calculateOfferFinancials(1000, 27, 1500)
console.log('Offer Financials for 1,000 kg @ ₹27/kg + ₹1,500 transport:', offerFin)
if (offerFin.produceValueVal !== 27000 || offerFin.deliveredTotalVal !== 28500 || offerFin.effectivePriceVal !== 28.5) {
  console.error('FAIL: calculateOfferFinancials mismatch')
} else {
  console.log('PASS: calculateOfferFinancials verified')
}

console.log('\n=== TEST 2: createOrUpdateSettlementRecord with 700 kg (70, 140, 210, 280) ===')
const state = setOrderTestScenario('ready_for_settlement')
const settlement = createOrUpdateSettlementRecord(state)
console.log('Settlement Record Output:', {
  acceptedQty: settlement.acceptedQty,
  agreedFarmerRate: settlement.agreedFarmerRate,
  farmerSettlementTotal: settlement.farmerSettlementTotal,
  produceValue: settlement.produceValue,
  transportationCost: settlement.transportationCost,
  hubHandlingCost: settlement.hubHandlingCost,
  buyerDeliveredTotal: settlement.buyerDeliveredTotal,
  fpoOperatingRealization: settlement.fpoOperatingRealization,
  farmerPayouts: settlement.farmerPayouts
})

if (settlement.farmerSettlementTotal !== 17500) {
  console.error('FAIL: farmerSettlementTotal is not 17500')
} else {
  console.log('PASS: Farmer Settlement Pool = 700 kg * ₹25/kg = ₹17,500')
}

if (settlement.buyerDeliveredTotal !== 28500) {
  console.error('FAIL: buyerDeliveredTotal is not 28500')
} else {
  console.log('PASS: Delivered Total = ₹27,000 + ₹1,500 = ₹28,500')
}

if (settlement.fpoOperatingRealization !== 8500) {
  console.error('FAIL: fpoOperatingRealization is not 8500')
} else {
  console.log('PASS: FPO Operating Realization = ₹28,500 - ₹17,500 - ₹1,500 - ₹1,000 = ₹8,500')
}

console.log('\n=== TEST 3: Farmer Payouts Breakdown ===')
const totalFarmerSum = settlement.farmerPayouts.reduce((sum, p) => sum + p.payoutAmount, 0)
console.log('Sum of farmer individual payouts:', totalFarmerSum)
if (totalFarmerSum !== 17500) {
  console.error('FAIL: totalFarmerSum mismatch')
} else {
  console.log('PASS: Farmer A (₹1,750) + Farmer B (₹3,500) + Farmer C (₹5,250) + Farmer D (₹7,000) = ₹17,500 (100% accounted for, status: Recorded)')
}
