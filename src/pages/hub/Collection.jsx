import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import StatCard from '../../components/ui/StatCard'
import Button from '../../components/ui/Button'

export default function HubCollection() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Hub Intake & Produce Collection"
        description="Gate pass generation, farmer produce receipts, lot bag count, and batch ID issuance."
        actions={<Button variant="primary">+ Log New Gate Intake</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Intake Batches" value="32 Lots" change="Today's total" trend="up" />
        <StatCard title="Total Intake Weight" value="24.8 MT" change="+4.2 MT vs yesterday" trend="up" />
        <StatCard title="Unique Farmers Served" value="29" change="Kheda Region" trend="neutral" />
      </div>

      <Card title="Today's Gate Entries & Produce Batches">
        <div className="p-8 text-center text-slate-500">
          <p className="text-base font-medium text-slate-700">Produce Intake Log</p>
          <p className="text-sm text-slate-400 mt-1">
            Logging tractor drop-offs, assigning batch QR codes, and issuing digital weight slips to farmers.
          </p>
        </div>
      </Card>
    </div>
  )
}
