import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { getDemandById } from '../../data/buyerData'

export default function RequestDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const demand = getDemandById(id)

  const [activeOfferModal, setActiveOfferModal] = useState(null)
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  const handleAcceptOffer = (fpoResponse) => {
    setActiveOfferModal(null)
    setOrderConfirmed(true)
    setTimeout(() => {
      navigate('/buyer/orders')
    }, 2000)
  }

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Link to="/buyer/demands" className="text-[10px] font-mono text-[#1b6e53] font-bold hover:underline">
              ← BACK TO MY DEMANDS
            </Link>
            <span className="text-[#c3cda7]">/</span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              PROCUREMENT REQUEST // {demand.id}
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-[#00372a] tracking-tight">
            Procurement Request <span className="italic font-normal font-mono text-2xl sm:text-3xl">({demand.id})</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1 font-sans">
            Review independent lot responses, compare back-offers, and award forward contract.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/buyer/demands/new"
            className="py-2.5 px-5 rounded-[100px] bg-[#ffffff] hover:bg-[#f1efdf] text-[#212529] border border-[#c3cda7] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
          >
            <span>+ New Demand</span>
          </Link>
        </div>
      </div>

      {/* Confirmation Toast */}
      {orderConfirmed && (
        <div className="p-4 bg-[#e8fe85] border border-[#1b6e53] text-[#1b6e53] text-xs font-bold rounded-[20px] flex items-center justify-between shadow-md animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">verified</span>
            <span>Contract awarded! Forward order generated. Redirecting to Orders &amp; Fulfillment...</span>
          </div>
        </div>
      )}

      {/* 2. Top Demand Specification Card */}
      <section className="rounded-[24px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-8 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#c3cda7]/50">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-[20px] bg-[#f1efdf] border border-[#c3cda7] text-3xl flex items-center justify-center shrink-0">
              🍅
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-mono font-bold text-sm text-[#1b6e53] bg-[#e6ecd5] px-2.5 py-0.5 rounded-[100px] border border-[#c3cda7]">
                  {demand.id}
                </span>
                <h2 className="font-editorial text-3xl font-bold text-[#00372a]">
                  {demand.crop} <span className="text-xl font-normal text-[#6d6d6d]">({demand.variety || 'Selected Variety'})</span>
                </h2>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-[100px] bg-[#b2cee7] text-[#00372a]">
                  {demand.grade}
                </span>
              </div>
              <p className="text-xs text-[#6d6d6d] font-mono mt-1">
                Published: {demand.createdDate} • Destination: <strong className="text-[#212529]">{demand.deliveryLocation}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="bg-[#f1efdf] rounded-[16px] px-4 py-2 border border-[#c3cda7]/60 text-right">
              <span className="block text-[10px] font-mono uppercase text-[#6d6d6d]">Overall Status</span>
              <span className="text-xs font-mono font-bold text-[#1b6e53]">{demand.status}</span>
            </div>
            <div className="bg-[#fceace] rounded-[16px] px-4 py-2 border border-[#c3cda7]/60 text-right">
              <span className="block text-[10px] font-mono uppercase text-[#683600]">Target Rate</span>
              <span className="text-sm font-mono font-bold text-[#683600]">{demand.targetPrice}</span>
            </div>
          </div>
        </div>

        {/* Requirements Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans">
          <div className="bg-[#f1efdf]/60 p-3 rounded-[16px] border border-[#c3cda7]/40">
            <span className="text-[#6d6d6d] block font-mono text-[11px]">Target Volume:</span>
            <span className="font-bold text-[#1b6e53] font-mono text-base">{demand.quantity}</span>
          </div>
          <div className="bg-[#f1efdf]/60 p-3 rounded-[16px] border border-[#c3cda7]/40">
            <span className="text-[#6d6d6d] block font-mono text-[11px]">Required Grade:</span>
            <span className="font-semibold text-[#212529]">{demand.grade}</span>
          </div>
          <div className="bg-[#f1efdf]/60 p-3 rounded-[16px] border border-[#c3cda7]/40">
            <span className="text-[#6d6d6d] block font-mono text-[11px]">Required Delivery:</span>
            <span className="font-bold text-[#212529] font-mono">{demand.deliveryDate}</span>
          </div>
          <div className="bg-[#f1efdf]/60 p-3 rounded-[16px] border border-[#c3cda7]/40">
            <span className="text-[#6d6d6d] block font-mono text-[11px]">Recipient FPOs:</span>
            <span className="font-semibold text-[#00372a] font-mono">{demand.responses?.length || 3} Selected FPOs</span>
          </div>
        </div>

        {demand.qualitySpecs && (
          <div className="p-3 bg-[#f1efdf]/40 rounded-[16px] border border-[#c3cda7]/40 text-xs text-[#353535]">
            <span className="font-mono font-bold uppercase text-[10px] text-[#6d6d6d] block mb-0.5">Quality Specifications:</span>
            {demand.qualitySpecs} {demand.packaging && `• Packaging: ${demand.packaging}`}
          </div>
        )}
      </section>

      {/* 3. FPO RESPONSES SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#c3cda7]/50 flex-wrap gap-2">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold">
              INDEPENDENT PROPOSALS // FPO BIDS
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
              FPO Responses ({demand.responses?.length || 0})
            </h2>
          </div>
          <span className="text-xs font-mono text-[#6d6d6d]">
            Compare terms • Lowest price does not automatically win
          </span>
        </div>

        {/* Responses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {demand.responses?.map((resp) => {
            const isAccepted = resp.status === 'ACCEPTED'
            const isBackOffer = resp.status === 'BACK_OFFER'
            const isNoResponse = resp.status === 'NO_RESPONSE'

            return (
              <div
                key={resp.id}
                className={`rounded-[24px] p-6 border shadow-xs flex flex-col justify-between space-y-4 transition ${
                  isAccepted
                    ? 'bg-[#ffffff] border-[#1b6e53] ring-1 ring-[#1b6e53]/30'
                    : isBackOffer
                    ? 'bg-[#ffffff] border-[#c3cda7]'
                    : 'bg-[#f1efdf]/70 border-[#c3cda7]'
                }`}
              >
                <div className="space-y-3">
                  {/* FPO Header & Status Badge */}
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#c3cda7]/40">
                    <div>
                      <h3 className="font-editorial text-2xl font-bold text-[#00372a] leading-tight">
                        {resp.fpoName}
                      </h3>
                      <p className="text-[11px] text-[#6d6d6d] font-mono mt-0.5">
                        📍 {resp.location}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-[100px] text-[10px] font-mono font-bold tracking-wider uppercase shrink-0 ${
                        isAccepted
                          ? 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]'
                          : isBackOffer
                          ? 'bg-[#fceace] text-[#683600] border border-[#c3cda7]'
                          : 'bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7]'
                      }`}
                    >
                      {resp.statusLabel}
                    </span>
                  </div>

                  {/* Body Content based on Status */}
                  {isAccepted && (
                    <div className="space-y-2.5 text-xs font-sans">
                      <div className="bg-[#e6ecd5]/50 rounded-[16px] p-3 space-y-1.5 border border-[#c3cda7]/50">
                        <div className="flex justify-between">
                          <span className="text-[#6d6d6d]">Offered Volume:</span>
                          <span className="font-bold text-[#1b6e53] font-mono">{resp.offeredQty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6d6d6d]">Offered Rate:</span>
                          <span className="font-extrabold text-[#1b6e53] font-mono text-base">{resp.offeredPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6d6d6d]">Committed Delivery:</span>
                          <span className="font-mono text-[#212529]">{resp.deliveryDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6d6d6d]">Intake Hub:</span>
                          <span className="font-medium text-[#212529] text-[11px]">{resp.hub}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#353535] leading-relaxed italic bg-[#ffffff] p-2.5 rounded-lg border border-[#c3cda7]/40">
                        "{resp.notes}"
                      </p>
                    </div>
                  )}

                  {isBackOffer && (
                    <div className="space-y-2.5 text-xs font-sans">
                      <div className="bg-[#fceace]/60 rounded-[16px] p-3 space-y-1.5 border border-[#c3cda7]/50">
                        <div className="flex justify-between">
                          <span className="text-[#6d6d6d]">Requested Volume:</span>
                          <span className="font-mono text-[#353535]">{resp.requestedQty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#683600] font-bold">Counter Rate:</span>
                          <span className="font-extrabold text-[#683600] font-mono text-base">{resp.counterPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6d6d6d]">Proposed Delivery:</span>
                          <span className="font-mono text-[#212529] font-bold">{resp.deliveryDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6d6d6d]">Intake Hub:</span>
                          <span className="font-medium text-[#212529] text-[11px]">{resp.hub}</span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-[#ffffff] rounded-lg border border-[#c3cda7]/40 text-[11px] space-y-1">
                        <span className="font-mono font-bold uppercase text-[10px] text-[#683600] block">Proposed Terms:</span>
                        <p className="text-[#353535] leading-relaxed">
                          {resp.notes}
                        </p>
                      </div>
                    </div>
                  )}

                  {isNoResponse && (
                    <div className="space-y-3 py-4 text-xs font-sans text-center">
                      <div className="w-10 h-10 rounded-full bg-[#ffffff] border border-[#c3cda7] text-[#6d6d6d] flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-[20px]">hourglass_empty</span>
                      </div>
                      <div>
                        <p className="font-semibold text-[#212529]">Waiting for FPO Response</p>
                        <p className="text-[11px] text-[#6d6d6d] mt-0.5">
                          Request dispatched on {resp.requestSentDate || '14 Sep 2026'}. FPO coordinators are aggregating farm lots.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Button */}
                <div className="pt-3 border-t border-[#c3cda7]/40">
                  {isAccepted && (
                    <button
                      onClick={() => setActiveOfferModal(resp)}
                      className="w-full py-2.5 px-4 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span>View &amp; Accept Offer</span>
                    </button>
                  )}

                  {isBackOffer && (
                    <button
                      onClick={() => setActiveOfferModal(resp)}
                      className="w-full py-2.5 px-4 rounded-[100px] bg-[#fceace] hover:bg-[#ebd3b2] text-[#683600] border border-[#c3cda7] text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">tune</span>
                      <span>Review Back Offer</span>
                    </button>
                  )}

                  {isNoResponse && (
                    <button
                      disabled
                      className="w-full py-2.5 px-4 rounded-[100px] bg-[#ffffff] text-[#6d6d6d] border border-[#c3cda7] text-xs font-mono opacity-80 cursor-not-allowed text-center"
                    >
                      Awaiting Response...
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 4. Business Principle Information Card */}
      <section className="bg-[#fceace] border border-[#c3cda7] rounded-[24px] p-6 flex flex-col sm:flex-row items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#683600] text-[#ffffff] flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[20px]">handshake</span>
        </div>
        <div className="text-xs text-[#683600] space-y-1 font-sans">
          <h4 className="font-editorial text-2xl font-bold text-[#00372a]">
            FarmLink Buyer Decision Protocol
          </h4>
          <p className="leading-relaxed">
            A Procurement Request is an RFQ, not a binding order. You can compare accepted offers, evaluate counter back-offers, and choose the FPO partner based on delivery timeliness, quality track record, and price. Once you accept an offer, a verified Order with digital weighment escrow is created.
          </p>
        </div>
      </section>

      {/* Offer Review / Contract Award Dialog */}
      {activeOfferModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[24px] max-w-lg w-full p-6 lg:p-7 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]">
              <div>
                <span className="text-[10px] font-mono text-[#1b6e53] font-bold uppercase tracking-wider">
                  {activeOfferModal.status === 'ACCEPTED' ? 'FPO FORMAL OFFER' : 'FPO BACK OFFER REVIEW'} // {demand.id}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a]">
                  {activeOfferModal.fpoName}
                </h3>
              </div>
              <button
                onClick={() => setActiveOfferModal(null)}
                className="w-8 h-8 rounded-full bg-[#f1efdf] text-[#6d6d6d] hover:text-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Offer Specs Summary */}
            <div className="bg-[#f1efdf] p-4 rounded-[18px] space-y-2.5 text-xs font-sans border border-[#c3cda7]/60">
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Commodity &amp; Grade:</span>
                <span className="font-bold text-[#212529]">{demand.crop} ({demand.grade})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Committed Volume:</span>
                <span className="font-bold text-[#1b6e53] font-mono text-sm">{activeOfferModal.offeredQty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Landed FPO Rate:</span>
                <span className="font-extrabold text-[#683600] font-mono text-base">
                  {activeOfferModal.offeredPrice || activeOfferModal.counterPrice}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Delivery Destination:</span>
                <span className="font-mono text-[#212529]">{demand.deliveryLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Committed Arrival Date:</span>
                <span className="font-mono font-bold text-[#212529]">{activeOfferModal.deliveryDate}</span>
              </div>
            </div>

            {activeOfferModal.counterReasons && (
              <div className="p-3.5 bg-[#fceace] rounded-[16px] border border-[#c3cda7] text-xs text-[#683600] space-y-1">
                <span className="font-mono font-bold uppercase text-[10px]">Back Offer Commercial Rationale:</span>
                <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                  {activeOfferModal.counterReasons.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="text-[11px] text-[#6d6d6d] leading-relaxed">
              Awarding this contract generates a binding execution order. Member farmers will deliver to {activeOfferModal.hub} for digital weighment and escrow settlement.
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveOfferModal(null)}
                className="flex-1 py-3 rounded-[100px] border border-[#c3cda7] text-xs font-semibold text-[#353535] bg-[#ffffff] hover:bg-[#f1efdf] transition cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleAcceptOffer(activeOfferModal)}
                className="flex-1 py-3 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-[#ffffff] text-xs font-bold transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Accept &amp; Create Order →</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
