type IconProps = {
  className?: string;
};

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M12 2.6a9.4 9.4 0 0 0-3 18.3c.47.09.64-.2.64-.45v-1.58c-2.6.57-3.15-1.25-3.15-1.25-.42-1.07-1.03-1.36-1.03-1.36-.84-.58.06-.57.06-.57.93.07 1.42.96 1.42.96.83 1.42 2.18 1.01 2.71.77.08-.61.32-1.01.58-1.24-2.06-.24-4.23-1.03-4.23-4.6 0-1.02.36-1.85.96-2.5-.1-.24-.42-1.2.09-2.5 0 0 1.26-.4 3.13 1.16a10.8 10.8 0 0 1 5.7 0c1.87-1.56 3.13-1.16 3.13-1.16.51 1.3.19 2.26.09 2.5.6.65.96 1.48.96 2.5 0 3.58-2.18 4.36-4.25 4.59.33.29.63.85.63 1.72v2.55c0 .25.17.55.64.45A9.4 9.4 0 0 0 12 2.6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10.2V16.5M8 7.6v.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 16.5v-3.7c0-1.4.8-2.2 2.1-2.2 1.3 0 1.9.9 1.9 2.2v3.7" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
