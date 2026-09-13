import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import StatCard from '../../components/ui/StatCard'
import Button from '../../components/ui/Button'

export default function HubWeighing() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Weighbridge & Precision Scale Station"
        description="Gross, tare, and net automated weight recording with tamper-proof digital receipts."
        actions={<Button variant="primary">Calibrate Weighbridge</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Scale Connectivity" value="Online ⚡" change="COM3 Scale Active" trend="up" />
        <StatCard title="Total Weighed Today" value="28,450 kg" change="Tare compensated" trend="up" />
        <StatCard title="Avg Weigh Cycle" value="2.4 mins" change="Automated print" trend="up" />
      </div>

      <Card title="Live Weighbridge Terminal">
        <div className="p-8 text-center text-slate-500">
          <p className="text-base font-medium text-slate-700">Digital Weighing Terminal</p>
          <p className="text-sm text-slate-400 mt-1">
            Real-time weight sensor sync, automated tare deduction, and digital weight slip generation.
          </p>
        </div>
      </Card>
    </div>
  )
}
