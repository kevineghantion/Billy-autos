import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { FleetProvider } from "@/contexts/FleetContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { AnalyticsProvider } from "@/contexts/AnalyticsContext";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { ProtectedAdminRoute } from "@/components/ProtectedAdminRoute";
import Index from "./pages/Index";
import Fleet from "./pages/Fleet";
import Sell from "./pages/Sell";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Tracker component to handle site visits
function SiteTracker() {
  const { trackSiteVisit } = useAnalytics();
  useEffect(() => {
    trackSiteVisit();
  }, [trackSiteVisit]);
  return null;
}

import { PageTracker } from "@/components/PageTracker";

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <FleetProvider>
        <FavoritesProvider>
          <AnalyticsProvider>
            <SiteTracker />
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <PageTracker />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/fleet" element={<Fleet />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/sell" element={<Sell />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route
                    path="/secretcarloadpage"
                    element={
                      <ProtectedAdminRoute>
                        <Admin />
                      </ProtectedAdminRoute>
                    }
                  />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AnalyticsProvider>
        </FavoritesProvider>
      </FleetProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
