import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

export default function HubHeader({ onMenuClick }) {
  const [isVisible, setIsVisible] = useState(true)
  const isVisibleRef = useRef(true)
  const ticking = useRef(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    isVisibleRef.current = true
    setIsVisible(true)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY

          if (scrollY <= 10) {
            if (!isVisibleRef.current) {
              isVisibleRef.current = true
              setIsVisible(true)
            }
          } else if (scrollY > 40) {
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
              <span className="italic font-normal">Hub Workspace —</span> Rajahmundry Central Hub
            </h1>
            <span className="px-3 py-0.5 rounded-full bg-[#e8fe85] text-[#1b6e53] text-[11px] font-mono uppercase tracking-widest border border-[#c3cda7] hidden sm:inline-block font-bold">
              HUB
            </span>
          </div>
          <p className="text-[11px] text-[#6d6d6d] mt-1 font-mono uppercase tracking-widest">
            Field Operations • Intake, Weighing, Quality Inspection &amp; Dispatch • Active Window: 05:00 – 18:00 IST
          </p>
        </div>

        {/* Right Status & Notifications */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffffff] border border-[#c3cda7]/60 text-xs font-mono text-[#00372a]">
            <span className="w-2 h-2 rounded-full bg-[#1b6e53] animate-pulse"></span>
            <span>Rajahmundry Central Hub (Online)</span>
          </div>

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
