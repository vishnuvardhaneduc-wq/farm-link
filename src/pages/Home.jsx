import React from 'react'
import { Link } from 'react-router'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export default function Home() {
  const portals = [
    {
      title: 'FPO Management Portal',
      description: 'Manage farmer registration, crop aggregation, demand-supply matching, and settlements.',
      to: '/fpo/dashboard',
      badge: 'FPO Admin',
      color: 'border-emerald-200 hover:border-emerald-500',
      icon: '🌾',
      btnVariant: 'primary'
    },
    {
      title: 'Buyer Procurement Portal',
      description: 'Create forward crop demands, monitor fulfillment status, and manage verified contracts.',
      to: '/buyer/dashboard',
      badge: 'Institutional Buyer',
      color: 'border-blue-200 hover:border-blue-500',
      icon: '🏢',
      btnVariant: 'dark'
    },
    {
      title: 'Hub Operations Portal',
      description: 'Execute farm gate intake, precision weighing, QA batch sampling, and dispatch logistics.',
      to: '/hub/dashboard',
      badge: 'Hub Operator',
      color: 'border-amber-200 hover:border-amber-500',
      icon: '⚖️',
      btnVariant: 'secondary'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6">
            ✨ FarmLink Enterprise Architecture v2.0
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Demand-Driven Agricultural Supply Chain Platform
          </h1>
          <p className="mt-4 text-lg text-slate-400 leading-relaxed">
            Scalable frontend workspace connecting Farmer Producer Organizations, Institutional Buyers, and Field Aggregation Hubs.
          </p>
        </div>

        {/* Portal Selectors */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {portals.map((portal) => (
            <div
              key={portal.to}
              className={`rounded-2xl bg-slate-800/80 border p-6 flex flex-col justify-between transition-all hover:shadow-xl ${portal.color}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{portal.icon}</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-700 text-slate-300">
                    {portal.badge}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-bold text-white">{portal.title}</h2>
                <p className="mt-2 text-sm text-slate-400">{portal.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/60">
                <Link to={portal.to} className="block w-full">
                  <Button variant={portal.btnVariant} className="w-full">
                    Launch Portal →
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        FarmLink Modular Frontend Architecture • React 19 • Tailwind CSS • React Router
      </footer>
    </div>
  )
}
