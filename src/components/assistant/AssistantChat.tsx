"use client";

import { ArrowUpRight, MessageCircle, Mic, Send, Square, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { getProjectBySlug } from "@/data/projects";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const HOME_QUESTIONS = [
  "Who is Sritharar Shathusan, and what is his current role?",
  "What professional experience does he have?",
  "Which technologies and skills does he work with?",
  "What projects has he delivered?",
];

const CV_QUESTIONS = [
  "Summarise this CV for a recruiter.",
  "What is his professional experience?",
  "What did he study?",
  "Which skills should a hiring manager know about?",
];

function projectSlugFromPath(pathname: string) {
  const match = /^\/projects\/([a-z0-9-]+)$/.exec(pathname);
  return match?.[1];
}

function greetingFor(pathname: string): ChatMessage {
  const slug = projectSlugFromPath(pathname);
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (project) {
    return {
      role: "assistant",
      content: `I can answer questions about ${project.title} — the problem, solution, stack, and results.`,
    };
  }

  if (pathname === "/cv") {
    return {
      role: "assistant",
      content:
        "I can summarise this CV — experience, education, skills, and how to contact Sritharar Shathusan.",
    };
  }

  return {
    role: "assistant",
    content:
      "I can answer questions about Sritharar Shathusan — his role, experience, skills, and projects.",
  };
}

function questionsFor(pathname: string) {
  const slug = projectSlugFromPath(pathname);
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (project) {
    return [
      `What problem does ${project.title} solve?`,
      "What was the solution and architecture?",
      "Which technologies were used?",
      "What were the results?",
    ];
  }

  if (pathname === "/cv") return CV_QUESTIONS;
  return HOME_QUESTIONS;
}

function MessageText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={index} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </span>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/6 bg-[#1f1f1f] px-3 py-2.5">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#888]"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}

export function AssistantChat() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [greetingFor(pathname)]);
  const [voiceState, setVoiceState] = useState<"idle" | "listening" | "processing">("idle");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMessages([greetingFor(pathname)]);
    setInput("");
    setPending(false);
    stopRecording(false);
    setVoiceState("idle");
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    if (voiceState !== "idle") return;
    inputRef.current?.focus();
  }, [open, voiceState]);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [messages, open, pending, reduced]);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const node = inputRef.current;
    if (!node || !open) return;
    node.style.height = "36px";
    node.style.height = `${Math.min(Math.max(node.scrollHeight, 36), 96)}px`;
  }, [input, open]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || pending) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setPending(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          messages: nextMessages.filter((_, index) => index !== 0),
        }),
      });
      const payload = (await response.json()) as { reply?: string; message?: string };
      if (!response.ok || !payload.reply) {
        throw new Error(payload.message || "The assistant is busy. Please try again.");
      }
      setMessages((current) => [...current, { role: "assistant", content: payload.reply! }]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "The assistant is busy. Please try again in a moment.",
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send();
    }
  }

  function stopTracks() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }

  function stopRecording(process = true) {
    const recorder = recorderRef.current;
    if (!recorder || recorder.state === "inactive") {
      stopTracks();
      return;
    }
    recorderRef.current = null;
    if (!process) {
      recorder.ondataavailable = null;
      recorder.onstop = null;
    }
    recorder.stop();
    if (!process) stopTracks();
  }

  async function sendVoice(blob: Blob) {
    setVoiceState("processing");
    setPending(true);
    try {
      const audio = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = String(reader.result ?? "");
          resolve(result.includes(",") ? result.slice(result.indexOf(",") + 1) : result);
        };
        reader.onerror = () => reject(new Error("Could not read the recording."));
        reader.readAsDataURL(blob);
      });
      const mimeType = blob.type.startsWith("audio/webm") ? "audio/webm" : blob.type || "audio/webm";
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          mimeType,
          audio,
        }),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        message?: string;
        transcript?: string;
        reply?: string;
        audio?: string;
        audioMimeType?: string;
      };
      if (!response.ok || !payload.reply) {
        throw new Error(payload.message || "I could not hear that. Please try again.");
      }

      setMessages((current) => [
        ...current,
        { role: "user", content: payload.transcript || "Voice question" },
        { role: "assistant", content: payload.reply! },
      ]);

      if (payload.audio) {
        audioRef.current?.pause();
        const spoken = new Audio(`data:${payload.audioMimeType || "audio/wav"};base64,${payload.audio}`);
        audioRef.current = spoken;
        void spoken.play().catch(() => {
          window.speechSynthesis?.speak(new SpeechSynthesisUtterance(payload.reply));
        });
      } else if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(payload.reply));
      }
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            error instanceof Error ? error.message : "I could not hear that. Please try again.",
        },
      ]);
    } finally {
      setPending(false);
      setVoiceState("idle");
    }
  }

  async function toggleVoice() {
    if (voiceState === "processing" || pending) return;

    if (voiceState === "listening") {
      stopRecording(true);
      return;
    }

    setOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/mp4";
      const recorder = new MediaRecorder(stream, { mimeType });
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        stopTracks();
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || mimeType });
        chunksRef.current = [];
        if (blob.size < 2000) {
          setVoiceState("idle");
          return;
        }
        void sendVoice(blob);
      };
      recorderRef.current = recorder;
      recorder.start();
      setVoiceState("listening");
      window.setTimeout(() => {
        if (recorderRef.current === recorder && recorder.state === "recording") recorder.stop();
      }, 12000);
    } catch {
      setVoiceState("idle");
      setMessages((current) => [
        ...current,
        { role: "assistant", content: "Microphone access is needed to talk to this portfolio." },
      ]);
    }
  }

  useEffect(() => {
    return () => {
      stopRecording(false);
      audioRef.current?.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const suggestedQuestions = questionsFor(pathname);
  const showSuggestions = messages.length === 1 && messages[0]?.role === "assistant" && !pending;

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end print:hidden sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-label="Ask about Shathu"
            initial={reduced ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto relative mb-3 flex h-[min(34rem,calc(100dvh-6.75rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#141414] shadow-[0_28px_70px_-28px_rgb(0_0_0/0.9)]"
          >
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
                  <p className="truncate text-sm font-semibold text-white">Ask about Shathu</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[#9a9a9a]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c8f900] opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#c8f900]" />
                    </span>
                    Online · Portfolio assistant
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-[#888] transition-colors hover:bg-white/6 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={listRef}
              className="relative flex-1 space-y-3 overflow-y-auto px-3.5 py-3.5 scrollbar-thin [scrollbar-color:#333_transparent]"
            >
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn("flex gap-2", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  {message.role === "assistant" ? (
                    <span className="mt-1 hidden h-6 w-6 shrink-0 overflow-hidden rounded-full border border-white/10 sm:block">
                      <Image
                        src={site.profileImage}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6 object-cover object-[center_18%]"
                      />
                    </span>
                  ) : null}
                  <p
                    className={cn(
                      "max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                      message.role === "user"
                        ? "rounded-br-md bg-[#ff5c00] text-white"
                        : "rounded-bl-md border border-white/6 bg-[#1f1f1f] text-[#e8e8e8]",
                    )}
                  >
                    <MessageText text={message.content} />
                  </p>
                </div>
              ))}

              {showSuggestions ? (
                <div className="flex flex-col gap-1.5 pl-0 sm:pl-8">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => void send(question)}
                      className="group flex items-start gap-2 rounded-xl border border-white/8 bg-[#1a1a1a] px-3 py-2 text-left text-[12px] leading-snug text-[#ddd] transition-colors hover:border-[#ff5c00]/50 hover:bg-[#222] hover:text-white"
                    >
                      <span className="flex-1">{question}</span>
                      <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#666] transition-colors group-hover:text-[#ff5c00]" />
                    </button>
                  ))}
                </div>
              ) : null}

              {voiceState === "listening" ? (
              <p className="text-[12px] text-[#ff5c00]">Listening… tap the mic to send.</p>
            ) : null}
            {pending ? (
                <div className="flex items-center gap-2">
                  <span className="hidden h-6 w-6 sm:block" />
                  <TypingDots />
                </div>
              ) : null}
            </div>

            <form
              className="relative border-t border-white/8 bg-[#111]/70 p-3 backdrop-blur-md"
              onSubmit={(event) => {
                event.preventDefault();
                void send();
              }}
            >
              <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-[#1a1a1a] px-2 py-1.5 focus-within:border-[#ff5c00]/60">
                <label className="sr-only" htmlFor="assistant-input">
                  Message
                </label>
                <textarea
                  id="assistant-input"
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={voiceState === "listening" ? "Listening…" : "Ask a question or talk to my portfolio…"}
                  disabled={pending || voiceState !== "idle"}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  name="assistant-message"
                  className="max-h-24 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-white outline-none focus-visible:outline-none placeholder:text-[#666]"
                />
                <button
                  type="button"
                  onClick={() => void toggleVoice()}
                  disabled={pending && voiceState !== "listening"}
                  className={cn(
                    "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                    voiceState === "listening"
                      ? "bg-[#ff5c00] text-white"
                      : "bg-white/6 text-[#ddd] hover:bg-white/10 hover:text-white",
                  )}
                  aria-label={voiceState === "listening" ? "Stop recording" : "Talk to my portfolio"}
                >
                  {voiceState === "listening" ? <Square className="h-3.5 w-3.5 fill-current" /> : <Mic className="h-4 w-4" />}
                </button>
                <button
                  type="submit"
                  disabled={pending || !input.trim()}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ff5c00] text-white transition-colors hover:bg-[#ff7a2e] disabled:opacity-35"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="pointer-events-auto relative flex items-center gap-3">
        <AnimatePresence>
          {!open ? (
            <motion.button
              type="button"
              initial={reduced ? false : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? undefined : { opacity: 0, x: 8 }}
              onClick={() => void toggleVoice()}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1a1a1a]/95 px-3 py-1.5 text-xs text-[#ddd] shadow-lg backdrop-blur-md hover:border-[#ff5c00]/50 hover:text-white"
            >
              <Mic className="h-3.5 w-3.5 text-[#ff5c00]" />
              Talk to my portfolio
            </motion.button>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#ff5c00] text-white shadow-[0_16px_40px_-12px_rgb(255_92_0/0.75)] transition-transform hover:scale-105 hover:bg-[#ff7a2e]"
          aria-expanded={open}
          aria-label={open ? "Close chat" : "Ask about Shathu"}
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}
