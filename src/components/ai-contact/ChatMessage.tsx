"use client";

import Image from "next/image";

import { site } from "@/data/site";
import { cn } from "@/lib/cn";

type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
};

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={cn("flex gap-2", isUser ? "justify-end" : "justify-start")}>
      {isUser ? null : (
        <span className="mt-1 hidden h-6 w-6 shrink-0 overflow-hidden rounded-full border border-white/10 sm:block">
          <Image
            src={site.profileImage}
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 object-cover object-[center_18%]"
          />
        </span>
      )}
      <p
        className={cn(
          "max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap",
          isUser
            ? "rounded-br-md bg-[#ff5c00] text-white"
            : "rounded-bl-md border border-white/6 bg-[#1f1f1f] text-[#e8e8e8]",
        )}
      >
        {content}
      </p>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2" role="status" aria-live="polite">
      <span className="hidden h-6 w-6 sm:block" />
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/6 bg-[#1f1f1f] px-3 py-2.5">
        <span className="sr-only">Portfolio AI is thinking</span>
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#888] motion-reduce:animate-none"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
