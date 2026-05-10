import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Map,
  Compass,
  User,
  X,
  Plane,
  ChevronRight,
} from "lucide-react";
import { useAppStore } from "@/app/store/useAppStore";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/trips", label: "My Trips", icon: Map },
  { path: "/explore", label: "Explore", icon: Compass },
  { path: "/profile", label: "Profile", icon: User },
];

export function Sidebar() {
  const [location] = useLocation();
  const { auth, ui, setSidebarOpen } = useAppStore();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {ui.sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className="fixed top-0 left-0 h-full z-50 flex flex-col"
        style={{ width: 240 }}
        initial={false}
        animate={{
          x: ui.sidebarOpen ? 0 : -240,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="h-full flex flex-col" style={{
          background: "hsl(0 0% 7%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}>
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-5">
            <Link href="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center shadow-lg">
                <Plane className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Traveloop
              </span>
            </Link>
            <button
              className="lg:hidden p-1 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setSidebarOpen(false)}
              data-testid="button-close-sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-2 space-y-1">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location === path || (path === "/trips" && location.startsWith("/trips"));
              return (
                <Link key={path} href={path}>
                  <motion.div
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer relative overflow-hidden"
                    style={{
                      background: isActive ? "rgba(124,58,237,0.15)" : "transparent",
                      color: isActive ? "#A855F7" : "rgba(255,255,255,0.6)",
                    }}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                    transition={{ duration: 0.15 }}
                    data-testid={`nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                        style={{ background: "#A855F7" }}
                        layoutId="activeIndicator"
                      />
                    )}
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{label}</span>
                    {isActive && (
                      <ChevronRight className="w-3 h-3 ml-auto opacity-60" />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Plan new trip CTA */}
          <div className="px-3 pb-3">
            <Link href="/trips/create">
              <motion.div
                className="w-full px-3 py-2.5 rounded-xl gradient-purple flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="button-new-trip-sidebar"
              >
                <Plane className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">Plan New Trip</span>
              </motion.div>
            </Link>
          </div>

          {/* User profile */}
          <div className="px-3 pb-4">
            <div
              className="flex items-center gap-3 px-3 py-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="w-8 h-8 rounded-full gradient-purple flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-xs">
                  {auth.user?.name?.split(" ").map(n => n[0]).join("") ?? "U"}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white text-sm font-medium truncate">{auth.user?.name}</p>
                <p className="text-white/40 text-xs truncate">{auth.user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
