import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import Chatbot from "./components/Chatbot";
import Home from "./pages/Home";
import AkbsCaseStudy from "./pages/AkbsCaseStudy";
import NotFound from "./pages/NotFound";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/projects/akbs" element={<PageTransition><AkbsCaseStudy /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <AnimatedRoutes />
      </main>
      <Chatbot />
    </BrowserRouter>
  );
}