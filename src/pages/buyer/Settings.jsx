import React, { useState } from 'react'

export default function Settings() {
  const [toastMsg, setToastMsg] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const [companyProfile, setCompanyProfile] = useState({
    companyName: 'AgroFresh Enterprise',
    legalEntity: 'AgroFresh Foods & Logistics India Pvt Ltd',
    gstin: '37AAACA4928K1ZX',
    panNumber: 'AAACA4928K',
    mandiLicense: 'AP-VJA-2024-MANDI-882 (Inter-State License)',
    corporateOffice: 'Level 4, AgTech Towers, MG Road, Vijayawada, AP - 520010',
    primaryOfficer: 'Anita Rao',
    officerTitle: 'Chief Procurement Officer',
    officerEmail: 'anita.rao@agrofresh.in',
    officerPhone: '+91 98450 11920',
    escrowAccountNumber: 'YESB0000042 • AgroFresh Escrow Sub-Wallet',
    walletBalance: '₹8,20,000 (Auto-funding active)',
  })

  const [warehouses, setWarehouses] = useState([
    {
      id: 'WH-01',
      name: 'Vijayawada Processing Hub & Regional DC',
      address: 'Plot 18, Auto Nagar Industrial Area, Vijayawada, AP',
      dockManager: 'Ramesh K. (Ph: +91 98480 33901)',
      coldStorageTemp: '10°C - 14°C Controlled',
      dockBays: '4 Inbound Unloading Bays',
      isDefault: true,
    },
    {
      id: 'WH-02',
      name: 'Guntur Cold Chain Mandi DC',
      address: 'NH-16 Bypass Road, Guntur, AP',
      dockManager: 'M. Sitaram (Ph: +91 94401 22890)',
      coldStorageTemp: '4°C - 8°C Chilled',
      dockBays: '2 Inbound Bays',
      isDefault: false,
    },
    {
      id: 'WH-03',
      name: 'Hyderabad North Fulfillment Center',
      address: 'Medchal Industrial Corridor, Hyderabad, Telangana',
      dockManager: 'V. Naresh (Ph: +91 98800 11092)',
      coldStorageTemp: 'Ambient & Aerated Silos',
      dockBays: '6 Inbound Bays',
      isDefault: false,
    },
  ])

  const handleSave = (e) => {
    e.preventDefault()
    setIsEditing(false)
    setToastMsg('Enterprise profile and delivery locations updated successfully!')
    setTimeout(() => setToastMsg(''), 4000)
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
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#00372a] font-bold bg-[#b2cee7] px-3 py-0.5 rounded-[100px] border border-[#a1bed8]">
              Institutional Account
            </span>
            <span className="text-[10px] font-mono text-[#6d6d6d]">
              Verified Corporate Sourcing
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#00372a]">
            Company Profile & Receiving Warehouses
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1">
            Enterprise procurement credentials, corporate billing GSTIN, receiving dock locations, and escrow preferences.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
        >
          {isEditing ? 'Cancel Editing' : 'Edit Company Profile'}
        </button>
      </div>

      {/* Company Details Form / Card */}
      <div className="bg-white rounded-[24px] border border-[#c3cda7] p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#c3cda7]/40 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#b2cee7] text-[#00372a] flex items-center justify-center font-bold text-xl">
              AF
            </div>
            <div>
              <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
                {companyProfile.companyName}
              </h2>
              <p className="text-xs text-[#6d6d6d] font-mono">{companyProfile.legalEntity}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full font-mono">
            ✓ Tier-1 Enterprise Verified
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">COMPANY NAME</label>
              <input
                disabled={!isEditing}
                type="text"
                value={companyProfile.companyName}
                onChange={(e) => setCompanyProfile({ ...companyProfile, companyName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">GSTIN</label>
              <input
                disabled={!isEditing}
                type="text"
                value={companyProfile.gstin}
                onChange={(e) => setCompanyProfile({ ...companyProfile, gstin: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">LEAD PROCUREMENT OFFICER</label>
              <input
                disabled={!isEditing}
                type="text"
                value={companyProfile.primaryOfficer}
                onChange={(e) => setCompanyProfile({ ...companyProfile, primaryOfficer: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">OFFICIAL EMAIL</label>
              <input
                disabled={!isEditing}
                type="email"
                value={companyProfile.officerEmail}
                onChange={(e) => setCompanyProfile({ ...companyProfile, officerEmail: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">CONTACT PHONE</label>
              <input
                disabled={!isEditing}
                type="text"
                value={companyProfile.officerPhone}
                onChange={(e) => setCompanyProfile({ ...companyProfile, officerPhone: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">MANDI TRADER LICENSE</label>
              <input
                disabled={!isEditing}
                type="text"
                value={companyProfile.mandiLicense}
                onChange={(e) => setCompanyProfile({ ...companyProfile, mandiLicense: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end pt-4 border-t border-[#c3cda7]/40">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-white font-bold text-xs uppercase tracking-wider"
              >
                Save Profile Changes
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Receiving Warehouses Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
              Receiving Docks & Fulfillment Warehouses
            </h2>
            <p className="text-xs text-[#6d6d6d]">Destination facilities where FPO logistics consignments arrive and are verified.</p>
          </div>
          <span className="text-xs font-mono font-bold text-[#00372a] bg-[#b2cee7] px-3 py-1 rounded-full">
            3 Active Docks
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {warehouses.map((wh) => (
            <div
              key={wh.id}
              className="bg-white rounded-[24px] border border-[#c3cda7] p-6 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono font-bold bg-[#f1efdf] text-[#00372a] px-2 py-0.5 rounded-full">
                    {wh.id}
                  </span>
                  {wh.isDefault && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e6ecd5] text-[#1b6e53] font-mono">
                      ★ Default Dock
                    </span>
                  )}
                </div>

                <h3 className="font-editorial text-xl font-bold text-[#00372a]">
                  {wh.name}
                </h3>
                <p className="text-xs text-[#6d6d6d]">{wh.address}</p>

                <div className="bg-[#f1efdf]/60 p-3 rounded-xl space-y-1 text-xs text-[#353535]">
                  <p><strong>Dock Manager:</strong> {wh.dockManager}</p>
                  <p><strong>Storage Temp:</strong> {wh.coldStorageTemp}</p>
                  <p><strong>Bays:</strong> {wh.dockBays}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#c3cda7]/40 text-xs text-[#1b6e53] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Active for Direct Dispatches</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
