import React from 'react'
import { Link } from 'react-router'
import { getStoredDemands } from '../../data/buyerData'
import { getStoredHubOperations } from '../../data/hubOperationsData'
import { fpoDashboardData } from '../../data/fpoDashboardData'

// ─── 1. KPI CARDS ────────────────────────────────────────────────────────────
function KPICards() {
  const storedDemands = getStoredDemands()

  const incomingCount = storedDemands?.length || 4

  const cards = [
    {
      id: 'incoming-requests',
      title: 'Incoming Requests',
      icon: 'mark_email_unread',
      value: incomingCount,
      unit: '',
      subtitle: 'buyer requests pending review',
      badge: `${incomingCount} need attention`,
      cardBg: 'bg-[#b2cee7]',
      titleColor: 'text-[#212529]',
      valueColor: 'text-[#212529]',
      iconColor: 'text-[#212529]',
      footerColor: 'text-[#1b6e53]',
      badgeIcon: 'assignment_late',
      link: '/fpo/requests',
    },
    {
      id: 'active-orders',
      title: 'Active Orders',
      icon: 'shopping_bag',
      value: 4,
      unit: '',
      subtitle: 'orders in fulfillment pipeline',
      badge: '1 dispatched today',
      cardBg: 'bg-[#fceace]',
      titleColor: 'text-[#683600]',
      valueColor: 'text-[#212529]',
      iconColor: 'text-[#683600]',
      footerColor: 'text-[#683600]',
      badgeIcon: 'local_shipping',
      link: '/fpo/orders',
    },
    {
      id: 'fulfillment-planned',
      title: 'Fulfillment Planned',
      icon: 'alt_route',
      value: '3.7',
      unit: 'T',
      subtitle: 'tonnes allocated via engine',
      badge: '88% planned fulfillment',
      cardBg: 'bg-[#e6ecd5]',
      titleColor: 'text-[#1b6e53]',
      valueColor: 'text-[#1b6e53]',
      iconColor: 'text-[#1b6e53]',
      footerColor: 'text-[#1b6e53]',
      badgeIcon: 'auto_graph',
      link: '/fpo/orders',
    },
    {
      id: 'settlements',
      title: 'Settlements',
      icon: 'currency_rupee',
      value: '₹1.84L',
      unit: '',
      subtitle: 'gross farmer payout value',
      badge: '3 orders settled',
      cardBg: 'bg-[#ffffff]',
      titleColor: 'text-[#353535]',
      valueColor: 'text-[#1b6e53]',
      iconColor: 'text-[#1b6e53]',
      footerColor: 'text-[#1b6e53]',
      badgeIcon: 'account_balance',
      link: '/fpo/settlements',
    },
  ]

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.id}
            to={card.link}
            className={`${card.cardBg} rounded-[20px] p-5 border border-[#c3cda7] flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#1b6e53]/50 transition group`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium uppercase tracking-wider ${card.titleColor}`}>
                {card.title}
              </span>
              <span className={`material-symbols-outlined text-[20px] ${card.iconColor} group-hover:scale-110 transition-transform`}>
                {card.icon}
              </span>
            </div>

            <div className="my-3">
              <div className={`font-editorial text-4xl font-normal leading-none ${card.valueColor}`}>
                {card.value}
                {card.unit && <span className="text-xl font-sans ml-1">{card.unit}</span>}
              </div>
              <p className="text-[11px] text-[#353535] mt-1">{card.subtitle}</p>
            </div>

            <div className={`pt-2 border-t border-[#c3cda7]/60 flex items-center gap-1.5 text-xs font-semibold ${card.footerColor}`}>
              {card.badgeIcon && (
                <span className="material-symbols-outlined text-[14px]">{card.badgeIcon}</span>
              )}
              <span>{card.badge}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// ─── 2. INCOMING PROCUREMENT REQUESTS ────────────────────────────────────────
function IncomingRequests() {
  const storedDemands = getStoredDemands()
  const defaultRequests = fpoDashboardData.incomingProcurementRequests
  const allRequests = storedDemands && storedDemands.length > 0 ? storedDemands : defaultRequests
  const displayRequests = allRequests.slice(0, 4)

  const getStatusStyle = (req) => {
    if (req.fpoResponded) return 'bg-[#e6ecd5] text-[#1b6e53]'
    if (req.status === 'Waiting Response' || req.status === 'Urgent Review') return 'bg-[#fceace] text-[#683600]'
    return 'bg-[#b2cee7] text-[#00372a]'
  }

  const getStatusLabel = (req) => {
    if (req.fpoResponded) return 'Responded'
    if (req.status === 'Waiting Response') return 'Awaiting Response'
    if (req.status === 'Urgent Review') return 'Urgent'
    return 'New'
  }

  return (
    <section className="rounded-[22px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#c3cda7]/50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">mark_email_unread</span>
          </div>
          <div>
            <h2 className="font-editorial text-xl font-bold text-[#00372a] tracking-tight leading-none">
              Incoming Procurement Requests
            </h2>
            <p className="text-[11px] text-[#6d6d6d] mt-0.5 font-mono">
              {allRequests.length} total requests
            </p>
          </div>
        </div>
        <Link
          to="/fpo/requests"
          className="inline-flex items-center gap-1 text-xs text-[#1b6e53] font-bold bg-[#e6ecd5] hover:bg-[#c3cda7]/60 px-3.5 py-1.5 rounded-[100px] border border-[#c3cda7] transition shrink-0"
        >
          View All Requests
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[640px]">
          <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
            <tr>
              <th className="py-3 px-5">Request ID</th>
              <th className="py-3 px-4">Buyer</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4 text-right">Quantity</th>
              <th className="py-3 px-4">Delivery Date</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
            {displayRequests.map((req) => {
              const itemsList = req.items || [
                { crop: req.crop || 'Produce', quantity: req.quantity || '1,000 kg' }
              ]
              const itemsTitle = itemsList.map((i) => i.crop).join(', ')
              const totalVol = itemsList.reduce((acc, curr) => {
                const num = parseInt(String(curr.quantity || '0').replace(/[^0-9]/g, '')) || 0
                return acc + num
              }, 0)

              return (
                <tr key={req.id} className="hover:bg-[#faf9f0] transition">
                  <td className="py-3.5 px-5 font-mono font-bold text-[#1b6e53] whitespace-nowrap">
                    {req.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-[#212529]">{req.buyer || 'AgroFresh Enterprise'}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#353535] max-w-[160px] truncate">
                    {itemsTitle}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-[#1b6e53] font-mono whitespace-nowrap">
                    {totalVol > 0 ? `${totalVol.toLocaleString()} kg` : req.quantity || '1,000 kg'}
                  </td>
                  <td className="py-3.5 px-4 text-[#683600] font-mono font-semibold whitespace-nowrap text-[11px]">
                    {req.deliveryDate || req.neededBy || '—'}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(req)}`}>
                      {getStatusLabel(req)}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right whitespace-nowrap">
                    <Link
                      to={`/fpo/requests/${req.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[100px] bg-[#1b6e53] text-[#ffffff] text-[11px] font-bold hover:bg-[#00372a] transition cursor-pointer"
                    >
                      Review
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

// ─── 3. ACTIVE ORDER / FULFILLMENT OVERVIEW ───────────────────────────────────
function ActiveOrderOverview() {
  const hubState = getStoredHubOperations()
  const order = hubState.activeOrder || {}

  const orderId = order.orderId || 'ORD-1031'
  const buyer = order.buyer || 'AgroFresh Enterprise'
  const crop = order.crop || 'Tomato'
  const hubAllocated = order.hubAllocatedQty || 700
  const farmerLots = hubState.farmerLots || []
  const collected = Math.round(farmerLots.reduce((s, l) => s + (l.actualCollectedQty || 0), 0))
  const accepted = Math.round(farmerLots.reduce((s, l) => s + (l.acceptedQty || 0), 0))

  const collectedPct = Math.round((collected / hubAllocated) * 100)
  const acceptedPct = Math.round((accepted / hubAllocated) * 100)

  const stages = [
    { label: 'Hub Allocation', done: true },
    { label: 'Farmer Allocation', done: true },
    { label: 'Collection', done: false, pct: collectedPct },
    { label: 'Quality Check', done: false, pct: acceptedPct },
    { label: 'Aggregation', done: false, pct: acceptedPct > 0 ? Math.round(acceptedPct * 0.9) : 0 },
    { label: 'Dispatch', done: false, pending: true },
  ]

  return (
    <section className="rounded-[22px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
      <div className="px-6 py-4 border-b border-[#c3cda7]/50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#e8fe85] text-[#1b6e53] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">alt_route</span>
          </div>
          <div>
            <h2 className="font-editorial text-xl font-bold text-[#00372a] tracking-tight leading-none">
              Active Order — Fulfillment Overview
            </h2>
            <p className="text-[11px] text-[#6d6d6d] mt-0.5 font-mono">
              {orderId} • Collection in progress
            </p>
          </div>
        </div>
        <Link
          to="/fpo/orders"
          className="inline-flex items-center gap-1 text-xs text-[#1b6e53] font-bold bg-[#e6ecd5] hover:bg-[#c3cda7]/60 px-3.5 py-1.5 rounded-[100px] border border-[#c3cda7] transition shrink-0"
        >
          View Order
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </Link>
      </div>

      <div className="p-6">
        {/* Order Info */}
        <div className="flex flex-wrap items-start gap-x-6 gap-y-3 mb-5 pb-4 border-b border-[#c3cda7]/40">
          {[
            { label: 'Order', val: orderId, color: 'text-[#1b6e53] font-mono font-bold' },
            { label: 'Buyer', val: buyer, color: 'text-[#212529] font-semibold' },
            { label: 'Produce', val: crop, color: 'text-[#212529] font-semibold' },
            { label: 'Qty Required', val: `${hubAllocated} kg`, color: 'text-[#1b6e53] font-bold font-mono' },
            { label: 'Delivery', val: order.deliveryDate || '29 Sep 2026', color: 'text-[#683600] font-semibold font-mono' },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider mb-0.5">{item.label}</div>
              <div className={`text-sm ${item.color}`}>{item.val}</div>
            </div>
          ))}
        </div>

        {/* Fulfillment Stages */}
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#6d6d6d] mb-3">Fulfillment Progress</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stages.map((stage) => (
            <div key={stage.label} className="flex flex-col gap-1.5">
              <div className="text-[11px] font-semibold text-[#353535]">{stage.label}</div>
              {stage.done ? (
                <div className="flex items-center gap-1 text-[#1b6e53] text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Done
                </div>
              ) : stage.pending ? (
                <div className="text-[#6d6d6d] text-xs font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">schedule</span>
                  Pending
                </div>
              ) : (
                <div>
                  <div className="h-1.5 bg-[#e6ecd5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1b6e53] rounded-full"
                      style={{ width: `${stage.pct || 0}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-[#6d6d6d] font-mono mt-0.5">{stage.pct || 0}%</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 4. FULFILLMENT NETWORK ───────────────────────────────────────────────────
function FulfillmentNetwork() {
  const hubState = getStoredHubOperations()
  const order = hubState.activeOrder || {}
  const farmerLots = hubState.farmerLots || []

  const hubName = order.hubName || 'Rajahmundry Central Hub'
  const required = order.hubAllocatedQty || 700
  const collected = Math.round(farmerLots.reduce((s, l) => s + (l.actualCollectedQty || 0), 0))
  const accepted = Math.round(farmerLots.reduce((s, l) => s + (l.acceptedQty || 0), 0))
  const farmerCount = farmerLots.length || 4
  const collectedPct = Math.round((collected / required) * 100)

  return (
    <section className="rounded-[22px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
      <div className="px-6 py-4 border-b border-[#c3cda7]/50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">hub</span>
          </div>
          <div>
            <h2 className="font-editorial text-xl font-bold text-[#00372a] tracking-tight leading-none">
              Fulfillment Network
            </h2>
            <p className="text-[11px] text-[#6d6d6d] mt-0.5 font-mono">{hubName}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1b6e53] bg-[#e6ecd5] px-3 py-1.5 rounded-[100px] border border-[#c3cda7] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53] animate-pulse"></span>
          Collection in Progress
        </span>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-5">
          {[
            { label: 'Required', value: `${required} kg`, color: 'text-[#212529]', icon: 'inventory_2' },
            { label: 'Allocated to Farmers', value: `${required} kg`, color: 'text-[#1b6e53]', icon: 'groups' },
            { label: 'Collected', value: `${collected} kg`, color: 'text-[#212529]', icon: 'scale' },
            { label: 'Accepted (QC)', value: `${accepted} kg`, color: 'text-[#1b6e53]', icon: 'verified' },
            { label: 'Farmers Active', value: `${farmerCount}`, color: 'text-[#212529]', icon: 'group' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#f1efdf] rounded-[16px] border border-[#c3cda7]/70 p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="material-symbols-outlined text-[15px] text-[#6d6d6d]">{stat.icon}</span>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#6d6d6d]">{stat.label}</div>
              </div>
              <div className={`font-editorial text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Collection Progress Bar */}
        <div className="border-t border-[#c3cda7]/40 pt-4">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#6d6d6d] mb-1.5">
            <span>Collection Progress</span>
            <span className="font-bold text-[#1b6e53]">{collectedPct}%</span>
          </div>
          <div className="h-2 bg-[#e6ecd5] rounded-full overflow-hidden">
            <div className="h-full bg-[#1b6e53] rounded-full" style={{ width: `${collectedPct}%` }} />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#6d6d6d] mt-1">
            <span>{collected} kg collected of {required} kg required</span>
            <Link to="/fpo/collection" className="text-[#1b6e53] font-bold hover:underline">
              View Collection →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 5. RECENT SETTLEMENTS ────────────────────────────────────────────────────
function RecentSettlements() {
  const hubState = getStoredHubOperations()
  const activeOrder = hubState.activeOrder || {}
  const settlement = hubState.settlementRecords?.[activeOrder.orderId] || null

  const records = [
    {
      orderId: activeOrder.orderId || 'ORD-1031',
      buyer: activeOrder.buyer || 'AgroFresh Enterprise',
      farmerSettlement: settlement?.farmerSettlementTotal || 17500,
      transportCost: settlement?.transportationCost || 1500,
      status: settlement?.settlementStatus || 'Calculated',
    },
    {
      orderId: 'ORD-1029',
      buyer: 'Reliance Retail Fresh',
      farmerSettlement: 17100,
      transportCost: 1200,
      status: 'Settlement Recorded',
    },
    {
      orderId: 'ORD-1028',
      buyer: 'BigBasket Fulfillment',
      farmerSettlement: 14400,
      transportCost: 1600,
      status: 'Settlement Recorded',
    },
  ]

  const getStatusStyle = (status) => {
    if (['Settlement Recorded', 'Disbursed', 'Completed'].includes(status))
      return 'bg-[#1b6e53] text-[#ffffff]'
    if (['Calculated', 'Ready', 'Recorded'].includes(status))
      return 'bg-[#e8fe85] text-[#1b6e53]'
    return 'bg-[#fceace] text-[#683600]'
  }

  return (
    <section className="rounded-[22px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
      <div className="px-6 py-4 border-b border-[#c3cda7]/50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">payments</span>
          </div>
          <div>
            <h2 className="font-editorial text-xl font-bold text-[#00372a] tracking-tight leading-none">
              Recent Settlements
            </h2>
            <p className="text-[11px] text-[#6d6d6d] mt-0.5 font-mono">Farmer payouts &amp; transport records</p>
          </div>
        </div>
        <Link
          to="/fpo/settlements"
          className="inline-flex items-center gap-1 text-xs text-[#1b6e53] font-bold bg-[#e6ecd5] hover:bg-[#c3cda7]/60 px-3.5 py-1.5 rounded-[100px] border border-[#c3cda7] transition shrink-0"
        >
          View Settlements
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[560px]">
          <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
            <tr>
              <th className="py-3 px-5">Order</th>
              <th className="py-3 px-4">Buyer</th>
              <th className="py-3 px-4 text-right">Farmer Settlement</th>
              <th className="py-3 px-4 text-right">Transport Cost</th>
              <th className="py-3 px-5 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
            {records.map((rec) => (
              <tr key={rec.orderId} className="hover:bg-[#faf9f0] transition font-mono">
                <td className="py-3.5 px-5 font-bold text-[#1b6e53] whitespace-nowrap">{rec.orderId}</td>
                <td className="py-3.5 px-4 font-sans font-semibold text-[#212529]">{rec.buyer}</td>
                <td className="py-3.5 px-4 text-right font-extrabold text-[#1b6e53] whitespace-nowrap">
                  ₹{rec.farmerSettlement.toLocaleString('en-IN')}
                </td>
                <td className="py-3.5 px-4 text-right text-[#683600] font-semibold whitespace-nowrap">
                  ₹{rec.transportCost.toLocaleString('en-IN')}
                </td>
                <td className="py-3.5 px-5 text-center whitespace-nowrap">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(rec.status)}`}>
                    {rec.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function FPODashboard() {
  return (
    <div className="space-y-6">
      {/* 1. KPI Cards */}
      <KPICards />

      {/* 2. Incoming Procurement Requests */}
      <IncomingRequests />

      {/* 3. Active Order / Fulfillment Overview */}
      <ActiveOrderOverview />

      {/* 4. Fulfillment Network */}
      <FulfillmentNetwork />

      {/* 5. Recent Settlements */}
      <RecentSettlements />
    </div>
  )
}
