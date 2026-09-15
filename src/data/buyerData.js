export const buyerProfile = {
  id: 'BUY-204',
  companyName: 'AgroFresh Enterprise',
  contactPerson: 'Anita Rao',
  role: 'Senior Procurement Officer',
  buyerType: 'Institutional Processor & Retail Aggregator',
  gstin: '37AABCA1234F1Z8',
  location: 'Visakhapatnam / Vijayawada, Andhra Pradesh',
  rating: '4.9/5',
  verified: true,
  activeContracts: 4,
}

export const buyerDashboardKPIs = [
  {
    id: 'active-requests',
    title: 'Active Requests',
    value: '4',
    change: '2 receiving offers',
    trend: 'up',
    icon: 'receipt_long',
    badge: 'Live RFQs',
    color: 'emerald'
  },
  {
    id: 'offers-received',
    title: 'Offers Received',
    value: '18',
    change: '6 new offers today',
    trend: 'up',
    icon: 'local_offer',
    badge: 'Action Needed',
    color: 'blue'
  },
  {
    id: 'active-orders',
    title: 'Active Orders',
    value: '3',
    change: '2 en route from hubs',
    trend: 'neutral',
    icon: 'local_shipping',
    badge: 'In Transit',
    color: 'amber'
  },
  {
    id: 'completed-orders',
    title: 'Completed Orders',
    value: '24',
    change: '99.2% on-time fulfillment',
    trend: 'up',
    icon: 'task_alt',
    badge: 'All-Time',
    color: 'slate'
  }
]


export function calculateOfferFinancials(quantity, producePrice, transportCost) {
  const qty = Number(quantity) || 1000
  const pPrice = Number(producePrice) || 27
  const tCost = Number(transportCost !== undefined ? transportCost : 1500)
  const pValue = Math.round(pPrice * qty)
  const dTotal = pValue + tCost
  const effPrice = qty > 0 ? (dTotal / qty) : pPrice

  return {
    producePrice: `₹${pPrice.toFixed(2)} / kg`,
    producePriceVal: pPrice,
    produceValue: `₹${pValue.toLocaleString('en-IN')}`,
    produceValueVal: pValue,
    transportCost: `₹${tCost.toLocaleString('en-IN')}`,
    transportCostVal: tCost,
    deliveredTotal: `₹${dTotal.toLocaleString('en-IN')}`,
    deliveredTotalVal: dTotal,
    effectivePrice: `₹${effPrice.toFixed(2)} / kg`,
    effectivePriceVal: Number(effPrice.toFixed(2)),
    transportStatus: 'Recorded',
  }
}

export const initialProcurementRequests = [
  {
    id: 'REQ-1032',
    buyer: 'AgroFresh Enterprise',
    deliveryDate: '30 Sep 2026',
    deliveryLocation: 'Vijayawada Central Processing Dock',
    notes: 'Optical grading Grade A required. Single product sent to multiple FPOs.',
    status: 'Partially Responded',
    statusVariant: 'warning',
    createdDate: '14 Sep 2026, 11:30 AM',
    items: [
      {
        itemId: 'item-1032-1',
        crop: 'Tomato',
        variety: 'Hybrid Roma',
        quantity: '1,000 kg',
        quantityVal: 1000,
        unit: 'kg',
        grade: 'Grade A',
        targetPrice: '₹28 / kg',
        qualitySpecs: 'Optical grading Grade A required, max 5% moisture tolerance.',
        packaging: 'Ventilated 20kg crates',
        selectedFposCount: '3 FPOs requested',
        selectedFpoOfferId: null,
        responses: [
          {
            id: 'resp-1032-1-1',
            fpoId: 'fpo-godavari',
            fpoName: 'Godavari Farmers FPO',
            location: 'Rajamahendravaram, East Godavari',
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹27.00 / kg',
            producePriceVal: 27,
            produceValue: '₹27,000',
            produceValueVal: 27000,
            transportCost: '₹1,500',
            transportCostVal: 1500,
            deliveredTotal: '₹28,500',
            deliveredTotalVal: 28500,
            effectivePrice: '₹28.50 / kg',
            effectivePriceVal: 28.50,
            transportStatus: 'Recorded',
            offeredQty: '1,000 kg',
            offeredPrice: '₹27.50 / kg',
            deliveryDate: '30 Sep 2026',
            hub: 'Rajahmundry Central Hub',
            notes: 'Full 1,000 kg Grade A volume allocated. Ready for direct dock dispatch.',
            timestamp: '14 Sep 2026, 11:45 AM',
            contact: 'K. Venkateswara Rao'
          },
          {
            id: 'resp-1032-1-2',
            fpoId: 'fpo-delta-agro',
            fpoName: 'Delta Agro FPO',
            location: 'East Godavari (Mandapeta Hub)',
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹27.50 / kg',
            producePriceVal: 27.5,
            produceValue: '₹27,500',
            produceValueVal: 27500,
            transportCost: '₹700',
            transportCostVal: 700,
            deliveredTotal: '₹28,200',
            deliveredTotalVal: 28200,
            effectivePrice: '₹28.20 / kg',
            effectivePriceVal: 28.20,
            transportStatus: 'Recorded',
            offeredQty: '1,000 kg',
            offeredPrice: '₹28.00 / kg',
            deliveryDate: '30 Sep 2026',
            hub: 'Mandapeta Agro Dock',
            notes: 'Farm lot supply available for dispatch.',
            timestamp: '14 Sep 2026, 11:50 AM',
            contact: 'S. Ramakrishna Raju'
          },
          {
            id: 'resp-1032-1-3',
            fpoId: 'fpo-green-valley',
            fpoName: 'Green Valley FPO',
            location: 'West Godavari (Tadepalligudem)',
            status: 'BACK_OFFER',
            statusLabel: 'BACK OFFER',
            statusStyle: 'bg-[#fceace] text-[#683600] border border-[#c3cda7]',
            producePrice: '₹26.80 / kg',
            producePriceVal: 26.8,
            produceValue: '₹26,800',
            produceValueVal: 26800,
            transportCost: '₹2,000',
            transportCostVal: 2000,
            deliveredTotal: '₹28,800',
            deliveredTotalVal: 28800,
            effectivePrice: '₹28.80 / kg',
            effectivePriceVal: 28.80,
            transportStatus: 'Recorded',
            requestedQty: '1,000 kg',
            offeredQty: '1,000 kg',
            counterPrice: '₹29.00 / kg',
            deliveryDate: '01 Oct 2026',
            hub: 'Tadepalligudem Horti Hub',
            notes: 'Counter price ₹29/kg due to peak cold storage staging. Delivery shifted by +1 day.',
            counterReasons: ['Special cold staging rate (+₹1/kg)'],
            timestamp: '14 Sep 2026, 11:55 AM',
            contact: 'B. Lakshmi Narayana'
          }
        ]
      }
    ]
  },
  {
    id: 'REQ-1033',
    buyer: 'AgroFresh Enterprise',
    deliveryDate: '02 Oct 2026',
    deliveryLocation: 'Vijayawada Central Processing Dock',
    notes: 'Multi-commodity procurement tender.',
    status: 'Partially Responded',
    statusVariant: 'warning',
    createdDate: '14 Sep 2026, 12:00 PM',
    items: [
      {
        itemId: 'item-1033-1',
        crop: 'Tomato',
        variety: 'Hybrid Roma',
        quantity: '1,000 kg',
        quantityVal: 1000,
        unit: 'kg',
        grade: 'Grade A',
        targetPrice: '₹28 / kg',
        qualitySpecs: 'Optical grading Grade A required.',
        packaging: 'Ventilated 20kg crates',
        selectedFposCount: '3 FPOs requested',
        selectedFpoOfferId: null,
        responses: [
          {
            id: 'resp-1033-1-1',
            fpoId: 'fpo-godavari',
            fpoName: 'Godavari Farmers FPO',
            location: 'Rajamahendravaram, East Godavari',
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹27.00 / kg',
            producePriceVal: 27,
            produceValue: '₹27,000',
            produceValueVal: 27000,
            transportCost: '₹1,500',
            transportCostVal: 1500,
            deliveredTotal: '₹28,500',
            deliveredTotalVal: 28500,
            effectivePrice: '₹28.50 / kg',
            effectivePriceVal: 28.50,
            transportStatus: 'Recorded',
            offeredQty: '1,000 kg',
            offeredPrice: '₹27.50 / kg',
            deliveryDate: '02 Oct 2026',
            hub: 'Rajahmundry Central Hub',
            notes: 'Full 1,000 kg Grade A volume allocated.',
            timestamp: '14 Sep 2026'
          },
          {
            id: 'resp-1033-1-2',
            fpoId: 'fpo-delta-agro',
            fpoName: 'Delta Agro FPO',
            location: 'East Godavari (Mandapeta Hub)',
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹27.50 / kg',
            producePriceVal: 27.5,
            produceValue: '₹27,500',
            produceValueVal: 27500,
            transportCost: '₹700',
            transportCostVal: 700,
            deliveredTotal: '₹28,200',
            deliveredTotalVal: 28200,
            effectivePrice: '₹28.20 / kg',
            effectivePriceVal: 28.20,
            transportStatus: 'Recorded',
            offeredQty: '1,000 kg',
            offeredPrice: '₹28.00 / kg',
            deliveryDate: '02 Oct 2026',
            hub: 'Mandapeta Agro Dock',
            notes: 'Available on schedule.',
            timestamp: '14 Sep 2026'
          },
          {
            id: 'resp-1033-1-3',
            fpoId: 'fpo-green-valley',
            fpoName: 'Green Valley FPO',
            location: 'West Godavari (Tadepalligudem)',
            status: 'BACK_OFFER',
            statusLabel: 'BACK OFFER',
            statusStyle: 'bg-[#fceace] text-[#683600] border border-[#c3cda7]',
            producePrice: '₹26.80 / kg',
            producePriceVal: 26.8,
            produceValue: '₹26,800',
            produceValueVal: 26800,
            transportCost: '₹2,000',
            transportCostVal: 2000,
            deliveredTotal: '₹28,800',
            deliveredTotalVal: 28800,
            effectivePrice: '₹28.80 / kg',
            effectivePriceVal: 28.80,
            transportStatus: 'Recorded',
            requestedQty: '1,000 kg',
            offeredQty: '1,000 kg',
            counterPrice: '₹29.00 / kg',
            deliveryDate: '03 Oct 2026',
            hub: 'Tadepalligudem Horti Hub',
            notes: 'Cold staging counter rate ₹29/kg.',
            timestamp: '14 Sep 2026'
          }
        ]
      },
      {
        itemId: 'item-1033-2',
        crop: 'Onion',
        variety: 'Nasik Red',
        quantity: '500 kg',
        quantityVal: 500,
        unit: 'kg',
        grade: 'Grade A',
        targetPrice: '₹24 / kg',
        qualitySpecs: 'Dry cured, sorted, 45-55mm uniform diameter.',
        packaging: 'Mesh bags 25kg',
        selectedFposCount: '2 FPOs requested',
        selectedFpoOfferId: null,
        responses: [
          {
            id: 'resp-1033-2-1',
            fpoId: 'fpo-delta-agro',
            fpoName: 'Delta Agro FPO',
            location: 'East Godavari (Mandapeta Hub)',
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹24.00 / kg',
            producePriceVal: 24,
            produceValue: '₹12,000',
            produceValueVal: 12000,
            transportCost: '₹800',
            transportCostVal: 800,
            deliveredTotal: '₹12,800',
            deliveredTotalVal: 12800,
            effectivePrice: '₹25.60 / kg',
            effectivePriceVal: 25.60,
            transportStatus: 'Recorded',
            offeredQty: '500 kg',
            offeredPrice: '₹23.50 / kg',
            deliveryDate: '02 Oct 2026',
            hub: 'Mandapeta Agro Dock',
            notes: 'Cured red onions Grade A available.',
            timestamp: '14 Sep 2026'
          }
        ]
      },
      {
        itemId: 'item-1033-3',
        crop: 'Green Chilli',
        variety: 'G4 Hot',
        quantity: '200 kg',
        quantityVal: 200,
        unit: 'kg',
        grade: 'Grade A',
        targetPrice: '₹45 / kg',
        qualitySpecs: 'Dark green, fresh harvested.',
        packaging: '5kg corrugated boxes',
        selectedFposCount: '2 FPOs requested',
        selectedFpoOfferId: null,
        responses: [
          {
            id: 'resp-1033-3-1',
            fpoId: 'fpo-godavari',
            fpoName: 'Godavari Farmers FPO',
            location: 'Rajamahendravaram, East Godavari',
            status: 'NO_RESPONSE',
            statusLabel: 'NO RESPONSE',
            statusStyle: 'bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7]',
            producePrice: '₹27.00 / kg',
            producePriceVal: 27,
            produceValue: '₹27,000',
            produceValueVal: 27000,
            transportCost: '₹1,500',
            transportCostVal: 1500,
            deliveredTotal: '₹28,500',
            deliveredTotalVal: 28500,
            effectivePrice: '₹28.50 / kg',
            effectivePriceVal: 28.50,
            transportStatus: 'Recorded',
            notes: 'Dispatched to cluster manager. Waiting for morning harvest count.',
            timestamp: '14 Sep 2026'
          }
        ]
      }
    ]
  },
  {
    id: 'REQ-1027',
    buyer: 'AgroFresh Enterprise',
    deliveryDate: '25 Sep 2026',
    deliveryLocation: 'Vijayawada Processing Hub Dock',
    notes: 'All items to be received before 10:00 AM at Bay 03. Optical grading report mandatory.',
    status: 'Partially Responded',
    statusVariant: 'warning',
    createdDate: '14 Sep 2026, 09:00 AM',
    items: [
      {
        itemId: 'item-1',
        crop: 'Tomato',
        variety: 'Hybrid Roma',
        quantity: '1,000 kg',
        quantityVal: 1000,
        unit: 'kg',
        grade: 'Grade A',
        targetPrice: '₹28 / kg',
        qualitySpecs: 'Optical grading Grade A required, max 5% moisture tolerance.',
        packaging: 'Ventilated 20kg crates',
        selectedFposCount: '2 FPOs requested',
        selectedFpoOfferId: null,
        responses: [{
          id: 'resp-1027-1-1',
          fpoId: 'fpo-godavari',
          fpoName: 'Godavari Farmers FPO',
          location: 'Rajamahendravaram, East Godavari',
          status: 'ACCEPTED',
          statusLabel: 'ACCEPTED',
          statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹27.00 / kg',
            producePriceVal: 27,
            produceValue: '₹27,000',
            produceValueVal: 27000,
            transportCost: '₹1,500',
            transportCostVal: 1500,
            deliveredTotal: '₹28,500',
            deliveredTotalVal: 28500,
            effectivePrice: '₹28.50 / kg',
            effectivePriceVal: 28.50,
            transportStatus: 'Recorded',
          offeredQty: '1,000 kg',
          offeredPrice: '₹27.50 / kg',
          deliveryDate: '25 Sep 2026',
          hub: 'Rajahmundry Central Hub #01',
          notes: 'Full 1,000 kg Grade A Roma tomatoes allocated across member farmer clusters. Crates loaded on reefer van for 25 Sep morning dispatch.',
          timestamp: '14 Sep 2026, 10:15 AM',
          contact: 'K. Venkateswara Rao (+91 883 245 8901)'
        },
        {
          id: 'resp-1027-1-2',
          fpoId: 'fpo-green-valley',
          fpoName: 'Green Valley FPO',
          location: 'West Godavari (Tadepalligudem)',
          status: 'ACCEPTED',
          statusLabel: 'ACCEPTED',
          statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹26.80 / kg',
            producePriceVal: 26.8,
            produceValue: '₹26,800',
            produceValueVal: 26800,
            transportCost: '₹2,000',
            transportCostVal: 2000,
            deliveredTotal: '₹28,800',
            deliveredTotalVal: 28800,
            effectivePrice: '₹28.80 / kg',
            effectivePriceVal: 28.80,
            transportStatus: 'Recorded',
          offeredQty: '1,000 kg',
          offeredPrice: '₹28.00 / kg',
          deliveryDate: '25 Sep 2026',
          hub: 'Tadepalligudem Horti Hub',
          notes: 'Grade A optical sorted tomatoes available for direct dock delivery on 25 Sep.',
          timestamp: '14 Sep 2026, 10:30 AM',
          contact: 'B. Lakshmi Narayana (+91 8818 224 510)'
        },
        {
          id: 'resp-1027-1-3',
          fpoId: 'fpo-delta-agro',
          fpoName: 'Delta Agro FPO',
          location: 'East Godavari (Mandapeta Hub)',
          status: 'BACK_OFFER',
          statusLabel: 'BACK OFFER',
          statusStyle: 'bg-[#fceace] text-[#683600] border border-[#c3cda7]',
            producePrice: '₹27.50 / kg',
            producePriceVal: 27.5,
            produceValue: '₹27,500',
            produceValueVal: 27500,
            transportCost: '₹700',
            transportCostVal: 700,
            deliveredTotal: '₹28,200',
            deliveredTotalVal: 28200,
            effectivePrice: '₹28.20 / kg',
            effectivePriceVal: 28.20,
            transportStatus: 'Recorded',
          requestedQty: '1,000 kg',
          offeredQty: '1,000 kg',
          counterPrice: '₹29.00 / kg',
          deliveryDate: '26 Sep 2026',
          hub: 'Mandapeta Agro Dock',
          notes: 'Proposes counter rate of ₹29/kg (+₹1/kg over target) due to peak cold storage staging. Delivery shifted by +1 day (26 Sep).',
          counterReasons: [
            'Rate adjusted to ₹29/kg due to specialized cold staging',
            'Delivery shifted by +1 day (26 Sep) for optimal field cooling'
          ],
          timestamp: '14 Sep 2026, 10:45 AM',
          contact: 'S. Ramakrishna Raju (+91 884 238 7765)'
        }
        ]
      },
      {
        itemId: 'item-2',
        crop: 'Onion',
        variety: 'Nasik Red',
        quantity: '500 kg',
        quantityVal: 500,
        unit: 'kg',
        grade: 'Grade A',
        targetPrice: '₹24 / kg',
        qualitySpecs: 'Dry cured, sorted, 45-55mm uniform diameter.',
        packaging: 'Mesh bags 25kg',
        selectedFposCount: '2 FPOs requested',
        selectedFpoOfferId: null,
        responses: [
          {
            id: 'resp-1027-2-1',
            fpoId: 'fpo-delta-agro',
            fpoName: 'Delta Agro FPO',
            location: 'East Godavari (Mandapeta Hub)',
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹24.00 / kg',
            producePriceVal: 24,
            produceValue: '₹12,000',
            produceValueVal: 12000,
            transportCost: '₹800',
            transportCostVal: 800,
            deliveredTotal: '₹12,800',
            deliveredTotalVal: 12800,
            effectivePrice: '₹25.60 / kg',
            effectivePriceVal: 25.60,
            transportStatus: 'Recorded',
            offeredQty: '500 kg',
            offeredPrice: '₹23.50 / kg',
            deliveryDate: '25 Sep 2026',
            hub: 'Mandapeta Agro Dock',
            notes: 'Cured red onions Grade A available at Mandapeta depot. Rate ₹23.50/kg accepted.',
            timestamp: '14 Sep 2026, 11:00 AM',
            contact: 'S. Ramakrishna Raju (+91 884 238 7765)'
          },
          {
            id: 'resp-1027-2-2',
            fpoId: 'fpo-green-valley',
            fpoName: 'Green Valley FPO',
            location: 'West Godavari (Tadepalligudem)',
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹24.00 / kg',
            producePriceVal: 24,
            produceValue: '₹12,000',
            produceValueVal: 12000,
            transportCost: '₹800',
            transportCostVal: 800,
            deliveredTotal: '₹12,800',
            deliveredTotalVal: 12800,
            effectivePrice: '₹25.60 / kg',
            effectivePriceVal: 25.60,
            transportStatus: 'Recorded',
            offeredQty: '500 kg',
            offeredPrice: '₹24.00 / kg',
            deliveryDate: '25 Sep 2026',
            hub: 'Tadepalligudem Horti Hub',
            notes: 'Full volume confirmed for 25 Sep delivery.',
            timestamp: '14 Sep 2026, 11:15 AM',
            contact: 'B. Lakshmi Narayana (+91 8818 224 510)'
          }
        ]
      },
      {
        itemId: 'item-3',
        crop: 'Green Chilli',
        variety: 'G4 Hot',
        quantity: '200 kg',
        quantityVal: 200,
        unit: 'kg',
        grade: 'Grade A',
        targetPrice: '₹45 / kg',
        qualitySpecs: 'Dark green, fresh harvested, uniform length.',
        packaging: '5kg corrugated boxes',
        selectedFposCount: '2 FPOs requested',
        selectedFpoOfferId: null,
        responses: [
          {
            id: 'resp-1027-3-1',
            fpoId: 'fpo-godavari',
            fpoName: 'Godavari Farmers FPO',
            location: 'Rajamahendravaram, East Godavari',
            status: 'NO_RESPONSE',
            statusLabel: 'NO RESPONSE',
            statusStyle: 'bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7]',
            producePrice: '₹45.00 / kg',
            producePriceVal: 45,
            produceValue: '₹9,000',
            produceValueVal: 9000,
            transportCost: '₹600',
            transportCostVal: 600,
            deliveredTotal: '₹9,600',
            deliveredTotalVal: 9600,
            effectivePrice: '₹48.00 / kg',
            effectivePriceVal: 48.00,
            transportStatus: 'Recorded',
            requestSentDate: '14 Sep 2026',
            notes: 'Dispatched to Korukonda chilli cluster manager. Waiting for morning harvest count.',
            timestamp: '14 Sep 2026, 09:00 AM',
            contact: 'K. Venkateswara Rao (+91 883 245 8901)'
          },
          {
            id: 'resp-1027-3-2',
            fpoId: 'fpo-krishna-valley',
            fpoName: 'Krishna Valley Agro FPO',
            location: 'Krishna District (Gudivada Hub)',
            status: 'BACK_OFFER',
            statusLabel: 'BACK OFFER',
            statusStyle: 'bg-[#fceace] text-[#683600] border border-[#c3cda7]',
            producePrice: '₹45.00 / kg',
            producePriceVal: 45,
            produceValue: '₹9,000',
            produceValueVal: 9000,
            transportCost: '₹600',
            transportCostVal: 600,
            deliveredTotal: '₹9,600',
            deliveredTotalVal: 9600,
            effectivePrice: '₹48.00 / kg',
            effectivePriceVal: 48.00,
            transportStatus: 'Recorded',
            requestedQty: '200 kg',
            offeredQty: '200 kg',
            counterPrice: '₹47.00 / kg',
            deliveryDate: '25 Sep 2026',
            hub: 'Gudivada Main Depot',
            notes: 'Counter price ₹47/kg for export optical graded G4 Chilli. Same-day 25 Sep dispatch guaranteed.',
            counterReasons: [
              'Premium export selection surcharge (+₹2/kg)',
              'Guaranteed same-day 25 Sep morning dispatch'
            ],
            timestamp: '14 Sep 2026, 11:30 AM',
            contact: 'P. Sambasiva Rao (+91 866 284 3190)'
          }
        ]
      }
    ]
  },
  {
    id: 'REQ-1030',
    buyer: 'AgroFresh Enterprise',
    deliveryDate: '28 Sep 2026',
    deliveryLocation: 'Vijayawada Central Processing Dock',
    notes: 'Standard optical grading report required. Direct dock dispatch before 10:00 AM.',
    status: 'Partially Responded',
    statusVariant: 'warning',
    createdDate: '14 Sep 2026, 10:00 AM',
    items: [
      {
        itemId: 'item-1030-1',
        crop: 'Tomato',
        variety: 'Hybrid Roma',
        quantity: '1,000 kg',
        quantityVal: 1000,
        unit: 'kg',
        grade: 'Grade A',
        targetPrice: '₹28 / kg',
        qualitySpecs: 'Optical grading Grade A required.',
        packaging: 'Ventilated 20kg crates',
        selectedFposCount: '3 FPOs requested',
        selectedFpoOfferId: null,
        responses: [
          {
            id: 'resp-1030-1-1',
            fpoId: 'fpo-godavari',
            fpoName: 'Godavari Farmers FPO',
            location: 'Rajamahendravaram, East Godavari',
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹27.00 / kg',
            producePriceVal: 27,
            produceValue: '₹27,000',
            produceValueVal: 27000,
            transportCost: '₹1,500',
            transportCostVal: 1500,
            deliveredTotal: '₹28,500',
            deliveredTotalVal: 28500,
            effectivePrice: '₹28.50 / kg',
            effectivePriceVal: 28.50,
            transportStatus: 'Recorded',
            offeredQty: '1,000 kg',
            offeredPrice: '₹27.50 / kg',
            deliveryDate: '28 Sep 2026',
            hub: 'Rajahmundry Central Hub',
            notes: 'Full 1,000 kg Grade A volume allocated. Dispatch scheduled.',
            timestamp: '14 Sep 2026, 10:15 AM',
            contact: 'K. Venkateswara Rao'
          },
          {
            id: 'resp-1030-1-2',
            fpoId: 'fpo-delta-agro',
            fpoName: 'Delta Agro FPO',
            location: 'East Godavari (Mandapeta Hub)',
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹27.50 / kg',
            producePriceVal: 27.5,
            produceValue: '₹27,500',
            produceValueVal: 27500,
            transportCost: '₹700',
            transportCostVal: 700,
            deliveredTotal: '₹28,200',
            deliveredTotalVal: 28200,
            effectivePrice: '₹28.20 / kg',
            effectivePriceVal: 28.20,
            transportStatus: 'Recorded',
            offeredQty: '1,000 kg',
            offeredPrice: '₹28.00 / kg',
            deliveryDate: '28 Sep 2026',
            hub: 'Mandapeta Agro Dock',
            notes: 'Direct farm lot supply available on 28 Sep.',
            timestamp: '14 Sep 2026, 10:30 AM',
            contact: 'S. Ramakrishna Raju'
          },
          {
            id: 'resp-1030-1-3',
            fpoId: 'fpo-green-valley',
            fpoName: 'Green Valley FPO',
            location: 'West Godavari (Tadepalligudem)',
            status: 'BACK_OFFER',
            statusLabel: 'BACK OFFER',
            statusStyle: 'bg-[#fceace] text-[#683600] border border-[#c3cda7]',
            producePrice: '₹26.80 / kg',
            producePriceVal: 26.8,
            produceValue: '₹26,800',
            produceValueVal: 26800,
            transportCost: '₹2,000',
            transportCostVal: 2000,
            deliveredTotal: '₹28,800',
            deliveredTotalVal: 28800,
            effectivePrice: '₹28.80 / kg',
            effectivePriceVal: 28.80,
            transportStatus: 'Recorded',
            requestedQty: '1,000 kg',
            offeredQty: '1,000 kg',
            counterPrice: '₹29.00 / kg',
            deliveryDate: '29 Sep 2026',
            hub: 'Tadepalligudem Horti Hub',
            notes: 'Commercial back offer proposed with +₹1/kg adjustment.',
            counterReasons: ['Special cold staging rate (+₹1/kg)'],
            timestamp: '14 Sep 2026, 10:45 AM',
            contact: 'B. Lakshmi Narayana'
          }
        ]
      }
    ]
  },
  {
    id: 'REQ-1031',
    buyer: 'AgroFresh Enterprise',
    deliveryDate: '29 Sep 2026',
    deliveryLocation: 'Guntur Aggregation Dock',
    notes: 'Multi-item delivery.',
    status: 'Partially Responded',
    statusVariant: 'warning',
    createdDate: '14 Sep 2026, 11:00 AM',
    items: [
      {
        itemId: 'item-1031-1',
        crop: 'Tomato',
        variety: 'Hybrid Roma',
        quantity: '1,000 kg',
        quantityVal: 1000,
        unit: 'kg',
        grade: 'Grade A',
        targetPrice: '₹28 / kg',
        qualitySpecs: 'Optical grading Grade A required.',
        packaging: '20kg crates',
        selectedFposCount: '2 FPOs requested',
        selectedFpoOfferId: null,
        responses: [
          {
            id: 'resp-1031-1-1',
            fpoId: 'fpo-godavari',
            fpoName: 'Godavari Farmers FPO',
            location: 'Rajamahendravaram, East Godavari',
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹27.00 / kg',
            producePriceVal: 27,
            produceValue: '₹27,000',
            produceValueVal: 27000,
            transportCost: '₹1,500',
            transportCostVal: 1500,
            deliveredTotal: '₹28,500',
            deliveredTotalVal: 28500,
            effectivePrice: '₹28.50 / kg',
            effectivePriceVal: 28.50,
            transportStatus: 'Recorded',
            offeredQty: '1,000 kg',
            offeredPrice: '₹27.50 / kg',
            deliveryDate: '29 Sep 2026',
            hub: 'Rajahmundry Central Hub',
            notes: 'Full volume available for delivery.',
            timestamp: '14 Sep 2026',
            contact: 'K. Venkateswara Rao'
          },
          {
            id: 'resp-1031-1-2',
            fpoId: 'fpo-delta-agro',
            fpoName: 'Delta Agro FPO',
            location: 'East Godavari (Mandapeta Hub)',
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹27.50 / kg',
            producePriceVal: 27.5,
            produceValue: '₹27,500',
            produceValueVal: 27500,
            transportCost: '₹700',
            transportCostVal: 700,
            deliveredTotal: '₹28,200',
            deliveredTotalVal: 28200,
            effectivePrice: '₹28.20 / kg',
            effectivePriceVal: 28.20,
            transportStatus: 'Recorded',
            offeredQty: '1,000 kg',
            offeredPrice: '₹28.00 / kg',
            deliveryDate: '29 Sep 2026',
            hub: 'Mandapeta Agro Dock',
            notes: 'Available for scheduled delivery.',
            timestamp: '14 Sep 2026',
            contact: 'S. Ramakrishna Raju'
          }
        ]
      },
      {
        itemId: 'item-1031-2',
        crop: 'Onion',
        variety: 'Nasik Red',
        quantity: '500 kg',
        quantityVal: 500,
        unit: 'kg',
        grade: 'Grade A',
        targetPrice: '₹24 / kg',
        qualitySpecs: 'Dry cured, sorted.',
        packaging: 'Mesh bags 25kg',
        selectedFposCount: '2 FPOs requested',
        selectedFpoOfferId: null,
        responses: [
          {
            id: 'resp-1031-2-1',
            fpoId: 'fpo-delta-agro',
            fpoName: 'Delta Agro FPO',
            location: 'East Godavari (Mandapeta Hub)',
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹24.00 / kg',
            producePriceVal: 24,
            produceValue: '₹12,000',
            produceValueVal: 12000,
            transportCost: '₹800',
            transportCostVal: 800,
            deliveredTotal: '₹12,800',
            deliveredTotalVal: 12800,
            effectivePrice: '₹25.60 / kg',
            effectivePriceVal: 25.60,
            transportStatus: 'Recorded',
            offeredQty: '500 kg',
            offeredPrice: '₹23.50 / kg',
            deliveryDate: '29 Sep 2026',
            hub: 'Mandapeta Agro Dock',
            notes: 'Grade A onions available.',
            timestamp: '14 Sep 2026',
            contact: 'S. Ramakrishna Raju'
          },
          {
            id: 'resp-1031-2-2',
            fpoId: 'fpo-green-valley',
            fpoName: 'Green Valley FPO',
            location: 'West Godavari (Tadepalligudem)',
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹24.00 / kg',
            producePriceVal: 24,
            produceValue: '₹12,000',
            produceValueVal: 12000,
            transportCost: '₹800',
            transportCostVal: 800,
            deliveredTotal: '₹12,800',
            deliveredTotalVal: 12800,
            effectivePrice: '₹25.60 / kg',
            effectivePriceVal: 25.60,
            transportStatus: 'Recorded',
            offeredQty: '500 kg',
            offeredPrice: '₹24.00 / kg',
            deliveryDate: '29 Sep 2026',
            hub: 'Tadepalligudem Horti Hub',
            notes: 'Confirmed for 29 Sep.',
            timestamp: '14 Sep 2026',
            contact: 'B. Lakshmi Narayana'
          }
        ]
      }
    ]
  },
  {
    id: 'REQ-1026',
    buyer: 'FreshMart Foods',
    deliveryDate: '20 Sep 2026',
    deliveryLocation: 'Hyderabad Aggregation Dock #02',
    notes: 'Direct farm lot supply with certified electronic weighment slips.',
    status: 'Waiting Response',
    statusVariant: 'warning',
    createdDate: '14 Sep 2026, 08:30 AM',
    items: [
      {
        itemId: 'item-1026-1',
        crop: 'Potato',
        variety: 'Kufri Jyoti',
        quantity: '2,000 kg',
        quantityVal: 2000,
        unit: 'kg',
        grade: 'Grade A',
        targetPrice: '₹20 / kg',
        qualitySpecs: '45-60mm diameter, sorted, unwashed dry.',
        packaging: '50kg gunny bags',
        selectedFposCount: '2 FPOs requested',
        selectedFpoOfferId: null,
        responses: [
          {
            id: 'resp-1026-1-1',
            fpoId: 'fpo-godavari',
            fpoName: 'Godavari Farmers FPO',
            location: 'Rajamahendravaram',
            status: 'NO_RESPONSE',
            statusLabel: 'NO RESPONSE',
            statusStyle: 'bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7]',
            producePrice: '₹27.00 / kg',
            producePriceVal: 27,
            produceValue: '₹27,000',
            produceValueVal: 27000,
            transportCost: '₹1,500',
            transportCostVal: 1500,
            deliveredTotal: '₹28,500',
            deliveredTotalVal: 28500,
            effectivePrice: '₹28.50 / kg',
            effectivePriceVal: 28.50,
            transportStatus: 'Recorded',
            requestSentDate: '14 Sep 2026',
            notes: 'Awaiting FPO manager review and cold storage allocation.',
            timestamp: '14 Sep 2026',
            contact: 'Hub Procurement Desk'
          }
        ]
      },
      {
        itemId: 'item-1026-2',
        crop: 'Onion',
        variety: 'Garwa Red',
        quantity: '1,200 kg',
        quantityVal: 1200,
        unit: 'kg',
        grade: 'Grade A',
        targetPrice: '₹23 / kg',
        qualitySpecs: 'Cured, sorted, 50mm+ diameter.',
        packaging: '25kg mesh bags',
        selectedFposCount: '2 FPOs requested',
        selectedFpoOfferId: null,
        responses: [
          {
            id: 'resp-1026-2-1',
            fpoId: 'fpo-godavari',
            fpoName: 'Godavari Farmers FPO',
            location: 'Rajamahendravaram',
            status: 'NO_RESPONSE',
            statusLabel: 'NO RESPONSE',
            statusStyle: 'bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7]',
            producePrice: '₹27.00 / kg',
            producePriceVal: 27,
            produceValue: '₹27,000',
            produceValueVal: 27000,
            transportCost: '₹1,500',
            transportCostVal: 1500,
            deliveredTotal: '₹28,500',
            deliveredTotalVal: 28500,
            effectivePrice: '₹28.50 / kg',
            effectivePriceVal: 28.50,
            transportStatus: 'Recorded',
            requestSentDate: '14 Sep 2026',
            notes: 'Awaiting FPO manager review and member harvest intake schedule.',
            timestamp: '14 Sep 2026',
            contact: 'Hub Procurement Desk'
          }
        ]
      }
    ]
  },
  {
    id: 'REQ-1024',
    buyer: 'AgroFresh Enterprise',
    deliveryDate: '18 Sep 2026',
    deliveryLocation: 'Vijayawada Central Processing Hub',
    notes: 'Urgent weekend supply batch.',
    status: 'Receiving Offers',
    statusVariant: 'warning',
    createdDate: '14 Sep 2026, 09:15 AM',
    items: [
      {
        itemId: 'item-1024-1',
        crop: 'Tomato',
        variety: 'Hybrid Roma / Himsona',
        quantity: '1,000 kg',
        quantityVal: 1000,
        unit: 'kg',
        grade: 'Grade A',
        targetPrice: '₹28 / kg',
        qualitySpecs: 'Standard optical sorting required.',
        packaging: '20kg Crates',
        selectedFposCount: '3 FPOs requested',
        responses: [
          {
            id: 'resp-1024-1',
            fpoId: 'fpo-godavari',
            fpoName: 'Godavari Farmers FPO',
            location: 'Rajamahendravaram, East Godavari',
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹27.00 / kg',
            producePriceVal: 27,
            produceValue: '₹27,000',
            produceValueVal: 27000,
            transportCost: '₹1,500',
            transportCostVal: 1500,
            deliveredTotal: '₹28,500',
            deliveredTotalVal: 28500,
            effectivePrice: '₹28.50 / kg',
            effectivePriceVal: 28.50,
            transportStatus: 'Recorded',
            offeredQty: '1,000 kg',
            offeredPrice: '₹28.00 / kg',
            deliveryDate: '18 Sep 2026',
            hub: 'Rajahmundry Central Hub',
            notes: 'Allocated from Kadiyam cluster. Delivery guaranteed by 08:00 AM.',
            timestamp: '14 Sep 2026, 09:45 AM',
            contact: 'K. Venkateswara Rao'
          },
          {
            id: 'resp-1024-2',
            fpoId: 'fpo-delta-agro',
            fpoName: 'Delta Agro FPO',
            location: 'East Godavari',
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹27.50 / kg',
            producePriceVal: 27.5,
            produceValue: '₹27,500',
            produceValueVal: 27500,
            transportCost: '₹700',
            transportCostVal: 700,
            deliveredTotal: '₹28,200',
            deliveredTotalVal: 28200,
            effectivePrice: '₹28.20 / kg',
            effectivePriceVal: 28.20,
            transportStatus: 'Recorded',
            offeredQty: '1,000 kg',
            offeredPrice: '₹27.00 / kg',
            deliveryDate: '18 Sep 2026',
            hub: 'Mandapeta Agro Dock',
            notes: 'Most competitive price offer with direct dock transport.',
            timestamp: '14 Sep 2026, 10:10 AM',
            contact: 'S. Ramakrishna Raju'
          },
          {
            id: 'resp-1024-3',
            fpoId: 'fpo-green-valley',
            fpoName: 'Green Valley FPO',
            location: 'West Godavari',
            status: 'BACK_OFFER',
            statusLabel: 'BACK OFFER',
            statusStyle: 'bg-[#fceace] text-[#683600] border border-[#c3cda7]',
            producePrice: '₹26.80 / kg',
            producePriceVal: 26.8,
            produceValue: '₹26,800',
            produceValueVal: 26800,
            transportCost: '₹2,000',
            transportCostVal: 2000,
            deliveredTotal: '₹28,800',
            deliveredTotalVal: 28800,
            effectivePrice: '₹28.80 / kg',
            effectivePriceVal: 28.80,
            transportStatus: 'Recorded',
            requestedQty: '1,000 kg',
            offeredQty: '900 kg',
            counterPrice: '₹29.00 / kg',
            deliveryDate: '18 Sep 2026',
            hub: 'Tadepalligudem Horti Hub',
            notes: 'Maximum available capacity is 900 kg for 18 Sep. Zero pesticide residue certified.',
            counterReasons: ['Partial volume available (900 kg of requested 1,000 kg)'],
            timestamp: '14 Sep 2026, 10:20 AM',
            contact: 'B. Lakshmi Narayana'
          }
        ]
      }
    ]
  },
  {
    id: 'REQ-1025',
    buyer: 'AgroFresh Enterprise',
    deliveryDate: '22 Sep 2026',
    deliveryLocation: 'Visakhapatnam Warehouse #2',
    notes: 'Cold storage buffer supply.',
    status: 'Draft',
    statusVariant: 'default',
    createdDate: '13 Sep 2026',
    items: [
      {
        itemId: 'item-1025-1',
        crop: 'Onion',
        variety: 'Nasik Red / Garwa',
        quantity: '800 kg',
        quantityVal: 800,
        unit: 'kg',
        grade: 'Grade A (45-55mm)',
        targetPrice: '₹24 / kg',
        qualitySpecs: 'Dry cured, sorted and graded.',
        packaging: 'Mesh Bags 40kg',
        selectedFposCount: '2 FPOs requested',
        responses: [
          {
            id: 'resp-1025-1',
            fpoId: 'fpo-godavari',
            fpoName: 'Godavari Farmers FPO',
            location: 'Rajamahendravaram',
            status: 'NO_RESPONSE',
            statusLabel: 'NO RESPONSE',
            statusStyle: 'bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7]',
            producePrice: '₹24.00 / kg',
            producePriceVal: 24,
            produceValue: '₹12,000',
            produceValueVal: 12000,
            transportCost: '₹800',
            transportCostVal: 800,
            deliveredTotal: '₹12,800',
            deliveredTotalVal: 12800,
            effectivePrice: '₹25.60 / kg',
            effectivePriceVal: 25.60,
            transportStatus: 'Recorded',
            requestSentDate: '13 Sep 2026',
            notes: 'Waiting for onion harvest intake schedule.',
            timestamp: '13 Sep 2026',
            contact: 'K. Venkateswara Rao'
          },
          {
            id: 'resp-1025-2',
            fpoId: 'fpo-sahyadri',
            fpoName: 'Sahyadri Agro Federation',
            location: 'Nashik Belt',
            status: 'NO_RESPONSE',
            statusLabel: 'NO RESPONSE',
            statusStyle: 'bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7]',
            producePrice: '₹27.00 / kg',
            producePriceVal: 27,
            produceValue: '₹27,000',
            produceValueVal: 27000,
            transportCost: '₹1,500',
            transportCostVal: 1500,
            deliveredTotal: '₹28,500',
            deliveredTotalVal: 28500,
            effectivePrice: '₹28.50 / kg',
            effectivePriceVal: 28.50,
            transportStatus: 'Recorded',
            requestSentDate: '13 Sep 2026',
            notes: 'Waiting for Maharashtra inter-state transport consolidation.',
            timestamp: '13 Sep 2026',
            contact: 'Vilas Shinde'
          }
        ]
      }
    ]
  },
  {
    id: 'REQ-1022',
    buyer: 'AgroFresh Enterprise',
    deliveryDate: '20 Sep 2026',
    deliveryLocation: 'Vijayawada Central Processing Hub',
    notes: 'Export standard packhouse required.',
    status: 'Offers Under Review',
    statusVariant: 'info',
    createdDate: '12 Sep 2026',
    items: [
      {
        itemId: 'item-1022-1',
        crop: 'Green Chilli',
        variety: 'G4 Hot Export',
        quantity: '500 kg',
        quantityVal: 500,
        unit: 'kg',
        grade: 'Grade A',
        targetPrice: '₹45 / kg',
        qualitySpecs: 'Dark green, uniform length, export grade.',
        packaging: '5kg corrugated boxes',
        selectedFposCount: '2 FPOs requested',
        responses: [
          {
            id: 'resp-1022-1',
            fpoId: 'fpo-green-valley',
            fpoName: 'Green Valley FPO',
            location: 'West Godavari',
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹45.00 / kg',
            producePriceVal: 45,
            produceValue: '₹9,000',
            produceValueVal: 9000,
            transportCost: '₹600',
            transportCostVal: 600,
            deliveredTotal: '₹9,600',
            deliveredTotalVal: 9600,
            effectivePrice: '₹48.00 / kg',
            effectivePriceVal: 48.00,
            transportStatus: 'Recorded',
            offeredQty: '500 kg',
            offeredPrice: '₹44.00 / kg',
            deliveryDate: '20 Sep 2026',
            hub: 'Tadepalligudem Horti Hub',
            notes: 'Fresh morning harvest lot ready for immediate cooling and dispatch.',
            timestamp: '12 Sep 2026',
            contact: 'B. Lakshmi Narayana'
          },
          {
            id: 'resp-1022-2',
            fpoId: 'fpo-godavari',
            fpoName: 'Godavari Farmers FPO',
            location: 'Rajamahendravaram',
            status: 'BACK_OFFER',
            statusLabel: 'BACK OFFER',
            statusStyle: 'bg-[#fceace] text-[#683600] border border-[#c3cda7]',
            producePrice: '₹27.00 / kg',
            producePriceVal: 27,
            produceValue: '₹27,000',
            produceValueVal: 27000,
            transportCost: '₹1,500',
            transportCostVal: 1500,
            deliveredTotal: '₹28,500',
            deliveredTotalVal: 28500,
            effectivePrice: '₹28.50 / kg',
            effectivePriceVal: 28.50,
            transportStatus: 'Recorded',
            requestedQty: '500 kg',
            offeredQty: '400 kg',
            counterPrice: '₹46.00 / kg',
            deliveryDate: '20 Sep 2026',
            hub: 'Rajahmundry Central Hub',
            notes: 'Price adjustment to ₹46/kg for Grade A G4 Export selection.',
            counterReasons: ['Price adjusted to ₹46/kg for export optical selection', 'Capacity limited to 400 kg'],
            timestamp: '12 Sep 2026',
            contact: 'K. Venkateswara Rao'
          }
        ]
      }
    ]
  },
  {
    id: 'REQ-1019',
    buyer: 'AgroFresh Enterprise',
    deliveryDate: '15 Sep 2026',
    deliveryLocation: 'Guntur Aggregation Dock',
    notes: 'Converted to contract.',
    status: 'Converted to Order',
    statusVariant: 'success',
    createdDate: '08 Sep 2026',
    items: [
      {
        itemId: 'item-1019-1',
        crop: 'Basmati Rice',
        variety: 'Pusa 1121 Raw',
        quantity: '5,000 kg',
        quantityVal: 500,
        unit: 'kg',
        grade: 'Export Grade',
        targetPrice: '₹42 / kg',
        qualitySpecs: 'Aged 12 months, <12% moisture.',
        packaging: '50kg gunny bags',
        selectedFposCount: '1 FPO requested',
        responses: [
          {
            id: 'resp-1019-1',
            fpoId: 'fpo-krishna-valley',
            fpoName: 'Krishna Valley Agro FPO',
            location: 'Krishna District',
            status: 'ACCEPTED',
            statusLabel: 'ORDER AWARDED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            producePrice: '₹27.00 / kg',
            producePriceVal: 27,
            produceValue: '₹27,000',
            produceValueVal: 27000,
            transportCost: '₹1,500',
            transportCostVal: 1500,
            deliveredTotal: '₹28,500',
            deliveredTotalVal: 28500,
            effectivePrice: '₹28.50 / kg',
            effectivePriceVal: 28.50,
            transportStatus: 'Recorded',
            offeredQty: '5,000 kg',
            offeredPrice: '₹41.50 / kg',
            deliveryDate: '15 Sep 2026',
            hub: 'Gudivada Main Depot',
            notes: 'Contract executed. Order #ORD-8821 generated and en route.',
            timestamp: '09 Sep 2026',
            contact: 'P. Sambasiva Rao'
          }
        ]
      }
    ]
  }
]

// Storage helpers for state persistence across the demo
const STORAGE_KEY = 'farmlink_buyer_demands_v9'

export function getStoredDemands() {
  if (typeof window === 'undefined') return initialProcurementRequests
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProcurementRequests))
      return initialProcurementRequests
    }
    return JSON.parse(raw)
  } catch (e) {
    return initialProcurementRequests
  }
}

export function saveNewDemand(demand) {
  if (typeof window === 'undefined') return demand
  try {
    const existing = getStoredDemands()
    const updated = [demand, ...existing]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return demand
  } catch (e) {
    return demand
  }
}

export function getDemandById(id) {
  const demands = getStoredDemands()
  return demands.find((d) => d.id === id) || demands[0]
}

export function updateItemOfferSelection(demandId, itemId, offerId) {
  if (typeof window === 'undefined') return
  try {
    const demands = getStoredDemands()
    const updated = demands.map((d) => {
      if (d.id !== demandId) return d
      const updatedItems = (d.items || []).map((item) => {
        if (item.itemId !== itemId) return item
        return {
          ...item,
          selectedFpoOfferId: item.selectedFpoOfferId === offerId ? null : offerId
        }
      })
      return {
        ...d,
        items: updatedItems
      }
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (e) {
    console.error(e)
  }
}

export function confirmProcurementOrder(demandId, selectedOffersPerItem = {}) {
  if (typeof window === 'undefined') return
  try {
    const demands = getStoredDemands()
    let targetUpdatedDemand = null

    const updated = demands.map((d) => {
      if (d.id !== demandId) return d

      const updatedItems = (d.items || []).map((item) => {
        const selectedOfferId = selectedOffersPerItem[item.itemId] || item.selectedFpoOfferId || item.confirmedOfferId
        if (!selectedOfferId) return item

        const selectedResp = (item.responses || []).find((r) => r.id === selectedOfferId)

        const updatedResponses = (item.responses || []).map((resp) => {
          if (resp.id === selectedOfferId) {
            return {
              ...resp,
              status: 'ORDER_CONFIRMED',
              statusLabel: 'ORDER CONFIRMED',
              statusStyle: 'bg-rose-50 text-rose-700 border border-rose-300',
              isConfirmed: true,
              isAwarded: true
            }
          } else {
            return {
              ...resp,
              status: 'UNAVAILABLE',
              statusLabel: 'UNAVAILABLE',
              statusStyle: 'bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7]',
              isConfirmed: false,
              isAwarded: false,
              unavailableReason: 'Another FPO was selected for this item.'
            }
          }
        })

        const itemQty = Number(item.quantityVal || parseInt(String(item.quantity || '1000').replace(/[^0-9]/g, '')) || 1000)
        const pRate = selectedResp?.producePriceVal || parseFloat(String(selectedResp?.producePrice || selectedResp?.offeredPrice || selectedResp?.counterPrice || 27).replace(/[^0-9.]/g, '')) || 27
        const tCost = selectedResp?.transportCostVal !== undefined ? selectedResp.transportCostVal : 1500
        const fin = calculateOfferFinancials(itemQty, pRate, tCost)

        return {
          ...item,
          selectedFpoOfferId: selectedOfferId,
          confirmedOfferId: selectedOfferId,
          confirmedFpoId: selectedResp?.fpoId,
          confirmedFpoName: selectedResp?.fpoName,
          agreedProducePrice: fin.producePrice,
          producePriceVal: fin.producePriceVal,
          produceValue: fin.produceValue,
          produceValueVal: fin.produceValueVal,
          transportationCost: fin.transportCost,
          transportCostVal: fin.transportCostVal,
          deliveredOrderTotal: fin.deliveredTotal,
          deliveredTotalVal: fin.deliveredTotalVal,
          effectiveDeliveredPrice: fin.effectivePrice,
          effectivePriceVal: fin.effectivePriceVal,
          deliveryDate: selectedResp?.deliveryDate || d.deliveryDate,
          destination: d.deliveryLocation || 'Vijayawada Central Processing Dock',
          selectedFpo: selectedResp?.fpoName || 'Godavari Farmers FPO',
          isConfirmed: true,
          status: 'ORDER CONFIRMED',
          responses: updatedResponses
        }
      })

      const anyConfirmed = updatedItems.some((it) => it.isConfirmed)
      const allConfirmed = updatedItems.every((it) => it.isConfirmed || !it.responses?.length)

      const updatedDemand = {
        ...d,
        status: allConfirmed ? 'Order Confirmed' : anyConfirmed ? 'Partially Confirmed' : d.status,
        items: updatedItems
      }

      targetUpdatedDemand = updatedDemand
      return updatedDemand
    })

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return targetUpdatedDemand || demands.find((d) => d.id === demandId)
  } catch (e) {
    console.error(e)
  }
}

export function submitFpoResponse(demandId, fpoInfo, responsesPerItem) {
  if (typeof window === 'undefined') return
  try {
    const demands = getStoredDemands()
    const updated = demands.map((d) => {
      if (d.id !== demandId) return d
      const updatedItems = (d.items || []).map((item) => {
        if (item.isConfirmed && item.confirmedOfferId) {
          const myResp = (item.responses || []).find(
            (r) => r.fpoId === fpoInfo.id || r.fpoName === fpoInfo.name
          )
          if (myResp && myResp.id !== item.confirmedOfferId) {
            return item
          }
        }

        const itemResp = responsesPerItem[item.itemId]
        if (!itemResp) return item

        const existingResponses = (item.responses || []).filter(
          (r) => r.fpoId !== fpoInfo.id && r.fpoName !== fpoInfo.name
        )

        let newRespObj = null
        const rawQty = Number(itemResp.availableQty || item.quantityVal || 1000)
        const rawPrice = parseFloat(String(itemResp.producePrice || itemResp.offeredPrice || (itemResp.type === 'BACK_OFFER' ? 29 : 27)).replace(/[^0-9.]/g, '')) || 27
        const rawTransport = parseFloat(String(itemResp.transportCost !== undefined && itemResp.transportCost !== '' ? itemResp.transportCost : 1500).replace(/[^0-9.]/g, '')) || 1500
        const fin = calculateOfferFinancials(rawQty, rawPrice, rawTransport)

        if (itemResp.type === 'ACCEPT') {
          newRespObj = {
            id: `resp-${demandId}-${item.itemId}-${fpoInfo.id || 'fpo-godavari'}`,
            fpoId: fpoInfo.id || 'fpo-godavari',
            fpoName: fpoInfo.name || 'Godavari Farmers FPO',
            location: fpoInfo.location || 'Rajamahendravaram, East Godavari',
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            offeredQty: `${rawQty.toLocaleString()} kg`,
            offeredPrice: fin.producePrice,
            producePrice: fin.producePrice,
            producePriceVal: fin.producePriceVal,
            produceValue: fin.produceValue,
            produceValueVal: fin.produceValueVal,
            transportCost: fin.transportCost,
            transportCostVal: fin.transportCostVal,
            deliveredTotal: fin.deliveredTotal,
            deliveredTotalVal: fin.deliveredTotalVal,
            effectivePrice: fin.effectivePrice,
            effectivePriceVal: fin.effectivePriceVal,
            transportStatus: 'Recorded',
            deliveryDate: itemResp.deliveryDate || d.deliveryDate,
            hub: fpoInfo.primaryHub || 'Rajahmundry Central Hub #01',
            notes: itemResp.notes || `Full volume allocated across member clusters. Scheduled delivery on ${itemResp.deliveryDate || d.deliveryDate}.`,
            timestamp: 'Just now',
            contact: fpoInfo.contactPerson || 'Hub Director Desk'
          }
        } else if (itemResp.type === 'BACK_OFFER') {
          newRespObj = {
            id: `resp-${demandId}-${item.itemId}-${fpoInfo.id || 'fpo-godavari'}`,
            fpoId: fpoInfo.id || 'fpo-godavari',
            fpoName: fpoInfo.name || 'Godavari Farmers FPO',
            location: fpoInfo.location || 'Rajamahendravaram, East Godavari',
            status: 'BACK_OFFER',
            statusLabel: 'BACK OFFER',
            statusStyle: 'bg-[#fceace] text-[#683600] border border-[#c3cda7]',
            requestedQty: item.quantity,
            offeredQty: `${rawQty.toLocaleString()} kg`,
            counterPrice: fin.producePrice,
            offeredPrice: fin.producePrice,
            producePrice: fin.producePrice,
            producePriceVal: fin.producePriceVal,
            produceValue: fin.produceValue,
            produceValueVal: fin.produceValueVal,
            transportCost: fin.transportCost,
            transportCostVal: fin.transportCostVal,
            deliveredTotal: fin.deliveredTotal,
            deliveredTotalVal: fin.deliveredTotalVal,
            effectivePrice: fin.effectivePrice,
            effectivePriceVal: fin.effectivePriceVal,
            transportStatus: 'Recorded',
            offeredGrade: itemResp.offeredGrade || item.grade,
            deliveryDate: itemResp.deliveryDate || d.deliveryDate,
            hub: fpoInfo.primaryHub || 'Rajahmundry Central Hub #01',
            notes: itemResp.notes || 'Commercial back offer proposed.',
            counterReasons: itemResp.counterReasons || [
              `Produce rate adjusted to ${fin.producePrice}`,
              `Delivered total: ${fin.deliveredTotal} (including ${fin.transportCost} internal transport)`
            ],
            timestamp: 'Just now',
            contact: fpoInfo.contactPerson || 'Hub Director Desk'
          }
        } else if (itemResp.type === 'DECLINE') {
          newRespObj = {
            id: `resp-${demandId}-${item.itemId}-${fpoInfo.id || 'fpo-godavari'}`,
            fpoId: fpoInfo.id || 'fpo-godavari',
            fpoName: fpoInfo.name || 'Godavari Farmers FPO',
            location: fpoInfo.location || 'Rajamahendravaram, East Godavari',
            status: 'DECLINED',
            statusLabel: 'DECLINED',
            statusStyle: 'bg-[#fceace] text-[#ba1a1a] border border-[#ba1a1a]/30',
            declineReason: itemResp.declineReason || 'Insufficient quantity',
            notes: itemResp.notes || itemResp.declineReason || 'Declined due to supply constraints',
            timestamp: 'Just now',
            contact: fpoInfo.contactPerson || 'Hub Director Desk'
          }
        }

        return {
          ...item,
          responses: newRespObj ? [newRespObj, ...existingResponses] : item.responses
        }
      })

      return {
        ...d,
        status: d.status === 'Order Confirmed' ? 'Order Confirmed' : 'Partially Responded',
        fpoResponded: true,
        items: updatedItems
      }
    })

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return updated
  } catch (e) {
    console.error(e)
  }
}

// Function to find matching FPOs for a specific item
export function findMatchingFposForItem(crop = '', grade = 'Grade A') {
  const cropLower = crop.toLowerCase()
  return mockFPOs.filter((fpo) => {
    return fpo.products.some((p) => p.toLowerCase().includes(cropLower) || cropLower.includes(p.toLowerCase())) || true
  }).map((fpo) => {
    let price = fpo.tomatoPrice || '₹28 / kg'
    let cap = fpo.tomatoCapacity || '5,000 kg'

    if (cropLower.includes('onion')) {
      price = fpo.onionPrice || '₹24 / kg'
      cap = fpo.onionCapacity || '4,000 kg'
    } else if (cropLower.includes('chilli')) {
      price = fpo.chilliPrice || '₹44 / kg'
      cap = fpo.chilliCapacity || '800 kg'
    } else if (cropLower.includes('rice') || cropLower.includes('paddy')) {
      price = '₹42 / kg'
      cap = '25,000 kg'
    } else if (cropLower.includes('potato')) {
      price = '₹20 / kg'
      cap = '10,000 kg'
    }

    return {
      id: fpo.id,
      name: fpo.name,
      location: `${fpo.location}, ${fpo.district}`,
      cropAvailability: 'Available',
      gradeOffered: grade || 'Grade A',
      capacity: cap,
      estPrice: price,
      deliveryCapability: 'Available (Cold Chain Transport)',
      reliability: fpo.reliabilityScore,
      rating: fpo.rating,
      hubsCount: fpo.hubsCount
    }
  })
}

export const recentProcurementRequests = initialProcurementRequests

export const quickCategories = [
  { id: 'veg', name: 'Vegetables', icon: '🥬', count: '48 Available' },
  { id: 'fruits', name: 'Fruits', icon: '🍎', count: '24 Available' },
  { id: 'grains', name: 'Grains', icon: '🌾', count: '18 Available' },
  { id: 'pulses', name: 'Pulses', icon: '🫘', count: '14 Available' },
  { id: 'spices', name: 'Spices', icon: '🌶️', count: '9 Available' },
]

export const recentSearches = [
  'Tomato',
  'Onion',
  'Potato',
  'Rice',
  'Banana',
  'Green Chilli'
]

export const mockCommoditiesCatalog = [
  {
    id: 'crop-tomato',
    name: 'Tomato',
    category: 'Vegetables',
    icon: '🍅',
    varieties: ['Hybrid Roma', 'Himsona', 'Local Farm Fresh'],
    grades: ['Grade A', 'Grade B', 'Processing Grade'],
    indicativePriceRange: '₹26 – ₹30 / kg',
    activeFpos: 6,
    aggregatedCapacity: '12,500 kg / week',
    inSeason: true,
    seasonality: 'Peak Harvest'
  },
  {
    id: 'crop-onion',
    name: 'Onion',
    category: 'Vegetables',
    icon: '🧅',
    varieties: ['Nasik Red', 'Garwa', 'White Onion'],
    grades: ['Grade A (45-55mm)', 'Grade B', 'Small Pickling'],
    indicativePriceRange: '₹22 – ₹26 / kg',
    activeFpos: 5,
    aggregatedCapacity: '18,000 kg / week',
    inSeason: true,
    seasonality: 'Year-Round Available'
  },
  {
    id: 'crop-potato',
    name: 'Potato',
    category: 'Vegetables',
    icon: '🥔',
    varieties: ['Kufri Jyoti', 'Kufri Pukhraj', 'Chipsona'],
    grades: ['Grade A Large', 'Grade B Medium'],
    indicativePriceRange: '₹18 – ₹22 / kg',
    activeFpos: 4,
    aggregatedCapacity: '25,000 kg / week',
    inSeason: true,
    seasonality: 'Cold Storage Staged'
  },
  {
    id: 'crop-rice',
    name: 'Rice / Paddy',
    category: 'Grains',
    icon: '🌾',
    varieties: ['Basmati Pusa 1121', 'BPT 5204 (Sona Masoori)', 'Swarna'],
    grades: ['Export Grade', 'Grade A Milled', 'Raw Paddy'],
    indicativePriceRange: '₹38 – ₹46 / kg',
    activeFpos: 8,
    aggregatedCapacity: '65 MT / month',
    inSeason: true,
    seasonality: 'Harvest Aggregation'
  },
  {
    id: 'crop-banana',
    name: 'Banana',
    category: 'Fruits',
    icon: '🍌',
    varieties: ['Grand Naine (G9)', 'Robusta', 'Elakki'],
    grades: ['Export Grade A', 'Domestic Grade A'],
    indicativePriceRange: '₹16 – ₹20 / kg',
    activeFpos: 4,
    aggregatedCapacity: '15 MT / week',
    inSeason: true,
    seasonality: 'Continuous Harvest'
  },
  {
    id: 'crop-chilli',
    name: 'Green Chilli',
    category: 'Vegetables',
    icon: '🌶️',
    varieties: ['G4 Hot', 'Teja', 'Indam 5'],
    grades: ['Grade A Export', 'Standard Grade'],
    indicativePriceRange: '₹42 – ₹48 / kg',
    activeFpos: 5,
    aggregatedCapacity: '6,200 kg / week',
    inSeason: true,
    seasonality: 'Peak Fresh Season'
  }
]

export const mockFPOs = [
  {
    id: 'fpo-godavari',
    name: 'Godavari Farmers FPO',
    legalName: 'Godavari Valley Agro Producer Co. Ltd.',
    regNumber: 'CIN: U01409AP2021PTC118942',
    location: 'Rajamahendravaram',
    district: 'East Godavari',
    state: 'Andhra Pradesh',
    pincode: '533101',
    estYear: 2021,
    products: ['Tomato', 'Green Chilli', 'Onion', 'Maize', 'Papaya'],
    capacity: '1,500 kg Tomato active • 45 MT/month total',
    approxCapacityVal: '45 MT / month',
    tomatoCapacity: '8,000 kg',
    tomatoGrade: 'Grade A',
    tomatoPrice: '₹27 – ₹29 / kg',
    onionCapacity: '2,000 kg',
    onionPrice: '₹24 / kg',
    chilliCapacity: '800 kg',
    chilliPrice: '₹44 / kg',
    hubsCount: 4,
    hubNames: ['Rajahmundry Central Hub', 'Korukonda CC', 'Kadiyam Horti Hub', 'Gokavaram Intake Center'],
    farmerMembers: 1420,
    reliabilityScore: '98.4%',
    rating: 4.9,
    reviewsCount: 38,
    status: 'Verified FPO',
    deliveryCapability: 'Available (Cold Chain Van + 24-48h Regional Dock Dispatch)',
    certifications: ['FSSAI Certified', 'SFAC Registered', 'APEDA Registered', 'NPOP Organic Traced'],
    contactPerson: 'K. Venkateswara Rao',
    phone: '+91 883 245 8901',
    email: 'procurement@godavarifpo.coop',
    overview: 'Promoted by NABARD and State Agriculture Dept, specializing in cold-chain aggregated horticultural produce directly from 1,400+ small and marginal farmers across the Godavari delta.',
    badge: 'Top Reliable Supplier'
  },
  {
    id: 'fpo-delta-agro',
    name: 'Delta Agro FPO',
    legalName: 'Delta Fertile Plains Farmer Producer Co-operative',
    regNumber: 'CIN: U01111AP2019PTC109432',
    location: 'East Godavari (Mandapeta Hub)',
    district: 'East Godavari',
    state: 'Andhra Pradesh',
    pincode: '533308',
    estYear: 2019,
    products: ['Tomato', 'Banana (G9)', 'Potato', 'Paddy', 'Sweet Lime', 'Onion'],
    capacity: '2,200 kg Tomato active • 65 MT/month total',
    approxCapacityVal: '65 MT / month',
    tomatoCapacity: '6,000 kg',
    tomatoGrade: 'Grade A',
    tomatoPrice: '₹28 / kg',
    onionCapacity: '4,000 kg',
    onionPrice: '₹23.50 / kg',
    chilliCapacity: '1,200 kg',
    chilliPrice: '₹43 / kg',
    hubsCount: 6,
    hubNames: ['Mandapeta Agro Dock', 'Kakinada Port Hub', 'Ramachandrapuram CC', 'Alamuru Aggregation Point', 'Anaparthi Cold Yard', 'Draksharama Hub'],
    farmerMembers: 2150,
    reliabilityScore: '97.6%',
    rating: 4.8,
    reviewsCount: 52,
    status: 'Verified FPO',
    deliveryCapability: 'Available (Direct Dock Delivery • Dedicated Reefer Fleet)',
    certifications: ['FSSAI Certified', 'NABARD A-Grade', 'ISO 22000 Ready'],
    contactPerson: 'S. Ramakrishna Raju',
    phone: '+91 884 238 7765',
    email: 'contact@deltaagrofpo.in',
    overview: 'High-throughput farmer producer organization operating 6 modern collection centers with automated digital grading and precision weighing scales.',
    badge: 'Highest Capacity'
  },
  {
    id: 'fpo-green-valley',
    name: 'Green Valley FPO',
    legalName: 'Green Valley Agri Producers Federation',
    regNumber: 'CIN: U01222AP2022PTC121087',
    location: 'West Godavari (Tadepalligudem)',
    district: 'West Godavari',
    state: 'Andhra Pradesh',
    pincode: '534101',
    estYear: 2022,
    products: ['Tomato', 'Green Chilli', 'Pulses (Toor Dal)', 'Cabbage', 'Cauliflower'],
    capacity: '900 kg Tomato active • 30 MT/month total',
    approxCapacityVal: '30 MT / month',
    tomatoCapacity: '4,500 kg',
    tomatoGrade: 'Grade A',
    tomatoPrice: '₹29 / kg',
    onionCapacity: '1,100 kg',
    onionPrice: '₹25 / kg',
    chilliCapacity: '600 kg',
    chilliPrice: '₹46 / kg',
    hubsCount: 3,
    hubNames: ['Tadepalligudem Horti Hub', 'Eluru North Staging Center', 'Bhimadole Collection Point'],
    farmerMembers: 950,
    reliabilityScore: '99.1%',
    rating: 4.9,
    reviewsCount: 29,
    status: 'Verified FPO',
    deliveryCapability: 'Available (Cold Storage Staging + Next-Day Transit)',
    certifications: ['FSSAI Certified', 'SFAC Empanelled', 'Pesticide-Tested Traceability'],
    contactPerson: 'B. Lakshmi Narayana',
    phone: '+91 8818 224 510',
    email: 'trade@greenvalleyfpo.org',
    overview: 'Specialist horticultural FPO with strict lot-by-lot optical sorting and zero chemical residue compliance for institutional buyers.',
    badge: 'Zero Quality Rejection'
  },
  {
    id: 'fpo-krishna-valley',
    name: 'Krishna Valley Agro FPO',
    legalName: 'Krishna River Basin Farmers Producer Co.',
    regNumber: 'CIN: U01403AP2020PTC115401',
    location: 'Krishna District (Gudivada Hub)',
    district: 'Krishna District',
    state: 'Andhra Pradesh',
    pincode: '521301',
    estYear: 2020,
    products: ['Tomato', 'Rice (BPT 5204)', 'Onion', 'Mango', 'Turmeric', 'Green Chilli'],
    capacity: '3,500 kg Tomato active • 80 MT/month total',
    approxCapacityVal: '80 MT / month',
    tomatoCapacity: '10,000 kg',
    tomatoGrade: 'Grade A',
    tomatoPrice: '₹26.50 – ₹28 / kg',
    onionCapacity: '3,000 kg',
    onionPrice: '₹23 / kg',
    chilliCapacity: '950 kg',
    chilliPrice: '₹42.50 – ₹47 / kg',
    hubsCount: 5,
    hubNames: ['Gudivada Main Depot', 'Nuzvid Fruit & Veg Staging', 'Kanchikacherla Aggregation', 'Vuyyuru CC', 'Gannavaram Hub'],
    farmerMembers: 2800,
    reliabilityScore: '96.8%',
    rating: 4.7,
    reviewsCount: 44,
    status: 'Verified FPO',
    deliveryCapability: 'Available (Multi-axle Heavy Logistics • Scheduled Daily Dispatches)',
    certifications: ['FSSAI Certified', 'APEDA Registered', 'NABARD Platinum'],
    contactPerson: 'P. Sambasiva Rao',
    phone: '+91 866 284 3190',
    email: 'krishna.valley@agrocoop.in',
    overview: 'Extensive agricultural federation covering Krishna delta with strong logistical fleet delivering bulk commercial supplies.',
    badge: 'Bulk Supply Partner'
  },
  {
    id: 'fpo-sahyadri',
    name: 'Sahyadri Agro Federation',
    legalName: 'Sahyadri Horti & Farmer Producer Co. Ltd.',
    regNumber: 'CIN: U01122MH2018PTC104523',
    location: 'Nashik / Dindori',
    district: 'Nashik',
    state: 'Maharashtra',
    pincode: '422003',
    estYear: 2018,
    products: ['Tomato', 'Onion', 'Grapes', 'Pomegranate', 'Capsicum'],
    capacity: '4,000 kg Tomato active • 120 MT/month total',
    approxCapacityVal: '120 MT / month',
    tomatoCapacity: '12,000 kg',
    tomatoGrade: 'Grade A (Export)',
    tomatoPrice: '₹27.50 / kg',
    onionCapacity: '10,000 kg',
    onionPrice: '₹22 / kg',
    chilliCapacity: '1,500 kg',
    chilliPrice: '₹41 / kg',
    hubsCount: 8,
    hubNames: ['Nashik Central Mega Hub', 'Dindori Cold Staging', 'Pimpalgaon Intake', 'Lasalgaon Depot', 'Yeola CC', 'Niphad Packhouse', 'Sinnar Hub', 'Trimbak Collection'],
    farmerMembers: 4600,
    reliabilityScore: '99.5%',
    rating: 5.0,
    reviewsCount: 110,
    status: 'Verified FPO',
    deliveryCapability: 'Available (Automated Packhouse + Direct Interstate Logistics)',
    certifications: ['Global GAP', 'FSSAI Certified', 'APEDA Golden Star', 'BRCGS Packhouse'],
    contactPerson: 'Vilas Shinde / Rajesh Kadam',
    phone: '+91 253 239 8811',
    email: 'commercial@sahyadrifpo.com',
    overview: 'Pioneer horticulture consortium with high-tech computerized sort-graders and state-of-the-art cold chain infrastructure.',
    badge: 'National Benchmark'
  },
  {
    id: 'fpo-kheda',
    name: 'Kheda Organic Producer Co.',
    legalName: 'Kheda District Agrarian Producer Federation',
    regNumber: 'CIN: U01300GJ2020PTC112340',
    location: 'Nadiad / Anand',
    district: 'Kheda',
    state: 'Gujarat',
    pincode: '387001',
    estYear: 2020,
    products: ['Potato', 'Wheat', 'Mustard', 'Tomato', 'Cumin'],
    capacity: '1,800 kg Tomato active • 50 MT/month total',
    approxCapacityVal: '50 MT / month',
    tomatoCapacity: '5,000 kg',
    tomatoGrade: 'Grade A',
    tomatoPrice: '₹28.50 / kg',
    onionCapacity: '2,200 kg',
    onionPrice: '₹24.50 / kg',
    chilliCapacity: '500 kg',
    chilliPrice: '₹45 / kg',
    hubsCount: 4,
    hubNames: ['Nadiad Agri Hub #01', 'Anand Dairy & Horti CC', 'Petlad Weighing Station', 'Matar Intake Yard'],
    farmerMembers: 1680,
    reliabilityScore: '98.0%',
    rating: 4.8,
    reviewsCount: 35,
    status: 'Verified FPO',
    deliveryCapability: 'Available (Covered Dry & Insulated Trucking • 48h SLA)',
    certifications: ['FSSAI Certified', 'SFAC Certified', 'Jaivik Bharat Organic'],
    contactPerson: 'Mahendra Patel',
    phone: '+91 268 255 1204',
    email: 'khedaproducers@farmlink.in',
    overview: 'Farmer federation specializing in both organic staples and grade-separated commercial vegetable crops.',
    badge: 'Organic Traceability'
  }
]

export const productSearchResultsMock = {
  fpoResults: [
    {
      id: 'fpo-godavari',
      fpoName: 'Godavari Farmers FPO',
      location: 'Rajamahendravaram, East Godavari',
      rating: 4.9,
      reviewsCount: 38,
      tag: 'Top Reliability SLA',
      product: 'Tomato (Hybrid Roma)',
      availableCapacity: '8,000 kg',
      indicativePrice: '₹27 – ₹29 / kg',
      grade: 'Grade A',
      deliveryCapability: 'Cold chain transit to Vijayawada in 4 hours',
      reliability: '98.4%'
    },
    {
      id: 'fpo-delta-agro',
      fpoName: 'Delta Agro FPO',
      location: 'East Godavari (Mandapeta Hub)',
      rating: 4.8,
      reviewsCount: 52,
      tag: 'High Capacity Aggregator',
      product: 'Tomato (Himsona / Roma)',
      availableCapacity: '6,000 kg',
      indicativePrice: '₹28 / kg',
      grade: 'Grade A',
      deliveryCapability: 'Direct dock transport • Reefer fleet',
      reliability: '97.6%'
    },
    {
      id: 'fpo-green-valley',
      fpoName: 'Green Valley FPO',
      location: 'West Godavari (Tadepalligudem)',
      rating: 4.9,
      reviewsCount: 29,
      tag: 'Zero Quality Rejection',
      product: 'Tomato (Grade A Optical Sorted)',
      availableCapacity: '4,500 kg',
      indicativePrice: '₹29 / kg',
      grade: 'Grade A',
      deliveryCapability: 'Cold storage staging + Next-day transit',
      reliability: '99.1%'
    },
    {
      id: 'fpo-krishna-valley',
      fpoName: 'Krishna Valley Agro FPO',
      location: 'Krishna District (Gudivada Hub)',
      rating: 4.7,
      reviewsCount: 44,
      tag: 'Bulk Logistics Partner',
      product: 'Tomato (Roma / Local Fresh)',
      availableCapacity: '10,000 kg',
      indicativePrice: '₹26.50 – ₹28 / kg',
      grade: 'Grade A',
      deliveryCapability: 'Daily scheduled dispatches',
      reliability: '96.8%'
    }
  ]
}
