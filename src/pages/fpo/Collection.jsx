import React, { useState } from 'react'
import { Link } from 'react-router'

export default function Collection() {
  const [filterHub, setFilterHub] = useState('All')

  const collectionCenters = [
    {
      id: 'BAY-01',
      hub: 'Rajahmundry Central Hub',
      bayName: 'Intake Bay A (Perishables)',
      currentIntakeToday: '2.4 MT',
      activeQueue: '4 Farmers in queue',
      status: 'Active Intake',
      supervisor: 'p.vishnu vardhan',
      printerStatus: '92% Thermal Roll',
      scaleStatus: 'Online (Load Cell A-1)',
    },
    {
      id: 'BAY-02',
      hub: 'Rajahmundry Central Hub',
      bayName: 'Intake Bay B (Bulk Vegetables)',
      currentIntakeToday: '1.5 MT',
      activeQueue: '2 Farmers in queue',
      status: 'Active Intake',
      supervisor: 'K. Satyanarayana',
      printerStatus: '96% Thermal Roll',
      scaleStatus: 'Online (Load Cell B-1)',
    },
    {
      id: 'BAY-03',
      hub: 'Kakinada Coastal Agri Hub',
      bayName: 'Coastal Bay 1 (Chillies & Spices)',
      currentIntakeToday: '1.8 MT',
      activeQueue: 'Clear (0 queue)',
      status: 'Operational',
      supervisor: 'M. Sriman Narayana',
      printerStatus: '88% Thermal Roll',
      scaleStatus: 'Online',
    },
    {
      id: 'BAY-04',
      hub: 'Mandapeta Grain Depot',
      bayName: 'Silo Grain Pit 1 & 2',
      currentIntakeToday: '5.2 MT',
      activeQueue: '1 Tractor Unloading',
      status: 'Active Intake',
      supervisor: 'K. Venkateswara Rao',
      printerStatus: '95% Thermal Roll',
      scaleStatus: 'Online (Platform 10T)',
    },
  ]

  const liveIntakeLog = [
    { time: '08:05 AM', slipId: 'SLIP-9904', farmer: 'Balwant Singh (FARM-004)', hub: 'Rajahmundry Central Hub', crop: 'Tomato (Hybrid)', grossWeight: '150 kg', tareWeight: '10 kg', netWeight: '140 kg', grade: 'Grade A (95%)' },
    { time: '07:40 AM', slipId: 'SLIP-9903', farmer: 'Kavita Devi (FARM-003)', hub: 'Rajahmundry Central Hub', crop: 'Tomato (Hybrid)', grossWeight: '160 kg', tareWeight: '10 kg', netWeight: '150 kg', grade: 'Grade A (97%)' },
    { time: '07:15 AM', slipId: 'SLIP-9902', farmer: 'Suresh Verma (FARM-002)', hub: 'Rajahmundry Central Hub', crop: 'Tomato (Hybrid)', grossWeight: '180 kg', tareWeight: '10 kg', netWeight: '170 kg', grade: 'Grade A (94%)' },
    { time: '06:45 AM', slipId: 'SLIP-9901', farmer: 'Ramesh Patel (FARM-001)', hub: 'Rajahmundry Central Hub', crop: 'Tomato (Hybrid)', grossWeight: '250 kg', tareWeight: '10 kg', netWeight: '240 kg', grade: 'Grade A (96%)' },
    { time: '06:30 AM', slipId: 'SLIP-9899', farmer: 'M. Venkat Reddy (FARM-005)', hub: 'Kakinada Coastal Agri Hub', crop: 'Green Chilli', grossWeight: '460 kg', tareWeight: '20 kg', netWeight: '440 kg', grade: 'Grade A (98%)' },
  ]

  const filteredBays = filterHub === 'All' ? collectionCenters : collectionCenters.filter((c) => c.hub === filterHub)

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              Intake & Bay Telemetry
            </span>
            <span className="text-[10px] font-mono text-[#6d6d6d]">
              Live Physical Hub Operations
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#00372a]">
            Village Collection Centers & Weighing Bays
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1">
            Real-time gate intake telemetry, digital load cell sync, thermal weighment slip generation, and farmer drop-off logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/hub/collection"
            className="px-4 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition"
          >
            <span className="material-symbols-outlined text-[16px]">scale</span>
            <span>Open Hub Weighbridge</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Today's Inward Total</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#1b6e53] mt-1">10.9 MT</p>
          <span className="text-[10px] text-emerald-700 font-medium">93% of planned arrivals</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Active Intake Bays</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a] mt-1">4 Bays Live</p>
          <span className="text-[10px] text-[#6d6d6d]">Across 3 hub locations</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Avg Drop-Off Speed</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#1b6e53] mt-1">1.8 Min / Slip</p>
          <span className="text-[10px] text-emerald-700 font-medium">Zero wait bottle-neck</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">SMS / Voice Sent</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#683600] mt-1">100% Broadcast</p>
          <span className="text-[10px] text-[#683600]">Instant farmer confirmations</span>
        </div>
      </div>

      {/* Bays Status Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
            Active Intake Bays Status
          </h2>
          <select
            value={filterHub}
            onChange={(e) => setFilterHub(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-[#c3cda7] bg-white text-[#353535]"
          >
            <option value="All">All Hubs</option>
            <option value="Rajahmundry Central Hub">Rajahmundry Central Hub</option>
            <option value="Kakinada Coastal Agri Hub">Kakinada Coastal Agri Hub</option>
            <option value="Mandapeta Grain Depot">Mandapeta Grain Depot</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBays.map((bay) => (
            <div
              key={bay.id}
              className="bg-white rounded-[24px] border border-[#c3cda7] p-6 space-y-4 shadow-xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold bg-[#e6ecd5] text-[#1b6e53] px-2 py-0.5 rounded-full">
                    {bay.id}
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-[#00372a] mt-1">
                    {bay.bayName}
                  </h3>
                  <p className="text-xs text-[#6d6d6d] font-mono">{bay.hub}</p>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                  ● {bay.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-[#f1efdf]/60 p-3 rounded-xl text-xs">
                <div>
                  <span className="text-[10px] text-[#6d6d6d] block font-mono">Today's Intake:</span>
                  <span className="font-bold text-[#1b6e53] text-sm">{bay.currentIntakeToday}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6d6d6d] block font-mono">Live Bay Queue:</span>
                  <span className="font-bold text-[#00372a]">{bay.activeQueue}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#353535] border-t border-[#c3cda7]/40 pt-3">
                <p><strong>Bay Supervisor:</strong> {bay.supervisor}</p>
                <p><strong>Scale Sensor:</strong> {bay.scaleStatus}</p>
                <p><strong>Thermal Printer:</strong> <span className="text-emerald-700 font-mono font-semibold">{bay.printerStatus}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Intake Log */}
      <div className="bg-white rounded-[24px] border border-[#c3cda7] p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
              Today's Live Weighment Slip Audit Log
            </h2>
            <p className="text-xs text-[#6d6d6d]">Dual-channel verified slip recordings with gross and tare electronic measurements.</p>
          </div>
          <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-bold">
            Live Stream Sync
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#c3cda7] bg-[#f1efdf] text-[#6d6d6d] font-mono uppercase">
                <th className="p-3">Time</th>
                <th className="p-3">Slip ID</th>
                <th className="p-3">Farmer Name</th>
                <th className="p-3">Hub & Commodity</th>
                <th className="p-3">Gross / Tare / Net</th>
                <th className="p-3">Assayed Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3cda7]/40">
              {liveIntakeLog.map((log) => (
                <tr key={log.slipId} className="hover:bg-[#f1efdf]/30">
                  <td className="p-3 font-mono text-[#6d6d6d]">{log.time}</td>
                  <td className="p-3 font-mono font-bold text-[#1b6e53]">{log.slipId}</td>
                  <td className="p-3 font-semibold text-[#00372a]">{log.farmer}</td>
                  <td className="p-3">
                    <span className="block font-medium">{log.crop}</span>
                    <span className="text-[10px] text-[#6d6d6d] font-mono">{log.hub}</span>
                  </td>
                  <td className="p-3 font-mono">
                    {log.grossWeight} - {log.tareWeight} = <strong className="text-[#1b6e53]">{log.netWeight}</strong>
                  </td>
                  <td className="p-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e6ecd5] text-[#1b6e53] font-mono">
                      {log.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
