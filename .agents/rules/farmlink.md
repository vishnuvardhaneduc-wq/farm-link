---
trigger: always_on
---

# FARMLINK MASTER RULES

## PRODUCT
FarmLink is a demand-driven agricultural B2B procurement and supply-chain platform connecting Buyers, FPOs, Village Hubs and Farmers.

Goal:
reduce unnecessary intermediaries, improve farmer price realization, simplify buyer procurement, organize farmer supply, reduce avoidable logistics, and provide transparent quantity, quality, delivery and settlement records.

FarmLink is not a generic ecommerce site and not a simple farmer marketplace.

## FINAL WORKFLOW
Buyer
→ Search Product
→ Discover FPOs
→ Select FPOs
→ Send Procurement Request
→ FPO Accept / Counter / Decline
→ Buyer Compares Offers
→ Buyer Selects FPO
→ Order Created
→ FPO Fulfillment Planning
→ Hub Allocation
→ Farmer Allocation
→ Collection
→ Weighing
→ Quality Check
→ Aggregation
→ Dispatch
→ Delivery
→ Buyer Confirmation
→ Settlement
→ Farmer Payment

This workflow is the source of truth.

## BUYER
Buyer can:
- register/login
- manage business profile
- search products
- discover FPOs
- view supplier profiles
- select one or more FPOs
- send procurement requests
- receive offers/counter offers
- compare offers
- select FPO
- track orders
- track delivery
- confirm delivery
- report issues
- view payments

Buyer does not select farmers, assign hubs, weigh produce, inspect quality or calculate farmer settlements.

## FPO
FPO is the commercial and supply coordinator.

FPO can:
- manage profile
- register products, grades, capacity and service area
- manage hubs
- manage farmers
- assign farmers to Primary Hubs
- receive procurement requests
- accept/counter/decline
- manage offers
- manage orders
- plan fulfillment
- allocate orders to hubs
- allocate hub requirements to farmers
- monitor supply, collection, quality and delivery
- manage settlements
- view analytics

## HUB
A Hub belongs to an FPO and is the physical operations layer.

Hub can:
- view daily tasks
- view assigned farmers
- look up farmers
- record supply
- record collection
- record actual weight
- record quality
- upload photos
- aggregate produce
- prepare dispatch
- manage dispatch
- generate receipts

Hub UI should be simpler than FPO UI and optimized for tablet use.

## FARMER
Farmers do not need a normal web/mobile application.

Farmer flow:
Instruction
→ Primary Hub
→ Identification
→ Collection
→ Weighing
→ Quality
→ Acceptance
→ Settlement

Farmer communication may use SMS, IVR, voice, FPO staff, hub operator or printed receipts.

For MVP, hub operators may manually enter farmer supply.

Never require smartphone use in the core farmer workflow.

## FPO-HUB-FARMER
One FPO may have many Hubs.
Every farmer has a Primary Hub.
Farmers normally deliver to their Primary Hub.
Do not make farmers randomly choose hubs.

Example:
FPO
├── Hub A
│   ├── Farmer 1
│   └── Farmer 2
├── Hub B
│   ├── Farmer 3
│   └── Farmer 4
└── Hub C

## FPO PRODUCTS
FPOs maintain a product catalog.
Product data can include:
- product name
- supported grades
- typical capacity
- availability
- service area
- status

Buyer search uses this catalog.

## BUYER DISCOVERY
Buyer searches for a product and sees suitable FPOs.

FPO suitability may consider:
- product compatibility
- grade capability
- capacity
- service area
- distance
- delivery capability
- status
- reliability

Buyer remains in control.
Do not automatically select the cheapest FPO.

## PROCUREMENT REQUEST
A Procurement Request is NOT an Order.

It contains:
buyer, product, quantity, maximum price, required grade, delivery date/time, delivery location, notes, selected FPOs and status.

Possible statuses:
Draft
Sent
Viewed
Responded
Countered
Accepted
Declined
Expired
Offer Selected
Order Created

A Request becomes an Order only after buyer selects an Offer.

## MULTI-FPO REQUEST
Buyer may send one request to multiple FPOs.
Each FPO responds independently.
Responses become Offers.

Buyer compares:
- price
- quantity
- grade
- delivery time
- distance
- reliability
- fulfillment capability

For MVP, prefer one selected FPO per Order.

## ORDER
Order is created from the selected Offer.

Suggested lifecycle:
Confirmed
→ Fulfillment Planning
→ Hub Allocation
→ Farmer Allocation
→ Collection
→ Dispatch
→ In Transit
→ Delivered
→ Buyer Confirmed
→ Completed

## HUB ALLOCATION
IMPORTANT:
Do not automatically split every order across multiple hubs.

Use the Minimum Suitable Hub Network.

First check whether ONE suitable hub can fulfill the whole order.

If yes:
use one hub.

Example:
Order = 1,000 kg
Hub A available = 1,300 kg
Result:
Hub A = 1,000 kg

If one hub is insufficient, use the minimum number of suitable hubs.

Example:
Order = 1,000 kg
Hub A = 600 kg
Hub B = 400 kg
Result:
Hub A = 600 kg
Hub B = 400 kg

Do not use Hub C if A+B are sufficient.

Hub selection may consider:
capacity, crop capability, grade capability, operating hours, farmer availability, distance, service area and logistics.

The FPO manager can review or override the recommendation.

## PRIMARY HUB VS FULFILLMENT HUB
Primary Hub = farmer's normal assigned hub.
Fulfillment Hub = hub selected for a particular Order.

Farmers normally deliver to their Primary Hub.
Any reassignment must be explicit.

## TWO-LEVEL ALLOCATION
Level 1:
Order → Suitable Hub(s) → Hub Quantity

Level 2:
Hub Requirement → Eligible Farmers → Farmer Allocation

Never allocate farmers before hub allocation.

## FARMER ALLOCATION
MVP uses proportional allocation.

Formula:
farmer allocation =
farmer supply / total supply × hub requirement

Example:
Requirement = 700 kg
Available = 1,000 kg
Ratio = 70%

100 kg → 70 kg
200 kg → 140 kg
300 kg → 210 kg
400 kg → 280 kg

Future improvements may add:
- fairness rotation
- historical under-allocation
- quality eligibility
- reliability
- logistics

Do not add advanced scoring before the basic system works.

## COLLECTION
Hub records:
- farmer
- order
- expected quantity
- actual quantity
- timestamp

## WEIGHING
Record:
- farmer ID
- order ID
- expected weight
- actual weight
- timestamp

Keep separate:
- allocated quantity
- collected quantity
- accepted quantity

Accepted quantity is used for settlement.

## QUALITY
Record:
- grade
- inspection result
- photo
- notes
- timestamp
- inspector

If Grade A is required, lower grades should not automatically count as full fulfillment unless business rules explicitly allow it.

## AGGREGATION
Produce from multiple farmers is aggregated into fulfillment or dispatch batches.

Multiple Hubs may contribute to one Order.

## DELIVERY
Possible states:
Preparing
→ Dispatched
→ In Transit
→ Delivered
→ Confirmed

Multiple Hubs may contribute to one Order.
The buyer should normally see one Order.

## BUYER CONFIRMATION
Buyer sees:
- ordered quantity
- delivered quantity
- grade
- delivery details

Actions:
Confirm Delivery
Report Issue

Confirmation triggers settlement.

## SETTLEMENT
Settlement uses:
actual accepted quantity × agreed farmer settlement price

Record:
- farmer
- quantity
- rate
- amount
- status
- settlement reference

Statuses:
Pending
Processing
Completed
Failed

For the hackathon, payment processing may be simulated.
Never describe simulated payment as a real bank transfer.

## RESERVE FUND
If price protection is implemented:
- track contributions
- track protection payouts
- show balance
- show history

Do not claim guaranteed prices without a supported funding mechanism.

## AUTHENTICATION
Three application roles:
FPO
Buyer
Hub

Preferred entry:
Launch Page
→ Choose Workspace
→ FPO / Buyer / Hub

Routes may include:
- /fpo/login
- /fpo/register
- /buyer/login
- /buyer/register
- /hub/login

Hub accounts should preferably be created or approved by an FPO.
Farmers do not need normal login.

## IDS
Use clear IDs:
FPO-00124
BUY-00482
HUB-0007
FARM-00842
REQ-1024
OFF-2031
ORD-1032
MAT-3001
COL-7001
DEL-2001
SET-9001

Use IDs for transaction traceability.

## FPO DASHBOARD
The FPO Dashboard already exists and is the current visual foundation.

Preserve:
- visual identity
- typography
- sidebar
- header
- responsive structure
- existing working behavior

Dashboard should communicate:
Procurement Requests
→ Offers
→ Orders
→ Hub Allocation
→ Farmer Allocation
→ Collection
→ Delivery
→ Settlement

Prioritize:
- incoming requests
- offers
- active orders
- hub network
- fulfillment hub plan
- farmer allocation
- collection
- delivery
- settlements

Do not make every order appear to use multiple hubs.

## UI STYLE
FarmLink should feel:
- premium
- modern
- professional
- trustworthy
- clear

Combine:
- agritech
- B2B procurement
- logistics
- financial transparency

Use clean surfaces, strong typography, restrained green, clear hierarchy, subtle borders/shadows, structured tables, charts and status badges.

Support desktop and tablet.

Avoid:
- cartoon farming graphics
- excessive green
- huge gradients
- excessive animation
- generic ecommerce styling
- clutter

## TECHNOLOGY
Frontend:
React
Vite
JavaScript
Tailwind CSS
React Router

Backend later:
Node.js
Express.js

Database later:
Supabase
PostgreSQL

Charts:
Recharts

Storage later:
Supabase Storage

Do not add unnecessary frameworks.

## ARCHITECTURE
Use:
- components
- layouts
- pages
- services
- hooks
- utils
- data

Do not put the whole application into App.jsx.

Keep UI separate from API/database/business logic.

Reuse common components.
Do not create duplicates unnecessarily.
Do not rewrite unrelated code.

## STITCH + ANTIGRAVITY
Stitch is used for:
- UI design
- new screens
- major visual redesign
- layout exploration

Antigravity is used for:
- React implementation
- state
- interactions
- business logic
- APIs
- backend
- database integration
- browser testing
- bug fixes

Preferred workflow:
Stitch
→ approved design
→ Antigravity implementation
→ browser verification
→ fixes

## DEVELOPMENT RULES
Build one feature at a time.

Before modifying code:
1. inspect existing implementation
2. identify relevant files
3. understand dependencies
4. preserve working features
5. avoid unrelated changes

After modifying code:
1. run the app
2. check compile/runtime errors
3. test affected route
4. test main interactions
5. check desktop/tablet
6. check overflow
7. verify unrelated pages
8. fix obvious problems
9. summarize changed files

For major changes, plan before coding.

## BUSINESS RULE PROTECTION
Do not:
- require farmers to use smartphones
- make buyers choose individual farmers
- make farmers randomly choose hubs
- automatically split every order across all hubs
- turn every Request directly into an Order
- automatically choose the cheapest FPO
- claim simulated payment is real
- claim guaranteed price without funding
- add unrelated marketplace features

If a major business rule changes, explain its impact before changing architecture.

## MOCK DATA
Before backend integration, use realistic mock relationships:

Buyer
→ Request
→ FPO Recipients
→ Offers
→ Selected Offer
→ Order
→ Hub Allocation
→ Farmer Allocation
→ Collection
→ Delivery
→ Settlement

## AI
AI is secondary.

Possible future features:
- FPO recommendation
- demand prediction
- voice-based farmer supply entry
- shortage alerts
- quality assistance

Do not add AI before the core procurement and fulfillment workflow works.

## FINAL SOURCE OF TRUTH
Buyer discovers product
→ discovers FPOs
→ sends Procurement Request
→ FPOs respond
→ buyer compares Offers
→ buyer selects FPO
→ Order created
→ FPO selects minimum suitable Hub network
→ Hub Allocation
→ Farmer Allocation
→ farmers deliver to assigned Primary Hub
→ Collection
→ Weighing
→ Quality
→ Aggregation
→ Dispatch
→ Delivery
→ Buyer Confirmation
→ Settlement
→ Farmer Payment

All future UI, routes, components, APIs, database structures and business logic must remain consistent with this model unless intentionally revised.