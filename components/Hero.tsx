import AppMockup from "./AppMockup";
import SonderIcon from "./SonderIcon";
import Wordmark from "./Wordmark";

export default function Hero() {
  return (
    <section aria-label="Introduction" className="hero">
      <div className="container">
        <h1 className="hero__wordmark">
          <Wordmark />
        </h1>

        <div className="hero__row">
          <p className="hero__tagline">your music, from your own server.</p>
          <div className="hero__side">
            <p className="hero__lead">
              sonder plays your library from any OpenSubsonic server. Point it at your server, sign in, press
              play. Your files stay exactly where they are.
            </p>
            <div className="hero__cta">
              <a className="btn btn--solid" href="#download">
                download
              </a>
              <a className="btn btn--outline" href="#opensubsonic">
                how it connects
              </a>
            </div>
          </div>
        </div>

        <AppMockup />
      </div>
    </section>
  );
}
