# aun / ayekaunic.com

A personal notebook built with Astro, TypeScript, plain CSS, and GSAP. Static output, GitHub Pages hosting, Markdown writing. No Hugo or sibling folder required.

## Run locally

Use Node.js 24 LTS (`nvm install && nvm use` if you use nvm).

```sh
npm install
npm run dev
```

Open the URL printed in the terminal. `npm run check` checks types and templates; `npm run build` creates `dist/`; `npm run preview` serves that production build.

## Add a shower thought

```sh
npm run new:thought -- "something worth thinking about"
```

Edit the new file in `src/content/thoughts/`. Set `draft: false` when ready. Or create a Markdown file in GitHub's editor:

```md
---
title: "something worth thinking about"
date: "2026-10-31"
draft: false
---

your words, here.
```

The filename becomes the URL, so keep it stable after publishing. The homepage, archive, search, RSS feed, and sitemap update on build. Draft and future-dated posts are excluded. Future posts appear after a build on or after their date (there is no scheduled deployment).

## Recommendations

Edit the Markdown lists in `src/content/recommendations/`. All original recommendations and post bodies have been preserved. The original business card remains in `public/business-card.png`.

## Deploy when the redesign is ready

The `site-revamp` branch is for local review. Nothing is deployed by pushing it. When ready, merge into `main`, change repository **Settings → Pages → Source** to **GitHub Actions**, and run the workflow (or push to main). Keep `ayekaunic.com` as the Pages custom domain. The workflow builds and publishes `dist/`; generated output is not committed. The workflow also prevents manual deployment from a non-main branch.

Original thought URLs, recommendation URLs, `/index.xml`, and `/shower-thoughts/index.xml` are retained. Fonts are bundled locally; no font service is contacted by visitors. Animation respects reduced-motion preferences and reading/navigation work without JavaScript.

## Homepage quotes

Optionally add a short quote to a thought's frontmatter:

```yaml
heroQuote: "you solve shit. you make things better."
```

The newest published, non-future-dated thought with a nonblank `heroQuote` supplies the animated opening. Up to three other quoted thoughts supply the floating fragments. Quotes and their source links update on the next build/deployment. Keep quotes short (roughly 5–15 words works best); the opening balances words into up to three lines and adjusts type size. Omit the field or leave it blank to skip a thought. If no quotes are set, the opening says “thinking out loud.” and links to the archive. Original article text is unaffected.
