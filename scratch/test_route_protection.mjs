import fs from 'fs';
import path from 'path';

console.log('========================================================');
console.log('ROUTE & AUTHENTICATION ARCHITECTURE AUDIT');
console.log('========================================================\n');

const appPath = 'c:/Users/paramatavishnu7/OneDrive/Desktop/grow/farmlink/src/App.jsx';
const appContent = fs.readFileSync(appPath, 'utf8');

// Check 1: ProtectedRoute in App.jsx
const hasFpoProtection = appContent.includes('<ProtectedRoute redirectTo="/fpo/login">');
const hasBuyerProtection = appContent.includes('<ProtectedRoute redirectTo="/buyer/login">');
const hasBuyerResetRoute = appContent.includes('path="/buyer/reset-password"');
const hasBuyerLoginRoute = appContent.includes('path="/buyer/login"');
const hasBuyerRegisterRoute = appContent.includes('path="/buyer/register"');

console.log('1. FPO Route Protection:', hasFpoProtection ? '✅ PASS' : '❌ FAIL');
console.log('2. Buyer Route Protection:', hasBuyerProtection ? '✅ PASS' : '❌ FAIL');
console.log('3. Buyer Reset Password Route:', hasBuyerResetRoute ? '✅ PASS' : '❌ FAIL');
console.log('4. Buyer Login Route:', hasBuyerLoginRoute ? '✅ PASS' : '❌ FAIL');
console.log('5. Buyer Register Route:', hasBuyerRegisterRoute ? '✅ PASS' : '❌ FAIL');

// Check 2: AuthContext checks
const authContextPath = 'c:/Users/paramatavishnu7/OneDrive/Desktop/grow/farmlink/src/context/AuthContext.jsx';
const authContextContent = fs.readFileSync(authContextPath, 'utf8');

const hasLoadFpo = authContextContent.includes('loadFpoProfile');
const hasLoadBuyer = authContextContent.includes('loadBuyerProfile');
const hasSessionInit = authContextContent.includes('supabase.auth.getSession()');
const hasAuthStateChange = authContextContent.includes('supabase.auth.onAuthStateChange');
const hasSignOut = authContextContent.includes('supabase.auth.signOut()');

console.log('\nAuthContext Architecture:');
console.log('6. loadFpoProfile present:', hasLoadFpo ? '✅ PASS' : '❌ FAIL');
console.log('7. loadBuyerProfile present:', hasLoadBuyer ? '✅ PASS' : '❌ FAIL');
console.log('8. getSession() session init:', hasSessionInit ? '✅ PASS' : '❌ FAIL');
console.log('9. onAuthStateChange() listener:', hasAuthStateChange ? '✅ PASS' : '❌ FAIL');
console.log('10. signOut() handler:', hasSignOut ? '✅ PASS' : '❌ FAIL');

// Check 3: Buyer Sidebar logout
const buyerSidebarPath = 'c:/Users/paramatavishnu7/OneDrive/Desktop/grow/farmlink/src/components/buyer/BuyerSidebar.jsx';
const buyerSidebarContent = fs.readFileSync(buyerSidebarPath, 'utf8');
const hasBuyerLogoutModal = buyerSidebarContent.includes('LogoutConfirmModal');
const hasBuyerSignOutCall = buyerSidebarContent.includes('signOut()');

console.log('\nBuyer Sidebar & Logout:');
console.log('11. Logout confirmation modal in BuyerSidebar:', hasBuyerLogoutModal ? '✅ PASS' : '❌ FAIL');
console.log('12. signOut() call on buyer logout:', hasBuyerSignOutCall ? '✅ PASS' : '❌ FAIL');

// Check 4: Forgot Password redirection
const forgotPasswordPath = 'c:/Users/paramatavishnu7/OneDrive/Desktop/grow/farmlink/src/pages/auth/ForgotPassword.jsx';
const forgotPasswordContent = fs.readFileSync(forgotPasswordPath, 'utf8');
const hasBuyerForgotRedirect = forgotPasswordContent.includes('/buyer/reset-password');

console.log('\nForgot Password Recovery:');
console.log('13. Buyer reset redirect to /buyer/reset-password:', hasBuyerForgotRedirect ? '✅ PASS' : '❌ FAIL');

console.log('\n========================================================');
console.log('ALL ARCHITECTURE CHECKS COMPLETED');
console.log('========================================================');
