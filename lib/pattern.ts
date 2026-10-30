/**
 * Geometry for the sonder bar pattern.
 *
 * - Every bar is a parallelogram whose top and bottom edges are both 30 degrees.
 * - Each of the five columns repeats up and down on its own, with the same gap
 *   between bars vertically and horizontally.
 * - Units are "icon units": the same coordinate space as the logo icon.
 */

export const ANGLE = Math.PI / 6; // 30 degrees
export const TAN = Math.tan(ANGLE);
export const COS = Math.cos(ANGLE);
export const BAR_W = 39.43;

/** [top-left y, height] of each column in the original icon. */
export const COLUMNS: ReadonlyArray<readonly [number, number]> = [
  [94.3, 120.0],
  [62.6, 180.9],
  [92.9, 121.4],
  [36.5, 232.2],
  [111.6, 79.1],
];

/** Gap between bars in icon units. The original icon uses about 14.7. */
export const DEFAULT_GAP = 14.7;

export const f = (n: number) => n.toFixed(2);

/** One slanted bar as path data. (x, y) is its top-left corner. */
export function bar(x: number, y: number, h: number): string {
  const rise = BAR_W * TAN; // the right edge sits this much higher
  return (
    `M${f(x)} ${f(y)}L${f(x + BAR_W)} ${f(y - rise)}` +
    `L${f(x + BAR_W)} ${f(y - rise + h)}L${f(x)} ${f(y + h)}Z`
  );
}

/** Path data covering a viewW x viewH area (icon units) with every column. */
export function buildSonderPath(viewW: number, viewH: number, gap = DEFAULT_GAP): string {
  const pitch = BAR_W + gap;
  const tileW = pitch * COLUMNS.length;
  const vGap = gap / COS; // vertical distance giving a perpendicular gap of `gap`
  const rise = BAR_W * TAN;
  const parts: string[] = [];

  for (let j = -1; j * tileW < viewW; j++) {
    COLUMNS.forEach(([y0, h], i) => {
      const x = j * tileW + i * pitch + gap / 2;
      if (x + BAR_W < 0 || x > viewW) return;
      const step = h + vGap;
      const kMin = Math.floor(-(y0 + h) / step);
      for (let k = kMin; ; k++) {
        const y = y0 + k * step;
        if (y - rise > viewH) break;
        if (y + h < 0) continue;
        parts.push(bar(x, y, h));
      }
    });
  }
  return parts.join("");
}

/** Path data for a single column, covering the view plus one repeat above and below. */
export function buildColumnPath(
  col: number,
  viewW: number,
  viewH: number,
  gap = DEFAULT_GAP,
): string {
  const [y0, h] = COLUMNS[col];
  const pitch = BAR_W + gap;
  const tileW = pitch * COLUMNS.length;
  const step = h + gap / COS;
  const rise = BAR_W * TAN;
  const lo = -step;
  const hi = viewH + step;
  const parts: string[] = [];

  for (let j = -1; j * tileW < viewW; j++) {
    const x = j * tileW + col * pitch + gap / 2;
    if (x + BAR_W < 0 || x > viewW) continue;
    for (let k = Math.floor((lo - (y0 + h)) / step); ; k++) {
      const y = y0 + k * step;
      if (y - rise > hi) break;
      if (y + h < lo) continue;
      parts.push(bar(x, y, h));
    }
  }
  return parts.join("");
}
