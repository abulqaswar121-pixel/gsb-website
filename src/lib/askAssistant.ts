/**
 * ============================================================================
 *  DEE — ALL SCRIPTED ASSISTANT ANSWERING LOGIC LIVES IN THIS ONE FILE
 * ============================================================================
 *  The floating chat widget (src/components/AssistantWidget.tsx) only renders
 *  what this module returns. To upgrade Dee to a real AI service inside
 *  Lovable, replace the body of `getAssistantReply` with an API call and keep
 *  the same AssistantReply return shape — the widget needs no other changes.
 *
 *  CONTENT RULES (do not break these):
 *   1. Never state prices, fees, dates, deadlines or schedules.
 *   2. Never make promises (guaranteed admission, scores or visas).
 *   3. Never invent statistics, partnerships or testimonials.
 *   4. Anything unmatched returns the configured fallback with enquiry and
 *      WhatsApp actions.
 *
 *  No API keys exist anywhere in this codebase.
 * ============================================================================
 */

import { site } from "../config/site";

export interface ChatAction {
  label: string;
  /** React Router path for kind "link"/"contact", absolute URL for WhatsApp. */
  href: string;
  kind: "link" | "whatsapp" | "contact";
}

export interface AssistantReply {
  answer: string;
  actions?: ChatAction[];
}

interface KnowledgeEntry extends AssistantReply {
  id: string;
  /** Lowercase keywords/phrases used for loose matching. */
  keywords: string[];
  /** Specificity bonus so precise topics beat broad catch-alls. */
  specificity?: number;
}

/** Entries that answer one precise topic. */
const SPECIFIC = 10;
/** Policy intents that should win whenever their distinctive word appears. */
const POLICY = SPECIFIC + 2;

const whatsappAction: ChatAction = {
  label: "Chat on WhatsApp",
  href: site.contact.whatsappUrl,
  kind: "whatsapp",
};

const enquiryAction: ChatAction = {
  label: "Send an enquiry",
  href: "/contact",
  kind: "contact",
};

const knowledge: KnowledgeEntry[] = [
  {
    id: "greeting",
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    answer:
      "Hello! Welcome to GSB Educational Services. I can help with study abroad, overseas admissions, IELTS/TOEFL/Duolingo prep, German/French/Chinese classes, e-learning and educational materials. What would you like to know?",
  },
  {
    id: "about-dee",
    specificity: SPECIFIC,
    keywords: ["who are you", "your name", "what are you", "robot", "bot", "ai", "dee"],
    answer:
      "I'm Dee, the AI assistant for GSB Educational Services Limited. I answer common questions about our services. For anything specific — fees, dates or your personal situation — I'll connect you with the GSB team.",
  },
  {
    id: "about-gsb",
    keywords: ["about", "company", "who is gsb", "what does gsb do", "tell me about"],
    answer:
      "GSB Educational Services Limited is an education company based in Umuahia, Abia State. We offer education consulting and overseas admissions support, English test preparation, foreign language training, e-learning and supply of educational materials. Our tagline is: “We listen... we deliver!”",
    actions: [{ label: "About GSB", href: "/about", kind: "link" }, enquiryAction],
  },
  {
    id: "study-abroad",
    keywords: [
      "study abroad", "abroad", "overseas", "admission", "admissions", "university",
      "school", "japa", "travel", "relocate", "country", "canada", "uk", "usa",
      "germany", "australia", "europe",
    ],
    answer:
      "GSB provides education consulting and overseas admissions guidance in four simple steps: (1) consultation to understand your goals, (2) school and course selection, (3) application support, and (4) visa and travel guidance. We listen first, then build a plan around you.",
    actions: [
      { label: "Study Abroad page", href: "/study-abroad", kind: "link" },
      { label: "Book a consultation", href: "/study-abroad#enquiry", kind: "contact" },
      whatsappAction,
    ],
  },
  {
    id: "process",
    specificity: SPECIFIC,
    keywords: ["process", "steps", "how does it work", "how do i start", "procedure", "begin"],
    answer:
      "It starts with a consultation so we understand your goals. We then help you choose schools and courses, guide your application, and support you with visa preparation and travel guidance. The first step is simply to reach out — there is no obligation.",
    actions: [
      { label: "See the 4-step process", href: "/study-abroad#process", kind: "link" },
      enquiryAction,
    ],
  },
  {
    id: "visa",
    specificity: SPECIFIC,
    keywords: ["visa", "embassy", "interview", "passport", "denied", "refusal"],
    answer:
      "GSB offers visa preparation guidance and pre-departure support as part of the study abroad process. Visa decisions are made by the issuing country's authorities, so no one can guarantee approval — we focus on helping you prepare a strong, honest application.",
    actions: [{ label: "Study Abroad page", href: "/study-abroad", kind: "link" }, whatsappAction],
  },
  {
    id: "tests-languages",
    keywords: [
      "ielts", "toefl", "duolingo", "english test", "english exam", "test prep",
      "language", "languages", "german", "french", "chinese", "mandarin", "speak",
    ],
    answer:
      "We run preparation classes for IELTS, TOEFL, Duolingo and other recognised English tests, plus language training in German, French and Chinese. Training covers practical speaking, listening, reading and writing. Class options and start dates are provided on enquiry.",
    actions: [
      { label: "Test prep & languages", href: "/test-prep-languages", kind: "link" },
      enquiryAction,
    ],
  },
  {
    id: "ielts",
    specificity: SPECIFIC,
    keywords: ["ielts"],
    answer:
      "Our IELTS preparation covers all four skills — listening, reading, writing and speaking — with structured practice and test-day technique. Enquire to discuss your current level and the class options available.",
    actions: [
      { label: "Enquire about IELTS", href: "/contact?enquiry=IELTS", kind: "contact" },
      whatsappAction,
    ],
  },
  {
    id: "toefl",
    specificity: SPECIFIC,
    keywords: ["toefl"],
    answer:
      "TOEFL preparation at GSB builds the academic English skills tested in each section of the exam, with guided practice and feedback. Send an enquiry and the team will share the current options with you.",
    actions: [
      { label: "Enquire about TOEFL", href: "/contact?enquiry=TOEFL", kind: "contact" },
      whatsappAction,
    ],
  },
  {
    id: "duolingo",
    specificity: SPECIFIC,
    keywords: ["duolingo"],
    answer:
      "We prepare students for the computer-based Duolingo English Test, including practice tasks and test-day technique. Enquire to get started.",
    actions: [
      { label: "Enquire about Duolingo", href: "/contact?enquiry=Duolingo", kind: "contact" },
      whatsappAction,
    ],
  },
  {
    id: "german",
    specificity: SPECIFIC,
    keywords: ["german", "deutsch"],
    answer:
      "Our German classes take learners from beginner level upwards with practical speaking and listening alongside grammar. Enquire for current class options.",
    actions: [
      { label: "Enquire about German", href: "/contact?enquiry=German", kind: "contact" },
      whatsappAction,
    ],
  },
  {
    id: "french",
    specificity: SPECIFIC,
    keywords: ["french", "francais", "français"],
    answer:
      "French training at GSB focuses on real-world communication, clear grammar and confident pronunciation. Enquire and the team will explain the available classes.",
    actions: [
      { label: "Enquire about French", href: "/contact?enquiry=French", kind: "contact" },
      whatsappAction,
    ],
  },
  {
    id: "chinese",
    specificity: SPECIFIC,
    keywords: ["chinese", "mandarin", "putonghua"],
    answer:
      "Learn Mandarin Chinese with us — tones, characters and everyday conversation, taught step by step. Enquire for current class options.",
    actions: [
      { label: "Enquire about Chinese", href: "/contact?enquiry=Chinese", kind: "contact" },
      whatsappAction,
    ],
  },
  {
    id: "e-learning",
    specificity: SPECIFIC,
    keywords: ["e-learning", "elearning", "online", "online class", "virtual", "remote", "internet learning"],
    answer:
      "GSB offers e-learning support so students can study flexibly online, alongside our in-person services. Tell us what you'd like to study and we'll explain the available options.",
    actions: [
      { label: "E-Learning page", href: "/e-learning-materials", kind: "link" },
      enquiryAction,
    ],
  },
  {
    id: "materials",
    specificity: SPECIFIC,
    keywords: ["materials", "books", "textbooks", "supply", "stationery", "educational materials", "buy"],
    answer:
      "We supply educational materials to support learners and schools. Share what you need via the enquiry form and the team will respond.",
    actions: [
      { label: "E-Learning & Materials", href: "/e-learning-materials", kind: "link" },
      enquiryAction,
    ],
  },
  {
    id: "book-consultation",
    keywords: [
      "book", "consultation", "appointment", "free consultation", "meet", "schedule",
      "talk to someone", "call me", "enquire", "enquiry", "inquiry",
    ],
    answer: `Booking is easy. You can call ${site.contact.phone}, email ${site.contact.email}, send a WhatsApp message, or use the enquiry form — the team will arrange a consultation with you.`,
    actions: [
      { label: "Enquiry form", href: "/contact", kind: "contact" },
      whatsappAction,
    ],
  },
  {
    id: "contact-location",
    keywords: ["address", "where", "location", "located", "direction", "office", "phone", "number", "email", "contact", "umuahia"],
    answer: `We are located at ${site.contact.address}. Phone: ${site.contact.phone}. Email: ${site.contact.email}. You can also message us on WhatsApp.`,
    actions: [
      { label: "Contact page", href: "/contact", kind: "link" },
      whatsappAction,
    ],
  },
  {
    id: "hours",
    specificity: SPECIFIC,
    keywords: ["hours", "open", "closing", "weekend", "saturday", "sunday", "time do you"],
    answer:
      "Our opening hours are shown on the Contact page, but please treat them as sample hours until confirmed. The safest option is to call or WhatsApp us before visiting so we know to expect you.",
    actions: [
      { label: "Contact page", href: "/contact#hours", kind: "link" },
      whatsappAction,
    ],
  },
  {
    id: "fees",
    specificity: POLICY,
    keywords: ["fee", "fees", "price", "cost", "how much", "charge", "tuition", "pay", "payment", "cheap", "afford"],
    answer:
      "I'm not able to quote fees or prices, and costs depend on the service you need. Please send an enquiry or a WhatsApp message and the GSB team will give you the current details directly.",
    actions: [enquiryAction, whatsappAction],
  },
  {
    id: "guarantee",
    specificity: POLICY,
    keywords: ["guarantee", "guaranteed", "sure", "certain", "promise", "percent", "success rate", "statistics"],
    answer:
      "We don't make guarantees about admissions, test scores or visas, and we don't quote invented statistics. What we do promise is careful, honest guidance at every step — from consultation to application and travel preparation.",
    actions: [enquiryAction, whatsappAction],
  },
];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchKnowledge(input: string): KnowledgeEntry | null {
  const text = ` ${input.toLowerCase().trim()} `;
  if (!text.trim()) return null;

  let best: { entry: KnowledgeEntry; score: number } | null = null;

  for (const entry of knowledge) {
    let points = 0;
    for (const keyword of entry.keywords) {
      const pattern = new RegExp(
        `(?:^|[^a-z0-9])${escapeRegExp(keyword)}(?![a-z0-9])`
      );
      if (!pattern.test(text)) continue;
      points += keyword.split(" ").length >= 2 ? 3 : 1;
    }
    if (points === 0) continue;

    const score = points + (entry.specificity ?? 0);
    if (
      !best ||
      score > best.score ||
      (score === best.score &&
        (entry.specificity ?? 0) > (best.entry.specificity ?? 0))
    ) {
      best = { entry, score };
    }
  }
  return best ? best.entry : null;
}

/** Used by the quick-reply chips. */
export function getReplyById(id: string): AssistantReply {
  const entry = knowledge.find((item) => item.id === id);
  return entry
    ? { answer: entry.answer, actions: entry.actions }
    : getAssistantReply(id);
}

/**
 * Main entry point for the widget.
 * Swap this for a real AI call inside Lovable while keeping the same return
 * shape (and keep the fallback rules above).
 */
export function getAssistantReply(input: string): AssistantReply {
  const entry = matchKnowledge(input);
  if (entry) {
    return { answer: entry.answer, actions: entry.actions };
  }
  return {
    answer: site.assistant.fallback,
    actions: [enquiryAction, whatsappAction],
  };
}
