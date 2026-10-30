"use client";

import { useEffect, useMemo, useRef, useState, type SVGProps } from "react";
import { BAR_W, COLUMNS, DEFAULT_GAP, buildSonderPath } from "@/lib/pattern";

/**
 * Static version of the bar pattern. Fills its `position: relative` parent.
 * Drawn as plain geometry (one path) rather than an SVG <pattern>, so there are
 * no hairline seams at any scale.
 *
 *   <SonderPattern color="#fff" opacity={0.06} tileWidth={160} />
 */
export interface SonderPatternProps extends Omit<SVGProps<SVGSVGElement>, "color" | "opacity"> {
  /** Bar fill. Any CSS colour, defaults to currentColor. */
  color?: string;
  /** Bar opacity, 0 to 1. */
  opacity?: number;
  /** Width in px of one repeat of five bars. Everything scales with it. */
  tileWidth?: number;
  /** Gap between bars in icon units, the same in both directions. */
  gap?: number;
  /** Size used for the first render, before the real size is measured. */
  fallbackSize?: { width: number; height: number };
}

export default function SonderPattern({
  color = "currentColor",
  opacity = 1,
  tileWidth = 160,
  gap = DEFAULT_GAP,
  fallbackSize = { width: 1920, height: 1080 },
  className,
  style,
  ...rest
}: SonderPatternProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState(fallbackSize);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((s) =>
        Math.abs(s.width - width) < 1 && Math.abs(s.height - height) < 1
          ? s
          : { width, height },
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = tileWidth / ((BAR_W + gap) * COLUMNS.length);
  const d = useMemo(
    () => buildSonderPath(size.width / scale, size.height / scale, gap),
    [size.width, size.height, scale, gap],
  );

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        ...style,
      }}
      {...rest}
    >
      <g transform={`scale(${scale})`}>
        <path d={d} fill={color} fillOpacity={opacity} />
      </g>
    </svg>
  );
}
