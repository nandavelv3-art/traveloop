import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Grid3X3, List } from "lucide-react";
import { Link } from "wouter";
import { useAppStore } from "@/app/store/useAppStore";
import { TripCard } from "@/components/shared/TripCard";
import type { TripStatus } from "@/types";

const filters: { label: string; value: "all" | TripStatus }[] = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Planning", value: "planning" },
  { label: "Completed", value: "completed" },
];

export default function TripsPage() {
  const { trips } = useAppStore();
  const [filter, setFilter] = useState<"all" | TripStatus>("all");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = trips.filter(t => {
    const matchesFilter = filter === "all" || t.status === filter;
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.destination.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-white text-2xl font-bold">My Trips</h1>
          <p className="text-white/40 text-sm mt-0.5">{trips.length} trips planned</p>
        </div>
        <Link href="/trips/create">
          <motion.button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-purple text-white text-sm font-semibold"
            whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
            whileTap={{ scale: 0.97 }}
            data-testid="button-new-trip"
          >
            <Plus className="w-4 h-4" />
            New Trip
          </motion.button>
        </Link>
      </motion.div>

      {/* Controls */}
      <motion.div
        className="flex flex-col md:flex-row gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search trips..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white outline-none"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            data-testid="input-search-trips"
          />
        </div>

        {/* Filter pills */}
        <div className="flex gap-2">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className="px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                background: filter === f.value ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.06)",
                color: filter === f.value ? "#A855F7" : "rgba(255,255,255,0.5)",
                border: filter === f.value ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(255,255,255,0.1)",
              }}
              data-testid={`filter-${f.value}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div
          className="flex rounded-xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {[{ mode: "grid" as const, icon: Grid3X3 }, { mode: "list" as const, icon: List }].map(({ mode, icon: Icon }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className="p-2.5 transition-all"
              style={{ background: viewMode === mode ? "rgba(124,58,237,0.3)" : "transparent", color: viewMode === mode ? "#A855F7" : "rgba(255,255,255,0.4)" }}
              data-testid={`button-view-${mode}`}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Trip grid/list */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/30 text-4xl mb-3">✈️</p>
          <p className="text-white/50 text-base">No trips found</p>
          <p className="text-white/30 text-sm mt-1">Try a different filter or search term</p>
        </div>
      ) : (
        <div className={viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          : "flex flex-col gap-4"
        }>
          {filtered.map((trip, i) => (
            <TripCard key={trip.id} trip={trip} index={i} compact={viewMode === "list"} />
          ))}
        </div>
      )}
    </div>
  );
}
