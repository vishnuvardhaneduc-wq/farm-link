import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import DataTable from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import Button from '../../components/ui/Button'
import { buyerStats, mockDemands } from '../../data/mockData'
import { Link } from 'react-router'

export default function BuyerDashboard() {
  const demandColumns = [
    { key: 'id', header: 'Demand Ref' },
    { key: 'crop', header: 'Commodity' },
    { key: 'requiredQty', header: 'Quantity' },
    { key: 'priceOffered', header: 'Contract Rate' },
    { key: 'deadline', header: 'Delivery Deadline' },
    {
      key: 'status',
      header: 'Status',
      render: (val) => <StatusBadge status={val} />
    }
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Buyer Procurement Dashboard"
        description="Manage forward procurement demands, track batch fulfillment, and monitor verified farm suppliers."
        actions={
          <Link to="/buyer/demands/new">
            <Button variant="primary">+ Post New Demand</Button>
          </Link>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {buyerStats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Active Demands Table */}
      <Card
        title="My Active Procurement Demands"
        subtitle="Forward contracts published to partner FPOs"
        action={
          <Link to="/buyer/demands" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
            View All →
          </Link>
        }
      >
        <DataTable columns={demandColumns} data={mockDemands} />
      </Card>
    </div>
  )
}
