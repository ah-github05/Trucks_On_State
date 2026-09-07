# SEO

## Per-cart pre-rendered pages

`scripts/generate-seo-files.ts`'s `generateCartPages()` writes one static
`dist/public/cart/<slug>/index.html` per cart, post-build, each with unique
`<title>`/description/canonical/OG/Twitter tags and JSON-LD baked in at build
time.

- This app is a static Vite/React SPA with no SSR in production, so per-route
  meta tags can't be rendered per-request — they're baked into a distinct
  static file per cart instead.
- Mirrors the per-page SEO pattern used by badger_journals' Astro `<SEO>`
  component (unique title/description/canonical/OG per route), adapted for a
  build-time static-file model instead of Astro's per-request rendering.
- `vercel.json` has a rewrite (`/cart/:slug` → `/cart/:slug/index.html`) so
  requests to a cart URL resolve to its pre-rendered file; the client app then
  hydrates onto it normally.

## JSON-LD replacement in cart pages

Each cart's pre-rendered page is generated from the built homepage
`dist/public/index.html`, which by that point (after `injectItemListSchema`)
carries two JSON-LD `<script>` blocks: the static site-wide `WebSite` schema
and the injected `ItemList` schema. Neither is correct for a single-cart page,
so `generateCartPages()` strips both and inserts one `FoodEstablishment`
schema for that cart instead.
