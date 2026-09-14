import React, { useState } from 'react'
import Button from '../ui/Button'

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
    targetFpo: initialData.fpoName || initialData.name || 'All Matching Verified FPOs in Region',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 font-bold text-sm">
              📋
            </span>
            <div>
              <h3 className="font-semibold text-base text-white">Send Procurement Request (RFQ)</h3>
              <p className="text-xs text-slate-300">Forward request to verified FPO aggregation hubs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold">
              ✓
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Procurement Request Published!</h4>
              <p className="text-xs text-slate-500 mt-1">
                Ref ID: <span className="font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{generatedRef}</span>
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-left text-xs text-slate-600 space-y-2 border border-slate-200/80">
              <div className="flex justify-between">
                <span className="text-slate-400">Commodity:</span>
                <span className="font-semibold text-slate-800">{formData.crop} ({formData.grade})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Quantity:</span>
                <span className="font-semibold text-slate-800">{formData.quantity} {formData.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Supplier:</span>
                <span className="font-semibold text-slate-800">{formData.targetFpo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Required Delivery:</span>
                <span className="font-semibold text-slate-800">{formData.deliveryDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  Receiving Offers from FPO
                </span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-left text-xs text-emerald-900">
              <p className="font-semibold flex items-center gap-1.5">
                <span>🌾</span> Discovery Principle:
              </p>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                The FPO manager and regional collection hubs have been notified. Once they aggregate supply across member farmers, binding quotes with exact hub batches will appear in your <strong>Offers</strong> section.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="secondary" className="flex-1" onClick={handleReset}>
                Close
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => {
                  handleReset()
                  window.location.href = '/buyer/demands'
                }}
              >
                View in My Requests →
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Target FPO Notification banner */}
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-start gap-2.5">
              <span className="text-emerald-700 text-lg">🏢</span>
              <div className="text-xs">
                <p className="font-semibold text-emerald-900">Recipient Supplier:</p>
                <p className="text-emerald-700 font-medium">{formData.targetFpo}</p>
                <p className="text-[11px] text-emerald-600/90 mt-0.5">
                  Discovery stage: Sending this RFQ requests binding quotes from this FPO aggregation network.
                </p>
              </div>
            </div>

            {/* Commodity & Grade */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Commodity / Crop
                </label>
                <input
                  type="text"
                  required
                  value={formData.crop}
                  onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Required Grade
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Required Quantity (kg)
                </label>
                <input
                  type="number"
                  required
                  min="100"
                  step="50"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Indicative Target Rate (₹/kg)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.targetPrice}
                  onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                />
              </div>
            </div>

            {/* Delivery Date & Drop location */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Required Delivery Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Delivery Destination Hub
                </label>
                <input
                  type="text"
                  value={formData.deliveryLocation}
                  onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                />
              </div>
            </div>

            {/* Quality & Packing Specs */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Specific Quality & Packing Instructions
              </label>
              <textarea
                rows="2"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                placeholder="E.g., Crates packaging, max 5% moisture, FSSAI lot report required..."
              />
            </div>

            {/* Footnote / Disclaimer */}
            <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
              ℹ️ <strong>B2B Procurement Rule:</strong> This sends a non-binding Request for Quote (RFQ). The FPO will respond with committed lot availability and pricing. You will select and confirm the order only after comparing received offers.
            </p>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="flex-1">
                Publish Request →
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
