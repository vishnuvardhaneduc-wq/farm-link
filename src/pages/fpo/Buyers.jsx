import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import DataTable from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import Button from '../../components/ui/Button'
import { mockBuyers } from '../../data/mockData'

export default function Buyers() {
  const columns = [
    { key: 'id', header: 'Buyer ID' },
    { key: 'company', header: 'Company Name' },
    { key: 'contactPerson', header: 'Contact Person' },
    { key: 'location', header: 'Base Location' },
    { key: 'category', header: 'Category' },
    { key: 'rating', header: 'Trust Rating' },
    {
      key: 'status',
      header: 'Account Status',
      render: (val) => <StatusBadge status={val} />
    }
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institutional Buyer Directory"
        description="Verified institutional buyers, millers, and retail aggregators connected with the FPO."
        actions={<Button variant="primary">+ Connect New Buyer</Button>}
      />

      <Card>
        <DataTable columns={columns} data={mockBuyers} />
      </Card>
    </div>
  )
}
