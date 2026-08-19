export const PROJECT_COLORS = [
  "#5196fd",
  "#8f89ff",
  "#ed649e",
  "#00c4cc",
  "#ff7e5f",
  "#a162e8",
  "#f6c90e",
] as const;

export type ProjectStatus = "shipped" | "coming-soon";
export type ProjectAccent = "blue" | "violet" | "cyan" | "navy";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  live?: string;
  github?: string;
  technologies: string[];
  features: string[];
  featured: boolean;
  status: ProjectStatus;
  accent: ProjectAccent;
  color: string;
  eyebrow?: string;
  overview?: string;
  problem?: string;
  solution?: string;
  architecture?: string[];
  challenges?: string[];
  results?: string[];
};

const ACCENTS: ProjectAccent[] = ["blue", "violet", "cyan", "navy"];

function colorAt(index: number) {
  return PROJECT_COLORS[index % PROJECT_COLORS.length];
}

function accentAt(index: number): ProjectAccent {
  return ACCENTS[index % ACCENTS.length];
}

export const projects: Project[] = [
  {
    slug: "smart-color-detection-robot",
    title: "Smart Color Detection Robot",
    eyebrow: "Warehouse Automation",
    summary:
      "A line-following warehouse robot that detects colour-coded zones and performs timed actions for sorting, delivery, and pickup.",
    description:
      "A Smart Color Detection Robot designed to support automated warehouse operations. It autonomously navigates a predefined path, detects up to six colour-coded zones, and performs time-controlled actions at each checkpoint — simulating real-world sorting, delivery, and pickup inside a warehouse. Built with affordable embedded hardware, it shows how robotics can reduce repetitive handling, cut human error, and add intelligence to material movement.",
    image: "/projects/smart-color-detection-robot.png",
    imageWidth: 768,
    imageHeight: 1024,
    github: "Private",
    technologies: ["Arduino Uno R3", "TCS3200 Color Sensor", "IR Sensors", "L298N Motor Driver"],
    featured: true,
    status: "shipped",
    accent: "cyan",
    color: colorAt(2),
    features: [
      "Line-following navigation using IR sensors",
      "Accurate colour recognition with the TCS3200 sensor",
      "Detection of up to six colour-coded warehouse zones",
      "Time-controlled actions at each checkpoint",
      "Smooth motor control with the L298N driver",
      "Automatic return-to-start for continuous operation",
    ],
    overview:
      "The prototype follows a marked warehouse path, reads colour-coded floor zones, and triggers checkpoint behaviour that maps to sorting, delivery, and pickup cycles.",
    problem:
      "Warehouse sorting and pickup still depend on repetitive manual movement between marked zones, which is slow and easy to get wrong.",
    solution:
      "An Arduino-controlled 4WD robot that tracks a line, identifies zone colours, and runs timed actions before returning to start for the next cycle.",
    architecture: [
      "Arduino Uno R3 microcontroller",
      "TCS3200 colour sensor for zone recognition",
      "IR sensors for line tracking",
      "L298N motor driver for 4WD navigation",
    ],
    results: [
      "Smart delivery paths along a predefined track",
      "Colour-based sorting at warehouse checkpoints",
      "Educational and industrial automation prototype",
    ],
  },
  {
    slug: "ai-image-analytics",
    title: "AI Image Analytics & Classification Platform",
    eyebrow: "Computer Vision",
    summary:
      "AI-powered image analytics platform designed to improve product categorisation and search using image classification.",
    description:
      "An applied computer-vision platform that classifies product imagery, then feeds those labels back into search, catalogues, and operational workflows.",
    technologies: ["Next.js", "React", "Python", "TensorFlow", "CNN", ".NET", "PostgreSQL"],
    github: "https://github.com/shathusansritharar",
    live: undefined,
    featured: true,
    status: "shipped",
    accent: "blue",
    color: colorAt(0),
    features: [
      "Image upload and batch ingestion for catalogue assets",
      "CNN-based classification with confidence scoring",
      "Human review flow for low-confidence predictions",
      "Search and filtering enriched by visual labels",
      "Admin visibility into model results and category mapping",
    ],
    overview:
      "The platform connects a convolutional classification model to a production web application so visual labels become searchable product data.",
    problem:
      "Manual product categorisation was slow and inconsistent, and visual similarity was invisible to search.",
    solution:
      "A CNN behind an API, with a Next.js review interface and PostgreSQL as the source of truth for predictions.",
    architecture: [
      "Next.js operator interface",
      "Python / TensorFlow inference",
      ".NET API orchestration",
      "PostgreSQL persistence",
    ],
  },
  {
    slug: "bandham",
    title: "Bandham Dating Platform",
    eyebrow: "Consumer Product",
    summary: "Modern dating platform with a user-facing website and an administrative management panel.",
    description:
      "A full dating product spanning onboarding, discovery, profiles, and operations — with a public experience and a dedicated admin surface.",
    technologies: ["Next.js", ".NET", "PostgreSQL", "Redux"],
    github: "https://github.com/shathusansritharar",
    featured: true,
    status: "shipped",
    accent: "violet",
    color: colorAt(1),
    features: [
      "Profile creation and discovery-oriented browsing",
      "Authenticated user journeys across the public site",
      "Administrative panel for users, content, and operations",
      "Structured data model for profiles, activity, and moderation",
      "Responsive product UI designed for daily use",
    ],
  },
  {
    slug: "sold4u",
    title: "Sold4U",
    eyebrow: "Marketplace",
    summary: "Property marketplace supporting house listings, online bidding, and property management.",
    description:
      "A property marketplace for listings, bidding, and management — covering the journey from published house to completed interest.",
    technologies: ["Next.js", ".NET", "PostgreSQL"],
    github: "https://github.com/shathusansritharar",
    featured: true,
    status: "shipped",
    accent: "cyan",
    color: colorAt(2),
    features: [
      "Property listings with structured details and media",
      "Online bidding against published houses",
      "Property management workflows for inventory and status",
      "Search and browsing designed around real buyer intent",
    ],
  },
  {
    slug: "levi-accountant",
    title: "Levi Accountant",
    summary:
      "Professional accounting and tax consultancy website for businesses and individuals, built for trust and conversions.",
    description:
      "Levi Accountant is a professional accounting and tax consultancy firm offering personalized financial solutions. The website showcases services, expertise, and client testimonials with a clean, modern design.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746196650/Screenshot_2025-05-02_200652_hkgxct.png",
    live: "https://leviaccountant.com/",
    github: "https://github.com/Shathusan73",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Formik", "Responsive Design"],
    features: [
      "Modern, mobile-friendly UI with smooth animations",
      "Service showcase for tax planning, bookkeeping, and auditing",
      "Client testimonials for social proof",
      "Contact form with validation for lead generation",
      "SEO-optimized content and fast loading performance",
    ],
    featured: true,
    status: "shipped",
    accent: accentAt(3),
    color: colorAt(3),
  },
  {
    slug: "signature-events",
    title: "Signature Events",
    summary:
      "Premium event planning and catering website for weddings, corporate events, and private parties.",
    description:
      "A premium event planning and catering website showcasing bespoke services for weddings, corporate events, and private parties, with elegant visuals and intuitive navigation.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746196814/Screenshot_2025-05-02_201000_opeodp.png",
    live: "https://eventsbysignature.co.uk/",
    github: "Private",
    technologies: ["React", "Tailwind CSS", "GSAP", "Framer Motion"],
    features: [
      "Luxury-focused UI with high-quality imagery",
      "Service showcases for weddings, corporate events, and catering",
      "Interactive gallery and menu displays",
      "Contact and booking form with validation",
    ],
    featured: true,
    status: "shipped",
    accent: accentAt(4),
    color: colorAt(4),
  },
  {
    slug: "ayio-vodka",
    title: "AYIO Vodka",
    summary: "Premium e-commerce experience for German ultra-premium vodka, with immersive brand storytelling.",
    description:
      "A premium e-commerce website for German ultra-premium vodka, featuring product showcases, cocktail recipes, and an immersive brand experience with conversion-focused UI.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746197550/Screenshot_2025-05-02_202052_iwlzd9.png",
    live: "https://ayio.de/",
    github: "Private",
    technologies: ["React", "Next.js", "Tailwind CSS", "GSAP", "Framer Motion"],
    features: [
      "Luxury product showcase with cinematic visuals",
      "Interactive cocktail recipe explorer",
      "Parallax scrolling for brand storytelling",
      "Age verification gateway and e-commerce-ready components",
    ],
    featured: true,
    status: "shipped",
    accent: accentAt(5),
    color: colorAt(5),
  },
  {
    slug: "gobuy-ecommerce",
    title: "GoBuy E-commerce",
    summary: "Sri Lankan marketplace for products, services, jobs, and essentials with localised checkout.",
    description:
      "A full-featured Sri Lankan e-commerce platform offering products, services, jobs, and daily essentials with seamless checkout and localised payment options.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746198778/Screenshot_2025-05-02_204234_zsdps4.png",
    live: "https://gobuy.lk/",
    github: "Private",
    technologies: ["React", "Tailwind CSS", ".NET", "MongoDB"],
    features: [
      "Advanced search with filters and sorting",
      "Cart system with saved items",
      "Order tracking and seller dashboard",
      "Product reviews and a mobile-first interface",
    ],
    featured: true,
    status: "shipped",
    accent: accentAt(6),
    color: colorAt(6),
  },
  {
    slug: "microwe-net",
    title: "Microwe.net",
    summary: "Digital solutions agency site for services, portfolio, and client success stories.",
    description:
      "A web development and digital solutions agency website showcasing services, portfolios, and client success stories with a performance-focused frontend.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746199570/Screenshot_2025-05-02_205543_xshqig.png",
    live: "https://microwe.net/",
    github: "Private",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    features: [
      "Service showcase with interactive elements",
      "Project portfolio with case studies",
      "Client testimonial carousel",
      "Contact form and SEO-optimised service pages",
    ],
    featured: true,
    status: "shipped",
    accent: accentAt(7),
    color: colorAt(7),
  },
  {
    slug: "johnians-cms",
    title: "Johnians CMS",
    summary: "Alumni CMS for St. John's College with roles, dynamic content, and API-driven interfaces.",
    description:
      "A content management system for St. John's College alumni, featuring dynamic content management, user roles, and interactive elements built with React and Tailwind CSS.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746197293/Screenshot_2025-05-02_201600_bxgyuz.png",
    live: "https://johnians-cms.microwe.net/",
    github: "Private",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Axios"],
    features: [
      "Dynamic content management interface",
      "Responsive layouts for all devices",
      "API integration with loading and error states",
      "Interactive data tables with pagination",
    ],
    featured: false,
    status: "shipped",
    accent: accentAt(8),
    color: colorAt(8),
  },
  {
    slug: "jaffna-architectural-designers",
    title: "Jaffna Architectural Designers",
    summary: "Architecture studio site showcasing residential and commercial work in Jaffna.",
    description:
      "A professional architecture firm website showcasing residential and commercial design projects in Jaffna, with a clean layout that puts the work first.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746196997/Screenshot_2025-05-02_201252_eoszxx.png",
    live: "https://jaffnaarchi.lk/",
    github: "Private",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    features: [
      "Project portfolio gallery",
      "Service descriptions for design and 3D modelling",
      "Image-focused layout and contact form",
      "Smooth scrolling and SEO-friendly structure",
    ],
    featured: false,
    status: "shipped",
    accent: accentAt(9),
    color: colorAt(9),
  },
  {
    slug: "lucky-donair",
    title: "Lucky Donair",
    summary: "Restaurant website with menu, locations, and conversion-focused food galleries.",
    description:
      "A restaurant website for a Canadian donair eatery, featuring menu, locations, and an appetizing frontend designed to drive takeout orders.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746197706/Screenshot_2025-05-02_202419_zzvqez.png",
    live: "https://luckydonair.ca/",
    github: "Private",
    technologies: ["React", "Tailwind CSS", "Image Optimization"],
    features: [
      "Food photography gallery",
      "Interactive menu with category filtering",
      "Mobile-first responsive design",
      "Special offers and contact form",
    ],
    featured: false,
    status: "shipped",
    accent: accentAt(10),
    color: colorAt(10),
  },
  {
    slug: "little-robins-nursery",
    title: "Little Robins Nursery",
    summary: "Warm nursery website with parent-friendly content and a playful, professional tone.",
    description:
      "A children's nursery website with bright design, parent-friendly functionality, and professional educational content.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746197917/Screenshot_2025-05-02_202821_ysfsdm.png",
    live: "https://littlerobinsnursery.com/",
    github: "Private",
    technologies: ["React", "Tailwind CSS", "Responsive Design"],
    features: [
      "Child-friendly interface with playful motion",
      "Gallery of facilities and activities",
      "Parent information portal",
      "Testimonials and nursery updates",
    ],
    featured: false,
    status: "shipped",
    accent: accentAt(11),
    color: colorAt(11),
  },
  {
    slug: "donair-hub",
    title: "Donair Hub",
    summary: "Online ordering platform for a Canadian donair restaurant with location-based services.",
    description:
      "A vibrant online ordering platform featuring food displays, ordering flows, and location-based services.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746198026/Screenshot_2025-05-02_202958_lb58iw.png",
    live: "https://donairhub.com/",
    github: "Private",
    technologies: ["Next.js", "Tailwind CSS", "Google Maps API"],
    features: [
      "High-resolution food gallery",
      "Interactive menu with customisation",
      "Location-based store finder",
      "Combo deals and customer reviews",
    ],
    featured: false,
    status: "shipped",
    accent: accentAt(12),
    color: colorAt(12),
  },
  {
    slug: "sun-clock",
    title: "Sun Clock",
    summary: "Product site for architectural solar timepieces with elegant product storytelling.",
    description:
      "A premium website for architectural timepieces and designer products, highlighting craftsmanship through interactive product displays.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746198246/Screenshot_2025-05-02_203343_taut84.png",
    live: "https://sunclock.lk/",
    github: "Private",
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    features: [
      "Responsive product storytelling",
      "Gallery of installations",
      "SEO-optimised product pages",
      "Smooth scroll animations",
    ],
    featured: false,
    status: "shipped",
    accent: accentAt(13),
    color: colorAt(13),
  },
  {
    slug: "wed-hub-matrimony",
    title: "Wed Hub Matrimony",
    summary: "Sri Lankan matrimonial platform with culturally specific match preferences.",
    description:
      "A premium Sri Lankan matrimonial platform connecting brides and grooms, with culturally specific filters and an intuitive match discovery flow.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746198413/Screenshot_2025-05-02_203634_f4ey2h.png",
    live: "https://wedhub.lk/",
    github: "Private",
    technologies: ["React", "Tailwind CSS"],
    features: [
      "Cultural matchmaking filters",
      "Photo privacy controls",
      "Mobile-first responsive design",
    ],
    featured: false,
    status: "shipped",
    accent: accentAt(14),
    color: colorAt(14),
  },
  {
    slug: "subamangalyam-matrimony",
    title: "Subamangalyam Matrimony",
    summary: "Tamil matrimonial platform with family profiles and culturally relevant matchmaking tools.",
    description:
      "A specialised Tamil matrimonial platform focusing on Sri Lankan Tamil community matches, with detailed family profiles and modern discovery features.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746198532/Screenshot_2025-05-02_203829_mybeho.png",
    live: "https://subamangalyam.com/",
    github: "Private",
    technologies: ["React", "Next.js", "Tailwind CSS", ".NET"],
    features: [
      "Community-specific match filters",
      "Detailed family background profiles",
      "Real-time chat and community events",
      "Success story showcases",
    ],
    featured: false,
    status: "shipped",
    accent: accentAt(15),
    color: colorAt(15),
  },
  {
    slug: "travel-finders",
    title: "Travel Finders",
    summary: "Sri Lankan travel agency platform for packages, hotels, and adventure bookings.",
    description:
      "A travel agency platform offering customised tour packages, hotel bookings, and adventure experiences for local and international travellers.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746198907/Screenshot_2025-05-02_204439_tmiwt5.png",
    live: "https://travelfinders.lk/",
    github: "Private",
    technologies: ["React", "Tailwind CSS"],
    features: [
      "Interactive tour package builder",
      "Local guide booking",
      "Reviews and a mobile booking flow",
      "Travel blog with expert tips",
    ],
    featured: false,
    status: "shipped",
    accent: accentAt(16),
    color: colorAt(16),
  },
  {
    slug: "sri-lankan-memories",
    title: "Sri Lankan Memories",
    summary: "Tourism platform for Sri Lanka’s heritage, landscapes, and travel stories.",
    description:
      "A visually rich tourism platform showcasing Sri Lanka’s cultural heritage and scenic landscapes through multimedia and interactive storytelling.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746199028/Screenshot_2025-05-02_204647_hchn2c.png",
    live: "https://srilankanmemories.com/",
    github: "Private",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    features: [
      "Interactive cultural heritage timeline",
      "Travelogue with user stories",
      "Local experience booking",
      "SEO-optimised destination guides",
    ],
    featured: false,
    status: "shipped",
    accent: accentAt(17),
    color: colorAt(17),
  },
  {
    slug: "grow-accounting-services",
    title: "Grow Accounting Services",
    summary: "Accounting firm website for Australian SMEs, with a calm professional interface.",
    description:
      "A modern accounting firm website offering business advisory, tax planning, and financial services for Australian SMEs.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746199112/Screenshot_2025-05-02_204821_vnpdma.png",
    live: "https://growaccountingservices.com.au/",
    github: "Private",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    features: [
      "Industry-specific service showcase",
      "Testimonials and case studies",
      "Mobile-optimised professional layout",
    ],
    featured: false,
    status: "shipped",
    accent: accentAt(18),
    color: colorAt(18),
  },
  {
    slug: "pro-luxury-car-rental",
    title: "Pro Luxury Car Rental",
    summary: "Luxury car rental platform with immersive galleries and a streamlined booking flow.",
    description:
      "A premium car rental platform showcasing high-end vehicles with galleries and reservation flows for discerning clients.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746199240/Screenshot_2025-05-02_205029_tpjik8.png",
    live: "https://profound3.netlify.app/",
    github: "Private",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: [
      "Luxury vehicle galleries",
      "Mobile-optimised booking flow",
      "Testimonials and live chat support",
    ],
    featured: false,
    status: "shipped",
    accent: accentAt(19),
    color: colorAt(19),
  },
  {
    slug: "onn4-three-wheeler",
    title: "ONN4 Three-Wheeler Services",
    summary: "Ride-hailing web experience for three-wheeler services in Sri Lanka.",
    description:
      "A specialised ride-hailing platform for three-wheeler services in Sri Lanka, connecting passengers with verified drivers.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746199386/Screenshot_2025-05-02_205232_pwmf4n.png",
    live: "https://onn4.lk/",
    github: "Private",
    technologies: ["React"],
    features: ["Three-wheeler specific booking interface"],
    featured: false,
    status: "shipped",
    accent: accentAt(20),
    color: colorAt(20),
  },
  {
    slug: "elite-rove-car-rental",
    title: "Elite Rove Car Rental",
    summary: "Luxury and exotic car rental experience with concierge-oriented booking.",
    description:
      "A premium car rental platform for luxury and exotic vehicles, with instant booking and a mobile-first checkout.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746199991/Screenshot_2025-05-02_210244_yc19a1.png",
    live: "https://elite-rove.netlify.app/",
    github: "Private",
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Google Maps API"],
    features: [
      "One-click reservation system",
      "Chauffeur booking integration",
      "Mobile-optimised checkout",
    ],
    featured: false,
    status: "shipped",
    accent: accentAt(21),
    color: colorAt(21),
  },
  {
    slug: "church-of-theology",
    title: "Church of Theology",
    summary: "Community church platform for sermons, events, and prayer requests.",
    description:
      "A spiritual platform featuring sermon archives, event calendars, and community engagement tools with accessible organisation.",
    image: "https://res.cloudinary.com/dvkothlvo/image/upload/v1746200155/Screenshot_2025-05-02_210536_ghckuh.png",
    live: undefined,
    github: "Private",
    technologies: ["React", "Tailwind CSS"],
    features: ["Prayer request submission", "Mobile-responsive design"],
    featured: false,
    status: "shipped",
    accent: accentAt(22),
    color: colorAt(22),
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured && project.status === "shipped");
}

export function getMoreProjects(): Project[] {
  return projects.filter((project) => !project.featured && project.status === "shipped");
}

export function hasLiveDemo(project: Project): boolean {
  return Boolean(project.live && project.live !== "#");
}

export function isPrivateGithub(project: Project): boolean {
  return !project.github || project.github === "Private";
}
