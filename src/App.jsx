import { Routes, Route, Navigate } from 'react-router'
import ScrollToTop from './components/ScrollToTop'

// Layouts
import FPOLayout from './layouts/FPOLayout'
import BuyerLayout from './layouts/BuyerLayout'
import HubLayout from './layouts/HubLayout'

// Home Page
import Home from './pages/Home'

// Auth Pages
import FPOLogin from './pages/fpo/Login'
import FPORegister from './pages/fpo/Register'
import BuyerLogin from './pages/buyer/Login'
import BuyerRegister from './pages/buyer/Register'
import HubLogin from './pages/hub/Login'
import HubSetup from './pages/hub/Setup'
import ForgotPassword from './pages/auth/ForgotPassword'
import VerificationSuccess from './pages/auth/Verification'

// FPO Pages
import FPODashboard from './pages/fpo/Dashboard'
import Farmers from './pages/fpo/Farmers'
import Buyers from './pages/fpo/Buyers'
import Demand from './pages/fpo/Demand'
import FPORequests from './pages/fpo/Requests'
import FPORequestDetail from './pages/fpo/RequestDetail'
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
import Products from './pages/buyer/Products'
import ProductResults from './pages/buyer/ProductResults'
import FPOSearch from './pages/buyer/FPOSearch'
import FPODetail from './pages/buyer/FPODetail'
import Demands from './pages/buyer/Demands'
import CreateDemand from './pages/buyer/CreateDemand'
import RequestDetail from './pages/buyer/RequestDetail'
import Orders from './pages/buyer/Orders'

// Hub Pages
import HubDashboard from './pages/hub/Dashboard'
import HubCollection from './pages/hub/Collection'
import HubWeighing from './pages/hub/Weighing'
import HubQuality from './pages/hub/Quality'
import HubDelivery from './pages/hub/Delivery'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* Landing / Portal Selector */}
      <Route path="/" element={<Home />} />

      {/* Standalone Phase 2 Auth Routes */}
      <Route path="/fpo/login" element={<FPOLogin />} />
      <Route path="/fpo/register" element={<FPORegister />} />
      <Route path="/buyer/login" element={<BuyerLogin />} />
      <Route path="/buyer/register" element={<BuyerRegister />} />
      <Route path="/hub/login" element={<HubLogin />} />
      <Route path="/hub/setup" element={<HubSetup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verification" element={<VerificationSuccess />} />

      {/* FPO Portal Routes */}
      <Route path="/fpo" element={<FPOLayout />}>
        <Route index element={<Navigate to="/fpo/dashboard" replace />} />
        <Route path="setup" element={<Navigate to="/fpo/dashboard" replace />} />
        <Route path="dashboard" element={<FPODashboard />} />
        <Route path="farmers" element={<Farmers />} />
        <Route path="buyers" element={<Buyers />} />
        <Route path="requests" element={<FPORequests />} />
        <Route path="requests/:id" element={<FPORequestDetail />} />
        <Route path="demand" element={<FPORequests />} />
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
        <Route path="products" element={<Products />} />
        <Route path="products/results" element={<ProductResults />} />
        <Route path="fpos" element={<FPOSearch />} />
        <Route path="fpos/:id" element={<FPODetail />} />
        <Route path="demands" element={<Demands />} />
        <Route path="demands/new" element={<CreateDemand />} />
        <Route path="demands/:id" element={<RequestDetail />} />
        <Route path="requests/:id" element={<RequestDetail />} />
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
    </>
  )
}

export default App