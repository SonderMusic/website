import Wordmark from "./Wordmark";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__mark">
          <Wordmark />
        </div>
        <div className="site-footer__row">
          <div>
            © {SITE.year} sonder · an independent OpenSubsonic client · by {SITE.author}
          </div>
          <nav aria-label="Footer" className="site-footer__nav">
            <a href="#features">features</a>
            <a href="#opensubsonic">opensubsonic</a>
            <a href="#download">download</a>
            <a href="#top">back to top</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
