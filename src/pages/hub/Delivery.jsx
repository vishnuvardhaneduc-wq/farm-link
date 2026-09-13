import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import StatCard from '../../components/ui/StatCard'
import Button from '../../components/ui/Button'

export default function HubDelivery() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Hub Outbound Dispatch & Consignment"
        description="Consolidated truck loading, digital e-way bill verification, and buyer dispatch manifests."
        actions={<Button variant="primary">+ Create Dispatch Manifest</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Ready for Dispatch" value="2 Trucks" change="32.5 MT total" trend="neutral" />
        <StatCard title="Dispatched Today" value="3 Trucks" change="En route" trend="up" />
        <StatCard title="Gate Out Clearances" value="100%" change="All verified" trend="up" />
      </div>

      <Card title="Outbound Shipment Manifests">
        <div className="p-8 text-center text-slate-500">
          <p className="text-base font-medium text-slate-700">Dispatch & Outbound Gate Log</p>
          <p className="text-sm text-slate-400 mt-1">
            Tracking buyer vehicle numbers, driver IDs, digital signatures, seal numbers, and trip dispatches.
          </p>
        </div>
      </Card>
    </div>
  )
}
