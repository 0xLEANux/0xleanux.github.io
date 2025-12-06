# 0xleanux.github.io

# Donate Hub (GitHub Pages) — 0xElectron + 0xLEANux

This repository hosts a single, unified donation hub page for:

- Developer: https://github.com/0xElectron
- Organization: https://github.com/0xLEANux

Live hub (recommended):
- https://0xElectron.github.io/donate/

The page supports two recipient modes via deep links:

- DEV tab: `https://0xElectron.github.io/donate/?to=dev`
- ORG tab: `https://0xElectron.github.io/donate/?to=org`

It is designed to be used as a `custom:` link source for GitHub’s Sponsor button (`FUNDING.yml`), so donors can pick their preferred method (GitHub Sponsors, Card/Stripe, PayPal, BTC/ETH, etc.) with minimal friction.

---

## Features

- Dual recipient selector (DEV / ORG)
- Explicit “offerings” with side-by-side DEV + ORG buttons
- Donation methods matrix with search + “show configured only”
- Crypto copy + QR modal (per-recipient addresses)
- Fixed RGB background gradient (does not repeat on scroll)
- Fully responsive layouts (desktop table + mobile cards)
- Optional Arch Corner content (tips + pacman/AUR cheatsheet)
- PWA-ready: manifest + favicon + service worker caching + offline fallback

---

## Repository Layout

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
