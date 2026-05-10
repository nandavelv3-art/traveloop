# Traveloop

A premium, frontend-only travel planning web app with a dark glassmorphism aesthetic and cinematic UI.

## Run & Operate

- `pnpm --filter @workspace/traveloop run dev` — run Traveloop (port from workflow)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- React 19 + Vite + Tailwind CSS v4
- Framer Motion (animations), Zustand (state), Recharts (charts)
- shadcn/ui components, Wouter (routing), React Hook Form + Zod

## Where things live

```
artifacts/traveloop/src/
  App.tsx                        — router, all routes wired with wouter
  index.css                      — dark theme, glass utilities, CSS vars
  types/index.ts                 — all shared TypeScript types
  services/mockData.ts           — all mock JSON data (trips, cities, activities, notes, packing)
  app/store/useAppStore.ts       — Zustand global store (auth, trips, UI)
  components/
    layout/                      — Sidebar, Navbar, AppLayout
    shared/                      — TripCard, CityCard, StatCard
    ui/                          — shadcn/ui primitives
  pages/
    auth/                        — LoginPage, SignupPage
    dashboard/DashboardPage.tsx  — stats, AI reco, recent trips
    trips/                       — TripsPage, CreateTripPage (3-step), TripDetailPage (tabbed)
                                   ItineraryPage, BudgetPage, ChecklistPage, NotesPage
    explore/ExplorePage.tsx      — city + activity discovery
    profile/ProfilePage.tsx      — user stats, saved destinations
    shared/SharedItineraryPage.tsx — public shared link view
```

## Architecture decisions

- All data is mock JSON — no backend required, fully frontend-only
- Zustand store pre-authenticated as "Alex Chen" for instant demo experience
- wouter used instead of react-router (lighter, simpler)
- AppLayout wraps all authenticated routes — sidebar + navbar + animated page transitions
- Recharts used for budget pie + bar charts in BudgetPage
- TripDetailPage uses shadcn Tabs to embed Itinerary/Budget/Checklist/Notes as sub-pages

## Product

- Dashboard with travel stats, AI destination recommendation, recent trips
- Trip management: create (3-step wizard), list/filter/search, detail with tabs
- Itinerary builder with timeline view per day
- Budget tracker with Recharts pie/bar charts and category breakdown
- Packing checklist with animated checkboxes and progress ring
- Notes with expand/collapse and tag system
- Explore page with city cards and activity discovery by category
- Profile page with editable name, travel stats, saved destinations
- Shared itinerary public view at /shared/:shareCode

## User preferences

- Dark glassmorphism aesthetic, cinematic feel
- Purple primary (#7C3AED), dark background (#0F0F0F)
- No backend — all data is mock JSON

## Gotchas

- wouter Router base must strip trailing slash from BASE_URL to avoid double-slash routing
- Use `component` prop on Route for pages that don't need param access; children JSX for those that do
- Zustand `useAppStore(selector)` pattern avoids hook-in-hook issues with Route children

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
