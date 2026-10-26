/**
 * ============================================================================
 *  ENQUIRY SUBMISSION — single entry point used by every form on the site
 * ============================================================================
 *  Current behaviour (no backend, no external form service):
 *   1. Validate the submitted fields.
 *   2. On success, open a pre-filled WhatsApp message to the GSB business
 *      number containing all the form details, and return a success result so
 *      the form can show its success message.
 *
 *  FUTURE SWAP (inside Lovable):
 *  Replace the body of `submitEnquiry` with a database insert + email
 *  notification call (e.g. a Supabase insert or an edge function). Keep the
 *  same FieldRule / EnquiryResult signature and every form keeps working
 *  unchanged. No other file needs to know about the change.
 * ============================================================================
 */

import { site } from "../config/site";

export type EnquiryValues = Record<string, string>;

export interface FieldRule {
  name: string;
  label: string;
  required?: boolean;
  type?: "text" | "email" | "tel" | "textarea" | "select";
}

export interface EnquiryResult {
  ok: boolean;
  errors: Record<string, string>;
  /** Present when ok === true — the pre-filled WhatsApp deep link. */
  whatsappUrl: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s()-]{6,19}$/;

/** Pure validation function — easy to unit-test and reuse. */
export function validateEnquiry(
  fields: FieldRule[],
  values: EnquiryValues
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    const raw = (values[field.name] ?? "").trim();

    if (field.required && !raw) {
      errors[field.name] = `${field.label} is required.`;
      continue;
    }
    if (!raw) continue;

    if (field.type === "email" && !EMAIL_RE.test(raw)) {
      errors[field.name] = "Please enter a valid email address.";
    }
    if (field.type === "tel" && !PHONE_RE.test(raw)) {
      errors[field.name] = "Please enter a valid phone number.";
    }
    if (
      (field.type === "text" || field.type === "textarea") &&
      raw.length < 2
    ) {
      errors[field.name] = `${field.label} is too short.`;
    }
  }

  return errors;
}

/** Builds the human-readable message sent to WhatsApp. */
export function buildWhatsAppMessage(
  fields: FieldRule[],
  values: EnquiryValues
): string {
  const lines = fields
    .map((field) => {
      const value = (values[field.name] ?? "").trim();
      return value ? `*${field.label}:* ${value}` : null;
    })
    .filter((line): line is string => line !== null);

  return [
    `New website enquiry — ${site.business.name}`,
    "",
    ...lines,
    "",
    `Sent from the GSB website (${site.business.city}, ${site.business.region}).`,
  ].join("\n");
}

export function buildWhatsAppUrl(message: string): string {
  return `${site.contact.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * The ONE function every form calls.
 * Swap its internals later for a database/email integration without touching
 * any page or component.
 */
export async function submitEnquiry(
  fields: FieldRule[],
  values: EnquiryValues
): Promise<EnquiryResult> {
  const errors = validateEnquiry(fields, values);
  if (Object.keys(errors).length > 0) {
    return { ok: false, errors, whatsappUrl: "" };
  }

  const url = buildWhatsAppUrl(buildWhatsAppMessage(fields, values));

  // Called from a form submit (a user gesture), so the popup is not blocked.
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  // TODO(Lovable): persist `values` to a database and trigger an email
  // notification here, e.g. await supabase.from("enquiries").insert(values);
  return { ok: true, errors: {}, whatsappUrl: url };
}
