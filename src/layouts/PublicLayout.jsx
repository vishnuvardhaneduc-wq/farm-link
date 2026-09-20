import React from 'react'
import { Link, NavLink, Outlet } from 'react-router'

export default function PublicLayout() {
  const tickerItems = [
    '🌾 National Agritech Network',
    'Zero Smartphone Dependency for Smallholders',
    'Transparent APMC & eNAM Integration',
    'Live UPI T+0 Escrow Clearing Active',
    'CV Quality Assay Certified',
    'Verified FPO Federation Grid',
  ]

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/why-farmlink', label: 'Why FarmLink' },
    { to: '/for-buyers', label: 'For Buyers' },
    { to: '/for-fpos', label: 'For FPOs' },
    { to: '/for-hubs', label: 'For Hubs' },
    { to: '/contact', label: 'About & Contact' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#f1efdf] text-[#212529] font-sans antialiased selection:bg-[#e8fe85] selection:text-[#1b6e53]">
      {/* 1. Top Ticker Marquee Strip */}
      <div className="bg-[#e8fe85] text-[#1b6e53] text-xs font-semibold py-2 px-4 overflow-hidden border-b border-[#1b6e53]/15">
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="inline-flex items-center space-x-6 text-[12px] tracking-wide animate-pulse">
            {tickerItems.concat(tickerItems).map((item, idx) => (
              <React.Fragment key={idx}>
                <span>{item}</span>
                <span className="text-[#1b6e53]/40">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Top Navigation Header with KrishiSetu Logo */}
      <header className="bg-[#1b6e53] text-white sticky top-0 z-50 px-6 sm:px-10 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#e8fe85] flex items-center justify-center text-[#1b6e53] transition-transform group-hover:scale-105 duration-200 shadow-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3 21h18L12 2zm0 4.5l5.5 11.5h-11L12 6.5z"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-editorial text-2xl font-bold tracking-tight text-white leading-none">
                  KrishiSetu
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full bg-white/15 text-[9px] font-semibold text-[#e8fe85] uppercase tracking-wider">
                  OS v4.2
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-[#e8fe85] font-medium uppercase mt-0.5 font-mono">
                Federated Ag-Grid
              </span>
            </div>
          </Link>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-white/90">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `transition hover:text-[#e8fe85] ${isActive ? 'text-[#e8fe85] font-bold border-b-2 border-[#e8fe85] pb-0.5' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Quick Login Portals Dropdown / Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/buyer/login"
              className="px-3 py-1.5 rounded-[100px] bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
            >
              Buyer Portal
            </Link>
            <Link
              to="/fpo/login"
              className="px-3 py-1.5 rounded-[100px] bg-[#e8fe85] hover:bg-[#d8ee75] text-[#1b6e53] text-xs font-bold transition shadow-xs"
            >
              FPO Login
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Main Outlet */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* 4. Minimal Footer */}
      <footer className="bg-[#1b6e53] text-white pt-12 pb-8 px-6 sm:px-10 border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/10">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#e8fe85] flex items-center justify-center text-[#1b6e53] font-bold text-sm">
                  KS
                </div>
                <span className="font-editorial text-2xl font-bold tracking-tight text-white">
                  KrishiSetu
                </span>
              </div>
              <p className="text-xs text-[#e6ecd5]/80 max-w-md leading-relaxed">
                National agricultural procurement & physical aggregation network connecting institutional buyers, regional FPO federations, and village collection hubs with zero-leakage escrow clearing.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#e8fe85] font-mono mb-3">
                Navigation
              </h4>
              <ul className="space-y-2 text-xs text-[#e6ecd5]/90">
                <li><Link to="/how-it-works" className="hover:text-white transition">How It Works</Link></li>
                <li><Link to="/why-farmlink" className="hover:text-white transition">Why FarmLink</Link></li>
                <li><Link to="/for-buyers" className="hover:text-white transition">For Buyers</Link></li>
                <li><Link to="/for-fpos" className="hover:text-white transition">For FPOs</Link></li>
                <li><Link to="/for-hubs" className="hover:text-white transition">For Hubs</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact & Support</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#e8fe85] font-mono mb-3">
                Operational Gateways
              </h4>
              <ul className="space-y-2 text-xs text-[#e6ecd5]/90">
                <li><Link to="/fpo/login" className="hover:text-[#e8fe85] transition">FPO Federation Login</Link></li>
                <li><Link to="/buyer/login" className="hover:text-[#e8fe85] transition">Institutional Buyer Login</Link></li>
                <li><Link to="/hub/login" className="hover:text-[#e8fe85] transition">Village Hub Login</Link></li>
                <li><Link to="/fpo/register" className="hover:text-[#e8fe85] transition">Register FPO</Link></li>
                <li><Link to="/buyer/register" className="hover:text-[#e8fe85] transition">Register Enterprise Buyer</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60 font-mono">
            <p>© 2026 KrishiSetu Agritech Network. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Zero-Intermediary Guarantee</span>
              <span>•</span>
              <span>eNAM & Open Mandi Protocol</span>
              <span>•</span>
              <span>T+0 UPI Escrow</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
