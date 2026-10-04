import React from 'react'

export default function LogoutConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title = 'Confirm Sign Out',
  message = 'Do you want to log out of your session? You will need to sign in again to access the workspace.',
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#ffffff] rounded-[24px] border border-[#c3cda7] shadow-2xl p-6 sm:p-7 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#ba1a1a]/10 text-[#ba1a1a] flex items-center justify-center shrink-0 border border-[#ba1a1a]/20">
            <span className="material-symbols-outlined text-[24px]">logout</span>
          </div>
          <div className="space-y-1">
            <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight">
              {title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#6d6d6d] leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#c3cda7]/40">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-[100px] border border-[#c3cda7] text-[#212529] hover:bg-[#f1efdf] transition text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-6 py-2.5 rounded-[100px] bg-[#ba1a1a] hover:bg-[#900000] text-[#ffffff] transition text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Signing Out...</span>
              </>
            ) : (
              <>
                <span>Yes, Log Out</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
