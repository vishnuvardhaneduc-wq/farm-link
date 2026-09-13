import React from 'react'
import { Link, useSearchParams } from 'react-router'
import AuthHeader from '../../components/auth/AuthHeader'
import AuthFooter from '../../components/auth/AuthFooter'
import SuccessState from '../../components/auth/SuccessState'

export default function VerificationSuccess() {
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type') || 'buyer_created'
  const refId = searchParams.get('id') || 'BUY-00482'

  const stateMap = {
    buyer_created: {
      title: 'Buyer Account Created',
      description: 'Your commercial procurement account is verified. You can now post tenders, compare regional FPO supply, and manage orders.',
      idLabel: 'Buyer ID',
      idValue: refId,
      actionTo: '/buyer/dashboard',
      actionLabel: 'Continue to Buyer Dashboard',
      portalTitle: 'Buyer Enterprise Desk',
    },
    fpo_created: {
      title: 'FPO Account Created',
      description: 'Your Farmer Producer Organization account is ready. Continue to complete federation setup, add member cohorts, and connect physical aggregation hubs.',
      idLabel: 'FPO ID',
      idValue: refId || 'FPO-MH-8891',
      actionTo: '/fpo/dashboard',
      actionLabel: 'Continue to FPO Workspace',
      portalTitle: 'FPO Federation Desk',
    },
    hub_setup: {
      title: 'Hub Depot Setup Completed',
      description: 'Your village aggregation terminal is calibrated and ready. Intake queues, weighing scales, and quality assays are active.',
      idLabel: 'Hub Terminal ID',
      idValue: refId || 'HUB-NSK-01',
      actionTo: '/hub/dashboard',
      actionLabel: 'Continue to Hub Console',
      portalTitle: 'Hub Aggregation Operations',
    },
    password_reset: {
      title: 'Password Reset Request Sent',
      description: 'A cryptographic recovery instruction has been dispatched to your authorized email address. Follow the link within 15 minutes to reset your access token.',
      idLabel: 'Security Token',
      idValue: 'SEC-TKN-VERIFIED',
      actionTo: '/fpo/login',
      actionLabel: 'Return to Login',
      portalTitle: 'Security Verification',
    },
  }

  const current = stateMap[type] || stateMap.buyer_created

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f1efdf] font-sans text-[#212529] selection:bg-[#e8fe85] selection:text-[#1b6e53]">
      {/* 1. Top Navigation Bar */}
      <AuthHeader portalTitle={current.portalTitle} backTo="/" backLabel="Back to Launch Portal" />

      {/* 2. Main Verification Workspace */}
      <main className="w-full flex-1 flex items-center justify-center py-10 sm:py-16 px-4 sm:px-8">
        <div className="w-full max-w-2xl bg-[#ffffff] rounded-[24px] sm:rounded-[32px] border border-[#c3cda7] shadow-[0_12px_40px_-15px_rgba(7,80,63,0.08)] p-6 sm:p-10">
          <SuccessState
            title={current.title}
            description={current.description}
            idLabel={current.idLabel}
            idValue={current.idValue}
            actionTo={current.actionTo}
            actionLabel={current.actionLabel}
          />

          {/* Quick links to explore other test states */}
          <div className="mt-8 pt-6 border-t border-[#c3cda7]/50 text-center">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#6d6d6d] block mb-3">
              Switch Verification Preview State:
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                to="/verification?type=buyer_created&id=BUY-00482"
                className="px-3 py-1 rounded-full bg-[#f1efdf] border border-[#c3cda7] text-[11px] font-medium text-[#1b6e53] hover:bg-[#e6ecd5] transition"
              >
                Buyer Created
              </Link>
              <Link
                to="/verification?type=fpo_created&id=FPO-MH-8891"
                className="px-3 py-1 rounded-full bg-[#f1efdf] border border-[#c3cda7] text-[11px] font-medium text-[#1b6e53] hover:bg-[#e6ecd5] transition"
              >
                FPO Created
              </Link>
              <Link
                to="/verification?type=hub_setup&id=HUB-NSK-01"
                className="px-3 py-1 rounded-full bg-[#f1efdf] border border-[#c3cda7] text-[11px] font-medium text-[#1b6e53] hover:bg-[#e6ecd5] transition"
              >
                Hub Setup Completed
              </Link>
              <Link
                to="/verification?type=password_reset"
                className="px-3 py-1 rounded-full bg-[#f1efdf] border border-[#c3cda7] text-[11px] font-medium text-[#1b6e53] hover:bg-[#e6ecd5] transition"
              >
                Password Reset Sent
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Minimal Bottom Editorial Footer */}
      <AuthFooter tierLabel="FarmLink Verification & Settlement Protocol" />
    </div>
  )
}
