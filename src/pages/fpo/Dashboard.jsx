import React from 'react'
import HeroAnnouncement from '../../components/fpo/HeroAnnouncement'
import KPIGrid from '../../components/fpo/KPIGrid'
import SupplyNetworkSection from '../../components/fpo/SupplyNetworkSection'
import ProcurementRequestsSection from '../../components/fpo/ProcurementRequestsSection'
import MatchingEngineSection from '../../components/fpo/MatchingEngineSection'
import HubNetworkSection from '../../components/fpo/HubNetworkSection'
import ColdChainSection from '../../components/fpo/ColdChainSection'
import DashboardTables from '../../components/fpo/DashboardTables'
import BottomTriad from '../../components/fpo/BottomTriad'
import { fpoDashboardData } from '../../data/fpoDashboardData'

export default function FPODashboard() {
  const {
    hubInfo,
    announcement,
    kpiCards,
    supplyNetworkWorkflow,
    incomingProcurementRequests,
    fulfillmentHubPlan,
    hubNetwork,
    hubLogistics,
    buyerOrders,
    farmerActivity,
    priceTransparency,
    priorityAlerts,
    weeklyAnalytics,
    produceShare,
  } = fpoDashboardData

  return (
    <div className="space-y-8">
      {/* 1. Editorial Principle Announcement Banner */}
      <HeroAnnouncement announcement={announcement} />

      {/* 2. KPI Cards (Open Procurement Requests, Fulfillment Planned, Active Farmers, Active Buyers, Today's Supply, Pending Deliveries, Farmer Settlements, Reserve Fund) */}
      <KPIGrid kpiCards={kpiCards} syncTime={hubInfo.syncTime} />

      {/* 3. Supply Network Workflow (Procurement Requests → FPO Offers → Orders → Hub Allocation → Farmer Allocation → Collection → Delivery → Settlement) */}
      <SupplyNetworkSection workflow={supplyNetworkWorkflow} />

      {/* 4. Incoming Procurement Requests (Hotel Krishna, Apex Supermart, etc. with [Review Request]) */}
      <ProcurementRequestsSection requests={incomingProcurementRequests} />

      {/* 5. Fulfillment Hub Plan (Single-hub-first allocation with minimum hub network selection) */}
      <MatchingEngineSection fulfillmentHubPlan={fulfillmentHubPlan} />

      {/* 6. Hub Network (Hub A, Hub B, Hub C capacity, farmers, usage & status) */}
      <HubNetworkSection hubNetwork={hubNetwork} />

      {/* 7. Hub & Logistics (Active Hubs, Collection Capacity, Today's Dispatches, Active Vehicles) */}
      <ColdChainSection hubLogistics={hubLogistics} />

      {/* 8. Active Orders & Farmer Activity Data Tables */}
      <DashboardTables buyerOrders={buyerOrders} farmerActivity={farmerActivity} />

      {/* 9. Bottom Triad: Price Transparency, Priority Alerts, Demand vs Supply 7-Day Chart */}
      <BottomTriad
        priceTransparency={priceTransparency}
        priorityAlerts={priorityAlerts}
        weeklyAnalytics={weeklyAnalytics}
        produceShare={produceShare}
      />
    </div>
  )
}
