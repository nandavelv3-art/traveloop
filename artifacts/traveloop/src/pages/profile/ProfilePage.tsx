import { useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Check, Globe, Map, Clock } from "lucide-react";
import { useAppStore } from "@/app/store/useAppStore";
import { CityCard } from "@/components/shared/CityCard";
import { mockCities } from "@/services/mockData";

export default function ProfilePage() {
  const { auth, login } = useAppStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(auth.user?.name ?? "");

  const handleSave = () => {
    if (auth.user) {
      login({ ...auth.user, name });
    }
    setEditing(false);
  };

  const savedCities = mockCities.slice(0, 3);

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-6 relative overflow-hidden"
        style={{ background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-violet-500/30 to-purple-600/10" />
        <div className="relative z-10">
          {/* Avatar */}
          <div className="mb-4">
            <div className="w-16 h-16 rounded-2xl gradient-purple flex items-center justify-center shadow-lg glow-purple">
              <span className="text-white font-bold text-xl">
                {auth.user?.name?.split(" ").map(n => n[0]).join("") ?? "U"}
              </span>
            </div>
          </div>

          {/* Name */}
          <div className="flex items-center gap-2 mb-1">
            {editing ? (
              <div className="flex items-center gap-2">
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="bg-transparent text-white text-xl font-bold outline-none border-b border-purple-500 pb-1"
                  autoFocus
                  data-testid="input-profile-name"
                />
                <button onClick={handleSave} className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400" data-testid="button-save-name">
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <h1 className="text-white text-2xl font-bold">{auth.user?.name}</h1>
                <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-colors" data-testid="button-edit-name">
                  <Edit2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
          <p className="text-white/40 text-sm">{auth.user?.email}</p>
        </div>
      </motion.div>

      {/* Travel stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Trips Planned", value: 5, icon: Map, color: "#7C3AED" },
          { label: "Countries", value: 8, icon: Globe, color: "#3B82F6" },
          { label: "Avg Duration", value: 12, suffix: "d", icon: Clock, color: "#10B981" },
        ].map(({ label, value, suffix = "", icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl p-4 text-center"
            style={{ background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,0.08)" }}
            data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className="w-8 h-8 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: color + "20" }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <p className="text-white font-bold text-xl">{value}{suffix}</p>
            <p className="text-white/40 text-xs mt-0.5">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl"
        style={{ background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-white font-semibold">Travel Preferences</p>
        </div>
        <div className="px-5 py-4 space-y-4">
          {[
            { label: "Preferred Style", value: "Cultural & Culinary" },
            { label: "Usual Budget", value: "Mid-range ($$$)" },
            { label: "Travel Frequency", value: "3–4 times per year" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-white/50 text-sm">{label}</span>
              <span className="text-white text-sm font-medium">{value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Saved destinations */}
      <div>
        <h2 className="text-white font-bold text-base mb-4">Saved Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {savedCities.map((city, i) => (
            <CityCard key={city.id} city={city} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
