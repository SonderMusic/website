import { ICON_PATH, ICON_VIEWBOX } from "@/lib/icon-path";

/** The five slanted bars. Takes its colour from `currentColor`. */
export default function SonderIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={ICON_VIEWBOX}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d={ICON_PATH} />
    </svg>
  );
}
