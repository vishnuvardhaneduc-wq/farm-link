import React from 'react'
import { Navigate, useLocation, Outlet } from 'react-router'
import { useAuth } from '../../hooks'

export default function ProtectedRoute({ children, redirectTo = '/fpo/login' }) {
  const { session, user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f1efdf] flex flex-col items-center justify-center font-sans text-[#1b6e53]">
        <div className="w-10 h-10 border-3 border-[#1b6e53] border-t-transparent rounded-full animate-spin mb-3"></div>
        <span className="text-xs font-mono font-medium tracking-wider uppercase text-[#00372a]">
          Verifying Session...
        </span>
      </div>
    )
  }

  if (!session || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return children ? children : <Outlet />
}
