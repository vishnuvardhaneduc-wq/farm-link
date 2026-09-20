import React, { useState } from 'react'

export default function Buyers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBuyer, setSelectedBuyer] = useState(null)
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const [buyersList, setBuyersList] = useState([
    {
      id: 'BUY-101',
      company: 'AgroFresh Enterprise',
      legalName: 'AgroFresh Foods & Logistics India Pvt Ltd',
      contactPerson: 'Anita Rao',
      role: 'Chief Procurement Officer',
      email: 'anita.rao@agrofresh.in',
      phone: '+91 98450 11920',
      location: 'Vijayawada Processing Hub & Regional DC',
      state: 'Andhra Pradesh',
      category: 'Institutional Food Processor',
      rating: '4.95 / 5.0 (Tier-1 Enterprise)',
      gstin: '37AAACA4928K1ZX',
      mandiLicense: 'AP-VJA-2024-MANDI-882',
      escrowStatus: 'Live Pre-Funded Escrow Active',
      totalProcuredVolume: '245.0 MT',
      totalSpend: '₹68.50 Lakhs',
      onTimeSettlementRate: '100% (Avg: 1.4 Hours post-delivery)',
      activeContracts: 2,
      orderHistory: [
        { orderId: 'ORD-1031', crop: 'Tomato (Grade A)', qty: '700 kg', status: 'Dispatched / In Transit', amount: '₹28,500', date: 'Today' },
        { orderId: 'ORD-1025', crop: 'Tomato (Grade A)', qty: '1,200 kg', status: 'Delivered & Settled', amount: '₹48,000', date: '04 Sep 2026' },
        { orderId: 'ORD-1018', crop: 'Green Chilli (Grade A)', qty: '600 kg', status: 'Delivered & Settled', amount: '₹25,200', date: '28 Aug 2026' },
      ],
    },
    {
      id: 'BUY-102',
      company: 'Reliance Retail Fresh',
      legalName: 'Reliance Retail Ventures Ltd - Agro Division',
      contactPerson: 'Sanjay Deshmukh',
      role: 'Regional Category Sourcing Head',
      email: 'sanjay.deshmukh@ril.com',
      phone: '+91 98200 44812',
      location: 'Guntur Cold Chain DC',
      state: 'Andhra Pradesh',
      category: 'Modern Supermarket Chain',
      rating: '4.90 / 5.0',
      gstin: '37AABCR2819N1ZV',
      mandiLicense: 'AP-GNT-2023-LIC-441',
      escrowStatus: 'Live Pre-Funded Escrow Active',
      totalProcuredVolume: '180.0 MT',
      totalSpend: '₹52.40 Lakhs',
      onTimeSettlementRate: '99.2%',
      activeContracts: 1,
      orderHistory: [
        { orderId: 'ORD-1029', crop: 'Green Chilli (Grade A)', qty: '450 kg', status: 'Delivered & Settled', amount: '₹23,500', date: 'Yesterday' },
        { orderId: 'ORD-1014', crop: 'Sweet Corn (Grade A)', qty: '2,000 kg', status: 'Delivered & Settled', amount: '₹38,000', date: '20 Aug 2026' },
      ],
    },
    {
      id: 'BUY-103',
      company: 'BigBasket Fulfillment',
      legalName: 'Supermarket Grocery Supplies Pvt Ltd',
      contactPerson: 'Karthik Raman',
      role: 'Direct Farm Sourcing Lead',
      email: 'karthik.r@bigbasket.com',
      phone: '+91 98800 77319',
      location: 'Hyderabad North DC',
      state: 'Telangana',
      category: 'E-Commerce Grocery Fulfillment',
      rating: '4.85 / 5.0',
      gstin: '36AABCS9912K1Z8',
      mandiLicense: 'TS-HYD-2024-ONL-102',
      escrowStatus: 'Live Pre-Funded Escrow Active',
      totalProcuredVolume: '320.0 MT',
      totalSpend: '₹84.00 Lakhs',
      onTimeSettlementRate: '98.8%',
      activeContracts: 1,
      orderHistory: [
        { orderId: 'ORD-1028', crop: 'Onion Red (Medium)', qty: '3,000 kg', status: 'Delivered & Settled', amount: '₹72,000', date: '08 Sep 2026' },
      ],
    },
    {
      id: 'BUY-104',
      company: 'PureGrain Mills & Exports',
      legalName: 'PureGrain Agro Industries Ltd',
      contactPerson: 'Manoj Shah',
      role: 'Commercial Grain Director',
      email: 'manoj@puregrain.in',
      phone: '+91 98250 99182',
      location: 'Kakinada Port Export Zone',
      state: 'Andhra Pradesh',
      category: 'Flour & Pulse Processing Miller',
      rating: '4.80 / 5.0',
      gstin: '37AABCP1104D1ZG',
      mandiLicense: 'AP-KKD-2022-EXP-901',
      escrowStatus: 'Live Pre-Funded Escrow Active',
      totalProcuredVolume: '450.0 MT',
      totalSpend: '₹1.18 Crores',
      onTimeSettlementRate: '100%',
      activeContracts: 0,
      orderHistory: [
        { orderId: 'ORD-1022', crop: 'Sharbati Wheat', qty: '20 MT', status: 'Delivered & Settled', amount: '₹5,30,000', date: '04 Sep 2026' },
      ],
    },
  ])

  const [newBuyer, setNewBuyer] = useState({
    company: '',
    contactPerson: '',
    role: 'Procurement Officer',
    email: '',
    phone: '',
    location: '',
    category: 'Institutional Food Processor',
    gstin: '',
  })

  const handleConnectBuyer = (e) => {
    e.preventDefault()
    const buyer = {
      id: `BUY-10${buyersList.length + 1}`,
      company: newBuyer.company,
      legalName: newBuyer.company,
      contactPerson: newBuyer.contactPerson,
      role: newBuyer.role,
      email: newBuyer.email,
      phone: newBuyer.phone,
      location: newBuyer.location,
      state: 'Andhra Pradesh',
      category: newBuyer.category,
      rating: '5.0 / 5.0 (New Partner)',
      gstin: newBuyer.gstin || '37AAAXX0000X1ZZ',
      mandiLicense: 'AP-MANDI-VERIFIED',
      escrowStatus: 'Pre-Funded Escrow Active',
      totalProcuredVolume: '0.0 MT',
      totalSpend: '₹0',
      onTimeSettlementRate: '100%',
      activeContracts: 0,
      orderHistory: [],
    }

    setBuyersList([buyer, ...buyersList])
    setShowConnectModal(false)
    setToastMsg(`Successfully connected institutional buyer "${newBuyer.company}"!`)
    setTimeout(() => setToastMsg(''), 4000)
  }

  const filteredBuyers = buyersList.filter((b) =>
    b.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
              Institutional Network
            </span>
            <span className="text-[10px] font-mono text-[#6d6d6d]">
              8 Connected Enterprise Buyers
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#00372a]">
            Institutional Buyer Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1">
            Verified food processors, retail chains, and commodity millers connected with automated escrow settlement.
          </p>
        </div>

        <button
          onClick={() => setShowConnectModal(true)}
          className="px-4 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition"
        >
          <span className="material-symbols-outlined text-[16px]">domain_add</span>
          <span>Connect Buyer</span>
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Connected Buyers</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#1b6e53] mt-1">8 Enterprise</p>
          <span className="text-[10px] text-emerald-700 font-medium">100% GST & Mandi Licensed</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Cumulative Volume</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a] mt-1">1,195 MT</p>
          <span className="text-[10px] text-[#6d6d6d]">Direct farm gate off-take</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Escrow Settlement Avg</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#1b6e53] mt-1">&lt; 1.5 Hours</p>
          <span className="text-[10px] text-emerald-700 font-medium">Post delivery confirmation</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Active RFQs</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#683600] mt-1">4 Tenders</p>
          <span className="text-[10px] text-[#683600]">1,850 kg aggregate demand</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-96">
        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-slate-400">search</span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search company, contact person, or city..."
          className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#c3cda7] focus:outline-hidden focus:border-[#1b6e53] bg-white"
        />
      </div>

      {/* Buyers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBuyers.map((buyer) => (
          <div
            key={buyer.id}
            className="bg-white rounded-[24px] border border-[#c3cda7] p-6 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-[#b2cee7]/50 text-[#00372a] px-2 py-0.5 rounded-full">
                      {buyer.id}
                    </span>
                    <span className="text-[10px] font-mono text-[#6d6d6d]">{buyer.category}</span>
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-[#00372a] mt-1">
                    {buyer.company}
                  </h3>
                  <p className="text-xs text-[#6d6d6d] flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    <span>{buyer.location}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#e6ecd5] text-[#1b6e53] font-mono block">
                    ★ {buyer.rating}
                  </span>
                  <span className="text-[9px] text-emerald-700 font-mono mt-1 block">Escrow Active</span>
                </div>
              </div>

              {/* Stats overview */}
              <div className="grid grid-cols-3 gap-2 bg-[#f1efdf]/60 rounded-xl p-3 text-xs">
                <div>
                  <span className="text-[10px] text-[#6d6d6d] block font-mono">Volume Sourced:</span>
                  <span className="font-bold text-[#1b6e53]">{buyer.totalProcuredVolume}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6d6d6d] block font-mono">Total Spend:</span>
                  <span className="font-bold text-[#00372a]">{buyer.totalSpend}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6d6d6d] block font-mono">Active Orders:</span>
                  <span className="font-bold text-[#683600]">{buyer.activeContracts} Active</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#353535]">
                <p><strong>Procurement Officer:</strong> {buyer.contactPerson} ({buyer.role})</p>
                <p><strong>Contact:</strong> {buyer.email} • {buyer.phone}</p>
                <p><strong>GSTIN:</strong> <span className="font-mono">{buyer.gstin}</span></p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#c3cda7]/40 flex items-center justify-between">
              <button
                onClick={() => setSelectedBuyer(buyer)}
                className="text-xs font-bold text-[#1b6e53] hover:underline flex items-center gap-1"
              >
                <span>View Order History & Contracts</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
              <span className="text-[10px] text-emerald-700 font-mono font-bold">100% On-Time Payout</span>
            </div>
          </div>
        ))}
      </div>

      {/* Buyer Detail Drawer / Modal */}
      {selectedBuyer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] border border-[#c3cda7] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-start justify-between border-b border-[#c3cda7]/60 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#6d6d6d] uppercase">{selectedBuyer.id} Enterprise Profile</span>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  {selectedBuyer.company}
                </h3>
                <p className="text-xs text-[#6d6d6d]">{selectedBuyer.legalName}</p>
              </div>
              <button
                onClick={() => setSelectedBuyer(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-[#f1efdf] p-4 rounded-xl text-xs">
              <div>
                <span className="text-[10px] text-[#6d6d6d] uppercase font-mono block">Procurement Officer:</span>
                <span className="font-semibold text-[#00372a]">{selectedBuyer.contactPerson} ({selectedBuyer.role})</span>
                <span className="text-[10px] text-[#6d6d6d] block">{selectedBuyer.phone}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6d6d6d] uppercase font-mono block">Delivery Destination:</span>
                <span className="font-semibold text-[#00372a]">{selectedBuyer.location}</span>
              </div>
              <div className="col-span-2 border-t border-[#c3cda7]/40 pt-2 flex items-center justify-between">
                <span><strong>GSTIN:</strong> <span className="font-mono">{selectedBuyer.gstin}</span></span>
                <span><strong>Mandi License:</strong> <span className="font-mono">{selectedBuyer.mandiLicense}</span></span>
              </div>
            </div>

            {/* Order History */}
            <div className="space-y-3">
              <h4 className="font-mono font-bold text-[#1b6e53] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                <span>Procurement & Order History</span>
              </h4>
              {selectedBuyer.orderHistory && selectedBuyer.orderHistory.length > 0 ? (
                <div className="border border-[#c3cda7] rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#f1efdf]/60 font-mono text-[10px] text-[#6d6d6d]">
                      <tr>
                        <th className="p-2.5">Order ID</th>
                        <th className="p-2.5">Commodity & Quantity</th>
                        <th className="p-2.5">Value</th>
                        <th className="p-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#c3cda7]/30">
                      {selectedBuyer.orderHistory.map((ord) => (
                        <tr key={ord.orderId}>
                          <td className="p-2.5 font-mono text-[#00372a] font-bold">{ord.orderId}</td>
                          <td className="p-2.5 font-medium">{ord.crop} ({ord.qty})</td>
                          <td className="p-2.5 font-bold text-[#1b6e53]">{ord.amount}</td>
                          <td className="p-2.5">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#e6ecd5] text-[#1b6e53] font-bold">
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-[#6d6d6d] italic bg-white p-3 rounded-lg border border-[#c3cda7]">
                  No prior orders. Connected for ongoing harvest tenders.
                </p>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedBuyer(null)}
                className="px-6 py-2.5 rounded-[100px] bg-[#1b6e53] text-white font-bold text-xs uppercase"
              >
                Close Buyer Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Connect Buyer Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] border border-[#c3cda7] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
            <div className="flex items-start justify-between border-b border-[#c3cda7]/60 pb-4">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Connect Institutional Buyer
                </h3>
                <p className="text-xs text-[#6d6d6d]">Invite enterprise buyer to tender directly to FPO collective</p>
              </div>
              <button
                onClick={() => setShowConnectModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConnectBuyer} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">COMPANY NAME</label>
                <input
                  required
                  type="text"
                  value={newBuyer.company}
                  onChange={(e) => setNewBuyer({ ...newBuyer, company: e.target.value })}
                  placeholder="e.g. ITC Agri Business Division"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">CONTACT PERSON</label>
                  <input
                    required
                    type="text"
                    value={newBuyer.contactPerson}
                    onChange={(e) => setNewBuyer({ ...newBuyer, contactPerson: e.target.value })}
                    placeholder="e.g. Rajesh Nair"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">PHONE</label>
                  <input
                    required
                    type="text"
                    value={newBuyer.phone}
                    onChange={(e) => setNewBuyer({ ...newBuyer, phone: e.target.value })}
                    placeholder="+91 98450 00000"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">EMAIL ADDRESS</label>
                <input
                  required
                  type="email"
                  value={newBuyer.email}
                  onChange={(e) => setNewBuyer({ ...newBuyer, email: e.target.value })}
                  placeholder="procurement@itc.in"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">DELIVERY HUB LOCATION</label>
                  <input
                    required
                    type="text"
                    value={newBuyer.location}
                    onChange={(e) => setNewBuyer({ ...newBuyer, location: e.target.value })}
                    placeholder="e.g. Guntur DC"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">GSTIN</label>
                  <input
                    type="text"
                    value={newBuyer.gstin}
                    onChange={(e) => setNewBuyer({ ...newBuyer, gstin: e.target.value })}
                    placeholder="37AAACI1029X1Z1"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#c3cda7]/40">
                <button
                  type="button"
                  onClick={() => setShowConnectModal(false)}
                  className="px-4 py-2 rounded-full border border-[#c3cda7] text-xs font-semibold text-[#6d6d6d]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#1b6e53] hover:bg-[#00372a] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Connect Buyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
