import { motion } from "framer-motion";
import { Plus, Clock, MapPin } from "lucide-react";
import { mockItinerary } from "@/services/mockData";
import type { ItineraryStop } from "@/types";

const stopColors: Record<ItineraryStop["type"], string> = {
  transport: "#3B82F6",
  hotel: "#10B981",
  activity: "#7C3AED",
  food: "#F59E0B",
};

export default function ItineraryPage() {
  return (
    <div className="pb-8 space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-white/40 text-sm">{mockItinerary.length} days planned</p>
        <motion.button
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl gradient-purple text-white text-xs font-semibold"
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          data-testid="button-add-day"
        >
          <Plus className="w-3.5 h-3.5" /> Add Day
        </motion.button>
      </div>

      {mockItinerary.map((day, dayIdx) => (
        <motion.div
          key={day.date}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: dayIdx * 0.1 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,0.08)" }}
          data-testid={`day-card-${dayIdx}`}
        >
          {/* Day header */}
          <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center">
                <span className="text-white text-xs font-bold">{dayIdx + 1}</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{day.date}</p>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-purple-400" />
                  <span className="text-white/40 text-xs">{day.city}</span>
                </div>
              </div>
            </div>
            <span className="text-white/30 text-xs">{day.stops.length} stops</span>
          </div>

          {/* Stops timeline */}
          <div className="px-5 py-4 space-y-0">
            {day.stops.map((stop, stopIdx) => (
              <div key={stopIdx} className="flex gap-4 relative">
                {/* Timeline line */}
                {stopIdx < day.stops.length - 1 && (
                  <div className="absolute left-[19px] top-8 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                )}

                {/* Dot */}
                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg mt-1"
                  style={{ background: stopColors[stop.type] + "20", border: `1px solid ${stopColors[stop.type]}33` }}>
                  {stop.emoji}
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-white text-sm font-medium">{stop.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-white/30" />
                          <span className="text-white/40 text-xs">{stop.time}</span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded text-xs" style={{ background: stopColors[stop.type] + "20", color: stopColors[stop.type] }}>
                          {stop.type}
                        </span>
                      </div>
                    </div>
                    {stop.cost && (
                      <span className="text-white/60 text-xs font-medium flex-shrink-0">{stop.cost}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <motion.button
              className="flex items-center gap-1.5 text-white/30 hover:text-purple-400 text-xs transition-colors mt-1"
              whileHover={{ x: 4 }}
              data-testid={`button-add-stop-day-${dayIdx}`}
            >
              <Plus className="w-3.5 h-3.5" /> Add stop
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
