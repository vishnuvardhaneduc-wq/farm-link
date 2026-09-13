import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import StatCard from '../../components/ui/StatCard'

export default function Collection() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Village Collection Centers"
        description="Monitor decentralized produce aggregation, center inventory, and daily drop-offs."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Active Centers" value="6 Hubs" change="All operational" trend="up" />
        <StatCard title="Today's Drop-offs" value="48 Farmers" change="+14% vs yesterday" trend="up" />
        <StatCard title="Storage Utilization" value="64%" change="Normal capacity" trend="neutral" />
      </div>

      <Card title="Collection Center Operational Status">
        <div className="p-8 text-center text-slate-500">
          <p className="text-base font-medium text-slate-700">Collection Centers View</p>
          <p className="text-sm text-slate-400 mt-1">
            Tracking field drop-offs, gate entries, and batch labeling across village collection centers.
          </p>
        </div>
      </Card>
    </div>
  )
}
