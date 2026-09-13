import React from 'react'

export default function StatCard({ title, value, change, trend = 'neutral', icon, className = '' }) {
  const trendColors = {
    up: 'text-emerald-600 bg-emerald-50',
    down: 'text-rose-600 bg-rose-50',
    neutral: 'text-slate-600 bg-slate-50'
  }

  return (
    <div className={`bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-800 mt-2">{value}</p>
        </div>
        {icon && (
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      {change && (
        <div className="mt-4 flex items-center gap-1.5 text-xs">
          <span className={`px-2 py-0.5 rounded-full font-medium ${trendColors[trend] || trendColors.neutral}`}>
            {change}
          </span>
        </div>
      )}
    </div>
  )
}
