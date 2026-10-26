import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../config/site";
import logo from "../assets/gsb-logo.png";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

export default function Footer() {
  const [imgFailed, setImgFailed] = useState(false);
  const [year, setYear] = useState(2026);

  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="bg-navy-dark text-brand-silver">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          {!imgFailed ? (
            <img
              src={logo}
              alt={`${site.business.name} logo`}
              className="mb-3 h-14 w-auto"
              width={1345}
              height={678}
              onError={() => setImgFailed(true)}
            />
          ) : (
            <span className="mb-3 flex flex-col leading-tight">
              <strong className="text-2xl font-black tracking-[0.06em] text-white">
                GSB
              </strong>
              <small className="text-[0.58rem] font-extrabold tracking-[0.18em] text-brand-silver">
                EDUCATIONAL SERVICES LIMITED
              </small>
            </span>
          )}
          <p className="mt-3 max-w-xs text-sm">
            Education consulting, overseas admissions, test preparation,
            language training and e-learning in {site.business.city},{" "}
            {site.business.region}.
          </p>
          <p className="tagline-serif mt-4 text-lg text-white">
            {site.business.tagline}
          </p>
        </div>

        <nav aria-label="Footer — pages">
          <h3 className="mb-3.5 text-sm uppercase tracking-[0.1em] text-white">
            Explore
          </h3>
          <ul className="grid gap-2.5 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-brand-silver no-underline hover:text-white hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer — services">
          <h3 className="mb-3.5 text-sm uppercase tracking-[0.1em] text-white">
            Services
          </h3>
          <ul className="grid gap-2.5 text-sm">
            <li>
              <Link to="/study-abroad" className="text-brand-silver no-underline hover:text-white hover:underline">
                Study Abroad
              </Link>
            </li>
            <li>
              <Link to="/test-prep-languages" className="text-brand-silver no-underline hover:text-white hover:underline">
                IELTS, TOEFL &amp; Duolingo
              </Link>
            </li>
            <li>
              <Link to="/test-prep-languages" className="text-brand-silver no-underline hover:text-white hover:underline">
                German, French &amp; Chinese
              </Link>
            </li>
            <li>
              <Link to="/e-learning-materials" className="text-brand-silver no-underline hover:text-white hover:underline">
                E-Learning &amp; Materials
              </Link>
            </li>
            <li>
              <Link to="/contact#enquiry" className="text-brand-silver no-underline hover:text-white hover:underline">
                Book a Consultation
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="mb-3.5 text-sm uppercase tracking-[0.1em] text-white">
            Contact
          </h3>
          <ul className="grid gap-4 text-sm">
            <li className="flex gap-3">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
              <span>{site.contact.address}</span>
            </li>
            <li className="flex gap-3">
              <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
              <a href={`tel:${site.contact.phoneTel}`} className="text-brand-silver hover:text-white">
                {site.contact.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
              <a href={`mailto:${site.contact.email}`} className="break-all text-brand-silver hover:text-white">
                {site.contact.email}
              </a>
            </li>
          </ul>
          <a
            href={site.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm mt-5"
          >
            <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-site flex flex-wrap items-center justify-between gap-2 text-xs">
          <span>
            © {year} {site.business.name}. All rights reserved.
          </span>
          <span className="tagline-serif">{site.business.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
