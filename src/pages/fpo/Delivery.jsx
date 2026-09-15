import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { getStoredHubOperations } from '../../data/hubOperationsData'
import { getStoredFpoOrders } from '../../data/fpoDashboardData'

export default function Delivery() {
  const [hubState, setHubState] = useState(getStoredHubOperations())
  const [fpoOrders, setFpoOrders] = useState(getStoredFpoOrders())

  useEffect(() => {
    const handleSync = () => {
      setHubState(getStoredHubOperations())
      setFpoOrders(getStoredFpoOrders())
    }
    window.addEventListener('storage', handleSync)
    return () => window.removeEventListener('storage', handleSync)
  }, [])

  const activeOrder = hubState.activeOrder || {}
  const isStep6Active = [
    'Dispatched',
    'In Transit',
    'Delivered',
    'Buyer Verified',
    'Payment Confirmed',
    'Completed',
    'Delivery Issue'
  ].includes(activeOrder.status)

  const shipments = [
    {
      orderId: activeOrder.orderId || 'ORD-1031',
      buyer: activeOrder.buyer || 'AgroFresh Enterprise',
      destination: activeOrder.deliveryLocation || 'Vijayawada Processing Hub',
      hub: activeOrder.hubName || 'Rajahmundry Central Hub',
      crop: activeOrder.crop || 'Tomato',
      quantity: `${activeOrder.deliveredQty || activeOrder.acceptedQty || 700} kg`,
      vehicle: activeOrder.dispatchDetails?.vehicleNumber || 'AP-39-TX-8821',
      driver: activeOrder.dispatchDetails?.driverName || 'Ramesh Kumar (Ph: +91 98480 22334)',
      status: activeOrder.status || 'Dispatched',
      dispatchTime: activeOrder.dispatchDetails?.dispatchedAt || 'Today, 09:30 AM',
      isPrimary: true
    },
    {
      orderId: 'ORD-1029',
      buyer: 'Reliance Retail Fresh',
      destination: 'Guntur Cold Chain DC',
      hub: 'Rajahmundry Central Hub',
      crop: 'Green Chilli (Grade A)',
      quantity: '450 kg',
      vehicle: 'AP-16-TJ-4102',
      driver: 'K. Venkatesh (Ph: +91 94401 55678)',
      status: 'Completed',
      dispatchTime: 'Yesterday, 07:00 AM',
      isPrimary: false
    },
    {
      orderId: 'ORD-1028',
      buyer: 'BigBasket Fulfillment',
      destination: 'Hyderabad Hub North',
      hub: 'Kakinada Hub',
      crop: 'Brinjal (Grade A)',
      quantity: '800 kg',
      vehicle: 'TS-08-UB-9901',
      driver: 'S. Nagesh (Ph: +91 98852 11223)',
      status: 'Completed',
      dispatchTime: '2 days ago',
      isPrimary: false
    }
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Dispatched':
        return 'bg-[#b2cee7] text-[#00372a] border-[#00372a]/30'
      case 'In Transit':
        return 'bg-[#fceace] text-[#683600] border-[#683600]/40'
      case 'Delivered':
      case 'Buyer Verified':
        return 'bg-[#e8fe85] text-[#1b6e53] border-[#1b6e53]'
      case 'Payment Confirmed':
      case 'Completed':
        return 'bg-[#1b6e53] text-[#ffffff] border-[#1b6e53]'
      case 'Delivery Issue':
        return 'bg-rose-100 text-rose-800 border-rose-300'
      default:
        return 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]'
    }
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-block mb-1.5">
            STEP 6 // FPO LOGISTICS MONITOR
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Delivery &amp; <span className="italic font-normal">Dispatch Logistics</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Real-time outbound freight monitoring, transit milestones, proof-of-delivery receipts, and buyer verification feed.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#1b6e53] bg-[#ffffff] px-4 py-2 rounded-[100px] border border-[#c3cda7] shadow-2xs">
            {shipments.length} Active Shipments Tracked
          </span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Active Shipments</div>
          <div className="font-editorial text-3xl font-bold text-[#00372a] mt-1">
            {isStep6Active && activeOrder.status !== 'Completed' ? '1 In Motion' : '0 Pending'}
          </div>
          <div className="text-[11px] font-mono text-[#1b6e53] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">local_shipping</span>
            <span>Live route updates active</span>
          </div>
        </div>

        <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Delivered This Cycle</div>
          <div className="font-editorial text-3xl font-bold text-[#00372a] mt-1">1,950 kg</div>
          <div className="text-[11px] font-mono text-[#1b6e53] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            <span>100% On-Time Delivery</span>
          </div>
        </div>

        <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[20px] p-5 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Avg Transit Duration</div>
          <div className="font-editorial text-3xl font-bold text-[#683600] mt-1">3.5 Hours</div>
          <div className="text-[11px] font-mono text-[#6d6d6d] mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            <span>Rajahmundry → Vijayawada corridor</span>
          </div>
        </div>
      </div>

      {/* Role Notice */}
      <div className="p-4 rounded-[18px] bg-[#f1efdf] border border-[#c3cda7] text-xs font-mono text-[#353535] flex items-center gap-2.5">
        <span className="material-symbols-outlined text-[20px] text-[#1b6e53]">info</span>
        <span>
          <strong>FPO Observer Access:</strong> Logistics telemetry is synchronized with Hub Dispatch and Buyer Verification. Buyer confirmation triggers automatic escrow settlement calculations.
        </span>
      </div>

      {/* Logistics Movements Table */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="material-symbols-outlined text-[20px]">route</span>
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                Dispatched Freight &amp; In-Transit Consignments
              </h3>
              <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                Outbound logistics from aggregation hubs to buyer fulfillment centers.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-3">Buyer &amp; Route</th>
                <th className="py-3 px-3">Produce &amp; Volume</th>
                <th className="py-3 px-3">Vehicle / Driver</th>
                <th className="py-3 px-3">Dispatched At</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              {shipments.map((shipment) => (
                <tr key={shipment.orderId} className="hover:bg-[#faf9f0] transition">
                  <td className="py-4 px-4 font-mono font-bold text-[#1b6e53] whitespace-nowrap">
                    {shipment.orderId}
                  </td>
                  <td className="py-4 px-3">
                    <div className="font-bold text-[#00372a] font-editorial text-base leading-tight">
                      {shipment.buyer}
                    </div>
                    <div className="text-[10px] font-mono text-[#6d6d6d]">
                      {shipment.hub} → {shipment.destination}
                    </div>
                  </td>
                  <td className="py-4 px-3 font-mono">
                    <div className="font-bold text-[#00372a]">{shipment.crop}</div>
                    <div className="text-[11px] text-[#1b6e53] font-extrabold">{shipment.quantity}</div>
                  </td>
                  <td className="py-4 px-3 font-mono text-[11px]">
                    <div className="font-bold text-[#353535]">{shipment.vehicle}</div>
                    <div className="text-[#6d6d6d] text-[10px]">{shipment.driver}</div>
                  </td>
                  <td className="py-4 px-3 font-mono text-[11px] text-[#6d6d6d] whitespace-nowrap">
                    {shipment.dispatchTime}
                  </td>
                  <td className="py-4 px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-3 py-1 rounded-[100px] text-[10px] font-mono font-bold uppercase tracking-wider border ${getStatusBadge(
                        shipment.status
                      )}`}
                    >
                      {shipment.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <Link
                      to={`/fpo/orders/${shipment.orderId}/tracking`}
                      className="py-1.5 px-4 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1.5 font-mono cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">my_location</span>
                      <span>Track Shipment</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
