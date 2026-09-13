import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import DataTable from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import Button from '../../components/ui/Button'
import { mockDemands } from '../../data/mockData'
import { Link } from 'react-router'

export default function Demands() {
  const columns = [
    { key: 'id', header: 'Demand Ref' },
    { key: 'crop', header: 'Commodity' },
    { key: 'requiredQty', header: 'Target Quantity' },
    { key: 'priceOffered', header: 'Offered Price' },
    { key: 'deadline', header: 'Required By' },
    {
      key: 'status',
      header: 'Status',
      render: (val) => <StatusBadge status={val} />
    }
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Procurement Demands"
        description="View and manage all demand contracts published to regional FPO federations."
        actions={
          <Link to="/buyer/demands/new">
            <Button variant="primary">+ Create Demand</Button>
          </Link>
        }
      />

      <Card>
        <DataTable columns={columns} data={mockDemands} />
      </Card>
    </div>
  )
}
