"use client";

import { LoaderCircle, Send } from "lucide-react";

export function WhatsAppButton({
  disabled,
  pending,
  onClick,
}: {
  disabled: boolean;
  pending: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || pending}
      className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#ff5c00] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#ff7a2e] disabled:cursor-not-allowed disabled:opacity-35"
    >
      {pending ? (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
          Sending…
        </>
      ) : (
        <>
          Send to WhatsApp
          <Send className="h-4 w-4" aria-hidden />
        </>
      )}
    </button>
  );
}
