import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { lazy, Suspense } from "react";
const WolfensteinRoom = lazy(() => import("./pages/WolfensteinRoom"));
const OmnibusOfFun = lazy(() => import("./pages/OmnibusOfFun"));
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/wolfenstein" element={
            <Suspense fallback={<div className="h-screen w-full bg-black" />}>
              <WolfensteinRoom />
            </Suspense>
          } />
          <Route path="/omnibus" element={
            <Suspense fallback={<div className="h-screen w-full" style={{ background: '#0f1a26' }} />}>
              <OmnibusOfFun />
            </Suspense>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
