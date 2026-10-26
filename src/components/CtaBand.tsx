import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { WhatsAppIcon } from "./icons";
import { site } from "../config/site";

interface CtaBandProps {
  title?: string;
  text?: string;
}

/** Reusable navy call-to-action band used at the foot of inner pages. */
export default function CtaBand({
  title = "Ready to take the next step?",
  text = "Book a free consultation and speak with the GSB team about your goals — no pressure, just honest guidance.",
}: CtaBandProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-2xl bg-navy px-6 py-12 text-center shadow-deep md:px-12 md:py-16">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-blue/25"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-brand-blue/20"
            aria-hidden
          />
          <h2 className="relative mx-auto max-w-2xl text-white">{title}</h2>
          <p className="relative mx-auto mt-3 max-w-2xl text-base text-brand-silver md:text-lg">
            {text}
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact#enquiry" className="btn btn-on-navy">
              Book a Free Consultation
            </Link>
            <a
              href={site.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
