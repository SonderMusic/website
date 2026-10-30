import { LINKS } from "@/lib/site";

const CARDS = [
  { title: "desktop", text: "Windows, macOS and Linux.", cta: "download for desktop", href: LINKS.desktop, solid: true },
  { title: "mobile", text: "Take your library on the road, with offline albums when the signal drops.", cta: "get the android app", href: LINKS.android, solid: true },
  { title: "source", text: "Browse the code, follow releases and report issues.", cta: "view the source", href: LINKS.source, solid: false },
];

export default function Download() {
  return (
    <section id="download" aria-label="Download" className="section">
      <div className="container">
        <div className="section__head">
          <div>
            <h2 className="section__title">get sonder.</h2>
          </div>
          <p className="section__lead">
            Pick your platform, point it at your server, and your library is ready to play.
          </p>
        </div>

        <div className="dl">
          {CARDS.map((c) => (
            <div key={c.title} className="card card--dl">
              <h3 className="card__title card__title--lg">{c.title}</h3>
              <p className="card__text">{c.text}</p>
              <a className={c.solid ? "btn btn--solid" : "btn btn--outline"} href={c.href}>
                {c.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
