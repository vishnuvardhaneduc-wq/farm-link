import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import StatCard from '../../components/ui/StatCard'

export default function Settlements() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settlements & Payouts"
        description="Farmer payout calculations, buyer invoicing, and transaction reconciliations."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Disbursed" value="₹42,80,000" change="Across 210 farmers" trend="up" />
        <StatCard title="Pending Disbursal" value="₹3,40,000" change="Due within 48h" trend="neutral" />
        <StatCard title="Buyer Receivables" value="₹6,15,000" change="0 defaults" trend="up" />
      </div>

      <Card title="Payment & Settlement Ledger">
        <div className="p-8 text-center text-slate-500">
          <p className="text-base font-medium text-slate-700">Settlements Ledger</p>
          <p className="text-sm text-slate-400 mt-1">
            Tracking DBT payments, FPO margin withholdings, and transparent price breakdown per lot.
          </p>
        </div>
      </Card>
    </div>
  )
}
