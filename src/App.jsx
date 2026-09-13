import { Routes, Route, Navigate } from 'react-router'

// Layouts
import FPOLayout from './layouts/FPOLayout'
import BuyerLayout from './layouts/BuyerLayout'
import HubLayout from './layouts/HubLayout'

// Home Page
import Home from './pages/Home'

// FPO Pages
import FPODashboard from './pages/fpo/Dashboard'
import Farmers from './pages/fpo/Farmers'
import Buyers from './pages/fpo/Buyers'
import Demand from './pages/fpo/Demand'
import Supply from './pages/fpo/Supply'
import Matching from './pages/fpo/Matching'
import Collection from './pages/fpo/Collection'
import Quality from './pages/fpo/Quality'
import Delivery from './pages/fpo/Delivery'
import Settlements from './pages/fpo/Settlements'
import ReserveFund from './pages/fpo/ReserveFund'
import Analytics from './pages/fpo/Analytics'

// Buyer Pages
import BuyerDashboard from './pages/buyer/Dashboard'
import Demands from './pages/buyer/Demands'
import CreateDemand from './pages/buyer/CreateDemand'
import Orders from './pages/buyer/Orders'

// Hub Pages
import HubDashboard from './pages/hub/Dashboard'
import HubCollection from './pages/hub/Collection'
import HubWeighing from './pages/hub/Weighing'
import HubQuality from './pages/hub/Quality'
import HubDelivery from './pages/hub/Delivery'

function App() {
  return (
    <Routes>
      {/* Landing / Portal Selector */}
      <Route path="/" element={<Home />} />

      {/* FPO Portal Routes */}
      <Route path="/fpo" element={<FPOLayout />}>
        <Route index element={<Navigate to="/fpo/dashboard" replace />} />
        <Route path="dashboard" element={<FPODashboard />} />
        <Route path="farmers" element={<Farmers />} />
        <Route path="buyers" element={<Buyers />} />
        <Route path="demand" element={<Demand />} />
        <Route path="supply" element={<Supply />} />
        <Route path="matching" element={<Matching />} />
        <Route path="collection" element={<Collection />} />
        <Route path="quality" element={<Quality />} />
        <Route path="delivery" element={<Delivery />} />
        <Route path="settlements" element={<Settlements />} />
        <Route path="reserve-fund" element={<ReserveFund />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      {/* Buyer Portal Routes */}
      <Route path="/buyer" element={<BuyerLayout />}>
        <Route index element={<Navigate to="/buyer/dashboard" replace />} />
        <Route path="dashboard" element={<BuyerDashboard />} />
        <Route path="demands" element={<Demands />} />
        <Route path="demands/new" element={<CreateDemand />} />
        <Route path="orders" element={<Orders />} />
      </Route>

      {/* Hub Operations Portal Routes */}
      <Route path="/hub" element={<HubLayout />}>
        <Route index element={<Navigate to="/hub/dashboard" replace />} />
        <Route path="dashboard" element={<HubDashboard />} />
        <Route path="collection" element={<HubCollection />} />
        <Route path="weighing" element={<HubWeighing />} />
        <Route path="quality" element={<HubQuality />} />
        <Route path="delivery" element={<HubDelivery />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App