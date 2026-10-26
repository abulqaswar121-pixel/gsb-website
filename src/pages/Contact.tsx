import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import EnquiryForm, { type EnquiryField } from "../components/EnquiryForm";
import { site } from "../config/site";
import {
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from "../components/icons";

const topicOptions = [
  "General enquiry",
  "Study Abroad",
  "IELTS",
  "TOEFL",
  "Duolingo",
  "Other English Tests",
  "German",
  "French",
  "Chinese",
  "E-Learning",
  "Educational Materials",
];

export default function Contact() {
  const [params] = useSearchParams();
  const enquiry = params.get("enquiry")?.trim();

  // If ?enquiry= carries an unlisted value, surface it as the selected option.
  const selectOptions = useMemo(() => {
    if (!enquiry) return topicOptions;
    const known = topicOptions.some(
      (opt) => opt.toLowerCase() === enquiry.toLowerCase()
    );
    return known ? topicOptions : [enquiry, ...topicOptions];
  }, [enquiry]);

  const fields: EnquiryField[] = useMemo(
    () => [
      { name: "full_name", label: "Full name", required: true },
      { name: "phone", label: "Phone", type: "tel" },
      { name: "email", label: "Email", type: "email", required: true },
      {
        name: "topic",
        label: "What are you enquiring about?",
        type: "select",
        options: selectOptions,
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: true,
        full: true,
        placeholder: "How can we help you?",
      },
    ],
    [selectOptions]
  );

  // Honour ?enquiry=IELTS style links (from programme cards and Dee).
  const initialValues = useMemo(() => {
    if (!enquiry) return undefined;
    const match = topicOptions.find(
      (opt) => opt.toLowerCase() === enquiry.toLowerCase()
    );
    return { topic: match ?? enquiry };
  }, [enquiry]);

  return (
    <>
      <Seo
        title="Contact GSB Educational Services | Umuahia, Abia State — Enquiries & Consultation"
        description="Contact GSB Educational Services Limited in Ihe-Ndume, Umuahia, Abia State. Call 0703 251 1669, email empiredltd2@gmail.com or send an enquiry online."
        path="/contact"
      />

      <PageHero
        crumb="Contact"
        title="Contact GSB"
        text="Questions about admissions, test prep, languages or materials? We listen — and we respond."
      />

      <section className="py-14 md:py-20" id="enquiry">
        <div className="container-site grid items-start gap-10 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <h2 className="mt-0">Send an enquiry</h2>
            <EnquiryForm
              key={enquiry ?? "general"}
              formName="Contact enquiry"
              fields={fields}
              initialValues={initialValues}
            />
          </Reveal>

          <Reveal delay={120}>
            <ul className="m-0 grid gap-5 p-0">
              <li className="flex gap-3.5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <PinIcon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="m-0 text-[0.85rem] uppercase tracking-[0.08em] text-muted">
                    Address
                  </h3>
                  <p className="m-0 font-semibold">{site.contact.address}</p>
                  <p className="mt-1.5">
                    <a
                      href={site.contact.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-brand-blue"
                    >
                      Get directions
                    </a>
                  </p>
                </div>
              </li>

              <li className="flex gap-3.5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="m-0 text-[0.85rem] uppercase tracking-[0.08em] text-muted">
                    Phone
                  </h3>
                  <p className="m-0">
                    <a
                      href={`tel:${site.contact.phoneTel}`}
                      className="font-semibold text-ink hover:text-brand-blue"
                    >
                      {site.contact.phone}
                    </a>
                  </p>
                </div>
              </li>

              <li className="flex gap-3.5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <MailIcon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="m-0 text-[0.85rem] uppercase tracking-[0.08em] text-muted">
                    Email
                  </h3>
                  <p className="m-0">
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="break-all font-semibold text-ink hover:text-brand-blue"
                    >
                      {site.contact.email}
                    </a>
                  </p>
                </div>
              </li>
            </ul>

            <a
              href={site.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp mt-7 w-full"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chat on WhatsApp
            </a>

            <div id="hours" className="mt-9 scroll-mt-28">
              <h2 className="text-[1.15rem]">Opening hours</h2>
              {site.hours.isPlaceholder && (
                <p className="sample-badge mt-2">{site.hours.label}</p>
              )}
              <table className="mt-3 w-full border-collapse text-sm">
                <thead>
                  <tr className="text-left text-[0.8rem] uppercase tracking-[0.08em] text-muted">
                    <th className="border-b border-brand-silver py-2 pr-4">Days</th>
                    <th className="border-b border-brand-silver py-2">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {site.hours.entries.map((entry) => (
                    <tr key={entry.days}>
                      <td className="border-b border-brand-silver py-2.5 pr-4 font-semibold">
                        {entry.days}
                      </td>
                      <td className="border-b border-brand-silver py-2.5">
                        {entry.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-sm text-muted">
                Please call or{" "}
                <a
                  href={site.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-brand-blue"
                >
                  WhatsApp us
                </a>{" "}
                to confirm before visiting.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
