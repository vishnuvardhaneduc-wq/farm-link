/**
 * FARMLINK — FPO PROFILE DATA LAYER (BATCH A1)
 * Mock data & localStorage persistence for FPO Profile, Edit Profile, and Verification Status.
 */

export const FPO_PROFILE_STORAGE_KEY = 'farmlink_fpo_profile_state_v1'

export const initialFpoProfileState = {
  // Core Identifiers (System-locked)
  fpoId: 'FPO-00124',
  registrationId: 'FPO-REG-2026-00124',

  // Basic Information
  fpoName: 'Godavari Farmers FPO',
  establishedYear: '2026',
  status: 'Active',
  description:
    'Godavari Farmers Producer Organization is a farmer-owned collective uniting 124 smallholder producers across East Godavari. We aggregate export-grade horticulture produce with direct APMC-linked market access, automated weighbridge grading, and instant escrow settlements.',
  website: 'https://godavarifarmers.example',

  // Contact Information
  contactPerson: 'Ravi Kumar',
  phoneNumber: '+91 98480 12345',
  emailAddress: 'contact@godavarifpo.example',
  state: 'Andhra Pradesh',
  district: 'East Godavari',
  primaryOperatingArea: 'East Godavari',
  address: 'Main Road, Near APMC Market Yard, Rajamahendravaram, Andhra Pradesh 533101',

  // Operating Summary Information
  serviceArea: 'East Godavari',
  registeredFarmers: 124,
  numberOfHubs: 3,
  products: ['Tomato', 'Onion', 'Green Chilli', 'Rice'],

  // Hub network summary
  hubs: [
    {
      id: 'HUB-A',
      name: 'Rajahmundry Central Hub',
      shortName: 'Hub A',
      location: 'Rajamahendravaram, East Godavari',
      capacity: '5,000 kg / day',
      farmers: 42,
      status: 'Active',
    },
    {
      id: 'HUB-B',
      name: 'Kakinada Collection Hub',
      shortName: 'Hub B',
      location: 'Kakinada Port Belt, East Godavari',
      capacity: '3,500 kg / day',
      farmers: 28,
      status: 'Active',
    },
    {
      id: 'HUB-C',
      name: 'Eluru Rural Hub',
      shortName: 'Hub C',
      location: 'Eluru Cluster, West Godavari',
      capacity: '4,000 kg / day',
      farmers: 19,
      status: 'Active',
    },
  ],

  // Verification Data
  verificationOverview: {
    status: 'Verified', // 'Verified' | 'Pending'
    readiness: 'Account Active & Trading',
    lastVerifiedDate: '22 Jan 2026',
    verifiedItemsCount: 4,
    totalItemsCount: 5,
  },

  verificationChecklist: [
    {
      id: 'fpo-reg',
      title: 'FPO Registration',
      category: 'Legal & Incorporation',
      status: 'Verified',
      statusBadgeStyle: 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]',
      verifiedDate: '12 Jan 2026',
      documentRef: 'FPO-REG-2026-00124',
      description: 'Incorporated under Companies Act & certified by SFAC / APMC State Federation.',
      icon: 'verified_user',
    },
    {
      id: 'org-details',
      title: 'Organization Details',
      category: 'Governance & Board',
      status: 'Verified',
      statusBadgeStyle: 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]',
      verifiedDate: '15 Jan 2026',
      documentRef: 'BOD-AP-2026-881',
      description: 'Board of directors charter, articles of association, and shareholder registry verified.',
      icon: 'apartment',
    },
    {
      id: 'contact-info',
      title: 'Contact Information',
      category: 'Principal Office',
      status: 'Verified',
      statusBadgeStyle: 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]',
      verifiedDate: '18 Jan 2026',
      documentRef: 'ADDR-GEO-9941',
      description: 'Primary office location, nodal contact person (Ravi Kumar), and official communication phone & email authenticated.',
      icon: 'contact_phone',
    },
    {
      id: 'operating-area',
      title: 'Operating Area',
      category: 'Jurisdiction & Clusters',
      status: 'Verified',
      statusBadgeStyle: 'bg-[#e6ecd5] text-[#1b6e53] border-[#c3cda7]',
      verifiedDate: '22 Jan 2026',
      documentRef: 'GEO-EG-4402',
      description: 'East Godavari agricultural acreage and 3 collection hub radius demarcated in federation GIS.',
      icon: 'map',
    },
    {
      id: 'bank-settlement',
      title: 'Bank / Settlement Details',
      category: 'Escrow & Banking',
      status: 'Pending',
      statusBadgeStyle: 'bg-[#fceace] text-[#683600] border-[#c3cda7]',
      verifiedDate: 'In Progress',
      documentRef: 'ESCROW-NACH-PENDING',
      description: 'Escrow nodal bank account mandate & Penny-drop UPI instant routing verification in final stage.',
      icon: 'account_balance',
    },
  ],

  verificationTimeline: [
    {
      step: 1,
      title: 'Registration Submitted',
      date: '10 Jan 2026',
      status: 'completed',
      description: 'Online application and statutory credentials submitted to FarmLink portal.',
      icon: 'assignment_turned_in',
    },
    {
      step: 2,
      title: 'Documents Reviewed',
      date: '14 Jan 2026',
      status: 'completed',
      description: 'Incorporation deeds, APMC registration certificate, and board resolutions audited.',
      icon: 'fact_check',
    },
    {
      step: 3,
      title: 'Organization Verified',
      date: '15 Jan 2026',
      status: 'completed',
      description: 'FPO governance credentials and shareholder rosters authenticated on state ledger.',
      icon: 'domain_verification',
    },
    {
      step: 4,
      title: 'Contact Verified',
      date: '18 Jan 2026',
      status: 'completed',
      description: 'Nodal officer identity, registered phone number, and physical office verified.',
      icon: 'person_pin_circle',
    },
    {
      step: 5,
      title: 'Bank / Settlement Verification',
      date: 'In Progress',
      status: 'current',
      description: 'Direct bank escrow account linkage & penny drop test validation currently active.',
      icon: 'account_balance_wallet',
    },
    {
      step: 6,
      title: 'Fully Verified',
      date: 'Expected within 24h',
      status: 'upcoming',
      description: 'Complete Tier-1 Institutional Federation Verification badge issuance.',
      icon: 'verified',
    },
  ],
}

/**
 * Retrieves the stored FPO profile data from localStorage, or returns default state.
 */
export function getStoredFpoProfile() {
  if (typeof window === 'undefined') {
    return initialFpoProfileState
  }
  try {
    const raw = localStorage.getItem(FPO_PROFILE_STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(FPO_PROFILE_STORAGE_KEY, JSON.stringify(initialFpoProfileState))
      return initialFpoProfileState
    }
    return JSON.parse(raw)
  } catch (err) {
    console.error('Failed to read FPO profile from localStorage:', err)
    return initialFpoProfileState
  }
}

/**
 * Saves updated FPO profile data to localStorage and emits an event for reactive updates.
 */
export function saveStoredFpoProfile(updatedProfile) {
  if (typeof window === 'undefined') return updatedProfile
  try {
    const merged = {
      ...getStoredFpoProfile(),
      ...updatedProfile,
    }
    localStorage.setItem(FPO_PROFILE_STORAGE_KEY, JSON.stringify(merged))
    // Dispatch custom and storage events for reactive re-render across mounted components
    window.dispatchEvent(new Event('farmlink-fpo-profile-updated'))
    window.dispatchEvent(new Event('storage'))
    return merged
  } catch (err) {
    console.error('Failed to save FPO profile to localStorage:', err)
    return updatedProfile
  }
}

/**
 * Resets FPO profile data to initial default state.
 */
export function resetFpoProfile() {
  if (typeof window === 'undefined') return initialFpoProfileState
  try {
    localStorage.setItem(FPO_PROFILE_STORAGE_KEY, JSON.stringify(initialFpoProfileState))
    window.dispatchEvent(new Event('farmlink-fpo-profile-updated'))
    window.dispatchEvent(new Event('storage'))
    return initialFpoProfileState
  } catch (err) {
    console.error('Failed to reset FPO profile in localStorage:', err)
    return initialFpoProfileState
  }
}
