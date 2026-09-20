import React, { useState } from 'react'
import { Link } from 'react-router'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'FPO Representative',
    organization: '',
    state: 'Andhra Pradesh',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#e6ecd5] border border-[#c3cda7] px-4 py-1.5 rounded-[100px] text-xs font-semibold text-[#1b6e53] uppercase tracking-widest font-mono">
          <span className="w-2 h-2 rounded-full bg-[#1b6e53]"></span>
          Support & Network Onboarding
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#00372a] tracking-tight">
          Connect with <span className="italic font-normal underline decoration-[#e8fe85] decoration-4 underline-offset-8">KrishiSetu</span>
        </h1>
        <p className="text-base sm:text-lg text-[#353535] leading-relaxed">
          Reach our agritech support desk, request hardware calibration for village hubs, or join the federated network.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-white rounded-[24px] border border-[#c3cda7] p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#e6ecd5] flex items-center justify-center text-[#1b6e53]">
                <span className="material-symbols-outlined text-[20px]">call</span>
              </div>
              <div>
                <h3 className="font-bold text-[#00372a] text-sm">Toll-Free Kisan Desk</h3>
                <p className="text-xs text-[#6d6d6d]">1800-419-7388 (24x7 Vernacular)</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#b2cee7]/40 flex items-center justify-center text-[#00372a]">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <div>
                <h3 className="font-bold text-[#00372a] text-sm">Federation Inquiries</h3>
                <p className="text-xs text-[#6d6d6d]">support@krishisetu.gov.in</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fceace]/60 flex items-center justify-center text-[#683600]">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
              </div>
              <div>
                <h3 className="font-bold text-[#00372a] text-sm">Central Hub Directorate</h3>
                <p className="text-xs text-[#6d6d6d]">AgTech Innovation Park, Hyderabad & Nashik</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1b6e53] text-white rounded-[24px] p-6 space-y-3 shadow-xs">
            <h3 className="font-editorial text-xl font-bold">Direct Portal Access</h3>
            <p className="text-xs text-[#e6ecd5] leading-relaxed">
              Already registered on the national ag-grid? Access your secure portal directly:
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/buyer/login" className="text-xs font-semibold hover:text-[#e8fe85] flex items-center justify-between py-1 border-b border-white/10">
                <span>Buyer Procurement Desk</span>
                <span>→</span>
              </Link>
              <Link to="/fpo/login" className="text-xs font-semibold hover:text-[#e8fe85] flex items-center justify-between py-1 border-b border-white/10">
                <span>FPO Federation Workspace</span>
                <span>→</span>
              </Link>
              <Link to="/hub/login" className="text-xs font-semibold hover:text-[#e8fe85] flex items-center justify-between py-1">
                <span>Physical Hub IoT Console</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Contact / Inquire Form */}
        <div className="bg-white rounded-[24px] border border-[#c3cda7] p-8 lg:col-span-2 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#e6ecd5] text-[#1b6e53] flex items-center justify-center mx-auto text-2xl">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>
              <h3 className="font-editorial text-3xl font-bold text-[#00372a]">
                Inquiry Received
              </h3>
              <p className="text-sm text-[#353535] max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name}. A regional KrishiSetu agritech coordinator has been assigned to your request and will contact you within 4 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 rounded-[100px] bg-[#1b6e53] text-white text-xs font-bold uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
                Send an Inbound Inquiry
              </h2>
              <p className="text-xs text-[#6d6d6d]">
                Fill in your details and our federation onboarding desk will assist with verification, hub hardware installation, or buyer onboarding.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#353535] mb-1">
                    YOUR NAME
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c3cda7] text-sm focus:outline-hidden focus:border-[#1b6e53]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#353535] mb-1">
                    OFFICIAL EMAIL
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rajesh@fpo.org"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c3cda7] text-sm focus:outline-hidden focus:border-[#1b6e53]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#353535] mb-1">
                    ROLE / ENTITY TYPE
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c3cda7] text-sm focus:outline-hidden focus:border-[#1b6e53] bg-white"
                  >
                    <option>FPO Representative / Director</option>
                    <option>Institutional Buyer / Food Processor</option>
                    <option>Hub Operator / Village Center</option>
                    <option>Agritech Partner / Mandi Board</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#353535] mb-1">
                    ORGANIZATION NAME
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Godavari Farmers FPO / AgroFresh"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c3cda7] text-sm focus:outline-hidden focus:border-[#1b6e53]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#353535] mb-1">
                  MESSAGE / REQUIREMENTS
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry, crop procurement volume, or hub setup request..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c3cda7] text-sm focus:outline-hidden focus:border-[#1b6e53]"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
              >
                Submit Inquiry →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
