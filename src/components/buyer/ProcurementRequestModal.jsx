import React, { useState } from 'react'

export default function ProcurementRequestModal({
  isOpen,
  onClose,
  initialData = {},
  onSubmitSuccess
}) {
  const [formData, setFormData] = useState({
    crop: initialData.product || initialData.crop || 'Tomato',
    grade: initialData.grade || 'Grade A',
    quantity: initialData.quantity || '1000',
    unit: 'kg',
    targetPrice: initialData.targetPrice || initialData.indicativePrice?.replace(/[^0-9.]/g, '') || '28',
    deliveryDate: initialData.deliveryDate || '2026-09-18',
    deliveryLocation: 'Vijayawada Central Processing Hub',
    targetFpo: initialData.fpoName || initialData.name || 'All Matching Regional FPOs',
    notes: 'Standard optical sorting required. Delivery before 09:00 AM in refrigerated crates.'
  })

  const [submitted, setSubmitted] = useState(false)
  const [generatedRef, setGeneratedRef] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const ref = `REQ-${Math.floor(1000 + Math.random() * 9000)}`
    setGeneratedRef(ref)
    setSubmitted(true)
    if (onSubmitSuccess) {
      onSubmitSuccess({ ...formData, ref })
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#ffffff] rounded-[24px] border border-[#c3cda7] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#1b6e53] text-[#ffffff] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8fe85] text-[#1b6e53] font-bold text-sm">
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            </span>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#ffffff] leading-none">
                Send Procurement Request (RFQ)
              </h3>
              <p className="text-[11px] text-[#e6ecd5]/90 font-mono mt-0.5">
                Forward tender to verified FPO aggregation hubs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-4 bg-[#f1efdf]">
            <div className="mx-auto w-12 h-12 bg-[#e8fe85] text-[#1b6e53] rounded-full flex items-center justify-center text-2xl font-bold border border-[#c3cda7]">
              ✓
            </div>
            <div>
              <h4 className="font-editorial text-2xl font-bold text-[#00372a]">
                Procurement Request Published!
              </h4>
              <p className="text-xs text-[#6d6d6d] mt-1 font-mono">
                Ref ID: <span className="font-bold text-[#1b6e53] bg-[#ffffff] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">{generatedRef}</span>
              </p>
            </div>
            <div className="bg-[#ffffff] rounded-[18px] p-4 text-left text-xs text-[#212529] space-y-2 border border-[#c3cda7] font-sans">
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Commodity:</span>
                <span className="font-bold">{formData.crop} ({formData.grade})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Target Volume:</span>
                <span className="font-bold text-[#1b6e53] font-mono">{formData.quantity} {formData.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Target Supplier:</span>
                <span className="font-bold font-mono text-[#00372a]">{formData.targetFpo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Required Delivery:</span>
                <span className="font-mono">{formData.deliveryDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Status:</span>
                <span className="inline-flex items-center gap-1 font-mono font-bold text-[#683600] bg-[#fceace] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#683600] animate-pulse"></span>
                  Receiving Offers from FPOs
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-[#e6ecd5] border border-[#c3cda7] rounded-[16px] text-left text-xs text-[#1b6e53] space-y-1">
              <p className="font-bold flex items-center gap-1.5 font-mono">
                <span>🌾</span> Discovery Principle:
              </p>
              <p className="text-[11px] leading-relaxed">
                The FPO manager and local collection hubs have been notified. Once member farmers check in at physical intake scales, binding offers will appear in your <strong>My Requests / Demands</strong> workspace.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                className="flex-1 py-2.5 rounded-[100px] border border-[#c3cda7] text-xs font-semibold text-[#353535] bg-[#ffffff] hover:bg-[#f1efdf] transition cursor-pointer"
                onClick={handleReset}
              >
                Close
              </button>
              <button
                type="button"
                className="flex-1 py-2.5 rounded-[100px] bg-[#1b6e53] text-[#ffffff] text-xs font-bold hover:bg-[#00372a] transition shadow-xs cursor-pointer"
                onClick={() => {
                  handleReset()
                  window.location.href = '/buyer/demands'
                }}
              >
                View in My Requests →
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-[#f1efdf]">
            {/* Recipient banner */}
            <div className="bg-[#e6ecd5] border border-[#c3cda7] rounded-[16px] p-3 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#1b6e53] text-[20px] shrink-0 mt-0.5">apartment</span>
              <div className="text-xs">
                <p className="font-bold text-[#1b6e53] font-mono uppercase">Recipient FPO:</p>
                <p className="text-[#00372a] font-semibold">{formData.targetFpo}</p>
                <p className="text-[11px] text-[#1b6e53] mt-0.5">
                  Discovery stage: Sending this RFQ requests binding quotes from this FPO aggregation network.
                </p>
              </div>
            </div>

            {/* Crop & Grade */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                  Commodity
                </label>
                <input
                  type="text"
                  required
                  value={formData.crop}
                  onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                  Required Grade
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53]"
                >
                  <option value="Grade A">Grade A (Premium)</option>
                  <option value="Grade B">Grade B (Commercial)</option>
                  <option value="Export Grade">Export Grade (Optical Sorted)</option>
                  <option value="Processing Grade">Processing / Pulping Grade</option>
                </select>
              </div>
            </div>

            {/* Quantity & Target Budget */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                  Target Quantity (kg)
                </label>
                <input
                  type="number"
                  required
                  min="100"
                  step="50"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                  Indicative Target Rate (₹/kg)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.targetPrice}
                  onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] font-mono"
                />
              </div>
            </div>

            {/* Delivery Date & Drop location */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                  Delivery Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                  Destination Hub Dock
                </label>
                <input
                  type="text"
                  value={formData.deliveryLocation}
                  onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-[#c3cda7] rounded-[100px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53]"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[11px] font-semibold text-[#353535] mb-1 font-mono uppercase">
                Packing &amp; Quality Specifications
              </label>
              <textarea
                rows="2"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 bg-[#ffffff] border border-[#c3cda7] rounded-[16px] focus:outline-none focus:ring-1 focus:ring-[#1b6e53]"
                placeholder="Crates packaging, optical sorting, FSSAI lot report..."
              />
            </div>

            {/* Notice */}
            <p className="text-[11px] text-[#6d6d6d] bg-[#ffffff] p-3 rounded-[16px] border border-[#c3cda7]/60">
              ℹ️ <strong>B2B Procurement Rule:</strong> This publishes a non-binding Request for Quote (RFQ). The FPO responds with committed lot availability and pricing. You confirm the order only after comparing received offers.
            </p>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                className="flex-1 py-2.5 rounded-[100px] border border-[#c3cda7] text-xs font-semibold text-[#353535] bg-[#ffffff] hover:bg-[#faf9f0] transition cursor-pointer"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-sm cursor-pointer"
              >
                Publish Request →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
