import { site } from "@/data/site";
import { social } from "@/data/social";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName,
    jobTitle: site.role,
    url: site.url,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaffna",
      addressCountry: "LK",
    },
    description: site.summary,
    sameAs: social
      .filter((item) => item.id === "github" || item.id === "website")
      .map((item) => item.href),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
