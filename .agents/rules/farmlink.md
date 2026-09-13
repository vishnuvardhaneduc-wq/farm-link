---
trigger: always_on
---

# FarmLink Project Rules

## Project

FarmLink is a demand-driven agricultural supply-chain platform that helps reduce unnecessary intermediaries between farmers and buyers.

## Core Problem

Multiple intermediaries can reduce farmer earnings while increasing prices for buyers and consumers.

## Core Solution

FarmLink:

1. Collects buyer demand.
2. Collects farmer supply through an FPO or village hub.
3. Fairly matches supply with demand.
4. Records actual quantity through weighing.
5. Records quality.
6. Aggregates produce for delivery.
7. Tracks buyer confirmation.
8. Calculates transparent farmer settlements.

## Critical Farmer Principle

Farmers do NOT need smartphones.

Farmer-side activities can happen through:

* FPO hub operator
* SMS
* IVR
* Physical collection point

For the first prototype, the hub operator can manually enter farmer supply.

## Main Users

### FPO Manager

* manages farmers
* manages buyers
* monitors demand and supply
* runs matching
* manages collection
* monitors delivery
* manages settlements
* views analytics

### Hub Operator

* records farmer supply
* identifies farmers
* records weighing
* records quality
* manages collection

### Buyer

* creates demand
* views matching
* tracks orders
* confirms delivery

### Farmer

Farmers do not require a normal web application.

## Technology

Frontend:

* React
* Vite
* JavaScript
* Tailwind CSS
* React Router

Backend later:

* Node.js
* Express.js

Database later:

* Supabase
* PostgreSQL

Charts:

* Recharts

## Main Workflow

Buyer Demand
→ Supply Collection
→ Matching Engine
→ Fair Allocation
→ Physical Collection
→ Digital Weighing
→ Quality Check
→ Aggregation
→ Delivery
→ Buyer Confirmation
→ Settlement

## MVP Matching Logic

Use proportional allocation first.

If total supply <= total demand:
allocate all available supply.

If total supply > total demand:

farmer allocation =
farmer supply / total supply × total demand

Later improvements can include:

* fairness rotation
* quality eligibility
* logistics factors

## Settlement

Settlement uses:

* actual accepted quantity
* agreed farmer settlement price

For the hackathon prototype, payment processing may be simulated.

Never describe a simulated payment as a real bank transfer.

## UI Style

Create a premium, modern agritech SaaS interface.

Use:

* clean spacing
* strong typography
* clear visual hierarchy
* dashboard cards
* professional tables
* status badges
* charts
* responsive desktop and tablet layouts

Avoid:

* cartoon-like agricultural graphics
* excessive gradients
* excessive animations
* unnecessary decoration
* overly rural visual styling

## Main FPO Pages

/fpo/dashboard
/fpo/farmers
/fpo/buyers
/fpo/demand
/fpo/supply
/fpo/matching
/fpo/collection
/fpo/quality
/fpo/delivery
/fpo/settlements
/fpo/reserve-fund
/fpo/analytics

## Buyer Pages

/buyer/dashboard
/buyer/demands
/buyer/demands/new
/buyer/orders

## Hub Pages

/hub/dashboard
/hub/collection
/hub/weighing
/hub/quality
/hub/delivery

## Architecture Rules

Do not put the entire application inside App.jsx.

Use:

* reusable components
* layouts
* pages
* services
* hooks
* utilities

Keep UI logic separate from API/database logic.

Do not introduce unnecessary frameworks or libraries.

Do not rewrite unrelated files.

Before major architecture changes, explain the reason.

After implementing a feature:

1. Run the application.
2. Check for compile errors.
3. Check the browser.
4. Fix obvious problems.
5. Summarize what changed.

## Development Principle

Build the project in small features.

Do not build the entire platform at once.

Each feature should be implemented, tested, and verified before moving to the next feature.

## AI Features

AI is secondary to the core workflow.

Potential later features:

* demand prediction
* voice-based supply entry
* intelligent alerts
* quality assistance

Do not add AI features before the core supply-chain workflow works.
