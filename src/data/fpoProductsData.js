/**
 * FARMLINK — FPO PRODUCTS DATA LAYER (BATCH A2)
 * Mock data & localStorage persistence for FPO Product Management:
 * Products We Supply -> Add Product -> Product Details -> Availability Breakdown
 */

export const FPO_PRODUCTS_STORAGE_KEY = 'farmlink_fpo_products_state_v1'

export const initialFpoProductsState = [
  {
    id: 'prod-tomato',
    name: 'Tomato',
    variety: 'Hybrid Roma',
    grade: 'Grade A',
    supportedGrades: ['Grade A', 'Grade B'],
    capacity: 1500,
    unit: 'kg',
    reservedQty: 400,
    availableQty: 1100,
    minSupplyQty: '100 kg',
    status: 'Active',
    availabilityStatus: 'Available',
    lastUpdated: 'Today, 07:30 AM',
    notes: 'High-solids Roma tomatoes, optically sorted for institutional catering and processing.',
  },
  {
    id: 'prod-onion',
    name: 'Onion',
    variety: 'Nasik Red',
    grade: 'Grade A',
    supportedGrades: ['Grade A', 'Grade B'],
    capacity: 2000,
    unit: 'kg',
    reservedQty: 500,
    availableQty: 1500,
    minSupplyQty: '200 kg',
    status: 'Active',
    availabilityStatus: 'Available',
    lastUpdated: 'Today, 06:45 AM',
    notes: 'Cured medium-to-large red bulbs with 45+ mm caliber, packed in breathable 50kg jute sacks.',
  },
  {
    id: 'prod-green-chilli',
    name: 'Green Chilli',
    variety: 'G4',
    grade: 'Grade A',
    supportedGrades: ['Grade A'],
    capacity: 800,
    unit: 'kg',
    reservedQty: 150,
    availableQty: 650,
    minSupplyQty: '50 kg',
    status: 'Active',
    availabilityStatus: 'Available',
    lastUpdated: 'Yesterday',
    notes: 'Dark green pungent pods with high capsaicin content and 14°C cold-chain dispatch guarantee.',
  },
  {
    id: 'prod-rice',
    name: 'Rice',
    variety: 'BPT 5204 (Sona Masoori)',
    grade: 'Grade A',
    supportedGrades: ['Grade A'],
    capacity: 5000,
    unit: 'kg',
    reservedQty: 1000,
    availableQty: 4000,
    minSupplyQty: '500 kg',
    status: 'Active',
    availabilityStatus: 'Available',
    lastUpdated: '2 days ago',
    notes: 'Aged single-origin raw rice from Godavari basin, moisture level under 12%, double polished.',
  },
]

/**
 * Retrieves all FPO products from localStorage, or initializes with defaults.
 */
export function getStoredFpoProducts() {
  if (typeof window === 'undefined') {
    return initialFpoProductsState
  }
  try {
    const raw = localStorage.getItem(FPO_PRODUCTS_STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(FPO_PRODUCTS_STORAGE_KEY, JSON.stringify(initialFpoProductsState))
      return initialFpoProductsState
    }
    return JSON.parse(raw)
  } catch (err) {
    console.error('Failed to read FPO products from localStorage:', err)
    return initialFpoProductsState
  }
}

/**
 * Retrieves a single FPO product by ID.
 */
export function getStoredFpoProductById(id) {
  const products = getStoredFpoProducts()
  return products.find((p) => p.id === id) || null
}

/**
 * Saves (creates or updates) an FPO product and notifies listeners.
 */
export function saveFpoProduct(productData) {
  const products = getStoredFpoProducts()
  const existingIndex = products.findIndex((p) => p.id === productData.id)

  const capacityVal = Number(productData.capacity) || 0
  const reservedVal = Number(productData.reservedQty) || (existingIndex >= 0 ? products[existingIndex].reservedQty : 0)
  const availableVal = Math.max(0, capacityVal - reservedVal)

  const formattedProduct = {
    ...productData,
    capacity: capacityVal,
    reservedQty: reservedVal,
    availableQty: availableVal,
    lastUpdated: 'Just now',
    status: productData.status || 'Active',
    availabilityStatus: productData.availabilityStatus || 'Available',
  }

  let updatedList
  if (existingIndex >= 0) {
    updatedList = [...products]
    updatedList[existingIndex] = {
      ...products[existingIndex],
      ...formattedProduct,
    }
  } else {
    // Generate slug-based ID
    const newId = productData.id || `prod-${productData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`
    formattedProduct.id = newId
    updatedList = [formattedProduct, ...products]
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(FPO_PRODUCTS_STORAGE_KEY, JSON.stringify(updatedList))
      window.dispatchEvent(new Event('farmlink-fpo-products-updated'))
      window.dispatchEvent(new Event('storage'))
    } catch (err) {
      console.error('Failed to save FPO product to localStorage:', err)
    }
  }

  return formattedProduct
}

/**
 * Deletes an FPO product by ID.
 */
export function deleteFpoProduct(id) {
  const products = getStoredFpoProducts()
  const updatedList = products.filter((p) => p.id !== id)
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(FPO_PRODUCTS_STORAGE_KEY, JSON.stringify(updatedList))
      window.dispatchEvent(new Event('farmlink-fpo-products-updated'))
      window.dispatchEvent(new Event('storage'))
    } catch (err) {
      console.error('Failed to delete FPO product:', err)
    }
  }
  return updatedList
}

/**
 * Resets FPO products to initial state.
 */
export function resetFpoProducts() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(FPO_PRODUCTS_STORAGE_KEY, JSON.stringify(initialFpoProductsState))
      window.dispatchEvent(new Event('farmlink-fpo-products-updated'))
      window.dispatchEvent(new Event('storage'))
    } catch (err) {
      console.error('Failed to reset FPO products:', err)
    }
  }
  return initialFpoProductsState
}
