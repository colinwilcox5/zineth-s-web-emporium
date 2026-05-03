import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { lazy, Suspense } from "react";
const WolfensteinRoom = lazy(() => import("./pages/WolfensteinRoom"));
const OmnibusOfFun = lazy(() => import("./pages/OmnibusOfFun"));
const Omnibus = lazy(() => import("./pages/Omnibus"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const ShopGrid = lazy(() => import("./pages/shop/ShopGrid"));
const ShopDetail = lazy(() => import("./pages/shop/ShopDetail"));
const VoidGeometry = lazy(() => import("./pages/artifacts/VoidGeometry"));
const Datamind = lazy(() => import("./pages/artifacts/Datamind"));
const AllSeeingRitual = lazy(() => import("./pages/artifacts/AllSeeingRitual"));
const ReadingRoom = lazy(() => import("./pages/reading/ReadingRoom"));
const ReadingDetail = lazy(() => import("./pages/reading/ReadingDetail"));
const ArcadeHome = lazy(() => import("./pages/arcade/ArcadeHome"));
const ArcadePong = lazy(() => import("./pages/arcade/ArcadePong"));
const ArcadeTracePentagon = lazy(() => import("./pages/arcade/ArcadeTracePentagon"));
const ArcadeTracePentagram = lazy(() => import("./pages/arcade/ArcadeTracePentagram"));
const ArcadeTraceSpiral = lazy(() => import("./pages/arcade/ArcadeTraceSpiral"));
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
            <Suspense fallback={<div className="h-screen w-full bg-black" />}>
              <Omnibus />
            </Suspense>
          } />
          <Route path="/omnibus-of-fun" element={
            <Suspense fallback={<div className="h-screen w-full" style={{ background: '#0f1a26' }} />}>
              <OmnibusOfFun />
            </Suspense>
          } />
          <Route path="/shop" element={
            <Suspense fallback={<div className="h-screen w-full" style={{ background: '#f2f0ec' }} />}>
              <ShopGrid />
            </Suspense>
          } />
          <Route path="/shop/:slug" element={
            <Suspense fallback={<div className="h-screen w-full" style={{ background: '#f2f0ec' }} />}>
              <ShopDetail />
            </Suspense>
          } />
          <Route path="/artifacts/void-geometry" element={
            <Suspense fallback={<div className="h-screen w-full" style={{ background: '#0a1119' }} />}>
              <VoidGeometry />
            </Suspense>
          } />
          <Route path="/artifacts/datamind-v3" element={
            <Suspense fallback={<div className="h-screen w-full" style={{ background: '#0a1119' }} />}>
              <Datamind />
            </Suspense>
          } />
          <Route path="/artifacts/all-seeing-ritual" element={
            <Suspense fallback={<div className="h-screen w-full" style={{ background: '#0a1119' }} />}>
              <AllSeeingRitual />
            </Suspense>
          } />
          <Route path="/reading" element={
            <Suspense fallback={<div className="h-screen w-full bg-black" />}>
              <ReadingRoom />
            </Suspense>
          } />
          <Route path="/reading/:slug" element={
            <Suspense fallback={<div className="h-screen w-full bg-black" />}>
              <ReadingDetail />
            </Suspense>
          } />
          <Route path="/arcade" element={
            <Suspense fallback={<div className="h-screen w-full bg-black" />}>
              <ArcadeHome />
            </Suspense>
          } />
          <Route path="/arcade/pong" element={
            <Suspense fallback={<div className="h-screen w-full bg-black" />}>
              <ArcadePong />
            </Suspense>
          } />
          <Route path="/arcade/trace-pentagon" element={
            <Suspense fallback={<div className="h-screen w-full bg-black" />}>
              <ArcadeTracePentagon />
            </Suspense>
          } />
          <Route path="/arcade/trace-pentagram" element={
            <Suspense fallback={<div className="h-screen w-full bg-black" />}>
              <ArcadeTracePentagram />
            </Suspense>
          } />
          <Route path="/arcade/trace-spiral" element={
            <Suspense fallback={<div className="h-screen w-full bg-black" />}>
              <ArcadeTraceSpiral />
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
