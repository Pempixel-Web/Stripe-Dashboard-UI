# Stripe Dashboard UI (Pempixel Web Inc)

A frontend-only recreation of the **logged-in Stripe Dashboard** experience, built with React, TypeScript and Vite. All data is mock data kept in your browser. There is no backend and no real payment processing.

> Not affiliated with or endorsed by Stripe. Built for learning and portfolio purposes. Never enter real card details, passwords or API secrets.

## Features
- Collapsible sidebar with tooltips, mobile drawer, topbar search and profile menu
- **Overview**: metrics with period comparison, Daily/Weekly/Monthly revenue chart, recent payments, payment-method donut, quick actions
- **Transactions / Payments**: search, date/status/method/amount filters, sortable columns, pagination, row selection, bulk refund, CSV export, detail drawer, create payment
- **Customers**: search, filters, profile drawer (lifetime value, saved methods, history), create/edit/delete
- **Product catalogue**: create, edit, delete, active/inactive
- **Balances**: available/pending/total, currency breakdown, payouts (mock)
- **Reports**: revenue, payments, customers and refunds charts with CSV download
- **Settings**: business, account, personal, team, security, notifications, API keys (mock), developer settings

## Tech stack
React 18, TypeScript, Vite, React Router DOM, Recharts, Lucide React, plain CSS.

## Getting started
1. **Install prerequisites**: [Node.js](https://nodejs.org) 18 or newer and Git. Check with `node -v` and `git --version`.
2. **Clone**
   ```bash
   git clone https://github.com/Pempixel-Web/Stripe-Dashboard-UI.git
   cd Stripe-Dashboard-UI
   ```
3. **Install dependencies**: `npm install`
4. **Add your profile picture**: save a square image (200x200 px or larger) as `public/avatar.jpg`. If it is missing, the initials "EV" are shown instead.
5. **Start the dev server**: `npm run dev`, then open the URL printed in the terminal (usually http://localhost:5173).
6. **Production build**: `npm run build` (type-checks, then outputs to `dist/`).

## Versions (git tags)
| Tag | What it contains |
|-----|------------------|
| `v1.0.0` | Foundation: design system, layout, Overview dashboard |
| `v2.0.0` | Transactions/Payments, Customers, Product catalogue |
| `v3.0.0` | Balances, Reports, Settings, profile picture slot, README |

Try an earlier version:
```bash
git checkout v1.0.0
npm install && npm run dev
git checkout main    # return to the latest
```
Browse the history one small commit at a time with `git log --oneline`.

## Project structure
```
src/
  main.tsx        entry point
  App.tsx         routes
  Layout.tsx      sidebar + topbar
  store.tsx       customers/payments/products state, localStorage, toasts
  ui.tsx          Badge, Drawer, Modal, Menu, Pager, Avatar, CSV helper
  data.ts         types and mock data
  styles.css      design tokens and component styles
  pages/          Overview, Payments, Customers, Products, Balances, Reports, Settings
public/avatar.jpg your profile picture (you add this)
```

## Routes
`/` Overview, `/transactions`, `/payments`, `/customers`, `/products`, `/billing`, `/balances`, `/connect`, `/reports`, `/settings/:tab` (business, account, personal, team, security, notifications, api, developers).

## Customising
- **Your name, email, business name**: edit `src/pages/Settings.tsx` (default form values), `src/Layout.tsx` (workspace name) and `index.html` (page title).
- **Colours and spacing**: change the CSS variables at the top of `src/styles.css` (`--p` is the accent colour).
- **Mock data**: edit `src/data.ts`. The app stores data in localStorage under keys starting `sd2.`; clear them (DevTools, Application, Local Storage) or bump the key names in `src/store.tsx` to see new seed data.

## Troubleshooting
- **Blank page / errors after pulling updates**: delete `node_modules` and run `npm install` again.
- **Old data still showing**: clear localStorage as described above.
- **Profile picture not showing**: confirm the file is exactly `public/avatar.jpg`, then restart the dev server.
- **Port busy**: Vite will pick the next free port automatically.

## Roadmap
Dark mode, TanStack Table, unit tests, separate files per component, Naira (NGN) currency option.
