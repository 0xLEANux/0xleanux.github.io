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
