import { useEffect, useState } from "react";
import { ArrowUpIcon } from "./icons";

/** Appears after the user scrolls; returns smoothly to the top. */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-24 left-4 z-[140] grid h-11 w-11 place-items-center rounded-full border border-brand-silver bg-white text-navy shadow-soft transition-all duration-300 hover:bg-navy hover:text-white md:bottom-8 md:left-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUpIcon className="h-5 w-5" />
    </button>
  );
}
