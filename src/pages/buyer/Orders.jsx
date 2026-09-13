import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import StatCard from '../../components/ui/StatCard'

export default function Orders() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders & Fulfilled Contracts"
        description="Track executed procurement agreements, shipment milestones, and dispatch manifests."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Active Contracts" value="12" change="3 pending fulfillment" trend="up" />
        <StatCard title="Dispatched Today" value="38 MT" change="En route from Kheda Hub" trend="up" />
        <StatCard title="Quality Clearances" value="100%" change="All lots inspected" trend="up" />
      </div>

      <Card title="Contract Tracking & Shipments">
        <div className="p-8 text-center text-slate-500">
          <p className="text-base font-medium text-slate-700">Orders & Fulfillment Pipeline</p>
          <p className="text-sm text-slate-400 mt-1">
            Real-time status of matched lots, hub aggregation milestones, weighing receipts, and truck dispatches.
          </p>
        </div>
      </Card>
    </div>
  )
}
