"use client";

import { ArrowLeft, ArrowUpRight, Mail, MessageCircle, RotateCcw, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { emptyInquiry, inquiryProgress, type ProjectInquiry } from "@/lib/contactAgent";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

import { ChatMessage, TypingIndicator } from "./ChatMessage";
import { ConsentCheckbox } from "./ConsentCheckbox";
import { ContactSummary } from "./ContactSummary";
import { WhatsAppButton } from "./WhatsAppButton";

type ChatTurn = { role: "user" | "assistant"; content: string };

const GREETING: ChatTurn = {
  role: "assistant",
  content: "What do you need? Pick a project type or tell me in a sentence.",
};

const SUGGESTED_PROMPTS = [
  { label: "I need a website", value: "I need a website" },
  { label: "I need an e-commerce application", value: "I need an e-commerce application" },
  { label: "I need a mobile application", value: "I need a mobile application" },
  { label: "I need an AI project", value: "I need an AI project" },
  { label: "I want to hire you", value: "I want to hire you" },
];

function inquiryMailto(inquiry: ProjectInquiry) {
  const body = [
    `Need: ${inquiry.projectType || inquiry.description}`,
    `Name: ${inquiry.name}`,
    `WhatsApp: ${inquiry.phone}`,
    `Email: ${inquiry.email}`,
  ].join("\n");

  return `mailto:${site.contact.email}?subject=${encodeURIComponent("Project inquiry")}&body=${encodeURIComponent(body)}`;
}

function ProgressDots({ done, confirming }: { done: boolean[]; confirming: boolean }) {
  const filled = confirming ? 4 : done.filter(Boolean).length;

  return (
    <div className="flex items-center gap-1.5" aria-label={`${filled} of 4 questions`}>
      {done.map((complete, index) => (
        <span
          key={index}
          className={cn(
            "h-1 w-6 rounded-full",
            confirming || complete ? "bg-[#ff5c00]" : index === filled ? "bg-[#ff5c00]/40" : "bg-white/12",
          )}
        />
      ))}
    </div>
  );
}

export function AIContactAgent() {
  const reduced = usePrefersReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<ChatTurn[]>([GREETING]);
  const [inquiry, setInquiry] = useState<ProjectInquiry>(emptyInquiry);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState<{ emailHref?: string; whatsappHref?: string }>({});
  const [editing, setEditing] = useState(false);

  const confirming = inquiry.isComplete && !editing && !sent;
  const done = inquiryProgress(inquiry);
  const showSuggestions = messages.length === 1 && messages[0]?.role === "assistant" && !pending && !sent;

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [messages, pending, confirming, sent, reduced]);

  useEffect(() => {
    const node = inputRef.current;
    if (!node) return;
    node.style.height = "36px";
    node.style.height = `${Math.min(Math.max(node.scrollHeight, 36), 96)}px`;
  }, [input]);

  function resetConversation() {
    setMessages([GREETING]);
    setInquiry(emptyInquiry());
    setInput("");
    setPending(false);
    setConsent(false);
    setSending(false);
    setSent(false);
    setError("");
    setFallback({});
    setEditing(false);
    inputRef.current?.focus();
  }

  async function sendMessage(text: string) {
    const content = text.replace(/\s+/g, " ").trim();
    if (!content || pending || sending || sent) return;

    const nextMessages: ChatTurn[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setPending(true);
    setError("");
    setEditing(false);

    try {
      const response = await fetch("/api/ai/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, inquiry }),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        reply?: string;
        inquiry?: ProjectInquiry;
        message?: string;
      };

      if (!response.ok || !payload.ok || !payload.reply || !payload.inquiry) {
        throw new Error(payload.message || "retry");
      }

      setInquiry(payload.inquiry);
      setMessages((current) => [...current, { role: "assistant", content: payload.reply as string }]);
    } catch {
      setError("Sorry, I'm having trouble understanding that right now. Please try again.");
      setMessages((current) => [...current, { role: "assistant", content: "Please try again." }]);
    } finally {
      setPending(false);
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function onEdit() {
    setEditing(true);
    setConsent(false);
    setInquiry((current) => ({ ...current, isComplete: false }));
    setMessages((current) => [...current, { role: "assistant", content: "What should I change?" }]);
    inputRef.current?.focus();
  }

  async function sendWhatsApp() {
    if (!consent || sending) return;
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inquiry, consent: true }),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        message?: string;
        fallback?: { emailHref?: string; whatsappHref?: string };
      };

      if (!response.ok || !payload.ok) {
        setFallback(payload.fallback ?? {});
        throw new Error("send");
      }

      setSent(true);
      setMessages([]);
      setInquiry(emptyInquiry());
    } catch {
      setError("Your inquiry couldn't be sent right now. Please use the direct WhatsApp/contact option below.");
    } finally {
      setSending(false);
    }
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  }

  return (
    <div className="relative flex h-[min(34rem,calc(100dvh-8rem))] min-h-[28rem] flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#141414] shadow-[0_28px_70px_-28px_rgb(0_0_0/0.9)]">
      <div className="pointer-events-none absolute -top-16 left-8 h-32 w-32 rounded-full bg-[#ff5c00]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 -bottom-16 h-28 w-28 rounded-full bg-[#c8f900]/8 blur-3xl" />

      <div className="relative flex items-center justify-between border-b border-white/8 px-3.5 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10">
            <Image
              src={site.profileImage}
              alt=""
              fill
              sizes="40px"
              className="object-cover object-[center_18%]"
            />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Portfolio AI</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[#9a9a9a]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c8f900] opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#c8f900]" />
              </span>
              {pending ? "Thinking…" : "Online · 4 quick questions"}
            </p>
          </div>
        </div>
        {!sent ? <ProgressDots done={done} confirming={confirming} /> : null}
      </div>

      <div
        ref={listRef}
        className="relative flex-1 space-y-3 overflow-y-auto px-3.5 py-3.5 [scrollbar-color:#333_transparent]"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.map((message, index) => (
          <ChatMessage key={`${message.role}-${index}`} role={message.role} content={message.content} />
        ))}

        {showSuggestions ? (
          <div className="flex flex-col gap-1.5 pl-0 sm:pl-8" aria-label="Suggested prompts">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt.value}
                type="button"
                onClick={() => void sendMessage(prompt.value)}
                className="group flex items-start gap-2 rounded-xl border border-white/8 bg-[#1a1a1a] px-3 py-2 text-left text-[12px] leading-snug text-[#ddd] transition-colors hover:border-[#ff5c00]/50 hover:bg-[#222] hover:text-white"
              >
                <span className="flex-1">{prompt.label}</span>
                <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#666] transition-colors group-hover:text-[#ff5c00]" />
              </button>
            ))}
          </div>
        ) : null}

        {pending ? <TypingIndicator /> : null}

        <AnimatePresence>
          {confirming ? (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2.5 pt-1 sm:pl-8"
            >
              <ContactSummary inquiry={inquiry} onEdit={onEdit} />
              <ConsentCheckbox checked={consent} onChange={setConsent} />
              <WhatsAppButton disabled={!consent} pending={sending} onClick={() => void sendWhatsApp()} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {error && !sent ? (
          <div className="rounded-xl border border-red-500/20 bg-red-500/8 p-3 text-[13px] text-red-300" role="alert">
            <p>{error}</p>
            {error.includes("couldn't be sent") ? (
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={inquiryMailto(inquiry)}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-xs font-medium text-white transition hover:border-[#ff5c00]/40"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  Email instead
                </a>
                {fallback.whatsappHref ? (
                  <a
                    href={fallback.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-xl bg-[#ff5c00] px-3 py-2 text-xs font-medium text-white"
                  >
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                    Open WhatsApp
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}

        <AnimatePresence>
          {sent ? (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-white/8 bg-[#1a1a1a] p-4"
              role="status"
            >
              <p className="text-sm font-semibold text-white">Message sent</p>
              <p className="mt-1 text-[13px] text-[#bbb]">I&apos;ll get back to you soon.</p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={resetConversation}
                  className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-[#ff5c00] px-4 text-[13px] font-semibold text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                  New chat
                </button>
                <Link
                  href="/#home"
                  className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 text-[13px] font-medium text-[#ddd]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                  Back
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {!sent ? (
        <form
          onSubmit={onSubmit}
          className="relative border-t border-white/8 bg-[#111]/70 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md"
        >
          <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-[#1a1a1a] px-2 py-1.5 focus-within:border-[#ff5c00]/60">
            <label className="sr-only" htmlFor="portfolio-ai-input">
              Message Portfolio AI
            </label>
            <textarea
              ref={inputRef}
              id="portfolio-ai-input"
              rows={1}
              value={input}
              disabled={pending || sending || sent}
              maxLength={2000}
              enterKeyHint="send"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              onChange={(event) => setInput(event.target.value)}
              onFocus={() => inputRef.current?.scrollIntoView({ block: "nearest" })}
              onKeyDown={onInputKeyDown}
              placeholder={confirming ? "Change something?" : "Ask a question or describe your project…"}
              className="max-h-24 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-white outline-none placeholder:text-[#666] focus-visible:outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={pending || sending || sent || !input.trim()}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ff5c00] text-white transition-colors hover:bg-[#ff7a2e] disabled:opacity-35"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
