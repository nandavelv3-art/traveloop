import { create } from "zustand";
import type { User, Trip } from "@/types";
import { mockTrips } from "@/services/mockData";

interface AppState {
  auth: {
    user: User | null;
    isAuthenticated: boolean;
  };
  trips: Trip[];
  ui: {
    sidebarOpen: boolean;
    activeTrip: string | null;
  };
  login: (user: User) => void;
  logout: () => void;
  setTrips: (trips: Trip[]) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveTrip: (id: string | null) => void;
  updatePackingItem: (tripId: string, itemId: string, packed: boolean) => void;
}

const defaultUser: User = {
  id: "1",
  name: "Alex Chen",
  email: "alex@traveloop.com",
  avatar: null,
};

export const useAppStore = create<AppState>((set) => ({
  auth: {
    user: defaultUser,
    isAuthenticated: true,
  },
  trips: mockTrips,
  ui: {
    sidebarOpen: true,
    activeTrip: null,
  },
  login: (user) => set((state) => ({ auth: { ...state.auth, user, isAuthenticated: true } })),
  logout: () => set((state) => ({ auth: { ...state.auth, user: null, isAuthenticated: false } })),
  setTrips: (trips) => set({ trips }),
  toggleSidebar: () => set((state) => ({ ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen } })),
  setSidebarOpen: (open) => set((state) => ({ ui: { ...state.ui, sidebarOpen: open } })),
  setActiveTrip: (id) => set((state) => ({ ui: { ...state.ui, activeTrip: id } })),
  updatePackingItem: (_tripId, _itemId, _packed) => {}, // handled locally in component
}));
