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
    icon: '📋',
    badge: 'Live RFQs',
    color: 'emerald'
  },
  {
    id: 'offers-received',
    title: 'Offers Received',
    value: '18',
    change: '6 new offers today',
    trend: 'up',
    icon: '📩',
    badge: 'Action Needed',
    color: 'blue'
  },
  {
    id: 'active-orders',
    title: 'Active Orders',
    value: '3',
    change: '2 en route from hubs',
    trend: 'neutral',
    icon: '🚚',
    badge: 'In Transit',
    color: 'amber'
  },
  {
    id: 'completed-orders',
    title: 'Completed Orders',
    value: '24',
    change: '99.2% on-time fulfillment',
    trend: 'up',
    icon: '✅',
    badge: 'All-Time',
    color: 'slate'
  }
]

export const initialProcurementRequests = [
  {
    id: 'REQ-1026',
    crop: 'Tomato',
    variety: 'Hybrid Roma',
    grade: 'Grade A',
    quantity: '5,000 kg',
    targetPrice: '₹28 / kg',
    deliveryDate: '25 Sep 2026',
    deliveryLocation: 'Vijayawada Processing Hub Dock',
    qualitySpecs: 'Optical grading Grade A required, max 5% moisture tolerance.',
    packaging: 'Ventilated 20kg crates',
    selectedFposCount: '3 FPOs selected',
    responseSummary: '2 responses received',
    status: 'Awaiting Responses',
    statusVariant: 'warning',
    createdDate: '14 Sep 2026, 09:00 AM',
    responses: [
      {
        id: 'resp-1026-1',
        fpoId: 'fpo-godavari',
        fpoName: 'Godavari Farmers FPO',
        location: 'Rajamahendravaram, East Godavari',
        status: 'ACCEPTED',
        statusLabel: 'ACCEPTED',
        statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
        offeredQty: '5,000 kg',
        offeredPrice: '₹27.50 / kg',
        deliveryDate: '25 Sep 2026',
        hub: 'Rajahmundry Central Hub #01',
        notes: 'Full volume committed across 18 member farmer clusters. 100% optical sorted Grade A, crates packed, ready for scheduled 25 Sep dock dispatch.',
        timestamp: '14 Sep 2026, 10:30 AM',
        contact: 'K. Venkateswara Rao (+91 883 245 8901)'
      },
      {
        id: 'resp-1026-2',
        fpoId: 'fpo-delta-agro',
        fpoName: 'Delta Agro FPO',
        location: 'East Godavari (Mandapeta Hub)',
        status: 'BACK_OFFER',
        statusLabel: 'BACK OFFER',
        statusStyle: 'bg-[#fceace] text-[#683600] border border-[#c3cda7]',
        requestedQty: '5,000 kg',
        offeredQty: '5,000 kg',
        counterPrice: '₹29.00 / kg',
        deliveryDate: '26 Sep 2026',
        hub: 'Mandapeta Agro Dock',
        notes: 'Proposes counter rate of ₹29/kg (+₹1/kg over target) due to peak refrigerated transport logistics. Delivery shifted by +1 day (26 Sep).',
        counterReasons: [
          'Price adjusted to ₹29/kg due to peak refrigerated reefer logistics',
          'Delivery date shifted to 26 Sep for optimal harvest batch precooling'
        ],
        timestamp: '14 Sep 2026, 11:15 AM',
        contact: 'S. Ramakrishna Raju (+91 884 238 7765)'
      },
      {
        id: 'resp-1026-3',
        fpoId: 'fpo-green-valley',
        fpoName: 'Green Valley FPO',
        location: 'West Godavari (Tadepalligudem)',
        status: 'NO_RESPONSE',
        statusLabel: 'NO RESPONSE',
        statusStyle: 'bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7]',
        requestSentDate: '14 Sep 2026',
        notes: 'Request dispatched to hub intake manager. Waiting for member farmer cluster intake aggregation.',
        timestamp: '14 Sep 2026, 09:00 AM',
        contact: 'B. Lakshmi Narayana (+91 8818 224 510)'
      }
    ]
  },
  {
    id: 'REQ-1024',
    crop: 'Tomato',
    variety: 'Hybrid Roma / Himsona',
    grade: 'Grade A',
    quantity: '1,000 kg',
    targetPrice: '₹28 / kg',
    deliveryDate: '18 Sep 2026',
    deliveryLocation: 'Vijayawada Central Processing Hub',
    qualitySpecs: 'Standard optical sorting required.',
    packaging: '20kg Crates',
    selectedFposCount: '3 FPOs selected',
    responseSummary: '3 responses received',
    status: 'Receiving Offers',
    statusVariant: 'warning',
    createdDate: '14 Sep 2026, 09:15 AM',
    responses: [
      {
        id: 'resp-1024-1',
        fpoId: 'fpo-godavari',
        fpoName: 'Godavari Farmers FPO',
        location: 'Rajamahendravaram, East Godavari',
        status: 'ACCEPTED',
        statusLabel: 'ACCEPTED',
        statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
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
  },
  {
    id: 'REQ-1025',
    crop: 'Onion',
    variety: 'Nasik Red / Garwa',
    grade: 'Grade A (45-55mm)',
    quantity: '800 kg',
    targetPrice: '₹24 / kg',
    deliveryDate: '22 Sep 2026',
    deliveryLocation: 'Visakhapatnam Warehouse #2',
    qualitySpecs: 'Dry cured, sorted and graded.',
    packaging: 'Mesh Bags 40kg',
    selectedFposCount: '2 FPOs selected',
    responseSummary: '0 responses',
    status: 'Draft',
    statusVariant: 'default',
    createdDate: '13 Sep 2026',
    responses: [
      {
        id: 'resp-1025-1',
        fpoId: 'fpo-godavari',
        fpoName: 'Godavari Farmers FPO',
        location: 'Rajamahendravaram',
        status: 'NO_RESPONSE',
        statusLabel: 'NO RESPONSE',
        statusStyle: 'bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7]',
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
        requestSentDate: '13 Sep 2026',
        notes: 'Waiting for Maharashtra inter-state transport consolidation.',
        timestamp: '13 Sep 2026',
        contact: 'Vilas Shinde'
      }
    ]
  },
  {
    id: 'REQ-1022',
    crop: 'Green Chilli',
    variety: 'G4 Hot Export',
    grade: 'Grade A',
    quantity: '500 kg',
    targetPrice: '₹45 / kg',
    deliveryDate: '20 Sep 2026',
    deliveryLocation: 'Vijayawada Central Processing Hub',
    qualitySpecs: 'Dark green, uniform length, export grade.',
    packaging: '5kg corrugated boxes',
    selectedFposCount: '3 FPOs selected',
    responseSummary: '3 responses received',
    status: 'Offers Under Review',
    statusVariant: 'info',
    createdDate: '12 Sep 2026',
    responses: [
      {
        id: 'resp-1022-1',
        fpoId: 'fpo-green-valley',
        fpoName: 'Green Valley FPO',
        location: 'West Godavari',
        status: 'ACCEPTED',
        statusLabel: 'ACCEPTED',
        statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
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
  },
  {
    id: 'REQ-1019',
    crop: 'Basmati Rice',
    variety: 'Pusa 1121 Raw',
    grade: 'Export Grade',
    quantity: '5,000 kg',
    targetPrice: '₹42 / kg',
    deliveryDate: '15 Sep 2026',
    deliveryLocation: 'Guntur Aggregation Dock',
    qualitySpecs: 'Aged 12 months, <12% moisture.',
    packaging: '50kg gunny bags',
    selectedFposCount: '2 FPOs selected',
    responseSummary: 'Awarded to Krishna Valley FPO',
    status: 'Converted to Order',
    statusVariant: 'success',
    createdDate: '08 Sep 2026',
    responses: [
      {
        id: 'resp-1019-1',
        fpoId: 'fpo-krishna-valley',
        fpoName: 'Krishna Valley Agro FPO',
        location: 'Krishna District',
        status: 'ACCEPTED',
        statusLabel: 'ORDER AWARDED',
        statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
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

// Storage helpers for state persistence across the demo
const STORAGE_KEY = 'farmlink_buyer_demands_v1'

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
    products: ['Tomato', 'Banana (G9)', 'Potato', 'Paddy', 'Sweet Lime'],
    capacity: '2,200 kg Tomato active • 65 MT/month total',
    approxCapacityVal: '65 MT / month',
    tomatoCapacity: '6,000 kg',
    tomatoGrade: 'Grade A',
    tomatoPrice: '₹28 / kg',
    onionCapacity: '1,500 kg',
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
    products: ['Tomato', 'Rice (BPT 5204)', 'Onion', 'Mango', 'Turmeric'],
    capacity: '3,500 kg Tomato active • 80 MT/month total',
    approxCapacityVal: '80 MT / month',
    tomatoCapacity: '10,000 kg',
    tomatoGrade: 'Grade A',
    tomatoPrice: '₹26.50 – ₹28 / kg',
    onionCapacity: '3,000 kg',
    onionPrice: '₹23 / kg',
    chilliCapacity: '950 kg',
    chilliPrice: '₹42.50 / kg',
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
    onionCapacity: '8,000 kg',
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
  searchedProduct: {
    name: 'Tomato',
    variety: 'Hybrid Roma / Himsona',
    grade: 'Grade A',
    requestedQuantity: '1,000 kg',
    requiredDelivery: '18 Sep 2026',
    deliveryLocation: 'Vijayawada Processing Facility',
    category: 'Vegetables',
    unit: 'kg'
  },
  fpoResults: [
    {
      id: 'fpo-godavari',
      fpoName: 'Godavari Farmers FPO',
      legalName: 'Godavari Valley Agro Producer Co. Ltd.',
      location: 'Rajamahendravaram, East Godavari, AP',
      product: 'Tomato (Hybrid Roma)',
      availableCapacity: '1,500 kg',
      grade: 'Grade A',
      indicativePrice: '₹28 / kg',
      deliveryCapability: 'Refrigerated van • 24h dock dispatch',
      reliability: '98.4% Fulfillment Rate',
      rating: 4.9,
      reviewsCount: 38,
      hubsCount: 4,
      verified: true,
      tag: 'Best Match for Delivery SLA',
      dispatchWindow: 'Ready for 18 Sep Dispatch'
    },
    {
      id: 'fpo-delta-agro',
      fpoName: 'Delta Agro FPO',
      legalName: 'Delta Fertile Plains Producer Co-op',
      location: 'East Godavari (Mandapeta Hub), AP',
      product: 'Tomato (Himsona Grade A)',
      availableCapacity: '2,200 kg',
      grade: 'Grade A',
      indicativePrice: '₹27 / kg',
      deliveryCapability: 'Direct Regional Dock Delivery',
      reliability: '97.6% Fulfillment Rate',
      rating: 4.8,
      reviewsCount: 52,
      hubsCount: 6,
      verified: true,
      tag: 'Most Competitive Indicative Rate',
      dispatchWindow: 'Ready for 18 Sep Dispatch'
    },
    {
      id: 'fpo-green-valley',
      fpoName: 'Green Valley FPO',
      legalName: 'Green Valley Agri Producers',
      location: 'West Godavari (Tadepalligudem), AP',
      product: 'Tomato (Grade A Selected)',
      availableCapacity: '900 kg',
      grade: 'Grade A',
      indicativePrice: '₹29 / kg',
      deliveryCapability: 'Cold Storage Staged • Insulated Transit',
      reliability: '99.1% Fulfillment Rate',
      rating: 4.9,
      reviewsCount: 29,
      hubsCount: 3,
      verified: true,
      tag: 'Highest Quality Audit Score',
      dispatchWindow: 'Ready for 18 Sep Dispatch'
    },
    {
      id: 'fpo-krishna-valley',
      fpoName: 'Krishna Valley Agro FPO',
      legalName: 'Krishna River Basin Farmers Producer Co.',
      location: 'Krishna District (Gudivada Hub), AP',
      product: 'Tomato (Local Farm Fresh Hybrid)',
      availableCapacity: '3,500 kg',
      grade: 'Grade A',
      indicativePrice: '₹26.50 / kg',
      deliveryCapability: 'Multi-axle Hub Transport • Daily Run',
      reliability: '96.8% Fulfillment Rate',
      rating: 4.7,
      reviewsCount: 44,
      hubsCount: 5,
      verified: true,
      tag: 'High Volume Supplier',
      dispatchWindow: 'Ready for 18 Sep Dispatch'
    }
  ]
}
