import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { ArrowLeft, Calendar, DollarSign, Share2, MapPin } from "lucide-react";
import { useAppStore } from "@/app/store/useAppStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ItineraryPage from "./ItineraryPage";
import BudgetPage from "./BudgetPage";
import ChecklistPage from "./ChecklistPage";
import NotesPage from "./NotesPage";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function TripDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { trips } = useAppStore();
  const [tab, setTab] = useState("overview");

  const trip = trips.find(t => t.id === id) ?? trips[0];
  if (!trip) return <div className="p-8 text-white/50">Trip not found</div>;

  const spentPct = Math.min((trip.budget.spent / trip.budget.total) * 100, 100);

  return (
    <div className="min-h-full">
      {/* Hero */}
      <div className={`relative h-48 bg-gradient-to-br ${trip.coverGradient} flex items-end`}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-6 md:px-8 pb-6 w-full">
          <Link href="/trips">
            <button className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-3 transition-colors" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" /> All Trips
            </button>
          </Link>
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-3.5 h-3.5 text-white/60" />
                <span className="text-white/60 text-sm">{trip.destination}</span>
              </div>
              <h1 className="text-white text-3xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
                {trip.coverEmoji} {trip.title}
              </h1>
            </div>
            <button
              className="p-2.5 rounded-xl text-white/60 hover:text-white transition-colors"
              style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}
              data-testid="button-share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 md:px-8">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mt-4 mb-6 h-auto p-1 gap-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {["overview", "itinerary", "budget", "checklist", "notes"].map(t => (
              <TabsTrigger key={t} value={t} className="capitalize text-xs rounded-lg px-3 py-2" data-testid={`tab-${t}`}>
                {t}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-5 pb-8">
              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Start Date", value: formatDate(trip.startDate), icon: Calendar },
                  { label: "End Date", value: formatDate(trip.endDate), icon: Calendar },
                  { label: "Budget", value: `$${trip.budget.total.toLocaleString()}`, icon: DollarSign },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-2xl p-4" style={{ background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-white/50 text-xs">{label}</span>
                    </div>
                    <p className="text-white font-semibold text-sm">{value}</p>
                  </div>
                ))}
              </div>

              {/* Budget progress */}
              <div className="rounded-2xl p-5" style={{ background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold">Budget Overview</h3>
                  <span className="text-white/50 text-sm">${trip.budget.spent.toLocaleString()} / ${trip.budget.total.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full mb-2" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <motion.div className="h-full rounded-full" style={{ background: "#7C3AED" }}
                    initial={{ width: 0 }} animate={{ width: `${spentPct}%` }} transition={{ duration: 0.8 }} />
                </div>
                <p className="text-white/40 text-xs">{spentPct.toFixed(0)}% of budget used</p>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Itinerary", tab: "itinerary", emoji: "🗓️" },
                  { label: "Budget", tab: "budget", emoji: "💰" },
                  { label: "Checklist", tab: "checklist", emoji: "✅" },
                  { label: "Notes", tab: "notes", emoji: "📝" },
                ].map(({ label, tab: t, emoji }) => (
                  <motion.button
                    key={label}
                    onClick={() => setTab(t)}
                    className="p-4 rounded-2xl text-center transition-all"
                    style={{ background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,0.08)" }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    data-testid={`button-quick-${t}`}
                  >
                    <div className="text-2xl mb-2">{emoji}</div>
                    <p className="text-white text-sm font-medium">{label}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="itinerary"><ItineraryPage /></TabsContent>
          <TabsContent value="budget"><BudgetPage /></TabsContent>
          <TabsContent value="checklist"><ChecklistPage /></TabsContent>
          <TabsContent value="notes"><NotesPage /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
