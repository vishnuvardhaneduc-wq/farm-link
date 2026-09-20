import React, { useState } from 'react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [toastMsg, setToastMsg] = useState('')

  const [fpoProfile, setFpoProfile] = useState({
    fpoName: 'Godavari Farmers Producer Company Limited',
    shortCode: 'GFPO-AP-04',
    regNumber: 'CIN: U01111AP2021PTC118920',
    incorporationDate: '14 August 2021',
    address: 'Survey No. 42/1B, Agri Park Road, Rajahmundry, East Godavari, AP - 533101',
    directorName: 'p.vishnu vardhan',
    email: 'contact@godavarifarmers.org',
    phone: '+91 98480 22341',
    totalMembers: '1,420 Registered Smallholders',
    boardMembers: '7 Board of Directors',
    bankName: 'State Bank of India (SBI Commercial)',
    accountNumber: '3901847192019',
    ifsc: 'SBIN0001201 (Rajahmundry Main)',
    escrowVirtualAcc: 'ESCROW-GODAVARI-YESB-004',
    smsGateway: 'Trai DLT Verified (Sender: KRISHI)',
    ivrLanguage: 'Telugu (Default) + English Fallback',
    thermalHeader: 'GODAVARI FARMERS FPO - RAJAHMUNDRY CENTRAL HUB',
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleSaveProfile = (e) => {
    e.preventDefault()
    setIsEditing(false)
    setToastMsg('FPO profile and federation settings updated successfully!')
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
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              Federation Governance
            </span>
            <span className="text-[10px] font-mono text-[#6d6d6d]">
              NABARD & MCA Verified
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#00372a]">
            FPO Profile & Federation Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1">
            Manage FPO registration certificates, banking & escrow routing, hardware IoT credentials, and vernacular broadcast configurations.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex bg-white rounded-full p-1 border border-[#c3cda7]">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition ${
              activeTab === 'profile' ? 'bg-[#1b6e53] text-white' : 'text-[#353535] hover:text-[#1b6e53]'
            }`}
          >
            FPO Profile
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition ${
              activeTab === 'verification' ? 'bg-[#1b6e53] text-white' : 'text-[#353535] hover:text-[#1b6e53]'
            }`}
          >
            Verification Status
          </button>
          <button
            onClick={() => setActiveTab('escrow')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition ${
              activeTab === 'escrow' ? 'bg-[#1b6e53] text-white' : 'text-[#353535] hover:text-[#1b6e53]'
            }`}
          >
            Escrow & Banking
          </button>
          <button
            onClick={() => setActiveTab('hardware')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition ${
              activeTab === 'hardware' ? 'bg-[#1b6e53] text-white' : 'text-[#353535] hover:text-[#1b6e53]'
            }`}
          >
            Hub & SMS Gateway
          </button>
        </div>
      </div>

      {/* Tab 1: Profile & Edit Details */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-[24px] border border-[#c3cda7] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-start justify-between border-b border-[#c3cda7]/40 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#1b6e53] text-[#e8fe85] flex items-center justify-center font-bold text-xl">
                GF
              </div>
              <div>
                <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
                  {fpoProfile.fpoName}
                </h2>
                <p className="text-xs text-[#6d6d6d] font-mono">{fpoProfile.regNumber} • {fpoProfile.shortCode}</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-full border border-[#c3cda7] hover:bg-[#f1efdf] text-xs font-bold uppercase text-[#00372a] transition"
            >
              {isEditing ? 'Cancel Editing' : 'Edit Details'}
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">FPO LEGAL NAME</label>
                <input
                  disabled={!isEditing}
                  type="text"
                  value={fpoProfile.fpoName}
                  onChange={(e) => setFpoProfile({ ...fpoProfile, fpoName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">REGISTRATION CIN</label>
                <input
                  disabled={!isEditing}
                  type="text"
                  value={fpoProfile.regNumber}
                  onChange={(e) => setFpoProfile({ ...fpoProfile, regNumber: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">DIRECTOR / MANAGER</label>
                <input
                  disabled={!isEditing}
                  type="text"
                  value={fpoProfile.directorName}
                  onChange={(e) => setFpoProfile({ ...fpoProfile, directorName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">OFFICIAL EMAIL</label>
                <input
                  disabled={!isEditing}
                  type="email"
                  value={fpoProfile.email}
                  onChange={(e) => setFpoProfile({ ...fpoProfile, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">CONTACT PHONE</label>
                <input
                  disabled={!isEditing}
                  type="text"
                  value={fpoProfile.phone}
                  onChange={(e) => setFpoProfile({ ...fpoProfile, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">REGISTERED ADDRESS</label>
                <input
                  disabled={!isEditing}
                  type="text"
                  value={fpoProfile.address}
                  onChange={(e) => setFpoProfile({ ...fpoProfile, address: e.target.value })}
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
      )}

      {/* Tab 2: Verification Status */}
      {activeTab === 'verification' && (
        <div className="bg-white rounded-[24px] border border-[#c3cda7] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#c3cda7]/40 pb-3">
            <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
              Statutory Verification Status
            </h2>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full font-bold">
              ✓ 100% Fully Verified
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#f1efdf] border border-[#c3cda7]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[24px] text-[#1b6e53]">verified</span>
                <div>
                  <h3 className="font-bold text-[#00372a] text-sm">Ministry of Corporate Affairs (MCA)</h3>
                  <p className="text-xs text-[#6d6d6d]">Registered as Producer Company under Companies Act, 2013</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#1b6e53] font-mono">ACTIVE (CIN Verified)</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#f1efdf] border border-[#c3cda7]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[24px] text-[#1b6e53]">account_balance</span>
                <div>
                  <h3 className="font-bold text-[#00372a] text-sm">NABARD / SFAC Recognition</h3>
                  <p className="text-xs text-[#6d6d6d]">Promoted under Central Sector Scheme for 10,000 FPOs</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#1b6e53] font-mono">SFAC-AP-2021-998</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#f1efdf] border border-[#c3cda7]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[24px] text-[#1b6e53]">receipt</span>
                <div>
                  <h3 className="font-bold text-[#00372a] text-sm">GSTIN & APMC Mandi Trader License</h3>
                  <p className="text-xs text-[#6d6d6d]">Authorized for zero-tax farm produce inter-state transit</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#1b6e53] font-mono">37AAACA4928K1ZX</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Escrow & Banking */}
      {activeTab === 'escrow' && (
        <div className="bg-white rounded-[24px] border border-[#c3cda7] p-6 sm:p-8 space-y-6 shadow-xs">
          <h2 className="font-editorial text-2xl font-bold text-[#00372a] border-b border-[#c3cda7]/40 pb-3">
            Escrow Virtual Account & Settlement Routing
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#f1efdf] p-4 rounded-2xl space-y-1.5">
              <span className="text-[10px] text-[#6d6d6d] uppercase font-mono block">FPO OPERATING BANK ACCOUNT:</span>
              <p className="font-bold text-[#00372a] text-sm">{fpoProfile.bankName}</p>
              <p className="font-mono">Account No: {fpoProfile.accountNumber}</p>
              <p className="font-mono">IFSC: {fpoProfile.ifsc}</p>
            </div>
            <div className="bg-[#e6ecd5] p-4 rounded-2xl space-y-1.5">
              <span className="text-[10px] text-[#1b6e53] uppercase font-mono font-bold block">CONNECTED ESCROW CLEARING NODE:</span>
              <p className="font-bold text-[#1b6e53] text-sm">{fpoProfile.escrowVirtualAcc}</p>
              <p className="text-[#353535]">Automated split: Freight → Logistics, Balance → Farmers</p>
              <span className="inline-block px-2 py-0.5 rounded-full bg-[#1b6e53] text-[#e8fe85] text-[10px] font-bold font-mono">
                T+0 Instant Clearing Active
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Hardware & SMS */}
      {activeTab === 'hardware' && (
        <div className="bg-white rounded-[24px] border border-[#c3cda7] p-6 sm:p-8 space-y-6 shadow-xs">
          <h2 className="font-editorial text-2xl font-bold text-[#00372a] border-b border-[#c3cda7]/40 pb-3">
            Hardware Load Cells & Vernacular IVR Telemetry
          </h2>
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-4 bg-[#f1efdf] rounded-2xl">
              <div>
                <p className="font-bold text-[#00372a]">TRAI DLT SMS Channel</p>
                <p className="text-[#6d6d6d]">{fpoProfile.smsGateway}</p>
              </div>
              <span className="text-emerald-700 font-bold font-mono">100% Delivery</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#f1efdf] rounded-2xl">
              <div>
                <p className="font-bold text-[#00372a]">Voice IVR Engine</p>
                <p className="text-[#6d6d6d]">{fpoProfile.ivrLanguage}</p>
              </div>
              <span className="text-emerald-700 font-bold font-mono">Active</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#f1efdf] rounded-2xl">
              <div>
                <p className="font-bold text-[#00372a]">Thermal Slip Header</p>
                <p className="font-mono text-[#6d6d6d]">{fpoProfile.thermalHeader}</p>
              </div>
              <span className="text-emerald-700 font-bold font-mono">Epson ESC/POS Synced</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
