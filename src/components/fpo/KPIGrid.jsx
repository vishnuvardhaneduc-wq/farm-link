import React from 'react'

export default function KPIGrid({ kpiCards, syncTime }) {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#6d6d6d] mb-0.5">
            Operational Ledger // Metrics
          </div>
          <h2 className="font-editorial text-2xl font-light text-[#212529] tracking-tight">
            Aggregate Cluster Overview
          </h2>
        </div>
        <span className="text-xs font-mono text-[#6d6d6d] tracking-wide">
          Updated automatically via gate weighbridge • {syncTime}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card) => (
          <div
            key={card.id}
            className={`${card.cardBg} rounded-[20px] p-5 border border-[#c3cda7] flex flex-col justify-between shadow-xs`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium uppercase tracking-wider ${card.titleColor}`}>
                {card.title}
              </span>
              <span className={`material-symbols-outlined text-[20px] ${card.iconColor}`}>
                {card.icon}
              </span>
            </div>

            <div className="my-3">
              <div className={`font-editorial text-4xl font-normal leading-none ${card.valueColor}`}>
                {card.value}{' '}
                {card.unit && <span className="text-xl font-sans">{card.unit}</span>}
              </div>
              <p className="text-[11px] text-[#353535] mt-1">{card.subtitle}</p>
            </div>

            <div
              className={`pt-2 border-t border-[#c3cda7]/60 flex items-center gap-1.5 text-xs font-semibold ${card.footerColor}`}
            >
              {card.badgeDot && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#1b6e53]"></span>
              )}
              {card.badgeIcon && (
                <span className="material-symbols-outlined text-[14px]">
                  {card.badgeIcon}
                </span>
              )}
              <span>{card.badgeText}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
