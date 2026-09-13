import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import StatCard from '../../components/ui/StatCard'

export default function Supply() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Aggregated Farmer Supply"
        description="Consolidated harvest estimates and registered member yields ready for pooling."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Wheat Available" value="280 MT" change="Ready in 10 days" trend="up" />
        <StatCard title="Paddy Available" value="145 MT" change="Ready in 18 days" trend="neutral" />
        <StatCard title="Mustard Available" value="65 MT" change="Harvest underway" trend="up" />
      </div>

      <Card title="Supply Aggregation Status">
        <div className="p-8 text-center text-slate-500">
          <p className="text-base font-medium text-slate-700">Supply aggregation view</p>
          <p className="text-sm text-slate-400 mt-1">
            Visualizing farmer harvesting schedules and cluster-based volume pooling.
          </p>
        </div>
      </Card>
    </div>
  )
}
