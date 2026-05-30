# Ashmil & Fidha — Nikkah Landing Page

Static invitation site split into HTML, CSS, JS, and SVG assets.

## Project layout

```
ashmil-fidha-nikkah-landing/
├── index.html
├── css/styles.css
├── js/main.js
└── assets/
    ├── images/
    │   └── invitation-hero.png   ← main landing hero artwork
    └── svg/
    ├── mosque-silhouette.svg
    ├── floral-panel.svg      ← reused on both sides (right is mirrored in CSS)
    ├── lantern.svg
    ├── arch-ornament.svg
    └── (add your own SVGs here)
```

## Preview locally (required)

Do **not** double-click `index.html` — CSS/JS/SVG paths need a local server.

**Option A — double-click or terminal:**
```bash
cd ~/Downloads/ashmil-fidha-nikkah-landing
./start.sh
```
Then open **http://localhost:8765**

**Option B — npm:**
```bash
cd ~/Downloads/ashmil-fidha-nikkah-landing
npm start
```

**In Cursor:** File → Open Folder → choose `ashmil-fidha-nikkah-landing`, then Terminal → Run Task → “Start landing page server”.

## Adding your own SVGs

1. Save files under `assets/svg/` (e.g. `lotus.svg`, `bismillah.svg`).
2. Reference in `index.html`:

```html
<img src="assets/svg/lotus.svg" class="lotus" alt="" width="32" height="32">
```

For inline SVG (CSS control of `fill` / `stroke`), paste markup into a partial or use `<object data="assets/svg/your-file.svg" type="image/svg+xml">`.

## Deploy on Vercel

**Option A — Vercel CLI (fastest)**

```bash
cd ~/Downloads/ashmil-fidha-nikkah-landing
npx vercel
```

Follow the prompts (log in if asked). For production:

```bash
npx vercel --prod
```

**Option B — GitHub + Vercel dashboard**

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Leave build settings as default (static site, no build command).
4. Deploy.

No build step required — `index.html` is served from the project root.
