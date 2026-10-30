# sonder landing page

Landing page for sonder, an OpenSubsonic music player. Next.js (App Router), React and TypeScript, with plain CSS and no UI framework.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Needs Node 20.9 or newer.

## Edit the content

Most things you will change are in `lib/site.ts`:

- `LINKS`: the three download buttons. They are all `"#"` for now, so replace them.
- `SERVERS`: the server names shown in the OpenSubsonic section.
- `ALBUMS`: demo albums for the app mock-up. All names are invented.
- `SITE`: page title, description, footer year and author.

Section copy (features, headings) lives in the component files in `components/`. The feature list in `components/Features.tsx` is written from what the OpenSubsonic API supports, so cut anything the app does not do.

## Structure

```
app/
  layout.tsx            fonts, metadata
  page.tsx              page order
  globals.css           all styles, with design tokens at the top
  icon.svg              favicon
components/
  Header, Hero, AppMockup, Statement, Features, OpenSubsonic, Download, Footer
  Wordmark.tsx          wordmark as inline SVG (uses currentColor)
  SonderIcon.tsx        the five-bar icon (uses currentColor)
  SonderPatternAnimated.tsx   bar pattern, each column drifting at its own speed
  SonderPattern.tsx           same pattern, static
lib/
  pattern.ts            pattern geometry
  wordmark-path.ts      wordmark outline, traced from the supplied artwork
  icon-path.ts          icon outline
  site.ts               content you are likely to edit
public/                 wordmark and icon SVGs in black and white
```

## The bar pattern

Every bar is a parallelogram with a 30 degree top and bottom edge. Each of the five columns repeats up and down, and the gap between bars is the same in both directions.

```tsx
<div style={{ position: "relative", background: "#0a0a0a" }}>
  <SonderPatternAnimated color="#fff" opacity={0.09} tileWidth={380} />
  {/* your content */}
</div>
```

Props: `color`, `opacity`, `tileWidth` (px per repeat of five bars), `gap`, `speed` (multiplier), `speeds` (five values in px/s, positive moves down), `paused`. Speeds are capped at 40 px/s, and the motion switches off for visitors who prefer reduced motion.

## Notes

- Fonts (Unbounded, Instrument Sans, JetBrains Mono) are self-hosted through `@fontsource-variable`, so nothing is fetched from Google at runtime.
- The "connect a server" form is a visual mock-up and does not submit anywhere.
- To change the wordmark, replace the path in `lib/wordmark-path.ts` and the two SVGs in `public/`.
