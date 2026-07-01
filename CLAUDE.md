# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static marketing landing page for the "RN Clean Architecture Template" (a React Native starter/CLI). Plain HTML/CSS/JS — **no framework, no bundler, no npm dependencies, no build step, no test suite**. Three.js is loaded from a CDN via an import map in `index.html`.

## Commands

There is no package.json — nothing to install or build. Serve the directory with any static file server and open it in a browser:

```bash
python3 -m http.server 8000   # or: npx serve / php -S localhost:8000
```

Then visit `http://localhost:8000`. Because `js/main.js` is loaded as an ES module (`<script type="module">`), opening `index.html` directly via `file://` will break module imports in some browsers — always serve it.

There is no lint/test/build command to run after changes — verify visually in the browser (check the golden path across mobile/tablet/desktop breakpoints per `css/responsive.css`).

## Architecture

**CSS**: split by responsibility, all imported as separate `<link>` tags in `index.html` (no bundling). `css/tokens.css` holds every design token (colors, spacing, radius, gradients) as CSS custom properties on `:root` — always add new values there rather than hardcoding colors/spacing in component files. The rest of the files are one per section/component (`hero.css`, `features.css`, `architecture.css`, etc.) plus `responsive.css` for breakpoint overrides, loaded last so it can override section styles.

**JS**: ES modules under `js/`, no bundler — `index.html` imports `js/main.js` directly as `type="module"`. The pattern throughout is **one `initX()` export per module**, all wired up in a single `DOMContentLoaded` listener in `js/main.js`. When adding a new interactive behavior, create a new module in `js/modules/` exporting an `initX()` function and register it in `js/main.js` — don't bolt logic onto an existing unrelated module.

- `js/utils/scrollDispatcher.js` — a single shared, rAF-throttled `scroll` listener (`onScroll(callback)`) that fans out to subscribers. Any feature that needs scroll position (`navigation.js`, `heroParallax.js`) must subscribe through this dispatcher instead of adding its own `scroll` listener, to avoid duplicate listeners/thrash.
- `js/utils/dom.js` — small shared helpers (currently `rafThrottle`).
- `js/three/heroBackground.js` — the hero canvas background: a Three.js scene rendering the four Clean Architecture layers (UI/Application/Infrastructure/Domain) as wireframe planes with connector lines, driven by scroll/mouse parallax. Geometry/material buffers are built once in `buildLayers`/`buildConnectors` and mutated in place per frame — don't re-allocate `BufferAttribute`s in the render/update loop (this was a real perf bug: re-allocating a `Float32BufferAttribute` every frame leaked GPU buffers).
- `js/modules/reducedMotion.js` — must run early; it kills transition/animation durations globally when `prefers-reduced-motion: reduce` is set. Keep any new animation work compatible with this switch rather than working around it.

**Colors**: the palette is a "technical blueprint / architecture schematic" theme — blue family (`--primary: #3b82c4` and variants) plus a single copper accent (`--copper: #e8935a`) reserved for primary CTAs and connector/highlight details. Don't reintroduce the old generic SaaS blue (`#0ea5e9`) or add new accent colors outside `tokens.css`.

**Deployment**: `vercel.json` rewrites all routes to `index.html` and sets long-cache headers for `assets/`, `css/`, `js/` and no-cache for `index.html` — this is a Vercel static deployment, so any new top-level static folder that needs its own cache policy should get an entry there.

## Content notes

- User-facing copy in `index.html` is in English (this differs from the README, which is in Spanish — README is documentation for maintainers, not site content).
- GitHub links point at `alejandro-technology/react-native-template` (template repo) and `alejandro-technology/react-native-init-app` (CLI repo) — keep both in sync when either project moves.
