import { useState, type FormEvent } from "react";
import {
  submitEnquiry,
  type FieldRule,
} from "../lib/submitEnquiry";
import { site } from "../config/site";
import { CheckIcon, WhatsAppIcon } from "./icons";

export interface EnquiryField {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  /** Span both columns on wider screens. */
  full?: boolean;
}

interface EnquiryFormProps {
  /** Human-readable form name shown in the WhatsApp message. */
  formName: string;
  fields: EnquiryField[];
  submitLabel?: string;
  initialValues?: Record<string, string>;
}

export default function EnquiryForm({
  formName,
  fields,
  submitLabel = "Submit enquiry",
  initialValues,
}: EnquiryFormProps) {
  const [values, setValues] = useState<Record<string, string>>(
    () => initialValues ?? {}
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [sending, setSending] = useState(false);

  const rules: FieldRule[] = fields.map((f) => ({
    name: f.name,
    label: f.label,
    required: f.required,
    type: f.type ?? "text",
  }));

  const update = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => {
      if (!e[name]) return e;
      const next = { ...e };
      delete next[name];
      return next;
    });
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSending(true);
    // The form label is included as the first line of the WhatsApp message.
    const result = await submitEnquiry(
      [{ name: "enquiry_type", label: `Enquiry type (${formName})`, type: "text" }, ...rules],
      { enquiry_type: formName, ...values }
    );
    setSending(false);

    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setWhatsappUrl(result.whatsappUrl);
    setSubmitted(true);
  };

  const reset = () => {
    setValues({});
    setErrors({});
    setSubmitted(false);
    setWhatsappUrl("");
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-brand-silver bg-white p-8 text-center shadow-soft md:p-10" role="status">
        <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-whatsapp/10 text-whatsapp">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h2 className="text-2xl">Thank you — your enquiry is ready</h2>
        <p className="mx-auto mt-2 max-w-md text-muted">
          We've opened WhatsApp with your details pre-filled to the GSB number.
          Just press send and the team will get back to you. If the window did
          not open, use the button below.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <WhatsAppIcon className="h-5 w-5" /> Open WhatsApp again
          </a>
          <button type="button" onClick={reset} className="btn btn-outline">
            Send another enquiry
          </button>
        </div>
        <p className="mt-5 text-sm text-muted">
          Prefer to talk? Call{" "}
          <a href={`tel:${site.contact.phoneTel}`} className="font-bold text-brand-blue">
            {site.contact.phone}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-xl border border-brand-silver bg-white p-5 shadow-soft md:p-9"
      aria-label={formName}
    >
      <div className="grid gap-5 md:grid-cols-2">
        {fields.map((field) => {
          const error = errors[field.name];
          const wrapClass = field.full ? "md:col-span-2" : "";
          const common = {
            id: field.name,
            name: field.name,
            value: values[field.name] ?? "",
            onChange: (
              e: React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
              >
            ) => update(field.name, e.target.value),
            "aria-invalid": error ? true : undefined,
            "aria-describedby": error ? `${field.name}-error` : undefined,
            className: `field-input ${error ? "border-[#b42318]" : ""}`,
            placeholder: field.placeholder,
          };

          return (
            <div key={field.name} className={wrapClass}>
              <label htmlFor={field.name} className="field-label">
                {field.label}
                {field.required && (
                  <span className="ml-0.5 text-[#b42318]" aria-hidden>
                    *
                  </span>
                )}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  {...common}
                  rows={5}
                  className={`${common.className} min-h-[130px] resize-y`}
                />
              ) : field.type === "select" ? (
                <select {...common}>
                  <option value="">Please select…</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  {...common}
                  type={field.type === "tel" ? "tel" : field.type === "email" ? "email" : "text"}
                  autoComplete={
                    field.name.includes("email")
                      ? "email"
                      : field.name.includes("phone")
                        ? "tel"
                        : field.name.includes("name")
                          ? "name"
                          : "off"
                  }
                />
              )}

              {error && (
                <p id={`${field.name}-error`} className="field-error">
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <button type="submit" disabled={sending} className="btn btn-primary">
          {sending ? "Sending…" : submitLabel}
        </button>
      </div>
      <p className="mt-4 text-sm text-muted">
        Submitting opens WhatsApp with your details — no external form service
        is used. Or message us directly on{" "}
        <a
          href={site.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-brand-blue"
        >
          WhatsApp
        </a>{" "}
        or call{" "}
        <a href={`tel:${site.contact.phoneTel}`} className="font-bold text-brand-blue">
          {site.contact.phone}
        </a>
        .
      </p>
    </form>
  );
}
