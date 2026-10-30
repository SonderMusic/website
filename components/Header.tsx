import Logo from "./Logo";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__row">
        <a href="#top" aria-label="sonder, back to top" className="site-logo">
          <Logo />
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="#features">features</a>
          <a href="#opensubsonic">opensubsonic</a>
          <a className="btn btn--solid btn--sm" href="#download">
            get sonder
          </a>
        </nav>
      </div>
    </header>
  );
}
