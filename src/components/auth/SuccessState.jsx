import React from 'react'
import { Link } from 'react-router'

export default function SuccessState({
  title = 'Account Created',
  description = 'Your organization workspace is activated and ready for use.',
  idLabel = 'Reference ID',
  idValue = '',
  actionTo = '/',
  actionLabel = 'Continue to Workspace',
  secondaryAction = null,
}) {
  return (
    <div className="py-8 px-6 sm:px-8 bg-[#e6ecd5]/50 rounded-[24px] border border-[#c3cda7] text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center mx-auto shadow-sm">
        <span className="material-symbols-outlined text-[32px]">check_circle</span>
      </div>

      <div>
        <h3 className="font-editorial text-3xl text-[#00372a] font-normal tracking-tight mb-2">
          {title}
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#353535] max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {idValue && (
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#ffffff] border border-[#c3cda7] text-[#1b6e53] font-sans text-sm font-bold shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1b6e53] animate-pulse"></span>
          <span className="font-mono">{idLabel}: {idValue}</span>
        </div>
      )}

      <div className="pt-2">
        <Link
          to={actionTo}
          className="w-full sm:w-auto px-8 h-12 rounded-full bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] font-sans text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-[0.99]"
        >
          <span>{actionLabel}</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>

      {secondaryAction && (
        <div className="pt-1">
          {secondaryAction}
        </div>
      )}
    </div>
  )
}
