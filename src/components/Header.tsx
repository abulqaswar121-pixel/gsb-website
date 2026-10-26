import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { site } from "../config/site";
import logo from "../assets/gsb-logo.png";
import { CloseIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "./icons";

function Logo() {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center gap-3 no-underline"
      aria-label={`${site.business.name} — home`}
    >
      {!imgFailed && (
        <img
          src={logo}
          alt={`${site.business.name} logo`}
          className="h-11 w-auto md:h-[54px]"
          width={108}
          height={72}
          onError={() => setImgFailed(true)}
        />
      )}
      {imgFailed && (
        <span className="flex flex-col leading-tight">
          <strong className="text-2xl font-black tracking-[0.06em] text-white">
            GSB
          </strong>
          <small className="text-[0.58rem] font-extrabold tracking-[0.18em] text-brand-silver">
            EDUCATIONAL SERVICES LIMITED
          </small>
        </span>
      )}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock background scrolling while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Slim utility / contact bar */}
      <div className="hidden bg-navy-dark text-brand-silver md:block">
        <div className="container-site flex items-center justify-between gap-4 py-2 text-xs font-semibold">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${site.contact.phoneTel}`}
              className="flex items-center gap-2 text-brand-silver no-underline hover:text-white"
            >
              <PhoneIcon className="h-3.5 w-3.5" /> {site.contact.phone}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="flex items-center gap-2 text-brand-silver no-underline hover:text-white"
            >
              <MailIcon className="h-3.5 w-3.5" /> {site.contact.email}
            </a>
          </div>
          <a
            href={site.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-whatsapp px-3.5 py-1.5 font-bold text-white no-underline transition-colors hover:bg-whatsapp-dark"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp us
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-[100] bg-navy transition-shadow ${
          scrolled ? "shadow-[0_8px_24px_rgba(6,21,52,0.45)]" : ""
        }`}
      >
        <div className="container-site flex min-h-[68px] items-center justify-between gap-4 py-2 md:min-h-[78px]">
          <Logo />

          <button
            type="button"
            className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-white/35 md:hidden"
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <CloseIcon className="h-6 w-6 text-white" />
            ) : (
              <>
                <span className="h-0.5 w-6 rounded bg-white" />
                <span className="h-0.5 w-6 rounded bg-white" />
                <span className="h-0.5 w-6 rounded bg-white" />
              </>
            )}
          </button>

          <nav
            id="primary-nav"
            aria-label="Primary navigation"
            className={`${
              open ? "block" : "hidden"
            } absolute inset-x-0 top-full max-h-[calc(100vh-68px)] overflow-y-auto bg-navy-dark pb-6 pt-3 md:static md:max-h-none md:overflow-visible md:block md:bg-transparent md:p-0`}
          >
            <ul className="container-site grid gap-1 md:flex md:items-center md:gap-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    end={item.href === "/"}
                    className={({ isActive }) =>
                      `block border-b border-white/10 px-2 py-3.5 font-semibold text-white no-underline transition-colors hover:text-brand-silver md:border-0 md:px-2.5 md:py-2 md:text-[0.94rem] ${
                        isActive
                          ? "md:border-b-[3px] md:border-brand-blue"
                          : ""
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-3 md:ml-2 md:mt-0">
                <Link
                  to="/contact#enquiry"
                  className="btn btn-on-navy btn-sm w-full md:w-auto"
                >
                  Enquire Now
                </Link>
              </li>
              <li className="mt-2 md:hidden">
                <a
                  href={site.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm w-full"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
                </a>
              </li>
              <li className="mt-2 md:hidden">
                <a
                  href={`tel:${site.contact.phoneTel}`}
                  className="btn btn-outline-on-navy btn-sm w-full"
                >
                  <PhoneIcon className="h-4 w-4" /> Call {site.contact.phone}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
