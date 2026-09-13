import React, { useState } from 'react'

export default function ProcurementRequestsSection({ requests }) {
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [toastMessage, setToastMessage] = useState('')

  const handleReview = (req) => {
    setSelectedRequest(req)
  }

  const handleAcceptOffer = (reqId) => {
    setSelectedRequest(null)
    setToastMessage(`FPO Offer drafted for ${reqId}! Proceed to Fulfillment Allocation.`)
    setTimeout(() => setToastMessage(''), 4000)
  }

  return (
    <section className="rounded-[22px] bg-[#ffffff] border border-[#c3cda7] p-6 lg:p-7 shadow-xs space-y-5">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="p-3 bg-[#e6ecd5] border border-[#1b6e53] text-[#1b6e53] text-xs font-semibold rounded-[14px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage('')} className="text-[#1b6e53] font-bold text-sm cursor-pointer">
            ✕
          </button>
        </div>
      )}

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

        <span className="text-xs font-mono text-[#6d6d6d]">
          {requests.length} Requests Pending Review
        </span>
      </div>

      {/* Grid of Procurement Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {requests.map((req) => (
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
                  <h3 className="font-editorial text-xl font-bold text-[#212529] leading-snug">
                    {req.buyer}
                  </h3>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${req.statusStyle}`}
                >
                  {req.status}
                </span>
              </div>

              {/* Details List */}
              <div className="space-y-2 text-xs py-3 border-y border-[#c3cda7]/50">
                <div className="flex justify-between items-baseline">
                  <span className="text-[#6d6d6d]">Crop Required:</span>
                  <span className="font-semibold text-[#212529] font-mono">{req.crop}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[#6d6d6d]">Quantity:</span>
                  <span className="font-bold text-[#1b6e53] font-mono text-sm">{req.quantity}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[#6d6d6d]">Grade Spec:</span>
                  <span className="font-semibold text-[#212529]">{req.grade}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[#6d6d6d]">Price Cap:</span>
                  <span className="font-semibold text-[#683600] font-mono">{req.maxPrice}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[#6d6d6d]">Needed By:</span>
                  <span className="font-mono text-[#212529] text-[11px]">{req.neededBy}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <button
                onClick={() => handleReview(req)}
                className="w-full py-2.5 px-4 rounded-[100px] bg-[#1b6e53] text-[#ffffff] text-xs font-bold hover:bg-[#00372a] transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Review Request</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal Dialog */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border border-[#c3cda7] rounded-[24px] max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3cda7]">
              <div>
                <span className="text-[10px] font-mono text-[#1b6e53] font-bold uppercase">
                  Procurement Review // {selectedRequest.id}
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#212529]">
                  {selectedRequest.buyer}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="w-8 h-8 rounded-full bg-[#f1efdf] text-[#6d6d6d] hover:text-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs bg-[#f1efdf] p-4 rounded-[16px]">
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Crop:</span>
                <span className="font-bold">{selectedRequest.crop}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Required Volume:</span>
                <span className="font-bold text-[#1b6e53]">{selectedRequest.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Quality Specification:</span>
                <span className="font-bold">{selectedRequest.grade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Maximum Buyer Price:</span>
                <span className="font-bold text-[#683600]">{selectedRequest.maxPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6d6d6d]">Delivery Schedule:</span>
                <span className="font-mono">{selectedRequest.neededBy}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setSelectedRequest(null)}
                className="flex-1 py-2.5 rounded-[100px] border border-[#c3cda7] text-xs font-semibold text-[#6d6d6d] hover:bg-[#f1efdf] transition cursor-pointer"
              >
                Reject Request
              </button>
              <button
                onClick={() => handleAcceptOffer(selectedRequest.id)}
                className="flex-1 py-2.5 rounded-[100px] bg-[#1b6e53] text-[#e8fe85] text-xs font-bold hover:bg-[#00372a] transition shadow-sm cursor-pointer"
              >
                Issue FPO Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
