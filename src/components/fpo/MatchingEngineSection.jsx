import React, { useState } from 'react'

export default function MatchingEngineSection({ fulfillmentAllocationEngine, fulfillmentHubPlan }) {
  const data = fulfillmentHubPlan || fulfillmentAllocationEngine || {}
  
  // Scenarios: 'single' (Case 1: Single Hub Sufficient) vs 'multi' (Case 2: Insufficient Capacity)
  const [scenario, setScenario] = useState('single')
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [viewHubModal, setViewHubModal] = useState(false)
  const [farmerModal, setFarmerModal] = useState(false)

  const activeOrder = data.activeOrder || {
    orderId: 'ORD-8921',
    buyer: 'Hotel Krishna',
    crop: 'Tomato',
    grade: 'Grade A',
    requiredQuantity: '1,000 kg',
  }

  const case1 = data.case1SingleHub || {}
  const case2 = data.case2MultiHub || {}
  const suitabilityFactors = data.suitabilityFactors || []

  const handleConfirmPlan = () => {
    setIsConfirmed(true)
  }

  const handleResetPlan = () => {
    setIsConfirmed(false)
  }

  return (
    <section className="rounded-[22px] bg-[#1b6e53] text-[#ffffff] p-6 lg:p-8 relative overflow-hidden shadow-sm space-y-6">
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/15">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#e8fe85] text-[#1b6e53] flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[24px]">hub</span>
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-editorial text-2xl lg:text-3xl font-light tracking-tight text-[#ffffff]">
                {data.title || 'Fulfillment Hub Plan'}
              </h2>
              <span className="bg-[#e8fe85] text-[#1b6e53] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {data.kernelVersion || 'Fulfillment Engine v2.4'}
              </span>
            </div>
            <p className="text-xs text-[#e8fe85] font-semibold mt-1">
              {data.subtitle || 'Select the minimum suitable hub network required to fulfill the order.'}
            </p>
            <p className="text-xs text-[#e6ecd5]/80 mt-0.5 max-w-2xl font-sans leading-relaxed">
              {data.description ||
                "Fulfillment engine selecting the minimum suitable hub network and fairly allocating each hub's requirement across eligible farmers."}
            </p>
          </div>
        </div>

        {/* Scenario Toggle (to test Case 1 vs Case 2) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 bg-black/20 p-1.5 rounded-[100px] border border-white/15 self-start lg:self-auto">
          <button
            onClick={() => {
              setScenario('single')
              setIsConfirmed(false)
            }}
            className={`px-3.5 py-1.5 rounded-[100px] text-xs font-semibold transition cursor-pointer ${
              scenario === 'single'
                ? 'bg-[#e8fe85] text-[#1b6e53] shadow-xs'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Case 1: Single Hub Sufficient
          </button>
          <button
            onClick={() => {
              setScenario('multi')
              setIsConfirmed(false)
            }}
            className={`px-3.5 py-1.5 rounded-[100px] text-xs font-semibold transition cursor-pointer ${
              scenario === 'multi'
                ? 'bg-[#e8fe85] text-[#1b6e53] shadow-xs'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Case 2: Capacity Insufficient
          </button>
        </div>
      </div>

      {/* Sequential Fulfillment Hierarchy Ribbon: Order → Hub Allocation → Farmer Allocation */}
      <div className="p-3.5 rounded-[16px] bg-white/10 border border-white/15 flex items-center justify-between flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-white/20 text-[#e8fe85] flex items-center justify-center font-bold text-[10px]">
            1
          </span>
          <span className="text-[#e6ecd5]/80">Order:</span>
          <span className="font-bold text-white font-mono">{activeOrder.orderId}</span>
          <span className="text-[#e8fe85]">({activeOrder.requiredQuantity} {activeOrder.crop} {activeOrder.grade})</span>
        </div>

        <span className="text-white/40 hidden sm:inline">↓</span>

        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-white/20 text-[#e8fe85] flex items-center justify-center font-bold text-[10px]">
            2
          </span>
          <span className="text-[#e6ecd5]/80">Hub Allocation:</span>
          <span className="font-bold text-white">
            {scenario === 'single' ? 'Hub A (1,000 kg)' : 'Hub A (600 kg) + Hub B (400 kg)'}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isConfirmed ? 'bg-[#e8fe85] text-[#1b6e53]' : 'bg-[#fceace] text-[#683600]'}`}>
            {isConfirmed ? '✓ Confirmed' : 'Pending Confirmation'}
          </span>
        </div>

        <span className="text-white/40 hidden sm:inline">↓</span>

        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-white/20 text-[#e8fe85] flex items-center justify-center font-bold text-[10px]">
            3
          </span>
          <span className="text-[#e6ecd5]/80">Farmer Allocation:</span>
          <span className="font-semibold text-[#e6ecd5]">
            {isConfirmed ? '31 / 42 Farmers Assigned' : 'Awaiting Hub Confirmation'}
          </span>
        </div>
      </div>

      {/* Main Allocation Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Target Order Details & Hub Suitability Factors */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Order Card */}
          <div className="p-5 rounded-[18px] bg-white/10 border border-white/15 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#e8fe85] font-bold">
                Target Order Details
              </span>
              <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded-full text-white">
                {activeOrder.orderId}
              </span>
            </div>

            <div className="font-editorial text-2xl font-normal text-white">
              {activeOrder.buyer}
            </div>

            <div className="space-y-1.5 text-xs text-[#e6ecd5] font-mono pt-2 border-t border-white/10">
              <div className="flex justify-between">
                <span className="text-[#e6ecd5]/70">Crop:</span>
                <span className="font-bold text-white">{activeOrder.crop}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#e6ecd5]/70">Quality Grade:</span>
                <span className="font-bold text-white">{activeOrder.grade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#e6ecd5]/70">Required Quantity:</span>
                <span className="font-bold text-[#e8fe85] text-sm">{activeOrder.requiredQuantity}</span>
              </div>
            </div>
          </div>

          {/* Hub Suitability Factors */}
          <div className="p-4 rounded-[18px] bg-black/15 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#e8fe85] font-bold">
                Hub Selection Factors Evaluated
              </span>
              <span className="text-[10px] text-[#e6ecd5]/70">Automated Audit</span>
            </div>
            <div className="space-y-1.5 text-xs">
              {suitabilityFactors.map((factor) => (
                <div key={factor.label} className="flex items-center justify-between text-[#e6ecd5]/90">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <span className="material-symbols-outlined text-[14px] text-[#e8fe85]">{factor.icon}</span>
                    {factor.label}
                  </span>
                  <span className="font-mono text-[11px] text-white">{factor.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Case 1 / Case 2 Fulfillment Hub Plan & Actions */}
        <div className="lg:col-span-8 space-y-5">
          {scenario === 'single' ? (
            /* ============================================================ */
            /* CASE 1: SINGLE HUB IS SUFFICIENT                             */
            /* ============================================================ */
            <div className="p-6 rounded-[20px] bg-white/10 border border-white/20 space-y-5">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#e8fe85] font-bold">
                    Recommended Hub Plan
                  </span>
                  <h3 className="font-editorial text-2xl font-normal text-white mt-0.5">
                    {case1.recommendedHub || 'Hub A — Nashik Central'}
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#e8fe85] text-[#1b6e53] text-xs font-bold flex items-center gap-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>{case1.status || 'Single Hub Fulfillment'}</span>
                </div>
              </div>

              {/* Single Hub Capability Checklist Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 rounded-[12px] bg-black/20 border border-white/10">
                  <span className="text-[10px] text-[#e6ecd5]/70 block font-mono">Required</span>
                  <span className="font-bold text-white font-mono">{case1.required || '1,000 kg'}</span>
                </div>
                <div className="p-2.5 rounded-[12px] bg-black/20 border border-white/10">
                  <span className="text-[10px] text-[#e6ecd5]/70 block font-mono">Available Capacity</span>
                  <span className="font-bold text-[#e8fe85] font-mono">{case1.availableCapacity || '1,300 kg'}</span>
                </div>
                <div className="p-2.5 rounded-[12px] bg-black/20 border border-white/10">
                  <span className="text-[10px] text-[#e6ecd5]/70 block font-mono">Crop Capability</span>
                  <span className="font-bold text-white">{case1.cropCapability || 'Tomato ✓'}</span>
                </div>
                <div className="p-2.5 rounded-[12px] bg-black/20 border border-white/10">
                  <span className="text-[10px] text-[#e6ecd5]/70 block font-mono">Grade Capability</span>
                  <span className="font-bold text-white">{case1.gradeCapability || 'Grade A ✓'}</span>
                </div>
              </div>

              {/* Reason Callout */}
              <div className="p-3.5 rounded-[14px] bg-[#00372a]/70 border border-[#e8fe85]/30 flex items-start gap-3 text-xs">
                <span className="material-symbols-outlined text-[#e8fe85] text-[20px] shrink-0 mt-0.5">
                  verified
                </span>
                <div>
                  <span className="font-bold text-[#e8fe85] block">
                    Reason: Single Hub Sufficiency Verified
                  </span>
                  <p className="text-[#e6ecd5] mt-0.5 leading-relaxed">
                    "{case1.reason || 'Hub A can fulfill the complete order without requiring another hub.'}"
                  </p>
                </div>
              </div>

              {/* Action Buttons & Confirmation State */}
              <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
                {isConfirmed ? (
                  <div className="flex items-center justify-between w-full p-3.5 rounded-[16px] bg-[#e8fe85] text-[#1b6e53] flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] font-bold">task_alt</span>
                      <div>
                        <div className="font-bold text-sm">✓ Hub Plan Confirmed: Hub A (1,000 kg)</div>
                        <div className="text-[11px] opacity-90">Order locked to Nashik Central Hub. Next: Farmer Allocation.</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleResetPlan}
                        className="px-3 py-1.5 rounded-[100px] border border-[#1b6e53]/40 text-xs font-semibold hover:bg-black/10 transition cursor-pointer"
                      >
                        Change Plan
                      </button>
                      <button
                        onClick={() => setFarmerModal(true)}
                        className="px-4 py-1.5 rounded-[100px] bg-[#1b6e53] text-[#ffffff] text-xs font-bold hover:bg-[#00372a] transition shadow-xs cursor-pointer"
                      >
                        Continue to Farmer Allocation →
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleConfirmPlan}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-[100px] bg-[#e8fe85] text-[#1b6e53] text-xs font-bold hover:bg-[#d8ee6f] transition shadow-sm cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">check</span>
                        <span>Confirm Hub Plan</span>
                      </button>
                      <button
                        onClick={() => setViewHubModal(true)}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-[100px] border border-white/30 text-xs font-semibold text-[#ffffff] hover:bg-white/10 transition cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        <span>View Hub</span>
                      </button>
                    </div>
                    <span className="text-[11px] text-[#e6ecd5]/70">
                      Zero multi-hub split required • Direct single gate dispatch
                    </span>
                  </>
                )}
              </div>

              {/* Other Suitable Hubs (Marked as ALTERNATIVES, NOT allocations) */}
              <div className="pt-4 border-t border-white/15">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#e6ecd5]/80 mb-2">
                  Other Suitable Hubs (Unallocated Alternatives)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {case1.otherSuitableHubs &&
                    case1.otherSuitableHubs.map((hub) => (
                      <div
                        key={hub.name}
                        className="p-3 rounded-[12px] bg-black/20 border border-white/10 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-semibold text-white block">{hub.name}</span>
                          <span className="text-[10px] text-[#e6ecd5]/70">
                            Available Capacity: {hub.capacity} • {hub.farmers} Registered Farmers
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[#e6ecd5] text-[10px] font-semibold">
                          {hub.status}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            /* ============================================================ */
            /* CASE 2: SINGLE HUB IS NOT SUFFICIENT                         */
            /* ============================================================ */
            <div className="p-6 rounded-[20px] bg-white/10 border border-white/20 space-y-5">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#fceace] font-bold">
                    Multi-Hub Requirement Analysis
                  </span>
                  <h3 className="font-editorial text-2xl font-normal text-white mt-0.5">
                    Single hub capacity insufficient
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#fceace] text-[#683600] text-xs font-bold flex items-center gap-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">warning</span>
                  <span>{case2.status || '✓ 2 Hubs Required'}</span>
                </div>
              </div>

              {/* Minimum Necessary Hub Allocations */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#e8fe85]">
                  Minimum Suitable Hub Allocations:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {case2.allocations &&
                    case2.allocations.map((alloc) => (
                      <div
                        key={alloc.name}
                        className="p-3.5 rounded-[14px] bg-black/25 border border-white/15 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-bold text-white block">{alloc.name}</span>
                          <span className="text-[10px] text-[#e6ecd5]/70">{alloc.capacity}</span>
                        </div>
                        <div className="font-editorial text-2xl font-bold text-[#e8fe85] font-mono">
                          → {alloc.allocated}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Reason Callout */}
              <div className="p-3.5 rounded-[14px] bg-[#683600]/30 border border-[#fceace]/30 flex items-start gap-3 text-xs">
                <span className="material-symbols-outlined text-[#fceace] text-[20px] shrink-0 mt-0.5">
                  info
                </span>
                <div>
                  <span className="font-bold text-[#fceace] block">
                    Reason: Capacity Constraint
                  </span>
                  <p className="text-[#e6ecd5] mt-0.5 leading-relaxed">
                    "{case2.reason || 'Hub A cannot fulfill the complete order alone.'}" Minimum 2 hubs selected; Hub C is excluded to minimize transit complexity.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
                {isConfirmed ? (
                  <div className="flex items-center justify-between w-full p-3.5 rounded-[16px] bg-[#e8fe85] text-[#1b6e53] flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] font-bold">task_alt</span>
                      <div>
                        <div className="font-bold text-sm">✓ 2-Hub Plan Confirmed: Hub A (600 kg) + Hub B (400 kg)</div>
                        <div className="text-[11px] opacity-90">Capacity met with minimum hub count. Next: Farmer Allocation.</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setFarmerModal(true)}
                      className="px-4 py-1.5 rounded-[100px] bg-[#1b6e53] text-[#ffffff] text-xs font-bold hover:bg-[#00372a] transition shadow-xs cursor-pointer"
                    >
                      Continue to Farmer Allocation →
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleConfirmPlan}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-[100px] bg-[#e8fe85] text-[#1b6e53] text-xs font-bold hover:bg-[#d8ee6f] transition shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">check</span>
                    <span>Confirm Multi-Hub Plan</span>
                  </button>
                )}
              </div>

              {/* Unused Hub */}
              <div className="pt-4 border-t border-white/15 text-xs text-[#e6ecd5]/80">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#e6ecd5]/70 block mb-1">
                  Excluded Hubs (Capacity already satisfied):
                </span>
                <div className="p-2.5 rounded-[12px] bg-black/15 border border-white/10 flex justify-between">
                  <span>Hub C — Sinnar (Capacity: 1,200 kg)</span>
                  <span className="text-[#e8fe85] font-semibold">Not Needed</span>
                </div>
              </div>
            </div>
          )}

          {/* Farmer Allocation Section (NEXT Stage After Hub Allocation) */}
          <div className="p-5 rounded-[18px] bg-black/20 border border-white/15 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#e8fe85]">groups</span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#e8fe85] font-bold">
                  Stage 3: Farmer Allocation (Post-Hub Selection)
                </span>
              </div>
              <span className="text-[10px] text-[#e6ecd5]/70">
                {isConfirmed ? 'Active Cluster Pool' : 'Awaiting Hub Plan Confirmation'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-editorial text-2xl text-white font-normal">
                  {isConfirmed ? '31 / 42 Farmers Assigned' : 'Pending Hub Confirmation'}
                </div>
                <p className="text-[11px] text-[#e6ecd5]/80 mt-0.5">
                  {scenario === 'single'
                    ? 'All assigned farmers are linked to their primary hub (Hub A).'
                    : 'Farmers allocated from their primary linked hubs (Hub A: 18 farmers, Hub B: 13 farmers).'}
                </p>
              </div>

              <div className="w-full sm:w-48 space-y-1">
                <div className="flex justify-between text-[10px] text-[#e6ecd5]">
                  <span>Cluster Fulfillment</span>
                  <span>{isConfirmed ? '74%' : '0%'}</span>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#e8fe85] h-full rounded-full transition-all duration-500"
                    style={{ width: isConfirmed ? '74%' : '0%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Farmer Primary Hub Business Rule Note */}
            <div className="p-2.5 rounded-[10px] bg-white/5 border border-white/10 text-[11px] text-[#e6ecd5]/80 flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px] text-[#e8fe85]">info</span>
              <span>
                <strong>Business Rule:</strong> Farmers remain linked to their primary assigned hub (Ramesh → Hub A, Suresh → Hub A, Kumar → Hub B).
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Aerial Telemetry Banner */}
      <div className="rounded-[18px] bg-white/10 border border-white/15 overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch">
        <div className="md:col-span-5 relative min-h-[140px]">
          <img
            src={data.droneImage}
            alt="Drone Farmland Survey"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00372a]/30 to-[#1b6e53]/90 hidden md:block"></div>
          <div className="absolute top-3 left-3 bg-[#00372a]/80 backdrop-blur-sm text-[#e8fe85] text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#c3cda7]/40">
            {data.droneTelemetry?.surveyTime || 'Cluster Audit • 06:30 AM'}
          </div>
        </div>

        <div className="md:col-span-7 p-4 md:p-5 flex flex-col justify-between bg-white/5">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#e8fe85] font-semibold">
                Cluster Production & Telemetry
              </span>
              <span className="text-[10px] text-[#e6ecd5]/70">
                {data.droneTelemetry?.perimeter || '18km Hub Network Perimeter'}
              </span>
            </div>
            <h3 className="font-editorial text-xl font-normal text-white">
              {data.droneTelemetry?.title || 'Cluster Production & Minimum Hub Route Optimization'}
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 mt-2 border-t border-white/10 text-center md:text-left">
            <div>
              <span className="text-[10px] text-[#e6ecd5]/80 block uppercase tracking-wider">Active Acreage</span>
              <span className="font-editorial text-xl text-white font-normal">{data.droneTelemetry?.activeAcreage || '380 Hectares'}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#e6ecd5]/80 block uppercase tracking-wider">Avg Soil Moisture</span>
              <span className="font-editorial text-xl text-[#e8fe85] font-normal">{data.droneTelemetry?.soilMoisture || '68% Ideal'}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#e6ecd5]/80 block uppercase tracking-wider">Expected Yield</span>
              <span className="font-editorial text-xl text-white font-normal">{data.droneTelemetry?.expectedYield || '48 Tonnes'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: View Hub Details */}
      {viewHubModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] text-[#212529] border border-[#c3cda7] rounded-[24px] max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]">
              <div>
                <span className="text-[10px] font-mono text-[#1b6e53] font-bold uppercase">
                  Hub Specification // Hub A
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Hub A — Nashik Central
                </h3>
              </div>
              <button
                onClick={() => setViewHubModal(false)}
                className="w-8 h-8 rounded-full bg-[#f1efdf] text-[#6d6d6d] hover:text-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs bg-[#f1efdf] p-4 rounded-[16px]">
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Available Capacity:</span>
                <span className="font-bold text-[#1b6e53]">1,300 kg headroom</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Primary Registered Farmers:</span>
                <span className="font-bold text-[#212529]">18 Cluster Members</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Sorting / Weighment Bay:</span>
                <span className="font-bold text-[#212529]">Bay 1 & 2 Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Distance to Buyer Transit Corridor:</span>
                <span className="font-bold text-[#212529]">4.2 km (Optimal)</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setViewHubModal(false)}
                className="px-5 py-2.5 rounded-[100px] border border-[#c3cda7] text-xs font-semibold text-[#6d6d6d] hover:bg-[#f1efdf] transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setViewHubModal(false)
                  handleConfirmPlan()
                }}
                className="px-5 py-2.5 rounded-[100px] bg-[#1b6e53] text-[#e8fe85] text-xs font-bold hover:bg-[#00372a] transition shadow-sm cursor-pointer"
              >
                Confirm Hub A Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Continue to Farmer Allocation */}
      {farmerModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] text-[#212529] border border-[#c3cda7] rounded-[24px] max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]">
              <div>
                <span className="text-[10px] font-mono text-[#1b6e53] font-bold uppercase">
                  Stage 3 // Farmer Allocation Engine
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Primary Cluster Allocations
                </h3>
              </div>
              <button
                onClick={() => setFarmerModal(false)}
                className="w-8 h-8 rounded-full bg-[#f1efdf] text-[#6d6d6d] hover:text-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-[#e6ecd5] border border-[#1b6e53]/30 rounded-[14px] text-xs text-[#1b6e53] space-y-1">
              <div className="font-bold">✓ Hub Plan Confirmed for Order {activeOrder.orderId}</div>
              <p>Farmers are linked strictly to their primary assigned hub for dispatch & weighment.</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-semibold text-[#212529]">Sample Assigned Producers:</div>
              <div className="space-y-1.5 font-mono">
                <div className="p-2 rounded-[10px] bg-[#f1efdf] flex justify-between">
                  <span>Ramesh B. (Hub A Primary)</span>
                  <span className="font-bold text-[#1b6e53]">100 kg Tomato Grade A</span>
                </div>
                <div className="p-2 rounded-[10px] bg-[#f1efdf] flex justify-between">
                  <span>Suresh K. (Hub A Primary)</span>
                  <span className="font-bold text-[#1b6e53]">200 kg Tomato Grade A</span>
                </div>
                <div className="p-2 rounded-[10px] bg-[#f1efdf] flex justify-between">
                  <span>Tukaram M. (Hub A Primary)</span>
                  <span className="font-bold text-[#1b6e53]">350 kg Tomato Grade A</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setFarmerModal(false)}
                className="px-5 py-2.5 rounded-[100px] bg-[#1b6e53] text-[#e8fe85] text-xs font-bold hover:bg-[#00372a] transition shadow-sm cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
