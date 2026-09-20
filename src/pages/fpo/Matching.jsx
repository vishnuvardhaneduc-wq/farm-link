import React, { useState } from 'react'
import { Link } from 'react-router'

export default function Matching() {
  const [selectedRFQ, setSelectedRFQ] = useState('REQ-1026')
  const [allocationConfirmed, setAllocationConfirmed] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const rfqMatches = [
    {
      id: 'REQ-1026',
      buyer: 'AgroFresh Enterprise',
      crop: 'Hybrid Tomato (Grade A)',
      requiredQty: '700 kg',
      offeredPrice: '₹28.00 / kg',
      destination: 'Vijayawada Processing Hub',
      deliveryDate: '2026-09-14',
      matchScore: '98% Optimal Match',
      hubSuitability: [
        {
          hubId: 'HUB-04',
          hubName: 'Rajahmundry Central Hub',
          suitabilityScore: '96%',
          distanceKm: '64 km (1.5 hrs)',
          coldChain: 'Available (Chamber A @ 11°C)',
          allocatedQty: '700 kg',
          status: 'Optimal Primary Hub',
          isRecommended: true,
        },
        {
          hubId: 'HUB-02',
          hubName: 'Kakinada Coastal Agri Hub',
          suitabilityScore: '82%',
          distanceKm: '128 km (2.8 hrs)',
          coldChain: 'Available',
          allocatedQty: '0 kg',
          status: 'Secondary Backup Hub',
          isRecommended: false,
        },
      ],
      farmerAllocation: [
        { id: 'FARM-001', name: 'Ramesh Patel', village: 'Torredu', acreage: '4.5 Ac', fairQuota: '240 kg', readiness: 'Harvested & Inward Weighed', match: '100%' },
        { id: 'FARM-002', name: 'Suresh Verma', village: 'Katheru', acreage: '3.0 Ac', fairQuota: '170 kg', readiness: 'Harvested & Inward Weighed', match: '98%' },
        { id: 'FARM-003', name: 'Kavita Devi', village: 'Hukumpeta', acreage: '2.5 Ac', fairQuota: '150 kg', readiness: 'Harvested & Inward Weighed', match: '97%' },
        { id: 'FARM-004', name: 'Balwant Singh', village: 'Morampudi', acreage: '3.5 Ac', fairQuota: '140 kg', readiness: 'Harvested & Inward Weighed', match: '95%' },
      ],
    },
    {
      id: 'REQ-1027',
      buyer: 'Reliance Retail Fresh',
      crop: 'Green Chilli (Grade A)',
      requiredQty: '450 kg',
      offeredPrice: '₹40.00 / kg',
      destination: 'Guntur Cold Chain DC',
      deliveryDate: '2026-09-15',
      matchScore: '94% Optimal Match',
      hubSuitability: [
        {
          hubId: 'HUB-02',
          hubName: 'Kakinada Coastal Agri Hub',
          suitabilityScore: '94%',
          distanceKm: '92 km',
          coldChain: 'Chilled Storage Active',
          allocatedQty: '450 kg',
          status: 'Optimal Primary Hub',
          isRecommended: true,
        },
      ],
      farmerAllocation: [
        { id: 'FARM-005', name: 'M. Venkat Reddy', village: 'Samalkota', acreage: '5.0 Ac', fairQuota: '450 kg', readiness: 'Lot Packed in Crates', match: '96%' },
      ],
    },
    {
      id: 'REQ-1030',
      buyer: 'PureGrain Mills',
      crop: 'Sharbati Wheat (Milling)',
      requiredQty: '20.0 MT',
      offeredPrice: '₹26.50 / kg',
      destination: 'Kakinada Port Export Zone',
      deliveryDate: '2026-09-20',
      matchScore: '92% Match',
      hubSuitability: [
        {
          hubId: 'HUB-03',
          hubName: 'Mandapeta Grain Depot',
          suitabilityScore: '92%',
          distanceKm: '42 km',
          coldChain: 'Hermetic Silo Storage',
          allocatedQty: '20.0 MT',
          status: 'Optimal Primary Hub',
          isRecommended: true,
        },
      ],
      farmerAllocation: [
        { id: 'FARM-006', name: 'K. Anji Naik', village: 'Alamuru', acreage: '8.0 Ac', fairQuota: '12.0 MT', readiness: 'In Silo B-2', match: '98%' },
        { id: 'FARM-007', name: 'P. Subba Rao', village: 'Kapileswarapuram', acreage: '6.0 Ac', fairQuota: '8.0 MT', readiness: 'In Silo B-4', match: '94%' },
      ],
    },
  ]

  const currentMatch = rfqMatches.find((m) => m.id === selectedRFQ) || rfqMatches[0]

  const handleConfirmAllocation = () => {
    setAllocationConfirmed(true)
    setToastMsg(`Allocation Confirmed for ${currentMatch.id}! Dispatched to Rajahmundry Central Hub bay queue.`)
    setTimeout(() => setToastMsg(''), 5000)
  }

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
              KrishiSetu Intelligent Router
            </span>
            <span className="text-[10px] font-mono text-[#6d6d6d]">
              Live Fair Allocation Engine
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#00372a]">
            Matching & Hub Allocation Engine
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1">
            Pair incoming institutional buyer tenders with optimal village aggregation hubs and fair farmer supply quotas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/fpo/requests"
            className="px-4 py-2.5 rounded-[100px] bg-white border border-[#c3cda7] hover:bg-[#f1efdf] text-[#1b6e53] font-bold text-xs uppercase tracking-wider shadow-2xs transition"
          >
            ← Back to Requests
          </Link>
        </div>
      </div>

      {/* Tender Selector Tabs */}
      <div className="flex flex-wrap gap-3">
        {rfqMatches.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setSelectedRFQ(m.id)
              setAllocationConfirmed(false)
            }}
            className={`px-5 py-3 rounded-2xl border text-left transition flex items-center gap-3 ${
              selectedRFQ === m.id
                ? 'bg-[#1b6e53] text-white border-[#1b6e53] shadow-md'
                : 'bg-white text-[#353535] border-[#c3cda7] hover:bg-[#f1efdf]'
            }`}
          >
            <div>
              <span className={`text-[10px] font-mono font-bold block ${selectedRFQ === m.id ? 'text-[#e8fe85]' : 'text-[#6d6d6d]'}`}>
                {m.id} • {m.buyer}
              </span>
              <span className="text-xs font-bold block">{m.crop} ({m.requiredQty})</span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
              selectedRFQ === m.id ? 'bg-[#e8fe85] text-[#1b6e53]' : 'bg-[#e6ecd5] text-[#1b6e53]'
            }`}>
              {m.matchScore}
            </span>
          </button>
        ))}
      </div>

      {/* Main Allocation Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: RFQ Summary & Hub Suitability */}
        <div className="space-y-6 lg:col-span-1">
          {/* Tender Specs */}
          <div className="bg-white rounded-[24px] border border-[#c3cda7] p-6 space-y-4 shadow-xs">
            <h3 className="font-editorial text-xl font-bold text-[#00372a] border-b border-[#c3cda7]/40 pb-2">
              Tender Parameters
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-[#6d6d6d]">Buyer Entity:</span><strong className="text-[#00372a]">{currentMatch.buyer}</strong></div>
              <div className="flex justify-between"><span className="text-[#6d6d6d]">Commodity:</span><strong>{currentMatch.crop}</strong></div>
              <div className="flex justify-between"><span className="text-[#6d6d6d]">Target Volume:</span><strong className="text-[#1b6e53]">{currentMatch.requiredQty}</strong></div>
              <div className="flex justify-between"><span className="text-[#6d6d6d]">Offered Rate:</span><strong className="text-[#00372a]">{currentMatch.offeredPrice}</strong></div>
              <div className="flex justify-between"><span className="text-[#6d6d6d]">Destination DC:</span><span>{currentMatch.destination}</span></div>
              <div className="flex justify-between"><span className="text-[#6d6d6d]">Delivery Window:</span><span className="font-mono">{currentMatch.deliveryDate}</span></div>
            </div>
          </div>

          {/* Hub Suitability Ranking */}
          <div className="bg-white rounded-[24px] border border-[#c3cda7] p-6 space-y-4 shadow-xs">
            <h3 className="font-editorial text-xl font-bold text-[#00372a]">
              Hub Suitability Ranking
            </h3>
            <div className="space-y-3">
              {currentMatch.hubSuitability.map((hub) => (
                <div
                  key={hub.hubId}
                  className={`p-4 rounded-xl border text-xs space-y-2 ${
                    hub.isRecommended
                      ? 'bg-[#e6ecd5]/40 border-[#1b6e53]'
                      : 'bg-[#f1efdf]/40 border-[#c3cda7]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#00372a]">{hub.hubName}</span>
                    <span className="font-mono font-bold text-[#1b6e53] bg-[#e8fe85] px-2 py-0.5 rounded-full text-[10px]">
                      {hub.suitabilityScore} Suitability
                    </span>
                  </div>
                  <div className="text-[11px] text-[#353535] space-y-0.5">
                    <p>• Distance to DC: {hub.distanceKm}</p>
                    <p>• Cold Storage: {hub.coldChain}</p>
                    <p>• Allocated Share: <strong>{hub.allocatedQty}</strong></p>
                  </div>
                  <span className="inline-block text-[10px] font-bold text-[#1b6e53] font-mono">
                    ✓ {hub.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Fair Farmer Allocation Algorithm */}
        <div className="bg-white rounded-[24px] border border-[#c3cda7] p-6 sm:p-8 lg:col-span-2 space-y-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#c3cda7]/40 pb-3">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Fair Farmer Allocation Matrix
                </h3>
                <p className="text-xs text-[#6d6d6d]">
                  Algorithm mathematically distributes buyer tonnage equitably across member landholdings.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#e6ecd5] px-3 py-1 rounded-full whitespace-nowrap">
                100% Demand Met
              </span>
            </div>

            <div className="border border-[#c3cda7] rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#f1efdf] text-[#6d6d6d] font-mono text-[10px] uppercase">
                  <tr>
                    <th className="p-3">Farmer & Village</th>
                    <th className="p-3">Landholding</th>
                    <th className="p-3">Harvest Readiness</th>
                    <th className="p-3 text-right">Fair Allocation Quota</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c3cda7]/40">
                  {currentMatch.farmerAllocation.map((farmer) => (
                    <tr key={farmer.id} className="hover:bg-[#f1efdf]/30">
                      <td className="p-3">
                        <span className="font-bold text-[#00372a] block">{farmer.name}</span>
                        <span className="text-[10px] text-[#6d6d6d] font-mono">{farmer.id} • {farmer.village}</span>
                      </td>
                      <td className="p-3 font-semibold text-[#353535]">{farmer.acreage}</td>
                      <td className="p-3">
                        <span className="text-emerald-700 font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          {farmer.readiness}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <span className="font-bold text-[#1b6e53] text-sm block font-mono">{farmer.fairQuota}</span>
                        <span className="text-[10px] text-[#6d6d6d]">Est: ₹{parseInt(farmer.fairQuota) * 25} payout</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#f1efdf] p-4 rounded-2xl space-y-2 text-xs">
              <h4 className="font-mono font-bold text-[#1b6e53] uppercase text-[11px]">Fairness Guarantee Principles:</h4>
              <ul className="space-y-1 text-[#353535] list-disc list-inside">
                <li>Proportional quota allocation prevents smallholders from being crowded out by large farms.</li>
                <li>Guaranteed floor rate of ₹25.00/kg ensures positive net margin above local APMC mandi spot index.</li>
                <li>Zero app requirement: Farmers receive vernacular SMS & voice calls to deliver to Rajahmundry Central Hub.</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-[#c3cda7]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#6d6d6d]">
              Total Allocated: <strong className="text-[#00372a] text-sm">{currentMatch.requiredQty}</strong> across {currentMatch.farmerAllocation.length} farmers
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <Link
                to="/fpo/orders"
                className="w-full sm:w-auto px-5 py-3 rounded-[100px] border border-[#c3cda7] text-[#00372a] font-bold text-xs uppercase tracking-wider text-center hover:bg-[#f1efdf] transition"
              >
                View Active Orders
              </Link>
              <button
                onClick={handleConfirmAllocation}
                disabled={allocationConfirmed}
                className={`w-full sm:w-auto px-8 py-3 rounded-[100px] font-bold text-xs uppercase tracking-wider transition shadow-sm ${
                  allocationConfirmed
                    ? 'bg-emerald-800 text-white cursor-not-allowed opacity-80'
                    : 'bg-[#1b6e53] hover:bg-[#00372a] text-white'
                }`}
              >
                {allocationConfirmed ? '✓ Allocation Confirmed' : 'Confirm Allocation →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
