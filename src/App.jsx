import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { useReducedMotion } from "framer-motion";
import Header, { ScrollProgress } from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import BlogDetail from "./pages/BlogDetail";
import { usePortfolioData } from "./hooks/usePortfolioData";

export default function App() {
  const reducedMotion = useReducedMotion();
  const { data } = usePortfolioData();
  const { site, navItems, profile } = data;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f3ee] text-[#171817]">
      <ScrollProgress reducedMotion={reducedMotion} />
      <Header site={site} navItems={navItems} reducedMotion={reducedMotion} />

      <Routes>
        <Route path="/" element={<Home data={data} reducedMotion={reducedMotion} />} />
        <Route path="/project/:slug" element={<ProjectDetail data={data} reducedMotion={reducedMotion} />} />
        <Route path="/blog/:id" element={<BlogDetail data={data} reducedMotion={reducedMotion} />} />
      </Routes>

      <Footer site={site} profile={profile} reducedMotion={reducedMotion} />
      <Analytics />
    </main>
  );
}
