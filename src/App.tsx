import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { FleetProvider } from "@/contexts/FleetContext";
import { ProtectedAdminRoute } from "@/components/ProtectedAdminRoute";
import Index from "./pages/Index";
import Fleet from "./pages/Fleet";
import Sell from "./pages/Sell";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <FleetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/fleet" element={<Fleet />} />
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
      </FleetProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
