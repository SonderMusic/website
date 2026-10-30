/**
 * Demo content for the interactive app mock-up. Every name here is invented.
 * Edit freely; the mock-up reads everything from this file.
 */

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  /** Length in seconds. */
  duration: number;
  /** Seeds the generated cover art. */
  art: number;
}

export interface Station {
  id: string;
  name: string;
  /** Short text printed on the generated logo tile. */
  short: string;
  tags: string;
  country: string;
  bg: string;
  fg: string;
}

export type LibraryKind = "playlist" | "curation" | "artist" | "album";

export interface LibraryItem {
  id: string;
  kind: LibraryKind;
  title: string;
  subtitle: string;
  art: number;
  /** For albums: the track that plays when the item is clicked. */
  trackId?: string;
  /** Special tiles with their own icon instead of generated art. */
  special?: "liked-tracks" | "liked-stations";
}

const t = (
  id: string, title: string, artist: string, album: string, year: number, duration: number, art: number,
): Track => ({ id, title, artist, album, year, duration, art });

export const TRACKS: Track[] = [
  t("low-tide", "Low Tide Signals", "Marlowe Quay", "Slow Hours", 2025, 252, 1),
  t("porch-light", "Porch Light", "The Ninth Tide", "Paper Lanterns", 2024, 231, 2),
  t("static-garden", "Static Garden", "Ines Varga", "Static Bloom", 2023, 198, 3),
  t("half-moon", "Half Moon Motel", "Orrin and Dale", "Low Season", 2022, 274, 4),
  t("night-shift", "Night Shift", "Kesi Mora", "Night Shift FM", 2025, 205, 5),
  t("glass-hours", "Glass Hours", "Ahn Beck", "Glasswork", 2021, 243, 6),
  t("harbour", "Harbour Lights", "The Quiet Rooms", "Harbour Lights", 2024, 221, 7),
  t("afterimage", "Afterimage", "Theo Lindqvist", "Afterimage", 2020, 266, 8),
  t("ferry-home", "Ferry Home", "Marlowe Quay", "Salt Road", 2023, 189, 9),
  t("cold-coffee", "Cold Coffee, Warm Rain", "Ines Varga", "Small Mercies", 2022, 212, 10),
  t("long-way", "The Long Way Round", "The Ninth Tide", "Weather Report", 2021, 258, 11),
  t("paper-planes", "Paper Planes", "Kesi Mora", "Daylight Saving", 2024, 195, 12),
  t("slow-dawn", "Slow Dawn", "Orrin and Dale", "Field Notes", 2019, 236, 13),
  t("blue-hour", "Blue Hour", "Ahn Beck", "Blue Hour", 2025, 247, 14),
  t("signal-fade", "Signal Fade", "Theo Lindqvist", "Lowlight", 2023, 208, 15),
  t("tin-roof", "Tin Roof", "The Quiet Rooms", "Rooms", 2020, 183, 16),
];

export const trackById = (id: string) => TRACKS.find((x) => x.id === id) ?? TRACKS[0];

/** The big banner on the home page. */
export const FEATURED_TRACK = "low-tide";
/** Cards in the two-row quick-pick grid on home. */
export const QUICK_PICKS = ["porch-light", "static-garden", "half-moon", "night-shift", "glass-hours", "harbour", "afterimage", "ferry-home", "cold-coffee", "long-way", "paper-planes", "slow-dawn"];
/** The "Recents" shelf on home. */
export const RECENTS = ["ferry-home", "cold-coffee", "long-way", "paper-planes", "slow-dawn", "blue-hour", "signal-fade", "tin-roof", "low-tide", "porch-light"];

const s = (id: string, name: string, short: string, tags: string, bg: string, fg: string): Station => ({
  id, name, short, tags, country: "Netherlands", bg, fg,
});

export const STATIONS: Station[] = [
  s("harbour-fm", "Harbour FM 94.8", "94.8", "Smooth, Soul", "#FFFFFF", "#0A0A0A"),
  s("kanaal-nacht", "Kanaal Nacht", "NACHT", "Late night, Ambient", "#262626", "#FFFFFF"),
  s("zuidwest", "Radio Zuidwest 88.2", "88.2", "News talk, Pop", "#D4D4D4", "#0A0A0A"),
  s("lowlands-jazz", "Lowlands Jazz", "JAZZ", "Jazz", "#5C5C5C", "#FFFFFF"),
  s("delta-classic", "Delta Classic 96.1", "96.1", "Classical", "#FFFFFF", "#0A0A0A"),
  s("polder-pop", "Polder Pop", "POP", "Pop, Hits", "#8A8A8A", "#0A0A0A"),
  s("noord-fm", "Noord FM 99.4", "99.4", "Rock, Indie", "#1F1F1F", "#FFFFFF"),
  s("studio-rood", "Studio Rood 103.7", "ROOD", "Electronic", "#FFFFFF", "#0A0A0A"),
  s("canal-chill", "Canal Chill", "CHILL", "Chillout, Lo-fi", "#3A3A3A", "#FFFFFF"),
  s("tiny-desk-fm", "Tiny Room Radio", "TINY", "Acoustic, Folk", "#D4D4D4", "#0A0A0A"),
];

export const stationById = (id: string) => STATIONS.find((x) => x.id === id) ?? STATIONS[0];

export const FEATURED_STATION = "harbour-fm";
export const RECENT_STATIONS = ["kanaal-nacht", "zuidwest", "lowlands-jazz", "delta-classic", "polder-pop", "noord-fm", "studio-rood", "canal-chill", "tiny-desk-fm"];
export const TRENDING_STATIONS = ["polder-pop", "canal-chill", "studio-rood", "harbour-fm", "noord-fm", "lowlands-jazz", "delta-classic", "kanaal-nacht", "zuidwest"];

const lib = (
  id: string, kind: LibraryKind, title: string, subtitle: string, art: number, extra: Partial<LibraryItem> = {},
): LibraryItem => ({ id, kind, title, subtitle, art, ...extra });

export const LIBRARY: LibraryItem[] = [
  lib("liked", "playlist", "Liked Tracks", "Playlist · 1289 tracks", 0, { special: "liked-tracks" }),
  lib("liked-st", "curation", "Liked Stations", "Curation · 2 stations", 0, { special: "liked-stations" }),
  lib("pl-1", "playlist", "My Playlist #1", "Playlist · 1 track", 21),
  lib("ar-1", "artist", "Marlowe Quay", "Artist", 22),
  lib("ar-2", "artist", "The Ninth Tide", "Artist", 23),
  lib("ar-3", "artist", "Ines Varga", "Artist", 24),
  lib("ar-4", "artist", "Orrin and Dale", "Artist", 25),
  lib("ar-5", "artist", "Kesi Mora", "Artist", 26),
  lib("ar-6", "artist", "Ahn Beck", "Artist", 27),
  lib("ar-7", "artist", "Theo Lindqvist", "Artist", 28),
  lib("ar-8", "artist", "The Quiet Rooms", "Artist", 29),
  lib("al-1", "album", "Slow Hours", "Album · Marlowe Quay", 1, { trackId: "low-tide" }),
  lib("al-2", "album", "Paper Lanterns", "Album · The Ninth Tide", 2, { trackId: "porch-light" }),
  lib("al-3", "album", "Static Bloom", "Album · Ines Varga", 3, { trackId: "static-garden" }),
  lib("al-4", "album", "Low Season", "Album · Orrin and Dale", 4, { trackId: "half-moon" }),
  lib("pl-2", "playlist", "Rainy Sunday", "Playlist · 64 tracks", 30),
  lib("pl-3", "playlist", "Walking, No Hurry", "Playlist · 91 tracks", 31),
  lib("cu-1", "curation", "Late Night Stations", "Curation · 6 stations", 32),
  lib("al-5", "album", "Night Shift FM", "Album · Kesi Mora", 5, { trackId: "night-shift" }),
  lib("al-6", "album", "Glasswork", "Album · Ahn Beck", 6, { trackId: "glass-hours" }),
  lib("al-7", "album", "Harbour Lights", "Album · The Quiet Rooms", 7, { trackId: "harbour" }),
  lib("al-8", "album", "Afterimage", "Album · Theo Lindqvist", 8, { trackId: "afterimage" }),
  lib("al-9", "album", "Salt Road", "Album · Marlowe Quay", 9, { trackId: "ferry-home" }),
  lib("al-10", "album", "Small Mercies", "Album · Ines Varga", 10, { trackId: "cold-coffee" }),
  lib("pl-4", "playlist", "Focus", "Playlist · 112 tracks", 33),
  lib("cu-2", "curation", "Sunday Morning Radio", "Curation · 4 stations", 34),
  lib("al-11", "album", "Weather Report", "Album · The Ninth Tide", 11, { trackId: "long-way" }),
  lib("al-12", "album", "Daylight Saving", "Album · Kesi Mora", 12, { trackId: "paper-planes" }),
];
