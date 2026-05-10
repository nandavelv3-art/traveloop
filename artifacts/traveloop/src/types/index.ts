export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

export interface Budget {
  total: number;
  spent: number;
  currency: string;
}

export interface BudgetCategory {
  name: string;
  budgeted: number;
  spent: number;
  color: string;
}

export type TripStatus = "upcoming" | "planning" | "completed" | "ongoing";

export interface Trip {
  id: string;
  title: string;
  destination: string;
  coverGradient: string;
  coverEmoji: string;
  startDate: string;
  endDate: string;
  status: TripStatus;
  budget: Budget;
}

export interface City {
  id: string;
  name: string;
  country: string;
  coverGradient: string;
  rating: number;
  costLevel: string;
  emoji: string;
  tags: string[];
}

export type ActivityCategory = "Adventure" | "Food" | "Nature" | "Luxury" | "Historical" | "Nightlife";

export interface Activity {
  id: string;
  name: string;
  location: string;
  category: ActivityCategory;
  rating: number;
  price: string;
  emoji: string;
}

export interface ItineraryStop {
  time: string;
  title: string;
  type: "transport" | "hotel" | "activity" | "food";
  emoji: string;
  cost?: string;
}

export interface ItineraryDay {
  date: string;
  city: string;
  stops: ItineraryStop[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags: string[];
}

export interface PackingItem {
  id: string;
  name: string;
  packed: boolean;
}

export interface PackingCategory {
  category: string;
  items: PackingItem[];
}
