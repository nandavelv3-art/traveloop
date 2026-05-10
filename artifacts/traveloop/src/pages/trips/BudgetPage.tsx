import { motion } from "framer-motion";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { mockBudgetCategories } from "@/services/mockData";
import { AlertTriangle } from "lucide-react";

const TOTAL = 8500;
const SPENT = 3200;

export default function BudgetPage() {
  const spentPct = ((SPENT / TOTAL) * 100).toFixed(0);

  return (
    <div className="pb-8 space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Budget", value: `$${TOTAL.toLocaleString()}`, color: "#7C3AED" },
          { label: "Spent", value: `$${SPENT.toLocaleString()}`, color: "#A855F7" },
          { label: "Remaining", value: `$${(TOTAL - SPENT).toLocaleString()}`, color: "#10B981" },
        ].map(({ label, value, color }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-4 text-center"
            style={{ background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,0.08)" }}
            data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <p className="text-white/40 text-xs mb-1">{label}</p>
            <p className="font-bold text-lg" style={{ color }}>{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Budget used bar */}
      <div className="rounded-2xl p-5" style={{ background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex justify-between items-center mb-3">
          <p className="text-white font-semibold text-sm">Overall Spending</p>
          <p className="text-white/50 text-xs">{spentPct}% used</p>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div
            className="h-full rounded-full gradient-purple"
            initial={{ width: 0 }}
            animate={{ width: `${spentPct}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Pie chart */}
        <div className="rounded-2xl p-5" style={{ background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white font-semibold text-sm mb-4">Category Breakdown</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={mockBudgetCategories} dataKey="budgeted" nameKey="name" cx="50%" cy="50%" outerRadius={80} paddingAngle={3}>
                {mockBudgetCategories.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#171717", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white", fontSize: 12 }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-3">
            {mockBudgetCategories.map(c => (
              <div key={c.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                <span className="text-white/50 text-xs">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar chart */}
        <div className="rounded-2xl p-5" style={{ background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white font-semibold text-sm mb-4">Budget vs Spent</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockBudgetCategories} barGap={4}>
              <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#171717", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white", fontSize: 12 }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              />
              <Bar dataKey="budgeted" fill="rgba(124,58,237,0.4)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="spent" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category rows */}
      <div className="rounded-2xl" style={{ background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-white font-semibold text-sm">All Categories</p>
        </div>
        <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
          {mockBudgetCategories.map((cat, i) => {
            const pct = Math.min((cat.spent / cat.budgeted) * 100, 100);
            const over = cat.spent > cat.budgeted;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="px-5 py-4"
                data-testid={`budget-row-${cat.name.toLowerCase()}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                    <span className="text-white text-sm font-medium">{cat.name}</span>
                    {over && <AlertTriangle className="w-3.5 h-3.5 text-red-400" />}
                  </div>
                  <span className="text-white/50 text-xs">${cat.spent.toLocaleString()} / ${cat.budgeted.toLocaleString()}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: over ? "#EF4444" : cat.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.7, delay: i * 0.05 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
