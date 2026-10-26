/**
 * ============================================================================
 *  GSB EDUCATIONAL SERVICES LIMITED — SINGLE SOURCE OF TRUTH
 * ============================================================================
 *  Every business detail used across the website lives in this one file.
 *  Change a phone number, address, email, hour or service wording here and
 *  every page updates automatically.
 *
 *  The chat assistant's scripted answers live next door in
 *  src/lib/askAssistant.ts so they can later be replaced by a real AI call.
 * ============================================================================
 */

export const site = {
  business: {
    name: "GSB Educational Services Limited",
    shortName: "GSB",
    legalLine: "EDUCATIONAL SERVICES LIMITED",
    tagline: "We listen... we deliver!",
    city: "Umuahia",
    region: "Abia State",
    country: "Nigeria",
  },

  contact: {
    phone: "0703 251 1669",
    phoneTel: "+2347032511669",
    email: "empiredltd2@gmail.com",
    whatsappUrl: "https://wa.me/2347032511669",
    whatsappDefaultMessage:
      "Hello GSB Educational Services. I would like to make an enquiry.",
    address:
      "5 Ebenezer Offor Street, off St James Catholic, Ihe-Ndume, Umuahia, Abia State, Nigeria",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(
        "5 Ebenezer Offor Street, Ihe-Ndume, Umuahia, Abia State, Nigeria"
      ),
  },

  /**
   * OPENING HOURS — PLACEHOLDER (sample).
   * Confirm the real hours, update these values and set isPlaceholder=false.
   */
  hours: {
    isPlaceholder: true,
    label: "Sample hours — please confirm",
    entries: [
      { days: "Monday – Friday", time: "9:00 AM – 5:00 PM" },
      { days: "Saturday", time: "10:00 AM – 2:00 PM" },
      { days: "Sunday", time: "Closed" },
    ],
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Study Abroad", href: "/study-abroad" },
    { label: "Test Prep and Languages", href: "/test-prep-languages" },
    { label: "E-Learning and Materials", href: "/e-learning-materials" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  /** Factual service keywords used by the moving trust bar (no statistics). */
  trustBar: [
    "Overseas Admissions",
    "Education Consulting",
    "IELTS Preparation",
    "TOEFL Preparation",
    "Duolingo English Test",
    "German Classes",
    "French Classes",
    "Chinese (Mandarin)",
    "E-Learning",
    "Educational Materials",
    "Free Consultation",
    "Umuahia · Abia State",
  ],

  studyAbroadSteps: [
    {
      title: "Consultation",
      text: "We listen to your goals, background and budget, and explain the options available to you.",
    },
    {
      title: "School & Course Selection",
      text: "We help you identify suitable schools, countries and courses that match your ambitions.",
    },
    {
      title: "Application",
      text: "We guide your application preparation and submission, helping you present a strong file.",
    },
    {
      title: "Visa & Travel Guidance",
      text: "We support you through visa preparation and pre-departure travel guidance.",
    },
  ],

  testPrepProgrammes: [
    {
      id: "ielts",
      title: "IELTS",
      text: "Structured preparation covering listening, reading, writing and speaking for the IELTS test.",
    },
    {
      id: "toefl",
      title: "TOEFL",
      text: "Focused TOEFL preparation to build the academic English skills tested in each section.",
    },
    {
      id: "duolingo",
      title: "Duolingo English Test",
      text: "Guidance and practice for the computer-based Duolingo English Test, including test-day technique.",
    },
    {
      id: "other-english",
      title: "Other English Tests",
      text: "Preparation support for other recognised English language tests — tell us which one you need.",
    },
  ],

  languageProgrammes: [
    {
      id: "german",
      title: "German",
      text: "German language training from beginner level upwards, with practical speaking and listening practice.",
    },
    {
      id: "french",
      title: "French",
      text: "French lessons built around real-world communication, grammar and confident pronunciation.",
    },
    {
      id: "chinese",
      title: "Chinese (Mandarin)",
      text: "Mandarin Chinese training covering tones, characters and everyday conversation.",
    },
  ],

  assistant: {
    name: "Dee",
    role: "GSB AI Assistant",
    greeting:
      "Hi, I'm Dee, the GSB assistant. I can help with study abroad, test prep, languages and e-learning. How can I help you today?",
    quickReplies: [
      { label: "Study Abroad", knowledgeId: "study-abroad" },
      { label: "IELTS and Languages", knowledgeId: "tests-languages" },
      { label: "E-Learning", knowledgeId: "e-learning" },
      { label: "Book a Consultation", knowledgeId: "book-consultation" },
    ],
    fallback:
      "I don't have that exact answer yet, and I can't quote prices, dates or make promises. Please send an enquiry or chat with the GSB team on WhatsApp — they'll be glad to help.",
  },
} as const;

export type Site = typeof site;
