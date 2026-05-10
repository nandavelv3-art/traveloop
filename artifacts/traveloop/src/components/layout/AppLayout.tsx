import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useAppStore } from "@/app/store/useAppStore";

interface AppLayoutProps {
  children: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export function AppLayout({ children }: AppLayoutProps) {
  const [location] = useLocation();
  const { ui } = useAppStore();

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      {/* Main content */}
      <div
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{ marginLeft: ui.sidebarOpen ? 240 : 0 }}
      >
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            key={location}
            className="flex-1 overflow-auto"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
