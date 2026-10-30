"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "./app-mockup.css";
import SonderIcon from "./SonderIcon";
import {
  FEATURED_STATION,
  FEATURED_TRACK,
  LIBRARY,
  QUICK_PICKS,
  RECENTS,
  RECENT_STATIONS,
  STATIONS,
  TRACKS,
  TRENDING_STATIONS,
  stationById,
  trackById,
  type LibraryItem,
  type LibraryKind,
  type Station,
} from "@/lib/mockup-data";

/**
 * An interactive picture of the sonder desktop app for the landing page.
 * Everything in it is demo content from `lib/mockup-data.ts`.
 *
 * Works: page tabs, back and forward, play and pause (the time really runs),
 * previous and next, shuffle, repeat, likes, mute and volume, clicking any
 * album or station to play it, and filtering, sorting and searching the library.
 */

type Page = "home" | "radio" | "library";
type Playing = { kind: "track"; id: string } | { kind: "station"; id: string };
type Filter = "all" | LibraryKind;
type Sort = "recent" | "az" | "za";

/* ---------- generated cover art: five slanted bars, every edge at 30 degrees ---------- */

const PALETTE: ReadonlyArray<readonly [string, string]> = [
  ["#FFFFFF", "#0A0A0A"], ["#1F1F1F", "#FFFFFF"], ["#8A8A8A", "#0A0A0A"], ["#D4D4D4", "#0A0A0A"],
  ["#262626", "#FFFFFF"], ["#5C5C5C", "#FFFFFF"], ["#F2F2F2", "#3A3A3A"], ["#2E2E2E", "#E6E6E6"],
];
const TAN30 = Math.tan(Math.PI / 6);

function rand(seed: number) {
  let a = (seed * 2654435761) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const artCache = new Map<number, { bg: string; fg: string; d: string }>();
function artFor(seed: number) {
  let hit = artCache.get(seed);
  if (hit) return hit;
  const r = rand(seed + 11);
  const [bg, fg] = PALETTE[seed % PALETTE.length];
  const w = 15, pitch = 19, x0 = 4.5, rise = w * TAN30;
  let d = "";
  for (let i = 0; i < 5; i++) {
    const h = 26 + r() * 34;
    const y = 4 + r() * (92 - h - rise * 2);
    const x = x0 + i * pitch;
    d += `M${x.toFixed(1)} ${(y + rise).toFixed(1)}L${(x + w).toFixed(1)} ${y.toFixed(1)}V${(y + h).toFixed(1)}L${x.toFixed(1)} ${(y + h + rise).toFixed(1)}Z`;
  }
  hit = { bg, fg, d };
  artCache.set(seed, hit);
  return hit;
}

function Cover({ seed, className = "" }: { seed: number; className?: string }) {
  const { bg, fg, d } = artFor(seed);
  return (
    <svg className={`sm-art ${className}`} viewBox="0 0 100 100" aria-hidden="true">
      <rect width="100" height="100" fill={bg} />
      <path d={d} fill={fg} />
    </svg>
  );
}

function StationTile({ s, className = "" }: { s: Station; className?: string }) {
  return (
    <span className={`sm-st ${className}`} style={{ background: s.bg, color: s.fg }} aria-hidden="true">
      <b>{s.short}</b>
    </span>
  );
}

/* ---------- icons ---------- */

const P = {
  shuffle: "M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5",
  prev: "M19 20 9 12l10-8zM5 19V5",
  next: "m5 4 10 8-10 8zM19 5v14",
  repeat: "m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3",
  volume: "M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13",
  muted: "M11 5 6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6",
  heart: "M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.3-4.3",
  left: "M15 5l-7 7 7 7",
  right: "M9 5l7 7-7 7",
  timer: "M12 8v5l3 2M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9 2h6",
  expand: "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",
  refresh: "M21 12a9 9 0 1 1-3-6.7M21 4v5h-5",
  plus: "M12 5v14M5 12h14",
  sort: "M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4",
  radio: "M4 9h16v11H4zM8 9l9-5M9 14.5a1.5 1.5 0 1 0 .01 0M13 14h4M13 17h4",
  min: "M5 12h14",
  max: "M5 5h14v14H5z",
  close: "M6 6l12 12M18 6 6 18",
} as const;

function Icon({ d, size = 20, fill = false }: { d: string; size?: number; fill?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
const PlayGlyph = ({ size = 22 }: { size?: number }) => <Icon d="M8 4.5v15l12-7.5z" size={size} fill />;
const PauseGlyph = ({ size = 22 }: { size?: number }) => <Icon d="M7 4h3.5v16H7zM13.5 4H17v16h-3.5z" size={size} fill />;

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

const FILTERS: ReadonlyArray<[Filter, string]> = [
  ["all", "all"], ["artist", "artists"], ["playlist", "playlists"], ["album", "albums"], ["curation", "curations"],
];
const SORTS: ReadonlyArray<[Sort, string]> = [["recent", "recent"], ["az", "a to z"], ["za", "z to a"]];

export default function AppMockup() {
  const [nav, setNav] = useState<{ stack: Page[]; i: number }>({ stack: ["home"], i: 0 });
  const page = nav.stack[nav.i];
  const [now, setNow] = useState<Playing>({ kind: "track", id: "low-tide" });
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(46);
  const [liked, setLiked] = useState<Set<string>>(() => new Set(["track:low-tide"]));
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [muted, setMuted] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("recent");
  const [query, setQuery] = useState("");
  const [focusSearch, setFocusSearch] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const track = now.kind === "track" ? trackById(now.id) : null;
  const station = now.kind === "station" ? stationById(now.id) : null;
  const idx = track ? TRACKS.findIndex((x) => x.id === track.id) : 0;

  /* ---- navigation ---- */
  const go = (p: Page) => {
    if (p === page) return;
    setNav((n) => ({ stack: [...n.stack.slice(0, n.i + 1), p], i: n.i + 1 }));
  };
  const canBack = nav.i > 0;
  const canForward = nav.i < nav.stack.length - 1;

  useEffect(() => {
    if (focusSearch && page === "library") {
      searchRef.current?.focus();
      setFocusSearch(false);
    }
  }, [focusSearch, page]);

  /* ---- playback ---- */
  const playTrack = (id: string) => {
    setNow({ kind: "track", id });
    setPos(0);
    setPlaying(true);
  };
  const playStation = (id: string) => {
    setNow({ kind: "station", id });
    setPos(0);
    setPlaying(true);
  };
  const jump = (dir: 1 | -1) => {
    if (!track) return;
    let next = (idx + dir + TRACKS.length) % TRACKS.length;
    if (shuffle && dir === 1) {
      do next = Math.floor(Math.random() * TRACKS.length);
      while (next === idx && TRACKS.length > 1);
    }
    setNow({ kind: "track", id: TRACKS[next].id });
    setPos(0);
  };
  const previous = () => (pos > 3 ? setPos(0) : jump(-1));

  useEffect(() => {
    if (!playing || !track) return;
    const t = setInterval(() => setPos((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, [playing, track]);

  useEffect(() => {
    if (track && pos >= track.duration) {
      if (repeat) setPos(0);
      else jump(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos]);

  const likeKey = track ? `track:${track.id}` : `station:${station!.id}`;
  const isLiked = liked.has(likeKey);
  const toggleLike = () =>
    setLiked((s) => {
      const n = new Set(s);
      if (n.has(likeKey)) n.delete(likeKey);
      else n.add(likeKey);
      return n;
    });

  /* ---- library ---- */
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = LIBRARY.filter(
      (it) => (filter === "all" || it.kind === filter) && (!q || `${it.title} ${it.subtitle}`.toLowerCase().includes(q)),
    );
    if (sort === "az") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za") list = [...list].sort((a, b) => b.title.localeCompare(a.title));
    return list;
  }, [filter, sort, query]);

  const onLibraryItem = (it: LibraryItem) => {
    if (it.trackId) playTrack(it.trackId);
    else if (it.kind === "curation") go("radio");
  };

  /* ---- pages ---- */
  const isNow = (id: string) => now.kind === "track" && now.id === id;
  const isNowStation = (id: string) => now.kind === "station" && now.id === id;

  const heroTrack = trackById(FEATURED_TRACK);
  const heroStation = stationById(FEATURED_STATION);

  const home = (
    <>
      <div className="sm-hero">
        <div className="sm-hero__bg" aria-hidden="true"><Cover seed={heroTrack.art} /></div>
        <Cover seed={heroTrack.art} className="sm-hero__art" />
        <div className="sm-hero__text">
          <div className="sm-eyebrow">album · {heroTrack.year}</div>
          <div className="sm-hero__title">{heroTrack.album}</div>
          <div className="sm-hero__sub">{heroTrack.artist}</div>
        </div>
        <button className="sm-round sm-hero__play" onClick={() => playTrack(heroTrack.id)} aria-label={`Play ${heroTrack.album}`}>
          <PlayGlyph size={20} />
        </button>
      </div>

      <div className="sm-quick">
        {QUICK_PICKS.map((id) => {
          const x = trackById(id);
          return (
            <button key={id} className={`sm-pick${isNow(id) ? " is-now" : ""}`} onClick={() => playTrack(id)}
              aria-label={`Play ${x.title} by ${x.artist}`}>
              <Cover seed={x.art} />
              <span>{x.title}</span>
            </button>
          );
        })}
      </div>

      <h3 className="sm-h">Recents</h3>
      <div className="sm-shelf">
        {RECENTS.map((id) => {
          const x = trackById(id);
          return (
            <button key={id} className={`sm-card${isNow(id) ? " is-now" : ""}`} onClick={() => playTrack(id)}
              aria-label={`Play ${x.title} by ${x.artist}`}>
              <Cover seed={x.art} />
              <span className="sm-card__t">{x.title}</span>
              <span className="sm-card__s">{x.artist}</span>
            </button>
          );
        })}
      </div>
      <h3 className="sm-h">Newly Added</h3>
    </>
  );

  const stationShelf = (title: string, ids: string[]) => (
    <>
      <h3 className="sm-h">{title}</h3>
      <div className="sm-shelf">
        {ids.map((id) => {
          const s = stationById(id);
          return (
            <button key={id} className={`sm-card${isNowStation(id) ? " is-now" : ""}`} onClick={() => playStation(id)}
              aria-label={`Play ${s.name}`}>
              <StationTile s={s} />
              <span className="sm-card__t">{s.name}</span>
              <span className="sm-card__s">{s.tags}</span>
            </button>
          );
        })}
      </div>
    </>
  );

  const radio = (
    <>
      <div className="sm-hero sm-hero--station">
        <div className="sm-hero__bg" aria-hidden="true"><StationTile s={heroStation} /></div>
        <StationTile s={heroStation} className="sm-hero__art" />
        <div className="sm-hero__text">
          <div className="sm-eyebrow">station · {heroStation.country}</div>
          <div className="sm-hero__title">{heroStation.name}</div>
        </div>
        <button className="sm-round sm-hero__play" onClick={() => playStation(heroStation.id)} aria-label={`Play ${heroStation.name}`}>
          <PlayGlyph size={20} />
        </button>
      </div>
      {stationShelf("Recently Played", RECENT_STATIONS)}
      {stationShelf("Trending Now", TRENDING_STATIONS)}
    </>
  );

  const library = (
    <>
      <div className="sm-lib-head">
        <div>
          <h2 className="sm-lib-title">your library</h2>
          <div className="sm-muted">{shown.length} items</div>
        </div>
        <div className="sm-lib-tools">
          <label className="sm-search">
            <Icon d={P.search} size={16} />
            <input ref={searchRef} type="search" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search library..." aria-label="Search library" />
          </label>
          <span className="sm-round sm-round--line sm-deco" aria-hidden="true"><Icon d={P.refresh} size={18} /></span>
          <span className="sm-round sm-round--line sm-deco" aria-hidden="true"><Icon d={P.plus} size={18} /></span>
        </div>
      </div>
      <div className="sm-chips" role="group" aria-label="Filter">
        {FILTERS.map(([k, label]) => (
          <button key={k} className={`sm-chip${filter === k ? " is-on" : ""}`} aria-pressed={filter === k} onClick={() => setFilter(k)}>
            {label}
          </button>
        ))}
      </div>
      <div className="sm-chips sm-chips--sort" role="group" aria-label="Sort">
        <span className="sm-muted" aria-hidden="true"><Icon d={P.sort} size={18} /></span>
        {SORTS.map(([k, label]) => (
          <button key={k} className={`sm-chip${sort === k ? " is-on" : ""}`} aria-pressed={sort === k} onClick={() => setSort(k)}>
            {label}
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <p className="sm-empty">Nothing in your library matches &ldquo;{query}&rdquo;.</p>
      ) : (
        <div className="sm-grid">
          {shown.map((it) => {
            const active = it.trackId ? isNow(it.trackId) : false;
            return (
              <button key={it.id} className={`sm-item${active ? " is-now" : ""}`} onClick={() => onLibraryItem(it)}
                aria-label={`${it.title}, ${it.subtitle}`}>
                {it.special === "liked-tracks" ? (
                  <span className="sm-art sm-special sm-special--light" aria-hidden="true"><Icon d={P.heart} size={44} fill /></span>
                ) : it.special === "liked-stations" ? (
                  <span className="sm-art sm-special" aria-hidden="true"><Icon d={P.radio} size={44} /></span>
                ) : (
                  <Cover seed={it.art} className={it.kind === "artist" ? "is-round" : ""} />
                )}
                <span className="sm-card__t">{it.title}</span>
                <span className="sm-card__s">{it.subtitle}</span>
              </button>
            );
          })}
        </div>
      )}
    </>
  );

  const duration = track?.duration ?? 0;

  return (
    <section className="sm" aria-label="Interactive demo of the sonder desktop app">
      <header className="sm-top">
        <div className="sm-top__l">
          <SonderIcon size={26} />
          <button className="sm-icon" onClick={() => setNav((n) => ({ ...n, i: n.i - 1 }))} disabled={!canBack} aria-label="Back">
            <Icon d={P.left} />
          </button>
          <button className="sm-icon" onClick={() => setNav((n) => ({ ...n, i: n.i + 1 }))} disabled={!canForward} aria-label="Forward">
            <Icon d={P.right} />
          </button>
        </div>
        <nav className="sm-top__c" aria-label="Pages">
          {(["home", "radio", "library"] as Page[]).map((p) => (
            <button key={p} className={`sm-pill${page === p ? " is-on" : ""}`} onClick={() => go(p)} aria-current={page === p ? "page" : undefined}>
              {p}
            </button>
          ))}
          <button className="sm-icon" aria-label="Search" onClick={() => { go("library"); setFocusSearch(true); }}>
            <Icon d={P.search} />
          </button>
        </nav>
        <div className="sm-top__r" aria-hidden="true">
          <span className="sm-avatar" />
          <span className="sm-win"><Icon d={P.min} size={16} /><Icon d={P.max} size={14} /><Icon d={P.close} size={16} /></span>
        </div>
      </header>

      <div className={`sm-page sm-page--${page}`} key={page}>
        {page === "home" && home}
        {page === "radio" && radio}
        {page === "library" && library}
      </div>

      <footer className="sm-bar">
        <div className="sm-bar__l">
          {track ? <Cover seed={track.art} /> : <StationTile s={station!} />}
          <div className="sm-bar__meta">
            <div className="sm-bar__title">{track ? track.title : station!.name}</div>
            <div className="sm-bar__sub">{track ? track.album : station!.tags}</div>
            <div className="sm-bar__sub">{track ? track.artist : `Live radio · ${station!.country}`}</div>
          </div>
          <button className={`sm-icon sm-like${isLiked ? " is-on" : ""}`} onClick={toggleLike} aria-pressed={isLiked}
            aria-label={isLiked ? "Remove from favourites" : "Add to favourites"}>
            <Icon d={P.heart} size={20} fill={isLiked} />
          </button>
        </div>

        <div className="sm-bar__c">
          <div className="sm-ctl">
            <button className={`sm-icon sm-opt${shuffle ? " is-on" : ""}`} onClick={() => setShuffle((v) => !v)} aria-pressed={shuffle}
              aria-label="Shuffle" disabled={!track}>
              <Icon d={P.shuffle} />
            </button>
            <button className="sm-icon" onClick={previous} aria-label="Previous" disabled={!track}><Icon d={P.prev} size={22} /></button>
            <button className="sm-round sm-round--solid" onClick={() => setPlaying((v) => !v)} aria-label={playing ? "Pause" : "Play"}>
              {playing ? <PauseGlyph /> : <PlayGlyph />}
            </button>
            <button className="sm-icon" onClick={() => jump(1)} aria-label="Next" disabled={!track}><Icon d={P.next} size={22} /></button>
            <button className={`sm-icon sm-opt${repeat ? " is-on" : ""}`} onClick={() => setRepeat((v) => !v)} aria-pressed={repeat}
              aria-label="Repeat" disabled={!track}>
              <Icon d={P.repeat} />
            </button>
          </div>
          {track ? (
            <div className="sm-prog">
              <span>{fmt(pos)}</span>
              <input className="sm-range" type="range" min={0} max={duration} step={1} value={Math.min(pos, duration)}
                onChange={(e) => setPos(Number(e.target.value))} aria-label="Seek"
                style={{ ["--p" as string]: `${(Math.min(pos, duration) / duration) * 100}%` }} />
              <span>{fmt(duration)}</span>
            </div>
          ) : (
            <div className="sm-prog sm-prog--live"><span className={`sm-live${playing ? " is-on" : ""}`}><i />live</span></div>
          )}
        </div>

        <div className="sm-bar__r">
          <span className="sm-deco" aria-hidden="true"><Icon d={P.timer} /></span>
          <button className="sm-icon" onClick={() => setMuted((v) => !v)} aria-pressed={muted} aria-label={muted ? "Unmute" : "Mute"}>
            <Icon d={muted || volume === 0 ? P.muted : P.volume} />
          </button>
          <input className="sm-range sm-range--vol" type="range" min={0} max={1} step={0.01} value={muted ? 0 : volume}
            onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false); }} aria-label="Volume"
            style={{ ["--p" as string]: `${(muted ? 0 : volume) * 100}%` }} />
          <span className="sm-deco" aria-hidden="true"><Icon d={P.expand} /></span>
        </div>
      </footer>
    </section>
  );
}
