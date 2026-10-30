/** A 24px line icon. `d` is the path data. Takes its colour from `currentColor`. */
export default function StrokeIcon({
  d,
  size = 20,
  strokeWidth = 1.8,
  children,
}: {
  d?: string;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d ? <path d={d} /> : children}
    </svg>
  );
}

/** Icon paths used across the page. */
export const ICONS = {
  shuffle: "M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5",
  prev: "M19 20 9 12l10-8zM5 19V5",
  next: "m5 4 10 8-10 8zM19 5v14",
  repeat: "m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3",
  volume: "M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13",
  queue: "M3 6h18M3 12h18M3 18h10",
  gapless: "M3 12h2M8 8v8M12 4v16M16 8v8M19 12h2",
  bitperfect: "M12 3v18M8 7v10M4 10v4M16 7v10M20 10v4",
  lyrics: "M4 6h16M4 12h10M4 18h13",
  offline: "M12 4v10M8 10l4 4 4-4M5 19h14",
  scrobble: "M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 2",
  canvas: "M4 4h16v12H4zM8 20h8M12 16v4",
  transcode: "M7 7h13l-3-3M17 17H4l3 3",
} as const;

/** Round white play button used in the app mock-up. */
export function PlayCircle({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="22" fill="#FFFFFF" />
      <path d="M18 14.5v15l12-7.5z" fill="#0A0A0A" />
    </svg>
  );
}
