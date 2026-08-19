import { FIVERR_HANDLE, FIVERR_PROFILE_URL } from "@/data/fiverr";

export const social = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Shathusan73",
    handle: "Shathusan73",
  },
  {
    id: "website",
    label: "Website",
    href: "https://shathusridevs.vercel.app",
    handle: "shathusridevs.vercel.app",
  },
  {
    id: "fiverr",
    label: "Fiverr",
    href: FIVERR_PROFILE_URL,
    handle: FIVERR_HANDLE,
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
