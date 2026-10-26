import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Figure from "../components/Figure";
import CtaBand from "../components/CtaBand";
import { images } from "../config/images";
import { site } from "../config/site";
import { ChatIcon, CheckIcon, UsersIcon } from "../components/icons";

const howWeWork = [
  {
    icon: ChatIcon,
    title: "We listen first",
    text: "Every student starts with a conversation about goals, circumstances and constraints — not a one-size-fits-all package.",
  },
  {
    icon: CheckIcon,
    title: "We keep it honest",
    text: "No invented promises about admissions, scores or visas. We explain options and risks plainly, then help you prepare properly.",
  },
  {
    icon: UsersIcon,
    title: "We stay with you",
    text: "From application to travel guidance and classwork, one team follows your journey so you always know who to call.",
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About GSB Educational Services Limited | Education Consultants in Umuahia"
        description="Learn about GSB Educational Services Limited in Umuahia, Abia State — our mission, our story and how we work with students on admissions, test prep, languages and e-learning."
        path="/about"
      />

      <PageHero
        crumb="About"
        title="About GSB"
        text={site.business.tagline}
      />

      <section className="bg-white py-14 md:py-20">
        <div className="container-site grid items-center gap-9 lg:grid-cols-2">
          <Reveal>
            <Figure
              src={images.team.src}
              alt={images.team.alt}
              className="border border-brand-silver shadow-soft"
            />
          </Reveal>
          <Reveal delay={120}>
            <span className="sample-badge">Sample content — replace with your story</span>
            <h2 className="mt-3">Our story</h2>
            <p className="lead text-muted">
              GSB Educational Services Limited is an education company based in{" "}
              {site.business.city}, {site.business.region}, working with
              students and families who want clear guidance on studying abroad,
              mastering English tests and learning new languages.
            </p>
            <p className="text-muted">
              <em className="font-bold text-ink">(Sample)</em> We began with a
              simple observation: students in our community had big ambitions
              but few people who would sit with them, listen carefully and
              explain the journey step by step. GSB was created to be that
              trusted guide — combining education consulting, test preparation,
              language training and learning materials under one roof.
            </p>
            <p className="text-muted">
              <em className="font-bold text-ink">(Sample)</em> Today, every
              service we offer is shaped by the same promise in our name: we
              listen first, and we deliver.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="container-site">
          <Reveal className="rounded-2xl bg-navy px-7 py-11 text-center shadow-deep md:px-14 md:py-14">
            <span className="mb-2 inline-block text-xs font-extrabold uppercase tracking-[0.14em] text-brand-silver">
              Our mission
            </span>
            <h2 className="text-white">Honest guidance, real outcomes</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-[#dce2ee]">
              <em className="font-bold">(Sample)</em> To make quality education
              accessible to every determined learner we serve — through honest
              consulting, careful teaching and dependable support, from the
              first conversation to the day they begin their next chapter.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20" aria-labelledby="how-heading">
        <div className="container-site">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <span className="sample-badge">Sample content — replace with your own wording</span>
            <h2 id="how-heading" className="mt-3">
              How GSB works with students
            </h2>
            <p className="text-muted">
              The principles behind every conversation we have.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {howWeWork.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.title}
                  delay={i * 100}
                  className="h-full rounded-xl border border-brand-silver bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue hover:shadow-soft"
                >
                  <span className="mb-4 grid h-[52px] w-[52px] place-items-center rounded-xl bg-brand-blue/10 text-brand-blue">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mb-2">{item.title}</h3>
                  <p className="m-0 text-sm text-muted">
                    <em className="font-bold text-ink">(Sample)</em> {item.text}
                  </p>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-10 text-center">
            <Link to="/contact#enquiry" className="btn btn-primary">
              Talk to the GSB team
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
