# Aviolab AI — Website (NEXT)

Production website for **Aviolab AI**, served at [aviolab.ai](https://aviolab.ai) via **Cloudflare Pages**.

This is the **dual-product** version of the site. The previous single-page version remains in the [`Aviolab-AI-SITE`](../Aviolab-AI-SITE/) repository as historical archive.

## What this site is

Aviolab AI delivers **Agentic AI** for two distinct domains:

- **TTR-SUITE IP Legal** — AI-powered document analysis and assisted drafting for legal teams and IP departments. NDAs, research and technology partnership agreements, license agreements, contract review, end-to-end patent application preparation (UIBM, EPO).
- **TTR-SUITE per la PA Locale** — Consulenza giuridica e amministrativa AI per i Comuni italiani. Pareri, redazione di atti, fascicolo digitale SInCRO conforme UNI 11386 / art. 41 CAD, affiancamento esperto ai funzionari.

The site reflects that split: an **umbrella home** (`index.html`) introduces both verticals, while two dedicated landings (`ip-legal.html`, `pa-locale.html`) sell each suite to its audience.

## Page map

| URL | Role | Default language |
|-----|------|-------|
| `/` (`index.html`) | Umbrella home — mission, two product cards, contact form | EN (auto-switch to IT) |
| `/ip-legal.html` | TTR-SUITE IP Legal landing | EN |
| `/pa-locale.html` | TTR-SUITE per la PA Locale landing | IT |
| `/downloads.html` | Public + per-client downloads area | EN/IT |
| `/privacy.html` | GDPR privacy notice (bilingual tab switcher) | IT default |

Auxiliary files at the repo root:

| File | Purpose |
|------|---------|
| `robots.txt` | Crawler policy + explicit allow for 15 major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, …) |
| `llms.txt` | LLM-friendly site map per the [llms.txt](https://llmstxt.org/) standard — Markdown summary of the site for AI assistants |
| `sitemap.xml` | XML sitemap for search engines |
| `site.webmanifest` | Web app manifest |

## Tech stack

- Static HTML5 + CSS3 + vanilla JavaScript — no build step
- Cloudflare Pages for hosting and CDN
- Cloudflare Web Analytics for traffic measurement (cookieless, GDPR-compliant — enabled from the Cloudflare dashboard, no code injection required)
- Font Awesome 6 icons (locally hosted under `fonts/fontawesome/`)
- Custom webfonts: **Montserrat** (titles/UI) and **Open Sans** (body), both locally hosted under `fonts/`
- Bilingual EN/IT via `data-i18n="…"` attributes resolved at runtime by `js/translations.js`
- Contact form via [FormSubmit](https://formsubmit.co)
- Per-client downloads system backed by [aviolab-ai-downloads](https://github.com/rpsnoopy/aviolab-ai-downloads) repo (password-protected ZIPs)

## SEO, social, AI indexing

Every public HTML page carries a consistent metadata block:

- `<title>` and `<meta name="description">` aligned with the page's primary value proposition
- `<link rel="canonical">` to the production URL
- **Open Graph** tags (`og:title`, `og:description`, `og:image`, `og:type`, `og:locale`, `og:locale:alternate`) — used for previews on LinkedIn, WhatsApp, Telegram, Slack, Microsoft Teams, iMessage, Outlook, etc.
- Dedicated 1200×630 OG images per page under `assets/og/` (Montserrat-rendered, brand-coherent)
- **JSON-LD schema.org** structured data:
  - `Organization` + `OfferCatalog` (with both products) on the umbrella home
  - `SoftwareApplication` with feature list and audience on each landing
- **Cloudflare Web Analytics** is enabled at the Pages level — no `<script>` tag committed in the repo, beacon is injected automatically by Cloudflare

## Privacy and cookies

The site does **not use tracking or profiling cookies**. The only data flows are:

- The contact form (FormSubmit) — explicit user submission
- Cloudflare Web Analytics — aggregate, anonymous, cookieless
- The downloads area accepts a client ID (manual ZIP password gating)

A full bilingual GDPR notice is published at `/privacy.html` with the Data Controller details, lawful bases, retention, recipients (Cloudflare, FormSubmit, LLM providers for TTR-SUITE customers only), Standard Contractual Clauses for extra-EU transfers, and data subject rights (art. 15–21 GDPR).

## Local development

No build step required.

```bash
# Open in VS Code with Live Server, or any static HTTP server:
python3 -m http.server 8080
# Then visit http://localhost:8080/
```

For language switching to work correctly the page must be served over HTTP (not opened as `file://`) because of `fetch()`-based translation loading.

## Content management

Bilingual content lives in `js/translations.js`. Two ways to update:

1. **Direct edit** — modify the desired keys in both the `en` and `it` blocks of `js/translations.js`, save, refresh.
2. **Sources-then-regenerate** — edit `assets/english_texts.txt` and `assets/italian_texts.txt`, then run `node update-translations.js` to regenerate `js/translations.js`.

After any content change, retest both EN and IT modes by clicking the language toggle.

## Deployment

Push to `main` triggers automatic Cloudflare Pages deployment.

```bash
git add <specific-files>
git commit -m "<conventional message>"
git push origin main
```

Monitor deployments at [pages.cloudflare.com](https://pages.cloudflare.com).

To enable / configure Web Analytics, go to the Pages project → **Settings** → **Web Analytics** → **Enable**. No repo changes needed.

## Downloads system

The downloads area at `/downloads.html` distributes:

- **Public files** (TTR-PROBE, install scripts, English/Italian readmes) — open to all visitors
- **Per-client files** (TTR-SUITE licence packages, agent bundles) — accessed via a client ID entered by the visitor; the actual ZIPs sit in [`aviolab-ai-downloads/clients/<CLIENT-ID>/`](https://github.com/rpsnoopy/aviolab-ai-downloads/tree/main/clients) and are password-protected. Passwords are communicated to clients out-of-band.

To add a new download, edit `js/downloads.js` (the `exampleClients` map for per-client files, or `additionalPublicFiles` for public files), then upload the matching ZIP to the `aviolab-ai-downloads` repo. See `GESTIONE_DOWNLOADS.md` and `DOWNLOAD_MANAGEMENT.md` for the full procedure.

## Repository structure

```
.
├── index.html              # Umbrella home (dual-product)
├── ip-legal.html           # IP Legal landing (EN-first)
├── pa-locale.html          # PA Locale landing (IT-first)
├── downloads.html          # Public + per-client downloads
├── privacy.html            # GDPR privacy notice (IT/EN tabbed)
├── robots.txt              # Crawler policy (incl. AI bots)
├── llms.txt                # LLM-friendly site map
├── sitemap.xml             # XML sitemap
├── styles.css              # Shared site styles
├── script.js               # Core JS (nav, language toggle, animations)
├── update-translations.js  # Build script: txt sources → translations.js
├── js/
│   ├── translations.js     # Generated EN/IT translations
│   └── downloads.js        # Downloads UI logic
├── assets/
│   ├── logo.png            # Aviolab AI shield logo
│   ├── og/                 # 1200×630 Open Graph images per page
│   ├── brochures/          # Company overview brochures EN/IT (PDF+HTML)
│   ├── downloads/          # PA brochure for the PA Locale landing
│   └── images/             # Hero, mission, case study, capabilities imagery
├── fonts/
│   ├── fontawesome/        # Font Awesome 6 (local)
│   ├── montserrat/         # Montserrat woff/woff2
│   └── open-sans/          # Open Sans woff/woff2
└── lic/                    # License system endpoints
```

## Contact

**Riccardo Parenti** — Aviolab AI Founder
Email: [info@aviolab.ai](mailto:info@aviolab.ai)
Website: [aviolab.ai](https://aviolab.ai)
