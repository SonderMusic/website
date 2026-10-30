"use client";

import { useEffect, useId, useMemo, useRef, useState, type SVGProps } from "react";
import { BAR_W, COLUMNS, COS, DEFAULT_GAP, buildColumnPath } from "@/lib/pattern";

/**
 * Seamless bar pattern where each column slowly slides up or down at its own
 * speed. Fills its `position: relative` parent.
 *
 * - The loop has no jump: each column moves by exactly one repeat per cycle.
 * - Speeds are screen px per second and capped, so it never gets frantic.
 * - Pure CSS transform animation, switched off for `prefers-reduced-motion`.
 *
 *   <SonderPatternAnimated color="#fff" opacity={0.09} tileWidth={380} />
 */

/** Signed px/s per column. Positive moves down, negative moves up. */
const DEFAULT_SPEEDS = [8, -13, 5, -10, 15] as const;
const MAX_SPEED = 40; // px/s hard cap

export interface SonderPatternAnimatedProps
  extends Omit<SVGProps<SVGSVGElement>, "color" | "opacity"> {
  /** Bar fill. Any CSS colour, defaults to currentColor. */
  color?: string;
  /** Bar opacity, 0 to 1. */
  opacity?: number;
  /** Width in px of one repeat of five bars. Everything scales with it. */
  tileWidth?: number;
  /** Gap between bars in icon units, the same in both directions. */
  gap?: number;
  /** Speed multiplier for all columns. 1 is the default calm pace. */
  speed?: number;
  /** Override the five column speeds in px/s (+ down, - up). */
  speeds?: readonly [number, number, number, number, number];
  /** Pause the motion. */
  paused?: boolean;
  /** Size used for the first render, before the real size is measured. */
  fallbackSize?: { width: number; height: number };
}

export default function SonderPatternAnimated({
  color = "currentColor",
  opacity = 1,
  tileWidth = 160,
  gap = DEFAULT_GAP,
  speed = 1,
  speeds = DEFAULT_SPEEDS,
  paused = false,
  fallbackSize = { width: 1920, height: 1080 },
  className,
  style,
  ...rest
}: SonderPatternAnimatedProps) {
  const uid = "sonder" + useId().replace(/[^a-zA-Z0-9]/g, "");
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

  const columns = useMemo(
    () =>
      COLUMNS.map(([, h], i) => {
        const step = h + gap / COS; // icon units per loop
        const v = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, (speeds[i] ?? 0) * speed));
        return {
          d: buildColumnPath(i, size.width / scale, size.height / scale, gap),
          step,
          up: v < 0,
          seconds: v === 0 ? 0 : (step * scale) / Math.abs(v),
        };
      }),
    [size.width, size.height, scale, gap, speed, speeds],
  );

  const css =
    columns
      .map((c, i) =>
        c.seconds === 0
          ? ""
          : `@keyframes ${uid}k${i}{from{transform:translateY(0)}to{transform:translateY(${c.step.toFixed(4)}px)}}` +
            `.${uid}c${i}{animation:${uid}k${i} ${c.seconds.toFixed(2)}s linear infinite ${c.up ? "reverse" : "normal"}}`,
      )
      .join("") +
    `.${uid}{will-change:transform;animation-play-state:${paused ? "paused" : "running"}}` +
    `@media (prefers-reduced-motion:reduce){.${uid}{animation:none!important}}`;

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
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      <style>{css}</style>
      <g transform={`scale(${scale})`}>
        {columns.map((c, i) => (
          <g key={i} className={`${uid} ${uid}c${i}`}>
            <path d={c.d} fill={color} fillOpacity={opacity} />
          </g>
        ))}
      </g>
    </svg>
  );
}
