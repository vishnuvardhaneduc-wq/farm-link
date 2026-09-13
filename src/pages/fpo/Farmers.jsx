import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import DataTable from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import Button from '../../components/ui/Button'
import { mockFarmers } from '../../data/mockData'

export default function Farmers() {
  const columns = [
    { key: 'id', header: 'Member ID' },
    { key: 'name', header: 'Full Name' },
    { key: 'village', header: 'Village / Region' },
    { key: 'crop', header: 'Primary Crop' },
    { key: 'acreage', header: 'Acreage' },
    { key: 'estYield', header: 'Est. Yield' },
    { key: 'phone', header: 'Phone' },
    {
      key: 'status',
      header: 'Status',
      render: (val) => <StatusBadge status={val} />
    }
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Farmer Directory & Landholdings"
        description="Comprehensive member register with acreage mapping and seasonal yield projections."
        actions={<Button variant="primary">+ Register New Farmer</Button>}
      />

      <Card>
        <DataTable columns={columns} data={mockFarmers} />
      </Card>
    </div>
  )
}
