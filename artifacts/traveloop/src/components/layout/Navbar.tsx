import { motion } from "framer-motion";
import { Menu, Bell, LogOut } from "lucide-react";
import { useAppStore } from "@/app/store/useAppStore";
import { useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/trips": "My Trips",
  "/trips/create": "Plan a Trip",
  "/explore": "Explore",
  "/profile": "Profile",
};

function getPageTitle(location: string): string {
  if (pageTitles[location]) return pageTitles[location];
  if (location.startsWith("/trips/") && location.endsWith("/itinerary")) return "Itinerary";
  if (location.startsWith("/trips/") && location.endsWith("/budget")) return "Budget";
  if (location.startsWith("/trips/") && location.endsWith("/checklist")) return "Packing List";
  if (location.startsWith("/trips/") && location.endsWith("/notes")) return "Notes";
  if (location.startsWith("/trips/")) return "Trip Detail";
  return "Traveloop";
}

export function Navbar() {
  const [location, setLocation] = useLocation();
  const { auth, toggleSidebar, logout } = useAppStore();

  const title = getPageTitle(location);

  const handleLogout = () => {
    logout();
    setLocation("/login");
  };

  return (
    <motion.header
      className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 h-14"
      style={{
        background: "rgba(15,15,15,0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          onClick={toggleSidebar}
          data-testid="button-toggle-sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold text-white">{title}</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <button
          className="relative p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          data-testid="button-notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#A855F7" }} />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="w-8 h-8 rounded-full gradient-purple flex items-center justify-center cursor-pointer"
              data-testid="button-user-menu"
            >
              <span className="text-white font-semibold text-xs">
                {auth.user?.name?.split(" ").map(n => n[0]).join("") ?? "U"}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-white">{auth.user?.name}</p>
              <p className="text-xs text-muted-foreground">{auth.user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer" data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
}
