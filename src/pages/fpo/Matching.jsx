import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import StatusBadge from '../../components/ui/StatusBadge'

export default function Matching() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Demand-Supply Matching Engine"
        description="Pair aggregated farmer yields with high-value buyer forward contracts."
        actions={<Button variant="primary">Run Matching Algorithm</Button>}
      />

      <Card title="Automated Match Suggestions">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800">AgroFresh Foods (50 MT Wheat Grade-A)</span>
                <StatusBadge status="96% Match" variant="success" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Matched with 14 Kheda cluster farmers • Offered: ₹2,650/Qtl</p>
            </div>
            <div className="mt-3 sm:mt-0 flex gap-2">
              <Button size="sm" variant="outline">Inspect Lot</Button>
              <Button size="sm" variant="primary">Confirm Batch</Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800">PureGrain Mills (20 MT Mustard Seeds)</span>
                <StatusBadge status="88% Match" variant="info" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Matched with 6 Petlad cluster farmers • Offered: ₹5,100/Qtl</p>
            </div>
            <div className="mt-3 sm:mt-0 flex gap-2">
              <Button size="sm" variant="outline">Inspect Lot</Button>
              <Button size="sm" variant="primary">Confirm Batch</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
