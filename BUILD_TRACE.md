# Build trace

## Pass 1 — first build

Shipped a Vite/React single page from the dataset + selected real media.

**Worked:** Ukrainian voice, canoe hero, dark azure system, manifesto why-rows, pricing board, champion poster, skippable intro.

**Weak (browser review):**

- Gold logo sat on a white rectangle in the intro.
- Stats lane sat below the first viewport.
- Story middle film and some media cells rendered black (video poster not visible).
- Section titles tucked under the sticky nav.
- Reveal used opacity 0, so some columns looked empty until intersection fired.

## Pass 2 — remediation

- Knocked white out of the gold logo → `public/media/photos/logo-gold.png`.
- Hero became a column flex so the stat lane stays on screen one.
- `scroll-padding-top` and larger section padding.
- Story beat “Старт” uses the real champion poster instead of the unreliable dragonboat video cell.
- `AutoVideo` draws the poster as a CSS background and fades the file in on `playing`.
- Heading color forced to near-white.

**Better:** First screen now holds headline + CTAs + four stats over the ocean clip (confirmed in live browser). About/why/formats read as a complete brand, not a club clone.

## Pass 3 — mobile + honesty

- Reveal no longer hides copy with opacity 0.
- Mobile stats become a 2×2 grid.
- Playwright CLI wrote `screenshots/final_desktop.png` and `screenshots/final_mobile.png`.

**Still limited:**

- No authorized transformations or real testimonials.
- Form is a mock.
- `pass2-mobile-about.png` from the capture script is abnormally small (likely a dark/empty frame after scroll); treat mobile-about capture as incomplete evidence, not a pass.
- Mixed UAH/$ from source data.

## Pass 4 — Poseidon intro

Replaced the SVG paddle-strike intro with a 1080p film interpolated from the five client keyframes in `Assets/Animation_1`. Method: ffmpeg `minterpolate` (optical flow) between stills, then slow-mo + freeze on the last frame (`public/media/video/poseidon-intro.mp4`, ~6.3s). On end (or skip), a cyan flash + blur-scale wipe reveals the existing ocean hero. `prefers-reduced-motion` skips the film.

**Still limited:**

- No authorized transformations or real testimonials.
- Form is a mock.
- Mixed UAH/$ from source data.
- Poseidon sequence is cinematic interpolation of stills, not a real-time 3D render.
- Railway stayed unauthorized; live host is Vercel Hobby (`https://ihor-havryleiko-trainer.vercel.app`).

## What remains out of scope

Backend, CRM, production host lock, WCAG declaration, WDI core changes.
