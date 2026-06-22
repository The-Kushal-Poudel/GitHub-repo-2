import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { useReducedMotion } from "framer-motion";
import Header, { ScrollProgress } from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import IntroScreen from "./components/layout/IntroScreen";
import { usePortfolioData } from "./hooks/usePortfolioData";
import Home from "./pages/Home";

const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));

export default function App() {
  const reducedMotion = useReducedMotion();
  const { data, loading, error, ready } = usePortfolioData();

  if (!data) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#f8f3eb] px-4 text-center text-[#201d18]">
        <div className="max-w-md rounded-2xl border border-[#e6ded0] bg-white p-8 shadow-xl">
          <h2 className="font-serif text-2xl font-bold text-red-700">Unable to load portfolio</h2>
          <p className="mt-4 text-sm leading-relaxed text-[#655d52]">
            {error || "We encountered an unexpected error loading the portfolio. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-md bg-[#151412] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a78d67]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { site, navItems } = data;

  return (
    <main className="min-h-screen w-full overflow-x-hidden scroll-smooth bg-[#f8f3eb] text-[#201d18] selection:bg-[#a78d67] selection:text-white">
      <IntroScreen name={data.profile?.name?.split(" ")[0] || "Kushal"} reducedMotion={reducedMotion} dataReady={ready} />
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
  );
}