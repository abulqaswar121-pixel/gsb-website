import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AssistantWidget from "./AssistantWidget";
import BackToTop from "./BackToTop";

/** Scrolls to top (or to a #hash target) on every route change. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="absolute left-3 top-[-60px] z-[200] rounded-b-lg bg-white px-4 py-2.5 font-bold text-navy transition-[top] focus:top-0"
      >
        Skip to main content
      </a>
      <ScrollManager />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <AssistantWidget />
    </div>
  );
}
