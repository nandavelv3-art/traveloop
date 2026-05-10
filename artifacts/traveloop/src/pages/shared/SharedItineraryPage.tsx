import { motion } from "framer-motion";
import { useParams } from "wouter";
import { Plane, Copy, Share2, Calendar, MapPin, Clock } from "lucide-react";
import { mockItinerary, mockTrips } from "@/services/mockData";

export default function SharedItineraryPage() {
  const { shareCode } = useParams<{ shareCode: string }>();
  const trip = mockTrips[0]; // Demo with t1

  return (
    <div className="min-h-screen bg-background">
      {/* Branded header */}
      <header className="sticky top-0 z-30" style={{ background: "rgba(15,15,15,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg gradient-purple flex items-center justify-center">
              <Plane className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-white">Traveloop</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
              data-testid="button-share-social"
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Trip header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl h-44 bg-gradient-to-br ${trip.coverGradient} flex items-end p-6 mb-8 relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-3.5 h-3.5 text-white/60" />
              <span className="text-white/60 text-sm">{trip.destination}</span>
            </div>
            <h1 className="text-white text-3xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
              {trip.coverEmoji} {trip.title}
            </h1>
            <div className="flex items-center gap-1.5 mt-1.5">
              <Calendar className="w-3.5 h-3.5 text-white/50" />
              <span className="text-white/50 text-sm">{trip.startDate} — {trip.endDate}</span>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
              Shared Itinerary
            </span>
          </div>
        </motion.div>

        {/* Share code info */}
        {shareCode && (
          <div className="mb-6 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", color: "#A855F7" }}>
            Viewing shared itinerary · Code: <span className="font-mono font-bold">{shareCode}</span>
          </div>
        )}

        {/* Itinerary */}
        <div className="space-y-5">
          {mockItinerary.map((day, dayIdx) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIdx * 0.1 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="px-5 py-3 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-7 h-7 rounded-lg gradient-purple flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{dayIdx + 1}</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{day.date}</p>
                  <p className="text-white/40 text-xs">{day.city}</p>
                </div>
              </div>

              <div className="px-5 py-4 space-y-3">
                {day.stops.map((stop, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ background: "rgba(255,255,255,0.06)" }}>
                      {stop.emoji}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{stop.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Clock className="w-3 h-3 text-white/30" />
                        <span className="text-white/40 text-xs">{stop.time}</span>
                        {stop.cost && <span className="text-white/50 text-xs">· {stop.cost}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-3xl p-6 text-center"
          style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(168,85,247,0.1) 100%)", border: "1px solid rgba(124,58,237,0.3)" }}
        >
          <p className="text-white text-lg font-bold mb-1" style={{ fontFamily: "Playfair Display, serif" }}>
            Love this itinerary?
          </p>
          <p className="text-white/50 text-sm mb-4">Copy it to your Traveloop and make it your own</p>
          <div className="flex gap-3 justify-center">
            <motion.button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-purple text-white text-sm font-semibold"
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
              whileTap={{ scale: 0.97 }}
              data-testid="button-copy-trip"
            >
              <Copy className="w-4 h-4" /> Copy this trip
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
