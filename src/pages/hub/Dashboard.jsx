import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { hubStats } from '../../data/mockData'
import { Link } from 'react-router'

export default function HubDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Field Aggregation Hub Dashboard"
        description="Daily intake logging, precision weighbridge telemetry, moisture QA testing, and buyer dispatch."
        actions={
          <div className="flex gap-2">
            <Link to="/hub/collection">
              <Button variant="primary">+ Log Intake Drop-off</Button>
            </Link>
            <Link to="/hub/weighing">
              <Button variant="outline">Weighing Station</Button>
            </Link>
          </div>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {hubStats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Quick Ops Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Intake Queue" subtitle="Vehicles waiting at gate entry">
          <div className="py-6 text-center text-slate-500">
            <p className="text-2xl font-bold text-slate-800">4 Vehicles</p>
            <p className="text-xs text-slate-400 mt-1">Avg processing time: 12 min</p>
            <Link to="/hub/collection" className="mt-4 inline-block">
              <Button size="sm" variant="secondary">View Intake Stream</Button>
            </Link>
          </div>
        </Card>

        <Card title="QA Testing Station" subtitle="Moisture & Foreign Matter checks">
          <div className="py-6 text-center text-slate-500">
            <p className="text-2xl font-bold text-emerald-600">99.1% Pass</p>
            <p className="text-xs text-slate-400 mt-1">18 lots tested today</p>
            <Link to="/hub/quality" className="mt-4 inline-block">
              <Button size="sm" variant="secondary">Open Lab View</Button>
            </Link>
          </div>
        </Card>

        <Card title="Dispatch Bay" subtitle="Outbound trucks for buyers">
          <div className="py-6 text-center text-slate-500">
            <p className="text-2xl font-bold text-slate-800">2 Ready</p>
            <p className="text-xs text-slate-400 mt-1">Consignments sealed with RFID</p>
            <Link to="/hub/delivery" className="mt-4 inline-block">
              <Button size="sm" variant="secondary">Manage Dispatch</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
