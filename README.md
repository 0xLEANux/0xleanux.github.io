# Donate Hub (GitHub Pages) — **0xElectron** + **0xLEANux**

Unified donation landing page for:

- Developer: **@0xElectron** — https://github.com/0xElectron
- Organization: **@0xLEANux** — https://github.com/0xLEANux

**Live (recommended):**
- DEV tab: `https://0xLEANux.github.io/donate/?to=dev`
- ORG tab: `https://0xLEANux.github.io/donate/?to=org`

This hub is designed to be referenced from GitHub’s **Sponsor button** (`FUNDING.yml`) so supporters can choose their preferred rail (GitHub Sponsors, Card/Stripe, thanks.dev, PayPal — currently paused, BTC/ETH, etc.) with minimal friction.

> [!TIP]
> If you want one canonical donor link everywhere, use the DEV deep link and keep ORG as option #2 in the page UI.

> [!NOTE]
> PayPal links remain in config for later, but the live UI intentionally disables PayPal. Flip `PAYPAL_DISABLED` in `donate/index.html` when you want to show it again.

---

## Table of contents

- [What this repo is](#what-this-repo-is)
- [Features](#features)
- [Live links](#live-links)
- [Donation flow at a glance](#donation-flow-at-a-glance)
- [Repository layout](#repository-layout)
- [Deploy on GitHub Pages](#deploy-on-github-pages)
- [Configure payment methods](#configure-payment-methods)
- [Connect GitHub Sponsor button (FUNDING.yml)](#connect-github-sponsor-button-fundingyml)
- [Service Worker / Offline mode](#service-worker--offline-mode)
- [Design + theming notes](#design--theming-notes)
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
> GitHub Pages is static. It cannot process payments directly. Payments are handled by the providers you link (Sponsors/Stripe/PayPal/etc.; PayPal currently paused in the live UI).

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

## Donation flow at a glance

| Audience / intent | Deep link | Emphasis in UI | Notes |
| --- | --- | --- | --- |
| Individuals backing the dev | `https://0xLEANux.github.io/donate/?to=dev` | Sponsors → Card → Crypto (PayPal paused) | Treat as the canonical link (good for personal repos and social profiles). |
| Org-focused supporters | `https://0xLEANux.github.io/donate/?to=org` | Org Sponsors → Card → Crypto (PayPal paused) | Use when the org is the brand you want people to support. |
| GitHub Sponsor button | `.github/FUNDING.yml` custom URLs | Opens the right tab directly | Works for both repo-level and org-level funding files. |
| Offline fallback | `/donate/offline.html` | Cached copy of the hub | Payment providers still need network; fallback keeps the hub usable. |

---

## Repository layout

```text
.
├── index.html
├── 404.html
├── robots.txt
├── LICENSE
├── donate
│   ├── index.html
│   ├── manifest.webmanifest
│   ├── sw.js
│   ├── offline.html
│   ├── config.json
│   ├── config.example.json
│   ├── qrcode.js
│   └── favicon.svg
├── ovpn
│   ├── index.html
│   └── client.ovpn
└── .github
    ├── FUNDING.yml
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

Edit (same structure as `config.example.json`):

- `donate/config.json`

For safety, keep a template:

- `donate/config.example.json` (checked into git; no secrets)

### Minimal “live” configuration
Make sure these are set for **DEV** *and optionally* **ORG**:

- `card` → Stripe Payment Link (Visa/Mastercard/etc.)
- `paypal` → PayPal donate URL or `paypal.me/...` (UI currently disabled; set `PAYPAL_DISABLED=false` in `donate/index.html` to surface it)
- `thanksDev` → `https://thanks.dev/gh/<handle>` (use your thanks.dev profile; shows up as a recurring option)
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
- `donate/config.json` — runtime config; cached with the service worker (bump `CACHE_NAME` when you change it)
- `donate/qrcode.js` — local QR generator (no third-party API)

In `donate/index.html` ensure you have:

- Manifest + icon links in `<head>`
- SW registration code near the end of `<body>`

> [!NOTE]
> Payment links still require network access. Offline mode is mainly to keep the hub itself available.

---

## Design + theming notes

### Palette (defaults)

| Token | Hex | Usage |
| --- | --- | --- |
| `--c1` | `#b76bff` | Neon purple accents, logo, primary gradients. |
| `--c2` | `#00e5ff` | Cyan glow, borders, highlights on focus. |
| `--c3` | `#7CFF9E` | Mint success state, “Configured” badges. |
| `--c4` | `#FF6BD6` | Pink warmth for callouts and warnings. |

### UI accents & effects

| Element | Effect | Tweak it in |
| --- | --- | --- |
| RGB panels | Soft hue-rotating glow on panel edges. | `.rgb::before` hue animation and blur radius. |
| Offerings | Per-card gradients matching the palette, lifted shadows. | `--offer-a/b` + `--offer-outline` in `.offer[data-tone=...]`. |
| DEV/ORG mini cards | Subtle tint split (purple for DEV, cyan for ORG). | `.miniDev` / `.miniOrg` background + tag borders. |
| Methods table/cards | Configured rows glow mint; unconfigured rows are dashed/pink-tinted. | `tr[data-configured]` + `.methodCard[data-configured]` styles. |
| Buttons | Glassy highlight with hover glow. | `.btn` + `.btnPrimary` gradients and `--dur` timing. |
| Toast/modal | Blurred glass with strong contrast. | `.toast`, `dialog` styling. |

### Coloring tips

- Keep the accent duo (purple + cyan) as anchors; pair mint for success and pink for highlights to stay on theme.
- If you rebrand, update `--c1..--c4` plus `--bg*` for the background and the offer/method custom properties above.
- For lower-contrast themes, bump `border` opacities on `.offer`, `.methodCard`, and `.btn` so glass edges stay readable.
- Respect accessibility: text sits on dark glass; avoid lowering `rgba` values on `--text` / `--muted`.
- Animations honor `prefers-reduced-motion`; you can further slow things by raising `--dur`/`--dur2`.

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
- Add a “verify this page” block: show short-form addresses, copy/QR buttons, and remind donors to check the signed git history (optionally publish a PGP-signed `DONATION_ADDRESSES.txt.asc`).
- Consider adding a short “refunds / reversals” policy:
  - Card/PayPal (if enabled) may be reversible
  - crypto typically is not

---

## OpenVPN profile hosting (`/ovpn`)

- Static page lives at `/ovpn/index.html` with a download link.
- Replace `ovpn/client.ovpn` with your real profile (endpoint, certs, and keys).
- The file will be served at `https://0xLEANux.github.io/ovpn/client.ovpn` after pushing to `main`.
- Do not commit private credentials; paste cert/key blocks only if they are meant to be public to your users.

## Maintenance

### When you change cached assets
Bump the cache version in:

- `donate/sw.js`

Example:
```js
const CACHE_NAME = "donate-hub-v2025-12-07";
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

Licensed under **AGPL-3.0-or-later** (see `LICENSE`). If you run a modified version publicly, the AGPL requires you to provide the corresponding source to users.
