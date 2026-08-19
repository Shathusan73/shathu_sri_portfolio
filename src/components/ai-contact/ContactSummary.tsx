"use client";

import { Pencil } from "lucide-react";

import type { ProjectInquiry } from "@/lib/validation";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5">
      <dt className="shrink-0 text-[11px] text-[#777]">{label}</dt>
      <dd className="text-right text-[13px] text-white break-words">{value || "Not provided"}</dd>
    </div>
  );
}

export function ContactSummary({
  inquiry,
  onEdit,
}: {
  inquiry: ProjectInquiry;
  onEdit: () => void;
}) {
  return (
    <section
      aria-label="Project inquiry summary"
      className="rounded-xl border border-white/8 bg-[#1a1a1a] px-3 py-3"
    >
      <div className="mb-1 flex items-center justify-between gap-3">
        <p className="text-[13px] font-semibold text-white">Project inquiry</p>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium text-[#bbb] transition hover:bg-white/6 hover:text-white"
        >
          <Pencil className="h-3 w-3" aria-hidden />
          Edit
        </button>
      </div>
      <dl>
        <Row label="Need" value={inquiry.projectType || inquiry.description} />
        <Row label="Name" value={inquiry.name} />
        <Row label="WhatsApp" value={inquiry.phone} />
        <Row label="Email" value={inquiry.email} />
      </dl>
    </section>
  );
}
