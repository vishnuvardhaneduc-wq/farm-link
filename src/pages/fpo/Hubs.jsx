import React, { useState } from 'react'
import { Link } from 'react-router'

export default function Hubs() {
  const [showAddHubModal, setShowAddHubModal] = useState(false)
  const [selectedHub, setSelectedHub] = useState(null)
  const [toastMsg, setToastMsg] = useState('')

  const [hubsList, setHubsList] = useState([
    {
      id: 'HUB-04',
      name: 'Rajahmundry Central Hub',
      type: 'Primary IoT Aggregation Depot',
      location: 'NH-16 Bypass, Rajahmundry, East Godavari, AP',
      director: 'p.vishnu vardhan',
      phone: '+91 98480 22341',
      operatingHours: '05:00 AM – 12:00 PM IST',
      assignedFarmers: 24,
      assignedVillages: ['Torredu', 'Katheru', 'Hukumpeta', 'Morampudi'],
      totalCapacity: '120 MT',
      coldStorageCapacity: '45 MT (Chamber A & B, 10-12°C)',
      dryStorageCapacity: '75 MT (Hermetic Aerated Silo)',
      intakeToday: '3.9 MT',
      utilizationRate: '68%',
      weighbridges: '2 x 5-Tonne Digital Load Cells (Calibrated Sep 2026)',
      assayModule: 'CV Optical Camera Model V3 + Moisture Meter #M-88',
      thermalPrinterStatus: 'Ready • 92% Paper (Epson TM-T88VI)',
      capabilities: ['Tomato', 'Green Chilli', 'Onion Red', 'Sweet Corn'],
      status: 'Live & Operational',
    },
    {
      id: 'HUB-02',
      name: 'Kakinada Coastal Agri Hub',
      type: 'Secondary Transit & Cold Hub',
      location: 'Port Road, Near APMC Yard, Kakinada, AP',
      director: 'M. Sriman Narayana',
      phone: '+91 94401 88321',
      operatingHours: '06:00 AM – 02:00 PM IST',
      assignedFarmers: 12,
      assignedVillages: ['Samalkota', 'Peddapuram', 'Karapa'],
      totalCapacity: '80 MT',
      coldStorageCapacity: '30 MT (Chilled 4-8°C)',
      dryStorageCapacity: '50 MT',
      intakeToday: '1.8 MT',
      utilizationRate: '45%',
      weighbridges: '1 x 10-Tonne Electronic Platform',
      assayModule: 'Automated Grain Quality Probe',
      thermalPrinterStatus: 'Ready • 88% Paper',
      capabilities: ['Green Chilli', 'Paddy', 'Sweet Corn'],
      status: 'Live & Operational',
    },
    {
      id: 'HUB-03',
      name: 'Mandapeta Grain Collection Depot',
      type: 'Village Bulk Collection Center',
      location: 'Main Road, Mandapeta Mandalam, AP',
      director: 'K. Venkateswara Rao',
      phone: '+91 98492 11029',
      operatingHours: '06:00 AM – 11:30 AM IST',
      assignedFarmers: 16,
      assignedVillages: ['Alamuru', 'Kapileswarapuram', 'Ravulapalem North'],
      totalCapacity: '150 MT',
      coldStorageCapacity: 'N/A (Dry Grain Silo)',
      dryStorageCapacity: '150 MT (Hermetic Nitrogen Bins)',
      intakeToday: '5.2 MT',
      utilizationRate: '82%',
      weighbridges: '2 x 3-Tonne Floor Scales',
      assayModule: 'Moisture Meter + Foreign Matter Sieve',
      thermalPrinterStatus: 'Ready • 95% Paper',
      capabilities: ['Wheat', 'Mustard Seeds', 'Paddy (Basmati)', 'Soyabean'],
      status: 'Live & Operational',
    },
    {
      id: 'HUB-01',
      name: 'Ravulapalem Banana & Horticulture Hub',
      type: 'Specialized Perishables Center',
      location: 'NH-216, Ravulapalem, Konaseema, AP',
      director: 'G. Rama Krishna',
      phone: '+91 99890 33412',
      operatingHours: '04:30 AM – 11:00 AM IST',
      assignedFarmers: 18,
      assignedVillages: ['Atreyapuram', 'Kothapeta', 'Ambajipeta'],
      totalCapacity: '60 MT',
      coldStorageCapacity: '40 MT (Ethylene Controlled)',
      dryStorageCapacity: '20 MT',
      intakeToday: '2.4 MT',
      utilizationRate: '54%',
      weighbridges: '1 x 5-Tonne Platform Scale',
      assayModule: 'Brix Sugar Refractometer + Optical Sizer',
      thermalPrinterStatus: 'Ready • 78% Paper',
      capabilities: ['Banana (Grand Naine)', 'Papaya', 'Tomato'],
      status: 'Live & Operational',
    },
  ])

  const [newHub, setNewHub] = useState({
    name: '',
    location: '',
    director: '',
    phone: '',
    operatingHours: '05:30 AM – 12:30 PM IST',
    totalCapacity: '50 MT',
    coldStorage: '20 MT',
    capabilities: 'Tomatoes, Chillies, Vegetables',
  })

  const handleAddHub = (e) => {
    e.preventDefault()
    const hub = {
      id: `HUB-0${hubsList.length + 1}`,
      name: newHub.name,
      type: 'Regional Collection Center',
      location: newHub.location,
      director: newHub.director,
      phone: newHub.phone,
      operatingHours: newHub.operatingHours,
      assignedFarmers: 0,
      assignedVillages: ['Local Cluster'],
      totalCapacity: newHub.totalCapacity,
      coldStorageCapacity: newHub.coldStorage,
      dryStorageCapacity: '30 MT',
      intakeToday: '0.0 MT',
      utilizationRate: '0%',
      weighbridges: '1 x 5-Tonne Digital Scale',
      assayModule: 'CV Optical Module',
      thermalPrinterStatus: 'Ready • 100% Paper',
      capabilities: newHub.capabilities.split(',').map((s) => s.trim()),
      status: 'Live & Operational',
    }

    setHubsList([...hubsList, hub])
    setShowAddHubModal(false)
    setToastMsg(`Successfully registered new hub: "${newHub.name}"!`)
    setTimeout(() => setToastMsg(''), 4000)
    setNewHub({
      name: '',
      location: '',
      director: '',
      phone: '',
      operatingHours: '05:30 AM – 12:30 PM IST',
      totalCapacity: '50 MT',
      coldStorage: '20 MT',
      capabilities: 'Tomatoes, Chillies, Vegetables',
    })
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
              FPO Hub Grid
            </span>
            <span className="text-[10px] font-mono text-[#6d6d6d]">
              4 Connected Aggregation Centers
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#00372a]">
            Physical Collection Hubs
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1">
            Village intake centers equipped with digital weighbridges, CV optical grading, cold storage, and thermal slip printers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/hub/dashboard"
            className="px-4 py-2.5 rounded-[100px] bg-white border border-[#c3cda7] hover:bg-[#f1efdf] text-[#1b6e53] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-2xs transition"
          >
            <span className="material-symbols-outlined text-[16px]">devices</span>
            <span>Launch Hub Console</span>
          </Link>

          <button
            onClick={() => setShowAddHubModal(true)}
            className="px-4 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Add Hub</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Total Grid Capacity</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#1b6e53] mt-1">410 MT</p>
          <span className="text-[10px] text-emerald-700 font-medium">115 MT Cold Chain</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Today's Intake Flow</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a] mt-1">13.3 MT</p>
          <span className="text-[10px] text-[#6d6d6d]">Across 42 farmers checked-in</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Hardware Status</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#1b6e53] mt-1">100% Online</p>
          <span className="text-[10px] text-emerald-700 font-medium">6 Weighbridges Syncing</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Assigned Villages</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#683600] mt-1">14 Clusters</p>
          <span className="text-[10px] text-[#683600]">Zero farmer travel &gt; 8 km</span>
        </div>
      </div>

      {/* Hub Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hubsList.map((hub) => (
          <div
            key={hub.id}
            className="bg-white rounded-[24px] border border-[#c3cda7] p-6 space-y-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-[#e6ecd5] text-[#1b6e53] px-2 py-0.5 rounded-full">
                      {hub.id}
                    </span>
                    <span className="text-[10px] font-mono text-[#6d6d6d]">{hub.type}</span>
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-[#00372a] mt-1">
                    {hub.name}
                  </h3>
                  <p className="text-xs text-[#6d6d6d] flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    <span>{hub.location}</span>
                  </p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                  {hub.status}
                </span>
              </div>

              {/* Capacity and Stats Bar */}
              <div className="grid grid-cols-3 gap-2 bg-[#f1efdf]/60 rounded-xl p-3 text-xs">
                <div>
                  <span className="text-[10px] text-[#6d6d6d] block font-mono">Total Capacity:</span>
                  <span className="font-bold text-[#1b6e53]">{hub.totalCapacity}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6d6d6d] block font-mono">Today's Intake:</span>
                  <span className="font-bold text-[#00372a]">{hub.intakeToday}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6d6d6d] block font-mono">Utilization:</span>
                  <span className="font-bold text-[#683600]">{hub.utilizationRate}</span>
                </div>
              </div>

              {/* Operational Telemetry Details */}
              <div className="space-y-2 text-xs text-[#353535]">
                <div className="flex items-center justify-between border-b border-[#c3cda7]/30 pb-1.5">
                  <span className="text-[#6d6d6d]">Operating Hours:</span>
                  <span className="font-medium">{hub.operatingHours}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#c3cda7]/30 pb-1.5">
                  <span className="text-[#6d6d6d]">Director / Manager:</span>
                  <span className="font-semibold text-[#00372a]">{hub.director} ({hub.phone})</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#c3cda7]/30 pb-1.5">
                  <span className="text-[#6d6d6d]">Cold Storage:</span>
                  <span className="font-medium text-[#1b6e53]">{hub.coldStorageCapacity}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#c3cda7]/30 pb-1.5">
                  <span className="text-[#6d6d6d]">Hardware Scales:</span>
                  <span className="font-medium">{hub.weighbridges}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6d6d6d]">Thermal Slip Slip Printer:</span>
                  <span className="font-mono text-emerald-700 font-semibold">{hub.thermalPrinterStatus}</span>
                </div>
              </div>

              {/* Crop capabilities */}
              <div className="pt-2">
                <span className="text-[10px] font-mono text-[#6d6d6d] uppercase block mb-1.5">Supported Commodities:</span>
                <div className="flex flex-wrap gap-1.5">
                  {hub.capabilities.map((crop) => (
                    <span key={crop} className="text-[10px] font-medium bg-[#e6ecd5] text-[#1b6e53] px-2.5 py-0.5 rounded-full">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#c3cda7]/40 flex items-center justify-between">
              <button
                onClick={() => setSelectedHub(hub)}
                className="text-xs font-bold text-[#1b6e53] hover:underline flex items-center gap-1"
              >
                <span>View Village Assignments</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
              <span className="text-[10px] text-[#6d6d6d] font-mono">{hub.assignedFarmers} Farmers Enrolled</span>
            </div>
          </div>
        ))}
      </div>

      {/* Village Assignments Modal */}
      {selectedHub && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] border border-[#c3cda7] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
            <div className="flex items-start justify-between border-b border-[#c3cda7]/60 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#6d6d6d] uppercase">{selectedHub.id} Assignment Profile</span>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  {selectedHub.name}
                </h3>
                <p className="text-xs text-[#6d6d6d]">{selectedHub.location}</p>
              </div>
              <button
                onClick={() => setSelectedHub(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-[#f1efdf] p-4 rounded-xl space-y-2">
                <p className="font-mono font-bold text-[#1b6e53] uppercase text-[11px]">Assigned Village Clusters</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedHub.assignedVillages.map((v) => (
                    <span key={v} className="px-3 py-1 bg-white rounded-full border border-[#c3cda7] text-[#00372a] font-semibold">
                      📍 {v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p><strong>Hub Director:</strong> {selectedHub.director}</p>
                <p><strong>Operating Hours:</strong> {selectedHub.operatingHours}</p>
                <p><strong>Optical CV Assay Model:</strong> {selectedHub.assayModule}</p>
                <p><strong>Weighbridge Device ID:</strong> WB-RS232-04-A</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedHub(null)}
                className="px-6 py-2.5 rounded-[100px] bg-[#1b6e53] text-white font-bold text-xs uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Hub Modal */}
      {showAddHubModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] border border-[#c3cda7] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
            <div className="flex items-start justify-between border-b border-[#c3cda7]/60 pb-4">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Register New Collection Hub
                </h3>
                <p className="text-xs text-[#6d6d6d]">Deploy village intake weighing and quality grading node</p>
              </div>
              <button
                onClick={() => setShowAddHubModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddHub} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">HUB NAME</label>
                <input
                  required
                  type="text"
                  value={newHub.name}
                  onChange={(e) => setNewHub({ ...newHub, name: e.target.value })}
                  placeholder="e.g. Samalkota Agro Depot"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">LOCATION / ADDRESS</label>
                <input
                  required
                  type="text"
                  value={newHub.location}
                  onChange={(e) => setNewHub({ ...newHub, location: e.target.value })}
                  placeholder="e.g. Near Market Yard, Samalkota, AP"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">HUB DIRECTOR</label>
                  <input
                    required
                    type="text"
                    value={newHub.director}
                    onChange={(e) => setNewHub({ ...newHub, director: e.target.value })}
                    placeholder="e.g. S. Venkatesh"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">PHONE NUMBER</label>
                  <input
                    required
                    type="text"
                    value={newHub.phone}
                    onChange={(e) => setNewHub({ ...newHub, phone: e.target.value })}
                    placeholder="+91 98480 00000"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">TOTAL CAPACITY</label>
                  <input
                    type="text"
                    value={newHub.totalCapacity}
                    onChange={(e) => setNewHub({ ...newHub, totalCapacity: e.target.value })}
                    placeholder="e.g. 60 MT"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">COLD STORAGE</label>
                  <input
                    type="text"
                    value={newHub.coldStorage}
                    onChange={(e) => setNewHub({ ...newHub, coldStorage: e.target.value })}
                    placeholder="e.g. 25 MT"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">SUPPORTED CROPS</label>
                <input
                  type="text"
                  value={newHub.capabilities}
                  onChange={(e) => setNewHub({ ...newHub, capabilities: e.target.value })}
                  placeholder="Tomatoes, Chillies, Maize"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#c3cda7]/40">
                <button
                  type="button"
                  onClick={() => setShowAddHubModal(false)}
                  className="px-4 py-2 rounded-full border border-[#c3cda7] text-xs font-semibold text-[#6d6d6d]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#1b6e53] hover:bg-[#00372a] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Register Hub
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
