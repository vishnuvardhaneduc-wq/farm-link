// Utility functions for formatting and calculations

export function formatCurrency(amount) {
  if (typeof amount !== 'number') return amount
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}

export function formatWeight(tonnes) {
  return `${tonnes} MT`
}
