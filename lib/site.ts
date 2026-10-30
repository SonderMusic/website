/**
 * Content you are likely to edit lives here.
 * Replace every "#" with a real URL before you ship.
 */
export const SITE = {
  name: "sonder",
  title: "sonder, an OpenSubsonic music player",
  description:
    "sonder plays your library from any OpenSubsonic server. Point it at your server, sign in, press play.",
  year: 2026,
  author: "Petros Tsonis",
};

export const LINKS = {
  desktop: "https://github.com/SonderMusic/desktop/releases/latest",
  android: "https://github.com/SonderMusic/mobile/releases/latest",
  source: "https://github.com/SonderMusic/desktop",
};

export const SERVERS = ["Navidrome", "Gonic", "Ampache", "LMS"];

export interface Album {
  title: string;
  artist: string;
  bg: string;
  fg: string;
  /** Path data for the four slanted bars, in a 100 x 100 box. */
  bars: string;
}

/** Demo records for the app mock-up. All names are invented. */
export const ALBUMS: Album[] = [
  { title: "Slow Hours", artist: "Marlowe Quay", bg: "#FFFFFF", fg: "#0A0A0A", bars: "M9 38L25 28.8V68.8L9 78ZM30 22L46 12.8V70.8L30 80ZM51 40L67 30.8V62.8L51 72ZM72 30L88 20.8V70.8L72 80Z" },
  { title: "Paper Lanterns", artist: "The Ninth Tide", bg: "#1F1F1F", fg: "#FFFFFF", bars: "M9 46L25 36.8V66.8L9 76ZM30 30L46 20.8V68.8L30 78ZM51 18L67 8.8V68.8L51 78ZM72 40L88 30.8V66.8L72 76Z" },
  { title: "Static Bloom", artist: "Ines Varga", bg: "#8A8A8A", fg: "#0A0A0A", bars: "M9 30L25 20.8V76.8L9 86ZM30 44L46 34.8V70.8L30 80ZM51 24L67 14.8V76.8L51 86ZM72 50L88 40.8V68.8L72 78Z" },
  { title: "Low Season", artist: "Orrin and Dale", bg: "#FFFFFF", fg: "#0A0A0A", bars: "M9 18L25 8.8V74.8L9 84ZM30 34L46 24.8V64.8L30 74ZM51 18L67 8.8V68.8L51 78ZM72 40L88 30.8V64.8L72 74Z" },
  { title: "Night Shift FM", artist: "Kesi Mora", bg: "#D4D4D4", fg: "#0A0A0A", bars: "M9 50L25 40.8V66.8L9 76ZM30 36L46 26.8V72.8L30 82ZM51 26L67 16.8V76.8L51 86ZM72 14L88 4.8V74.8L72 84Z" },
  { title: "Glasswork", artist: "Ahn Beck", bg: "#262626", fg: "#FFFFFF", bars: "M9 24L25 14.8V66.8L9 76ZM30 30L46 20.8V60.8L30 70ZM51 36L67 26.8V60.8L51 70ZM72 42L88 32.8V62.8L72 72Z" },
  { title: "Harbour Lights", artist: "The Quiet Rooms", bg: "#FFFFFF", fg: "#0A0A0A", bars: "M9 44L25 34.8V68.8L9 78ZM30 30L46 20.8V68.8L30 78ZM51 44L67 34.8V68.8L51 78ZM72 16L88 6.8V70.8L72 80Z" },
  { title: "Afterimage", artist: "Theo Lindqvist", bg: "#5C5C5C", fg: "#FFFFFF", bars: "M9 20L25 10.8V72.8L9 82ZM30 40L46 30.8V66.8L30 76ZM51 28L67 18.8V70.8L51 80ZM72 48L88 38.8V64.8L72 74Z" },
];
