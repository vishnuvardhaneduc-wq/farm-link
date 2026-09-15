const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/data/buyerData.js');
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Helper function definition
const helperFunc = `
export function calculateOfferFinancials(quantity, producePrice, transportCost) {
  const qty = Number(quantity) || 1000
  const pPrice = Number(producePrice) || 27
  const tCost = Number(transportCost !== undefined ? transportCost : 1500)
  const pValue = Math.round(pPrice * qty)
  const dTotal = pValue + tCost
  const effPrice = qty > 0 ? (dTotal / qty) : pPrice

  return {
    producePrice: \`₹\${pPrice.toFixed(2)} / kg\`,
    producePriceVal: pPrice,
    produceValue: \`₹\${pValue.toLocaleString('en-IN')}\`,
    produceValueVal: pValue,
    transportCost: \`₹\${tCost.toLocaleString('en-IN')}\`,
    transportCostVal: tCost,
    deliveredTotal: \`₹\${dTotal.toLocaleString('en-IN')}\`,
    deliveredTotalVal: dTotal,
    effectivePrice: \`₹\${effPrice.toFixed(2)} / kg\`,
    effectivePriceVal: Number(effPrice.toFixed(2)),
    transportStatus: 'Recorded',
  }
}
`;

if (!content.includes('export function calculateOfferFinancials')) {
  content = content.replace('export const initialProcurementRequests = [', helperFunc + '\nexport const initialProcurementRequests = [');
}

// 2. Update storage key to v9
content = content.replace(/const STORAGE_KEY = 'farmlink_buyer_demands_v\d+'/, "const STORAGE_KEY = 'farmlink_buyer_demands_v9'");

// 3. Update confirmProcurementOrder implementation
const newConfirmLogic = `export function confirmProcurementOrder(demandId, selectedOffersPerItem = {}) {
  if (typeof window === 'undefined') return
  try {
    const demands = getStoredDemands()
    let targetUpdatedDemand = null

    const updated = demands.map((d) => {
      if (d.id !== demandId) return d

      const updatedItems = (d.items || []).map((item) => {
        const selectedOfferId = selectedOffersPerItem[item.itemId] || item.selectedFpoOfferId || item.confirmedOfferId
        if (!selectedOfferId) return item

        const selectedResp = (item.responses || []).find((r) => r.id === selectedOfferId)

        const updatedResponses = (item.responses || []).map((resp) => {
          if (resp.id === selectedOfferId) {
            return {
              ...resp,
              status: 'ORDER_CONFIRMED',
              statusLabel: 'ORDER CONFIRMED',
              statusStyle: 'bg-rose-50 text-rose-700 border border-rose-300',
              isConfirmed: true,
              isAwarded: true
            }
          } else {
            return {
              ...resp,
              status: 'UNAVAILABLE',
              statusLabel: 'UNAVAILABLE',
              statusStyle: 'bg-[#f1efdf] text-[#6d6d6d] border border-[#c3cda7]',
              isConfirmed: false,
              isAwarded: false,
              unavailableReason: 'Another FPO was selected for this item.'
            }
          }
        })

        const itemQty = Number(item.quantityVal || parseInt(String(item.quantity || '1000').replace(/[^0-9]/g, '')) || 1000)
        const pRate = selectedResp?.producePriceVal || parseFloat(String(selectedResp?.producePrice || selectedResp?.offeredPrice || selectedResp?.counterPrice || 27).replace(/[^0-9.]/g, '')) || 27
        const tCost = selectedResp?.transportCostVal !== undefined ? selectedResp.transportCostVal : 1500
        const fin = calculateOfferFinancials(itemQty, pRate, tCost)

        return {
          ...item,
          selectedFpoOfferId: selectedOfferId,
          confirmedOfferId: selectedOfferId,
          confirmedFpoId: selectedResp?.fpoId,
          confirmedFpoName: selectedResp?.fpoName,
          agreedProducePrice: fin.producePrice,
          producePriceVal: fin.producePriceVal,
          produceValue: fin.produceValue,
          produceValueVal: fin.produceValueVal,
          transportationCost: fin.transportCost,
          transportCostVal: fin.transportCostVal,
          deliveredOrderTotal: fin.deliveredTotal,
          deliveredTotalVal: fin.deliveredTotalVal,
          effectiveDeliveredPrice: fin.effectivePrice,
          effectivePriceVal: fin.effectivePriceVal,
          deliveryDate: selectedResp?.deliveryDate || d.deliveryDate,
          destination: d.deliveryLocation || 'Vijayawada Central Processing Dock',
          selectedFpo: selectedResp?.fpoName || 'Godavari Farmers FPO',
          isConfirmed: true,
          status: 'ORDER CONFIRMED',
          responses: updatedResponses
        }
      })

      const anyConfirmed = updatedItems.some((it) => it.isConfirmed)
      const allConfirmed = updatedItems.every((it) => it.isConfirmed || !it.responses?.length)

      const updatedDemand = {
        ...d,
        status: allConfirmed ? 'Order Confirmed' : anyConfirmed ? 'Partially Confirmed' : d.status,
        items: updatedItems
      }

      targetUpdatedDemand = updatedDemand
      return updatedDemand
    })

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return targetUpdatedDemand || demands.find((d) => d.id === demandId)
  } catch (e) {
    console.error(e)
  }
}`;

const confirmRegex = /export function confirmProcurementOrder[\s\S]*?export function submitFpoResponse/;
content = content.replace(confirmRegex, newConfirmLogic + '\n\nexport function submitFpoResponse');

// 4. Update submitFpoResponse implementation
const newSubmitLogic = `export function submitFpoResponse(demandId, fpoInfo, responsesPerItem) {
  if (typeof window === 'undefined') return
  try {
    const demands = getStoredDemands()
    const updated = demands.map((d) => {
      if (d.id !== demandId) return d
      const updatedItems = (d.items || []).map((item) => {
        if (item.isConfirmed && item.confirmedOfferId) {
          const myResp = (item.responses || []).find(
            (r) => r.fpoId === fpoInfo.id || r.fpoName === fpoInfo.name
          )
          if (myResp && myResp.id !== item.confirmedOfferId) {
            return item
          }
        }

        const itemResp = responsesPerItem[item.itemId]
        if (!itemResp) return item

        const existingResponses = (item.responses || []).filter(
          (r) => r.fpoId !== fpoInfo.id && r.fpoName !== fpoInfo.name
        )

        let newRespObj = null
        const rawQty = Number(itemResp.availableQty || item.quantityVal || 1000)
        const rawPrice = parseFloat(String(itemResp.producePrice || itemResp.offeredPrice || (itemResp.type === 'BACK_OFFER' ? 29 : 27)).replace(/[^0-9.]/g, '')) || 27
        const rawTransport = parseFloat(String(itemResp.transportCost !== undefined && itemResp.transportCost !== '' ? itemResp.transportCost : 1500).replace(/[^0-9.]/g, '')) || 1500
        const fin = calculateOfferFinancials(rawQty, rawPrice, rawTransport)

        if (itemResp.type === 'ACCEPT') {
          newRespObj = {
            id: \`resp-\${demandId}-\${item.itemId}-\${fpoInfo.id || 'fpo-godavari'}\`,
            fpoId: fpoInfo.id || 'fpo-godavari',
            fpoName: fpoInfo.name || 'Godavari Farmers FPO',
            location: fpoInfo.location || 'Rajamahendravaram, East Godavari',
            status: 'ACCEPTED',
            statusLabel: 'ACCEPTED',
            statusStyle: 'bg-[#e6ecd5] text-[#1b6e53] border border-[#c3cda7]',
            offeredQty: \`\${rawQty.toLocaleString()} kg\`,
            offeredPrice: fin.producePrice,
            producePrice: fin.producePrice,
            producePriceVal: fin.producePriceVal,
            produceValue: fin.produceValue,
            produceValueVal: fin.produceValueVal,
            transportCost: fin.transportCost,
            transportCostVal: fin.transportCostVal,
            deliveredTotal: fin.deliveredTotal,
            deliveredTotalVal: fin.deliveredTotalVal,
            effectivePrice: fin.effectivePrice,
            effectivePriceVal: fin.effectivePriceVal,
            transportStatus: 'Recorded',
            deliveryDate: itemResp.deliveryDate || d.deliveryDate,
            hub: fpoInfo.primaryHub || 'Rajahmundry Central Hub #01',
            notes: itemResp.notes || \`Full volume allocated across member clusters. Scheduled delivery on \${itemResp.deliveryDate || d.deliveryDate}.\`,
            timestamp: 'Just now',
            contact: fpoInfo.contactPerson || 'Hub Director Desk'
          }
        } else if (itemResp.type === 'BACK_OFFER') {
          newRespObj = {
            id: \`resp-\${demandId}-\${item.itemId}-\${fpoInfo.id || 'fpo-godavari'}\`,
            fpoId: fpoInfo.id || 'fpo-godavari',
            fpoName: fpoInfo.name || 'Godavari Farmers FPO',
            location: fpoInfo.location || 'Rajamahendravaram, East Godavari',
            status: 'BACK_OFFER',
            statusLabel: 'BACK OFFER',
            statusStyle: 'bg-[#fceace] text-[#683600] border border-[#c3cda7]',
            requestedQty: item.quantity,
            offeredQty: \`\${rawQty.toLocaleString()} kg\`,
            counterPrice: fin.producePrice,
            offeredPrice: fin.producePrice,
            producePrice: fin.producePrice,
            producePriceVal: fin.producePriceVal,
            produceValue: fin.produceValue,
            produceValueVal: fin.produceValueVal,
            transportCost: fin.transportCost,
            transportCostVal: fin.transportCostVal,
            deliveredTotal: fin.deliveredTotal,
            deliveredTotalVal: fin.deliveredTotalVal,
            effectivePrice: fin.effectivePrice,
            effectivePriceVal: fin.effectivePriceVal,
            transportStatus: 'Recorded',
            offeredGrade: itemResp.offeredGrade || item.grade,
            deliveryDate: itemResp.deliveryDate || d.deliveryDate,
            hub: fpoInfo.primaryHub || 'Rajahmundry Central Hub #01',
            notes: itemResp.notes || 'Commercial back offer proposed.',
            counterReasons: itemResp.counterReasons || [
              \`Produce rate adjusted to \${fin.producePrice}\`,
              \`Delivered total: \${fin.deliveredTotal} (including \${fin.transportCost} internal transport)\`
            ],
            timestamp: 'Just now',
            contact: fpoInfo.contactPerson || 'Hub Director Desk'
          }
        } else if (itemResp.type === 'DECLINE') {
          newRespObj = {
            id: \`resp-\${demandId}-\${item.itemId}-\${fpoInfo.id || 'fpo-godavari'}\`,
            fpoId: fpoInfo.id || 'fpo-godavari',
            fpoName: fpoInfo.name || 'Godavari Farmers FPO',
            location: fpoInfo.location || 'Rajamahendravaram, East Godavari',
            status: 'DECLINED',
            statusLabel: 'DECLINED',
            statusStyle: 'bg-[#fceace] text-[#ba1a1a] border border-[#ba1a1a]/30',
            declineReason: itemResp.declineReason || 'Insufficient quantity',
            notes: itemResp.notes || itemResp.declineReason || 'Declined due to supply constraints',
            timestamp: 'Just now',
            contact: fpoInfo.contactPerson || 'Hub Director Desk'
          }
        }

        return {
          ...item,
          responses: newRespObj ? [newRespObj, ...existingResponses] : item.responses
        }
      })

      return {
        ...d,
        status: d.status === 'Order Confirmed' ? 'Order Confirmed' : 'Partially Responded',
        fpoResponded: true,
        items: updatedItems
      }
    })

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return updated
  } catch (e) {
    console.error(e)
  }
}`;

const submitRegex = /export function submitFpoResponse[\s\S]*?\/\/ Function to find matching FPOs/;
content = content.replace(submitRegex, newSubmitLogic + '\n\n// Function to find matching FPOs');

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Successfully updated buyerData.js methods');
