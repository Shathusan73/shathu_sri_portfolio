"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden rounded-full bg-cyan px-4 py-2 text-sm font-medium text-slate-950"
    >
      Print / Save as PDF
    </button>
  );
}
