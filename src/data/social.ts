export const social = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/shathusansritharar",
    handle: "shathusansritharar",
  },
  {
    id: "website",
    label: "Website",
    href: "https://srishathu.dev",
    handle: "srishathu.dev",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:srishathu07@gmail.com",
    handle: "srishathu07@gmail.com",
  },
] as const;

export type SocialLink = (typeof social)[number];
export type SocialId = SocialLink["id"];
