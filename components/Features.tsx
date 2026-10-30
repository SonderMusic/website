import StrokeIcon, { ICONS } from "./StrokeIcon";

const FEATURES = [
  {
    title: "gapless playback",
    text: "Albums that were made to flow play without the gaps. Each track picks up exactly where the last one ended.",
    icon: ICONS.gapless,
  },
  {
    title: "bit-perfect audio",
    text: "Exclusive output mode bypasses the system mixer for pure, unaltered playback — even over Bluetooth on Android.",
    icon: ICONS.bitperfect,
  },
  {
    title: "synced lyrics",
    text: "Follows the line being sung, with lyrics served straight from your own server.",
    icon: ICONS.lyrics,
  },
  {
    title: "offline listening",
    text: "Keep albums and playlists on your device for flights, tunnels and bad Wi-Fi.",
    icon: ICONS.offline,
  },
  {
    title: "scrobbling",
    text: "Reports every play back to your server, which can pass it on to ListenBrainz or Last.fm if you have set that up.",
    icon: ICONS.scrobble,
  },
  {
    title: "canvases",
    text: "Looping videos that breathe life into the player view, matched automatically.",
    icon: ICONS.canvas,
  },
];

export default function Features() {
  return (
    <section id="features" aria-label="Features" className="section">
      <div className="container">
        <div className="section__head">
          <div>
            <h2 className="section__title">
              <span>small player.</span>
              <span>big library.</span>
            </h2>
          </div>
          <p className="section__lead">
            All the features to keep you immersed in your music.<br />Nothing more, nothing less.
          </p>
        </div>

        <div className="feat">
          {FEATURES.map((f) => (
            <article key={f.title} className="card">
              <div className="card__icon">
                <StrokeIcon d={f.icon} size={26} strokeWidth={1.75} />
              </div>
              <h3 className="card__title">{f.title}</h3>
              <p className="card__text">{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
