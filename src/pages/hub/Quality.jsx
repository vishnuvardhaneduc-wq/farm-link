import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import StatCard from '../../components/ui/StatCard'
import Button from '../../components/ui/Button'

export default function HubQuality() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Hub Quality Testing & Lab Grading"
        description="Assay testing, sample moisture evaluation, foreign matter grading, and quality tag attachment."
        actions={<Button variant="primary">+ Log QA Sample Test</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Tests Performed" value="18 Samples" change="Today's lots" trend="up" />
        <StatCard title="Grade A Cleared" value="16 Lots" change="Passed spec" trend="up" />
        <StatCard title="Grade B / Downgrade" value="2 Lots" change="Minor moisture" trend="down" />
      </div>

      <Card title="Batch Quality Logbook">
        <div className="p-8 text-center text-slate-500">
          <p className="text-base font-medium text-slate-700">Digital QA Logbook</p>
          <p className="text-sm text-slate-400 mt-1">
            Logging grain moisture readings, broken grains %, foreign matter %, and assigning lot grade badges.
          </p>
        </div>
      </Card>
    </div>
  )
}
