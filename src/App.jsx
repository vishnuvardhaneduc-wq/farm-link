import { Routes, Route, Navigate } from 'react-router'
import ScrollToTop from './components/ScrollToTop'

// Layouts
import PublicLayout from './layouts/PublicLayout'
import FPOLayout from './layouts/FPOLayout'
import BuyerLayout from './layouts/BuyerLayout'
import HubLayout from './layouts/HubLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Public Pages
import Home from './pages/Home'
import HowItWorks from './pages/public/HowItWorks'
import WhyFarmLink from './pages/public/WhyFarmLink'
import ForBuyers from './pages/public/ForBuyers'
import ForFPOs from './pages/public/ForFPOs'
import ForHubs from './pages/public/ForHubs'
import Contact from './pages/public/Contact'

// Auth Pages
import FPOLogin from './pages/fpo/Login'
import FPORegister from './pages/fpo/Register'
import BuyerLogin from './pages/buyer/Login'
import BuyerRegister from './pages/buyer/Register'
import HubLogin from './pages/hub/Login'
import HubSetup from './pages/hub/Setup'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/fpo/ResetPassword'
import BuyerResetPassword from './pages/buyer/ResetPassword'
import VerificationSuccess from './pages/auth/Verification'

// FPO Pages
import FPODashboard from './pages/fpo/Dashboard'
import FPOProducts from './pages/fpo/Products'
import FPOHubs from './pages/fpo/Hubs'
import Farmers from './pages/fpo/Farmers'
import Buyers from './pages/fpo/Buyers'
import FPORequests from './pages/fpo/Requests'
import FPORequestDetail from './pages/fpo/RequestDetail'
import Matching from './pages/fpo/Matching'
import Collection from './pages/fpo/Collection'
import Quality from './pages/fpo/Quality'
import Delivery from './pages/fpo/Delivery'
import Settlements from './pages/fpo/Settlements'
import SettlementDetail from './pages/fpo/SettlementDetail'
import OrderTracking from './pages/fpo/OrderTracking'
import Analytics from './pages/fpo/Analytics'
import FPOOrders from './pages/fpo/Orders'
import FulfillmentPlan from './pages/fpo/FulfillmentPlan'
import FPOSettings from './pages/fpo/Settings'

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
import BuyerOrderDetail from './pages/buyer/OrderDetail'
import BuyerPayments from './pages/buyer/Payments'
import BuyerSettings from './pages/buyer/Settings'

// Hub Pages
import HubDashboard from './pages/hub/Dashboard'
import HubCollection from './pages/hub/Collection'
import HubWeighing from './pages/hub/Weighing'
import HubQuality from './pages/hub/Quality'
import HubAggregation from './pages/hub/Aggregation'
import HubDispatch from './pages/hub/Dispatch'
import HubReceipts from './pages/hub/Receipts'
import HubFarmers from './pages/hub/Farmers'
import HubSettings from './pages/hub/Settings'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Pages with Layout */}
        <Route path="/" element={<Home />} />
        <Route element={<PublicLayout />}>
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/why-farmlink" element={<WhyFarmLink />} />
          <Route path="/for-buyers" element={<ForBuyers />} />
          <Route path="/for-fpos" element={<ForFPOs />} />
          <Route path="/for-hubs" element={<ForHubs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<Contact />} />
        </Route>

        {/* Standalone Phase 2 Auth Routes */}
        <Route path="/fpo/login" element={<FPOLogin />} />
        <Route path="/fpo/register" element={<FPORegister />} />
        <Route path="/fpo/reset-password" element={<ResetPassword />} />
        <Route path="/buyer/reset-password" element={<BuyerResetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/buyer/login" element={<BuyerLogin />} />
        <Route path="/buyer/register" element={<BuyerRegister />} />
        <Route path="/hub/login" element={<HubLogin />} />
        <Route path="/hub/setup" element={<HubSetup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verification" element={<VerificationSuccess />} />

        {/* FPO Portal Routes (Protected by Supabase Session) */}
        <Route
          path="/fpo"
          element={
            <ProtectedRoute redirectTo="/fpo/login">
              <FPOLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/fpo/dashboard" replace />} />
          <Route path="setup" element={<Navigate to="/fpo/dashboard" replace />} />
          <Route path="dashboard" element={<FPODashboard />} />
          <Route path="products" element={<FPOProducts />} />
          <Route path="hubs" element={<FPOHubs />} />
          <Route path="farmers" element={<Farmers />} />
          <Route path="buyers" element={<Buyers />} />
          <Route path="requests" element={<FPORequests />} />
          <Route path="requests/:id" element={<FPORequestDetail />} />
          <Route path="demand" element={<FPORequests />} />
          <Route path="matching" element={<Matching />} />
          <Route path="orders" element={<FPOOrders />} />
          <Route path="orders/:orderId" element={<OrderTracking />} />
          <Route path="orders/:orderId/tracking" element={<OrderTracking />} />
          <Route path="orders/:orderId/fulfillment" element={<FulfillmentPlan />} />
          <Route path="collection" element={<Collection />} />
          <Route path="quality" element={<Quality />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="delivery/:orderId" element={<OrderTracking />} />
          <Route path="settlements" element={<Settlements />} />
          <Route path="settlements/:orderId" element={<SettlementDetail />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<FPOSettings />} />
          <Route path="profile" element={<FPOSettings />} />
        </Route>

        {/* Buyer Portal Routes (Protected by Supabase Session) */}
        <Route
          path="/buyer"
          element={
            <ProtectedRoute redirectTo="/buyer/login">
              <BuyerLayout />
            </ProtectedRoute>
          }
        >
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
          <Route path="orders/:orderId" element={<BuyerOrderDetail />} />
          <Route path="payments" element={<BuyerPayments />} />
          <Route path="settlements" element={<BuyerPayments />} />
          <Route path="settings" element={<BuyerSettings />} />
        </Route>

        {/* Hub Operations Portal Routes */}
        <Route path="/hub" element={<HubLayout />}>
          <Route index element={<Navigate to="/hub/dashboard" replace />} />
          <Route path="dashboard" element={<HubDashboard />} />
          <Route path="collection" element={<HubCollection />} />
          <Route path="weighing" element={<HubWeighing />} />
          <Route path="quality" element={<HubQuality />} />
          <Route path="aggregation" element={<HubAggregation />} />
          <Route path="dispatch" element={<HubDispatch />} />
          <Route path="delivery" element={<HubDispatch />} />
          <Route path="receipts" element={<HubReceipts />} />
          <Route path="farmers" element={<HubFarmers />} />
          <Route path="settings" element={<HubSettings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App