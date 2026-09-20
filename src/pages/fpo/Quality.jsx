import React, { useState } from 'react'
import { Link } from 'react-router'

export default function Quality() {
  const [selectedBatch, setSelectedBatch] = useState(null)

  const qualityBatches = [
    {
      batchId: 'BATCH-TM-902',
      commodity: 'Hybrid Tomato',
      hub: 'Rajahmundry Central Hub',
      sampleSize: '50 kg random draw',
      gradeA: '94.2%',
      gradeB: '4.6%',
      rejected: '1.2%',
      overallGrade: 'Grade A Certified',
      inspector: 'CV Optical Assay Model V3 (Validated by QA Officer)',
      inspectedAt: 'Today, 08:30 AM',
      parameters: {
        colorUniformity: '88% Deep Red (>85% standard)',
        firmnessScore: '4.8 kg/cm² (Target > 4.5)',
        surfaceBlemish: '1.2% (Tolerance < 2.5%)',
        moistureContent: '89.4%',
        avgDiameter: '58 mm',
      },
      status: 'Approved for Institutional Dispatch',
    },
    {
      batchId: 'BATCH-CH-412',
      commodity: 'Green Chilli (G-4)',
      hub: 'Kakinada Coastal Agri Hub',
      sampleSize: '25 kg draw',
      gradeA: '97.5%',
      gradeB: '2.0%',
      rejected: '0.5%',
      overallGrade: 'Grade A Certified',
      inspector: 'Digital Scoville & Optical Sizer',
      inspectedAt: 'Yesterday, 09:15 AM',
      parameters: {
        colorUniformity: '96% Vibrant Dark Green',
        lengthUniformity: '8.2 cm avg (Target 7-9 cm)',
        surfaceBlemish: '0.5% (Tolerance < 1.5%)',
        moistureContent: '12.1%',
        pungencyRating: 'High (>42,000 SHU)',
      },
      status: 'Approved for Institutional Dispatch',
    },
    {
      batchId: 'BATCH-WT-109',
      commodity: 'Sharbati Wheat',
      hub: 'Mandapeta Grain Depot',
      sampleSize: '10 kg moisture probe',
      gradeA: '98.8%',
      gradeB: '1.0%',
      rejected: '0.2%',
      overallGrade: 'Milling Grade A',
      inspector: 'Dielectric Moisture Analyzer #M-88',
      inspectedAt: '03 Sep 2026',
      parameters: {
        moistureContent: '11.2% (Max threshold: 12.0%)',
        foreignMatter: '0.3% (Max tolerance: 0.8%)',
        proteinContent: '13.1%',
        shriveledGrains: '0.4%',
        hectorLiterWeight: '79.5 kg/hL',
      },
      status: 'Silo Certified & Dispatched',
    },
  ]

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              Assay & Quality Control
            </span>
            <span className="text-[10px] font-mono text-[#6d6d6d]">
              Computer-Vision Objective Grading
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#00372a]">
            Quality Assurance & Optical Assay Logs
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1">
            Automated visual grading, moisture metrics, electronic refractometer readings, and digital assay certificates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/hub/quality"
            className="px-4 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition"
          >
            <span className="material-symbols-outlined text-[16px]">science</span>
            <span>Launch Hub Assay Tool</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Avg Grade A Yield</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#1b6e53] mt-1">96.8%</p>
          <span className="text-[10px] text-emerald-700 font-medium">+2.4% above seasonal baseline</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Inspected Batches</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a] mt-1">128 Batches</p>
          <span className="text-[10px] text-[#6d6d6d]">This harvest cycle</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Rejection Rate</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#1b6e53] mt-1">&lt; 0.9%</p>
          <span className="text-[10px] text-emerald-700 font-medium">Near-zero field loss</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Buyer QA Acceptance</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#683600] mt-1">99.4%</p>
          <span className="text-[10px] text-[#683600]">Zero dockside disputes</span>
        </div>
      </div>

      {/* Batch Quality Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {qualityBatches.map((batch) => (
          <div
            key={batch.batchId}
            className="bg-white rounded-[24px] border border-[#c3cda7] p-6 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold bg-[#e6ecd5] text-[#1b6e53] px-2 py-0.5 rounded-full">
                    {batch.batchId}
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-[#00372a] mt-1">
                    {batch.commodity}
                  </h3>
                  <p className="text-xs text-[#6d6d6d] font-mono">{batch.hub}</p>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                  {batch.overallGrade}
                </span>
              </div>

              {/* Visual Grade Distribution Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#1b6e53] font-bold">Grade A: {batch.gradeA}</span>
                  <span className="text-amber-700">Grade B: {batch.gradeB}</span>
                  <span className="text-red-700">Rej: {batch.rejected}</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div style={{ width: batch.gradeA }} className="bg-[#1b6e53]"></div>
                  <div style={{ width: batch.gradeB }} className="bg-amber-400"></div>
                  <div style={{ width: batch.rejected }} className="bg-red-400"></div>
                </div>
              </div>

              <div className="bg-[#f1efdf]/60 p-3 rounded-xl space-y-1.5 text-xs text-[#353535]">
                <p><strong>Inspection Tool:</strong> {batch.inspector}</p>
                <p><strong>Sample Size:</strong> {batch.sampleSize}</p>
                <p><strong>Timestamp:</strong> {batch.inspectedAt}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#c3cda7]/40 flex items-center justify-between">
              <button
                onClick={() => setSelectedBatch(batch)}
                className="text-xs font-bold text-[#1b6e53] hover:underline flex items-center gap-1"
              >
                <span>View Full Assay Certificate</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Assay Certificate Modal */}
      {selectedBatch && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] border border-[#c3cda7] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
            <div className="flex items-start justify-between border-b border-[#c3cda7]/60 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#6d6d6d] uppercase">Digital Quality Certificate</span>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  {selectedBatch.batchId} — {selectedBatch.commodity}
                </h3>
                <p className="text-xs text-[#6d6d6d] font-mono">{selectedBatch.hub} • {selectedBatch.inspectedAt}</p>
              </div>
              <button
                onClick={() => setSelectedBatch(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-[#e6ecd5] p-3 rounded-xl flex items-center justify-between">
                <span className="font-bold text-[#1b6e53]">Certified Overall Grade:</span>
                <span className="text-sm font-bold text-[#1b6e53] font-mono">{selectedBatch.overallGrade}</span>
              </div>

              <h4 className="font-mono font-bold text-[#1b6e53] uppercase tracking-wider text-[11px]">
                Detailed Laboratory & Sensor Parameters
              </h4>
              <div className="grid grid-cols-2 gap-3 bg-[#f1efdf] p-4 rounded-xl">
                {Object.entries(selectedBatch.parameters).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-[10px] text-[#6d6d6d] uppercase font-mono block capitalize">{key}:</span>
                    <span className="font-semibold text-[#00372a]">{val}</span>
                  </div>
                ))}
              </div>

              <div className="border border-[#c3cda7] p-3 rounded-xl text-center space-y-1">
                <span className="material-symbols-outlined text-[24px] text-[#1b6e53]">verified</span>
                <p className="font-bold text-[#00372a]">Digitally Signed by FPO Quality System</p>
                <p className="text-[10px] text-[#6d6d6d] font-mono">Hash: 8f9b4c21e0a47d3298a12bf99c</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedBatch(null)}
                className="px-6 py-2.5 rounded-[100px] bg-[#1b6e53] text-white font-bold text-xs uppercase"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
