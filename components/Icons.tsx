import type { SVGProps } from "react";

/* Minimal inline icon set — avoids an icon dependency and keeps the bundle lean. */

type IconProps = SVGProps<SVGSVGElement>;

const base = (p: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  width: 20,
  height: 20,
  ...p,
});

export const ScrollCursor = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="7.5" y="2.5" width="9" height="14" rx="4.5" />
    <path d="M12 6v3" />
    <path d="M9 19.5 12 22l3-2.5" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const ArrowDown = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 4v15" />
    <path d="m6 13 6 6 6-6" />
  </svg>
);

export const Play = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 4.5v15l12-7.5-12-7.5Z" />
  </svg>
);

export const Sparkle = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" />
  </svg>
);

export const Layers = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </svg>
);

export const Chart = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
);

export const Cube = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2.5 21 7v10l-9 4.5L3 17V7l9-4.5Z" />
    <path d="M3 7l9 4.5L21 7M12 11.5V21.5" />
  </svg>
);

export const Grid = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

export const Code = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m9 8-5 4 5 4M15 8l5 4-5 4" />
  </svg>
);

export const Check = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const XMark = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Plus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Trash = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
  </svg>
);

export const Grip = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="9" cy="6" r="1.2" fill="currentColor" />
    <circle cx="15" cy="6" r="1.2" fill="currentColor" />
    <circle cx="9" cy="12" r="1.2" fill="currentColor" />
    <circle cx="15" cy="12" r="1.2" fill="currentColor" />
    <circle cx="9" cy="18" r="1.2" fill="currentColor" />
    <circle cx="15" cy="18" r="1.2" fill="currentColor" />
  </svg>
);

export const Monitor = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
    <path d="M9 20.5h6M12 16.5v4" />
  </svg>
);

export const Tablet = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
    <path d="M12 18.5h.01" />
  </svg>
);

export const Phone = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="M12 18.5h.01" />
  </svg>
);

export const Eye = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Share = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v11M8 6.5 12 2.5l4 4" />
    <path d="M5 13v6.5h14V13" />
  </svg>
);

export const Remix = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 8h11a4 4 0 0 1 0 8H8" />
    <path d="m7.5 4.5L4 8l3.5 3.5" />
    <path d="m11.5 12.5L15 16l-3.5 3.5" />
  </svg>
);

export const Bolt = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z" />
  </svg>
);

export const Lock = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4.5" y="10" width="15" height="11" rx="2.5" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

export const Globe = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
  </svg>
);

export const Clock = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3.5 2" />
  </svg>
);

export const Menu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const BrandMark = ({ size = 28, ...p }: IconProps & { size?: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" {...p}>
    <defs>
      <linearGradient id="scrolly-brand" x1="0" y1="0" x2="32" y2="32">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="55%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
    </defs>
    <rect x="1.5" y="1.5" width="29" height="29" rx="9" stroke="url(#scrolly-brand)" strokeWidth="1.6" />
    <rect x="12.5" y="7" width="7" height="12" rx="3.5" stroke="url(#scrolly-brand)" strokeWidth="1.8" />
    <path d="M16 10.2v2.6" stroke="url(#scrolly-brand)" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12.4 23.4 16 26.4l3.6-3" stroke="url(#scrolly-brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SocialIcon = ({ name, ...p }: IconProps & { name: string }) => {
  switch (name) {
    case "x":
      return (
        <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" {...p}>
          <path d="M17.5 3h3.1l-6.8 7.7L21.8 21h-6.3l-4.4-5.8L5.9 21H2.8l7.2-8.2L2.4 3h6.4l4 5.3L17.5 3Zm-1.1 16.1h1.7L7.6 4.8H5.8l10.6 14.3Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" {...p}>
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4V9Z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" {...p}>
          <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
        </svg>
      );
    case "discord":
      return (
        <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" {...p}>
          <path d="M19.3 5.3A16.9 16.9 0 0 0 15.1 4l-.2.4a12.6 12.6 0 0 1 3.7 1.9 12 12 0 0 0-10.3-.5c-.4.2-.8.4-1.2.6A12.4 12.4 0 0 1 9.1 4.4L8.9 4a16.9 16.9 0 0 0-4.2 1.3C2.4 9.2 1.8 13 2.1 16.8A17 17 0 0 0 7.3 19l.6-1c-.5-.2-1-.5-1.5-.8l.4-.3a12.1 12.1 0 0 0 10.4 0l.4.3c-.5.3-1 .6-1.5.8l.6 1a17 17 0 0 0 5.2-2.2c.4-4.4-.6-8.2-2.6-11.5ZM8.7 14.5c-1 0-1.9-.9-1.9-2s.8-2 1.9-2 1.9.9 1.9 2-.9 2-1.9 2Zm6.6 0c-1 0-1.9-.9-1.9-2s.8-2 1.9-2 1.9.9 1.9 2-.8 2-1.9 2Z" />
        </svg>
      );
    default:
      return null;
  }
};
