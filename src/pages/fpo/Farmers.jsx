import React, { useState } from 'react'

export default function Farmers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterVillage, setFilterVillage] = useState('All')
  const [selectedFarmer, setSelectedFarmer] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const [farmersList, setFarmersList] = useState([
    {
      id: 'FARM-001',
      name: 'Ramesh Patel',
      village: 'Torredu',
      district: 'East Godavari',
      phone: '+91 98480 11221',
      crop: 'Hybrid Tomato (Grade A)',
      acreage: '4.5 Acres',
      estYield: '9.0 MT',
      assignedHub: 'Rajahmundry Central Hub',
      bankAccount: 'SBI Jan Dhan **** 4892 (IFSC: SBIN0001201)',
      status: 'Verified Member',
      kycDate: '12 Jan 2026',
      supplyHistory: [
        { date: 'Today, 06:45 AM', ticket: 'TKT-9901', crop: 'Hybrid Tomato', grossQty: '250 kg', netAccepted: '240 kg', grade: 'Grade A (96%)', hub: 'Rajahmundry Central Hub' },
        { date: '10 Sep 2026', ticket: 'TKT-9812', crop: 'Hybrid Tomato', grossQty: '300 kg', netAccepted: '290 kg', grade: 'Grade A (95%)', hub: 'Rajahmundry Central Hub' },
        { date: '04 Sep 2026', ticket: 'TKT-9705', crop: 'Hybrid Tomato', grossQty: '200 kg', netAccepted: '195 kg', grade: 'Grade A (98%)', hub: 'Rajahmundry Central Hub' },
      ],
      settlementHistory: [
        { date: 'Today (Pending Clear)', orderId: 'ORD-1031', crop: 'Tomato', qty: '240 kg', rate: '₹25/kg', amount: '₹6,000', status: 'Calculated' },
        { date: '10 Sep 2026', orderId: 'ORD-1029', crop: 'Tomato', qty: '290 kg', rate: '₹25/kg', amount: '₹7,250', status: 'Direct Bank Settled' },
        { date: '04 Sep 2026', orderId: 'ORD-1025', crop: 'Tomato', qty: '195 kg', rate: '₹24/kg', amount: '₹4,680', status: 'Direct Bank Settled' },
      ],
    },
    {
      id: 'FARM-002',
      name: 'Suresh Verma',
      village: 'Katheru',
      district: 'East Godavari',
      phone: '+91 98480 33442',
      crop: 'Hybrid Tomato (Grade A)',
      acreage: '3.0 Acres',
      estYield: '6.5 MT',
      assignedHub: 'Rajahmundry Central Hub',
      bankAccount: 'Andhra Bank **** 7712 (IFSC: ANDB0000412)',
      status: 'Verified Member',
      kycDate: '15 Jan 2026',
      supplyHistory: [
        { date: 'Today, 07:15 AM', ticket: 'TKT-9902', crop: 'Hybrid Tomato', grossQty: '180 kg', netAccepted: '170 kg', grade: 'Grade A (94%)', hub: 'Rajahmundry Central Hub' },
        { date: '08 Sep 2026', ticket: 'TKT-9801', crop: 'Hybrid Tomato', grossQty: '220 kg', netAccepted: '215 kg', grade: 'Grade A (96%)', hub: 'Rajahmundry Central Hub' },
      ],
      settlementHistory: [
        { date: 'Today (Pending Clear)', orderId: 'ORD-1031', crop: 'Tomato', qty: '170 kg', rate: '₹25/kg', amount: '₹4,250', status: 'Calculated' },
        { date: '08 Sep 2026', orderId: 'ORD-1028', crop: 'Tomato', qty: '215 kg', rate: '₹25/kg', amount: '₹5,375', status: 'Direct Bank Settled' },
      ],
    },
    {
      id: 'FARM-003',
      name: 'Kavita Devi',
      village: 'Hukumpeta',
      district: 'East Godavari',
      phone: '+91 98480 55663',
      crop: 'Hybrid Tomato (Grade A)',
      acreage: '2.5 Acres',
      estYield: '5.0 MT',
      assignedHub: 'Rajahmundry Central Hub',
      bankAccount: 'Union Bank **** 9011 (IFSC: UBIN0541201)',
      status: 'Verified Member',
      kycDate: '18 Feb 2026',
      supplyHistory: [
        { date: 'Today, 07:40 AM', ticket: 'TKT-9903', crop: 'Hybrid Tomato', grossQty: '160 kg', netAccepted: '150 kg', grade: 'Grade A (97%)', hub: 'Rajahmundry Central Hub' },
      ],
      settlementHistory: [
        { date: 'Today (Pending Clear)', orderId: 'ORD-1031', crop: 'Tomato', qty: '150 kg', rate: '₹25/kg', amount: '₹3,750', status: 'Calculated' },
      ],
    },
    {
      id: 'FARM-004',
      name: 'Balwant Singh',
      village: 'Morampudi',
      district: 'East Godavari',
      phone: '+91 98480 77884',
      crop: 'Hybrid Tomato (Grade A)',
      acreage: '3.5 Acres',
      estYield: '7.0 MT',
      assignedHub: 'Rajahmundry Central Hub',
      bankAccount: 'SBI Jan Dhan **** 3321 (IFSC: SBIN0001201)',
      status: 'Verified Member',
      kycDate: '20 Feb 2026',
      supplyHistory: [
        { date: 'Today, 08:05 AM', ticket: 'TKT-9904', crop: 'Hybrid Tomato', grossQty: '150 kg', netAccepted: '140 kg', grade: 'Grade A (95%)', hub: 'Rajahmundry Central Hub' },
      ],
      settlementHistory: [
        { date: 'Today (Pending Clear)', orderId: 'ORD-1031', crop: 'Tomato', qty: '140 kg', rate: '₹25/kg', amount: '₹3,500', status: 'Calculated' },
      ],
    },
    {
      id: 'FARM-005',
      name: 'M. Venkat Reddy',
      village: 'Samalkota',
      district: 'Kakinada',
      phone: '+91 94401 22910',
      crop: 'Green Chilli (Grade A)',
      acreage: '5.0 Acres',
      estYield: '11.0 MT',
      assignedHub: 'Kakinada Coastal Agri Hub',
      bankAccount: 'HDFC Bank **** 1120 (IFSC: HDFC0001822)',
      status: 'Verified Member',
      kycDate: '05 Mar 2026',
      supplyHistory: [
        { date: 'Yesterday, 08:30 AM', ticket: 'TKT-9840', crop: 'Green Chilli', grossQty: '450 kg', netAccepted: '440 kg', grade: 'Grade A (98%)', hub: 'Kakinada Coastal Agri Hub' },
      ],
      settlementHistory: [
        { date: 'Yesterday', orderId: 'ORD-1029', crop: 'Green Chilli', qty: '440 kg', rate: '₹38/kg', amount: '₹16,720', status: 'Direct Bank Settled' },
      ],
    },
    {
      id: 'FARM-006',
      name: 'K. Anji Naik',
      village: 'Alamuru',
      district: 'Dr. B.R. Ambedkar Konaseema',
      phone: '+91 99890 44102',
      crop: 'Sharbati Wheat',
      acreage: '8.0 Acres',
      estYield: '18.0 MT',
      assignedHub: 'Mandapeta Grain Collection Depot',
      bankAccount: 'SBI Jan Dhan **** 9941 (IFSC: SBIN0003011)',
      status: 'Verified Member',
      kycDate: '10 Mar 2026',
      supplyHistory: [
        { date: '03 Sep 2026', ticket: 'TKT-9690', crop: 'Sharbati Wheat', grossQty: '3,200 kg', netAccepted: '3,180 kg', grade: 'Milling Grade (Moisture 11.2%)', hub: 'Mandapeta Grain Collection Depot' },
      ],
      settlementHistory: [
        { date: '04 Sep 2026', orderId: 'ORD-1022', crop: 'Sharbati Wheat', qty: '3,180 kg', rate: '₹26.50/kg', amount: '₹84,270', status: 'Direct Bank Settled' },
      ],
    },
  ])

  const [newFarmer, setNewFarmer] = useState({
    name: '',
    village: 'Torredu',
    phone: '',
    crop: 'Hybrid Tomato (Grade A)',
    acreage: '3.0 Acres',
    estYield: '6.0 MT',
    assignedHub: 'Rajahmundry Central Hub',
    bankAccount: '',
  })

  const handleAddFarmer = (e) => {
    e.preventDefault()
    const farmer = {
      id: `FARM-00${farmersList.length + 1}`,
      name: newFarmer.name,
      village: newFarmer.village,
      district: 'East Godavari',
      phone: newFarmer.phone,
      crop: newFarmer.crop,
      acreage: newFarmer.acreage,
      estYield: newFarmer.estYield,
      assignedHub: newFarmer.assignedHub,
      bankAccount: newFarmer.bankAccount || 'Jan Dhan Account Verified',
      status: 'Verified Member',
      kycDate: 'Today',
      supplyHistory: [],
      settlementHistory: [],
    }

    setFarmersList([farmer, ...farmersList])
    setShowAddModal(false)
    setToastMsg(`Successfully enrolled farmer "${newFarmer.name}" to cluster directory!`)
    setTimeout(() => setToastMsg(''), 4000)
    setNewFarmer({
      name: '',
      village: 'Torredu',
      phone: '',
      crop: 'Hybrid Tomato (Grade A)',
      acreage: '3.0 Acres',
      estYield: '6.0 MT',
      assignedHub: 'Rajahmundry Central Hub',
      bankAccount: '',
    })
  }

  const handleUpdateHubAssignment = (farmerId, newHub) => {
    setFarmersList(
      farmersList.map((f) => (f.id === farmerId ? { ...f, assignedHub: newHub } : f))
    )
    if (selectedFarmer && selectedFarmer.id === farmerId) {
      setSelectedFarmer({ ...selectedFarmer, assignedHub: newHub })
    }
    setToastMsg(`Hub assignment updated for ${farmerId} → ${newHub}`)
    setTimeout(() => setToastMsg(''), 3000)
  }

  const filteredFarmers = farmersList.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.crop.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesVillage = filterVillage === 'All' || f.village === filterVillage
    return matchesSearch && matchesVillage
  })

  return (
    <div className="space-y-8 pb-12">
      {/* Toast */}
      {toastMsg && (
        <div className="p-4 rounded-xl bg-[#e6ecd5] border border-[#1b6e53] text-[#1b6e53] font-semibold text-xs flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg('')} className="text-[#1b6e53] hover:underline">
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              Smallholder Register
            </span>
            <span className="text-[10px] font-mono text-[#6d6d6d]">
              42 Enrolled Cluster Members
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#00372a]">
            Farmer Directory & Allocations
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1">
            Manage cultivator profiles, GPS landholdings, assigned aggregation hubs, and direct Jan Dhan escrow payout audit logs.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition"
        >
          <span className="material-symbols-outlined text-[16px]">person_add</span>
          <span>Register Farmer</span>
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Active Cultivators</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#1b6e53] mt-1">42 Members</p>
          <span className="text-[10px] text-emerald-700 font-medium">100% Aadhaar & KYC Verified</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Aggregated Acreage</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a] mt-1">164.5 Acres</p>
          <span className="text-[10px] text-[#6d6d6d]">Across 14 village clusters</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">T+0 Payout Volume</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#1b6e53] mt-1">₹14.82 Lakhs</p>
          <span className="text-[10px] text-emerald-700 font-medium">Direct Escrow Jan Dhan</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">App Dependency</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#683600] mt-1">0% (Zero App)</p>
          <span className="text-[10px] text-[#683600]">Weighment Slips + SMS + IVR</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-[20px] border border-[#c3cda7]">
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-slate-400">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search farmer name, ID, or crop..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#c3cda7] focus:outline-hidden focus:border-[#1b6e53]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#6d6d6d] font-mono whitespace-nowrap">Filter Village:</span>
          <select
            value={filterVillage}
            onChange={(e) => setFilterVillage(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-[#c3cda7] bg-white"
          >
            <option value="All">All Villages</option>
            <option value="Torredu">Torredu</option>
            <option value="Katheru">Katheru</option>
            <option value="Hukumpeta">Hukumpeta</option>
            <option value="Morampudi">Morampudi</option>
            <option value="Samalkota">Samalkota</option>
            <option value="Alamuru">Alamuru</option>
          </select>
        </div>
      </div>

      {/* Farmers Table */}
      <div className="bg-white rounded-[24px] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#c3cda7] bg-[#f1efdf]/60 text-[#6d6d6d] font-mono uppercase">
                <th className="p-4">Farmer Details</th>
                <th className="p-4">Village & Land</th>
                <th className="p-4">Primary Commodity</th>
                <th className="p-4">Assigned Intake Hub</th>
                <th className="p-4">Bank Escrow Account</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/40">
              {filteredFarmers.map((farmer) => (
                <tr key={farmer.id} className="hover:bg-[#f1efdf]/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center font-bold text-xs">
                        {farmer.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <span className="font-bold text-[#00372a] block">{farmer.name}</span>
                        <span className="text-[10px] font-mono text-[#6d6d6d]">{farmer.id} • {farmer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-[#353535] block">{farmer.village}, {farmer.district}</span>
                    <span className="text-[10px] text-[#6d6d6d] font-mono">{farmer.acreage} (Est: {farmer.estYield})</span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-1 rounded-full text-[10px]">
                      {farmer.crop}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-xs font-semibold text-[#00372a] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#1b6e53]">hub</span>
                      {farmer.assignedHub}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-[11px] font-mono text-[#353535] block">{farmer.bankAccount}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">T+0 Escrow Active</span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedFarmer(farmer)}
                      className="px-3 py-1.5 rounded-full bg-[#1b6e53] text-white font-semibold text-[11px] hover:bg-[#00372a] transition"
                    >
                      View Profile & History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Farmer Detail Drawer / Modal */}
      {selectedFarmer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] border border-[#c3cda7] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#c3cda7]/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#1b6e53] text-[#e8fe85] flex items-center justify-center font-bold text-base">
                  {selectedFarmer.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-[#e6ecd5] text-[#1b6e53] px-2 py-0.5 rounded-full">
                      {selectedFarmer.id}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold">
                      ✓ {selectedFarmer.status}
                    </span>
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                    {selectedFarmer.name}
                  </h3>
                  <p className="text-xs text-[#6d6d6d] font-mono">{selectedFarmer.phone} • Village: {selectedFarmer.village}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFarmer(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Profile & Hub Reassignment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f1efdf] p-4 rounded-2xl text-xs">
              <div>
                <span className="text-[10px] text-[#6d6d6d] uppercase font-mono block">Landholding & Crop:</span>
                <span className="font-semibold text-[#00372a]">{selectedFarmer.acreage} • {selectedFarmer.crop}</span>
                <span className="text-[10px] text-[#6d6d6d] block mt-1">Est. Seasonal Yield: {selectedFarmer.estYield}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6d6d6d] uppercase font-mono block">Assigned Aggregation Hub:</span>
                <select
                  value={selectedFarmer.assignedHub}
                  onChange={(e) => handleUpdateHubAssignment(selectedFarmer.id, e.target.value)}
                  className="mt-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-[#c3cda7] bg-white text-[#1b6e53]"
                >
                  <option>Rajahmundry Central Hub</option>
                  <option>Kakinada Coastal Agri Hub</option>
                  <option>Mandapeta Grain Collection Depot</option>
                  <option>Ravulapalem Banana & Horticulture Hub</option>
                </select>
              </div>
              <div className="sm:col-span-2 border-t border-[#c3cda7]/40 pt-2">
                <span className="text-[10px] text-[#6d6d6d] uppercase font-mono block">Escrow Jan Dhan Bank Details:</span>
                <span className="font-mono font-medium text-[#00372a]">{selectedFarmer.bankAccount}</span>
              </div>
            </div>

            {/* Supply History */}
            <div className="space-y-3">
              <h4 className="font-mono font-bold text-[#1b6e53] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">history</span>
                <span>Produce Intake & Weighment History</span>
              </h4>
              {selectedFarmer.supplyHistory && selectedFarmer.supplyHistory.length > 0 ? (
                <div className="border border-[#c3cda7] rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#f1efdf]/60 font-mono text-[10px] text-[#6d6d6d]">
                      <tr>
                        <th className="p-2.5">Date / Time</th>
                        <th className="p-2.5">Ticket #</th>
                        <th className="p-2.5">Gross / Net</th>
                        <th className="p-2.5">Quality Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#c3cda7]/30">
                      {selectedFarmer.supplyHistory.map((s, idx) => (
                        <tr key={idx}>
                          <td className="p-2.5 text-[#353535]">{s.date}</td>
                          <td className="p-2.5 font-mono text-[#1b6e53] font-bold">{s.ticket}</td>
                          <td className="p-2.5 font-medium">{s.grossQty} → {s.netAccepted}</td>
                          <td className="p-2.5 text-emerald-700 font-semibold">{s.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-[#6d6d6d] italic bg-white p-3 rounded-lg border border-[#c3cda7]">
                  No drop-offs recorded yet for this season cycle.
                </p>
              )}
            </div>

            {/* Settlement History */}
            <div className="space-y-3">
              <h4 className="font-mono font-bold text-[#1b6e53] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">currency_rupee</span>
                <span>Farmer Jan Dhan Payout History</span>
              </h4>
              {selectedFarmer.settlementHistory && selectedFarmer.settlementHistory.length > 0 ? (
                <div className="border border-[#c3cda7] rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#f1efdf]/60 font-mono text-[10px] text-[#6d6d6d]">
                      <tr>
                        <th className="p-2.5">Settlement Date</th>
                        <th className="p-2.5">Order ID</th>
                        <th className="p-2.5">Qty × Agreed Rate</th>
                        <th className="p-2.5">Total Payout</th>
                        <th className="p-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#c3cda7]/30">
                      {selectedFarmer.settlementHistory.map((sh, idx) => (
                        <tr key={idx}>
                          <td className="p-2.5 text-[#353535]">{sh.date}</td>
                          <td className="p-2.5 font-mono text-[#00372a] font-bold">{sh.orderId}</td>
                          <td className="p-2.5">{sh.qty} @ {sh.rate}</td>
                          <td className="p-2.5 font-bold text-[#1b6e53]">{sh.amount}</td>
                          <td className="p-2.5">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#e6ecd5] text-[#1b6e53] font-bold">
                              {sh.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-[#6d6d6d] italic bg-white p-3 rounded-lg border border-[#c3cda7]">
                  No past settlements on record.
                </p>
              )}
            </div>

            {/* Footer actions */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedFarmer(null)}
                className="px-6 py-2.5 rounded-[100px] bg-[#1b6e53] text-white font-bold text-xs uppercase"
              >
                Close Farmer Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Farmer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] border border-[#c3cda7] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
            <div className="flex items-start justify-between border-b border-[#c3cda7]/60 pb-4">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Register New Farmer Member
                </h3>
                <p className="text-xs text-[#6d6d6d]">Enroll cultivator into FPO collective with zero-app access</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddFarmer} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">FULL NAME</label>
                <input
                  required
                  type="text"
                  value={newFarmer.name}
                  onChange={(e) => setNewFarmer({ ...newFarmer, name: e.target.value })}
                  placeholder="e.g. Venkata Ramana Rao"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">VILLAGE / REGION</label>
                  <input
                    required
                    type="text"
                    value={newFarmer.village}
                    onChange={(e) => setNewFarmer({ ...newFarmer, village: e.target.value })}
                    placeholder="e.g. Torredu"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">PHONE (FOR SMS/IVR)</label>
                  <input
                    required
                    type="text"
                    value={newFarmer.phone}
                    onChange={(e) => setNewFarmer({ ...newFarmer, phone: e.target.value })}
                    placeholder="+91 98480 00000"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">PRIMARY CROP</label>
                  <input
                    required
                    type="text"
                    value={newFarmer.crop}
                    onChange={(e) => setNewFarmer({ ...newFarmer, crop: e.target.value })}
                    placeholder="e.g. Hybrid Tomato"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">LANDHOLDING ACRES</label>
                  <input
                    required
                    type="text"
                    value={newFarmer.acreage}
                    onChange={(e) => setNewFarmer({ ...newFarmer, acreage: e.target.value })}
                    placeholder="e.g. 3.5 Acres"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">ASSIGN TO INTAKE HUB</label>
                <select
                  value={newFarmer.assignedHub}
                  onChange={(e) => setNewFarmer({ ...newFarmer, assignedHub: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] bg-white"
                >
                  <option>Rajahmundry Central Hub</option>
                  <option>Kakinada Coastal Agri Hub</option>
                  <option>Mandapeta Grain Collection Depot</option>
                  <option>Ravulapalem Banana & Horticulture Hub</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">BANK JAN DHAN ACCOUNT (FOR ESCROW)</label>
                <input
                  type="text"
                  value={newFarmer.bankAccount}
                  onChange={(e) => setNewFarmer({ ...newFarmer, bankAccount: e.target.value })}
                  placeholder="e.g. SBI Jan Dhan **** 8821 (IFSC: SBIN0001201)"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#c3cda7]/40">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full border border-[#c3cda7] text-xs font-semibold text-[#6d6d6d]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#1b6e53] hover:bg-[#00372a] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Enroll Farmer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
