import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { getStoredDemands } from '../../data/buyerData'

export default function Demands() {
  const [demands, setDemands] = useState([])

  useEffect(() => {
    setDemands(getStoredDemands())
  }, [])

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-1 rounded-[100px] border border-[#c3cda7] inline-block mb-1.5">
            PROCUREMENT TENDERS // MY DEMANDS
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            My <span className="italic font-normal">Procurement Demands</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Forward contracts and RFQs published to regional FPO federations with multi-hub response tracking.
          </p>
        </div>

        <Link
          to="/buyer/demands/new"
          className="py-2.5 px-6 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>+ Post Demand (RFQ)</span>
        </Link>
      </div>

      {/* Requests Table matching DashboardTables */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#c3cda7]/50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1b6e53] text-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#00372a] tracking-tight leading-none">
                Active Procurement Requests
              </h3>
              <p className="text-xs text-[#6d6d6d] mt-1 font-sans">
                Track independent FPO offers, back-offers, and contract allocation status
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-[#6d6d6d]">
            {demands.length} Published Requests
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead className="bg-[#f1efdf] text-[#353535] uppercase text-[10px] tracking-wider border-b border-[#c3cda7]/50 font-mono">
              <tr>
                <th className="py-3 px-4">REQ Ref</th>
                <th className="py-3 px-3">Crop &amp; Variety</th>
                <th className="py-3 px-3">Grade</th>
                <th className="py-3 px-3 text-right">Target Volume</th>
                <th className="py-3 px-3 font-bold text-[#683600]">Target Rate</th>
                <th className="py-3 px-3">Delivery Date</th>
                <th className="py-3 px-3">Selected FPOs</th>
                <th className="py-3 px-3">Response Summary</th>
                <th className="py-3 px-3 text-center">Overall Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/30 text-[#212529]">
              {demands.map((req) => (
                <tr key={req.id} className="hover:bg-[#faf9f0] transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#1b6e53] whitespace-nowrap">
                    {req.id}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="font-bold text-[#212529] block font-editorial text-base">{req.crop}</span>
                    <span className="text-[10px] font-mono text-[#6d6d6d]">{req.variety || 'Standard'}</span>
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="text-[10px] font-mono font-bold bg-[#e6ecd5] text-[#1b6e53] px-2 py-0.5 rounded border border-[#c3cda7]">
                      {req.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-[#1b6e53] font-mono whitespace-nowrap">
                    {req.quantity}
                  </td>
                  <td className="py-3.5 px-3 font-extrabold text-[#683600] font-mono whitespace-nowrap">
                    {req.targetPrice}
                  </td>
                  <td className="py-3.5 px-3 text-[#353535] font-mono whitespace-nowrap">
                    {req.deliveryDate}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-[11px] whitespace-nowrap text-[#00372a]">
                    {req.selectedFposCount || `${req.responses?.length || 3} FPOs selected`}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="text-[11px] font-mono font-medium text-[#1b6e53] bg-[#e6ecd5]/80 px-2 py-0.5 rounded border border-[#c3cda7]/60">
                      {req.responseSummary || `${req.responses?.filter(r => r.status !== 'NO_RESPONSE').length || 2} responses`}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-[100px] text-[10px] font-mono font-semibold ${
                        req.status === 'Receiving Offers' || req.status === 'Awaiting Responses'
                          ? 'bg-[#fceace] text-[#683600]'
                          : req.status === 'Draft'
                          ? 'bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7]'
                          : 'bg-[#e6ecd5] text-[#1b6e53]'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <Link
                      to={`/buyer/requests/${req.id}`}
                      className="py-1.5 px-3.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-2xs inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Responses</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
