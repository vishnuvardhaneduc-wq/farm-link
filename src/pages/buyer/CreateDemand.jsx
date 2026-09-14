import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { mockFPOs, saveNewDemand } from '../../data/buyerData'

export default function CreateDemand() {
  const navigate = useNavigate()

  // Form State
  const [formData, setFormData] = useState({
    crop: 'Tomato',
    variety: 'Hybrid Roma',
    quantity: '5000',
    grade: 'Grade A',
    targetPrice: '28',
    deliveryDate: '2026-09-25',
    destination: 'Vijayawada Processing Hub Dock',
    qualitySpecs: 'Optical grading Grade A required, max 5% moisture tolerance.',
    packaging: 'Ventilated 20kg crates'
  })

  // Matching Step State
  const [isMatchingFound, setIsMatchingFound] = useState(false)
  const [selectedFpoIds, setSelectedFpoIds] = useState(['fpo-godavari', 'fpo-green-valley'])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Matching FPO generation based on selected crop & grade
  const matchingFPOs = mockFPOs.map((fpo) => ({
    id: fpo.id,
    name: fpo.name,
    location: fpo.location + ', ' + fpo.district,
    cropAvailability: 'Available',
    gradeOffered: formData.grade || 'Grade A',
    capacity: fpo.tomatoCapacity || '6,000 kg',
    estPrice: fpo.tomatoPrice || '₹27 – ₹29 / kg',
    deliveryCapability: 'Available (Cold Chain Reefer Fleet)',
    reliability: fpo.reliabilityScore,
    rating: fpo.rating,
    hubsCount: fpo.hubsCount
  }))

  const handleFindMatchingFPOs = (e) => {
    e.preventDefault()
    setIsMatchingFound(true)
    // Smooth scroll to matching section
    setTimeout(() => {
      document.getElementById('matching-fpo-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const toggleFpoSelection = (id) => {
    setSelectedFpoIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedFpoIds.length === matchingFPOs.length) {
      setSelectedFpoIds([])
    } else {
      setSelectedFpoIds(matchingFPOs.map((f) => f.id))
    }
  }

  const handleSendRequest = () => {
    if (selectedFpoIds.length === 0) return

    setIsSubmitting(true)
    const newReqId = `REQ-${Math.floor(1026 + Math.random() * 900)}`

    // Generate individual FPO response states for mock demonstration
    const selectedFpoObjects = matchingFPOs.filter((f) => selectedFpoIds.includes(f.id))
    const responses = selectedFpoObjects.map((fpo, idx) => {
      if (idx === 0) {
        return {
          id: `resp-${newReqId}-1`,
          fpoId: fpo.id,
          fpoName: fpo.name,
          location: fpo.location,
          status: 'ACCEPTED',
          statusLabel: 'ACCEPTED',
          statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
          offeredQty: `${Number(formData.quantity).toLocaleString()} kg`,
          offeredPrice: `₹${(Number(formData.targetPrice) - 0.5).toFixed(2)} / kg`,
          deliveryDate: formData.deliveryDate,
          hub: 'Regional Main Intake Hub #01',
          notes: `Full volume committed across member farmer clusters. 100% optical sorted ${formData.grade}, ready for scheduled delivery.`,
          timestamp: 'Just now',
          contact: 'FPO Procurement Coordinator'
        }
      } else if (idx === 1) {
        return {
          id: `resp-${newReqId}-2`,
          fpoId: fpo.id,
          fpoName: fpo.name,
          location: fpo.location,
          status: 'BACK_OFFER',
          statusLabel: 'BACK OFFER',
          statusStyle: 'bg-[#fceace] text-[#683600] border border-[#c3cda7]',
          requestedQty: `${Number(formData.quantity).toLocaleString()} kg`,
          offeredQty: `${Number(formData.quantity).toLocaleString()} kg`,
          counterPrice: `₹${(Number(formData.targetPrice) + 1.0).toFixed(2)} / kg`,
          deliveryDate: formData.deliveryDate,
          hub: 'Secondary Aggregation Dock',
          notes: `FPO proposes commercial counter price of ₹${(Number(formData.targetPrice) + 1.0).toFixed(2)}/kg due to peak refrigerated transit capacity.`,
          counterReasons: [
            `Price adjusted to ₹${(Number(formData.targetPrice) + 1.0).toFixed(2)}/kg due to transport freight index`,
            'Guaranteed Grade A moisture testing report included'
          ],
          timestamp: 'Just now',
          contact: 'Hub Operations Desk'
        }
      } else {
        return {
          id: `resp-${newReqId}-3`,
          fpoId: fpo.id,
          fpoName: fpo.name,
          location: fpo.location,
          status: 'NO_RESPONSE',
          statusLabel: 'NO RESPONSE',
          statusStyle: 'bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7]',
          requestSentDate: 'Today',
          notes: 'Request dispatched to FPO intake bay. Waiting for farmer cluster check-in.',
          timestamp: 'Just now',
          contact: 'Intake Bay Manager'
        }
      }
    })

    const newDemandRecord = {
      id: newReqId,
      crop: formData.crop,
      variety: formData.variety,
      grade: formData.grade,
      quantity: `${Number(formData.quantity).toLocaleString()} kg`,
      targetPrice: `₹${formData.targetPrice} / kg`,
      deliveryDate: formData.deliveryDate,
      deliveryLocation: formData.destination,
      qualitySpecs: formData.qualitySpecs,
      packaging: formData.packaging,
      selectedFposCount: `${selectedFpoIds.length} FPOs selected`,
      responseSummary: `${selectedFpoIds.length > 1 ? '2 responses' : '1 response'}`,
      status: 'Awaiting Responses',
      statusVariant: 'warning',
      createdDate: 'Today, 09:00 AM',
      responses
    }

    saveNewDemand(newDemandRecord)

    // Navigate to request details
    navigate(`/buyer/requests/${newReqId}`)
  }

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-block mb-1.5">
            STEP 1 // ENTER CROP REQUIREMENTS
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Post New <span className="italic font-normal">Forward Crop Demand (RFQ)</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Specify quality, volume, and target pricing, then match with certified regional FPOs.
          </p>
        </div>

        <Link
          to="/buyer/demands"
          className="py-2.5 px-5 rounded-[100px] bg-[#ffffff] hover:bg-[#f1efdf] text-[#212529] border border-[#c3cda7] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
        >
          <span>← Back to Demands</span>
        </Link>
      </div>

      {/* 2. Step 1: Procurement Specification Form */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-[#c3cda7]/50">
          <div className="w-9 h-9 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center font-mono font-bold text-xs">
            1
          </div>
          <div>
            <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
              Crop Sourcing Specifications
            </h2>
            <p className="text-xs text-[#6d6d6d]">
              Define your required crop specifications. Grade and volume are mandatory.
            </p>
          </div>
        </div>

        <form onSubmit={handleFindMatchingFPOs} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Commodity */}
            <div>
              <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                Commodity / Crop <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                placeholder="e.g. Tomato, Onion, Potato"
                className="w-full text-xs px-3.5 py-2.5 bg-[#f1efdf]/50 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
              />
            </div>

            {/* Variety */}
            <div>
              <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                Crop Variety <span className="text-[#6d6d6d] font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.variety}
                onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                placeholder="e.g. Hybrid Roma, Himsona, G9"
                className="w-full text-xs px-3.5 py-2.5 bg-[#f1efdf]/50 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                Required Quantity (kg) <span className="text-rose-600">*</span>
              </label>
              <input
                type="number"
                required
                min="100"
                step="50"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="e.g. 5000"
                className="w-full text-xs px-3.5 py-2.5 bg-[#f1efdf]/50 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] font-mono text-[#212529]"
              />
            </div>

            {/* Required Grade (REQUIRED) */}
            <div>
              <label className="block text-[11px] font-bold text-[#1b6e53] mb-1 font-mono uppercase">
                Required Grade <span className="text-rose-600">*</span>
              </label>
              <select
                required
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#e6ecd5] border border-[#1b6e53] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#1b6e53]"
              >
                <option value="Grade A">Grade A (Premium Quality)</option>
                <option value="Grade B">Grade B (Standard Commercial)</option>
                <option value="Export Grade">Export Grade (Optical Sorted)</option>
                <option value="Organic Certified">Organic Certified Grade A</option>
                <option value="Processing Grade">Processing / Pulping Grade</option>
              </select>
            </div>

            {/* Target Price */}
            <div>
              <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                Target / Ceiling Rate (₹ / kg) <span className="text-rose-600">*</span>
              </label>
              <input
                type="number"
                step="0.5"
                required
                value={formData.targetPrice}
                onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
                placeholder="e.g. 28"
                className="w-full text-xs px-3.5 py-2.5 bg-[#f1efdf]/50 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] font-mono text-[#212529]"
              />
            </div>

            {/* Delivery Date */}
            <div>
              <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                Required Delivery Date <span className="text-rose-600">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 bg-[#f1efdf]/50 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] font-mono text-[#212529]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Destination */}
            <div>
              <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                Destination / Delivery Location <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                placeholder="e.g. Vijayawada Processing Hub Dock"
                className="w-full text-xs px-3.5 py-2.5 bg-[#f1efdf]/50 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
              />
            </div>

            {/* Packaging */}
            <div>
              <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                Packaging Requirements <span className="text-[#6d6d6d] font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.packaging}
                onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                placeholder="e.g. Ventilated 20kg crates, Mesh bags"
                className="w-full text-xs px-3.5 py-2.5 bg-[#f1efdf]/50 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
              />
            </div>
          </div>

          {/* Quality Specifications */}
          <div>
            <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
              Quality Specifications &amp; Tolerance
            </label>
            <textarea
              rows={2}
              value={formData.qualitySpecs}
              onChange={(e) => setFormData({ ...formData, qualitySpecs: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 bg-[#f1efdf]/50 border border-[#c3cda7] rounded-[18px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
              placeholder="Specify acceptable brix levels, optical sorting, size ranges, and moisture tolerance..."
            />
          </div>

          {/* Primary Action Button: "Find Matching FPOs" */}
          <div className="flex items-center justify-between pt-4 border-t border-[#c3cda7]/50 flex-wrap gap-3">
            <span className="text-xs text-[#6d6d6d] font-mono">
              Next: Discover regional FPOs capable of fulfilling this volume &amp; grade
            </span>

            <button
              type="submit"
              className="py-3 px-8 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold uppercase tracking-wider transition shadow-sm flex items-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span className="material-symbols-outlined text-[18px]">manage_search</span>
              <span>Find Matching FPOs →</span>
            </button>
          </div>
        </form>
      </section>

      {/* 3. Step 2: Matching FPO Discovery & Selection Section */}
      {isMatchingFound && (
        <section
          id="matching-fpo-section"
          className="rounded-[24px] bg-[#ffffff] border border-[#1b6e53] p-6 lg:p-8 shadow-md space-y-6 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c3cda7]/60">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#e8fe85] text-[#1b6e53] flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 border border-[#c3cda7]">
                2
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">
                    MATCHING FPOS FOUND ({matchingFPOs.length})
                  </span>
                  <span className="text-[10px] font-mono text-[#ba1a1a] uppercase tracking-wider font-bold">
                    ● Manual Selection Required
                  </span>
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
                  Select FPO Recipients
                </h2>
                <p className="text-xs text-[#6d6d6d] font-sans">
                  The request will be sent <strong>only to the selected FPOs</strong>. Each FPO will independently review and submit their binding offer.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSelectAll}
              className="py-2 px-4 rounded-[100px] bg-[#f1efdf] hover:bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7] text-xs font-mono font-bold uppercase tracking-wider transition cursor-pointer self-start sm:self-center shrink-0"
            >
              {selectedFpoIds.length === matchingFPOs.length ? 'Deselect All' : 'Select All FPOs'}
            </button>
          </div>

          {/* FPO Cards List with Checkboxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchingFPOs.map((fpo) => {
              const isSelected = selectedFpoIds.includes(fpo.id)
              return (
                <div
                  key={fpo.id}
                  onClick={() => toggleFpoSelection(fpo.id)}
                  className={`rounded-[20px] p-5 border transition-all cursor-pointer flex flex-col justify-between space-y-4 select-none ${
                    isSelected
                      ? 'bg-[#e6ecd5]/70 border-[#1b6e53] shadow-xs'
                      : 'bg-[#f1efdf]/60 border-[#c3cda7] opacity-80 hover:opacity-100 hover:border-[#1b6e53]'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Checkbox & Name */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs font-bold mt-0.5 transition ${
                            isSelected
                              ? 'bg-[#1b6e53] border-[#1b6e53] text-[#ffffff]'
                              : 'bg-[#ffffff] border-[#c3cda7] text-transparent'
                          }`}
                        >
                          ✓
                        </div>
                        <div>
                          <h3 className="font-editorial text-xl font-bold text-[#00372a] leading-snug">
                            {fpo.name}
                          </h3>
                          <p className="text-[11px] text-[#6d6d6d] font-mono mt-0.5">
                            📍 {fpo.location}
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#ffffff] border border-[#c3cda7] text-[10px] font-mono font-bold text-[#683600] shrink-0">
                        ★ {fpo.rating}
                      </span>
                    </div>

                    {/* Telemetry specs matching criteria */}
                    <div className="bg-[#ffffff] rounded-[16px] p-3 space-y-1.5 text-xs border border-[#c3cda7]/50 font-sans">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[#6d6d6d]">{formData.crop}:</span>
                        <span className="font-bold text-[#1b6e53] font-mono">Available</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[#6d6d6d]">Grade Capability:</span>
                        <span className="font-semibold text-[#00372a] font-mono">{fpo.gradeOffered}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[#6d6d6d]">Available Capacity:</span>
                        <span className="font-bold text-[#1b6e53] font-mono">{fpo.capacity}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[#6d6d6d]">Estimated Rate:</span>
                        <span className="font-extrabold text-[#683600] font-mono">{fpo.estPrice}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[#6d6d6d]">Delivery SLA:</span>
                        <span className="font-medium text-[#212529] text-[11px]">Available</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#c3cda7]/50 text-[11px] font-mono">
                    <span className="text-[#6d6d6d]">{fpo.hubsCount} Hubs online</span>
                    <span className={`font-bold ${isSelected ? 'text-[#1b6e53]' : 'text-[#6d6d6d]'}`}>
                      {isSelected ? '✓ Selected' : '+ Click to Select'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Submission Banner */}
          <div className="bg-[#f1efdf] rounded-[20px] p-5 border border-[#c3cda7] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="font-mono font-bold text-sm text-[#1b6e53] bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7]">
                  {selectedFpoIds.length} {selectedFpoIds.length === 1 ? 'FPO' : 'FPOs'} selected
                </span>
                <span className="text-xs text-[#6d6d6d]">
                  (Target Volume: {Number(formData.quantity).toLocaleString()} kg)
                </span>
              </div>
              <p className="text-xs text-[#6d6d6d] font-sans">
                Each selected FPO federation will independently submit an aggregate bid (Accepted, Back Offer, or No Response).
              </p>
            </div>

            <button
              type="button"
              disabled={selectedFpoIds.length === 0 || isSubmitting}
              onClick={handleSendRequest}
              className="py-3.5 px-8 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] disabled:opacity-50 disabled:cursor-not-allowed text-[#ffffff] text-xs font-bold uppercase tracking-wider transition shadow-sm flex items-center gap-2 cursor-pointer shrink-0 active:scale-[0.99]"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Send Procurement Request ({selectedFpoIds.length}) →</span>
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
