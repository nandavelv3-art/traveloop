import type { Trip, City, Activity, ItineraryDay, Note, PackingCategory, BudgetCategory } from "@/types";

export const mockTrips: Trip[] = [
  {
    id: "t1",
    title: "Tokyo & Kyoto Adventure",
    destination: "Japan",
    coverGradient: "from-rose-500 to-orange-400",
    coverEmoji: "🗾",
    startDate: "2026-06-15",
    endDate: "2026-06-30",
    status: "upcoming",
    budget: { total: 8500, spent: 3200, currency: "USD" },
  },
  {
    id: "t2",
    title: "Amalfi Coast Summer",
    destination: "Italy",
    coverGradient: "from-blue-500 to-cyan-400",
    coverEmoji: "🇮🇹",
    startDate: "2026-07-10",
    endDate: "2026-07-20",
    status: "upcoming",
    budget: { total: 6000, spent: 1800, currency: "USD" },
  },
  {
    id: "t3",
    title: "Bali Digital Nomad Month",
    destination: "Indonesia",
    coverGradient: "from-emerald-500 to-teal-400",
    coverEmoji: "🌴",
    startDate: "2025-11-01",
    endDate: "2025-11-30",
    status: "completed",
    budget: { total: 3500, spent: 3100, currency: "USD" },
  },
  {
    id: "t4",
    title: "Morocco Desert Trek",
    destination: "Morocco",
    coverGradient: "from-amber-500 to-yellow-400",
    coverEmoji: "🏜️",
    startDate: "2026-09-05",
    endDate: "2026-09-15",
    status: "planning",
    budget: { total: 4200, spent: 0, currency: "USD" },
  },
  {
    id: "t5",
    title: "Iceland Northern Lights",
    destination: "Iceland",
    coverGradient: "from-violet-500 to-purple-400",
    coverEmoji: "🌌",
    startDate: "2026-01-10",
    endDate: "2026-01-20",
    status: "planning",
    budget: { total: 7800, spent: 500, currency: "USD" },
  },
];

export const mockCities: City[] = [
  { id: "c1", name: "Tokyo", country: "Japan", coverGradient: "from-rose-500 to-pink-600", rating: 4.9, costLevel: "$$$", emoji: "🗼", tags: ["Food", "Culture", "Technology"] },
  { id: "c2", name: "Kyoto", country: "Japan", coverGradient: "from-orange-400 to-red-500", rating: 4.8, costLevel: "$$", emoji: "⛩️", tags: ["Historical", "Culture", "Nature"] },
  { id: "c3", name: "Rome", country: "Italy", coverGradient: "from-amber-400 to-orange-500", rating: 4.7, costLevel: "$$$", emoji: "🏛️", tags: ["Historical", "Food", "Art"] },
  { id: "c4", name: "Bali", country: "Indonesia", coverGradient: "from-emerald-400 to-teal-500", rating: 4.8, costLevel: "$", emoji: "🌺", tags: ["Nature", "Luxury", "Adventure"] },
  { id: "c5", name: "Marrakech", country: "Morocco", coverGradient: "from-yellow-400 to-amber-500", rating: 4.6, costLevel: "$", emoji: "🕌", tags: ["Culture", "Adventure", "Food"] },
  { id: "c6", name: "Reykjavik", country: "Iceland", coverGradient: "from-violet-500 to-indigo-600", rating: 4.9, costLevel: "$$$$", emoji: "🌌", tags: ["Nature", "Adventure", "Luxury"] },
];

export const mockActivities: Activity[] = [
  { id: "a1", name: "TeamLab Borderless Museum", location: "Tokyo", category: "Adventure", rating: 4.9, price: "$30", emoji: "🎨" },
  { id: "a2", name: "Fushimi Inari Shrine", location: "Kyoto", category: "Historical", rating: 4.8, price: "Free", emoji: "⛩️" },
  { id: "a3", name: "Truffle Pasta Masterclass", location: "Rome", category: "Food", rating: 4.7, price: "$85", emoji: "🍝" },
  { id: "a4", name: "Ubud Sacred Monkey Forest", location: "Bali", category: "Nature", rating: 4.6, price: "$5", emoji: "🐒" },
  { id: "a5", name: "Sahara Camel Trek", location: "Marrakech", category: "Adventure", rating: 4.8, price: "$120", emoji: "🐫" },
  { id: "a6", name: "Northern Lights Photo Tour", location: "Reykjavik", category: "Nature", rating: 4.9, price: "$150", emoji: "🌠" },
  { id: "a7", name: "Tsukiji Fish Market Tour", location: "Tokyo", category: "Food", rating: 4.7, price: "$25", emoji: "🐟" },
  { id: "a8", name: "Geisha District Walking Tour", location: "Kyoto", category: "Historical", rating: 4.8, price: "$45", emoji: "🎎" },
];

export const mockItinerary: ItineraryDay[] = [
  {
    date: "Jun 15",
    city: "Tokyo",
    stops: [
      { time: "10:00 AM", title: "Arrive at Narita Airport", type: "transport", emoji: "✈️" },
      { time: "1:00 PM", title: "Check-in Shinjuku Hotel", type: "hotel", emoji: "🏨" },
      { time: "4:00 PM", title: "Explore Shibuya Crossing", type: "activity", emoji: "🚶" },
      { time: "7:00 PM", title: "Ramen dinner in Shinjuku", type: "food", emoji: "🍜" },
    ],
  },
  {
    date: "Jun 16",
    city: "Tokyo",
    stops: [
      { time: "9:00 AM", title: "TeamLab Borderless Museum", type: "activity", emoji: "🎨", cost: "$30" },
      { time: "1:00 PM", title: "Harajuku fashion street", type: "activity", emoji: "👗" },
      { time: "7:00 PM", title: "Sushi omakase experience", type: "food", emoji: "🍣", cost: "$120" },
    ],
  },
  {
    date: "Jun 18",
    city: "Kyoto",
    stops: [
      { time: "8:00 AM", title: "Shinkansen to Kyoto", type: "transport", emoji: "🚄", cost: "$60" },
      { time: "11:00 AM", title: "Fushimi Inari Shrine", type: "activity", emoji: "⛩️" },
      { time: "3:00 PM", title: "Arashiyama Bamboo Grove", type: "activity", emoji: "🎋" },
    ],
  },
];

export const mockBudgetCategories: BudgetCategory[] = [
  { name: "Flights", budgeted: 2500, spent: 2100, color: "#7C3AED" },
  { name: "Hotels", budgeted: 2000, spent: 800, color: "#A855F7" },
  { name: "Food", budgeted: 1500, spent: 200, color: "#3B82F6" },
  { name: "Activities", budgeted: 1000, spent: 100, color: "#10B981" },
  { name: "Shopping", budgeted: 800, spent: 0, color: "#F59E0B" },
  { name: "Transport", budgeted: 700, spent: 0, color: "#EF4444" },
];

export const mockNotes: Note[] = [
  {
    id: "n1",
    title: "Visa Requirements",
    content: "Japan tourist visa — US passport holders get 90 days visa-free. Bring: passport, return ticket, hotel bookings. Apply online at Japan eVisa portal if required.",
    createdAt: "2026-01-15",
    tags: ["important", "visa"],
  },
  {
    id: "n2",
    title: "Currency Tips",
    content: "Japan is still very cash-heavy. Exchange at airport or 7-Eleven ATMs. Carry ¥50,000 minimum per week. Many restaurants and smaller shops don't accept cards.",
    createdAt: "2026-01-20",
    tags: ["money", "tips"],
  },
  {
    id: "n3",
    title: "Packing Essentials",
    content: "IC Card for trains, pocket wifi rental, portable umbrella, comfortable walking shoes (will walk 15k+ steps/day). Bring a small backpack for day trips.",
    createdAt: "2026-02-01",
    tags: ["packing"],
  },
];

export const mockPackingList: PackingCategory[] = [
  {
    category: "Documents",
    items: [
      { id: "p1", name: "Passport", packed: true },
      { id: "p2", name: "Travel insurance", packed: true },
      { id: "p3", name: "Hotel confirmations", packed: false },
      { id: "p4", name: "Flight tickets", packed: true },
    ],
  },
  {
    category: "Electronics",
    items: [
      { id: "p5", name: "Phone charger", packed: true },
      { id: "p6", name: "Universal adapter", packed: false },
      { id: "p7", name: "Portable wifi device", packed: false },
      { id: "p8", name: "Camera", packed: true },
    ],
  },
  {
    category: "Clothing",
    items: [
      { id: "p9", name: "10 t-shirts", packed: false },
      { id: "p10", name: "3 pants/jeans", packed: false },
      { id: "p11", name: "Rain jacket", packed: false },
      { id: "p12", name: "Walking shoes", packed: true },
    ],
  },
];
