import React, { useState } from 'react'

export default function Products() {
  const [activeTab, setActiveTab] = useState('catalog')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [toastMsg, setToastMsg] = useState('')

  const [productsList, setProductsList] = useState([
    {
      id: 'PROD-01',
      crop: 'Hybrid Tomato (Grade A)',
      variety: 'Abhinav / US-440',
      season: 'Kharif & Rabi (Year-Round)',
      availableStock: '14.5 MT',
      weeklyCapacity: '6.0 MT',
      minOrderQty: '500 kg',
      basePrice: '₹22 - ₹28 / kg',
      primaryHub: 'Rajahmundry Central Hub',
      storageType: 'Cold Room (10-12°C)',
      shelfLife: '7 - 10 Days',
      status: 'Active Supply',
      specs: {
        color: 'Deep Red (>85% Uniform)',
        firmness: 'High (Pressure > 4.5 kg/cm²)',
        moistureTolerance: '< 92%',
        defectAllowance: '< 2.5% max',
      },
    },
    {
      id: 'PROD-02',
      crop: 'Green Chilli (Grade A)',
      variety: 'G-4 / Teja Hybrid',
      season: 'Year-Round Harvest',
      availableStock: '6.2 MT',
      weeklyCapacity: '2.5 MT',
      minOrderQty: '250 kg',
      basePrice: '₹35 - ₹42 / kg',
      primaryHub: 'Kakinada Agri Hub',
      storageType: 'Ventilated Dry / Chilled',
      shelfLife: '12 - 14 Days',
      status: 'Active Supply',
      specs: {
        color: 'Vibrant Dark Green',
        length: '7 - 9 cm avg',
        pungency: 'High (SHU > 40,000)',
        defectAllowance: '< 1.5% max',
      },
    },
    {
      id: 'PROD-03',
      crop: 'Onion Red (Medium)',
      variety: 'Nashik Red Hybrid',
      season: 'Late Rabi & Kharif',
      availableStock: '28.0 MT',
      weeklyCapacity: '12.0 MT',
      minOrderQty: '1,000 kg',
      basePrice: '₹18 - ₹24 / kg',
      primaryHub: 'Rajahmundry Central Hub',
      storageType: 'Dry Ambient Aerated',
      shelfLife: '30 - 45 Days',
      status: 'Active Supply',
      specs: {
        size: '45 - 60 mm diameter',
        dryMatter: '> 13%',
        sprouting: '0% Nil',
        defectAllowance: '< 3.0% max',
      },
    },
    {
      id: 'PROD-04',
      crop: 'Sharbati Wheat (Milling Grade)',
      variety: 'C-306 / MP Sharbati',
      season: 'Rabi Harvest',
      availableStock: '85.0 MT',
      weeklyCapacity: '20.0 MT',
      minOrderQty: '2,500 kg',
      basePrice: '₹26.50 / kg',
      primaryHub: 'Mandapeta Collection Center',
      storageType: 'Silo / Moisture Hermetic',
      shelfLife: '12 Months',
      status: 'Ready in Silos',
      specs: {
        moisture: '< 11.5%',
        foreignMatter: '< 0.5%',
        protein: '> 12.8%',
        grainLuster: 'Golden Amber',
      },
    },
    {
      id: 'PROD-05',
      crop: 'Mustard Seeds (High Oil)',
      variety: 'Pusa Bold',
      season: 'Rabi Harvest',
      availableStock: '32.0 MT',
      weeklyCapacity: '8.0 MT',
      minOrderQty: '1,000 kg',
      basePrice: '₹51.00 / kg',
      primaryHub: 'Mandapeta Collection Center',
      storageType: 'Hermetic Bagged Storage',
      shelfLife: '18 Months',
      status: 'Ready in Silos',
      specs: {
        oilContent: '> 41.5%',
        moisture: '< 7.8%',
        foreignMatter: '< 0.8%',
        erucicAcid: 'Standard Tier 1',
      },
    },
    {
      id: 'PROD-06',
      crop: 'Sweet Corn (Grade A)',
      variety: 'Sugar-75',
      season: 'Kharif Window',
      availableStock: '8.4 MT',
      weeklyCapacity: '3.0 MT',
      minOrderQty: '500 kg',
      basePrice: '₹16 - ₹20 / kg',
      primaryHub: 'Rajahmundry Central Hub',
      storageType: 'Hydrocooled (< 4°C)',
      shelfLife: '5 - 7 Days',
      status: 'Upcoming Harvest',
      specs: {
        brixSugar: '> 14.5° Brix',
        cobLength: '> 18 cm',
        tipFill: 'Complete (>95%)',
        defectAllowance: '< 2.0% max',
      },
    },
  ])

  const [newProd, setNewProd] = useState({
    crop: '',
    variety: '',
    season: 'Year-Round',
    availableStock: '',
    weeklyCapacity: '',
    minOrderQty: '',
    basePrice: '',
    primaryHub: 'Rajahmundry Central Hub',
    storageType: 'Cold Room (10-12°C)',
  })

  const handleAddProduct = (e) => {
    e.preventDefault()
    const product = {
      id: `PROD-0${productsList.length + 1}`,
      crop: newProd.crop,
      variety: newProd.variety,
      season: newProd.season,
      availableStock: `${newProd.availableStock} MT`,
      weeklyCapacity: `${newProd.weeklyCapacity} MT`,
      minOrderQty: `${newProd.minOrderQty} kg`,
      basePrice: newProd.basePrice,
      primaryHub: newProd.primaryHub,
      storageType: newProd.storageType,
      shelfLife: '14 Days',
      status: 'Active Supply',
      specs: {
        qualityTier: 'Grade A Certified',
        defectAllowance: '< 2.0% max',
      },
    }

    setProductsList([product, ...productsList])
    setShowAddModal(false)
    setToastMsg(`Successfully registered "${newProd.crop}" to FPO supply catalog!`)
    setTimeout(() => setToastMsg(''), 4000)
    setNewProd({
      crop: '',
      variety: '',
      season: 'Year-Round',
      availableStock: '',
      weeklyCapacity: '',
      minOrderQty: '',
      basePrice: '',
      primaryHub: 'Rajahmundry Central Hub',
      storageType: 'Cold Room (10-12°C)',
    })
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

      {/* 1. Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#c3cda7]/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1b6e53] font-bold bg-[#e6ecd5] px-3 py-0.5 rounded-[100px] border border-[#c3cda7]">
              FPO Commodity Catalog
            </span>
            <span className="text-[10px] font-mono text-[#6d6d6d]">
              6 Certified Produce Lines
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#00372a]">
            Products We Supply
          </h1>
          <p className="text-xs sm:text-sm text-[#6d6d6d] mt-1">
            Aggregated crop varieties, seasonal availability schedules, quality grade benchmarks, and hub distribution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white rounded-full p-1 border border-[#c3cda7]">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition ${
                activeTab === 'catalog'
                  ? 'bg-[#1b6e53] text-white'
                  : 'text-[#353535] hover:text-[#1b6e53]'
              }`}
            >
              Product Catalog
            </button>
            <button
              onClick={() => setActiveTab('availability')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition ${
                activeTab === 'availability'
                  ? 'bg-[#1b6e53] text-white'
                  : 'text-[#353535] hover:text-[#1b6e53]'
              }`}
            >
              Seasonal Calendar
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-[100px] bg-[#1b6e53] hover:bg-[#00372a] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Total Aggregated Stock</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#1b6e53] mt-1">174.1 MT</p>
          <span className="text-[10px] text-emerald-700 font-medium">Ready across 4 hubs</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Weekly Inward Capacity</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#00372a] mt-1">51.5 MT</p>
          <span className="text-[10px] text-[#6d6d6d]">From 42 farmer clusters</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Grade A Fulfillment Rate</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#1b6e53] mt-1">98.2%</p>
          <span className="text-[10px] text-emerald-700 font-medium">CV Optical Assay Pass</span>
        </div>
        <div className="bg-white rounded-[20px] p-5 border border-[#c3cda7] shadow-2xs">
          <p className="text-[10px] font-mono uppercase text-[#6d6d6d] tracking-wider">Active Buyers Sourcing</p>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#683600] mt-1">8 Enterprise</p>
          <span className="text-[10px] text-[#683600]">AgroFresh, Reliance, BigBasket</span>
        </div>
      </div>

      {/* Tab 1: Catalog */}
      {activeTab === 'catalog' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsList.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-[24px] border border-[#c3cda7] p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#6d6d6d] uppercase">{p.id}</span>
                    <h3 className="font-editorial text-xl font-bold text-[#00372a] group-hover:text-[#1b6e53] transition-colors">
                      {p.crop}
                    </h3>
                    <p className="text-xs text-[#6d6d6d] font-mono">{p.variety}</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#e6ecd5] text-[#1b6e53] font-mono">
                    {p.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-[#f1efdf]/60 rounded-xl p-3 text-xs">
                  <div>
                    <span className="text-[10px] text-[#6d6d6d] block font-mono">Available Stock:</span>
                    <span className="font-bold text-[#1b6e53]">{p.availableStock}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6d6d6d] block font-mono">Weekly Flow:</span>
                    <span className="font-bold text-[#00372a]">{p.weeklyCapacity}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6d6d6d] block font-mono">Base Price:</span>
                    <span className="font-bold text-[#00372a]">{p.basePrice}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6d6d6d] block font-mono">Min Order:</span>
                    <span className="font-medium text-[#353535]">{p.minOrderQty}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#353535]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#1b6e53]">hub</span>
                    <span>Primary Hub: <strong>{p.primaryHub}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#1b6e53]">ac_unit</span>
                    <span>Storage: <strong>{p.storageType}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#1b6e53]">calendar_today</span>
                    <span>Season: <strong>{p.season}</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#c3cda7]/40 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProduct(p)}
                  className="text-xs font-bold text-[#1b6e53] hover:underline flex items-center gap-1"
                >
                  <span>View Specifications</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
                <span className="text-[10px] text-[#6d6d6d] font-mono">Shelf Life: {p.shelfLife}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Availability Calendar */}
      {activeTab === 'availability' && (
        <div className="bg-white rounded-[24px] border border-[#c3cda7] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="font-editorial text-2xl font-bold text-[#00372a]">
              Seasonal Harvest & Availability Matrix (2026)
            </h2>
            <span className="text-xs font-mono text-[#1b6e53] bg-[#e6ecd5] px-3 py-1 rounded-full font-semibold">
              Live Crop Forecast
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#c3cda7] text-[#6d6d6d] font-mono uppercase bg-[#f1efdf]/50">
                  <th className="p-3">Crop / Variety</th>
                  <th className="p-3">Primary Hub</th>
                  <th className="p-2 text-center">Jan-Feb</th>
                  <th className="p-2 text-center">Mar-Apr</th>
                  <th className="p-2 text-center">May-Jun</th>
                  <th className="p-2 text-center bg-[#e6ecd5]/50 text-[#1b6e53] font-bold">Jul-Aug</th>
                  <th className="p-2 text-center bg-[#e8fe85]/40 text-[#1b6e53] font-bold">Sep-Oct (Current)</th>
                  <th className="p-2 text-center">Nov-Dec</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c3cda7]/40">
                {productsList.map((p) => (
                  <tr key={p.id} className="hover:bg-[#f1efdf]/30">
                    <td className="p-3 font-semibold text-[#00372a]">{p.crop}</td>
                    <td className="p-3 text-[#6d6d6d]">{p.primaryHub}</td>
                    <td className="p-2 text-center"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">Peak</span></td>
                    <td className="p-2 text-center"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">Peak</span></td>
                    <td className="p-2 text-center"><span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px]">Moderate</span></td>
                    <td className="p-2 text-center bg-[#e6ecd5]/30"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">Peak</span></td>
                    <td className="p-2 text-center bg-[#e8fe85]/20"><span className="px-2.5 py-1 rounded-full bg-[#1b6e53] text-[#e8fe85] text-[10px] font-bold">Harvest Now</span></td>
                    <td className="p-2 text-center"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">Peak</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Spec Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] border border-[#c3cda7] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
            <div className="flex items-start justify-between border-b border-[#c3cda7]/60 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#6d6d6d] uppercase">{selectedProduct.id}</span>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  {selectedProduct.crop}
                </h3>
                <p className="text-xs text-[#6d6d6d] font-mono">{selectedProduct.variety}</p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <h4 className="font-mono font-bold text-[#1b6e53] uppercase tracking-wider text-[11px]">
                Quality & Grading Specifications
              </h4>
              <div className="grid grid-cols-2 gap-3 bg-[#f1efdf] p-4 rounded-xl">
                {Object.entries(selectedProduct.specs).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-[10px] text-[#6d6d6d] uppercase font-mono block capitalize">{key}:</span>
                    <span className="font-semibold text-[#00372a]">{val}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-[#c3cda7]/40 pt-3">
                <p><strong>Primary Physical Hub:</strong> {selectedProduct.primaryHub}</p>
                <p><strong>Cold Chain & Storage:</strong> {selectedProduct.storageType}</p>
                <p><strong>Shelf Life Guarantee:</strong> {selectedProduct.shelfLife}</p>
                <p><strong>Minimum Order Quantity:</strong> {selectedProduct.minOrderQty}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-6 py-2.5 rounded-[100px] bg-[#1b6e53] text-white font-bold text-xs uppercase"
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] border border-[#c3cda7] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
            <div className="flex items-start justify-between border-b border-[#c3cda7]/60 pb-4">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#00372a]">
                  Add Product to FPO Catalog
                </h3>
                <p className="text-xs text-[#6d6d6d]">Register an aggregated commodity for institutional buyer tenders</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">CROP NAME</label>
                  <input
                    required
                    type="text"
                    value={newProd.crop}
                    onChange={(e) => setNewProd({ ...newProd, crop: e.target.value })}
                    placeholder="e.g. Soyabean (Yellow)"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">VARIETY</label>
                  <input
                    required
                    type="text"
                    value={newProd.variety}
                    onChange={(e) => setNewProd({ ...newProd, variety: e.target.value })}
                    placeholder="e.g. JS-335 Grade A"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">AVAILABLE STOCK (MT)</label>
                  <input
                    required
                    type="number"
                    value={newProd.availableStock}
                    onChange={(e) => setNewProd({ ...newProd, availableStock: e.target.value })}
                    placeholder="e.g. 25"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">WEEKLY FLOW (MT)</label>
                  <input
                    required
                    type="number"
                    value={newProd.weeklyCapacity}
                    onChange={(e) => setNewProd({ ...newProd, weeklyCapacity: e.target.value })}
                    placeholder="e.g. 5"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">BASE PRICE</label>
                  <input
                    required
                    type="text"
                    value={newProd.basePrice}
                    onChange={(e) => setNewProd({ ...newProd, basePrice: e.target.value })}
                    placeholder="e.g. ₹42 - ₹48 / kg"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#353535] mb-1">PRIMARY HUB</label>
                  <select
                    value={newProd.primaryHub}
                    onChange={(e) => setNewProd({ ...newProd, primaryHub: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#c3cda7] bg-white"
                  >
                    <option>Rajahmundry Central Hub</option>
                    <option>Kakinada Agri Hub</option>
                    <option>Mandapeta Collection Center</option>
                    <option>Ravulapalem Fruit Hub</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#c3cda7]/40">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full border border-[#c3cda7] text-xs font-semibold text-[#6d6d6d]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#1b6e53] hover:bg-[#00372a] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
