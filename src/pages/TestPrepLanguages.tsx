import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Figure from "../components/Figure";
import CtaBand from "../components/CtaBand";
import { images } from "../config/images";
import { site } from "../config/site";
import { BookIcon, ChatIcon, GlobeIcon, MonitorIcon } from "../components/icons";

const testIcon = [BookIcon, MonitorIcon, ChatIcon, GlobeIcon];
const langIcon = [ChatIcon, BookIcon, GlobeIcon];

function ProgrammeCard({
  title,
  text,
  enquiry,
  icon: Icon,
  delay,
}: {
  title: string;
  text: string;
  enquiry: string;
  icon: typeof BookIcon;
  delay: number;
}) {
  return (
    <Reveal
      delay={delay}
      className="flex h-full flex-col gap-2.5 rounded-xl border border-brand-silver bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue hover:shadow-soft"
    >
      <span className="grid h-[52px] w-[52px] place-items-center rounded-xl bg-brand-blue/10 text-brand-blue">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="m-0.5">{title}</h3>
      <p className="m-0 flex-1 text-sm text-muted">{text}</p>
      <Link
        to={`/contact?enquiry=${encodeURIComponent(enquiry)}#enquiry`}
        className="btn btn-outline btn-sm self-start"
      >
        Enquire
      </Link>
    </Reveal>
  );
}

export default function TestPrepLanguages() {
  return (
    <>
      <Seo
        title="IELTS, TOEFL, Duolingo & Language Classes | GSB Educational Services, Umuahia"
        description="IELTS, TOEFL, Duolingo and other English test preparation, plus German, French and Chinese language training at GSB Educational Services Limited in Umuahia, Abia State."
        path="/test-prep-languages"
      />

      <PageHero
        crumb="Test Prep and Languages"
        title="Test Prep & Language Training"
        text="Prepare for recognised English tests and learn languages that open doors — taught with personal attention and practical speaking practice."
      />

      <section className="bg-white py-14 md:py-16">
        <div className="container-site grid items-center gap-9 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Learn with confidence</span>
            <h2>Skills practice that matches the real test</h2>
            <p className="lead text-muted">
              Our classes combine structured content with speaking practice and
              test-day technique. Whether your goal is university admission,
              relocation or personal development, we start from your current
              level and build from there.
            </p>
            <p className="text-sm text-muted">
              Class options and start dates are provided on enquiry — call{" "}
              <a href={`tel:${site.contact.phoneTel}`} className="font-bold text-brand-blue">
                {site.contact.phone}
              </a>{" "}
              or message us on{" "}
              <a
                href={site.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-brand-blue"
              >
                WhatsApp
              </a>
              .
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Figure
              src={images.languageClass.src}
              alt={images.languageClass.alt}
              className="border border-brand-silver shadow-soft"
            />
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-16" aria-labelledby="english-heading">
        <div className="container-site">
          <Reveal className="mb-7 flex items-center gap-4">
            <h2 id="english-heading" className="m-0 text-2xl">
              English language test preparation
            </h2>
            <span className="h-px flex-1 bg-brand-silver" aria-hidden />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {site.testPrepProgrammes.map((p, i) => (
              <ProgrammeCard
                key={p.id}
                title={p.title}
                text={p.text}
                enquiry={p.title}
                icon={testIcon[i % testIcon.length]}
                delay={i * 90}
              />
            ))}
          </div>

          <Reveal className="mb-7 mt-12 flex items-center gap-4">
            <h2 id="languages-heading" className="m-0 text-2xl">
              Foreign language training
            </h2>
            <span className="h-px flex-1 bg-brand-silver" aria-hidden />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {site.languageProgrammes.map((p, i) => (
              <ProgrammeCard
                key={p.id}
                title={p.title}
                text={p.text}
                enquiry={p.title}
                icon={langIcon[i % langIcon.length]}
                delay={i * 90}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which class fits your goal?"
        text="Tell us where you're headed and we'll recommend the right test or language programme for you."
      />
    </>
  );
}
