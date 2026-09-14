import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { findMatchingFposForItem, saveNewDemand } from '../../data/buyerData'

export default function CreateDemand() {
  const navigate = useNavigate()

  // Common Request Details
  const [commonDetails, setCommonDetails] = useState({
    deliveryDate: '2026-09-25',
    destination: 'Vijayawada Processing Hub Dock',
    notes: 'All items must be delivered at Bay 03 before 10:00 AM. Optical grading lot report required.'
  })

  // Multi-Item List State
  const [items, setItems] = useState([
    {
      id: 'item-1',
      crop: 'Tomato',
      variety: 'Hybrid Roma',
      quantity: '1000',
      unit: 'kg',
      grade: 'Grade A',
      targetPrice: '28',
      qualitySpecs: 'Optical grading Grade A required, max 5% moisture tolerance.',
      packaging: 'Ventilated 20kg crates'
    },
    {
      id: 'item-2',
      crop: 'Onion',
      variety: 'Nasik Red',
      quantity: '500',
      unit: 'kg',
      grade: 'Grade A',
      targetPrice: '24',
      qualitySpecs: 'Dry cured, sorted, 45-55mm uniform diameter.',
      packaging: 'Mesh bags 25kg'
    },
    {
      id: 'item-3',
      crop: 'Green Chilli',
      variety: 'G4 Hot',
      quantity: '200',
      unit: 'kg',
      grade: 'Grade A',
      targetPrice: '45',
      qualitySpecs: 'Dark green, fresh harvested, uniform length.',
      packaging: '5kg corrugated boxes'
    }
  ])

  // Step 2 Matching & FPO Selection State: mapped by item.id -> array of selected FPO ids
  const [isMatchingFound, setIsMatchingFound] = useState(false)
  const [itemFpoSelections, setItemFpoSelections] = useState({
    'item-1': ['fpo-godavari', 'fpo-green-valley'],
    'item-2': ['fpo-delta-agro'],
    'item-3': ['fpo-godavari', 'fpo-krishna-valley']
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Item management helpers
  const handleAddItem = () => {
    const newId = `item-${Date.now()}`
    setItems([
      ...items,
      {
        id: newId,
        crop: '',
        variety: '',
        quantity: '500',
        unit: 'kg',
        grade: 'Grade A',
        targetPrice: '25',
        qualitySpecs: '',
        packaging: ''
      }
    ])
    // Reset matching state when items change
    setIsMatchingFound(false)
  }

  const handleRemoveItem = (idToRemove) => {
    if (items.length <= 1) return
    setItems(items.filter((item) => item.id !== idToRemove))
    setItemFpoSelections((prev) => {
      const copy = { ...prev }
      delete copy[idToRemove]
      return copy
    })
    setIsMatchingFound(false)
  }

  const handleItemChange = (id, field, value) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
    setIsMatchingFound(false)
  }

  // Toggle selection of an FPO for a specific item
  const toggleFpoForItem = (itemId, fpoId) => {
    setItemFpoSelections((prev) => {
      const currentSelected = prev[itemId] || []
      const updated = currentSelected.includes(fpoId)
        ? currentSelected.filter((id) => id !== fpoId)
        : [...currentSelected, fpoId]
      return {
        ...prev,
        [itemId]: updated
      }
    })
  }

  const handleFindMatchingFPOs = (e) => {
    e.preventDefault()

    // Validate that all items have crop, quantity, and grade
    for (const item of items) {
      if (!item.crop.trim() || !item.quantity || !item.grade) {
        alert('Please ensure all items have a specified Commodity, Quantity, and Grade.')
        return
      }
    }

    // Initialize default selections if not already set
    const initialSelections = { ...itemFpoSelections }
    items.forEach((item) => {
      if (!initialSelections[item.id] || initialSelections[item.id].length === 0) {
        const matches = findMatchingFposForItem(item.crop, item.grade)
        initialSelections[item.id] = matches.slice(0, 2).map((f) => f.id)
      }
    })
    setItemFpoSelections(initialSelections)
    setIsMatchingFound(true)

    // Smooth scroll to matching section
    setTimeout(() => {
      document.getElementById('matching-fpo-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  // Calculate total FPO selections across all items
  const totalFpoSelectionsCount = Object.values(itemFpoSelections).reduce(
    (acc, arr) => acc + (arr ? arr.length : 0),
    0
  )

  const handleSendProcurementRequest = () => {
    if (totalFpoSelectionsCount === 0) {
      alert('Please select at least one FPO for each procurement item.')
      return
    }

    setIsSubmitting(true)
    const newReqId = `REQ-${Math.floor(1027 + Math.random() * 900)}`

    // Build the rich multi-item request record
    const builtItems = items.map((item, itemIdx) => {
      const selectedFpoIds = itemFpoSelections[item.id] || []
      const matchingFpos = findMatchingFposForItem(item.crop, item.grade)
      const selectedFpos = matchingFpos.filter((f) => selectedFpoIds.includes(f.id))

      // Generate realistic independent FPO responses for this item
      const responses = selectedFpos.map((fpo, fpoIdx) => {
        const targetRateNum = parseFloat(item.targetPrice) || 28
        if (fpoIdx === 0) {
          // Accepted response
          return {
            id: `resp-${newReqId}-${itemIdx + 1}-1`,
            fpoId: fpo.id,
            fpoName: fpo.name,
            location: fpo.location,
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            offeredQty: `${Number(item.quantity).toLocaleString()} kg`,
            offeredPrice: `₹${(targetRateNum - 0.5).toFixed(2)} / kg`,
            deliveryDate: commonDetails.deliveryDate,
            hub: `${fpo.name.split(' ')[0]} Central Aggregation Hub`,
            notes: `Full ${item.quantity} kg volume allocated. 100% optical sorted ${item.grade}, ready for scheduled delivery on ${commonDetails.deliveryDate}.`,
            timestamp: 'Just now',
            contact: 'Hub Procurement Desk'
          }
        } else if (fpoIdx === 1) {
          // Accepted response for 2nd FPO
          return {
            id: `resp-${newReqId}-${itemIdx + 1}-2`,
            fpoId: fpo.id,
            fpoName: fpo.name,
            location: fpo.location,
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            offeredQty: `${Number(item.quantity).toLocaleString()} kg`,
            offeredPrice: `₹${targetRateNum.toFixed(2)} / kg`,
            deliveryDate: commonDetails.deliveryDate,
            hub: `${fpo.name.split(' ')[0]} Aggregation Hub`,
            notes: `Full volume allocated. Grade A lot ready for direct dock dispatch on ${commonDetails.deliveryDate}.`,
            timestamp: 'Just now',
            contact: 'Dispatch Desk'
          }
        } else if (fpoIdx === 2) {
          // Back offer response for 3rd FPO
          return {
            id: `resp-${newReqId}-${itemIdx + 1}-3`,
            fpoId: fpo.id,
            fpoName: fpo.name,
            location: fpo.location,
            status: 'BACK_OFFER',
            statusLabel: 'BACK OFFER',
            statusStyle: 'bg-[#fceace] text-[#683600] border border-[#c3cda7]',
            requestedQty: `${Number(item.quantity).toLocaleString()} kg`,
            offeredQty: `${Number(item.quantity).toLocaleString()} kg`,
            counterPrice: `₹${(targetRateNum + 1.0).toFixed(2)} / kg`,
            deliveryDate: commonDetails.deliveryDate,
            hub: `${fpo.name.split(' ')[0]} Logistics Bay`,
            notes: `Proposes commercial counter price of ₹${(targetRateNum + 1.0).toFixed(2)}/kg due to peak refrigerated transport logistics.`,
            counterReasons: [
              `Counter price of ₹${(targetRateNum + 1.0).toFixed(2)}/kg due to freight index surcharge`,
              'Optical assay and moisture compliance report guaranteed'
            ],
            timestamp: 'Just now',
            contact: 'Dispatch Coordinator'
          }
        } else {
          // Additional FPO responses
          return {
            id: `resp-${newReqId}-${itemIdx + 1}-${fpoIdx + 1}`,
            fpoId: fpo.id,
            fpoName: fpo.name,
            location: fpo.location,
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            offeredQty: `${Number(item.quantity).toLocaleString()} kg`,
            offeredPrice: `₹${targetRateNum.toFixed(2)} / kg`,
            deliveryDate: commonDetails.deliveryDate,
            hub: `${fpo.name.split(' ')[0]} Hub`,
            notes: `Volume confirmed for ${commonDetails.deliveryDate}.`,
            timestamp: 'Just now',
            contact: 'Hub Officer'
          }
        }
      })

      return {
        itemId: item.id,
        crop: item.crop,
        variety: item.variety,
        quantity: `${Number(item.quantity).toLocaleString()} kg`,
        quantityVal: Number(item.quantity),
        unit: item.unit || 'kg',
        grade: item.grade,
        targetPrice: `₹${item.targetPrice} / kg`,
        qualitySpecs: item.qualitySpecs,
        packaging: item.packaging,
        selectedFposCount: `${selectedFpoIds.length} FPOs requested`,
        selectedFpoOfferId: null,
        responses
      }
    })

    const newDemandRecord = {
      id: newReqId,
      buyer: 'AgroFresh Enterprise',
      deliveryDate: commonDetails.deliveryDate,
      deliveryLocation: commonDetails.destination,
      notes: commonDetails.notes,
      status: 'Awaiting Responses',
      statusVariant: 'warning',
      createdDate: 'Today, 09:00 AM',
      items: builtItems
    }

    saveNewDemand(newDemandRecord)

    // Navigate to the created multi-item request details page
    navigate(`/buyer/requests/${newReqId}`)
  }

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-block mb-1.5">
            MULTI-ITEM PROCUREMENT // FORWARD RFQ
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Post Multi-Item <span className="italic font-normal">Procurement Request</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Add multiple commodities in a single tender, discover matching FPOs per item, and manage independent supplier offers.
          </p>
        </div>

        <Link
          to="/buyer/demands"
          className="py-2.5 px-5 rounded-[100px] bg-[#ffffff] hover:bg-[#f1efdf] text-[#212529] border border-[#c3cda7] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
        >
          <span>← Back to Demands</span>
        </Link>
      </div>

      {/* 2. Common Request Details (Outside Item Cards) */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#c3cda7]/50">
          <span className="material-symbols-outlined text-[#1b6e53] text-[22px]">local_shipping</span>
          <div>
            <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
              Common Request Details
            </h2>
            <p className="text-xs text-[#6d6d6d]">
              Logistics and delivery parameters applying to all items in this procurement tender
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
              Required Delivery Date <span className="text-rose-600">*</span>
            </label>
            <input
              type="date"
              required
              value={commonDetails.deliveryDate}
              onChange={(e) => setCommonDetails({ ...commonDetails, deliveryDate: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 bg-[#f1efdf]/50 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] font-mono text-[#212529]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
              Destination Logistics Hub <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              required
              value={commonDetails.destination}
              onChange={(e) => setCommonDetails({ ...commonDetails, destination: e.target.value })}
              placeholder="e.g. Vijayawada Processing Hub Dock"
              className="w-full text-xs px-3.5 py-2.5 bg-[#f1efdf]/50 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
            Overall Tender Notes &amp; Receiving Instructions
          </label>
          <input
            type="text"
            value={commonDetails.notes}
            onChange={(e) => setCommonDetails({ ...commonDetails, notes: e.target.value })}
            placeholder="e.g. Delivery before 10:00 AM at Bay 03. Optical grading lot report required."
            className="w-full text-xs px-3.5 py-2.5 bg-[#f1efdf]/50 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
          />
        </div>
      </section>

      {/* 3. Procurement Items (Multi-Item Form) */}
      <section className="space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-[#c3cda7]/50">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold">
              COMMODITY SPECIFICATIONS // {items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'}
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
              Procurement Items
            </h2>
          </div>

          <button
            type="button"
            onClick={handleAddItem}
            className="py-2.5 px-5 rounded-[100px] bg-[#e8fe85] hover:bg-[#d8ee6f] text-[#1b6e53] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Add Another Item</span>
          </button>
        </div>

        {/* Item Cards List */}
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 shadow-xs space-y-4 relative"
            >
              {/* Item Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]/50 flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-[#1b6e53] text-[#ffffff] font-mono font-bold text-xs flex items-center justify-center">
                    0{idx + 1}
                  </span>
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#00372a]">
                    Item 0{idx + 1}: {item.crop || 'New Commodity'}
                  </h3>
                  {item.grade && (
                    <span className="text-[10px] font-mono font-bold bg-[#e6ecd5] text-[#1b6e53] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">
                      {item.grade}
                    </span>
                  )}
                </div>

                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="py-1 px-3 rounded-[100px] bg-[#ffffff] hover:bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-mono font-semibold transition cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">delete</span>
                    <span>Remove Item</span>
                  </button>
                )}
              </div>

              {/* Form Grid for this Item */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Commodity */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                    Commodity / Crop <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={item.crop}
                    onChange={(e) => handleItemChange(item.id, 'crop', e.target.value)}
                    placeholder="e.g. Tomato, Onion, Green Chilli"
                    className="w-full text-xs px-3.5 py-2.5 bg-[#f1efdf]/50 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
                  />
                </div>

                {/* Variety */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                    Variety <span className="text-[#6d6d6d] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={item.variety}
                    onChange={(e) => handleItemChange(item.id, 'variety', e.target.value)}
                    placeholder="e.g. Hybrid Roma, Nasik Red, G4 Hot"
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
                    min="10"
                    step="10"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                    placeholder="e.g. 1000"
                    className="w-full text-xs px-3.5 py-2.5 bg-[#f1efdf]/50 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] font-mono text-[#212529]"
                  />
                </div>

                {/* Grade (Required) */}
                <div>
                  <label className="block text-[11px] font-bold text-[#1b6e53] mb-1 font-mono uppercase">
                    Required Grade <span className="text-rose-600">*</span>
                  </label>
                  <select
                    required
                    value={item.grade}
                    onChange={(e) => handleItemChange(item.id, 'grade', e.target.value)}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#e6ecd5] border border-[#1b6e53] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#1b6e53]"
                  >
                    <option value="Grade A">Grade A (Premium)</option>
                    <option value="Grade B">Grade B (Standard Commercial)</option>
                    <option value="Export Grade">Export Grade (Optical Sorted)</option>
                    <option value="Organic Certified">Organic Certified</option>
                    <option value="Processing Grade">Processing / Pulping Grade</option>
                  </select>
                </div>

                {/* Target Price */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                    Target Rate (₹ / kg) <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={item.targetPrice}
                    onChange={(e) => handleItemChange(item.id, 'targetPrice', e.target.value)}
                    placeholder="e.g. 28"
                    className="w-full text-xs px-3.5 py-2.5 bg-[#f1efdf]/50 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] font-mono text-[#212529]"
                  />
                </div>

                {/* Packaging */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                    Packaging Spec <span className="text-[#6d6d6d] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={item.packaging}
                    onChange={(e) => handleItemChange(item.id, 'packaging', e.target.value)}
                    placeholder="e.g. 20kg crates, 25kg mesh bags"
                    className="w-full text-xs px-3.5 py-2.5 bg-[#f1efdf]/50 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
                  />
                </div>

                {/* Quality Specs */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                    Quality Specs &amp; Tolerance
                  </label>
                  <input
                    type="text"
                    value={item.qualitySpecs}
                    onChange={(e) => handleItemChange(item.id, 'qualitySpecs', e.target.value)}
                    placeholder="e.g. Optical sorting, max 5% moisture, 45-55mm diameter"
                    className="w-full text-xs px-3.5 py-2.5 bg-[#f1efdf]/50 border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] text-[#212529]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Primary Action Button: "Find Matching FPOs" */}
        <div className="flex items-center justify-between pt-4 border-t border-[#c3cda7]/50 flex-wrap gap-3">
          <button
            type="button"
            onClick={handleAddItem}
            className="py-2.5 px-5 rounded-[100px] bg-[#ffffff] hover:bg-[#f1efdf] text-[#212529] border border-[#c3cda7] text-xs font-mono font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <span>+ Add Another Commodity</span>
          </button>

          <button
            type="button"
            onClick={handleFindMatchingFPOs}
            className="py-3 px-8 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold uppercase tracking-wider transition shadow-sm flex items-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[18px]">manage_search</span>
            <span>Find Matching FPOs ({items.length} Items) →</span>
          </button>
        </div>
      </section>

      {/* 4. Step 2: Matching FPO Discovery & Selection PER ITEM */}
      {isMatchingFound && (
        <section
          id="matching-fpo-section"
          className="rounded-[24px] bg-[#ffffff] border border-[#1b6e53] p-6 lg:p-8 shadow-md space-y-8 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Main Discovery Header */}
          <div className="pb-4 border-b border-[#c3cda7]/60">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">
                STEP 2 // MATCHING FPO DISCOVERY PER ITEM
              </span>
              <span className="text-[10px] font-mono text-[#ba1a1a] uppercase tracking-wider font-bold">
                ● Item-by-Item Supplier Allocation
              </span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
              Select FPOs for Each Procurement Item
            </h2>
            <p className="text-xs text-[#6d6d6d] font-sans">
              Choose which certified FPOs should receive requests for each respective commodity. One FPO can be selected for multiple items.
            </p>
          </div>

          {/* Render Matching Section for EACH Item */}
          <div className="space-y-8">
            {items.map((item, idx) => {
              const matchingFpos = findMatchingFposForItem(item.crop, item.grade)
              const selectedForThisItem = itemFpoSelections[item.id] || []

              return (
                <div
                  key={item.id}
                  className="rounded-[20px] bg-[#f1efdf]/60 border border-[#c3cda7] p-5 space-y-4"
                >
                  {/* Item Subhead & Selection Count */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]/50 flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-[#1b6e53] text-[#ffffff] font-mono font-bold text-xs flex items-center justify-center">
                        0{idx + 1}
                      </span>
                      <div>
                        <h3 className="font-editorial text-xl font-bold text-[#00372a]">
                          {item.crop} <span className="text-base font-normal text-[#6d6d6d]">({item.variety || 'Selected'})</span>
                        </h3>
                        <p className="text-[11px] font-mono text-[#6d6d6d]">
                          {Number(item.quantity).toLocaleString()} kg • {item.grade} • Target: ₹{item.targetPrice}/kg
                        </p>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-[100px] bg-[#ffffff] border border-[#c3cda7] text-xs font-mono font-bold text-[#1b6e53]">
                      {selectedForThisItem.length} FPOs selected for {item.crop}
                    </span>
                  </div>

                  {/* Matching FPO Cards Grid for This Item */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {matchingFpos.slice(0, 3).map((fpo) => {
                      const isSelected = selectedForThisItem.includes(fpo.id)

                      return (
                        <div
                          key={fpo.id}
                          onClick={() => toggleFpoForItem(item.id, fpo.id)}
                          className={`rounded-[16px] p-4 border transition-all cursor-pointer flex flex-col justify-between space-y-3 select-none ${
                            isSelected
                              ? 'bg-[#e6ecd5] border-[#1b6e53] shadow-xs'
                              : 'bg-[#ffffff] border-[#c3cda7] opacity-80 hover:opacity-100 hover:border-[#1b6e53]'
                          }`}
                        >
                          <div className="space-y-2">
                            {/* Checkbox and FPO Name */}
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-start gap-2.5">
                                <div
                                  className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] font-bold mt-0.5 transition ${
                                    isSelected
                                      ? 'bg-[#1b6e53] border-[#1b6e53] text-[#ffffff]'
                                      : 'bg-[#ffffff] border-[#c3cda7] text-transparent'
                                  }`}
                                >
                                  ✓
                                </div>
                                <div>
                                  <h4 className="font-editorial text-lg font-bold text-[#00372a] leading-tight">
                                    {fpo.name}
                                  </h4>
                                  <p className="text-[10px] text-[#6d6d6d] font-mono">
                                    📍 {fpo.location}
                                  </p>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono font-bold text-[#683600]">
                                ★ {fpo.rating}
                              </span>
                            </div>

                            {/* Telemetry specs for this item */}
                            <div className="bg-[#ffffff] rounded-[12px] p-2.5 space-y-1 text-[11px] border border-[#c3cda7]/40 font-sans">
                              <div className="flex justify-between">
                                <span className="text-[#6d6d6d]">{item.crop}:</span>
                                <span className="font-bold text-[#1b6e53] font-mono">Available</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#6d6d6d]">Capacity:</span>
                                <span className="font-bold text-[#1b6e53] font-mono">{fpo.capacity}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#6d6d6d]">Est. Rate:</span>
                                <span className="font-extrabold text-[#683600] font-mono">{fpo.estPrice}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[10px] font-mono pt-1">
                            <span className="text-[#6d6d6d]">{fpo.reliability}</span>
                            <span className={`font-bold ${isSelected ? 'text-[#1b6e53]' : 'text-[#6d6d6d]'}`}>
                              {isSelected ? '✓ Selected' : '+ Select'}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Global Multi-Item Summary & Submission Banner */}
          <div className="bg-[#f1efdf] rounded-[22px] p-6 border border-[#c3cda7] space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#c3cda7]/50">
              <span className="material-symbols-outlined text-[#1b6e53] text-[20px]">assignment_turned_in</span>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                Procurement Request Summary
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
              <div className="bg-[#ffffff] p-3 rounded-[16px] border border-[#c3cda7]/50">
                <span className="text-[#6d6d6d] block font-mono text-[11px]">Tender Scope:</span>
                <span className="font-bold text-[#1b6e53] font-mono text-sm">{items.length} Items Configured</span>
              </div>
              <div className="bg-[#ffffff] p-3 rounded-[16px] border border-[#c3cda7]/50">
                <span className="text-[#6d6d6d] block font-mono text-[11px]">Total Supplier Dispatches:</span>
                <span className="font-bold text-[#00372a] font-mono text-sm">{totalFpoSelectionsCount} FPO Requests</span>
              </div>
              <div className="bg-[#ffffff] p-3 rounded-[16px] border border-[#c3cda7]/50">
                <span className="text-[#6d6d6d] block font-mono text-[11px]">Delivery Schedule:</span>
                <span className="font-bold text-[#212529] font-mono text-sm">{commonDetails.deliveryDate}</span>
              </div>
            </div>

            {/* Breakdown per item */}
            <div className="space-y-1 text-xs text-[#353535] pt-1">
              <span className="text-[11px] font-mono uppercase font-bold text-[#6d6d6d] block mb-1">
                Item-by-Item Breakdown:
              </span>
              {items.map((item) => {
                const count = (itemFpoSelections[item.id] || []).length
                return (
                  <div key={item.id} className="flex justify-between py-1 border-b border-[#c3cda7]/30 text-[11px]">
                    <span className="font-semibold text-[#00372a]">
                      {item.crop} — {Number(item.quantity).toLocaleString()} kg ({item.grade})
                    </span>
                    <span className="font-mono text-[#1b6e53] font-bold">
                      {count} {count === 1 ? 'FPO requested' : 'FPOs requested'}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Submit Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3">
              <p className="text-xs text-[#6d6d6d] font-sans">
                Each selected FPO receives item-level specs and responds independently with binding offers.
              </p>

              <button
                type="button"
                disabled={totalFpoSelectionsCount === 0 || isSubmitting}
                onClick={handleSendProcurementRequest}
                className="w-full sm:w-auto py-3.5 px-8 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] disabled:opacity-50 disabled:cursor-not-allowed text-[#ffffff] text-xs font-bold uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-[0.99]"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Send Procurement Request ({items.length} Items) →</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
