"use client";

type InPageLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
};

function sectionId(href: string) {
  return href.replace(/^\/?#/, "");
}

export function InPageLink({ href, className, children, ariaLabel }: InPageLinkProps) {
  const id = sectionId(href);

  function onClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    window.history.pushState(null, "", `#${id}`);
  }

  return (
    <a href={`#${id}`} className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
