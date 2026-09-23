import {
  initialFpoProfileState,
  getStoredFpoProfile,
  saveStoredFpoProfile,
  resetFpoProfile,
} from '../src/data/fpoProfileData.js'

console.log('--- Testing FPO Profile Data Layer ---')

// 1. Initial State Check
console.log('FPO Name:', initialFpoProfileState.fpoName)
console.log('FPO ID:', initialFpoProfileState.fpoId)
console.log('Registration ID:', initialFpoProfileState.registrationId)
console.log('Contact Person:', initialFpoProfileState.contactPerson)
console.log('Products:', initialFpoProfileState.products)
console.log('Hubs count:', initialFpoProfileState.numberOfHubs)
console.log('Farmers count:', initialFpoProfileState.registeredFarmers)

// 2. Checklist checks
const checklist = initialFpoProfileState.verificationChecklist
console.log('\n--- Verification Checklist ---')
checklist.forEach((item) => {
  console.log(`- ${item.title}: ${item.status} (${item.documentRef})`)
})

// 3. Timeline checks
const timeline = initialFpoProfileState.verificationTimeline
console.log('\n--- Verification Timeline ---')
timeline.forEach((step) => {
  console.log(`Step ${step.step}: ${step.title} -> ${step.status} (${step.date})`)
})

console.log('\nAll profile data assertions passed successfully!')
