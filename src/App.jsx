import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { useReducedMotion } from "framer-motion";
import Header, { ScrollProgress } from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { usePortfolioData } from "./hooks/usePortfolioData";
import Home from "./pages/Home";

const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));

export default function App() {
  const reducedMotion = useReducedMotion();
  const { data, loading, error, refetch } = usePortfolioData();

  const hasCachedData = Boolean(data);
  const { site, navItems } = data || {};

  return (
    <>
      <main className="min-h-screen w-full overflow-x-hidden scroll-smooth bg-[#f8f3eb] text-[#201d18] selection:bg-[#a78d67] selection:text-white">
        <ScrollProgress reducedMotion={reducedMotion} />
        <Header site={site} navItems={navItems} reducedMotion={reducedMotion} />
        
        <Suspense fallback={<div className="min-h-screen bg-[#f8f3eb]" />}>
          <Routes>
            <Route path="/" element={<Home data={data} reducedMotion={reducedMotion} />} />
            <Route path="/project/:slug" element={<ProjectDetail data={data} reducedMotion={reducedMotion} />} />
            <Route path="/blog/:id" element={<BlogDetail data={data} reducedMotion={reducedMotion} />} />
          </Routes>
        </Suspense>

        <Footer site={site} reducedMotion={reducedMotion} />
        <Analytics />
      </main>
    </>
  );
}