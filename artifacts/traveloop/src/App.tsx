import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter, Redirect, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAppStore } from "@/app/store/useAppStore";

const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const SignupPage = lazy(() => import("@/pages/auth/SignupPage"));
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const TripsPage = lazy(() => import("@/pages/trips/TripsPage"));
const CreateTripPage = lazy(() => import("@/pages/trips/CreateTripPage"));
const TripDetailPage = lazy(() => import("@/pages/trips/TripDetailPage"));
const ExplorePage = lazy(() => import("@/pages/explore/ExplorePage"));
const ProfilePage = lazy(() => import("@/pages/profile/ProfilePage"));
const SharedItineraryPage = lazy(() => import("@/pages/shared/SharedItineraryPage"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
    </div>
  );
}

function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppStore(s => s.auth.isAuthenticated);
  const [, setLocation] = useLocation();
  if (!isAuthenticated) {
    setLocation("/login");
    return null;
  }
  return <>{children}</>;
}

function AppRoute({ component: Component }: { component: React.ComponentType }) {
  return (
    <AuthGuard>
      <AppLayout>
        <Component />
      </AppLayout>
    </AuthGuard>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/shared/:shareCode" component={SharedItineraryPage} />

        <Route path="/dashboard">
          <AppRoute component={DashboardPage} />
        </Route>
        <Route path="/trips/create">
          <AppRoute component={CreateTripPage} />
        </Route>
        <Route path="/trips/:id">
          <AppRoute component={TripDetailPage} />
        </Route>
        <Route path="/trips">
          <AppRoute component={TripsPage} />
        </Route>
        <Route path="/explore">
          <AppRoute component={ExplorePage} />
        </Route>
        <Route path="/profile">
          <AppRoute component={ProfilePage} />
        </Route>

        <Route path="/">
          <RootRedirect />
        </Route>

        <Route>
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
              <p className="text-white/20 text-6xl font-bold mb-3">404</p>
              <p className="text-white/50">Page not found</p>
            </div>
          </div>
        </Route>
      </Switch>
    </Suspense>
  );
}

function RootRedirect() {
  const isAuthenticated = useAppStore(s => s.auth.isAuthenticated);
  return <Redirect to={isAuthenticated ? "/dashboard" : "/login"} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
