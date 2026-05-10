import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Star } from "lucide-react";
import { CityCard } from "@/components/shared/CityCard";
import { mockCities, mockActivities } from "@/services/mockData";
import type { ActivityCategory } from "@/types";

const categories: (ActivityCategory | "All")[] = ["All", "Adventure", "Food", "Nature", "Luxury", "Historical", "Nightlife"];

const categoryColors: Record<string, string> = {
  Adventure: "#F59E0B",
  Food: "#EF4444",
  Nature: "#10B981",
  Luxury: "#7C3AED",
  Historical: "#3B82F6",
  Nightlife: "#EC4899",
};

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<ActivityCategory | "All">("All");

  const filteredCities = mockCities.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.country.toLowerCase().includes(search.toLowerCase())
  );

  const filteredActivities = mockActivities.filter(a =>
    activeCategory === "All" || a.category === activeCategory
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-white text-2xl font-bold mb-1">Explore the World</h1>
        <p className="text-white/40 text-sm mb-5">Discover cities and activities for your next adventure</p>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input
            type="search"
            value={search}
            onChange={handleSearch}
            placeholder="Search cities, countries..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm text-white outline-none"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            data-testid="input-search-explore"
          />
        </div>
      </motion.div>

      {/* Cities */}
      <section>
        <h2 className="text-white font-bold text-lg mb-4">Popular Destinations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {filteredCities.map((city, i) => (
            <CityCard key={city.id} city={city} index={i} />
          ))}
        </div>
        {filteredCities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/30 text-3xl mb-2">🔍</p>
            <p className="text-white/40">No cities match your search</p>
          </div>
        )}
      </section>

      {/* Activities */}
      <section>
        <h2 className="text-white font-bold text-lg mb-4">Activities & Experiences</h2>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                background: activeCategory === cat
                  ? (cat === "All" ? "rgba(124,58,237,0.3)" : (categoryColors[cat] ?? "#7C3AED") + "33")
                  : "rgba(255,255,255,0.06)",
                color: activeCategory === cat
                  ? (cat === "All" ? "#A855F7" : (categoryColors[cat] ?? "#A855F7"))
                  : "rgba(255,255,255,0.5)",
                border: activeCategory === cat
                  ? `1px solid ${cat === "All" ? "rgba(124,58,237,0.4)" : (categoryColors[cat] ?? "#7C3AED") + "55"}`
                  : "1px solid rgba(255,255,255,0.1)",
              }}
              data-testid={`filter-category-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredActivities.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center justify-between px-5 py-4 rounded-2xl group"
              style={{ background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,0.08)" }}
              data-testid={`activity-card-${activity.id}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: (categoryColors[activity.category] ?? "#7C3AED") + "20" }}
                >
                  {activity.emoji}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{activity.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-white/40 text-xs">{activity.location}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span
                      className="px-1.5 py-0.5 rounded text-xs font-medium"
                      style={{ background: (categoryColors[activity.category] ?? "#7C3AED") + "20", color: categoryColors[activity.category] ?? "#A855F7" }}
                    >
                      {activity.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end mb-0.5">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-white text-xs font-medium">{activity.rating}</span>
                  </div>
                  <p className="text-white/60 text-sm font-semibold">{activity.price}</p>
                </div>
                <motion.button
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-all"
                  style={{ background: "rgba(124,58,237,0.3)", border: "1px solid rgba(124,58,237,0.4)" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`button-add-activity-${activity.id}`}
                >
                  Add to Trip
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
