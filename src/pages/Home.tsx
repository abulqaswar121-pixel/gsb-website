import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import Figure from "../components/Figure";
import TrustBar from "../components/TrustBar";
import CtaBand from "../components/CtaBand";
import { images } from "../config/images";
import { site } from "../config/site";
import {
  CheckIcon,
  CompassIcon,
  HeadsetIcon,
  MonitorIcon,
  ShieldIcon,
} from "../components/icons";

const serviceCards = [
  {
    title: "Study Abroad & Overseas Admissions",
    text: "Education consulting and admissions guidance, from your first consultation to visa and travel preparation.",
    href: "/study-abroad",
    cta: "Explore study abroad",
    image: images.studyConsultation,
  },
  {
    title: "Test Prep & Language Training",
    text: "IELTS, TOEFL, Duolingo and other English test training, plus German, French and Chinese classes.",
    href: "/test-prep-languages",
    cta: "View programmes",
    image: images.languageClass,
  },
  {
    title: "E-Learning & Educational Materials",
    text: "Flexible e-learning support and dependable supply of educational materials for learners and schools.",
    href: "/e-learning-materials",
    cta: "Learn more",
    image: images.elearning,
  },
];

const whyFeatures = [
  {
    icon: HeadsetIcon,
    title: "We listen first",
    text: "Every journey begins with a real conversation about your goals, circumstances and budget.",
  },
  {
    icon: ShieldIcon,
    title: "Honest advice",
    text: "No false promises about admissions, scores or visas — just clear options and careful preparation.",
  },
  {
    icon: CompassIcon,
    title: "End-to-end guidance",
    text: "One team follows you from consultation and applications to visa prep and travel guidance.",
  },
  {
    icon: MonitorIcon,
    title: "Flexible learning",
    text: "In-person classes and e-learning options, plus the educational materials you need to succeed.",
  },
];

export default function Home() {
  return (
    <>
      <Seo
        title="GSB Educational Services Limited | Study Abroad, IELTS & Language Training in Umuahia"
        description="Education consulting and overseas admissions, IELTS/TOEFL/Duolingo prep, German/French/Chinese classes, e-learning and educational materials in Umuahia, Abia State."
        path="/"
      />

      {/* Hero with photographic cover */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={images.heroCover.src}
            alt=""
            className="h-full w-full object-cover"
            /* Lowercase attribute (React 18 passes it through; React 19 supports the camelCase prop). */
            {...({ fetchpriority: "high" } as Record<string, string>)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/85 to-navy/55" />
        </div>

        <div className="container-site relative z-10 py-16 md:py-24 lg:py-28">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.16em] text-brand-silver">
              Education consulting · Admissions · Language training
            </p>
            <h1 className="text-white">
              Study abroad with confidence. Master new languages.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-[#e4e8f0]">
              GSB Educational Services Limited guides students in Umuahia and
              beyond through overseas admissions, English test preparation and
              world-language training — with honest, personal support at every
              step.
            </p>
            <p className="tagline-serif mt-5 text-lg text-brand-silver">
              {site.business.tagline}
            </p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <Link to="/study-abroad" className="btn btn-on-navy">
                Study Abroad
              </Link>
              <Link to="/contact#enquiry" className="btn btn-outline-on-navy">
                Book a Free Consultation
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-brand-silver">
              {["Free consultation", "One-on-one guidance", "No false promises"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-online" />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Moving trust bar */}
      <TrustBar />

      {/* Service cards */}
      <section className="bg-white py-14 md:py-20" aria-labelledby="services-heading">
        <div className="container-site">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">What we do</span>
            <h2 id="services-heading">Built around your goals</h2>
            <p className="lead text-muted">
              Three focused services, one trusted partner for your education
              journey.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {serviceCards.map((card, i) => (
              <Reveal as="article" key={card.href} delay={i * 100} className="card">
                <Figure
                  src={card.image.src}
                  alt={card.image.alt}
                  rounded="rounded-none"
                  className="aspect-[5/4]"
                />
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <h3 className="m-0 text-xl">{card.title}</h3>
                  <p className="m-0 flex-1 text-muted">{card.text}</p>
                  <div className="mt-3.5">
                    <Link to={card.href} className="link-arrow">
                      {card.cta}
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why GSB */}
      <section className="py-14 md:py-20" aria-labelledby="why-heading">
        <div className="container-site">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">Why families choose GSB</span>
            <h2 id="why-heading">Guidance you can trust</h2>
            <p className="text-muted">
              The same principles shape every consultation, class and
              application we handle.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Reveal
                  key={feature.title}
                  delay={i * 90}
                  className="h-full rounded-xl border border-brand-silver bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue hover:shadow-soft"
                >
                  <span className="mb-4 grid h-[52px] w-[52px] place-items-center rounded-xl bg-brand-blue/10 text-brand-blue">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mb-1.5 text-lg">{feature.title}</h3>
                  <p className="m-0 text-sm text-muted">{feature.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
