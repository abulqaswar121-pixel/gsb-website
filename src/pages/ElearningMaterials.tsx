import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Figure from "../components/Figure";
import CtaBand from "../components/CtaBand";
import EnquiryForm, { type EnquiryField } from "../components/EnquiryForm";
import { images } from "../config/images";
import { CheckIcon } from "../components/icons";

const elearningPoints = [
  "Flexible online study that fits around school, work or family time.",
  "Guided content aligned with the same programmes we offer in person.",
  "Personal support — you can always reach the GSB team when you need help.",
];

const materialsPoints = [
  "Learning resources selected to match your programme or test.",
  "For individuals and schools — single orders or larger supplies.",
  "Clear communication on what is available and when it can be provided.",
];

const fields: EnquiryField[] = [
  { name: "full_name", label: "Full name", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  {
    name: "interest",
    label: "I'm interested in",
    type: "select",
    required: true,
    options: ["E-Learning", "Supply of educational materials", "Both"],
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    required: true,
    full: true,
    placeholder:
      "Tell us what you'd like to learn or which materials you need…",
  },
];

function PointList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid gap-3.5">
      {items.map((item) => (
        <li key={item} className="relative flex gap-3.5 pl-8 text-muted">
          <span className="absolute left-0 top-0.5 grid h-6 w-6 place-items-center rounded-full bg-brand-blue/10 text-brand-blue">
            <CheckIcon className="h-3.5 w-3.5" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ElearningMaterials() {
  return (
    <>
      <Seo
        title="E-Learning & Educational Materials Supply | GSB Educational Services, Umuahia"
        description="Flexible e-learning support and supply of educational materials from GSB Educational Services Limited, Umuahia, Abia State."
        path="/e-learning-materials"
      />

      <PageHero
        crumb="E-Learning and Materials"
        title="E-Learning & Educational Materials"
        text="Learning that fits your schedule — and the materials to make it stick, supplied reliably."
      />

      <section className="bg-white py-14 md:py-20">
        <div className="container-site grid items-center gap-9 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">E-Learning</span>
            <h2>Study flexibly, online</h2>
            <p className="lead text-muted">
              GSB offers e-learning support so students can keep learning from
              anywhere, with structure and guidance rather than going it alone.
            </p>
            <PointList items={elearningPoints} />
          </Reveal>
          <Reveal delay={120}>
            <Figure
              src={images.elearning.src}
              alt={images.elearning.alt}
              className="border border-brand-silver shadow-soft"
            />
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-site grid items-center gap-9 lg:grid-cols-2">
          <Reveal className="lg:order-2">
            <span className="eyebrow">Educational materials</span>
            <h2>Reliable supply of educational materials</h2>
            <p className="lead text-muted">
              We supply educational materials to support learners and schools,
              helping you get the right resources without the runaround.
            </p>
            <PointList items={materialsPoints} />
          </Reveal>
          <Reveal delay={120} className="lg:order-1">
            <Figure
              src={images.materials.src}
              alt={images.materials.alt}
              className="border border-brand-silver shadow-soft"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20" id="enquiry">
        <div className="container-site max-w-[820px]">
          <Reveal className="mb-8 text-center">
            <span className="eyebrow">Enquiry</span>
            <h2>E-Learning &amp; materials enquiry</h2>
            <p className="text-muted">
              Share a few details and we'll get back to you.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <EnquiryForm formName="E-Learning & materials enquiry" fields={fields} />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
