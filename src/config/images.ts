/**
 * Central image registry. All photography lives in src/assets/images and is
 * bundled/hashed by Vite. Every photo here is a SAMPLE stock-style image
 * generated for the launch design — swap the files (or the imports) for real
 * GSB photography before going live. The "sample" badge is rendered on the
 * <Figure> component and marked in alt text.
 */
import heroCover from "../assets/images/hero-cover.jpg";
import studyConsultation from "../assets/images/study-consultation.jpg";
import languageClass from "../assets/images/language-class.jpg";
import elearning from "../assets/images/elearning.jpg";
import materials from "../assets/images/materials.jpg";
import team from "../assets/images/team.jpg";

export const images = {
  heroCover: {
    src: heroCover,
    alt: "Sample photo: university students walking together on a modern campus",
  },
  studyConsultation: {
    src: studyConsultation,
    alt: "Sample photo: education advisor in a consultation meeting with a student",
  },
  languageClass: {
    src: languageClass,
    alt: "Sample photo: students in a modern language classroom",
  },
  elearning: {
    src: elearning,
    alt: "Sample photo: student studying online with a laptop and headphones",
  },
  materials: {
    src: materials,
    alt: "Sample photo: stacks of textbooks and educational materials",
  },
  team: {
    src: team,
    alt: "Sample photo: professional education consulting team in an office",
  },
} as const;
