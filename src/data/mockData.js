export const fpoStats = [
  { id: '1', title: 'Registered Farmers', value: '1,420', change: '+12% this month', trend: 'up' },
  { id: '2', title: 'Active Demands', value: '38', change: '5 urgent', trend: 'neutral' },
  { id: '3', title: 'Total Aggregated (MT)', value: '450.5', change: '+8.4% vs last week', trend: 'up' },
  { id: '4', title: 'Reserve Fund Balance', value: '₹14,50,000', change: 'Healthy', trend: 'up' },
]

export const buyerStats = [
  { id: '1', title: 'Active Contracts', value: '12', change: '2 pending review', trend: 'neutral' },
  { id: '2', title: 'Committed Quantity', value: '180 MT', change: '85% fulfilled', trend: 'up' },
  { id: '3', title: 'Incoming Shipments', value: '4', change: 'Arriving today', trend: 'neutral' },
  { id: '4', title: 'Escrow / Wallet', value: '₹8,20,000', change: 'Active', trend: 'up' },
]

export const hubStats = [
  { id: '1', title: "Today's Intake", value: '24.8 MT', change: '92% of target', trend: 'up' },
  { id: '2', title: 'Batches Inspected', value: '18', change: '100% QA pass rate', trend: 'up' },
  { id: '3', title: 'Pending Weighing', value: '3 Trucks', change: 'Est. 45 min', trend: 'down' },
  { id: '4', title: 'Dispatched to Buyers', value: '16.2 MT', change: '3 shipments en route', trend: 'up' },
]

export const mockFarmers = [
  { id: 'F001', name: 'Ramesh Patel', village: 'Kheda, Gujarat', crop: 'Wheat (Sharbati)', acreage: '4.5 Acres', estYield: '9.0 MT', phone: '+91 98765 43210', status: 'Verified' },
  { id: 'F002', name: 'Suresh Verma', village: 'Anand, Gujarat', crop: 'Paddy (Basmati)', acreage: '6.0 Acres', estYield: '14.5 MT', phone: '+91 98765 43211', status: 'Verified' },
  { id: 'F003', name: 'Kavita Devi', village: 'Petlad, Gujarat', crop: 'Mustard Seeds', acreage: '3.0 Acres', estYield: '4.2 MT', phone: '+91 98765 43212', status: 'Pending KYC' },
  { id: 'F004', name: 'Balwant Singh', village: 'Nadiad, Gujarat', crop: 'Cotton', acreage: '8.0 Acres', estYield: '12.0 MT', phone: '+91 98765 43213', status: 'Verified' },
]

export const mockBuyers = [
  { id: 'B001', company: 'AgroFresh Foods Pvt Ltd', contactPerson: 'Anita Rao', location: 'Ahmedabad', category: 'Institutional Processor', rating: '4.9/5', status: 'Active' },
  { id: 'B002', company: 'GreenBasket Retail Corp', contactPerson: 'Vikram Joshi', location: 'Surat', category: 'Supermarket Chain', rating: '4.7/5', status: 'Active' },
  { id: 'B003', company: 'PureGrain Mills', contactPerson: 'Manoj Shah', location: 'Vadodara', category: 'Flour Mill', rating: '4.8/5', status: 'Active' },
]

export const mockDemands = [
  { id: 'DEM-101', buyer: 'AgroFresh Foods', crop: 'Wheat Grade-A', requiredQty: '50 MT', priceOffered: '₹2,650 / Qtl', deadline: '2026-09-25', status: 'Open' },
  { id: 'DEM-102', buyer: 'GreenBasket Retail', crop: 'Organic Paddy', requiredQty: '30 MT', priceOffered: '₹3,400 / Qtl', deadline: '2026-09-28', status: 'Matched' },
  { id: 'DEM-103', buyer: 'PureGrain Mills', crop: 'Mustard Seed (High Oil)', requiredQty: '20 MT', priceOffered: '₹5,100 / Qtl', deadline: '2026-10-02', status: 'Fulfilled' },
]
