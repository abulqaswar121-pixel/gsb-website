import { useEffect } from "react";
import { site } from "../config/site";

interface SeoProps {
  title: string;
  description: string;
  path: string;
}

const OG_IMAGE = "/gsb-logo.jpg";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Per-page SEO: title, description, Open Graph/Twitter tags and the
 * schema.org EducationalOrganization JSON-LD block.
 */
export default function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:locale", "en_NG");
    upsertMeta("property", "og:site_name", site.business.name);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", path);
    upsertMeta("property", "og:image", OG_IMAGE);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", OG_IMAGE);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: site.business.name,
      slogan: site.business.tagline,
      logo: OG_IMAGE,
      email: site.contact.email,
      telephone: site.contact.phoneTel,
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "5 Ebenezer Offor Street, off St James Catholic, Ihe-Ndume",
        addressLocality: "Umuahia",
        addressRegion: "Abia State",
        addressCountry: "NG",
      },
      areaServed: "Nigeria",
      knowsAbout: [
        "Education consulting",
        "Overseas admissions",
        "IELTS preparation",
        "TOEFL preparation",
        "Duolingo English Test preparation",
        "German language training",
        "French language training",
        "Chinese language training",
        "E-learning",
        "Educational materials supply",
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.gsbSeo = "true";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head
        .querySelectorAll('script[data-gsb-seo="true"]')
        .forEach((el) => el.remove());
    };
  }, [title, description, path]);

  return null;
}
