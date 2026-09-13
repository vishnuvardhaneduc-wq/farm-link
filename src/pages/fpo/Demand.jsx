import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import DataTable from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import Button from '../../components/ui/Button'
import { mockDemands } from '../../data/mockData'

export default function Demand() {
  const columns = [
    { key: 'id', header: 'Demand Ref' },
    { key: 'buyer', header: 'Buyer Name' },
    { key: 'crop', header: 'Required Commodity' },
    { key: 'requiredQty', header: 'Demanded Qty' },
    { key: 'priceOffered', header: 'Offered Price' },
    { key: 'deadline', header: 'Target Date' },
    {
      key: 'status',
      header: 'Fulfillment Status',
      render: (val) => <StatusBadge status={val} />
    }
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Forward Crop Demands"
        description="Incoming commitments and procurement contracts posted by institutional buyers."
        actions={<Button variant="outline">Filter Demands</Button>}
      />

      <Card>
        <DataTable columns={columns} data={mockDemands} />
      </Card>
    </div>
  )
}
