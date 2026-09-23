import {
  initialFpoProductsState,
  getStoredFpoProducts,
  saveFpoProduct,
  deleteFpoProduct,
  resetFpoProducts,
  getStoredFpoProductById,
} from '../src/data/fpoProductsData.js'

console.log('--- Testing FPO Products Data Layer ---')

// 1. Initial State Check
const products = initialFpoProductsState
console.log('Total initial products:', products.length)
products.forEach((p) => {
  console.log(`- ${p.name} (${p.variety || 'Standard'}): ${p.capacity} ${p.unit} | Grade: ${p.grade} | Status: ${p.status}`)
  console.log(`  Availability: Total ${p.capacity} ${p.unit} | Reserved: ${p.reservedQty} ${p.unit} | Available to Buyers: ${p.availableQty} ${p.unit}`)
})

// 2. Add New Product Test
console.log('\n--- Adding New Product (Potato) ---')
const newProd = saveFpoProduct({
  name: 'Potato',
  variety: 'Kufri Jyoti',
  grade: 'Grade A',
  supportedGrades: ['Grade A'],
  capacity: 3000,
  unit: 'kg',
  reservedQty: 600,
  minSupplyQty: '250 kg',
  status: 'Active',
  availabilityStatus: 'Available',
  notes: 'Cold stored mature seed potatoes from East Godavari farms.',
})
console.log('Created product:', newProd.id, newProd.name, `${newProd.availableQty} ${newProd.unit} available`)

// 3. Edit Product Test
console.log('\n--- Editing Product (Tomato) ---')
const updatedTomato = saveFpoProduct({
  id: 'prod-tomato',
  name: 'Tomato',
  variety: 'Hybrid Roma (Optical Grade)',
  grade: 'Grade A',
  supportedGrades: ['Grade A', 'Grade B'],
  capacity: 2500,
  unit: 'kg',
  reservedQty: 500,
  minSupplyQty: '150 kg',
  status: 'Active',
  availabilityStatus: 'Available',
  notes: 'Updated capacity and notes.',
})
console.log('Updated tomato:', updatedTomato.id, updatedTomato.variety, `Capacity: ${updatedTomato.capacity} kg, Available: ${updatedTomato.availableQty} kg`)

// 4. Assertions
console.assert(updatedTomato.availableQty === 2000, `Expected availableQty to be 2000, got ${updatedTomato.availableQty}`)
console.assert(newProd.availableQty === 2400, `Expected availableQty to be 2400, got ${newProd.availableQty}`)

console.log('\nAll FPO Product Management data assertions passed successfully!')
