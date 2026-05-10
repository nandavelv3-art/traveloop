import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { City } from "@/types";

interface CityCardProps {
  city: City;
  index?: number;
  onAdd?: (city: City) => void;
}

export function CityCard({ city, index = 0, onAdd }: CityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="rounded-2xl overflow-hidden cursor-pointer group"
      style={{ border: "1px solid rgba(255,255,255,0.08)", background: "hsl(0 0% 9%)" }}
      data-testid={`card-city-${city.id}`}
    >
      {/* Cover gradient */}
      <div className={`h-32 bg-gradient-to-br ${city.coverGradient} relative flex items-center justify-center`}>
        <div className="absolute inset-0 bg-black/10" />
        <span className="text-5xl relative z-10">{city.emoji}</span>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white"
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
        >
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          {city.rating}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-white font-bold text-base">{city.name}</h3>
            <p className="text-white/50 text-xs">{city.country}</p>
          </div>
          <span className="text-white/60 text-sm font-medium">{city.costLevel}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {city.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ background: "rgba(124,58,237,0.15)", color: "#A855F7", border: "1px solid rgba(124,58,237,0.2)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {onAdd && (
          <button
            className="w-full py-2 rounded-xl text-xs font-semibold text-white transition-all"
            style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}
            onClick={() => onAdd(city)}
            data-testid={`button-add-city-${city.id}`}
          >
            Add to Trip
          </button>
        )}
      </div>
    </motion.div>
  );
}
