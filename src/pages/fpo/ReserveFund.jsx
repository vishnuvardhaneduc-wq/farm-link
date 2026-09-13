import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import StatCard from '../../components/ui/StatCard'

export default function ReserveFund() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="FPO Price Stabilization & Reserve Fund"
        description="Capital reserves safeguarding smallholder farmers against market volatility and crop distress."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Current Corpus" value="₹14,50,000" change="Maintained at 100%" trend="up" />
        <StatCard title="Contribution Rate" value="1.5%" change="Per transaction value" trend="neutral" />
        <StatCard title="Disaster Buffer" value="₹5,000,000" change="Available limit" trend="up" />
      </div>

      <Card title="Reserve Corpus Utilization Rules">
        <div className="p-8 text-center text-slate-500">
          <p className="text-base font-medium text-slate-700">Reserve Fund Management</p>
          <p className="text-sm text-slate-400 mt-1">
            Tracking corpus growth, automated price-floor triggers, and member dividend distributions.
          </p>
        </div>
      </Card>
    </div>
  )
}
