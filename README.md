# GSB Educational Services Limited — Website

A mobile-first, multi-page marketing website for **GSB Educational Services
Limited**, an education company in Umuahia, Abia State, Nigeria.

> **Tagline:** *We listen... we deliver!*

## Tech stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** (brand tokens in `tailwind.config.js`)
- **React Router v6** for the pages (no hash router — clean URLs)
- No backend, no payments, no accounts, no external form service
- Ready to import into **Lovable** (standard Vite React project layout)

## Commands

```bash
npm install
npm run dev        # local development
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
npm run typecheck  # strict TypeScript check
```

## Project structure

```
src/
├─ main.tsx                  # App entry (BrowserRouter)
├─ App.tsx                   # Routes
├─ index.css                 # Tailwind layers + small custom components
├─ config/
│  ├─ site.ts                # >>> SINGLE SOURCE OF TRUTH (all business details)
│  └─ images.ts              # Photo registry (all marked sample)
├─ lib/
│  ├─ submitEnquiry.ts       # ONE function every form uses (validate → WhatsApp)
│  └─ askAssistant.ts        # ALL of Dee's scripted answering logic
├─ components/
│  ├─ Layout.tsx  Header.tsx  Footer.tsx
│  ├─ AssistantWidget.tsx     # Floating AI assistant "Dee" + caption CTA
│  ├─ EnquiryForm.tsx         # Reusable validated form
│  ├─ TrustBar.tsx            # Moving marquee of service keywords
│  ├─ CtaBand.tsx  BackToTop.tsx  Figure.tsx  PageHero.tsx
│  ├─ Reveal.tsx              # Scroll animations
│  ├─ Seo.tsx                 # Per-page meta/Open Graph/JSON-LD
│  └─ icons.tsx
├─ pages/                     # Home, StudyAbroad, TestPrepLanguages,
│                             # ElearningMaterials, About, Contact, NotFound
└─ assets/
   ├─ gsb-logo.jpg            # Logo (replace this file)
   └─ images/                 # Sample photos (replace with real photography)
```

## 1. Business details — one file

Everything changeable lives in **`src/config/site.ts`**: phone, WhatsApp link,
email, address/directions, opening hours, navigation, service lists, the
four-step process, programme names and Dee's configuration. Edit it and every
page, the footer and the assistant update automatically.

Opening hours are sample data — confirm them, edit `hours.entries`, then set
`hours.isPlaceholder = false` to remove the badge automatically.

## 2. Forms — `src/lib/submitEnquiry.ts`

Every form renders through `components/EnquiryForm.tsx`, which calls the single
`submitEnquiry(fields, values)` function in `src/lib/submitEnquiry.ts`.

Current behaviour (no external services):

1. Validate required fields, email and phone formats.
2. Open a pre-filled WhatsApp message to the business number
   (`wa.me/2347032511669`) containing every submitted field.
3. Return a result the form uses to show its success message.

**Connecting a database/email later (inside Lovable):** replace the body of
`submitEnquiry` with your insert/API call (e.g. Supabase table insert or an
edge function that sends email). Keep the same `FieldRule` / `EnquiryResult`
signature and none of the pages need to change. No external form service is
called today.

## 3. AI assistant "Dee" — `src/lib/askAssistant.ts`

- Floating circular avatar, bottom-right, with a green online dot, pulse ring
  and a dismissible caption bubble ("Need help? Chat with Dee").
- Panel is full-width on mobile and 380 px on desktop, with greeting,
  quick-reply chips, scripted answers, persisted thread and WhatsApp fallback.
- **All answering logic is in the one file `src/lib/askAssistant.ts`** — the
  widget only renders what `getAssistantReply()` / `getReplyById()` return.
- To upgrade to a real AI in Lovable, swap the body of `getAssistantReply` for
  an API call while keeping the same `AssistantReply` shape.
- Content rules are enforced in the knowledge base: no prices, dates,
  guarantees or invented statistics; unmatched questions offer the enquiry
  form and WhatsApp.
- **There are no API keys anywhere in the codebase.**

## 4. Images and sample content

- All photos in `src/assets/images/` are **sample stock-style images**; each
  renders with a visible "Sample photo" badge and is labelled in its `alt`
  text (`src/config/images.ts`). Replace the files (or the imports) with real
  GSB photography, then set `sample={false}` on the `<Figure>` if desired.
- The logo is `src/assets/gsb-logo.jpg`. If it fails to load, the header and
  footer automatically fall back to a heavy white **GSB** wordmark.
- About-page story/mission copy and the opening hours are marked as sample.
- No invented statistics, school partnerships or testimonials are used; the
  moving trust bar contains factual service keywords only.

## 5. SEO

`components/Seo.tsx` sets unique titles, meta descriptions, Open Graph/Twitter
tags and `schema.org/EducationalOrganization` JSON-LD per route. OG image and
favicons live in `public/` (`gsb-logo.jpg`, `favicon.svg`,
`site.webmanifest`). After launch, add your production domain to
`public/robots.txt` and, if desired, a `sitemap.xml`.

## 6. Importing into Lovable / deploying

1. Push this folder to a new GitHub repository.
2. In Lovable, choose **Import project** and select the repository — the
   standard Vite + React + TypeScript + Tailwind layout is detected
   automatically.
3. Build command `npm run build`, output directory `dist` (Vite defaults).

The app is a client-side SPA, so hosting must serve `index.html` for unknown
paths (Lovable and modern static hosts do this automatically).
