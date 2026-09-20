import React, { useState } from 'react'
import { Link } from 'react-router'

export default function HubSettings() {
  const [toastMsg, setToastMsg] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const [hubConfig, setHubConfig] = useState({
    hubName: 'Rajahmundry Central Hub #04',
    deviceId: 'HUB-DEV-AP04-RS232-9021',
    fpoFederation: 'Godavari Farmers Producer Company Limited',
    directorName: 'p.vishnu vardhan',
    directorPhone: '+91 98480 22341',
    operatingHours: '05:00 AM – 12:00 PM IST',
    location: 'NH-16 Bypass, Rajahmundry, East Godavari, AP',
    weighbridgePort: 'COM3 (Baud Rate 9600, RS-232 Auto-Tare)',
    calibrationDate: '01 September 2026 (Valid through 01 March 2027)',
    calibrationCertificate: 'CERT-WM-AP-2026-8849',
    printerModel: 'Epson TM-T88VI Thermal Receipt Printer',
    printerPort: 'USB001 / Raw ESC/POS',
    coldRoomTargetTemp: '11.5°C (Tolerance: ±1.5°C)',
    humidityTarget: '88% RH',
    iotSyncInterval: 'Every 30 seconds to Cloud Escrow',
  })

  const handleSave = (e) => {
    e.preventDefault()
    setIsEditing(false)
    setToastMsg('Hub device telemetry and calibration parameters updated successfully!')
    setTimeout(() => setToastMsg(''), 4000)
  }

  const handleRecalibrate = () => {
    setToastMsg('Electronic zero-tare calibration signal sent to Load Cell A-1 (Tare offset = 0.00 kg).')
    setTimeout(() => setToastMsg(''), 4000)
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Toast */}
      {toastMsg && (
        <div className="p-4 rounded-xl bg-[#e6ecd5] border border-[#1b6e53] text-[#1b6e53] font-semibold text-xs flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
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
              Hardware & IoT Configuration
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#00372a]">
            Hub Hardware & Sensor Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1">
            Weighbridge load cell calibration, thermal printer port settings, CV camera grading token, and cold room temperature sensors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRecalibrate}
            className="px-4 py-2.5 rounded-[100px] bg-white border border-[#c3cda7] hover:bg-[#f1efdf] text-[#00372a] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-2xs transition"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Zero-Tare Scale</span>
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            {isEditing ? 'Cancel Editing' : 'Edit Hub Settings'}
          </button>
        </div>
      </div>

      {/* Hub Hardware Form */}
      <div className="bg-white rounded-[24px] border border-[#c3cda7] p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#c3cda7]/40 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#1b6e53] text-[#e8fe85] flex items-center justify-center font-bold text-xl">
              RC
            </div>
            <div>
              <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
                {hubConfig.hubName}
              </h2>
              <p className="text-xs text-[#6d6d6d] font-mono">{hubConfig.deviceId}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full font-mono">
            ● Hardware Online (Live Synced)
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">HUB OPERATOR / DIRECTOR</label>
              <input
                disabled={!isEditing}
                type="text"
                value={hubConfig.directorName}
                onChange={(e) => setHubConfig({ ...hubConfig, directorName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">OPERATOR CONTACT</label>
              <input
                disabled={!isEditing}
                type="text"
                value={hubConfig.directorPhone}
                onChange={(e) => setHubConfig({ ...hubConfig, directorPhone: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">OPERATING INTAKE WINDOW</label>
              <input
                disabled={!isEditing}
                type="text"
                value={hubConfig.operatingHours}
                onChange={(e) => setHubConfig({ ...hubConfig, operatingHours: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">PARENT FPO FEDERATION</label>
              <input
                disabled={!isEditing}
                type="text"
                value={hubConfig.fpoFederation}
                onChange={(e) => setHubConfig({ ...hubConfig, fpoFederation: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">WEIGHBRIDGE SERIAL PORT</label>
              <input
                disabled={!isEditing}
                type="text"
                value={hubConfig.weighbridgePort}
                onChange={(e) => setHubConfig({ ...hubConfig, weighbridgePort: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">THERMAL PRINTER</label>
              <input
                disabled={!isEditing}
                type="text"
                value={hubConfig.printerModel}
                onChange={(e) => setHubConfig({ ...hubConfig, printerModel: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">COLD ROOM TARGET TEMPERATURE</label>
              <input
                disabled={!isEditing}
                type="text"
                value={hubConfig.coldRoomTargetTemp}
                onChange={(e) => setHubConfig({ ...hubConfig, coldRoomTargetTemp: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">WEIGHTS & MEASURES CALIBRATION CERT</label>
              <input
                disabled={!isEditing}
                type="text"
                value={hubConfig.calibrationCertificate}
                onChange={(e) => setHubConfig({ ...hubConfig, calibrationCertificate: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] disabled:bg-[#f1efdf]/50"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end pt-4 border-t border-[#c3cda7]/40">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-white font-bold text-xs uppercase tracking-wider"
              >
                Save Hardware Configuration
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
