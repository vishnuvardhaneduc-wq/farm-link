import {
  saveNewDemand,
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

console.log('=== MULTI-ITEM TEST ===')

// Create 3-item tender
const multiItemDemand = {
  id: 'REQ-9999',
  buyer: 'AgroFresh Enterprise',
  deliveryDate: '25 Sep 2026',
  deliveryLocation: 'Vijayawada Dock',
  status: 'Receiving Offers',
  items: [
    {
      itemId: 'item-1',
      crop: 'Tomato',
      quantity: '1,000 kg',
      grade: 'Grade A',
      targetPrice: '₹28 / kg',
      responses: [
        {
          id: 'resp-9999-1-1',
          fpoId: 'fpo-godavari',
          fpoName: 'Godavari Farmers FPO',
          location: 'Rajamahendravaram',
          status: 'ACCEPTED',
          statusLabel: 'ACCEPTED',
          producePrice: '₹27 / kg',
          producePriceVal: 27,
          transportCost: '₹1,500',
          transportCostVal: 1500,
          deliveredTotal: '₹28,500',
          deliveredTotalVal: 28500,
          effectivePrice: '₹28.50 / kg',
          deliveryDate: '25 Sep 2026'
        },
        {
          id: 'resp-9999-1-2',
          fpoId: 'fpo-delta-agro',
          fpoName: 'Delta Agro FPO',
          location: 'Mandapeta',
          status: 'BACK_OFFER',
          statusLabel: 'BACK OFFER',
          producePrice: '₹28 / kg',
          producePriceVal: 28,
          transportCost: '₹1,000',
          transportCostVal: 1000,
          deliveredTotal: '₹26,200',
          deliveredTotalVal: 26200,
          effectivePrice: '₹29.11 / kg',
          deliveryDate: '26 Sep 2026'
        }
      ]
    },
    {
      itemId: 'item-2',
      crop: 'Onion',
      quantity: '500 kg',
      grade: 'Grade A',
      targetPrice: '₹24 / kg',
      responses: [
        {
          id: 'resp-9999-2-1',
          fpoId: 'fpo-delta-agro',
          fpoName: 'Delta Agro FPO',
          location: 'Mandapeta',
          status: 'ACCEPTED',
          statusLabel: 'ACCEPTED',
          producePrice: '₹23.50 / kg',
          producePriceVal: 23.5,
          transportCost: '₹800',
          transportCostVal: 800,
          deliveredTotal: '₹12,550',
          deliveredTotalVal: 12550,
          effectivePrice: '₹25.10 / kg',
          deliveryDate: '25 Sep 2026'
        }
      ]
    },
    {
      itemId: 'item-3',
      crop: 'Green Chilli',
      quantity: '200 kg',
      grade: 'Grade A',
      targetPrice: '₹45 / kg',
      responses: [
        {
          id: 'resp-9999-3-1',
          fpoId: 'fpo-godavari',
          fpoName: 'Godavari Farmers FPO',
          location: 'Rajamahendravaram',
          status: 'ACCEPTED',
          statusLabel: 'ACCEPTED',
          producePrice: '₹44 / kg',
          producePriceVal: 44,
          transportCost: '₹600',
          transportCostVal: 600,
          deliveredTotal: '₹9,400',
          deliveredTotalVal: 9400,
          effectivePrice: '₹47.00 / kg',
          deliveryDate: '25 Sep 2026'
        }
      ]
    }
  ]
}

saveNewDemand(multiItemDemand)

// Select FPOs item-by-item:
// Tomato -> Godavari
// Onion -> Delta Agro
// Green Chilli -> Godavari
const selections = {
  'item-1': 'resp-9999-1-1',
  'item-2': 'resp-9999-2-1',
  'item-3': 'resp-9999-3-1'
}

const res = confirmProcurementOrder('REQ-9999', selections)
console.log('Multi-Item Order Created:', res.orderId)
const updated = getDemandById('REQ-9999')
console.log('Tender Status:', updated.status)

updated.items.forEach((item, i) => {
  console.log(`Item ${i + 1} (${item.crop}): Confirmed Supplier=${item.confirmedFpoName}, Status=${item.status}`)
  item.responses.forEach((r) => {
    console.log(`  - ${r.fpoName}: ${r.status}`)
  })
})

const unselectedTomatoOffer = updated.items[0].responses.find(r => r.id === 'resp-9999-1-2')
if (unselectedTomatoOffer.status !== 'UNAVAILABLE') {
  throw new Error(`Expected Delta Agro on Tomato to be UNAVAILABLE, got ${unselectedTomatoOffer.status}`)
}

console.log('MULTI-ITEM TEST PASSED! ✓')
