import React, { useState, useEffect, useRef } from 'react'

export default function FPOHeader({ hubInfo, onMenuClick }) {
  const [isVisible, setIsVisible] = useState(true)
  const isVisibleRef = useRef(true)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY

          // 1. Show only when completely at or returning to the top of the page (<= 10px)
          if (scrollY <= 10) {
            if (!isVisibleRef.current) {
              isVisibleRef.current = true
              setIsVisible(true)
            }
          }
          // 2. Hide once user scrolls down past the initial top threshold (> 40px)
          // Header remains hidden anywhere else on the page, even when scrolling up in the middle.
          else if (scrollY > 40) {
            if (isVisibleRef.current) {
              isVisibleRef.current = false
              setIsVisible(false)
            }
          }

          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`bg-[#f1efdf] border-b border-[#c3cda7]/50 px-6 lg:px-10 py-5 sticky top-0 z-10 backdrop-blur-sm bg-opacity-95 transform transition-all duration-[600ms] ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left Title & Status */}
        <div>
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger */}
            <button
              onClick={onMenuClick}
              className="p-1 rounded-md text-[#212529] hover:bg-[#e6ecd5] lg:hidden cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <h1 className="font-editorial text-2xl lg:text-3xl font-light text-[#212529] tracking-tight">
              <span className="italic font-normal">Good morning,</span> FPO Manager
            </h1>
            <span className="px-3 py-0.5 rounded-full bg-[#e6ecd5] text-[#1b6e53] text-[11px] font-mono uppercase tracking-widest border border-[#c3cda7] hidden sm:inline-block">
              {hubInfo.cycle}
            </span>
          </div>
          <p className="text-[11px] text-[#6d6d6d] mt-1 font-mono uppercase tracking-widest">
            Nashik Agri-Cluster • Hub Terminal #04 • Window: {hubInfo.operatingWindow}
          </p>
        </div>

        {/* Right Search & CTAs */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="relative w-full md:w-72 lg:w-96">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#6d6d6d]">
              search
            </span>
            <input
              type="text"
              placeholder="Search farmers, buyer POs, slip ID..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#ffffff] border border-[#c3cda7] rounded-[100px] text-[#212529] placeholder-[#6d6d6d] focus:outline-none focus:ring-1 focus:ring-[#1b6e53] focus:border-[#1b6e53] transition shadow-none font-sans"
            />
          </div>

          <button className="flex items-center gap-2 px-5 py-2 rounded-[100px] bg-[#1b6e53] text-[#ffffff] text-xs font-semibold hover:bg-[#165a44] transition shrink-0 shadow-sm uppercase tracking-wider cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">receipt_long</span>
            <span className="hidden sm:inline">+ New Inward Slip</span>
            <span className="sm:hidden">+ Slip</span>
          </button>

          <button
            className="w-9 h-9 rounded-full bg-[#ffffff] border border-[#c3cda7] text-[#212529] flex items-center justify-center hover:bg-[#faf9f0] transition relative shrink-0 cursor-pointer"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[18px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#e8fe85] ring-1 ring-[#1b6e53] rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  )
}
