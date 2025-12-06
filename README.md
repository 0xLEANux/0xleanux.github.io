# Donate Hub (GitHub Pages) — **0xElectron** + **0xLEANux**

Unified donation landing page for:

- Developer: **@0xElectron** — https://github.com/0xElectron
- Organization: **@0xLEANux** — https://github.com/0xLEANux

**Live (recommended):**
- DEV tab: `https://0xLEANux.github.io/donate/?to=dev`
- ORG tab: `https://0xLEANux.github.io/donate/?to=org`

This hub is designed to be referenced from GitHub’s **Sponsor button** (`FUNDING.yml`) so supporters can choose their preferred rail (GitHub Sponsors, Card/Stripe, PayPal, BTC/ETH, etc.) with minimal friction.

> [!TIP]
> If you want one canonical donor link everywhere, use the DEV deep link and keep ORG as option #2 in the page UI.

---

## Table of contents

- [What this repo is](#what-this-repo-is)
- [Features](#features)
- [Live links](#live-links)
- [Repository layout](#repository-layout)
- [Deploy on GitHub Pages](#deploy-on-github-pages)
- [Configure payment methods](#configure-payment-methods)
- [Connect GitHub Sponsor button (FUNDING.yml)](#connect-github-sponsor-button-fundingyml)
- [Service Worker / Offline mode](#service-worker--offline-mode)
- [Responsiveness rules](#responsiveness-rules)
- [Security notes](#security-notes)
- [Maintenance](#maintenance)
- [License](#license)

---

## What this repo is

This repository hosts a **static donation hub** under GitHub Pages. The page supports:

- **Two recipients** via a top selector (DEV/ORG)
- **Deep links** so your Sponsor button can point directly at the right tab
- A **static site** approach (no backend required)

> [!IMPORTANT]
> GitHub Pages is static. It cannot process payments directly. Payments are handled by the providers you link (Sponsors/Stripe/PayPal/etc.).

---

## Features

- Dual recipient selector (**DEV** / **ORG**)
- “Suggested offerings” with explicit DEV + ORG buttons
- Donation methods matrix with:
  - search
  - “show configured only”
  - desktop table + responsive mobile cards
- Crypto addresses per recipient:
  - copy buttons
  - QR modal
- Fixed RGB background gradient (background stays fixed while content scrolls)
- PWA-ready:
  - `manifest.webmanifest`
  - service worker cache
  - offline fallback page
- Optional “Arch Corner” content (tips + pacman/AUR cheatsheet)

---

## Live links

- DEV tab: `https://0xLEANux.github.io/donate/?to=dev`
- ORG tab: `https://0xLEANux.github.io/donate/?to=org`
- Root redirect: `https://0xLEANux.github.io/` → `.../donate/?to=dev`

---

## Repository layout

```text
.
├── index.html
├── 404.html
├── robots.txt
├── donate
│   ├── index.html
│   ├── manifest.webmanifest
│   ├── sw.js
│   ├── offline.html
│   └── favicon.svg
└── .github
    └── workflows
        └── pages.yml
```

---

## Deploy on GitHub Pages

### Option A (recommended): GitHub Actions deployment

1. Push this repo to `main`.
2. Go to: **Settings → Pages**
3. Under “Build and deployment” choose: **GitHub Actions**

The workflow file:
- `.github/workflows/pages.yml`

will deploy the site automatically whenever you push to `main`.

> [!TIP]
> GitHub Pages caches aggressively in some clients. If you change `sw.js`, bump `CACHE_NAME` (see [Maintenance](#maintenance)).

### Option B: Pages “deploy from branch”
You can deploy from the `main` branch directly, but GitHub Actions is typically cleaner for future changes.

---

## Configure payment methods

Edit:

- `donate/index.html`

Find the config object (`CFG`) and set payment URLs for each recipient.

### Minimal “live” configuration
Make sure these are set for **DEV** *and optionally* **ORG**:

- `card` → Stripe Payment Link (Visa/Mastercard/etc.)
- `paypal` → PayPal donate URL or `paypal.me/...`
- `crypto.btc` → BTC receive address
- `crypto.eth` → ETH receive address

Any value that is empty (`""`) or contains `YOUR_` is treated as **not configured** and buttons will auto-disable.

> [!WARNING]
> Never publish private keys, seed phrases, or exchange API secrets. Only publish receiving addresses.

---

## Connect GitHub Sponsor button (FUNDING.yml)

Add this file to any repo you want to show GitHub’s funding links:

**Path:** `.github/FUNDING.yml`

```yml
github: [0xElectron, 0xLEANux]
custom:
  - "https://0xLEANux.github.io/donate/?to=dev"
  - "https://0xLEANux.github.io/donate/?to=org"
```

✅ Result: your project repos will display a **Sponsor** button that links to these.

### Org-wide defaults (optional)
If you want a default funding file for all organization repositories, create:

- `0xLEANux/.github` (a “community health” repository)

and add the same `.github/FUNDING.yml` there. Individual repos can override it.

---

## Service Worker / Offline mode

This repo includes:

- `donate/sw.js` — caches the hub and serves an offline fallback
- `donate/offline.html` — shown when offline
- `donate/manifest.webmanifest` — adds installability as a web app

In `donate/index.html` ensure you have:

- Manifest + icon links in `<head>`
- SW registration code near the end of `<body>`

> [!NOTE]
> Payment links still require network access. Offline mode is mainly to keep the hub itself available.

---

## Responsiveness rules

To keep layouts responsive on mid-width screens (e.g. 1000–1200px), follow these rules:

- Collapse the left/right columns early (around ~1180px).
- Ensure grid children can shrink:
  - `min-width: 0;` on grid direct children
- Offerings grid must wrap by **available column width**, not viewport width:
  - `repeat(auto-fit, minmax(...))`

If you need a quick sanity check, test:
- Desktop wide
- Laptop 1366×768
- Tablet
- Mobile (narrow portrait)

---

## Security notes

- Don’t post private keys or seed phrases (ever).
- If you accept crypto, use dedicated receiving addresses per recipient.
- Consider adding a short “refunds / reversals” policy:
  - Card/PayPal may be reversible
  - crypto typically is not

---

## Maintenance

### When you change cached assets
Bump the cache version in:

- `donate/sw.js`

Example:
```js
const CACHE_NAME = "donate-hub-v2025-12-06";
```

This forces clients to refresh cached files.

### Suggested maintenance checklist

- [ ] Confirm GitHub Pages deployment succeeded
- [ ] Validate `donate/?to=dev` and `donate/?to=org`
- [ ] Verify buttons disable properly for unset providers
- [ ] Confirm service worker updates after cache bump
- [ ] Test responsiveness at 1000–1200px widths

---

## License

Choose a license for this repo if you want others to reuse the donation hub template.

Common options:
- MIT
- Apache-2.0

Add a `LICENSE` file when you decide.
