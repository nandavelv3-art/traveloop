import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  color: string;
  index?: number;
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString() + suffix);

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [count, value]);

  return <motion.span>{rounded}</motion.span>;
}

export function StatCard({ title, value, suffix = "", icon: Icon, color, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="rounded-2xl p-5"
      style={{
        background: "hsl(0 0% 9%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      data-testid={`card-stat-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2">{title}</p>
          <p className="text-white text-3xl font-bold tracking-tight">
            <AnimatedNumber value={value} suffix={suffix} />
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: color + "20" }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
    </motion.div>
  );
}
