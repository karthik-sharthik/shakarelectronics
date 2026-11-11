# ShaKar Electronics Store

A responsive React + Vite + Tailwind CSS storefront starter with local JSON product data, category filtering, search, sorting, product details, and a working cart.

## Requirements
- Node.js 18+ (20+ recommended)
- npm

## Setup
```bash
# 1. Extract the ZIP and open the project folder
cd modern-electronics-store

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Folder structure
```text
modern-electronics-store/
├── public/
│   └── Shakar Electronics Store Logo.png
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProductModal.jsx
│   ├── data/
│   │   └── products.json
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Features
- Responsive navigation, promotional hero, category chips and footer
- Product cards with images, ratings, discount badges and add-to-cart action
- Search by product name/brand/description
- Category filtering and price sorting
- Product detail modal with description and specifications
- Cart drawer with quantity updates, remove action, subtotal and estimated total
- Cart state is held in React state for this demo; connect a backend or localStorage for persistence

## Customize
- Edit `src/data/products.json` to add or update products.
- Replace the demo Unsplash image URLs with your own locally hosted product images if desired.
- Update the delivery/tax assumptions in `src/App.jsx` to match your business.
