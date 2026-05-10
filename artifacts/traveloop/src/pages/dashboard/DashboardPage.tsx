import { motion } from "framer-motion";
import { Globe, Plane, Map, TrendingUp, Plus, Sparkles, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useAppStore } from "@/app/store/useAppStore";
import { StatCard } from "@/components/shared/StatCard";
import { TripCard } from "@/components/shared/TripCard";
import { CityCard } from "@/components/shared/CityCard";
import { mockCities } from "@/services/mockData";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

const stats = [
  { title: "Total Trips", value: 5, icon: Map, color: "#7C3AED" },
  { title: "Upcoming", value: 3, icon: Plane, color: "#3B82F6" },
  { title: "Countries", value: 8, icon: Globe, color: "#10B981" },
  { title: "Miles Traveled", value: 28400, icon: TrendingUp, color: "#F59E0B" },
];

export default function DashboardPage() {
  const { auth, trips } = useAppStore();
  const recentTrips = trips.slice(0, 3);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <p className="text-white/50 text-sm mb-1">
            {getGreeting()}, {auth.user?.name?.split(" ")[0]} ✈️
          </p>
          <h1 className="text-white text-3xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
            Where to next?
          </h1>
        </div>

        <Link href="/trips/create">
          <motion.button
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-purple text-white text-sm font-semibold"
            whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
            whileTap={{ scale: 0.97 }}
            data-testid="button-plan-new-trip"
          >
            <Plus className="w-4 h-4" />
            Plan New Trip
          </motion.button>
        </Link>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.title} {...stat} index={i} />
        ))}
      </div>

      {/* AI Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(168,85,247,0.1) 100%)",
          border: "1px solid rgba(124,58,237,0.3)",
        }}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(168,85,247,0.2)" }}>
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-purple-300 text-xs font-semibold uppercase tracking-wider">AI Recommendation</p>
            </div>
            <h3 className="text-white font-bold text-lg mb-1">You'd love Lisbon, Portugal</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Based on your love of history, food, and coastal culture — Lisbon offers all three at a fraction of the cost. Golden trams, pastel de nata, and Atlantic sunsets await.
            </p>
            <button
              className="mt-3 text-purple-400 text-sm font-medium flex items-center gap-1 hover:text-purple-300 transition-colors"
              data-testid="button-ai-recommendation"
            >
              Explore Lisbon <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Recent Trips */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-lg">Recent Trips</h2>
          <Link href="/trips">
            <span className="text-purple-400 text-sm hover:text-purple-300 flex items-center gap-1 cursor-pointer" data-testid="link-all-trips">
              View all <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentTrips.map((trip, i) => (
            <TripCard key={trip.id} trip={trip} index={i} />
          ))}
        </div>
      </div>

      {/* Trending Destinations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-lg">Trending Destinations</h2>
          <Link href="/explore">
            <span className="text-purple-400 text-sm hover:text-purple-300 flex items-center gap-1 cursor-pointer" data-testid="link-explore">
              Explore all <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {mockCities.map((city, i) => (
            <CityCard key={city.id} city={city} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
