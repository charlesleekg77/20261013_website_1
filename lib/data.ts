/* ============================================================================
   Content model — shared across the landing, showcase, docs and studio pages.
   ========================================================================== */

export interface Template {
  id: string;
  title: string;
  category: TemplateCategory;
  blurb: string;
  scenes: number;
  duration: string;
  accent: string;
  gradient: string;
  /** Which preview renderer the card should mount on hover. */
  preview: "bars" | "map" | "orbit" | "timeline";
  stats: { label: string; value: string }[];
}

export type TemplateCategory =
  | "Journalism"
  | "Corporate"
  | "Product"
  | "Data Viz"
  | "Education";

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  "Journalism",
  "Corporate",
  "Product",
  "Data Viz",
  "Education",
];

export const TEMPLATES: Template[] = [
  {
    id: "tpl-climate",
    title: "The Warming Line",
    category: "Journalism",
    blurb:
      "A decade of temperature anomalies told through a pinned chart that builds as the reader descends.",
    scenes: 14,
    duration: "6 min read",
    accent: "#10B981",
    gradient: "from-emerald-glow/30 via-canvas to-obsidian",
    preview: "bars",
    stats: [
      { label: "Scenes", value: "14" },
      { label: "3D Layers", value: "3" },
      { label: "Charts", value: "5" },
    ],
  },
  {
    id: "tpl-launch",
    title: "Nova Launch Keynote",
    category: "Product",
    blurb:
      "Product hero shots that orbit as the copy changes — a scroll-locked 3D reveal for launch day.",
    scenes: 9,
    duration: "3 min",
    accent: "#6366F1",
    gradient: "from-indigo-glow/30 via-canvas to-obsidian",
    preview: "orbit",
    stats: [
      { label: "Scenes", value: "9" },
      { label: "3D Layers", value: "6" },
      { label: "Charts", value: "0" },
    ],
  },
  {
    id: "tpl-annual",
    title: "Annual Report 2026",
    category: "Corporate",
    blurb:
      "Financial highlights as scroll-triggered counters, paired with an interactive revenue ribbon.",
    scenes: 18,
    duration: "8 min read",
    accent: "#8B5CF6",
    gradient: "from-violet-glow/30 via-canvas to-obsidian",
    preview: "timeline",
    stats: [
      { label: "Scenes", value: "18" },
      { label: "3D Layers", value: "1" },
      { label: "Charts", value: "9" },
    ],
  },
  {
    id: "tpl-casestudy",
    title: "Outcome Case Study",
    category: "Data Viz",
    blurb:
      "Before / after metrics stitched to a map whose nodes connect as the narrative advances.",
    scenes: 11,
    duration: "5 min read",
    accent: "#10B981",
    gradient: "from-emerald-glow/25 via-canvas to-obsidian",
    preview: "map",
    stats: [
      { label: "Scenes", value: "11" },
      { label: "3D Layers", value: "2" },
      { label: "Charts", value: "7" },
    ],
  },
  {
    id: "tpl-history",
    title: "A Hundred Years in Motion",
    category: "Education",
    blurb:
      "An animated timeline where each era pins in place while the backdrop cross-fades through the decades.",
    scenes: 22,
    duration: "11 min read",
    accent: "#6366F1",
    gradient: "from-indigo-glow/25 via-canvas to-obsidian",
    preview: "timeline",
    stats: [
      { label: "Scenes", value: "22" },
      { label: "3D Layers", value: "4" },
      { label: "Charts", value: "3" },
    ],
  },
  {
    id: "tpl-econ",
    title: "The Cost of Everything",
    category: "Journalism",
    blurb:
      "An economy-wide index that decomposes into sectors as scroll progress deepens the zoom.",
    scenes: 16,
    duration: "9 min read",
    accent: "#8B5CF6",
    gradient: "from-violet-glow/25 via-canvas to-obsidian",
    preview: "bars",
    stats: [
      { label: "Scenes", value: "16" },
      { label: "3D Layers", value: "2" },
      { label: "Charts", value: "11" },
    ],
  },
];

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export const PRICING: PricingTier[] = [
  {
    id: "free",
    name: "Free / Creator",
    price: "$0",
    cadence: "forever",
    tagline: "Everything you need to publish your first scroll story.",
    features: [
      "3 public scrolly stories",
      "Standard analytics",
      "Scrollytelling watermark",
      "Community template access",
      "Embed via <scrolly-embed>",
    ],
    cta: "Start free",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    cadence: "/mo",
    tagline: "For creators shipping scroll stories on their own domain.",
    features: [
      "Unlimited stories",
      "Custom domain export",
      "High-res media hosting (4K / 60fps)",
      "Zero watermark",
      "Advanced chart & 3D modules",
      "Priority rendering pipeline",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    tagline: "For teams embedding scrollytelling at scale.",
    features: [
      "Scrollytelling API access",
      "Team collaboration & roles",
      "Custom WebGL / 3D integration",
      "SSO, SOC 2, audit logs",
      "White-glove onboarding",
    ],
    cta: "Book a demo",
  },
];

export interface ShowcaseFilter {
  label: string;
  value: TemplateCategory | "All";
}

export const SHOWCASE_FILTERS: ShowcaseFilter[] = [
  { label: "All", value: "All" },
  ...TEMPLATE_CATEGORIES.map((c) => ({ label: c, value: c })),
];

export const NAV_LINKS = [
  { label: "Platform", href: "/#platform" },
  { label: "Templates", href: "/showcase" },
  { label: "Showcase", href: "/#showcase" },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Platform overview", href: "/#platform" },
      { label: "Scrolly Studio", href: "/editor" },
      { label: "Charts & data viz", href: "/#platform" },
      { label: "3D scenes", href: "/#platform" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Templates",
    links: [
      { label: "Data journalism", href: "/showcase" },
      { label: "Product launches", href: "/showcase" },
      { label: "Annual reports", href: "/showcase" },
      { label: "Case studies", href: "/showcase" },
      { label: "Educational timelines", href: "/showcase" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Scrollytelling API", href: "/docs" },
      { label: "<scrolly-embed>", href: "/docs#embed" },
      { label: "useScrollStep hook", href: "/docs#hooks" },
      { label: "Standalone bundle", href: "/docs#bundle" },
      { label: "Changelog", href: "/docs#changelog" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Creator community", href: "#" },
      { label: "Template gallery", href: "/showcase" },
      { label: "Showcase of the week", href: "/#showcase" },
      { label: "Status", href: "#" },
    ],
  },
];

export const SOCIALS = [
  { label: "X / Twitter", href: "#", icon: "x", handle: "@scrollytelling" },
  { label: "LinkedIn", href: "#", icon: "linkedin", handle: "/scrollytelling" },
  { label: "GitHub", href: "#", icon: "github", handle: "/scrollytelling" },
  { label: "Discord", href: "#", icon: "discord", handle: "Join 12k creators" },
];
