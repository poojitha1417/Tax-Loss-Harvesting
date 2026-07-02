Tax Loss Harvesting Dashboard

A responsive and interactive React application for simulating Tax Loss Harvesting. This project allows users to select various cryptocurrency holdings and instantly see the projected impact on their capital gains and tax liability.

## 🚀 Live Demo

[Insert your deployed Vercel/Netlify link here]

## ✨ Features

- **Dynamic Tax Calculation**: Real-time recalculation of short-term and long-term capital gains based on selected holdings.
- **Holdings Table**: View all your assets with sorting capabilities (Ascending/Descending for Short-Term and Long-Term gains).
- **"View All" Toggle**: Pagination-like experience that defaults to showing 4 rows for a clean UI, with the option to expand.
- **Savings Indicator**: Automatically highlights when a user's selection leads to tax savings compared to their initial realised capital gains.
- **Dark Mode UI**: A premium, responsive interface styled with Tailwind CSS, matching the provided Figma design guidelines.

## 🛠️ Technologies Used

- **React 18** (Functional Components, Hooks)
- **TypeScript** (Strict typing and interfaces)
- **Vite** (Fast development server and optimized build)
- **Tailwind CSS** (Utility-first styling)
- **Lucide React** (Icons)

## 📦 Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/poojitha1417/Tax-Loss-Harvesting.git
   cd Tax-Loss-Harvesting
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the app:**
   Open your browser and navigate to `http://localhost:5173`.
   Live Link : tax-loss-harvesting-gbb7.vercel.app

## 📸 Screenshots

*(Add screenshots of your UI here after deployment)*
- **Dashboard Overview**: `[Insert Screenshot]`
- **Tax Savings State**: `[Insert Screenshot]`

## 📝 Assumptions & Simplifications

- **Data Fetching**: The provided API payloads for "Holdings" and "Capital Gains" have been implemented as mock asynchronous functions (`src/api/mockData.ts`) simulating a 500ms network delay. 
- **Formatting**: Values are formatted cleanly using standard USD currency structures rather than strict abbreviations (e.g., `$16,760,000` vs `$16.76M`) to prioritize accuracy.
- **Copy/Text**: The top informational copy and disclaimers use standard placeholder text as allowed in the assignment guidelines, keeping focus on the core logical functionality.
