import React from 'react'

export default function StatusBadge({ status, variant, className = '' }) {
  const getVariant = (st) => {
    if (variant) return variant
    const s = String(st).toLowerCase()
    if (['verified', 'active', 'matched', 'fulfilled', 'completed', 'healthy', 'delivered'].some(k => s.includes(k))) return 'success'
    if (['pending', 'open', 'in progress', 'processing', 'in transit'].some(k => s.includes(k))) return 'warning'
    if (['failed', 'rejected', 'cancelled', 'urgent'].some(k => s.includes(k))) return 'danger'
    return 'default'
  }

  const currentVariant = getVariant(status)

  const styles = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    default: 'bg-slate-100 text-slate-700 border-slate-200'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[currentVariant] || styles.default} ${className}`}>
      {status}
    </span>
  )
}
