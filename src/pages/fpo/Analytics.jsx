import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import StatCard from '../../components/ui/StatCard'

export default function Analytics() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="FPO Operational & Financial Analytics"
        description="Historical trends, commodity price forecasting, cluster yield maps, and member growth."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Year-on-Year Growth" value="+38%" change="Volume aggregated" trend="up" />
        <StatCard title="Farmer Realization" value="+18.4%" change="Above local APMC mandi rate" trend="up" />
        <StatCard title="Supply Chain Waste" value="< 1.2%" change="Post-harvest losses" trend="up" />
      </div>

      <Card title="Performance Trends">
        <div className="p-8 text-center text-slate-500">
          <p className="text-base font-medium text-slate-700">Analytics & Insights Dashboard</p>
          <p className="text-sm text-slate-400 mt-1">
            Visualizing multi-crop yield cycles, price realization improvements, and buyer fulfillment metrics.
          </p>
        </div>
      </Card>
    </div>
  )
}
