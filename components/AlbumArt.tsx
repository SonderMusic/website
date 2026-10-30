import type { Album } from "@/lib/site";

/** Generated cover art: four slanted bars on a flat colour. */
export default function AlbumArt({
  album,
  size,
  className,
}: {
  album: Album;
  /** Fixed pixel size. Omit to fill the width of the parent. */
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      width={size ?? "100%"}
      height={size}
      style={size ? undefined : { display: "block", aspectRatio: "1 / 1" }}
      aria-hidden="true"
    >
      <rect width="100" height="100" fill={album.bg} />
      <path fill={album.fg} d={album.bars} />
    </svg>
  );
}
