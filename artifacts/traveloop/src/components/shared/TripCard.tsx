import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, DollarSign, ArrowRight } from "lucide-react";
import type { Trip } from "@/types";
import { Badge } from "@/components/ui/badge";

interface TripCardProps {
  trip: Trip;
  index?: number;
  compact?: boolean;
}

const statusConfig = {
  upcoming: { label: "Upcoming", color: "#3B82F6" },
  planning: { label: "Planning", color: "#F59E0B" },
  completed: { label: "Completed", color: "#10B981" },
  ongoing: { label: "Ongoing", color: "#A855F7" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function TripCard({ trip, index = 0, compact = false }: TripCardProps) {
  const status = statusConfig[trip.status];
  const spentPct = Math.min((trip.budget.spent / trip.budget.total) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
      data-testid={`card-trip-${trip.id}`}
    >
      <Link href={`/trips/${trip.id}`}>
        <div
          className="rounded-2xl overflow-hidden cursor-pointer group"
          style={{ border: "1px solid rgba(255,255,255,0.08)", background: "hsl(0 0% 9%)" }}
        >
          {/* Cover */}
          <div className={`relative ${compact ? "h-28" : "h-36"} bg-gradient-to-br ${trip.coverGradient} flex items-end p-4`}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-3 right-3">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                style={{ background: status.color + "33", border: `1px solid ${status.color}66`, color: status.color }}
              >
                {status.label}
              </span>
            </div>
            <div className="relative z-10">
              <p className="text-white/60 text-xs mb-0.5">{trip.destination}</p>
              <h3 className="text-white font-bold text-base leading-tight">{trip.coverEmoji} {trip.title}</h3>
            </div>
          </div>

          {/* Details */}
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3 text-xs text-white/50">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(trip.startDate)} — {formatDate(trip.endDate)}</span>
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-white/50">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Budget</span>
                </div>
                <span className="text-white/70 font-medium">
                  ${trip.budget.spent.toLocaleString()} / ${trip.budget.total.toLocaleString()}
                </span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: spentPct > 80 ? "#EF4444" : "#7C3AED" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${spentPct}%` }}
                  transition={{ duration: 0.8, delay: index * 0.05 + 0.2 }}
                />
              </div>
            </div>

            {/* View button */}
            <div className="flex items-center justify-end">
              <span className="text-xs text-purple-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                View trip <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
