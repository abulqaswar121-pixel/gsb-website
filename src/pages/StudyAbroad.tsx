import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Figure from "../components/Figure";
import CtaBand from "../components/CtaBand";
import EnquiryForm, { type EnquiryField } from "../components/EnquiryForm";
import { images } from "../config/images";
import { site } from "../config/site";
import { CheckIcon } from "../components/icons";

const features = [
  "One-on-one consultation built around your background, budget and ambitions.",
  "School and course selection tailored to what you actually want to achieve.",
  "Application support so your documents tell a clear, strong story.",
  "Visa and travel guidance to prepare you for departure with confidence.",
];

const fields: EnquiryField[] = [
  { name: "full_name", label: "Full name", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  {
    name: "country_of_interest",
    label: "Country of interest",
    type: "select",
    options: [
      "United Kingdom",
      "Canada",
      "United States",
      "Australia",
      "Germany",
      "France",
      "China",
      "Other / not sure yet",
    ],
  },
  {
    name: "study_level",
    label: "Study level",
    type: "select",
    full: true,
    options: [
      "Secondary / High school",
      "Foundation / Diploma",
      "Undergraduate (Bachelor's)",
      "Postgraduate (Master's)",
      "PhD / Research",
      "Other / not sure",
    ],
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    required: true,
    full: true,
    placeholder: "Tell us about your study-abroad goals…",
  },
];

export default function StudyAbroad() {
  return (
    <>
      <Seo
        title="Study Abroad & Overseas Admissions | GSB Educational Services, Umuahia"
        description="Education consulting and overseas admissions in Umuahia, Abia State. Consultation, school and course selection, application, and visa and travel guidance."
        path="/study-abroad"
      />

      <PageHero
        crumb="Study Abroad"
        title="Study Abroad & Overseas Admissions"
        text="Personal education consulting that takes you from your first question to your departure — with someone listening at every step."
      />

      <section className="bg-white py-14 md:py-20">
        <div className="container-site grid items-center gap-9 lg:grid-cols-2">
          <Reveal>
            <Figure
              src={images.studyConsultation.src}
              alt={images.studyConsultation.alt}
              className="border border-brand-silver shadow-soft"
            />
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">Education consulting</span>
            <h2>A guided path to overseas admission</h2>
            <p className="lead text-muted">
              Applying to schools abroad involves many decisions. GSB helps you
              think them through calmly — understanding your goals, explaining
              your options and keeping your application organised.
            </p>
            <ul className="mt-5 grid gap-3.5">
              {features.map((item) => (
                <li key={item} className="relative flex gap-3.5 pl-8 text-muted">
                  <span className="absolute left-0 top-0.5 grid h-6 w-6 place-items-center rounded-full bg-brand-blue/10 text-brand-blue">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20" id="process">
        <div className="container-site">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">How it works</span>
            <h2>Your four-step process</h2>
            <p className="text-muted">
              A clear, honest route from first conversation to travel day.
            </p>
          </Reveal>

          <ol className="grid gap-5 md:grid-cols-4">
            {site.studyAbroadSteps.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 100}
                className="list-none rounded-xl border border-brand-silver bg-white p-6 shadow-card"
              >
                <span className="mb-3.5 grid h-12 w-12 place-items-center rounded-full bg-navy text-lg font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="mb-1.5">{step.title}</h3>
                <p className="m-0 text-sm text-muted">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20" id="enquiry">
        <div className="container-site max-w-[820px]">
          <Reveal className="mb-8 text-center">
            <span className="eyebrow">Enquiry</span>
            <h2>Start your study-abroad enquiry</h2>
            <p className="text-muted">
              Tell us about your plans and the GSB team will get back to you.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <EnquiryForm formName="Study abroad enquiry" fields={fields} />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
