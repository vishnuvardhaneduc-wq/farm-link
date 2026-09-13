import React from 'react'
import { Link } from 'react-router'

export default function BottomTriad({ priceTransparency, priorityAlerts, weeklyAnalytics, produceShare }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6 items-stretch">
      {/* Card A: Price Transparency */}
      <div className="rounded-[22px] bg-[#ffffff] border border-[#c3cda7] p-6 flex flex-col justify-between shadow-xs h-full">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1b6e53] text-[#e8fe85] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-2 py-0.5 rounded-full border border-[#c3cda7] inline-block mb-1">
                  MANDI BENCHMARK
                </div>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-tight">
                  Price Transparency
                </h3>
              </div>
            </div>
            <span className="bg-[#e8fe85] text-[#1b6e53] px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-[#c3cda7] shadow-sm shrink-0">
              {priceTransparency.gainPercentage}
            </span>
          </div>

          <p className="text-xs text-[#6d6d6d] mt-1">
            Direct procurement benchmark vs Local APMC Mandi
          </p>

          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between p-3 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7]/60">
              <span className="text-xs text-[#353535]">Reference Market Price</span>
              <span className="text-sm font-semibold text-[#212529] font-mono">
                {priceTransparency.marketRef}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-[16px] bg-[#e6ecd5] border border-[#c3cda7]">
              <span className="text-xs font-semibold text-[#1b6e53]">FarmLink Farmer Realization</span>
              <span className="text-base font-bold text-[#1b6e53] font-mono">
                {priceTransparency.realization}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-[16px] bg-[#f1efdf] border border-[#c3cda7]/60">
              <span className="text-xs text-[#353535]">Difference (Net Premium)</span>
              <span className="text-xs font-bold text-[#1b6e53] font-mono">
                {priceTransparency.gainAmount}
              </span>
            </div>
          </div>

          <div className="mt-5 p-4 rounded-[18px] bg-[#fceace] border border-[#c3cda7]/70 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#ffffff] text-[#1b6e53] flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[20px]">trending_up</span>
            </div>
            <div>
              <span className="text-[11px] text-[#353535] uppercase font-semibold">
                Estimated Additional Farmer Earnings
              </span>
              <div className="font-editorial text-2xl text-[#212529] font-normal leading-tight">
                {priceTransparency.extraEarnings}{' '}
                <span className="text-xs font-sans text-[#6d6d6d]">
                  {priceTransparency.extraEarningsSub}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#c3cda7]/50">
          <p className="text-[10px] text-[#6d6d6d] leading-normal">
            {priceTransparency.disclaimer}
          </p>
        </div>
      </div>

      {/* Card B: Action Required Alerts */}
      <div className="rounded-[22px] bg-[#ffffff] border border-[#c3cda7] p-6 flex flex-col justify-between shadow-xs h-full">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#ba1a1a] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <span className="material-symbols-outlined text-[18px]">notification_important</span>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#ba1a1a] font-bold bg-[#fceace] px-2 py-0.5 rounded-full border border-[#c3cda7] inline-block mb-1">
                  PRIORITY INTERVENTIONS
                </div>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-tight">
                  Action Required
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-[#ba1a1a] text-[#ffffff] px-2.5 py-1 rounded-full text-[11px] font-mono font-bold shadow-sm shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#ffffff] animate-pulse"></span>
              <span>{priorityAlerts.length} Active</span>
            </div>
          </div>

          <p className="text-xs text-[#6d6d6d] mt-1">
            Real-time alerts & operational interventions
          </p>

          <div className="mt-4 space-y-2.5 text-xs overflow-y-auto max-h-[360px] pr-1 flex-1">
            {priorityAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-[16px] ${alert.cardBg} border border-[#c3cda7]/70 flex flex-col gap-1 hover:shadow-2xs transition`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${alert.titleColor} flex items-center gap-1.5`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${alert.dotColor}`}></span>
                    {alert.type}
                  </span>
                  <span className="text-[10px] text-[#6d6d6d] font-mono">{alert.timeAgo}</span>
                </div>
                <p className="text-[#353535] leading-snug">{alert.message}</p>
                <button className={`self-start text-[11px] font-bold ${alert.ctaColor} hover:underline mt-1 cursor-pointer`}>
                  {alert.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-[#c3cda7]/50 mt-4 flex items-center justify-between text-xs text-[#6d6d6d]">
          <span className="font-mono text-[11px]">System Status: Operational</span>
          <span className="font-semibold text-[#ba1a1a]">{priorityAlerts.length} Action Items</span>
        </div>
      </div>

      {/* Card C: Analytics Preview (Demand vs Supply) */}
      <div className="rounded-[22px] bg-[#ffffff] border border-[#c3cda7] p-6 flex flex-col justify-between shadow-xs h-full">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <span className="material-symbols-outlined text-[18px]">bar_chart</span>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-2 py-0.5 rounded-full border border-[#c3cda7] inline-block mb-1">
                  VOLUME EQUILIBRIUM
                </div>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-tight">
                  Demand vs Supply
                </h3>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#353535] bg-[#f1efdf] border border-[#c3cda7] px-2.5 py-1 rounded-full font-bold shrink-0">
              7-Day Trend
            </span>
          </div>

          <p className="text-xs text-[#6d6d6d] mt-1">
            Demand vs Supply Equilibrium (Tonnes)
          </p>

          {/* 7-Day Chart */}
          <div className="mt-5 pt-2">
            <div className="flex items-end justify-between h-24 border-b border-[#c3cda7]/60 px-2 gap-2">
              {weeklyAnalytics.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                  <div className="w-full flex items-end justify-center gap-0.5 h-16">
                    <div
                      className={`w-2.5 bg-[#1b6e53] rounded-t ${item.isToday ? 'ring-1 ring-[#1b6e53]' : ''}`}
                      style={{ height: item.demandHeight }}
                      title={`${item.day} Demand: ${item.demandVal}`}
                    ></div>
                    <div
                      className={`w-2.5 bg-[#e8fe85] rounded-t ${item.isToday ? 'ring-1 ring-[#1b6e53]' : ''}`}
                      style={{ height: item.supplyHeight }}
                      title={`${item.day} Supply: ${item.supplyVal}`}
                    ></div>
                  </div>
                  <span
                    className={`text-[10px] ${
                      item.isToday
                        ? 'font-bold text-[#1b6e53]'
                        : 'text-[#6d6d6d] font-medium'
                    }`}
                  >
                    {item.day}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 text-[11px] text-[#6d6d6d] mt-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1b6e53]"></span> Demand (Avg 4.1T)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e8fe85]"></span> Supply (Avg 3.9T)
              </span>
            </div>
          </div>

          {/* Top Produce Share */}
          <div className="mt-5 pt-4 border-t border-[#c3cda7]/50 space-y-2.5">
            <span className="text-xs font-semibold text-[#212529]">Top Produce Share Today</span>
            {produceShare.map((prod) => (
              <div key={prod.name}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#212529]">{prod.name}</span>
                  <span className="font-medium text-[#6d6d6d]">{prod.amount}</span>
                </div>
                <div className="w-full bg-[#f1efdf] h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`${prod.barBg} h-full rounded-full`}
                    style={{ width: prod.pct }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-[#c3cda7]/50 mt-4">
          <Link
            to="/fpo/analytics"
            className="text-xs font-semibold text-[#1b6e53] hover:underline flex items-center justify-between"
          >
            <span>Full Agricultural Analytics</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
