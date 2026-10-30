import { SERVERS } from "@/lib/site";

export default function OpenSubsonic() {
  return (
    <section id="opensubsonic" aria-label="OpenSubsonic" className="proto">
      <div className="container proto__row">
        <div className="proto__copy">
          <h2 className="proto__title">works with whatever you already run.</h2>
          <p className="proto__lead">
            sonder speaks OpenSubsonic, so it works with {SERVERS.slice(0, -1).join(", ")} and{" "}
            {SERVERS[SERVERS.length - 1]} and other compatible servers. Switch servers whenever you like. Your
            player stays the same.
          </p>
          <div className="server-chips">
            {SERVERS.map((s) => (
              <span key={s} className="server-chip">
                {s}
              </span>
            ))}
            <span className="server-chip server-chip--dashed">any OpenSubsonic server</span>
          </div>
          <pre className="code">
            <code>
              {`GET /rest/ping?f=json
{ "subsonic-response": { "status": "ok", "openSubsonic": true } }`}
            </code>
          </pre>
        </div>

        <div className="connect">
          <h3 className="connect__title">connect a server</h3>
          <div className="connect__fields">
            <div className="field">
              <label htmlFor="srv">server address</label>
              <input id="srv" type="text" placeholder="https://music.example.com" />
            </div>
            <div className="field">
              <label htmlFor="usr">username</label>
              <input id="usr" type="text" placeholder="your username" />
            </div>
            <div className="field">
              <label htmlFor="pwd">password</label>
              <input id="pwd" type="password" placeholder="your password" />
            </div>
            <button type="button" className="btn btn--solid btn--block">
              connect
            </button>
          </div>
          <p className="connect__note">
            On your home network, over a VPN or at a public address. If your server answers, sonder connects.
          </p>
        </div>
      </div>
    </section>
  );
}
