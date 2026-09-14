import React from 'react'
import { Link } from 'react-router'
import { getStoredDemands } from '../../data/buyerData'

export default function ProcurementRequestsSection({ requests: defaultRequests }) {
  const storedDemands = getStoredDemands()
  const displayRequests = storedDemands && storedDemands.length > 0 ? storedDemands.slice(0, 4) : defaultRequests

  return (
    <section className="rounded-[22px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#c3cda7]/50">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <span className="material-symbols-outlined text-[20px]">mark_email_unread</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-2 py-0.5 rounded-full border border-[#c3cda7]">
                INCOMING BUYER DEMAND
              </span>
              <span className="text-[10px] font-mono text-[#ba1a1a] uppercase tracking-wider font-bold">
                ● Live Requests
              </span>
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight">
              Incoming Procurement Requests
            </h2>
          </div>
        </div>

        <Link
          to="/fpo/requests"
          className="inline-flex items-center gap-1 text-xs text-[#1b6e53] font-bold bg-[#e6ecd5] hover:bg-[#c3cda7]/60 px-3.5 py-1.5 rounded-[100px] border border-[#c3cda7] transition"
        >
          <span>View All ({storedDemands.length})</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </Link>
      </div>

      {/* Grid of Procurement Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayRequests.map((req) => {
          const itemsList = req.items || [
            { crop: req.crop || 'Produce', quantity: req.quantity || '1,000 kg', grade: req.grade || 'Grade A', targetPrice: req.maxPrice || '₹28/kg' }
          ]
          const itemsTitle = itemsList.map((i) => i.crop).join(' • ')
          const totalVol = itemsList.reduce((acc, curr) => {
            const num = parseInt(String(curr.quantity || '0').replace(/[^0-9]/g, '')) || 0
            return acc + num
          }, 0)

          return (
            <div
              key={req.id}
              className="rounded-[20px] bg-[#f1efdf] border border-[#c3cda7]/80 p-5 flex flex-col justify-between hover:shadow-md hover:border-[#1b6e53] transition"
            >
              <div>
                {/* Buyer & Status */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#6d6d6d] uppercase block">
                      {req.id}
                    </span>
                    <h3 className="font-editorial text-xl font-bold text-[#212529] leading-snug line-clamp-1">
                      {req.buyer || 'AgroFresh Enterprise'}
                    </h3>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-mono ${
                      req.status === 'Waiting Response' || req.status === 'Urgent Review'
                        ? 'bg-[#fceace] text-[#683600]'
                        : req.fpoResponded
                        ? 'bg-[#e6ecd5] text-[#1b6e53]'
                        : 'bg-[#b2cee7] text-[#00372a]'
                    }`}
                  >
                    {req.fpoResponded ? 'Responded' : req.status === 'Waiting Response' ? 'Waiting Response' : 'New Request'}
                  </span>
                </div>

                {/* Details List */}
                <div className="space-y-2 text-xs py-3 border-y border-[#c3cda7]/50">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#6d6d6d]">Items:</span>
                    <span className="font-semibold text-[#212529] font-mono text-[11px] truncate max-w-[130px]">
                      {itemsList.length} Items ({itemsTitle})
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#6d6d6d]">Total Qty:</span>
                    <span className="font-bold text-[#1b6e53] font-mono text-sm">
                      {totalVol > 0 ? `${totalVol.toLocaleString()} kg` : req.quantity || '1,000 kg'}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#6d6d6d]">Destination:</span>
                    <span className="font-mono text-[#212529] text-[11px] truncate max-w-[120px]">
                      {req.deliveryLocation || 'Vijayawada Dock'}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#6d6d6d]">Needed By:</span>
                    <span className="font-mono text-[#683600] font-bold text-[11px]">
                      {req.deliveryDate || req.neededBy}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <Link
                  to={`/fpo/requests/${req.id}`}
                  className="w-full py-2.5 px-4 rounded-[100px] bg-[#1b6e53] text-[#ffffff] text-xs font-bold hover:bg-[#00372a] transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Review Request</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

