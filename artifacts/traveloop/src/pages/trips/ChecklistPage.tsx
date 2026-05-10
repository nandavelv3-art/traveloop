import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { mockPackingList } from "@/services/mockData";
import type { PackingCategory, PackingItem } from "@/types";

export default function ChecklistPage() {
  const [categories, setCategories] = useState<PackingCategory[]>(mockPackingList);

  const toggleItem = (catIdx: number, itemId: string) => {
    setCategories(prev => prev.map((cat, i) =>
      i === catIdx
        ? { ...cat, items: cat.items.map(item => item.id === itemId ? { ...item, packed: !item.packed } : item) }
        : cat
    ));
  };

  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);
  const packedItems = categories.reduce((sum, c) => sum + c.items.filter(i => i.packed).length, 0);
  const overallPct = Math.round((packedItems / totalItems) * 100);

  return (
    <div className="pb-8 space-y-5">
      {/* Overall progress */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5"
        style={{ background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-white font-semibold">Packing Progress</p>
            <p className="text-white/40 text-sm mt-0.5">{packedItems} of {totalItems} items packed</p>
          </div>
          <div className="w-16 h-16 relative flex items-center justify-center">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
              <motion.circle
                cx="28" cy="28" r="22" fill="none"
                stroke="#7C3AED" strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 22}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 22 * (1 - overallPct / 100) }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <span className="text-white font-bold text-sm relative z-10">{overallPct}%</span>
          </div>
        </div>
        <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div
            className="h-full rounded-full gradient-purple"
            initial={{ width: 0 }}
            animate={{ width: `${overallPct}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </motion.div>

      {/* Categories */}
      {categories.map((cat, catIdx) => {
        const packed = cat.items.filter(i => i.packed).length;
        const pct = Math.round((packed / cat.items.length) * 100);

        return (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIdx * 0.08 }}
            className="rounded-2xl"
            style={{ background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,0.08)" }}
            data-testid={`category-${cat.category.toLowerCase()}`}
          >
            {/* Category header */}
            <div className="px-5 py-3.5 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-white font-semibold text-sm">{cat.category}</p>
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-xs">{packed}/{cat.items.length}</span>
                <div className="w-16 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: "#10B981" }} />
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="px-5 py-3 space-y-2">
              {cat.items.map((item: PackingItem) => (
                <motion.div
                  key={item.id}
                  className="flex items-center gap-3 py-1.5 cursor-pointer group"
                  onClick={() => toggleItem(catIdx, item.id)}
                  whileTap={{ scale: 0.97 }}
                  data-testid={`item-${item.id}`}
                >
                  <motion.div
                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                      background: item.packed ? "#7C3AED" : "transparent",
                      border: item.packed ? "1.5px solid #7C3AED" : "1.5px solid rgba(255,255,255,0.2)",
                    }}
                    whileTap={{ scale: 0.85 }}
                    animate={{ scale: item.packed ? [1, 1.15, 1] : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AnimatePresence>
                      {item.packed && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 400 }}>
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <span className="text-sm transition-all" style={{ color: item.packed ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.8)", textDecoration: item.packed ? "line-through" : "none" }}>
                    {item.name}
                  </span>
                </motion.div>
              ))}

              <button
                className="flex items-center gap-1.5 text-white/20 hover:text-purple-400 text-xs transition-colors pt-1"
                data-testid={`button-add-item-${catIdx}`}
              >
                <Plus className="w-3.5 h-3.5" /> Add item
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
