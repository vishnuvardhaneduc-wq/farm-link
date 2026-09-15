import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import { getStoredFpoFarmerById, assignFarmerPrimaryHub } from '../../data/fpoFarmersData'
import { getStoredFpoHubs } from '../../data/fpoHubsData'

export default function FPOAssignHub() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [farmer, setFarmer] = useState(() => getStoredFpoFarmerById(id))
  const [hubs, setHubs] = useState(getStoredFpoHubs())
  const [selectedHubId, setSelectedHubId] = useState(farmer?.primaryHubId || 'HUB-0007')
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const currentHubs = getStoredFpoHubs()
    setHubs(currentHubs)
    const f = getStoredFpoFarmerById(id)
    if (f) {
      setFarmer(f)
      setSelectedHubId(f.primaryHubId || currentHubs[0]?.id || 'HUB-0007')
    }
  }, [id])

  if (!farmer) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-[32px]">person_off</span>
        </div>
        <h2 className="font-editorial text-2xl font-bold text-[#00372a]">Farmer Not Found</h2>
        <p className="text-xs text-[#6d6d6d]">Unable to load farmer record for hub assignment.</p>
        <Link
          to="/fpo/farmers"
          className="px-6 py-2.5 rounded-full bg-[#1b6e53] text-white text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-1.5"
        >
          <span>Back to All Farmers</span>
        </Link>
      </div>
    )
  }

  const selectedHubObj = hubs.find((h) => h.id === selectedHubId)

  const handleAssign = (e) => {
    e.preventDefault()
    if (!selectedHubId) return

    setIsSaving(true)
    setTimeout(() => {
      const chosenHub = hubs.find((h) => h.id === selectedHubId)
      assignFarmerPrimaryHub(farmer.id, selectedHubId, chosenHub?.name || selectedHubId)

      setIsSaving(false)
      setSuccessMessage('Farmer assigned to hub successfully.')

      setTimeout(() => {
        navigate(`/fpo/farmers/${farmer.id}`)
      }, 700)
    }, 400)
  }

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* 1. Header & Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Link
              to={`/fpo/farmers/${farmer.id}`}
              className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-flex items-center gap-1.5 hover:bg-[#dbe4c2] transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">arrow_back</span>
              <span>Back to Farmer Profile</span>
            </Link>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff] border border-[#c3cda7] text-[#1b6e53] font-mono text-[10px] font-bold">
              ID: {farmer.id}
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Assign <span className="italic font-normal">Primary Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Set the designated physical intake &amp; weighing hub for this smallholder producer.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/fpo/farmers/${farmer.id}`}
            className="px-5 py-2 rounded-[100px] bg-[#ffffff] hover:bg-[#faf9f0] text-[#353535] border border-[#c3cda7] text-xs font-bold font-sans uppercase tracking-wider inline-flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
          >
            <span>Cancel</span>
          </Link>
        </div>
      </div>

      {/* 2. Success Banner Toast */}
      {successMessage && (
        <div className="p-4 rounded-[18px] bg-[#e6ecd5] border border-[#c3cda7] text-[#1b6e53] flex items-center justify-between gap-3 shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#1b6e53]">check_circle</span>
            <span className="font-sans text-xs sm:text-sm font-bold">{successMessage}</span>
          </div>
          <span className="text-[11px] font-mono text-[#1b6e53]">Updating smallholder profile...</span>
        </div>
      )}

      {/* 3. Farmer Context Strip */}
      <section className="p-6 rounded-[24px] bg-[#ffffff] border border-[#c3cda7] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center font-editorial text-xl font-bold border border-[#c3cda7]">
            {farmer.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#00372a] font-editorial">{farmer.name}</span>
              <span className="font-mono text-xs font-bold text-[#1b6e53] bg-[#f1efdf] px-2 py-0.5 rounded-md">
                {farmer.id}
              </span>
            </div>
            <p className="text-xs text-[#6d6d6d] font-sans mt-0.5">
              Village: {farmer.village}, {farmer.district || 'East Godavari'} • Crop: {farmer.primaryCrop}
            </p>
          </div>
        </div>

        <div className="p-3 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7] text-left sm:text-right min-w-[200px]">
          <span className="text-[10px] font-mono uppercase text-[#6d6d6d] block">Current Primary Hub</span>
          <span className="font-bold text-sm text-[#00372a] block font-editorial">
            {farmer.primaryHubName || 'Rajahmundry Central Hub'}
          </span>
        </div>
      </section>

      {/* 4. Business Rule Notice Box */}
      <div className="p-4 rounded-[20px] bg-[#e6ecd5]/50 border border-[#c3cda7] flex items-start gap-3">
        <span className="material-symbols-outlined text-[20px] text-[#1b6e53] shrink-0 mt-0.5">
          verified_user
        </span>
        <div className="text-xs text-[#00372a] space-y-1">
          <span className="font-bold block">FarmLink Hub Assignment Rule:</span>
          <p className="text-[#353535] leading-relaxed">
            A farmer has <strong>one PRIMARY HUB</strong> and normally delivers produce there. The fulfillment engine allocates orders to eligible hubs first, and then to farmers belonging to those hubs. Buyers never choose or bypass the farmer's primary hub.
          </p>
        </div>
      </div>

      {/* 5. Available Hubs Selection Form */}
      <form onSubmit={handleAssign} className="space-y-6">
        <section className="bg-[#ffffff] rounded-[24px] border border-[#c3cda7] p-6 sm:p-8 shadow-xs space-y-5">
          <div className="border-b border-[#c3cda7]/50 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#00372a]">
                Available FPO Hubs
              </h3>
              <p className="text-xs text-[#6d6d6d]">
                Select the primary aggregation and weighment center for {farmer.name}.
              </p>
            </div>
            <span className="text-xs font-mono text-[#1b6e53] bg-[#f1efdf] px-3 py-1 rounded-[100px] border border-[#c3cda7]">
              {hubs.length} Hubs Available
            </span>
          </div>

          <div className="space-y-3">
            {hubs.map((hub) => {
              const isSelected = selectedHubId === hub.id
              const isCurrent = farmer.primaryHubId === hub.id || farmer.primaryHubName === hub.name

              return (
                <label
                  key={hub.id}
                  className={`block p-4 sm:p-5 rounded-[20px] border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#e6ecd5]/40 border-[#1b6e53] ring-2 ring-[#1b6e53]/30 shadow-xs'
                      : 'bg-[#ffffff] border-[#c3cda7] hover:border-[#1b6e53]/50 hover:bg-[#faf9f0]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5 min-w-0">
                      <input
                        type="radio"
                        name="primaryHub"
                        value={hub.id}
                        checked={isSelected}
                        onChange={() => setSelectedHubId(hub.id)}
                        className="mt-1 w-4 h-4 text-[#1b6e53] focus:ring-[#1b6e53] cursor-pointer"
                      />
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-editorial text-base sm:text-lg font-bold text-[#00372a]">
                            {hub.name}
                          </span>
                          <span className="font-mono text-[11px] font-bold text-[#1b6e53] bg-[#ffffff] px-2 py-0.5 rounded-md border border-[#c3cda7]">
                            {hub.id}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#e6ecd5] text-[#1b6e53] text-[10px] font-mono font-bold uppercase border border-[#c3cda7]">
                            {hub.operatingStatus || hub.status || 'Active'}
                          </span>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-[#fceace] text-[#683600] text-[10px] font-bold uppercase border border-[#683600]/30">
                              Current Primary Hub
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[#6d6d6d] font-sans">
                          {hub.address || hub.location || 'Cluster Marketing Yard'}
                        </p>

                        <div className="flex items-center gap-3 text-[11px] font-mono text-[#353535] pt-1 flex-wrap">
                          <span>
                            Capacity: <strong>{Number(hub.capacity || 1000).toLocaleString('en-IN')} kg</strong>
                          </span>
                          <span className="text-[#c3cda7]">•</span>
                          <span>
                            Assigned Farmers: <strong>{hub.assignedFarmers || 15} smallholders</strong>
                          </span>
                          <span className="text-[#c3cda7]">•</span>
                          <span>
                            Operating: <strong>{hub.operatingDays || 'Mon – Sat'}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 hidden sm:block">
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1b6e53] font-mono">
                          <span className="material-symbols-outlined text-[16px]">check_circle</span>
                          <span>Selected</span>
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-[#6d6d6d]">Click to select</span>
                      )}
                    </div>
                  </div>
                </label>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#c3cda7]/50 flex flex-col sm:flex-row items-center justify-end gap-3">
            <Link
              to={`/fpo/farmers/${farmer.id}`}
              className="w-full sm:w-auto px-6 h-11 rounded-[100px] bg-[#ffffff] hover:bg-[#faf9f0] text-[#353535] border border-[#c3cda7] font-sans text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center justify-center transition shadow-2xs cursor-pointer"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSaving || !selectedHubId}
              className="w-full sm:w-auto px-8 h-11 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] font-sans text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-[0.99] cursor-pointer disabled:opacity-75"
            >
              {isSaving ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Assigning Hub...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">hub</span>
                  <span>Assign Primary Hub</span>
                </>
              )}
            </button>
          </div>
        </section>
      </form>
    </div>
  )
}
