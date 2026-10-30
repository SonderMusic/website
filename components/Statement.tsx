import SonderPatternAnimated from "./SonderPatternAnimated";

export default function Statement() {
  return (
    <section id="why" aria-label="Why sonder" className="statement">
      <SonderPatternAnimated color="#FFFFFF" opacity={0.02} tileWidth={160} />
      <div className="container statement__inner">
        <h2 className="statement__title">
          <span>your files.</span>
          <span>your server.</span>
          <span>your player.</span>
        </h2>
        <p className="statement__text">
          sonder is only the player. The music stays on your server, where you put it, in the formats you
          chose.
        </p>
      </div>
    </section>
  );
}
