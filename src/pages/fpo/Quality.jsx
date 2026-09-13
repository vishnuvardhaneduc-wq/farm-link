import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import StatCard from '../../components/ui/StatCard'

export default function Quality() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Quality Assurance & Grading"
        description="Parameters, moisture testing, foreign matter screening, and grade certification."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Grade A Pass Rate" value="94.2%" change="+2.1% this season" trend="up" />
        <StatCard title="Avg Moisture Content" value="11.8%" change="Within tolerance (<12%)" trend="up" />
        <StatCard title="Rejected Batches" value="2" change="Reason: Moisture excess" trend="down" />
      </div>

      <Card title="QA Inspection Records">
        <div className="p-8 text-center text-slate-500">
          <p className="text-base font-medium text-slate-700">Quality Inspection Logs</p>
          <p className="text-sm text-slate-400 mt-1">
            Displaying moisture meters, foreign matter percentage, and digital assay certificates.
          </p>
        </div>
      </Card>
    </div>
  )
}
