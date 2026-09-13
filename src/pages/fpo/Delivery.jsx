import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import StatCard from '../../components/ui/StatCard'

export default function Delivery() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Delivery & Dispatch Logistics"
        description="Outbound freight management, GPS tracking, and proof-of-delivery receipts."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="In Transit" value="4 Trucks" change="Expected today" trend="neutral" />
        <StatCard title="Delivered This Month" value="142 MT" change="100% on-time" trend="up" />
        <StatCard title="Avg Freight Cost" value="₹1.45/kg" change="-8% efficiency gain" trend="up" />
      </div>

      <Card title="Active Logistics Movements">
        <div className="p-8 text-center text-slate-500">
          <p className="text-base font-medium text-slate-700">Dispatch & Transit Pipeline</p>
          <p className="text-sm text-slate-400 mt-1">
            Tracking vehicle manifest, e-way bills, driver verification, and buyer delivery confirmations.
          </p>
        </div>
      </Card>
    </div>
  )
}
