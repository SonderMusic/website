import { WORDMARK_PATH, WORDMARK_VIEWBOX } from "@/lib/wordmark-path";

/** The sonder wordmark as inline SVG. Takes its colour from `currentColor`. */
export default function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox={WORDMARK_VIEWBOX}
      role="img"
      aria-label="sonder"
      fill="currentColor"
      fillRule="evenodd"
    >
      <path d={WORDMARK_PATH} />
    </svg>
  );
}
