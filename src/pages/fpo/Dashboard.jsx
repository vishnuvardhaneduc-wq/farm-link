import React from 'react'
import HeroAnnouncement from '../../components/fpo/HeroAnnouncement'
import KPIGrid from '../../components/fpo/KPIGrid'
import MatchingEngineSection from '../../components/fpo/MatchingEngineSection'
import ColdChainSection from '../../components/fpo/ColdChainSection'
import DashboardTables from '../../components/fpo/DashboardTables'
import BottomTriad from '../../components/fpo/BottomTriad'
import { fpoDashboardData } from '../../data/fpoDashboardData'

export default function FPODashboard() {
  const {
    hubInfo,
    announcement,
    kpiCards,
    matchingEngine,
    dispatchHub,
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

      {/* 2. Quilted Pastel KPI Cards (Sky, Peach, Sage, White) */}
      <KPIGrid kpiCards={kpiCards} syncTime={hubInfo.syncTime} />

      {/* 3. Main Supply Network Workflow: Matching Engine */}
      <MatchingEngineSection matchingEngine={matchingEngine} />

      {/* 4. Logistics & Cold-Chain Telemetry Card */}
      <ColdChainSection dispatchHub={dispatchHub} />

      {/* 5. Two Data Tables: Buyer Allocation & Farmer Activity */}
      <DashboardTables buyerOrders={buyerOrders} farmerActivity={farmerActivity} />

      {/* 6. Bottom Triad: Price Transparency, Action Alerts, Analytics Preview */}
      <BottomTriad
        priceTransparency={priceTransparency}
        priorityAlerts={priorityAlerts}
        weeklyAnalytics={weeklyAnalytics}
        produceShare={produceShare}
      />
    </div>
  )
}
