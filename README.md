# ShopSphere — Angular E-commerce Starter

A responsive e-commerce storefront built with Angular standalone components. It includes product search, category filters, sorting, wishlist toggles, a shopping cart, quantity controls, and a cart drawer. Product data is local demo data; checkout is a demo interaction and is not connected to a payment provider or backend.

## Requirements
- Node.js 20.11+ (Node 22 LTS recommended)
- npm

## Run locally
```bash
npm install
npm start
```
Open `http://localhost:4200`.

## Production build
```bash
npm run build
```
Build output is generated under `dist/shopsphere/browser`.

## Project structure
- `src/app/app.component.ts` — storefront behavior and UI
- `src/app/app.component.html` — storefront template
- `src/app/app.component.css` — component styling
- `src/styles.css` — global styles
- `src/index.html` — app document

## Before production
Connect a real product API and database, implement authentication and server-side authorization, add inventory/pricing validation, integrate a trusted payment provider, and configure tests and deployment.
