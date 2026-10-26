import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../config/site";
import { getAssistantReply, getReplyById, type ChatAction } from "../lib/askAssistant";
import { CloseIcon, SendIcon, WhatsAppIcon } from "./icons";

/* -------------------------------------------------------------------------- */
/* Refined illustrated female AI avatar — flat vector, navy/blue, no photo    */
/* -------------------------------------------------------------------------- */
function DeeAvatar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Illustrated avatar of Dee, the GSB AI assistant" className={className}>
      <circle cx="32" cy="32" r="32" fill="#0A2150" />
      <circle cx="32" cy="32" r="30.5" fill="none" stroke="#1E4FA3" strokeWidth="3" />
      {/* hair behind */}
      <path d="M17 34 C15 16 49 16 47 34 L48 44 C44 34 20 34 16 44 Z" fill="#101F45" stroke="#2C5BB4" strokeWidth="0.8" />
      {/* neck */}
      <rect x="28.5" y="40" width="7" height="8" rx="2.5" fill="#EBB68D" />
      {/* blazer */}
      <path d="M10 64 C12 49 22 45.5 32 45.5 C42 45.5 52 49 54 64 Z" fill="#1E4FA3" />
      <path d="M28.5 45.5 L32 53 L35.5 45.5 Z" fill="#FFFFFF" />
      {/* face */}
      <circle cx="32" cy="30" r="12.4" fill="#F4C79F" />
      {/* side hair */}
      <path d="M19.8 31 C19 24 22 19 32 19 C42 19 45 24 44.2 31 C43 25 40 22.5 32 22.5 C24 22.5 21 25 19.8 31 Z" fill="#101F45" />
      {/* fringe */}
      <path d="M20.2 28.6 C21.6 19.4 42.4 19.4 43.8 28.6 C39.6 24.2 24.4 24.2 20.2 28.6 Z" fill="#101F45" />
      {/* blush */}
      <circle cx="24.6" cy="34.6" r="2.1" fill="#E58F74" opacity="0.55" />
      <circle cx="39.4" cy="34.6" r="2.1" fill="#E58F74" opacity="0.55" />
      {/* brows */}
      <path d="M25.2 27.1 q2.2 -1.3 4.4 0" stroke="#160F2E" strokeWidth="1.35" fill="none" strokeLinecap="round" />
      <path d="M34.4 27.1 q2.2 -1.3 4.4 0" stroke="#160F2E" strokeWidth="1.35" fill="none" strokeLinecap="round" />
      {/* eyes */}
      <circle cx="27.4" cy="30.2" r="1.75" fill="#160F2E" />
      <circle cx="36.6" cy="30.2" r="1.75" fill="#160F2E" />
      <circle cx="28" cy="29.6" r="0.55" fill="#FFFFFF" />
      <circle cx="37.2" cy="29.6" r="0.55" fill="#FFFFFF" />
      {/* smile */}
      <path d="M27.5 36.3 q4.5 4 9 0" stroke="#8A4A3C" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* headset */}
      <path d="M17 30.5 A15 15 0 0 1 47 30.5" stroke="#FFFFFF" strokeWidth="2.3" fill="none" strokeLinecap="round" />
      <circle cx="17" cy="32.6" r="2.9" fill="#FFFFFF" />
      <circle cx="47" cy="32.6" r="2.9" fill="#FFFFFF" />
      <path d="M47 35.4 q5.6 3.6 -1.6 9.2" stroke="#FFFFFF" strokeWidth="2.1" fill="none" strokeLinecap="round" />
      <circle cx="45.4" cy="44.6" r="2" fill="#FFFFFF" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */

interface Message {
  role: "user" | "bot";
  content: string;
  actions?: ChatAction[];
}

const STORAGE_KEY = "gsb-dee-thread-v1";
const BUBBLE_KEY = "gsb-dee-bubble-dismissed-v1";
const MAX_STORED = 30;

function loadThread(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Message[];
      if (Array.isArray(parsed) && parsed.length) return parsed.slice(-MAX_STORED);
    }
  } catch {
    /* storage unavailable */
  }
  return [{ role: "bot", content: site.assistant.greeting }];
}

function ActionButton({ action }: { action: ChatAction }) {
  const classes =
    action.kind === "whatsapp"
      ? "border-whatsapp text-whatsapp hover:bg-whatsapp"
      : "border-brand-blue text-brand-blue hover:bg-brand-blue";
  if (action.kind === "whatsapp") {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`rounded-full border-[1.5px] bg-white px-3 py-1.5 text-[0.82rem] font-bold no-underline transition-colors hover:text-white ${classes}`}
      >
        {action.label}
      </a>
    );
  }
  return (
    <Link
      to={action.href}
      className={`rounded-full border-[1.5px] bg-white px-3 py-1.5 text-[0.82rem] font-bold no-underline transition-colors hover:text-white ${classes}`}
    >
      {action.label}
    </Link>
  );
}

export default function AssistantWidget() {
  const [thread, setThread] = useState<Message[]>(loadThread);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Caption / CTA bubble appears shortly after load (once per dismissal).
  useEffect(() => {
    const dismissed = localStorage.getItem(BUBBLE_KEY) === "1";
    if (dismissed) return;
    const t = window.setTimeout(() => setShowBubble(true), 1400);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) {
      setShowBubble(false);
      window.setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [thread, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const persist = (next: Message[]) => {
    setThread(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next.slice(-MAX_STORED)));
    } catch {
      /* ignore */
    }
  };

  const ask = (text: string, knowledgeId?: string) => {
    const clean = text.trim();
    if (!clean) return;
    const reply = knowledgeId
      ? getReplyById(knowledgeId)
      : getAssistantReply(clean);
    persist([
      ...thread,
      { role: "user", content: clean },
      { role: "bot", content: reply.answer, actions: reply.actions },
    ]);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    ask(input);
    setInput("");
    inputRef.current?.focus();
  };

  const dismissBubble = () => {
    setShowBubble(false);
    try {
      localStorage.setItem(BUBBLE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const quickReplies = useMemo(() => site.assistant.quickReplies, []);

  return (
    <>
      {/* Floating button + caption bubble */}
      <div className="fixed bottom-4 right-4 z-[150] flex flex-col items-end gap-3 md:bottom-5 md:right-5">
        {showBubble && !open && (
          <div className="animate-bubble-in relative mr-1 max-w-[230px] rounded-2xl rounded-br-sm bg-white p-3.5 pr-7 shadow-deep ring-1 ring-brand-silver">
            <button
              type="button"
              onClick={dismissBubble}
              aria-label="Dismiss assistant caption"
              className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full text-muted hover:bg-canvas"
            >
              <CloseIcon className="h-3.5 w-3.5" />
            </button>
            <p className="text-sm font-bold leading-snug text-navy">
              Need help?
            </p>
            <p className="text-xs leading-snug text-muted">
              Chat with <span className="font-bold text-brand-blue">Dee</span> —
              our AI assistant is online.
            </p>
            <span
              className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-white ring-1 ring-brand-silver"
              aria-hidden
            />
          </div>
        )}

        <button
          type="button"
          className="relative h-16 w-16 rounded-full bg-navy p-0 shadow-deep transition-transform hover:scale-105 md:h-[68px] md:w-[68px]"
          aria-expanded={open}
          aria-controls="dee-panel"
          aria-label={`Chat with ${site.assistant.name}, the GSB AI assistant`}
          onClick={() => setOpen((v) => !v)}
        >
          <DeeAvatar className="h-full w-full rounded-full" />
          <span className="absolute bottom-0.5 right-0.5 h-4 w-4 rounded-full border-[3px] border-white bg-online">
            <span className="absolute inset-[-3px] rounded-full border-2 border-online animate-pulse-ring" />
          </span>
        </button>
      </div>

      {/* Chat panel: full width on mobile, 380px on desktop */}
      {open && (
        <section
          id="dee-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="dee-panel-name"
          className="fixed inset-x-0 bottom-0 z-[160] flex h-[86vh] max-h-[680px] flex-col overflow-hidden rounded-t-2xl bg-canvas shadow-deep md:bottom-5 md:left-auto md:right-5 md:h-[min(640px,calc(100vh-7rem))] md:w-[380px] md:rounded-2xl"
        >
          <div className="flex items-center gap-3 bg-navy px-4 py-3.5 text-white">
            <DeeAvatar className="h-11 w-11 shrink-0 rounded-full ring-2 ring-white/35" />
            <div className="min-w-0 flex-1">
              <strong id="dee-panel-name" className="block leading-tight">
                {site.assistant.name}
              </strong>
              <span className="flex items-center gap-1.5 text-xs text-brand-silver">
                <span className="h-2 w-2 rounded-full bg-online" /> Online · AI
                assistant
              </span>
            </div>
            <a
              href={site.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with GSB on WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/24"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/24"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="chat-scroll flex flex-1 flex-col gap-2.5 overflow-y-auto bg-canvas p-4"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {thread.map((msg, i) => (
              <div
                key={i}
                className={`animate-msg-in max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[0.94rem] leading-relaxed shadow-card ${
                  msg.role === "user"
                    ? "self-end rounded-br-sm bg-navy text-white"
                    : "self-start rounded-bl-sm border border-brand-silver bg-white text-ink"
                }`}
              >
                {msg.content}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {msg.actions.map((action) => (
                      <ActionButton key={action.label} action={action} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 px-4 pt-2" role="group" aria-label="Quick questions">
            {quickReplies.map((chip) => (
              <button
                key={chip.knowledgeId}
                type="button"
                onClick={() => ask(chip.label, chip.knowledgeId)}
                className="rounded-full border-[1.5px] border-brand-blue bg-white px-3.5 py-1.5 text-[0.83rem] font-bold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
              >
                {chip.label}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="flex gap-2 border-t border-brand-silver bg-white p-3">
            <label htmlFor="dee-input" className="sr-only">
              Type a message to Dee
            </label>
            <input
              id="dee-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              maxLength={500}
              autoComplete="off"
              className="min-h-[46px] flex-1 rounded-full border-[1.5px] border-brand-silver px-4 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-brand-blue text-white transition-colors hover:bg-navy"
            >
              <SendIcon />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
