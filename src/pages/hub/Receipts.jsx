import React, { useState } from 'react'
import { Link } from 'react-router'

export default function Receipts() {
  const [selectedSlip, setSelectedSlip] = useState(null)
  const [toastMsg, setToastMsg] = useState('')

  const receiptsList = [
    {
      slipId: 'SLIP-9904',
      ticketNo: 'TKT-9904-RAJ',
      timestamp: 'Today, 08:05 AM IST',
      farmerId: 'FARM-004',
      farmerName: 'Balwant Singh',
      village: 'Morampudi',
      phone: '+91 98480 77884',
      commodity: 'Hybrid Tomato (Grade A)',
      variety: 'Abhinav Hybrid',
      grossWeight: '150.0 kg',
      tareWeight: '10.0 kg (5 standard crates)',
      netWeight: '140.0 kg',
      gradeAssayed: 'Grade A (95% Optical Pass)',
      batchRate: '₹25.00 / kg',
      totalPayable: '₹3,500',
      escrowStatus: 'Recorded (Pending Dock Deliver)',
      scaleUnit: 'Load Cell A-1 (Calibrated)',
      operator: 'p.vishnu vardhan',
      smsStatus: 'Sent (100% Delivered)',
      ivrCallStatus: 'Scheduled 09:00 AM (Telugu)',
    },
    {
      slipId: 'SLIP-9903',
      ticketNo: 'TKT-9903-RAJ',
      timestamp: 'Today, 07:40 AM IST',
      farmerId: 'FARM-003',
      farmerName: 'Kavita Devi',
      village: 'Hukumpeta',
      phone: '+91 98480 55663',
      commodity: 'Hybrid Tomato (Grade A)',
      variety: 'Abhinav Hybrid',
      grossWeight: '160.0 kg',
      tareWeight: '10.0 kg (5 crates)',
      netWeight: '150.0 kg',
      gradeAssayed: 'Grade A (97% Optical Pass)',
      batchRate: '₹25.00 / kg',
      totalPayable: '₹3,750',
      escrowStatus: 'Recorded (Pending Dock Deliver)',
      scaleUnit: 'Load Cell A-1 (Calibrated)',
      operator: 'p.vishnu vardhan',
      smsStatus: 'Sent (100% Delivered)',
      ivrCallStatus: 'Completed (Telugu Voice Slip)',
    },
    {
      slipId: 'SLIP-9902',
      ticketNo: 'TKT-9902-RAJ',
      timestamp: 'Today, 07:15 AM IST',
      farmerId: 'FARM-002',
      farmerName: 'Suresh Verma',
      village: 'Katheru',
      phone: '+91 98480 33442',
      commodity: 'Hybrid Tomato (Grade A)',
      variety: 'Abhinav Hybrid',
      grossWeight: '180.0 kg',
      tareWeight: '10.0 kg (5 crates)',
      netWeight: '170.0 kg',
      gradeAssayed: 'Grade A (94% Optical Pass)',
      batchRate: '₹25.00 / kg',
      totalPayable: '₹4,250',
      escrowStatus: 'Recorded (Pending Dock Deliver)',
      scaleUnit: 'Load Cell A-1 (Calibrated)',
      operator: 'p.vishnu vardhan',
      smsStatus: 'Sent (100% Delivered)',
      ivrCallStatus: 'Completed (Telugu Voice Slip)',
    },
    {
      slipId: 'SLIP-9901',
      ticketNo: 'TKT-9901-RAJ',
      timestamp: 'Today, 06:45 AM IST',
      farmerId: 'FARM-001',
      farmerName: 'Ramesh Patel',
      village: 'Torredu',
      phone: '+91 98480 11221',
      commodity: 'Hybrid Tomato (Grade A)',
      variety: 'Abhinav Hybrid',
      grossWeight: '250.0 kg',
      tareWeight: '10.0 kg (5 crates)',
      netWeight: '240.0 kg',
      gradeAssayed: 'Grade A (96% Optical Pass)',
      batchRate: '₹25.00 / kg',
      totalPayable: '₹6,000',
      escrowStatus: 'Recorded (Pending Dock Deliver)',
      scaleUnit: 'Load Cell A-1 (Calibrated)',
      operator: 'p.vishnu vardhan',
      smsStatus: 'Sent (100% Delivered)',
      ivrCallStatus: 'Completed (Telugu Voice Slip)',
    },
  ]

  const handlePrintSlip = (slip) => {
    setSelectedSlip(slip)
    setToastMsg(`Thermal slip command sent to Epson TM-T88VI for #${slip.slipId}`)
    setTimeout(() => setToastMsg(''), 4000)
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Toast */}
      {toastMsg && (
        <div className="p-4 rounded-xl bg-[#e6ecd5] border border-[#1b6e53] text-[#1b6e53] font-semibold text-xs flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg('')} className="text-[#1b6e53] hover:underline">
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Link to="/hub/dashboard" className="text-[10px] font-mono text-[#1b6e53] font-bold hover:underline">
              ← DASHBOARD
            </Link>
            <span className="text-[#c3cda7]">/</span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              Thermal Slips & Digital Archive
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#00372a]">
            Thermal Weighment Slips & Receipts
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1">
            Physical high-speed thermal paper slips printed for farmers on-dock + real-time dual-channel SMS and vernacular voice IVR logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-full bg-white border border-[#c3cda7] text-xs font-mono text-[#1b6e53] font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Thermal Roll: 92% Ready</span>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Today's Slips Printed</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#1b6e53] mt-1">4 Tickets</p>
          <span className="text-[10px] text-emerald-700 font-medium">700 kg intake verified</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">SMS Dispatch Rate</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a] mt-1">100%</p>
          <span className="text-[10px] text-[#6d6d6d]">Trai DLT Verified Gateway</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Vernacular IVR Calls</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#1b6e53] mt-1">4 Voice Slips</p>
          <span className="text-[10px] text-emerald-700 font-medium">Telugu audio broadcast</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Escrow Recorded Total</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#683600] mt-1">₹17,500</p>
          <span className="text-[10px] text-[#683600]">4 farmers awaiting dock delivery</span>
        </div>
      </div>

      {/* Receipts Table */}
      <div className="bg-white rounded-[24px] border border-[#c3cda7] overflow-hidden shadow-xs">
        <div className="p-6 border-b border-[#c3cda7]/40 flex items-center justify-between">
          <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
            Dockside Weighment Slips Ledger
          </h2>
          <span className="text-xs font-mono text-[#6d6d6d]">
            Rajahmundry Central Hub #04
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#c3cda7] bg-[#f1efdf]/60 text-[#6d6d6d] font-mono uppercase">
                <th className="p-4">Slip ID & Time</th>
                <th className="p-4">Farmer Details</th>
                <th className="p-4">Weight Calculation</th>
                <th className="p-4">Rate & Payable</th>
                <th className="p-4">Dual Delivery Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/40">
              {receiptsList.map((slip) => (
                <tr key={slip.slipId} className="hover:bg-[#f1efdf]/30 transition-colors">
                  <td className="p-4">
                    <span className="font-mono font-bold text-[#1b6e53] block text-sm">{slip.slipId}</span>
                    <span className="text-[10px] text-[#6d6d6d] font-mono">{slip.timestamp}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-[#00372a] block">{slip.farmerName}</span>
                    <span className="text-[10px] text-[#6d6d6d] font-mono">{slip.farmerId} • {slip.village}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-[#353535] block">
                      {slip.grossWeight} - {slip.tareWeight} = <strong className="text-[#1b6e53]">{slip.netWeight}</strong>
                    </span>
                    <span className="text-[10px] text-[#6d6d6d] font-mono">{slip.gradeAssayed}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-[#00372a] block text-sm">{slip.totalPayable}</span>
                    <span className="text-[10px] text-[#6d6d6d] font-mono">@{slip.batchRate}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-[10px] font-mono text-emerald-700 block font-semibold">✓ SMS: {slip.smsStatus}</span>
                    <span className="text-[10px] font-mono text-[#1b6e53] block">🎙 IVR: {slip.ivrCallStatus}</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handlePrintSlip(slip)}
                        className="px-3 py-1.5 rounded-full bg-[#1b6e53] text-white font-semibold text-[11px] hover:bg-[#00372a] transition flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">print</span>
                        <span>Print Slip</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Thermal Slip Simulation Modal */}
      {selectedSlip && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] border border-[#c3cda7] max-w-sm w-full p-6 space-y-4 shadow-2xl animate-fadeIn font-mono text-xs">
            <div className="border-b-2 border-dashed border-slate-300 pb-3 text-center space-y-1">
              <p className="font-bold text-sm text-[#00372a]">KRISHISETU AG-GRID</p>
              <p className="text-[10px] text-slate-500">RAJAHMUNDRY CENTRAL HUB #04</p>
              <p className="text-[10px] text-slate-500">NH-16 Bypass, East Godavari</p>
              <p className="text-[9px] text-slate-400">================================</p>
              <p className="font-bold text-[#1b6e53]">OFFICIAL WEIGHMENT TICKET</p>
            </div>

            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between"><span>Ticket No:</span><strong>{selectedSlip.ticketNo}</strong></div>
              <div className="flex justify-between"><span>Date/Time:</span><span>{selectedSlip.timestamp}</span></div>
              <div className="flex justify-between"><span>Farmer Name:</span><strong>{selectedSlip.farmerName}</strong></div>
              <div className="flex justify-between"><span>Farmer ID:</span><span>{selectedSlip.farmerId}</span></div>
              <div className="flex justify-between"><span>Village:</span><span>{selectedSlip.village}</span></div>
              <div className="flex justify-between"><span>Commodity:</span><strong>{selectedSlip.commodity}</strong></div>
              <div className="border-t border-dashed border-slate-300 my-2"></div>
              <div className="flex justify-between"><span>Gross Weight:</span><span>{selectedSlip.grossWeight}</span></div>
              <div className="flex justify-between"><span>Tare (Crates):</span><span>{selectedSlip.tareWeight}</span></div>
              <div className="flex justify-between font-bold text-[#1b6e53]"><span>Net Weight:</span><span>{selectedSlip.netWeight}</span></div>
              <div className="flex justify-between"><span>Quality Grade:</span><span>{selectedSlip.gradeAssayed}</span></div>
              <div className="flex justify-between"><span>Agreed Rate:</span><span>{selectedSlip.batchRate}</span></div>
              <div className="border-t-2 border-dashed border-slate-300 my-2 pt-1 flex justify-between font-bold text-sm text-[#00372a]">
                <span>TOTAL PAYABLE:</span>
                <span>{selectedSlip.totalPayable}</span>
              </div>
            </div>

            <div className="border-t border-dashed border-slate-300 pt-3 text-center text-[10px] text-slate-500 space-y-1">
              <p>Direct Jan Dhan Escrow Transfer</p>
              <p>Toll-Free Kisan Desk: 1800-419-7388</p>
              <p>Zero-Intermediary Guarantee</p>
            </div>

            <div className="pt-2 flex justify-between gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 rounded-full bg-[#1b6e53] text-white font-bold text-xs uppercase"
              >
                Print
              </button>
              <button
                onClick={() => setSelectedSlip(null)}
                className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 text-xs font-bold uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
