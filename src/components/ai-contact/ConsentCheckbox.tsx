"use client";

export function ConsentCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label
      htmlFor="portfolio-ai-consent"
      className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-white/8 bg-[#1a1a1a] px-3 py-2.5 text-[12px] leading-snug text-[#ddd]"
    >
      <input
        id="portfolio-ai-consent"
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-[#ff5c00]"
      />
      <span>Share these details with the developer.</span>
    </label>
  );
}
