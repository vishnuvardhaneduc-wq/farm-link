const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/data/buyerData.js');
let content = fs.readFileSync(targetPath, 'utf8');

// Pattern-based enrichment for any responses missing financial breakdown
content = content.replace(/{\s*id:\s*'(resp-[^']+)'[\s\S]*?timestamp:\s*['"][^'"]+['"]/g, (match, respId) => {
  // Check if it already has producePrice
  if (match.includes('producePrice:')) return match;

  let producePriceVal = 27.0;
  let transportCostVal = 1500;
  let qtyVal = 1000;

  if (match.includes('fpo-delta-agro')) {
    producePriceVal = 27.5;
    transportCostVal = 700;
  } else if (match.includes('fpo-green-valley')) {
    producePriceVal = 26.8;
    transportCostVal = 2000;
  } else if (match.includes('fpo-godavari')) {
    producePriceVal = 27.0;
    transportCostVal = 1500;
  }

  // If match mentions Onion or specific rate
  if (match.includes('23.50') || match.includes('24.00') || match.includes('Onion') || match.includes('onion')) {
    producePriceVal = 24.0;
    transportCostVal = 800;
    qtyVal = 500;
  } else if (match.includes('44.00') || match.includes('45.00') || match.includes('47.00') || match.includes('Chilli') || match.includes('chilli')) {
    producePriceVal = 45.0;
    transportCostVal = 600;
    qtyVal = 200;
  }

  const pValue = Math.round(producePriceVal * qtyVal);
  const dTotal = pValue + transportCostVal;
  const effPrice = (dTotal / qtyVal).toFixed(2);

  const finProps = `
            producePrice: '₹${producePriceVal.toFixed(2)} / kg',
            producePriceVal: ${producePriceVal},
            produceValue: '₹${pValue.toLocaleString('en-IN')}',
            produceValueVal: ${pValue},
            transportCost: '₹${transportCostVal.toLocaleString('en-IN')}',
            transportCostVal: ${transportCostVal},
            deliveredTotal: '₹${dTotal.toLocaleString('en-IN')}',
            deliveredTotalVal: ${dTotal},
            effectivePrice: '₹${effPrice} / kg',
            effectivePriceVal: ${effPrice},
            transportStatus: 'Recorded',`;

  return match.replace(/statusStyle:\s*['"][^'"]+['"],/, (sub) => sub + finProps);
});

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Enriched all mock responses in buyerData.js');
