import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Link } from 'react-router'

export default function CreateDemand() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Post New Forward Crop Demand"
        description="Publish institutional procurement requirements directly to verified FPO producer networks."
        actions={
          <Link to="/buyer/demands">
            <Button variant="outline">← Back to Demands</Button>
          </Link>
        }
      />

      <Card title="Demand Specification Form">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Commodity / Crop Type
              </label>
              <input
                type="text"
                placeholder="e.g. Wheat Sharbati Grade A"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Required Quantity (Metric Tonnes)
              </label>
              <input
                type="number"
                placeholder="e.g. 50"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Offered Price (₹ / Quintal)
              </label>
              <input
                type="text"
                placeholder="e.g. ₹2,650 / Qtl"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Required Delivery By
              </label>
              <input
                type="date"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Quality Specs & Moisture Tolerance
            </label>
            <textarea
              rows={3}
              placeholder="Specify acceptable moisture %, foreign matter limits, and packaging requirements..."
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Link to="/buyer/demands">
              <Button variant="secondary">Cancel</Button>
            </Link>
            <Button variant="primary">Publish Demand Contract</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
